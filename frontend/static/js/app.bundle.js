var ZT=Object.defineProperty;var XT=(Vt,He,Bn)=>He in Vt?ZT(Vt,He,{enumerable:!0,configurable:!0,writable:!0,value:Bn}):Vt[He]=Bn;var ce=(Vt,He,Bn)=>XT(Vt,typeof He!="symbol"?He+"":He,Bn);(function(){"use strict";var $u;function Vt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var He=Vt();function Bn(e){He=e}var us={exec:()=>null};function J(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Fe.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var Fe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},pb=/^(?:[ \t]*(?:\n|$))+/,mb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fb=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ps=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,gb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,nl=/(?:[*+-]|\d{1,9}[.)])/,Pu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qu=J(Pu).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),hb=J(Pu).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),il=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,vb=/^[^\n]+/,sl=/(?!\s*\])(?:\\.|[^\[\]\\])+/,bb=J(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",sl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),yb=J(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nl).getRegex(),Go="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ol=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,wb=J("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ol).replace("tag",Go).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nu=J(il).replace("hr",ps).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),kb=J(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nu).getRegex(),al={blockquote:kb,code:mb,def:bb,fences:fb,heading:gb,hr:ps,html:wb,lheading:qu,list:yb,newline:pb,paragraph:Nu,table:us,text:vb},Ou=J("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ps).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),$b={...al,lheading:hb,table:Ou,paragraph:J(il).replace("hr",ps).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ou).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex()},_b={...al,html:J(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ol).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:us,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:J(il).replace("hr",ps).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Eb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,xb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Hu=/^( {2,}|\\)\n(?!\s*$)/,Ib=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,zo=/[\p{P}\p{S}]/u,rl=/[\s\p{P}\p{S}]/u,Fu=/[^\s\p{P}\p{S}]/u,Sb=J(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,rl).getRegex(),Uu=/(?!~)[\p{P}\p{S}]/u,Tb=/(?!~)[\s\p{P}\p{S}]/u,Lb=/(?:[^\s\p{P}\p{S}]|~)/u,Ab=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Gu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Cb=J(Gu,"u").replace(/punct/g,zo).getRegex(),Bb=J(Gu,"u").replace(/punct/g,Uu).getRegex(),zu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Db=J(zu,"gu").replace(/notPunctSpace/g,Fu).replace(/punctSpace/g,rl).replace(/punct/g,zo).getRegex(),Mb=J(zu,"gu").replace(/notPunctSpace/g,Lb).replace(/punctSpace/g,Tb).replace(/punct/g,Uu).getRegex(),jb=J("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fu).replace(/punctSpace/g,rl).replace(/punct/g,zo).getRegex(),Rb=J(/\\(punct)/,"gu").replace(/punct/g,zo).getRegex(),Pb=J(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),qb=J(ol).replace("(?:-->|$)","-->").getRegex(),Nb=J("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",qb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vo=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Ob=J(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Vu=J(/^!?\[(label)\]\[(ref)\]/).replace("label",Vo).replace("ref",sl).getRegex(),Ku=J(/^!?\[(ref)\](?:\[\])?/).replace("ref",sl).getRegex(),Hb=J("reflink|nolink(?!\\()","g").replace("reflink",Vu).replace("nolink",Ku).getRegex(),ll={_backpedal:us,anyPunctuation:Rb,autolink:Pb,blockSkip:Ab,br:Hu,code:xb,del:us,emStrongLDelim:Cb,emStrongRDelimAst:Db,emStrongRDelimUnd:jb,escape:Eb,link:Ob,nolink:Ku,punctuation:Sb,reflink:Vu,reflinkSearch:Hb,tag:Nb,text:Ib,url:us},Fb={...ll,link:J(/^!?\[(label)\]\((.*?)\)/).replace("label",Vo).getRegex(),reflink:J(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vo).getRegex()},cl={...ll,emStrongRDelimAst:Mb,emStrongLDelim:Bb,url:J(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Ub={...cl,br:J(Hu).replace("{2,}","*").getRegex(),text:J(cl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ko={normal:al,gfm:$b,pedantic:_b},ms={normal:ll,gfm:cl,breaks:Ub,pedantic:Fb},Gb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wu=e=>Gb[e];function Lt(e,t){if(t){if(Fe.escapeTest.test(e))return e.replace(Fe.escapeReplace,Wu)}else if(Fe.escapeTestNoEncode.test(e))return e.replace(Fe.escapeReplaceNoEncode,Wu);return e}function Yu(e){try{e=encodeURI(e).replace(Fe.percentDecode,"%")}catch{return null}return e}function Qu(e,t){var o;const n=e.replace(Fe.findPipe,(a,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Fe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Fe.slashPipe,"|");return i}function fs(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function zb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Zu(e,t,n,i,s){const o=t.href,a=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Vb(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(o=>{const a=o.match(n.other.beginningSpace);if(a===null)return o;const[r]=a;return r.length>=s.length?o.slice(s.length):o}).join(`
`)}var Wo=class{constructor(e){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=e||He}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fs(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Vb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=fs(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fs(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=fs(t[0],`
`).split(`
`),i="",s="";const o=[];for(;n.length>0;){let a=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),a=!0;else if(!a)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,n.length===0)break;const f=o.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),w=this.blockquote(b);o[o.length-1]=w,i=i.substring(0,i.length-g.raw.length)+w.raw,s=s.substring(0,s.length-g.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),w=this.list(b);o[o.length-1]=w,i=i.substring(0,i.length-f.raw.length)+w.raw,s=s.substring(0,s.length-g.raw.length)+w.raw,n=b.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const o=this.rules.other.listItemRegex(n);let a=!1;for(;e;){let l=!1,c="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,$=>" ".repeat(3*$.length)),f=e.split(`
`,1)[0],g=!p.trim(),b=0;if(this.options.pedantic?(b=2,d=p.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=p.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const $=this.rules.other.nextBulletRegex(b),y=this.rules.other.hrRegex(b),E=this.rules.other.fencesBeginRegex(b),T=this.rules.other.headingBeginRegex(b),F=this.rules.other.htmlBeginRegex(b);for(;e;){const L=e.split(`
`,1)[0];let P;if(f=L,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),P=f):P=f.replace(this.rules.other.tabCharGlobal,"    "),E.test(f)||T.test(f)||F.test(f)||$.test(f)||y.test(f))break;if(P.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+P.slice(b);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(p)||T.test(p)||y.test(p))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=L+`
`,e=e.substring(L.length+1),p=P.slice(b)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0));let w=null,k;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&(k=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!w,checked:k,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var a;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Qu(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(const r of s)o.rows.push(Qu(r,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const o=fs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{const o=zb(t[2],"()");if(o===-2)return;if(o>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Zu(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Zu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const o=[...i[0]].length-1;let a,r,l=o,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(i=d.exec(t))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(r=[...a].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&o%3&&!((o+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const p=[...i[0]][0].length,f=e.slice(0,o+i.index+p+r);if(Math.min(o,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Kt=class ju{constructor(t){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"tokenizer");ce(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||He,this.options.tokenizer=this.options.tokenizer||new Wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Fe,block:Ko.normal,inline:ms.normal};this.options.pedantic?(n.block=Ko.pedantic,n.inline=ms.pedantic):this.options.gfm&&(n.block=Ko.gfm,this.options.breaks?n.inline=ms.breaks:n.inline=ms.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ko,inline:ms}}static lex(t,n){return new ju(n).lex(t)}static lexInline(t,n){return new ju(n).inlineTokens(t)}lex(t){t=t.replace(Fe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,a;for(this.options.pedantic&&(t=t.replace(Fe.tabCharGlobal,"    ").replace(Fe.spaceLine,""));t;){let r;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let o=!1,a="";for(;t;){o||(a=""),o=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,a)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(a=d.raw.slice(-1)),o=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Yo=class{constructor(e){ce(this,"options");ce(this,"parser");this.options=e||He}space(e){return""}code({text:e,lang:t,escaped:n}){var o;const i=(o=(t||"").match(Fe.notSpaceStart))==null?void 0:o[0],s=e.replace(Fe.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Lt(i)+'">'+(n?s:Lt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Lt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let a=0;a<e.items.length;a++){const r=e.items[a];i+=this.listitem(r)}const s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Lt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Lt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Yu(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Lt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Yu(e);if(s===null)return Lt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Lt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Lt(e.text)}},dl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Wt=class Ru{constructor(t){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=t||He,this.options.renderer=this.options.renderer||new Yo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new dl}static parse(t,n){return new Ru(n).parse(t)}static parseInline(t,n){return new Ru(n).parseInline(t)}parse(t,n=!0){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;a+1<t.length&&t[a+1].type==="text";)c=t[++a],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Qo=($u=class{constructor(e){ce(this,"options");ce(this,"block");this.options=e||He}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Kt.lex:Kt.lexInline}provideParser(){return this.block?Wt.parse:Wt.parseInline}},ce($u,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),$u),Kb=class{constructor(...e){ce(this,"defaults",Vt());ce(this,"options",this.setOptions);ce(this,"parse",this.parseMarkdown(!0));ce(this,"parseInline",this.parseMarkdown(!1));ce(this,"Parser",Wt);ce(this,"Renderer",Yo);ce(this,"TextRenderer",dl);ce(this,"Lexer",Kt);ce(this,"Tokenizer",Wo);ce(this,"Hooks",Qo);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{const a=o;for(const r of a.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of a.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const a=o;n=n.concat(this.walkTokens(a.items,t));break}default:{const a=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{const l=a[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let r=s.renderer.apply(this,a);return r===!1&&(r=o.apply(this,a)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Yo(this.defaults);for(const o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const a=o,r=n.renderer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Wo(this.defaults);for(const o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const a=o,r=n.tokenizer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Qo;for(const o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const a=o,r=n.hooks[a],l=s[a];Qo.passThroughHooks.has(o)?s[a]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(p=>l.call(s,p));const d=r.call(s,c);return l.call(s,d)}:s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(a){let r=[];return r.push(o.call(this,a)),s&&(r=r.concat(s.call(this,a))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Kt.lex(e,t??this.defaults)}parser(e,t){return Wt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},o={...this.defaults,...s},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const r=o.hooks?o.hooks.provideLexer():e?Kt.lex:Kt.lexInline,l=o.hooks?o.hooks.provideParser():e?Wt.parse:Wt.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(n):n).then(c=>r(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>l(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(a);try{o.hooks&&(n=o.hooks.preprocess(n));let c=r(n,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let d=l(c,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(c){return a(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Lt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Dn=new Kb;function Q(e,t){return Dn.parse(e,t)}Q.options=Q.setOptions=function(e){return Dn.setOptions(e),Q.defaults=Dn.defaults,Bn(Q.defaults),Q},Q.getDefaults=Vt,Q.defaults=He,Q.use=function(...e){return Dn.use(...e),Q.defaults=Dn.defaults,Bn(Q.defaults),Q},Q.walkTokens=function(e,t){return Dn.walkTokens(e,t)},Q.parseInline=Dn.parseInline,Q.Parser=Wt,Q.parser=Wt.parse,Q.Renderer=Yo,Q.TextRenderer=dl,Q.Lexer=Kt,Q.lexer=Kt.lex,Q.Tokenizer=Wo,Q.Hooks=Qo,Q.parse=Q,Q.options,Q.setOptions,Q.use,Q.walkTokens,Q.parseInline,Wt.parse,Kt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Xu,setPrototypeOf:Ju,isFrozen:Wb,getPrototypeOf:Yb,getOwnPropertyDescriptor:Qb}=Object;let{freeze:Ue,seal:ct,create:ul}=Object,{apply:pl,construct:ml}=typeof Reflect<"u"&&Reflect;Ue||(Ue=function(t){return t}),ct||(ct=function(t){return t}),pl||(pl=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)}),ml||(ml=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Zo=ze(Array.prototype.forEach),Zb=ze(Array.prototype.lastIndexOf),ep=ze(Array.prototype.pop),gs=ze(Array.prototype.push),Xb=ze(Array.prototype.splice),Xo=ze(String.prototype.toLowerCase),fl=ze(String.prototype.toString),gl=ze(String.prototype.match),hs=ze(String.prototype.replace),Jb=ze(String.prototype.indexOf),ey=ze(String.prototype.trim),vt=ze(Object.prototype.hasOwnProperty),Ge=ze(RegExp.prototype.test),vs=ty(TypeError);function ze(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return pl(e,t,i)}}function ty(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ml(e,n)}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xo;Ju&&Ju(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Wb(t)||(t[i]=o),s=o)}e[s]=!0}return e}function ny(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function At(e){const t=ul(null);for(const[n,i]of Xu(e))vt(e,n)&&(Array.isArray(i)?t[n]=ny(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=At(i):t[n]=i);return t}function bs(e,t){for(;e!==null;){const i=Qb(e,t);if(i){if(i.get)return ze(i.get);if(typeof i.value=="function")return ze(i.value)}e=Yb(e)}function n(){return null}return n}const tp=Ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hl=Ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vl=Ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),iy=Ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bl=Ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),sy=Ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),np=Ue(["#text"]),ip=Ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yl=Ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),sp=Ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Jo=Ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),oy=ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ay=ct(/<%[\w\W]*|[\w\W]*%>/gm),ry=ct(/\$\{[\w\W]*/gm),ly=ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),cy=ct(/^aria-[\-\w]+$/),op=ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),dy=ct(/^(?:\w+script|data):/i),uy=ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ap=ct(/^html$/i),py=ct(/^[a-z][.\w]*(-[.\w]+)+$/i);var rp=Object.freeze({__proto__:null,ARIA_ATTR:cy,ATTR_WHITESPACE:uy,CUSTOM_ELEMENT:py,DATA_ATTR:ly,DOCTYPE_NAME:ap,ERB_EXPR:ay,IS_ALLOWED_URI:op,IS_SCRIPT_OR_DATA:dy,MUSTACHE_EXPR:oy,TMPLIT_EXPR:ry});const ys={element:1,text:3,progressingInstruction:7,comment:8,document:9},my=function(){return typeof window>"u"?null:window},fy=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},lp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function cp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:my();const t=R=>cp(R);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==ys.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,b=l.prototype,w=bs(b,"cloneNode"),k=bs(b,"remove"),$=bs(b,"nextSibling"),y=bs(b,"childNodes"),E=bs(b,"parentNode");if(typeof a=="function"){const R=n.createElement("template");R.content&&R.content.ownerDocument&&(n=R.content.ownerDocument)}let T,F="";const{implementation:L,createNodeIterator:P,createDocumentFragment:K,getElementsByTagName:Y}=n,{importNode:q}=i;let Z=lp();t.isSupported=typeof Xu=="function"&&typeof E=="function"&&L&&L.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:I,ERB_EXPR:D,TMPLIT_EXPR:j,DATA_ATTR:me,ARIA_ATTR:ve,IS_SCRIPT_OR_DATA:Se,ATTR_WHITESPACE:Ut,CUSTOM_ELEMENT:B}=rp;let{IS_ALLOWED_URI:he}=rp,te=null;const oe=G({},[...tp,...hl,...vl,...bl,...np]);let _e=null;const zv=G({},[...ip,...yl,...sp,...Jo]);let be=Object.seal(ul(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ho=null,_u=null;const ss=Object.seal(ul(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Vv=!0,Eu=!0,Kv=!1,Wv=!0,os=!1,Yr=!0,oi=!1,xu=!1,Iu=!1,as=!1,Qr=!1,Zr=!1,Yv=!0,Qv=!1;const UT="user-content-";let Su=!0,Fo=!1,rs={},Gt=null;const Tu=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Zv=null;const Xv=G({},["audio","video","img","source","image","track"]);let Lu=null;const Jv=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Xr="http://www.w3.org/1998/Math/MathML",Jr="http://www.w3.org/2000/svg",cn="http://www.w3.org/1999/xhtml";let ls=cn,Au=!1,Cu=null;const GT=G({},[Xr,Jr,cn],fl);let el=G({},["mi","mo","mn","ms","mtext"]),tl=G({},["annotation-xml"]);const zT=G({},["title","style","font","a","script"]);let Uo=null;const VT=["application/xhtml+xml","text/html"],KT="text/html";let Te=null,cs=null;const WT=n.createElement("form"),eb=function(v){return v instanceof RegExp||v instanceof Function},Bu=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(cs&&cs===v)){if((!v||typeof v!="object")&&(v={}),v=At(v),Uo=VT.indexOf(v.PARSER_MEDIA_TYPE)===-1?KT:v.PARSER_MEDIA_TYPE,Te=Uo==="application/xhtml+xml"?fl:Xo,te=vt(v,"ALLOWED_TAGS")?G({},v.ALLOWED_TAGS,Te):oe,_e=vt(v,"ALLOWED_ATTR")?G({},v.ALLOWED_ATTR,Te):zv,Cu=vt(v,"ALLOWED_NAMESPACES")?G({},v.ALLOWED_NAMESPACES,fl):GT,Lu=vt(v,"ADD_URI_SAFE_ATTR")?G(At(Jv),v.ADD_URI_SAFE_ATTR,Te):Jv,Zv=vt(v,"ADD_DATA_URI_TAGS")?G(At(Xv),v.ADD_DATA_URI_TAGS,Te):Xv,Gt=vt(v,"FORBID_CONTENTS")?G({},v.FORBID_CONTENTS,Te):Tu,Ho=vt(v,"FORBID_TAGS")?G({},v.FORBID_TAGS,Te):At({}),_u=vt(v,"FORBID_ATTR")?G({},v.FORBID_ATTR,Te):At({}),rs=vt(v,"USE_PROFILES")?v.USE_PROFILES:!1,Vv=v.ALLOW_ARIA_ATTR!==!1,Eu=v.ALLOW_DATA_ATTR!==!1,Kv=v.ALLOW_UNKNOWN_PROTOCOLS||!1,Wv=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,os=v.SAFE_FOR_TEMPLATES||!1,Yr=v.SAFE_FOR_XML!==!1,oi=v.WHOLE_DOCUMENT||!1,as=v.RETURN_DOM||!1,Qr=v.RETURN_DOM_FRAGMENT||!1,Zr=v.RETURN_TRUSTED_TYPE||!1,Iu=v.FORCE_BODY||!1,Yv=v.SANITIZE_DOM!==!1,Qv=v.SANITIZE_NAMED_PROPS||!1,Su=v.KEEP_CONTENT!==!1,Fo=v.IN_PLACE||!1,he=v.ALLOWED_URI_REGEXP||op,ls=v.NAMESPACE||cn,el=v.MATHML_TEXT_INTEGRATION_POINTS||el,tl=v.HTML_INTEGRATION_POINTS||tl,be=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&eb(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&eb(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),os&&(Eu=!1),Qr&&(as=!0),rs&&(te=G({},np),_e=[],rs.html===!0&&(G(te,tp),G(_e,ip)),rs.svg===!0&&(G(te,hl),G(_e,yl),G(_e,Jo)),rs.svgFilters===!0&&(G(te,vl),G(_e,yl),G(_e,Jo)),rs.mathMl===!0&&(G(te,bl),G(_e,sp),G(_e,Jo))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?ss.tagCheck=v.ADD_TAGS:(te===oe&&(te=At(te)),G(te,v.ADD_TAGS,Te))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?ss.attributeCheck=v.ADD_ATTR:(_e===zv&&(_e=At(_e)),G(_e,v.ADD_ATTR,Te))),v.ADD_URI_SAFE_ATTR&&G(Lu,v.ADD_URI_SAFE_ATTR,Te),v.FORBID_CONTENTS&&(Gt===Tu&&(Gt=At(Gt)),G(Gt,v.FORBID_CONTENTS,Te)),v.ADD_FORBID_CONTENTS&&(Gt===Tu&&(Gt=At(Gt)),G(Gt,v.ADD_FORBID_CONTENTS,Te)),Su&&(te["#text"]=!0),oi&&G(te,["html","head","body"]),te.table&&(G(te,["tbody"]),delete Ho.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw vs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');T=v.TRUSTED_TYPES_POLICY,F=T.createHTML("")}else T===void 0&&(T=fy(g,s)),T!==null&&typeof F=="string"&&(F=T.createHTML(""));Ue&&Ue(v),cs=v}},tb=G({},[...hl,...vl,...iy]),nb=G({},[...bl,...sy]),YT=function(v){let S=E(v);(!S||!S.tagName)&&(S={namespaceURI:ls,tagName:"template"});const M=Xo(v.tagName),fe=Xo(S.tagName);return Cu[v.namespaceURI]?v.namespaceURI===Jr?S.namespaceURI===cn?M==="svg":S.namespaceURI===Xr?M==="svg"&&(fe==="annotation-xml"||el[fe]):!!tb[M]:v.namespaceURI===Xr?S.namespaceURI===cn?M==="math":S.namespaceURI===Jr?M==="math"&&tl[fe]:!!nb[M]:v.namespaceURI===cn?S.namespaceURI===Jr&&!tl[fe]||S.namespaceURI===Xr&&!el[fe]?!1:!nb[M]&&(zT[M]||!tb[M]):!!(Uo==="application/xhtml+xml"&&Cu[v.namespaceURI]):!1},zt=function(v){gs(t.removed,{element:v});try{E(v).removeChild(v)}catch{k(v)}},ai=function(v,S){try{gs(t.removed,{attribute:S.getAttributeNode(v),from:S})}catch{gs(t.removed,{attribute:null,from:S})}if(S.removeAttribute(v),v==="is")if(as||Qr)try{zt(S)}catch{}else try{S.setAttribute(v,"")}catch{}},ib=function(v){let S=null,M=null;if(Iu)v="<remove></remove>"+v;else{const Ee=gl(v,/^[\r\n\t ]+/);M=Ee&&Ee[0]}Uo==="application/xhtml+xml"&&ls===cn&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const fe=T?T.createHTML(v):v;if(ls===cn)try{S=new f().parseFromString(fe,Uo)}catch{}if(!S||!S.documentElement){S=L.createDocument(ls,"template",null);try{S.documentElement.innerHTML=Au?F:fe}catch{}}const Oe=S.body||S.documentElement;return v&&M&&Oe.insertBefore(n.createTextNode(M),Oe.childNodes[0]||null),ls===cn?Y.call(S,oi?"html":"body")[0]:oi?S.documentElement:Oe},sb=function(v){return P.call(v.ownerDocument||v,v,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Du=function(v){return v instanceof p&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof d)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},ob=function(v){return typeof r=="function"&&v instanceof r};function dn(R,v,S){Zo(R,M=>{M.call(t,v,S,cs)})}const ab=function(v){let S=null;if(dn(Z.beforeSanitizeElements,v,null),Du(v))return zt(v),!0;const M=Te(v.nodeName);if(dn(Z.uponSanitizeElement,v,{tagName:M,allowedTags:te}),Yr&&v.hasChildNodes()&&!ob(v.firstElementChild)&&Ge(/<[/\w!]/g,v.innerHTML)&&Ge(/<[/\w!]/g,v.textContent)||v.nodeType===ys.progressingInstruction||Yr&&v.nodeType===ys.comment&&Ge(/<[/\w]/g,v.data))return zt(v),!0;if(!(ss.tagCheck instanceof Function&&ss.tagCheck(M))&&(!te[M]||Ho[M])){if(!Ho[M]&&lb(M)&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,M)||be.tagNameCheck instanceof Function&&be.tagNameCheck(M)))return!1;if(Su&&!Gt[M]){const fe=E(v)||v.parentNode,Oe=y(v)||v.childNodes;if(Oe&&fe){const Ee=Oe.length;for(let at=Ee-1;at>=0;--at){const un=w(Oe[at],!0);un.__removalCount=(v.__removalCount||0)+1,fe.insertBefore(un,$(v))}}}return zt(v),!0}return v instanceof l&&!YT(v)||(M==="noscript"||M==="noembed"||M==="noframes")&&Ge(/<\/no(script|embed|frames)/i,v.innerHTML)?(zt(v),!0):(os&&v.nodeType===ys.text&&(S=v.textContent,Zo([I,D,j],fe=>{S=hs(S,fe," ")}),v.textContent!==S&&(gs(t.removed,{element:v.cloneNode()}),v.textContent=S)),dn(Z.afterSanitizeElements,v,null),!1)},rb=function(v,S,M){if(Yv&&(S==="id"||S==="name")&&(M in n||M in WT))return!1;if(!(Eu&&!_u[S]&&Ge(me,S))){if(!(Vv&&Ge(ve,S))){if(!(ss.attributeCheck instanceof Function&&ss.attributeCheck(S,v))){if(!_e[S]||_u[S]){if(!(lb(v)&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,v)||be.tagNameCheck instanceof Function&&be.tagNameCheck(v))&&(be.attributeNameCheck instanceof RegExp&&Ge(be.attributeNameCheck,S)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(S,v))||S==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,M)||be.tagNameCheck instanceof Function&&be.tagNameCheck(M))))return!1}else if(!Lu[S]){if(!Ge(he,hs(M,Ut,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&v!=="script"&&Jb(M,"data:")===0&&Zv[v])){if(!(Kv&&!Ge(Se,hs(M,Ut,"")))){if(M)return!1}}}}}}}return!0},lb=function(v){return v!=="annotation-xml"&&gl(v,B)},cb=function(v){dn(Z.beforeSanitizeAttributes,v,null);const{attributes:S}=v;if(!S||Du(v))return;const M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0};let fe=S.length;for(;fe--;){const Oe=S[fe],{name:Ee,namespaceURI:at,value:un}=Oe,ds=Te(Ee),Mu=un;let Re=Ee==="value"?Mu:ey(Mu);if(M.attrName=ds,M.attrValue=Re,M.keepAttr=!0,M.forceKeepAttr=void 0,dn(Z.uponSanitizeAttribute,v,M),Re=M.attrValue,Qv&&(ds==="id"||ds==="name")&&(ai(Ee,v),Re=UT+Re),Yr&&Ge(/((--!?|])>)|<\/(style|title|textarea)/i,Re)){ai(Ee,v);continue}if(ds==="attributename"&&gl(Re,"href")){ai(Ee,v);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){ai(Ee,v);continue}if(!Wv&&Ge(/\/>/i,Re)){ai(Ee,v);continue}os&&Zo([I,D,j],ub=>{Re=hs(Re,ub," ")});const db=Te(v.nodeName);if(!rb(db,ds,Re)){ai(Ee,v);continue}if(T&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!at)switch(g.getAttributeType(db,ds)){case"TrustedHTML":{Re=T.createHTML(Re);break}case"TrustedScriptURL":{Re=T.createScriptURL(Re);break}}if(Re!==Mu)try{at?v.setAttributeNS(at,Ee,Re):v.setAttribute(Ee,Re),Du(v)?zt(v):ep(t.removed)}catch{ai(Ee,v)}}dn(Z.afterSanitizeAttributes,v,null)},QT=function R(v){let S=null;const M=sb(v);for(dn(Z.beforeSanitizeShadowDOM,v,null);S=M.nextNode();)dn(Z.uponSanitizeShadowNode,S,null),ab(S),cb(S),S.content instanceof o&&R(S.content);dn(Z.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(R){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,M=null,fe=null,Oe=null;if(Au=!R,Au&&(R="<!-->"),typeof R!="string"&&!ob(R))if(typeof R.toString=="function"){if(R=R.toString(),typeof R!="string")throw vs("dirty is not a string, aborting")}else throw vs("toString is not a function");if(!t.isSupported)return R;if(xu||Bu(v),t.removed=[],typeof R=="string"&&(Fo=!1),Fo){if(R.nodeName){const un=Te(R.nodeName);if(!te[un]||Ho[un])throw vs("root node is forbidden and cannot be sanitized in-place")}}else if(R instanceof r)S=ib("<!---->"),M=S.ownerDocument.importNode(R,!0),M.nodeType===ys.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?S=M:S.appendChild(M);else{if(!as&&!os&&!oi&&R.indexOf("<")===-1)return T&&Zr?T.createHTML(R):R;if(S=ib(R),!S)return as?null:Zr?F:""}S&&Iu&&zt(S.firstChild);const Ee=sb(Fo?R:S);for(;fe=Ee.nextNode();)ab(fe),cb(fe),fe.content instanceof o&&QT(fe.content);if(Fo)return R;if(as){if(Qr)for(Oe=K.call(S.ownerDocument);S.firstChild;)Oe.appendChild(S.firstChild);else Oe=S;return(_e.shadowroot||_e.shadowrootmode)&&(Oe=q.call(i,Oe,!0)),Oe}let at=oi?S.outerHTML:S.innerHTML;return oi&&te["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Ge(ap,S.ownerDocument.doctype.name)&&(at="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+at),os&&Zo([I,D,j],un=>{at=hs(at,un," ")}),T&&Zr?T.createHTML(at):at},t.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Bu(R),xu=!0},t.clearConfig=function(){cs=null,xu=!1},t.isValidAttribute=function(R,v,S){cs||Bu({});const M=Te(R),fe=Te(v);return rb(M,fe,S)},t.addHook=function(R,v){typeof v=="function"&&gs(Z[R],v)},t.removeHook=function(R,v){if(v!==void 0){const S=Zb(Z[R],v);return S===-1?void 0:Xb(Z[R],S,1)[0]}return ep(Z[R])},t.removeHooks=function(R){Z[R]=[]},t.removeAllHooks=function(){Z=lp()},t}var dp=cp();const wl="chaotic_";function et(e){try{return localStorage.getItem(wl+e)}catch{return null}}function dt(e,t){try{localStorage.setItem(wl+e,t)}catch{}}function Ct(e){try{localStorage.removeItem(wl+e)}catch{}}function kl(){return et("token")}function gy(e){e?dt("token",e):Ct("token")}function hy(){return et("theme")}function vy(e){dt("theme",e)}function up(){return et("last_project")}function pp(e){dt("last_project",e)}function by(){return et("onboarding_complete")==="true"}function yy(){dt("onboarding_complete","true")}function wy(){Ct("onboarding_complete")}function ky(e){return e?et(`issues_filters_${e}`):null}function $y(e,t){e&&(t?dt(`issues_filters_${e}`,t):Ct(`issues_filters_${e}`))}function mp(e){return et(`comment_draft_${e}`)}function ea(e,t){t?dt(`comment_draft_${e}`,t):Ct(`comment_draft_${e}`)}function fp(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function ws(e){const t=et(`description_draft_${e}`);if(!t)return null;const n=fp(t);return n?n.draft:t}function gp(e){const t=et(`description_draft_${e}`);if(!t)return null;const n=fp(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Mn(e,t,n=""){t?dt(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ct(`description_draft_${e}`)}function hp(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function vp(e){var n;const t=et(`document_draft_${e}`);return t?((n=hp(t))==null?void 0:n.draft)??null:null}function _y(e){const t=et(`document_draft_${e}`);if(!t)return null;const n=hp(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function ta(e,t,n=null){t&&(t.title||t.content||t.icon)?dt(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ct(`document_draft_${e}`)}function Ey(){return{title:et("create_issue_title"),description:et("create_issue_description")}}function bp(e,t){e?dt("create_issue_title",e):Ct("create_issue_title"),t?dt("create_issue_description",t):Ct("create_issue_description")}function xy(){Ct("create_issue_title"),Ct("create_issue_description")}function Iy(){return et("doc_view_mode")}function Sy(e){dt("doc_view_mode",e)}function Ty(){return et("composer_mode")==="markdown"?"markdown":"rich"}function yp(e){dt("composer_mode",e==="markdown"?"markdown":"rich")}const Ly="chaotic-boot-cache",$l="snapshot",_l="last",wp=1,Ay=336*60*60*1e3,Cy=250;let jn=null;function By(){return jn||(jn=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(Ly,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore($l),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),jn=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),jn.catch(()=>{jn=null}),jn)}function El(e,t){return By().then(n=>new Promise((i,s)=>{const o=n.transaction($l,e),a=t(o.objectStore($l));o.oncomplete=()=>i(a==null?void 0:a.result),o.onerror=()=>s(o.error),o.onabort=()=>s(o.error)}))}function kp(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Dy(e){if(!e)return Promise.resolve(null);const t=El("readonly",i=>i.get(_l)).then(i=>!i||i.version!==wp||i.userId!==e||!(Date.now()-i.savedAt<Ay)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Cy));return Promise.race([t,n])}function My(e,t){if(!e)return Promise.resolve();const n={...t,version:wp,userId:e,savedAt:Date.now()};return El("readwrite",i=>i.put(n,_l)).then(()=>{},()=>{})}function xl(){return El("readwrite",e=>e.delete(_l)).then(()=>{},()=>{})}const ks=/^[0-9a-f-]{36}$/,jy=/^\/api\/attachments\/([0-9a-f-]{36})\/content$/;function $p(e){if(typeof e!="string"||e==="")return null;const t=window.location.origin;let n;try{n=new URL(e,t)}catch{return null}if(n.origin!==t||n.search!==""||n.hash!==""||n.username||n.password)return null;const i=jy.exec(n.pathname);return i?i[1]:null}function Ry(e){for(const t of e.querySelectorAll("img[src]")){const n=$p(t.getAttribute("src"));n&&(t.removeAttribute("src"),t.removeAttribute("srcset"),t.setAttribute("data-attachment-id",n),t.classList.add("attachment-inline"),!t.closest("a[href]")&&(t.setAttribute("data-action","open-attachment"),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label",`View ${t.getAttribute("alt")||"image"}`)))}for(const t of e.querySelectorAll("a[href]")){const n=$p(t.getAttribute("href"));n&&(t.setAttribute("data-attachment-ref",n),t.setAttribute("data-action","open-attachment"),t.classList.add("attachment-link"))}}const _p="/api";class Py{constructor(){this.token=kl()}setToken(t){this.token=t,gy(t)}getToken(){return this.token}async request(t,n,i=null,{headers:s=null}={}){const o={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(o.Authorization=`Bearer ${this.token}`),s&&Object.assign(o,s);const a={method:t,headers:o},r=typeof Blob<"u"&&i instanceof Blob;r&&(o["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=r?i:JSON.stringify(i));let l;try{l=await fetch(`${_p}${n}`,a)}catch(d){const p=new Error("Network error - check your connection");throw p.isNetworkError=!0,p.cause=d,p}if(l.status===204)return null;let c;try{c=await l.json()}catch{const d=l.headers.get("content-type")||"unknown";throw l.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${l.status})`)}if(!l.ok){let d;typeof c.detail=="string"?d=c.detail:c.detail&&typeof c.detail=="object"&&c.detail.message?d=c.detail.message:d="An error occurred";const p=new Error(d);throw p.status=l.status,p.detail=c.detail,p}return c}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),xl()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async uploadAgentAvatar(t,n){return this.request("PUT",`/agents/${t}/avatar`,n)}async deleteAgentAvatar(t){return this.request("DELETE",`/agents/${t}/avatar`)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(o=>n.append(i,o)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:o=null,skip:a=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),o&&c.set("order",o),c.set("skip",String(a)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,o=50){let a=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${o}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,o])=>{o==null||o===""||(Array.isArray(o)?o.forEach(a=>i.append(s,a)):i.append(s,o))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let o=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getEpicOverview(t,{activitySkip:n=0,activityLimit:i=50}={}){const s=new URLSearchParams({activity_skip:n,activity_limit:i});return this.request("GET",`/issues/${t}/epic-overview?${s.toString()}`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getAttachments(t){return this.request("GET",`/issues/${t}/attachments`)}async uploadAttachment(t,n,{idempotencyKey:i}={}){const s=encodeURIComponent(n.name||"file"),o=i?{"Idempotency-Key":i}:null;return this.request("POST",`/issues/${t}/attachments?filename=${s}`,n,{headers:o})}async deleteAttachment(t){return this.request("DELETE",`/attachments/${encodeURIComponent(t)}`)}async fetchAttachmentContent(t){if(!ks.test(t))throw new Error("Not an attachment id");const n={};this.token&&(n.Authorization=`Bearer ${this.token}`);let i;try{i=await fetch(`${_p}/attachments/${t}/content`,{headers:n,credentials:"same-origin",redirect:"error"})}catch(s){const o=new Error("Network error - check your connection");throw o.isNetworkError=!0,o.cause=s,o}if(!i.ok){let s=null;try{s=(await i.json()).detail}catch{}const o=typeof s=="string"?s:(s==null?void 0:s.message)||`Request failed (${i.status})`,a=new Error(o);throw a.status=i.status,a.detail=s,a}return i.blob()}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null,o=null){let a=`/teams/${t}/documents`;const r=[];return n&&r.push(`project_id=${n}`),s&&r.push(`sprint_id=${s}`),i&&r.push(`search=${encodeURIComponent(i)}`),o&&r.push(`limit=${encodeURIComponent(o)}`),r.length&&(a+=`?${r.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/teams/${t}/agents`,o)}async createProjectAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/projects/${t}/agents`,o)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,kinds:i=null,includeArchived:s=!1,skip:o=0,limit:a=50}={}){const r=new URLSearchParams({team_id:t,skip:o,limit:a});n&&r.set("unread","true"),s&&r.set("include_archived","true");for(const l of i||[])r.append("kind",l);return this.request("GET",`/inbox?${r.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new Py;function Ve(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Pe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Le(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ae(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function qy(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function qe(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),o=Math.floor(i/36e5),a=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:a<7?`${a}d ago`:t.toLocaleDateString()}function bt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Il=/^\/api\/avatars\/[0-9a-f]{64}$/;function Ep(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Il.test(e))}function yt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Ep(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function xp(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function na(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return xp(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}const Ny=7,Sl=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),Ip=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),Oy='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',Hy='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Sp=!1;function Fy(){Sp||(Sp=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Sl,set(e){var t;Sl.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...Ip,set(e){var t;Ip.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let ye=null,Uy=0;function Tl({restoreFocus:e=!0}={}){return ye?(ye.close(e),!0):!1}function Gy(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if((ye==null?void 0:ye.select)!==e){const s=document.activeElement;Ll(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function zy(e=document){e.querySelectorAll("select[data-picker]").forEach(Tp)}function Tp(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${Oy}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Lp(e,t),(ye==null?void 0:ye.select)===e&&ye.refresh()};return e._picker={button:t,sync:n},Fy(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(ye==null?void 0:ye.select)===e?Tl():Ll(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(ye==null?void 0:ye.select)!==e&&Ll(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function Lp(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",o=t.querySelector(".picker-label");o.textContent=i,s&&o.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const a=e.getAttribute("aria-label");a&&t.setAttribute("aria-label",i?`${a}: ${i}`:a)}function Ap(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function Vy(){const e=t=>{t.preventDefault(),t.stopPropagation()};document.addEventListener("click",e,{capture:!0,once:!0}),setTimeout(()=>document.removeEventListener("click",e,!0),1e3)}function Ll(e,t,n){Tl({restoreFocus:!1});const i=Ap(e),s=`picker-list-${++Uy}`,o=i.length>=Ny,a=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${o?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=I=>Math.max(0,I.findIndex(D=>!D.disabled));let p=i.findIndex(I=>I.value===e.value&&!I.disabled);p===-1&&(p=d(i));let f=i;const g=()=>{var D;l.innerHTML=f.length?f.map((j,me)=>`
                <li role="option" id="${s}-${me}" class="picker-option${me===p?" active":""}${j.disabled?" disabled":""}"
                    data-index="${me}" data-value="${m(j.value)}"
                    aria-selected="${j.value===e.value?"true":"false"}"${j.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(j.text)}</span>
                    ${j.hint?`<span class="picker-option-hint">${u(j.hint)}</span>`:""}
                    ${j.value===e.value?`<span class="picker-check">${Hy}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const I=l.querySelector(".picker-option.active");I?(c||l).setAttribute("aria-activedescendant",I.id):(c||l).removeAttribute("aria-activedescendant"),(D=I==null?void 0:I.scrollIntoView)==null||D.call(I,{block:"nearest"})},b=()=>{var he,te;const I=l.scrollTop,D=t.getBoundingClientRect(),j=((he=window.visualViewport)==null?void 0:he.width)||window.innerWidth,me=((te=window.visualViewport)==null?void 0:te.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(D.width,220),j-16)}px`,r.style.maxHeight="",r.style.top="0px";const ve=r.offsetWidth||Math.max(D.width,220),Se=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(D.left,j-ve-8))}px`;const Ut=me-D.bottom-12,B=D.top-12;if(Se>Ut&&B>Ut){const oe=Math.max(120,B);r.style.maxHeight=`${oe}px`,r.style.top=`${Math.max(8,D.top-4-Math.min(Se,oe))}px`}else r.style.maxHeight=`${Math.max(120,Ut)}px`,r.style.top=`${D.bottom+4}px`;l.scrollTop=I},w=I=>{if(!I||I.disabled||e.disabled)return;if(![...e.options].some(j=>j.value===I.value&&!j.disabled)){q(!0);return}const D=I.value!==e.value;Sl.set.call(e,I.value),Lp(e,t),q(!0),D&&e.dispatchEvent(new Event("change",{bubbles:!0}))},k=I=>{let D=p+I;for(;D>=0&&D<f.length&&f[D].disabled;)D+=I;D<0||D>=f.length||(p=D,g())},$=(I,D)=>{let j=I;for(;j>=0&&j<f.length&&f[j].disabled;)j+=D;j>=0&&j<f.length&&(p=j,g())},y=I=>{if(!(I.metaKey||I.ctrlKey))switch(I.stopPropagation(),I.key){case"ArrowDown":I.preventDefault(),k(1);break;case"ArrowUp":I.preventDefault(),k(-1);break;case"Home":c||(I.preventDefault(),$(0,1));break;case"End":c||(I.preventDefault(),$(f.length-1,-1));break;case"PageDown":I.preventDefault(),$(Math.min(f.length-1,p+8),-1);break;case"PageUp":I.preventDefault(),$(Math.max(0,p-8),1);break;case"Enter":I.preventDefault(),w(f[p]);break;case"Escape":I.preventDefault(),q(!0);break;case"Tab":q(!0);break;case" ":c||(I.preventDefault(),w(f[p]));break;default:if(!c&&I.key.length===1&&!I.metaKey&&!I.ctrlKey&&!I.altKey){E=(Date.now()-T<700?E:"")+I.key.toLowerCase(),T=Date.now();const D=f.findIndex(j=>!j.disabled&&j.text.toLowerCase().startsWith(E));D!==-1&&(p=D,g())}}};let E="",T=0;const F=()=>{const I=c.value.trim().toLowerCase();f=I?i.filter(j=>j.text.toLowerCase().includes(I)||j.hint.toLowerCase().includes(I)):i;const D=f.findIndex(j=>j.value===e.value&&!j.disabled);p=!I&&D!==-1?D:d(f),g()},L=I=>{if(r.contains(I.target)||t.contains(I.target))return;const D=t.closest("#modal-overlay");D&&D.contains(I.target)&&!I.target.closest(".modal")&&Vy(),q(!1)},P=I=>{(I==null?void 0:I.type)==="scroll"&&I.target instanceof Node&&r.contains(I.target)||b()},K=I=>{I.key!=="Escape"||r.contains(I.target)||(I.preventDefault(),I.stopPropagation(),q(!0))},Y=()=>q(!1);function q(I){var D,j;(ye==null?void 0:ye.popover)===r&&(ye=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",L,!0),document.removeEventListener("keydown",K,!0),window.removeEventListener("popstate",Y),window.removeEventListener("resize",P),window.removeEventListener("scroll",P,!0),I&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(j=(D=document.activeElement)==null?void 0:D.blur)==null||j.call(D)))}l.addEventListener("click",I=>{const D=I.target.closest(".picker-option");D&&w(f[Number(D.dataset.index)])}),l.addEventListener("mousemove",I=>{const D=I.target.closest(".picker-option");if(!D)return;const j=Number(D.dataset.index);j!==p&&(p=j,g())}),r.addEventListener("keydown",y),c&&c.addEventListener("input",F),document.addEventListener("pointerdown",L,!0),document.addEventListener("keydown",K,!0),window.addEventListener("popstate",Y),window.addEventListener("resize",P),window.addEventListener("scroll",P,!0),ye={select:e,button:t,popover:r,close:q,refresh:()=>{const I=Ap(e);!(I.length===i.length&&I.every((j,me)=>j.value===i[me].value&&j.text===i[me].text&&j.hint===i[me].hint&&j.disabled===i[me].disabled))||e.disabled?q(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),b(),(c||l).focus({preventScroll:!0})}let ri=null;const Ky='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let li=null,$s=!1;function Al(){$s=!0}function Wy(){$s=!1}function Cp(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Yy(){if($s)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function U(){li=document.activeElement,$s=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;Yt(),Tl({restoreFocus:!1}),$s=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),li&&document.contains(li)&&typeof li.focus=="function"&&li.focus(),li=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Ky);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())});function Ke(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function _(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const o=document.createElement("button");o.type="button",o.className="toast-close",o.setAttribute("aria-label","Dismiss"),o.textContent="×",i.appendChild(o),n.appendChild(i);const a=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),p=setTimeout(a,l);return o.addEventListener("click",()=>{clearTimeout(p),a()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),p=setTimeout(a,Math.max(c,500))}),i}function _s(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=_(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Qy(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=Qy(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";_(`Failed to ${e}: ${n}${i}`,"error")}function Yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),ri&&(document.removeEventListener("keydown",ri),ri=null)}function Zy(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Yt(),t&&Ke()&&Cp()}function Es(e){ri&&document.removeEventListener("keydown",ri),ri=e,e&&document.addEventListener("keydown",e)}function xs(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Yt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}let ue={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Cl=new Set;function we(e,t){if(typeof e=="string"){const n=ue[e];ue[e]=t,Bp(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const o=ue[i];ue[i]=s,n.push({key:i,value:s,oldValue:o})}n.forEach(({key:i,value:s,oldValue:o})=>{Bp(i,s,o)})}}function wt(e){return Cl.add(e),()=>Cl.delete(e)}function Bp(e,t,n){t!==n&&Cl.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const re=()=>ue.currentUser,Bt=e=>we("currentUser",e),C=()=>ue.currentView,Rn=e=>we("currentView",e),ne=()=>ue.issues,tt=e=>we("issues",e),Is=()=>ue.detailNavContext,Dt=e=>we("detailNavContext",e),Bl=()=>ue.labels,Ss=e=>we("labels",e),Dp=()=>ue.activeFilterCategory,Xy=e=>we("activeFilterCategory",e),Mp=()=>ue.selectedIssueIndex,Pn=e=>we("selectedIssueIndex",e),Jy=()=>ue.selectedDocIndex,jp=e=>we("selectedDocIndex",e),Rp=()=>ue.selectedBoardIndex,ia=e=>we("selectedBoardIndex",e),ew=()=>ue.selectedInboxIndex,sa=e=>we("selectedInboxIndex",e),tw=()=>ue.selectedSprintIndex,Pp=e=>we("selectedSprintIndex",e),nw=()=>ue.selectedEpicIndex,Ts=e=>we("selectedEpicIndex",e),ie=()=>ue.inboxEntries,Mt=e=>we("inboxEntries",e),oa=()=>ue.inboxUnreadCount,Ls=e=>we("inboxUnreadCount",e),iw=()=>ue.searchDebounceTimer,sw=e=>we("searchDebounceTimer",e),ow=()=>ue.websocket,Dl=e=>we("websocket",e),A=()=>ue.currentTeam,ci=e=>we("currentTeam",e),X=()=>ue.currentProject,kt=e=>we("currentProject",e||null),xe=()=>ue.currentDetailIssue,di=e=>we("currentDetailIssue",e),aw=()=>ue.currentDetailSprints,qp=e=>we("currentDetailSprints",e),Ml=["backlog","todo","in_progress","in_review","done","canceled"],As=["backlog","todo","in_progress","in_review"],Np=["urgent","high","medium","low","no_priority"],jl=["no_priority","urgent","high","medium","low"],Op=["backlog","todo","in_progress","in_review","done"],aa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function qn(e){if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||!!e.isContentEditable}const Rl={};function le(e){Object.assign(Rl,e)}function rw(e){var o;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target&&qn(e.target)||n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Rl[i];if(!s){typeof process<"u"&&((o=process.env)==null?void 0:o.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Hp=!1;function lw(){if(!Hp){Hp=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,rw);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Rl[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function cw(e){const t=document.createElement("template");return t.innerHTML=e,Ry(t.content),t.innerHTML}function ut(e){if(!e)return"";try{Q.setOptions({breaks:!0,gfm:!0});const n=Q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;")),i=dp.sanitize(n,{FORCE_BODY:!0,ALLOW_DATA_ATTR:!1});return i.includes("/api/attachments/")?cw(i):i}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function dw(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),o=Math.floor(s/60),a=Math.floor(o/60),r=Math.floor(a/24);return s<60?"just now":o<60?`${o}m ago`:a<24?`${a}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function W({icon:e,heading:t,description:n,cta:i,variant:s}){const o=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${o}
        </div>
    `}const V={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},ra={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},la={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Fp=0;function Up(e){Fp=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,o]=n.split("__");t+=Gp(s,o,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Gp(e="",t="",n=""){const i=Fp++,s=Object.keys(ra).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),a=(e?ra[e]:ra.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${la[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${a}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${m(String(r))}" placeholder="Value"${l?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function uw(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Gp()),ca()}function pw(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ca()}function mw(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const o=ra[s]||[];i.innerHTML=o.map(a=>`<option value="${a}">${la[a]}</option>`).join(""),zp(e),ca()}function zp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Cs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ca(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Vp(){var i,s,o;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const a of e){const r=(i=a.querySelector(".condition-field"))==null?void 0:i.value,l=(s=a.querySelector(".condition-operator"))==null?void 0:s.value,c=a.querySelector(".condition-value");let d=(o=c==null?void 0:c.value)==null?void 0:o.trim();if(!r&&!l)continue;if(!r)throw Cs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Cs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw Cs(`Duplicate condition: ${r} ${la[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Cs(`Please enter a numeric value for ${r} ${la[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw Cs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return ca(),Object.keys(t).length>0?t:null}le({"add-condition-row":()=>{uw()},"remove-condition-row":(e,t)=>{pw(Number(t.rowId))},"update-operator-options":(e,t)=>{mw(Number(t.rowId))},"toggle-value-input":(e,t)=>{zp(Number(t.rowId))}});let Ce=[];const da="project-switcher",Pl="all";function ua(e=X()){const t=document.getElementById(da);t&&(t.value=e||"")}wt((e,t)=>{e==="currentProject"&&(t&&pp(t),ua(t),Bw(t||""))});function Kp(){pp(Pl),kt(null)}const pa={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function se(){return Ce}function fw(e){Ce=e}function ui(e){const t=Ce.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return pa[n]||pa.fibonacci}function pi(e,t){if(e==null)return"No estimate";const i=ui(t).find(s=>s.value===e);return i?i.label:`${e} points`}function ma(e,t){return e==null||e===0?!1:!ui(t).some(i=>i.value===e)}function gw(e){const t=Ce.find(a=>a.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(pa[n]||pa.fibonacci).filter(a=>a.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(a=>a.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function pt(){var t,n;const e=(t=A())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=A())==null?void 0:n.id)!==e)return;Ce=i,Yp(),Wp()}catch(i){x("load projects",i)}}function Wp(){const e=X();if(e&&Ce.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Ce.some(s=>s.id===n)){kt(n);return}const i=up();if(i===Pl){e&&kt(null);return}if(i&&Ce.some(s=>s.id===i)){kt(i);return}Ce.length>0&&kt(Ce[0].id)}function Yp(){const e=document.getElementById(da);e&&(e.innerHTML='<option value="">All projects</option>'+Ce.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),ua())}function Qp(){const e=up();return e===Pl?null:e}function Nn(){const e=document.getElementById("projects-list");if(Ce.length===0){e.innerHTML=W({icon:V.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Ce.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${ae(t.color)}20; color: ${ae(t.color)}">
                    ${u(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${u(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${m(t.id)}" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${u(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function hw(e){kt(e),O("issues")}function Zp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function vw(e){e.preventDefault();const t=A();if(!t){_("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await pt(),Nn(),H(),_("Project created!","success")}catch(i){x("create project",i)}return!1}async function bw(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await pt(),Nn(),H(),_("Project updated!","success")}catch(i){x("update project",i)}return!1}async function yw(e){const t=Ce.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await pt(),Nn(),H(),_("Project deleted","success")}catch(n){x("delete project",n)}}let Be=null;function Xp(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function ww(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Be!==e.id)return;const i=n.filter(o=>o.id===e.default_epic_id||o.status!=="done"&&o.status!=="canceled"),s=e.default_epic_id&&!i.some(o=>o.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(o=>`<option value="${m(o.id)}">${u(o.identifier)} ${u(o.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function fa(e,{tab:t="general",replace:n=!1,onlyIfView:i}={}){if(Ce.length===0&&(await pt(),i&&C()!==i))return;e!==Be&&(Qt=[]),Be=e,Rn("projects");const s=Ce.find(r=>r.id===e);if(!s){_("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${s.name} Settings`,document.getElementById("ps-name").value=s.name||"",document.getElementById("ps-key").value=s.key||"",document.getElementById("ps-description").value=s.description||"",document.getElementById("ps-color").value=s.color||"#6366f1",document.getElementById("ps-estimate-scale").value=s.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=s.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=s.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=s.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=s.require_estimate_on_claim===!0,Xp("ps-require-assignee-on-claim",s.require_assignee_on_claim===!0),Xp("ps-require-epic-on-close",s.require_epic_on_close===!0),ww(s),document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden");const o=em(e,t),a=tm(e,o.tab);n?window.history.replaceState(o,"",a):window.history.pushState(o,"",a),nm(t)}const Jp=["general","rules","sprint-rituals","close-rituals","claim-rituals"];function em(e,t){return{view:"project-settings",settingsProjectId:e,tab:Jp.includes(t)?t:"general"}}function tm(e,t){const n=`/projects/${encodeURIComponent(e)}/settings`;return t==="general"?n:`${n}?tab=${t}`}function nm(e){Jp.includes(e)||(e="general");const t=Be;t&&window.location.pathname===`/projects/${encodeURIComponent(t)}/settings`&&window.history.replaceState(em(t,e),"",tm(t,e)),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Qt||Qt.length===0)&&ga()}function kw(){Be=null,Qt=[]}async function $w(){if(!Be)return;const e=document.getElementById("ps-name").value.trim();if(!e){_("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Be,t),await pt(),_("Settings saved","success");const n=Ce.find(i=>i.id===Be);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function _w(){if(!Be)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const o=document.getElementById("ps-default-epic");o&&!o.disabled&&(n.default_epic_id=o.value||null);try{await h.updateProject(Be,n),await pt(),_("Settings saved","success")}catch(a){x("save settings",a)}}let Qt=[];async function ga(){const e=Be;if(!e)return!1;try{const t=await h.getRituals(e);return e!==Be?!1:(Qt=t,Ew(),!0)}catch(t){return x("load rituals",t),!1}}function Ew(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Qt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Qt.filter(i=>i.trigger==="ticket_close"),n=Qt.filter(i=>i.trigger==="ticket_claim");ql("ps-sprint-rituals-list",e,"sprint"),ql("ps-close-rituals-list",t,"close"),ql("ps-claim-rituals-list",n,"claim")}function ql(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const o={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${o[n]} rituals configured.</p>`;return}const s=o=>m(o||"auto");i.innerHTML=t.map(o=>{let a="";if(o.group_name){const r=o.weight!=null&&o.weight!==1?` w:${o.weight}`:o.percentage!=null?` ${o.percentage}%`:"";a=`<span class="badge badge-ritual-group">${u(o.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(o.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${u(o.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${ut(o.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(o.approval_mode)}">${u(o.approval_mode||"auto")}</span>
          ${a}
          ${!o.group_name&&o.approval_mode==="auto"?"Agent clears immediately":""}
          ${!o.group_name&&o.approval_mode==="review"?"Requires human approval":""}
          ${!o.group_name&&o.approval_mode==="gate"?"Human only":""}
          ${o.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${o.artifact?`<span class="badge badge-artifact">${u(o.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${m(o.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${m(o.id)}" data-ritual-name="${m(o.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function xw(e){if(!Be)return;let t=[];try{t=await h.getRitualGroups(Be)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${m(n.id)}" data-mode="${m(n.selection_mode)}">${u(n.name)} (${u(n.selection_mode)})</option>`).join("")}
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
        ${Up(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function Iw(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Sw(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const o=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",o!=="random_one"),i.classList.toggle("hidden",o!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function im(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw _("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Be,{name:t,selection_mode:n})).id}return e.value||null}async function Tw(e){var s;e.preventDefault();let t;try{t=Vp()}catch{return!1}let n;try{n=await im()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const o=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(i.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(i.percentage=parseFloat(a.value))}try{await h.createRitual(Be,i),await ga(),H(),_("Ritual created!","success")}catch(o){x("create ritual",o)}return!1}async function Lw(e){const t=Qt.find(a=>a.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Be)}catch{}const i=n.find(a=>a.id===t.group_id),s=i&&i.selection_mode==="random_one",o=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${m(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${m(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${u(t.prompt)}</textarea>
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
          ${n.map(a=>`<option value="${m(a.id)}" data-mode="${m(a.selection_mode)}" ${t.group_id===a.id?"selected":""}>${u(a.name)} (${u(a.selection_mode)})</option>`).join("")}
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
      <div id="ritual-percentage-group" class="form-group ${o?"":"hidden"}">
        <label for="ritual-percentage">Percentage (%)</label>
        <input type="number" id="ritual-percentage" value="${t.percentage!=null?t.percentage:""}" min="0" max="100" step="1" placeholder="e.g., 50">
        <p class="form-help">Independent chance this ritual is required each time (0-100).</p>
      </div>
      <div id="ritual-conditions-section"${!t.trigger||t.trigger==="every_sprint"?' style="display: none;"':""}>
        ${Up(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function Aw(e,t){var o;e.preventDefault();let n;try{n=Vp()}catch{return!1}let i;try{i=await im()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((o=document.getElementById("ritual-artifact"))==null?void 0:o.value)||null,conditions:n,group_id:i||""};if(i){const a=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(s.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await ga(),H(),_("Ritual updated!","success")}catch(a){x("update ritual",a)}return!1}async function Cw(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await ga(),_("Ritual deleted","success")}catch(n){x("delete ritual",n)}}le({"view-project":(e,t)=>{hw(t.projectId)},"view-project-settings":(e,t)=>{fa(t.projectId)},"create-project":e=>{vw(e)},"update-project":(e,t)=>{bw(e,t.projectId)},"confirm-delete-project":(e,t)=>{yw(t.projectId)},"edit-project-ritual":(e,t)=>{Lw(t.ritualId)},"delete-project-ritual":(e,t)=>{Cw(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Tw(e)},"update-project-ritual":(e,t)=>{Aw(e,t.ritualId)},"toggle-ritual-conditions":()=>{Iw()},"ritual-group-change":()=>{Sw()}});function sm(){const t=new URLSearchParams(window.location.search).get("project");return t||Qp()}function Bw(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Nl={},om=new Map;let Ol=null,Hl=null,Fl=null,Ul=null,Gl=null,zl=null,Vl=null,am=!1;function Dw(e){Object.assign(Nl,e)}function Mw({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:o,beforeScrollRestore:a}={}){e&&(Ol=e),t&&(Hl=t),n&&(Fl=n),i&&(Ul=i),s&&(Gl=s),o&&(zl=o),a&&(Vl=a)}function rm(){return Object.keys(Nl)}const jw=["issues","query","board","sprints","epics","documents","rituals","my-issues"],lm={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"},Rw={board:"issues",rituals:"projects"};function Bs(e){const t=Rw[e]||e;document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)})}function cm(){Ol&&Ol()}function O(e,t=!0,{transition:n=!1}={}){if(t&&pn(),Rn(e),t){let o;const a=sm();e==="my-issues"?o=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?o=`/issues${window.location.search}`:jw.includes(e)&&a?o=`/${e}?project=${a}`:o=`/${e}`,history.pushState({view:e},"",o)}Bs(e),cm();const i=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const o=document.getElementById(`${e}-view`);o&&o.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Nl[e];s&&s(),t&&window.scrollTo(0,0)}const Ds={"gate-approvals":"inbox",approvals:"inbox",team:"people"},Pw=new Set(["team","approvals","gate-approvals"]),qw={approvals:"kind=approvals","gate-approvals":"kind=approvals"};function dm(){var i;Rn(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":Ds[e[0]]||e[0],n=e.length<=1&&rm().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Bs(t)):Bs(lm[e[0]]||null)}function Kl(){var i;const t=window.location.pathname.split("/").filter(Boolean);Ul&&Ul(),C()||Rn("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Hl&&Hl(t)){const s=lm[t[0]];s&&Bs(s);return}else{if(n=t[0],Ds[n]){if(t.length===1&&Pw.has(n)){const o=qw[n]||window.location.search.slice(1);history.replaceState({view:Ds[n]},"",`/${Ds[n]}${o?`?${o}`:""}`)}n=Ds[n]}rm().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function pn(){om.set(window.location.href,window.scrollY)}function Wl(e){pn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Gl&&Gl(e)}function um(e){pn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),zl&&zl(e)}function pm(){const e=om.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Vl&&Vl(),window.scrollTo(0,e)})}function mm(){am||(am=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Fl&&Fl(e.state)){pm();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):Kl(),pm()}))}let Yl=[];function Nw(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Ow(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Ms(e,t){const n=e().map(Nw),i=t().map(Ow);Yl=[...n,...i]}function jt(e){return e&&Yl.find(t=>t.id===e)||null}function $t(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function ha(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function js({includeIdle:e=!1,keepId:t=null}={}){const n=Yl.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),o=n.filter(b=>b.is_agent),a=new Set(o.map(b=>b.id)),r=(b,w)=>b.name.localeCompare(w.name),l=b=>b.registered_by_id&&a.has(b.registered_by_id),c=new Map,d=new Map;o.forEach(b=>{const[w,k]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];w.has(k)||w.set(k,[]),w.get(k).push(b)});const p=[],f=(b,w)=>{p.push({assignee:b,indent:w}),(c.get(b.id)||[]).sort(r).forEach($=>p.push({assignee:$,indent:2}))};return i.forEach(b=>{p.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(w=>f(w,!0))}),o.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),p}function mi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;js({keepId:n}).forEach(({assignee:s,indent:o})=>{i+=`<option value="${m(s.id)}">${ha(s,o)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Hw(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&jt(e)&&mi({keepId:e}),t.value=e}let fi=[];function mt(){return fi}function Fw(e){fi=Array.isArray(e)?e:[]}function Uw(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?Ep(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Gw(e){var t,n;if(e||(e=(t=A())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=A())==null?void 0:n.id)!==e)return;fi=i,Ms(xt,mt),mi()}catch(i){console.error("Failed to load team agents:",i),x("load team agents",i)}}async function Rs(e){var t;if(e||(e=(t=A())==null?void 0:t.id),!!e)try{fi=await h.getTeamAgents(e),Ms(xt,mt),mi(),zw()}catch(n){x("load agents",n)}}function zw(){var o;const e=document.getElementById("agents-list");if(!e)return;const t=(o=re())==null?void 0:o.id,n=fi.filter(a=>a.parent_user_id===t&&a.kind!=="session");if(n.length===0){e.innerHTML=W({icon:V.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=se(),s=a=>{if(!a)return"Team-wide";const r=i.find(l=>l.id===a);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(a=>{const r=m(a.id),l=fi.filter(d=>d.registered_by_id===a.id).length,c=[s(a.agent_project_id),a.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Le(a.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${Uw(a)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(a.name)}${a.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function Vw(){const e=se();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}function fm(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,U()}async function Kw(e){var r,l,c,d;e.preventDefault();const t=(r=A())==null?void 0:r.id;if(!t)return _("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,o=(c=document.getElementById("agent-project"))==null?void 0:c.value,a=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let p;s&&o?p=await h.createProjectAgent(o,n,i,a):p=await h.createTeamAgent(t,n,i,a),H(),fm("Agent Created",p.api_key,!!p.can_register),await Rs(),va(p.id,{created:!0})}catch(p){x("create agent",p)}return!1}async function Ww(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);fm("New Agent Key",n.key),va(e,{credentials:!0})}catch(n){x("generate agent key",n)}}async function Yw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),_(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await Rs(),va(e)}catch(s){x("change registrar",s)}}function va(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function Qw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{_("Agent API key copied to clipboard","success")}).catch(()=>{_("Failed to copy","error")})}async function Zw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),_("Agent deleted","success"),await Rs(),va(e,{deleted:!0})}catch(n){x("delete agent",n)}}le({"create-agent":e=>{Kw(e)},"copy-agent-key":()=>{Qw()},"dismiss-agent-modal":()=>{H(),Rs()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Zw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Ww(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Yw(t.agentId,t.agentName,t.canRegister!=="true")}});const gm=24,nt=new Map,ke=new Map,_t=new Map;let Zt=null;function Xw(e){return Array.isArray(e)?[...e].map(String).sort():e}function hm(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Xw(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ba(e,t){for(ke.delete(e),ke.set(e,t);ke.size>gm;){const n=ke.keys().next().value;ke.delete(n)}vm()}function vm(){if(nt.size===0)return;const e=new Set;ke.forEach(t=>t.ids.forEach(n=>e.add(n))),nt.forEach((t,n)=>{e.has(n)||nt.delete(n)})}function Jw(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function bm(e){const t=ke.get(e);return t?(ba(e,t),t.ids.map(n=>nt.get(n)).filter(Boolean)):null}function Ql(e){return nt.get(e)}function ek(e){var t;return((t=ke.get(e))==null?void 0:t.meta)||{}}function ym(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Zl(e){const t=nt.get(e.id);if(!ym(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){nt.set(e.id,{...e,description:t.description});return}nt.set(e.id,e)}}const Xl=new Set;function tk(e){return Xl.add(e),()=>Xl.delete(e)}function wm(e,t,n){if(!Array.isArray(t))return;const i=Jw(t);i.forEach(Zl);const s=ke.get(e);ba(e,{ids:i.map(o=>o.id),meta:n??(s==null?void 0:s.meta)??{}}),Xl.forEach(o=>{try{o(e)}catch(a){console.error(a)}})}function nk(e,t){const n=ke.get(e);n&&(n.meta=t)}function ya(e){e!=null&&e.id&&nt.has(e.id)&&Zl(e)}function ik(e){ke.delete(e),_t.forEach((t,n)=>{t===e&&_t.delete(n)}),Zt===e&&(Zt=null),vm()}function sk(e){nt.delete(e),ke.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function wa(e){Zt=e}function ok(){return Zt}function km(e,t){for(_t.delete(e),_t.set(e,t);_t.size>gm;)_t.delete(_t.keys().next().value)}function ak(e){const t=_t.get(e);return t&&ke.has(t)?t:null}function rk({maxQueries:e=3}={}){const t=[...ke.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(o=>i.add(o))),{queries:t.map(([s,o])=>[s,{ids:[...o.ids],meta:o.meta||{}}]),entities:[...i].map(s=>nt.get(s)).filter(Boolean),views:[..._t.entries()].filter(([,s])=>n.has(s))}}function lk(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{ke.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Zl(t.get(s))}),ba(n,{ids:i.ids.filter(s=>nt.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!_t.has(n)&&ke.has(i)&&km(n,i)})}function $m(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function _m(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if($m(e[n])!==$m(t[n]))return!1;return!0}const Em=["status","priority"],xm=["assignee_id","sprint_id","issue_type"],ck={assignee_id:"unassigned",sprint_id:"no_sprint"},dk=["scope","project_id","sort_by","order","limit"],On=e=>(e||[]).map(t=>String(t).toLowerCase());function uk(e,t){if(e.search||t.search||t.sort_by==="random"||dk.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of Em)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of xm)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=On(e.label);if(!On(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=On(t.exclude_label);if(!On(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Im(e){const t=e.label===void 0?null:On(e.label),n=e.exclude_label===void 0?null:On(e.exclude_label);return i=>{for(const s of Em)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of xm){if(e[s]===void 0)continue;const o=e[s]===ck[s]?null:e[s];if((i[s]??null)!==o)return!1}if(t||n){const s=On((i.labels||[]).map(o=>o.name));if(t&&!t.some(o=>s.includes(o))||n&&n.some(o=>s.includes(o)))return!1}return!0}}function pk(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(hm(e)));let n=null,i=null;if(ke.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}uk(c,t)&&(n=r,i=l)}),!n)return null;ba(i,n);const s=Im(t),o=n.ids.map(r=>nt.get(r)).filter(r=>r&&s(r)),a=t.limit;return{rows:o,complete:!(typeof a=="number"&&n.ids.length>=a)}}function mk(){nt.clear(),ke.clear(),_t.clear(),Zt=null}wt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&mk();return}if(e!=="issues"||Zt===null||!ke.has(Zt)||C()!=="issues")return;const i=ke.get(Zt);wm(Zt,ne(),i.meta)});let Xt=0,gi=!1,Ps=null,ka=null,qs=0;const Hn=new Map;function $a(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Xt===0&&!gi),e.textContent=gi?"Stopped":"Offline",e.title=gi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function We(e,t){return Hn.has(e)||Hn.set(e,new Set),Hn.get(e).add(t),()=>{var n;return(n=Hn.get(e))==null?void 0:n.delete(t)}}function fk(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const gk=1e3;function _a(){ka&&(clearTimeout(ka),ka=null)}const hk="chaotic",Jl=4001,vk=4003,bk="chaotic.bearer.";function yk(e){return[hk,bk+e]}function Sm(e,{isReconnect:t=!1}={}){Ps&&(clearTimeout(Ps),Ps=null),_a();const n=ow();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Dl(null)),!t&&(Xt>0||gi)&&(Xt=0,gi=!1,$a());const i=h.getToken();if(!i)return;const s=++qs,a=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(a,yk(i));Dl(r);let l=!1;const c=()=>{if(l||s!==qs)return;l=!0,_a();const d=Xt>0;d&&_("Live updates reconnected","success"),Xt=0,$a(),d&&ec({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===qs&&(console.log("WebSocket connected"),_a(),ka=setTimeout(c,gk))},r.onmessage=d=>{if(s!==qs)return;c();let p;try{p=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}ec(p)},r.onclose=d=>{if(s!==qs)return;console.log("WebSocket disconnected"),_a();const p=d==null?void 0:d.code;if(p===Jl||p===vk){Dl(null),Xt=0;const g=p===Jl&&kl()===i;gi=!g,$a();let b="forbidden";p===Jl&&(b=g?"unauthorized":"superseded"),ec({type:b,entity:"connection",data:{code:p,teamId:e}});return}Xt++,Xt===1&&_("Live updates disconnected. Reconnecting...","warning"),$a();const f=fk(Xt-1);Ps=setTimeout(()=>{Ps=null,A()&&A().id===e&&Sm(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function ec(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},o=Hn.get(`${n}:${t}`);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const a=Hn.get(n);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Hn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}wt(e=>{e==="currentProject"&&C()==="rituals"&&queueMicrotask(()=>Tm())});async function Tm(){const e=X();if(e){Rn("projects"),await fa(e,{tab:"sprint-rituals",replace:!0,onlyIfView:"projects"});return}const t=document.getElementById("rituals-content");t&&(t.innerHTML=W({icon:V.projects,heading:"Select a project",description:"Rituals live in each project's settings. Pick a project in the sidebar switcher, or press P."}))}async function wk(e,t){try{await h.approveAttestation(e,t),_("Ritual approved!","success"),await Vs(),_c()}catch(n){x("approve ritual",n)}}function tc(e){return e==="document"?`
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
        `:""}function nc(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){_("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){_("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Lm(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${tc(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",o=>{kk(o,e,t,i,s,n)}),U()}async function kk(e,t,n,i="",s=null,o=""){e.preventDefault();const a=document.getElementById("gate-note").value,r=nc(i);if(r===void 0)return!1;try{if(await h.completeGateRitual(t,n,a||null,r),_(o?`Signed off on ${o}.`:"Signed off.","success"),await Vs(),s)return H(),await s(),!1;const l=k$();l&&!l.in_limbo?(H(),_("Limbo cleared! Next sprint is now active.","success")):_c()}catch(l){x("complete gate ritual",l)}return!1}function $k(e,t,n,i,s="",o=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${o?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${o?"required":""}></textarea>
            </div>
            ${tc(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",a=>{_k(a,e,t,s,o)}),U()}async function _k(e,t,n,i="",s=!0){e.preventDefault();const o=document.getElementById("attest-ritual-note").value.trim();if(s&&!o)return _("A note is required for this attestation.","error"),!1;const a=nc(i);if(a===void 0)return!1;try{await h.attestTicketRitual(t,n,o||null,a),_("Ritual attested!","success"),H(),await co(n)}catch(r){x("attest ticket ritual",r)}return!1}async function Ek(e,t){try{await h.attestTicketRitual(e,t),_("Ritual attested!","success"),await co(t)}catch(n){x("attest ticket ritual",n)}}async function xk(e,t){try{await h.approveTicketRitual(e,t),_("Ritual approved!","success"),await co(t)}catch(n){x("approve ticket ritual",n)}}function Am(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{Ik(s,e,t,n,i)}),U()}async function Ik(e,t,n,i,s=null){e.preventDefault();const o=document.getElementById("reject-ritual-note").value.trim();if(!o)return _("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,o),_(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(a){x("reject ritual",a)}return!1}function Cm(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${tc(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",o=>{Sk(o,e,t,i,s)}),U()}async function Sk(e,t,n,i="",s=null){e.preventDefault();const o=document.getElementById("ticket-ritual-note").value,a=nc(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,o||null,a),_("Signed off.","success"),H(),s?await s():await co(n)}catch(r){x("complete ticket ritual",r)}return!1}le({"approve-ticket-ritual":(e,t)=>{xk(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Am(t.ritualId,t.issueId,t.ritualName,()=>co(t.issueId))},"complete-ticket-ritual":(e,t)=>{Cm(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{$k(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{Ek(t.ritualId,t.issueId)}});const ic=/\[\[([^[\]\n]{0,80})$/;function Bm(e){return`/document/${encodeURIComponent(e)}`}function Tk(e){return String(e||"").replace(/\s+/g," ").trim().replace(/[\\[\]]/g,"\\$&")}function Lk(e){return`[${Tk(e.title)||"Untitled"}](${Bm(e.id)})`}function Ak(e,t=(n=>(n=globalThis.location)==null?void 0:n.origin)()){if(!e||typeof e!="string")return null;let i;try{i=new URL(e,t||"http://localhost")}catch{return null}if(t&&i.origin!==t||!/^(\/|https?:\/\/)/i.test(e)||e.startsWith("//"))return null;const s=i.pathname.match(/^\/document\/([^/]+)\/?$/);if(!s)return null;try{return decodeURIComponent(s[1])}catch{return null}}function Ck(e){for(const t of e.querySelectorAll("a[href]")){const n=Ak(t.getAttribute("href"));n&&(t.classList.add("doc-link"),t.dataset.action="open-linked-document",t.dataset.documentId=n)}}const Dm=6;async function Mm(e){const t=A();if(!t)return[];const n=(e||"").trim();try{const i=await h.getDocuments(t.id,null,n||null,null,Dm);return(Array.isArray(i)?i:[]).slice(0,Dm).map(s=>({id:s.id,title:s.title||"Untitled",icon:s.icon||null}))}catch{return[]}}function jm(e){const t=ut(e),n=document.createElement("template");return n.innerHTML=t,Dk(n.content,Mk),Ck(n.content),n.innerHTML}function Bk(e){return`/issue/${encodeURIComponent(e)}`}function Dk(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(o){let a=o.parentElement;for(;a&&a!==e;){if(a.tagName==="CODE"||a.tagName==="PRE")return NodeFilter.FILTER_REJECT;a=a.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(o=>{t(o)})}function Mk(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),o=i.test(t);if(!s&&!o)return;const a=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&a.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=Bk(p),f.className="issue-link",f.textContent=p,a.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&a.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],a.appendChild(p),r=d.index+d[0].length}l&&(r<t.length&&a.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(a,e))}function Ns(e){return e?jm(e):""}function Fn(e){return e?jm(e):""}const Ea=new Map;function sc(){var e;return`${((e=A())==null?void 0:e.id)??""}|${X()??""}`}function hi(e,t,n){Ea.set(e,{key:t,value:n})}function xa(e,t){const n=Ea.get(e);return n&&n.key===t?n.value:void 0}function Os(e,...t){for(const n of t)n!==e&&Ea.delete(n)}function oc(){Ea.clear()}function Ia(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}wt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&oc(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&oc()});function jk(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Rk(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const o of e){const a=o.user_id||o.id;i.has(a)||(i.add(a),s.push({id:a,name:o.user_name||o.name||o.user_email||o.email||"User",email:o.user_email||o.email||"",handle:jk(o),isAgent:!1}))}for(const o of t)!o.mention_handle||o.is_active===!1||o.idle||i.has(o.id)||n!==void 0&&o.agent_project_id&&o.agent_project_id!==n||(i.add(o.id),s.push({id:o.id,name:o.name||"Agent",email:"",handle:o.mention_handle,isAgent:!0}));return s}function Rm(e,t={},n=6){const i=(e||"").toLowerCase();return Rk(xt(),mt(),t).filter(s=>!i||s.handle.includes(i)||s.name.toLowerCase().includes(i)||s.email.toLowerCase().includes(i)).slice(0,n)}function Pk(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function ac(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let o=-1,a=null,r=0,l=null;const c=()=>{s.classList.add("hidden"),s.innerHTML="",o=-1,a=null},d=k=>{var y,E;const $=s.querySelectorAll(".mention-suggestion");$.length!==0&&(o=(k%$.length+$.length)%$.length,$.forEach((T,F)=>T.classList.toggle("highlighted",F===o)),(E=(y=$[o]).scrollIntoView)==null||E.call(y,{block:"nearest"}))},p=k=>{const $=i.selectionStart||0,y=i.value.slice(0,$).replace(/@([a-zA-Z0-9._-]*)$/,`@${k} `),E=i.value.slice($);i.value=y+E,i.focus(),c()},f=k=>{const $=i.selectionStart||0,y=i.value.slice(0,$),E=y.match(ic);if(!E){c();return}const T=y.slice(0,E.index)+Lk(k);i.value=T+i.value.slice($),i.focus(),i.setSelectionRange(T.length,T.length),c(),i.dispatchEvent(new Event("input",{bubbles:!0}))},g=k=>{if(!k.length){c();return}s.innerHTML=k.map($=>`
            <button type="button" class="mention-suggestion doc-ref-suggestion">
                <span class="mention-name">${$.icon?`${u($.icon)} `:""}${u($.title)}</span>
                <span class="mention-handle">document</span>
            </button>
        `).join(""),s.classList.remove("hidden"),a=$=>f(k[$]),s.querySelectorAll(".mention-suggestion").forEach(($,y)=>{$.addEventListener("click",()=>f(k[y])),$.addEventListener("mouseenter",()=>d(y))}),d(0)},b=k=>{const $=++r;clearTimeout(l),l=setTimeout(async()=>{const y=await Mm(k);if($!==r)return;const E=i.selectionStart||0,T=i.value.slice(0,E).match(ic);!T||T[1]!==k||i.hidden||document.activeElement===i&&g(y)},150)},w=()=>{if(r++,clearTimeout(l),i.hidden){c();return}const k=i.selectionStart||0;if(Pk(i.value,k)){c();return}const $=i.value.slice(0,k),y=$.match(ic);if(y){b(y[1]);return}const E=$.match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!E){c();return}const T=E[2].toLowerCase(),F=Rm(T,i.mentionContext||{});if(!F.length){c();return}s.innerHTML=F.map(L=>`
            <button type="button" class="mention-suggestion" data-handle="${m(L.handle)}">
                <span class="mention-name">${u(L.name)}${L.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(L.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),a=L=>p(F[L].handle),s.querySelectorAll(".mention-suggestion").forEach((L,P)=>{L.addEventListener("click",()=>p(L.dataset.handle)),L.addEventListener("mouseenter",()=>d(P))}),d(0)};i.addEventListener("input",w),i.addEventListener("click",w),i.addEventListener("keydown",k=>{const $=!s.classList.contains("hidden");if(k.key==="Escape"&&$){k.preventDefault(),k.stopPropagation(),c();return}$&&(k.key==="ArrowDown"?(k.preventDefault(),d(o+1)):k.key==="ArrowUp"?(k.preventDefault(),d(o-1)):(k.key==="Enter"||k.key==="Tab")&&s.querySelectorAll(".mention-suggestion")[o]&&a&&(k.preventDefault(),a(o)))}),i.addEventListener("blur",()=>{setTimeout(c,150)})}let De=null,Pm=!1,Un=!1,qm="new-comment";function qk(){return De||(De=document.createElement("div"),De.className="quote-tooltip",De.setAttribute("role","button"),De.setAttribute("tabindex","0"),De.setAttribute("aria-label","Quote selection in comment"),De.textContent="Quote",De.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Sa())}),De.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),De.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Sa()}),document.body.appendChild(De),De)}function Nm(e,t){const n=qk();n.style.display="flex",Un=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Un)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Hs(){De&&(De.style.display="none"),Un=!1}function Nk(){return Un}function Om(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function rc(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Om(t.startContainer),i=Om(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Ok(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Sa(e=qm){const t=rc();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Ok(t),s=n.value,o=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+o+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Hs(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Hk(){var i;if(!rc())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Nm(n.left+n.width/2,n.top),!0}function Fk(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!rc()){Hs();return}Nm(t,n)},10)}function Hm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(qm=t,i.addEventListener("mouseup",Fk,n?{signal:n}:void 0),Pm||(Pm=!0,document.addEventListener("mousedown",s=>{Un&&De&&!De.contains(s.target)&&Hs()}),document.addEventListener("selectionchange",()=>{Un&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Hs()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Un&&(s.stopImmediatePropagation(),Hs())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Hk()})))}function Fm(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let mn=[],Fs=[],Ta=null,pe=new Set,vi="list",Gn=!1,lc=null,La=null,cc=null,dc=null,Um=null;function Gm(e){if(Um!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const uc=Iy();(uc==="list"||uc==="grid")&&(vi=uc);function zm(e){if(e!=="list"&&e!=="grid")return;vi=e,e==="grid"&&Gn&&pc(),Sy(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Jt()}function Vm(){if(vi!=="list")return;Gn=!0,pe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Jt(),yi()}function pc(){Gn=!1,pe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Jt(),yi()}function Uk(){lc&&clearTimeout(lc),lc=setTimeout(()=>{Jt()},300)}function Km(){const e=document.getElementById("doc-search");e&&(e.value=""),Jt()}async function Gk(){Km()}function zk(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Vk(){return mn}function Jt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";zk(),Fs=mn.filter(o=>{var a,r;if(e){const l=(a=o.title)==null?void 0:a.toLowerCase().includes(e),c=(r=o.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Fs.sort((o,a)=>{switch(t){case"title_asc":return(o.title||"").localeCompare(a.title||"");case"title_desc":return(a.title||"").localeCompare(o.title||"");case"updated_asc":return new Date(o.updated_at)-new Date(a.updated_at);case"updated_desc":default:return new Date(a.updated_at)-new Date(o.updated_at)}}),Xk("",vi)}let bi=0;async function Kk(){var i;const e=Ta||((i=A())==null?void 0:i.id);if(!e)return;const t=++bi,n=X()||null;try{const s=await h.getDocuments(e,n);if(t!==bi)return;hi("documents",`${e}|${n??""}`,s),mn=s,Jt()}catch(s){if(t!==bi)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=W({icon:V.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",s)}}wt(e=>{e==="currentProject"&&C()==="documents"&&Kk()});async function zn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=A())==null?void 0:r.id),!e)return;Ta=e,jp(-1);const i=++bi;t===null&&(t=X()||null);const s=`${e}|${t??""}`,o=n?xa("documents",s):void 0,a=document.getElementById("documents-list");o?(mn=o,Jt()):a&&(a.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==bi)return;hi("documents",s,l);const c=o&&Ia(mn,l);mn=l;const d=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");d&&p&&(d.classList.toggle("active",vi==="list"),p.classList.toggle("active",vi==="grid")),c||Jt()}catch(l){if(i!==bi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=W({icon:V.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",l)}}function Wm(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ta||((n=A())==null?void 0:n.id);e&&zn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Ym(e){Gm(e)&&Ie(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Wk(e,t){Gm(e)&&(_(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function Yk(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ae(t.color)}20; color: ${ae(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Qk(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Yk(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u(Fm(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Zk(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ae(r.color)}20; color: ${ae(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Fm(e.content).substring(0,80):"No content",s=Gn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${pe.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Gn&&pe.has(e.id)?" selected":""}" data-action="${Gn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
      ${s}
      <div class="document-list-icon">${u(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${u(e.title)}</div>
        <div class="document-list-snippet text-muted">${u(i)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?u(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Xk(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;pe.clear(),yi();const i=Fs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=X(),f=d||p;n.innerHTML=W({icon:f?V.search:V.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?Qk:Zk,o=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${o}">${i.map(s).join("")}</div>`;return}const a={},r=se();i.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");a[p]||(a[p]={label:f,docs:[]}),a[p].docs.push(d)});let l="";for(const[d,p]of Object.entries(a)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function Jk(e){pe.has(e)?pe.delete(e):pe.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=pe.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",pe.has(e)),yi()}function e$(){Fs.forEach(e=>pe.add(e.id)),Fs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),yi()}function Qm(){pe.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),pe.clear(),yi()}function yi(){const e=document.getElementById("doc-bulk-actions");e&&(Gn?(e.classList.remove("hidden"),pe.size>0?e.innerHTML=`
        <span class="bulk-count">${pe.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function t$(){if(pe.size===0){_("No documents selected","error");return}const t=se().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${pe.size} Document${pe.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${pe.size} selected document${pe.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function n$(e){var a,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(pe);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((a=mn.find(d=>d.id===l))==null?void 0:a.title)||l)}H(),Qm(),s.length===0?_(`Moved ${i} document${i>1?"s":""}!`,"success"):_(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const o=(r=A())==null?void 0:r.id;return await zn(o),!1}async function i$(){var o,a;if(pe.size===0){_("No documents selected","error");return}const e=pe.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(pe);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((o=mn.find(c=>c.id===r))==null?void 0:o.title)||r)}pc(),i.length===0?_(`Deleted ${n} document${n>1?"s":""}!`,"success"):_(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(a=A())==null?void 0:a.id;await zn(s)}async function s$(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var o,a;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((a=(o=s.author_name)==null?void 0:o.charAt(0))==null?void 0:a.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${u(s.author_name||"Unknown")}</span>
                ${na(s.author)}
                <span class="comment-date">${qe(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Ns(s.content)}</div>
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
    `}}function o$(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=mp(e);s&&(i.value=s),i.addEventListener("input",()=>{ea(e,i.value)},{signal:t}),i.addEventListener("keydown",o=>{var a;o.key==="Enter"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),(a=i.closest("form"))==null||a.requestSubmit())},{signal:t}),ac("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ie(e,t=!0){try{t&&pn();const n=await h.getDocument(e);Um=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(L=>L.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await s$(n);let o=null,a=null,r=!1;if(n.project_id){const P=se().find(K=>K.id===n.project_id);if(o=P?P.name:null,n.sprint_id)try{const K=await h.getSprint(n.sprint_id);a=K?K.name:null}catch(K){console.error("Failed to load sprint name:",K),r=!0}}let l=n.content||"";const c=Q.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Vk(),p=d.findIndex(L=>L.id===n.id),f=p>0?d[p-1]:null,g=p>=0&&p<d.length-1?d[p+1]:null,b=p>=0,w=C()||"documents",k=n.labels&&n.labels.length>0?n.labels.map(L=>`
          <span class="issue-label" style="background: ${ae(L.color)}20; color: ${ae(L.color)}">
            ${u(L.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(L.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let $='<span class="text-muted">None</span>';try{const L=await h.getDocumentIssues(n.id);L.length>0&&($=L.map(P=>`
          <div class="linked-item">
            <span class="linked-item-id">${u(P.identifier)}</span>
            <span class="linked-item-title">${u(P.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(P.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(L){console.error("Failed to load linked issues:",L),$=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${m(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${m(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${p+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${m(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${o?u(o)+" ›":""} ${u(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?u(n.icon)+" ":""}${u(n.title)}</h1>

          <div class="document-content markdown-body">${l?Fn(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${o?u(o):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${a||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:u(a)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${k}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${m(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${u(n.author_name||"Unknown")} ${na(n.author)}</span>
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
              ${$}
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
    `,La&&La.abort(),La=new AbortController;const{signal:y}=La,E=i.querySelector(".sidebar-overflow-trigger"),T=i.querySelector(".overflow-menu-dropdown");if(E&&T){const L=()=>{T.classList.add("hidden"),E.setAttribute("aria-expanded","false")},P=()=>{const K=T.classList.toggle("hidden");E.setAttribute("aria-expanded",String(!K))};E.addEventListener("click",P,{signal:y}),document.addEventListener("click",K=>{!E.contains(K.target)&&!T.contains(K.target)&&L()},{signal:y}),T.addEventListener("keydown",K=>{K.key==="Escape"&&(L(),E.focus())},{signal:y})}o$(n.id,y,n.project_id||null),Hm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:y}),cc=f?f.id:null,dc=g?g.id:null;const F=L=>{if((L.metaKey||L.ctrlKey)&&L.shiftKey&&(L.key===">"||L.key==="."||L.code==="Period")&&Sa("new-doc-comment")){L.preventDefault();return}L.metaKey||L.ctrlKey||L.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||L.target.tagName==="INPUT"||L.target.tagName==="TEXTAREA"||L.target.tagName==="SELECT"||L.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(L.key==="ArrowLeft"&&cc?(L.preventDefault(),Ie(cc)):L.key==="ArrowRight"&&dc&&(L.preventDefault(),Ie(dc)))};document.addEventListener("keydown",F,{signal:y})}catch(n){x("load document",n)}}async function Aa(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const o=await h.getSprints(t);let a=n;if(i&&!n){const l=o.find(c=>c.status==="active");l&&(a=l.id)}const r=o.map(l=>`<option value="${l.id}" ${l.id===a?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function mc(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function a$(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),o=document.getElementById(`${e}-preview`);if(!n||!i||!s||!o)return;const a=t==="preview";if(n.classList.toggle("active",!a),i.classList.toggle("active",a),s.style.display=a?"none":"block",o.style.display=a?"block":"none",a){const r=s.value.trim();o.innerHTML=r?Fn(r):'<span class="text-muted">Nothing to preview.</span>'}}function fc(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),o=document.getElementById(t.icon),a=vp(e);if(a){const l=_y(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(a.title&&i&&(i.value=a.title),a.content&&s&&(s.value=a.content),a.icon&&o&&(o.value=a.icon)):c?(i&&(i.value=a.title||""),s&&(s.value=a.content||""),o&&(o.value=a.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(o==null?void 0:o.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){ta(e,null);return}ta(e,l,n)};[i,s,o].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Zm(){Us=null;const e=se(),t=Qp()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${mc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),fc("new"),t&&await Aa("doc-sprint",t,null,!0)}let Us=null;async function r$(e,t,n){Us=n||null;const s=se().map(o=>`<option value="${m(o.id)}" ${o.id===t?"selected":""}>${u(o.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${mc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),fc("new"),t&&await Aa("doc-sprint",t,e)}async function l$(e){var o;e.preventDefault();const t=(o=A())==null?void 0:o.id;if(!t)return _("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),ta("new",null),await zn(t),H(),_("Document created!","success"),Us){const a=Us;Us=null,a()}}catch(a){x("create document",a)}return!1}let gc=null,Gs=null,hc=!1;async function Xm(e){try{const t=await h.getDocument(e);gc=e,Gs={title:t.title||"",content:t.content||""},hc=!1;const i=se().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${mc("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),fc(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Aa("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function c$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},o=document.getElementById("edit-doc-content-draft-warning");if(o&&gc===t&&Gs&&!hc){let a=null;try{a=await h.getDocument(t)}catch{}if(a&&((a.title||"")!==Gs.title||(a.content||"")!==Gs.content))return hc=!0,o.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',o.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),gc=null,Gs=null;const a=vp(t);a&&a.title===s.title&&a.content===s.content&&(a.icon||"")===(s.icon||"")&&ta(t,null),H(),await Ie(t),_("Document updated!","success")}catch(a){x("update document",a)}return!1}async function d$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=A())==null?void 0:t.id;await zn(n),O("documents"),_("Document deleted!","success")}catch(n){x("delete document",n)}}function u$(e,t){Aa(e,t)}async function p$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function m$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=A())==null?void 0:i.id,o=await h.searchIssues(s,e);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(a=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(a.id)}">
        <span class="link-result-id">${u(a.identifier)}</span>
        <span class="link-result-title">${u(a.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function f$(e,t){try{await h.linkDocumentToIssue(e,t),H(),_("Issue linked!","success"),await Ie(e,!1)}catch(n){x("link issue",n)}}async function g$(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),_("Issue unlinked!","success"),await Ie(e,!1)}catch(n){x("unlink issue",n)}}let vc=!1;async function h$(e,t){if(e.preventDefault(),vc)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return _("Please enter a comment","error"),!1;vc=!0;try{const s=await h.createDocumentComment(t,i);n.value="",_("Comment added!","success"),_s(s),await Ie(t,!1)}catch(s){x("add comment",s)}finally{vc=!1}return!1}async function v$(e){var n;const t=(n=A())==null?void 0:n.id;if(!t){_("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const s=i.map(o=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(o.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ae(o.color)}; color: white;">${u(o.name)}</span>
        ${o.description?`<span class="text-muted">${u(o.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,U()}catch(i){x("load labels",i)}}async function b$(e,t){try{await h.addLabelToDocument(e,t),H(),_("Label added!","success"),await Ie(e,!1)}catch(n){x("add label",n)}}async function y$(e,t){try{await h.removeLabelFromDocument(e,t),_("Label removed!","success"),await Ie(e,!1)}catch(n){x("remove label",n)}}le({"view-document":(e,t)=>{e.preventDefault(),Ie(t.documentId)},"set-doc-editor-mode":(e,t)=>{a$(t.target,t.mode)},"retry-load-documents":()=>{zn(Ta)},"retry-document-comments":(e,t)=>{Ie(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{Jk(t.docId)},"clear-doc-search":()=>{Km()},"clear-all-doc-filters":()=>{Gk()},"show-bulk-move-modal":()=>{t$()},"bulk-delete-documents":()=>{i$()},"select-all-docs":()=>{e$()},"clear-doc-selection":()=>{Qm()},"exit-selection-mode":()=>{pc()},"enter-selection-mode":()=>{Vm()},"handle-bulk-move":e=>{n$(e)},"unlink-document-issue":(e,t)=>{g$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{p$(t.documentId)},"add-document-comment":(e,t)=>{h$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{y$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{v$(t.documentId)},"show-edit-document-modal":(e,t)=>{Xm(t.documentId)},"delete-document":(e,t)=>{d$(t.documentId)},"create-document":e=>{l$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{u$(t.sprintSelect,n.value)},"update-document":(e,t)=>{c$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{m$(n.value,t.documentId)},"link-to-issue":(e,t)=>{f$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{b$(t.documentId,t.labelId)}});let Rt=[],Ca={},Ba=new Set,en=null,bc=null,Da=[],zs=[],yc=[];function Ma(){return Ca}function w$(){return bc}function k$(){return en}wt(e=>{e==="currentProject"&&C()==="sprints"&&fn()});let wc=0;async function fn({fromMemory:e=!1}={}){Pp(-1);const t=X();if(!t){const a=document.getElementById("sprints-list");a&&(a.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++wc;P$();const i=document.getElementById("sprints-list"),s=sc(),o=e?xa("sprints",s):void 0;o?(Rt=o,Jm()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,a]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=a.some(c=>c.status==="active")?a:await h.getSprints(t);if(n!==wc)return;const l=o&&Ia(Rt,r);Rt=r,hi("sprints",s,r),l||Jm(),await Vs()}catch(a){return n!==wc?void 0:(i&&(i.innerHTML=W({icon:V.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),x("load sprints",a),!1)}return!0}function Jm(){const e=document.getElementById("sprints-list");if(!e)return;const t=Rt.find(o=>o.status==="active"),n=Rt.find(o=>o.status==="planned"),i=Rt.filter(o=>o.status==="completed");let s="";if(t){const o=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",a=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${a?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${m(t.id)}" data-sprint-url="/sprint/${m(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${a?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${u(t.name)}</div>
                <div class="sprint-card-budget ${a?"budget-arrears":""}">
                    ${o}
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
        `,s+=$$(t)}if(n){const o=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",a=(n.budget?`${n.budget} point budget`:"No budget set")+(o?` <span class="text-muted">· ${o}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${m(n.id)}" data-sprint-url="/sprint/${m(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${u(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
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
                    ${i.map(o=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${m(o.id)}" data-sprint-url="/sprint/${m(o.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${u(o.name)}</span>
                            <span class="sprint-history-budget">${o.points_spent||0}${o.budget?` / ${o.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||W({icon:V.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function ef(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${xc(e.activated_at)}, closed ${xc(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${xc(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function $$(e){if(!(e.budget!==null&&e.budget!==void 0))return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Progress</h4>
                    <span class="text-muted">Set a sprint budget to see progress; a spent budget ends a sprint, not a date</span>
                </div>
            </div>
        `;const n=e.budget,i=e.points_spent||0,s=Math.max(n-i,0),o=Math.min(Math.round(i/n*100),100),a=i>n?" arrears":e.limbo?" limbo":"",r=i>n?`in arrears by ${i-n} pt${i-n===1?"":"s"}: close the sprint to continue`:e.limbo?"closed, waiting on sprint rituals":`${s} of ${n} pts remaining`;return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Progress</h4>
                <div class="sprint-burndown-meta">
                    <span>${u(ef(e))||"not yet activated"}</span>
                    <span>${u(r)}</span>
                </div>
            </div>
            <div class="sprint-status-progress" role="progressbar" aria-label="Sprint budget spent"
                 aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${Math.min(i,n)}">
                <div class="sprint-progress-bar">
                    <div class="sprint-progress-fill${a}" style="width: ${o}%"></div>
                </div>
                <span class="text-muted">${i}/${n} pts</span>
            </div>
        </div>
    `}let kc=0;async function wi(e,t=!0){var n;try{t&&pn();const i=++kc,s=C(),o=await h.getSprint(e);if(i!==kc)return;if(!o){_("Sprint not found","error"),O("sprints");return}bc=o;const a=(n=A())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),a?h.getDocuments(a,o.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==kc)return;Da=r,yc=l,zs=c,C()===s&&Dt(Da),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),E$()}catch(i){console.error("Failed to load sprint:",i),_("Failed to load sprint","error"),O("sprints")}}async function _$(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){_("Invalid sprint ID","error"),O("sprints",!1);return}try{await wi(e,!1)}catch{O("sprints",!1)}}function E$(){const e=bc,t=Da;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(g=>As.includes(g.status)),o=t.filter(g=>g.status==="done"),a=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,w)=>b+(w.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(o),d=a.length>0?`<div class="stat-note">${a.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${m(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${u(e.name)}</h2>
                ${p}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${u(ef(e))}
                </div>
            `:""}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${s.length}</div>
                <div class="stat-label">Open Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${o.length}</div>
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
                ${s.length===0?W({icon:V.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>$c(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${o.length>0?"open":""}>
                <summary><h3>Completed Issues (${o.length})</h3></summary>
                ${o.length===0?W({icon:V.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${o.map(g=>$c(g)).join("")}
                    </div>
                `}
            </details>

            ${a.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${a.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${a.map(g=>$c(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${I$()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${zs.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${zs.length>0?`
                    <div class="sprint-issues-list">
                        ${zs.map(g=>x$(g)).join("")}
                    </div>
                `:W({icon:V.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function $c(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Op,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${O$(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function x$(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${qe(e.created_at)}</span>
            </span>
        </div>
    `}function I$(){const e=yc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${u(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${u(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${S$(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function S$(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function T$(e,t,n,i){const s=i?gw(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${m(e)}" data-project-id="${m(i)}" data-current-budget="${m(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${m(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${u(s)}</small>`:""}
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
    `,U()}async function L$(e,t,n){var p,f,g,b;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,o=s?parseInt(s):null,a=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=o!==l,d=Rt.find(w=>w.id===t);try{const w={};i&&(w.name=i);const k=a==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!k&&(w.budget=o),Object.keys(w).length&&await h.updateSprint(t,w),a==="planned"){const y=Rt.filter(E=>E.status==="planned"&&E.id!==t);for(const E of y)await h.updateSprint(E.id,{budget:o})}a==="default"&&n&&await h.updateProject(n,{default_sprint_budget:o}),await fn(),H(),_(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(w){x("update budget",w)}return!1}const tf="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function A$(e,t=null){const n=Rt.find(c=>c.id===e),i=n?se().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${tf}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let o;try{o=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){x("reset budget to project default",c),t&&(t.disabled=!1);try{await fn()}catch{}return}const a=(o==null?void 0:o.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await fn()!==!1}catch{l=!1}_(`'${a}' follows the project default budget again: ${s(o==null?void 0:o.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((o==null?void 0:o.budget)===null||(o==null?void 0:o.budget)===void 0)&&_(tf,"warning")}async function C$(e){const t=Rt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=As;let i=0,s=!1,o=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),o=!0}const a=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${a}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${a}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${u(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${o?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${m(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function B$(e){try{const t=await h.closeSprint(e);await fn(),of(),t.limbo?M$(t):_("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function Vs(){const e=X();if(e)try{en=await h.getLimboStatus(e),D$()}catch(t){console.error("Failed to load limbo status:",t)}}function D$(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!en||!en.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${en.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function M$(e){const t=X();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${u(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,U(),j$(t)}async function j$(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${ut(i.prompt)}</div>
                    ${Ec(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function _c(){var t,n;if(!en)return;const e=X();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${en.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${u(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${u(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${ut(i.prompt)}</div>
                        ${Ec(i.attestation)}
                        ${R$(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=en.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${en.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${Ec(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function Ec(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(qe(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${ut(e.note)}</div>
        </div>
    `}function R$(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function nf(e){for(const t of e)if(!Ba.has(t))try{(await h.getSprints(t)).forEach(i=>{Ca[i.id]=i}),Ba.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function P$(){Ca={},Ba=new Set,Da=[],yc=[],zs=[],ja={}}function q$(e,t){t.forEach(n=>{Ca[n.id]=n}),Ba.add(e)}let ja={};function N$(e){return ja[e]}function sf(e,t){ja[e]=t??null}function of(){ja={}}le({"retry-load-sprints":()=>fn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}wi(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;T$(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{A$(t.sprintId,n)},"show-limbo-details-modal":()=>{_c()},"show-close-sprint-confirmation":(e,t)=>{C$(t.sprintId)},"handle-update-budget":(e,t)=>{L$(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),B$(t.sprintId)},"dismiss-limbo-modal":()=>{H(),Vs()},"approve-ritual":(e,t)=>{wk(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Lm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}de(t.issueId)},"create-sprint-document":async(e,t)=>{await r$(t.sprintId,t.projectId,()=>{wi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ie(t.documentId)}});function xc(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function O$(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let Pt=[],Ic=[],Ra=-1,Sc=null;const af=5,H$=new Set(["done","canceled"]),rf=new Set;function F$(){return Ra}function U$(e){Ra=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Sc=(t==null?void 0:t.dataset.issueId)??null}const lf=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function cf(e){const t=new Set(lf.map(s=>s.status)),n=lf.map(s=>({...s,issues:e.filter(o=>o.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}wt(e=>{e==="currentProject"&&C()==="my-issues"&&(ki(),Ks(),$i())});function Ye(){return Pt}function Vn(e){Pt=e}let Tc=0;async function ki(){var o;const e=A(),t=re();if(!e||!t)return;const n=++Tc,i=(o=document.getElementById("my-issues-status-filter"))==null?void 0:o.value,s=X();z$();try{const a={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...a,project_id:s}):r=await h.getTeamIssues(e.id,a),n!==Tc)return;Pt=cf(r).flatMap(l=>l.issues),C()==="my-issues"&&Dt(Pt),Kn()}catch(a){if(n!==Tc)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=W({icon:V.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),x("load issues",a)}}async function $i({showLoading:e=!0}={}){const t=A();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=X();Ic=await h.getTeamActivities(t.id,0,10,{projectId:i}),G$()}catch{n&&(n.innerHTML=W({icon:V.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function G$(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ic.length){e.innerHTML=W({icon:V.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Ic.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=cd(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Ag(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ud(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${qe(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function z$(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function df(){ki()}function Kn(){var a,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=cf(Pt);Pt=t.flatMap(l=>l.issues),C()==="my-issues"&&Dt(Pt),Ra=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Pt.length?String(Pt.length):""),Pt.length===0){e.innerHTML=W({icon:V.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(a=i.closest(".issue-row"))==null?void 0:a.dataset.issueId:null,o=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=H$.has(l.status)&&!rf.has(l.status)&&l.issues.length>af,d=c?l.issues.slice(0,af):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(p=>Zn(p)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(o?l.querySelector(`[data-dropdown-type="${o}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Sc){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Sc);c!==-1&&(l[c].classList.add("keyboard-selected"),Ra=c)}}let Lc=0,Pa=[],uf=null;async function Ks(){var a;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Lc,n=X(),i=`${((a=A())==null?void 0:a.id)??""}:${n??""}`;i!==uf&&(uf=i,Ws=!1),Pa=[];const s=se(),o=n?s.filter(r=>r.id===n):s;if(!o.length){e.innerHTML="";return}try{const r=o.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let p={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:p};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const b of g)p[b.status]=(p[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:p,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==Lc)return;Pa=l,vf(l,{single:!!n})}catch(r){if(t!==Lc)return;console.error("Failed to load sprint status:",r),e.innerHTML=W({icon:V.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const pf=5;let Ws=!1;const mf=["done","in_review","in_progress","todo","backlog"];function qa(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,o=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,a=e.limbo?"limbo":s?"arrears":n&&o>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:o,state:a}}function V$(e){const t=({sprint:n})=>{const i=qa(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function K$(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function W$(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function Y$(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const Q$={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function ff(e){return Q$[e.state]||""}function gf(e){return`<span class="meter ${ff(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function Z$(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function hf(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function X$({sprint:e,statusCounts:t,countsFailed:n}){const i=qa(e),s=t||{},o=Object.values(s).reduce((d,p)=>d+p,0),a=K$(e),r=n?"Issue counts unavailable":o?`${o} issue${o===1?"":"s"}`:"No issues planned",l=[a?`Day ${a}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${hf(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${Y$(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${W$(i)}</span>
            ${i.hasBudget?gf(i):""}
            ${o?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${mf.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/o*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${mf.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Ve(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function J$({project:e,sprint:t}){const n=qa(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=Z$(t,n),o=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${hf(t)} title="${m(o)}">
                <span class="state-dot ${ff(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?gf(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function vf(e,{single:t=e.length===1&&!!X()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${X$(e[0])}
        `;return}const i=V$(e),s=i.filter(({sprint:d})=>d.limbo).length,o=i.filter(({sprint:d})=>!d.limbo&&qa(d).overBudget).length,a=[o?`${o} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>pf,l=Ws?i:i.slice(0,pf),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${a?`<span class="sprint-attention">${a}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(J$).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${Ws}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}le({"filter-my-issues":()=>df(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Wl(t.identifier)},"retry-load-my-issues":()=>ki(),"dash-show-all":(e,t)=>{rf.add(t.status),Kn()},"retry-load-sprint-status":()=>Ks(),"dash-sprints-toggle":()=>{var e;Pa.length&&(Ws=!Ws,vf(Pa,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const bf=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ys(e=null){const t=e||X()||"";Df([]);const n=se().map(a=>`
        <option value="${m(a.id)}" data-hint="${m(a.key||"")}" ${a.id===t?"selected":""}>${u(a.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" data-picker aria-label="Project" data-action="update-create-project">
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
                        ${lt("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${gt("no_priority")}
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
                                ${bf.map(a=>`<option value="${a.id}">${a.label}</option>`).join("")}
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
    `,Tp(document.getElementById("create-issue-project")),U(),Ua();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),o=Ey();o.title&&(i.value=o.title),o.description&&(s.value=o.description),i.addEventListener("input",()=>{bp(i.value,s.value)}),s.addEventListener("input",()=>{bp(i.value,s.value)}),i.focus()}function e_(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function t_(e){const t=bf.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function yf(e,t){const n=se().find(i=>i.id===t);Df([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?u(n.name):"Project"}</span>
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
                        ${lt("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${gt("no_priority")}
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
    `,U(),Ua(),document.getElementById("create-issue-title").focus()}async function n_(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){_("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,label_ids:Bf(),parent_id:e});H(),_(`Created sub-issue ${d.identifier}`,"success"),de(e)}catch(d){x("create sub-issue",d)}}async function i_(e,t,n){var a,r;Yt();const s=(n||t.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown dropdown-positioning",o.style.top=`${s.top-8}px`,o.style.left=`${s.left}px`,o.style.transform="translateY(-100%)",o.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;o.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Op.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Ve(c))}">
                    ${lt(c)}
                    <span>${Ve(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;o.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${jl.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(Pe(c))}">
                    ${gt(c)}
                    <span>${Pe(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;o.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(bt(c))}">
                    <span class="issue-type-badge type-${c}">${bt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!A())o.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Bl(),c=!1;if(l.length===0)try{l=await h.getLabels(A().id),Ss(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Dc(o,{failed:c}),document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),xs(o,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=js({keepId:l});o.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:p})=>{const f=$t(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${yt(d,"avatar-small")}
                    <span>${ha(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,d=ui(c);o.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(p=>{const f=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${m(f)}" data-label="${m(p.value?p.label:"Estimate")}">
                    <span>${u(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)o.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(c)).filter(f=>f.status!=="completed");o.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${p.map(f=>`
                        <button class="dropdown-option ${f.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${m(f.id)}" data-label="${m(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${u(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{o.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),xs(o)}function s_(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function o_(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Al();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${lt(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${gt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const o=document.getElementById("create-issue-type-btn");o&&(o.innerHTML=`<span class="issue-type-badge type-${t}">${bt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Yt(),s==null||s.focus()}async function wf({keepOpen:e=!1}={}){var w,k;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,p=(k=document.getElementById("create-issue-due-date"))==null?void 0:k.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){_("Please select a project","error");return}if(!n){_("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const $=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,sprint_id:d,label_ids:Bf(),due_date:f});_(`Created ${$.identifier}`,"success"),xy(),C()==="issues"?Nt():C()==="my-issues"&&ki(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Wy(),document.getElementById("create-issue-title").focus()):(H(),de($.id))}catch($){x("create issue",$)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function a_(){await wf({keepOpen:!1})}async function r_(){await wf({keepOpen:!0})}le({"toggle-create-dropdown":(e,t,n)=>{i_(t.dropdownType,e,n)},"set-create-field":(e,t)=>{o_(t.field,t.value,t.label)},"create-issue-submit":()=>{a_()},"create-issue-and-new":()=>{r_()},"update-create-project":()=>{s_()},"apply-template":e=>{t_(e.target.value)},"toggle-create-options":()=>{e_()},"create-sub-issue-submit":(e,t)=>{n_(t.parentId,t.projectId)}});function Qs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(_(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(l_(n,e.project_id),t=!0),t}function l_(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${u(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${m(e.id)}" data-project-id="${m(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${m(e.id)}" data-identifier="${m(e.identifier)}">Close ${u(e.identifier)}</button>
            </div>
        </div>
    `,U())}async function c_(e,t){try{const n=await h.updateIssue(e,{status:"done"});H(),_(`${t} closed`,"success"),Qs(n)}catch(n){x(`close ${t}`,n)}}le({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>c_(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),yf(t.parentId,t.projectId)}});function gn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Yn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Qn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Na(){const e=document.getElementById("group-by-select");return e?e.value:""}const kf=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Ac=["done","canceled"],d_=As,u_="all";function $f(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function _i(e=gn()){return e.length===0?"all":$f(e,As)?"open":$f(e,Ac)?"closed":null}function _f(e){var t,n,i;switch(e){case"status":{const s=_i();return s==="all"?0:s?1:gn().length}case"priority":return Wn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Yn().length;case"exclude_labels":return Qn().length;default:return 0}}function Cc(){let e=0;return kf.forEach(t=>{e+=_f(t.key)}),e}function Ef(){var b,w,k,$,y,E;const e=new URLSearchParams,t=gn(),n=Wn(),i=Yn(),s=Qn(),o=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,a=X()||"",r=(w=document.getElementById("sprint-filter"))==null?void 0:w.value,l=(k=document.getElementById("issue-type-filter"))==null?void 0:k.value,c=($=document.getElementById("group-by-select"))==null?void 0:$.value,d=(y=document.getElementById("sort-by-select"))==null?void 0:y.value,p=_i(t);p==="all"?e.append("status",u_):p!=="open"&&t.forEach(T=>e.append("status",T)),n.forEach(T=>e.append("priority",T)),i.forEach(T=>e.append("label",T)),s.forEach(T=>e.append("exclude_label",T)),o&&e.set("assignee",o),a&&e.set("project",a),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),$y((E=A())==null?void 0:E.id,f)}function p_(e){var k;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some($=>t.has($))){const $=ky((k=A())==null?void 0:k.id);if($){t=new URLSearchParams($);const y=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",y)}}const s=t.getAll("status"),o=document.getElementById("status-filter-dropdown");if(o&&(s.length>0||!o.dataset.statusApplied)){const $=s.length>0?s:d_;o.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=$.includes(E.value)}),o.dataset.statusApplied="true",xf()}const a=t.getAll("priority");if(a.length>0){const $=document.getElementById("priority-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=a.includes(E.value)}),If())}const r=t.get("assignee");r&&Hw(r);const l=t.get("project"),c=se();l&&(!c.length||c.some($=>$.id===l))&&(e(!0),kt(l),e(!1));const d=t.get("sprint");if(d){const $=document.getElementById("sprint-filter");$&&($.value=d)}const p=t.get("issue_type");if(p){const $=document.getElementById("issue-type-filter");$&&($.value=p)}const f=t.getAll("label");if(f.length>0){const $=document.getElementById("label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=f.includes(E.value)}),Oa())}const g=t.getAll("exclude_label");if(g.length>0){const $=document.getElementById("exclude-label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=g.includes(E.value)}),Ha())}const b=t.get("groupBy");if(b){const $=document.getElementById("group-by-select");$&&($.value=b)}const w=t.get("sort");if(w){const $=document.getElementById("sort-by-select");$&&($.value=w)}}function xf(){const e=gn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=_i(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ve(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function If(){const e=Wn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Pe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Oa(){var i,s;const e=Yn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=a}else n.textContent=`${e.length} Labels`}function Ha(){var i,s;const e=Qn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${a}`}else n.textContent=`Excl: ${e.length} Labels`}async function Sf(){if(!A())return;let e;try{e=await h.getLabels(A().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Tf("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Tf("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Tf(e,t,n,i){const s=document.getElementById(e);if(!s)return;const o=s.querySelector(".multi-select-options");o.innerHTML="",t.length===0?o.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ae(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,o.appendChild(l)});const a=document.createElement("div");a.className="multi-select-actions",a.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,o.appendChild(a)}const Lf=Ml,m_=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let qt=[],Af=Promise.resolve();const f_={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};let Ei=null;function g_(e){Ei=e}function tn(e){return Ei==null?void 0:Ei.get(e)}function Fa(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const h_={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Cf(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let o;return n==="first"?o=i[0]:n==="last"?o=i[i.length-1]:n===1?o=i[s<0?0:Math.min(i.length-1,s+1)]:o=i[s<0?i.length-1:Math.max(0,s-1)],o&&o.focus(),!0}function xi(){return!!document.querySelector(".inline-dropdown")}function Bf(){return qt}function Df(e){qt=e}async function Bc(e,t,n,i){var p,f,g,b;e.preventDefault(),Yt();const o=(i||e.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Lf.map((w,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${w}">
                    ${lt(w)}
                    <span>${Ve(w)}</span>
                    <span class="dropdown-shortcut">${k+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${jl.map((w,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${w}">
                    ${gt(w)}
                    <span>${Pe(w)}</span>
                    <span class="dropdown-shortcut">${k}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${m_.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${bt(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=xe(),k=ne().find(y=>y.id===n)||Ye().find(y=>y.id===n)||((w==null?void 0:w.id)===n?w:null)||tn(n),$=js({keepId:(k==null?void 0:k.assignee_id)||null});a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${$.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:$.map(({assignee:y,indent:E},T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(y.id)}">
                    ${yt(y,"avatar-small")}
                    <span>${ha(y,E)}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),k=(w==null?void 0:w.dataset.projectId)||((p=xe())==null?void 0:p.project_id),$=ui(k);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${$.map((y,E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${y.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${y.label}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=ne(),k=Ye(),$=xe(),y=w.find(I=>I.id===n)||k.find(I=>I.id===n)||tn(n)||$,E=new Set(((y==null?void 0:y.labels)||[]).map(I=>I.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const T=a.getBoundingClientRect();let F=o.bottom+4,L=o.left;L+T.width>window.innerWidth-8&&(L=o.right-T.width),F+T.height>window.innerHeight-8&&(F=o.top-T.height-4),a.style.top=`${F}px`,a.style.left=`${Math.max(8,L)}px`,xs(a,{multiSelect:!0});let P=[];const K=A();if(K)try{P=await h.getLabels(K.id)}catch(I){console.error("Failed to load labels:",I)}if(!a.parentNode)return;jf(a,n,P,E);const Y=a.getBoundingClientRect();let q=o.bottom+4,Z=o.left;Z+Y.width>window.innerWidth-8&&(Z=o.right-Y.width),q+Y.height>window.innerHeight-8&&(q=o.top-Y.height-4),a.style.top=`${q}px`,a.style.left=`${Math.max(8,Z)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=ne(),k=Ye(),$=xe(),y=w.find(D=>D.id===n)||k.find(D=>D.id===n)||tn(n)||$,E=(y==null?void 0:y.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const T=a.getBoundingClientRect();let F=o.bottom+4,L=o.left;L+T.width>window.innerWidth-8&&(L=o.right-T.width),F+T.height>window.innerHeight-8&&(F=o.top-T.height-4),a.style.top=`${F}px`,a.style.left=`${Math.max(8,L)}px`,xs(a);let P=[];if(E)try{P=await h.getSprints(E),q$(E,P)}catch(D){console.error("Failed to load sprints:",D)}if(!a.parentNode)return;const K=P.filter(D=>D.status!=="completed"||D.id===(y==null?void 0:y.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${K.map((D,j)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(D.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(D.name)}${D.status==="active"?" (Active)":""}</span>
                    ${j<9?`<span class="dropdown-shortcut">${j+1}</span>`:""}
                </button>
            `).join("")}
        `;const Y=a.getBoundingClientRect();let q=o.bottom+4,Z=o.left;Z+Y.width>window.innerWidth-8&&(Z=o.right-Y.width),q+Y.height>window.innerHeight-8&&(q=o.top-Y.height-4),a.style.top=`${q}px`,a.style.left=`${Math.max(8,Z)}px`,a.classList.remove("dropdown-positioning");const I=D=>{const j=D.key;if(j==="Escape"||j==="Tab"){Yt(),document.removeEventListener("keydown",I),Es(null);return}if(Cf(D,a))return;const me=parseInt(j);if(isNaN(me))return;const ve=a.querySelectorAll(".dropdown-option");let Se=!1;me===0?(Ii(n,"sprint_id",null),Se=!0):me>=1&&me<ve.length&&(ve[me].click(),Se=!0),Se&&(document.removeEventListener("keydown",I),Es(null))};Es(I),document.addEventListener("keydown",I),(g=a.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const r=a.getBoundingClientRect();let l=o.bottom+4,c=o.left;c+r.width>window.innerWidth-8&&(c=o.right-r.width),l+r.height>window.innerHeight-8&&(l=o.top-r.height-4),a.style.top=`${l}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const d=w=>{const k=w.key;if(k==="Escape"||k==="Tab"){Yt(),document.removeEventListener("keydown",d);return}if(Cf(w,a))return;const $=parseInt(k);if(isNaN($))return;let y=!1;if(t==="status"&&$>=1&&$<=6)Ii(n,"status",Lf[$-1]),y=!0;else if(t==="priority"&&$>=0&&$<=4)Ii(n,"priority",jl[$]),y=!0;else if(t==="estimate"){const E=xe(),T=ui(E==null?void 0:E.project_id);$>=0&&$<T.length&&(Ii(n,"estimate",T[$].value),y=!0)}y&&(document.removeEventListener("keydown",d),Es(null))};Es(d),document.addEventListener("keydown",d),(b=a.querySelector(".dropdown-option[data-action]"))==null||b.focus(),xs(a)}function v_(e,t,n,i){Bc(e,t,n,i)}function b_(e,t,n){Af=Af.then(()=>Mf(e,t,n))}async function Mf(e,t,n){const i=ne(),s=Ye(),o=xe(),a=i.find(d=>d.id===e)||s.find(d=>d.id===e)||tn(e)||o;if(!a)return;const r=(a.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),p=d.labels||[],f=y=>({...y,labels:p,updated_at:d.updated_at??y.updated_at}),g=ne();g.some(y=>y.id===e)&&tt(g.map(y=>y.id===e?f(y):y));const b=Ye();b.some(y=>y.id===e)&&Vn(b.map(y=>y.id===e?f(y):y));const w=xe();(w==null?void 0:w.id)===e&&di(f(w));const k=Fa(e);if(k&&k.parentNode){const y=ne().find(E=>E.id===e)||Ye().find(E=>E.id===e);y&&(k.outerHTML=Zn(y))}const $=document.querySelector(".property-labels-btn");$&&($.innerHTML=p.length>0?p.map(y=>`
                    <span class="issue-label" style="background: ${ae(y.color)}20; color: ${ae(y.color)}">${u(y.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(x("update labels",d),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function jf(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const o=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${o?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${o?"✓":""}</span>
                    <span class="issue-label" style="background: ${ae(s.color)}20; color: ${ae(s.color)}">${u(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Rf(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=A();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const o=await h.createLabel(i.id,{name:s}),a=await h.getLabels(i.id);Ss(a),o!=null&&o.id&&await Mf(e,o.id,null);const r=ne(),l=Ye(),c=xe(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||tn(e)||c,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&jf(t,e,a,p),n.value=""}catch(o){x("create label",o)}finally{n.disabled=!1,n.focus()}}}function Ua(){const e=document.getElementById("create-issue-labels-label");e&&(qt.length===0?e.textContent="Labels":e.textContent=`Labels (${qt.length})`)}function Dc(e,{failed:t=!1}={}){const n=Bl();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=qt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ae(i.color)}20; color: ${ae(i.color)}">${u(i.name)}</span>
                </button>
            `}).join("")}
    `}function y_(e){const t=qt.indexOf(e);t>=0?qt.splice(t,1):qt.push(e),Al(),Ua();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Dc(n)}async function Pf(){const e=A();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),o=await h.getLabels(e.id);Ss(o),s!=null&&s.id&&!qt.includes(s.id)&&(qt.push(s.id),Al()),Ua(),t&&Dc(t),n.value=""}catch(s){x("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Ii(e,t,n){var r;Yt();const i=__(e,t,n),s=I_(e,t),o=(r=Ql(e))==null?void 0:r[t],a=Nf(e,t,()=>n);a&&Mc(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Qs(c),qf(e,t,i)){const d={...c,...x_(e,t)};S_(e,{issue:d,myIssue:d,detail:d}),ya(d),Mc(e,t,{focus:!a})}}catch(l){if(x("update issue",l),qf(e,t,i)){Nf(e,t,(d,p)=>d[t]===n?s[p]:d[t]);const c=Ql(e);c&&c[t]===n&&ya({...c,[t]:o}),Mc(e,t,{focus:!1})}return}finally{E_(e,t,i)}if(_("Issue updated","success"),t==="status")try{const l=X();if(l){const d=(await h.getSprints(l)).find(p=>p.status==="active");jc(d||null)}}catch{}}const w_=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),hn=new Map;function k_(e){const t=e&&hn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let $_=0;function __(e,t,n){const i=++$_;return hn.has(e)||hn.set(e,new Map),hn.get(e).set(t,{seq:i,value:n}),i}function qf(e,t,n){var i,s;return((s=(i=hn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function E_(e,t,n){var s;const i=hn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&hn.delete(e))}function x_(e,t){var i;const n={};return(i=hn.get(e))==null||i.forEach((s,o)=>{o!==t&&(n[o]=s.value)}),n}function I_(e,t){var i,s,o;const n=xe();return{issue:(i=ne().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ye().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0,extra:(o=tn(e))==null?void 0:o[t]}}function Nf(e,t,n){const i=(c,d)=>({...c,[t]:n(c,d)});let s=!1;const o=ne();o.some(c=>c.id===e)&&(s=!0,tt(o.map(c=>c.id===e?i(c,"issue"):c)));const a=Ye();a.some(c=>c.id===e)&&(s=!0,Vn(a.map(c=>c.id===e?i(c,"myIssue"):c)));const r=xe();(r==null?void 0:r.id)===e&&(s=!0,di(i(r,"detail")));const l=tn(e);return l&&(s=!0,Ei.set(i(l,"extra"))),s}function S_(e,t){var s;const n=ne();t.issue&&n.some(o=>o.id===e)&&tt(n.map(o=>o.id===e?t.issue:o));const i=Ye();t.myIssue&&i.some(o=>o.id===e)&&Vn(i.map(o=>o.id===e?t.myIssue:o)),t.detail&&((s=xe())==null?void 0:s.id)===e&&di(t.detail),t.issue&&tn(e)&&Ei.set(t.issue)}function T_(e){return e==="estimate"||f_[Na()]===e}function L_(e,t,n,{focus:i}){var d;const s=Fa(e);if(!s||!s.parentNode||!n)return;const o=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&T_(t)&&ne().some(p=>p.id===e))ft();else if(t==="status"&&s.closest("#my-issues-list"))Kn();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=Zn(n),p&&((d=Fa(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!o)return;const r=Fa(e),l=h_[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Mc(e,t,{focus:n}){const i=ne().find(o=>o.id===e)||Ye().find(o=>o.id===e)||tn(e);i&&ya(i),L_(e,t,i,{focus:n});const s=xe();(s==null?void 0:s.id)===e&&w_.has(t)&&A_(t,s)}function A_(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const s=n.querySelector(`.property-row[data-field="${i}"]`);if(!s)return;const o=s.querySelector(".property-value");if(o){if(e==="status")o.innerHTML=`
            ${lt(t.status)}
            <span>${Ve(t.status)}</span>
        `;else if(e==="priority")o.innerHTML=`
            ${gt(t.priority)}
            <span>${Pe(t.priority)}</span>
        `;else if(e==="issue_type")o.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${bt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const a=t.assignee_id?jt(t.assignee_id):null,r=a?$t(a):null;o.innerHTML=r?`${yt(a,"avatar-small")}<span>${u(r)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const a=aw(),r=t.sprint_id&&a?a.find(l=>l.id===t.sprint_id):null;o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${r?u(r.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${pi(t.estimate,t.project_id)}</span>
        `);o.classList.add("updated"),setTimeout(()=>o.classList.remove("updated"),500),o==null||o.focus()}}le({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Ii(t.issueId,i,n==="null"?null:Number(n)):Ii(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),b_(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Rf(t.issueId)},"toggle-create-issue-label":(e,t)=>{y_(t.labelId)},"create-label-for-create-issue":()=>{Pf()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Rf(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Pf())}});function Ga(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Of)},0))}function Of(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Of))}function C_(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Si)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Qe(),it(Dp()),setTimeout(()=>{document.addEventListener("click",Si)},0))}function B_(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Si)):(e.classList.remove("hidden"),H_(),setTimeout(()=>{document.addEventListener("click",Si)},0))}function Si(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),o=document.querySelector(".display-menu-container"),a=s&&i.includes(s),r=o&&i.includes(o);!a&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Si))}function Ti(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Si)}function Qe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=X();e.innerHTML=kf.map(n=>{const i=_f(n.key),s=Dp()===n.key,o=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${o?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function it(e){Xy(e),Qe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":M_(t);break;case"priority":j_(t);break;case"type":R_(t);break;case"assignee":P_(t);break;case"sprint":q_(t);break;case"labels":N_(t);break;case"exclude_labels":O_(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function D_(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Qe()}function M_(e){const t=gn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=_i(t);let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${i==="open"?"active":""}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${i==="closed"?"active":""}" data-action="set-status-preset" data-value="closed">Closed</button>
            <button class="filter-preset-btn ${i==="all"?"active":""}" data-action="set-status-preset" data-value="all">All</button>
        </div>
    `;n.forEach(o=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${m(o.value)}">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=s}function j_(e){const t=Wn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function R_(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(o.value)}">
                <input type="radio" name="type-filter-radio" value="${o.value}" ${n===o.value?"checked":""}>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=s}function P_(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;js({keepId:n||null}).forEach(({assignee:s,indent:o})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${ha(s,o)}</span>
            </label>
        `}),e.innerHTML=i}function q_(e){if(!X()){e.innerHTML=`
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;return}const n=document.getElementById("sprint-filter"),i=(n==null?void 0:n.value)||"",s=n?Array.from(n.options):[];let o=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${i?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{o+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${m(a.value)}">
                <input type="radio" name="sprint-filter-radio" value="${m(a.value)}" ${i===a.value?"checked":""}>
                <span class="filter-option-label">${u(a.text)}</span>
            </label>
        `}),e.innerHTML=o}function N_(e){const t=Yn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(o=>{const a=o.closest("label"),r=a==null?void 0:a.querySelector(".label-name"),l=a==null?void 0:a.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(o.value)}" ${t.includes(o.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(o.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ae(d)};"></span>
                    <span class="filter-option-label">${u(c)}</span>
                </label>
            `}),e.innerHTML=s}function O_(e){const t=Qn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(o=>{const a=o.closest("label"),r=a==null?void 0:a.querySelector(".label-name"),l=a==null?void 0:a.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(o.value)}" ${t.includes(o.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(o.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${ae(d)};"></span>
                    <span class="filter-option-label">${u(c)}</span>
                </label>
            `}),e.innerHTML=s}function H_(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",o=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],a=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${o.map(l=>`
                <div class="display-option ${i===l.value?"active":""}" data-action="set-sort" data-value="${m(l.value)}">
                    <span>${l.label}</span>
                    ${i===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${a.map(l=>`
                <div class="display-option ${s===l.value?"active":""}" data-action="set-group-by" data-value="${m(l.value)}">
                    <span>${l.label}</span>
                    ${s===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Ze(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=gn();if(n.length>0){const d=_i(n),p=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Ve(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Wn();if(i.length>0){const d=i.map(p=>Pe(p)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;o.value==="me"?d="Me":o.value==="unassigned"?d="Unassigned":d=$t(jt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const a=document.getElementById("sprint-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||a.value,clearAction:"clear-sprint-filter"})}const r=Yn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var w;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(w=g==null?void 0:g.closest("label"))==null?void 0:w.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Qn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var w;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(w=g==null?void 0:g.closest("label"))==null?void 0:w.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${u(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Xe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Cc();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Hf(){const e=document.getElementById("sprint-filter");if(!e)return;const t=X(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",jc(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),o=s.find(a=>a.status==="active");o&&(i+=`<option value="current">Current Sprint (${u(o.name)})</option>`),sf(t,o==null?void 0:o.id),jc(o||null),s.forEach(a=>{const r=a.status==="active"?" (Active)":a.status==="completed"?" (Done)":"";i+=`<option value="${a.id}">${u(a.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function jc(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,o=n>i,a=s>=80&&!o,r=o?"budget-over":a?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",o),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${o?'<span class="arrears-badge">In Arrears</span>':""}
    `}function F_(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Ff=!1;wt(e=>{if(e!=="currentProject"||C()!=="issues"||Ff)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Hf(),Sf()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Oa(),Ha(),rt(),Ze(),Xe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),rt(),Ze(),Xe()})});function U_(){p_(e=>{Ff=e})}function za(){xf(),rt(),Ze(),Xe()}function Va(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),za()}function Rc(){If(),rt(),Ze(),Xe()}function Pc(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Rc()}function qc(){Oa(),rt(),Ze(),Xe()}function Ka(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),qc()}function Nc(){Ha(),rt(),Ze(),Xe()}function Wa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Nc()}function G_(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Uf(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,o,a;return(a=(o=(s=n==null?void 0:n.querySelector(`input[value="${G_(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:o.querySelector(".label-name"))==null?void 0:a.textContent}).filter(Boolean)}let Zs=0;function Xs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Gf(){var t,n,i,s,o,a;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=A())==null?void 0:t.id)||"",project:X()||"",status:[...gn()].sort(),priority:[...Wn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((a=(o=document.getElementById("issue-search"))==null?void 0:o.value)==null?void 0:a.trim())||""})}let vn=null;function z_(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Li(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function zf(e,t){Li(!1),wa(e),tt(t),C()==="issues"&&Dt(t),ft(),vn=e,Xs(ek(e).hiddenClosed||0)}function V_(e,t,{loading:n}){wa(null),tt(t),C()==="issues"&&Dt(t),ft(),Li(n),vn=e,Xs(0)}function Vf(){wa(null),vn=null,Li(!1),F_(),Xs(0)}function K_(){const e=document.getElementById("issues-list");Xs(0),e!=null&&e.querySelector(".issue-row")?Li(!0):Vf()}function W_(){const e=ak(Gf()),t=e?bm(e):null;return t?(Pn(-1),zf(e,t),!0):(Vf(),!1)}function Y_(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),o=new Set(t.map(c=>c.id)),a=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!o.has(c.id)&&!(c._isOptimistic&&a.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const p=d&&ym(d.updated_at,c.updated_at)?d:c;l.push(k_(p))}return r.length?[...r,...l]:l}async function Nt(){var k,$,y,E,T,F,L;Pn(-1),z_();const e=++Zs;if(!A())return;const t=X()||"",n=gn(),i=Wn(),s=(k=document.getElementById("assignee-filter"))==null?void 0:k.value,o=(y=($=document.getElementById("issue-search"))==null?void 0:$.value)==null?void 0:y.trim();if(!t&&se().length===0){vn=null,document.getElementById("issues-list").innerHTML=W({icon:V.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const a=Gf(),r={limit:1e3},l=((E=document.getElementById("sort-by-select"))==null?void 0:E.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(T=re())==null?void 0:T.id:r.assignee_id=s);const p=(F=document.getElementById("sprint-filter"))==null?void 0:F.value;if(p)if(p==="current"){if(t){const P=N$(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const Y=(await h.getSprints(t)).find(q=>q.status==="active");sf(t,Y==null?void 0:Y.id),Y&&(r.sprint_id=Y.id)}catch(K){console.error("Failed to resolve current sprint:",K)}}}else r.sprint_id=p;const f=(L=document.getElementById("issue-type-filter"))==null?void 0:L.value;f&&(r.issue_type=f),o&&o.length>=1?r.search=o:r.fields="list";let g=!1,b=!1,w=null;try{const P=Uf(Yn(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const K=Uf(Qn(),"exclude-label-filter-dropdown");K.length>0&&(r.exclude_label=K),t&&(r.project_id=t);const Y=t||`team:${A().id}`;w=hm({...r,scope:Y});const q=bm(w);if(q)g=!0,vn===w&&ok()===w&&_m(ne(),q)||zf(w,q);else{const oe=pk({...r,scope:Y});oe&&(oe.complete||oe.rows.length>0)?(b=!0,V_(w,oe.rows,{loading:!oe.complete})):K_()}const Z=oe=>t?h.getIssues(oe):se().length>0?h.getTeamIssues(A().id,oe):Promise.resolve(void 0),I=r.search&&_i(n)==="open"?Z({...r,status:Ac}).then(oe=>Array.isArray(oe)?oe.length:0).catch(oe=>(console.error("Failed to count closed search matches:",oe),0)):Promise.resolve(0),D=new Set(ne().map(oe=>oe.id)),j=await Z(r);if(wm(w,j),e!==Zs)return;km(a,w);const me=(g||b)&&vn===w,ve=me?Y_(ne(),j,D,Im(r)):j,Se=me&&_m(ne(),ve);wa(w),tt(ve),C()==="issues"&&Dt(Array.isArray(ve)?ve.filter(oe=>!oe._isOptimistic):ve);const Ut=[...new Set(ve.map(oe=>oe.project_id).filter(Boolean))],B=Object.keys(Ma()).length;if(await nf(Ut),e!==Zs)return;const he=Object.keys(Ma()).length!==B;(!Se||he)&&ft(),vn=w,Li(!1);const te=await I;if(nk(w,{hiddenClosed:te}),e!==Zs)return;Xs(te)}catch(P){if(e!==Zs)return;Li(!1);const K=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!K){x("refresh issues",P);return}K&&w&&ik(w),vn=null;const Y=document.getElementById("issues-list");Y&&(Y.innerHTML=W({icon:V.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),x("load issues",P)}}function Q_(){clearTimeout(iw()),sw(setTimeout(()=>{Nt()},300))}function rt(){Ef(),Nt()}async function Kf(){if(Ef(),Na()==="sprint"){const e=ne(),t=[...new Set(e.map(n=>n.project_id))];await nf(t)}ft()}function Z_(){Ze(),Xe()}function X_(e){const t=e==="open"?As:e==="closed"?Ac:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),za(),Qe(),it("status")}function J_(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,za()),Qe(),it("status")}function eE(){Va(),Qe(),it("status"),Ze(),Xe()}function tE(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Rc()),Qe(),it("priority")}function nE(){Pc(),Qe(),it("priority"),Ze(),Xe()}function Wf(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,rt()),Qe(),it("type"),Ze(),Xe(),Ti()}function iE(){Wf("")}function Yf(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,rt()),Qe(),it("assignee"),Ze(),Xe(),Ti()}function sE(){Yf("")}function Qf(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,rt()),Qe(),it("sprint"),Ze(),Xe(),Ti()}function oE(){Qf("")}function aE(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,qc()),Qe(),it("labels")}function rE(){Ka(),Qe(),it("labels"),Ze(),Xe()}function lE(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Nc()),Qe(),it("exclude_labels")}function cE(){Wa(),Qe(),it("exclude_labels"),Ze(),Xe()}function dE(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Nt()),Ti()}function uE(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Kf()),Ti()}function pE(){Va(),Pc();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ka(),Wa(),rt(),Ze(),Xe()}le({"update-label-filter":()=>qc(),"clear-label-filter":()=>Ka(),"update-exclude-label-filter":()=>Nc(),"clear-exclude-label-filter":()=>Wa(),"show-filter-category":(e,t)=>{var n,i;it(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{D_();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>eE(),"set-status-preset":(e,t)=>X_(t.value),"show-all-statuses":()=>Va(),"toggle-status-option":(e,t)=>J_(t.filterValue,e),"clear-priority-filter-new":()=>nE(),"toggle-priority-option":(e,t)=>tE(t.filterValue,e),"set-type-filter":(e,t)=>Wf(t.value),"clear-type-filter":()=>iE(),"set-assignee-filter":(e,t)=>Yf(t.value),"clear-assignee-filter":()=>sE(),"set-sprint-filter":(e,t)=>Qf(t.value),"clear-sprint-filter":()=>oE(),"clear-label-filter-new":()=>rE(),"toggle-label-option":(e,t)=>aE(t.filterValue,e),"clear-exclude-label-filter-new":()=>cE(),"toggle-exclude-label-option":(e,t)=>lE(t.filterValue,e),"set-sort":(e,t)=>dE(t.value),"set-group-by":(e,t)=>uE(t.value),"clear-all-filters":()=>pE(),"retry-load-issues":()=>Nt()});const Zf=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function bn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Ai(e){const t=bn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const mE=60,fE=150;let Je=[],Js=1/0,yn=null,Ya=null,eo=null;const Qa=new Map;let Ci=null,Za=[],to=null;const Xf=e=>{var t;return`${((t=re())==null?void 0:t.id)??""}|${e}`},gE=24;function hE(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(mE,Math.ceil((e+2*t)/gE))}function wn(e,t){if(e!==null&&(Ci!=null&&Ci.has(String(e))))return Za.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Js));return Js-=n.length,n.length<t.length&&Je.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Zn(i)).join("")}function Jf(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function eg(){clearTimeout(yn),yn=null,Hc++,Je=[],Ya=null,to=null,eo=null}function Oc(e=1/0){if(Je.length===0)return;const t=document.getElementById("issues-list");if(!t||!(eo!=null&&eo.isConnected)){eg();return}const n=new Map(ne().map(s=>[s.id,s]));let i=e;for(;Je.length>0&&i>0;){const s=Je[0],o=s.ids.slice(0,i),a=Jf(t,s.groupKey),r=o.map(l=>n.get(l)).filter(Boolean).map(l=>Zn(l)).join("");a==null||a.insertAdjacentHTML("beforeend",r),i-=o.length,o.length===s.ids.length?Je.shift():s.ids=s.ids.slice(o.length)}if(to){const s=to;Xa(t,s.issueId)&&(to=null,og(t,s))}if(Je.length===0){clearTimeout(yn),yn=null;const s=Ya;Ya=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&tg(s)}}const vE=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{yn=setTimeout(e,0)}):yn=setTimeout(e,16);let Hc=0;function bE(){if(clearTimeout(yn),Je.length===0)return;const e=++Hc;vE(function t(){e===Hc&&(Oc(fE),Je.length>0&&(yn=setTimeout(t,0)))})}function ft(){var d,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=TE(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},o=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),eg(),Js=hE();const a=ne();if(a.length===0){const f=(p=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:p.trim(),g=Cc()>0,b=f&&f.length>=2;if(g||b){const w=Cc(),k=[];b&&k.push(`search "${f}"`),g&&k.push(`${w} active filter${w>1?"s":""}`),e.innerHTML=W({icon:V.issues,heading:"No matching issues",description:`No issues match your ${k.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=W({icon:V.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Pn(-1),Js=1/0;return}const r=Na();Ci=Qa.get(Xf(r))||null,Za=[],r==="status"?yE(e,a):r==="priority"?wE(e,a):r==="type"?kE(e,a):r==="assignee"?$E(e,a):r==="sprint"?_E(e,a):e.innerHTML=Ai(a)+wn(null,a),Js=1/0,eo=e.firstElementChild,Je.push(...Za),Za=[];const l=Ci;Ci=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&ig(f,!0)}),o.forEach(([f,g])=>{f&&SE(f,e,g)})),i&&(Xa(e,i.issueId)?og(e,i):Je.length>0&&(to=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Je.length>0&&!c?Ya=n:tg(n),bE()}function tg(e){const t=Mp();if(t<0)return;const n=document.querySelectorAll(aa);if(n.length===0){Pn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Pn(i),n[i].classList.add("keyboard-selected")}function yE(e,t){const n={};Ml.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Ai(t);Ml.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${lt(s)}</span>
                    <span class="group-title">${Ve(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${bn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function wE(e,t){const n={};Np.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Ai(t);Np.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${gt(s)}</span>
                    <span class="group-title">${Pe(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${bn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function kE(e,t){const n={};Zf.forEach(s=>n[s]=[]),t.forEach(s=>{const o=s.issue_type||"task";n[o]&&n[o].push(s)});let i=Ai(t);Zf.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${bt(s)}</span></span>
                    <span class="group-title">${bt(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${bn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function $E(e,t){const n={},i="__unassigned__";n[i]=[];const s=js({includeIdle:!0});s.forEach(({assignee:a})=>{n[a.id]=[]}),t.forEach(a=>{a.assignee_id&&n[a.assignee_id]?n[a.assignee_id].push(a):n[i].push(a)});let o=Ai(t);n[i].length>0&&(o+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${bn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:a})=>{const r=n[a.id];if(!r||r.length===0)return;const l=$t(a)||"Unknown",c=a.is_agent?a.parent_user_name?` (${a.parent_user_name})`:" (agent)":"";o+=`
            <div class="issue-group" data-group="${m(a.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(a.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${yt(a,"avatar-small")}</span>
                    <span class="group-title">${u(l)}${u(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${bn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(a.id,r)}
                </div>
            </div>
        `}),e.innerHTML=o}function _E(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const o={active:0,planned:1,completed:2},a=Ma();s.sort((l,c)=>{const d=a[l],p=a[c],f=d?o[d.status]??3:3,g=p?o[p.status]??3:3;return f-g});let r=Ai(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=a[l],p=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${u(p)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${bn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(g,c)}
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
                    <span class="group-points">${bn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${wn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function ng(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Xa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function EE(e,t){const n=Jf(e,t);if(!n)return;const i=new Map(ne().map(s=>[s.id,s]));Je=Je.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const o=s.ids.map(a=>i.get(a)).filter(Boolean).map(a=>Zn(a)).join("");return n.insertAdjacentHTML("beforeend",o),!1})}function ig(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function xE(e,t){const n=Array.from(document.querySelectorAll(aa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(o=>t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(o)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Pn(s)}function sg(e,t,n){ig(t,n);const i=Xf(Na());Qa.has(i)||Qa.set(i,new Set);const s=Qa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),EE(e,t.dataset.group)),xE(e,t)}function IE(e){const t=document.getElementById("issues-list"),n=t&&ng(t,e);n&&sg(t,n,!n.classList.contains("collapsed"))}function SE(e,t=document.getElementById("issues-list"),n=void 0){var o;if(!e||!t)return;const i=Je.find(a=>a.ids.includes(e)),s=i?i.groupKey===null?null:ng(t,i.groupKey):(o=Xa(t,e))==null?void 0:o.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||sg(t,s,!1))}function TE(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function og(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Xa(e,t);if(!s)return;const o=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");o==null||o.focus({preventScroll:!0})}function ag(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),o=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(o)}`}function LE(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),o=Math.min(e.length,i+t.length+n),a=e.slice(s,o),r=ag(a,t);return`${s>0?"…":""}${r}${o<e.length?"…":""}`}const AE=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Zn(e){var f,g,b;const t=e.assignee_id?jt(e.assignee_id):null,n=t?$t(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":AE.format(i),o=e.estimate!=null?pi(e.estimate,e.project_id):"",a=ma(e.estimate,e.project_id),r=e.sprint_id?Ma()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),p=c&&!d?LE(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${Pe(e.priority)}">
                    ${gt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Ve(e.status)}">
                    ${lt(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${bt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${ag(e.title,c)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(w=>`
                            <span class="issue-label" style="background: ${ae(w.color)}20; color: ${ae(w.color)}">${u(w.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${m(e.id)}" title="Sprint: ${l?u(l):"None"}">
                    ${l?`<span class="sprint-badge">${u(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${m(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${o||"None"}`}">
                    ${o?`<span class="estimate-badge${a?" out-of-scale":""}">${o}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${m(e.id)}" title="${m(n||"Unassigned")}">
                    ${n?yt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function gt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function lt(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}le({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}IE(t.group)},"show-inline-dropdown":(e,t,n)=>{Bc(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),de(t.issueId))}});const no=new Set(["image/png","image/jpeg","image/gif","image/webp"]),Fc={file:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',clip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',remove:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>'},io=new Map,kn=new Map;function Uc(e){for(const t of e||[])t&&ks.test(t.id)&&io.set(t.id,t)}function so(e){return String(e||"").split(";")[0].trim().toLowerCase()}function rg(e){let t=kn.get(e);return t||(t={promise:null,url:null,type:null},kn.set(e,t),t.promise=h.fetchAttachmentContent(e).then(n=>(t.type=so(n.type),kn.get(e)===t&&no.has(t.type)&&(t.url=URL.createObjectURL(n)),t)),t.promise.catch(()=>{kn.get(e)===t&&kn.delete(e)})),t.promise}function CE(e){const t=kn.get(e);t!=null&&t.url&&URL.revokeObjectURL(t.url),kn.delete(e)}function lg(){for(const e of[...kn.keys()])document.querySelector(`img[data-attachment-id="${e}"]`)||CE(e)}function BE(e){return`/api/attachments/${e}/content`}function cg(e,t){const n=document.createElement("a");return n.className="attachment-link",n.href=BE(e),n.setAttribute("data-action","open-attachment"),n.setAttribute("data-attachment-ref",e),t&&n.setAttribute("data-filename",t),n.innerHTML=Fc.clip,n.append(` ${t||"Download attachment"}`),n}function DE(e,t){const n=document.createElement("span");n.className="attachment-unavailable";const i=(e==null?void 0:e.status)===410?"file no longer stored":(e==null?void 0:e.status)===404?"not found":"could not be loaded";return n.textContent=`${t||"Attachment"}: ${i}`,n}function Ja(e=document){var n;const t=e.querySelectorAll("img[data-attachment-id]:not([data-attachment-state])");for(const i of t){const s=i.getAttribute("data-attachment-id");if(!ks.test(s)){i.setAttribute("data-attachment-state","invalid");continue}const o=i.getAttribute("alt")||((n=io.get(s))==null?void 0:n.filename)||"",a=io.get(s);if(a&&!no.has(so(a.content_type))){i.replaceWith(cg(s,a.filename||o));continue}i.setAttribute("data-attachment-state","loading"),rg(s).then(r=>{r.url?(i.src=r.url,i.setAttribute("data-attachment-state","loaded")):i.isConnected&&i.replaceWith(cg(s,o))},r=>{i.setAttribute("data-attachment-state","failed"),i.isConnected&&!i.closest(".attachment-thumb")&&i.replaceWith(DE(r,o))}).finally(zc)}}let Gc=!1;function zc(){Gc||(Gc=!0,queueMicrotask(()=>{Gc=!1,!(typeof document>"u")&&(Ja(document),lg())}))}let Vc=null;function ME(){Vc||typeof MutationObserver>"u"||!document.body||(Vc=new MutationObserver(zc),Vc.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("auxclick",XE),zc())}async function dg(e,t){try{const n=await h.fetchAttachmentContent(e),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t||"attachment",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}catch(n){x("download attachment",n)}}let $n=null;function jE(){$n==null||$n.disconnect(),$n=null;const e=document.getElementById("modal-overlay");!e||typeof MutationObserver>"u"||($n=new MutationObserver(()=>{var t;e.classList.contains("hidden")&&($n.disconnect(),$n=null,(t=document.querySelector("#modal-content .attachment-viewer"))==null||t.remove(),lg())}),$n.observe(e,{attributes:!0,attributeFilter:["class"]}))}function RE(e,t){var n,i;document.getElementById("modal-title").textContent=t||"Attachment",document.getElementById("modal-content").innerHTML=`
        <figure class="attachment-viewer">
            <img data-attachment-id="${m(e)}" alt="${m(t||"")}">
            <figcaption class="attachment-viewer-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-action="download-attachment" data-attachment-id="${m(e)}" data-filename="${m(t||"")}">Download</button>
            </figcaption>
        </figure>`,(n=document.querySelector(".modal"))==null||n.classList.add("modal-wide"),U(),jE(),(i=document.querySelector("#modal-content .attachment-viewer-actions button"))==null||i.focus(),Ja(document.getElementById("modal-content"))}async function PE(e,{filename:t="",contentType:n=""}={}){if(!ks.test(e||""))return;const i=io.get(e),s=t||(i==null?void 0:i.filename)||"";let o=so(n||(i==null?void 0:i.content_type));if(!o)try{o=(await rg(e)).type}catch(a){x("open attachment",a);return}no.has(o)?RE(e,s):dg(e,s)}let ee=null;function Kc(e){const t=Number(e)||0;return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(t<10*1024?1:0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function qE(e,{userId:t,isAdmin:n}){return n!==!1||!!t&&e.uploader_id===t}function NE(e,t){const n=no.has(so(e.content_type)),i=e.filename||"attachment",s=[Kc(e.size),e.uploader_name||"Unknown",qe(e.created_at)].filter(Boolean).map(u).join(" · ");return`
        <li class="attachment-item">
            <button type="button" class="attachment-open" data-action="open-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" data-content-type="${m(e.content_type||"")}" title="${n?"View":"Download"} ${m(i)}">
                <span class="attachment-thumb">${n?`<img data-attachment-id="${m(e.id)}" alt="">`:Fc.file}</span>
                <span class="attachment-name">${u(i)}</span>
                <span class="attachment-meta">${s}</span>
            </button>
            ${qE(e,t)?`<button type="button" class="attachment-delete" data-action="delete-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" title="Delete" aria-label="Delete ${m(i)}">${Fc.remove}</button>`:""}
        </li>`}const ug=10*1024*1024,OE=/^(image\/|video\/|audio\/|font\/)|^application\/(zip|gzip|x-gzip|x-tar|x-7z-compressed|x-rar-compressed|vnd\.rar|x-bzip2|x-xz|java-archive|vnd\.android\.package-archive|x-msdownload|wasm)$/,HE=2*1024*1024;function FE(e){const t=(e==null?void 0:e.name)||"file",n=so(e==null?void 0:e.type);return!e||e.size===0&&!n?`${t} is empty or a folder`:e.size>ug?`${t} is ${Kc(e.size)}; the limit is ${Kc(ug)}`:n&&!no.has(n)&&OE.test(n)?`${t} can't be attached: only PNG, JPEG, GIF, WebP, PDF or plain text`:null}const UE="Drop files here, or use Add. PNG, JPEG, GIF, WebP, PDF or text, up to 10 MB.";function pg(e,t){return e===null?'<p class="attachments-hint">Attachments could not be loaded.</p>':e.length?`<ul class="attachment-grid">${e.map(n=>NE(n,t)).join("")}</ul>`:`<p class="attachments-hint">${UE}</p>`}function GE(e,t,{userId:n=null,isAdmin:i=!1}={}){ee={issueId:e,attachments:t?[...t]:null,userId:n,isAdmin:i},Uc(t||[]);const s=(t==null?void 0:t.length)||0;return`
        <section class="attachments${Array.isArray(t)&&!s?" is-empty":""}" id="issue-attachments" aria-label="Attachments" data-issue-id="${m(e)}">
            <div class="related-head">
                <h3 id="attachments-heading" tabindex="-1">Attachments <span class="section-count">${s||""}</span></h3>
                <label class="ticket-gate-text-btn attachments-add">
                    + Add
                    <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${m(e)}" aria-label="Attach files">
                </label>
            </div>
            <div class="attachments-status" role="status" aria-live="polite"></div>
            <div class="attachments-body">${pg(ee.attachments,{userId:n,isAdmin:i})}</div>
        </section>`}function Wc(e){const t=document.getElementById("issue-attachments");return t&&ee&&ee.issueId===e&&t.dataset.issueId===e?t:null}function Yc(e,t){var i;const n=(i=Wc(e))==null?void 0:i.querySelector(".attachments-status");n&&(n.textContent=t)}function mg(e){const t=Wc(e);if(!t)return;const{attachments:n,userId:i,isAdmin:s}=ee;t.querySelector(".section-count").textContent=n!=null&&n.length?String(n.length):"",t.classList.toggle("is-empty",Array.isArray(n)&&n.length===0);const o=t.querySelector(".attachments-body");o.innerHTML=pg(n,{userId:i,isAdmin:s}),Ja(o)}function zE(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const VE=e=>new Promise(t=>setTimeout(t,e)),fg={inFlightRetryMs:1e3,inFlightTries:3},gg=e=>{var t;return((t=e==null?void 0:e.detail)==null?void 0:t.error_code)==="idempotency_in_flight"};async function KE(e,t){const n=zE(),i=()=>h.uploadAttachment(e,t,{idempotencyKey:n});try{return await i()}catch(s){if(!(s!=null&&s.isNetworkError)||t.size>HE)throw s}for(let s=1;;s++)try{return await i()}catch(o){if(!gg(o)||s>=fg.inFlightTries)throw o;await VE(fg.inFlightRetryMs)}}async function WE(e){try{const t=await h.getAttachments(e);return Uc(t),(ee==null?void 0:ee.issueId)===e&&(ee.attachments=[...t]),t}catch{return null}}let hg=Promise.resolve();function vg(e,t){const n=[...t||[]],i=hg.then(()=>YE(e,n));return hg=i.catch(()=>0),i}async function YE(e,t){if(!t.length)return 0;let n=0,i=!1;for(const[s,o]of t.entries()){const a=FE(o);if(a){_(a,"error");continue}Yc(e,t.length>1?`Uploading ${o.name} (${s+1} of ${t.length})…`:`Uploading ${o.name}…`);try{const r=await KE(e,o);n+=1,Uc([r]),(ee==null?void 0:ee.issueId)===e&&ee.attachments&&(ee.attachments=[...ee.attachments.filter(l=>l.id!==r.id),r])}catch(r){r!=null&&r.isNetworkError||gg(r)?(i=!0,_(`${o.name} may not have been attached; the list shows what was`,"error")):x(`attach ${o.name}`,r)}}return(ee==null?void 0:ee.issueId)===e&&(i||n&&ee.attachments===null)&&await WE(e),mg(e),Yc(e,n?n===1?"1 file attached":`${n} files attached`:""),n&&_(n===1?"File attached":`${n} files attached`,"success"),n}async function QE(e,t){if(!ks.test(e||"")||!confirm(`Delete ${t||"this attachment"}? Comments that show it will show it as missing.`))return!1;try{await h.deleteAttachment(e)}catch(a){return x("delete attachment",a),!1}io.delete(e);const n=ee==null?void 0:ee.issueId,i=(ee==null?void 0:ee.attachments)||[],s=i.findIndex(a=>a.id===e);ee!=null&&ee.attachments&&(ee.attachments=i.filter(a=>a.id!==e)),mg(n);const o=Wc(n);if(o){const a=ee.attachments||[],r=a[Math.min(Math.max(s,0),a.length-1)],l=r?o.querySelector(`.attachment-open[data-attachment-id="${r.id}"]`):(o.classList.contains("is-empty")?document.querySelector('.sidebar-actions input[data-action="pick-attachments"]'):null)||o.querySelector("#attachments-heading");l==null||l.focus(),Yc(n,`${t||"Attachment"} deleted`)}return _("Attachment deleted","success"),!0}function ZE(e,t,n){if(!e)return;const i=r=>{var l;return Array.from(((l=r.dataTransfer)==null?void 0:l.types)||[]).includes("Files")},s=r=>{var l;return(l=document.getElementById("issue-attachments"))==null?void 0:l.classList.toggle("is-dragover",r)};e.addEventListener("dragover",r=>{i(r)&&(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="copy"),s(!0))},{signal:n}),e.addEventListener("dragleave",r=>{r.relatedTarget&&e.contains(r.relatedTarget)||s(!1)},{signal:n}),e.addEventListener("drop",r=>{i(r)&&(r.preventDefault(),s(!1),vg(t,r.dataTransfer.files))},{signal:n});const o=new AbortController;n==null||n.addEventListener("abort",()=>o.abort(),{once:!0});const a=()=>e.isConnected&&!e.closest(".hidden");for(const r of["dragover","drop"])document.addEventListener(r,l=>{var c,d;if(!a()){o.abort();return}!i(l)||l.defaultPrevented||e.contains(l.target)||(d=(c=l.target)==null?void 0:c.closest)!=null&&d.call(c,'input[type="file"]')||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="none"),r==="drop"&&s(!1))},{signal:o.signal})}const Qc=(e,t)=>e.type==="click"||e.type==="keydown"&&t.tagName!=="A"&&t.tagName!=="BUTTON";function bg(e){PE(e.dataset.attachmentId||e.dataset.attachmentRef,{filename:e.dataset.filename||e.getAttribute("alt")||"",contentType:e.dataset.contentType||""})}function XE(e){var n,i;if(e.button!==1)return;const t=(i=(n=e.target)==null?void 0:n.closest)==null?void 0:i.call(n,'[data-action="open-attachment"]');t&&(e.preventDefault(),bg(t))}le({"open-attachment":(e,t,n)=>{Qc(e,n)&&(e.preventDefault(),bg(n))},"download-attachment":(e,t,n)=>{Qc(e,n)&&dg(t.attachmentId,t.filename)},"delete-attachment":(e,t,n)=>{Qc(e,n)&&QE(t.attachmentId,t.filename)},"pick-attachments":(e,t,n)=>{if(e.type!=="change")return;const i=[...n.files||[]];n.value="",vg(t.issueId,i)}});const Bi={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function _n(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function oo(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Zc(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function er(e){return oo(e)&&!!Zc(e)}function tr(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],o=[];for(const a of n)((_n(a)||oo(a)&&!er(a))&&t?s:o).push(a);return{needsYou:s,waiting:o,done:i,total:n.length+i.length}}function Xc(e,t,n){return e===1?t:n}function ao(e){return _n(e)?"Review":er(e)?"Ask again for":oo(e)?"Sign off on":Zc(e)?"Re-attest":"Attest"}function Jc(e,t){return _n(e)?"an admin":oo(e)&&!er(e)?"a person":t||"the assignee"}function JE(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function yg(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${JE(t)}</span></div>`}function wg(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${Bi.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${Bi.link}Linked document</a>`}function kg(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(qe(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${ut(t.note)}</div>`:""}
            ${wg(t)}
        </div>`:""}function $g(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(qe(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function ed(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!_n(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${$g(t)}</div>`}const Di=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function ex(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${Di(e,t)}>Send back…</button>`;return _n(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${Di(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${Di(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function tx(e,t,n){return er(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${Di(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":_n(e)||oo(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${Di(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${Di(e,t)}>Attest it yourself</button>`}function _g(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(ao(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function td(e,t){const{needsYou:n,waiting:i,done:s,total:o}=e,a=(l,c,d,p)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(d)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var c;return a(Bi.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>a(Bi.ring,"you",l.name,"waiting on you")),...i.map(l=>a(Bi.ring,"",l.name,`waiting on ${Jc(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${o} ${Xc(o,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function nx(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=tr(e,{canAct:t});return n[0]||i[0]||null}function ix(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:o}=tr(e,{canAct:t});if(o===0)return"";const a=i[0]||s[0];return a?`Waiting on ${i.length?"you":Jc(a,n)}: ${ao(a).toLowerCase()} ${a.name}.`:`All ${o} ${Xc(o,"ritual","rituals")} done.`}function sx(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=tr(e,{canAct:n}),{needsYou:o,waiting:a,total:r}=s;if(r===0)return"";if(o.length===0&&a.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${Bi.check}</span>
                ${td(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${Xc(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(o.length>0){const p=o[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${yg("you",p)}
                <h2 class="ticket-gate-step">${u(ao(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${ut(p.prompt)}</div>`:""}
                ${kg(p)}
                ${ed(p)}
                <div class="ticket-gate-actions">${ex(p,t)}</div>
                ${_g([...o.slice(1),...a],"Then")}
                ${td(s,i)}
            </section>`}const l=a[0],c=l.attestation?null:Zc(l),d=tx(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${yg(Jc(l,i),l)}
            <h2 class="ticket-gate-step">${u(ao(l))} <b>${u(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${$g(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${ut(l.prompt)}</div>`:""}
            ${kg(l)}
            ${ed(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${_g(a.slice(1),"After that")}
            ${td(s,i)}
        </section>`}function ox(e,{canAct:t=!1}={}){const{needsYou:n}=tr(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(ao(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const Eg={doc:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},xg=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function ax(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const Ig={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4,Document:5},rx=e=>`<a href="/document/${encodeURIComponent(e.id)}" class="related-link" data-action="open-linked-document" data-document-id="${m(e.id)}"><span class="related-title">${u(e.title||"Untitled")}</span></a>`;function lx(e,t=[],n=[],{formatEstimate:i=null,documents:s=[]}={}){const o=r=>r.estimate==null?"":` · ${u(i?i(r.estimate,r.project_id||e.project_id):`${r.estimate} pts`)}`,a=[...(t||[]).map(r=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${lt(r.status)}</span>
                    ${xg(r.id,r.identifier,r.title)}
                    <span class="related-kind">Sub-issue${o(r)}</span>
                </li>`})),...(n||[]).map(r=>{const l=ax(r);return{kind:l,html:`
                <li class="related-row">
                    <span class="related-status">${lt(r.related_issue_status)}</span>
                    ${xg(r.related_issue_id,r.related_issue_identifier,r.related_issue_title)}
                    <span class="related-kind${l==="Blocked by"?" blocked":""}">${l}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(r.id)}" title="Remove link" aria-label="Remove link to ${m(r.related_issue_identifier)}">${Eg.remove}</button>
                </li>`}}),...(s||[]).map(r=>({kind:"Document",html:`
                <li class="related-row">
                    <span class="related-status">${Eg.doc}</span>
                    ${rx(r)}
                    <span class="related-kind">Document</span>
                </li>`}))].sort((r,l)=>Ig[r.kind]-Ig[l.kind]);return`
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
            ${a.length?`<ul class="related-list">${a.map(r=>r.html).join("")}</ul>`:""}
            ${s===null?'<p class="related-note">Linked documents could not be loaded.</p>':""}
        </section>`}const cx=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function dx(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${cx(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(qe(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${Ns(e.content).trim()}</div>
            </div>
        </li>`}const Sg=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${Ns(t).trim()}</div></details>`;function ux(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let o,a="",r="";return e.activity_type==="ritual_attested"?(o=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?a=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(a=" · waiting for review"),e.new_value&&(r=Sg("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(o=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=Sg("Reason",e.new_value,!0))):o=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${o}</span>${a}
                <span class="timeline-meta">· ${u(n(e))} · ${u(qe(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function px(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function mx(e){const t=[];let n=[];const i=()=>{n.length>1?t.push(`<li class="timeline-run"><details><summary>${n.length} updates</summary><ol class="timeline timeline-run-list">${n.join("")}</ol></details></li>`):t.push(...n),n=[]};for(const s of e)s.fold?n.push(s.html):(i(),t.push(s.html));return i(),t.join("")}function fx({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:o=!1,issueId:a},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...px(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:dx(g),fold:!1})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:ux(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i}),fold:!b&&g.activity_type!=="ritual_rejected"}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${o?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(a)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${mx(p)}</ol>`:o?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}async function Tg(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=ui(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${u(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${m(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${m(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${u(t.description||"")}</textarea>
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
                        ${n.filter(a=>a.status!=="completed").map(a=>`
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${u(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,U();const o=document.getElementById("edit-issue-description");if(o){const a=ws(e);if(a){const r=gp(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(o.value=a,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}o.addEventListener("input",()=>{const r=o.value;r!==(t.description||"")?Mn(e,r,t.description||""):Mn(e,null)})}}catch(t){x("load issue",t)}}async function gx(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),o=document.getElementById("edit-issue-priority"),a=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!o||!a)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:o.value,issue_type:a.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);ws(t)===c.description&&Mn(t,null),H(),await de(t),_("Issue updated!","success"),Qs(d)}catch(n){x("update issue",n)}}async function hx(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Nt(),await pt(),O("issues"),_("Issue deleted!","success")}catch(t){x("delete issue",t)}}le({"update-issue":(e,t)=>{gx(e,t.issueId)}});const vx=1,bx={bold:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',italic:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',code:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',bulletList:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',blockquote:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>'},yx=[["bold","Bold"],["italic","Italic"],["code","Code"],["link","Link"],["bulletList","Bulleted list"],["blockquote","Quote"]],wx="This comment uses markdown the editor would change, so it stays as markdown.";let Mi=null;function kx(){const e=document.querySelector('meta[name="chaotic-version"]'),t=e?e.getAttribute("data-editor"):"";return`/static/js/editor.bundle.js${!!t&&/^[0-9a-f]{8}$/.test(t)?`?v=${t}`:""}`}function nr(e){return e&&e.API_VERSION===vx?e:null}function $x(){const e=nr(window.ChaoticEditor);return e?Promise.resolve(e):Mi||(Mi=new Promise((t,n)=>{const i=document.createElement("script");i.src=kx(),i.async=!0,i.onload=()=>{const s=nr(window.ChaoticEditor);s?t(s):n(new Error("editor bundle is a different version"))},i.onerror=()=>{i.remove(),n(new Error("editor bundle failed to load"))},document.head.appendChild(i)}).then(t=>(Mi=null,t),t=>{throw Mi=null,t}),Mi)}const ji=new Map;function _x(e,{signal:t,mentionContext:n={},placeholder:i="",restore:s=null}={}){const o=document.getElementById(e);if(!o||o.dataset.richComposer==="true")return null;o.dataset.richComposer="true";const a=o.closest("form"),r={textarea:o,form:a,editor:null,api:null,wrapper:null,toolbar:null,note:null,mode:"markdown",syncing:!1,composing:!1,pendingApi:null,destroyed:!1,mentionContext:n,placeholder:i||o.getAttribute("placeholder")||"",start:null};return ji.set(e,r),Ex(r,t),o.addEventListener("compositionstart",()=>{r.composing=!0},{signal:t}),o.addEventListener("compositionend",()=>{if(r.composing=!1,r.pendingApi){const l=r.pendingApi;r.pendingApi=null,nd(r,l,{focus:document.activeElement===o})}},{signal:t}),r.start=({focus:l=!1,restoreTo:c=null}={})=>{if(r.editor||r.destroyed||Ty()==="markdown")return;const d=nr(window.ChaoticEditor);if(d){nd(r,d,{focus:l,restore:c});return}$x().then(p=>{if(!(r.destroyed||r.editor||!p)){if(r.composing){r.pendingApi=p;return}nd(r,p,{focus:l||document.activeElement===o})}}).catch(()=>{})},o.addEventListener("focus",()=>r.start(),{signal:t}),sd(r,"markdown",{}),nr(window.ChaoticEditor)&&r.start({restoreTo:s}),a==null||a.addEventListener("focusin",()=>a.classList.add("composer-active"),{signal:t}),a==null||a.addEventListener("focusout",l=>{!a.contains(l.relatedTarget)&&!o.value&&a.classList.remove("composer-active")},{signal:t}),s&&(a==null||a.classList.add("composer-active")),o.addEventListener("input",()=>{var l,c;if(!(r.syncing||r.mode!=="rich"||!r.editor)){if(!r.api.roundTripsCleanly(r.editor,o.value,Ns)){id(r,{focus:!0,refused:!0});return}r.editor.commands.setContent(o.value,{contentType:"markdown",emitUpdate:!1}),r.editor.commands.focus("end"),(c=(l=r.wrapper).scrollIntoView)==null||c.call(l,{behavior:"smooth",block:"nearest"})}},{signal:t}),t==null||t.addEventListener("abort",()=>Sx(e,r)),r}function Ex(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="toolbar rich-composer-toolbar",s.setAttribute("role","toolbar"),s.setAttribute("aria-label","Formatting"),s.innerHTML=`${yx.map(([r,l])=>`<button type="button" class="icon-btn" data-tool="${r}" title="${l}" aria-label="${l}" aria-pressed="false" tabindex="-1">${bx[r]}</button>`).join("")}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;const o=document.createElement("div");o.className="rich-composer-note",o.setAttribute("role","status"),o.hidden=!0,s.addEventListener("mousedown",r=>{r.target.closest("button")&&r.preventDefault()},{signal:t}),s.addEventListener("click",r=>{const l=r.target.closest("button[data-tool]");if(l){if(l.dataset.tool==="mode"){e.mode==="rich"?id(e,{focus:!0,remember:!0}):Lg(e,{focus:!0});return}if(!(!e.editor||e.mode!=="rich")){if(l.dataset.tool==="link"){const c=e.editor.getAttributes("link").href||"",d=window.prompt("Link URL (leave empty to remove the link)",c);if(d===null){e.editor.commands.focus();return}e.api.COMMANDS.link(e.editor,d)||_("That link can’t be added. Use an http, https or mailto address.","error")}else e.api.COMMANDS[l.dataset.tool](e.editor);ir(e)}}},{signal:t}),s.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const l=[...s.querySelectorAll("button")].filter(p=>!p.disabled&&!p.hidden),c=l.indexOf(document.activeElement);if(c<0||!l.length)return;r.preventDefault();const d=r.key==="Home"?0:r.key==="End"?l.length-1:(c+(r.key==="ArrowRight"?1:-1)+l.length)%l.length;l.forEach(p=>{p.tabIndex=-1}),l[d].tabIndex=0,l[d].focus()},{signal:t});const a=i==null?void 0:i.querySelector(".comment-box-foot");a?(a.prepend(s),i.append(o),i.classList.add("has-rich-composer")):i?(i.append(s,o),i.classList.add("has-rich-composer")):(n.insertAdjacentElement("afterend",s),s.insertAdjacentElement("afterend",o)),e.toolbar=s,e.note=o}function nd(e,t,{focus:n=!1,restore:i=null}={}){xx(e,t)&&(Lg(e,{focus:n||!!i,remember:!1}),i&&e.mode==="rich"&&Ix(e,i))}function xx(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="rich-composer",s.hidden=!0,n.insertAdjacentElement("beforebegin",s);try{e.editor=t.createEditor({element:s,markdown:"",placeholder:e.placeholder,getMentionItems:o=>Rm(o,e.mentionContext),getDocumentItems:async o=>(await Mm(o)).map(a=>({...a,href:Bm(a.id)})),onUpdate:o=>{e.syncing=!0,n.value=o,n.dispatchEvent(new Event("input",{bubbles:!0})),e.syncing=!1,ir(e)},onSubmit:()=>i==null?void 0:i.requestSubmit(),onEscape:()=>e.editor.commands.blur()})}catch{return s.remove(),e.editor=null,!1}return e.wrapper=s,e.api=t,e.editor.on("selectionUpdate",()=>ir(e)),!0}function Lg(e,{focus:t=!1,remember:n=!0}={}){if(n&&yp("rich"),!e.editor){e.start({focus:t});return}if(!e.api.roundTripsCleanly(e.editor,e.textarea.value,Ns)){id(e,{focus:t,refused:!0});return}e.editor.commands.setContent(e.textarea.value||"",{contentType:"markdown",emitUpdate:!1}),sd(e,"rich",{focus:t})}function id(e,{focus:t=!1,remember:n=!1,refused:i=!1}={}){n&&yp("markdown"),sd(e,"markdown",{focus:t,refused:i})}function sd(e,t,{focus:n=!1,refused:i=!1}={}){const{textarea:s,editor:o,wrapper:a,toolbar:r,note:l}=e,c=t==="rich"&&!!o;e.mode=c?"rich":"markdown",s.hidden=c,a&&(a.hidden=!c),r.classList.toggle("markdown-mode",!c);const d=r.querySelector(".rich-mode-toggle");d.setAttribute("aria-pressed",String(!c)),d.title=c?"Write raw markdown":"Back to the formatted editor",l.hidden=!i,l.textContent=i?wx:"",n&&(c?o.commands.focus("end"):(s.focus(),s.setSelectionRange(s.value.length,s.value.length))),ir(e)}function ir(e){if(!e.toolbar)return;const t=!!e.editor&&e.mode==="rich",n=t?e.api.activeMarks(e.editor):{};e.toolbar.querySelectorAll(".icon-btn[data-tool]").forEach(o=>{const a=!!n[o.dataset.tool];o.setAttribute("aria-pressed",String(a)),o.classList.toggle("is-active",a),o.disabled=!t,o.hidden=!t});const i=[...e.toolbar.querySelectorAll("button")],s=i.filter(o=>!o.disabled&&!o.hidden);s.some(o=>o.tabIndex===0)||(i.forEach(o=>{o.tabIndex=-1}),(s[0]||i.at(-1)).tabIndex=0)}function Ix(e,{from:t,to:n}){const i=e.editor.state.doc.content.size,s=o=>Math.max(1,Math.min(o,i));try{e.editor.chain().focus().setTextSelection({from:s(t),to:s(n)}).run()}catch{e.editor.commands.focus("end")}}function Sx(e,t){t.destroyed=!0,t.editor&&t.editor.destroy(),t.editor=null,document.querySelectorAll(".rich-mention-suggestions").forEach(n=>n.remove()),ji.get(e)===t&&ji.delete(e)}function Tx(e){var i,s,o;const t=ji.get(e);if(t&&t.editor&&t.mode==="rich")return t.editor.commands.focus("end"),(s=(i=t.wrapper).scrollIntoView)==null||s.call(i,{behavior:"smooth",block:"nearest"}),!0;const n=document.getElementById(e);return n?(n.focus(),(o=n.scrollIntoView)==null||o.call(n,{behavior:"smooth",block:"nearest"}),!0):!1}function Lx(e){const t=ji.get(e);if(!t||!t.editor||t.mode!=="rich"||!t.editor.isFocused)return null;const{from:n,to:i}=t.editor.state.selection;return{from:n,to:i}}function Ax(){for(const e of ji.values())if(e.editor&&(e.editor.view.composing||e.editor.isFocused&&document.querySelector(".rich-mention-suggestions:not([hidden])")))return!0;return!1}let od=!1,ad=!1,sr=null,ro=null,lo=null,or=null,rd=!1,ar=null;function ld(e=null){rd=!0,e&&(ar=e)}function Ag(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function cd(e){return e.user_name||e.user_email||"Unknown"}const dd=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function ud(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Ve(t(e.old_value)))}</strong> to <strong>${u(Ve(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(Pe(t(e.old_value)))}</strong> to <strong>${u(Pe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${dd(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${dd(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${dd(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function co(e){const t=()=>{var i;const n=(i=xe())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;sr=n,gd(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;sr=null,gd(e)}}function Cg(){const e=re();if(!e||e.is_agent)return!1;const t=xt();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}function Cx(e){const t=re(),n=se().find(a=>a.id===(e==null?void 0:e.project_id)),i=A(),s=xt()||[];if(!n||!i||n.team_id!==i.id||s.length===0)return{userId:(t==null?void 0:t.id)||null,isAdmin:null};const o=s.find(a=>a.user_id===(t==null?void 0:t.id));return{userId:(t==null?void 0:t.id)||null,isAdmin:!!o&&(o.role==="admin"||o.role==="owner")}}let uo=null,pd=!0;function md(){var o;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!pd;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((o=e.firstElementChild)==null?void 0:o.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function Bg(){uo&&(uo.disconnect(),uo=null),pd=!0,md()}const Bx=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function Dx(){Bg();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!Bx()||(uo=new IntersectionObserver(t=>{pd=t[t.length-1].isIntersecting,md()}),uo.observe(e))}function Mx(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let fd=null;function gd(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&fd===e,s=document.activeElement,o=!!t&&!!s&&(t.contains(s)||s===document.body),a=sr,r=Cg(),l=xe(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?jt(c.assignee_id):null,p=d?$t(d):(c==null?void 0:c.assignee_name)||null;if(((b,w)=>{b&&(b.innerHTML=w,b.classList.toggle("hidden",w.trim()===""))})(t,a?sx(a,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),fd=e,n){const b=a?ox(a,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",md()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=a?ix(a,{canAct:r,assigneeName:p}):""),o&&t&&!t.classList.contains("hidden")){const w=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=w==null?void 0:w.focus)==null||g.call(w,{preventScroll:!0})}}}function rr({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function jx(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&rr({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||rr()},{signal:e})}async function lr(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await de(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function hd(e){const t=Is(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function vd({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Rx(){var a;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=xe();if(!t)return;const n=hd(t.id);ro=n.prevIssue?n.prevIssue.id:null,lo=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),o=vd(n);s?o?s.outerHTML=o:s.remove():o&&((a=i.querySelector(".back-link"))==null||a.insertAdjacentHTML("afterend",o))}wt(e=>{e==="detailNavContext"&&Rx()});let po=0;const Dg=500;function Px(){po++}let Mg=0,cr=!1;function jg(){if(document.querySelector(".description-inline-editor"))return"editor";if(xi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector("details.related-add[open]")||e!=null&&e.querySelector(".timeline-run details[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||cr||Ax()?"transient":null}function Rg(e){return ld(),e==="editor"?"deferred":"retry"}function qx(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=xe())==null?void 0:n.id)===e}function Nx(e){return ne().find(t=>t.id===e)||Ql(e)||Is().find(t=>t.id===e)||null}function Ox(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Bg(),fd=null,di(e);const i=hd(e.id);ro=i.prevIssue?i.prevIssue.id:null,lo=i.nextIssue?i.nextIssue.id:null;const s=se().find(r=>r.id===e.project_id),o=e.assignee_id?jt(e.assignee_id):null,a=C()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(a)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${vd(i)}
                        <span class="issue-detail-breadcrumb">${s?u(s.name):"Project"} › ${u(e.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${u(e.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${lt(e.status)}<span>${Ve(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${gt(e.priority)}<span>${Pe(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${o?u($t(o)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function de(e,t=!0,{refresh:n=!1}={}){var o;const i=n?po:++po,s=++Mg;if(n){const a=jg();if(a)return Rg(a)}try{t&&pn();let a=!1;if(!n){const B=Nx(e);B&&(Ox(B),t&&(history.pushState({issueId:e,view:C()},"",`/issue/${B.identifier}`),a=!0))}let r=!1;const[l,c,d,p,f,g,b,w]=await Promise.all([h.getIssue(e),h.getComments(e).catch(B=>(console.error("Failed to load comments:",B),r=!0,[])),h.getActivities(e,0,Dg),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]})),h.getAttachments(e).catch(B=>(console.error("Failed to load attachments:",B),null)),h.getIssueDocuments(e).catch(B=>(console.error("Failed to load linked documents:",B),null))]),k=[...c].sort((B,he)=>new Date(B.created_at)-new Date(he.created_at)),$=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(B=>(console.error("Failed to load sprints:",B),[]))],[y,E]=await Promise.all($);if(i!==po)return"dropped";let T=null,F=null,L=null;if(n){if(s!==Mg||!qx(e))return"dropped";const B=jg();if(B)return Rg(B);L=window.scrollY;const he=document.activeElement;F=Lx("new-comment"),he!=null&&he.id&&document.getElementById("issue-detail-view").contains(he)&&(T={id:he.id,start:he.selectionStart,end:he.selectionEnd})}sr=g,t&&!a&&history.pushState({issueId:e,view:C()},"",`/issue/${l.identifier}`),di(l),qp(E),rd=!1,ar=null,document.querySelectorAll(".view").forEach(B=>B.classList.add("hidden"));const P=document.getElementById("issue-detail-view");P.classList.remove("hidden");const K=C()||"my-issues",Y=se().find(B=>B.id===l.project_id),q=l.assignee_id?jt(l.assignee_id):null,Z=q?$t(q):null,I=l.sprint_id?E.find(B=>B.id===l.sprint_id):null,D=hd(l.id),{prevIssue:j,nextIssue:me}=D;P.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(K)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${vd(D)}
                        <span class="issue-detail-breadcrumb">${Y?u(Y.name):"Project"} › ${u(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(l.title)}</h1>
                    <div class="issue-state" role="group" aria-label="Status, assignee and priority">
                    <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${m(l.id)}">
                        <span class="property-label sr-only" id="issue-state-status-label">Status</span>
                        <button class="property-value" id="issue-state-status" aria-labelledby="issue-state-status-label issue-state-status">
                            ${lt(l.status)}
                            <span>${Ve(l.status)}</span>
                        </button>
                    </div>
                    <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                        <span class="property-label sr-only" id="issue-state-assignee-label">Assignee</span>
                        <button class="property-value" id="issue-state-assignee" aria-labelledby="issue-state-assignee-label issue-state-assignee">
                            ${Z?`${yt(q,"avatar-small")}<span>${u(Z)}</span>`:'<span class="text-muted">Unassigned</span>'}
                        </button>
                    </div>
                    <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                        <span class="property-label sr-only" id="issue-state-priority-label">Priority</span>
                        <button class="property-value" id="issue-state-priority" aria-labelledby="issue-state-priority-label issue-state-priority">
                            ${gt(l.priority)}
                            <span>${Pe(l.priority)}</span>
                        </button>
                    </div>
                    </div>

                    ${y?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(y.identifier)}" data-action="navigate-issue" data-issue-id="${m(y.id)}" data-identifier="${m(y.identifier)}">${y.identifier}: ${u(y.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${ws(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${ws(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?Fn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${GE(l.id,b,Cx(l))}

                    ${lx(l,p,f,{formatEstimate:pi,documents:w})}

                    ${fx({comments:k,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((o=nx(g,{canAct:Cg()}))==null?void 0:o.name)||null,activitiesTruncated:d.length>=Dg},{formatText:ud,formatActor:cd})}

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${m(l.id)}">
                        <div class="comment-box">
                            <textarea id="new-comment" placeholder="Add a comment…" aria-label="Add a comment" rows="1"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <div class="comment-box-foot">
                                <span class="toolbar-spacer"></span>
                                <button type="submit" class="icon-btn comment-submit-btn" aria-label="Comment" title="Comment (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="detail-sidebar-inner">
                    <div class="sidebar-section">
                        <h4>Details</h4>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${bt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${I?u(I.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(B=>`
                                        <span class="issue-label" style="background: ${ae(B.color)}20; color: ${ae(B.color)}">${u(B.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${Y?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(Y.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${ma(l.estimate,l.project_id)?" out-of-scale":""}" ${ma(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${pi(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${l.creator?yt(l.creator,"avatar-small"):""}<span>${u(l.creator_name||"Unknown")}</span> ${na(l.creator)}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(l.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions toolbar" aria-label="Issue actions">
                        <button class="icon-btn" data-action="edit" data-issue-id="${m(l.id)}" title="Edit all fields" aria-label="Edit all fields">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <label class="icon-btn" title="Attach files">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                            <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${m(l.id)}" aria-label="Attach files">
                        </label>
                        <button class="icon-btn" data-action="show-issue-description-revisions" data-issue-id="${m(l.id)}" title="Description history" aria-label="Description history">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </button>
                        <button class="icon-btn icon-btn-danger" data-action="delete" data-issue-id="${m(l.id)}" title="Delete issue" aria-label="Delete issue">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                    </div>
                </aside>
            </div>
        `,or&&or.abort(),or=new AbortController;const{signal:ve}=or;Dx(),gd(l.id),ac("new-comment","mention-suggestions",{projectId:l.project_id}),Hm({signal:ve}),jx(ve),ZE(P.querySelector(".detail-main"),l.id,ve),Ja(P);const Se=document.getElementById("new-comment");if(cr=!1,Se){Se.addEventListener("compositionstart",()=>{cr=!0},{signal:ve}),Se.addEventListener("compositionend",()=>{cr=!1},{signal:ve});const B=mp(l.id);B&&(Se.value=B),Se.addEventListener("input",()=>{ea(l.id,Se.value)}),Se.addEventListener("keydown",he=>{var te;he.key==="Enter"&&(he.metaKey||he.ctrlKey)&&(he.preventDefault(),(te=Se.closest("form"))==null||te.requestSubmit())}),_x("new-comment",{signal:ve,mentionContext:{projectId:l.project_id},placeholder:"Add a comment…",restore:F})}ro=j?j.id:null,lo=me?me.id:null;const Ut=B=>{var oe;if((B.metaKey||B.ctrlKey)&&B.shiftKey&&(B.key===">"||B.key==="."||B.code==="Period")&&Sa()){B.preventDefault();return}if(B.metaKey||B.ctrlKey||B.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||B.target.tagName==="INPUT"||B.target.tagName==="TEXTAREA"||B.target.tagName==="SELECT"||B.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||xi())return;B.key==="ArrowLeft"&&ro?(B.preventDefault(),de(ro)):B.key==="ArrowRight"&&lo?(B.preventDefault(),de(lo)):B.key==="c"?(B.preventDefault(),B.stopImmediatePropagation(),Tx("new-comment")):B.key==="j"?(B.preventDefault(),B.stopImmediatePropagation(),dr(1)):B.key==="k"?(B.preventDefault(),B.stopImmediatePropagation(),dr(-1)):B.key==="d"&&(B.preventDefault(),(oe=document.querySelector('[data-action="edit-description"]'))==null||oe.click());const te={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[B.key];if(te){const _e=document.querySelector(`.property-row[data-field="${te}"]`);_e&&(B.preventDefault(),_e.click())}};if(document.addEventListener("keydown",Ut,{signal:ve}),T){const B=document.getElementById(T.id);if(B&&(B.focus({preventScroll:!0}),typeof T.start=="number"&&typeof B.setSelectionRange=="function"))try{B.setSelectionRange(T.start,T.end)}catch{}}return L!==null&&window.scrollTo(0,L),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==po)return"dropped";x("load issue",a);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;r.innerHTML=W(l?{icon:V.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:V.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Hx(e,t){if(e.preventDefault(),od)return!1;const n=document.getElementById("new-comment").value;ea(t,null),od=!0;try{const i=await h.createComment(t,n);_("Comment added!","success"),_s(i),await de(t)}catch(i){ea(t,n),x("add comment",i)}finally{od=!1}return!1}async function Fx(e){const t=xe()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${u(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const o=document.getElementById("edit-description"),a=ws(e),r=document.getElementById("description-draft-warning");if(a){o.value=a;const c=gp(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}ac("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),o.addEventListener("input",()=>{const c=o.value;c!==(t.description||"")?Mn(e,c,t.description||""):Mn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Pg()}),o.addEventListener("keydown",c=>{var d,p;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),o.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Mn(e,null),rd){de(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Fn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(ad)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=ar?ar.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");ad=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Mn(e,null),_("Description updated","success"),await de(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(w){x("update description",w)}finally{ad=!1,p&&(p.disabled=!1)}})}function Pg(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Fn(n):'<span class="text-muted">Nothing to preview.</span>'}function Ux(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const o=e==="preview";t.classList.toggle("active",!o),n.classList.toggle("active",o),i.style.display=o?"none":"block",s.style.display=o?"block":"none",o?Pg():i.focus()}function Gx(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function zx(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=A())==null?void 0:i.id,a=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Vx(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Kx(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Wx(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return _("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),H(),_("Relation added","success"),de(t)}catch(s){x("add relation",s)}return!1}async function Yx(e,t){try{await h.deleteRelation(e,t),_("Relation removed","success"),de(e)}catch(n){x("remove relation",n)}}function dr(e){const t=xe();if(!t)return;const n=Is();if(!n||n.length===0)return;const i=n.findIndex(o=>o.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||de(n[s].id)}function qg(e,t){e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button===1||(e.preventDefault(),Ie(t))}le({"retry-issue-comments":(e,t)=>{de(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{v_(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Fx(t.issueId)},"open-gate-document":(e,t)=>qg(e,t.documentId),"open-linked-document":(e,t)=>qg(e,t.documentId),"scroll-to-ticket-gate":()=>{Mx()},"save-comment":(e,t)=>{Hx(e,t.issueId)},"show-add-relation-modal":(e,t)=>{rr(),Gx(t.issueId)},"remove-relation":(e,t)=>{Yx(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{rr(),yf(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Wx(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{zx(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Vx(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Kx()},"set-description-editor-mode":(e,t)=>{Ux(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>dr(-1),"navigate-next-issue":()=>dr(1),edit:(e,t)=>Tg(t.issueId),delete:(e,t)=>hx(t.issueId)});function Qx(e){return e==="gate"?"Sign off":"Approve"}function Zx(e){return Object.entries(e||{}).filter(([,t])=>t!=null).map(([t,n])=>`data-${t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`)}="${m(String(n))}"`).join(" ")}function Ng(e,{approveAction:t,sendBackAction:n=null,data:i={},busy:s=!1,size:o="",sendBackClass:a="ticket-gate-text-btn"}={}){const r=Zx(i),l=s?' aria-disabled="true" aria-busy="true"':"",d=[`<button type="button" class="${o==="sm"?"btn btn-primary btn-sm":"btn btn-primary"}" data-action="${m(t)}" ${r}${l}>${Qx(e)}</button>`];return n&&d.push(`<button type="button" class="${m(a)}" data-action="${m(n)}" ${r}${l}>Send back…</button>`),d}const Xx={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open",sprint_ritual:"Sprint"};let Ri=0,Ot=!1,$e=null,En=null;const Pi=new Set,mo=new Map,Og=new Set(["review_requested","gate_pending","sprint_ritual"]),bd={all:null,approvals:["review_requested","gate_pending","sprint_ritual"],mentions:["mention"],assigned:["assignment"]};let st="all";const Et=new Map,nn=new Set,qi=new Map,ur=new Set,Ht=new Map,ht=new Map;function Hg(e){Ht.get(e)===null&&Ht.set(e,Ri)}function yd(e){const t=ht.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Ri)}const pr="inbox-list";let Me={id:pr};function Jx(e,t,{empty:n="",reload:i=null}={}){Me={id:e,empty:n,reload:i},$e=null,Mt(Fg(t||[])),Fi()}function Fg(e){return e.filter(t=>!Ht.has(t.id)).map(t=>{const n=ht.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Ot&&ht.has(t.id)&&t.id!==$e))}function e0(e){for(const[t,n]of Ht)n!==null&&e>n&&Ht.delete(t);for(const[t,n]of ht)n.confirmedAfter!==null&&e>n.confirmedAfter&&ht.delete(t)}function t0(e,t){t!=null&&t.id&&(e==="archived"?(Ht.has(t.id)||Ht.set(t.id,null),Hg(t.id)):e==="read"&&yd(t.id))}async function Ni(){const e=A();if(e){try{const t=await h.getInboxUnreadCount(e.id);Ls(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Oi()}}function Oi(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=oa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0&&st==="all"?`${t} unread`:"")}async function Hi({focusFirst:e=!1,background:t=!1}={}){var o;const n=A();if(!n)return;if(Me.id!==pr){const a=document.getElementById(Me.id);if(a&&!a.closest(".view.hidden")&&C()!=="inbox"){t&&((o=Me.reload)==null||o.call(Me));return}Me={id:pr}}const i=document.getElementById("inbox-list");if(!i)return;const s=++Ri;t||(En={focusFirst:e||!!(En!=null&&En.focusFirst)},$e=null,n0(i));try{const a=await h.getInbox(n.id,{unread:Ot,kinds:bd[st],limit:100,includeArchived:st==="approvals"});if(s!==Ri)return;const r=new Set(Ht.keys());e0(s);const l=Zg(Fg(a||[])),c=En;En=null,c?(Mt(l),Fi(),c.focusFirst&&!Ke()&&o0()):i0(l,r)}catch(a){if(s!==Ri)return;En?(En=null,i.innerHTML=W({icon:V.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),x("load inbox",a)):console.error("Failed to refresh inbox:",a)}Ni()}function n0(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function mr(e){return e&&[...document.querySelectorAll(`#${Me.id} .inbox-row`)].find(t=>t.dataset.entryId===e)||null}function Ug(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Gg(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,`#${Me.id} .inbox-row`);return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function zg(e,t){if(!e)return;const n=mr(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Ug(n||t)),i==null||i.focus({preventScroll:!0})}function i0(e,t){const n=document.getElementById(Me.id);if(!n)return;const i=ie(),s=[...n.querySelectorAll(".inbox-row")],o=n.querySelector(".inbox-row.keyboard-selected"),a=(o==null?void 0:o.dataset.entryId)||null,r=o?s.indexOf(o):-1,l=Gg(),c=window.scrollY,d=n.scrollTop;let p=e,f=null;if($e&&!e.some(w=>w.id===$e)){const w=i.find(k=>k.id===$e);if(w&&Ot&&!t.has($e)){p=[...e];const k=p.findIndex($=>$.created_at<w.created_at);p.splice(k===-1?p.length:k,0,w),p=Zg(p),Og.has(w.kind)&&(f=w)}else $e=null}Mt(p),Fi(),f&&fr(f);let g=-1;a&&(g=p.findIndex(w=>w.id===a),g===-1&&p.length&&(g=Math.min(r,p.length-1))),g>=0?fo(g,{focus:!1}):sa(-1);const b=g>=0?n.querySelectorAll(".inbox-row")[g]:null;zg(l,b),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function s0(e,t){if(!(t!=null&&t.id))return!1;const n=ie().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function xn(e){const t=ie();for(const n of new Set(e)){const i=mr(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const o=i.contains(document.activeElement)?Gg():null,a=document.createElement("template");a.innerHTML=hr(s).trim();const r=a.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),zg(o,r)}}function fo(e,{focus:t=!0}={}){const n=document.querySelectorAll(`#${Me.id} .inbox-row`);if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){sa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),sa(i),t&&Ug(n[i]).focus({preventScroll:!0})}function o0(){fo(0)}async function Xn(e){const t=ie(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=t[n],s=!i.read_at,o=!!i.archived_at;if($e===e&&($e=null),mo.delete(e),Et.delete(e),ur.delete(e),qi.delete(e),Ht.set(e,null),Mt(t.filter(a=>a.id!==e)),s&&Ls(Math.max(0,oa()-1)),Fi(),Oi(),fo(n,{focus:!Ke()}),!o)try{await h.archiveInbox(e),Hg(e)}catch(a){Ht.delete(e),console.error("Failed to archive inbox entry:",a)}}function Vg(e){var s,o;const t=ie(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=$e;$e=i===e?null:e,$e===e&&(Kg(e),fr(t[n])),xn([i,e]),fo(n),$e===e&&((o=(s=mr(e))==null?void 0:s.scrollIntoView)==null||o.call(s,{block:"nearest"}))}function Kg(e){const t=ie(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ht.set(e,{readAt:i,confirmedAfter:null}),Mt([...t]),Ls(Math.max(0,oa()-1)),Oi(),h.markInboxRead(e).then(()=>yd(e),s=>{var a;((a=ht.get(e))==null?void 0:a.readAt)===i&&ht.delete(e);const o=ie().find(r=>r.id===e);o&&o.read_at===i&&(o.read_at=null,Mt([...ie()]),xn([e])),Ni(),x("mark inbox entry read",s)})}function a0(e){var i;const n=ie().findIndex(s=>s.id===e);if(n!==-1){if(Kg(e),Ot)$e===e&&($e=null),Mt(ie().filter(s=>s.id!==e)),Fi(),fo(n);else if(xn([e]),!document.activeElement||document.activeElement===document.body){const s=mr(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function r0(){if($e===null)return!1;const e=$e;return $e=null,xn([e]),!0}function Wg(e,t){document.querySelectorAll(`#${Me.id} [data-action="reassign-inbox-entry"]`).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function l0(e){if(Pi.has(e))return;const t=ie().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=mo.get(e)||"",o=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="inbox-reassign-form" class="inbox-reassign-form" novalidate>
            <div class="form-group">
                <label for="inbox-reassign-comment">Comment for ${u(n)}</label>
                <textarea id="inbox-reassign-comment" rows="4" required
                    aria-describedby="inbox-reassign-help"
                    placeholder="Why is this coming back, and what should happen next?">${u(s)}</textarea>
                <p class="form-help" id="inbox-reassign-help">${o}</p>
                <p class="form-error hidden" id="inbox-reassign-error" role="alert">Add a comment first.</p>
            </div>
            <div class="inbox-reassign-actions">
                <button type="button" class="btn btn-secondary" data-action="close-inbox-reassign">Cancel</button>
                <button type="submit" class="btn btn-primary" id="inbox-reassign-submit">Comment and reassign</button>
            </div>
        </form>
    `;const a=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),a.requestSubmit?a.requestSubmit():a.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;a.addEventListener("submit",async d=>{var w;if(d.preventDefault(),c)return;if(!ie().some(k=>k.id===e)){_(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),a.isConnected&&H();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await c0(e,p);c=!1;const b=a.isConnected&&Ke();if(g){if(b&&(H(),!document.activeElement||document.activeElement===document.body)){const k=document.querySelector(`#${Me.id} .inbox-row.keyboard-selected`);(w=k==null?void 0:k.querySelector(".inbox-row-toggle"))==null||w.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),U()}async function c0(e,t){if(Pi.has(e))return!1;const n=ie().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",o=n.issue_identifier||"issue";Pi.add(e),Wg(e,!0);const a=(r,l)=>(Pi.delete(e),Wg(e,!1),x(r,l),!1);if(mo.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return a(`comment on ${o}`,l)}mo.set(e,i),_s(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return a(`reassign ${o} back to ${s}`,r)}return Pi.delete(e),mo.delete(e),Xn(e),!0}function d0(){Yg(!Ot)}function Yg(e){e!==Ot&&(Ot=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Ot;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Hi({focusFirst:!0}))}function u0(e){!(e in bd)||e===st||(st=e,Qg(),Hi({focusFirst:!0}))}function p0(){const e=new URLSearchParams(window.location.search).get("kind");!e||!(e in bd)||e===st||(st=e,Qg())}function Qg(){document.querySelectorAll('[data-action="mark-all-inbox-read"]').forEach(e=>{e.disabled=st!=="all",e.title=st==="all"?"":"Only on Everything: it marks every kind read"}),Oi(),document.querySelectorAll('[data-action="set-inbox-kind"]').forEach(e=>{const t=e.dataset.kind===st;e.classList.toggle("active",t),e.setAttribute("aria-pressed",t?"true":"false")})}async function fr(e,{force:t=!1}={}){var o;if(!e||!wd(e)||e.state==="resolved")return;const n=Et.get(e.id),i={};Et.set(e.id,(n==null?void 0:n.state)==="ready"&&!t?{...n,token:i}:{state:"loading",token:i}),t&&xn([e.id]);let s;try{if(e.kind==="sprint_ritual"){const a=await h.getLimboStatus(e.project_id);s={state:"ready",ritual:a!=null&&a.in_limbo&&(a.pending_rituals||[]).find(l=>l.id===e.ritual_id)||null,decided:null,sprintClosed:!(a!=null&&a.in_limbo)}}else{const a=await h.getTicketRitualsStatus(e.issue_id),r=((a==null?void 0:a.pending_rituals)||[]).find(c=>c.id===e.ritual_id)||null,l=r?null:((a==null?void 0:a.completed_rituals)||[]).find(c=>c.id===e.ritual_id)||null;s={state:"ready",ritual:r,decided:l}}}catch(a){console.error("Failed to load ritual for inbox entry:",a),s=(n==null?void 0:n.state)==="ready"&&!t?n:{state:"error"}}((o=Et.get(e.id))==null?void 0:o.token)===i&&(Et.set(e.id,s),xn([e.id]))}function Zg(e){if(st!=="approvals")return e;const t=e.filter(n=>n.kind==="sprint_ritual");return t.length?[...t,...e.filter(n=>n.kind!=="sprint_ritual")]:e}function m0(e){e&&X()===e&&Vs()}function wd(e){return!Og.has(e.kind)||!e.ritual_id?!1:e.kind==="sprint_ritual"?!!e.project_id:!!e.issue_id}function kd(e,t){return e.kind==="sprint_ritual"?(t==null?void 0:t.approval_mode)==="gate"?"gate":"review":e.kind==="review_requested"?"review":"gate"}function f0(e){return(e.actions||[]).some(t=>t.kind==="approve")}function g0(e){return(e.actions||[]).length>0}function h0(e){var c;const t=d=>({meta:"",body:`<div class="inbox-decision-status">${d}</div>`});if(e.state==="resolved")return t("Already decided. Nothing is waiting on you here.");const n=Et.get(e.id);if(!n||n.state==="loading")return{meta:"",body:'<div class="inbox-decision-status" role="status">Loading the attestation…</div>'};if(n.state==="error")return t(`Couldn’t load the attestation.
            <button type="button" class="ticket-gate-text-btn accent" data-action="retry-inbox-decision"
                data-entry-id="${m(e.id)}">Try again</button>`);const i=n.ritual;if(!i){if(n.sprintClosed)return t("The sprint has closed. Nothing is waiting on you here.");if(e.kind==="sprint_ritual")return t("Already done. Nothing is waiting on you here.");if(n.decided){const d=(c=n.decided.attestation)==null?void 0:c.approved_by_name;return t(`Already decided${d?` by ${u(d)}`:""}. Nothing is waiting on you here.`)}return t("This ritual no longer applies to the ticket. Open it to see where it stands.")}const s=kd(e,i)==="review",o=i.last_rejection&&!i.last_rejection.superseded_at?i.last_rejection:null,a=i.prompt?`<details class="inbox-decision-asks" data-entry-id="${m(e.id)}"${ur.has(e.id)?" open":""}><summary>What ${u(i.name)} asks</summary>
               <div class="inbox-decision-asks-text markdown-body">${ut(i.prompt)}</div></details>`:"";let r="";e.kind==="sprint_ritual"&&s&&!i.attestation?r='<div class="inbox-decision-status">Waiting on an attestation.</div>':s&&!_n(i)?r=o?`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”. Waiting on a new attestation.</div>`:'<div class="inbox-decision-status">Not attested any more. Waiting on a new attestation.</div>':!s&&o&&(r=`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”.</div>`);const l=i.attestation;return s?l?{meta:Xg(l.attested_by_name||"Someone","attested"),body:`<div class="inbox-expanded-body inbox-expanded-markdown">
                ${l.note?`<div class="markdown-body">${ut(l.note)}</div>`:'<div class="text-muted">No note.</div>'}
                ${wg(l)}
            </div>`,after:ed(i)+a+r}:{meta:"",body:"",after:a+r}:{meta:"Waiting on a sign-off",body:i.prompt?`<div class="inbox-expanded-body inbox-expanded-markdown"><div class="markdown-body">${ut(i.prompt)}</div></div>`:"",after:r}}function Xg(e,t){return`${u(e)} ${u(t)}`}const v0={assignment:"assigned you this",mention:"mentioned you",review_requested:"attested",gate_rejected:"sent it back",agent_status:"changed your agent"};function gr(e){const t=Et.get(e.id),n=(t==null?void 0:t.state)==="ready"?t.ritual:null;if(!n||!f0(e))return null;if(e.kind==="sprint_ritual")return n.approval_mode==="gate"?n.attestation?null:n:n.attestation&&!n.attestation.approved_at?n:null;if(e.kind==="review_requested")return _n(n)?n:null;const i=n.last_rejection&&!n.last_rejection.superseded_at;return!n.attestation&&!i?n:null}function b0(e){if(!wd(e))return[];const t=gr(e);if(e.kind==="sprint_ritual"){if(!t)return[];const a=kd(e,t);return Ng(a,{approveAction:a==="review"?"approve-inbox-entry":"sign-off-inbox-entry",size:"sm",busy:nn.has(e.id),data:{entryId:e.id,ritualId:t.id,projectId:e.project_id,ritualName:t.name,...a==="gate"?{ritualArtifact:t.artifact||""}:{}}})}const n=g0(e)?`<button type="button" class="inbox-action-btn" data-action="comment-inbox-entry"
        data-entry-id="${m(e.id)}">Comment…</button>`:"";if(!t)return n?[n]:[];const i=e.kind==="review_requested",[s,o]=Ng(i?"review":"gate",{approveAction:i?"approve-inbox-entry":"sign-off-inbox-entry",sendBackAction:"send-back-inbox-entry",size:"sm",sendBackClass:"inbox-action-btn",busy:nn.has(e.id),data:{entryId:e.id,ritualId:t.id,issueId:e.issue_id,ritualName:t.name,...i?{}:{ritualArtifact:t.artifact||""}}});return[s,o,n].filter(Boolean)}const y0=()=>["approve-inbox-entry","sign-off-inbox-entry","send-back-inbox-entry","comment-inbox-entry"].map(e=>`#${Me.id} [data-action="${e}"]`).join(", ");function Jg(e,t){document.querySelectorAll(y0()).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function $d(e,{comment:t=null}={}){if(nn.has(e))return!1;const n=ie().find(l=>l.id===e),i=n?gr(n):null;if(!i)return n&&_("This is no longer waiting on a decision from you.","error"),!1;const s=kd(n,i)==="review",o=n.kind==="sprint_ritual";nn.add(e),Jg(e,!0);const a=`${s?"approve":"sign off on"} ${i.name}`;try{t&&s&&qi.get(e)!==t&&(_s(await h.createComment(n.issue_id,t)),qi.set(e,t)),o?s?await h.approveAttestation(i.id,n.project_id):await h.completeGateRitual(i.id,n.project_id,t||null):s?await h.approveTicketRitual(i.id,n.issue_id):await h.completeTicketGateRitual(i.id,n.issue_id,t||null)}catch(l){return nn.delete(e),Jg(e,!1),x(a,l),fr(n,{force:!0}),!1}nn.delete(e),Et.delete(e),qi.delete(e);const r=n.issue_identifier?` on ${n.issue_identifier}`:"";return o&&m0(n.project_id),_(`${s?"Approved":"Signed off on"} ${i.name}${r}.`,"success"),Xn(e),!0}function w0(e){if(nn.has(e.entryId))return;const t=ie().find(n=>n.id===e.entryId);if((t==null?void 0:t.kind)==="sprint_ritual"){const n=e.entryId;Lm(e.ritualId,e.projectId,e.ritualName,e.ritualArtifact||"",()=>{Et.delete(n),Xn(n)});return}if(e.ritualArtifact){const n=e.entryId;Cm(e.ritualId,e.issueId,e.ritualName,e.ritualArtifact,()=>{Et.delete(n),Xn(n)});return}$d(e.entryId)}function k0(e){const t=e.entryId;nn.has(t)||Am(e.ritualId,e.issueId,e.ritualName,()=>{Et.delete(t),Xn(t)})}function $0(e){const t=ie().find(c=>c.id===e);if(!t||!t.issue_id||nn.has(e))return;const n=gr(t),i=!!n&&!(t.kind==="gate_pending"&&n.artifact),s=t.kind==="review_requested"?"Comment and approve":"Comment and sign off",o=t.issue_identifier||"the ticket";document.getElementById("modal-title").textContent=`Comment on ${o}`,document.getElementById("modal-content").innerHTML=`
        <form id="inbox-comment-form" class="inbox-comment-form" novalidate>
            <div class="form-group">
                <label for="inbox-comment-text">Comment</label>
                <textarea id="inbox-comment-text" rows="5" required aria-describedby="inbox-comment-help"
                    placeholder="${m(n?"Questions, or what has to change.":"Your comment")}"></textarea>
                <p class="form-help" id="inbox-comment-help">${i&&t.kind==="gate_pending"?`Comment posts it on ${u(o)}; Comment and sign off saves it as the sign-off note.`:`Posted on ${u(o)}.`}${n?" To stop it until something changes, use Send back instead.":""}</p>
                <p class="form-error hidden" id="inbox-comment-error" role="alert">Add a comment first.</p>
            </div>
            <div class="inbox-comment-actions">
                <button type="button" class="btn btn-secondary" data-action="close-inbox-comment">Cancel</button>
                ${i?`<button type="submit" class="btn btn-secondary" value="comment">Comment</button>
                       <button type="submit" class="btn btn-primary" value="decide">${u(s)}</button>`:'<button type="submit" class="btn btn-primary" value="comment">Comment</button>'}
            </div>
        </form>
    `;const a=document.getElementById("inbox-comment-form"),r=document.getElementById("inbox-comment-text"),l=document.getElementById("inbox-comment-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",c=>{if(c.key==="Enter"&&(c.metaKey||c.ctrlKey)){c.preventDefault();const d=a.querySelector('button.btn-primary[type="submit"]');a.requestSubmit?a.requestSubmit(d||void 0):d==null||d.click()}}),a.addEventListener("submit",async c=>{var b,w;if(c.preventDefault(),!r.value.trim()){l.classList.remove("hidden"),r.focus();return}const d=[...a.querySelectorAll('button[type="submit"]')];d.forEach(k=>{k.disabled=!0});const p=((b=c.submitter)==null?void 0:b.value)==="decide";if(await _0(e,r.value,{decide:p})){H();return}d.forEach(k=>{document.contains(k)&&(k.disabled=!1)});const g=ie().find(k=>k.id===e);(!g||!gr(g))&&((w=a.querySelector('button[value="decide"]'))==null||w.remove())}),U(),r.focus()}async function _0(e,t,{decide:n=!1}={}){const i=(t||"").trim(),s=ie().find(a=>a.id===e);if(!i||!s||!s.issue_id)return!1;if(n)return $d(e,{comment:i});if(qi.get(e)===i)return qi.delete(e),_(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0;let o;try{o=await h.createComment(s.issue_id,i)}catch(a){return x(`comment on ${s.issue_identifier||"the ticket"}`,a),!1}return _s(o),_(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0}const E0='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',x0='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function I0(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function hr(e){const t=!e.read_at,n=e.id===$e,i=Xx[e.kind]||e.kind,s=`badge badge-inbox-${e.kind}`,o=e.kind==="sprint_ritual"&&e.project_id?se().find(c=>c.id===e.project_id):null,a=e.issue_identifier||e.document_title||(o==null?void 0:o.name)||"",r=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),l=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${r}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(l)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(I0(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="${m(s)}">${u(i)}</span>
                        ${a?`<span class="inbox-row-source">${u(a)}</span>`:""}
                        ${e.archived_at?'<span class="inbox-row-archived text-muted">archived</span>':""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${u(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${u(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?S0(e,a,l):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${E0}</button>`:""}
                    ${e.archived_at?"":`<button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${x0}</button>`}
                </span>
                <span class="inbox-row-time">${u(dw(e.created_at))}</span>
            </div>
        </div>
    `}function S0(e,t,n){const i=e.kind==="assignment"&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,o=e.source_user_name,a=t?`Open ${u(t)}`:"Open",r=wd(e),l=[...r?b0(e):[],i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Pi.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${o?` to ${u(o)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${a}</button>`:"",e.archived_at?"":`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join(""),c=r?h0(e):null,d=v0[e.kind],p=o&&e.source_user_id!==e.recipient_user_id,f=c?c.meta:p&&d?Xg(o,d):"",g=c?c.body:e.body?`<div class="inbox-expanded-body">${u(e.body)}</div>`:"";return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${f?`<div class="inbox-expanded-source">${f}</div>`:""}
            ${g||""}
            ${(c==null?void 0:c.after)||""}
            <div class="inbox-action-bar">${l}</div>
        </div>
    `}const eh={all:{noun:"items",heading:"Inbox zero",description:"Approvals, mentions, assignments, and more will show up here."},approvals:{noun:"approvals",heading:"Nothing to approve",description:"Reviews, gates and sprint rituals waiting on you show up here. Rituals are the checks a project runs when tickets are claimed or closed and when a sprint closes."},mentions:{noun:"mentions",heading:"No mentions",description:"Comments that @mention you will show up here."},assigned:{noun:"assignments",heading:"Nothing newly assigned",description:"Tickets someone assigns to you will show up here."}};function Fi(){const e=document.getElementById(Me.id);if(!e)return;const t=ie();if(Me.id!==pr){e.innerHTML=t.length?t.map(hr).join(""):Me.empty||"";return}if(t.length===0){const n=eh[st]||eh.all;e.innerHTML=W({icon:V.inbox,heading:Ot?`No unread ${n.noun}`:n.heading,description:Ot?"Nothing unread right now.":n.description});return}e.innerHTML=L0(t)}function T0(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=o=>new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function L0(e){let t="";if(st==="approvals"){const i=[];for(;e.length&&e[0].kind==="sprint_ritual";)i.push(e[0]),e=e.slice(1);i.length&&(t=`
        <section class="inbox-group inbox-sprint-close" aria-labelledby="inbox-group-sprint">
            <h3 class="inbox-group-header" id="inbox-group-sprint">Sprint close <span class="section-count">${i.length}</span></h3>
            <p class="inbox-group-note text-muted">The sprint closes when these are done.</p>
            ${i.map(s=>hr(s)).join("")}
        </section>`)}const n=[];for(const i of e){const s=T0(i.created_at),o=n[n.length-1];o&&o.label===s?o.entries.push(i):n.push({label:s,entries:[i]})}return t+n.map((i,s)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${s}">
            <h3 class="inbox-group-header" id="inbox-group-${s}">${u(i.label)}</h3>
            ${i.entries.map(o=>hr(o)).join("")}
        </section>
    `).join("")}async function A0(e){var s;const t=ie().find(o=>o.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ht.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(o){((s=ht.get(e))==null?void 0:s.readAt)===n&&ht.delete(e);const a=ie().find(r=>r.id===e);a&&a.read_at===n&&(a.read_at=null,Mt([...ie()]),xn([e])),console.error("Failed to mark inbox entry read:",o);return}yd(e);const i=ie().find(o=>o.id===e);i&&!i.read_at?(i.read_at=n,Mt([...ie()]),Ls(Math.max(0,oa()-1)),Oi(),xn([e])):Ni()}async function C0(){const e=A();if(!(!e||st!=="all"))try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ie())n.read_at||ht.set(n.id,{readAt:t,confirmedAfter:Ri});Mt(ie().map(n=>({...n,read_at:n.read_at||t}))),Ls(0),Oi(),Fi()}catch(t){x("mark all inbox entries read",t)}}function B0(e){e.entryId&&A0(e.entryId),e.issueId?de(e.issueId):e.documentId&&Ie(e.documentId)}function D0(e){var n,i;const t=(n=e==null?void 0:e.dataset)==null?void 0:n.entryId;t&&((i=ie().find(s=>s.id===t))!=null&&i.archived_at||Xn(t))}function M0(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Vg(e.dataset.entryId)}const j0='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function R0(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(j0);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function P0(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}typeof document<"u"&&document.addEventListener("toggle",e=>{var n;const t=e.target;!((n=t==null?void 0:t.classList)!=null&&n.contains("inbox-decision-asks"))||!t.dataset.entryId||(t.open?ur.add(t.dataset.entryId):ur.delete(t.dataset.entryId))},!0),le({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&P0((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||R0(e.target,n)||(e.preventDefault(),t.entryId&&Vg(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),B0(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&l0(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),H()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Xn(t.entryId)},"toggle-inbox-unread-filter":()=>d0(),"set-inbox-filter":(e,t)=>Yg(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&a0(t.entryId)},"mark-all-inbox-read":()=>C0(),"set-inbox-kind":(e,t)=>u0(t.kind),"approve-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&$d(t.entryId)},"sign-off-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&w0(t)},"send-back-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&k0(t)},"close-inbox-comment":e=>{e.preventDefault(),H()},"comment-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&$0(t.entryId)},"retry-inbox-decision":(e,t)=>{e.preventDefault();const n=ie().find(i=>i.id===t.entryId);n&&fr(n,{force:!0})},"retry-load-inbox":()=>Hi({focusFirst:!0})});let go=[],Ui=[],Jn=[];function _d(){return go}function th(e){go=Array.isArray(e)?e:[],nh()}function xt(){return Ui}async function vr(e=null){try{go=await(e||h.getMyTeams()),nh()}catch(t){x("load teams",t)}}function nh(){const e=document.getElementById("team-list");go.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=go.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function br(e,t=!1,{seed:n=null}={}){ei=null,ci(e),ah(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),Sm(e.id),n&&N0(n)){let o=!1;try{O0(n),ei=e.id,t?Kl():O(C()||"my-issues"),o=!0}catch(a){console.error("Failed to paint from the boot cache:",a),ei=null}if(o){ih(e).catch(a=>console.error("Failed to refresh team data:",a));return}}await ih(e),t?Kl():O(C()||"my-issues")}let ei=null;function q0(){var e;return ei&&ei===((e=A())==null?void 0:e.id)?ei:null}async function ih(e){var t;await Promise.all([pt(),sI(),F0(),Gw(),Ni()]),((t=A())==null?void 0:t.id)===e.id&&(ei=e.id)}function N0(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function O0(e){fw(Array.isArray(e.projects)?e.projects:[]),Yp(),Wp(),Ss(Array.isArray(e.labels)?e.labels:[]),Ui=Array.isArray(e.members)?e.members:[],Fw(e.agents),Ms(xt,mt),mi(),lk(e.issues)}function sh(){document.getElementById("team-dropdown").classList.toggle("hidden")}function H0(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function F0(){var t,n;const e=(t=A())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=A())==null?void 0:n.id)!==e)return;Ui=i,Ms(xt,mt),mi()}catch(i){console.error("Failed to load team members:",i),x("load team members",i)}}function U0(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Ed=0;async function oh(){var n,i;const e=(n=A())==null?void 0:n.id;if(!e)return;const t=++Ed;try{const s=await h.getTeamMembers(e);if(t!==Ed||((i=A())==null?void 0:i.id)!==e)return;Ui=s,Ms(xt,mt),mi()}catch(s){if(t!==Ed)return;Ui=[],x("load team members",s)}G0()}function Gi(){var n;const e=(n=re())==null?void 0:n.id,t=Ui.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function G0(){var t;const e=Gi();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let yr=0;async function wr(){var i;if(!A())return;const e=++yr,t=A().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=U0());try{const s=await h.getTeamInvitations(t);if(e!==yr||((i=A())==null?void 0:i.id)!==t)return;Jn=s,xd()}catch(s){if(e!==yr)return;if((s==null?void 0:s.status)===403){Jn=[],xd();return}console.error("Failed to load team invitations:",s),rh(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function ah(){yr++,Jn=[],xd()}function rh(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function xd(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Jn.length)),rh(Jn.length>0),Jn.length===0){e.innerHTML="";return}const n=Gi();e.innerHTML=Jn.map(i=>`
        <div class="list-row-2line">
            <div class="list-row-main">
                <div class="list-row-title">${u(i.email)}</div>
                <div class="list-row-sub">Invited as ${u(i.role)} · expires ${new Date(i.expires_at).toLocaleDateString()}</div>
            </div>
            ${n?`<div class="list-row-right">
            <button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${m(i.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger-outline btn-small" data-action="delete-invitation" data-invitation-id="${m(i.id)}">Cancel</button>
            </div>`:""}
        </div>
    `).join("")}function lh(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function z0(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(A().id,t,n);if(await wr(),i&&i.accept_url)return W0(t,K0(i.accept_url),i.email_queued===!0),!1;H(),_("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){V0(i)?_(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):x("send invitation",i)}return!1}function V0(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function ch(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function K0(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!ch(n.hostname)||ch(i.hostname)?e:i.origin+n.pathname}function W0(e,t,n=!1){var o;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ke()||U(),(o=document.querySelector('[data-action="copy-invite-link"]'))==null||o.focus(),dh()}function dh(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function Y0(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),_("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),_("Could not copy: the link is selected, copy it by hand","error")}}async function Q0(e){let t;try{t=await h.issueInvitationVerificationCode(A().id,e)}catch(n){x("get a verification code",n);return}X0(t)}function Z0(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let o;return s<3600?o=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?o=`${Math.round(s/3600)} h`:o=`${Math.round(s/86400)} days`,`${o} ${n>=i?"after":"before"} the invitation was created`}function X0(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=Z0(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">Send this code only through a channel you already trust for the invitee, never to whoever asked you for it. Anyone who saw the link can sign up with their address and ask, and chooses the name shown below.</p>
            <p>The account it is for:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${u(t.name||"")}</strong></li>
                <li>Email: ${u(t.email||"")}</li>
                <li>Signed up: ${u(n)} (${u(i)})</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">A signup shortly after you sent the link fits both the invitee and someone who saw the link: confirm with the invitee directly. One that predates the invitation was not made from the link, but check that the invitee recognises it. If they don't, don't give out the code: cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${u((e==null?void 0:e.code)||"")}</code>
            </div>
            <p>Expires at ${u(s)}. It lets that account accept this invitation only: they enter it on the invitation page, or run <code>chaotic team accept-invite &lt;link&gt; --code &lt;code&gt;</code>. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ke()||U(),dh("invitation-code")}async function J0(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(A().id,e),await oh(),_("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){x("remove member",t)}}async function eI(e){try{await h.deleteInvitation(A().id,e),await wr(),_("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function uh(){sh(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function tI(){A()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${m(A().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${m(A().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${u(A().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,U())}async function nI(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await vr(),await br(n),H(),_("Team created!","success")}catch(n){x("create team",n)}return!1}async function iI(e){if(e.preventDefault(),!A())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(A().id,t);ci(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await vr(),H(),_("Team updated!","success")}catch(n){x("update team",n)}return!1}async function sI(){var t,n;const e=(t=A())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=A())==null?void 0:n.id)!==e)return;Ss(i)}catch(i){console.error("Failed to load labels:",i),x("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),le({"select-team":(e,t)=>{br(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||J0(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||eI(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Q0(t.invitationId)},"retry-load-team-invitations":()=>{wr()},"invite-member":e=>{z0(e)},"copy-invite-link":()=>{Y0()},"dismiss-invite-link":()=>{H()},"create-team":e=>{nI(e)},"update-team":e=>{iI(e)}});let Ft=null,sn=0,zi=null,Vi=null,ho=null,Id=!1;function oI(){return by()}function ph(){yy()}function mh(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function aI(){Ft||(Ft=document.createElement("div"),Ft.id="onboarding-overlay",Ft.className="onboarding-overlay",document.getElementById("app").appendChild(Ft))}function vo(){if(!Ft)return;const e=Id?gh():fh(),t=e[sn],n=e.map((i,s)=>`<span class="onboarding-dot${s===sn?" active":""}${s<sn?" completed":""}"></span>`).join("");Ft.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function fh(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=mh(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=mh(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
                    <button class="btn btn-primary" data-action="onboarding-finish">Go to Home</button>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&zi&&(e.textContent=`${zi.name} (${zi.key})`),t&&Vi&&(t.textContent=`${Vi.name} (${Vi.key})`),n&&ho&&(n.textContent=`${ho.identifier} - ${ho.title}`)}}]}function gh(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
                <h2>Welcome Back!</h2>
                <p class="onboarding-subtitle">Here's a quick tour of Chaotic.</p>
                <div class="onboarding-tips">
                    <h3>Your Home</h3>
                    <p class="onboarding-description">Home shows your assigned issues and recent activity across all projects.</p>
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
            `}]}function Sd(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Td(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ki(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function rI(){const e=Id?gh():fh();sn<e.length-1&&(sn++,vo())}function lI(){ph(),vh(),ti()}function cI(){ph(),vh(),ti()}async function dI(e){e.preventDefault(),Td("onboarding-team-error"),Ki("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{zi=await h.createTeam({name:t,key:n}),sn++,vo()}catch(i){Sd("onboarding-team-error",i.message||"Failed to create team"),Ki("onboarding-team-submit",!1)}}async function uI(e){e.preventDefault(),Td("onboarding-project-error"),Ki("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Vi=await h.createProject(zi.id,{name:t,key:n}),sn++,vo()}catch(i){Sd("onboarding-project-error",i.message||"Failed to create project"),Ki("onboarding-project-submit",!1)}}async function pI(e){e.preventDefault(),Td("onboarding-issue-error"),Ki("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{ho=await h.createIssue(Vi.id,{title:t}),sn++,vo()}catch(n){Sd("onboarding-issue-error",n.message||"Failed to create issue"),Ki("onboarding-issue-submit",!1)}}function hh(e=!1){Id=e,sn=0,zi=null,Vi=null,ho=null,aI(),vo()}function vh(){Ft&&(Ft.remove(),Ft=null)}function bh(){wy(),hh(!0)}le({"onboarding-next":e=>{e.preventDefault(),rI()},"onboarding-skip":e=>{e.preventDefault(),lI()},"onboarding-finish":e=>{e.preventDefault(),cI()},"onboarding-create-team":e=>{dI(e)},"onboarding-create-project":e=>{uI(e)},"onboarding-create-issue":e=>{pI(e)}});const yh="/oauth/consent/";function mI(e){if(!e||!e.startsWith(yh))return null;const t=e.slice(yh.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function fI(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function gI(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function hI(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const wh={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function kr(e){const t=wh[e.trust]||wh.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function vI(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function bI(e,t){const n=e&&t?e.agents.find(o=>o.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function kh(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",o=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+o)}</option>`)}return n.join("")}function $h(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function yI(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function wI(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${kr(t.client)}</p>
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
        </div>`}function kI(e,t){if(t.acts_as==="person"){wI(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),o=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",a=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${u(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${kr(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${u(t.redirect_host)}</strong></p>
            ${a}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${vI(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${kh(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${$h(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${yI(t)}
                </fieldset>
                ${o}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Ld(e,t)}function Ld(e,t){var o;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const a=(o=e.querySelector("#oauth-team"))==null?void 0:o.value,r=bI(t.teams.find(l=>l.id===a),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function $I(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(a=>a.value),s=e.querySelector('input[name="oauth-policy"]:checked'),o={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const a=e.querySelector("#oauth-agent-name").value.trim();a&&(o.agent_name=a)}return o}function _I(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function bo(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function EI(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function xI(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=kh(d,null),e.querySelector("#oauth-projects").innerHTML=$h(d),Ld(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Ld(e,n));let o=!1;const a=async d=>{if(!o){o=!0;try{const p=d?await h.approveOAuthRequest(t,$I(e)):await h.denyOAuthRequest(t);if(!fI(p.redirect)){bo(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(o=!1,p&&p.status===404){bo(e,"It has expired, was already answered, or belongs to someone else.");return}_I(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),a(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>a(!1))}async function II(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=gI();hI(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(o){o&&o.status===404?bo(i,"It has expired, was already answered, or belongs to someone else."):o&&o.status===403&&o.detail&&o.detail.error_code==="web_login_required"?EI(i,n):o&&o.status===403?bo(i,"Only a person signed in to Chaotic can approve an app."):bo(i,o&&o.message||"Something went wrong");return}kI(i,s),xI(i,e,s,t)}const Ad="/invite/",yo="/invite",Cd="chaotic.inviteToken",_h="invite-auth-notice";let Bd=null;const SI="This invitation is no longer valid.",TI={owner:"an owner",admin:"an admin",member:"a member"};function LI(e){if(!e||!e.startsWith(Ad))return null;const t=e.slice(Ad.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Eh(){const{pathname:e}=window.location,t=LI(e);if(t){Bd=t;try{sessionStorage.setItem(Cd,t)}catch{}return history.replaceState(null,"",yo),t}if(!xh(e))return null;let n=null;try{n=sessionStorage.getItem(Cd)}catch{}const i=n||Bd;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function xh(e){return e===yo||e===`${yo}/`}function Ih(e){return xh(e)||!!(e&&e.startsWith(Ad))}function Dd(){Bd=null;try{sessionStorage.removeItem(Cd)}catch{}}function AI(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function CI(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Md(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Sh(){const e=CI();return $r(),Md(e),e}function BI(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),$r()}function $r(){var e;(e=document.getElementById(_h))==null||e.remove()}function jd(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=TI[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${DI(e)}</p>`}function DI(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const MI="Ask whoever invited you to send a new invitation.",jI="Reload the page to try again.";function Rd(e,t=SI,n=MI){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function RI(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Th(){window.location.pathname!==yo&&history.replaceState(null,"",yo),RI(Sh())}function PI(e,t){e.innerHTML=`
        <div class="invite-page">
            ${jd(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function qI(e,t,n){const i=AI(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${jd(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${u(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${jd(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${u(n.email)}</strong>.</p>
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
        </div>`}function NI(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function OI(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),o=e.querySelector("#invite-code-form"),a=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=p=>{l.textContent=p,l.classList.remove("hidden")},d=()=>{var p;o.classList.remove("hidden"),(p=a.focus)==null||p.call(a)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=NI(p.expires_at);c(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}c(p&&p.message||"Something went wrong"),p&&p.status===429&&d()}finally{s.disabled=!1}}}),o.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=a.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const w=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():w==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=a.select)==null||g.call(a));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function HI(e,t){$r();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=_h,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),$r(),t()})}function _r(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function FI(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,p;const o=Sh();o.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let a;try{a=await h.getInvitation(e)}catch(f){f&&f.status===404?(Dd(),Rd(o)):Rd(o,f&&f.message||"Something went wrong.",jI);return}if(!t){PI(o,a);const f=g=>{HI(a,()=>Md(o)),n(g)};o.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),o.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}qI(o,a,t),(d=o.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=o.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,w;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch(k){l=!1,r.disabled=!1;const $=k&&k.detail&&k.detail.error_code;if(f!==void 0&&($==="invalid_verification_code"||$==="invitation_code_expired"||k&&k.status===429)){_r(o,k&&k.message||"That code did not work."),(w=(b=o.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||w.call(b);return}k&&k.status===401?s():k&&(k.status===404||k.status===400)?(Dd(),Rd(o)):k&&k.status===403&&k.detail&&k.detail.error_code==="email_unverified"?(_r(o,"Verify your email address to continue."),o.querySelector("#invite-accept-actions").classList.add("hidden"),o.querySelector("#invite-verify").classList.remove("hidden")):k&&k.status===403?_r(o,`This invitation is for a different email address. Only ${a.email_hint} can accept it.`):_r(o,k&&k.message||"Something went wrong");return}Dd(),Lh(o,a);try{await i(g.team_id,a.team_name)}catch(k){console.error("Joined the team but could not open it:",k),Md(o),Lh(o,a)}};r.addEventListener("click",()=>c()),(p=o.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=o.querySelector("#invite-admin-code").value.trim();g&&c(g)}),OI(o,{onVerified:()=>{o.querySelector("#invite-verify").classList.add("hidden"),o.querySelector("#invite-error").classList.add("hidden"),o.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Lh(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function Pd(e){return FI(e,{user:re(),showAuth:t=>{$o(),t==="signup"?Mh():Dh()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),BI(),await ti({teamId:t}),_(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Bt(null),ci(null),Pd(e)}})}async function Ah(){const e=Eh();if(e){await Pd(e);return}if(Ih(window.location.pathname)){Th();return}$o()}async function ti({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=mI(window.location.pathname);if(i){await II(i);return}const s=Eh();if(s){await Pd(s);return}if(Ih(window.location.pathname)){Th();return}QI(),dm(),Er(),KI();const o=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(o){await UI(n,o,t);return}await vr(t);const a=_d();if(a.length===0&&!oI()){hh();return}a.length===0&&Rn("my-issues");try{if(a.length>0){const c=e&&a.find(d=>d.id===e)||a[0];await br(c,!0)}}finally{mm()}}async function UI(e,t,n){th(e.teams);try{await br(t,!0,{seed:e})}finally{mm()}Promise.resolve(n||vr().then(_d)).then(async i=>{var o;if(!Array.isArray(i))return;th(i);const s=i.find(a=>a.id===t.id);if(!s){await zI(),window.location.reload();return}if(((o=A())==null?void 0:o.id)===s.id&&s.name!==A().name){ci(s);const a=document.getElementById("current-team-name");a&&(a.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const GI=2e3;let Wi=null,Ch=!1,Bh=!1;function zI(){return Bh=!0,clearTimeout(Wi),Wi=null,xl()}function qd(){if(clearTimeout(Wi),Wi=null,Bh)return Promise.resolve();const e=re(),t=A();return!(e!=null&&e.id)||!(t!=null&&t.id)||kp(kl())!==e.id||q0()!==t.id?Promise.resolve():My(e.id,{user:e,teams:_d(),teamId:t.id,projects:se(),labels:Bl(),members:xt(),agents:mt(),issues:rk({maxQueries:3})})}function VI(){clearTimeout(Wi),Wi=setTimeout(qd,GI)}function KI(){Ch||(Ch=!0,tk(VI),document.addEventListener("visibilitychange",WI),window.addEventListener("pagehide",YI))}function WI(){document.visibilityState==="hidden"&&qd()}function YI(){qd()}let Yi=null,wo=null,It=null,St=null;function ko(){Yi||(Yi=document.getElementById("auth-screen"),wo=document.getElementById("main-screen"),It=document.getElementById("login-form"),St=document.getElementById("signup-form"))}function $o(){ko(),Yi&&Yi.classList.remove("hidden"),wo&&wo.classList.add("hidden")}function QI(){ko(),Yi&&Yi.classList.add("hidden"),wo&&wo.classList.remove("hidden")}function Dh(){ko(),It&&It.classList.remove("hidden"),St&&St.classList.add("hidden")}function Mh(){ko(),It&&It.classList.add("hidden"),St&&St.classList.remove("hidden")}async function ZI(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Bt(await h.getMe()),await ti(),_("Welcome back!","success")}catch(i){x("log in",i)}return!1}async function XI(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Bt(await h.getMe()),await ti(),_("Account created successfully!","success")}catch(s){x("sign up",s)}return!1}function jh(){h.logout(),Bt(null),ci(null),$o(),_("Signed out","success")}function JI(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Er(){var i;const e=re();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",xp(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?JI(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function eS(){ko();const e=It==null?void 0:It.querySelector("form");e&&e.addEventListener("submit",s=>ZI(s));const t=St==null?void 0:St.querySelector("form");t&&t.addEventListener("submit",s=>XI(s));const n=It==null?void 0:It.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Mh()});const i=St==null?void 0:St.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Dh()})}let Nd=[];async function Od(){try{Nd=await h.getApiKeys(),tS()}catch(e){x("load API keys",e)}}function tS(){const e=document.getElementById("api-keys-list");if(e){if(Nd.length===0){e.innerHTML=W({icon:V.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Nd.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${u(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${u(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Le(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Le(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function nS(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function iS(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){x("create API key",n)}return!1}async function sS(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),_("API key copied to clipboard","success")}catch{_("Failed to copy","error")}}async function oS(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),_("API key revoked","success"),await Od()}catch(n){x("revoke API key",n)}}le({"create-api-key":e=>{iS(e)},"copy-api-key":()=>{sS()},"dismiss-api-key-modal":()=>{H(),Od()},"revoke-api-key":(e,t)=>{oS(t.keyId,t.keyName)}});let Hd=[];async function Rh(){try{Hd=await h.getConnections(),rS()}catch(e){x("load connected apps",e)}}function Fd(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function aS(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function rS(){const e=document.getElementById("connected-apps-list");if(e){if(Hd.length===0){e.innerHTML=W({icon:V.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Hd.map(t=>t.acts_as==="person"?lS(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Fd(t))} ${kr(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(aS(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Le(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Le(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Fd(t))}">Disconnect</button>
        </div>
    `).join("")}}function lS(e){const n=`${e.device_name||"A device"} · ${Fd(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${u(n)} ${kr(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Le(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Le(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function Ph(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),_("App disconnected","success"),await Rh()}catch(n){x("disconnect app",n)}}le({"revoke-connection":(e,t)=>{Ph(t.connectionId,t.connectionName)}});let Ud=[];async function qh(){try{Ud=await h.getPushDevices(),cS()}catch(e){x("load push devices",e)}}const Nh={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Oh(e){return e.label||e.platform||"Unnamed device"}function cS(){const e=document.getElementById("push-devices-list");if(e){if(Ud.length===0){e.innerHTML=W({icon:V.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Ud.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Oh(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Le(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Le(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Nh[t.status]?`<span class="push-device-status">${u(Nh[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(Oh(t))}">Remove</button>
        </div>
    `).join("")}}async function dS(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),_("Device removed","success"),await qh()}catch(n){x("remove push device",n)}}le({"remove-push-device":(e,t)=>{dS(t.installationId,t.deviceName)}});let xr=!1,on=0,In=[],Ir=[];function uS(e){Ir=e,In=[...e]}function Sn(){return xr}function pS(){if(xr)return;xr=!0,on=0,In=[...Ir];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Sr()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>mS(n.target.value)),t.addEventListener("keydown",gS),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&fS(Number(i.dataset.commandIndex))}),_o(),requestAnimationFrame(()=>t.focus())}function Sr(){xr=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function mS(e){const t=e.toLowerCase().trim();t?In=Ir.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):In=[...Ir],on=0,_o()}function _o(){const e=document.getElementById("command-results");if(!e)return;if(In.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};In.forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)});let n="",i=0;for(const[o,a]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${o}</div>`;for(const r of a)n+=`
                <div class="command-item ${i===on?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function fS(e){on=e,_o()}function Hh(e){const t=In[e];t&&(Sr(),t.action())}function gS(e){switch(e.key){case"ArrowDown":e.preventDefault(),on=Math.min(on+1,In.length-1),_o();break;case"ArrowUp":e.preventDefault(),on=Math.max(on-1,0),_o();break;case"Enter":e.preventDefault(),Hh(on);break;case"Escape":e.preventDefault(),Sr();break}}le({"execute-command":(e,t)=>{Hh(Number(t.commandIndex))}});const Gd=new Map;function hS(e,t){Gd.set(e,t)}function vS(e){var n;const t=Gd.has(e)&&document.getElementById(Gd.get(e));return t?(t.focus(),(n=t.select)==null||n.call(t),!0):!1}const bS=[{title:"Navigation",shortcuts:[{key:"m",description:"Home"},{key:"i",description:"Issues"},{key:"b",description:"Issues as a board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals (in Project settings)"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Filter this screen, or search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function yS(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function wS(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(yS).join("")}
    </div>`}function Fh(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${bS.map(wS).join("")}
        </div>
    `,U()}const Tr=100,zd="status!=done,canceled",kS=["created","updated","priority","status","title","estimate"];function Ae(e){return e==null?"":u(String(e))}function Uh(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Ae(n)}</a>`}function Gh(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Vd=[{id:"identifier",label:"ID",fixed:!0,render:e=>Uh(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Uh(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Ae(Ve(e.status))},{id:"priority",label:"Priority",render:e=>Ae(Pe(e.priority))},{id:"type",label:"Type",render:e=>Ae(bt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Ae(Gh(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Ae(Gh(e,"creator"))},{id:"project",label:"Project",render:e=>Ae(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Ae(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ae(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Ae(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Ae(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Ae(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Ae(Le(e.created_at))},{id:"updated",label:"Updated",render:e=>Ae(Le(e.updated_at))},{id:"completed",label:"Completed",render:e=>Ae(Le(e.completed_at))},{id:"due",label:"Due",render:e=>Ae(Le(e.due_date))}],Lr=Object.fromEntries(Vd.map(e=>[e.id,e])),$S=Vd.filter(e=>e.fixed).map(e=>e.id),Kd=["identifier","title","status","priority","assignee","updated"];function Wd(e){const t=new Set,n=[];for(const s of e||[]){const o=String(s).trim();!Lr[o]||t.has(o)||(t.add(o),n.push(o))}return n.length===0?[...Kd]:[...$S.filter(s=>!t.has(s)),...n]}function _S(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function ES(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Wd(t.get("cols").split(",")):[...Kd],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function xS(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!_S(e.cols,Kd)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function IS(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function SS({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Tr,skip:o=0}){const a=["chaotic","issue","list"];let r=e||"",l=null;n||i?(a.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",a.push("--where",IS(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],p=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;kS.includes(f)?(a.push("--sort",f,"--order",p?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return a.push("--limit",String(s)),o>0&&a.push("--skip",String(o)),{command:a.join(" "),warning:l}}function TS(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function LS(e,t){const n=Wd(t).map(o=>Lr[o]),i=n.map(o=>`<th data-col="${m(o.id)}">${Ae(o.label)}</th>`).join(""),s=e.map(o=>`<tr class="query-row" data-issue-id="${m(o.id)}">${n.map(a=>`<td class="query-col-${m(a.id)}">${a.render(o)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function AS(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,o=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${o?"":" disabled"}>Next</button>`}let N=null,Yd=null,ot=null,Qd=0,Qi=!1,zh=!1;function ge(e){return document.getElementById(e)}function Vh(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Kh(e){const t=xS({...Yd,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Zd(){N&&ua(N.teamScope?null:N.projectId)}function CS(){N&&(!N.teamScope&&N.projectId!==X()?kt(N.projectId):Zd())}function BS(){const e=ge("query-columns-menu");e&&(e.innerHTML=Vd.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Ae(t.label)}
        </label>`).join(""))}function Ar(e){const t=ge("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Ae(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Wh(e){const t=ge("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Xd(e){var t;(t=ge("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Eo(){const e=ge("query-results"),t=ge("query-pager");if(!e)return;if(!ot){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=ot;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=LS(n,N.cols),t&&(t.innerHTML=AS(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(o=>{o.dataset.enabled=String(!o.disabled)}),Qi&&Xd(!0))}async function Cr(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=A(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){ot=null,Eo(),Ar(N.teamScope?"Select a team first.":"Select a project.");return}const o=++Qd,a=N.where===null?zd:N.where,r=ge("query-results");Qi=!0,r&&r.classList.add("loading"),Xd(!0);const l=()=>o===Qd&&C()==="query";try{const c=await h.queryIssues({...s,where:a,order:N.order,skip:(N.page-1)*Tr,limit:Tr});if(!l())return;N.where=c.where,N.order=c.order||null,Yd=Vh(N),ot={issues:c.issues||[],total:c.total,skip:c.skip};const d=ge("query-where");d&&d.value.trim()===a.trim()&&(d.value=c.where),Ar(null),Qi=!1,Eo(),Kh(e),t&&t()}catch(c){if(!l())return;Qi=!1,n?n():ot=null,Eo(),Ar(TS(c))}finally{o===Qd&&(Qi=!1,r&&r.classList.remove("loading"),Xd(!1))}}function Yh(){if(!N)return;const e=ge("query-where");return N.where=e?e.value.trim():"",N.page=1,Cr("push")}function DS(e){if(!N)return;const t={teamScope:N.teamScope,projectId:N.projectId,page:N.page};return N.teamScope=!e,e&&(N.projectId=e),N.page=1,Wh(null),Cr("push",{onSuccess:()=>{e?kt(e):Kp(),Zd()},onFailure:()=>{Object.assign(N,t),Zd()}})}function MS(e,t){if(!N||!Lr[e]||Lr[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=Wd(t?[...n,e]:n),Eo(),Kh("replace")}function jS(e){if(!N||!ot||Qi)return;const t=N.page+e;if(t<1||e>0&&ot.skip+ot.issues.length>=ot.total)return;const n={page:N.page,result:ot};return N.page=t,Cr("push",{onFailure:()=>{N.page=n.page,ot=n.result}})}async function RS(){if(!N)return null;const e=ge("query-where"),t=e?e.value.trim():N.where??zd,n=N.teamScope?null:se().find(a=>a.id===N.projectId),{command:i,warning:s}=SS({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Tr,skip:ot?ot.skip:0}),o=ge("query-cli-preview");try{await navigator.clipboard.writeText(i),_(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),o&&o.classList.add("hidden")}catch{o&&(o.textContent=i,o.classList.remove("hidden")),_("Could not copy; the command is shown below the box","warning")}return i}function PS(){var e,t,n,i,s,o;zh||(zh=!0,(e=ge("query-where"))==null||e.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&!a.isComposing&&(a.preventDefault(),Yh())}),(t=ge("query-run-btn"))==null||t.addEventListener("click",()=>Yh()),(n=ge("query-copy-cli-btn"))==null||n.addEventListener("click",()=>RS()),(i=ge("query-columns-btn"))==null||i.addEventListener("click",a=>{a.stopPropagation();const r=ge("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;a.currentTarget.setAttribute("aria-expanded",String(l))}),(s=ge("query-columns-menu"))==null||s.addEventListener("change",a=>{a.target.matches('input[type="checkbox"]')&&MS(a.target.value,a.target.checked)}),(o=ge("query-pager"))==null||o.addEventListener("click",a=>{const r=a.target.closest("button[data-query-page]");!r||r.disabled||jS(Number(r.dataset.queryPage))}),document.addEventListener("click",a=>{var l;const r=ge("query-columns-menu");r&&!r.classList.contains("hidden")&&!a.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=ge("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function qS(){var s,o;PS();const e=ES(window.location.search),t=se();let n=null;if(!e.teamScope){const a=r=>r&&t.some(l=>l.id===r);if(!a(e.projectId)){const r=e.projectId;e.projectId=a(X())?X():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,Yd=Vh(N),ot=null;const i=ge("query-where");return i&&(i.value=N.where===null?zd:N.where),(s=ge("query-cli-preview"))==null||s.classList.add("hidden"),(o=ge("query-columns-menu"))==null||o.classList.add("hidden"),CS(),BS(),Ar(null),Wh(n),Eo(),Cr("replace")}let Zi=[];function NS(){return Zi}wt(e=>{e==="currentProject"&&C()==="epics"&&Tn()});let Jd=0;const Xi=new Set(["done","canceled"]),eu={open:"Open",in_progress:"In progress",all_done:"All sub-issues done",needs_you:"Approvals",shipped:"Closed",all:"All"};let an="open",xo="",Io=new Set;hS("epics","epics-filter");function Qh(e,t){var i;return t?[e.title,e.identifier,(i=e.owner)==null?void 0:i.name,...(e.in_flight||[]).map(s=>s.title)].filter(Boolean).join(`
`).toLowerCase().includes(t):!0}async function Tn({fromMemory:e=!1}={}){var o;Ts(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++Jd;t._epicProgress=null,sv(t);const i=sc(),s=e?xa("epics",i):void 0;s?Zh(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((o=A())!=null&&o.id)){Zi=[],t.innerHTML=W({icon:V.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const a=X(),r=a?await h.getProjectEpicProgress(a):await h.getTeamEpicProgress(A().id);if(n!==Jd||(hi("epics",i,r),s&&Ia(s,r)))return;Zh(r,t)}catch(a){if(n!==Jd)return;Zi=[],t.innerHTML=W({icon:V.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),x("load epics",a)}}function Zh(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){Zi=[],t.innerHTML=W({icon:V.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Dr(e,t)}function So(e,t){return`${e} ${t}${e===1?"":"s"}`}function OS(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function tu(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function HS(e){const t=qe(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Xh(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,o=`${i.name}${i.status==="active"?" (current)":""}: ${So(i.closed||0,"issue")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(o)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}const Jh=[["in_progress","in progress"],["in_review","in review"],["todo","todo"],["backlog","backlog"]];function ev(e){const n={...e.epic.children||{}};let i=tu(e.epic.last_activity_at),s=(e.epic.awaiting_human||[]).length;for(const o of e.subs){const a=ev(o),r=o.epic.status;Br(a.children)>0&&n[r]>0&&(n[r]-=1,n.total=(n.total||0)-1);for(const l of["total","backlog","todo","in_progress","in_review","done","canceled"])n[l]=(n[l]||0)+(a.children[l]||0);i=Math.max(i,a.last),s+=a.asks}return e.rolled={children:n,last:i,asks:s},e.rolled}function Br(e){return(e.total||0)-(e.canceled||0)}function tv(e){return(e.backlog||0)+(e.todo||0)+(e.in_progress||0)+(e.in_review||0)}function nv(e){const t=e.rolled.children;return!Xi.has(e.epic.status)&&Br(t)>0&&tv(t)===0&&e.subs.every(n=>Xi.has(n.epic.status))}const nu={open:e=>!Xi.has(e.epic.status),in_progress:e=>!Xi.has(e.epic.status)&&(e.rolled.children.in_progress||0)+(e.rolled.children.in_review||0)>0,all_done:nv,needs_you:e=>e.rolled.asks>0,shipped:e=>Xi.has(e.epic.status),all:()=>!0};function iv(e,t=Jh.slice(0,2)){const n=t.filter(([i])=>e[i]>0).map(([i,s])=>`${e[i]} ${s}`);return n.length?n.join(" · "):""}function FS(e){return(e.in_flight||[]).map(t=>`${t.assignee?t.assignee.name:"Unassigned"}: ${t.title}`).join(`
`)}function US(e){const t=Br(e);if(t<=0)return'<span class="meter-label">No sub-issues</span>';const n=e.done||0,i=`${OS(n,t)} done: ${n} of ${t}`+(e.canceled?`, ${e.canceled} canceled`:"")+(tv(e)?`
${iv(e,Jh)}`:"");return`
        <div class="meter" title="${m(i)}"><div class="meter-fill" style="width: ${Math.round(n/t*100)}%"></div></div>
        <span class="meter-label">${n} of ${t}</span>`}function GS(e,{grouped:t,depth:n,shownSubs:i}){const s=e.epic,{children:o,last:a,asks:r}=e.rolled,l=Xi.has(s.status),c=s.status_pinned&&!l?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its sub-issues">✎<span class="sr-only"> (status set by hand)</span></span>':"",d=s.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",p=t?`<span class="epic-project-key">${u(s.project_key)}</span> `:"",f=s.owner?jt(s.owner.id)||s.owner:null,g=`<span class="epic-assignee" title="${m(f?$t(f):"Unassigned")}">${f?yt(f,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}</span>`,b=Br(o)<=0,w=[];if(l)w.push(s.completed_at?`Closed ${u(HS(s.completed_at))}`:"Closed");else if(!nv(e)){const E=iv(o),T=FS(s);E?w.push(T?`<span title="${m(T)}">${E}</span>`:E):b&&w.push("No sub-issues yet")}r&&w.push(`<span class="epic-needs-you">${So(r,"approval")}</span>`);const k=Io.has(s.id),$=i?`<button type="button" class="epic-subs-toggle" data-epic-toggle-subs="${m(s.id)}" aria-expanded="${k}" aria-label="${k?"Hide":"Show"} ${m(So(i,"sub-epic"))}" title="${m(So(i,"sub-epic"))}">${k?"▾":"▸"}</button> `:"",y=a?`${s.identifier} · updated ${qe(new Date(a).toISOString())}`:s.identifier;return`
        <div class="list-row-2line epic-row${l?" epic-row-closed":""}${b?" epic-row-empty":""}${n?" epic-row-sub":""}" data-identifier="${m(s.identifier)}" title="${m(y)}" style="--epic-depth: ${n}">
            <span class="epic-spark">${Xh(s.sprints)}</span>
            <span class="list-row-title">${$}${p}${u(s.title)}${c}${d}</span>
            <span class="list-row-sub">${w.join(" · ")}</span>
            <span class="list-row-right">${US(o)}${g}</span>
        </div>`}function Dr(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(y=>y.project_key),...i.map(y=>y.project_key)]).size>1,o=new Map(n.map(y=>[y.id,{epic:y,subs:[],parent:null}]));for(const y of o.values()){const E=y.epic.parent_epic_id&&o.get(y.epic.parent_epic_id);E&&E!==y&&(y.parent=E,E.subs.push(y))}for(const y of o.values())y.parent&&!zS(y)&&(y.parent=null);for(const y of o.values())y.subs=[];for(const y of o.values())y.parent&&y.parent.subs.push(y);[...o.values()].filter(y=>!y.parent).forEach(ev);const a=nu[an]||nu.open,r=y=>a(y)&&Qh(y.epic,xo),l=an==="shipped"?(y,E)=>tu(E.epic.completed_at||E.epic.last_activity_at)-tu(y.epic.completed_at||y.epic.last_activity_at):(y,E)=>E.rolled.last-y.rolled.last,c=y=>{for(let E=y.parent;E;E=E.parent)if(r(E))return E;return null},d=[...o.values()].filter(r),p=new Map,f=[];for(const y of d){const E=c(y);E?(p.has(E)||p.set(E,[]),p.get(E).push(y)):f.push(y)}const g=[],b=(y,E)=>{const T=(p.get(y)||[]).sort(l);g.push(GS(y,{grouped:s,depth:E,shownSubs:T.length})),Zi.push(y.epic),T.length&&Io.has(y.epic.id)&&T.forEach(F=>b(F,E+1))};Zi=[],f.sort(l).forEach(y=>b(y,0));const w=Object.entries(eu).map(([y,E])=>{const T=[...o.values()].filter(F=>nu[y](F)&&Qh(F.epic,xo)).length;return`<button type="button" class="segmented-btn${y===an?" active":""}" data-epics-filter="${y}" aria-pressed="${y===an}">${E} <span class="segmented-count">${T}</span></button>`}).join(""),k=i.filter(y=>y.open),$=k.length&&an!=="shipped"?`<p class="epic-untracked-note">${k.map(y=>`${s?`${u(y.project_key)}: `:""}${So(y.open,"open issue")}`).join(", ")} in no epic.</p>`:"";t.innerHTML=`
        <div class="epic-sections">
            <div class="segmented epic-filter" role="group" aria-label="Show">${w}</div>
            <section class="epic-section epic-section-list">
                ${g.length?`<div class="epic-section-rows">${g.join("")}</div>`:`<p class="epic-filter-empty">${xo?`No epics in ${u(eu[an])} match “${u(xo)}”.`:`No epics in ${u(eu[an])}.`}</p>`}
            </section>
            ${$}
        </div>
    `,t._epicProgress=e,sv(t),t._epicClickHandler||(t._epicClickHandler=y=>{const E=y.target.closest("[data-epics-filter]");if(E){if(E.dataset.epicsFilter===an)return;an=E.dataset.epicsFilter,Ts(-1),Dr(t._epicProgress,t);return}const T=y.target.closest("[data-epic-toggle-subs]");if(T){const L=T.dataset.epicToggleSubs;Io.has(L)?Io.delete(L):Io.add(L),Ts(-1),Dr(t._epicProgress,t);return}const F=y.target.closest(".epic-row");F&&F.dataset.identifier&&um(F.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function sv(e){const t=document.getElementById("epics-filter");t&&!t._epicFilterHandler&&(t._epicFilterHandler=()=>{xo=t.value.trim().toLowerCase(),e._epicProgress&&(Ts(-1),Dr(e._epicProgress,e))},t.addEventListener("input",t._epicFilterHandler),t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),t.blur())}))}function zS(e){const t=new Set;for(let n=e;n;n=n.parent){if(t.has(n))return!1;t.add(n)}return!0}function VS(){const e=X(),t=se().map(n=>`
        <option value="${m(n.id)}" ${n.id===e?"selected":""}>${u(n.name)}</option>
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",KS),document.getElementById("create-epic-title").focus()}async function KS(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){_("Please select a project","error");return}if(!n){_("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),_(`Created epic ${s.identifier}`,"success"),Tn()}catch(s){x("create epic",s)}}async function ov(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){de(t.id,!1);return}await To(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function To(e,t=!0,{focus:n=null}={}){var i,s;try{t&&pn();const o=await h.getIssue(e);if(o.issue_type!=="epic"){de(e,t);return}const a=(i=A())==null?void 0:i.id,[r,l,c]=await Promise.all([h.getEpicOverview(e),h.getProjectEpicProgress(o.project_id).catch(()=>null),a?h.getInbox(a,{kinds:lv,includeArchived:!0,limit:200}).catch(()=>[]):Promise.resolve([])]);t&&history.pushState({epicId:e,view:C()},"",`/epic/${o.identifier}`),document.querySelectorAll(".view").forEach(f=>f.classList.add("hidden"));const d=document.getElementById("epic-detail-view");d.classList.remove("hidden");const p={epic:o,overview:r,progress:l,inbox:c||[]};d._epicState=p,iu(d),WS(d,p),t1(d),n&&((s=document.getElementById(n))==null||s.scrollIntoView({block:"start"}))}catch(o){x("load epic",o)}}function iu(e){const t=e._epicState;e.querySelector("#epic-detail-content").innerHTML=e1(t),XS(t)}function WS(e,t){const n=()=>e._epicState===t&&!e.classList.contains("hidden")&&e.querySelector("#epic-subissues");g_({get:i=>n()?(t.overview.issues||[]).find(s=>s.id===i):void 0,set:i=>{t.overview.issues=(t.overview.issues||[]).map(s=>s.id===i.id?i:s),t.overview.tickets=t.overview.tickets.map(s=>s.id===i.id?{...s,status:i.status,estimate:i.estimate,updated_at:i.updated_at||s.updated_at,completed_at:i.completed_at??null}:s),iu(e)}})}const av={open:"Open",in_progress:"In progress",in_review:"In review",todo:"Todo",backlog:"Backlog",done:"Done",all:"All"};let ni="open";const rv=e=>e==="all"?()=>!0:e==="open"?t=>!cv.has(t.status):t=>t.status===e;function YS(e){const t=Object.entries(av).map(([s,o])=>{const a=e.filter(rv(s)).length;return`<button type="button" class="segmented-btn${s===ni?" active":""}" data-epic-sub-filter="${s}" aria-pressed="${s===ni}">${o} <span class="segmented-count">${a}</span></button>`}).join(""),n=ni==="done",i=e.filter(rv(ni)).sort((s,o)=>n?Ji(o.completed_at)-Ji(s.completed_at):Ji(o.updated_at)-Ji(s.updated_at));return`
        <div class="segmented epic-filter" role="group" aria-label="Show">${t}</div>
        ${i.length?`<div class="issues-list epic-page-issues">${i.map(Zn).join("")}</div>`:`<p class="epic-page-empty">No sub-issues in ${u(av[ni])}.</p>`}`}const lv=["review_requested","gate_pending"],cv=new Set(["done","canceled"]);function Ji(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function QS(e){return new Set([e.epic.id,...e.overview.tickets.map(t=>t.id)])}function su(e){const t=QS(e);return e.inbox.filter(n=>n.issue_id&&t.has(n.issue_id)&&n.state!=="resolved")}const ZS='<p class="epic-page-empty">No approvals waiting.</p>';function XS(e){if(!su(e).length)return;const t=()=>Jx("epic-needs-you-rows",su(e),{empty:ZS,reload:()=>{var i;const n=(i=A())==null?void 0:i.id;n&&h.getInbox(n,{kinds:lv,includeArchived:!0,limit:200}).then(s=>{e.inbox=s||[],document.getElementById("epic-needs-you-rows")&&t()}).catch(()=>{})}});t()}function ou(e,t,n,i,{open:s=!0,collapsible:o=!1}={}){const a=`${u(t)}${n==null?"":` <span class="section-count">${n}</span>`}`;return o?`
            <details class="issue-detail-section epic-page-section" id="${e}"${s?" open":""}>
                <summary><h3>${a}</h3></summary>
                ${i}
            </details>`:`
        <section class="issue-detail-section epic-page-section" id="${e}">
            <h3>${a}</h3>
            ${i}
        </section>`}function JS(e){return`<div class="epic-page-docs">${e.map(t=>`
        <div class="epic-page-doc" data-document-id="${m(t.id)}" role="link" tabindex="0">
            <span class="epic-page-doc-icon" aria-hidden="true">${u(t.icon||"📄")}</span>
            <span class="epic-page-doc-title">${u(t.title)}</span>
            <span class="epic-page-doc-links">${(t.linked_to||[]).map(n=>`<span class="epic-page-tag">${u(n)}</span>`).join("")}</span>
            ${t.updated_at?`<span class="epic-page-when">${u(qe(t.updated_at))}</span>`:""}
        </div>`).join("")}</div>`}function dv(e,t){return e.map(n=>`
        <div class="activity-item">
            <div class="activity-icon">${Ag(n.activity_type)}</div>
            <div class="activity-content">
                ${t.get(n.issue_id)?`<span class="epic-page-tag">${u(t.get(n.issue_id))}</span>`:""}
                <span class="activity-text">${ud(n)}</span>
                <span class="activity-actor">by ${u(cd(n))}</span>
                <span class="activity-time">${qe(n.created_at)}</span>
            </div>
        </div>`).join("")}function e1(e){var Y;const{epic:t,overview:n,progress:i}=e,s=C()||"epics",o=se().find(q=>q.id===t.project_id),a=t.assignee_id?jt(t.assignee_id):null,r=a?$t(a):null,l=(i==null?void 0:i.epics)||[],d=new Map(l.map(q=>[q.id,q])).get(t.id),p=n.tickets.filter(q=>q.issue_type!=="epic"),f=p.filter(q=>q.status==="done"),g=p.filter(q=>q.status!=="canceled"),b=q=>q.reduce((Z,I)=>Z+(I.estimate??1),0),w=g.length?Math.round(f.length/g.length*100):0,k=Math.max(Ji(t.updated_at),...n.tickets.map(q=>Ji(q.updated_at))),$=NS(),y=$.findIndex(q=>q.id===t.id),E=y>0?$[y-1]:null,T=y>=0&&y<$.length-1?$[y+1]:null,F=y>=0,L=new Map([[t.id,t.identifier],...n.tickets.map(q=>[q.id,q.identifier])]),P=su(e),K=[`${lt(t.status)} ${u(Ve(t.status))}`,r?u(r):'<span class="text-muted">Unassigned</span>',k?`Updated ${u(qe(new Date(k).toISOString()))}`:""].filter(Boolean).join(' <span class="epic-page-dot">·</span> ');return`
        <div class="detail-layout epic-page">
            <div class="detail-main">
                <div class="issue-detail-nav">
                    <button class="back-link" data-action="navigate-to" data-view="${m(s)}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Back
                    </button>
                    ${F?`
                    <div class="issue-nav-arrows">
                        <button class="issue-nav-btn" ${E?`data-action="navigate-epic" data-epic-id="${m(E.id)}"`:"disabled"} title="Previous epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span class="issue-nav-counter">${y+1} / ${$.length}</span>
                        <button class="issue-nav-btn" ${T?`data-action="navigate-epic" data-epic-id="${m(T.id)}"`:"disabled"} title="Next epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                    `:""}
                    <span class="issue-detail-breadcrumb">${o?u(o.name):"Project"} › ${u(t.identifier)}</span>
                    <button class="btn btn-secondary btn-small epic-page-open-ticket" data-action="epic-open-as-ticket" data-epic-id="${m(t.id)}">Edit issue</button>
                </div>

                <h1 class="issue-detail-title">${u(t.title)}</h1>
                <div class="epic-page-facts">${K}</div>
                ${t.status_pinned&&!cv.has(t.status)?`
                <div class="epic-page-pinned text-muted">Status set by hand, so it no longer follows its sub-issues.
                    <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${m(t.id)}">Follow sub-issues</button>
                </div>`:""}

                <div class="epic-page-progress">
                    <div class="epic-detail-progress">
                        <div class="epic-detail-progress-bar">
                            <div class="epic-detail-progress-fill${w===100?" epic-progress-complete":""}" style="width: ${w}%"></div>
                        </div>
                        <div class="epic-detail-progress-label">
                            <span>${f.length} of ${g.length} sub-issues done · ${b(f)} of ${b(g)} points</span>
                            <span>${g.length?`${w}%`:"No sub-issues yet"}</span>
                        </div>
                    </div>
                </div>

                ${P.length?`
                <section class="issue-detail-section epic-page-section" id="epic-approvals" aria-label="Approvals">
                    <div id="epic-needs-you-rows" class="inbox-list epic-page-inbox"></div>
                </section>`:""}

                ${n.documents.length?ou("epic-documents","Documents",n.documents.length,JS(n.documents)):""}

                ${n.tickets.length?ou("epic-subissues","Sub-issues",n.tickets.length,YS(n.issues||[])):""}

                ${n.tickets.length?"":W({icon:V.issues,heading:"No sub-issues yet",description:"Break this epic down by creating sub-issues"})}

                ${ou("epic-activity","Activity",null,`
                    <div class="activity-list" id="epic-activity-rows">
                        ${n.activities.length?dv(n.activities,L):'<p class="epic-page-empty">No activity yet.</p>'}
                    </div>
                    ${n.more_activity?`<button class="btn btn-secondary btn-small" data-epic-more-activity data-epic-id="${m(t.id)}" data-skip="${n.activities.length}">Show older activity</button>`:""}`)}
            </div>

            <aside class="detail-sidebar">
                <div class="sidebar-section epic-page-goal">
                    <details open>
                        <summary><h4>Description</h4></summary>
                        ${t.description?`<div class="description-content markdown-body">${Fn(t.description)}</div>`:'<p class="text-muted">No description.</p>'}
                    </details>
                </div>
                <div class="sidebar-section">
                    <h4>Properties</h4>
                    <div class="property-row">
                        <span class="property-label">Priority</span>
                        <span class="property-value-static">${gt(t.priority)} ${Pe(t.priority)}</span>
                    </div>
                    <div class="property-row">
                        <span class="property-label">Estimate</span>
                        <span class="property-value-static">${pi(t.estimate,t.project_id)}</span>
                    </div>
                    ${t.labels&&t.labels.length>0?`
                    <div class="property-row">
                        <span class="property-label">Labels</span>
                        <span class="property-value-static property-labels-btn">
                            ${t.labels.map(q=>`
                                <span class="issue-label" style="background: ${ae(q.color)}20; color: ${ae(q.color)}">${u(q.name)}</span>
                            `).join("")}
                        </span>
                    </div>`:""}
                    ${o?`
                    <div class="property-row">
                        <span class="property-label">Project</span>
                        <span class="property-value-static">${u(o.name)}</span>
                    </div>`:""}
                    ${(Y=d==null?void 0:d.sprints)!=null&&Y.length?`
                    <div class="property-row">
                        <span class="property-label">Points per sprint</span>
                        <span class="property-value-static epic-page-sprints" title="Points closed toward this goal in each recent sprint, oldest first">${Xh(d.sprints)}</span>
                    </div>`:""}
                    <div class="property-row">
                        <span class="property-label">Created</span>
                        <span class="property-value-static">${new Date(t.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </aside>
        </div>
    `}function t1(e){e._epicPageHandler||(e._epicPageHandler=async t=>{var r;const n=e._epicState,i=t.target.closest("[data-epic-more-activity]");if(i&&n){i.disabled=!0;try{const l=await h.getEpicOverview(n.epic.id,{activitySkip:Number(i.dataset.skip)||0}),c=new Map([[n.epic.id,n.epic.identifier],...n.overview.tickets.map(d=>[d.id,d.identifier])]);(r=e.querySelector("#epic-activity-rows"))==null||r.insertAdjacentHTML("beforeend",dv(l.activities,c)),l.more_activity?(i.dataset.skip=String((Number(i.dataset.skip)||0)+l.activities.length),i.disabled=!1):i.remove()}catch(l){i.disabled=!1,x("load activity",l)}return}const s=t.target.closest("[data-epic-sub-filter]");if(s){s.dataset.epicSubFilter!==ni&&(ni=s.dataset.epicSubFilter,iu(e));return}const o=t.target.closest('.issue-row[data-issue-type="epic"] .issue-title');if(o&&!(t.metaKey||t.ctrlKey||t.shiftKey||t.button===1)){t.preventDefault(),t.stopPropagation(),To(o.dataset.issueId);return}if(t.target.closest("#epic-needs-you-rows"))return;const a=t.target.closest(".epic-page-doc");if(a){Ie(a.dataset.documentId);return}},e.addEventListener("click",e._epicPageHandler),e.addEventListener("keydown",t=>{var i,s;if(t.key!=="Enter")return;const n=(s=(i=t.target).closest)==null?void 0:s.call(i,".epic-page-doc");n&&Ie(n.dataset.documentId)}))}le({"navigate-epic":(e,t)=>{To(t.epicId)},"epic-open-as-ticket":(e,t)=>{de(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),_("Status now follows its sub-issues"),await To(t.epicId,!1)}catch(n){x("update epic",n)}}});function n1(e){let t=!1,n=null;return function(s){var a,r,l,c,d,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((a=e.isInlineDropdownOpen)!=null&&a.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(qn(s.target)){s.key==="Escape"&&!s.defaultPrevented&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const o=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),o?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!o){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function i1(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const o=e.getModalPrimaryBtn();o&&!o.disabled&&(n.preventDefault(),o.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function rn(e,t,n=aa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function uv(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function Lo(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(uv(),!1):!0:!1}function s1(e){const t=aa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,o,a,r){const l=n(o);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,a,c,d)}return function(o){var l,c,d,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||qn(o.target)||Lo(o)||(o.key==="Enter"||o.key===" ")&&((d=(c=o.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(o.key)&&((f=e.beforeNavigate)==null||f.call(e));const a=document.querySelectorAll(t);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),rn(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":o.preventDefault(),rn(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(o,r,"status","status-btn");break;case"p":i(o,r,"priority","priority-btn");break;case"a":i(o,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function o1(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var a;if(e.getCurrentView()!=="documents"||(a=e.isDetailViewActive)!=null&&a.call(e)||qn(i.target)||Lo(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),rn(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),rn(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ln(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function a1(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||qn(i.target)||Lo(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex(),a=g=>{var w,k,$,y;const b=!!((k=(w=document.activeElement)==null?void 0:w.closest)!=null&&k.call(w,"#inbox-list"));if(($=e.collapseInboxExpand)==null||$.call(e),rn(o+g,e.setSelectedIndex,t),b){const E=document.querySelector(`${t}.keyboard-selected`);(y=(E==null?void 0:E.querySelector(".inbox-row-toggle"))||E)==null||y.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),a(1);break;case"k":case"ArrowUp":i.preventDefault(),a(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;o>=0&&s[o]&&(i.preventDefault(),e.toggleInboxExpand(s[o]));break;case"e":o>=0&&s[o]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[o]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}o>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function r1(e){const t="#kanban-board .kanban-card";return function(i){var a;if(e.getCurrentView()!=="board"||(a=e.isDetailViewActive)!=null&&a.call(e)||qn(i.target)||Lo(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),rn(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),rn(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.id;r&&e.viewIssue(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function l1(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),o=s.indexOf(i);if(o===-1)return;let a;switch(n.key){case"ArrowDown":a=s[Math.min(s.length-1,o+1)];break;case"ArrowUp":a=s[Math.max(0,o-1)];break;case"Home":a=s[0];break;case"End":a=s[s.length-1];break;default:return}a&&(n.preventDefault(),a.focus())}}function au(e){const{view:t,selector:n,open:i}=e;return function(o){var l,c,d,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||qn(o.target)||Lo(o)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const a=document.querySelectorAll(n);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),rn(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":o.preventDefault(),rn(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(d=o.target).closest)!=null&&p.call(d,'button, a[href], [role="button"]'))break;r>=0&&a[r]&&(o.preventDefault(),i(a[r]));break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const c1={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let z=null,An=0;async function pv(e,t){var o,a;const n=c1[e];if(!n){x("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++An;z=null;let s;try{s=await n.fetchList(t)}catch(r){x("load revision history",r);return}if(i===An){if(z={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((o=s[0])==null?void 0:o.version)??null,compareFromVersion:null,compareToVersion:null},z.viewVersion!=null)try{const r=await n.fetchOne(t,z.viewVersion);if(i!==An)return;z.cache.set(z.viewVersion,r)}catch(r){i===An&&x("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(a=document.querySelector(".modal"))==null||a.classList.add("modal-wide"),Mr(),U()}}function Mr(){const e=document.getElementById("modal-content");if(!e||!z)return;if(z.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=d1(),n=z.mode==="compare"?p1():u1();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function d1(){const e=z.revisions.map(n=>{const i=z.mode==="view"?n.version===z.viewVersion:n.version===z.compareFromVersion||n.version===z.compareToVersion,s=z.mode==="compare"?n.version===z.compareFromVersion?' <span class="rev-tag">from</span>':n.version===z.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${u(n.author_name||"Unknown")} ${na(n.author)}</span>
          <span class="revision-time">${qe(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${z.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function u1(){const e=z.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=z.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[z.adapter.bodyField]||"",s=i?`<div class="markdown-body">${ut(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${qe(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function p1(){const e=z.compareFromVersion,t=z.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=z.cache.get(e),i=z.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[z.adapter.bodyField]||"",o=i[z.adapter.bodyField]||"",a=m1(s,o);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${u(n.title||"")}</span>
        &rarr; <span class="diff-add">${u(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${a}
  `}function m1(e,t){const n=e.split(`
`),i=t.split(`
`),s=f1(n,i);return s.every(a=>a.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(a=>a.type==="equal"?a.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):a.type==="add"?a.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):a.type==="del"?a.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function f1(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const o=[];let a=0,r=0;for(;a<n&&r<i;)e[a]===t[r]?(Ao(o,"equal",e[a]),a++,r++):s[a+1][r]>=s[a][r+1]?(Ao(o,"del",e[a]),a++):(Ao(o,"add",t[r]),r++);for(;a<n;)Ao(o,"del",e[a++]);for(;r<i;)Ao(o,"add",t[r++]);return o}function Ao(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function g1(e){if(!z)return;const t=z.token,n=z;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(z!==n||An!==t)return;n.cache.set(e,i)}catch(i){z===n&&An===t&&x("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Mr()}function h1(){if(!z)return;const e=z.token,t=z;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(a=>a.version===n);if(i>=0&&i+1<t.revisions.length){const a=t.revisions[i+1].version;t.compareFromVersion=a,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const o=[t.compareFromVersion,t.compareToVersion].filter(a=>a!=null&&!t.cache.has(a));Promise.all(o.map(a=>t.adapter.fetchOne(t.entityId,a).then(r=>{z===t&&An===e&&t.cache.set(a,r)}).catch(r=>{s||(s=r)}))).then(()=>{z!==t||An!==e||(s&&x("load revisions to compare",s),Mr())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Mr()}le({"show-document-revisions":(e,t)=>{pv("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{pv("issue",t.issueId)},"select-revision-version":(e,t)=>{g1(Number(t.version))},"toggle-revision-compare":()=>{h1()},"close-revision-viewer":()=>{z=null,H()}});function jr(e){return mt().find(t=>t.id===(e==null?void 0:e.user_id))||null}function mv(e){if(!e)return"Team-wide";const t=se().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function fv(e,t=re()){return!(e!=null&&e.is_agent)||!t||!jr(e)?!1:e.owner_id===t.id||Gi()}function gv(e){const t=jr(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function v1(e,t){var n,i;return((n=mt().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function ln(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function Rr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function b1(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=jr(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${ln("Scope","A guest from another team, with a membership here")}
                ${ln("Owner",Rr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=gv(e),o=[ln("Scope",u(mv(n.agent_project_id??e.project_id))),ln("Owner",Rr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&o.push(ln("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;o.push(ln("Registered by",f?Rr(f,v1(f,t)):"A registrar")),o.push(ln("Last used",n.last_used_at?u(Le(n.last_used_at)):"Never"))}else o.push(ln("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=mt().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);o.push(ln("Sessions registered",f.length?f.map(g=>Rr(g.id,g.name)).join(", "):"None active"))}const a=fv(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=a?`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Owner actions</h3></div>
            <div class="agent-profile-actions">
                ${c&&!i?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${r}" data-agent-name="${l}" data-can-register="${s?"true":"false"}">${s?"Stop being a registrar":"Make registrar"}</button>`:""}
                <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${r}" data-agent-name="${l}">Delete agent</button>
            </div>
        </section>`:"",p=a?`
        <section class="agent-profile-section">
            <div class="section-header agent-profile-section-head">
                <h3>Credentials</h3>
                ${c?`<button class="btn btn-secondary btn-small" data-action="generate-agent-key" data-agent-id="${r}" data-agent-name="${l}">Generate key</button>`:""}
            </div>
            <div id="agent-credentials" class="agent-credentials" data-agent-id="${r}" aria-busy="true"><div class="skeleton skeleton-title"></div></div>
        </section>`:"";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">${o.join("")}</dl>
        </section>
        ${p}
        ${d}
    `}let hv=0;async function Pr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++hv;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==hv)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const o=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),a=n.filter(l=>l.is_active);if(!a.length&&!o.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...a.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${u(l.key_prefix||"")}…</code>${l.name?` · ${u(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${u(Le(l.created_at))}${l.owner_name?` by ${u(l.owner_name)}`:""} · ${l.last_used_at?`last used ${u(Le(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...o.map(l=>{var d;const c=((d=l.client)==null?void 0:d.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${u(c)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${u(Le(l.created_at))}${l.last_used_at?` · last used ${u(Le(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(c)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function y1(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),Pr(t)}catch(n){x("revoke the key",n)}}const qr={bio:4e3,pronouns:40,tagline:120,name:255};let je=[],Co=null,vv=new Map,ru=!1,Nr=0,Bo=null,es=null,Do=null,Or=!1,lu=0,cu={teamId:null,role:null};async function bv(e,t){const n=await h.getTeamRoster(e,{includeIdle:t}),i=re(),s=Array.isArray(n)?n.find(o=>o.user_id===(i==null?void 0:i.id)):null;return cu={teamId:e,role:(s==null?void 0:s.role)??null},n}function w1(e,t){!t||Co!==e||(je=je.map(n=>n.user_id===t.user_id?t:n))}function k1(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function $1(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function Hr(){const e=A();if(!e)return;const t=++Nr,n=ru,i=document.getElementById("people-list");i&&(i.innerHTML=k1(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=ru),oh().then(()=>{t===Nr&&(Gi()?wr():ah(),Co===e.id&&ts())});try{const[o,a]=await Promise.all([bv(e.id,n),$1(e.id)]);if(t!==Nr)return;je=o,Co=e.id,vv=a,ts()}catch(o){if(t!==Nr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=W({icon:V.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),x("load the roster",o)}}function Fr(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function _1(e){const t=vv.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u(Fr(e))}function E1(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(mv(e.project_id))}</span>`),gv(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u(Fr(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${yt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${_1(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function yv(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(E1).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function ts(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=je.filter(o=>!o.is_agent),n=je.filter(o=>o.is_agent),i=re(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=yv("Humans",t,"No one yet.",s)+yv("Agents",n,"No agents yet.")+x1()}function x1(){var s;if(!Gi())return"";const e=new Set(je.map(o=>o.user_id)),t=new Set(mt().map(o=>o.id)),n=(s=re())==null?void 0:s.id,i=xt().filter(o=>!e.has(o.user_id)&&!t.has(o.user_id));return i.length?`
        <div class="section-header people-section-header">
            <h3>Not on the roster <span class="section-count">${i.length}</span></h3>
        </div>
        <div class="people-rows">${i.map(o=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">${u(o.user_name||"Unknown")}</div>
                    <div class="list-row-sub">${u(o.user_email||"")}${o.user_email?" · ":""}deactivated account, ${u(o.role||"member")}</div>
                </div>
                ${o.user_id!==n&&o.role!=="owner"?`<div class="list-row-right"><button class="btn btn-danger-outline btn-small" data-action="remove-member" data-user-id="${m(o.user_id)}">Remove from team</button></div>`:""}
            </div>`).join("")}
        </div>
    `:""}function I1(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function S1(e){var i,s,o;const t=(i=A())==null?void 0:i.id;if(!t||!e)return!1;let n=null;return e.id===((s=re())==null?void 0:s.id)&&cu.teamId===t?n=cu.role:Co===t&&(n=((o=je.find(a=>a.user_id===e.id))==null?void 0:o.role)??null),n==="admin"||n==="owner"}function wv(e,t=re()){return!e||!t?!1:e.user_id===t.id?!0:!!e.is_agent&&(e.owner_id===t.id||S1(t))}async function kv(e,t,{fresh:n=!1}={}){if(!n&&Co===e){const o=je.find(a=>a.user_id===t);if(o)return o}const s=(await bv(e,!0)).find(o=>o.user_id===t)||null;return w1(e,s),s}let $v=0,Mo=null;async function Ur(e,t=!0){var r;t&&pn(),cm();const n=++$v,i=A();if(!i)return;const s=window.location.pathname,o=()=>{var l;return n!==$v||((l=A())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let a;try{a=await kv(i.id,e)}catch(l){if(o())return;x("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!o()){if(!a){const l=mt().find(c=>c.id===e);l&&(a=I1(l))}if(!a){_("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Rn("people"),Bs("people"),du(a),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function T1(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function du(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=T1();n.classList.remove("hidden"),n.dataset.userId=e.user_id,Mo=e;const i=m(e.user_id),s=wv(e),o=e.user_id===((l=re())==null?void 0:l.id),a=e.bio?`<div class="person-bio markdown-body">${Fn(e.bio)}</div>`:`<p class="person-bio-empty">${o?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${o?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${yt(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${u(e.name)}${e.pronouns?`<span class="person-pronouns">${u(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${u(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${u(e.tagline)}</div>`:""}
                <div class="person-role">${u(Fr(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${a}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?b1(e,je):""}
            ${!e.is_agent||!jr(e)?L1(e):""}
        </div>
    `,t&&B1(e.user_id),fv(e)&&Pr(e.user_id)}function L1(e){var i;if(!Gi())return"";const t=xt().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=re())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u(Fr(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function Gr(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function A1(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){Pr(t);return}if(n){je=je.filter(o=>o.user_id!==t),jo(t)?O("people"):Gr()&&ts();return}if(i){Gr()&&Hr();return}jo(t)&&Mo?du(Mo):Gr()&&ts()}function C1(e){const{userId:t}=e.detail||{};je=je.filter(n=>n.user_id!==t),jo(t)?O("people"):Gr()&&ts()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",A1),window.addEventListener("chaotic:member-removed",C1));const _v=["in_progress","in_review","todo"];let Ev=0;async function B1(e){const t=A();if(!t)return;const n=++Ev;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:_v,sort_by:"status",order:"asc",limit:20})}catch(a){i=null,console.error("Failed to load their issues:",a)}if(n!==Ev)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const o=a=>_v.indexOf(a.status);s.innerHTML=[...i].sort((a,r)=>o(a)-o(r)).map(a=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(a.identifier)}" data-action="person-open-issue" data-identifier="${m(a.identifier)}">
            <span class="person-issue-id">${u(a.identifier)}</span>
            <span class="person-issue-title">${u(a.title)}</span>
            <span class="person-issue-status">${u(String(a.status).replace("_"," "))}</span>
        </a>
    `).join("")}const uu=["name","avatar_url","pronouns","tagline","bio"];function D1(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(uu.map(n=>[n,t(n,e==null?void 0:e[n])]))}let pu=0;async function M1(e){var l;const t=re(),n=A();if(!t||!n)return;const i=++pu,s=window.location.pathname;let o;try{o=await kv(n.id,e,{fresh:!0})}catch(c){i===pu&&x("load this profile",c);return}if(i!==pu||window.location.pathname!==s||((l=A())==null?void 0:l.id)!==n.id||(!o&&e===t.id&&(o={...t,user_id:t.id}),!o||!wv(o,t)))return;Bo=e,Do=o,es=D1(o),lu++;const a=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=a?"Edit your profile":`Edit ${o.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(o.name)}" maxlength="${qr.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(o.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            <div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${Ro?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${Il.test(o.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${Ro?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Sv}px.</p>
            </div>
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(o.pronouns)}" maxlength="${qr.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(o.tagline)}" maxlength="${qr.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${qr.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${u(o.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Or?" disabled":""}>Save</button>
        </form>
    `,U()}function j1(e,t=null){const n=o=>{var a;return((a=e.querySelector(`#${o}`))==null?void 0:a.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const o of uu){const a=t?String(t[o]??""):null;(o==="avatar_url"?i[o]===(a==null?void 0:a.trim()):i[o]===a)||(s[o]=o==="avatar_url"?i[o]||null:i[o])}return s}function xv(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");du(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function jo(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Iv(){Bo=null,es=null,Do=null,H()}async function R1(e){e.preventDefault();const t=Bo;if(!t||Or)return;const n=e.target.closest("form")||e.target,i=j1(n,es);if(!Object.keys(i).length){Iv();return}const s=re(),o=t===(s==null?void 0:s.id),a=Do,r=lu,l=n.querySelector('button[type="submit"]');Or=!0,l&&(l.disabled=!0);try{const c=o?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(uu.map(p=>[p,(c==null?void 0:c[p])??null]));je=je.map(p=>p.user_id===t?{...p,...d}:p),o&&(Bt({...s,...d}),Er()),r===lu&&Iv(),_("Profile saved","success"),jo(t)?xv({...a,...d}):ts()}catch(c){x("save the profile",c)}finally{Or=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const Sv=256;async function P1(e,t=Sv){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const o=c=>new Promise(d=>s.toBlob(d,c,.9)),a=await o("image/webp");let r=a&&a.type==="image/webp"?a:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await o("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let Ro=!1;function Tv(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function q1(e,t){var s;if(!e||!t||t.id&&t.id!==e)return;const n=t.avatar_url??null;je=je.map(o=>o.user_id===e?{...o,avatar_url:n}:o);const i=re();if(i&&i.id===e&&(Bt({...i,avatar_url:n}),Er()),Bo===e&&es){const o=document.getElementById("profile-avatar");o&&(o.value=n||""),es={...es,avatar_url:n||""},Do={...Do,avatar_url:n},(s=document.getElementById("profile-photo-remove"))==null||s.classList.toggle("hidden",!Il.test(n||""))}Mo&&jo(e)&&xv({...Mo,avatar_url:n})}function Lv(){const e=re(),t=Bo||(e==null?void 0:e.id);return t?{userId:t,self:t===(e==null?void 0:e.id)}:null}async function Av(e,t,n,i){if(!(Ro||!e)){Ro=!0,Tv(!0);try{q1(e.userId,await t()),_(n,"success")}catch(s){x(i,s)}finally{Ro=!1,Tv(!1)}}}async function N1(e,t=P1){var s;const n=(s=e.files)==null?void 0:s[0];if(!n)return;const i=Lv();try{await Av(i,async()=>{const o=await t(n);return i.self?h.uploadAvatar(o):h.uploadAgentAvatar(i.userId,o)},"Photo uploaded","upload the photo")}finally{e.value=""}}function O1(){const e=Lv();return Av(e,()=>e.self?h.deleteAvatar():h.deleteAgentAvatar(e.userId),"Photo removed","remove the photo")}function mu(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}le({"view-person":(e,t)=>{e.type!=="click"||mu(e)||(e.preventDefault(),Ur(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),M1(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=re();t&&Ur(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&N1(n)},"remove-profile-photo":e=>{e.type==="click"&&O1()},"save-profile":e=>{R1(e)},"retry-load-people":e=>{e.type==="click"&&Hr()},"person-open-issue":(e,t)=>{e.type!=="click"||mu(e)||(e.preventDefault(),Wl(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&y1(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await Ph(t.connectionId,t.connectionName),Pr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||mu(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(ru=!!n.checked,Hr())}});const H1=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Tt=[],zr=null,Vr=null,fu=0;wt(e=>{e==="currentProject"&&C()==="board"&&Po()});async function Po({fromMemory:e=!1}={}){ia(-1);const t=++fu,n=X();if(!n){const a=document.getElementById("kanban-board");a&&(a.innerHTML=se().length===0?W({icon:V.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):W({icon:V.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=sc(),o=e?xa("board",s):void 0;o?(Tt=o,zr=s,C()==="board"&&Dt(Tt),ns()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const a=await h.getIssues({project_id:n});if(t!==fu)return;const r=o&&Ia(Tt,a);Tt=a,zr=s,hi("board",s,a),C()==="board"&&Dt(Tt),r||ns()}catch(a){if(t!==fu)return;i&&(i.innerHTML=W({icon:V.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),x("load board",a)}}const gu=qy(()=>Po(),200);function ns(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;zr&&hi("board",zr,Tt),e.innerHTML=H1.map(i=>{const s=Tt.filter(o=>o.status===i.key);return`
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
                    `:s.map(F1).join("")}
                </div>
            </div>
        `}).join(""),U1(t)}function F1(e){const t=e.assignee_id?jt(e.assignee_id):null,n=t?$t(t):null,i=e.estimate!=null?pi(e.estimate,e.project_id):"",s=ma(e.estimate,e.project_id),o=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${u(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${yt(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${u(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(Pe(e.priority))}">${gt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${u(i)}</span>`:""}
                ${o.map(a=>`<span class="issue-label" title="${m(a.name)}" style="background: ${ae(a.color)}20; color: ${ae(a.color)}">${u(a.name)}</span>`).join("")}
            </div>
        </div>
    `}function U1(e){const t=Rp();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ia(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ia(i),n[i].classList.add("keyboard-selected")}function G1(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Vr=t.dataset.id,t.classList.add("dragging")}function z1(e,t){t.classList.remove("dragging"),Vr=null}function Cv(e){const t=Tt.find(n=>n.id===Vr);return!!t&&t.status===e}function V1(e,t){e.preventDefault(),!Cv(t.dataset.status)&&t.classList.add("drag-over")}function K1(e,t){t.classList.remove("drag-over")}function W1(e,t){e.preventDefault();const n=Tt.find(i=>i.id===t.dataset.id);n&&Cv(n.status)||t.classList.add("drag-over")}function Y1(e,t){t.classList.remove("drag-over")}async function Q1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Tt.find(a=>a.id===n);if(!s)return;const o=s.status;if(o!==i){s.status=i,ns();try{const a=await h.updateIssue(n,{status:i});_("Status updated","success"),Qs(a)}catch(a){s.status=o,ns(),x("update status",a)}}}async function Z1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Vr||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),o=s==null?void 0:s.dataset.status;if(!o)return;const a=Tt.find(l=>l.id===n);if(!a)return;const r=a.status;if(r!==o){a.status=o,ns();try{const l=await h.updateIssue(n,{status:o});_("Status updated","success"),Qs(l)}catch(l){a.status=r,ns(),x("update status",l)}}}le({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),de(t.id)):e.type==="dragstart"?G1(e,n):e.type==="dragend"?z1(e,n):e.type==="dragover"?W1(e,n):e.type==="dragleave"?Y1(e,n):e.type==="drop"&&Z1(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?V1(e,n):e.type==="dragleave"?K1(e,n):e.type==="drop"&&Q1(e,n)},"retry-load-board":()=>Po()});const Cn=new Map,Bv=6e4,hu=100;let Ne=null,Kr=null,Wr=null,qo=null,Dv=!1;const Mv={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},jv={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},Rv={api:null};let vu={...Rv};function X1(e={}){vu={...Rv,...e},Ne||(Ne=document.createElement("div"),Ne.className="issue-tooltip",Ne.style.display="none",document.body.appendChild(Ne),Ne.addEventListener("mouseenter",()=>{clearTimeout(Kr)}),Ne.addEventListener("mouseleave",()=>{bu()})),Dv||(document.addEventListener("mouseover",J1),document.addEventListener("mouseout",eT),Dv=!0)}function J1(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=tT(t);if(n){if(n===qo&&Ne.style.display!=="none"){clearTimeout(Kr);return}clearTimeout(Wr),Wr=setTimeout(()=>{nT(t,n)},200)}}function eT(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Wr),Kr=setTimeout(()=>{bu()},150))}function tT(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function nT(e,t){qo=t;const n=e.getBoundingClientRect();Ne.style.left=`${n.left+window.scrollX}px`,Ne.style.top=`${n.bottom+window.scrollY+8}px`,Ne.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Ne.style.display="block";try{const i=await sT(t);if(qo!==t)return;oT(i)}catch{if(qo!==t)return;Ne.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function bu(){clearTimeout(Wr),clearTimeout(Kr),Ne&&(Ne.style.display="none"),qo=null}function iT(){const e=Date.now();for(const[t,n]of Cn.entries())e-n.timestamp>=Bv&&Cn.delete(t)}async function sT(e){Cn.size>hu/2&&iT();const t=Cn.get(e);if(t&&Date.now()-t.timestamp<Bv)return t.issue;if(!vu.api)throw new Error("API not initialized");const n=await vu.api.getIssueByIdentifier(e);if(Cn.size>=hu){const i=Array.from(Cn.entries());i.sort((o,a)=>o[1].timestamp-a[1].timestamp);const s=i.slice(0,hu/2);for(const[o]of s)Cn.delete(o)}return Cn.set(e,{issue:n,timestamp:Date.now()}),n}function oT(e){const t=Mv[e.status]||Mv.backlog,n=jv[e.priority]||jv.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Ne.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${aT(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${rT(e.priority)}</span>
        </div>
    `}function aT(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function rT(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Pv(){return!!document.querySelector(".description-inline-editor")}function yu(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function wu(){var e;return yu("issue-detail-view")?((e=xe())==null?void 0:e.id)??null:null}function ii(e){return!!e&&wu()===e}function lT(){We("issue:created",fT),We("issue:updated",gT),We("issue:deleted",hT),We("comment",yT),We("relation",kT),We("attestation",$T),We("activity",ET),We("project",xT),We("sprint",IT),We("document",wT),We("inbox",_T),We("connection:reconnected",ST),We("connection:unauthorized",dT),We("connection:forbidden",uT),We("connection:superseded",cT)}function cT(){_("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function dT(){h.logout(),Bt(null),ci(null),$o(),_("Your session has ended. Please sign in again.","warning")}function uT(){_("Live updates stopped: you no longer have access to this team.","error")}function qv(e,t){var n;return e&&e===((n=re())==null?void 0:n.id)?"You":t||"Someone"}function pT(e){var s;const t=qv(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(bt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Pe(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=re())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function mT(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${qv(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function Nv(e,t,n){const i=_(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const o=()=>{var a;(a=i.querySelector(".toast-close"))==null||a.click(),Promise.resolve(de(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",o),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),o())})}}}function fT(e){var s;Os(C(),"board","sprints","epics");const t=ne(),n=t.findIndex(o=>o.id===e.id),i=t.findIndex(o=>o._isOptimistic&&o.title===e.title);if(!(n>=0))if(i>=0){const o=[...t];o[i]=e,tt(o),C()==="issues"&&ft()}else tt([e,...t]),C()==="issues"&&ft(),Nv(e,pT(e),"info");if(e.assignee_id===((s=re())==null?void 0:s.id)){const o=Ye(),a=o.findIndex(l=>l.id===e.id),r=o.findIndex(l=>l._isOptimistic&&l.title===e.title);if(a===-1&&r===-1)Vn([e,...o]),C()==="my-issues"&&Kn();else if(r>=0){const l=[...o];l[r]=e,Vn(l),C()==="my-issues"&&Kn()}}C()==="board"?gu():C()==="sprints"?No():C()==="epics"&&Tn(),ii(e.parent_id)&&si(e.parent_id)}function gT(e){Os(C(),"board","sprints","epics"),ya(e);const t=ne();t.some(s=>s.id===e.id)&&tt(t.map(s=>s.id===e.id?e:s));const n=Ye();n.some(s=>s.id===e.id)&&Vn(n.map(s=>s.id===e.id?e:s));const i=Is();i.some(s=>s.id===e.id)&&Dt(i.map(s=>s.id===e.id?e:s)),C()==="issues"?ft():C()==="my-issues"?Kn():C()==="board"?gu():C()==="sprints"?No():C()==="epics"&&Tn(),ii(e.id)&&(Pv()?ld(e):si(e.id))}function hT(e){var s,o;const t=e.title??((s=ne().find(a=>a.id===e.id))==null?void 0:s.title)??((o=Ye().find(a=>a.id===e.id))==null?void 0:o.title);Os(C(),"board","sprints","epics"),sk(e.id),tt(ne().filter(a=>a.id!==e.id)),Vn(Ye().filter(a=>a.id!==e.id));const n=Is();n.some(a=>a.id===e.id)&&Dt(n.filter(a=>a.id!==e.id)),C()==="issues"?ft():C()==="my-issues"?(Kn(),$i({showLoading:!1})):C()==="board"?gu():C()==="sprints"?No():C()==="epics"&&Tn();const i=ii(e.id);Nv(null,mT(e,t),i?"warning":"info"),i&&O("my-issues")}const Ov=250,vT=1e3,is=new Map;function si(e){Pv()?ld():ku(e,Ov)}function ku(e,t){let n=is.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},is.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>bT(e),t))}async function bT(e){const t=is.get(e);if(!t)return;if(t.timer=null,!ii(e)){is.delete(e);return}t.inFlight=!0;let n;try{n=await de(e,!1,{refresh:!0})}finally{t.inFlight=!1}is.get(e)===t&&(t.again?(t.again=!1,ku(e,Ov)):n==="retry"?ku(e,vT):is.delete(e))}function yT(e){C()==="my-issues"&&$i({showLoading:!1}),ii(e.issue_id)&&si(e.issue_id),e.document_id&&Ym(e.document_id)}function wT(e,{type:t}={}){Os(C(),"documents"),Wm(),t==="deleted"?Wk(e.id,e.title):Ym(e.id)}function kT(e){const t=wu();t&&(e.source_issue_id===t||e.target_issue_id===t)&&si(t)}function $T(e){ii(e.issue_id)&&si(e.issue_id)}function _T(e,t){var n;e.recipient_user_id===((n=re())==null?void 0:n.id)&&(Ni(),t0(t==null?void 0:t.type,e),C()==="inbox"&&!s0(t==null?void 0:t.type,e)&&Hi({background:!0}))}function ET(e){C()==="my-issues"&&$i({showLoading:!1}),ii(e.issue_id)&&si(e.issue_id)}function xT(e,{type:t}){pt().then(()=>{C()==="projects"&&Nn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?_(`New project: ${e.name}`,"info"):t==="deleted"&&_(`Project ${e.name} deleted`,"info")}function No(){const e=w$();e&&yu("sprint-detail-view")?wi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):yu("sprints-view")&&fn().catch(t=>console.error("Failed to reload sprints:",t))}function IT(e,{type:t}={}){if(Os(C(),"sprints"),of(),C()==="sprints"?No():C()==="my-issues"&&Ks(),t==="created")_(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";_(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function ST(){const e=C();oc(),Ni(),e==="issues"?Nt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(ki().catch(n=>console.error("Failed to resync my issues:",n)),Ks().catch(n=>console.error("Failed to resync sprint status:",n)),$i({showLoading:!1})):e==="board"?Po():e==="sprints"?No():e==="epics"?Tn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?pt().then(()=>{C()==="projects"&&Nn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Wm():e==="inbox"&&Hi({background:!0});const t=wu();t&&si(t)}const TT='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Hv(e){return Array.from(e.querySelectorAll(TT)).filter(t=>!t.closest(".hidden, [hidden]"))}function Fv(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function LT(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Fv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Hv(t);n&&n.focus()}}}function Oo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Fv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Hv(n);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Oo()});async function AT(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=X();if(!i){_("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const o="temp-"+Date.now(),a=se().find(c=>c.id===i),r={id:o,title:n,identifier:`${(a==null?void 0:a.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};tt([r,...ne()]),ft();const l=document.querySelector(`[data-id="${o}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ne();d.some(p=>p.id===c.id)?tt(d.filter(p=>p.id!==o)):d.some(p=>p.id===o)&&tt(d.map(p=>p.id===o?c:p)),ft(),pt(),_("Issue created!","success")}catch(c){tt(ne().filter(d=>d.id!==o)),ft(),x("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Mw({beforeScrollRestore:Oc,beforeNavigate:()=>{Px(),kw(),di(null),qp(null),Oo(),bu(),ua()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return ov(e[1]),!0;if(e[0]==="issue"&&e[1])return lr(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(lr(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}if(e[0]==="document"&&e[1])return HT(e[1]),!0;if(e[0]==="sprint"&&e[1])return _$(e[1]),!0;if(e[0]==="people"&&e[1])return Ur(decodeURIComponent(e[1]),!1),!0;if(e[0]==="projects"&&e[1]&&e[2]==="settings"){const t=new URLSearchParams(window.location.search).get("tab")||void 0;return fa(decodeURIComponent(e[1]),{tab:t,replace:!0}),!0}return!1},detailPopstate:e=>e.epicId?(To(e.epicId,!1),!0):e.issueId?(de(e.issueId,!1),!0):e.identifier?(lr(e.identifier),!0):e.documentId?(Ie(e.documentId,!1),!0):e.sprintId?(wi(e.sprintId,!1),!0):e.personId?(Ur(e.personId,!1),!0):e.settingsProjectId?(fa(e.settingsProjectId,{tab:e.tab,replace:!0}),!0):!1,restoreProject:()=>{const e=sm();e&&se().some(t=>t.id===e)&&kt(e)},issueNavigate:e=>lr(e),epicNavigate:e=>ov(e)}),Dw({"my-issues":()=>{Ks(),ki(),$i()},inbox:()=>{p0(),Hi({focusFirst:!0})},issues:()=>{var r;U_(),W_(),Z_();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Yn().length>0||Qn().length>0;s||Nt();const o=Sf().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Oa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Ha())}}),a=Hf().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([o,a]).then(()=>Nt()):(o.catch(l=>console.error("Failed to populate label filter:",l)),a.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{qS()},epics:()=>{Tn({fromMemory:!0})},board:()=>{Po({fromMemory:!0})},projects:()=>{Nn(),pt().then(Nn)},sprints:()=>{fn({fromMemory:!0})},rituals:()=>{Tm()},documents:()=>{zn(null,null,{fromMemory:!0})},people:Hr,settings:()=>{Od(),Rh(),qh(),Rs()}});function CT(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function BT(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>nm(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>$w());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>_w()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,o])=>{const a=e.querySelector(`#${s} .btn-primary`);a&&a.addEventListener("click",()=>xw(o))})}function DT(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>zm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>zm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Vm());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Uk());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Jt())}function MT(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>df())}function jT(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Q_());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>C_());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>B_()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ga("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ga("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ga("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ga("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>za())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Va())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Rc())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Pc())}const o=document.getElementById("label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ka())}const a=document.getElementById("exclude-label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Wa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>rt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>rt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>rt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Nt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>Kf());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>AT(g))}function RT(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>sh());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ys()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(a=>{a.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(a.dataset.view),r.detail>0&&uv())})}),document.querySelectorAll(".issues-layout-toggle a[data-view]").forEach(a=>{a.addEventListener("click",r=>{var c;if(r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0)return;r.preventDefault();const l=a.dataset.view;C()!==l&&O(l),(c=document.querySelector(`#${l}-view .issues-layout-toggle a[data-view="${l}"]`))==null||c.focus()})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>H0());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Oo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>LT());const o=document.querySelector(".mobile-fab");o&&o.addEventListener("click",()=>Ys())}function PT(e){Oo(),Ln()&&O(C()),C()==="query"?DS(e):e?kt(e):Kp()}function Uv(){return Gy(document.getElementById(da),{returnFocus:!0})}le({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&PT(n.value)},showCreateIssueModal:()=>Ys(),showCreateEpicModal:()=>VS(),"retry-load-epics":()=>Tn(),showCreateProjectModal:()=>Zp(),showCreateDocumentModal:()=>Zm(),showCreateTeamModal:()=>uh(),showEditTeamModal:()=>tI(),showInviteModal:()=>lh(),showCreateApiKeyModal:()=>nS(),showCreateAgentModal:()=>Vw(),resetOnboarding:()=>bh(),logout:()=>jh(),navigateToProjects:()=>O("projects")});async function qT(){if(!h.getToken()){await Ah();return}dm();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await Dy(kp(h.getToken()));if(n){t.then(i=>{Bt(i),Er()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await xl(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),_("Showing saved data — check your connection and reload","error")}),Bt(n.user),await ti({teamsRequest:e,snapshot:n});return}try{const i=await t;Bt(i),await ti({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Ah();return}console.error("Failed to load current user on boot:",i),$o(),_("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;lw(),ME(),eS(),RT(),CT(),MT(),jT(),BT(),DT(),NT(),zy(),(e=document.querySelector(`[data-picker-for="${da}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),OT(),X1({api:h}),lT(),await qT()});function NT(){const e=document.getElementById("theme-toggle");if(!e)return;const t=hy()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),vy(n?"light":"dark")})}function OT(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(!t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;const i=(t.getAttribute("href")||"").match(/^(?:#)?\/issue\/([^/?#]+)$/);if(!i)return;let s;try{s=decodeURIComponent(i[1])}catch{return}e.preventDefault(),Wl(s)})}async function HT(e){try{await Ie(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",s1({getCurrentView:C,getSelectedIndex:Mp,setSelectedIndex:Pn,viewIssue:de,showEditIssueModal:Tg,showInlineDropdown:Bc,isInlineDropdownOpen:xi,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln,beforeNavigate:Oc})),document.addEventListener("keydown",o1({getCurrentView:C,getSelectedIndex:Jy,setSelectedIndex:jp,viewDocument:Ie,showEditDocumentModal:Xm,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",r1({getCurrentView:C,getSelectedIndex:Rp,setSelectedIndex:ia,viewIssue:de,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",a1({getCurrentView:C,getSelectedIndex:ew,setSelectedIndex:sa,toggleInboxExpand:M0,collapseInboxExpand:r0,archiveInboxEntry:D0,isInlineDropdownOpen:xi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",l1()),document.addEventListener("keydown",au({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&wi(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:tw,setSelectedIndex:Pp,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",au({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&um(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:nw,setSelectedIndex:Ts,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",au({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:C,getSelectedIndex:F$,setSelectedIndex:U$,isInlineDropdownOpen:xi,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln}));function Gv(){var e;vS(C())||(O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus())}function FT(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Nk()}document.addEventListener("keydown",n1({closeModal:H,closeSidebar:Oo,navigateTo:O,openProjectSwitcher:Uv,showCreateIssueModal:Ys,showKeyboardShortcutsHelp:Fh,isModalOpen:Ke,focusSearch:Gv,isInlineDropdownOpen:xi,closeInlineDropdowns:Zy,isModalDirty:Yy,focusModalField:Cp,closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Ti()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:FT,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),uS([{id:"nav-my-issues",title:"Home",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"Issues laid out by status",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>Uv(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"The rituals tabs in Project settings",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Approvals, mentions and assignments awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(Ys,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(Zp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(Zm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>uh(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Gv,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(lh,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Fh(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>bh(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>jh(),category:"Account"}]),document.addEventListener("keydown",i1({isModalOpen:Ke,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Sn,openCommandPalette:pS,closeCommandPalette:Sr})),window.marked=Q,window.DOMPurify=dp,console.log("Chaotic frontend loaded via Vite")})();
