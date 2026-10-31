var eE=Object.defineProperty;var tE=(It,Ce,ln)=>Ce in It?eE(It,Ce,{enumerable:!0,configurable:!0,writable:!0,value:ln}):It[Ce]=ln;var X=(It,Ce,ln)=>tE(It,typeof Ce!="symbol"?Ce+"":Ce,ln);(function(){"use strict";var Ll;function It(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ce=It();function ln(e){Ce=e}var yi={exec:()=>null};function Y(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Ae.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Ae={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},cm=/^(?:[ \t]*(?:\n|$))+/,dm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,um=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,to=/(?:[*+-]|\d{1,9}[.)])/,Gl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zl=Y(Gl).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),mm=Y(Gl).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),no=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,fm=/^[^\n]+/,io=/(?!\s*\])(?:\\.|[^\[\]\\])+/,gm=Y(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",io).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),hm=Y(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,to).getRegex(),Ss="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",so=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,vm=Y("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",so).replace("tag",Ss).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vl=Y(no).replace("hr",bi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ss).getRegex(),ym=Y(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vl).getRegex(),ao={blockquote:ym,code:dm,def:gm,fences:um,heading:pm,hr:bi,html:vm,lheading:zl,list:hm,newline:cm,paragraph:Vl,table:yi,text:fm},Wl=Y("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ss).getRegex(),bm={...ao,lheading:mm,table:Wl,paragraph:Y(no).replace("hr",bi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Wl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ss).getRegex()},wm={...ao,html:Y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",so).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:yi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Y(no).replace("hr",bi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},km=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,$m=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Kl=/^( {2,}|\\)\n(?!\s*$)/,Em=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ts=/[\p{P}\p{S}]/u,oo=/[\s\p{P}\p{S}]/u,Yl=/[^\s\p{P}\p{S}]/u,_m=Y(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,oo).getRegex(),Zl=/(?!~)[\p{P}\p{S}]/u,xm=/(?!~)[\s\p{P}\p{S}]/u,Im=/(?:[^\s\p{P}\p{S}]|~)/u,Sm=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Xl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Tm=Y(Xl,"u").replace(/punct/g,Ts).getRegex(),Lm=Y(Xl,"u").replace(/punct/g,Zl).getRegex(),Ql="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Cm=Y(Ql,"gu").replace(/notPunctSpace/g,Yl).replace(/punctSpace/g,oo).replace(/punct/g,Ts).getRegex(),Am=Y(Ql,"gu").replace(/notPunctSpace/g,Im).replace(/punctSpace/g,xm).replace(/punct/g,Zl).getRegex(),Bm=Y("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Yl).replace(/punctSpace/g,oo).replace(/punct/g,Ts).getRegex(),Dm=Y(/\\(punct)/,"gu").replace(/punct/g,Ts).getRegex(),jm=Y(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Mm=Y(so).replace("(?:-->|$)","-->").getRegex(),Rm=Y("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Mm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ls=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Pm=Y(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ls).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Jl=Y(/^!?\[(label)\]\[(ref)\]/).replace("label",Ls).replace("ref",io).getRegex(),ec=Y(/^!?\[(ref)\](?:\[\])?/).replace("ref",io).getRegex(),qm=Y("reflink|nolink(?!\\()","g").replace("reflink",Jl).replace("nolink",ec).getRegex(),ro={_backpedal:yi,anyPunctuation:Dm,autolink:jm,blockSkip:Sm,br:Kl,code:$m,del:yi,emStrongLDelim:Tm,emStrongRDelimAst:Cm,emStrongRDelimUnd:Bm,escape:km,link:Pm,nolink:ec,punctuation:_m,reflink:Jl,reflinkSearch:qm,tag:Rm,text:Em,url:yi},Nm={...ro,link:Y(/^!?\[(label)\]\((.*?)\)/).replace("label",Ls).getRegex(),reflink:Y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ls).getRegex()},lo={...ro,emStrongRDelimAst:Am,emStrongLDelim:Lm,url:Y(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Om={...lo,br:Y(Kl).replace("{2,}","*").getRegex(),text:Y(lo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:ao,gfm:bm,pedantic:wm},wi={normal:ro,gfm:lo,breaks:Om,pedantic:Nm},Hm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},tc=e=>Hm[e];function pt(e,t){if(t){if(Ae.escapeTest.test(e))return e.replace(Ae.escapeReplace,tc)}else if(Ae.escapeTestNoEncode.test(e))return e.replace(Ae.escapeReplaceNoEncode,tc);return e}function nc(e){try{e=encodeURI(e).replace(Ae.percentDecode,"%")}catch{return null}return e}function ic(e,t){var a;const n=e.replace(Ae.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ae.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ae.slashPipe,"|");return i}function ki(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Fm(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function sc(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Um(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var As=class{constructor(e){X(this,"options");X(this,"rules");X(this,"lexer");this.options=e||Ce}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ki(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Um(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=ki(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ki(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=ki(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const h=f,v=h.raw+`
`+n.join(`
`),w=this.blockquote(v);a[a.length-1]=w,i=i.substring(0,i.length-h.raw.length)+w.raw,s=s.substring(0,s.length-h.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const h=f,v=h.raw+`
`+n.join(`
`),w=this.list(v);a[a.length-1]=w,i=i.substring(0,i.length-f.raw.length)+w.raw,s=s.substring(0,s.length-h.raw.length)+w.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),f=e.split(`
`,1)[0],h=!u.trim(),v=0;if(this.options.pedantic?(v=2,d=u.trimStart()):h?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=u.slice(v),v+=t[1].length),h&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(v),T=this.rules.other.hrRegex(v),D=this.rules.other.fencesBeginRegex(v),_=this.rules.other.headingBeginRegex(v),U=this.rules.other.htmlBeginRegex(v);for(;e;){const I=e.split(`
`,1)[0];let G;if(f=I,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),G=f):G=f.replace(this.rules.other.tabCharGlobal,"    "),D.test(f)||_.test(f)||U.test(f)||S.test(f)||T.test(f))break;if(G.search(this.rules.other.nonSpaceChar)>=v||!f.trim())d+=`
`+G.slice(v);else{if(h||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(u)||_.test(u)||T.test(u))break;d+=`
`+f}!h&&!f.trim()&&(h=!0),c+=I+`
`,e=e.substring(I.length+1),u=G.slice(v)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let w=null,k;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&(k=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!w,checked:k,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=ic(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(ic(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=ki(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Fm(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),sc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return sc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const v=f.slice(1,-1);return{type:"em",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}const h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},St=class Fl{constructor(t){X(this,"tokens");X(this,"options");X(this,"state");X(this,"tokenizer");X(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ce,this.options.tokenizer=this.options.tokenizer||new As,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Ae,block:Cs.normal,inline:wi.normal};this.options.pedantic?(n.block=Cs.pedantic,n.inline=wi.pedantic):this.options.gfm&&(n.block=Cs.gfm,this.options.breaks?n.inline=wi.breaks:n.inline=wi.gfm),this.tokenizer.rules=n}static get rules(){return{block:Cs,inline:wi}}static lex(t,n){return new Fl(n).lex(t)}static lexInline(t,n){return new Fl(n).inlineTokens(t)}lex(t){t=t.replace(Ae.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Ae.tabCharGlobal,"    ").replace(Ae.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const h=t.slice(1);let v;this.options.extensions.startInline.forEach(w=>{v=w.call({lexer:this},h),typeof v=="number"&&v>=0&&(f=Math.min(f,v))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Bs=class{constructor(e){X(this,"options");X(this,"parser");this.options=e||Ce}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Ae.notSpaceStart))==null?void 0:a[0],s=e.replace(Ae.endingNewline,"")+`
`;return i?'<pre><code class="language-'+pt(i)+'">'+(n?s:pt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:pt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+pt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${pt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=nc(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+pt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=nc(e);if(s===null)return pt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${pt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:pt(e.text)}},co=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Tt=class Ul{constructor(t){X(this,"options");X(this,"renderer");X(this,"textRenderer");this.options=t||Ce,this.options.renderer=this.options.renderer||new Bs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new co}static parse(t,n){return new Ul(n).parse(t)}static parseInline(t,n){return new Ul(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Ds=(Ll=class{constructor(e){X(this,"options");X(this,"block");this.options=e||Ce}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?St.lex:St.lexInline}provideParser(){return this.block?Tt.parse:Tt.parseInline}},X(Ll,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ll),Gm=class{constructor(...e){X(this,"defaults",It());X(this,"options",this.setOptions);X(this,"parse",this.parseMarkdown(!0));X(this,"parseInline",this.parseMarkdown(!1));X(this,"Parser",Tt);X(this,"Renderer",Bs);X(this,"TextRenderer",co);X(this,"Lexer",St);X(this,"Tokenizer",As);X(this,"Hooks",Ds);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Bs(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new As(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Ds;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];Ds.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return St.lex(e,t??this.defaults)}parser(e,t){return Tt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?St.lex:St.lexInline,l=a.hooks?a.hooks.provideParser():e?Tt.parse:Tt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+pt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},cn=new Gm;function W(e,t){return cn.parse(e,t)}W.options=W.setOptions=function(e){return cn.setOptions(e),W.defaults=cn.defaults,ln(W.defaults),W},W.getDefaults=It,W.defaults=Ce,W.use=function(...e){return cn.use(...e),W.defaults=cn.defaults,ln(W.defaults),W},W.walkTokens=function(e,t){return cn.walkTokens(e,t)},W.parseInline=cn.parseInline,W.Parser=Tt,W.parser=Tt.parse,W.Renderer=Bs,W.TextRenderer=co,W.Lexer=St,W.lexer=St.lex,W.Tokenizer=As,W.Hooks=Ds,W.parse=W,W.options,W.setOptions,W.use,W.walkTokens,W.parseInline,Tt.parse,St.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:ac,setPrototypeOf:oc,isFrozen:zm,getPrototypeOf:Vm,getOwnPropertyDescriptor:Wm}=Object;let{freeze:Be,seal:Ke,create:uo}=Object,{apply:po,construct:mo}=typeof Reflect<"u"&&Reflect;Be||(Be=function(t){return t}),Ke||(Ke=function(t){return t}),po||(po=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),mo||(mo=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const js=je(Array.prototype.forEach),Km=je(Array.prototype.lastIndexOf),rc=je(Array.prototype.pop),$i=je(Array.prototype.push),Ym=je(Array.prototype.splice),Ms=je(String.prototype.toLowerCase),fo=je(String.prototype.toString),go=je(String.prototype.match),Ei=je(String.prototype.replace),Zm=je(String.prototype.indexOf),Xm=je(String.prototype.trim),it=je(Object.prototype.hasOwnProperty),De=je(RegExp.prototype.test),_i=Qm(TypeError);function je(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return po(e,t,i)}}function Qm(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return mo(e,n)}}function q(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ms;oc&&oc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(zm(t)||(t[i]=a),s=a)}e[s]=!0}return e}function Jm(e){for(let t=0;t<e.length;t++)it(e,t)||(e[t]=null);return e}function mt(e){const t=uo(null);for(const[n,i]of ac(e))it(e,n)&&(Array.isArray(i)?t[n]=Jm(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=mt(i):t[n]=i);return t}function xi(e,t){for(;e!==null;){const i=Wm(e,t);if(i){if(i.get)return je(i.get);if(typeof i.value=="function")return je(i.value)}e=Vm(e)}function n(){return null}return n}const lc=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ho=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vo=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ef=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yo=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),tf=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),cc=Be(["#text"]),dc=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bo=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),uc=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rs=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),nf=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),sf=Ke(/<%[\w\W]*|[\w\W]*%>/gm),af=Ke(/\$\{[\w\W]*/gm),of=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),rf=Ke(/^aria-[\-\w]+$/),pc=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),lf=Ke(/^(?:\w+script|data):/i),cf=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mc=Ke(/^html$/i),df=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i);var fc=Object.freeze({__proto__:null,ARIA_ATTR:rf,ATTR_WHITESPACE:cf,CUSTOM_ELEMENT:df,DATA_ATTR:of,DOCTYPE_NAME:mc,ERB_EXPR:sf,IS_ALLOWED_URI:pc,IS_SCRIPT_OR_DATA:lf,MUSTACHE_EXPR:nf,TMPLIT_EXPR:af});const Ii={element:1,text:3,progressingInstruction:7,comment:8,document:9},uf=function(){return typeof window>"u"?null:window},pf=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},gc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function hc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:uf();const t=B=>hc(B);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ii.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:h}=e,v=l.prototype,w=xi(v,"cloneNode"),k=xi(v,"remove"),S=xi(v,"nextSibling"),T=xi(v,"childNodes"),D=xi(v,"parentNode");if(typeof o=="function"){const B=n.createElement("template");B.content&&B.content.ownerDocument&&(n=B.content.ownerDocument)}let _,U="";const{implementation:I,createNodeIterator:G,createDocumentFragment:z,getElementsByTagName:ge}=n,{importNode:Se}=i;let V=gc();t.isSupported=typeof ac=="function"&&typeof D=="function"&&I&&I.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ce,ERB_EXPR:se,TMPLIT_EXPR:Fe,DATA_ATTR:tt,ARIA_ATTR:Et,IS_SCRIPT_OR_DATA:re,ATTR_WHITESPACE:Ot,CUSTOM_ELEMENT:xn}=fc;let{IS_ALLOWED_URI:ut}=fc,de=null;const b=q({},[...lc,...ho,...vo,...yo,...cc]);let H=null;const Te=q({},[...dc,...bo,...uc,...Rs]);let ae=Object.seal(uo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),nt=null,Cl=null;const ui=Object.seal(uo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Up=!0,Al=!0,Gp=!1,zp=!0,pi=!1,Ka=!0,In=!1,Bl=!1,Dl=!1,mi=!1,Ya=!1,Za=!1,Vp=!0,Wp=!1;const V$="user-content-";let jl=!0,xs=!1,fi={},_t=null;const Ml=q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Kp=null;const Yp=q({},["audio","video","img","source","image","track"]);let Rl=null;const Zp=q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Xa="http://www.w3.org/1998/Math/MathML",Qa="http://www.w3.org/2000/svg",Ht="http://www.w3.org/1999/xhtml";let gi=Ht,Pl=!1,ql=null;const W$=q({},[Xa,Qa,Ht],fo);let Ja=q({},["mi","mo","mn","ms","mtext"]),eo=q({},["annotation-xml"]);const K$=q({},["title","style","font","a","script"]);let Is=null;const Y$=["application/xhtml+xml","text/html"],Z$="text/html";let fe=null,hi=null;const X$=n.createElement("form"),Xp=function(g){return g instanceof RegExp||g instanceof Function},Nl=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(hi&&hi===g)){if((!g||typeof g!="object")&&(g={}),g=mt(g),Is=Y$.indexOf(g.PARSER_MEDIA_TYPE)===-1?Z$:g.PARSER_MEDIA_TYPE,fe=Is==="application/xhtml+xml"?fo:Ms,de=it(g,"ALLOWED_TAGS")?q({},g.ALLOWED_TAGS,fe):b,H=it(g,"ALLOWED_ATTR")?q({},g.ALLOWED_ATTR,fe):Te,ql=it(g,"ALLOWED_NAMESPACES")?q({},g.ALLOWED_NAMESPACES,fo):W$,Rl=it(g,"ADD_URI_SAFE_ATTR")?q(mt(Zp),g.ADD_URI_SAFE_ATTR,fe):Zp,Kp=it(g,"ADD_DATA_URI_TAGS")?q(mt(Yp),g.ADD_DATA_URI_TAGS,fe):Yp,_t=it(g,"FORBID_CONTENTS")?q({},g.FORBID_CONTENTS,fe):Ml,nt=it(g,"FORBID_TAGS")?q({},g.FORBID_TAGS,fe):mt({}),Cl=it(g,"FORBID_ATTR")?q({},g.FORBID_ATTR,fe):mt({}),fi=it(g,"USE_PROFILES")?g.USE_PROFILES:!1,Up=g.ALLOW_ARIA_ATTR!==!1,Al=g.ALLOW_DATA_ATTR!==!1,Gp=g.ALLOW_UNKNOWN_PROTOCOLS||!1,zp=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pi=g.SAFE_FOR_TEMPLATES||!1,Ka=g.SAFE_FOR_XML!==!1,In=g.WHOLE_DOCUMENT||!1,mi=g.RETURN_DOM||!1,Ya=g.RETURN_DOM_FRAGMENT||!1,Za=g.RETURN_TRUSTED_TYPE||!1,Dl=g.FORCE_BODY||!1,Vp=g.SANITIZE_DOM!==!1,Wp=g.SANITIZE_NAMED_PROPS||!1,jl=g.KEEP_CONTENT!==!1,xs=g.IN_PLACE||!1,ut=g.ALLOWED_URI_REGEXP||pc,gi=g.NAMESPACE||Ht,Ja=g.MATHML_TEXT_INTEGRATION_POINTS||Ja,eo=g.HTML_INTEGRATION_POINTS||eo,ae=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&Xp(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&Xp(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),pi&&(Al=!1),Ya&&(mi=!0),fi&&(de=q({},cc),H=[],fi.html===!0&&(q(de,lc),q(H,dc)),fi.svg===!0&&(q(de,ho),q(H,bo),q(H,Rs)),fi.svgFilters===!0&&(q(de,vo),q(H,bo),q(H,Rs)),fi.mathMl===!0&&(q(de,yo),q(H,uc),q(H,Rs))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?ui.tagCheck=g.ADD_TAGS:(de===b&&(de=mt(de)),q(de,g.ADD_TAGS,fe))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?ui.attributeCheck=g.ADD_ATTR:(H===Te&&(H=mt(H)),q(H,g.ADD_ATTR,fe))),g.ADD_URI_SAFE_ATTR&&q(Rl,g.ADD_URI_SAFE_ATTR,fe),g.FORBID_CONTENTS&&(_t===Ml&&(_t=mt(_t)),q(_t,g.FORBID_CONTENTS,fe)),g.ADD_FORBID_CONTENTS&&(_t===Ml&&(_t=mt(_t)),q(_t,g.ADD_FORBID_CONTENTS,fe)),jl&&(de["#text"]=!0),In&&q(de,["html","head","body"]),de.table&&(q(de,["tbody"]),delete nt.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw _i('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw _i('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');_=g.TRUSTED_TYPES_POLICY,U=_.createHTML("")}else _===void 0&&(_=pf(h,s)),_!==null&&typeof U=="string"&&(U=_.createHTML(""));Be&&Be(g),hi=g}},Qp=q({},[...ho,...vo,...ef]),Jp=q({},[...yo,...tf]),Q$=function(g){let x=D(g);(!x||!x.tagName)&&(x={namespaceURI:gi,tagName:"template"});const C=Ms(g.tagName),oe=Ms(x.tagName);return ql[g.namespaceURI]?g.namespaceURI===Qa?x.namespaceURI===Ht?C==="svg":x.namespaceURI===Xa?C==="svg"&&(oe==="annotation-xml"||Ja[oe]):!!Qp[C]:g.namespaceURI===Xa?x.namespaceURI===Ht?C==="math":x.namespaceURI===Qa?C==="math"&&eo[oe]:!!Jp[C]:g.namespaceURI===Ht?x.namespaceURI===Qa&&!eo[oe]||x.namespaceURI===Xa&&!Ja[oe]?!1:!Jp[C]&&(K$[C]||!Qp[C]):!!(Is==="application/xhtml+xml"&&ql[g.namespaceURI]):!1},xt=function(g){$i(t.removed,{element:g});try{D(g).removeChild(g)}catch{k(g)}},Sn=function(g,x){try{$i(t.removed,{attribute:x.getAttributeNode(g),from:x})}catch{$i(t.removed,{attribute:null,from:x})}if(x.removeAttribute(g),g==="is")if(mi||Ya)try{xt(x)}catch{}else try{x.setAttribute(g,"")}catch{}},em=function(g){let x=null,C=null;if(Dl)g="<remove></remove>"+g;else{const ue=go(g,/^[\r\n\t ]+/);C=ue&&ue[0]}Is==="application/xhtml+xml"&&gi===Ht&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const oe=_?_.createHTML(g):g;if(gi===Ht)try{x=new f().parseFromString(oe,Is)}catch{}if(!x||!x.documentElement){x=I.createDocument(gi,"template",null);try{x.documentElement.innerHTML=Pl?U:oe}catch{}}const Le=x.body||x.documentElement;return g&&C&&Le.insertBefore(n.createTextNode(C),Le.childNodes[0]||null),gi===Ht?ge.call(x,In?"html":"body")[0]:In?x.documentElement:Le},tm=function(g){return G.call(g.ownerDocument||g,g,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ol=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof d)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},nm=function(g){return typeof r=="function"&&g instanceof r};function Ft(B,g,x){js(B,C=>{C.call(t,g,x,hi)})}const im=function(g){let x=null;if(Ft(V.beforeSanitizeElements,g,null),Ol(g))return xt(g),!0;const C=fe(g.nodeName);if(Ft(V.uponSanitizeElement,g,{tagName:C,allowedTags:de}),Ka&&g.hasChildNodes()&&!nm(g.firstElementChild)&&De(/<[/\w!]/g,g.innerHTML)&&De(/<[/\w!]/g,g.textContent)||g.nodeType===Ii.progressingInstruction||Ka&&g.nodeType===Ii.comment&&De(/<[/\w]/g,g.data))return xt(g),!0;if(!(ui.tagCheck instanceof Function&&ui.tagCheck(C))&&(!de[C]||nt[C])){if(!nt[C]&&am(C)&&(ae.tagNameCheck instanceof RegExp&&De(ae.tagNameCheck,C)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(C)))return!1;if(jl&&!_t[C]){const oe=D(g)||g.parentNode,Le=T(g)||g.childNodes;if(Le&&oe){const ue=Le.length;for(let ze=ue-1;ze>=0;--ze){const Ut=w(Le[ze],!0);Ut.__removalCount=(g.__removalCount||0)+1,oe.insertBefore(Ut,S(g))}}}return xt(g),!0}return g instanceof l&&!Q$(g)||(C==="noscript"||C==="noembed"||C==="noframes")&&De(/<\/no(script|embed|frames)/i,g.innerHTML)?(xt(g),!0):(pi&&g.nodeType===Ii.text&&(x=g.textContent,js([ce,se,Fe],oe=>{x=Ei(x,oe," ")}),g.textContent!==x&&($i(t.removed,{element:g.cloneNode()}),g.textContent=x)),Ft(V.afterSanitizeElements,g,null),!1)},sm=function(g,x,C){if(Vp&&(x==="id"||x==="name")&&(C in n||C in X$))return!1;if(!(Al&&!Cl[x]&&De(tt,x))){if(!(Up&&De(Et,x))){if(!(ui.attributeCheck instanceof Function&&ui.attributeCheck(x,g))){if(!H[x]||Cl[x]){if(!(am(g)&&(ae.tagNameCheck instanceof RegExp&&De(ae.tagNameCheck,g)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(g))&&(ae.attributeNameCheck instanceof RegExp&&De(ae.attributeNameCheck,x)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(x,g))||x==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&De(ae.tagNameCheck,C)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(C))))return!1}else if(!Rl[x]){if(!De(ut,Ei(C,Ot,""))){if(!((x==="src"||x==="xlink:href"||x==="href")&&g!=="script"&&Zm(C,"data:")===0&&Kp[g])){if(!(Gp&&!De(re,Ei(C,Ot,"")))){if(C)return!1}}}}}}}return!0},am=function(g){return g!=="annotation-xml"&&go(g,xn)},om=function(g){Ft(V.beforeSanitizeAttributes,g,null);const{attributes:x}=g;if(!x||Ol(g))return;const C={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0};let oe=x.length;for(;oe--;){const Le=x[oe],{name:ue,namespaceURI:ze,value:Ut}=Le,vi=fe(ue),Hl=Ut;let ke=ue==="value"?Hl:Xm(Hl);if(C.attrName=vi,C.attrValue=ke,C.keepAttr=!0,C.forceKeepAttr=void 0,Ft(V.uponSanitizeAttribute,g,C),ke=C.attrValue,Wp&&(vi==="id"||vi==="name")&&(Sn(ue,g),ke=V$+ke),Ka&&De(/((--!?|])>)|<\/(style|title|textarea)/i,ke)){Sn(ue,g);continue}if(vi==="attributename"&&go(ke,"href")){Sn(ue,g);continue}if(C.forceKeepAttr)continue;if(!C.keepAttr){Sn(ue,g);continue}if(!zp&&De(/\/>/i,ke)){Sn(ue,g);continue}pi&&js([ce,se,Fe],lm=>{ke=Ei(ke,lm," ")});const rm=fe(g.nodeName);if(!sm(rm,vi,ke)){Sn(ue,g);continue}if(_&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!ze)switch(h.getAttributeType(rm,vi)){case"TrustedHTML":{ke=_.createHTML(ke);break}case"TrustedScriptURL":{ke=_.createScriptURL(ke);break}}if(ke!==Hl)try{ze?g.setAttributeNS(ze,ue,ke):g.setAttribute(ue,ke),Ol(g)?xt(g):rc(t.removed)}catch{Sn(ue,g)}}Ft(V.afterSanitizeAttributes,g,null)},J$=function B(g){let x=null;const C=tm(g);for(Ft(V.beforeSanitizeShadowDOM,g,null);x=C.nextNode();)Ft(V.uponSanitizeShadowNode,x,null),im(x),om(x),x.content instanceof a&&B(x.content);Ft(V.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(B){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},x=null,C=null,oe=null,Le=null;if(Pl=!B,Pl&&(B="<!-->"),typeof B!="string"&&!nm(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw _i("dirty is not a string, aborting")}else throw _i("toString is not a function");if(!t.isSupported)return B;if(Bl||Nl(g),t.removed=[],typeof B=="string"&&(xs=!1),xs){if(B.nodeName){const Ut=fe(B.nodeName);if(!de[Ut]||nt[Ut])throw _i("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof r)x=em("<!---->"),C=x.ownerDocument.importNode(B,!0),C.nodeType===Ii.element&&C.nodeName==="BODY"||C.nodeName==="HTML"?x=C:x.appendChild(C);else{if(!mi&&!pi&&!In&&B.indexOf("<")===-1)return _&&Za?_.createHTML(B):B;if(x=em(B),!x)return mi?null:Za?U:""}x&&Dl&&xt(x.firstChild);const ue=tm(xs?B:x);for(;oe=ue.nextNode();)im(oe),om(oe),oe.content instanceof a&&J$(oe.content);if(xs)return B;if(mi){if(Ya)for(Le=z.call(x.ownerDocument);x.firstChild;)Le.appendChild(x.firstChild);else Le=x;return(H.shadowroot||H.shadowrootmode)&&(Le=Se.call(i,Le,!0)),Le}let ze=In?x.outerHTML:x.innerHTML;return In&&de["!doctype"]&&x.ownerDocument&&x.ownerDocument.doctype&&x.ownerDocument.doctype.name&&De(mc,x.ownerDocument.doctype.name)&&(ze="<!DOCTYPE "+x.ownerDocument.doctype.name+`>
`+ze),pi&&js([ce,se,Fe],Ut=>{ze=Ei(ze,Ut," ")}),_&&Za?_.createHTML(ze):ze},t.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Nl(B),Bl=!0},t.clearConfig=function(){hi=null,Bl=!1},t.isValidAttribute=function(B,g,x){hi||Nl({});const C=fe(B),oe=fe(g);return sm(C,oe,x)},t.addHook=function(B,g){typeof g=="function"&&$i(V[B],g)},t.removeHook=function(B,g){if(g!==void 0){const x=Km(V[B],g);return x===-1?void 0:Ym(V[B],x,1)[0]}return rc(V[B])},t.removeHooks=function(B){V[B]=[]},t.removeAllHooks=function(){V=gc()},t}var vc=hc();const wo="chaotic_";function Ue(e){try{return localStorage.getItem(wo+e)}catch{return null}}function Ye(e,t){try{localStorage.setItem(wo+e,t)}catch{}}function ft(e){try{localStorage.removeItem(wo+e)}catch{}}function yc(){return Ue("token")}function mf(e){e?Ye("token",e):ft("token")}function ff(){return Ue("theme")}function gf(e){Ye("theme",e)}function bc(){return Ue("last_project")}function hf(e){Ye("last_project",e)}function vf(){return Ue("onboarding_complete")==="true"}function yf(){Ye("onboarding_complete","true")}function bf(){ft("onboarding_complete")}function wf(e){return e?Ue(`issues_filters_${e}`):null}function kf(e,t){e&&(t?Ye(`issues_filters_${e}`,t):ft(`issues_filters_${e}`))}function wc(e){return Ue(`comment_draft_${e}`)}function Ps(e,t){t?Ye(`comment_draft_${e}`,t):ft(`comment_draft_${e}`)}function kc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function qs(e){const t=Ue(`description_draft_${e}`);if(!t)return null;const n=kc(t);return n?n.draft:t}function $c(e){const t=Ue(`description_draft_${e}`);if(!t)return null;const n=kc(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function dn(e,t,n=""){t?Ye(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):ft(`description_draft_${e}`)}function Ec(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function _c(e){var n;const t=Ue(`document_draft_${e}`);return t?((n=Ec(t))==null?void 0:n.draft)??null:null}function $f(e){const t=Ue(`document_draft_${e}`);if(!t)return null;const n=Ec(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Ns(e,t,n=null){t&&(t.title||t.content||t.icon)?Ye(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):ft(`document_draft_${e}`)}function Ef(){return{title:Ue("create_issue_title"),description:Ue("create_issue_description")}}function xc(e,t){e?Ye("create_issue_title",e):ft("create_issue_title"),t?Ye("create_issue_description",t):ft("create_issue_description")}function _f(){ft("create_issue_title"),ft("create_issue_description")}function xf(){return Ue("doc_view_mode")}function If(e){Ye("doc_view_mode",e)}function Sf(){return Ue("approvals_explainer_dismissed")==="1"}function Tf(){Ye("approvals_explainer_dismissed","1")}const Lf="/api";class Cf{constructor(){this.token=yc()}setToken(t){this.token=t,mf(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Lf}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const y=new Cf;let Tn=null;const Af='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Ln=null,Si=!1;function ko(){Si=!0}function Bf(){Si=!1}function Ic(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Df(){if(Si)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function F(){Ln=document.activeElement,Si=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function N(){var e;Lt(),Si=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Ln&&document.contains(Ln)&&typeof Ln.focus=="function"&&Ln.focus(),Ln=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Af);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Ze(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function $o(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function jf(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=jf(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Lt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Tn&&(document.removeEventListener("keydown",Tn),Tn=null)}function Mf(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Lt(),t&&Ze()&&Ic()}function Ti(e){Tn&&document.removeEventListener("keydown",Tn),Tn=e,e&&document.addEventListener("keydown",e)}function Li(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Lt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function he(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Me(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ve(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Q(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Rf(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function Xe(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function gt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function Pf(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Cn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Pf(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Eo(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function An(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${m(n)}</span>`}return Eo(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let J={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const _o=new Set;function le(e,t){if(typeof e=="string"){const n=J[e];J[e]=t,Sc(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=J[i];J[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Sc(i,s,a)})}}function st(e){return _o.add(e),()=>_o.delete(e)}function Sc(e,t,n){t!==n&&_o.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const Ct=()=>J.currentUser,Bn=e=>le("currentUser",e),A=()=>J.currentView,qf=e=>le("currentView",e),pe=()=>J.issues,at=e=>le("issues",e),Ci=()=>J.detailNavContext,un=e=>le("detailNavContext",e),Tc=()=>J.labels,Os=e=>le("labels",e),Lc=()=>J.activeFilterCategory,Nf=e=>le("activeFilterCategory",e),Cc=()=>J.selectedIssueIndex,Dn=e=>le("selectedIssueIndex",e),Of=()=>J.selectedDocIndex,Ac=e=>le("selectedDocIndex",e),Bc=()=>J.selectedBoardIndex,Hs=e=>le("selectedBoardIndex",e),Hf=()=>J.selectedInboxIndex,Fs=e=>le("selectedInboxIndex",e),Ff=()=>J.selectedSprintIndex,Dc=e=>le("selectedSprintIndex",e),Uf=()=>J.selectedEpicIndex,jc=e=>le("selectedEpicIndex",e),Gf=()=>J.pendingGates,zf=e=>le("pendingGates",e),ve=()=>J.inboxEntries,Gt=e=>le("inboxEntries",e),Us=()=>J.inboxUnreadCount,Ai=e=>le("inboxUnreadCount",e),Vf=()=>J.searchDebounceTimer,Wf=e=>le("searchDebounceTimer",e),Kf=()=>J.websocket,xo=e=>le("websocket",e),L=()=>J.currentTeam,Bi=e=>le("currentTeam",e),K=()=>J.currentProject,Qe=e=>le("currentProject",e||null),Re=()=>J.currentDetailIssue,Di=e=>le("currentDetailIssue",e),Yf=()=>J.currentDetailSprints,Mc=e=>le("currentDetailSprints",e),Io={};function ee(e){Object.assign(Io,e)}function Zf(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Io[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Rc=!1;function Xf(){if(!Rc){Rc=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Zf);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Io[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const So=["backlog","todo","in_progress","in_review","done","canceled"],ji=["backlog","todo","in_progress","in_review"],Pc=["urgent","high","medium","low","no_priority"],To=["no_priority","urgent","high","medium","low"],qc=["backlog","todo","in_progress","in_review","done"];function R({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${m(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${a}
        </div>
    `}const j={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},Nc=24,ot=new Map,$e=new Map,At=new Map;let Bt=null;function Qf(e){return Array.isArray(e)?[...e].map(String).sort():e}function Jf(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Qf(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function Oc(e,t){for($e.delete(e),$e.set(e,t);$e.size>Nc;){const n=$e.keys().next().value;$e.delete(n)}Hc()}function Hc(){if(ot.size===0)return;const e=new Set;$e.forEach(t=>t.ids.forEach(n=>e.add(n))),ot.forEach((t,n)=>{e.has(n)||ot.delete(n)})}function eg(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function Fc(e){const t=$e.get(e);return t?(Oc(e,t),t.ids.map(n=>ot.get(n)).filter(Boolean)):null}function tg(e){return ot.get(e)}function ng(e){var t;return((t=$e.get(e))==null?void 0:t.meta)||{}}function Uc(e){const t=ot.get(e.id);if(!(t!=null&&t.updated_at&&e.updated_at&&e.updated_at<t.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){ot.set(e.id,{...e,description:t.description});return}ot.set(e.id,e)}}function Gc(e,t,n){if(!Array.isArray(t))return;const i=eg(t);i.forEach(Uc);const s=$e.get(e);Oc(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}})}function ig(e,t){const n=$e.get(e);n&&(n.meta=t)}function sg(e){e!=null&&e.id&&ot.has(e.id)&&Uc(e)}function ag(e){$e.delete(e),At.forEach((t,n)=>{t===e&&At.delete(n)}),Bt===e&&(Bt=null),Hc()}function og(e){ot.delete(e),$e.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Lo(e){Bt=e}function rg(){return Bt}function lg(e,t){for(At.delete(e),At.set(e,t);At.size>Nc;)At.delete(At.keys().next().value)}function cg(e){const t=At.get(e);return t&&$e.has(t)?t:null}function zc(e){const t=(e.labels||[]).map(n=>`${n.id}:${n.name}:${n.color}`).join(",");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}`}function Vc(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(zc(e[n])!==zc(t[n]))return!1;return!0}function dg(){ot.clear(),$e.clear(),At.clear(),Bt=null}st((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&dg();return}if(e!=="issues"||Bt===null||!$e.has(Bt)||A()!=="issues")return;const i=$e.get(Bt);Gc(Bt,pe(),i.meta)});let Co=[];function ug(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function pg(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Gs(e,t){const n=e().map(ug),i=t().map(pg);Co=[...n,...i]}function zt(e){return e&&Co.find(t=>t.id===e)||null}function Vt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ao(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function zs({includeIdle:e=!1,keepId:t=null}={}){const n=Co.filter(v=>e||!v.idle||v.id===t),i=n.filter(v=>!v.is_agent),s=new Set(i.map(v=>v.id)),a=n.filter(v=>v.is_agent),o=new Set(a.map(v=>v.id)),r=(v,w)=>v.name.localeCompare(w.name),l=v=>v.registered_by_id&&o.has(v.registered_by_id),c=new Map,d=new Map;a.forEach(v=>{const[w,k]=l(v)?[c,v.registered_by_id]:[d,v.parent_user_id];w.has(k)||w.set(k,[]),w.get(k).push(v)});const u=[],f=(v,w)=>{u.push({assignee:v,indent:w}),(c.get(v.id)||[]).sort(r).forEach(S=>u.push({assignee:S,indent:2}))};return i.forEach(v=>{u.push({assignee:v,indent:!1}),(d.get(v.id)||[]).sort(r).forEach(w=>f(w,!0))}),a.filter(v=>!l(v)&&!s.has(v.parent_user_id)).sort(r).forEach(v=>f(v,!1)),u}function Mi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;zs({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${s.id}">${Ao(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function mg(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&zt(e)&&Mi({keepId:e}),t.value=e}function Wt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function pn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function jn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Mn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wc(){const e=document.getElementById("group-by-select");return e?e.value:""}const Kc=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Bo=["done","canceled"],fg=ji,gg="all";function Yc(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function Rn(e=Wt()){return e.length===0?"all":Yc(e,ji)?"open":Yc(e,Bo)?"closed":null}function Zc(e){var t,n,i;switch(e){case"project":return K()?1:0;case"status":{const s=Rn();return s==="all"?0:s?1:Wt().length}case"priority":return pn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return jn().length;case"exclude_labels":return Mn().length;default:return 0}}function Do(){let e=0;return Kc.forEach(t=>{e+=Zc(t.key)}),e}function Xc(){var v,w,k,S,T,D;const e=new URLSearchParams,t=Wt(),n=pn(),i=jn(),s=Mn(),a=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,o=K()||"",r=(w=document.getElementById("sprint-filter"))==null?void 0:w.value,l=(k=document.getElementById("issue-type-filter"))==null?void 0:k.value,c=(S=document.getElementById("group-by-select"))==null?void 0:S.value,d=(T=document.getElementById("sort-by-select"))==null?void 0:T.value,u=Rn(t);u==="all"?e.append("status",gg):u!=="open"&&t.forEach(_=>e.append("status",_)),n.forEach(_=>e.append("priority",_)),i.forEach(_=>e.append("label",_)),s.forEach(_=>e.append("exclude_label",_)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),h=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",h),kf((D=L())==null?void 0:D.id,f)}function hg(e){var w;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(k=>t.has(k))){const k=wf((w=L())==null?void 0:w.id);if(k){t=new URLSearchParams(k);const S=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",S)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const k=s.length>0?s:fg;a.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=k.includes(T.value)}),a.dataset.statusApplied="true",Qc()}const o=t.getAll("priority");if(o.length>0){const k=document.getElementById("priority-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=o.includes(T.value)}),Jc())}const r=t.get("assignee");r&&mg(r);const l=t.get("project");l&&(e(!0),Qe(l),e(!1));const c=t.get("sprint");if(c){const k=document.getElementById("sprint-filter");k&&(k.value=c)}const d=t.get("issue_type");if(d){const k=document.getElementById("issue-type-filter");k&&(k.value=d)}const u=t.getAll("label");if(u.length>0){const k=document.getElementById("label-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=u.includes(T.value)}),Vs())}const f=t.getAll("exclude_label");if(f.length>0){const k=document.getElementById("exclude-label-filter-dropdown");k&&(k.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=f.includes(T.value)}),Ws())}const h=t.get("groupBy");if(h){const k=document.getElementById("group-by-select");k&&(k.value=h)}const v=t.get("sort");if(v){const k=document.getElementById("sort-by-select");k&&(k.value=v)}}function Qc(){const e=Wt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=Rn(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=he(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Jc(){const e=pn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Me(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Vs(){var i,s;const e=jn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ws(){var i,s;const e=Mn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function ed(){if(!L())return;let e;try{e=await y.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}td("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),td("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function td(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${Q(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Ks(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",nd)},0))}function nd(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",nd))}function vg(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Pn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Ee(),Pe(Lc()),setTimeout(()=>{document.addEventListener("click",Pn)},0))}function yg(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Pn)):(e.classList.remove("hidden"),Tg(),setTimeout(()=>{document.addEventListener("click",Pn)},0))}function Pn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Pn))}function mn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Pn)}function Ee(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=K();e.innerHTML=Kc.map(n=>{const i=Zc(n.key),s=Lc()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Pe(e){Nf(e),Ee();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":wg(t);break;case"status":kg(t);break;case"priority":$g(t);break;case"type":Eg(t);break;case"assignee":_g(t);break;case"sprint":xg(t);break;case"labels":Ig(t);break;case"exclude_labels":Sg(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function bg(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Ee()}function wg(e){const t=K()||"",n=Z()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Q(s.color)};"></span>
                <span class="filter-option-label">${m(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function kg(e){const t=Wt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=Rn(t);let s=`
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
                <input type="checkbox" value="${a.value}" ${t.includes(a.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${p(a.value)}">
                <span class="filter-option-icon">${a.icon}</span>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function $g(e){const t=pn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Eg(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function _g(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=wn()||[];let s=`
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
        `}),e.innerHTML=s}function xg(e){if(!K()){e.innerHTML=`
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
        `}),e.innerHTML=a}function Ig(e){const t=jn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Q(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function Sg(e){const t=Mn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Q(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function Tg(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(l=>`
                <div class="display-option ${i===l.value?"active":""}" data-action="set-sort" data-value="${p(l.value)}">
                    <span>${l.label}</span>
                    ${i===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(l=>`
                <div class="display-option ${s===l.value?"active":""}" data-action="set-group-by" data-value="${p(l.value)}">
                    <span>${l.label}</span>
                    ${s===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function qe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=K();if(n){const f=(Z()||[]).find(h=>h.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=Wt();if(i.length>0){const u=Rn(i),f=u==="open"?"Open":u==="closed"?"Closed":i.map(h=>he(h)).join(", ");t.push({category:"status",label:"Status",value:f,clearAction:"clear-status-filter-new"})}const s=pn();if(s.length>0){const u=s.map(f=>Me(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const h=(wn()||[]).find(v=>v.user_id===o.value);u=(h==null?void 0:h.name)||(h==null?void 0:h.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=jn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),f=l.map(h=>{var k;const v=u==null?void 0:u.querySelector(`input[value="${h}"]`),w=(k=v==null?void 0:v.closest("label"))==null?void 0:k.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=Mn();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(h=>{var k;const v=u==null?void 0:u.querySelector(`input[value="${h}"]`),w=(k=v==null?void 0:v.closest("label"))==null?void 0:k.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${m(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Ne(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Do();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function id(){const e=document.getElementById("sprint-filter");if(!e)return;const t=K(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",jo(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await y.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${m(a.name)})</option>`),cu(t,a==null?void 0:a.id),jo(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function jo(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Lg(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let sd=!1;st(e=>{if(e!=="currentProject"||A()!=="issues"||sd)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([id(),ed()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Vs(),Ws(),We(),qe(),Ne()}).catch(n=>{console.error("Failed to update filters on project switch:",n),We(),qe(),Ne()})});function Cg(){hg(e=>{sd=e})}function Ys(){Qc(),We(),qe(),Ne()}function Zs(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ys()}function Mo(){Jc(),We(),qe(),Ne()}function Ro(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Mo()}function Po(){Vs(),We(),qe(),Ne()}function Xs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Po()}function qo(){Ws(),We(),qe(),Ne()}function Qs(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),qo()}function Ag(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function ad(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Ag(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Ri=0;function Js(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function od(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=L())==null?void 0:t.id)||"",project:K()||"",status:[...Wt()].sort(),priority:[...pn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let fn=null;function Bg(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Pi(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function rd(e,t){Pi(!1),Lo(e),at(t),A()==="issues"&&un(t),bt(),fn=e,Js(ng(e).hiddenClosed||0)}function ld(){Lo(null),fn=null,Pi(!1),Lg(),Js(0)}function Dg(){const e=document.getElementById("issues-list");Js(0),e!=null&&e.querySelector(".issue-row")?Pi(!0):ld()}function jg(){const e=cg(od()),t=e?Fc(e):null;return t?(Dn(-1),rd(e,t),!0):(ld(),!1)}async function Dt(){var w,k,S,T,D,_,U;Dn(-1),Bg();const e=++Ri;if(!L())return;const t=K()||"",n=Wt(),i=pn(),s=(w=document.getElementById("assignee-filter"))==null?void 0:w.value,a=(S=(k=document.getElementById("issue-search"))==null?void 0:k.value)==null?void 0:S.trim();if(!t&&Z().length===0){fn=null,document.getElementById("issues-list").innerHTML=R({icon:j.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=od(),r={limit:1e3},l=((T=document.getElementById("sort-by-select"))==null?void 0:T.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(D=Ct())==null?void 0:D.id:r.assignee_id=s);const u=(_=document.getElementById("sprint-filter"))==null?void 0:_.value;if(u)if(u==="current"){if(t){const I=cy(t);if(I!==void 0)I&&(r.sprint_id=I);else try{const z=(await y.getSprints(t)).find(ge=>ge.status==="active");cu(t,z==null?void 0:z.id),z&&(r.sprint_id=z.id)}catch(G){console.error("Failed to resolve current sprint:",G)}}}else r.sprint_id=u;const f=(U=document.getElementById("issue-type-filter"))==null?void 0:U.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let h=!1,v=null;try{const I=ad(jn(),"label-filter-dropdown");I.length>0&&(r.label=I,r.label_match="any");const G=ad(Mn(),"exclude-label-filter-dropdown");G.length>0&&(r.exclude_label=G),t&&(r.project_id=t),v=Jf({...r,scope:t||`team:${L().id}`});const z=Fc(v);z?(h=!0,fn===v&&rg()===v&&Vc(pe(),z)||rd(v,z)):Dg();const ge=re=>t?y.getIssues(re):Z().length>0?y.getTeamIssues(L().id,re):Promise.resolve(void 0),Se=r.search&&Rn(n)==="open"?ge({...r,status:Bo}).then(re=>Array.isArray(re)?re.length:0).catch(re=>(console.error("Failed to count closed search matches:",re),0)):Promise.resolve(0),V=await ge(r);if(Gc(v,V),e!==Ri)return;lg(o,v);const ce=h&&fn===v&&Vc(pe(),V);Lo(v),at(V),A()==="issues"&&un(V);const se=[...new Set(V.map(re=>re.project_id))],Fe=Object.keys(ga()).length;if(await lu(se),e!==Ri)return;const tt=Object.keys(ga()).length!==Fe;(!ce||tt)&&bt(),fn=v,Pi(!1);const Et=await Se;if(ig(v,{hiddenClosed:Et}),e!==Ri)return;Js(Et)}catch(I){if(e!==Ri)return;Pi(!1);const G=(I==null?void 0:I.status)===403||(I==null?void 0:I.status)===404;if(h&&!G){E("refresh issues",I);return}G&&v&&ag(v),fn=null;const z=document.getElementById("issues-list");z&&(z.innerHTML=R({icon:j.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",I)}}function Mg(){clearTimeout(Vf()),Wf(setTimeout(()=>{Dt()},300))}function We(){Xc(),Dt()}async function cd(){if(Xc(),Wc()==="sprint"){const e=pe(),t=[...new Set(e.map(n=>n.project_id))];await lu(t)}bt()}function Rg(){qe(),Ne()}function dd(e){Qe(e),Ee(),Pe("project"),mn()}function Pg(){dd("")}function qg(e){const t=e==="open"?ji:e==="closed"?Bo:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ys(),Ee(),Pe("status")}function Ng(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ys()),Ee(),Pe("status")}function Og(){Zs(),Ee(),Pe("status"),qe(),Ne()}function Hg(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Mo()),Ee(),Pe("priority")}function Fg(){Ro(),Ee(),Pe("priority"),qe(),Ne()}function ud(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,We()),Ee(),Pe("type"),qe(),Ne(),mn()}function Ug(){ud("")}function pd(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,We()),Ee(),Pe("assignee"),qe(),Ne(),mn()}function Gg(){pd("")}function md(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,We()),Ee(),Pe("sprint"),qe(),Ne(),mn()}function zg(){md("")}function Vg(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Po()),Ee(),Pe("labels")}function Wg(){Xs(),Ee(),Pe("labels"),qe(),Ne()}function Kg(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,qo()),Ee(),Pe("exclude_labels")}function Yg(){Qs(),Ee(),Pe("exclude_labels"),qe(),Ne()}function Zg(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Dt()),mn()}function Xg(e){const t=document.getElementById("group-by-select");t&&(t.value=e,cd()),mn()}function Qg(){Qe(null),Zs(),Ro();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Xs(),Qs(),We(),qe(),Ne()}ee({"update-label-filter":()=>Po(),"clear-label-filter":()=>Xs(),"update-exclude-label-filter":()=>qo(),"clear-exclude-label-filter":()=>Qs(),"show-filter-category":(e,t)=>{var n,i;Pe(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{bg();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>dd(t.value),"clear-project-filter":()=>Pg(),"clear-status-filter-new":()=>Og(),"set-status-preset":(e,t)=>qg(t.value),"show-all-statuses":()=>Zs(),"toggle-status-option":(e,t)=>Ng(t.filterValue,e),"clear-priority-filter-new":()=>Fg(),"toggle-priority-option":(e,t)=>Hg(t.filterValue,e),"set-type-filter":(e,t)=>ud(t.value),"clear-type-filter":()=>Ug(),"set-assignee-filter":(e,t)=>pd(t.value),"clear-assignee-filter":()=>Gg(),"set-sprint-filter":(e,t)=>md(t.value),"clear-sprint-filter":()=>zg(),"clear-label-filter-new":()=>Wg(),"toggle-label-option":(e,t)=>Vg(t.filterValue,e),"clear-exclude-label-filter-new":()=>Yg(),"toggle-exclude-label-option":(e,t)=>Kg(t.filterValue,e),"set-sort":(e,t)=>Zg(t.value),"set-group-by":(e,t)=>Xg(t.value),"clear-all-filters":()=>Qg(),"retry-load-issues":()=>Dt()});let qn=[],No=[];st(e=>{e==="currentProject"&&A()==="my-issues"&&(On(),Ni(),Hn())});function ht(){return qn}function Nn(e){qn=e}let Oo=0;async function On(){var a;const e=L(),t=Ct();if(!e||!t)return;const n=++Oo,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=K();eh();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await y.getIssues({...o,project_id:s}):r=await y.getTeamIssues(e.id,o),n!==Oo)return;qn=r,A()==="my-issues"&&un(qn),qi()}catch(o){if(n!==Oo)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=R({icon:j.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",o)}}async function Hn({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=K();No=await y.getTeamActivities(t.id,0,10,{projectId:i}),Jg()}catch{n&&(n.innerHTML=R({icon:j.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Jg(){const e=document.getElementById("dashboard-activity-list");if(e){if(!No.length){e.innerHTML=R({icon:j.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=No.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Xo(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Jo(t)}${n}</span>
                <span class="activity-actor">by ${m(Qo(t))}</span>
                <span class="activity-time">${Xe(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function eh(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function fd(){On()}function qi(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),qn.length===0){e.innerHTML=R({icon:j.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=qn.map(t=>Ui(t)).join("")}}let Ho=0;async function Ni(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Ho,n=K(),i=Z(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await y.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await y.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Ho)return;th(o)}catch(a){if(t!==Ho)return;console.error("Failed to load sprint status:",a),e.innerHTML=R({icon:j.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function th(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},f=Object.values(u).reduce((h,v)=>h+v,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${m(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${c?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${m(s.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${d}" style="width: ${l}%"></div>
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
                                    ${n.filter(h=>u[h]).map(h=>{const v=Math.round(u[h]/f*100);return`<div class="sprint-stacked-segment status-${h}" style="width: ${v}%" title="${he(h)}: ${u[h]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(h=>u[h]).map(h=>`<span class="sprint-count-label status-${h}">${u[h]} ${he(h)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ee({"filter-my-issues":()=>fd(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Bu(t.identifier)},"retry-load-my-issues":()=>On(),"retry-load-sprint-status":()=>Ni()});const gd=So,nh=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let vt=[],hd=Promise.resolve();const ih={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function vd(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function Oi(){return!!document.querySelector(".inline-dropdown")}function yd(){return vt}function bd(e){vt=e}async function Fo(e,t,n,i){var u,f,h,v;e.preventDefault(),Lt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${gd.map((w,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${w}">
                    ${_e(w)}
                    <span>${he(w)}</span>
                    <span class="dropdown-shortcut">${k+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${To.map((w,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${w}">
                    ${rt(w)}
                    <span>${Me(w)}</span>
                    <span class="dropdown-shortcut">${k}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${nh.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${gt(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=Re(),k=pe().find(T=>T.id===n)||ht().find(T=>T.id===n)||((w==null?void 0:w.id)===n?w:null),S=zs({keepId:(k==null?void 0:k.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${S.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:S.map(({assignee:T,indent:D},_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(T.id)}">
                    ${Cn(T,"avatar-small")}
                    <span>${Ao(T,D)}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),k=(w==null?void 0:w.dataset.projectId)||((u=Re())==null?void 0:u.project_id),S=Zn(k);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((T,D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${T.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${T.label}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=pe(),k=ht(),S=Re(),T=w.find(ce=>ce.id===n)||k.find(ce=>ce.id===n)||S,D=new Set(((T==null?void 0:T.labels)||[]).map(ce=>ce.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const _=o.getBoundingClientRect();let U=a.bottom+4,I=a.left;I+_.width>window.innerWidth-8&&(I=a.right-_.width),U+_.height>window.innerHeight-8&&(U=a.top-_.height-4),o.style.top=`${U}px`,o.style.left=`${Math.max(8,I)}px`,Li(o,{multiSelect:!0});let G=[];const z=L();if(z)try{G=await y.getLabels(z.id)}catch(ce){console.error("Failed to load labels:",ce)}if(!o.parentNode)return;kd(o,n,G,D);const ge=o.getBoundingClientRect();let Se=a.bottom+4,V=a.left;V+ge.width>window.innerWidth-8&&(V=a.right-ge.width),Se+ge.height>window.innerHeight-8&&(Se=a.top-ge.height-4),o.style.top=`${Se}px`,o.style.left=`${Math.max(8,V)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=pe(),k=ht(),S=Re(),T=w.find(se=>se.id===n)||k.find(se=>se.id===n)||S,D=(T==null?void 0:T.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const _=o.getBoundingClientRect();let U=a.bottom+4,I=a.left;I+_.width>window.innerWidth-8&&(I=a.right-_.width),U+_.height>window.innerHeight-8&&(U=a.top-_.height-4),o.style.top=`${U}px`,o.style.left=`${Math.max(8,I)}px`,Li(o);let G=[];if(D)try{G=await y.getSprints(D),ly(D,G)}catch(se){console.error("Failed to load sprints:",se)}if(!o.parentNode)return;const z=G.filter(se=>se.status!=="completed"||se.id===(T==null?void 0:T.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${z.map((se,Fe)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(se.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(se.name)}${se.status==="active"?" (Active)":""}</span>
                    ${Fe<9?`<span class="dropdown-shortcut">${Fe+1}</span>`:""}
                </button>
            `).join("")}
        `;const ge=o.getBoundingClientRect();let Se=a.bottom+4,V=a.left;V+ge.width>window.innerWidth-8&&(V=a.right-ge.width),Se+ge.height>window.innerHeight-8&&(Se=a.top-ge.height-4),o.style.top=`${Se}px`,o.style.left=`${Math.max(8,V)}px`,o.classList.remove("dropdown-positioning");const ce=se=>{const Fe=se.key;if(Fe==="Escape"||Fe==="Tab"){Lt(),document.removeEventListener("keydown",ce),Ti(null);return}if(vd(se,o))return;const tt=parseInt(Fe);if(isNaN(tt))return;const Et=o.querySelectorAll(".dropdown-option");let re=!1;tt===0?(Fn(n,"sprint_id",null),re=!0):tt>=1&&tt<Et.length&&(Et[tt].click(),re=!0),re&&(document.removeEventListener("keydown",ce),Ti(null))};Ti(ce),document.addEventListener("keydown",ce),(h=o.querySelector(".dropdown-option[data-action]"))==null||h.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=w=>{const k=w.key;if(k==="Escape"||k==="Tab"){Lt(),document.removeEventListener("keydown",d);return}if(vd(w,o))return;const S=parseInt(k);if(isNaN(S))return;let T=!1;if(t==="status"&&S>=1&&S<=6)Fn(n,"status",gd[S-1]),T=!0;else if(t==="priority"&&S>=0&&S<=4)Fn(n,"priority",To[S]),T=!0;else if(t==="estimate"){const D=Re(),_=Zn(D==null?void 0:D.project_id);S>=0&&S<_.length&&(Fn(n,"estimate",_[S].value),T=!0)}T&&(document.removeEventListener("keydown",d),Ti(null))};Ti(d),document.addEventListener("keydown",d),(v=o.querySelector(".dropdown-option[data-action]"))==null||v.focus(),Li(o)}function sh(e,t,n,i){Fo(e,t,n,i)}function ah(e,t,n){hd=hd.then(()=>wd(e,t,n))}async function wd(e,t,n){const i=pe(),s=ht(),a=Re(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const u=(await y.updateIssue(e,{label_ids:c})).labels||[],f=i.findIndex(k=>k.id===e);f!==-1&&(i[f].labels=u,at([...i]));const h=s.findIndex(k=>k.id===e);h!==-1&&(s[h].labels=u,Nn([...s])),(a==null?void 0:a.id)===e&&Di({...a,labels:u});const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(v&&v.parentNode){const k=i.find(S=>S.id===e)||s.find(S=>S.id===e);k&&(v.outerHTML=Ui(k))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map(k=>`
                    <span class="issue-label" style="background: ${Q(k.color)}20; color: ${Q(k.color)}">${m(k.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function kd(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${Q(s.color)}20; color: ${Q(s.color)}">${m(s.name)}</span>
                </button>
            `}).join("")}
    `}async function $d(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=L();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await y.createLabel(i.id,{name:s}),o=await y.getLabels(i.id);Os(o),a!=null&&a.id&&await wd(e,a.id,null);const r=pe(),l=ht(),c=Re(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&kd(t,e,o,u),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function ea(){const e=document.getElementById("create-issue-labels-label");e&&(vt.length===0?e.textContent="Labels":e.textContent=`Labels (${vt.length})`)}function Uo(e,{failed:t=!1}={}){const n=Tc();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=vt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${Q(i.color)}20; color: ${Q(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function oh(e){const t=vt.indexOf(e);t>=0?vt.splice(t,1):vt.push(e),ko(),ea();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Uo(n)}async function Ed(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await y.createLabel(e.id,{name:i}),a=await y.getLabels(e.id);Os(a),s!=null&&s.id&&!vt.includes(s.id)&&(vt.push(s.id),ko()),ea(),t&&Uo(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Fn(e,t,n){var a;Lt();const i={issue:pe().find(o=>o.id===e)||null,myIssue:ht().find(o=>o.id===e)||null,detail:((a=Re())==null?void 0:a.id)===e?Re():null},s=i.issue||i.myIssue||i.detail;s&&Sd(e,t,{...s,[t]:n},{focus:!0});try{const o={};o[t]=n;const r=await y.updateIssue(e,o);if(!r||!r.id)throw new Error("Invalid response from server");Sd(e,t,r,{focus:!s})}catch(o){E("update issue",o),s&&(xd(e,i),Id(e,t,i.issue||i.myIssue||i.detail,{focus:!1}),i.detail&&_d.has(t)&&Td(t,i.detail));return}if($("Issue updated","success"),t==="status")try{const o=K();if(o){const l=(await y.getSprints(o)).find(c=>c.status==="active");jo(l||null)}}catch{}}const _d=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]);function xd(e,t){var s;const n=pe();t.issue&&n.some(a=>a.id===e)&&at(n.map(a=>a.id===e?t.issue:a));const i=ht();t.myIssue&&i.some(a=>a.id===e)&&Nn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=Re())==null?void 0:s.id)===e&&Di(t.detail)}function Id(e,t,n,{focus:i}){var d;const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement),o=s.classList.contains("keyboard-selected");if(s.outerHTML=Ui(n),o&&((d=document.querySelector(`.issue-row[data-issue-id="${e}"]`))==null||d.classList.add("keyboard-selected")),!i&&!a)return;const r=document.querySelector(`.issue-row[data-issue-id="${e}"]`),l=ih[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus()}function Sd(e,t,n,{focus:i}){xd(e,{issue:n,myIssue:n,detail:n}),Id(e,t,n,{focus:i}),_d.has(t)&&Td(t,n)}function Td(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${_e(t.status)}
            <span>${he(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${rt(t.priority)}
            <span>${Me(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${gt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?zt(t.assignee_id):null,c=l?Vt(l):null;r.innerHTML=c?`${Cn(l,"avatar-small")}<span>${m(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=Yf(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?m(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${$a(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}ee({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Fn(t.issueId,i,n==="null"?null:Number(n)):Fn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{ah(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{$d(t.issueId)},"toggle-create-issue-label":(e,t)=>{oh(t.labelId)},"create-label-for-create-issue":()=>{Ed()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),$d(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Ed())}});const Ld=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function Kt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Un(e){const t=Kt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const rh=60,lh=150;let yt=[],Hi=1/0,Yt=null,Fi=null;function Zt(e,t){const n=t.slice(0,Math.max(0,Hi));return Hi-=n.length,n.length<t.length&&yt.push({groupKey:e,issues:t.slice(n.length)}),n.map(i=>Ui(i)).join("")}function ch(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Cd(e=1/0){const t=document.getElementById("issues-list");if(!t){yt=[];return}let n=e;for(;yt.length>0&&n>0;){const i=yt[0],s=i.issues.slice(0,n),a=ch(t,i.groupKey);a==null||a.insertAdjacentHTML("beforeend",s.map(o=>Ui(o)).join("")),n-=s.length,s.length===i.issues.length?yt.shift():i.issues=i.issues.slice(s.length)}if(yt.length===0&&(clearTimeout(Yt),Yt=null,Fi)){const i=Fi;Fi=null,Ad(i)}}const dh=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{Yt=setTimeout(e,0)}):Yt=setTimeout(e,16);let Go=0;function uh(){if(clearTimeout(Yt),yt.length===0)return;const e=++Go;dh(function t(){e===Go&&(Cd(lh),yt.length>0&&(Yt=setTimeout(t,0)))})}function bt(){var a,o,r;const e=document.getElementById("issues-list");if(!e)return;const t=(a=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:a.dataset.issueId;e.classList.add("issue-list-linear"),clearTimeout(Yt),Go++,Yt=null,yt=[],Fi=null,Hi=rh;const n=pe();if(n.length===0){const l=(r=(o=document.getElementById("issue-search"))==null?void 0:o.value)==null?void 0:r.trim(),c=Do()>0,d=l&&l.length>=2;if(c||d){const u=Do(),f=[];d&&f.push(`search "${l}"`),c&&f.push(`${u} active filter${u>1?"s":""}`),e.innerHTML=R({icon:j.issues,heading:"No matching issues",description:`No issues match your ${f.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=R({icon:j.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Dn(-1),Hi=1/0;return}const i=Wc();i==="status"?ph(e,n):i==="priority"?mh(e,n):i==="type"?fh(e,n):i==="assignee"?gh(e,n):i==="sprint"?hh(e,n):e.innerHTML=Un(n)+Zt(null,n),Hi=1/0;const s=!!t&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),l=>l.dataset.issueId===t);t&&yt.length>0&&!s?Fi=t:Ad(t),uh()}function Ad(e){const t=Cc();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Dn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Dn(i),n[i].classList.add("keyboard-selected")}function ph(e,t){const n={};So.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Un(t);So.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${_e(s)}</span>
                    <span class="group-title">${he(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function mh(e,t){const n={};Pc.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Un(t);Pc.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${rt(s)}</span>
                    <span class="group-title">${Me(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function fh(e,t){const n={};Ld.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=Un(t);Ld.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${gt(s)}</span></span>
                    <span class="group-title">${gt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function gh(e,t){const n={},i="__unassigned__";n[i]=[];const s=zs({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=Un(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${Kt(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=Vt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Cn(o,"avatar-small")}</span>
                    <span class="group-title">${m(l)}${m(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${Kt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function hh(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=ga();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,h=u?a[u.status]??3:3;return f-h});let r=Un(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",h=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${h}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${h}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${Kt(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(h,c)}
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
                    <span class="group-points">${Kt(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Zt(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function vh(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Bd(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(i)}<mark class="search-match">${m(s)}</mark>${m(a)}`}function yh(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Bd(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const bh=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Ui(e){var f,h,v;const t=e.assignee_id?zt(e.assignee_id):null,n=t?Vt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":bh.format(i),a=e.estimate!=null?$a(e.estimate,e.project_id):"",o=Sr(e.estimate,e.project_id),r=e.sprint_id?ga()[e.sprint_id]:null,l=r?r.name:null,c=(h=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:h.trim(),d=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),u=c&&!d?yh(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Me(e.priority)}">
                    ${rt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${he(e.status)}">
                    ${_e(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${gt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${Bd(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(w=>`
                            <span class="issue-label" style="background: ${Q(w.color)}20; color: ${Q(w.color)}">${m(w.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${l?m(l):"None"}">
                    ${l?`<span class="sprint-badge">${m(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?Cn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function rt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function _e(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ee({"toggle-group":(e,t)=>{vh(t.group)},"show-inline-dropdown":(e,t,n)=>{Fo(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),te(t.issueId))}});let Gi=[];function zi(){return Gi}function wh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function kh(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?wh(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function $h(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Gi=await y.getTeamAgents(e),Gs(wn,zi),Mi()}catch(n){console.error("Failed to load team agents:",n),E("load team agents",n)}}async function ta(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Gi=await y.getTeamAgents(e),Gs(wn,zi),Mi(),Eh()}catch(n){E("load agents",n)}}function Eh(){const e=document.getElementById("agents-list");if(e){if(Gi.length===0){e.innerHTML=R({icon:j.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Gi.map(t=>{var l;const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=Ct())==null?void 0:l.id)||La())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${kh(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${Ve(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function _h(){const e=Z();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),F()}function Dd(e,t,n=!1){const i=m(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,F()}async function xh(e){var r,l,c,d;e.preventDefault();const t=(r=L())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await y.createProjectAgent(a,n,i,o):u=await y.createTeamAgent(t,n,i,o),N(),Dd("Agent Created",u.api_key,!!u.can_register)}catch(u){E("create agent",u)}return!1}async function Ih(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await y.createAgentKey(e);Dd("New Agent Key",n.key)}catch(n){E("generate agent key",n)}}async function Sh(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await y.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),ta()}catch(s){E("change registrar",s)}}function Th(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function Lh(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await y.deleteAgent(e),$("Agent deleted","success"),ta()}catch(n){E("delete agent",n)}}ee({"create-agent":e=>{xh(e)},"copy-agent-key":()=>{Th()},"dismiss-agent-modal":()=>{N(),ta()},"delete-agent":(e,t)=>{Lh(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{Ih(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{Sh(t.agentId,t.agentName,t.canRegister!=="true")}});function Ch(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Ah(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Ch(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Bh(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function zo(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,h;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((v,w)=>v.classList.toggle("highlighted",w===a)),(h=(f=u[a]).scrollIntoView)==null||h.call(f,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,f=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),h=i.value.slice(u);i.value=f+h,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(Bh(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const h=f[2].toLowerCase(),v=Ah(wn(),zi(),i.mentionContext||{}).filter(w=>!h||w.handle.includes(h)||w.name.toLowerCase().includes(h)||w.email.toLowerCase().includes(h)).slice(0,6);if(!v.length){o();return}s.innerHTML=v.map(w=>`
            <button type="button" class="mention-suggestion" data-handle="${p(w.handle)}">
                <span class="mention-name">${m(w.name)}${w.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${m(w.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((w,k)=>{w.addEventListener("click",()=>l(w.dataset.handle)),w.addEventListener("mouseenter",()=>r(k))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const h=s.querySelectorAll(".mention-suggestion")[a];h&&(d.preventDefault(),l(h.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const jd=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Vi(e=null){const t=e||K()||"";bd([]);const n=Z().map(o=>`
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
            </div>
            <!-- Status, priority, type, labels, assignee, estimate and sprint
                 are what most issues are created with, so they show as chips
                 up front; only template and due date stay behind the
                 disclosure (CHT-1770). -->
            <div class="create-issue-toolbar">
                <div class="toolbar-buttons">
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                        ${_e("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${rt("no_priority")}
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
                                ${jd.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,F(),ea();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Ef();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{xc(i.value,s.value)}),s.addEventListener("input",()=>{xc(i.value,s.value)}),i.focus()}function Dh(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function jh(e){const t=jd.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Mh(e,t){const n=Z().find(i=>i.id===t);bd([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?m(n.name):"Project"}</span>
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
                        ${_e("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${rt("no_priority")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${p(e)}" data-project-id="${p(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,F(),ea(),document.getElementById("create-issue-title").focus()}async function Rh(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await y.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:yd(),parent_id:e});N(),$(`Created sub-issue ${d.identifier}`,"success"),te(e)}catch(d){E("create sub-issue",d)}}async function Ph(e,t,n){var o,r;Lt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${qc.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(he(c))}">
                    ${_e(c)}
                    <span>${he(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${To.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Me(c))}">
                    ${rt(c)}
                    <span>${Me(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(gt(c))}">
                    <span class="issue-type-badge type-${c}">${gt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Tc(),c=!1;if(l.length===0)try{l=await y.getLabels(L().id),Os(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Uo(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Li(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=zs({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=Vt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(f)}">
                    ${Cn(d,"avatar-small")}
                    <span>${Ao(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=Zn(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(f)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${m(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await y.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(f=>`
                        <button class="dropdown-option ${f.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(f.id)}" data-label="${p(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Li(a)}function qh(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Nh(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,ko();const i=m(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${_e(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${rt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${gt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Lt(),s==null||s.focus()}async function Md({keepOpen:e=!1}={}){var w,k;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=(k=document.getElementById("create-issue-due-date"))==null?void 0:k.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const h=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");h&&(h.disabled=!0),v&&(v.disabled=!0);try{const S=await y.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:yd(),due_date:f});$(`Created ${S.identifier}`,"success"),_f(),A()==="issues"?Dt():A()==="my-issues"&&On(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Bf(),document.getElementById("create-issue-title").focus()):(N(),te(S.id))}catch(S){E("create issue",S)}finally{h&&(h.disabled=!1),v&&(v.disabled=!1)}}async function Oh(){await Md({keepOpen:!1})}async function Hh(){await Md({keepOpen:!0})}ee({"toggle-create-dropdown":(e,t,n)=>{Ph(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Nh(t.field,t.value,t.label)},"create-issue-submit":()=>{Oh()},"create-issue-and-new":()=>{Hh()},"update-create-project":()=>{qh()},"apply-template":e=>{jh(e.target.value)},"toggle-create-options":()=>{Dh()},"create-sub-issue-submit":(e,t)=>{Rh(t.parentId,t.projectId)}});async function Rd(e){try{const t=await y.getIssue(e),n=await y.getSprints(t.project_id),s=Zn(t.project_id).map(o=>`
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
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${m(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,F();const a=document.getElementById("edit-issue-description");if(a){const o=qs(e);if(o){const r=$c(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?dn(e,r,t.description||""):dn(e,null)})}}catch(t){E("load issue",t)}}async function Fh(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",status:s.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};await y.updateIssue(t,c),qs(t)===c.description&&dn(t,null),N(),await te(t),$("Issue updated!","success")}catch(n){E("update issue",n)}}async function Uh(e){if(confirm("Are you sure you want to delete this issue?"))try{await y.deleteIssue(e),await Dt(),await Je(),P("issues"),$("Issue deleted!","success")}catch(t){E("delete issue",t)}}ee({"update-issue":(e,t)=>{Fh(e,t.issueId)}});let ye=null,Pd=!1,gn=!1,qd="new-comment";function Gh(){return ye||(ye=document.createElement("div"),ye.className="quote-tooltip",ye.setAttribute("role","button"),ye.setAttribute("tabindex","0"),ye.setAttribute("aria-label","Quote selection in comment"),ye.textContent="Quote",ye.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),na())}),ye.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),ye.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),na()}),document.body.appendChild(ye),ye)}function Nd(e,t){const n=Gh();n.style.display="flex",gn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!gn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Wi(){ye&&(ye.style.display="none"),gn=!1}function zh(){return gn}function Od(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Vo(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Od(t.startContainer),i=Od(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Vh(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function na(e=qd){const t=Vo();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Vh(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Wi(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Wh(){var i;if(!Vo())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Nd(n.left+n.width/2,n.top),!0}function Kh(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Vo()){Wi();return}Nd(t,n)},10)}function Hd({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(qd=t,i.addEventListener("mouseup",Kh,n?{signal:n}:void 0),Pd||(Pd=!0,document.addEventListener("mousedown",s=>{gn&&ye&&!ye.contains(s.target)&&Wi()}),document.addEventListener("selectionchange",()=>{gn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Wi()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&gn&&(s.stopImmediatePropagation(),Wi())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Wh()})))}function Fd(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Ud(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Gd(e){if(!e)return"";const t=lt(e),n=document.createElement("div");return n.innerHTML=t,Fd(n,Ud),n.innerHTML}function Gn(e){if(!e)return"";const t=lt(e),n=document.createElement("div");return n.innerHTML=t,Fd(n,Ud),n.innerHTML}let Wo=!1,Ko=!1,Xt=!0,Ki=null,Yi=null,Zi=null,ia=null,Yo=!1,sa=null;function Zo(e=null){Yo=!0,e&&(sa=e)}function Xo(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function Qo(e){return e.user_name||e.user_email||"Unknown"}function Jo(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(he(t(e.old_value)))}</strong> to <strong>${m(he(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(Me(t(e.old_value)))}</strong> to <strong>${m(Me(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function Yh(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function Zh(){Xt=!Xt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",Xt),n&&n.classList.toggle("rotated",Xt)}async function Xi(e){try{Ki=await y.getTicketRitualsStatus(e),zd(e)}catch(t){console.error("Failed to load ticket rituals:",t),Ki=null}}function zd(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Ki){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=Ki;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(Xt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",Xt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",Xt);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${c}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?lt(d.prompt):""}</div>
                        ${d.attestation?"":ky(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Xe(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${lt(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${hy(d,e)}
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
                            <span class="ticket-ritual-name">${m(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Xe(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function aa(e){try{let t;return e.includes("-")?t=await y.getIssueByIdentifier(e):t=await y.getIssue(e),t?(await te(t.id,!1),!0):(P("my-issues",!1),!1)}catch{return P("my-issues",!1),!1}}function er(e){const t=Ci(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function tr({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Xh(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=Re();if(!t)return;const n=er(t.id);Yi=n.prevIssue?n.prevIssue.id:null,Zi=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=tr(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}st(e=>{e==="detailNavContext"&&Xh()});let oa=0,Vd=0,ra=!1;function Wd(){if(document.querySelector(".description-inline-editor"))return"editor";if(Oi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||ra?"transient":null}function Kd(e){return Zo(),e==="editor"?"deferred":"retry"}function Qh(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=Re())==null?void 0:n.id)===e}function Jh(e){return Ci().find(t=>t.id===e)||pe().find(t=>t.id===e)||tg(e)||null}function ev(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Di(e);const i=er(e.id);Yi=i.prevIssue?i.prevIssue.id:null,Zi=i.nextIssue?i.nextIssue.id:null;const s=Z().find(r=>r.id===e.project_id),a=e.assignee_id?zt(e.assignee_id):null,o=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${tr(i)}
                        <span class="issue-detail-breadcrumb">${s?m(s.name):"Project"} › ${m(e.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${m(e.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${_e(e.status)}<span>${he(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${rt(e.priority)}<span>${Me(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?m(Vt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function te(e,t=!0,{refresh:n=!1}={}){const i=n?oa:++oa,s=++Vd;if(n){const a=Wd();if(a)return Kd(a)}try{t&&yn(),n||(Xt=!0);let a=!1;if(!n){const b=Jh(e);b&&(ev(b),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${b.identifier}`),a=!0))}let o=!1;const[r,l,c,d,u,f]=await Promise.all([y.getIssue(e),y.getComments(e).catch(b=>(console.error("Failed to load comments:",b),o=!0,[])),y.getActivities(e),y.getSubIssues(e),y.getRelations(e),y.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),v=[...f.pending_rituals||[],...f.completed_rituals||[]].filter(b=>b.attestation&&b.attestation.note).map(b=>({id:`attestation-${b.attestation.id}`,author_name:b.attestation.attested_by_name||"Unknown",author:b.attestation.attester||null,content:b.attestation.note,created_at:b.attestation.attested_at,is_attestation:!0,ritual_name:b.name,is_pending:!b.attestation.approved_at})),w=[...l,...v].sort((b,H)=>new Date(b.created_at)-new Date(H.created_at)),k=[r.parent_id?y.getIssue(r.parent_id):Promise.resolve(null),y.getSprints(r.project_id).catch(b=>(console.error("Failed to load sprints:",b),[]))],[S,T]=await Promise.all(k);if(i!==oa)return"dropped";let D=null,_=null;if(n){if(s!==Vd||!Qh(e))return"dropped";const b=Wd();if(b)return Kd(b);_=window.scrollY;const H=document.activeElement;H!=null&&H.id&&document.getElementById("issue-detail-view").contains(H)&&(D={id:H.id,start:H.selectionStart,end:H.selectionEnd})}Ki=f;const U=u.filter(b=>b.relation_type==="blocks"&&b.direction==="outgoing"),I=u.filter(b=>b.relation_type==="blocked_by"||b.relation_type==="blocks"&&b.direction==="incoming"),G=u.filter(b=>b.relation_type==="relates_to");t&&!a&&history.pushState({issueId:e,view:A()},"",`/issue/${r.identifier}`),Di(r),Mc(T),Yo=!1,sa=null,document.querySelectorAll(".view").forEach(b=>b.classList.add("hidden"));const z=document.getElementById("issue-detail-view");z.classList.remove("hidden");const ge=A()||"my-issues",Se=Z().find(b=>b.id===r.project_id),V=r.assignee_id?zt(r.assignee_id):null,ce=V?Vt(V):null,se=r.sprint_id?T.find(b=>b.id===r.sprint_id):null,Fe=er(r.id),{prevIssue:tt,nextIssue:Et}=Fe;z.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(ge)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${tr(Fe)}
                        <span class="issue-detail-breadcrumb">${Se?m(Se.name):"Project"} › ${m(r.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(r.title)}</h1>

                    ${S?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(S.identifier)}" data-action="navigate-issue" data-issue-id="${p(S.id)}" data-identifier="${p(S.identifier)}">${S.identifier}: ${m(S.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(r.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${qs(r.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${r.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(r.id)}">
                            ${r.description?Gn(r.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${p(r.id)}" data-project-id="${p(r.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${d.length===0?R({icon:j.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):d.map(b=>`
                                <a href="/issue/${encodeURIComponent(b.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(b.id)}" data-identifier="${p(b.identifier)}">
                                    <span class="sub-issue-status">${_e(b.status)}</span>
                                    <span class="sub-issue-id">${b.identifier}</span>
                                    <span class="sub-issue-title">${m(b.title)}</span>
                                    ${b.estimate!=null?`<span class="sub-issue-estimate">${b.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(r.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${U.length===0&&I.length===0&&G.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${I.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${I.map(b=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${_e(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(b.related_issue_id)}" data-identifier="${p(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${m(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(b.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${U.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${U.map(b=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${_e(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(b.related_issue_id)}" data-identifier="${p(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${m(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(b.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${G.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${G.map(b=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${_e(b.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(b.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(b.related_issue_id)}" data-identifier="${p(b.related_issue_identifier)}" class="relation-link">${b.related_issue_identifier}</a>
                                            <span class="relation-title">${m(b.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(b.id)}" title="Remove relation">
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
                            <h3>Comments${w.length>0?` <span class="section-count">(${w.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${o?`
                                <div class="comments-error">
                                    Comments failed to load.
                                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${p(r.id)}">Retry</button>
                                </div>
                            `:""}
                            ${w.length===0?o?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:w.map(b=>{var H;return`
                                <div class="comment ${b.is_attestation?"comment-attestation":""} ${b.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${b.is_attestation?"avatar-attestation":""}">${b.is_attestation?b.is_pending?"⏳":"✓":(b.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(b.author_name||"User")}</span>
                                            ${b.author?An(b.author):Eo((H=zt(b.author_id))==null?void 0:H.is_agent)}
                                            ${b.is_attestation?`<span class="comment-ritual-badge">${b.is_pending?"Pending approval — ":""}Ritual: ${m(b.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Xe(b.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Gd(b.content)}</div>
                                    </div>
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${c.length>0?` <span class="section-count">(${c.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${c.length===0?R({icon:j.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):c.map(b=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Xo(b.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Jo(b)}</span>
                                        <span class="activity-actor">by ${m(Qo(b))} ${An(b.user)}</span>
                                        <span class="activity-time">${Xe(b.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${p(r.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${p(r.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${_e(r.status)}
                                <span>${he(r.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(r.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${rt(r.priority)}
                                <span>${Me(r.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(r.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${r.issue_type||"task"}">${gt(r.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(r.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${ce?`${Cn(V,"avatar-small")}<span>${m(ce)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(r.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${se?m(se.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(r.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${r.labels&&r.labels.length>0?r.labels.map(b=>`
                                        <span class="issue-label" style="background: ${Q(b.color)}20; color: ${Q(b.color)}">${m(b.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${Se?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(Se.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(r.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Sr(r.estimate,r.project_id)?" out-of-scale":""}" ${Sr(r.estimate,r.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${$a(r.estimate,r.project_id)}</span>
                            </button>
                        </div>

                        ${r.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(r.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${m(r.creator_name||"Unknown")} ${An(r.creator)}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(r.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${p(r.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${p(r.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(r.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,ia&&ia.abort(),ia=new AbortController;const{signal:re}=ia,Ot=document.querySelector(".sidebar-overflow-trigger"),xn=document.querySelector(".overflow-menu-dropdown");if(Ot&&xn){const b=()=>{xn.classList.add("hidden"),Ot.setAttribute("aria-expanded","false")},H=()=>{const Te=xn.classList.toggle("hidden");Ot.setAttribute("aria-expanded",String(!Te))};Ot.addEventListener("click",H,{signal:re}),document.addEventListener("click",Te=>{!Ot.contains(Te.target)&&!xn.contains(Te.target)&&b()},{signal:re}),xn.addEventListener("keydown",Te=>{Te.key==="Escape"&&(Te.stopPropagation(),b(),Ot.focus())},{signal:re})}zd(r.id),zo("new-comment","mention-suggestions",{projectId:r.project_id}),Hd({signal:re});const ut=document.getElementById("new-comment");if(ra=!1,ut){ut.addEventListener("compositionstart",()=>{ra=!0},{signal:re}),ut.addEventListener("compositionend",()=>{ra=!1},{signal:re});const b=wc(r.id);b&&(ut.value=b),ut.addEventListener("input",()=>{Ps(r.id,ut.value)}),ut.addEventListener("keydown",H=>{var Te;H.key==="Enter"&&(H.metaKey||H.ctrlKey)&&(H.preventDefault(),(Te=ut.closest("form"))==null||Te.requestSubmit())})}Yi=tt?tt.id:null,Zi=Et?Et.id:null;const de=b=>{var ae;if((b.metaKey||b.ctrlKey)&&b.shiftKey&&(b.key===">"||b.key==="."||b.code==="Period")&&na()){b.preventDefault();return}if(b.metaKey||b.ctrlKey||b.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||b.target.tagName==="INPUT"||b.target.tagName==="TEXTAREA"||b.target.tagName==="SELECT"||b.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||Oi())return;if(b.key==="ArrowLeft"&&Yi)b.preventDefault(),te(Yi);else if(b.key==="ArrowRight"&&Zi)b.preventDefault(),te(Zi);else if(b.key==="c"){b.preventDefault(),b.stopImmediatePropagation();const nt=document.getElementById("new-comment");nt&&(nt.focus(),nt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else b.key==="j"?(b.preventDefault(),b.stopImmediatePropagation(),la(1)):b.key==="k"?(b.preventDefault(),b.stopImmediatePropagation(),la(-1)):b.key==="d"&&(b.preventDefault(),(ae=document.querySelector('[data-action="edit-description"]'))==null||ae.click());const Te={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[b.key];if(Te){const nt=document.querySelector(`.property-row[data-field="${Te}"]`);nt&&(b.preventDefault(),nt.click())}};if(document.addEventListener("keydown",de,{signal:re}),D){const b=document.getElementById(D.id);if(b&&(b.focus({preventScroll:!0}),typeof D.start=="number"&&typeof b.setSelectionRange=="function"))try{b.setSelectionRange(D.start,D.end)}catch{}}return _!==null&&window.scrollTo(0,_),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{E("load issue",a);const o=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");o&&i===oa&&(o.innerHTML=R({icon:j.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"}))}return"failed"}}async function tv(e,t){if(e.preventDefault(),Wo)return!1;const n=document.getElementById("new-comment").value;Ps(t,null),Wo=!0;try{const i=await y.createComment(t,n);$("Comment added!","success"),$o(i),await te(t)}catch(i){Ps(t,n),E("add comment",i)}finally{Wo=!1}return!1}async function nv(e){const t=Re()||await y.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=qs(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=$c(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}zo("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?dn(e,c,t.description||""):dn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Yd()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(dn(e,null),Yo){te(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Gn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var h,v;if(Ko)return;const c=(h=document.getElementById("edit-description"))==null?void 0:h.value;if(c===void 0)return;const d=sa?sa.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Ko=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await y.updateIssue(e,{description:c}),dn(e,null),$("Description updated","success"),await te(e,!1),window.scrollTo(0,f),(v=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||v.focus()}catch(w){E("update description",w)}finally{Ko=!1,u&&(u.disabled=!1)}})}function Yd(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Gn(n):'<span class="text-muted">Nothing to preview.</span>'}function iv(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Yd():i.focus()}function sv(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,F(),document.getElementById("relation-issue-search").focus()}async function av(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,o=(await y.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function ov(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function rv(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function lv(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await y.createRelation(i,t,"blocks"):await y.createRelation(t,i,n),N(),$("Relation added","success"),te(t)}catch(s){E("add relation",s)}return!1}async function cv(e,t){try{await y.deleteRelation(e,t),$("Relation removed","success"),te(e)}catch(n){E("remove relation",n)}}function la(e){const t=Re();if(!t)return;const n=Ci();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||te(n[s].id)}ee({"retry-issue-comments":(e,t)=>{te(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{sh(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||nv(t.issueId)},"toggle-section":(e,t)=>{Yh(t.section)},"toggle-ticket-rituals":()=>{Zh()},"save-comment":(e,t)=>{tv(e,t.issueId)},"show-add-relation-modal":(e,t)=>{sv(t.issueId)},"remove-relation":(e,t)=>{cv(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Mh(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{lv(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{av(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{ov(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{rv()},"set-description-editor-mode":(e,t)=>{iv(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>la(-1),"navigate-next-issue":()=>la(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Rd(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Uh(t.issueId)}});function Zd(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let zn=[],Qi=[],ca=null,ie=new Set,Vn="list",hn=!1,nr=null,da=null,ir=null,sr=null,Xd=null;function Qd(e){if(Xd!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const ar=xf();(ar==="list"||ar==="grid")&&(Vn=ar);function Jd(e){if(e!=="list"&&e!=="grid")return;Vn=e,e==="grid"&&hn&&or(),If(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Qt()}function eu(){if(Vn!=="list")return;hn=!0,ie.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Qt(),Kn()}function or(){hn=!1,ie.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Qt(),Kn()}function dv(){nr&&clearTimeout(nr),nr=setTimeout(()=>{Qt()},300)}function uv(){const e=document.getElementById("doc-search");e&&(e.value=""),Qt()}async function pv(){Qe(null)}async function mv(){const e=document.getElementById("doc-search");e&&(e.value=""),Qe(null)}function fv(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=K()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Z().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function gv(){return zn}function Qt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";fv(),Qi=zn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Qi.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),kv("",Vn)}let Wn=0;async function hv(){var i;const e=ca||((i=L())==null?void 0:i.id);if(!e)return;const t=++Wn,n=K()||null;try{const s=await y.getDocuments(e,n);if(t!==Wn)return;zn=s,Qt()}catch(s){if(t!==Wn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=R({icon:j.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}st(e=>{e==="currentProject"&&A()==="documents"&&hv()});async function vn(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;ca=e,Ac(-1);const n=++Wn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=K()||null);try{const a=await y.getDocuments(e,t);if(n!==Wn)return;zn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",Vn==="list"),r.classList.toggle("active",Vn==="grid")),Qt()}catch(a){if(n!==Wn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=R({icon:j.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",a)}}function tu(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=ca||((n=L())==null?void 0:n.id);e&&vn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function nu(e){Qd(e)&&xe(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function vv(e,t){Qd(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),P("documents"))}function yv(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${Q(t.color)}20; color: ${Q(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function bv(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${yv(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(Zd(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function wv(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${Q(r.color)}20; color: ${Q(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Zd(e.content).substring(0,80):"No content",s=hn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ie.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${hn&&ie.has(e.id)?" selected":""}" data-action="${hn?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function kv(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;ie.clear(),Kn();const i=Qi;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=K(),f=d||u;n.innerHTML=R({icon:f?j.search:j.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?bv:wv,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=Z();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const h=r.find(v=>v.id===d.project_id);f=h?h.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function $v(e){ie.has(e)?ie.delete(e):ie.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ie.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ie.has(e)),Kn()}function Ev(){Qi.forEach(e=>ie.add(e.id)),Qi.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Kn()}function iu(){ie.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ie.clear(),Kn()}function Kn(){const e=document.getElementById("doc-bulk-actions");e&&(hn?(e.classList.remove("hidden"),ie.size>0?e.innerHTML=`
        <span class="bulk-count">${ie.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function _v(){if(ie.size===0){$("No documents selected","error");return}const t=Z().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ie.size} Document${ie.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ie.size} selected document${ie.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,F()}async function xv(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ie);let i=0;const s=[];for(const l of n)try{await y.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=zn.find(d=>d.id===l))==null?void 0:o.title)||l)}N(),iu(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=L())==null?void 0:r.id;return await vn(a),!1}async function Iv(){var a,o;if(ie.size===0){$("No documents selected","error");return}const e=ie.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ie);let n=0;const i=[];for(const r of t)try{await y.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=zn.find(c=>c.id===r))==null?void 0:a.title)||r)}or(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=L())==null?void 0:o.id;await vn(s)}async function Sv(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await y.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${m(s.author_name||"Unknown")}</span>
                ${An(s.author)}
                <span class="comment-date">${Xe(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Gd(s.content)}</div>
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
    `}}function Tv(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=wc(e);s&&(i.value=s),i.addEventListener("input",()=>{Ps(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),zo("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function xe(e,t=!0){try{t&&yn();const n=await y.getDocument(e);Xd=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(I=>I.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Sv(n);let a=null,o=null,r=!1;if(n.project_id){const G=Z().find(z=>z.id===n.project_id);if(a=G?G.name:null,n.sprint_id)try{const z=await y.getSprint(n.sprint_id);o=z?z.name:null}catch(z){console.error("Failed to load sprint name:",z),r=!0}}let l=n.content||"";const c=W.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=gv(),u=d.findIndex(I=>I.id===n.id),f=u>0?d[u-1]:null,h=u>=0&&u<d.length-1?d[u+1]:null,v=u>=0,w=A()||"documents",k=n.labels&&n.labels.length>0?n.labels.map(I=>`
          <span class="issue-label" style="background: ${Q(I.color)}20; color: ${Q(I.color)}">
            ${m(I.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(I.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const I=await y.getDocumentIssues(n.id);I.length>0&&(S=I.map(G=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(G.identifier)}</span>
            <span class="linked-item-title">${m(G.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(G.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(I){console.error("Failed to load linked issues:",I),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${p(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${h?`data-action="view-document" data-document-id="${p(h.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${l?Gn(l):'<p class="text-muted">No content</p>'}</div>

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
                ${k}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${m(n.author_name||"Unknown")} ${An(n.author)}</span>
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
    `,da&&da.abort(),da=new AbortController;const{signal:T}=da,D=i.querySelector(".sidebar-overflow-trigger"),_=i.querySelector(".overflow-menu-dropdown");if(D&&_){const I=()=>{_.classList.add("hidden"),D.setAttribute("aria-expanded","false")},G=()=>{const z=_.classList.toggle("hidden");D.setAttribute("aria-expanded",String(!z))};D.addEventListener("click",G,{signal:T}),document.addEventListener("click",z=>{!D.contains(z.target)&&!_.contains(z.target)&&I()},{signal:T}),_.addEventListener("keydown",z=>{z.key==="Escape"&&(I(),D.focus())},{signal:T})}Tv(n.id,T,n.project_id||null),Hd({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:T}),ir=f?f.id:null,sr=h?h.id:null;const U=I=>{if((I.metaKey||I.ctrlKey)&&I.shiftKey&&(I.key===">"||I.key==="."||I.code==="Period")&&na("new-doc-comment")){I.preventDefault();return}I.metaKey||I.ctrlKey||I.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||I.target.tagName==="INPUT"||I.target.tagName==="TEXTAREA"||I.target.tagName==="SELECT"||I.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(I.key==="ArrowLeft"&&ir?(I.preventDefault(),xe(ir)):I.key==="ArrowRight"&&sr&&(I.preventDefault(),xe(sr)))};document.addEventListener("keydown",U,{signal:T})}catch(n){E("load document",n)}}async function ua(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await y.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${m(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function rr(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${m(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function Lv(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Gn(r):'<span class="text-muted">Nothing to preview.</span>'}}function lr(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=_c(e);if(o){const l=$f(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Ns(e,null);return}Ns(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function su(){Ji=null;const e=Z(),t=$u()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${rr("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,F(),lr("new"),t&&await ua("doc-sprint",t,null,!0)}let Ji=null;async function Cv(e,t,n){Ji=n||null;const s=Z().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${rr("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,F(),lr("new"),t&&await ua("doc-sprint",t,e)}async function Av(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await y.createDocument(t,s),Ns("new",null),await vn(t),N(),$("Document created!","success"),Ji){const o=Ji;Ji=null,o()}}catch(o){E("create document",o)}return!1}let cr=null,es=null,dr=!1;async function au(e){try{const t=await y.getDocument(e);cr=e,es={title:t.title||"",content:t.content||""},dr=!1;const i=Z().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${rr("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,F(),lr(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await ua("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function Bv(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&cr===t&&es&&!dr){let o=null;try{o=await y.getDocument(t)}catch{}if(o&&((o.title||"")!==es.title||(o.content||"")!==es.content))return dr=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await y.updateDocument(t,s),cr=null,es=null;const o=_c(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Ns(t,null),N(),await xe(t),$("Document updated!","success")}catch(o){E("update document",o)}return!1}async function Dv(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await y.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await vn(n),P("documents"),$("Document deleted!","success")}catch(n){E("delete document",n)}}function jv(e,t){ua(e,t)}async function Mv(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,F()}async function Rv(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,a=await y.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Pv(e,t){try{await y.linkDocumentToIssue(e,t),N(),$("Issue linked!","success"),await xe(e,!1)}catch(n){E("link issue",n)}}async function qv(e,t){if(confirm("Unlink this issue from the document?"))try{await y.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await xe(e,!1)}catch(n){E("unlink issue",n)}}let ur=!1;async function Nv(e,t){if(e.preventDefault(),ur)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;ur=!0;try{const s=await y.createDocumentComment(t,i);n.value="",$("Comment added!","success"),$o(s),await xe(t,!1)}catch(s){E("add comment",s)}finally{ur=!1}return!1}async function Ov(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await y.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,F();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${Q(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,F()}catch(i){E("load labels",i)}}async function Hv(e,t){try{await y.addLabelToDocument(e,t),N(),$("Label added!","success"),await xe(e,!1)}catch(n){E("add label",n)}}async function Fv(e,t){try{await y.removeLabelFromDocument(e,t),$("Label removed!","success"),await xe(e,!1)}catch(n){E("remove label",n)}}ee({"view-document":(e,t)=>{e.preventDefault(),xe(t.documentId)},"set-doc-editor-mode":(e,t)=>{Lv(t.target,t.mode)},"retry-load-documents":()=>{vn(ca)},"retry-document-comments":(e,t)=>{xe(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{$v(t.docId)},"clear-doc-search":()=>{uv()},"clear-doc-project-filter":()=>{pv()},"clear-all-doc-filters":()=>{mv()},"show-bulk-move-modal":()=>{_v()},"bulk-delete-documents":()=>{Iv()},"select-all-docs":()=>{Ev()},"clear-doc-selection":()=>{iu()},"exit-selection-mode":()=>{or()},"enter-selection-mode":()=>{eu()},"handle-bulk-move":e=>{xv(e)},"unlink-document-issue":(e,t)=>{qv(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Mv(t.documentId)},"add-document-comment":(e,t)=>{Nv(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Fv(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Ov(t.documentId)},"show-edit-document-modal":(e,t)=>{au(t.documentId)},"delete-document":(e,t)=>{Dv(t.documentId)},"create-document":e=>{Av(e)},"update-doc-sprint-dropdown":(e,t,n)=>{jv(t.sprintSelect,n.value)},"update-document":(e,t)=>{Bv(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Rv(n.value,t.documentId)},"link-to-issue":(e,t)=>{Pv(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Hv(t.documentId,t.labelId)}});let Jt=[],pa={},ma=new Set,jt=null,pr=null,fa=[],ts=[],mr=[];function ga(){return pa}function Uv(){return pr}function Gv(){return jt}st(e=>{e==="currentProject"&&A()==="sprints"&&en()});let fr=0;async function en(){Dc(-1);const e=K();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++fr;ry();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await y.getCurrentSprint(e);const i=await y.getSprints(e);if(t!==fr)return;Jt=i,zv(),await ha()}catch(i){return t!==fr?void 0:(n&&(n.innerHTML=R({icon:j.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",i),!1)}return!0}function zv(){const e=document.getElementById("sprints-list");if(!e)return;const t=Jt.find(a=>a.status==="active"),n=Jt.find(a=>a.status==="planned"),i=Jt.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Vv(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
                <div class="sprint-card-budget">${o}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(n.id)}" data-sprint-name="${p(n.name)}" data-budget="${n.budget||""}" data-project-id="${p(n.project_id)}">Edit Sprint</button>
                    ${n.budget_explicit===!0?`
                        <button class="btn btn-secondary btn-small" data-action="follow-default-budget" data-sprint-id="${p(n.id)}" title="Drop the hand-set budget: this sprint takes the project default and follows later changes to it">Follow project default</button>
                    `:""}
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
        `),e.innerHTML=s||R({icon:j.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function ou(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${br(e.activated_at)}, closed ${br(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${br(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Vv(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${m(ou(e))||"not yet activated"}</span>
                    <span>${m(r)}</span>
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
    `}let gr=0;async function Yn(e,t=!0){var n;try{t&&yn();const i=++gr,s=A(),a=await y.getSprint(e);if(i!==gr)return;if(!a){$("Sprint not found","error"),P("sprints");return}pr=a;const o=(n=L())==null?void 0:n.id,[r,l,c]=await Promise.all([y.getIssues({sprint_id:e,limit:500}),y.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?y.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==gr)return;fa=r,mr=l,ts=c,A()===s&&un(fa),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Kv()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),P("sprints")}}async function Wv(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),P("sprints",!1);return}try{await Yn(e,!1)}catch{P("sprints",!1)}}function Kv(){const e=pr,t=fa;document.querySelectorAll(".view").forEach(h=>h.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(h=>ji.includes(h.status)),a=t.filter(h=>h.status==="done"),o=t.filter(h=>h.status==="canceled"),r=h=>h.reduce((v,w)=>v+(w.estimate||0),0),l=r(t.filter(h=>h.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${u}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${m(ou(e))}
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
                ${s.length===0?R({icon:j.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(h=>hr(h)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?R({icon:j.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(h=>hr(h)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(h=>hr(h)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Zv()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${ts.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${ts.length>0?`
                    <div class="sprint-issues-list">
                        ${ts.map(h=>Yv(h)).join("")}
                    </div>
                `:R({icon:j.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function hr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...qc,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${dy(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Yv(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Xe(e.created_at)}</span>
            </span>
        </div>
    `}function Zv(){const e=mr;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Xv(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Xv(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Qv(e,t,n,i){const s=i?My(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(i)}" data-current-budget="${p(n??"")}">
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
    `,F()}async function Jv(e,t,n){var u,f,h,v;e.preventDefault();const i=(f=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((h=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:h.value)||"this",r=(v=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:v.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Jt.find(w=>w.id===t);try{const w={};i&&(w.name=i);const k=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!k&&(w.budget=a),Object.keys(w).length&&await y.updateSprint(t,w),o==="planned"){const T=Jt.filter(D=>D.status==="planned"&&D.id!==t);for(const D of T)await y.updateSprint(D.id,{budget:a})}o==="default"&&n&&await y.updateProject(n,{default_sprint_budget:a}),await en(),N(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(w){E("update budget",w)}return!1}const ru="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function ey(e,t=null){const n=Jt.find(c=>c.id===e),i=n?Z().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${ru}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await y.updateSprint(e,{budget_follows_default:!0})}catch(c){E("reset budget to project default",c),t&&(t.disabled=!1);try{await en()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await en()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(ru,"warning")}async function ty(e){const t=Jt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,F();const n=ji;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([y.getIssues({sprint_id:e,limit:500}),y.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function ny(e){try{const t=await y.closeSprint(e);await en(),du(),t.limbo?sy(t):$("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function ha(){const e=K();if(e)try{jt=await y.getLimboStatus(e),iy()}catch(t){console.error("Failed to load limbo status:",t)}}function iy(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!jt||!jt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${jt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function sy(e){const t=K();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,F(),ay(t)}async function ay(e){try{const t=await y.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(i.name)} <span class="ritual-mode">(${m(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${lt(i.prompt)}</div>
                    ${yr(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function vr(){var t,n;if(!jt)return;const e=K();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${jt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${m(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${lt(i.prompt)}</div>
                        ${yr(i.attestation)}
                        ${oy(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=jt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${jt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(i.name)}</div>
                            ${yr(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,F()}function yr(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Xe(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${lt(e.note)}</div>
        </div>
    `}function oy(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function lu(e){for(const t of e)if(!ma.has(t))try{(await y.getSprints(t)).forEach(i=>{pa[i.id]=i}),ma.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function ry(){pa={},ma=new Set,fa=[],mr=[],ts=[],va={}}function ly(e,t){t.forEach(n=>{pa[n.id]=n}),ma.add(e)}let va={};function cy(e){return va[e]}function cu(e,t){va[e]=t??null}function du(){va={}}ee({"retry-load-sprints":()=>en(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Yn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Qv(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{ey(t.sprintId,n)},"show-limbo-details-modal":()=>{vr()},"show-close-sprint-confirmation":(e,t)=>{ty(t.sprintId)},"handle-update-budget":(e,t)=>{Jv(e,t.sprintId,t.projectId)},"close-modal":()=>{N()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,N(),ny(t.sprintId)},"dismiss-limbo-modal":()=>{N(),ha()},"approve-ritual":(e,t)=>{fy(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{pu(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}te(t.issueId)},"create-sprint-document":async(e,t)=>{await Cv(t.sprintId,t.projectId,()=>{Yn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}xe(t.documentId)}});function br(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function dy(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}st(e=>{e==="currentProject"&&A()==="rituals"&&wr()});let uu=0;async function wr(){const e=K(),t=document.getElementById("rituals-content"),n=++uu;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=R({icon:j.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Fy(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await ss();n===uu&&!i&&t&&(t.innerHTML=R({icon:j.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function uy(){ku(py),wr()}function py(){const e=document.getElementById("rituals-content"),t=Uy(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Qn("rv-sprint-rituals-list",n,"sprint"),Qn("rv-close-rituals-list",i,"close"),Qn("rv-claim-rituals-list",s,"claim")}function my(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function fy(e,t){try{await y.approveAttestation(e,t),$("Ritual approved!","success"),await ha(),vr()}catch(n){E("approve ritual",n)}}function kr(e){return e==="document"?`
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
        `:""}function $r(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function pu(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${kr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{gy(s,e,t,i)}),F()}async function gy(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=$r(i);if(a===void 0)return!1;try{await y.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await ha();const o=Gv();o&&!o.in_limbo?(N(),$("Limbo cleared! Next sprint is now active.","success")):vr()}catch(o){E("complete gate ritual",o)}return!1}function hy(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function vy(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${m(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${kr(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{yy(o,e,t,s,a)}),F()}async function yy(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=$r(i);if(o===void 0)return!1;try{await y.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),N(),await Xi(n)}catch(r){E("attest ticket ritual",r)}return!1}async function by(e,t){try{await y.attestTicketRitual(e,t),$("Ritual attested!","success"),await Xi(t)}catch(n){E("attest ticket ritual",n)}}async function wy(e,t){try{await y.approveTicketRitual(e,t),$("Ritual approved!","success"),await Xi(t)}catch(n){E("approve ticket ritual",n)}}function ky(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${m(e.rejected_by_name||"Someone")}:</strong> ${m(e.note||"")}</div>`}function mu(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{$y(s,e,t,n,i)}),F()}async function $y(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await y.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),N(),s&&await s()}catch(o){E("reject ritual",o)}return!1}function Ey(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${kr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{_y(s,e,t,i)}),F()}async function _y(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=$r(i);if(a===void 0)return!1;try{await y.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),N(),await Xi(n)}catch(o){E("complete ticket ritual",o)}return!1}ee({"show-create-ritual-modal":(e,t)=>{Iu(t.trigger)},"approve-ticket-ritual":(e,t)=>{wy(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{mu(t.ritualId,t.issueId,t.ritualName,()=>Xi(t.issueId))},"complete-ticket-ritual":(e,t)=>{Ey(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{vy(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{by(t.ritualId,t.issueId)},"retry-load-rituals":()=>wr()});function lt(e){if(!e)return"";try{W.setOptions({breaks:!0,gfm:!0});const n=W.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return vc.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ns(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function xy(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${ns(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{Iy(c,e,t,n)}),F(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function Iy(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await y.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),N(),wt()}catch(a){E("complete gate ritual",a)}}function Sy(e,t,n,i,s,a,o,r){xy(e,t,n,i,s,a,o,r)}function Ty(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${ns(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${lt(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Ly(d,e,t,n)}),F(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Ly(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await y.approveTicketRitual(t,n);let r=null;if(s)try{r=await y.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),$o(r),N(),wt()}catch(r){E("approve review ritual",r)}}function Cy(e,t,n,i,s,a,o,r,l){Ty(e,t,n,i,s,a,o,r,l)}st(e=>{e==="currentProject"&&A()==="approvals"&&wt()});let Er=[],_r=0;async function wt(){if(!L())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++_r;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=K(),i=n?Z().filter(r=>r.id===n):Z(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([y.getPendingApprovals(r.id),y.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==_r)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}zf(a),Er=o,fu()}catch(n){if(t!==_r)return;e.innerHTML=R({icon:j.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),E("load approvals",n)}}function fu(){const e=document.getElementById("approvals-list");if(!e)return;const t=Gf(),n=Er.length>0,i=!Sf();if(t.length===0&&!n){i?e.innerHTML=`
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
            `:e.innerHTML=R({icon:j.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Er.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const h=f.attestation&&!f.attestation.approved_at,v=h?"⏳":"○",w=h?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',k=h?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(f.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(f.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(f.name)}"
                                                data-ritual-artifact="${p(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${v} ${m(f.name)}
                                                    <span class="badge badge-ritual-${p(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
                                                ${w}
                                            </div>
                                            ${k}
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
                    ${r.map(xr).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(xr).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(xr).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Sy(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var h;d.disabled=!0;const u=(h=d.closest(".gate-ritual-actions"))==null?void 0:h.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await y.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await wt()}catch(v){d.disabled=!1,u&&(u.disabled=!1),E("approve review ritual",v)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Cy(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;mu(u.ritualId,u.issueId,u.ritualName,()=>wt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await y.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await wt()}catch(u){d.disabled=!1,E("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{pu(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function Ay(){Tf(),fu()}function xr(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(i.requested_by_name)}</strong>${i.requested_at?` (${ns(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${lt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${m(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${ns(i.rejected_at)})`:""}: ${m(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
                        data-ritual-id="${p(i.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(i.ritual_name)}">Reject</button>`,f=s?`<div class="gate-ritual-actions">
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
                    ${u}
                </div>`:`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${p(i.ritual_id)}"
                    data-issue-id="${p(e.issue_id)}"
                    data-ritual-name="${p(i.ritual_name)}"
                    data-ritual-prompt="${p(i.ritual_prompt)}"
                    data-issue-identifier="${p(e.identifier)}"
                    data-issue-title="${p(e.title)}"
                    data-requested-by="${p(i.requested_by_name||"")}"
                    data-requested-at="${p(i.requested_at||"")}">Complete</button>
                    ${c?"":u}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${m(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${d}
                </div>
                ${f}
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
    `}ee({"view-issue-from-modal":(e,t)=>{e.preventDefault(),N(),te(t.issueId)},"dismiss-approvals-explainer":()=>{Ay()},"retry-load-approvals":()=>wt()});const ya={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},ba={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let gu=0;function hu(e){gu=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=vu(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function vu(e="",t="",n=""){const i=gu++,s=Object.keys(ya).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?ya[e]:ya.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${ba[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${p(String(r))}" placeholder="Value"${l?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function By(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",vu()),wa()}function Dy(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),wa()}function jy(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=ya[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${ba[o]}</option>`).join(""),yu(e),wa()}function yu(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function is(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function wa(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function bu(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw is("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw is("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw is(`Duplicate condition: ${r} ${ba[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw is(`Please enter a numeric value for ${r} ${ba[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw is(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return wa(),Object.keys(t).length>0?t:null}ee({"add-condition-row":()=>{By()},"remove-condition-row":(e,t)=>{Dy(Number(t.rowId))},"update-operator-options":(e,t)=>{jy(Number(t.rowId))},"toggle-value-input":(e,t)=>{yu(Number(t.rowId))}});let be=[],Ir=null;const wu=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];st((e,t)=>{e==="currentProject"&&(t&&hf(t),wu.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Jy(t||""))});const ka={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function ku(e){Ir=e}function Z(){return be}function Zn(e){const t=be.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return ka[n]||ka.fibonacci}function $a(e,t){if(e==null)return"No estimate";const i=Zn(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Sr(e,t){return e==null||e===0?!1:!Zn(t).some(i=>i.value===e)}function My(e){const t=be.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(ka[n]||ka.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function Je(){if(L())try{be=await y.getProjects(L().id),Ry();const e=K();if(e&&be.some(i=>i.id===e))return;const t=Tr();if(t&&be.some(i=>i.id===t)){Qe(t);return}const n=bc();if(n&&be.some(i=>i.id===n)){Qe(n);return}be.length>0&&Qe(be[0].id)}catch(e){E("load projects",e)}}function Ry(){const e='<option value="">All Projects</option>'+be.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+be.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=K();wu.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function $u(){return bc()}function Xn(){const e=document.getElementById("projects-list");if(be.length===0){e.innerHTML=R({icon:j.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=be.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${Q(t.color)}20; color: ${Q(t.color)}">
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
    `).join("")}function Py(e){Qe(e),P("issues")}function Eu(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function qy(e){e.preventDefault();const t=L();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await y.createProject(t.id,n),await Je(),Xn(),N(),$("Project created!","success")}catch(i){E("create project",i)}return!1}async function Ny(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await y.updateProject(t,n),await Je(),Xn(),N(),$("Project updated!","success")}catch(i){E("update project",i)}return!1}async function Oy(e){const t=be.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await y.deleteProject(e),await Je(),Xn(),N(),$("Project deleted","success")}catch(n){E("delete project",n)}}let Oe=null;async function _u(e){Oe=e,be.length===0&&await Je();const t=be.find(n=>n.id===e);if(!t){$("Project not found","error"),P("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),xu("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function xu(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Mt||Mt.length===0)&&ss()}function Hy(){Oe=null,Mt=[]}function Fy(e){Oe=e}function Uy(){return Mt}async function Gy(){if(!Oe)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await y.updateProject(Oe,t),await Je(),$("Settings saved","success");const n=be.find(i=>i.id===Oe);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function zy(){if(!Oe)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await y.updateProject(Oe,n),await Je(),$("Settings saved","success")}catch(i){E("save settings",i)}}let Mt=[];async function ss(){if(!Oe)return!1;try{return Mt=await y.getRituals(Oe),Vy(),typeof Ir=="function"&&Ir(),!0}catch(e){return E("load rituals",e),!1}}function Vy(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Mt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Mt.filter(i=>i.trigger==="ticket_close"),n=Mt.filter(i=>i.trigger==="ticket_claim");Qn("ps-sprint-rituals-list",e,"sprint"),Qn("ps-close-rituals-list",t,"close"),Qn("ps-claim-rituals-list",n,"claim")}function Qn(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${lt(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${m(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${m(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${p(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${p(a.id)}" data-ritual-name="${p(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function Iu(e){if(!Oe)return;let t=[];try{t=await y.getRitualGroups(Oe)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${hu(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,F()}function Wy(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Ky(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Su(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await y.createRitualGroup(Oe,{name:t,selection_mode:n})).id}return e.value||null}async function Yy(e){var s;e.preventDefault();let t;try{t=bu()}catch{return!1}let n;try{n=await Su()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await y.createRitual(Oe,i),await ss(),N(),$("Ritual created!","success")}catch(a){E("create ritual",a)}return!1}async function Zy(e){const t=Mt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await y.getRitualGroups(Oe)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${hu(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,F()}async function Xy(e,t){var a;e.preventDefault();let n;try{n=bu()}catch{return!1}let i;try{i=await Su()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await y.updateRitual(t,s),await ss(),N(),$("Ritual updated!","success")}catch(o){E("update ritual",o)}return!1}async function Qy(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await y.deleteRitual(e),await ss(),$("Ritual deleted","success")}catch(n){E("delete ritual",n)}}ee({"view-project":(e,t)=>{Py(t.projectId)},"view-project-settings":(e,t)=>{_u(t.projectId)},"create-project":e=>{qy(e)},"update-project":(e,t)=>{Ny(e,t.projectId)},"confirm-delete-project":(e,t)=>{Oy(t.projectId)},"edit-project-ritual":(e,t)=>{Zy(t.ritualId)},"delete-project-ritual":(e,t)=>{Qy(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Yy(e)},"update-project-ritual":(e,t)=>{Xy(e,t.ritualId)},"toggle-ritual-conditions":()=>{Wy()},"ritual-group-change":()=>{Ky()}});function Tr(){const t=new URLSearchParams(window.location.search).get("project");return t||$u()}function Jy(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Lr={},Tu=new Map;let Cr=null,Ar=null,Br=null,Dr=null,jr=null,Mr=null,Lu=!1;function eb(e){Object.assign(Lr,e)}function tb({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a}={}){e&&(Cr=e),t&&(Ar=t),n&&(Br=n),i&&(Dr=i),s&&(jr=s),a&&(Mr=a)}function nb(){return Object.keys(Lr)}const ib=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],sb={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects"};function Cu(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function P(e,t=!0,{transition:n=!1}={}){if(t&&yn(),qf(e),t){let a;const o=Tr();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:ib.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Cu(e),Cr&&Cr();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Lr[e];s&&s(),t&&window.scrollTo(0,0)}function Au(){var i;const t=window.location.pathname.split("/").filter(Boolean);Dr&&Dr();let n="my-issues";if(t.length===0||t[0]==="")P("my-issues",!1);else if(Ar&&Ar(t)){const s=sb[t[0]];s&&Cu(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),nb().includes(n)?P(n,!1):(n="my-issues",P("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function yn(){Tu.set(window.location.href,window.scrollY)}function Bu(e){yn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),jr&&jr(e)}function Du(e){yn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Mr&&Mr(e)}function ju(){const e=Tu.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function ab(){Lu||(Lu=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Br&&Br(e.state)){ju();return}(t=e.state)!=null&&t.view?P(e.state.view,!1):Au(),ju()}))}let Rt=0,Jn=!1,as=null,Ea=null,os=0;const bn=new Map;function _a(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Rt===0&&!Jn),e.textContent=Jn?"Stopped":"Offline",e.title=Jn?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function He(e,t){return bn.has(e)||bn.set(e,new Set),bn.get(e).add(t),()=>{var n;return(n=bn.get(e))==null?void 0:n.delete(t)}}function ob(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const rb=1e3;function xa(){Ea&&(clearTimeout(Ea),Ea=null)}const lb="chaotic",Rr=4001,cb=4003,db="chaotic.bearer.";function ub(e){return[lb,db+e]}function Mu(e,{isReconnect:t=!1}={}){as&&(clearTimeout(as),as=null),xa();const n=Kf();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),xo(null)),!t&&(Rt>0||Jn)&&(Rt=0,Jn=!1,_a());const i=y.getToken();if(!i)return;const s=++os,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,ub(i));xo(r);let l=!1;const c=()=>{if(l||s!==os)return;l=!0,xa();const d=Rt>0;d&&$("Live updates reconnected","success"),Rt=0,_a(),d&&Pr({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===os&&(console.log("WebSocket connected"),xa(),Ea=setTimeout(c,rb))},r.onmessage=d=>{if(s!==os)return;c();let u;try{u=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}Pr(u)},r.onclose=d=>{if(s!==os)return;console.log("WebSocket disconnected"),xa();const u=d==null?void 0:d.code;if(u===Rr||u===cb){xo(null),Rt=0;const h=u===Rr&&yc()===i;Jn=!h,_a();let v="forbidden";u===Rr&&(v=h?"unauthorized":"superseded"),Pr({type:v,entity:"connection",data:{code:u,teamId:e}});return}Rt++,Rt===1&&$("Live updates disconnected. Reconnecting...","warning"),_a();const f=ob(Rt-1);as=setTimeout(()=>{as=null,L()&&L().id===e&&Mu(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Pr(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=bn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=bn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=bn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const pb={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device"};let ei=0,tn=!1,we=null,nn=null;const rs=new Set,kt=new Map,et=new Map;function Ru(e){kt.get(e)===null&&kt.set(e,ei)}function qr(e){const t=et.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=ei)}function mb(e){return e.filter(t=>!kt.has(t.id)).map(t=>{const n=et.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(tn&&et.has(t.id)&&t.id!==we))}function fb(e){for(const[t,n]of kt)n!==null&&e>n&&kt.delete(t);for(const[t,n]of et)n.confirmedAfter!==null&&e>n.confirmedAfter&&et.delete(t)}function gb(e,t){t!=null&&t.id&&(e==="archived"?(kt.has(t.id)||kt.set(t.id,null),Ru(t.id)):e==="read"&&qr(t.id))}async function ti(){const e=L();if(e){try{const t=await y.getInboxUnreadCount(e.id);Ai(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}ls()}}function ls(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Us();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function cs({focusFirst:e=!1,background:t=!1}={}){const n=L();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++ei;t||(nn={focusFirst:e||!!(nn!=null&&nn.focusFirst)},we=null,hb(i));try{const a=await y.getInbox(n.id,{unread:tn,limit:100});if(s!==ei)return;const o=new Set(kt.keys());fb(s);const r=mb(a||[]),l=nn;nn=null,l?(Gt(r),Sa(),l.focusFirst&&!Ze()&&bb()):vb(r,o)}catch(a){if(s!==ei)return;nn?(nn=null,i.innerHTML=R({icon:j.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",a)):console.error("Failed to refresh inbox:",a)}ti()}function hb(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function Nr(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Pu(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function qu(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Nu(e,t){if(!e)return;const n=Nr(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Pu(n||t)),i==null||i.focus({preventScroll:!0})}function vb(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ve(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=qu(),c=window.scrollY,d=n.scrollTop;let u=e;if(we&&!e.some(v=>v.id===we)){const v=i.find(w=>w.id===we);v&&tn&&!t.has(we)?(u=[...e],u.splice(Math.min(i.indexOf(v),u.length),0,v)):we=null}Gt(u),Sa();let f=-1;o&&(f=u.findIndex(v=>v.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?Ia(f,{focus:!1}):Fs(-1);const h=f>=0?n.querySelectorAll(".inbox-row")[f]:null;Nu(l,h),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function yb(e,t){if(!(t!=null&&t.id))return!1;const n=ve().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function ds(e){const t=ve();for(const n of new Set(e)){const i=Nr(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?qu():null,o=document.createElement("template");o.innerHTML=Fu(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Nu(a,r)}}function Ia(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Fs(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Fs(i),t&&Pu(n[i]).focus({preventScroll:!0})}function bb(){Ia(0)}async function Or(e){const t=ve(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;we===e&&(we=null),kt.set(e,null),Gt(t.filter(a=>a.id!==e)),s&&Ai(Math.max(0,Us()-1)),Sa(),ls(),Ia(n);try{await y.archiveInbox(e),Ru(e)}catch(a){kt.delete(e),console.error("Failed to archive inbox entry:",a)}}function Ou(e){var s,a;const n=ve().findIndex(o=>o.id===e);if(n===-1)return;const i=we;we=i===e?null:e,we===e&&wb(e),ds([i,e]),Ia(n),we===e&&((a=(s=Nr(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function wb(e){const t=ve(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,et.set(e,{readAt:i,confirmedAfter:null}),Gt([...t]),Ai(Math.max(0,Us()-1)),ls(),y.markInboxRead(e).then(()=>qr(e),s=>{var o;((o=et.get(e))==null?void 0:o.readAt)===i&&et.delete(e);const a=ve().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Gt([...ve()]),ds([e])),ti(),E("mark inbox entry read",s)})}function kb(){if(we===null)return!1;const e=we;return we=null,ds([e]),!0}function Hu(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function $b(e){if(rs.has(e))return;const t=ve().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";rs.add(e),Hu(e,!0);try{await y.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){rs.delete(e),Hu(e,!1),E(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}rs.delete(e),Or(e)}function Eb(){tn=!tn;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",tn),cs({focusFirst:!0})}function Fu(e){const t=!e.read_at,n=e.id===we,i=pb[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row list-item${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${p(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${p(o)}"`:""}>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${p(e.kind)}">${m(i)}</span>
                        ${s?`<span class="inbox-row-source">${m(s)}</span>`:""}
                        ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':""}
                    </span>
                    <span class="inbox-row-title">${m(e.title)}</span>
                    ${!n&&e.body?`<span class="inbox-row-body">${m(e.body)}</span>`:""}
                </button>
                ${n?_b(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-time">${m(ns(e.created_at))}</span>
                <button type="button" class="inbox-row-archive" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">&times;</button>
            </div>
        </div>
    `}function _b(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${m(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${rs.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${m(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${p(e.id)}"
                    ${e.issue_id?`data-issue-id="${p(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${p(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${p(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${p(n)}" role="region"
             aria-label="${p(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${m(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${m(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function Sa(){const e=document.getElementById("inbox-list");if(!e)return;const t=ve();if(t.length===0){e.innerHTML=R({icon:j.inbox,heading:tn?"No unread items":"Inbox zero",description:tn?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>Fu(n)).join("")}async function xb(e){var s;const t=ve().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();et.set(e,{readAt:n,confirmedAfter:null});try{await y.markInboxRead(e)}catch(a){((s=et.get(e))==null?void 0:s.readAt)===n&&et.delete(e);const o=ve().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Gt([...ve()]),ds([e])),console.error("Failed to mark inbox entry read:",a);return}qr(e);const i=ve().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Gt([...ve()]),Ai(Math.max(0,Us()-1)),ls(),ds([e])):ti()}async function Ib(){const e=L();if(e)try{await y.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ve())n.read_at||et.set(n.id,{readAt:t,confirmedAfter:ei});Gt(ve().map(n=>({...n,read_at:n.read_at||t}))),Ai(0),ls(),Sa()}catch(t){E("mark all inbox entries read",t)}}function Sb(e){e.entryId&&xb(e.entryId),e.issueId?te(e.issueId):e.documentId&&xe(e.documentId)}function Tb(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Or(e.dataset.entryId)}function Lb(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Ou(e.dataset.entryId)}const Cb='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function Ab(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(Cb);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function Bb(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ee({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&Bb((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||Ab(e.target,n)||(e.preventDefault(),t.entryId&&Ou(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),Sb(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&$b(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Or(t.entryId)},"toggle-inbox-unread-filter":()=>Eb(),"mark-all-inbox-read":()=>Ib(),"retry-load-inbox":()=>cs({focusFirst:!0})});let Ta=[],ni=[],Hr=[],Fr=[];function Db(){return Ta}function wn(){return ni}async function Ur(){try{Ta=await y.getMyTeams(),jb()}catch(e){E("load teams",e)}}function jb(){const e=document.getElementById("team-list");Ta.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ta.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function Gr(e,t=!1){Bi(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Mu(e.id),await Promise.all([Je(),Jb(),Rb(),$h(),ti()]),t?Au():P(A())}function Uu(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Mb(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Rb(){if(L())try{ni=await y.getTeamMembers(L().id),Gs(wn,zi),Mi()}catch(e){console.error("Failed to load team members:",e),E("load team members",e)}}function zr(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Vr=0;async function Wr(){if(!L())return;const e=++Vr,t=document.getElementById("team-members-list");t&&(t.innerHTML=zr());try{const n=await y.getTeamMembers(L().id);if(e!==Vr)return;ni=n,Gs(wn,zi),Mi(),Pb()}catch(n){if(e!==Vr)return;t&&(t.innerHTML=R({icon:j.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),ni=[],Gu(),E("load team members",n)}}function La(){var n;const e=(n=Ct())==null?void 0:n.id,t=ni.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Gu(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!La())}function Pb(){const e=document.getElementById("team-members-list"),t=La();Gu(),e.innerHTML=ni.map(n=>`
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
                ${t&&n.user_id!==Ct().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Kr=0;async function Ca(){if(!L())return;const e=++Kr,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=zr());try{const n=await y.getTeamInvitations(L().id);if(e!==Kr)return;Hr=n,qb()}catch(n){if(e!==Kr)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function qb(){const e=document.getElementById("team-invitations-list");if(Hr.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=La();e.innerHTML=Hr.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${p(n.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let Yr=0;async function zu(){if(!L())return;const e=++Yr,t=document.getElementById("team-agents-list");t&&(t.innerHTML=zr());try{const n=await y.getTeamAgents(L().id);if(e!==Yr)return;Fr=n,Nb()}catch(n){if(e!==Yr)return;t&&(t.innerHTML=R({icon:j.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),E("load team agents",n)}}function Nb(){const e=document.getElementById("team-agents-list");if(e){if(Fr.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Fr.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Vu(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function Ob(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await y.createInvitation(L().id,t,n);if(await Ca(),i&&i.accept_url)return Ub(t,Fb(i.accept_url),i.email_queued===!0),!1;N(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){Hb(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):E("send invitation",i)}return!1}function Hb(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Wu(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function Fb(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Wu(n.hostname)||Wu(i.hostname)?e:i.origin+n.pathname}function Ub(e,t,n=!1){var a;const i=m(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${m(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ze()||F(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Ku()}function Ku(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function Gb(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function zb(e){let t;try{t=await y.issueInvitationVerificationCode(L().id,e)}catch(n){E("get a verification code",n);return}Wb(t)}function Vb(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function Wb(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=Vb(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">Send this code only through a channel you already trust for the invitee, never to whoever asked you for it. Anyone who saw the link can sign up with their address and ask, and chooses the name shown below.</p>
            <p>The account it is for:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${m(t.name||"")}</strong></li>
                <li>Email: ${m(t.email||"")}</li>
                <li>Signed up: ${m(n)} (${m(i)})</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">A signup shortly after you sent the link fits both the invitee and someone who saw the link: confirm with the invitee directly. One that predates the invitation was not made from the link, but check that the invitee recognises it. If they don't, don't give out the code: cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${m((e==null?void 0:e.code)||"")}</code>
            </div>
            <p>Expires at ${m(s)}. It lets that account accept this invitation only: they enter it on the invitation page, or run <code>chaotic team accept-invite &lt;link&gt; --code &lt;code&gt;</code>. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ze()||F(),Ku("invitation-code")}async function Kb(e){if(confirm("Are you sure you want to remove this member?"))try{await y.removeMember(L().id,e),await Wr(),$("Member removed!","success")}catch(t){E("remove member",t)}}async function Yb(e){try{await y.deleteInvitation(L().id,e),await Ca(),$("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function Yu(){Uu(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,F()}function Zb(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${p(L().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${p(L().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${m(L().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,F())}async function Xb(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await y.createTeam(t);await Ur(),await Gr(n),N(),$("Team created!","success")}catch(n){E("create team",n)}return!1}async function Qb(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await y.updateTeam(L().id,t);Bi(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await Ur(),N(),$("Team updated!","success")}catch(n){E("update team",n)}return!1}async function Jb(){if(L())try{const e=await y.getLabels(L().id);Os(e)}catch(e){console.error("Failed to load labels:",e),E("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ee({"select-team":(e,t)=>{Gr(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Kb(t.userId)},"delete-invitation":(e,t)=>{Yb(t.invitationId)},"issue-invitation-code":(e,t)=>{zb(t.invitationId)},"retry-load-team-invitations":()=>{Ca()},"retry-load-team-members":()=>{Wr()},"retry-load-team-agents":()=>{zu()},"invite-member":e=>{Ob(e)},"copy-invite-link":()=>{Gb()},"dismiss-invite-link":()=>{N()},"create-team":e=>{Xb(e)},"update-team":e=>{Qb(e)}});let $t=null,Pt=0,ii=null,si=null,us=null,Zr=!1;function ew(){return vf()}function Zu(){yf()}function Xu(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function tw(){$t||($t=document.createElement("div"),$t.id="onboarding-overlay",$t.className="onboarding-overlay",document.getElementById("app").appendChild($t))}function ps(){if(!$t)return;const e=Zr?Ju():Qu(),t=e[Pt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Pt?" active":""}${s<Pt?" completed":""}"></span>`).join("");$t.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Qu(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Xu(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Xu(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&ii&&(e.textContent=`${ii.name} (${ii.key})`),t&&si&&(t.textContent=`${si.name} (${si.key})`),n&&us&&(n.textContent=`${us.identifier} - ${us.title}`)}}]}function Ju(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Xr(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Qr(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function ai(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function nw(){const e=Zr?Ju():Qu();Pt<e.length-1&&(Pt++,ps())}function iw(){Zu(),tp(),oi()}function sw(){Zu(),tp(),oi()}async function aw(e){e.preventDefault(),Qr("onboarding-team-error"),ai("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{ii=await y.createTeam({name:t,key:n}),Pt++,ps()}catch(i){Xr("onboarding-team-error",i.message||"Failed to create team"),ai("onboarding-team-submit",!1)}}async function ow(e){e.preventDefault(),Qr("onboarding-project-error"),ai("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{si=await y.createProject(ii.id,{name:t,key:n}),Pt++,ps()}catch(i){Xr("onboarding-project-error",i.message||"Failed to create project"),ai("onboarding-project-submit",!1)}}async function rw(e){e.preventDefault(),Qr("onboarding-issue-error"),ai("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{us=await y.createIssue(si.id,{title:t}),Pt++,ps()}catch(n){Xr("onboarding-issue-error",n.message||"Failed to create issue"),ai("onboarding-issue-submit",!1)}}function ep(e=!1){Zr=e,Pt=0,ii=null,si=null,us=null,tw(),ps()}function tp(){$t&&($t.remove(),$t=null)}function np(){bf(),ep(!0)}ee({"onboarding-next":e=>{e.preventDefault(),nw()},"onboarding-skip":e=>{e.preventDefault(),iw()},"onboarding-finish":e=>{e.preventDefault(),sw()},"onboarding-create-team":e=>{aw(e)},"onboarding-create-project":e=>{ow(e)},"onboarding-create-issue":e=>{rw(e)}});const ip="/oauth/consent/";function lw(e){if(!e||!e.startsWith(ip))return null;const t=e.slice(ip.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function cw(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function dw(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function uw(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const sp={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Aa(e){const t=sp[e.trust]||sp.unverified,n=e.host?` · ${m(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${m(t)}${n}</span>`}function pw(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${m(n.name)}</option>`).join("")}function mw(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${m(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function ap(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${m(i.name+a)}</option>`)}return n.join("")}function op(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${m(t.name)} <span class="oauth-muted">${m(t.key)}</span>
        </label>`).join("")}function fw(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${m(t.name)}${m(i)}
        </label>`}).join("")}function gw(e,t){const n=m(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Aa(t.client)}</p>
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
        </div>`}function hw(e,t){if(t.acts_as==="person"){gw(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=m(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${m(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Aa(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${m(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${pw(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${ap(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${op(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${fw(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Jr(e,t)}function Jr(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=mw(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function vw(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function yw(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function ms(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${m(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function bw(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{y.logout(),t()})}function ww(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=ap(d,null),e.querySelector("#oauth-projects").innerHTML=op(d),Jr(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Jr(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await y.approveOAuthRequest(t,vw(e)):await y.denyOAuthRequest(t);if(!cw(u.redirect)){ms(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){ms(e,"It has expired, was already answered, or belongs to someone else.");return}yw(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function kw(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=dw();uw(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await y.getOAuthRequest(e)}catch(a){a&&a.status===404?ms(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?bw(i,n):a&&a.status===403?ms(i,"Only a person signed in to Chaotic can approve an app."):ms(i,a&&a.message||"Something went wrong");return}hw(i,s),ww(i,e,s,t)}const el="/invite/",fs="/invite",tl="chaotic.inviteToken",rp="invite-auth-notice";let nl=null;const $w="This invitation is no longer valid.",Ew={owner:"an owner",admin:"an admin",member:"a member"};function _w(e){if(!e||!e.startsWith(el))return null;const t=e.slice(el.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function lp(){const{pathname:e}=window.location,t=_w(e);if(t){nl=t;try{sessionStorage.setItem(tl,t)}catch{}return history.replaceState(null,"",fs),t}if(!cp(e))return null;let n=null;try{n=sessionStorage.getItem(tl)}catch{}const i=n||nl;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function cp(e){return e===fs||e===`${fs}/`}function dp(e){return cp(e)||!!(e&&e.startsWith(el))}function il(){nl=null;try{sessionStorage.removeItem(tl)}catch{}}function xw(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function Iw(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function sl(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function up(){const e=Iw();return Ba(),sl(e),e}function Sw(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Ba()}function Ba(){var e;(e=document.getElementById(rp))==null||e.remove()}function al(e){const t=e.invited_by_name?`<strong>${m(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=Ew[e.role]||`a ${m(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${m(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${m(e.email_hint)}</strong>${Tw(e)}</p>`}function Tw(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${m(n)}`}const Lw="Ask whoever invited you to send a new invitation.",Cw="Reload the page to try again.";function ol(e,t=$w,n=Lw){e.innerHTML=`
        <div class="invite-page">
            <h1>${m(t)}</h1>
            <p class="invite-muted">${m(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Aw(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function pp(){window.location.pathname!==fs&&history.replaceState(null,"",fs),Aw(up())}function Bw(e,t){e.innerHTML=`
        <div class="invite-page">
            ${al(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function Dw(e,t,n){const i=xw(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${m(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${al(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${m(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${al(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${m(n.email)}</strong>.</p>
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
        </div>`}function jw(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Mw(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await y.requestEmailVerification(),f=jw(u.expires_at);c(`We sent a code to ${u.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(u){const f=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(f==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var h;if(u.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await y.confirmEmailVerification(f)}catch(v){r.disabled=!1;const w=v&&v.detail&&v.detail.error_code;v&&v.status===401?n():w==="email_already_verified"?t():(c(v&&v.message||"Something went wrong"),(h=o.select)==null||h.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function Rw(e,t){Ba();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=rp,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${m(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${m(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Ba(),t()})}function Da(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function Pw(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=up();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await y.getInvitation(e)}catch(f){f&&f.status===404?(il(),ol(a)):ol(a,f&&f.message||"Something went wrong.",Cw);return}if(!t){Bw(a,o);const f=h=>{Rw(o,()=>sl(a)),n(h)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}Dw(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var v,w;if(l)return;l=!0,r.disabled=!0;let h;try{h=f===void 0?await y.acceptInvitation(e):await y.acceptInvitation(e,f)}catch(k){l=!1,r.disabled=!1;const S=k&&k.detail&&k.detail.error_code;if(f!==void 0&&(S==="invalid_verification_code"||S==="invitation_code_expired"||k&&k.status===429)){Da(a,k&&k.message||"That code did not work."),(w=(v=a.querySelector("#invite-admin-code"))==null?void 0:v.select)==null||w.call(v);return}k&&k.status===401?s():k&&(k.status===404||k.status===400)?(il(),ol(a)):k&&k.status===403&&k.detail&&k.detail.error_code==="email_unverified"?(Da(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):k&&k.status===403?Da(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Da(a,k&&k.message||"Something went wrong");return}il(),mp(a,o);try{await i(h.team_id,o.team_name)}catch(k){console.error("Joined the team but could not open it:",k),sl(a),mp(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",f=>{f.preventDefault();const h=a.querySelector("#invite-admin-code").value.trim();h&&c(h)}),Mw(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function mp(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${m(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${m(t.team_name)}</a>
            </div>
        </div>`}function rl(e){return Pw(e,{user:Ct(),showAuth:t=>{vs(),t==="signup"?hp():gp()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),Sw(),await oi({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{y.logout(),Bn(null),Bi(null),rl(e)}})}async function fp(){const e=lp();if(e){await rl(e);return}if(dp(window.location.pathname)){pp();return}vs()}async function oi({teamId:e}={}){const t=lw(window.location.pathname);if(t){await kw(t);return}const n=lp();if(n){await rl(n);return}if(dp(window.location.pathname)){pp();return}qw(),Fw(),await Ur();const i=Db();if(i.length===0&&!ew()){ep();return}try{if(i.length>0){const s=e&&i.find(a=>a.id===e)||i[0];await Gr(s,!0)}}finally{ab()}}let ri=null,gs=null,ct=null,dt=null;function hs(){ri||(ri=document.getElementById("auth-screen"),gs=document.getElementById("main-screen"),ct=document.getElementById("login-form"),dt=document.getElementById("signup-form"))}function vs(){hs(),ri&&ri.classList.remove("hidden"),gs&&gs.classList.add("hidden")}function qw(){hs(),ri&&ri.classList.add("hidden"),gs&&gs.classList.remove("hidden")}function gp(){hs(),ct&&ct.classList.remove("hidden"),dt&&dt.classList.add("hidden")}function hp(){hs(),ct&&ct.classList.add("hidden"),dt&&dt.classList.remove("hidden")}async function Nw(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await y.login(t,n),Bn(await y.getMe()),await oi(),$("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function Ow(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await y.signup(t,n,i),await y.login(n,i),Bn(await y.getMe()),await oi(),$("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function vp(){y.logout(),Bn(null),Bi(null),vs(),$("Signed out","success")}function Hw(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Fw(){var i;const e=Ct();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Eo(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Hw(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Uw(){hs();const e=ct==null?void 0:ct.querySelector("form");e&&e.addEventListener("submit",s=>Nw(s));const t=dt==null?void 0:dt.querySelector("form");t&&t.addEventListener("submit",s=>Ow(s));const n=ct==null?void 0:ct.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),hp()});const i=dt==null?void 0:dt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),gp()})}let ll=[];async function cl(){try{ll=await y.getApiKeys(),Gw()}catch(e){E("load API keys",e)}}function Gw(){const e=document.getElementById("api-keys-list");if(e){if(ll.length===0){e.innerHTML=R({icon:j.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=ll.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ve(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ve(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function zw(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,F()}async function Vw(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await y.createApiKey(t);N(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,F()}catch(n){E("create API key",n)}return!1}async function Ww(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function Kw(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await y.revokeApiKey(e),$("API key revoked","success"),await cl()}catch(n){E("revoke API key",n)}}ee({"create-api-key":e=>{Vw(e)},"copy-api-key":()=>{Ww()},"dismiss-api-key-modal":()=>{N(),cl()},"revoke-api-key":(e,t)=>{Kw(t.keyId,t.keyName)}});let dl=[];async function yp(){try{dl=await y.getConnections(),Zw()}catch(e){E("load connected apps",e)}}function ul(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function Yw(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function Zw(){const e=document.getElementById("connected-apps-list");if(e){if(dl.length===0){e.innerHTML=R({icon:j.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=dl.map(t=>t.acts_as==="person"?Xw(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(ul(t))} ${Aa(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${m(t.agent?t.agent.name:"an agent")}</span>
                    <span>${m(Yw(t))}</span>
                    <span>policy ${m(t.policy)}</span>
                    <span class="api-key-date">Connected ${Ve(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ve(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${m(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(ul(t))}">Disconnect</button>
        </div>
    `).join("")}}function Xw(e){const n=`${e.device_name||"A device"} · ${ul(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${m(n)} ${Aa(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Ve(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Ve(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function Qw(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await y.revokeConnection(e),$("App disconnected","success"),await yp()}catch(n){E("disconnect app",n)}}ee({"revoke-connection":(e,t)=>{Qw(t.connectionId,t.connectionName)}});let pl=[];async function bp(){try{pl=await y.getPushDevices(),Jw()}catch(e){E("load push devices",e)}}const wp={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function kp(e){return e.label||e.platform||"Unnamed device"}function Jw(){const e=document.getElementById("push-devices-list");if(e){if(pl.length===0){e.innerHTML=R({icon:j.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=pl.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(kp(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${m(t.platform)}</span>`:""}
                    <span>via ${m(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Ve(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Ve(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${m(String(t.failure_count))} failed deliveries</span>`:""}
                    ${wp[t.status]?`<span class="push-device-status">${m(wp[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(kp(t))}">Remove</button>
        </div>
    `).join("")}}async function ek(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await y.deletePushDevice(e),$("Device removed","success"),await bp()}catch(n){E("remove push device",n)}}ee({"remove-push-device":(e,t)=>{ek(t.installationId,t.deviceName)}});let ja=!1,qt=0,sn=[],Ma=[];function tk(e){Ma=e,sn=[...e]}function kn(){return ja}function nk(){if(ja)return;ja=!0,qt=0,sn=[...Ma];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ra()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>ik(n.target.value)),t.addEventListener("keydown",ak),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&sk(Number(i.dataset.commandIndex))}),ys(),requestAnimationFrame(()=>t.focus())}function Ra(){ja=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function ik(e){const t=e.toLowerCase().trim();t?sn=Ma.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):sn=[...Ma],qt=0,ys()}function ys(){const e=document.getElementById("command-results");if(!e)return;if(sn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};sn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===qt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function sk(e){qt=e,ys()}function $p(e){const t=sn[e];t&&(Ra(),t.action())}function ak(e){switch(e.key){case"ArrowDown":e.preventDefault(),qt=Math.min(qt+1,sn.length-1),ys();break;case"ArrowUp":e.preventDefault(),qt=Math.max(qt-1,0),ys();break;case"Enter":e.preventDefault(),$p(qt);break;case"Escape":e.preventDefault(),Ra();break}}ee({"execute-command":(e,t)=>{$p(Number(t.commandIndex))}});const ok=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function rk(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function lk(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(rk).join("")}
    </div>`}function Ep(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${ok.map(lk).join("")}
        </div>
    `,F()}const Pa=100,ml="status!=done,canceled",ck=["created","updated","priority","status","title","estimate"];function me(e){return e==null?"":m(String(e))}function _p(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${me(n)}</a>`}function xp(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const fl=[{id:"identifier",label:"ID",fixed:!0,render:e=>_p(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>_p(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>me(he(e.status))},{id:"priority",label:"Priority",render:e=>me(Me(e.priority))},{id:"type",label:"Type",render:e=>me(gt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>me(xp(e,"assignee"))},{id:"creator",label:"Creator",render:e=>me(xp(e,"creator"))},{id:"project",label:"Project",render:e=>me(e.project_key)},{id:"sprint",label:"Sprint",render:e=>me(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=Q(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${me(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>me(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${me(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>me(Ve(e.created_at))},{id:"updated",label:"Updated",render:e=>me(Ve(e.updated_at))},{id:"completed",label:"Completed",render:e=>me(Ve(e.completed_at))},{id:"due",label:"Due",render:e=>me(Ve(e.due_date))}],qa=Object.fromEntries(fl.map(e=>[e.id,e])),dk=fl.filter(e=>e.fixed).map(e=>e.id),gl=["identifier","title","status","priority","assignee","updated"];function hl(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!qa[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...gl]:[...dk.filter(s=>!t.has(s)),...n]}function uk(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function pk(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?hl(t.get("cols").split(",")):[...gl],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function mk(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!uk(e.cols,gl)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function fk(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function gk({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Pa,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",fk(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),f=d.replace(/^[-+]/,"");let h=null;ck.includes(f)?(o.push("--sort",f,"--order",u?"desc":"asc"),c.length>1&&(h=`The CLI sorts by one field; only "${d}" was copied.`)):h=`The CLI cannot sort by "${f}"; the order was not copied.`,h&&(l=l?`${l} ${h}`:h)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function hk(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function vk(e,t){const n=hl(t).map(a=>qa[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${me(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function yk(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let M=null,vl=null,Ge=null,yl=0,li=!1,Ip=!1;function ne(e){return document.getElementById(e)}function Sp(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Tp(e){const t=mk({...vl,cols:M.cols,group:M.group,view:M.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function bk(){const e=ne("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(Z().map(n=>`<option value="${p(n.id)}">${me(n.name)}</option>`));e.innerHTML=t.join(""),e.value=M.teamScope?"":M.projectId||""}function wk(){const e=ne("query-columns-menu");e&&(e.innerHTML=fl.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${M.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${me(t.label)}
        </label>`).join(""))}function Na(e){const t=ne("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${me(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Lp(e){const t=ne("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function bl(e){var t;(t=ne("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function bs(){const e=ne("query-results"),t=ne("query-pager");if(!e)return;if(!Ge){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Ge;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=vk(n,M.cols),t&&(t.innerHTML=yk(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),li&&bl(!0))}async function Oa(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!M)return;const i=L(),s=M.teamScope?{teamId:i==null?void 0:i.id}:{projectId:M.projectId};if(!s.teamId&&!s.projectId){Ge=null,bs(),Na(M.teamScope?"Select a team first.":"Select a project.");return}const a=++yl,o=M.where===null?ml:M.where,r=ne("query-results");li=!0,r&&r.classList.add("loading"),bl(!0);const l=()=>a===yl&&A()==="query";try{const c=await y.queryIssues({...s,where:o,order:M.order,skip:(M.page-1)*Pa,limit:Pa});if(!l())return;M.where=c.where,M.order=c.order||null,vl=Sp(M),Ge={issues:c.issues||[],total:c.total,skip:c.skip};const d=ne("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),Na(null),li=!1,bs(),Tp(e),t&&t()}catch(c){if(!l())return;li=!1,n?n():Ge=null,bs(),Na(hk(c))}finally{a===yl&&(li=!1,r&&r.classList.remove("loading"),bl(!1))}}function Cp(){if(!M)return;const e=ne("query-where");return M.where=e?e.value.trim():"",M.page=1,Oa("push")}function kk(e){if(M)return M.teamScope=!e,e&&(M.projectId=e),M.page=1,Lp(null),Oa("push",{onSuccess:()=>{e&&Qe(e)}})}function $k(e,t){if(!M||!qa[e]||qa[e].fixed)return;const n=M.cols.filter(i=>i!==e);M.cols=hl(t?[...n,e]:n),bs(),Tp("replace")}function Ek(e){if(!M||!Ge||li)return;const t=M.page+e;if(t<1||e>0&&Ge.skip+Ge.issues.length>=Ge.total)return;const n={page:M.page,result:Ge};return M.page=t,Oa("push",{onFailure:()=>{M.page=n.page,Ge=n.result}})}async function _k(){if(!M)return null;const e=ne("query-where"),t=e?e.value.trim():M.where??ml,n=M.teamScope?null:Z().find(o=>o.id===M.projectId),{command:i,warning:s}=gk({where:t,order:M.order,teamScope:M.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Pa,skip:Ge?Ge.skip:0}),a=ne("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function xk(){var e,t,n,i,s,a,o;Ip||(Ip=!0,(e=ne("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),Cp())}),(t=ne("query-run-btn"))==null||t.addEventListener("click",()=>Cp()),(n=ne("query-copy-cli-btn"))==null||n.addEventListener("click",()=>_k()),(i=ne("query-project-filter"))==null||i.addEventListener("change",r=>kk(r.target.value)),(s=ne("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=ne("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=ne("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&$k(r.target.value,r.target.checked)}),(o=ne("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||Ek(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=ne("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=ne("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function Ik(){var s,a;xk();const e=pk(window.location.search),t=Z();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(K())?K():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}M=e,vl=Sp(M),Ge=null;const i=ne("query-where");return i&&(i.value=M.where===null?ml:M.where),(s=ne("query-cli-preview"))==null||s.classList.add("hidden"),(a=ne("query-columns-menu"))==null||a.classList.add("hidden"),bk(),wk(),Na(null),Lp(n),bs(),Oa("replace")}let Ha=[];function Sk(){return Ha}st(e=>{e==="currentProject"&&A()==="epics"&&an()});let Fa=0;async function an(){var n;jc(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++Fa;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=L())!=null&&n.id)){Ha=[],e.innerHTML=R({icon:j.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const i=K();let s;if(i?s=await y.getIssues({project_id:i,issue_type:"epic"}):s=await y.getTeamIssues(L().id,{issue_type:"epic"}),t!==Fa)return;if(!s||s.length===0){Ha=[],e.innerHTML=R({icon:j.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(s.map(async o=>{let r=[];try{r=await y.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==Fa)return;Ha=a,Tk(a,e)}catch(i){if(t!==Fa)return;e.innerHTML=R({icon:j.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",i)}}function Tk(e,t){const n=e.map(i=>{const s=i.subIssues?i.subIssues.length:0,a=i.subIssues?i.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=s>0?Math.round(a/s*100):0,r=s>0?`${a}/${s}`:"-",l=`status-${(i.status||"backlog").replace(/_/g,"-")}`,c=(i.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),d=i.estimate!=null?`${i.estimate}pts`:"-";return`
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
                <td class="epic-estimate">${d}</td>
                <td class="epic-status"><span class="status-badge ${l}">${c}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=i=>{const s=i.target.closest(".epic-row");s&&s.dataset.identifier&&Du(s.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Lk(){const e=K(),t=Z().map(n=>`
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
    `,F(),document.getElementById("create-epic-form").addEventListener("submit",Ck),document.getElementById("create-epic-title").focus()}async function Ck(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await y.createIssue(t,{title:n,description:i||null,issue_type:"epic"});N(),$(`Created epic ${s.identifier}`,"success"),an()}catch(s){E("create epic",s)}}async function Ap(e){try{let t;if(e.includes("-")?t=await y.getIssueByIdentifier(e):t=await y.getIssue(e),t){if(t.issue_type!=="epic"){te(t.id,!1);return}await wl(t.id,!1)}else P("epics",!1)}catch{P("epics",!1)}}async function wl(e,t=!0){try{t&&yn();const[n,i,s,a]=await Promise.all([y.getIssue(e),y.getSubIssues(e),y.getActivities(e),y.getComments(e)]);if(n.issue_type!=="epic"){te(e,t);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",l=Z().find(_=>_.id===n.project_id),c=n.assignee_id?zt(n.assignee_id):null,d=c?Vt(c):null,u=i.length,f=i.filter(_=>_.status==="done"||_.status==="canceled").length,h=u>0?Math.round(f/u*100):0,v=Sk(),w=v.findIndex(_=>_.id===n.id),k=w>0?v[w-1]:null,S=w>=0&&w<v.length-1?v[w+1]:null,T=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${T?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${k?`data-action="navigate-epic" data-epic-id="${p(k.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${v.length}</span>
                            <button class="issue-nav-btn" ${S?`data-action="navigate-epic" data-epic-id="${p(S.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${l?m(l.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Gn(n.description)}
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
                            ${i.length===0?R({icon:j.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):i.map(_=>{const U=_.assignee_id?zt(_.assignee_id):null,I=U?Vt(U):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(_.id)}" data-identifier="${p(_.identifier)}">
                                    <span class="sub-issue-status">${_e(_.status)}</span>
                                    <span class="sub-issue-id">${m(_.identifier)}</span>
                                    <span class="sub-issue-title">${m(_.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(_.status||"backlog").replace(/_/g,"-")}">${he(_.status)}</span>
                                    ${I?`<span class="sub-issue-assignee">${m(I)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${s.length===0?R({icon:j.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):s.map(_=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Xo(_.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Jo(_)}</span>
                                        <span class="activity-actor">by ${m(Qo(_))}</span>
                                        <span class="activity-time">${Xe(_.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(_=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(_.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(_.author_name||"User")}</span>
                                            <span class="comment-date">${Xe(_.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(_.content||"")}</div>
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
                                ${he(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${rt(n.priority)}
                                ${Me(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${d?m(d):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${$a(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(_=>`
                                    <span class="issue-label" style="background: ${Q(_.color)}20; color: ${Q(_.color)}">${m(_.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${l?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(l.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const D=o.querySelector(".sub-issues-list");D&&D.addEventListener("click",_=>{const U=_.target.closest(".sub-issue-item");U&&U.dataset.issueId&&te(U.dataset.issueId)})}catch(n){E("load epic",n)}}ee({"navigate-epic":(e,t)=>{wl(t.epicId)}});function Ak(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,f;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function Bk(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Nt(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Dk(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;(f=e.beforeNavigate)==null||f.call(e);const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Nt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Nt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const h=o[r].dataset.issueId;h&&!h.startsWith("temp-")&&e.viewIssue(h)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const h=o[r].dataset.issueId;h&&!h.startsWith("temp-")&&e.showEditIssueModal(h)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(h=>h.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function jk(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o,r,l;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Nt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Nt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.viewDocument(c)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.showEditDocumentModal&&e.showEditDocumentModal(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function ci(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function Mk(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,f,h,v;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(l=i.target).closest)!=null&&c.call(l,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(d=e.isInlineDropdownOpen)!=null&&d.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=w=>{var S,T,D,_;const k=!!((T=(S=document.activeElement)==null?void 0:S.closest)!=null&&T.call(S,"#inbox-list"));if((D=e.collapseInboxExpand)==null||D.call(e),Nt(a+w,e.setSelectedIndex,t),k){const U=document.querySelector(`${t}.keyboard-selected`);(_=(U==null?void 0:U.querySelector(".inbox-row-toggle"))||U)==null||_.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((f=(u=i.target).closest)!=null&&f.call(u,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((h=e.isEscapeLayerAbove)!=null&&h.call(e))break;if((v=e.collapseInboxExpand)!=null&&v.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(w=>w.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Rk(e){const t="#kanban-board .kanban-card";return function(i){var o,r,l;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Nt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Nt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.id;c&&e.viewIssue(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Pk(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Bp(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Nt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Nt(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(u=>u.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const qk={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>y.getDocumentRevisions(e),fetchOne:(e,t)=>y.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>y.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>y.getIssueDescriptionRevision(e,t)}};let O=null,on=0;async function Dp(e,t){var a,o;const n=qk[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++on;O=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===on){if(O={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},O.viewVersion!=null)try{const r=await n.fetchOne(t,O.viewVersion);if(i!==on)return;O.cache.set(O.viewVersion,r)}catch(r){i===on&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Ua(),F()}}function Ua(){const e=document.getElementById("modal-content");if(!e||!O)return;if(O.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=Nk(),n=O.mode==="compare"?Hk():Ok();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function Nk(){const e=O.revisions.map(n=>{const i=O.mode==="view"?n.version===O.viewVersion:n.version===O.compareFromVersion||n.version===O.compareToVersion,s=O.mode==="compare"?n.version===O.compareFromVersion?' <span class="rev-tag">from</span>':n.version===O.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${m(n.author_name||"Unknown")} ${An(n.author)}</span>
          <span class="revision-time">${Xe(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${O.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function Ok(){const e=O.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=O.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${m(t.title)}</h3>`:"",i=t[O.adapter.bodyField]||"",s=i?`<div class="markdown-body">${lt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${m(t.author_name||"Unknown")} &middot; ${Xe(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function Hk(){const e=O.compareFromVersion,t=O.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=O.cache.get(e),i=O.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[O.adapter.bodyField]||"",a=i[O.adapter.bodyField]||"",o=Fk(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${m(n.title||"")}</span>
        &rarr; <span class="diff-add">${m(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function Fk(e,t){const n=e.split(`
`),i=t.split(`
`),s=Uk(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${m(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${m(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${m(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function Uk(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(ws(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(ws(a,"del",e[o]),o++):(ws(a,"add",t[r]),r++);for(;o<n;)ws(a,"del",e[o++]);for(;r<i;)ws(a,"add",t[r++]);return a}function ws(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function Gk(e){if(!O)return;const t=O.token,n=O;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(O!==n||on!==t)return;n.cache.set(e,i)}catch(i){O===n&&on===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Ua()}function zk(){if(!O)return;const e=O.token,t=O;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{O===t&&on===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{O!==t||on!==e||(s&&E("load revisions to compare",s),Ua())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Ua()}ee({"show-document-revisions":(e,t)=>{Dp("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Dp("issue",t.issueId)},"select-revision-version":(e,t)=>{Gk(Number(t.version))},"toggle-revision-compare":()=>{zk()},"close-revision-viewer":()=>{O=null,N()}});const Vk=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let $n=[],Ga=null,kl=0;st(e=>{e==="currentProject"&&A()==="board"&&ks()});async function ks(){Hs(-1);const e=++kl,t=K();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=Z().length===0?R({icon:j.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):R({icon:j.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await y.getIssues({project_id:t});if(e!==kl)return;$n=i,A()==="board"&&un($n),$s()}catch(i){if(e!==kl)return;n&&(n.innerHTML=R({icon:j.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",i)}}const $l=Rf(()=>ks(),200);function $s(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Vk.map(i=>{const s=$n.filter(a=>a.status===i.key);return`
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
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Me(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),Wk(t)}function Wk(e){const t=Bc();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Hs(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Hs(i),n[i].classList.add("keyboard-selected")}function Kk(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Ga=t.dataset.id,t.classList.add("dragging")}function Yk(e,t){t.classList.remove("dragging"),Ga=null}function jp(e){const t=$n.find(n=>n.id===Ga);return!!t&&t.status===e}function Zk(e,t){e.preventDefault(),!jp(t.dataset.status)&&t.classList.add("drag-over")}function Xk(e,t){t.classList.remove("drag-over")}function Qk(e,t){e.preventDefault();const n=$n.find(i=>i.id===t.dataset.id);n&&jp(n.status)||t.classList.add("drag-over")}function Jk(e,t){t.classList.remove("drag-over")}async function e$(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=$n.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,$s();try{await y.updateIssue(n,{status:i}),$("Status updated","success")}catch(o){s.status=a,$s(),E("update status",o)}}}async function t$(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Ga||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=$n.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,$s();try{await y.updateIssue(n,{status:a}),$("Status updated","success")}catch(l){o.status=r,$s(),E("update status",l)}}}ee({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),te(t.id)):e.type==="dragstart"?Kk(e,n):e.type==="dragend"?Yk(e,n):e.type==="dragover"?Qk(e,n):e.type==="dragleave"?Jk(e,n):e.type==="drop"&&t$(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Zk(e,n):e.type==="dragleave"?Xk(e,n):e.type==="drop"&&e$(e,n)},"retry-load-board":()=>ks()});const rn=new Map,Mp=6e4,El=100;let Ie=null,za=null,Va=null,Es=null,Rp=!1;const n$={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},i$={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Pp={api:null};let _l={...Pp};function s$(e={}){_l={...Pp,...e},Ie||(Ie=document.createElement("div"),Ie.className="issue-tooltip",Ie.style.display="none",document.body.appendChild(Ie),Ie.addEventListener("mouseenter",()=>{clearTimeout(za)}),Ie.addEventListener("mouseleave",()=>{xl()})),Rp||(document.addEventListener("mouseover",a$),document.addEventListener("mouseout",o$),Rp=!0)}function a$(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=r$(t);if(n){if(n===Es&&Ie.style.display!=="none"){clearTimeout(za);return}clearTimeout(Va),Va=setTimeout(()=>{l$(t,n)},200)}}function o$(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Va),za=setTimeout(()=>{xl()},150))}function r$(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function l$(e,t){Es=t;const n=e.getBoundingClientRect();Ie.style.left=`${n.left+window.scrollX}px`,Ie.style.top=`${n.bottom+window.scrollY+8}px`,Ie.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Ie.style.display="block";try{const i=await d$(t);if(Es!==t)return;u$(i)}catch{if(Es!==t)return;Ie.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function xl(){clearTimeout(Va),clearTimeout(za),Ie&&(Ie.style.display="none"),Es=null}function c$(){const e=Date.now();for(const[t,n]of rn.entries())e-n.timestamp>=Mp&&rn.delete(t)}async function d$(e){rn.size>El/2&&c$();const t=rn.get(e);if(t&&Date.now()-t.timestamp<Mp)return t.issue;if(!_l.api)throw new Error("API not initialized");const n=await _l.api.getIssueByIdentifier(e);if(rn.size>=El){const i=Array.from(rn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,El/2);for(const[a]of s)rn.delete(a)}return rn.set(e,{issue:n,timestamp:Date.now()}),n}function u$(e){const t=n$[e.status]||"#6b7280",n=i$[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Ie.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${p$(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${m$(e.priority)}</span>
        </div>
    `}function p$(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function m$(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function qp(){return!!document.querySelector(".description-inline-editor")}function Il(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Sl(){var e;return Il("issue-detail-view")?((e=Re())==null?void 0:e.id)??null:null}function En(e){return!!e&&Sl()===e}function f$(){He("issue:created",y$),He("issue:updated",b$),He("issue:deleted",w$),He("comment",E$),He("relation",x$),He("attestation",I$),He("activity",T$),He("project",L$),He("sprint",C$),He("document",_$),He("inbox",S$),He("connection:reconnected",A$),He("connection:unauthorized",h$),He("connection:forbidden",v$),He("connection:superseded",g$)}function g$(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function h$(){y.logout(),Bn(null),Bi(null),vs(),$("Your session has ended. Please sign in again.","warning")}function v$(){$("Live updates stopped: you no longer have access to this team.","error")}function y$(e){var s;const t=pe(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,at(a),A()==="issues"&&bt()}else at([e,...t]),A()==="issues"&&bt(),$(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=Ct())==null?void 0:s.id)){const a=ht(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)Nn([e,...a]),A()==="my-issues"&&qi();else if(r>=0){const l=[...a];l[r]=e,Nn(l),A()==="my-issues"&&qi()}}A()==="board"?$l():A()==="sprints"?_s():A()==="epics"&&an(),En(e.parent_id)&&_n(e.parent_id)}function b$(e){sg(e);const t=pe();t.some(s=>s.id===e.id)&&at(t.map(s=>s.id===e.id?e:s));const n=ht();n.some(s=>s.id===e.id)&&Nn(n.map(s=>s.id===e.id?e:s));const i=Ci();i.some(s=>s.id===e.id)&&un(i.map(s=>s.id===e.id?e:s)),A()==="issues"?bt():A()==="my-issues"?qi():A()==="board"?$l():A()==="sprints"?_s():A()==="epics"&&an(),En(e.id)&&(qp()?Zo(e):_n(e.id))}function w$(e){og(e.id),at(pe().filter(n=>n.id!==e.id)),Nn(ht().filter(n=>n.id!==e.id));const t=Ci();t.some(n=>n.id===e.id)&&un(t.filter(n=>n.id!==e.id)),A()==="issues"?bt():A()==="my-issues"?(qi(),Hn({showLoading:!1})):A()==="board"?$l():A()==="sprints"?_s():A()==="epics"&&an(),$(`Issue ${e.identifier} deleted`,"info"),En(e.id)&&($(`Issue ${e.identifier} was deleted`,"warning"),P("my-issues"))}const Np=250,k$=1e3,di=new Map;function _n(e){qp()?Zo():Tl(e,Np)}function Tl(e,t){let n=di.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},di.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>$$(e),t))}async function $$(e){const t=di.get(e);if(!t)return;if(t.timer=null,!En(e)){di.delete(e);return}t.inFlight=!0;let n;try{n=await te(e,!1,{refresh:!0})}finally{t.inFlight=!1}di.get(e)===t&&(t.again?(t.again=!1,Tl(e,Np)):n==="retry"?Tl(e,k$):di.delete(e))}function E$(e){A()==="my-issues"&&Hn({showLoading:!1}),En(e.issue_id)&&_n(e.issue_id),e.document_id&&nu(e.document_id)}function _$(e,{type:t}={}){tu(),t==="deleted"?vv(e.id,e.title):nu(e.id)}function x$(e){const t=Sl();t&&(e.source_issue_id===t||e.target_issue_id===t)&&_n(t)}function I$(e){A()==="approvals"&&wt(),En(e.issue_id)&&_n(e.issue_id)}function S$(e,t){var n;e.recipient_user_id===((n=Ct())==null?void 0:n.id)&&(ti(),gb(t==null?void 0:t.type,e),A()==="inbox"&&!yb(t==null?void 0:t.type,e)&&cs({background:!0}))}function T$(e){A()==="my-issues"&&Hn({showLoading:!1}),En(e.issue_id)&&_n(e.issue_id)}function L$(e,{type:t}){Je().then(()=>{A()==="projects"&&Xn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function _s(){const e=Uv();e&&Il("sprint-detail-view")?Yn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Il("sprints-view")&&en().catch(t=>console.error("Failed to reload sprints:",t))}function C$(e,{type:t}={}){du(),A()==="sprints"?_s():A()==="my-issues"&&Ni(),t==="created"?$(`New sprint: ${e.name}`,"info"):t==="closed"&&$(`Sprint ${e.name} closed`,"info")}function A$(){const e=A();ti(),e==="issues"?Dt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(On().catch(n=>console.error("Failed to resync my issues:",n)),Ni().catch(n=>console.error("Failed to resync sprint status:",n)),Hn({showLoading:!1})):e==="board"?ks():e==="sprints"?_s():e==="epics"?an().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?Je().then(()=>{A()==="projects"&&Xn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?tu():e==="approvals"?wt():e==="inbox"&&cs({background:!0});const t=Sl();t&&_n(t)}const Op='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Hp(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function B$(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Hp(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Op);n&&n.focus()}}}function Wa(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Hp(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=n.querySelectorAll(Op);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Wa()});async function D$(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=K();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Z().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};at([r,...pe()]),bt();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await y.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=pe();d.some(u=>u.id===a)&&at(d.map(u=>u.id===a?c:u)),bt(),Je(),$("Issue created!","success")}catch(c){at(pe().filter(d=>d.id!==a)),bt(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}tb({beforeNavigate:()=>{Hy(),ku(null),Di(null),Mc(null),Wa(),xl()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Ap(e[1]),!0;if(e[0]==="issue"&&e[1])return aa(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(aa(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(G$(e[1]),!0):e[0]==="sprint"&&e[1]?(Wv(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(_u(e[1]),!0):!1},detailPopstate:e=>e.epicId?(wl(e.epicId,!1),!0):e.issueId?(te(e.issueId,!1),!0):e.identifier?(aa(e.identifier),!0):e.documentId?(xe(e.documentId,!1),!0):e.sprintId?(Yn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Tr();e&&Z().some(t=>t.id===e)&&Qe(e)},issueNavigate:e=>aa(e),epicNavigate:e=>Ap(e)}),eb({"my-issues":()=>{Ni(),On(),Hn()},approvals:()=>{wt()},inbox:()=>{cs({focusFirst:!0})},issues:()=>{Cg(),jg(),Rg(),ed().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Vs())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),Ws())}}),id().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}Dt()})},query:()=>{Ik()},epics:()=>{an()},board:()=>{ks()},projects:()=>{Je().then(Xn)},sprints:()=>{en()},rituals:()=>{uy()},documents:()=>{vn()},team:()=>{Wr(),zu(),Ca()},settings:()=>{cl(),yp(),bp(),ta()}});function j$(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||N()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>N())}function M$(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>xu(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Gy());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>zy()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>Iu(a))})}function R$(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Jd("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Jd("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>eu());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>dv());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Qt())}function P$(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>fd())}function q$(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Mg());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>vg());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>yg()),document.querySelectorAll(".multi-select-btn").forEach(h=>{const v=h.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?h.addEventListener("click",()=>Ks("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?h.addEventListener("click",()=>Ks("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?h.addEventListener("click",()=>Ks("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&h.addEventListener("click",()=>Ks("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Ys())});const h=i.querySelector(".btn-small");h&&h.addEventListener("click",()=>Zs())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Mo())});const h=s.querySelector(".btn-small");h&&h.addEventListener("click",()=>Ro())}const a=document.getElementById("label-filter-dropdown");if(a){const h=a.querySelector(".btn-small");h&&h.addEventListener("click",()=>Xs())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const h=o.querySelector(".btn-small");h&&h.addEventListener("click",()=>Qs())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>We());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>We());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>We());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Dt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>cd());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",h=>D$(h))}function N$(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>my(t.dataset.tab))})}function O$(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Uu());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Vi()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),P(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Mb());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Wa());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>B$());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Vi())}ee({"navigate-to":(e,t)=>{P(t.view)},"set-current-project":(e,t,n)=>{Qe(n.value)},showCreateIssueModal:()=>Vi(),showCreateEpicModal:()=>Lk(),"retry-load-epics":()=>an(),showCreateProjectModal:()=>Eu(),showCreateDocumentModal:()=>su(),showCreateTeamModal:()=>Yu(),showEditTeamModal:()=>Zb(),showInviteModal:()=>Vu(),showCreateApiKeyModal:()=>zw(),showCreateAgentModal:()=>_h(),resetOnboarding:()=>np(),logout:()=>vp(),navigateToProjects:()=>P("projects")});async function H$(){if(!y.getToken()){await fp();return}try{const e=await y.getMe();Bn(e),await oi()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){y.logout(),await fp();return}console.error("Failed to load current user on boot:",e),vs(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{Xf(),Uw(),O$(),j$(),P$(),q$(),N$(),M$(),R$(),F$(),U$(),s$({api:y}),f$(),await H$()});function F$(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ff()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),gf(n?"light":"dark")})}function U$(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Bu(i)}}})}async function G$(e){try{await xe(e,!1)}catch{P("documents",!1)}}document.addEventListener("keydown",Dk({getCurrentView:A,getSelectedIndex:Cc,setSelectedIndex:Dn,viewIssue:te,showEditIssueModal:Rd,showInlineDropdown:Fo,isInlineDropdownOpen:Oi,isModalOpen:Ze,isCommandPaletteOpen:kn,isDetailViewActive:ci,beforeNavigate:Cd})),document.addEventListener("keydown",jk({getCurrentView:A,getSelectedIndex:Of,setSelectedIndex:Ac,viewDocument:xe,showEditDocumentModal:au,isModalOpen:Ze,isCommandPaletteOpen:kn,isDetailViewActive:ci})),document.addEventListener("keydown",Rk({getCurrentView:A,getSelectedIndex:Bc,setSelectedIndex:Hs,viewIssue:te,isModalOpen:Ze,isCommandPaletteOpen:kn,isDetailViewActive:ci})),document.addEventListener("keydown",Mk({getCurrentView:A,getSelectedIndex:Hf,setSelectedIndex:Fs,toggleInboxExpand:Lb,collapseInboxExpand:kb,archiveInboxEntry:Tb,isInlineDropdownOpen:Oi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ze,isCommandPaletteOpen:kn,isDetailViewActive:ci})),document.addEventListener("keydown",Pk()),document.addEventListener("keydown",Bp({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&Yn(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:Ff,setSelectedIndex:Dc,isModalOpen:Ze,isCommandPaletteOpen:kn,isDetailViewActive:ci})),document.addEventListener("keydown",Bp({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Du(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:Uf,setSelectedIndex:jc,isModalOpen:Ze,isCommandPaletteOpen:kn,isDetailViewActive:ci}));function Fp(){var e;P("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function z$(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||zh()}document.addEventListener("keydown",Ak({closeModal:N,closeSidebar:Wa,navigateTo:P,showCreateIssueModal:Vi,showKeyboardShortcutsHelp:Ep,isModalOpen:Ze,focusSearch:Fp,isInlineDropdownOpen:Oi,closeInlineDropdowns:Mf,isModalDirty:Df,focusModalField:Ic,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),mn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:z$,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),tk([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>P("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>P("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>P("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>P("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>P("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>P("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>P("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>P("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>P("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>P("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>P("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>P("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{P("issues"),setTimeout(Vi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{P("projects"),setTimeout(Eu,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{P("documents"),setTimeout(su,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Yu(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Fp,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{P("team"),setTimeout(Vu,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Ep(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>np(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>vp(),category:"Account"}]),document.addEventListener("keydown",Bk({isModalOpen:Ze,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:kn,openCommandPalette:nk,closeCommandPalette:Ra})),window.marked=W,window.DOMPurify=vc,console.log("Chaotic frontend loaded via Vite")})();
