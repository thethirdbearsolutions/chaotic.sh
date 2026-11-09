var UT=Object.defineProperty;var GT=(Vt,He,Bn)=>He in Vt?UT(Vt,He,{enumerable:!0,configurable:!0,writable:!0,value:Bn}):Vt[He]=Bn;var ce=(Vt,He,Bn)=>GT(Vt,typeof He!="symbol"?He+"":He,Bn);(function(){"use strict";var ku;function Vt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var He=Vt();function Bn(e){He=e}var us={exec:()=>null};function J(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Fe.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var Fe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},lb=/^(?:[ \t]*(?:\n|$))+/,cb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,db=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ps=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ub=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,nl=/(?:[*+-]|\d{1,9}[.)])/,Ru=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pu=J(Ru).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),pb=J(Ru).replace(/bull/g,nl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),il=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,mb=/^[^\n]+/,sl=/(?!\s*\])(?:\\.|[^\[\]\\])+/,fb=J(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",sl).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),gb=J(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nl).getRegex(),Go="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ol=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,hb=J("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ol).replace("tag",Go).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),qu=J(il).replace("hr",ps).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),vb=J(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",qu).getRegex(),al={blockquote:vb,code:cb,def:fb,fences:db,heading:ub,hr:ps,html:hb,lheading:Pu,list:gb,newline:lb,paragraph:qu,table:us,text:mb},Nu=J("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ps).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex(),bb={...al,lheading:pb,table:Nu,paragraph:J(il).replace("hr",ps).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Nu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Go).getRegex()},yb={...al,html:J(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ol).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:us,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:J(il).replace("hr",ps).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ou=/^( {2,}|\\)\n(?!\s*$)/,$b=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,zo=/[\p{P}\p{S}]/u,rl=/[\s\p{P}\p{S}]/u,Hu=/[^\s\p{P}\p{S}]/u,_b=J(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,rl).getRegex(),Fu=/(?!~)[\p{P}\p{S}]/u,Eb=/(?!~)[\s\p{P}\p{S}]/u,xb=/(?:[^\s\p{P}\p{S}]|~)/u,Ib=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Uu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Sb=J(Uu,"u").replace(/punct/g,zo).getRegex(),Tb=J(Uu,"u").replace(/punct/g,Fu).getRegex(),Gu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Lb=J(Gu,"gu").replace(/notPunctSpace/g,Hu).replace(/punctSpace/g,rl).replace(/punct/g,zo).getRegex(),Ab=J(Gu,"gu").replace(/notPunctSpace/g,xb).replace(/punctSpace/g,Eb).replace(/punct/g,Fu).getRegex(),Cb=J("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Hu).replace(/punctSpace/g,rl).replace(/punct/g,zo).getRegex(),Bb=J(/\\(punct)/,"gu").replace(/punct/g,zo).getRegex(),Db=J(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Mb=J(ol).replace("(?:-->|$)","-->").getRegex(),jb=J("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Mb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vo=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Rb=J(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zu=J(/^!?\[(label)\]\[(ref)\]/).replace("label",Vo).replace("ref",sl).getRegex(),Vu=J(/^!?\[(ref)\](?:\[\])?/).replace("ref",sl).getRegex(),Pb=J("reflink|nolink(?!\\()","g").replace("reflink",zu).replace("nolink",Vu).getRegex(),ll={_backpedal:us,anyPunctuation:Bb,autolink:Db,blockSkip:Ib,br:Ou,code:kb,del:us,emStrongLDelim:Sb,emStrongRDelimAst:Lb,emStrongRDelimUnd:Cb,escape:wb,link:Rb,nolink:Vu,punctuation:_b,reflink:zu,reflinkSearch:Pb,tag:jb,text:$b,url:us},qb={...ll,link:J(/^!?\[(label)\]\((.*?)\)/).replace("label",Vo).getRegex(),reflink:J(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vo).getRegex()},cl={...ll,emStrongRDelimAst:Ab,emStrongLDelim:Tb,url:J(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Nb={...cl,br:J(Ou).replace("{2,}","*").getRegex(),text:J(cl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ko={normal:al,gfm:bb,pedantic:yb},ms={normal:ll,gfm:cl,breaks:Nb,pedantic:qb},Ob={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ku=e=>Ob[e];function Lt(e,t){if(t){if(Fe.escapeTest.test(e))return e.replace(Fe.escapeReplace,Ku)}else if(Fe.escapeTestNoEncode.test(e))return e.replace(Fe.escapeReplaceNoEncode,Ku);return e}function Wu(e){try{e=encodeURI(e).replace(Fe.percentDecode,"%")}catch{return null}return e}function Yu(e,t){var o;const n=e.replace(Fe.findPipe,(a,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Fe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Fe.slashPipe,"|");return i}function fs(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Hb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Qu(e,t,n,i,s){const o=t.href,a=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Fb(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(o=>{const a=o.match(n.other.beginningSpace);if(a===null)return o;const[r]=a;return r.length>=s.length?o.slice(s.length):o}).join(`
`)}var Wo=class{constructor(e){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=e||He}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:fs(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Fb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=fs(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fs(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=fs(t[0],`
`).split(`
`),i="",s="";const o=[];for(;n.length>0;){let a=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),a=!0;else if(!a)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,n.length===0)break;const f=o.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);o[o.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.list(b);o[o.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const o=this.rules.other.listItemRegex(n);let a=!1;for(;e;){let l=!1,c="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,x=>" ".repeat(3*x.length)),f=e.split(`
`,1)[0],g=!p.trim(),b=0;if(this.options.pedantic?(b=2,d=p.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=p.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const x=this.rules.other.nextBulletRegex(b),w=this.rules.other.hrRegex(b),E=this.rules.other.fencesBeginRegex(b),L=this.rules.other.headingBeginRegex(b),V=this.rules.other.htmlBeginRegex(b);for(;e;){const D=e.split(`
`,1)[0];let N;if(f=D,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),N=f):N=f.replace(this.rules.other.tabCharGlobal,"    "),E.test(f)||L.test(f)||V.test(f)||x.test(f)||w.test(f))break;if(N.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+N.slice(b);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(p)||L.test(p)||w.test(p))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=D+`
`,e=e.substring(D.length+1),p=N.slice(b)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0));let y=null,$;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&($=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:$,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var a;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Yu(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(const r of s)o.rows.push(Yu(r,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const o=fs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{const o=Hb(t[2],"()");if(o===-2)return;if(o>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Qu(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Qu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const o=[...i[0]].length-1;let a,r,l=o,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(i=d.exec(t))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(r=[...a].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&o%3&&!((o+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const p=[...i[0]][0].length,f=e.slice(0,o+i.index+p+r);if(Math.min(o,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Kt=class Mu{constructor(t){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"tokenizer");ce(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||He,this.options.tokenizer=this.options.tokenizer||new Wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Fe,block:Ko.normal,inline:ms.normal};this.options.pedantic?(n.block=Ko.pedantic,n.inline=ms.pedantic):this.options.gfm&&(n.block=Ko.gfm,this.options.breaks?n.inline=ms.breaks:n.inline=ms.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ko,inline:ms}}static lex(t,n){return new Mu(n).lex(t)}static lexInline(t,n){return new Mu(n).inlineTokens(t)}lex(t){t=t.replace(Fe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,a;for(this.options.pedantic&&(t=t.replace(Fe.tabCharGlobal,"    ").replace(Fe.spaceLine,""));t;){let r;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let o=!1,a="";for(;t;){o||(a=""),o=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,a)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(a=d.raw.slice(-1)),o=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Yo=class{constructor(e){ce(this,"options");ce(this,"parser");this.options=e||He}space(e){return""}code({text:e,lang:t,escaped:n}){var o;const i=(o=(t||"").match(Fe.notSpaceStart))==null?void 0:o[0],s=e.replace(Fe.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Lt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Wu(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Lt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Wu(e);if(s===null)return Lt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Lt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Lt(e.text)}},dl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Wt=class ju{constructor(t){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=t||He,this.options.renderer=this.options.renderer||new Yo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new dl}static parse(t,n){return new ju(n).parse(t)}static parseInline(t,n){return new ju(n).parseInline(t)}parse(t,n=!0){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;a+1<t.length&&t[a+1].type==="text";)c=t[++a],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Qo=(ku=class{constructor(e){ce(this,"options");ce(this,"block");this.options=e||He}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Kt.lex:Kt.lexInline}provideParser(){return this.block?Wt.parse:Wt.parseInline}},ce(ku,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ku),Ub=class{constructor(...e){ce(this,"defaults",Vt());ce(this,"options",this.setOptions);ce(this,"parse",this.parseMarkdown(!0));ce(this,"parseInline",this.parseMarkdown(!1));ce(this,"Parser",Wt);ce(this,"Renderer",Yo);ce(this,"TextRenderer",dl);ce(this,"Lexer",Kt);ce(this,"Tokenizer",Wo);ce(this,"Hooks",Qo);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{const a=o;for(const r of a.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of a.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const a=o;n=n.concat(this.walkTokens(a.items,t));break}default:{const a=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{const l=a[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let r=s.renderer.apply(this,a);return r===!1&&(r=o.apply(this,a)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Yo(this.defaults);for(const o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const a=o,r=n.renderer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Wo(this.defaults);for(const o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const a=o,r=n.tokenizer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Qo;for(const o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const a=o,r=n.hooks[a],l=s[a];Qo.passThroughHooks.has(o)?s[a]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(p=>l.call(s,p));const d=r.call(s,c);return l.call(s,d)}:s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(a){let r=[];return r.push(o.call(this,a)),s&&(r=r.concat(s.call(this,a))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Kt.lex(e,t??this.defaults)}parser(e,t){return Wt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},o={...this.defaults,...s},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const r=o.hooks?o.hooks.provideLexer():e?Kt.lex:Kt.lexInline,l=o.hooks?o.hooks.provideParser():e?Wt.parse:Wt.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(n):n).then(c=>r(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>l(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(a);try{o.hooks&&(n=o.hooks.preprocess(n));let c=r(n,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let d=l(c,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(c){return a(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Lt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Dn=new Ub;function Q(e,t){return Dn.parse(e,t)}Q.options=Q.setOptions=function(e){return Dn.setOptions(e),Q.defaults=Dn.defaults,Bn(Q.defaults),Q},Q.getDefaults=Vt,Q.defaults=He,Q.use=function(...e){return Dn.use(...e),Q.defaults=Dn.defaults,Bn(Q.defaults),Q},Q.walkTokens=function(e,t){return Dn.walkTokens(e,t)},Q.parseInline=Dn.parseInline,Q.Parser=Wt,Q.parser=Wt.parse,Q.Renderer=Yo,Q.TextRenderer=dl,Q.Lexer=Kt,Q.lexer=Kt.lex,Q.Tokenizer=Wo,Q.Hooks=Qo,Q.parse=Q,Q.options,Q.setOptions,Q.use,Q.walkTokens,Q.parseInline,Wt.parse,Kt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Zu,setPrototypeOf:Xu,isFrozen:Gb,getPrototypeOf:zb,getOwnPropertyDescriptor:Vb}=Object;let{freeze:Ue,seal:ct,create:ul}=Object,{apply:pl,construct:ml}=typeof Reflect<"u"&&Reflect;Ue||(Ue=function(t){return t}),ct||(ct=function(t){return t}),pl||(pl=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)}),ml||(ml=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Zo=ze(Array.prototype.forEach),Kb=ze(Array.prototype.lastIndexOf),Ju=ze(Array.prototype.pop),gs=ze(Array.prototype.push),Wb=ze(Array.prototype.splice),Xo=ze(String.prototype.toLowerCase),fl=ze(String.prototype.toString),gl=ze(String.prototype.match),hs=ze(String.prototype.replace),Yb=ze(String.prototype.indexOf),Qb=ze(String.prototype.trim),vt=ze(Object.prototype.hasOwnProperty),Ge=ze(RegExp.prototype.test),vs=Zb(TypeError);function ze(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return pl(e,t,i)}}function Zb(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ml(e,n)}}function U(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xo;Xu&&Xu(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Gb(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Xb(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function At(e){const t=ul(null);for(const[n,i]of Zu(e))vt(e,n)&&(Array.isArray(i)?t[n]=Xb(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=At(i):t[n]=i);return t}function bs(e,t){for(;e!==null;){const i=Vb(e,t);if(i){if(i.get)return ze(i.get);if(typeof i.value=="function")return ze(i.value)}e=zb(e)}function n(){return null}return n}const ep=Ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hl=Ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vl=Ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Jb=Ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bl=Ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ey=Ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),tp=Ue(["#text"]),np=Ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yl=Ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ip=Ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Jo=Ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ty=ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ny=ct(/<%[\w\W]*|[\w\W]*%>/gm),iy=ct(/\$\{[\w\W]*/gm),sy=ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),oy=ct(/^aria-[\-\w]+$/),sp=ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ay=ct(/^(?:\w+script|data):/i),ry=ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),op=ct(/^html$/i),ly=ct(/^[a-z][.\w]*(-[.\w]+)+$/i);var ap=Object.freeze({__proto__:null,ARIA_ATTR:oy,ATTR_WHITESPACE:ry,CUSTOM_ELEMENT:ly,DATA_ATTR:sy,DOCTYPE_NAME:op,ERB_EXPR:ny,IS_ALLOWED_URI:sp,IS_SCRIPT_OR_DATA:ay,MUSTACHE_EXPR:ty,TMPLIT_EXPR:iy});const ys={element:1,text:3,progressingInstruction:7,comment:8,document:9},cy=function(){return typeof window>"u"?null:window},dy=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},rp=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function lp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:cy();const t=R=>lp(R);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==ys.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=bs(b,"cloneNode"),$=bs(b,"remove"),x=bs(b,"nextSibling"),w=bs(b,"childNodes"),E=bs(b,"parentNode");if(typeof a=="function"){const R=n.createElement("template");R.content&&R.content.ownerDocument&&(n=R.content.ownerDocument)}let L,V="";const{implementation:D,createNodeIterator:N,createDocumentFragment:K,getElementsByTagName:Y}=n,{importNode:P}=i;let Z=rp();t.isSupported=typeof Zu=="function"&&typeof E=="function"&&D&&D.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:I,ERB_EXPR:B,TMPLIT_EXPR:j,DATA_ATTR:me,ARIA_ATTR:ve,IS_SCRIPT_OR_DATA:Se,ATTR_WHITESPACE:Ut,CUSTOM_ELEMENT:C}=ap;let{IS_ALLOWED_URI:he}=ap,te=null;const oe=U({},[...ep,...hl,...vl,...bl,...tp]);let _e=null;const Hv=U({},[...np,...yl,...ip,...Jo]);let be=Object.seal(ul(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ho=null,$u=null;const ss=Object.seal(ul(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Fv=!0,_u=!0,Uv=!1,Gv=!0,os=!1,Yr=!0,oi=!1,Eu=!1,xu=!1,as=!1,Qr=!1,Zr=!1,zv=!0,Vv=!1;const jT="user-content-";let Iu=!0,Fo=!1,rs={},Gt=null;const Su=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Kv=null;const Wv=U({},["audio","video","img","source","image","track"]);let Tu=null;const Yv=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Xr="http://www.w3.org/1998/Math/MathML",Jr="http://www.w3.org/2000/svg",cn="http://www.w3.org/1999/xhtml";let ls=cn,Lu=!1,Au=null;const RT=U({},[Xr,Jr,cn],fl);let el=U({},["mi","mo","mn","ms","mtext"]),tl=U({},["annotation-xml"]);const PT=U({},["title","style","font","a","script"]);let Uo=null;const qT=["application/xhtml+xml","text/html"],NT="text/html";let Te=null,cs=null;const OT=n.createElement("form"),Qv=function(v){return v instanceof RegExp||v instanceof Function},Cu=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(cs&&cs===v)){if((!v||typeof v!="object")&&(v={}),v=At(v),Uo=qT.indexOf(v.PARSER_MEDIA_TYPE)===-1?NT:v.PARSER_MEDIA_TYPE,Te=Uo==="application/xhtml+xml"?fl:Xo,te=vt(v,"ALLOWED_TAGS")?U({},v.ALLOWED_TAGS,Te):oe,_e=vt(v,"ALLOWED_ATTR")?U({},v.ALLOWED_ATTR,Te):Hv,Au=vt(v,"ALLOWED_NAMESPACES")?U({},v.ALLOWED_NAMESPACES,fl):RT,Tu=vt(v,"ADD_URI_SAFE_ATTR")?U(At(Yv),v.ADD_URI_SAFE_ATTR,Te):Yv,Kv=vt(v,"ADD_DATA_URI_TAGS")?U(At(Wv),v.ADD_DATA_URI_TAGS,Te):Wv,Gt=vt(v,"FORBID_CONTENTS")?U({},v.FORBID_CONTENTS,Te):Su,Ho=vt(v,"FORBID_TAGS")?U({},v.FORBID_TAGS,Te):At({}),$u=vt(v,"FORBID_ATTR")?U({},v.FORBID_ATTR,Te):At({}),rs=vt(v,"USE_PROFILES")?v.USE_PROFILES:!1,Fv=v.ALLOW_ARIA_ATTR!==!1,_u=v.ALLOW_DATA_ATTR!==!1,Uv=v.ALLOW_UNKNOWN_PROTOCOLS||!1,Gv=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,os=v.SAFE_FOR_TEMPLATES||!1,Yr=v.SAFE_FOR_XML!==!1,oi=v.WHOLE_DOCUMENT||!1,as=v.RETURN_DOM||!1,Qr=v.RETURN_DOM_FRAGMENT||!1,Zr=v.RETURN_TRUSTED_TYPE||!1,xu=v.FORCE_BODY||!1,zv=v.SANITIZE_DOM!==!1,Vv=v.SANITIZE_NAMED_PROPS||!1,Iu=v.KEEP_CONTENT!==!1,Fo=v.IN_PLACE||!1,he=v.ALLOWED_URI_REGEXP||sp,ls=v.NAMESPACE||cn,el=v.MATHML_TEXT_INTEGRATION_POINTS||el,tl=v.HTML_INTEGRATION_POINTS||tl,be=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&Qv(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&Qv(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),os&&(_u=!1),Qr&&(as=!0),rs&&(te=U({},tp),_e=[],rs.html===!0&&(U(te,ep),U(_e,np)),rs.svg===!0&&(U(te,hl),U(_e,yl),U(_e,Jo)),rs.svgFilters===!0&&(U(te,vl),U(_e,yl),U(_e,Jo)),rs.mathMl===!0&&(U(te,bl),U(_e,ip),U(_e,Jo))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?ss.tagCheck=v.ADD_TAGS:(te===oe&&(te=At(te)),U(te,v.ADD_TAGS,Te))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?ss.attributeCheck=v.ADD_ATTR:(_e===Hv&&(_e=At(_e)),U(_e,v.ADD_ATTR,Te))),v.ADD_URI_SAFE_ATTR&&U(Tu,v.ADD_URI_SAFE_ATTR,Te),v.FORBID_CONTENTS&&(Gt===Su&&(Gt=At(Gt)),U(Gt,v.FORBID_CONTENTS,Te)),v.ADD_FORBID_CONTENTS&&(Gt===Su&&(Gt=At(Gt)),U(Gt,v.ADD_FORBID_CONTENTS,Te)),Iu&&(te["#text"]=!0),oi&&U(te,["html","head","body"]),te.table&&(U(te,["tbody"]),delete Ho.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw vs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw vs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=v.TRUSTED_TYPES_POLICY,V=L.createHTML("")}else L===void 0&&(L=dy(g,s)),L!==null&&typeof V=="string"&&(V=L.createHTML(""));Ue&&Ue(v),cs=v}},Zv=U({},[...hl,...vl,...Jb]),Xv=U({},[...bl,...ey]),HT=function(v){let S=E(v);(!S||!S.tagName)&&(S={namespaceURI:ls,tagName:"template"});const M=Xo(v.tagName),fe=Xo(S.tagName);return Au[v.namespaceURI]?v.namespaceURI===Jr?S.namespaceURI===cn?M==="svg":S.namespaceURI===Xr?M==="svg"&&(fe==="annotation-xml"||el[fe]):!!Zv[M]:v.namespaceURI===Xr?S.namespaceURI===cn?M==="math":S.namespaceURI===Jr?M==="math"&&tl[fe]:!!Xv[M]:v.namespaceURI===cn?S.namespaceURI===Jr&&!tl[fe]||S.namespaceURI===Xr&&!el[fe]?!1:!Xv[M]&&(PT[M]||!Zv[M]):!!(Uo==="application/xhtml+xml"&&Au[v.namespaceURI]):!1},zt=function(v){gs(t.removed,{element:v});try{E(v).removeChild(v)}catch{$(v)}},ai=function(v,S){try{gs(t.removed,{attribute:S.getAttributeNode(v),from:S})}catch{gs(t.removed,{attribute:null,from:S})}if(S.removeAttribute(v),v==="is")if(as||Qr)try{zt(S)}catch{}else try{S.setAttribute(v,"")}catch{}},Jv=function(v){let S=null,M=null;if(xu)v="<remove></remove>"+v;else{const Ee=gl(v,/^[\r\n\t ]+/);M=Ee&&Ee[0]}Uo==="application/xhtml+xml"&&ls===cn&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const fe=L?L.createHTML(v):v;if(ls===cn)try{S=new f().parseFromString(fe,Uo)}catch{}if(!S||!S.documentElement){S=D.createDocument(ls,"template",null);try{S.documentElement.innerHTML=Lu?V:fe}catch{}}const Oe=S.body||S.documentElement;return v&&M&&Oe.insertBefore(n.createTextNode(M),Oe.childNodes[0]||null),ls===cn?Y.call(S,oi?"html":"body")[0]:oi?S.documentElement:Oe},eb=function(v){return N.call(v.ownerDocument||v,v,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Bu=function(v){return v instanceof p&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof d)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},tb=function(v){return typeof r=="function"&&v instanceof r};function dn(R,v,S){Zo(R,M=>{M.call(t,v,S,cs)})}const nb=function(v){let S=null;if(dn(Z.beforeSanitizeElements,v,null),Bu(v))return zt(v),!0;const M=Te(v.nodeName);if(dn(Z.uponSanitizeElement,v,{tagName:M,allowedTags:te}),Yr&&v.hasChildNodes()&&!tb(v.firstElementChild)&&Ge(/<[/\w!]/g,v.innerHTML)&&Ge(/<[/\w!]/g,v.textContent)||v.nodeType===ys.progressingInstruction||Yr&&v.nodeType===ys.comment&&Ge(/<[/\w]/g,v.data))return zt(v),!0;if(!(ss.tagCheck instanceof Function&&ss.tagCheck(M))&&(!te[M]||Ho[M])){if(!Ho[M]&&sb(M)&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,M)||be.tagNameCheck instanceof Function&&be.tagNameCheck(M)))return!1;if(Iu&&!Gt[M]){const fe=E(v)||v.parentNode,Oe=w(v)||v.childNodes;if(Oe&&fe){const Ee=Oe.length;for(let at=Ee-1;at>=0;--at){const un=y(Oe[at],!0);un.__removalCount=(v.__removalCount||0)+1,fe.insertBefore(un,x(v))}}}return zt(v),!0}return v instanceof l&&!HT(v)||(M==="noscript"||M==="noembed"||M==="noframes")&&Ge(/<\/no(script|embed|frames)/i,v.innerHTML)?(zt(v),!0):(os&&v.nodeType===ys.text&&(S=v.textContent,Zo([I,B,j],fe=>{S=hs(S,fe," ")}),v.textContent!==S&&(gs(t.removed,{element:v.cloneNode()}),v.textContent=S)),dn(Z.afterSanitizeElements,v,null),!1)},ib=function(v,S,M){if(zv&&(S==="id"||S==="name")&&(M in n||M in OT))return!1;if(!(_u&&!$u[S]&&Ge(me,S))){if(!(Fv&&Ge(ve,S))){if(!(ss.attributeCheck instanceof Function&&ss.attributeCheck(S,v))){if(!_e[S]||$u[S]){if(!(sb(v)&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,v)||be.tagNameCheck instanceof Function&&be.tagNameCheck(v))&&(be.attributeNameCheck instanceof RegExp&&Ge(be.attributeNameCheck,S)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(S,v))||S==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,M)||be.tagNameCheck instanceof Function&&be.tagNameCheck(M))))return!1}else if(!Tu[S]){if(!Ge(he,hs(M,Ut,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&v!=="script"&&Yb(M,"data:")===0&&Kv[v])){if(!(Uv&&!Ge(Se,hs(M,Ut,"")))){if(M)return!1}}}}}}}return!0},sb=function(v){return v!=="annotation-xml"&&gl(v,C)},ob=function(v){dn(Z.beforeSanitizeAttributes,v,null);const{attributes:S}=v;if(!S||Bu(v))return;const M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0};let fe=S.length;for(;fe--;){const Oe=S[fe],{name:Ee,namespaceURI:at,value:un}=Oe,ds=Te(Ee),Du=un;let Re=Ee==="value"?Du:Qb(Du);if(M.attrName=ds,M.attrValue=Re,M.keepAttr=!0,M.forceKeepAttr=void 0,dn(Z.uponSanitizeAttribute,v,M),Re=M.attrValue,Vv&&(ds==="id"||ds==="name")&&(ai(Ee,v),Re=jT+Re),Yr&&Ge(/((--!?|])>)|<\/(style|title|textarea)/i,Re)){ai(Ee,v);continue}if(ds==="attributename"&&gl(Re,"href")){ai(Ee,v);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){ai(Ee,v);continue}if(!Gv&&Ge(/\/>/i,Re)){ai(Ee,v);continue}os&&Zo([I,B,j],rb=>{Re=hs(Re,rb," ")});const ab=Te(v.nodeName);if(!ib(ab,ds,Re)){ai(Ee,v);continue}if(L&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!at)switch(g.getAttributeType(ab,ds)){case"TrustedHTML":{Re=L.createHTML(Re);break}case"TrustedScriptURL":{Re=L.createScriptURL(Re);break}}if(Re!==Du)try{at?v.setAttributeNS(at,Ee,Re):v.setAttribute(Ee,Re),Bu(v)?zt(v):Ju(t.removed)}catch{ai(Ee,v)}}dn(Z.afterSanitizeAttributes,v,null)},FT=function R(v){let S=null;const M=eb(v);for(dn(Z.beforeSanitizeShadowDOM,v,null);S=M.nextNode();)dn(Z.uponSanitizeShadowNode,S,null),nb(S),ob(S),S.content instanceof o&&R(S.content);dn(Z.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(R){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,M=null,fe=null,Oe=null;if(Lu=!R,Lu&&(R="<!-->"),typeof R!="string"&&!tb(R))if(typeof R.toString=="function"){if(R=R.toString(),typeof R!="string")throw vs("dirty is not a string, aborting")}else throw vs("toString is not a function");if(!t.isSupported)return R;if(Eu||Cu(v),t.removed=[],typeof R=="string"&&(Fo=!1),Fo){if(R.nodeName){const un=Te(R.nodeName);if(!te[un]||Ho[un])throw vs("root node is forbidden and cannot be sanitized in-place")}}else if(R instanceof r)S=Jv("<!---->"),M=S.ownerDocument.importNode(R,!0),M.nodeType===ys.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?S=M:S.appendChild(M);else{if(!as&&!os&&!oi&&R.indexOf("<")===-1)return L&&Zr?L.createHTML(R):R;if(S=Jv(R),!S)return as?null:Zr?V:""}S&&xu&&zt(S.firstChild);const Ee=eb(Fo?R:S);for(;fe=Ee.nextNode();)nb(fe),ob(fe),fe.content instanceof o&&FT(fe.content);if(Fo)return R;if(as){if(Qr)for(Oe=K.call(S.ownerDocument);S.firstChild;)Oe.appendChild(S.firstChild);else Oe=S;return(_e.shadowroot||_e.shadowrootmode)&&(Oe=P.call(i,Oe,!0)),Oe}let at=oi?S.outerHTML:S.innerHTML;return oi&&te["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Ge(op,S.ownerDocument.doctype.name)&&(at="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+at),os&&Zo([I,B,j],un=>{at=hs(at,un," ")}),L&&Zr?L.createHTML(at):at},t.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Cu(R),Eu=!0},t.clearConfig=function(){cs=null,Eu=!1},t.isValidAttribute=function(R,v,S){cs||Cu({});const M=Te(R),fe=Te(v);return ib(M,fe,S)},t.addHook=function(R,v){typeof v=="function"&&gs(Z[R],v)},t.removeHook=function(R,v){if(v!==void 0){const S=Kb(Z[R],v);return S===-1?void 0:Wb(Z[R],S,1)[0]}return Ju(Z[R])},t.removeHooks=function(R){Z[R]=[]},t.removeAllHooks=function(){Z=rp()},t}var cp=lp();const wl="chaotic_";function et(e){try{return localStorage.getItem(wl+e)}catch{return null}}function dt(e,t){try{localStorage.setItem(wl+e,t)}catch{}}function Ct(e){try{localStorage.removeItem(wl+e)}catch{}}function kl(){return et("token")}function uy(e){e?dt("token",e):Ct("token")}function py(){return et("theme")}function my(e){dt("theme",e)}function dp(){return et("last_project")}function up(e){dt("last_project",e)}function fy(){return et("onboarding_complete")==="true"}function gy(){dt("onboarding_complete","true")}function hy(){Ct("onboarding_complete")}function vy(e){return e?et(`issues_filters_${e}`):null}function by(e,t){e&&(t?dt(`issues_filters_${e}`,t):Ct(`issues_filters_${e}`))}function pp(e){return et(`comment_draft_${e}`)}function ea(e,t){t?dt(`comment_draft_${e}`,t):Ct(`comment_draft_${e}`)}function mp(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function ws(e){const t=et(`description_draft_${e}`);if(!t)return null;const n=mp(t);return n?n.draft:t}function fp(e){const t=et(`description_draft_${e}`);if(!t)return null;const n=mp(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Mn(e,t,n=""){t?dt(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ct(`description_draft_${e}`)}function gp(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function hp(e){var n;const t=et(`document_draft_${e}`);return t?((n=gp(t))==null?void 0:n.draft)??null:null}function yy(e){const t=et(`document_draft_${e}`);if(!t)return null;const n=gp(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function ta(e,t,n=null){t&&(t.title||t.content||t.icon)?dt(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ct(`document_draft_${e}`)}function wy(){return{title:et("create_issue_title"),description:et("create_issue_description")}}function vp(e,t){e?dt("create_issue_title",e):Ct("create_issue_title"),t?dt("create_issue_description",t):Ct("create_issue_description")}function ky(){Ct("create_issue_title"),Ct("create_issue_description")}function $y(){return et("doc_view_mode")}function _y(e){dt("doc_view_mode",e)}function Ey(){return et("composer_mode")==="markdown"?"markdown":"rich"}function bp(e){dt("composer_mode",e==="markdown"?"markdown":"rich")}const xy="chaotic-boot-cache",$l="snapshot",_l="last",yp=1,Iy=336*60*60*1e3,Sy=250;let jn=null;function Ty(){return jn||(jn=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(xy,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore($l),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),jn=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),jn.catch(()=>{jn=null}),jn)}function El(e,t){return Ty().then(n=>new Promise((i,s)=>{const o=n.transaction($l,e),a=t(o.objectStore($l));o.oncomplete=()=>i(a==null?void 0:a.result),o.onerror=()=>s(o.error),o.onabort=()=>s(o.error)}))}function wp(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Ly(e){if(!e)return Promise.resolve(null);const t=El("readonly",i=>i.get(_l)).then(i=>!i||i.version!==yp||i.userId!==e||!(Date.now()-i.savedAt<Iy)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Sy));return Promise.race([t,n])}function Ay(e,t){if(!e)return Promise.resolve();const n={...t,version:yp,userId:e,savedAt:Date.now()};return El("readwrite",i=>i.put(n,_l)).then(()=>{},()=>{})}function xl(){return El("readwrite",e=>e.delete(_l)).then(()=>{},()=>{})}const ks=/^[0-9a-f-]{36}$/,Cy=/^\/api\/attachments\/([0-9a-f-]{36})\/content$/;function kp(e){if(typeof e!="string"||e==="")return null;const t=window.location.origin;let n;try{n=new URL(e,t)}catch{return null}if(n.origin!==t||n.search!==""||n.hash!==""||n.username||n.password)return null;const i=Cy.exec(n.pathname);return i?i[1]:null}function By(e){for(const t of e.querySelectorAll("img[src]")){const n=kp(t.getAttribute("src"));n&&(t.removeAttribute("src"),t.removeAttribute("srcset"),t.setAttribute("data-attachment-id",n),t.classList.add("attachment-inline"),!t.closest("a[href]")&&(t.setAttribute("data-action","open-attachment"),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label",`View ${t.getAttribute("alt")||"image"}`)))}for(const t of e.querySelectorAll("a[href]")){const n=kp(t.getAttribute("href"));n&&(t.setAttribute("data-attachment-ref",n),t.setAttribute("data-action","open-attachment"),t.classList.add("attachment-link"))}}const $p="/api";class Dy{constructor(){this.token=kl()}setToken(t){this.token=t,uy(t)}getToken(){return this.token}async request(t,n,i=null,{headers:s=null}={}){const o={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(o.Authorization=`Bearer ${this.token}`),s&&Object.assign(o,s);const a={method:t,headers:o},r=typeof Blob<"u"&&i instanceof Blob;r&&(o["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=r?i:JSON.stringify(i));let l;try{l=await fetch(`${$p}${n}`,a)}catch(d){const p=new Error("Network error - check your connection");throw p.isNetworkError=!0,p.cause=d,p}if(l.status===204)return null;let c;try{c=await l.json()}catch{const d=l.headers.get("content-type")||"unknown";throw l.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${l.status})`)}if(!l.ok){let d;typeof c.detail=="string"?d=c.detail:c.detail&&typeof c.detail=="object"&&c.detail.message?d=c.detail.message:d="An error occurred";const p=new Error(d);throw p.status=l.status,p.detail=c.detail,p}return c}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),xl()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async uploadAgentAvatar(t,n){return this.request("PUT",`/agents/${t}/avatar`,n)}async deleteAgentAvatar(t){return this.request("DELETE",`/agents/${t}/avatar`)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(o=>n.append(i,o)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:o=null,skip:a=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),o&&c.set("order",o),c.set("skip",String(a)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,o=50){let a=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${o}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,o])=>{o==null||o===""||(Array.isArray(o)?o.forEach(a=>i.append(s,a)):i.append(s,o))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let o=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getEpicOverview(t,{activitySkip:n=0,activityLimit:i=50}={}){const s=new URLSearchParams({activity_skip:n,activity_limit:i});return this.request("GET",`/issues/${t}/epic-overview?${s.toString()}`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getAttachments(t){return this.request("GET",`/issues/${t}/attachments`)}async uploadAttachment(t,n,{idempotencyKey:i}={}){const s=encodeURIComponent(n.name||"file"),o=i?{"Idempotency-Key":i}:null;return this.request("POST",`/issues/${t}/attachments?filename=${s}`,n,{headers:o})}async deleteAttachment(t){return this.request("DELETE",`/attachments/${encodeURIComponent(t)}`)}async fetchAttachmentContent(t){if(!ks.test(t))throw new Error("Not an attachment id");const n={};this.token&&(n.Authorization=`Bearer ${this.token}`);let i;try{i=await fetch(`${$p}/attachments/${t}/content`,{headers:n,credentials:"same-origin",redirect:"error"})}catch(s){const o=new Error("Network error - check your connection");throw o.isNetworkError=!0,o.cause=s,o}if(!i.ok){let s=null;try{s=(await i.json()).detail}catch{}const o=typeof s=="string"?s:(s==null?void 0:s.message)||`Request failed (${i.status})`,a=new Error(o);throw a.status=i.status,a.detail=s,a}return i.blob()}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let o=`/teams/${t}/documents`;const a=[];return n&&a.push(`project_id=${n}`),s&&a.push(`sprint_id=${s}`),i&&a.push(`search=${encodeURIComponent(i)}`),a.length&&(o+=`?${a.join("&")}`),this.request("GET",o)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/teams/${t}/agents`,o)}async createProjectAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/projects/${t}/agents`,o)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,kinds:i=null,includeArchived:s=!1,skip:o=0,limit:a=50}={}){const r=new URLSearchParams({team_id:t,skip:o,limit:a});n&&r.set("unread","true"),s&&r.set("include_archived","true");for(const l of i||[])r.append("kind",l);return this.request("GET",`/inbox?${r.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new Dy;function Ve(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Pe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Le(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ae(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function My(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function qe(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),o=Math.floor(i/36e5),a=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:a<7?`${a}d ago`:t.toLocaleDateString()}function bt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Il=/^\/api\/avatars\/[0-9a-f]{64}$/;function _p(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Il.test(e))}function yt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?_p(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Ep(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function na(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return Ep(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}const jy=7,Sl=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),xp=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),Ry='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',Py='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Ip=!1;function qy(){Ip||(Ip=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Sl,set(e){var t;Sl.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...xp,set(e){var t;xp.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let ye=null,Ny=0;function Tl({restoreFocus:e=!0}={}){return ye?(ye.close(e),!0):!1}function Oy(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if((ye==null?void 0:ye.select)!==e){const s=document.activeElement;Ll(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function Hy(e=document){e.querySelectorAll("select[data-picker]").forEach(Sp)}function Sp(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${Ry}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Tp(e,t),(ye==null?void 0:ye.select)===e&&ye.refresh()};return e._picker={button:t,sync:n},qy(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(ye==null?void 0:ye.select)===e?Tl():Ll(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(ye==null?void 0:ye.select)!==e&&Ll(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function Tp(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",o=t.querySelector(".picker-label");o.textContent=i,s&&o.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const a=e.getAttribute("aria-label");a&&t.setAttribute("aria-label",i?`${a}: ${i}`:a)}function Lp(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function Fy(){const e=t=>{t.preventDefault(),t.stopPropagation()};document.addEventListener("click",e,{capture:!0,once:!0}),setTimeout(()=>document.removeEventListener("click",e,!0),1e3)}function Ll(e,t,n){Tl({restoreFocus:!1});const i=Lp(e),s=`picker-list-${++Ny}`,o=i.length>=jy,a=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${o?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=I=>Math.max(0,I.findIndex(B=>!B.disabled));let p=i.findIndex(I=>I.value===e.value&&!I.disabled);p===-1&&(p=d(i));let f=i;const g=()=>{var B;l.innerHTML=f.length?f.map((j,me)=>`
                <li role="option" id="${s}-${me}" class="picker-option${me===p?" active":""}${j.disabled?" disabled":""}"
                    data-index="${me}" data-value="${m(j.value)}"
                    aria-selected="${j.value===e.value?"true":"false"}"${j.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(j.text)}</span>
                    ${j.hint?`<span class="picker-option-hint">${u(j.hint)}</span>`:""}
                    ${j.value===e.value?`<span class="picker-check">${Py}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const I=l.querySelector(".picker-option.active");I?(c||l).setAttribute("aria-activedescendant",I.id):(c||l).removeAttribute("aria-activedescendant"),(B=I==null?void 0:I.scrollIntoView)==null||B.call(I,{block:"nearest"})},b=()=>{var he,te;const I=l.scrollTop,B=t.getBoundingClientRect(),j=((he=window.visualViewport)==null?void 0:he.width)||window.innerWidth,me=((te=window.visualViewport)==null?void 0:te.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(B.width,220),j-16)}px`,r.style.maxHeight="",r.style.top="0px";const ve=r.offsetWidth||Math.max(B.width,220),Se=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(B.left,j-ve-8))}px`;const Ut=me-B.bottom-12,C=B.top-12;if(Se>Ut&&C>Ut){const oe=Math.max(120,C);r.style.maxHeight=`${oe}px`,r.style.top=`${Math.max(8,B.top-4-Math.min(Se,oe))}px`}else r.style.maxHeight=`${Math.max(120,Ut)}px`,r.style.top=`${B.bottom+4}px`;l.scrollTop=I},y=I=>{if(!I||I.disabled||e.disabled)return;if(![...e.options].some(j=>j.value===I.value&&!j.disabled)){P(!0);return}const B=I.value!==e.value;Sl.set.call(e,I.value),Tp(e,t),P(!0),B&&e.dispatchEvent(new Event("change",{bubbles:!0}))},$=I=>{let B=p+I;for(;B>=0&&B<f.length&&f[B].disabled;)B+=I;B<0||B>=f.length||(p=B,g())},x=(I,B)=>{let j=I;for(;j>=0&&j<f.length&&f[j].disabled;)j+=B;j>=0&&j<f.length&&(p=j,g())},w=I=>{if(!(I.metaKey||I.ctrlKey))switch(I.stopPropagation(),I.key){case"ArrowDown":I.preventDefault(),$(1);break;case"ArrowUp":I.preventDefault(),$(-1);break;case"Home":c||(I.preventDefault(),x(0,1));break;case"End":c||(I.preventDefault(),x(f.length-1,-1));break;case"PageDown":I.preventDefault(),x(Math.min(f.length-1,p+8),-1);break;case"PageUp":I.preventDefault(),x(Math.max(0,p-8),1);break;case"Enter":I.preventDefault(),y(f[p]);break;case"Escape":I.preventDefault(),P(!0);break;case"Tab":P(!0);break;case" ":c||(I.preventDefault(),y(f[p]));break;default:if(!c&&I.key.length===1&&!I.metaKey&&!I.ctrlKey&&!I.altKey){E=(Date.now()-L<700?E:"")+I.key.toLowerCase(),L=Date.now();const B=f.findIndex(j=>!j.disabled&&j.text.toLowerCase().startsWith(E));B!==-1&&(p=B,g())}}};let E="",L=0;const V=()=>{const I=c.value.trim().toLowerCase();f=I?i.filter(j=>j.text.toLowerCase().includes(I)||j.hint.toLowerCase().includes(I)):i;const B=f.findIndex(j=>j.value===e.value&&!j.disabled);p=!I&&B!==-1?B:d(f),g()},D=I=>{if(r.contains(I.target)||t.contains(I.target))return;const B=t.closest("#modal-overlay");B&&B.contains(I.target)&&!I.target.closest(".modal")&&Fy(),P(!1)},N=I=>{(I==null?void 0:I.type)==="scroll"&&I.target instanceof Node&&r.contains(I.target)||b()},K=I=>{I.key!=="Escape"||r.contains(I.target)||(I.preventDefault(),I.stopPropagation(),P(!0))},Y=()=>P(!1);function P(I){var B,j;(ye==null?void 0:ye.popover)===r&&(ye=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",D,!0),document.removeEventListener("keydown",K,!0),window.removeEventListener("popstate",Y),window.removeEventListener("resize",N),window.removeEventListener("scroll",N,!0),I&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(j=(B=document.activeElement)==null?void 0:B.blur)==null||j.call(B)))}l.addEventListener("click",I=>{const B=I.target.closest(".picker-option");B&&y(f[Number(B.dataset.index)])}),l.addEventListener("mousemove",I=>{const B=I.target.closest(".picker-option");if(!B)return;const j=Number(B.dataset.index);j!==p&&(p=j,g())}),r.addEventListener("keydown",w),c&&c.addEventListener("input",V),document.addEventListener("pointerdown",D,!0),document.addEventListener("keydown",K,!0),window.addEventListener("popstate",Y),window.addEventListener("resize",N),window.addEventListener("scroll",N,!0),ye={select:e,button:t,popover:r,close:P,refresh:()=>{const I=Lp(e);!(I.length===i.length&&I.every((j,me)=>j.value===i[me].value&&j.text===i[me].text&&j.hint===i[me].hint&&j.disabled===i[me].disabled))||e.disabled?P(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),b(),(c||l).focus({preventScroll:!0})}let ri=null;const Uy='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let li=null,$s=!1;function Al(){$s=!0}function Gy(){$s=!1}function Ap(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function zy(){if($s)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function F(){li=document.activeElement,$s=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;Yt(),Tl({restoreFocus:!1}),$s=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),li&&document.contains(li)&&typeof li.focus=="function"&&li.focus(),li=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Uy);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())});function Ke(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const o=document.createElement("button");o.type="button",o.className="toast-close",o.setAttribute("aria-label","Dismiss"),o.textContent="×",i.appendChild(o),n.appendChild(i);const a=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),p=setTimeout(a,l);return o.addEventListener("click",()=>{clearTimeout(p),a()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),p=setTimeout(a,Math.max(c,500))}),i}function _s(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Vy(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function _(e,t){const n=Vy(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Yt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),ri&&(document.removeEventListener("keydown",ri),ri=null)}function Ky(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Yt(),t&&Ke()&&Ap()}function Es(e){ri&&document.removeEventListener("keydown",ri),ri=e,e&&document.addEventListener("keydown",e)}function xs(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Yt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}let ue={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Cl=new Set;function we(e,t){if(typeof e=="string"){const n=ue[e];ue[e]=t,Cp(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const o=ue[i];ue[i]=s,n.push({key:i,value:s,oldValue:o})}n.forEach(({key:i,value:s,oldValue:o})=>{Cp(i,s,o)})}}function wt(e){return Cl.add(e),()=>Cl.delete(e)}function Cp(e,t,n){t!==n&&Cl.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const re=()=>ue.currentUser,Bt=e=>we("currentUser",e),A=()=>ue.currentView,Rn=e=>we("currentView",e),ne=()=>ue.issues,tt=e=>we("issues",e),Is=()=>ue.detailNavContext,Dt=e=>we("detailNavContext",e),Bl=()=>ue.labels,Ss=e=>we("labels",e),Bp=()=>ue.activeFilterCategory,Wy=e=>we("activeFilterCategory",e),Dp=()=>ue.selectedIssueIndex,Pn=e=>we("selectedIssueIndex",e),Yy=()=>ue.selectedDocIndex,Mp=e=>we("selectedDocIndex",e),jp=()=>ue.selectedBoardIndex,ia=e=>we("selectedBoardIndex",e),Qy=()=>ue.selectedInboxIndex,sa=e=>we("selectedInboxIndex",e),Zy=()=>ue.selectedSprintIndex,Rp=e=>we("selectedSprintIndex",e),Xy=()=>ue.selectedEpicIndex,Ts=e=>we("selectedEpicIndex",e),ie=()=>ue.inboxEntries,Mt=e=>we("inboxEntries",e),oa=()=>ue.inboxUnreadCount,Ls=e=>we("inboxUnreadCount",e),Jy=()=>ue.searchDebounceTimer,ew=e=>we("searchDebounceTimer",e),tw=()=>ue.websocket,Dl=e=>we("websocket",e),T=()=>ue.currentTeam,ci=e=>we("currentTeam",e),X=()=>ue.currentProject,kt=e=>we("currentProject",e||null),xe=()=>ue.currentDetailIssue,di=e=>we("currentDetailIssue",e),nw=()=>ue.currentDetailSprints,Pp=e=>we("currentDetailSprints",e),Ml=["backlog","todo","in_progress","in_review","done","canceled"],As=["backlog","todo","in_progress","in_review"],qp=["urgent","high","medium","low","no_priority"],jl=["no_priority","urgent","high","medium","low"],Np=["backlog","todo","in_progress","in_review","done"],aa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function qn(e){if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||!!e.isContentEditable}const Rl={};function le(e){Object.assign(Rl,e)}function iw(e){var o;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target&&qn(e.target)||n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Rl[i];if(!s){typeof process<"u"&&((o=process.env)==null?void 0:o.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Op=!1;function sw(){if(!Op){Op=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,iw);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Rl[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function ow(e){const t=document.createElement("template");return t.innerHTML=e,By(t.content),t.innerHTML}function ut(e){if(!e)return"";try{Q.setOptions({breaks:!0,gfm:!0});const n=Q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;")),i=cp.sanitize(n,{FORCE_BODY:!0,ALLOW_DATA_ATTR:!1});return i.includes("/api/attachments/")?ow(i):i}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function aw(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),o=Math.floor(s/60),a=Math.floor(o/60),r=Math.floor(a/24);return s<60?"just now":o<60?`${o}m ago`:a<24?`${a}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function W({icon:e,heading:t,description:n,cta:i,variant:s}){const o=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${o}
        </div>
    `}const z={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},ra={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},la={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Hp=0;function Fp(e){Hp=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,o]=n.split("__");t+=Up(s,o,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Up(e="",t="",n=""){const i=Hp++,s=Object.keys(ra).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),a=(e?ra[e]:ra.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${la[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function rw(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Up()),ca()}function lw(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ca()}function cw(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const o=ra[s]||[];i.innerHTML=o.map(a=>`<option value="${a}">${la[a]}</option>`).join(""),Gp(e),ca()}function Gp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Cs(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ca(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function zp(){var i,s,o;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const a of e){const r=(i=a.querySelector(".condition-field"))==null?void 0:i.value,l=(s=a.querySelector(".condition-operator"))==null?void 0:s.value,c=a.querySelector(".condition-value");let d=(o=c==null?void 0:c.value)==null?void 0:o.trim();if(!r&&!l)continue;if(!r)throw Cs("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Cs("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw Cs(`Duplicate condition: ${r} ${la[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Cs(`Please enter a numeric value for ${r} ${la[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw Cs(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return ca(),Object.keys(t).length>0?t:null}le({"add-condition-row":()=>{rw()},"remove-condition-row":(e,t)=>{lw(Number(t.rowId))},"update-operator-options":(e,t)=>{cw(Number(t.rowId))},"toggle-value-input":(e,t)=>{Gp(Number(t.rowId))}});let Ce=[];const da="project-switcher",Pl="all";function ua(e=X()){const t=document.getElementById(da);t&&(t.value=e||"")}wt((e,t)=>{e==="currentProject"&&(t&&up(t),ua(t),Tw(t||""))});function Vp(){up(Pl),kt(null)}const pa={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function se(){return Ce}function dw(e){Ce=e}function ui(e){const t=Ce.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return pa[n]||pa.fibonacci}function pi(e,t){if(e==null)return"No estimate";const i=ui(t).find(s=>s.value===e);return i?i.label:`${e} points`}function ma(e,t){return e==null||e===0?!1:!ui(t).some(i=>i.value===e)}function uw(e){const t=Ce.find(a=>a.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(pa[n]||pa.fibonacci).filter(a=>a.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(a=>a.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function pt(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;Ce=i,Wp(),Kp()}catch(i){_("load projects",i)}}function Kp(){const e=X();if(e&&Ce.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Ce.some(s=>s.id===n)){kt(n);return}const i=dp();if(i===Pl){e&&kt(null);return}if(i&&Ce.some(s=>s.id===i)){kt(i);return}Ce.length>0&&kt(Ce[0].id)}function Wp(){const e=document.getElementById(da);e&&(e.innerHTML='<option value="">All projects</option>'+Ce.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),ua())}function Yp(){const e=dp();return e===Pl?null:e}function Nn(){const e=document.getElementById("projects-list");if(Ce.length===0){e.innerHTML=W({icon:z.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Ce.map(t=>`
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
    `).join("")}function pw(e){kt(e),O("issues")}function Qp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function mw(e){e.preventDefault();const t=T();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await pt(),Nn(),H(),k("Project created!","success")}catch(i){_("create project",i)}return!1}async function fw(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await pt(),Nn(),H(),k("Project updated!","success")}catch(i){_("update project",i)}return!1}async function gw(e){const t=Ce.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await pt(),Nn(),H(),k("Project deleted","success")}catch(n){_("delete project",n)}}let Be=null;function Zp(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function hw(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Be!==e.id)return;const i=n.filter(o=>o.id===e.default_epic_id||o.status!=="done"&&o.status!=="canceled"),s=e.default_epic_id&&!i.some(o=>o.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(o=>`<option value="${m(o.id)}">${u(o.identifier)} ${u(o.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function fa(e,{tab:t="general",replace:n=!1,onlyIfView:i}={}){if(Ce.length===0&&(await pt(),i&&A()!==i))return;e!==Be&&(Qt=[]),Be=e,Rn("projects");const s=Ce.find(r=>r.id===e);if(!s){k("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${s.name} Settings`,document.getElementById("ps-name").value=s.name||"",document.getElementById("ps-key").value=s.key||"",document.getElementById("ps-description").value=s.description||"",document.getElementById("ps-color").value=s.color||"#6366f1",document.getElementById("ps-estimate-scale").value=s.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=s.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=s.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=s.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=s.require_estimate_on_claim===!0,Zp("ps-require-assignee-on-claim",s.require_assignee_on_claim===!0),Zp("ps-require-epic-on-close",s.require_epic_on_close===!0),hw(s),document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden");const o=Jp(e,t),a=em(e,o.tab);n?window.history.replaceState(o,"",a):window.history.pushState(o,"",a),tm(t)}const Xp=["general","rules","sprint-rituals","close-rituals","claim-rituals"];function Jp(e,t){return{view:"project-settings",settingsProjectId:e,tab:Xp.includes(t)?t:"general"}}function em(e,t){const n=`/projects/${encodeURIComponent(e)}/settings`;return t==="general"?n:`${n}?tab=${t}`}function tm(e){Xp.includes(e)||(e="general");const t=Be;t&&window.location.pathname===`/projects/${encodeURIComponent(t)}/settings`&&window.history.replaceState(Jp(t,e),"",em(t,e)),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Qt||Qt.length===0)&&ga()}function vw(){Be=null,Qt=[]}async function bw(){if(!Be)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Be,t),await pt(),k("Settings saved","success");const n=Ce.find(i=>i.id===Be);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){_("save project settings",n)}}async function yw(){if(!Be)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const o=document.getElementById("ps-default-epic");o&&!o.disabled&&(n.default_epic_id=o.value||null);try{await h.updateProject(Be,n),await pt(),k("Settings saved","success")}catch(a){_("save settings",a)}}let Qt=[];async function ga(){const e=Be;if(!e)return!1;try{const t=await h.getRituals(e);return e!==Be?!1:(Qt=t,ww(),!0)}catch(t){return _("load rituals",t),!1}}function ww(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Qt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Qt.filter(i=>i.trigger==="ticket_close"),n=Qt.filter(i=>i.trigger==="ticket_claim");ql("ps-sprint-rituals-list",e,"sprint"),ql("ps-close-rituals-list",t,"close"),ql("ps-claim-rituals-list",n,"claim")}function ql(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const o={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${o[n]} rituals configured.</p>`;return}const s=o=>m(o||"auto");i.innerHTML=t.map(o=>{let a="";if(o.group_name){const r=o.weight!=null&&o.weight!==1?` w:${o.weight}`:o.percentage!=null?` ${o.percentage}%`:"";a=`<span class="badge badge-ritual-group">${u(o.group_name)}${r}</span>`}return`
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
  `}).join("")}async function kw(e){if(!Be)return;let t=[];try{t=await h.getRitualGroups(Be)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Fp(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,F()}function $w(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function _w(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const o=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",o!=="random_one"),i.classList.toggle("hidden",o!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function nm(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Be,{name:t,selection_mode:n})).id}return e.value||null}async function Ew(e){var s;e.preventDefault();let t;try{t=zp()}catch{return!1}let n;try{n=await nm()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const o=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(i.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(i.percentage=parseFloat(a.value))}try{await h.createRitual(Be,i),await ga(),H(),k("Ritual created!","success")}catch(o){_("create ritual",o)}return!1}async function xw(e){const t=Qt.find(a=>a.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Be)}catch{}const i=n.find(a=>a.id===t.group_id),s=i&&i.selection_mode==="random_one",o=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Fp(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,F()}async function Iw(e,t){var o;e.preventDefault();let n;try{n=zp()}catch{return!1}let i;try{i=await nm()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((o=document.getElementById("ritual-artifact"))==null?void 0:o.value)||null,conditions:n,group_id:i||""};if(i){const a=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(s.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await ga(),H(),k("Ritual updated!","success")}catch(a){_("update ritual",a)}return!1}async function Sw(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await ga(),k("Ritual deleted","success")}catch(n){_("delete ritual",n)}}le({"view-project":(e,t)=>{pw(t.projectId)},"view-project-settings":(e,t)=>{fa(t.projectId)},"create-project":e=>{mw(e)},"update-project":(e,t)=>{fw(e,t.projectId)},"confirm-delete-project":(e,t)=>{gw(t.projectId)},"edit-project-ritual":(e,t)=>{xw(t.ritualId)},"delete-project-ritual":(e,t)=>{Sw(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Ew(e)},"update-project-ritual":(e,t)=>{Iw(e,t.ritualId)},"toggle-ritual-conditions":()=>{$w()},"ritual-group-change":()=>{_w()}});function im(){const t=new URLSearchParams(window.location.search).get("project");return t||Yp()}function Tw(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Nl={},sm=new Map;let Ol=null,Hl=null,Fl=null,Ul=null,Gl=null,zl=null,Vl=null,om=!1;function Lw(e){Object.assign(Nl,e)}function Aw({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:o,beforeScrollRestore:a}={}){e&&(Ol=e),t&&(Hl=t),n&&(Fl=n),i&&(Ul=i),s&&(Gl=s),o&&(zl=o),a&&(Vl=a)}function am(){return Object.keys(Nl)}const Cw=["issues","query","board","sprints","epics","documents","rituals","my-issues"],rm={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"},Bw={board:"issues",rituals:"projects"};function Bs(e){const t=Bw[e]||e;document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)})}function lm(){Ol&&Ol()}function O(e,t=!0,{transition:n=!1}={}){if(t&&pn(),Rn(e),t){let o;const a=im();e==="my-issues"?o=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?o=`/issues${window.location.search}`:Cw.includes(e)&&a?o=`/${e}?project=${a}`:o=`/${e}`,history.pushState({view:e},"",o)}Bs(e),lm();const i=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const o=document.getElementById(`${e}-view`);o&&o.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Nl[e];s&&s(),t&&window.scrollTo(0,0)}const Ds={"gate-approvals":"inbox",approvals:"inbox",team:"people"},Dw=new Set(["team","approvals","gate-approvals"]),Mw={approvals:"kind=approvals","gate-approvals":"kind=approvals"};function cm(){var i;Rn(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":Ds[e[0]]||e[0],n=e.length<=1&&am().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Bs(t)):Bs(rm[e[0]]||null)}function Kl(){var i;const t=window.location.pathname.split("/").filter(Boolean);Ul&&Ul(),A()||Rn("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Hl&&Hl(t)){const s=rm[t[0]];s&&Bs(s);return}else{if(n=t[0],Ds[n]){if(t.length===1&&Dw.has(n)){const o=Mw[n]||window.location.search.slice(1);history.replaceState({view:Ds[n]},"",`/${Ds[n]}${o?`?${o}`:""}`)}n=Ds[n]}am().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function pn(){sm.set(window.location.href,window.scrollY)}function Wl(e){pn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Gl&&Gl(e)}function dm(e){pn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),zl&&zl(e)}function um(){const e=sm.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Vl&&Vl(),window.scrollTo(0,e)})}function pm(){om||(om=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Fl&&Fl(e.state)){um();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):Kl(),um()}))}let Yl=[];function jw(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Rw(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Ms(e,t){const n=e().map(jw),i=t().map(Rw);Yl=[...n,...i]}function jt(e){return e&&Yl.find(t=>t.id===e)||null}function $t(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function ha(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function js({includeIdle:e=!1,keepId:t=null}={}){const n=Yl.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),o=n.filter(b=>b.is_agent),a=new Set(o.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&a.has(b.registered_by_id),c=new Map,d=new Map;o.forEach(b=>{const[y,$]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has($)||y.set($,[]),y.get($).push(b)});const p=[],f=(b,y)=>{p.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(x=>p.push({assignee:x,indent:2}))};return i.forEach(b=>{p.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),o.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),p}function mi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;js({keepId:n}).forEach(({assignee:s,indent:o})=>{i+=`<option value="${m(s.id)}">${ha(s,o)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Pw(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&jt(e)&&mi({keepId:e}),t.value=e}let fi=[];function mt(){return fi}function qw(e){fi=Array.isArray(e)?e:[]}function Nw(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?_p(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Ow(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;fi=i,Ms(xt,mt),mi()}catch(i){console.error("Failed to load team agents:",i),_("load team agents",i)}}async function Rs(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{fi=await h.getTeamAgents(e),Ms(xt,mt),mi(),Hw()}catch(n){_("load agents",n)}}function Hw(){var o;const e=document.getElementById("agents-list");if(!e)return;const t=(o=re())==null?void 0:o.id,n=fi.filter(a=>a.parent_user_id===t&&a.kind!=="session");if(n.length===0){e.innerHTML=W({icon:z.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=se(),s=a=>{if(!a)return"Team-wide";const r=i.find(l=>l.id===a);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(a=>{const r=m(a.id),l=fi.filter(d=>d.registered_by_id===a.id).length,c=[s(a.agent_project_id),a.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Le(a.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${Nw(a)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(a.name)}${a.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function Fw(){const e=se();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),F()}function mm(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,F()}async function Uw(e){var r,l,c,d;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,o=(c=document.getElementById("agent-project"))==null?void 0:c.value,a=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let p;s&&o?p=await h.createProjectAgent(o,n,i,a):p=await h.createTeamAgent(t,n,i,a),H(),mm("Agent Created",p.api_key,!!p.can_register),await Rs(),va(p.id,{created:!0})}catch(p){_("create agent",p)}return!1}async function Gw(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);mm("New Agent Key",n.key),va(e,{credentials:!0})}catch(n){_("generate agent key",n)}}async function zw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await Rs(),va(e)}catch(s){_("change registrar",s)}}function va(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function Vw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Kw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),await Rs(),va(e,{deleted:!0})}catch(n){_("delete agent",n)}}le({"create-agent":e=>{Uw(e)},"copy-agent-key":()=>{Vw()},"dismiss-agent-modal":()=>{H(),Rs()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Kw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Gw(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||zw(t.agentId,t.agentName,t.canRegister!=="true")}});const fm=24,nt=new Map,ke=new Map,_t=new Map;let Zt=null;function Ww(e){return Array.isArray(e)?[...e].map(String).sort():e}function gm(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Ww(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ba(e,t){for(ke.delete(e),ke.set(e,t);ke.size>fm;){const n=ke.keys().next().value;ke.delete(n)}hm()}function hm(){if(nt.size===0)return;const e=new Set;ke.forEach(t=>t.ids.forEach(n=>e.add(n))),nt.forEach((t,n)=>{e.has(n)||nt.delete(n)})}function Yw(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function vm(e){const t=ke.get(e);return t?(ba(e,t),t.ids.map(n=>nt.get(n)).filter(Boolean)):null}function Ql(e){return nt.get(e)}function Qw(e){var t;return((t=ke.get(e))==null?void 0:t.meta)||{}}function bm(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Zl(e){const t=nt.get(e.id);if(!bm(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){nt.set(e.id,{...e,description:t.description});return}nt.set(e.id,e)}}const Xl=new Set;function Zw(e){return Xl.add(e),()=>Xl.delete(e)}function ym(e,t,n){if(!Array.isArray(t))return;const i=Yw(t);i.forEach(Zl);const s=ke.get(e);ba(e,{ids:i.map(o=>o.id),meta:n??(s==null?void 0:s.meta)??{}}),Xl.forEach(o=>{try{o(e)}catch(a){console.error(a)}})}function Xw(e,t){const n=ke.get(e);n&&(n.meta=t)}function ya(e){e!=null&&e.id&&nt.has(e.id)&&Zl(e)}function Jw(e){ke.delete(e),_t.forEach((t,n)=>{t===e&&_t.delete(n)}),Zt===e&&(Zt=null),hm()}function ek(e){nt.delete(e),ke.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function wa(e){Zt=e}function tk(){return Zt}function wm(e,t){for(_t.delete(e),_t.set(e,t);_t.size>fm;)_t.delete(_t.keys().next().value)}function nk(e){const t=_t.get(e);return t&&ke.has(t)?t:null}function ik({maxQueries:e=3}={}){const t=[...ke.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(o=>i.add(o))),{queries:t.map(([s,o])=>[s,{ids:[...o.ids],meta:o.meta||{}}]),entities:[...i].map(s=>nt.get(s)).filter(Boolean),views:[..._t.entries()].filter(([,s])=>n.has(s))}}function sk(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{ke.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Zl(t.get(s))}),ba(n,{ids:i.ids.filter(s=>nt.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!_t.has(n)&&ke.has(i)&&wm(n,i)})}function km(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function $m(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(km(e[n])!==km(t[n]))return!1;return!0}const _m=["status","priority"],Em=["assignee_id","sprint_id","issue_type"],ok={assignee_id:"unassigned",sprint_id:"no_sprint"},ak=["scope","project_id","sort_by","order","limit"],On=e=>(e||[]).map(t=>String(t).toLowerCase());function rk(e,t){if(e.search||t.search||t.sort_by==="random"||ak.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of _m)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of Em)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=On(e.label);if(!On(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=On(t.exclude_label);if(!On(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function xm(e){const t=e.label===void 0?null:On(e.label),n=e.exclude_label===void 0?null:On(e.exclude_label);return i=>{for(const s of _m)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of Em){if(e[s]===void 0)continue;const o=e[s]===ok[s]?null:e[s];if((i[s]??null)!==o)return!1}if(t||n){const s=On((i.labels||[]).map(o=>o.name));if(t&&!t.some(o=>s.includes(o))||n&&n.some(o=>s.includes(o)))return!1}return!0}}function lk(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(gm(e)));let n=null,i=null;if(ke.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}rk(c,t)&&(n=r,i=l)}),!n)return null;ba(i,n);const s=xm(t),o=n.ids.map(r=>nt.get(r)).filter(r=>r&&s(r)),a=t.limit;return{rows:o,complete:!(typeof a=="number"&&n.ids.length>=a)}}function ck(){nt.clear(),ke.clear(),_t.clear(),Zt=null}wt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ck();return}if(e!=="issues"||Zt===null||!ke.has(Zt)||A()!=="issues")return;const i=ke.get(Zt);ym(Zt,ne(),i.meta)});let Xt=0,gi=!1,Ps=null,ka=null,qs=0;const Hn=new Map;function $a(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Xt===0&&!gi),e.textContent=gi?"Stopped":"Offline",e.title=gi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function We(e,t){return Hn.has(e)||Hn.set(e,new Set),Hn.get(e).add(t),()=>{var n;return(n=Hn.get(e))==null?void 0:n.delete(t)}}function dk(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const uk=1e3;function _a(){ka&&(clearTimeout(ka),ka=null)}const pk="chaotic",Jl=4001,mk=4003,fk="chaotic.bearer.";function gk(e){return[pk,fk+e]}function Im(e,{isReconnect:t=!1}={}){Ps&&(clearTimeout(Ps),Ps=null),_a();const n=tw();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Dl(null)),!t&&(Xt>0||gi)&&(Xt=0,gi=!1,$a());const i=h.getToken();if(!i)return;const s=++qs,a=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(a,gk(i));Dl(r);let l=!1;const c=()=>{if(l||s!==qs)return;l=!0,_a();const d=Xt>0;d&&k("Live updates reconnected","success"),Xt=0,$a(),d&&ec({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===qs&&(console.log("WebSocket connected"),_a(),ka=setTimeout(c,uk))},r.onmessage=d=>{if(s!==qs)return;c();let p;try{p=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}ec(p)},r.onclose=d=>{if(s!==qs)return;console.log("WebSocket disconnected"),_a();const p=d==null?void 0:d.code;if(p===Jl||p===mk){Dl(null),Xt=0;const g=p===Jl&&kl()===i;gi=!g,$a();let b="forbidden";p===Jl&&(b=g?"unauthorized":"superseded"),ec({type:b,entity:"connection",data:{code:p,teamId:e}});return}Xt++,Xt===1&&k("Live updates disconnected. Reconnecting...","warning"),$a();const f=dk(Xt-1);Ps=setTimeout(()=>{Ps=null,T()&&T().id===e&&Im(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function ec(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},o=Hn.get(`${n}:${t}`);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const a=Hn.get(n);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Hn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}wt(e=>{e==="currentProject"&&A()==="rituals"&&queueMicrotask(()=>Sm())});async function Sm(){const e=X();if(e){Rn("projects"),await fa(e,{tab:"sprint-rituals",replace:!0,onlyIfView:"projects"});return}const t=document.getElementById("rituals-content");t&&(t.innerHTML=W({icon:z.projects,heading:"Select a project",description:"Rituals live in each project's settings. Pick a project in the sidebar switcher, or press P."}))}async function hk(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await Vs(),$c()}catch(n){_("approve ritual",n)}}function tc(e){return e==="document"?`
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
        `:""}function nc(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Tm(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${tc(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",o=>{vk(o,e,t,i,s,n)}),F()}async function vk(e,t,n,i="",s=null,o=""){e.preventDefault();const a=document.getElementById("gate-note").value,r=nc(i);if(r===void 0)return!1;try{if(await h.completeGateRitual(t,n,a||null,r),k(o?`Signed off on ${o}.`:"Signed off.","success"),await Vs(),s)return H(),await s(),!1;const l=m$();l&&!l.in_limbo?(H(),k("Limbo cleared! Next sprint is now active.","success")):$c()}catch(l){_("complete gate ritual",l)}return!1}function bk(e,t,n,i,s="",o=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${o?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${o?"required":""}></textarea>
            </div>
            ${tc(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",a=>{yk(a,e,t,s,o)}),F()}async function yk(e,t,n,i="",s=!0){e.preventDefault();const o=document.getElementById("attest-ritual-note").value.trim();if(s&&!o)return k("A note is required for this attestation.","error"),!1;const a=nc(i);if(a===void 0)return!1;try{await h.attestTicketRitual(t,n,o||null,a),k("Ritual attested!","success"),H(),await co(n)}catch(r){_("attest ticket ritual",r)}return!1}async function wk(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await co(t)}catch(n){_("attest ticket ritual",n)}}async function kk(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await co(t)}catch(n){_("approve ticket ritual",n)}}function Lm(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{$k(s,e,t,n,i)}),F()}async function $k(e,t,n,i,s=null){e.preventDefault();const o=document.getElementById("reject-ritual-note").value.trim();if(!o)return k("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,o),k(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(a){_("reject ritual",a)}return!1}function Am(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${tc(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",o=>{_k(o,e,t,i,s)}),F()}async function _k(e,t,n,i="",s=null){e.preventDefault();const o=document.getElementById("ticket-ritual-note").value,a=nc(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,o||null,a),k("Signed off.","success"),H(),s?await s():await co(n)}catch(r){_("complete ticket ritual",r)}return!1}le({"approve-ticket-ritual":(e,t)=>{kk(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Lm(t.ritualId,t.issueId,t.ritualName,()=>co(t.issueId))},"complete-ticket-ritual":(e,t)=>{Am(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{bk(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{wk(t.ritualId,t.issueId)}});function Cm(e){const t=ut(e),n=document.createElement("template");return n.innerHTML=t,xk(n.content,Ik),n.innerHTML}function Ek(e){return`/issue/${encodeURIComponent(e)}`}function xk(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(o){let a=o.parentElement;for(;a&&a!==e;){if(a.tagName==="CODE"||a.tagName==="PRE")return NodeFilter.FILTER_REJECT;a=a.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(o=>{t(o)})}function Ik(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),o=i.test(t);if(!s&&!o)return;const a=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&a.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=Ek(p),f.className="issue-link",f.textContent=p,a.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&a.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],a.appendChild(p),r=d.index+d[0].length}l&&(r<t.length&&a.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(a,e))}function Ns(e){return e?Cm(e):""}function Fn(e){return e?Cm(e):""}const Ea=new Map;function ic(){var e;return`${((e=T())==null?void 0:e.id)??""}|${X()??""}`}function hi(e,t,n){Ea.set(e,{key:t,value:n})}function xa(e,t){const n=Ea.get(e);return n&&n.key===t?n.value:void 0}function Os(e,...t){for(const n of t)n!==e&&Ea.delete(n)}function sc(){Ea.clear()}function Ia(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}wt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&sc(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&sc()});function Sk(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Tk(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const o of e){const a=o.user_id||o.id;i.has(a)||(i.add(a),s.push({id:a,name:o.user_name||o.name||o.user_email||o.email||"User",email:o.user_email||o.email||"",handle:Sk(o),isAgent:!1}))}for(const o of t)!o.mention_handle||o.is_active===!1||o.idle||i.has(o.id)||n!==void 0&&o.agent_project_id&&o.agent_project_id!==n||(i.add(o.id),s.push({id:o.id,name:o.name||"Agent",email:"",handle:o.mention_handle,isAgent:!0}));return s}function Bm(e,t={},n=6){const i=(e||"").toLowerCase();return Tk(xt(),mt(),t).filter(s=>!i||s.handle.includes(i)||s.name.toLowerCase().includes(i)||s.email.toLowerCase().includes(i)).slice(0,n)}function Lk(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function oc(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let o=-1;const a=()=>{s.classList.add("hidden"),s.innerHTML="",o=-1},r=d=>{var f,g;const p=s.querySelectorAll(".mention-suggestion");p.length!==0&&(o=(d%p.length+p.length)%p.length,p.forEach((b,y)=>b.classList.toggle("highlighted",y===o)),(g=(f=p[o]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const p=i.selectionStart||0,f=i.value.slice(0,p).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(p);i.value=f+g,i.focus(),a()},c=()=>{if(i.hidden){a();return}const d=i.selectionStart||0;if(Lk(i.value,d)){a();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){a();return}const g=f[2].toLowerCase(),b=Bm(g,i.mentionContext||{});if(!b.length){a();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${u(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,$)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const p=!s.classList.contains("hidden");if(d.key==="Escape"&&p){d.preventDefault(),d.stopPropagation(),a();return}if(p){if(d.key==="ArrowDown")d.preventDefault(),r(o+1);else if(d.key==="ArrowUp")d.preventDefault(),r(o-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[o];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(a,150)})}let De=null,Dm=!1,Un=!1,Mm="new-comment";function Ak(){return De||(De=document.createElement("div"),De.className="quote-tooltip",De.setAttribute("role","button"),De.setAttribute("tabindex","0"),De.setAttribute("aria-label","Quote selection in comment"),De.textContent="Quote",De.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Sa())}),De.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),De.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Sa()}),document.body.appendChild(De),De)}function jm(e,t){const n=Ak();n.style.display="flex",Un=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Un)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Hs(){De&&(De.style.display="none"),Un=!1}function Ck(){return Un}function Rm(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function ac(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Rm(t.startContainer),i=Rm(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Bk(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Sa(e=Mm){const t=ac();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Bk(t),s=n.value,o=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+o+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Hs(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Dk(){var i;if(!ac())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return jm(n.left+n.width/2,n.top),!0}function Mk(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!ac()){Hs();return}jm(t,n)},10)}function Pm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Mm=t,i.addEventListener("mouseup",Mk,n?{signal:n}:void 0),Dm||(Dm=!0,document.addEventListener("mousedown",s=>{Un&&De&&!De.contains(s.target)&&Hs()}),document.addEventListener("selectionchange",()=>{Un&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Hs()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Un&&(s.stopImmediatePropagation(),Hs())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Dk()})))}function qm(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let mn=[],Fs=[],Ta=null,pe=new Set,vi="list",Gn=!1,rc=null,La=null,lc=null,cc=null,Nm=null;function Om(e){if(Nm!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const dc=$y();(dc==="list"||dc==="grid")&&(vi=dc);function Hm(e){if(e!=="list"&&e!=="grid")return;vi=e,e==="grid"&&Gn&&uc(),_y(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Jt()}function Fm(){if(vi!=="list")return;Gn=!0,pe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Jt(),yi()}function uc(){Gn=!1,pe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Jt(),yi()}function jk(){rc&&clearTimeout(rc),rc=setTimeout(()=>{Jt()},300)}function Um(){const e=document.getElementById("doc-search");e&&(e.value=""),Jt()}async function Rk(){Um()}function Pk(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function qk(){return mn}function Jt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Pk(),Fs=mn.filter(o=>{var a,r;if(e){const l=(a=o.title)==null?void 0:a.toLowerCase().includes(e),c=(r=o.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Fs.sort((o,a)=>{switch(t){case"title_asc":return(o.title||"").localeCompare(a.title||"");case"title_desc":return(a.title||"").localeCompare(o.title||"");case"updated_asc":return new Date(o.updated_at)-new Date(a.updated_at);case"updated_desc":default:return new Date(a.updated_at)-new Date(o.updated_at)}}),Gk("",vi)}let bi=0;async function Nk(){var i;const e=Ta||((i=T())==null?void 0:i.id);if(!e)return;const t=++bi,n=X()||null;try{const s=await h.getDocuments(e,n);if(t!==bi)return;hi("documents",`${e}|${n??""}`,s),mn=s,Jt()}catch(s){if(t!==bi)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=W({icon:z.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),_("load documents",s)}}wt(e=>{e==="currentProject"&&A()==="documents"&&Nk()});async function zn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;Ta=e,Mp(-1);const i=++bi;t===null&&(t=X()||null);const s=`${e}|${t??""}`,o=n?xa("documents",s):void 0,a=document.getElementById("documents-list");o?(mn=o,Jt()):a&&(a.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==bi)return;hi("documents",s,l);const c=o&&Ia(mn,l);mn=l;const d=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");d&&p&&(d.classList.toggle("active",vi==="list"),p.classList.toggle("active",vi==="grid")),c||Jt()}catch(l){if(i!==bi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=W({icon:z.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),_("load documents",l)}}function Gm(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ta||((n=T())==null?void 0:n.id);e&&zn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function zm(e){Om(e)&&Ie(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Ok(e,t){Om(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function Hk(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ae(t.color)}20; color: ${ae(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function Fk(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Hk(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u(qm(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Uk(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ae(r.color)}20; color: ${ae(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?qm(e.content).substring(0,80):"No content",s=Gn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
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
  `}function Gk(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;pe.clear(),yi();const i=Fs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=X(),f=d||p;n.innerHTML=W({icon:f?z.search:z.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?Fk:Uk,o=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${o}">${i.map(s).join("")}</div>`;return}const a={},r=se();i.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");a[p]||(a[p]={label:f,docs:[]}),a[p].docs.push(d)});let l="";for(const[d,p]of Object.entries(a)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function zk(e){pe.has(e)?pe.delete(e):pe.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=pe.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",pe.has(e)),yi()}function Vk(){Fs.forEach(e=>pe.add(e.id)),Fs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),yi()}function Vm(){pe.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),pe.clear(),yi()}function yi(){const e=document.getElementById("doc-bulk-actions");e&&(Gn?(e.classList.remove("hidden"),pe.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Kk(){if(pe.size===0){k("No documents selected","error");return}const t=se().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${pe.size} Document${pe.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,F()}async function Wk(e){var a,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(pe);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((a=mn.find(d=>d.id===l))==null?void 0:a.title)||l)}H(),Vm(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const o=(r=T())==null?void 0:r.id;return await zn(o),!1}async function Yk(){var o,a;if(pe.size===0){k("No documents selected","error");return}const e=pe.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(pe);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((o=mn.find(c=>c.id===r))==null?void 0:o.title)||r)}uc(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(a=T())==null?void 0:a.id;await zn(s)}async function Qk(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
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
    `}}function Zk(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=pp(e);s&&(i.value=s),i.addEventListener("input",()=>{ea(e,i.value)},{signal:t}),i.addEventListener("keydown",o=>{var a;o.key==="Enter"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),(a=i.closest("form"))==null||a.requestSubmit())},{signal:t}),oc("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ie(e,t=!0){try{t&&pn();const n=await h.getDocument(e);Nm=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(D=>D.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Qk(n);let o=null,a=null,r=!1;if(n.project_id){const N=se().find(K=>K.id===n.project_id);if(o=N?N.name:null,n.sprint_id)try{const K=await h.getSprint(n.sprint_id);a=K?K.name:null}catch(K){console.error("Failed to load sprint name:",K),r=!0}}let l=n.content||"";const c=Q.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=qk(),p=d.findIndex(D=>D.id===n.id),f=p>0?d[p-1]:null,g=p>=0&&p<d.length-1?d[p+1]:null,b=p>=0,y=A()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(D=>`
          <span class="issue-label" style="background: ${ae(D.color)}20; color: ${ae(D.color)}">
            ${u(D.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(D.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let x='<span class="text-muted">None</span>';try{const D=await h.getDocumentIssues(n.id);D.length>0&&(x=D.map(N=>`
          <div class="linked-item">
            <span class="linked-item-id">${u(N.identifier)}</span>
            <span class="linked-item-title">${u(N.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(N.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(D){console.error("Failed to load linked issues:",D),x=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
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
                ${$}
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
              ${x}
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
    `,La&&La.abort(),La=new AbortController;const{signal:w}=La,E=i.querySelector(".sidebar-overflow-trigger"),L=i.querySelector(".overflow-menu-dropdown");if(E&&L){const D=()=>{L.classList.add("hidden"),E.setAttribute("aria-expanded","false")},N=()=>{const K=L.classList.toggle("hidden");E.setAttribute("aria-expanded",String(!K))};E.addEventListener("click",N,{signal:w}),document.addEventListener("click",K=>{!E.contains(K.target)&&!L.contains(K.target)&&D()},{signal:w}),L.addEventListener("keydown",K=>{K.key==="Escape"&&(D(),E.focus())},{signal:w})}Zk(n.id,w,n.project_id||null),Pm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:w}),lc=f?f.id:null,cc=g?g.id:null;const V=D=>{if((D.metaKey||D.ctrlKey)&&D.shiftKey&&(D.key===">"||D.key==="."||D.code==="Period")&&Sa("new-doc-comment")){D.preventDefault();return}D.metaKey||D.ctrlKey||D.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||D.target.tagName==="INPUT"||D.target.tagName==="TEXTAREA"||D.target.tagName==="SELECT"||D.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(D.key==="ArrowLeft"&&lc?(D.preventDefault(),Ie(lc)):D.key==="ArrowRight"&&cc&&(D.preventDefault(),Ie(cc)))};document.addEventListener("keydown",V,{signal:w})}catch(n){_("load document",n)}}async function Aa(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const o=await h.getSprints(t);let a=n;if(i&&!n){const l=o.find(c=>c.status==="active");l&&(a=l.id)}const r=o.map(l=>`<option value="${l.id}" ${l.id===a?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function pc(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function Xk(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),o=document.getElementById(`${e}-preview`);if(!n||!i||!s||!o)return;const a=t==="preview";if(n.classList.toggle("active",!a),i.classList.toggle("active",a),s.style.display=a?"none":"block",o.style.display=a?"block":"none",a){const r=s.value.trim();o.innerHTML=r?Fn(r):'<span class="text-muted">Nothing to preview.</span>'}}function mc(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),o=document.getElementById(t.icon),a=hp(e);if(a){const l=yy(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(a.title&&i&&(i.value=a.title),a.content&&s&&(s.value=a.content),a.icon&&o&&(o.value=a.icon)):c?(i&&(i.value=a.title||""),s&&(s.value=a.content||""),o&&(o.value=a.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(o==null?void 0:o.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){ta(e,null);return}ta(e,l,n)};[i,s,o].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Km(){Us=null;const e=se(),t=Yp()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${pc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,F(),mc("new"),t&&await Aa("doc-sprint",t,null,!0)}let Us=null;async function Jk(e,t,n){Us=n||null;const s=se().map(o=>`<option value="${m(o.id)}" ${o.id===t?"selected":""}>${u(o.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${pc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,F(),mc("new"),t&&await Aa("doc-sprint",t,e)}async function e$(e){var o;e.preventDefault();const t=(o=T())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),ta("new",null),await zn(t),H(),k("Document created!","success"),Us){const a=Us;Us=null,a()}}catch(a){_("create document",a)}return!1}let fc=null,Gs=null,gc=!1;async function Wm(e){try{const t=await h.getDocument(e);fc=e,Gs={title:t.title||"",content:t.content||""},gc=!1;const i=se().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${pc("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,F(),mc(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Aa("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){_("load document",t)}}async function t$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},o=document.getElementById("edit-doc-content-draft-warning");if(o&&fc===t&&Gs&&!gc){let a=null;try{a=await h.getDocument(t)}catch{}if(a&&((a.title||"")!==Gs.title||(a.content||"")!==Gs.content))return gc=!0,o.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',o.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),fc=null,Gs=null;const a=hp(t);a&&a.title===s.title&&a.content===s.content&&(a.icon||"")===(s.icon||"")&&ta(t,null),H(),await Ie(t),k("Document updated!","success")}catch(a){_("update document",a)}return!1}async function n$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await zn(n),O("documents"),k("Document deleted!","success")}catch(n){_("delete document",n)}}function i$(e,t){Aa(e,t)}async function s$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,F()}async function o$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=await h.searchIssues(s,e);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(a=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(a.id)}">
        <span class="link-result-id">${u(a.identifier)}</span>
        <span class="link-result-title">${u(a.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function a$(e,t){try{await h.linkDocumentToIssue(e,t),H(),k("Issue linked!","success"),await Ie(e,!1)}catch(n){_("link issue",n)}}async function r$(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Ie(e,!1)}catch(n){_("unlink issue",n)}}let hc=!1;async function l$(e,t){if(e.preventDefault(),hc)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;hc=!0;try{const s=await h.createDocumentComment(t,i);n.value="",k("Comment added!","success"),_s(s),await Ie(t,!1)}catch(s){_("add comment",s)}finally{hc=!1}return!1}async function c$(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,F();return}const s=i.map(o=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(o.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ae(o.color)}; color: white;">${u(o.name)}</span>
        ${o.description?`<span class="text-muted">${u(o.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,F()}catch(i){_("load labels",i)}}async function d$(e,t){try{await h.addLabelToDocument(e,t),H(),k("Label added!","success"),await Ie(e,!1)}catch(n){_("add label",n)}}async function u$(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await Ie(e,!1)}catch(n){_("remove label",n)}}le({"view-document":(e,t)=>{e.preventDefault(),Ie(t.documentId)},"set-doc-editor-mode":(e,t)=>{Xk(t.target,t.mode)},"retry-load-documents":()=>{zn(Ta)},"retry-document-comments":(e,t)=>{Ie(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{zk(t.docId)},"clear-doc-search":()=>{Um()},"clear-all-doc-filters":()=>{Rk()},"show-bulk-move-modal":()=>{Kk()},"bulk-delete-documents":()=>{Yk()},"select-all-docs":()=>{Vk()},"clear-doc-selection":()=>{Vm()},"exit-selection-mode":()=>{uc()},"enter-selection-mode":()=>{Fm()},"handle-bulk-move":e=>{Wk(e)},"unlink-document-issue":(e,t)=>{r$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{s$(t.documentId)},"add-document-comment":(e,t)=>{l$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{u$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{c$(t.documentId)},"show-edit-document-modal":(e,t)=>{Wm(t.documentId)},"delete-document":(e,t)=>{n$(t.documentId)},"create-document":e=>{e$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{i$(t.sprintSelect,n.value)},"update-document":(e,t)=>{t$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{o$(n.value,t.documentId)},"link-to-issue":(e,t)=>{a$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{d$(t.documentId,t.labelId)}});let Rt=[],Ca={},Ba=new Set,en=null,vc=null,Da=[],zs=[],bc=[];function Ma(){return Ca}function p$(){return vc}function m$(){return en}wt(e=>{e==="currentProject"&&A()==="sprints"&&fn()});let yc=0;async function fn({fromMemory:e=!1}={}){Rp(-1);const t=X();if(!t){const a=document.getElementById("sprints-list");a&&(a.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++yc;L$();const i=document.getElementById("sprints-list"),s=ic(),o=e?xa("sprints",s):void 0;o?(Rt=o,Ym()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,a]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=a.some(c=>c.status==="active")?a:await h.getSprints(t);if(n!==yc)return;const l=o&&Ia(Rt,r);Rt=r,hi("sprints",s,r),l||Ym(),await Vs()}catch(a){return n!==yc?void 0:(i&&(i.innerHTML=W({icon:z.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),_("load sprints",a),!1)}return!0}function Ym(){const e=document.getElementById("sprints-list");if(!e)return;const t=Rt.find(o=>o.status==="active"),n=Rt.find(o=>o.status==="planned"),i=Rt.filter(o=>o.status==="completed");let s="";if(t){const o=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",a=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=f$(t)}if(n){const o=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",a=(n.budget?`${n.budget} point budget`:"No budget set")+(o?` <span class="text-muted">· ${o}</span>`:"");s+=`
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
        `),e.innerHTML=s||W({icon:z.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Qm(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Ec(e.activated_at)}, closed ${Ec(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Ec(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function f$(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${u(Qm(e))||"not yet activated"}</span>
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
    `}let wc=0;async function wi(e,t=!0){var n;try{t&&pn();const i=++wc,s=A(),o=await h.getSprint(e);if(i!==wc)return;if(!o){k("Sprint not found","error"),O("sprints");return}vc=o;const a=(n=T())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),a?h.getDocuments(a,o.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==wc)return;Da=r,bc=l,zs=c,A()===s&&Dt(Da),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),h$()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),O("sprints")}}async function g$(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),O("sprints",!1);return}try{await wi(e,!1)}catch{O("sprints",!1)}}function h$(){const e=vc,t=Da;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(g=>As.includes(g.status)),o=t.filter(g=>g.status==="done"),a=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(o),d=a.length>0?`<div class="stat-note">${a.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${u(Qm(e))}
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
                ${s.length===0?W({icon:z.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>kc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${o.length>0?"open":""}>
                <summary><h3>Completed Issues (${o.length})</h3></summary>
                ${o.length===0?W({icon:z.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${o.map(g=>kc(g)).join("")}
                    </div>
                `}
            </details>

            ${a.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${a.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${a.map(g=>kc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${b$()}
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
                        ${zs.map(g=>v$(g)).join("")}
                    </div>
                `:W({icon:z.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function kc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Np,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${B$(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function v$(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${qe(e.created_at)}</span>
            </span>
        </div>
    `}function b$(){const e=bc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${y$(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function y$(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function w$(e,t,n,i){const s=i?uw(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function k$(e,t,n){var p,f,g,b;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,o=s?parseInt(s):null,a=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=o!==l,d=Rt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const $=a==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!$&&(y.budget=o),Object.keys(y).length&&await h.updateSprint(t,y),a==="planned"){const w=Rt.filter(E=>E.status==="planned"&&E.id!==t);for(const E of w)await h.updateSprint(E.id,{budget:o})}a==="default"&&n&&await h.updateProject(n,{default_sprint_budget:o}),await fn(),H(),k(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(y){_("update budget",y)}return!1}const Zm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function $$(e,t=null){const n=Rt.find(c=>c.id===e),i=n?se().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Zm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let o;try{o=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){_("reset budget to project default",c),t&&(t.disabled=!1);try{await fn()}catch{}return}const a=(o==null?void 0:o.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await fn()!==!1}catch{l=!1}k(`'${a}' follows the project default budget again: ${s(o==null?void 0:o.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((o==null?void 0:o.budget)===null||(o==null?void 0:o.budget)===void 0)&&k(Zm,"warning")}async function _$(e){const t=Rt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,F();const n=As;let i=0,s=!1,o=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),o=!0}const a=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${a}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${a}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function E$(e){try{const t=await h.closeSprint(e);await fn(),ef(),t.limbo?I$(t):k("Sprint completed!","success")}catch(t){_("complete sprint",t)}}async function Vs(){const e=X();if(e)try{en=await h.getLimboStatus(e),x$()}catch(t){console.error("Failed to load limbo status:",t)}}function x$(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!en||!en.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${en.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function I$(e){const t=X();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,F(),S$(t)}async function S$(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${ut(i.prompt)}</div>
                    ${_c(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function $c(){var t,n;if(!en)return;const e=X();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
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
                        ${_c(i.attestation)}
                        ${T$(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=en.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${en.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${_c(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,F()}function _c(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(qe(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${ut(e.note)}</div>
        </div>
    `}function T$(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Xm(e){for(const t of e)if(!Ba.has(t))try{(await h.getSprints(t)).forEach(i=>{Ca[i.id]=i}),Ba.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function L$(){Ca={},Ba=new Set,Da=[],bc=[],zs=[],ja={}}function A$(e,t){t.forEach(n=>{Ca[n.id]=n}),Ba.add(e)}let ja={};function C$(e){return ja[e]}function Jm(e,t){ja[e]=t??null}function ef(){ja={}}le({"retry-load-sprints":()=>fn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}wi(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;w$(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{$$(t.sprintId,n)},"show-limbo-details-modal":()=>{$c()},"show-close-sprint-confirmation":(e,t)=>{_$(t.sprintId)},"handle-update-budget":(e,t)=>{k$(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),E$(t.sprintId)},"dismiss-limbo-modal":()=>{H(),Vs()},"approve-ritual":(e,t)=>{hk(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Tm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}de(t.issueId)},"create-sprint-document":async(e,t)=>{await Jk(t.sprintId,t.projectId,()=>{wi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ie(t.documentId)}});function Ec(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function B$(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let Pt=[],xc=[],Ra=-1,Ic=null;const tf=5,D$=new Set(["done","canceled"]),nf=new Set;function M$(){return Ra}function j$(e){Ra=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Ic=(t==null?void 0:t.dataset.issueId)??null}const sf=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function of(e){const t=new Set(sf.map(s=>s.status)),n=sf.map(s=>({...s,issues:e.filter(o=>o.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}wt(e=>{e==="currentProject"&&A()==="my-issues"&&(ki(),Ks(),$i())});function Ye(){return Pt}function Vn(e){Pt=e}let Sc=0;async function ki(){var o;const e=T(),t=re();if(!e||!t)return;const n=++Sc,i=(o=document.getElementById("my-issues-status-filter"))==null?void 0:o.value,s=X();P$();try{const a={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...a,project_id:s}):r=await h.getTeamIssues(e.id,a),n!==Sc)return;Pt=of(r).flatMap(l=>l.issues),A()==="my-issues"&&Dt(Pt),Kn()}catch(a){if(n!==Sc)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=W({icon:z.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),_("load issues",a)}}async function $i({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=X();xc=await h.getTeamActivities(t.id,0,10,{projectId:i}),R$()}catch{n&&(n.innerHTML=W({icon:z.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function R$(){const e=document.getElementById("dashboard-activity-list");if(e){if(!xc.length){e.innerHTML=W({icon:z.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=xc.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=ld(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Ig(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${dd(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${qe(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function P$(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function af(){ki()}function Kn(){var a,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=of(Pt);Pt=t.flatMap(l=>l.issues),A()==="my-issues"&&Dt(Pt),Ra=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Pt.length?String(Pt.length):""),Pt.length===0){e.innerHTML=W({icon:z.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(a=i.closest(".issue-row"))==null?void 0:a.dataset.issueId:null,o=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=D$.has(l.status)&&!nf.has(l.status)&&l.issues.length>tf,d=c?l.issues.slice(0,tf):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(p=>Zn(p)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(o?l.querySelector(`[data-dropdown-type="${o}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Ic){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Ic);c!==-1&&(l[c].classList.add("keyboard-selected"),Ra=c)}}let Tc=0,Pa=[],rf=null;async function Ks(){var a;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Tc,n=X(),i=`${((a=T())==null?void 0:a.id)??""}:${n??""}`;i!==rf&&(rf=i,Ws=!1),Pa=[];const s=se(),o=n?s.filter(r=>r.id===n):s;if(!o.length){e.innerHTML="";return}try{const r=o.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let p={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:p};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const b of g)p[b.status]=(p[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:p,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==Tc)return;Pa=l,mf(l,{single:!!n})}catch(r){if(t!==Tc)return;console.error("Failed to load sprint status:",r),e.innerHTML=W({icon:z.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const lf=5;let Ws=!1;const cf=["done","in_review","in_progress","todo","backlog"];function qa(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,o=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,a=e.limbo?"limbo":s?"arrears":n&&o>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:o,state:a}}function q$(e){const t=({sprint:n})=>{const i=qa(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function N$(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function O$(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function H$(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const F$={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function df(e){return F$[e.state]||""}function uf(e){return`<span class="meter ${df(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function U$(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function pf(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function G$({sprint:e,statusCounts:t,countsFailed:n}){const i=qa(e),s=t||{},o=Object.values(s).reduce((d,p)=>d+p,0),a=N$(e),r=n?"Issue counts unavailable":o?`${o} issue${o===1?"":"s"}`:"No issues planned",l=[a?`Day ${a}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${pf(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${H$(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${O$(i)}</span>
            ${i.hasBudget?uf(i):""}
            ${o?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${cf.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/o*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${cf.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Ve(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function z$({project:e,sprint:t}){const n=qa(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=U$(t,n),o=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${pf(t)} title="${m(o)}">
                <span class="state-dot ${df(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?uf(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function mf(e,{single:t=e.length===1&&!!X()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${G$(e[0])}
        `;return}const i=q$(e),s=i.filter(({sprint:d})=>d.limbo).length,o=i.filter(({sprint:d})=>!d.limbo&&qa(d).overBudget).length,a=[o?`${o} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>lf,l=Ws?i:i.slice(0,lf),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${a?`<span class="sprint-attention">${a}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(z$).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${Ws}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}le({"filter-my-issues":()=>af(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Wl(t.identifier)},"retry-load-my-issues":()=>ki(),"dash-show-all":(e,t)=>{nf.add(t.status),Kn()},"retry-load-sprint-status":()=>Ks(),"dash-sprints-toggle":()=>{var e;Pa.length&&(Ws=!Ws,mf(Pa,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const ff=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ys(e=null){const t=e||X()||"";Lf([]);const n=se().map(a=>`
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
                                ${ff.map(a=>`<option value="${a.id}">${a.label}</option>`).join("")}
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
    `,Sp(document.getElementById("create-issue-project")),F(),Ua();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),o=wy();o.title&&(i.value=o.title),o.description&&(s.value=o.description),i.addEventListener("input",()=>{vp(i.value,s.value)}),s.addEventListener("input",()=>{vp(i.value,s.value)}),i.focus()}function V$(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function K$(e){const t=ff.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function gf(e,t){const n=se().find(i=>i.id===t);Lf([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
    `,F(),Ua(),document.getElementById("create-issue-title").focus()}async function W$(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,label_ids:Tf(),parent_id:e});H(),k(`Created sub-issue ${d.identifier}`,"success"),de(e)}catch(d){_("create sub-issue",d)}}async function Y$(e,t,n){var a,r;Yt();const s=(n||t.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown dropdown-positioning",o.style.top=`${s.top-8}px`,o.style.left=`${s.left}px`,o.style.transform="translateY(-100%)",o.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;o.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Np.map(c=>`
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
        `}else if(e==="labels")if(!T())o.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Bl(),c=!1;if(l.length===0)try{l=await h.getLabels(T().id),Ss(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Bc(o,{failed:c}),document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),xs(o,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=js({keepId:l});o.innerHTML=`
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
                `}catch{o.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),xs(o)}function Q$(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Z$(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Al();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${lt(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${gt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const o=document.getElementById("create-issue-type-btn");o&&(o.innerHTML=`<span class="issue-type-badge type-${t}">${bt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Yt(),s==null||s.focus()}async function hf({keepOpen:e=!1}={}){var y,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,p=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const x=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,sprint_id:d,label_ids:Tf(),due_date:f});k(`Created ${x.identifier}`,"success"),ky(),A()==="issues"?Nt():A()==="my-issues"&&ki(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Gy(),document.getElementById("create-issue-title").focus()):(H(),de(x.id))}catch(x){_("create issue",x)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function X$(){await hf({keepOpen:!1})}async function J$(){await hf({keepOpen:!0})}le({"toggle-create-dropdown":(e,t,n)=>{Y$(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Z$(t.field,t.value,t.label)},"create-issue-submit":()=>{X$()},"create-issue-and-new":()=>{J$()},"update-create-project":()=>{Q$()},"apply-template":e=>{K$(e.target.value)},"toggle-create-options":()=>{V$()},"create-sub-issue-submit":(e,t)=>{W$(t.parentId,t.projectId)}});function Qs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(e_(n,e.project_id),t=!0),t}function e_(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,F())}async function t_(e,t){try{const n=await h.updateIssue(e,{status:"done"});H(),k(`${t} closed`,"success"),Qs(n)}catch(n){_(`close ${t}`,n)}}le({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>t_(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),gf(t.parentId,t.projectId)}});function gn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Yn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Qn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Na(){const e=document.getElementById("group-by-select");return e?e.value:""}const vf=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Lc=["done","canceled"],n_=As,i_="all";function bf(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function _i(e=gn()){return e.length===0?"all":bf(e,As)?"open":bf(e,Lc)?"closed":null}function yf(e){var t,n,i;switch(e){case"status":{const s=_i();return s==="all"?0:s?1:gn().length}case"priority":return Wn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Yn().length;case"exclude_labels":return Qn().length;default:return 0}}function Ac(){let e=0;return vf.forEach(t=>{e+=yf(t.key)}),e}function wf(){var b,y,$,x,w,E;const e=new URLSearchParams,t=gn(),n=Wn(),i=Yn(),s=Qn(),o=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,a=X()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,c=(x=document.getElementById("group-by-select"))==null?void 0:x.value,d=(w=document.getElementById("sort-by-select"))==null?void 0:w.value,p=_i(t);p==="all"?e.append("status",i_):p!=="open"&&t.forEach(L=>e.append("status",L)),n.forEach(L=>e.append("priority",L)),i.forEach(L=>e.append("label",L)),s.forEach(L=>e.append("exclude_label",L)),o&&e.set("assignee",o),a&&e.set("project",a),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),by((E=T())==null?void 0:E.id,f)}function s_(e){var $;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(x=>t.has(x))){const x=vy(($=T())==null?void 0:$.id);if(x){t=new URLSearchParams(x);const w=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",w)}}const s=t.getAll("status"),o=document.getElementById("status-filter-dropdown");if(o&&(s.length>0||!o.dataset.statusApplied)){const x=s.length>0?s:n_;o.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=x.includes(E.value)}),o.dataset.statusApplied="true",kf()}const a=t.getAll("priority");if(a.length>0){const x=document.getElementById("priority-filter-dropdown");x&&(x.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=a.includes(E.value)}),$f())}const r=t.get("assignee");r&&Pw(r);const l=t.get("project"),c=se();l&&(!c.length||c.some(x=>x.id===l))&&(e(!0),kt(l),e(!1));const d=t.get("sprint");if(d){const x=document.getElementById("sprint-filter");x&&(x.value=d)}const p=t.get("issue_type");if(p){const x=document.getElementById("issue-type-filter");x&&(x.value=p)}const f=t.getAll("label");if(f.length>0){const x=document.getElementById("label-filter-dropdown");x&&(x.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=f.includes(E.value)}),Oa())}const g=t.getAll("exclude_label");if(g.length>0){const x=document.getElementById("exclude-label-filter-dropdown");x&&(x.querySelectorAll('input[type="checkbox"]').forEach(E=>{E.checked=g.includes(E.value)}),Ha())}const b=t.get("groupBy");if(b){const x=document.getElementById("group-by-select");x&&(x.value=b)}const y=t.get("sort");if(y){const x=document.getElementById("sort-by-select");x&&(x.value=y)}}function kf(){const e=gn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=_i(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ve(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function $f(){const e=Wn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Pe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Oa(){var i,s;const e=Yn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=a}else n.textContent=`${e.length} Labels`}function Ha(){var i,s;const e=Qn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${a}`}else n.textContent=`Excl: ${e.length} Labels`}async function _f(){if(!T())return;let e;try{e=await h.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Ef("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Ef("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Ef(e,t,n,i){const s=document.getElementById(e);if(!s)return;const o=s.querySelector(".multi-select-options");o.innerHTML="",t.length===0?o.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ae(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,o.appendChild(l)});const a=document.createElement("div");a.className="multi-select-actions",a.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,o.appendChild(a)}const xf=Ml,o_=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let qt=[],If=Promise.resolve();const a_={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};let Ei=null;function r_(e){Ei=e}function tn(e){return Ei==null?void 0:Ei.get(e)}function Fa(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const l_={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Sf(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let o;return n==="first"?o=i[0]:n==="last"?o=i[i.length-1]:n===1?o=i[s<0?0:Math.min(i.length-1,s+1)]:o=i[s<0?i.length-1:Math.max(0,s-1)],o&&o.focus(),!0}function xi(){return!!document.querySelector(".inline-dropdown")}function Tf(){return qt}function Lf(e){qt=e}async function Cc(e,t,n,i){var p,f,g,b;e.preventDefault(),Yt();const o=(i||e.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${xf.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${lt(y)}
                    <span>${Ve(y)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${jl.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${gt(y)}
                    <span>${Pe(y)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${o_.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${bt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=xe(),$=ne().find(w=>w.id===n)||Ye().find(w=>w.id===n)||((y==null?void 0:y.id)===n?y:null)||tn(n),x=js({keepId:($==null?void 0:$.assignee_id)||null});a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${x.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:x.map(({assignee:w,indent:E},L)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(w.id)}">
                    ${yt(w,"avatar-small")}
                    <span>${ha(w,E)}</span>
                    ${L<9?`<span class="dropdown-shortcut">${L+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(y==null?void 0:y.dataset.projectId)||((p=xe())==null?void 0:p.project_id),x=ui($);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${x.map((w,E)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${w.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${w.label}</span>
                    ${E<9?`<span class="dropdown-shortcut">${E}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=ne(),$=Ye(),x=xe(),w=y.find(I=>I.id===n)||$.find(I=>I.id===n)||tn(n)||x,E=new Set(((w==null?void 0:w.labels)||[]).map(I=>I.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const L=a.getBoundingClientRect();let V=o.bottom+4,D=o.left;D+L.width>window.innerWidth-8&&(D=o.right-L.width),V+L.height>window.innerHeight-8&&(V=o.top-L.height-4),a.style.top=`${V}px`,a.style.left=`${Math.max(8,D)}px`,xs(a,{multiSelect:!0});let N=[];const K=T();if(K)try{N=await h.getLabels(K.id)}catch(I){console.error("Failed to load labels:",I)}if(!a.parentNode)return;Cf(a,n,N,E);const Y=a.getBoundingClientRect();let P=o.bottom+4,Z=o.left;Z+Y.width>window.innerWidth-8&&(Z=o.right-Y.width),P+Y.height>window.innerHeight-8&&(P=o.top-Y.height-4),a.style.top=`${P}px`,a.style.left=`${Math.max(8,Z)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=ne(),$=Ye(),x=xe(),w=y.find(B=>B.id===n)||$.find(B=>B.id===n)||tn(n)||x,E=(w==null?void 0:w.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const L=a.getBoundingClientRect();let V=o.bottom+4,D=o.left;D+L.width>window.innerWidth-8&&(D=o.right-L.width),V+L.height>window.innerHeight-8&&(V=o.top-L.height-4),a.style.top=`${V}px`,a.style.left=`${Math.max(8,D)}px`,xs(a);let N=[];if(E)try{N=await h.getSprints(E),A$(E,N)}catch(B){console.error("Failed to load sprints:",B)}if(!a.parentNode)return;const K=N.filter(B=>B.status!=="completed"||B.id===(w==null?void 0:w.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${K.map((B,j)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(B.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(B.name)}${B.status==="active"?" (Active)":""}</span>
                    ${j<9?`<span class="dropdown-shortcut">${j+1}</span>`:""}
                </button>
            `).join("")}
        `;const Y=a.getBoundingClientRect();let P=o.bottom+4,Z=o.left;Z+Y.width>window.innerWidth-8&&(Z=o.right-Y.width),P+Y.height>window.innerHeight-8&&(P=o.top-Y.height-4),a.style.top=`${P}px`,a.style.left=`${Math.max(8,Z)}px`,a.classList.remove("dropdown-positioning");const I=B=>{const j=B.key;if(j==="Escape"||j==="Tab"){Yt(),document.removeEventListener("keydown",I),Es(null);return}if(Sf(B,a))return;const me=parseInt(j);if(isNaN(me))return;const ve=a.querySelectorAll(".dropdown-option");let Se=!1;me===0?(Ii(n,"sprint_id",null),Se=!0):me>=1&&me<ve.length&&(ve[me].click(),Se=!0),Se&&(document.removeEventListener("keydown",I),Es(null))};Es(I),document.addEventListener("keydown",I),(g=a.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const r=a.getBoundingClientRect();let l=o.bottom+4,c=o.left;c+r.width>window.innerWidth-8&&(c=o.right-r.width),l+r.height>window.innerHeight-8&&(l=o.top-r.height-4),a.style.top=`${l}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const d=y=>{const $=y.key;if($==="Escape"||$==="Tab"){Yt(),document.removeEventListener("keydown",d);return}if(Sf(y,a))return;const x=parseInt($);if(isNaN(x))return;let w=!1;if(t==="status"&&x>=1&&x<=6)Ii(n,"status",xf[x-1]),w=!0;else if(t==="priority"&&x>=0&&x<=4)Ii(n,"priority",jl[x]),w=!0;else if(t==="estimate"){const E=xe(),L=ui(E==null?void 0:E.project_id);x>=0&&x<L.length&&(Ii(n,"estimate",L[x].value),w=!0)}w&&(document.removeEventListener("keydown",d),Es(null))};Es(d),document.addEventListener("keydown",d),(b=a.querySelector(".dropdown-option[data-action]"))==null||b.focus(),xs(a)}function c_(e,t,n,i){Cc(e,t,n,i)}function d_(e,t,n){If=If.then(()=>Af(e,t,n))}async function Af(e,t,n){const i=ne(),s=Ye(),o=xe(),a=i.find(d=>d.id===e)||s.find(d=>d.id===e)||tn(e)||o;if(!a)return;const r=(a.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),p=d.labels||[],f=w=>({...w,labels:p,updated_at:d.updated_at??w.updated_at}),g=ne();g.some(w=>w.id===e)&&tt(g.map(w=>w.id===e?f(w):w));const b=Ye();b.some(w=>w.id===e)&&Vn(b.map(w=>w.id===e?f(w):w));const y=xe();(y==null?void 0:y.id)===e&&di(f(y));const $=Fa(e);if($&&$.parentNode){const w=ne().find(E=>E.id===e)||Ye().find(E=>E.id===e);w&&($.outerHTML=Zn(w))}const x=document.querySelector(".property-labels-btn");x&&(x.innerHTML=p.length>0?p.map(w=>`
                    <span class="issue-label" style="background: ${ae(w.color)}20; color: ${ae(w.color)}">${u(w.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(_("update labels",d),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function Cf(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}async function Bf(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const o=await h.createLabel(i.id,{name:s}),a=await h.getLabels(i.id);Ss(a),o!=null&&o.id&&await Af(e,o.id,null);const r=ne(),l=Ye(),c=xe(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||tn(e)||c,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&Cf(t,e,a,p),n.value=""}catch(o){_("create label",o)}finally{n.disabled=!1,n.focus()}}}function Ua(){const e=document.getElementById("create-issue-labels-label");e&&(qt.length===0?e.textContent="Labels":e.textContent=`Labels (${qt.length})`)}function Bc(e,{failed:t=!1}={}){const n=Bl();e.dataset.dropdownType="create-labels",e.innerHTML=`
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
    `}function u_(e){const t=qt.indexOf(e);t>=0?qt.splice(t,1):qt.push(e),Al(),Ua();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Bc(n)}async function Df(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),o=await h.getLabels(e.id);Ss(o),s!=null&&s.id&&!qt.includes(s.id)&&(qt.push(s.id),Al()),Ua(),t&&Bc(t),n.value=""}catch(s){_("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Ii(e,t,n){var r;Yt();const i=g_(e,t,n),s=b_(e,t),o=(r=Ql(e))==null?void 0:r[t],a=jf(e,t,()=>n);a&&Dc(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Qs(c),Mf(e,t,i)){const d={...c,...v_(e,t)};y_(e,{issue:d,myIssue:d,detail:d}),ya(d),Dc(e,t,{focus:!a})}}catch(l){if(_("update issue",l),Mf(e,t,i)){jf(e,t,(d,p)=>d[t]===n?s[p]:d[t]);const c=Ql(e);c&&c[t]===n&&ya({...c,[t]:o}),Dc(e,t,{focus:!1})}return}finally{h_(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=X();if(l){const d=(await h.getSprints(l)).find(p=>p.status==="active");Mc(d||null)}}catch{}}const p_=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),hn=new Map;function m_(e){const t=e&&hn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let f_=0;function g_(e,t,n){const i=++f_;return hn.has(e)||hn.set(e,new Map),hn.get(e).set(t,{seq:i,value:n}),i}function Mf(e,t,n){var i,s;return((s=(i=hn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function h_(e,t,n){var s;const i=hn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&hn.delete(e))}function v_(e,t){var i;const n={};return(i=hn.get(e))==null||i.forEach((s,o)=>{o!==t&&(n[o]=s.value)}),n}function b_(e,t){var i,s,o;const n=xe();return{issue:(i=ne().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ye().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0,extra:(o=tn(e))==null?void 0:o[t]}}function jf(e,t,n){const i=(c,d)=>({...c,[t]:n(c,d)});let s=!1;const o=ne();o.some(c=>c.id===e)&&(s=!0,tt(o.map(c=>c.id===e?i(c,"issue"):c)));const a=Ye();a.some(c=>c.id===e)&&(s=!0,Vn(a.map(c=>c.id===e?i(c,"myIssue"):c)));const r=xe();(r==null?void 0:r.id)===e&&(s=!0,di(i(r,"detail")));const l=tn(e);return l&&(s=!0,Ei.set(i(l,"extra"))),s}function y_(e,t){var s;const n=ne();t.issue&&n.some(o=>o.id===e)&&tt(n.map(o=>o.id===e?t.issue:o));const i=Ye();t.myIssue&&i.some(o=>o.id===e)&&Vn(i.map(o=>o.id===e?t.myIssue:o)),t.detail&&((s=xe())==null?void 0:s.id)===e&&di(t.detail),t.issue&&tn(e)&&Ei.set(t.issue)}function w_(e){return e==="estimate"||a_[Na()]===e}function k_(e,t,n,{focus:i}){var d;const s=Fa(e);if(!s||!s.parentNode||!n)return;const o=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&w_(t)&&ne().some(p=>p.id===e))ft();else if(t==="status"&&s.closest("#my-issues-list"))Kn();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=Zn(n),p&&((d=Fa(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!o)return;const r=Fa(e),l=l_[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Dc(e,t,{focus:n}){const i=ne().find(o=>o.id===e)||Ye().find(o=>o.id===e)||tn(e);i&&ya(i),k_(e,t,i,{focus:n});const s=xe();(s==null?void 0:s.id)===e&&p_.has(t)&&$_(t,s)}function $_(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const s=n.querySelector(`.property-row[data-field="${i}"]`);if(!s)return;const o=s.querySelector(".property-value");if(o){if(e==="status")o.innerHTML=`
            ${lt(t.status)}
            <span>${Ve(t.status)}</span>
        `;else if(e==="priority")o.innerHTML=`
            ${gt(t.priority)}
            <span>${Pe(t.priority)}</span>
        `;else if(e==="issue_type")o.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${bt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const a=t.assignee_id?jt(t.assignee_id):null,r=a?$t(a):null;o.innerHTML=r?`${yt(a,"avatar-small")}<span>${u(r)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const a=nw(),r=t.sprint_id&&a?a.find(l=>l.id===t.sprint_id):null;o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${r?u(r.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${pi(t.estimate,t.project_id)}</span>
        `);o.classList.add("updated"),setTimeout(()=>o.classList.remove("updated"),500),o==null||o.focus()}}le({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Ii(t.issueId,i,n==="null"?null:Number(n)):Ii(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),d_(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Bf(t.issueId)},"toggle-create-issue-label":(e,t)=>{u_(t.labelId)},"create-label-for-create-issue":()=>{Df()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Bf(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Df())}});function Ga(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Rf)},0))}function Rf(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Rf))}function __(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Si)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Qe(),it(Bp()),setTimeout(()=>{document.addEventListener("click",Si)},0))}function E_(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Si)):(e.classList.remove("hidden"),D_(),setTimeout(()=>{document.addEventListener("click",Si)},0))}function Si(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),o=document.querySelector(".display-menu-container"),a=s&&i.includes(s),r=o&&i.includes(o);!a&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Si))}function Ti(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Si)}function Qe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=X();e.innerHTML=vf.map(n=>{const i=yf(n.key),s=Bp()===n.key,o=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${o?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function it(e){Wy(e),Qe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":I_(t);break;case"priority":S_(t);break;case"type":T_(t);break;case"assignee":L_(t);break;case"sprint":A_(t);break;case"labels":C_(t);break;case"exclude_labels":B_(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function x_(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Qe()}function I_(e){const t=gn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=_i(t);let s=`
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
        `}),e.innerHTML=s}function S_(e){const t=Wn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function T_(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(o.value)}">
                <input type="radio" name="type-filter-radio" value="${o.value}" ${n===o.value?"checked":""}>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=s}function L_(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
        `}),e.innerHTML=i}function A_(e){if(!X()){e.innerHTML=`
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
        `}),e.innerHTML=o}function C_(e){const t=Yn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function B_(e){const t=Qn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function D_(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",o=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],a=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ze(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=gn();if(n.length>0){const d=_i(n),p=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Ve(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Wn();if(i.length>0){const d=i.map(p=>Pe(p)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;o.value==="me"?d="Me":o.value==="unassigned"?d="Unassigned":d=$t(jt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const a=document.getElementById("sprint-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||a.value,clearAction:"clear-sprint-filter"})}const r=Yn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Qn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${u(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Xe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Ac();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Pf(){const e=document.getElementById("sprint-filter");if(!e)return;const t=X(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Mc(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),o=s.find(a=>a.status==="active");o&&(i+=`<option value="current">Current Sprint (${u(o.name)})</option>`),Jm(t,o==null?void 0:o.id),Mc(o||null),s.forEach(a=>{const r=a.status==="active"?" (Active)":a.status==="completed"?" (Done)":"";i+=`<option value="${a.id}">${u(a.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Mc(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,o=n>i,a=s>=80&&!o,r=o?"budget-over":a?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",o),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${o?'<span class="arrears-badge">In Arrears</span>':""}
    `}function M_(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let qf=!1;wt(e=>{if(e!=="currentProject"||A()!=="issues"||qf)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Pf(),_f()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Oa(),Ha(),rt(),Ze(),Xe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),rt(),Ze(),Xe()})});function j_(){s_(e=>{qf=e})}function za(){kf(),rt(),Ze(),Xe()}function Va(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),za()}function jc(){$f(),rt(),Ze(),Xe()}function Rc(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),jc()}function Pc(){Oa(),rt(),Ze(),Xe()}function Ka(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Pc()}function qc(){Ha(),rt(),Ze(),Xe()}function Wa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),qc()}function R_(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Nf(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,o,a;return(a=(o=(s=n==null?void 0:n.querySelector(`input[value="${R_(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:o.querySelector(".label-name"))==null?void 0:a.textContent}).filter(Boolean)}let Zs=0;function Xs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Of(){var t,n,i,s,o,a;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:X()||"",status:[...gn()].sort(),priority:[...Wn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((a=(o=document.getElementById("issue-search"))==null?void 0:o.value)==null?void 0:a.trim())||""})}let vn=null;function P_(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Li(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Hf(e,t){Li(!1),wa(e),tt(t),A()==="issues"&&Dt(t),ft(),vn=e,Xs(Qw(e).hiddenClosed||0)}function q_(e,t,{loading:n}){wa(null),tt(t),A()==="issues"&&Dt(t),ft(),Li(n),vn=e,Xs(0)}function Ff(){wa(null),vn=null,Li(!1),M_(),Xs(0)}function N_(){const e=document.getElementById("issues-list");Xs(0),e!=null&&e.querySelector(".issue-row")?Li(!0):Ff()}function O_(){const e=nk(Of()),t=e?vm(e):null;return t?(Pn(-1),Hf(e,t),!0):(Ff(),!1)}function H_(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),o=new Set(t.map(c=>c.id)),a=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!o.has(c.id)&&!(c._isOptimistic&&a.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const p=d&&bm(d.updated_at,c.updated_at)?d:c;l.push(m_(p))}return r.length?[...r,...l]:l}async function Nt(){var $,x,w,E,L,V,D;Pn(-1),P_();const e=++Zs;if(!T())return;const t=X()||"",n=gn(),i=Wn(),s=($=document.getElementById("assignee-filter"))==null?void 0:$.value,o=(w=(x=document.getElementById("issue-search"))==null?void 0:x.value)==null?void 0:w.trim();if(!t&&se().length===0){vn=null,document.getElementById("issues-list").innerHTML=W({icon:z.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const a=Of(),r={limit:1e3},l=((E=document.getElementById("sort-by-select"))==null?void 0:E.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(L=re())==null?void 0:L.id:r.assignee_id=s);const p=(V=document.getElementById("sprint-filter"))==null?void 0:V.value;if(p)if(p==="current"){if(t){const N=C$(t);if(N!==void 0)N&&(r.sprint_id=N);else try{const Y=(await h.getSprints(t)).find(P=>P.status==="active");Jm(t,Y==null?void 0:Y.id),Y&&(r.sprint_id=Y.id)}catch(K){console.error("Failed to resolve current sprint:",K)}}}else r.sprint_id=p;const f=(D=document.getElementById("issue-type-filter"))==null?void 0:D.value;f&&(r.issue_type=f),o&&o.length>=1?r.search=o:r.fields="list";let g=!1,b=!1,y=null;try{const N=Nf(Yn(),"label-filter-dropdown");N.length>0&&(r.label=N,r.label_match="any");const K=Nf(Qn(),"exclude-label-filter-dropdown");K.length>0&&(r.exclude_label=K),t&&(r.project_id=t);const Y=t||`team:${T().id}`;y=gm({...r,scope:Y});const P=vm(y);if(P)g=!0,vn===y&&tk()===y&&$m(ne(),P)||Hf(y,P);else{const oe=lk({...r,scope:Y});oe&&(oe.complete||oe.rows.length>0)?(b=!0,q_(y,oe.rows,{loading:!oe.complete})):N_()}const Z=oe=>t?h.getIssues(oe):se().length>0?h.getTeamIssues(T().id,oe):Promise.resolve(void 0),I=r.search&&_i(n)==="open"?Z({...r,status:Lc}).then(oe=>Array.isArray(oe)?oe.length:0).catch(oe=>(console.error("Failed to count closed search matches:",oe),0)):Promise.resolve(0),B=new Set(ne().map(oe=>oe.id)),j=await Z(r);if(ym(y,j),e!==Zs)return;wm(a,y);const me=(g||b)&&vn===y,ve=me?H_(ne(),j,B,xm(r)):j,Se=me&&$m(ne(),ve);wa(y),tt(ve),A()==="issues"&&Dt(Array.isArray(ve)?ve.filter(oe=>!oe._isOptimistic):ve);const Ut=[...new Set(ve.map(oe=>oe.project_id).filter(Boolean))],C=Object.keys(Ma()).length;if(await Xm(Ut),e!==Zs)return;const he=Object.keys(Ma()).length!==C;(!Se||he)&&ft(),vn=y,Li(!1);const te=await I;if(Xw(y,{hiddenClosed:te}),e!==Zs)return;Xs(te)}catch(N){if(e!==Zs)return;Li(!1);const K=(N==null?void 0:N.status)===403||(N==null?void 0:N.status)===404;if(g&&!K){_("refresh issues",N);return}K&&y&&Jw(y),vn=null;const Y=document.getElementById("issues-list");Y&&(Y.innerHTML=W({icon:z.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),_("load issues",N)}}function F_(){clearTimeout(Jy()),ew(setTimeout(()=>{Nt()},300))}function rt(){wf(),Nt()}async function Uf(){if(wf(),Na()==="sprint"){const e=ne(),t=[...new Set(e.map(n=>n.project_id))];await Xm(t)}ft()}function U_(){Ze(),Xe()}function G_(e){const t=e==="open"?As:e==="closed"?Lc:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),za(),Qe(),it("status")}function z_(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,za()),Qe(),it("status")}function V_(){Va(),Qe(),it("status"),Ze(),Xe()}function K_(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,jc()),Qe(),it("priority")}function W_(){Rc(),Qe(),it("priority"),Ze(),Xe()}function Gf(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,rt()),Qe(),it("type"),Ze(),Xe(),Ti()}function Y_(){Gf("")}function zf(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,rt()),Qe(),it("assignee"),Ze(),Xe(),Ti()}function Q_(){zf("")}function Vf(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,rt()),Qe(),it("sprint"),Ze(),Xe(),Ti()}function Z_(){Vf("")}function X_(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Pc()),Qe(),it("labels")}function J_(){Ka(),Qe(),it("labels"),Ze(),Xe()}function eE(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,qc()),Qe(),it("exclude_labels")}function tE(){Wa(),Qe(),it("exclude_labels"),Ze(),Xe()}function nE(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Nt()),Ti()}function iE(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Uf()),Ti()}function sE(){Va(),Rc();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ka(),Wa(),rt(),Ze(),Xe()}le({"update-label-filter":()=>Pc(),"clear-label-filter":()=>Ka(),"update-exclude-label-filter":()=>qc(),"clear-exclude-label-filter":()=>Wa(),"show-filter-category":(e,t)=>{var n,i;it(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{x_();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>V_(),"set-status-preset":(e,t)=>G_(t.value),"show-all-statuses":()=>Va(),"toggle-status-option":(e,t)=>z_(t.filterValue,e),"clear-priority-filter-new":()=>W_(),"toggle-priority-option":(e,t)=>K_(t.filterValue,e),"set-type-filter":(e,t)=>Gf(t.value),"clear-type-filter":()=>Y_(),"set-assignee-filter":(e,t)=>zf(t.value),"clear-assignee-filter":()=>Q_(),"set-sprint-filter":(e,t)=>Vf(t.value),"clear-sprint-filter":()=>Z_(),"clear-label-filter-new":()=>J_(),"toggle-label-option":(e,t)=>X_(t.filterValue,e),"clear-exclude-label-filter-new":()=>tE(),"toggle-exclude-label-option":(e,t)=>eE(t.filterValue,e),"set-sort":(e,t)=>nE(t.value),"set-group-by":(e,t)=>iE(t.value),"clear-all-filters":()=>sE(),"retry-load-issues":()=>Nt()});const Kf=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function bn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Ai(e){const t=bn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const oE=60,aE=150;let Je=[],Js=1/0,yn=null,Ya=null,eo=null;const Qa=new Map;let Ci=null,Za=[],to=null;const Wf=e=>{var t;return`${((t=re())==null?void 0:t.id)??""}|${e}`},rE=24;function lE(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(oE,Math.ceil((e+2*t)/rE))}function wn(e,t){if(e!==null&&(Ci!=null&&Ci.has(String(e))))return Za.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Js));return Js-=n.length,n.length<t.length&&Je.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Zn(i)).join("")}function Yf(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Qf(){clearTimeout(yn),yn=null,Oc++,Je=[],Ya=null,to=null,eo=null}function Nc(e=1/0){if(Je.length===0)return;const t=document.getElementById("issues-list");if(!t||!(eo!=null&&eo.isConnected)){Qf();return}const n=new Map(ne().map(s=>[s.id,s]));let i=e;for(;Je.length>0&&i>0;){const s=Je[0],o=s.ids.slice(0,i),a=Yf(t,s.groupKey),r=o.map(l=>n.get(l)).filter(Boolean).map(l=>Zn(l)).join("");a==null||a.insertAdjacentHTML("beforeend",r),i-=o.length,o.length===s.ids.length?Je.shift():s.ids=s.ids.slice(o.length)}if(to){const s=to;Xa(t,s.issueId)&&(to=null,tg(t,s))}if(Je.length===0){clearTimeout(yn),yn=null;const s=Ya;Ya=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Zf(s)}}const cE=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{yn=setTimeout(e,0)}):yn=setTimeout(e,16);let Oc=0;function dE(){if(clearTimeout(yn),Je.length===0)return;const e=++Oc;cE(function t(){e===Oc&&(Nc(aE),Je.length>0&&(yn=setTimeout(t,0)))})}function ft(){var d,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=wE(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},o=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),Qf(),Js=lE();const a=ne();if(a.length===0){const f=(p=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:p.trim(),g=Ac()>0,b=f&&f.length>=2;if(g||b){const y=Ac(),$=[];b&&$.push(`search "${f}"`),g&&$.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=W({icon:z.issues,heading:"No matching issues",description:`No issues match your ${$.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=W({icon:z.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Pn(-1),Js=1/0;return}const r=Na();Ci=Qa.get(Wf(r))||null,Za=[],r==="status"?uE(e,a):r==="priority"?pE(e,a):r==="type"?mE(e,a):r==="assignee"?fE(e,a):r==="sprint"?gE(e,a):e.innerHTML=Ai(a)+wn(null,a),Js=1/0,eo=e.firstElementChild,Je.push(...Za),Za=[];const l=Ci;Ci=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&Jf(f,!0)}),o.forEach(([f,g])=>{f&&yE(f,e,g)})),i&&(Xa(e,i.issueId)?tg(e,i):Je.length>0&&(to=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Je.length>0&&!c?Ya=n:Zf(n),dE()}function Zf(e){const t=Dp();if(t<0)return;const n=document.querySelectorAll(aa);if(n.length===0){Pn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Pn(i),n[i].classList.add("keyboard-selected")}function uE(e,t){const n={};Ml.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Ai(t);Ml.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
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
        `)}),e.innerHTML=i}function pE(e,t){const n={};qp.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Ai(t);qp.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
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
        `)}),e.innerHTML=i}function mE(e,t){const n={};Kf.forEach(s=>n[s]=[]),t.forEach(s=>{const o=s.issue_type||"task";n[o]&&n[o].push(s)});let i=Ai(t);Kf.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
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
        `)}),e.innerHTML=i}function fE(e,t){const n={},i="__unassigned__";n[i]=[];const s=js({includeIdle:!0});s.forEach(({assignee:a})=>{n[a.id]=[]}),t.forEach(a=>{a.assignee_id&&n[a.assignee_id]?n[a.assignee_id].push(a):n[i].push(a)});let o=Ai(t);n[i].length>0&&(o+=`
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
        `}),e.innerHTML=o}function gE(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const o={active:0,planned:1,completed:2},a=Ma();s.sort((l,c)=>{const d=a[l],p=a[c],f=d?o[d.status]??3:3,g=p?o[p.status]??3:3;return f-g});let r=Ai(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=a[l],p=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
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
        `),e.innerHTML=r}function Xf(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Xa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function hE(e,t){const n=Yf(e,t);if(!n)return;const i=new Map(ne().map(s=>[s.id,s]));Je=Je.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const o=s.ids.map(a=>i.get(a)).filter(Boolean).map(a=>Zn(a)).join("");return n.insertAdjacentHTML("beforeend",o),!1})}function Jf(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function vE(e,t){const n=Array.from(document.querySelectorAll(aa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(o=>t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(o)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Pn(s)}function eg(e,t,n){Jf(t,n);const i=Wf(Na());Qa.has(i)||Qa.set(i,new Set);const s=Qa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),hE(e,t.dataset.group)),vE(e,t)}function bE(e){const t=document.getElementById("issues-list"),n=t&&Xf(t,e);n&&eg(t,n,!n.classList.contains("collapsed"))}function yE(e,t=document.getElementById("issues-list"),n=void 0){var o;if(!e||!t)return;const i=Je.find(a=>a.ids.includes(e)),s=i?i.groupKey===null?null:Xf(t,i.groupKey):(o=Xa(t,e))==null?void 0:o.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||eg(t,s,!1))}function wE(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function tg(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Xa(e,t);if(!s)return;const o=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");o==null||o.focus({preventScroll:!0})}function ng(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),o=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(o)}`}function kE(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),o=Math.min(e.length,i+t.length+n),a=e.slice(s,o),r=ng(a,t);return`${s>0?"…":""}${r}${o<e.length?"…":""}`}const $E=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Zn(e){var f,g,b;const t=e.assignee_id?jt(e.assignee_id):null,n=t?$t(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":$E.format(i),o=e.estimate!=null?pi(e.estimate,e.project_id):"",a=ma(e.estimate,e.project_id),r=e.sprint_id?Ma()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),p=c&&!d?kE(e.description,c):null;return`
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
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${ng(e.title,c)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${ae(y.color)}20; color: ${ae(y.color)}">${u(y.name)}</span>
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
    `}function gt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function lt(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}le({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}bE(t.group)},"show-inline-dropdown":(e,t,n)=>{Cc(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),de(t.issueId))}});const no=new Set(["image/png","image/jpeg","image/gif","image/webp"]),Hc={file:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',clip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',remove:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>'},io=new Map,kn=new Map;function Fc(e){for(const t of e||[])t&&ks.test(t.id)&&io.set(t.id,t)}function so(e){return String(e||"").split(";")[0].trim().toLowerCase()}function ig(e){let t=kn.get(e);return t||(t={promise:null,url:null,type:null},kn.set(e,t),t.promise=h.fetchAttachmentContent(e).then(n=>(t.type=so(n.type),kn.get(e)===t&&no.has(t.type)&&(t.url=URL.createObjectURL(n)),t)),t.promise.catch(()=>{kn.get(e)===t&&kn.delete(e)})),t.promise}function _E(e){const t=kn.get(e);t!=null&&t.url&&URL.revokeObjectURL(t.url),kn.delete(e)}function sg(){for(const e of[...kn.keys()])document.querySelector(`img[data-attachment-id="${e}"]`)||_E(e)}function EE(e){return`/api/attachments/${e}/content`}function og(e,t){const n=document.createElement("a");return n.className="attachment-link",n.href=EE(e),n.setAttribute("data-action","open-attachment"),n.setAttribute("data-attachment-ref",e),t&&n.setAttribute("data-filename",t),n.innerHTML=Hc.clip,n.append(` ${t||"Download attachment"}`),n}function xE(e,t){const n=document.createElement("span");n.className="attachment-unavailable";const i=(e==null?void 0:e.status)===410?"file no longer stored":(e==null?void 0:e.status)===404?"not found":"could not be loaded";return n.textContent=`${t||"Attachment"}: ${i}`,n}function Ja(e=document){var n;const t=e.querySelectorAll("img[data-attachment-id]:not([data-attachment-state])");for(const i of t){const s=i.getAttribute("data-attachment-id");if(!ks.test(s)){i.setAttribute("data-attachment-state","invalid");continue}const o=i.getAttribute("alt")||((n=io.get(s))==null?void 0:n.filename)||"",a=io.get(s);if(a&&!no.has(so(a.content_type))){i.replaceWith(og(s,a.filename||o));continue}i.setAttribute("data-attachment-state","loading"),ig(s).then(r=>{r.url?(i.src=r.url,i.setAttribute("data-attachment-state","loaded")):i.isConnected&&i.replaceWith(og(s,o))},r=>{i.setAttribute("data-attachment-state","failed"),i.isConnected&&!i.closest(".attachment-thumb")&&i.replaceWith(xE(r,o))}).finally(Gc)}}let Uc=!1;function Gc(){Uc||(Uc=!0,queueMicrotask(()=>{Uc=!1,!(typeof document>"u")&&(Ja(document),sg())}))}let zc=null;function IE(){zc||typeof MutationObserver>"u"||!document.body||(zc=new MutationObserver(Gc),zc.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("auxclick",GE),Gc())}async function ag(e,t){try{const n=await h.fetchAttachmentContent(e),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t||"attachment",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}catch(n){_("download attachment",n)}}let $n=null;function SE(){$n==null||$n.disconnect(),$n=null;const e=document.getElementById("modal-overlay");!e||typeof MutationObserver>"u"||($n=new MutationObserver(()=>{var t;e.classList.contains("hidden")&&($n.disconnect(),$n=null,(t=document.querySelector("#modal-content .attachment-viewer"))==null||t.remove(),sg())}),$n.observe(e,{attributes:!0,attributeFilter:["class"]}))}function TE(e,t){var n,i;document.getElementById("modal-title").textContent=t||"Attachment",document.getElementById("modal-content").innerHTML=`
        <figure class="attachment-viewer">
            <img data-attachment-id="${m(e)}" alt="${m(t||"")}">
            <figcaption class="attachment-viewer-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-action="download-attachment" data-attachment-id="${m(e)}" data-filename="${m(t||"")}">Download</button>
            </figcaption>
        </figure>`,(n=document.querySelector(".modal"))==null||n.classList.add("modal-wide"),F(),SE(),(i=document.querySelector("#modal-content .attachment-viewer-actions button"))==null||i.focus(),Ja(document.getElementById("modal-content"))}async function LE(e,{filename:t="",contentType:n=""}={}){if(!ks.test(e||""))return;const i=io.get(e),s=t||(i==null?void 0:i.filename)||"";let o=so(n||(i==null?void 0:i.content_type));if(!o)try{o=(await ig(e)).type}catch(a){_("open attachment",a);return}no.has(o)?TE(e,s):ag(e,s)}let ee=null;function Vc(e){const t=Number(e)||0;return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(t<10*1024?1:0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function AE(e,{userId:t,isAdmin:n}){return n!==!1||!!t&&e.uploader_id===t}function CE(e,t){const n=no.has(so(e.content_type)),i=e.filename||"attachment",s=[Vc(e.size),e.uploader_name||"Unknown",qe(e.created_at)].filter(Boolean).map(u).join(" · ");return`
        <li class="attachment-item">
            <button type="button" class="attachment-open" data-action="open-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" data-content-type="${m(e.content_type||"")}" title="${n?"View":"Download"} ${m(i)}">
                <span class="attachment-thumb">${n?`<img data-attachment-id="${m(e.id)}" alt="">`:Hc.file}</span>
                <span class="attachment-name">${u(i)}</span>
                <span class="attachment-meta">${s}</span>
            </button>
            ${AE(e,t)?`<button type="button" class="attachment-delete" data-action="delete-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" title="Delete" aria-label="Delete ${m(i)}">${Hc.remove}</button>`:""}
        </li>`}const rg=10*1024*1024,BE=/^(image\/|video\/|audio\/|font\/)|^application\/(zip|gzip|x-gzip|x-tar|x-7z-compressed|x-rar-compressed|vnd\.rar|x-bzip2|x-xz|java-archive|vnd\.android\.package-archive|x-msdownload|wasm)$/,DE=2*1024*1024;function ME(e){const t=(e==null?void 0:e.name)||"file",n=so(e==null?void 0:e.type);return!e||e.size===0&&!n?`${t} is empty or a folder`:e.size>rg?`${t} is ${Vc(e.size)}; the limit is ${Vc(rg)}`:n&&!no.has(n)&&BE.test(n)?`${t} can't be attached: only PNG, JPEG, GIF, WebP, PDF or plain text`:null}const jE="Drop files here, or use Add. PNG, JPEG, GIF, WebP, PDF or text, up to 10 MB.";function lg(e,t){return e===null?'<p class="attachments-hint">Attachments could not be loaded.</p>':e.length?`<ul class="attachment-grid">${e.map(n=>CE(n,t)).join("")}</ul>`:`<p class="attachments-hint">${jE}</p>`}function RE(e,t,{userId:n=null,isAdmin:i=!1}={}){ee={issueId:e,attachments:t?[...t]:null,userId:n,isAdmin:i},Fc(t||[]);const s=(t==null?void 0:t.length)||0;return`
        <section class="attachments${Array.isArray(t)&&!s?" is-empty":""}" id="issue-attachments" aria-label="Attachments" data-issue-id="${m(e)}">
            <div class="related-head">
                <h3 id="attachments-heading" tabindex="-1">Attachments <span class="section-count">${s||""}</span></h3>
                <label class="ticket-gate-text-btn attachments-add">
                    + Add
                    <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${m(e)}" aria-label="Attach files">
                </label>
            </div>
            <div class="attachments-status" role="status" aria-live="polite"></div>
            <div class="attachments-body">${lg(ee.attachments,{userId:n,isAdmin:i})}</div>
        </section>`}function Kc(e){const t=document.getElementById("issue-attachments");return t&&ee&&ee.issueId===e&&t.dataset.issueId===e?t:null}function Wc(e,t){var i;const n=(i=Kc(e))==null?void 0:i.querySelector(".attachments-status");n&&(n.textContent=t)}function cg(e){const t=Kc(e);if(!t)return;const{attachments:n,userId:i,isAdmin:s}=ee;t.querySelector(".section-count").textContent=n!=null&&n.length?String(n.length):"",t.classList.toggle("is-empty",Array.isArray(n)&&n.length===0);const o=t.querySelector(".attachments-body");o.innerHTML=lg(n,{userId:i,isAdmin:s}),Ja(o)}function PE(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const qE=e=>new Promise(t=>setTimeout(t,e)),dg={inFlightRetryMs:1e3,inFlightTries:3},ug=e=>{var t;return((t=e==null?void 0:e.detail)==null?void 0:t.error_code)==="idempotency_in_flight"};async function NE(e,t){const n=PE(),i=()=>h.uploadAttachment(e,t,{idempotencyKey:n});try{return await i()}catch(s){if(!(s!=null&&s.isNetworkError)||t.size>DE)throw s}for(let s=1;;s++)try{return await i()}catch(o){if(!ug(o)||s>=dg.inFlightTries)throw o;await qE(dg.inFlightRetryMs)}}async function OE(e){try{const t=await h.getAttachments(e);return Fc(t),(ee==null?void 0:ee.issueId)===e&&(ee.attachments=[...t]),t}catch{return null}}let pg=Promise.resolve();function mg(e,t){const n=[...t||[]],i=pg.then(()=>HE(e,n));return pg=i.catch(()=>0),i}async function HE(e,t){if(!t.length)return 0;let n=0,i=!1;for(const[s,o]of t.entries()){const a=ME(o);if(a){k(a,"error");continue}Wc(e,t.length>1?`Uploading ${o.name} (${s+1} of ${t.length})…`:`Uploading ${o.name}…`);try{const r=await NE(e,o);n+=1,Fc([r]),(ee==null?void 0:ee.issueId)===e&&ee.attachments&&(ee.attachments=[...ee.attachments.filter(l=>l.id!==r.id),r])}catch(r){r!=null&&r.isNetworkError||ug(r)?(i=!0,k(`${o.name} may not have been attached; the list shows what was`,"error")):_(`attach ${o.name}`,r)}}return(ee==null?void 0:ee.issueId)===e&&(i||n&&ee.attachments===null)&&await OE(e),cg(e),Wc(e,n?n===1?"1 file attached":`${n} files attached`:""),n&&k(n===1?"File attached":`${n} files attached`,"success"),n}async function FE(e,t){if(!ks.test(e||"")||!confirm(`Delete ${t||"this attachment"}? Comments that show it will show it as missing.`))return!1;try{await h.deleteAttachment(e)}catch(a){return _("delete attachment",a),!1}io.delete(e);const n=ee==null?void 0:ee.issueId,i=(ee==null?void 0:ee.attachments)||[],s=i.findIndex(a=>a.id===e);ee!=null&&ee.attachments&&(ee.attachments=i.filter(a=>a.id!==e)),cg(n);const o=Kc(n);if(o){const a=ee.attachments||[],r=a[Math.min(Math.max(s,0),a.length-1)],l=r?o.querySelector(`.attachment-open[data-attachment-id="${r.id}"]`):(o.classList.contains("is-empty")?document.querySelector('.sidebar-actions input[data-action="pick-attachments"]'):null)||o.querySelector("#attachments-heading");l==null||l.focus(),Wc(n,`${t||"Attachment"} deleted`)}return k("Attachment deleted","success"),!0}function UE(e,t,n){if(!e)return;const i=r=>{var l;return Array.from(((l=r.dataTransfer)==null?void 0:l.types)||[]).includes("Files")},s=r=>{var l;return(l=document.getElementById("issue-attachments"))==null?void 0:l.classList.toggle("is-dragover",r)};e.addEventListener("dragover",r=>{i(r)&&(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="copy"),s(!0))},{signal:n}),e.addEventListener("dragleave",r=>{r.relatedTarget&&e.contains(r.relatedTarget)||s(!1)},{signal:n}),e.addEventListener("drop",r=>{i(r)&&(r.preventDefault(),s(!1),mg(t,r.dataTransfer.files))},{signal:n});const o=new AbortController;n==null||n.addEventListener("abort",()=>o.abort(),{once:!0});const a=()=>e.isConnected&&!e.closest(".hidden");for(const r of["dragover","drop"])document.addEventListener(r,l=>{var c,d;if(!a()){o.abort();return}!i(l)||l.defaultPrevented||e.contains(l.target)||(d=(c=l.target)==null?void 0:c.closest)!=null&&d.call(c,'input[type="file"]')||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="none"),r==="drop"&&s(!1))},{signal:o.signal})}const Yc=(e,t)=>e.type==="click"||e.type==="keydown"&&t.tagName!=="A"&&t.tagName!=="BUTTON";function fg(e){LE(e.dataset.attachmentId||e.dataset.attachmentRef,{filename:e.dataset.filename||e.getAttribute("alt")||"",contentType:e.dataset.contentType||""})}function GE(e){var n,i;if(e.button!==1)return;const t=(i=(n=e.target)==null?void 0:n.closest)==null?void 0:i.call(n,'[data-action="open-attachment"]');t&&(e.preventDefault(),fg(t))}le({"open-attachment":(e,t,n)=>{Yc(e,n)&&(e.preventDefault(),fg(n))},"download-attachment":(e,t,n)=>{Yc(e,n)&&ag(t.attachmentId,t.filename)},"delete-attachment":(e,t,n)=>{Yc(e,n)&&FE(t.attachmentId,t.filename)},"pick-attachments":(e,t,n)=>{if(e.type!=="change")return;const i=[...n.files||[]];n.value="",mg(t.issueId,i)}});const Bi={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function _n(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function oo(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Qc(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function er(e){return oo(e)&&!!Qc(e)}function tr(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],o=[];for(const a of n)((_n(a)||oo(a)&&!er(a))&&t?s:o).push(a);return{needsYou:s,waiting:o,done:i,total:n.length+i.length}}function Zc(e,t,n){return e===1?t:n}function ao(e){return _n(e)?"Review":er(e)?"Ask again for":oo(e)?"Sign off on":Qc(e)?"Re-attest":"Attest"}function Xc(e,t){return _n(e)?"an admin":oo(e)&&!er(e)?"a person":t||"the assignee"}function zE(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function gg(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${zE(t)}</span></div>`}function hg(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${Bi.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${Bi.link}Linked document</a>`}function vg(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(qe(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${ut(t.note)}</div>`:""}
            ${hg(t)}
        </div>`:""}function bg(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(qe(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function Jc(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!_n(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${bg(t)}</div>`}const Di=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function VE(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${Di(e,t)}>Send back…</button>`;return _n(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${Di(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${Di(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function KE(e,t,n){return er(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${Di(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":_n(e)||oo(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${Di(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${Di(e,t)}>Attest it yourself</button>`}function yg(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(ao(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function ed(e,t){const{needsYou:n,waiting:i,done:s,total:o}=e,a=(l,c,d,p)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(d)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var c;return a(Bi.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>a(Bi.ring,"you",l.name,"waiting on you")),...i.map(l=>a(Bi.ring,"",l.name,`waiting on ${Xc(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${o} ${Zc(o,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function WE(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=tr(e,{canAct:t});return n[0]||i[0]||null}function YE(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:o}=tr(e,{canAct:t});if(o===0)return"";const a=i[0]||s[0];return a?`Waiting on ${i.length?"you":Xc(a,n)}: ${ao(a).toLowerCase()} ${a.name}.`:`All ${o} ${Zc(o,"ritual","rituals")} done.`}function QE(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=tr(e,{canAct:n}),{needsYou:o,waiting:a,total:r}=s;if(r===0)return"";if(o.length===0&&a.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${Bi.check}</span>
                ${ed(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${Zc(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(o.length>0){const p=o[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${gg("you",p)}
                <h2 class="ticket-gate-step">${u(ao(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${ut(p.prompt)}</div>`:""}
                ${vg(p)}
                ${Jc(p)}
                <div class="ticket-gate-actions">${VE(p,t)}</div>
                ${yg([...o.slice(1),...a],"Then")}
                ${ed(s,i)}
            </section>`}const l=a[0],c=l.attestation?null:Qc(l),d=KE(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${gg(Xc(l,i),l)}
            <h2 class="ticket-gate-step">${u(ao(l))} <b>${u(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${bg(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${ut(l.prompt)}</div>`:""}
            ${vg(l)}
            ${Jc(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${yg(a.slice(1),"After that")}
            ${ed(s,i)}
        </section>`}function ZE(e,{canAct:t=!1}={}){const{needsYou:n}=tr(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(ao(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const wg={doc:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},kg=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function XE(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const $g={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4,Document:5},JE=e=>`<a href="/document/${encodeURIComponent(e.id)}" class="related-link" data-action="open-linked-document" data-document-id="${m(e.id)}"><span class="related-title">${u(e.title||"Untitled")}</span></a>`;function ex(e,t=[],n=[],{formatEstimate:i=null,documents:s=[]}={}){const o=r=>r.estimate==null?"":` · ${u(i?i(r.estimate,r.project_id||e.project_id):`${r.estimate} pts`)}`,a=[...(t||[]).map(r=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${lt(r.status)}</span>
                    ${kg(r.id,r.identifier,r.title)}
                    <span class="related-kind">Sub-issue${o(r)}</span>
                </li>`})),...(n||[]).map(r=>{const l=XE(r);return{kind:l,html:`
                <li class="related-row">
                    <span class="related-status">${lt(r.related_issue_status)}</span>
                    ${kg(r.related_issue_id,r.related_issue_identifier,r.related_issue_title)}
                    <span class="related-kind${l==="Blocked by"?" blocked":""}">${l}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(r.id)}" title="Remove link" aria-label="Remove link to ${m(r.related_issue_identifier)}">${wg.remove}</button>
                </li>`}}),...(s||[]).map(r=>({kind:"Document",html:`
                <li class="related-row">
                    <span class="related-status">${wg.doc}</span>
                    ${JE(r)}
                    <span class="related-kind">Document</span>
                </li>`}))].sort((r,l)=>$g[r.kind]-$g[l.kind]);return`
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
        </section>`}const tx=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function nx(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${tx(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(qe(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${Ns(e.content).trim()}</div>
            </div>
        </li>`}const _g=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${Ns(t).trim()}</div></details>`;function ix(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let o,a="",r="";return e.activity_type==="ritual_attested"?(o=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?a=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(a=" · waiting for review"),e.new_value&&(r=_g("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(o=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=_g("Reason",e.new_value,!0))):o=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${o}</span>${a}
                <span class="timeline-meta">· ${u(n(e))} · ${u(qe(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function sx(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function ox(e){const t=[];let n=[];const i=()=>{n.length>1?t.push(`<li class="timeline-run"><details><summary>${n.length} updates</summary><ol class="timeline timeline-run-list">${n.join("")}</ol></details></li>`):t.push(...n),n=[]};for(const s of e)s.fold?n.push(s.html):(i(),t.push(s.html));return i(),t.join("")}function ax({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:o=!1,issueId:a},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...sx(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:nx(g),fold:!1})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:ix(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i}),fold:!b&&g.activity_type!=="ritual_rejected"}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${o?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(a)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${ox(p)}</ol>`:o?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}async function Eg(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=ui(t.project_id).map(a=>`
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
        `,F();const o=document.getElementById("edit-issue-description");if(o){const a=ws(e);if(a){const r=fp(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(o.value=a,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}o.addEventListener("input",()=>{const r=o.value;r!==(t.description||"")?Mn(e,r,t.description||""):Mn(e,null)})}}catch(t){_("load issue",t)}}async function rx(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),o=document.getElementById("edit-issue-priority"),a=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!o||!a)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:o.value,issue_type:a.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);ws(t)===c.description&&Mn(t,null),H(),await de(t),k("Issue updated!","success"),Qs(d)}catch(n){_("update issue",n)}}async function lx(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Nt(),await pt(),O("issues"),k("Issue deleted!","success")}catch(t){_("delete issue",t)}}le({"update-issue":(e,t)=>{rx(e,t.issueId)}});const cx=1,dx={bold:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',italic:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',code:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',bulletList:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',blockquote:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>'},ux=[["bold","Bold"],["italic","Italic"],["code","Code"],["link","Link"],["bulletList","Bulleted list"],["blockquote","Quote"]],px="This comment uses markdown the editor would change, so it stays as markdown.";let Mi=null;function mx(){const e=document.querySelector('meta[name="chaotic-version"]'),t=e?e.getAttribute("data-editor"):"";return`/static/js/editor.bundle.js${!!t&&/^[0-9a-f]{8}$/.test(t)?`?v=${t}`:""}`}function nr(e){return e&&e.API_VERSION===cx?e:null}function fx(){const e=nr(window.ChaoticEditor);return e?Promise.resolve(e):Mi||(Mi=new Promise((t,n)=>{const i=document.createElement("script");i.src=mx(),i.async=!0,i.onload=()=>{const s=nr(window.ChaoticEditor);s?t(s):n(new Error("editor bundle is a different version"))},i.onerror=()=>{i.remove(),n(new Error("editor bundle failed to load"))},document.head.appendChild(i)}).then(t=>(Mi=null,t),t=>{throw Mi=null,t}),Mi)}const ji=new Map;function gx(e,{signal:t,mentionContext:n={},placeholder:i="",restore:s=null}={}){const o=document.getElementById(e);if(!o||o.dataset.richComposer==="true")return null;o.dataset.richComposer="true";const a=o.closest("form"),r={textarea:o,form:a,editor:null,api:null,wrapper:null,toolbar:null,note:null,mode:"markdown",syncing:!1,composing:!1,pendingApi:null,destroyed:!1,mentionContext:n,placeholder:i||o.getAttribute("placeholder")||"",start:null};return ji.set(e,r),hx(r,t),o.addEventListener("compositionstart",()=>{r.composing=!0},{signal:t}),o.addEventListener("compositionend",()=>{if(r.composing=!1,r.pendingApi){const l=r.pendingApi;r.pendingApi=null,td(r,l,{focus:document.activeElement===o})}},{signal:t}),r.start=({focus:l=!1,restoreTo:c=null}={})=>{if(r.editor||r.destroyed||Ey()==="markdown")return;const d=nr(window.ChaoticEditor);if(d){td(r,d,{focus:l,restore:c});return}fx().then(p=>{if(!(r.destroyed||r.editor||!p)){if(r.composing){r.pendingApi=p;return}td(r,p,{focus:l||document.activeElement===o})}}).catch(()=>{})},o.addEventListener("focus",()=>r.start(),{signal:t}),id(r,"markdown",{}),nr(window.ChaoticEditor)&&r.start({restoreTo:s}),a==null||a.addEventListener("focusin",()=>a.classList.add("composer-active"),{signal:t}),a==null||a.addEventListener("focusout",l=>{!a.contains(l.relatedTarget)&&!o.value&&a.classList.remove("composer-active")},{signal:t}),s&&(a==null||a.classList.add("composer-active")),o.addEventListener("input",()=>{var l,c;if(!(r.syncing||r.mode!=="rich"||!r.editor)){if(!r.api.roundTripsCleanly(r.editor,o.value,Ns)){nd(r,{focus:!0,refused:!0});return}r.editor.commands.setContent(o.value,{contentType:"markdown",emitUpdate:!1}),r.editor.commands.focus("end"),(c=(l=r.wrapper).scrollIntoView)==null||c.call(l,{behavior:"smooth",block:"nearest"})}},{signal:t}),t==null||t.addEventListener("abort",()=>yx(e,r)),r}function hx(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="toolbar rich-composer-toolbar",s.setAttribute("role","toolbar"),s.setAttribute("aria-label","Formatting"),s.innerHTML=`${ux.map(([r,l])=>`<button type="button" class="icon-btn" data-tool="${r}" title="${l}" aria-label="${l}" aria-pressed="false" tabindex="-1">${dx[r]}</button>`).join("")}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;const o=document.createElement("div");o.className="rich-composer-note",o.setAttribute("role","status"),o.hidden=!0,s.addEventListener("mousedown",r=>{r.target.closest("button")&&r.preventDefault()},{signal:t}),s.addEventListener("click",r=>{const l=r.target.closest("button[data-tool]");if(l){if(l.dataset.tool==="mode"){e.mode==="rich"?nd(e,{focus:!0,remember:!0}):xg(e,{focus:!0});return}if(!(!e.editor||e.mode!=="rich")){if(l.dataset.tool==="link"){const c=e.editor.getAttributes("link").href||"",d=window.prompt("Link URL (leave empty to remove the link)",c);if(d===null){e.editor.commands.focus();return}e.api.COMMANDS.link(e.editor,d)||k("That link can’t be added. Use an http, https or mailto address.","error")}else e.api.COMMANDS[l.dataset.tool](e.editor);ir(e)}}},{signal:t}),s.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const l=[...s.querySelectorAll("button")].filter(p=>!p.disabled&&!p.hidden),c=l.indexOf(document.activeElement);if(c<0||!l.length)return;r.preventDefault();const d=r.key==="Home"?0:r.key==="End"?l.length-1:(c+(r.key==="ArrowRight"?1:-1)+l.length)%l.length;l.forEach(p=>{p.tabIndex=-1}),l[d].tabIndex=0,l[d].focus()},{signal:t});const a=i==null?void 0:i.querySelector(".comment-box-foot");a?(a.prepend(s),i.append(o),i.classList.add("has-rich-composer")):i?(i.append(s,o),i.classList.add("has-rich-composer")):(n.insertAdjacentElement("afterend",s),s.insertAdjacentElement("afterend",o)),e.toolbar=s,e.note=o}function td(e,t,{focus:n=!1,restore:i=null}={}){vx(e,t)&&(xg(e,{focus:n||!!i,remember:!1}),i&&e.mode==="rich"&&bx(e,i))}function vx(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="rich-composer",s.hidden=!0,n.insertAdjacentElement("beforebegin",s);try{e.editor=t.createEditor({element:s,markdown:"",placeholder:e.placeholder,getMentionItems:o=>Bm(o,e.mentionContext),onUpdate:o=>{e.syncing=!0,n.value=o,n.dispatchEvent(new Event("input",{bubbles:!0})),e.syncing=!1,ir(e)},onSubmit:()=>i==null?void 0:i.requestSubmit(),onEscape:()=>e.editor.commands.blur()})}catch{return s.remove(),e.editor=null,!1}return e.wrapper=s,e.api=t,e.editor.on("selectionUpdate",()=>ir(e)),!0}function xg(e,{focus:t=!1,remember:n=!0}={}){if(n&&bp("rich"),!e.editor){e.start({focus:t});return}if(!e.api.roundTripsCleanly(e.editor,e.textarea.value,Ns)){nd(e,{focus:t,refused:!0});return}e.editor.commands.setContent(e.textarea.value||"",{contentType:"markdown",emitUpdate:!1}),id(e,"rich",{focus:t})}function nd(e,{focus:t=!1,remember:n=!1,refused:i=!1}={}){n&&bp("markdown"),id(e,"markdown",{focus:t,refused:i})}function id(e,t,{focus:n=!1,refused:i=!1}={}){const{textarea:s,editor:o,wrapper:a,toolbar:r,note:l}=e,c=t==="rich"&&!!o;e.mode=c?"rich":"markdown",s.hidden=c,a&&(a.hidden=!c),r.classList.toggle("markdown-mode",!c);const d=r.querySelector(".rich-mode-toggle");d.setAttribute("aria-pressed",String(!c)),d.title=c?"Write raw markdown":"Back to the formatted editor",l.hidden=!i,l.textContent=i?px:"",n&&(c?o.commands.focus("end"):(s.focus(),s.setSelectionRange(s.value.length,s.value.length))),ir(e)}function ir(e){if(!e.toolbar)return;const t=!!e.editor&&e.mode==="rich",n=t?e.api.activeMarks(e.editor):{};e.toolbar.querySelectorAll(".icon-btn[data-tool]").forEach(o=>{const a=!!n[o.dataset.tool];o.setAttribute("aria-pressed",String(a)),o.classList.toggle("is-active",a),o.disabled=!t,o.hidden=!t});const i=[...e.toolbar.querySelectorAll("button")],s=i.filter(o=>!o.disabled&&!o.hidden);s.some(o=>o.tabIndex===0)||(i.forEach(o=>{o.tabIndex=-1}),(s[0]||i.at(-1)).tabIndex=0)}function bx(e,{from:t,to:n}){const i=e.editor.state.doc.content.size,s=o=>Math.max(1,Math.min(o,i));try{e.editor.chain().focus().setTextSelection({from:s(t),to:s(n)}).run()}catch{e.editor.commands.focus("end")}}function yx(e,t){t.destroyed=!0,t.editor&&t.editor.destroy(),t.editor=null,document.querySelectorAll(".rich-mention-suggestions").forEach(n=>n.remove()),ji.get(e)===t&&ji.delete(e)}function wx(e){var i,s,o;const t=ji.get(e);if(t&&t.editor&&t.mode==="rich")return t.editor.commands.focus("end"),(s=(i=t.wrapper).scrollIntoView)==null||s.call(i,{behavior:"smooth",block:"nearest"}),!0;const n=document.getElementById(e);return n?(n.focus(),(o=n.scrollIntoView)==null||o.call(n,{behavior:"smooth",block:"nearest"}),!0):!1}function kx(e){const t=ji.get(e);if(!t||!t.editor||t.mode!=="rich"||!t.editor.isFocused)return null;const{from:n,to:i}=t.editor.state.selection;return{from:n,to:i}}function $x(){for(const e of ji.values())if(e.editor&&(e.editor.view.composing||e.editor.isFocused&&document.querySelector(".rich-mention-suggestions:not([hidden])")))return!0;return!1}let sd=!1,od=!1,sr=null,ro=null,lo=null,or=null,ad=!1,ar=null;function rd(e=null){ad=!0,e&&(ar=e)}function Ig(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function ld(e){return e.user_name||e.user_email||"Unknown"}const cd=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function dd(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Ve(t(e.old_value)))}</strong> to <strong>${u(Ve(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(Pe(t(e.old_value)))}</strong> to <strong>${u(Pe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${cd(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${cd(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${cd(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function co(e){const t=()=>{var i;const n=(i=xe())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;sr=n,fd(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;sr=null,fd(e)}}function Sg(){const e=re();if(!e||e.is_agent)return!1;const t=xt();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}function _x(e){const t=re(),n=se().find(a=>a.id===(e==null?void 0:e.project_id)),i=T(),s=xt()||[];if(!n||!i||n.team_id!==i.id||s.length===0)return{userId:(t==null?void 0:t.id)||null,isAdmin:null};const o=s.find(a=>a.user_id===(t==null?void 0:t.id));return{userId:(t==null?void 0:t.id)||null,isAdmin:!!o&&(o.role==="admin"||o.role==="owner")}}let uo=null,ud=!0;function pd(){var o;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!ud;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((o=e.firstElementChild)==null?void 0:o.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function Tg(){uo&&(uo.disconnect(),uo=null),ud=!0,pd()}const Ex=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function xx(){Tg();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!Ex()||(uo=new IntersectionObserver(t=>{ud=t[t.length-1].isIntersecting,pd()}),uo.observe(e))}function Ix(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let md=null;function fd(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&md===e,s=document.activeElement,o=!!t&&!!s&&(t.contains(s)||s===document.body),a=sr,r=Sg(),l=xe(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?jt(c.assignee_id):null,p=d?$t(d):(c==null?void 0:c.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,a?QE(a,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),md=e,n){const b=a?ZE(a,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",pd()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=a?YE(a,{canAct:r,assigneeName:p}):""),o&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function rr({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function Sx(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&rr({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||rr()},{signal:e})}async function lr(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await de(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function gd(e){const t=Is(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function hd({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Tx(){var a;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=xe();if(!t)return;const n=gd(t.id);ro=n.prevIssue?n.prevIssue.id:null,lo=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),o=hd(n);s?o?s.outerHTML=o:s.remove():o&&((a=i.querySelector(".back-link"))==null||a.insertAdjacentHTML("afterend",o))}wt(e=>{e==="detailNavContext"&&Tx()});let po=0;const Lg=500;function Lx(){po++}let Ag=0,cr=!1;function Cg(){if(document.querySelector(".description-inline-editor"))return"editor";if(xi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector("details.related-add[open]")||e!=null&&e.querySelector(".timeline-run details[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||cr||$x()?"transient":null}function Bg(e){return rd(),e==="editor"?"deferred":"retry"}function Ax(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=xe())==null?void 0:n.id)===e}function Cx(e){return ne().find(t=>t.id===e)||Ql(e)||Is().find(t=>t.id===e)||null}function Bx(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Tg(),md=null,di(e);const i=gd(e.id);ro=i.prevIssue?i.prevIssue.id:null,lo=i.nextIssue?i.nextIssue.id:null;const s=se().find(r=>r.id===e.project_id),o=e.assignee_id?jt(e.assignee_id):null,a=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(a)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${hd(i)}
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
            </div>`}async function de(e,t=!0,{refresh:n=!1}={}){var o;const i=n?po:++po,s=++Ag;if(n){const a=Cg();if(a)return Bg(a)}try{t&&pn();let a=!1;if(!n){const C=Cx(e);C&&(Bx(C),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${C.identifier}`),a=!0))}let r=!1;const[l,c,d,p,f,g,b,y]=await Promise.all([h.getIssue(e),h.getComments(e).catch(C=>(console.error("Failed to load comments:",C),r=!0,[])),h.getActivities(e,0,Lg),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]})),h.getAttachments(e).catch(C=>(console.error("Failed to load attachments:",C),null)),h.getIssueDocuments(e).catch(C=>(console.error("Failed to load linked documents:",C),null))]),$=[...c].sort((C,he)=>new Date(C.created_at)-new Date(he.created_at)),x=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(C=>(console.error("Failed to load sprints:",C),[]))],[w,E]=await Promise.all(x);if(i!==po)return"dropped";let L=null,V=null,D=null;if(n){if(s!==Ag||!Ax(e))return"dropped";const C=Cg();if(C)return Bg(C);D=window.scrollY;const he=document.activeElement;V=kx("new-comment"),he!=null&&he.id&&document.getElementById("issue-detail-view").contains(he)&&(L={id:he.id,start:he.selectionStart,end:he.selectionEnd})}sr=g,t&&!a&&history.pushState({issueId:e,view:A()},"",`/issue/${l.identifier}`),di(l),Pp(E),ad=!1,ar=null,document.querySelectorAll(".view").forEach(C=>C.classList.add("hidden"));const N=document.getElementById("issue-detail-view");N.classList.remove("hidden");const K=A()||"my-issues",Y=se().find(C=>C.id===l.project_id),P=l.assignee_id?jt(l.assignee_id):null,Z=P?$t(P):null,I=l.sprint_id?E.find(C=>C.id===l.sprint_id):null,B=gd(l.id),{prevIssue:j,nextIssue:me}=B;N.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(K)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${hd(B)}
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
                            ${Z?`${yt(P,"avatar-small")}<span>${u(Z)}</span>`:'<span class="text-muted">Unassigned</span>'}
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

                    ${w?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(w.identifier)}" data-action="navigate-issue" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">${w.identifier}: ${u(w.title)}</a>
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

                    ${RE(l.id,b,_x(l))}

                    ${ex(l,p,f,{formatEstimate:pi,documents:y})}

                    ${ax({comments:$,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((o=WE(g,{canAct:Sg()}))==null?void 0:o.name)||null,activitiesTruncated:d.length>=Lg},{formatText:dd,formatActor:ld})}

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
                                ${l.labels&&l.labels.length>0?l.labels.map(C=>`
                                        <span class="issue-label" style="background: ${ae(C.color)}20; color: ${ae(C.color)}">${u(C.name)}</span>
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
        `,or&&or.abort(),or=new AbortController;const{signal:ve}=or;xx(),fd(l.id),oc("new-comment","mention-suggestions",{projectId:l.project_id}),Pm({signal:ve}),Sx(ve),UE(N.querySelector(".detail-main"),l.id,ve),Ja(N);const Se=document.getElementById("new-comment");if(cr=!1,Se){Se.addEventListener("compositionstart",()=>{cr=!0},{signal:ve}),Se.addEventListener("compositionend",()=>{cr=!1},{signal:ve});const C=pp(l.id);C&&(Se.value=C),Se.addEventListener("input",()=>{ea(l.id,Se.value)}),Se.addEventListener("keydown",he=>{var te;he.key==="Enter"&&(he.metaKey||he.ctrlKey)&&(he.preventDefault(),(te=Se.closest("form"))==null||te.requestSubmit())}),gx("new-comment",{signal:ve,mentionContext:{projectId:l.project_id},placeholder:"Add a comment…",restore:V})}ro=j?j.id:null,lo=me?me.id:null;const Ut=C=>{var oe;if((C.metaKey||C.ctrlKey)&&C.shiftKey&&(C.key===">"||C.key==="."||C.code==="Period")&&Sa()){C.preventDefault();return}if(C.metaKey||C.ctrlKey||C.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||C.target.tagName==="INPUT"||C.target.tagName==="TEXTAREA"||C.target.tagName==="SELECT"||C.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||xi())return;C.key==="ArrowLeft"&&ro?(C.preventDefault(),de(ro)):C.key==="ArrowRight"&&lo?(C.preventDefault(),de(lo)):C.key==="c"?(C.preventDefault(),C.stopImmediatePropagation(),wx("new-comment")):C.key==="j"?(C.preventDefault(),C.stopImmediatePropagation(),dr(1)):C.key==="k"?(C.preventDefault(),C.stopImmediatePropagation(),dr(-1)):C.key==="d"&&(C.preventDefault(),(oe=document.querySelector('[data-action="edit-description"]'))==null||oe.click());const te={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[C.key];if(te){const _e=document.querySelector(`.property-row[data-field="${te}"]`);_e&&(C.preventDefault(),_e.click())}};if(document.addEventListener("keydown",Ut,{signal:ve}),L){const C=document.getElementById(L.id);if(C&&(C.focus({preventScroll:!0}),typeof L.start=="number"&&typeof C.setSelectionRange=="function"))try{C.setSelectionRange(L.start,L.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==po)return"dropped";_("load issue",a);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;r.innerHTML=W(l?{icon:z.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:z.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Dx(e,t){if(e.preventDefault(),sd)return!1;const n=document.getElementById("new-comment").value;ea(t,null),sd=!0;try{const i=await h.createComment(t,n);k("Comment added!","success"),_s(i),await de(t)}catch(i){ea(t,n),_("add comment",i)}finally{sd=!1}return!1}async function Mx(e){const t=xe()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const o=document.getElementById("edit-description"),a=ws(e),r=document.getElementById("description-draft-warning");if(a){o.value=a;const c=fp(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}oc("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),o.addEventListener("input",()=>{const c=o.value;c!==(t.description||"")?Mn(e,c,t.description||""):Mn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Dg()}),o.addEventListener("keydown",c=>{var d,p;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),o.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Mn(e,null),ad){de(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Fn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(od)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=ar?ar.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");od=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Mn(e,null),k("Description updated","success"),await de(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){_("update description",y)}finally{od=!1,p&&(p.disabled=!1)}})}function Dg(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Fn(n):'<span class="text-muted">Nothing to preview.</span>'}function jx(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const o=e==="preview";t.classList.toggle("active",!o),n.classList.toggle("active",o),i.style.display=o?"none":"block",s.style.display=o?"block":"none",o?Dg():i.focus()}function Rx(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,F(),document.getElementById("relation-issue-search").focus()}async function Px(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function qx(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Nx(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Ox(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),H(),k("Relation added","success"),de(t)}catch(s){_("add relation",s)}return!1}async function Hx(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),de(e)}catch(n){_("remove relation",n)}}function dr(e){const t=xe();if(!t)return;const n=Is();if(!n||n.length===0)return;const i=n.findIndex(o=>o.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||de(n[s].id)}function Mg(e,t){e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button===1||(e.preventDefault(),Ie(t))}le({"retry-issue-comments":(e,t)=>{de(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{c_(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Mx(t.issueId)},"open-gate-document":(e,t)=>Mg(e,t.documentId),"open-linked-document":(e,t)=>Mg(e,t.documentId),"scroll-to-ticket-gate":()=>{Ix()},"save-comment":(e,t)=>{Dx(e,t.issueId)},"show-add-relation-modal":(e,t)=>{rr(),Rx(t.issueId)},"remove-relation":(e,t)=>{Hx(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{rr(),gf(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Ox(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Px(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{qx(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Nx()},"set-description-editor-mode":(e,t)=>{jx(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>dr(-1),"navigate-next-issue":()=>dr(1),edit:(e,t)=>Eg(t.issueId),delete:(e,t)=>lx(t.issueId)});function Fx(e){return e==="gate"?"Sign off":"Approve"}function Ux(e){return Object.entries(e||{}).filter(([,t])=>t!=null).map(([t,n])=>`data-${t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`)}="${m(String(n))}"`).join(" ")}function jg(e,{approveAction:t,sendBackAction:n=null,data:i={},busy:s=!1,size:o="",sendBackClass:a="ticket-gate-text-btn"}={}){const r=Ux(i),l=s?' aria-disabled="true" aria-busy="true"':"",d=[`<button type="button" class="${o==="sm"?"btn btn-primary btn-sm":"btn btn-primary"}" data-action="${m(t)}" ${r}${l}>${Fx(e)}</button>`];return n&&d.push(`<button type="button" class="${m(a)}" data-action="${m(n)}" ${r}${l}>Send back…</button>`),d}const Gx={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open",sprint_ritual:"Sprint"};let Ri=0,Ot=!1,$e=null,En=null;const Pi=new Set,mo=new Map,Rg=new Set(["review_requested","gate_pending","sprint_ritual"]),vd={all:null,approvals:["review_requested","gate_pending","sprint_ritual"],mentions:["mention"],assigned:["assignment"]};let st="all";const Et=new Map,nn=new Set,qi=new Map,ur=new Set,Ht=new Map,ht=new Map;function Pg(e){Ht.get(e)===null&&Ht.set(e,Ri)}function bd(e){const t=ht.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Ri)}const pr="inbox-list";let Me={id:pr};function zx(e,t,{empty:n="",reload:i=null}={}){Me={id:e,empty:n,reload:i},$e=null,Mt(qg(t||[])),Fi()}function qg(e){return e.filter(t=>!Ht.has(t.id)).map(t=>{const n=ht.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Ot&&ht.has(t.id)&&t.id!==$e))}function Vx(e){for(const[t,n]of Ht)n!==null&&e>n&&Ht.delete(t);for(const[t,n]of ht)n.confirmedAfter!==null&&e>n.confirmedAfter&&ht.delete(t)}function Kx(e,t){t!=null&&t.id&&(e==="archived"?(Ht.has(t.id)||Ht.set(t.id,null),Pg(t.id)):e==="read"&&bd(t.id))}async function Ni(){const e=T();if(e){try{const t=await h.getInboxUnreadCount(e.id);Ls(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Oi()}}function Oi(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=oa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0&&st==="all"?`${t} unread`:"")}async function Hi({focusFirst:e=!1,background:t=!1}={}){var o;const n=T();if(!n)return;if(Me.id!==pr){const a=document.getElementById(Me.id);if(a&&!a.closest(".view.hidden")&&A()!=="inbox"){t&&((o=Me.reload)==null||o.call(Me));return}Me={id:pr}}const i=document.getElementById("inbox-list");if(!i)return;const s=++Ri;t||(En={focusFirst:e||!!(En!=null&&En.focusFirst)},$e=null,Wx(i));try{const a=await h.getInbox(n.id,{unread:Ot,kinds:vd[st],limit:100,includeArchived:st==="approvals"});if(s!==Ri)return;const r=new Set(Ht.keys());Vx(s);const l=Kg(qg(a||[])),c=En;En=null,c?(Mt(l),Fi(),c.focusFirst&&!Ke()&&Zx()):Yx(l,r)}catch(a){if(s!==Ri)return;En?(En=null,i.innerHTML=W({icon:z.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),_("load inbox",a)):console.error("Failed to refresh inbox:",a)}Ni()}function Wx(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function mr(e){return e&&[...document.querySelectorAll(`#${Me.id} .inbox-row`)].find(t=>t.dataset.entryId===e)||null}function Ng(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Og(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,`#${Me.id} .inbox-row`);return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Hg(e,t){if(!e)return;const n=mr(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Ng(n||t)),i==null||i.focus({preventScroll:!0})}function Yx(e,t){const n=document.getElementById(Me.id);if(!n)return;const i=ie(),s=[...n.querySelectorAll(".inbox-row")],o=n.querySelector(".inbox-row.keyboard-selected"),a=(o==null?void 0:o.dataset.entryId)||null,r=o?s.indexOf(o):-1,l=Og(),c=window.scrollY,d=n.scrollTop;let p=e,f=null;if($e&&!e.some(y=>y.id===$e)){const y=i.find($=>$.id===$e);if(y&&Ot&&!t.has($e)){p=[...e];const $=p.findIndex(x=>x.created_at<y.created_at);p.splice($===-1?p.length:$,0,y),p=Kg(p),Rg.has(y.kind)&&(f=y)}else $e=null}Mt(p),Fi(),f&&fr(f);let g=-1;a&&(g=p.findIndex(y=>y.id===a),g===-1&&p.length&&(g=Math.min(r,p.length-1))),g>=0?fo(g,{focus:!1}):sa(-1);const b=g>=0?n.querySelectorAll(".inbox-row")[g]:null;Hg(l,b),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function Qx(e,t){if(!(t!=null&&t.id))return!1;const n=ie().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function xn(e){const t=ie();for(const n of new Set(e)){const i=mr(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const o=i.contains(document.activeElement)?Og():null,a=document.createElement("template");a.innerHTML=hr(s).trim();const r=a.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Hg(o,r)}}function fo(e,{focus:t=!0}={}){const n=document.querySelectorAll(`#${Me.id} .inbox-row`);if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){sa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),sa(i),t&&Ng(n[i]).focus({preventScroll:!0})}function Zx(){fo(0)}async function Xn(e){const t=ie(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=t[n],s=!i.read_at,o=!!i.archived_at;if($e===e&&($e=null),mo.delete(e),Et.delete(e),ur.delete(e),qi.delete(e),Ht.set(e,null),Mt(t.filter(a=>a.id!==e)),s&&Ls(Math.max(0,oa()-1)),Fi(),Oi(),fo(n,{focus:!Ke()}),!o)try{await h.archiveInbox(e),Pg(e)}catch(a){Ht.delete(e),console.error("Failed to archive inbox entry:",a)}}function Fg(e){var s,o;const t=ie(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=$e;$e=i===e?null:e,$e===e&&(Ug(e),fr(t[n])),xn([i,e]),fo(n),$e===e&&((o=(s=mr(e))==null?void 0:s.scrollIntoView)==null||o.call(s,{block:"nearest"}))}function Ug(e){const t=ie(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ht.set(e,{readAt:i,confirmedAfter:null}),Mt([...t]),Ls(Math.max(0,oa()-1)),Oi(),h.markInboxRead(e).then(()=>bd(e),s=>{var a;((a=ht.get(e))==null?void 0:a.readAt)===i&&ht.delete(e);const o=ie().find(r=>r.id===e);o&&o.read_at===i&&(o.read_at=null,Mt([...ie()]),xn([e])),Ni(),_("mark inbox entry read",s)})}function Xx(e){var i;const n=ie().findIndex(s=>s.id===e);if(n!==-1){if(Ug(e),Ot)$e===e&&($e=null),Mt(ie().filter(s=>s.id!==e)),Fi(),fo(n);else if(xn([e]),!document.activeElement||document.activeElement===document.body){const s=mr(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function Jx(){if($e===null)return!1;const e=$e;return $e=null,xn([e]),!0}function Gg(e,t){document.querySelectorAll(`#${Me.id} [data-action="reassign-inbox-entry"]`).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function e0(e){if(Pi.has(e))return;const t=ie().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=mo.get(e)||"",o=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
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
    `;const a=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),a.requestSubmit?a.requestSubmit():a.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;a.addEventListener("submit",async d=>{var y;if(d.preventDefault(),c)return;if(!ie().some($=>$.id===e)){k(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),a.isConnected&&H();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await t0(e,p);c=!1;const b=a.isConnected&&Ke();if(g){if(b&&(H(),!document.activeElement||document.activeElement===document.body)){const $=document.querySelector(`#${Me.id} .inbox-row.keyboard-selected`);(y=$==null?void 0:$.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),F()}async function t0(e,t){if(Pi.has(e))return!1;const n=ie().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",o=n.issue_identifier||"issue";Pi.add(e),Gg(e,!0);const a=(r,l)=>(Pi.delete(e),Gg(e,!1),_(r,l),!1);if(mo.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return a(`comment on ${o}`,l)}mo.set(e,i),_s(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return a(`reassign ${o} back to ${s}`,r)}return Pi.delete(e),mo.delete(e),Xn(e),!0}function n0(){zg(!Ot)}function zg(e){e!==Ot&&(Ot=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Ot;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Hi({focusFirst:!0}))}function i0(e){!(e in vd)||e===st||(st=e,Vg(),Hi({focusFirst:!0}))}function s0(){const e=new URLSearchParams(window.location.search).get("kind");!e||!(e in vd)||e===st||(st=e,Vg())}function Vg(){document.querySelectorAll('[data-action="mark-all-inbox-read"]').forEach(e=>{e.disabled=st!=="all",e.title=st==="all"?"":"Only on Everything: it marks every kind read"}),Oi(),document.querySelectorAll('[data-action="set-inbox-kind"]').forEach(e=>{const t=e.dataset.kind===st;e.classList.toggle("active",t),e.setAttribute("aria-pressed",t?"true":"false")})}async function fr(e,{force:t=!1}={}){var o;if(!e||!yd(e)||e.state==="resolved")return;const n=Et.get(e.id),i={};Et.set(e.id,(n==null?void 0:n.state)==="ready"&&!t?{...n,token:i}:{state:"loading",token:i}),t&&xn([e.id]);let s;try{if(e.kind==="sprint_ritual"){const a=await h.getLimboStatus(e.project_id);s={state:"ready",ritual:a!=null&&a.in_limbo&&(a.pending_rituals||[]).find(l=>l.id===e.ritual_id)||null,decided:null,sprintClosed:!(a!=null&&a.in_limbo)}}else{const a=await h.getTicketRitualsStatus(e.issue_id),r=((a==null?void 0:a.pending_rituals)||[]).find(c=>c.id===e.ritual_id)||null,l=r?null:((a==null?void 0:a.completed_rituals)||[]).find(c=>c.id===e.ritual_id)||null;s={state:"ready",ritual:r,decided:l}}}catch(a){console.error("Failed to load ritual for inbox entry:",a),s=(n==null?void 0:n.state)==="ready"&&!t?n:{state:"error"}}((o=Et.get(e.id))==null?void 0:o.token)===i&&(Et.set(e.id,s),xn([e.id]))}function Kg(e){if(st!=="approvals")return e;const t=e.filter(n=>n.kind==="sprint_ritual");return t.length?[...t,...e.filter(n=>n.kind!=="sprint_ritual")]:e}function o0(e){e&&X()===e&&Vs()}function yd(e){return!Rg.has(e.kind)||!e.ritual_id?!1:e.kind==="sprint_ritual"?!!e.project_id:!!e.issue_id}function wd(e,t){return e.kind==="sprint_ritual"?(t==null?void 0:t.approval_mode)==="gate"?"gate":"review":e.kind==="review_requested"?"review":"gate"}function a0(e){return(e.actions||[]).some(t=>t.kind==="approve")}function r0(e){return(e.actions||[]).length>0}function l0(e){var c;const t=d=>({meta:"",body:`<div class="inbox-decision-status">${d}</div>`});if(e.state==="resolved")return t("Already decided. Nothing is waiting on you here.");const n=Et.get(e.id);if(!n||n.state==="loading")return{meta:"",body:'<div class="inbox-decision-status" role="status">Loading the attestation…</div>'};if(n.state==="error")return t(`Couldn’t load the attestation.
            <button type="button" class="ticket-gate-text-btn accent" data-action="retry-inbox-decision"
                data-entry-id="${m(e.id)}">Try again</button>`);const i=n.ritual;if(!i){if(n.sprintClosed)return t("The sprint has closed. Nothing is waiting on you here.");if(e.kind==="sprint_ritual")return t("Already done. Nothing is waiting on you here.");if(n.decided){const d=(c=n.decided.attestation)==null?void 0:c.approved_by_name;return t(`Already decided${d?` by ${u(d)}`:""}. Nothing is waiting on you here.`)}return t("This ritual no longer applies to the ticket. Open it to see where it stands.")}const s=wd(e,i)==="review",o=i.last_rejection&&!i.last_rejection.superseded_at?i.last_rejection:null,a=i.prompt?`<details class="inbox-decision-asks" data-entry-id="${m(e.id)}"${ur.has(e.id)?" open":""}><summary>What ${u(i.name)} asks</summary>
               <div class="inbox-decision-asks-text markdown-body">${ut(i.prompt)}</div></details>`:"";let r="";e.kind==="sprint_ritual"&&s&&!i.attestation?r='<div class="inbox-decision-status">Waiting on an attestation.</div>':s&&!_n(i)?r=o?`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”. Waiting on a new attestation.</div>`:'<div class="inbox-decision-status">Not attested any more. Waiting on a new attestation.</div>':!s&&o&&(r=`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”.</div>`);const l=i.attestation;return s?l?{meta:Wg(l.attested_by_name||"Someone","attested"),body:`<div class="inbox-expanded-body inbox-expanded-markdown">
                ${l.note?`<div class="markdown-body">${ut(l.note)}</div>`:'<div class="text-muted">No note.</div>'}
                ${hg(l)}
            </div>`,after:Jc(i)+a+r}:{meta:"",body:"",after:a+r}:{meta:"Waiting on a sign-off",body:i.prompt?`<div class="inbox-expanded-body inbox-expanded-markdown"><div class="markdown-body">${ut(i.prompt)}</div></div>`:"",after:r}}function Wg(e,t){return`${u(e)} ${u(t)}`}const c0={assignment:"assigned you this",mention:"mentioned you",review_requested:"attested",gate_rejected:"sent it back",agent_status:"changed your agent"};function gr(e){const t=Et.get(e.id),n=(t==null?void 0:t.state)==="ready"?t.ritual:null;if(!n||!a0(e))return null;if(e.kind==="sprint_ritual")return n.approval_mode==="gate"?n.attestation?null:n:n.attestation&&!n.attestation.approved_at?n:null;if(e.kind==="review_requested")return _n(n)?n:null;const i=n.last_rejection&&!n.last_rejection.superseded_at;return!n.attestation&&!i?n:null}function d0(e){if(!yd(e))return[];const t=gr(e);if(e.kind==="sprint_ritual"){if(!t)return[];const a=wd(e,t);return jg(a,{approveAction:a==="review"?"approve-inbox-entry":"sign-off-inbox-entry",size:"sm",busy:nn.has(e.id),data:{entryId:e.id,ritualId:t.id,projectId:e.project_id,ritualName:t.name,...a==="gate"?{ritualArtifact:t.artifact||""}:{}}})}const n=r0(e)?`<button type="button" class="inbox-action-btn" data-action="comment-inbox-entry"
        data-entry-id="${m(e.id)}">Comment…</button>`:"";if(!t)return n?[n]:[];const i=e.kind==="review_requested",[s,o]=jg(i?"review":"gate",{approveAction:i?"approve-inbox-entry":"sign-off-inbox-entry",sendBackAction:"send-back-inbox-entry",size:"sm",sendBackClass:"inbox-action-btn",busy:nn.has(e.id),data:{entryId:e.id,ritualId:t.id,issueId:e.issue_id,ritualName:t.name,...i?{}:{ritualArtifact:t.artifact||""}}});return[s,o,n].filter(Boolean)}const u0=()=>["approve-inbox-entry","sign-off-inbox-entry","send-back-inbox-entry","comment-inbox-entry"].map(e=>`#${Me.id} [data-action="${e}"]`).join(", ");function Yg(e,t){document.querySelectorAll(u0()).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function kd(e,{comment:t=null}={}){if(nn.has(e))return!1;const n=ie().find(l=>l.id===e),i=n?gr(n):null;if(!i)return n&&k("This is no longer waiting on a decision from you.","error"),!1;const s=wd(n,i)==="review",o=n.kind==="sprint_ritual";nn.add(e),Yg(e,!0);const a=`${s?"approve":"sign off on"} ${i.name}`;try{t&&s&&qi.get(e)!==t&&(_s(await h.createComment(n.issue_id,t)),qi.set(e,t)),o?s?await h.approveAttestation(i.id,n.project_id):await h.completeGateRitual(i.id,n.project_id,t||null):s?await h.approveTicketRitual(i.id,n.issue_id):await h.completeTicketGateRitual(i.id,n.issue_id,t||null)}catch(l){return nn.delete(e),Yg(e,!1),_(a,l),fr(n,{force:!0}),!1}nn.delete(e),Et.delete(e),qi.delete(e);const r=n.issue_identifier?` on ${n.issue_identifier}`:"";return o&&o0(n.project_id),k(`${s?"Approved":"Signed off on"} ${i.name}${r}.`,"success"),Xn(e),!0}function p0(e){if(nn.has(e.entryId))return;const t=ie().find(n=>n.id===e.entryId);if((t==null?void 0:t.kind)==="sprint_ritual"){const n=e.entryId;Tm(e.ritualId,e.projectId,e.ritualName,e.ritualArtifact||"",()=>{Et.delete(n),Xn(n)});return}if(e.ritualArtifact){const n=e.entryId;Am(e.ritualId,e.issueId,e.ritualName,e.ritualArtifact,()=>{Et.delete(n),Xn(n)});return}kd(e.entryId)}function m0(e){const t=e.entryId;nn.has(t)||Lm(e.ritualId,e.issueId,e.ritualName,()=>{Et.delete(t),Xn(t)})}function f0(e){const t=ie().find(c=>c.id===e);if(!t||!t.issue_id||nn.has(e))return;const n=gr(t),i=!!n&&!(t.kind==="gate_pending"&&n.artifact),s=t.kind==="review_requested"?"Comment and approve":"Comment and sign off",o=t.issue_identifier||"the ticket";document.getElementById("modal-title").textContent=`Comment on ${o}`,document.getElementById("modal-content").innerHTML=`
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
    `;const a=document.getElementById("inbox-comment-form"),r=document.getElementById("inbox-comment-text"),l=document.getElementById("inbox-comment-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",c=>{if(c.key==="Enter"&&(c.metaKey||c.ctrlKey)){c.preventDefault();const d=a.querySelector('button.btn-primary[type="submit"]');a.requestSubmit?a.requestSubmit(d||void 0):d==null||d.click()}}),a.addEventListener("submit",async c=>{var b,y;if(c.preventDefault(),!r.value.trim()){l.classList.remove("hidden"),r.focus();return}const d=[...a.querySelectorAll('button[type="submit"]')];d.forEach($=>{$.disabled=!0});const p=((b=c.submitter)==null?void 0:b.value)==="decide";if(await g0(e,r.value,{decide:p})){H();return}d.forEach($=>{document.contains($)&&($.disabled=!1)});const g=ie().find($=>$.id===e);(!g||!gr(g))&&((y=a.querySelector('button[value="decide"]'))==null||y.remove())}),F(),r.focus()}async function g0(e,t,{decide:n=!1}={}){const i=(t||"").trim(),s=ie().find(a=>a.id===e);if(!i||!s||!s.issue_id)return!1;if(n)return kd(e,{comment:i});if(qi.get(e)===i)return qi.delete(e),k(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0;let o;try{o=await h.createComment(s.issue_id,i)}catch(a){return _(`comment on ${s.issue_identifier||"the ticket"}`,a),!1}return _s(o),k(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0}const h0='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',v0='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function b0(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function hr(e){const t=!e.read_at,n=e.id===$e,i=Gx[e.kind]||e.kind,s=`badge badge-inbox-${e.kind}`,o=e.kind==="sprint_ritual"&&e.project_id?se().find(c=>c.id===e.project_id):null,a=e.issue_identifier||e.document_title||(o==null?void 0:o.name)||"",r=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),l=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${r}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(l)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(b0(e.source_user_name))}</span>
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
                ${n?y0(e,a,l):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${h0}</button>`:""}
                    ${e.archived_at?"":`<button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${v0}</button>`}
                </span>
                <span class="inbox-row-time">${u(aw(e.created_at))}</span>
            </div>
        </div>
    `}function y0(e,t,n){const i=e.kind==="assignment"&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,o=e.source_user_name,a=t?`Open ${u(t)}`:"Open",r=yd(e),l=[...r?d0(e):[],i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Pi.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${o?` to ${u(o)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${a}</button>`:"",e.archived_at?"":`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join(""),c=r?l0(e):null,d=c0[e.kind],p=o&&e.source_user_id!==e.recipient_user_id,f=c?c.meta:p&&d?Wg(o,d):"",g=c?c.body:e.body?`<div class="inbox-expanded-body">${u(e.body)}</div>`:"";return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${f?`<div class="inbox-expanded-source">${f}</div>`:""}
            ${g||""}
            ${(c==null?void 0:c.after)||""}
            <div class="inbox-action-bar">${l}</div>
        </div>
    `}const Qg={all:{noun:"items",heading:"Inbox zero",description:"Approvals, mentions, assignments, and more will show up here."},approvals:{noun:"approvals",heading:"Nothing to approve",description:"Reviews, gates and sprint rituals waiting on you show up here. Rituals are the checks a project runs when tickets are claimed or closed and when a sprint closes."},mentions:{noun:"mentions",heading:"No mentions",description:"Comments that @mention you will show up here."},assigned:{noun:"assignments",heading:"Nothing newly assigned",description:"Tickets someone assigns to you will show up here."}};function Fi(){const e=document.getElementById(Me.id);if(!e)return;const t=ie();if(Me.id!==pr){e.innerHTML=t.length?t.map(hr).join(""):Me.empty||"";return}if(t.length===0){const n=Qg[st]||Qg.all;e.innerHTML=W({icon:z.inbox,heading:Ot?`No unread ${n.noun}`:n.heading,description:Ot?"Nothing unread right now.":n.description});return}e.innerHTML=k0(t)}function w0(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=o=>new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function k0(e){let t="";if(st==="approvals"){const i=[];for(;e.length&&e[0].kind==="sprint_ritual";)i.push(e[0]),e=e.slice(1);i.length&&(t=`
        <section class="inbox-group inbox-sprint-close" aria-labelledby="inbox-group-sprint">
            <h3 class="inbox-group-header" id="inbox-group-sprint">Sprint close <span class="section-count">${i.length}</span></h3>
            <p class="inbox-group-note text-muted">The sprint closes when these are done.</p>
            ${i.map(s=>hr(s)).join("")}
        </section>`)}const n=[];for(const i of e){const s=w0(i.created_at),o=n[n.length-1];o&&o.label===s?o.entries.push(i):n.push({label:s,entries:[i]})}return t+n.map((i,s)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${s}">
            <h3 class="inbox-group-header" id="inbox-group-${s}">${u(i.label)}</h3>
            ${i.entries.map(o=>hr(o)).join("")}
        </section>
    `).join("")}async function $0(e){var s;const t=ie().find(o=>o.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ht.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(o){((s=ht.get(e))==null?void 0:s.readAt)===n&&ht.delete(e);const a=ie().find(r=>r.id===e);a&&a.read_at===n&&(a.read_at=null,Mt([...ie()]),xn([e])),console.error("Failed to mark inbox entry read:",o);return}bd(e);const i=ie().find(o=>o.id===e);i&&!i.read_at?(i.read_at=n,Mt([...ie()]),Ls(Math.max(0,oa()-1)),Oi(),xn([e])):Ni()}async function _0(){const e=T();if(!(!e||st!=="all"))try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ie())n.read_at||ht.set(n.id,{readAt:t,confirmedAfter:Ri});Mt(ie().map(n=>({...n,read_at:n.read_at||t}))),Ls(0),Oi(),Fi()}catch(t){_("mark all inbox entries read",t)}}function E0(e){e.entryId&&$0(e.entryId),e.issueId?de(e.issueId):e.documentId&&Ie(e.documentId)}function x0(e){var n,i;const t=(n=e==null?void 0:e.dataset)==null?void 0:n.entryId;t&&((i=ie().find(s=>s.id===t))!=null&&i.archived_at||Xn(t))}function I0(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Fg(e.dataset.entryId)}const S0='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function T0(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(S0);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function L0(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}typeof document<"u"&&document.addEventListener("toggle",e=>{var n;const t=e.target;!((n=t==null?void 0:t.classList)!=null&&n.contains("inbox-decision-asks"))||!t.dataset.entryId||(t.open?ur.add(t.dataset.entryId):ur.delete(t.dataset.entryId))},!0),le({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&L0((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||T0(e.target,n)||(e.preventDefault(),t.entryId&&Fg(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),E0(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&e0(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),H()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Xn(t.entryId)},"toggle-inbox-unread-filter":()=>n0(),"set-inbox-filter":(e,t)=>zg(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&Xx(t.entryId)},"mark-all-inbox-read":()=>_0(),"set-inbox-kind":(e,t)=>i0(t.kind),"approve-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&kd(t.entryId)},"sign-off-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&p0(t)},"send-back-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&m0(t)},"close-inbox-comment":e=>{e.preventDefault(),H()},"comment-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&f0(t.entryId)},"retry-inbox-decision":(e,t)=>{e.preventDefault();const n=ie().find(i=>i.id===t.entryId);n&&fr(n,{force:!0})},"retry-load-inbox":()=>Hi({focusFirst:!0})});let go=[],Ui=[],Jn=[];function $d(){return go}function Zg(e){go=Array.isArray(e)?e:[],Xg()}function xt(){return Ui}async function vr(e=null){try{go=await(e||h.getMyTeams()),Xg()}catch(t){_("load teams",t)}}function Xg(){const e=document.getElementById("team-list");go.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=go.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function br(e,t=!1,{seed:n=null}={}){ei=null,ci(e),nh(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),Im(e.id),n&&C0(n)){let o=!1;try{B0(n),ei=e.id,t?Kl():O(A()||"my-issues"),o=!0}catch(a){console.error("Failed to paint from the boot cache:",a),ei=null}if(o){Jg(e).catch(a=>console.error("Failed to refresh team data:",a));return}}await Jg(e),t?Kl():O(A()||"my-issues")}let ei=null;function A0(){var e;return ei&&ei===((e=T())==null?void 0:e.id)?ei:null}async function Jg(e){var t;await Promise.all([pt(),Q0(),M0(),Ow(),Ni()]),((t=T())==null?void 0:t.id)===e.id&&(ei=e.id)}function C0(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function B0(e){dw(Array.isArray(e.projects)?e.projects:[]),Wp(),Kp(),Ss(Array.isArray(e.labels)?e.labels:[]),Ui=Array.isArray(e.members)?e.members:[],qw(e.agents),Ms(xt,mt),mi(),sk(e.issues)}function eh(){document.getElementById("team-dropdown").classList.toggle("hidden")}function D0(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function M0(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Ui=i,Ms(xt,mt),mi()}catch(i){console.error("Failed to load team members:",i),_("load team members",i)}}function j0(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let _d=0;async function th(){var n,i;const e=(n=T())==null?void 0:n.id;if(!e)return;const t=++_d;try{const s=await h.getTeamMembers(e);if(t!==_d||((i=T())==null?void 0:i.id)!==e)return;Ui=s,Ms(xt,mt),mi()}catch(s){if(t!==_d)return;Ui=[],_("load team members",s)}R0()}function Gi(){var n;const e=(n=re())==null?void 0:n.id,t=Ui.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function R0(){var t;const e=Gi();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let yr=0;async function wr(){var i;if(!T())return;const e=++yr,t=T().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=j0());try{const s=await h.getTeamInvitations(t);if(e!==yr||((i=T())==null?void 0:i.id)!==t)return;Jn=s,Ed()}catch(s){if(e!==yr)return;if((s==null?void 0:s.status)===403){Jn=[],Ed();return}console.error("Failed to load team invitations:",s),ih(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function nh(){yr++,Jn=[],Ed()}function ih(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function Ed(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Jn.length)),ih(Jn.length>0),Jn.length===0){e.innerHTML="";return}const n=Gi();e.innerHTML=Jn.map(i=>`
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
    `).join("")}function sh(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,F()}async function P0(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(T().id,t,n);if(await wr(),i&&i.accept_url)return O0(t,N0(i.accept_url),i.email_queued===!0),!1;H(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){q0(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):_("send invitation",i)}return!1}function q0(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function oh(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function N0(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!oh(n.hostname)||oh(i.hostname)?e:i.origin+n.pathname}function O0(e,t,n=!1){var o;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ke()||F(),(o=document.querySelector('[data-action="copy-invite-link"]'))==null||o.focus(),ah()}function ah(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function H0(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function F0(e){let t;try{t=await h.issueInvitationVerificationCode(T().id,e)}catch(n){_("get a verification code",n);return}G0(t)}function U0(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let o;return s<3600?o=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?o=`${Math.round(s/3600)} h`:o=`${Math.round(s/86400)} days`,`${o} ${n>=i?"after":"before"} the invitation was created`}function G0(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=U0(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,Ke()||F(),ah("invitation-code")}async function z0(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(T().id,e),await th(),k("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){_("remove member",t)}}async function V0(e){try{await h.deleteInvitation(T().id,e),await wr(),k("Invitation canceled!","success")}catch(t){_("cancel invitation",t)}}function rh(){eh(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,F()}function K0(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
                <textarea id="team-description">${u(T().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,F())}async function W0(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await vr(),await br(n),H(),k("Team created!","success")}catch(n){_("create team",n)}return!1}async function Y0(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(T().id,t);ci(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await vr(),H(),k("Team updated!","success")}catch(n){_("update team",n)}return!1}async function Q0(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;Ss(i)}catch(i){console.error("Failed to load labels:",i),_("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),le({"select-team":(e,t)=>{br(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||z0(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||V0(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||F0(t.invitationId)},"retry-load-team-invitations":()=>{wr()},"invite-member":e=>{P0(e)},"copy-invite-link":()=>{H0()},"dismiss-invite-link":()=>{H()},"create-team":e=>{W0(e)},"update-team":e=>{Y0(e)}});let Ft=null,sn=0,zi=null,Vi=null,ho=null,xd=!1;function Z0(){return fy()}function lh(){gy()}function ch(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function X0(){Ft||(Ft=document.createElement("div"),Ft.id="onboarding-overlay",Ft.className="onboarding-overlay",document.getElementById("app").appendChild(Ft))}function vo(){if(!Ft)return;const e=xd?uh():dh(),t=e[sn],n=e.map((i,s)=>`<span class="onboarding-dot${s===sn?" active":""}${s<sn?" completed":""}"></span>`).join("");Ft.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function dh(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ch(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=ch(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&zi&&(e.textContent=`${zi.name} (${zi.key})`),t&&Vi&&(t.textContent=`${Vi.name} (${Vi.key})`),n&&ho&&(n.textContent=`${ho.identifier} - ${ho.title}`)}}]}function uh(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Id(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Sd(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ki(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function J0(){const e=xd?uh():dh();sn<e.length-1&&(sn++,vo())}function eI(){lh(),mh(),ti()}function tI(){lh(),mh(),ti()}async function nI(e){e.preventDefault(),Sd("onboarding-team-error"),Ki("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{zi=await h.createTeam({name:t,key:n}),sn++,vo()}catch(i){Id("onboarding-team-error",i.message||"Failed to create team"),Ki("onboarding-team-submit",!1)}}async function iI(e){e.preventDefault(),Sd("onboarding-project-error"),Ki("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Vi=await h.createProject(zi.id,{name:t,key:n}),sn++,vo()}catch(i){Id("onboarding-project-error",i.message||"Failed to create project"),Ki("onboarding-project-submit",!1)}}async function sI(e){e.preventDefault(),Sd("onboarding-issue-error"),Ki("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{ho=await h.createIssue(Vi.id,{title:t}),sn++,vo()}catch(n){Id("onboarding-issue-error",n.message||"Failed to create issue"),Ki("onboarding-issue-submit",!1)}}function ph(e=!1){xd=e,sn=0,zi=null,Vi=null,ho=null,X0(),vo()}function mh(){Ft&&(Ft.remove(),Ft=null)}function fh(){hy(),ph(!0)}le({"onboarding-next":e=>{e.preventDefault(),J0()},"onboarding-skip":e=>{e.preventDefault(),eI()},"onboarding-finish":e=>{e.preventDefault(),tI()},"onboarding-create-team":e=>{nI(e)},"onboarding-create-project":e=>{iI(e)},"onboarding-create-issue":e=>{sI(e)}});const gh="/oauth/consent/";function oI(e){if(!e||!e.startsWith(gh))return null;const t=e.slice(gh.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function aI(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function rI(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function lI(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const hh={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function kr(e){const t=hh[e.trust]||hh.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function cI(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function dI(e,t){const n=e&&t?e.agents.find(o=>o.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function vh(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",o=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+o)}</option>`)}return n.join("")}function bh(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function uI(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function pI(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
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
        </div>`}function mI(e,t){if(t.acts_as==="person"){pI(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),o=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
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
                    <select id="oauth-team" ${r?"disabled":""}>${cI(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${vh(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${bh(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${uI(t)}
                </fieldset>
                ${o}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Td(e,t)}function Td(e,t){var o;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const a=(o=e.querySelector("#oauth-team"))==null?void 0:o.value,r=dI(t.teams.find(l=>l.id===a),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function fI(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(a=>a.value),s=e.querySelector('input[name="oauth-policy"]:checked'),o={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const a=e.querySelector("#oauth-agent-name").value.trim();a&&(o.agent_name=a)}return o}function gI(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function bo(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function hI(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function vI(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=vh(d,null),e.querySelector("#oauth-projects").innerHTML=bh(d),Td(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Td(e,n));let o=!1;const a=async d=>{if(!o){o=!0;try{const p=d?await h.approveOAuthRequest(t,fI(e)):await h.denyOAuthRequest(t);if(!aI(p.redirect)){bo(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(o=!1,p&&p.status===404){bo(e,"It has expired, was already answered, or belongs to someone else.");return}gI(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),a(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>a(!1))}async function bI(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=rI();lI(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(o){o&&o.status===404?bo(i,"It has expired, was already answered, or belongs to someone else."):o&&o.status===403&&o.detail&&o.detail.error_code==="web_login_required"?hI(i,n):o&&o.status===403?bo(i,"Only a person signed in to Chaotic can approve an app."):bo(i,o&&o.message||"Something went wrong");return}mI(i,s),vI(i,e,s,t)}const Ld="/invite/",yo="/invite",Ad="chaotic.inviteToken",yh="invite-auth-notice";let Cd=null;const yI="This invitation is no longer valid.",wI={owner:"an owner",admin:"an admin",member:"a member"};function kI(e){if(!e||!e.startsWith(Ld))return null;const t=e.slice(Ld.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function wh(){const{pathname:e}=window.location,t=kI(e);if(t){Cd=t;try{sessionStorage.setItem(Ad,t)}catch{}return history.replaceState(null,"",yo),t}if(!kh(e))return null;let n=null;try{n=sessionStorage.getItem(Ad)}catch{}const i=n||Cd;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function kh(e){return e===yo||e===`${yo}/`}function $h(e){return kh(e)||!!(e&&e.startsWith(Ld))}function Bd(){Cd=null;try{sessionStorage.removeItem(Ad)}catch{}}function $I(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function _I(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Dd(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function _h(){const e=_I();return $r(),Dd(e),e}function EI(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),$r()}function $r(){var e;(e=document.getElementById(yh))==null||e.remove()}function Md(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=wI[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${xI(e)}</p>`}function xI(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const II="Ask whoever invited you to send a new invitation.",SI="Reload the page to try again.";function jd(e,t=yI,n=II){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function TI(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Eh(){window.location.pathname!==yo&&history.replaceState(null,"",yo),TI(_h())}function LI(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Md(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function AI(e,t,n){const i=$I(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Md(t)}
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
            ${Md(t)}
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
        </div>`}function CI(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function BI(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),o=e.querySelector("#invite-code-form"),a=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=p=>{l.textContent=p,l.classList.remove("hidden")},d=()=>{var p;o.classList.remove("hidden"),(p=a.focus)==null||p.call(a)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=CI(p.expires_at);c(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}c(p&&p.message||"Something went wrong"),p&&p.status===429&&d()}finally{s.disabled=!1}}}),o.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=a.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=a.select)==null||g.call(a));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function DI(e,t){$r();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=yh,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),$r(),t()})}function _r(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function MI(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,p;const o=_h();o.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let a;try{a=await h.getInvitation(e)}catch(f){f&&f.status===404?(Bd(),jd(o)):jd(o,f&&f.message||"Something went wrong.",SI);return}if(!t){LI(o,a);const f=g=>{DI(a,()=>Dd(o)),n(g)};o.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),o.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}AI(o,a,t),(d=o.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=o.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch($){l=!1,r.disabled=!1;const x=$&&$.detail&&$.detail.error_code;if(f!==void 0&&(x==="invalid_verification_code"||x==="invitation_code_expired"||$&&$.status===429)){_r(o,$&&$.message||"That code did not work."),(y=(b=o.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}$&&$.status===401?s():$&&($.status===404||$.status===400)?(Bd(),jd(o)):$&&$.status===403&&$.detail&&$.detail.error_code==="email_unverified"?(_r(o,"Verify your email address to continue."),o.querySelector("#invite-accept-actions").classList.add("hidden"),o.querySelector("#invite-verify").classList.remove("hidden")):$&&$.status===403?_r(o,`This invitation is for a different email address. Only ${a.email_hint} can accept it.`):_r(o,$&&$.message||"Something went wrong");return}Bd(),xh(o,a);try{await i(g.team_id,a.team_name)}catch($){console.error("Joined the team but could not open it:",$),Dd(o),xh(o,a)}};r.addEventListener("click",()=>c()),(p=o.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=o.querySelector("#invite-admin-code").value.trim();g&&c(g)}),BI(o,{onVerified:()=>{o.querySelector("#invite-verify").classList.add("hidden"),o.querySelector("#invite-error").classList.add("hidden"),o.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function xh(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function Rd(e){return MI(e,{user:re(),showAuth:t=>{$o(),t==="signup"?Ah():Lh()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),EI(),await ti({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Bt(null),ci(null),Rd(e)}})}async function Ih(){const e=wh();if(e){await Rd(e);return}if($h(window.location.pathname)){Eh();return}$o()}async function ti({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=oI(window.location.pathname);if(i){await bI(i);return}const s=wh();if(s){await Rd(s);return}if($h(window.location.pathname)){Eh();return}FI(),cm(),Er(),NI();const o=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(o){await jI(n,o,t);return}await vr(t);const a=$d();if(a.length===0&&!Z0()){ph();return}a.length===0&&Rn("my-issues");try{if(a.length>0){const c=e&&a.find(d=>d.id===e)||a[0];await br(c,!0)}}finally{pm()}}async function jI(e,t,n){Zg(e.teams);try{await br(t,!0,{seed:e})}finally{pm()}Promise.resolve(n||vr().then($d)).then(async i=>{var o;if(!Array.isArray(i))return;Zg(i);const s=i.find(a=>a.id===t.id);if(!s){await PI(),window.location.reload();return}if(((o=T())==null?void 0:o.id)===s.id&&s.name!==T().name){ci(s);const a=document.getElementById("current-team-name");a&&(a.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const RI=2e3;let Wi=null,Sh=!1,Th=!1;function PI(){return Th=!0,clearTimeout(Wi),Wi=null,xl()}function Pd(){if(clearTimeout(Wi),Wi=null,Th)return Promise.resolve();const e=re(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||wp(kl())!==e.id||A0()!==t.id?Promise.resolve():Ay(e.id,{user:e,teams:$d(),teamId:t.id,projects:se(),labels:Bl(),members:xt(),agents:mt(),issues:ik({maxQueries:3})})}function qI(){clearTimeout(Wi),Wi=setTimeout(Pd,RI)}function NI(){Sh||(Sh=!0,Zw(qI),document.addEventListener("visibilitychange",OI),window.addEventListener("pagehide",HI))}function OI(){document.visibilityState==="hidden"&&Pd()}function HI(){Pd()}let Yi=null,wo=null,It=null,St=null;function ko(){Yi||(Yi=document.getElementById("auth-screen"),wo=document.getElementById("main-screen"),It=document.getElementById("login-form"),St=document.getElementById("signup-form"))}function $o(){ko(),Yi&&Yi.classList.remove("hidden"),wo&&wo.classList.add("hidden")}function FI(){ko(),Yi&&Yi.classList.add("hidden"),wo&&wo.classList.remove("hidden")}function Lh(){ko(),It&&It.classList.remove("hidden"),St&&St.classList.add("hidden")}function Ah(){ko(),It&&It.classList.add("hidden"),St&&St.classList.remove("hidden")}async function UI(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Bt(await h.getMe()),await ti(),k("Welcome back!","success")}catch(i){_("log in",i)}return!1}async function GI(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Bt(await h.getMe()),await ti(),k("Account created successfully!","success")}catch(s){_("sign up",s)}return!1}function Ch(){h.logout(),Bt(null),ci(null),$o(),k("Signed out","success")}function zI(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Er(){var i;const e=re();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Ep(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?zI(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function VI(){ko();const e=It==null?void 0:It.querySelector("form");e&&e.addEventListener("submit",s=>UI(s));const t=St==null?void 0:St.querySelector("form");t&&t.addEventListener("submit",s=>GI(s));const n=It==null?void 0:It.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Ah()});const i=St==null?void 0:St.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Lh()})}let qd=[];async function Nd(){try{qd=await h.getApiKeys(),KI()}catch(e){_("load API keys",e)}}function KI(){const e=document.getElementById("api-keys-list");if(e){if(qd.length===0){e.innerHTML=W({icon:z.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=qd.map(t=>`
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
    `).join("")}}function WI(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,F()}async function YI(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,F()}catch(n){_("create API key",n)}return!1}async function QI(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function ZI(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await Nd()}catch(n){_("revoke API key",n)}}le({"create-api-key":e=>{YI(e)},"copy-api-key":()=>{QI()},"dismiss-api-key-modal":()=>{H(),Nd()},"revoke-api-key":(e,t)=>{ZI(t.keyId,t.keyName)}});let Od=[];async function Bh(){try{Od=await h.getConnections(),JI()}catch(e){_("load connected apps",e)}}function Hd(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function XI(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function JI(){const e=document.getElementById("connected-apps-list");if(e){if(Od.length===0){e.innerHTML=W({icon:z.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Od.map(t=>t.acts_as==="person"?eS(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Hd(t))} ${kr(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(XI(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Le(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Le(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Hd(t))}">Disconnect</button>
        </div>
    `).join("")}}function eS(e){const n=`${e.device_name||"A device"} · ${Hd(e)}`;return`
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
    `}async function Dh(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),k("App disconnected","success"),await Bh()}catch(n){_("disconnect app",n)}}le({"revoke-connection":(e,t)=>{Dh(t.connectionId,t.connectionName)}});let Fd=[];async function Mh(){try{Fd=await h.getPushDevices(),tS()}catch(e){_("load push devices",e)}}const jh={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Rh(e){return e.label||e.platform||"Unnamed device"}function tS(){const e=document.getElementById("push-devices-list");if(e){if(Fd.length===0){e.innerHTML=W({icon:z.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Fd.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Rh(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Le(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Le(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${jh[t.status]?`<span class="push-device-status">${u(jh[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(Rh(t))}">Remove</button>
        </div>
    `).join("")}}async function nS(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),k("Device removed","success"),await Mh()}catch(n){_("remove push device",n)}}le({"remove-push-device":(e,t)=>{nS(t.installationId,t.deviceName)}});let xr=!1,on=0,In=[],Ir=[];function iS(e){Ir=e,In=[...e]}function Sn(){return xr}function sS(){if(xr)return;xr=!0,on=0,In=[...Ir];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Sr()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>oS(n.target.value)),t.addEventListener("keydown",rS),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&aS(Number(i.dataset.commandIndex))}),_o(),requestAnimationFrame(()=>t.focus())}function Sr(){xr=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function oS(e){const t=e.toLowerCase().trim();t?In=Ir.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):In=[...Ir],on=0,_o()}function _o(){const e=document.getElementById("command-results");if(!e)return;if(In.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};In.forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)});let n="",i=0;for(const[o,a]of Object.entries(t)){n+=`<div class="command-group">
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function aS(e){on=e,_o()}function Ph(e){const t=In[e];t&&(Sr(),t.action())}function rS(e){switch(e.key){case"ArrowDown":e.preventDefault(),on=Math.min(on+1,In.length-1),_o();break;case"ArrowUp":e.preventDefault(),on=Math.max(on-1,0),_o();break;case"Enter":e.preventDefault(),Ph(on);break;case"Escape":e.preventDefault(),Sr();break}}le({"execute-command":(e,t)=>{Ph(Number(t.commandIndex))}});const Ud=new Map;function lS(e,t){Ud.set(e,t)}function cS(e){var n;const t=Ud.has(e)&&document.getElementById(Ud.get(e));return t?(t.focus(),(n=t.select)==null||n.call(t),!0):!1}const dS=[{title:"Navigation",shortcuts:[{key:"m",description:"Home"},{key:"i",description:"Issues"},{key:"b",description:"Issues as a board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals (in Project settings)"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Filter this screen, or search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function uS(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function pS(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(uS).join("")}
    </div>`}function qh(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${dS.map(pS).join("")}
        </div>
    `,F()}const Tr=100,Gd="status!=done,canceled",mS=["created","updated","priority","status","title","estimate"];function Ae(e){return e==null?"":u(String(e))}function Nh(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Ae(n)}</a>`}function Oh(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const zd=[{id:"identifier",label:"ID",fixed:!0,render:e=>Nh(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Nh(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Ae(Ve(e.status))},{id:"priority",label:"Priority",render:e=>Ae(Pe(e.priority))},{id:"type",label:"Type",render:e=>Ae(bt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Ae(Oh(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Ae(Oh(e,"creator"))},{id:"project",label:"Project",render:e=>Ae(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Ae(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ae(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Ae(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Ae(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Ae(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Ae(Le(e.created_at))},{id:"updated",label:"Updated",render:e=>Ae(Le(e.updated_at))},{id:"completed",label:"Completed",render:e=>Ae(Le(e.completed_at))},{id:"due",label:"Due",render:e=>Ae(Le(e.due_date))}],Lr=Object.fromEntries(zd.map(e=>[e.id,e])),fS=zd.filter(e=>e.fixed).map(e=>e.id),Vd=["identifier","title","status","priority","assignee","updated"];function Kd(e){const t=new Set,n=[];for(const s of e||[]){const o=String(s).trim();!Lr[o]||t.has(o)||(t.add(o),n.push(o))}return n.length===0?[...Vd]:[...fS.filter(s=>!t.has(s)),...n]}function gS(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function hS(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Kd(t.get("cols").split(",")):[...Vd],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function vS(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!gS(e.cols,Vd)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function bS(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function yS({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Tr,skip:o=0}){const a=["chaotic","issue","list"];let r=e||"",l=null;n||i?(a.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",a.push("--where",bS(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],p=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;mS.includes(f)?(a.push("--sort",f,"--order",p?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return a.push("--limit",String(s)),o>0&&a.push("--skip",String(o)),{command:a.join(" "),warning:l}}function wS(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function kS(e,t){const n=Kd(t).map(o=>Lr[o]),i=n.map(o=>`<th data-col="${m(o.id)}">${Ae(o.label)}</th>`).join(""),s=e.map(o=>`<tr class="query-row" data-issue-id="${m(o.id)}">${n.map(a=>`<td class="query-col-${m(a.id)}">${a.render(o)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function $S(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,o=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${o?"":" disabled"}>Next</button>`}let q=null,Wd=null,ot=null,Yd=0,Qi=!1,Hh=!1;function ge(e){return document.getElementById(e)}function Fh(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Uh(e){const t=vS({...Wd,cols:q.cols,group:q.group,view:q.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Qd(){q&&ua(q.teamScope?null:q.projectId)}function _S(){q&&(!q.teamScope&&q.projectId!==X()?kt(q.projectId):Qd())}function ES(){const e=ge("query-columns-menu");e&&(e.innerHTML=zd.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${q.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Ae(t.label)}
        </label>`).join(""))}function Ar(e){const t=ge("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Ae(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Gh(e){const t=ge("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Zd(e){var t;(t=ge("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Eo(){const e=ge("query-results"),t=ge("query-pager");if(!e)return;if(!ot){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=ot;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=kS(n,q.cols),t&&(t.innerHTML=$S(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(o=>{o.dataset.enabled=String(!o.disabled)}),Qi&&Zd(!0))}async function Cr(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!q)return;const i=T(),s=q.teamScope?{teamId:i==null?void 0:i.id}:{projectId:q.projectId};if(!s.teamId&&!s.projectId){ot=null,Eo(),Ar(q.teamScope?"Select a team first.":"Select a project.");return}const o=++Yd,a=q.where===null?Gd:q.where,r=ge("query-results");Qi=!0,r&&r.classList.add("loading"),Zd(!0);const l=()=>o===Yd&&A()==="query";try{const c=await h.queryIssues({...s,where:a,order:q.order,skip:(q.page-1)*Tr,limit:Tr});if(!l())return;q.where=c.where,q.order=c.order||null,Wd=Fh(q),ot={issues:c.issues||[],total:c.total,skip:c.skip};const d=ge("query-where");d&&d.value.trim()===a.trim()&&(d.value=c.where),Ar(null),Qi=!1,Eo(),Uh(e),t&&t()}catch(c){if(!l())return;Qi=!1,n?n():ot=null,Eo(),Ar(wS(c))}finally{o===Yd&&(Qi=!1,r&&r.classList.remove("loading"),Zd(!1))}}function zh(){if(!q)return;const e=ge("query-where");return q.where=e?e.value.trim():"",q.page=1,Cr("push")}function xS(e){if(!q)return;const t={teamScope:q.teamScope,projectId:q.projectId,page:q.page};return q.teamScope=!e,e&&(q.projectId=e),q.page=1,Gh(null),Cr("push",{onSuccess:()=>{e?kt(e):Vp(),Qd()},onFailure:()=>{Object.assign(q,t),Qd()}})}function IS(e,t){if(!q||!Lr[e]||Lr[e].fixed)return;const n=q.cols.filter(i=>i!==e);q.cols=Kd(t?[...n,e]:n),Eo(),Uh("replace")}function SS(e){if(!q||!ot||Qi)return;const t=q.page+e;if(t<1||e>0&&ot.skip+ot.issues.length>=ot.total)return;const n={page:q.page,result:ot};return q.page=t,Cr("push",{onFailure:()=>{q.page=n.page,ot=n.result}})}async function TS(){if(!q)return null;const e=ge("query-where"),t=e?e.value.trim():q.where??Gd,n=q.teamScope?null:se().find(a=>a.id===q.projectId),{command:i,warning:s}=yS({where:t,order:q.order,teamScope:q.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Tr,skip:ot?ot.skip:0}),o=ge("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),o&&o.classList.add("hidden")}catch{o&&(o.textContent=i,o.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function LS(){var e,t,n,i,s,o;Hh||(Hh=!0,(e=ge("query-where"))==null||e.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&!a.isComposing&&(a.preventDefault(),zh())}),(t=ge("query-run-btn"))==null||t.addEventListener("click",()=>zh()),(n=ge("query-copy-cli-btn"))==null||n.addEventListener("click",()=>TS()),(i=ge("query-columns-btn"))==null||i.addEventListener("click",a=>{a.stopPropagation();const r=ge("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;a.currentTarget.setAttribute("aria-expanded",String(l))}),(s=ge("query-columns-menu"))==null||s.addEventListener("change",a=>{a.target.matches('input[type="checkbox"]')&&IS(a.target.value,a.target.checked)}),(o=ge("query-pager"))==null||o.addEventListener("click",a=>{const r=a.target.closest("button[data-query-page]");!r||r.disabled||SS(Number(r.dataset.queryPage))}),document.addEventListener("click",a=>{var l;const r=ge("query-columns-menu");r&&!r.classList.contains("hidden")&&!a.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=ge("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function AS(){var s,o;LS();const e=hS(window.location.search),t=se();let n=null;if(!e.teamScope){const a=r=>r&&t.some(l=>l.id===r);if(!a(e.projectId)){const r=e.projectId;e.projectId=a(X())?X():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}q=e,Wd=Fh(q),ot=null;const i=ge("query-where");return i&&(i.value=q.where===null?Gd:q.where),(s=ge("query-cli-preview"))==null||s.classList.add("hidden"),(o=ge("query-columns-menu"))==null||o.classList.add("hidden"),_S(),ES(),Ar(null),Gh(n),Eo(),Cr("replace")}let Zi=[];function CS(){return Zi}wt(e=>{e==="currentProject"&&A()==="epics"&&Tn()});let Xd=0;const Xi=new Set(["done","canceled"]),Jd={open:"Open",in_progress:"In progress",all_done:"All sub-issues done",needs_you:"Approvals",shipped:"Closed",all:"All"};let an="open",xo="",Io=new Set;lS("epics","epics-filter");function Vh(e,t){var i;return t?[e.title,e.identifier,(i=e.owner)==null?void 0:i.name,...(e.in_flight||[]).map(s=>s.title)].filter(Boolean).join(`
`).toLowerCase().includes(t):!0}async function Tn({fromMemory:e=!1}={}){var o;Ts(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++Xd;t._epicProgress=null,ev(t);const i=ic(),s=e?xa("epics",i):void 0;s?Kh(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((o=T())!=null&&o.id)){Zi=[],t.innerHTML=W({icon:z.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const a=X(),r=a?await h.getProjectEpicProgress(a):await h.getTeamEpicProgress(T().id);if(n!==Xd||(hi("epics",i,r),s&&Ia(s,r)))return;Kh(r,t)}catch(a){if(n!==Xd)return;Zi=[],t.innerHTML=W({icon:z.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),_("load epics",a)}}function Kh(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){Zi=[],t.innerHTML=W({icon:z.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Dr(e,t)}function So(e,t){return`${e} ${t}${e===1?"":"s"}`}function BS(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function eu(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function DS(e){const t=qe(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Wh(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,o=`${i.name}${i.status==="active"?" (current)":""}: ${So(i.closed||0,"issue")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(o)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}const Yh=[["in_progress","in progress"],["in_review","in review"],["todo","todo"],["backlog","backlog"]];function Qh(e){const n={...e.epic.children||{}};let i=eu(e.epic.last_activity_at),s=(e.epic.awaiting_human||[]).length;for(const o of e.subs){const a=Qh(o),r=o.epic.status;Br(a.children)>0&&n[r]>0&&(n[r]-=1,n.total=(n.total||0)-1);for(const l of["total","backlog","todo","in_progress","in_review","done","canceled"])n[l]=(n[l]||0)+(a.children[l]||0);i=Math.max(i,a.last),s+=a.asks}return e.rolled={children:n,last:i,asks:s},e.rolled}function Br(e){return(e.total||0)-(e.canceled||0)}function Zh(e){return(e.backlog||0)+(e.todo||0)+(e.in_progress||0)+(e.in_review||0)}function Xh(e){const t=e.rolled.children;return!Xi.has(e.epic.status)&&Br(t)>0&&Zh(t)===0&&e.subs.every(n=>Xi.has(n.epic.status))}const tu={open:e=>!Xi.has(e.epic.status),in_progress:e=>!Xi.has(e.epic.status)&&(e.rolled.children.in_progress||0)+(e.rolled.children.in_review||0)>0,all_done:Xh,needs_you:e=>e.rolled.asks>0,shipped:e=>Xi.has(e.epic.status),all:()=>!0};function Jh(e,t=Yh.slice(0,2)){const n=t.filter(([i])=>e[i]>0).map(([i,s])=>`${e[i]} ${s}`);return n.length?n.join(" · "):""}function MS(e){return(e.in_flight||[]).map(t=>`${t.assignee?t.assignee.name:"Unassigned"}: ${t.title}`).join(`
`)}function jS(e){const t=Br(e);if(t<=0)return'<span class="meter-label">No sub-issues</span>';const n=e.done||0,i=`${BS(n,t)} done: ${n} of ${t}`+(e.canceled?`, ${e.canceled} canceled`:"")+(Zh(e)?`
${Jh(e,Yh)}`:"");return`
        <div class="meter" title="${m(i)}"><div class="meter-fill" style="width: ${Math.round(n/t*100)}%"></div></div>
        <span class="meter-label">${n} of ${t}</span>`}function RS(e,{grouped:t,depth:n,shownSubs:i}){const s=e.epic,{children:o,last:a,asks:r}=e.rolled,l=Xi.has(s.status),c=s.status_pinned&&!l?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its sub-issues">✎<span class="sr-only"> (status set by hand)</span></span>':"",d=s.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",p=t?`<span class="epic-project-key">${u(s.project_key)}</span> `:"",f=s.owner?jt(s.owner.id)||s.owner:null,g=`<span class="epic-assignee" title="${m(f?$t(f):"Unassigned")}">${f?yt(f,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}</span>`,b=Br(o)<=0,y=[];if(l)y.push(s.completed_at?`Closed ${u(DS(s.completed_at))}`:"Closed");else if(!Xh(e)){const E=Jh(o),L=MS(s);E?y.push(L?`<span title="${m(L)}">${E}</span>`:E):b&&y.push("No sub-issues yet")}r&&y.push(`<span class="epic-needs-you">${So(r,"approval")}</span>`);const $=Io.has(s.id),x=i?`<button type="button" class="epic-subs-toggle" data-epic-toggle-subs="${m(s.id)}" aria-expanded="${$}" aria-label="${$?"Hide":"Show"} ${m(So(i,"sub-epic"))}" title="${m(So(i,"sub-epic"))}">${$?"▾":"▸"}</button> `:"",w=a?`${s.identifier} · updated ${qe(new Date(a).toISOString())}`:s.identifier;return`
        <div class="list-row-2line epic-row${l?" epic-row-closed":""}${b?" epic-row-empty":""}${n?" epic-row-sub":""}" data-identifier="${m(s.identifier)}" title="${m(w)}" style="--epic-depth: ${n}">
            <span class="epic-spark">${Wh(s.sprints)}</span>
            <span class="list-row-title">${x}${p}${u(s.title)}${c}${d}</span>
            <span class="list-row-sub">${y.join(" · ")}</span>
            <span class="list-row-right">${jS(o)}${g}</span>
        </div>`}function Dr(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(w=>w.project_key),...i.map(w=>w.project_key)]).size>1,o=new Map(n.map(w=>[w.id,{epic:w,subs:[],parent:null}]));for(const w of o.values()){const E=w.epic.parent_epic_id&&o.get(w.epic.parent_epic_id);E&&E!==w&&(w.parent=E,E.subs.push(w))}for(const w of o.values())w.parent&&!PS(w)&&(w.parent=null);for(const w of o.values())w.subs=[];for(const w of o.values())w.parent&&w.parent.subs.push(w);[...o.values()].filter(w=>!w.parent).forEach(Qh);const a=tu[an]||tu.open,r=w=>a(w)&&Vh(w.epic,xo),l=an==="shipped"?(w,E)=>eu(E.epic.completed_at||E.epic.last_activity_at)-eu(w.epic.completed_at||w.epic.last_activity_at):(w,E)=>E.rolled.last-w.rolled.last,c=w=>{for(let E=w.parent;E;E=E.parent)if(r(E))return E;return null},d=[...o.values()].filter(r),p=new Map,f=[];for(const w of d){const E=c(w);E?(p.has(E)||p.set(E,[]),p.get(E).push(w)):f.push(w)}const g=[],b=(w,E)=>{const L=(p.get(w)||[]).sort(l);g.push(RS(w,{grouped:s,depth:E,shownSubs:L.length})),Zi.push(w.epic),L.length&&Io.has(w.epic.id)&&L.forEach(V=>b(V,E+1))};Zi=[],f.sort(l).forEach(w=>b(w,0));const y=Object.entries(Jd).map(([w,E])=>{const L=[...o.values()].filter(V=>tu[w](V)&&Vh(V.epic,xo)).length;return`<button type="button" class="segmented-btn${w===an?" active":""}" data-epics-filter="${w}" aria-pressed="${w===an}">${E} <span class="segmented-count">${L}</span></button>`}).join(""),$=i.filter(w=>w.open),x=$.length&&an!=="shipped"?`<p class="epic-untracked-note">${$.map(w=>`${s?`${u(w.project_key)}: `:""}${So(w.open,"open issue")}`).join(", ")} in no epic.</p>`:"";t.innerHTML=`
        <div class="epic-sections">
            <div class="segmented epic-filter" role="group" aria-label="Show">${y}</div>
            <section class="epic-section epic-section-list">
                ${g.length?`<div class="epic-section-rows">${g.join("")}</div>`:`<p class="epic-filter-empty">${xo?`No epics in ${u(Jd[an])} match “${u(xo)}”.`:`No epics in ${u(Jd[an])}.`}</p>`}
            </section>
            ${x}
        </div>
    `,t._epicProgress=e,ev(t),t._epicClickHandler||(t._epicClickHandler=w=>{const E=w.target.closest("[data-epics-filter]");if(E){if(E.dataset.epicsFilter===an)return;an=E.dataset.epicsFilter,Ts(-1),Dr(t._epicProgress,t);return}const L=w.target.closest("[data-epic-toggle-subs]");if(L){const D=L.dataset.epicToggleSubs;Io.has(D)?Io.delete(D):Io.add(D),Ts(-1),Dr(t._epicProgress,t);return}const V=w.target.closest(".epic-row");V&&V.dataset.identifier&&dm(V.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function ev(e){const t=document.getElementById("epics-filter");t&&!t._epicFilterHandler&&(t._epicFilterHandler=()=>{xo=t.value.trim().toLowerCase(),e._epicProgress&&(Ts(-1),Dr(e._epicProgress,e))},t.addEventListener("input",t._epicFilterHandler),t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),t.blur())}))}function PS(e){const t=new Set;for(let n=e;n;n=n.parent){if(t.has(n))return!1;t.add(n)}return!0}function qS(){const e=X(),t=se().map(n=>`
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
    `,F(),document.getElementById("create-epic-form").addEventListener("submit",NS),document.getElementById("create-epic-title").focus()}async function NS(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),k(`Created epic ${s.identifier}`,"success"),Tn()}catch(s){_("create epic",s)}}async function tv(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){de(t.id,!1);return}await To(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function To(e,t=!0,{focus:n=null}={}){var i,s;try{t&&pn();const o=await h.getIssue(e);if(o.issue_type!=="epic"){de(e,t);return}const a=(i=T())==null?void 0:i.id,[r,l,c]=await Promise.all([h.getEpicOverview(e),h.getProjectEpicProgress(o.project_id).catch(()=>null),a?h.getInbox(a,{kinds:sv,includeArchived:!0,limit:200}).catch(()=>[]):Promise.resolve([])]);t&&history.pushState({epicId:e,view:A()},"",`/epic/${o.identifier}`),document.querySelectorAll(".view").forEach(f=>f.classList.add("hidden"));const d=document.getElementById("epic-detail-view");d.classList.remove("hidden");const p={epic:o,overview:r,progress:l,inbox:c||[]};d._epicState=p,nu(d),OS(d,p),KS(d),n&&((s=document.getElementById(n))==null||s.scrollIntoView({block:"start"}))}catch(o){_("load epic",o)}}function nu(e){const t=e._epicState;e.querySelector("#epic-detail-content").innerHTML=VS(t),GS(t)}function OS(e,t){const n=()=>e._epicState===t&&!e.classList.contains("hidden")&&e.querySelector("#epic-subissues");r_({get:i=>n()?(t.overview.issues||[]).find(s=>s.id===i):void 0,set:i=>{t.overview.issues=(t.overview.issues||[]).map(s=>s.id===i.id?i:s),t.overview.tickets=t.overview.tickets.map(s=>s.id===i.id?{...s,status:i.status,estimate:i.estimate,updated_at:i.updated_at||s.updated_at,completed_at:i.completed_at??null}:s),nu(e)}})}const nv={open:"Open",in_progress:"In progress",in_review:"In review",todo:"Todo",backlog:"Backlog",done:"Done",all:"All"};let ni="open";const iv=e=>e==="all"?()=>!0:e==="open"?t=>!ov.has(t.status):t=>t.status===e;function HS(e){const t=Object.entries(nv).map(([s,o])=>{const a=e.filter(iv(s)).length;return`<button type="button" class="segmented-btn${s===ni?" active":""}" data-epic-sub-filter="${s}" aria-pressed="${s===ni}">${o} <span class="segmented-count">${a}</span></button>`}).join(""),n=ni==="done",i=e.filter(iv(ni)).sort((s,o)=>n?Ji(o.completed_at)-Ji(s.completed_at):Ji(o.updated_at)-Ji(s.updated_at));return`
        <div class="segmented epic-filter" role="group" aria-label="Show">${t}</div>
        ${i.length?`<div class="issues-list epic-page-issues">${i.map(Zn).join("")}</div>`:`<p class="epic-page-empty">No sub-issues in ${u(nv[ni])}.</p>`}`}const sv=["review_requested","gate_pending"],ov=new Set(["done","canceled"]);function Ji(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function FS(e){return new Set([e.epic.id,...e.overview.tickets.map(t=>t.id)])}function iu(e){const t=FS(e);return e.inbox.filter(n=>n.issue_id&&t.has(n.issue_id)&&n.state!=="resolved")}const US='<p class="epic-page-empty">No approvals waiting.</p>';function GS(e){if(!iu(e).length)return;const t=()=>zx("epic-needs-you-rows",iu(e),{empty:US,reload:()=>{var i;const n=(i=T())==null?void 0:i.id;n&&h.getInbox(n,{kinds:sv,includeArchived:!0,limit:200}).then(s=>{e.inbox=s||[],document.getElementById("epic-needs-you-rows")&&t()}).catch(()=>{})}});t()}function su(e,t,n,i,{open:s=!0,collapsible:o=!1}={}){const a=`${u(t)}${n==null?"":` <span class="section-count">${n}</span>`}`;return o?`
            <details class="issue-detail-section epic-page-section" id="${e}"${s?" open":""}>
                <summary><h3>${a}</h3></summary>
                ${i}
            </details>`:`
        <section class="issue-detail-section epic-page-section" id="${e}">
            <h3>${a}</h3>
            ${i}
        </section>`}function zS(e){return`<div class="epic-page-docs">${e.map(t=>`
        <div class="epic-page-doc" data-document-id="${m(t.id)}" role="link" tabindex="0">
            <span class="epic-page-doc-icon" aria-hidden="true">${u(t.icon||"📄")}</span>
            <span class="epic-page-doc-title">${u(t.title)}</span>
            <span class="epic-page-doc-links">${(t.linked_to||[]).map(n=>`<span class="epic-page-tag">${u(n)}</span>`).join("")}</span>
            ${t.updated_at?`<span class="epic-page-when">${u(qe(t.updated_at))}</span>`:""}
        </div>`).join("")}</div>`}function av(e,t){return e.map(n=>`
        <div class="activity-item">
            <div class="activity-icon">${Ig(n.activity_type)}</div>
            <div class="activity-content">
                ${t.get(n.issue_id)?`<span class="epic-page-tag">${u(t.get(n.issue_id))}</span>`:""}
                <span class="activity-text">${dd(n)}</span>
                <span class="activity-actor">by ${u(ld(n))}</span>
                <span class="activity-time">${qe(n.created_at)}</span>
            </div>
        </div>`).join("")}function VS(e){var Y;const{epic:t,overview:n,progress:i}=e,s=A()||"epics",o=se().find(P=>P.id===t.project_id),a=t.assignee_id?jt(t.assignee_id):null,r=a?$t(a):null,l=(i==null?void 0:i.epics)||[],d=new Map(l.map(P=>[P.id,P])).get(t.id),p=n.tickets.filter(P=>P.issue_type!=="epic"),f=p.filter(P=>P.status==="done"),g=p.filter(P=>P.status!=="canceled"),b=P=>P.reduce((Z,I)=>Z+(I.estimate??1),0),y=g.length?Math.round(f.length/g.length*100):0,$=Math.max(Ji(t.updated_at),...n.tickets.map(P=>Ji(P.updated_at))),x=CS(),w=x.findIndex(P=>P.id===t.id),E=w>0?x[w-1]:null,L=w>=0&&w<x.length-1?x[w+1]:null,V=w>=0,D=new Map([[t.id,t.identifier],...n.tickets.map(P=>[P.id,P.identifier])]),N=iu(e),K=[`${lt(t.status)} ${u(Ve(t.status))}`,r?u(r):'<span class="text-muted">Unassigned</span>',$?`Updated ${u(qe(new Date($).toISOString()))}`:""].filter(Boolean).join(' <span class="epic-page-dot">·</span> ');return`
        <div class="detail-layout epic-page">
            <div class="detail-main">
                <div class="issue-detail-nav">
                    <button class="back-link" data-action="navigate-to" data-view="${m(s)}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Back
                    </button>
                    ${V?`
                    <div class="issue-nav-arrows">
                        <button class="issue-nav-btn" ${E?`data-action="navigate-epic" data-epic-id="${m(E.id)}"`:"disabled"} title="Previous epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span class="issue-nav-counter">${w+1} / ${x.length}</span>
                        <button class="issue-nav-btn" ${L?`data-action="navigate-epic" data-epic-id="${m(L.id)}"`:"disabled"} title="Next epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                    `:""}
                    <span class="issue-detail-breadcrumb">${o?u(o.name):"Project"} › ${u(t.identifier)}</span>
                    <button class="btn btn-secondary btn-small epic-page-open-ticket" data-action="epic-open-as-ticket" data-epic-id="${m(t.id)}">Edit issue</button>
                </div>

                <h1 class="issue-detail-title">${u(t.title)}</h1>
                <div class="epic-page-facts">${K}</div>
                ${t.status_pinned&&!ov.has(t.status)?`
                <div class="epic-page-pinned text-muted">Status set by hand, so it no longer follows its sub-issues.
                    <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${m(t.id)}">Follow sub-issues</button>
                </div>`:""}

                <div class="epic-page-progress">
                    <div class="epic-detail-progress">
                        <div class="epic-detail-progress-bar">
                            <div class="epic-detail-progress-fill${y===100?" epic-progress-complete":""}" style="width: ${y}%"></div>
                        </div>
                        <div class="epic-detail-progress-label">
                            <span>${f.length} of ${g.length} sub-issues done · ${b(f)} of ${b(g)} points</span>
                            <span>${g.length?`${y}%`:"No sub-issues yet"}</span>
                        </div>
                    </div>
                </div>

                ${N.length?`
                <section class="issue-detail-section epic-page-section" id="epic-approvals" aria-label="Approvals">
                    <div id="epic-needs-you-rows" class="inbox-list epic-page-inbox"></div>
                </section>`:""}

                ${n.documents.length?su("epic-documents","Documents",n.documents.length,zS(n.documents)):""}

                ${n.tickets.length?su("epic-subissues","Sub-issues",n.tickets.length,HS(n.issues||[])):""}

                ${n.tickets.length?"":W({icon:z.issues,heading:"No sub-issues yet",description:"Break this epic down by creating sub-issues"})}

                ${su("epic-activity","Activity",null,`
                    <div class="activity-list" id="epic-activity-rows">
                        ${n.activities.length?av(n.activities,D):'<p class="epic-page-empty">No activity yet.</p>'}
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
                            ${t.labels.map(P=>`
                                <span class="issue-label" style="background: ${ae(P.color)}20; color: ${ae(P.color)}">${u(P.name)}</span>
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
                        <span class="property-value-static epic-page-sprints" title="Points closed toward this goal in each recent sprint, oldest first">${Wh(d.sprints)}</span>
                    </div>`:""}
                    <div class="property-row">
                        <span class="property-label">Created</span>
                        <span class="property-value-static">${new Date(t.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </aside>
        </div>
    `}function KS(e){e._epicPageHandler||(e._epicPageHandler=async t=>{var r;const n=e._epicState,i=t.target.closest("[data-epic-more-activity]");if(i&&n){i.disabled=!0;try{const l=await h.getEpicOverview(n.epic.id,{activitySkip:Number(i.dataset.skip)||0}),c=new Map([[n.epic.id,n.epic.identifier],...n.overview.tickets.map(d=>[d.id,d.identifier])]);(r=e.querySelector("#epic-activity-rows"))==null||r.insertAdjacentHTML("beforeend",av(l.activities,c)),l.more_activity?(i.dataset.skip=String((Number(i.dataset.skip)||0)+l.activities.length),i.disabled=!1):i.remove()}catch(l){i.disabled=!1,_("load activity",l)}return}const s=t.target.closest("[data-epic-sub-filter]");if(s){s.dataset.epicSubFilter!==ni&&(ni=s.dataset.epicSubFilter,nu(e));return}const o=t.target.closest('.issue-row[data-issue-type="epic"] .issue-title');if(o&&!(t.metaKey||t.ctrlKey||t.shiftKey||t.button===1)){t.preventDefault(),t.stopPropagation(),To(o.dataset.issueId);return}if(t.target.closest("#epic-needs-you-rows"))return;const a=t.target.closest(".epic-page-doc");if(a){Ie(a.dataset.documentId);return}},e.addEventListener("click",e._epicPageHandler),e.addEventListener("keydown",t=>{var i,s;if(t.key!=="Enter")return;const n=(s=(i=t.target).closest)==null?void 0:s.call(i,".epic-page-doc");n&&Ie(n.dataset.documentId)}))}le({"navigate-epic":(e,t)=>{To(t.epicId)},"epic-open-as-ticket":(e,t)=>{de(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows its sub-issues"),await To(t.epicId,!1)}catch(n){_("update epic",n)}}});function WS(e){let t=!1,n=null;return function(s){var a,r,l,c,d,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((a=e.isInlineDropdownOpen)!=null&&a.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(qn(s.target)){s.key==="Escape"&&!s.defaultPrevented&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const o=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),o?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!o){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function YS(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const o=e.getModalPrimaryBtn();o&&!o.disabled&&(n.preventDefault(),o.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function rn(e,t,n=aa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function rv(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function Lo(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(rv(),!1):!0:!1}function QS(e){const t=aa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,o,a,r){const l=n(o);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,a,c,d)}return function(o){var l,c,d,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||qn(o.target)||Lo(o)||(o.key==="Enter"||o.key===" ")&&((d=(c=o.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(o.key)&&((f=e.beforeNavigate)==null||f.call(e));const a=document.querySelectorAll(t);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),rn(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":o.preventDefault(),rn(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(o,r,"status","status-btn");break;case"p":i(o,r,"priority","priority-btn");break;case"a":i(o,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function ZS(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var a;if(e.getCurrentView()!=="documents"||(a=e.isDetailViewActive)!=null&&a.call(e)||qn(i.target)||Lo(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),rn(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),rn(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ln(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function XS(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||qn(i.target)||Lo(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex(),a=g=>{var y,$,x,w;const b=!!(($=(y=document.activeElement)==null?void 0:y.closest)!=null&&$.call(y,"#inbox-list"));if((x=e.collapseInboxExpand)==null||x.call(e),rn(o+g,e.setSelectedIndex,t),b){const E=document.querySelector(`${t}.keyboard-selected`);(w=(E==null?void 0:E.querySelector(".inbox-row-toggle"))||E)==null||w.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),a(1);break;case"k":case"ArrowUp":i.preventDefault(),a(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;o>=0&&s[o]&&(i.preventDefault(),e.toggleInboxExpand(s[o]));break;case"e":o>=0&&s[o]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[o]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}o>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function JS(e){const t="#kanban-board .kanban-card";return function(i){var a;if(e.getCurrentView()!=="board"||(a=e.isDetailViewActive)!=null&&a.call(e)||qn(i.target)||Lo(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),rn(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),rn(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.id;r&&e.viewIssue(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function e1(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),o=s.indexOf(i);if(o===-1)return;let a;switch(n.key){case"ArrowDown":a=s[Math.min(s.length-1,o+1)];break;case"ArrowUp":a=s[Math.max(0,o-1)];break;case"Home":a=s[0];break;case"End":a=s[s.length-1];break;default:return}a&&(n.preventDefault(),a.focus())}}function ou(e){const{view:t,selector:n,open:i}=e;return function(o){var l,c,d,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||qn(o.target)||Lo(o)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const a=document.querySelectorAll(n);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),rn(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":o.preventDefault(),rn(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(d=o.target).closest)!=null&&p.call(d,'button, a[href], [role="button"]'))break;r>=0&&a[r]&&(o.preventDefault(),i(a[r]));break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const t1={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let G=null,An=0;async function lv(e,t){var o,a;const n=t1[e];if(!n){_("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++An;G=null;let s;try{s=await n.fetchList(t)}catch(r){_("load revision history",r);return}if(i===An){if(G={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((o=s[0])==null?void 0:o.version)??null,compareFromVersion:null,compareToVersion:null},G.viewVersion!=null)try{const r=await n.fetchOne(t,G.viewVersion);if(i!==An)return;G.cache.set(G.viewVersion,r)}catch(r){i===An&&_("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(a=document.querySelector(".modal"))==null||a.classList.add("modal-wide"),Mr(),F()}}function Mr(){const e=document.getElementById("modal-content");if(!e||!G)return;if(G.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=n1(),n=G.mode==="compare"?s1():i1();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function n1(){const e=G.revisions.map(n=>{const i=G.mode==="view"?n.version===G.viewVersion:n.version===G.compareFromVersion||n.version===G.compareToVersion,s=G.mode==="compare"?n.version===G.compareFromVersion?' <span class="rev-tag">from</span>':n.version===G.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
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
        ${G.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function i1(){const e=G.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=G.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[G.adapter.bodyField]||"",s=i?`<div class="markdown-body">${ut(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${qe(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function s1(){const e=G.compareFromVersion,t=G.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=G.cache.get(e),i=G.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[G.adapter.bodyField]||"",o=i[G.adapter.bodyField]||"",a=o1(s,o);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function o1(e,t){const n=e.split(`
`),i=t.split(`
`),s=a1(n,i);return s.every(a=>a.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(a=>a.type==="equal"?a.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):a.type==="add"?a.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):a.type==="del"?a.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function a1(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const o=[];let a=0,r=0;for(;a<n&&r<i;)e[a]===t[r]?(Ao(o,"equal",e[a]),a++,r++):s[a+1][r]>=s[a][r+1]?(Ao(o,"del",e[a]),a++):(Ao(o,"add",t[r]),r++);for(;a<n;)Ao(o,"del",e[a++]);for(;r<i;)Ao(o,"add",t[r++]);return o}function Ao(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function r1(e){if(!G)return;const t=G.token,n=G;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(G!==n||An!==t)return;n.cache.set(e,i)}catch(i){G===n&&An===t&&_("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Mr()}function l1(){if(!G)return;const e=G.token,t=G;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(a=>a.version===n);if(i>=0&&i+1<t.revisions.length){const a=t.revisions[i+1].version;t.compareFromVersion=a,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const o=[t.compareFromVersion,t.compareToVersion].filter(a=>a!=null&&!t.cache.has(a));Promise.all(o.map(a=>t.adapter.fetchOne(t.entityId,a).then(r=>{G===t&&An===e&&t.cache.set(a,r)}).catch(r=>{s||(s=r)}))).then(()=>{G!==t||An!==e||(s&&_("load revisions to compare",s),Mr())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Mr()}le({"show-document-revisions":(e,t)=>{lv("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{lv("issue",t.issueId)},"select-revision-version":(e,t)=>{r1(Number(t.version))},"toggle-revision-compare":()=>{l1()},"close-revision-viewer":()=>{G=null,H()}});function jr(e){return mt().find(t=>t.id===(e==null?void 0:e.user_id))||null}function cv(e){if(!e)return"Team-wide";const t=se().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function dv(e,t=re()){return!(e!=null&&e.is_agent)||!t||!jr(e)?!1:e.owner_id===t.id||Gi()}function uv(e){const t=jr(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function c1(e,t){var n,i;return((n=mt().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function ln(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function Rr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function d1(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=jr(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${ln("Scope","A guest from another team, with a membership here")}
                ${ln("Owner",Rr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=uv(e),o=[ln("Scope",u(cv(n.agent_project_id??e.project_id))),ln("Owner",Rr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&o.push(ln("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;o.push(ln("Registered by",f?Rr(f,c1(f,t)):"A registrar")),o.push(ln("Last used",n.last_used_at?u(Le(n.last_used_at)):"Never"))}else o.push(ln("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=mt().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);o.push(ln("Sessions registered",f.length?f.map(g=>Rr(g.id,g.name)).join(", "):"None active"))}const a=dv(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=a?`
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
    `}let pv=0;async function Pr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++pv;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==pv)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const o=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),a=n.filter(l=>l.is_active);if(!a.length&&!o.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...a.map(l=>`
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
            </div>`})].join("")}async function u1(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),Pr(t)}catch(n){_("revoke the key",n)}}const qr={bio:4e3,pronouns:40,tagline:120,name:255};let je=[],Co=null,mv=new Map,au=!1,Nr=0,Bo=null,es=null,Do=null,Or=!1,ru=0,lu={teamId:null,role:null};async function fv(e,t){const n=await h.getTeamRoster(e,{includeIdle:t}),i=re(),s=Array.isArray(n)?n.find(o=>o.user_id===(i==null?void 0:i.id)):null;return lu={teamId:e,role:(s==null?void 0:s.role)??null},n}function p1(e,t){!t||Co!==e||(je=je.map(n=>n.user_id===t.user_id?t:n))}function m1(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function f1(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function Hr(){const e=T();if(!e)return;const t=++Nr,n=au,i=document.getElementById("people-list");i&&(i.innerHTML=m1(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=au),th().then(()=>{t===Nr&&(Gi()?wr():nh(),Co===e.id&&ts())});try{const[o,a]=await Promise.all([fv(e.id,n),f1(e.id)]);if(t!==Nr)return;je=o,Co=e.id,mv=a,ts()}catch(o){if(t!==Nr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=W({icon:z.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),_("load the roster",o)}}function Fr(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function g1(e){const t=mv.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u(Fr(e))}function h1(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(cv(e.project_id))}</span>`),uv(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u(Fr(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${yt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${g1(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function gv(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(h1).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function ts(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=je.filter(o=>!o.is_agent),n=je.filter(o=>o.is_agent),i=re(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=gv("Humans",t,"No one yet.",s)+gv("Agents",n,"No agents yet.")+v1()}function v1(){var s;if(!Gi())return"";const e=new Set(je.map(o=>o.user_id)),t=new Set(mt().map(o=>o.id)),n=(s=re())==null?void 0:s.id,i=xt().filter(o=>!e.has(o.user_id)&&!t.has(o.user_id));return i.length?`
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
    `:""}function b1(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function y1(e){var i,s,o;const t=(i=T())==null?void 0:i.id;if(!t||!e)return!1;let n=null;return e.id===((s=re())==null?void 0:s.id)&&lu.teamId===t?n=lu.role:Co===t&&(n=((o=je.find(a=>a.user_id===e.id))==null?void 0:o.role)??null),n==="admin"||n==="owner"}function hv(e,t=re()){return!e||!t?!1:e.user_id===t.id?!0:!!e.is_agent&&(e.owner_id===t.id||y1(t))}async function vv(e,t,{fresh:n=!1}={}){if(!n&&Co===e){const o=je.find(a=>a.user_id===t);if(o)return o}const s=(await fv(e,!0)).find(o=>o.user_id===t)||null;return p1(e,s),s}let bv=0,Mo=null;async function Ur(e,t=!0){var r;t&&pn(),lm();const n=++bv,i=T();if(!i)return;const s=window.location.pathname,o=()=>{var l;return n!==bv||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let a;try{a=await vv(i.id,e)}catch(l){if(o())return;_("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!o()){if(!a){const l=mt().find(c=>c.id===e);l&&(a=b1(l))}if(!a){k("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Rn("people"),Bs("people"),cu(a),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function w1(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function cu(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=w1();n.classList.remove("hidden"),n.dataset.userId=e.user_id,Mo=e;const i=m(e.user_id),s=hv(e),o=e.user_id===((l=re())==null?void 0:l.id),a=e.bio?`<div class="person-bio markdown-body">${Fn(e.bio)}</div>`:`<p class="person-bio-empty">${o?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
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
            ${e.is_agent?d1(e,je):""}
            ${!e.is_agent||!jr(e)?k1(e):""}
        </div>
    `,t&&E1(e.user_id),dv(e)&&Pr(e.user_id)}function k1(e){var i;if(!Gi())return"";const t=xt().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=re())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u(Fr(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function Gr(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function $1(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){Pr(t);return}if(n){je=je.filter(o=>o.user_id!==t),jo(t)?O("people"):Gr()&&ts();return}if(i){Gr()&&Hr();return}jo(t)&&Mo?cu(Mo):Gr()&&ts()}function _1(e){const{userId:t}=e.detail||{};je=je.filter(n=>n.user_id!==t),jo(t)?O("people"):Gr()&&ts()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",$1),window.addEventListener("chaotic:member-removed",_1));const yv=["in_progress","in_review","todo"];let wv=0;async function E1(e){const t=T();if(!t)return;const n=++wv;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:yv,sort_by:"status",order:"asc",limit:20})}catch(a){i=null,console.error("Failed to load their issues:",a)}if(n!==wv)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const o=a=>yv.indexOf(a.status);s.innerHTML=[...i].sort((a,r)=>o(a)-o(r)).map(a=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(a.identifier)}" data-action="person-open-issue" data-identifier="${m(a.identifier)}">
            <span class="person-issue-id">${u(a.identifier)}</span>
            <span class="person-issue-title">${u(a.title)}</span>
            <span class="person-issue-status">${u(String(a.status).replace("_"," "))}</span>
        </a>
    `).join("")}const du=["name","avatar_url","pronouns","tagline","bio"];function x1(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(du.map(n=>[n,t(n,e==null?void 0:e[n])]))}let uu=0;async function I1(e){var l;const t=re(),n=T();if(!t||!n)return;const i=++uu,s=window.location.pathname;let o;try{o=await vv(n.id,e,{fresh:!0})}catch(c){i===uu&&_("load this profile",c);return}if(i!==uu||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!o&&e===t.id&&(o={...t,user_id:t.id}),!o||!hv(o,t)))return;Bo=e,Do=o,es=x1(o),ru++;const a=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=a?"Edit your profile":`Edit ${o.name}`,document.getElementById("modal-content").innerHTML=`
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
                <p class="form-help">Uploads at once, cropped square and resized to ${_v}px.</p>
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
    `,F()}function S1(e,t=null){const n=o=>{var a;return((a=e.querySelector(`#${o}`))==null?void 0:a.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const o of du){const a=t?String(t[o]??""):null;(o==="avatar_url"?i[o]===(a==null?void 0:a.trim()):i[o]===a)||(s[o]=o==="avatar_url"?i[o]||null:i[o])}return s}function kv(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");cu(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function jo(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function $v(){Bo=null,es=null,Do=null,H()}async function T1(e){e.preventDefault();const t=Bo;if(!t||Or)return;const n=e.target.closest("form")||e.target,i=S1(n,es);if(!Object.keys(i).length){$v();return}const s=re(),o=t===(s==null?void 0:s.id),a=Do,r=ru,l=n.querySelector('button[type="submit"]');Or=!0,l&&(l.disabled=!0);try{const c=o?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(du.map(p=>[p,(c==null?void 0:c[p])??null]));je=je.map(p=>p.user_id===t?{...p,...d}:p),o&&(Bt({...s,...d}),Er()),r===ru&&$v(),k("Profile saved","success"),jo(t)?kv({...a,...d}):ts()}catch(c){_("save the profile",c)}finally{Or=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const _v=256;async function L1(e,t=_v){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const o=c=>new Promise(d=>s.toBlob(d,c,.9)),a=await o("image/webp");let r=a&&a.type==="image/webp"?a:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await o("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let Ro=!1;function Ev(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function A1(e,t){var s;if(!e||!t||t.id&&t.id!==e)return;const n=t.avatar_url??null;je=je.map(o=>o.user_id===e?{...o,avatar_url:n}:o);const i=re();if(i&&i.id===e&&(Bt({...i,avatar_url:n}),Er()),Bo===e&&es){const o=document.getElementById("profile-avatar");o&&(o.value=n||""),es={...es,avatar_url:n||""},Do={...Do,avatar_url:n},(s=document.getElementById("profile-photo-remove"))==null||s.classList.toggle("hidden",!Il.test(n||""))}Mo&&jo(e)&&kv({...Mo,avatar_url:n})}function xv(){const e=re(),t=Bo||(e==null?void 0:e.id);return t?{userId:t,self:t===(e==null?void 0:e.id)}:null}async function Iv(e,t,n,i){if(!(Ro||!e)){Ro=!0,Ev(!0);try{A1(e.userId,await t()),k(n,"success")}catch(s){_(i,s)}finally{Ro=!1,Ev(!1)}}}async function C1(e,t=L1){var s;const n=(s=e.files)==null?void 0:s[0];if(!n)return;const i=xv();try{await Iv(i,async()=>{const o=await t(n);return i.self?h.uploadAvatar(o):h.uploadAgentAvatar(i.userId,o)},"Photo uploaded","upload the photo")}finally{e.value=""}}function B1(){const e=xv();return Iv(e,()=>e.self?h.deleteAvatar():h.deleteAgentAvatar(e.userId),"Photo removed","remove the photo")}function pu(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}le({"view-person":(e,t)=>{e.type!=="click"||pu(e)||(e.preventDefault(),Ur(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),I1(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=re();t&&Ur(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&C1(n)},"remove-profile-photo":e=>{e.type==="click"&&B1()},"save-profile":e=>{T1(e)},"retry-load-people":e=>{e.type==="click"&&Hr()},"person-open-issue":(e,t)=>{e.type!=="click"||pu(e)||(e.preventDefault(),Wl(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&u1(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await Dh(t.connectionId,t.connectionName),Pr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||pu(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(au=!!n.checked,Hr())}});const D1=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Tt=[],zr=null,Vr=null,mu=0;wt(e=>{e==="currentProject"&&A()==="board"&&Po()});async function Po({fromMemory:e=!1}={}){ia(-1);const t=++mu,n=X();if(!n){const a=document.getElementById("kanban-board");a&&(a.innerHTML=se().length===0?W({icon:z.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):W({icon:z.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=ic(),o=e?xa("board",s):void 0;o?(Tt=o,zr=s,A()==="board"&&Dt(Tt),ns()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const a=await h.getIssues({project_id:n});if(t!==mu)return;const r=o&&Ia(Tt,a);Tt=a,zr=s,hi("board",s,a),A()==="board"&&Dt(Tt),r||ns()}catch(a){if(t!==mu)return;i&&(i.innerHTML=W({icon:z.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),_("load board",a)}}const fu=My(()=>Po(),200);function ns(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;zr&&hi("board",zr,Tt),e.innerHTML=D1.map(i=>{const s=Tt.filter(o=>o.status===i.key);return`
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
                    `:s.map(M1).join("")}
                </div>
            </div>
        `}).join(""),j1(t)}function M1(e){const t=e.assignee_id?jt(e.assignee_id):null,n=t?$t(t):null,i=e.estimate!=null?pi(e.estimate,e.project_id):"",s=ma(e.estimate,e.project_id),o=(e.labels||[]).slice(0,2);return`
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
    `}function j1(e){const t=jp();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ia(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ia(i),n[i].classList.add("keyboard-selected")}function R1(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Vr=t.dataset.id,t.classList.add("dragging")}function P1(e,t){t.classList.remove("dragging"),Vr=null}function Sv(e){const t=Tt.find(n=>n.id===Vr);return!!t&&t.status===e}function q1(e,t){e.preventDefault(),!Sv(t.dataset.status)&&t.classList.add("drag-over")}function N1(e,t){t.classList.remove("drag-over")}function O1(e,t){e.preventDefault();const n=Tt.find(i=>i.id===t.dataset.id);n&&Sv(n.status)||t.classList.add("drag-over")}function H1(e,t){t.classList.remove("drag-over")}async function F1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Tt.find(a=>a.id===n);if(!s)return;const o=s.status;if(o!==i){s.status=i,ns();try{const a=await h.updateIssue(n,{status:i});k("Status updated","success"),Qs(a)}catch(a){s.status=o,ns(),_("update status",a)}}}async function U1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Vr||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),o=s==null?void 0:s.dataset.status;if(!o)return;const a=Tt.find(l=>l.id===n);if(!a)return;const r=a.status;if(r!==o){a.status=o,ns();try{const l=await h.updateIssue(n,{status:o});k("Status updated","success"),Qs(l)}catch(l){a.status=r,ns(),_("update status",l)}}}le({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),de(t.id)):e.type==="dragstart"?R1(e,n):e.type==="dragend"?P1(e,n):e.type==="dragover"?O1(e,n):e.type==="dragleave"?H1(e,n):e.type==="drop"&&U1(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?q1(e,n):e.type==="dragleave"?N1(e,n):e.type==="drop"&&F1(e,n)},"retry-load-board":()=>Po()});const Cn=new Map,Tv=6e4,gu=100;let Ne=null,Kr=null,Wr=null,qo=null,Lv=!1;const Av={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},Cv={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},Bv={api:null};let hu={...Bv};function G1(e={}){hu={...Bv,...e},Ne||(Ne=document.createElement("div"),Ne.className="issue-tooltip",Ne.style.display="none",document.body.appendChild(Ne),Ne.addEventListener("mouseenter",()=>{clearTimeout(Kr)}),Ne.addEventListener("mouseleave",()=>{vu()})),Lv||(document.addEventListener("mouseover",z1),document.addEventListener("mouseout",V1),Lv=!0)}function z1(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=K1(t);if(n){if(n===qo&&Ne.style.display!=="none"){clearTimeout(Kr);return}clearTimeout(Wr),Wr=setTimeout(()=>{W1(t,n)},200)}}function V1(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Wr),Kr=setTimeout(()=>{vu()},150))}function K1(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function W1(e,t){qo=t;const n=e.getBoundingClientRect();Ne.style.left=`${n.left+window.scrollX}px`,Ne.style.top=`${n.bottom+window.scrollY+8}px`,Ne.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Ne.style.display="block";try{const i=await Q1(t);if(qo!==t)return;Z1(i)}catch{if(qo!==t)return;Ne.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function vu(){clearTimeout(Wr),clearTimeout(Kr),Ne&&(Ne.style.display="none"),qo=null}function Y1(){const e=Date.now();for(const[t,n]of Cn.entries())e-n.timestamp>=Tv&&Cn.delete(t)}async function Q1(e){Cn.size>gu/2&&Y1();const t=Cn.get(e);if(t&&Date.now()-t.timestamp<Tv)return t.issue;if(!hu.api)throw new Error("API not initialized");const n=await hu.api.getIssueByIdentifier(e);if(Cn.size>=gu){const i=Array.from(Cn.entries());i.sort((o,a)=>o[1].timestamp-a[1].timestamp);const s=i.slice(0,gu/2);for(const[o]of s)Cn.delete(o)}return Cn.set(e,{issue:n,timestamp:Date.now()}),n}function Z1(e){const t=Av[e.status]||Av.backlog,n=Cv[e.priority]||Cv.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Ne.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${X1(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${J1(e.priority)}</span>
        </div>
    `}function X1(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function J1(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Dv(){return!!document.querySelector(".description-inline-editor")}function bu(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function yu(){var e;return bu("issue-detail-view")?((e=xe())==null?void 0:e.id)??null:null}function ii(e){return!!e&&yu()===e}function eT(){We("issue:created",aT),We("issue:updated",rT),We("issue:deleted",lT),We("comment",uT),We("relation",mT),We("attestation",fT),We("activity",hT),We("project",vT),We("sprint",bT),We("document",pT),We("inbox",gT),We("connection:reconnected",yT),We("connection:unauthorized",nT),We("connection:forbidden",iT),We("connection:superseded",tT)}function tT(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function nT(){h.logout(),Bt(null),ci(null),$o(),k("Your session has ended. Please sign in again.","warning")}function iT(){k("Live updates stopped: you no longer have access to this team.","error")}function Mv(e,t){var n;return e&&e===((n=re())==null?void 0:n.id)?"You":t||"Someone"}function sT(e){var s;const t=Mv(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(bt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Pe(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=re())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function oT(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${Mv(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function jv(e,t,n){const i=k(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const o=()=>{var a;(a=i.querySelector(".toast-close"))==null||a.click(),Promise.resolve(de(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",o),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),o())})}}}function aT(e){var s;Os(A(),"board","sprints","epics");const t=ne(),n=t.findIndex(o=>o.id===e.id),i=t.findIndex(o=>o._isOptimistic&&o.title===e.title);if(!(n>=0))if(i>=0){const o=[...t];o[i]=e,tt(o),A()==="issues"&&ft()}else tt([e,...t]),A()==="issues"&&ft(),jv(e,sT(e),"info");if(e.assignee_id===((s=re())==null?void 0:s.id)){const o=Ye(),a=o.findIndex(l=>l.id===e.id),r=o.findIndex(l=>l._isOptimistic&&l.title===e.title);if(a===-1&&r===-1)Vn([e,...o]),A()==="my-issues"&&Kn();else if(r>=0){const l=[...o];l[r]=e,Vn(l),A()==="my-issues"&&Kn()}}A()==="board"?fu():A()==="sprints"?No():A()==="epics"&&Tn(),ii(e.parent_id)&&si(e.parent_id)}function rT(e){Os(A(),"board","sprints","epics"),ya(e);const t=ne();t.some(s=>s.id===e.id)&&tt(t.map(s=>s.id===e.id?e:s));const n=Ye();n.some(s=>s.id===e.id)&&Vn(n.map(s=>s.id===e.id?e:s));const i=Is();i.some(s=>s.id===e.id)&&Dt(i.map(s=>s.id===e.id?e:s)),A()==="issues"?ft():A()==="my-issues"?Kn():A()==="board"?fu():A()==="sprints"?No():A()==="epics"&&Tn(),ii(e.id)&&(Dv()?rd(e):si(e.id))}function lT(e){var s,o;const t=e.title??((s=ne().find(a=>a.id===e.id))==null?void 0:s.title)??((o=Ye().find(a=>a.id===e.id))==null?void 0:o.title);Os(A(),"board","sprints","epics"),ek(e.id),tt(ne().filter(a=>a.id!==e.id)),Vn(Ye().filter(a=>a.id!==e.id));const n=Is();n.some(a=>a.id===e.id)&&Dt(n.filter(a=>a.id!==e.id)),A()==="issues"?ft():A()==="my-issues"?(Kn(),$i({showLoading:!1})):A()==="board"?fu():A()==="sprints"?No():A()==="epics"&&Tn();const i=ii(e.id);jv(null,oT(e,t),i?"warning":"info"),i&&O("my-issues")}const Rv=250,cT=1e3,is=new Map;function si(e){Dv()?rd():wu(e,Rv)}function wu(e,t){let n=is.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},is.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>dT(e),t))}async function dT(e){const t=is.get(e);if(!t)return;if(t.timer=null,!ii(e)){is.delete(e);return}t.inFlight=!0;let n;try{n=await de(e,!1,{refresh:!0})}finally{t.inFlight=!1}is.get(e)===t&&(t.again?(t.again=!1,wu(e,Rv)):n==="retry"?wu(e,cT):is.delete(e))}function uT(e){A()==="my-issues"&&$i({showLoading:!1}),ii(e.issue_id)&&si(e.issue_id),e.document_id&&zm(e.document_id)}function pT(e,{type:t}={}){Os(A(),"documents"),Gm(),t==="deleted"?Ok(e.id,e.title):zm(e.id)}function mT(e){const t=yu();t&&(e.source_issue_id===t||e.target_issue_id===t)&&si(t)}function fT(e){ii(e.issue_id)&&si(e.issue_id)}function gT(e,t){var n;e.recipient_user_id===((n=re())==null?void 0:n.id)&&(Ni(),Kx(t==null?void 0:t.type,e),A()==="inbox"&&!Qx(t==null?void 0:t.type,e)&&Hi({background:!0}))}function hT(e){A()==="my-issues"&&$i({showLoading:!1}),ii(e.issue_id)&&si(e.issue_id)}function vT(e,{type:t}){pt().then(()=>{A()==="projects"&&Nn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function No(){const e=p$();e&&bu("sprint-detail-view")?wi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):bu("sprints-view")&&fn().catch(t=>console.error("Failed to reload sprints:",t))}function bT(e,{type:t}={}){if(Os(A(),"sprints"),ef(),A()==="sprints"?No():A()==="my-issues"&&Ks(),t==="created")k(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";k(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function yT(){const e=A();sc(),Ni(),e==="issues"?Nt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(ki().catch(n=>console.error("Failed to resync my issues:",n)),Ks().catch(n=>console.error("Failed to resync sprint status:",n)),$i({showLoading:!1})):e==="board"?Po():e==="sprints"?No():e==="epics"?Tn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?pt().then(()=>{A()==="projects"&&Nn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Gm():e==="inbox"&&Hi({background:!0});const t=yu();t&&si(t)}const wT='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Pv(e){return Array.from(e.querySelectorAll(wT)).filter(t=>!t.closest(".hidden, [hidden]"))}function qv(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function kT(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),qv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Pv(t);n&&n.focus()}}}function Oo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),qv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Pv(n);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Oo()});async function $T(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=X();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const o="temp-"+Date.now(),a=se().find(c=>c.id===i),r={id:o,title:n,identifier:`${(a==null?void 0:a.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};tt([r,...ne()]),ft();const l=document.querySelector(`[data-id="${o}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ne();d.some(p=>p.id===c.id)?tt(d.filter(p=>p.id!==o)):d.some(p=>p.id===o)&&tt(d.map(p=>p.id===o?c:p)),ft(),pt(),k("Issue created!","success")}catch(c){tt(ne().filter(d=>d.id!==o)),ft(),_("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Aw({beforeScrollRestore:Nc,beforeNavigate:()=>{Lx(),vw(),di(null),Pp(null),Oo(),vu(),ua()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return tv(e[1]),!0;if(e[0]==="issue"&&e[1])return lr(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(lr(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}if(e[0]==="document"&&e[1])return DT(e[1]),!0;if(e[0]==="sprint"&&e[1])return g$(e[1]),!0;if(e[0]==="people"&&e[1])return Ur(decodeURIComponent(e[1]),!1),!0;if(e[0]==="projects"&&e[1]&&e[2]==="settings"){const t=new URLSearchParams(window.location.search).get("tab")||void 0;return fa(decodeURIComponent(e[1]),{tab:t,replace:!0}),!0}return!1},detailPopstate:e=>e.epicId?(To(e.epicId,!1),!0):e.issueId?(de(e.issueId,!1),!0):e.identifier?(lr(e.identifier),!0):e.documentId?(Ie(e.documentId,!1),!0):e.sprintId?(wi(e.sprintId,!1),!0):e.personId?(Ur(e.personId,!1),!0):e.settingsProjectId?(fa(e.settingsProjectId,{tab:e.tab,replace:!0}),!0):!1,restoreProject:()=>{const e=im();e&&se().some(t=>t.id===e)&&kt(e)},issueNavigate:e=>lr(e),epicNavigate:e=>tv(e)}),Lw({"my-issues":()=>{Ks(),ki(),$i()},inbox:()=>{s0(),Hi({focusFirst:!0})},issues:()=>{var r;j_(),O_(),U_();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Yn().length>0||Qn().length>0;s||Nt();const o=_f().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Oa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Ha())}}),a=Pf().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([o,a]).then(()=>Nt()):(o.catch(l=>console.error("Failed to populate label filter:",l)),a.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{AS()},epics:()=>{Tn({fromMemory:!0})},board:()=>{Po({fromMemory:!0})},projects:()=>{Nn(),pt().then(Nn)},sprints:()=>{fn({fromMemory:!0})},rituals:()=>{Sm()},documents:()=>{zn(null,null,{fromMemory:!0})},people:Hr,settings:()=>{Nd(),Bh(),Mh(),Rs()}});function _T(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function ET(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>tm(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>bw());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>yw()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,o])=>{const a=e.querySelector(`#${s} .btn-primary`);a&&a.addEventListener("click",()=>kw(o))})}function xT(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Hm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Hm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Fm());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>jk());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Jt())}function IT(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>af())}function ST(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>F_());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>__());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>E_()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ga("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ga("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ga("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ga("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>za())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Va())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>jc())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Rc())}const o=document.getElementById("label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ka())}const a=document.getElementById("exclude-label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Wa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>rt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>rt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>rt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Nt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>Uf());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>$T(g))}function TT(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>eh());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ys()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(a=>{a.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(a.dataset.view),r.detail>0&&rv())})}),document.querySelectorAll(".issues-layout-toggle a[data-view]").forEach(a=>{a.addEventListener("click",r=>{var c;if(r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0)return;r.preventDefault();const l=a.dataset.view;A()!==l&&O(l),(c=document.querySelector(`#${l}-view .issues-layout-toggle a[data-view="${l}"]`))==null||c.focus()})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>D0());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Oo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>kT());const o=document.querySelector(".mobile-fab");o&&o.addEventListener("click",()=>Ys())}function LT(e){Oo(),Ln()&&O(A()),A()==="query"?xS(e):e?kt(e):Vp()}function Nv(){return Oy(document.getElementById(da),{returnFocus:!0})}le({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&LT(n.value)},showCreateIssueModal:()=>Ys(),showCreateEpicModal:()=>qS(),"retry-load-epics":()=>Tn(),showCreateProjectModal:()=>Qp(),showCreateDocumentModal:()=>Km(),showCreateTeamModal:()=>rh(),showEditTeamModal:()=>K0(),showInviteModal:()=>sh(),showCreateApiKeyModal:()=>WI(),showCreateAgentModal:()=>Fw(),resetOnboarding:()=>fh(),logout:()=>Ch(),navigateToProjects:()=>O("projects")});async function AT(){if(!h.getToken()){await Ih();return}cm();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await Ly(wp(h.getToken()));if(n){t.then(i=>{Bt(i),Er()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await xl(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),k("Showing saved data — check your connection and reload","error")}),Bt(n.user),await ti({teamsRequest:e,snapshot:n});return}try{const i=await t;Bt(i),await ti({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await Ih();return}console.error("Failed to load current user on boot:",i),$o(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;sw(),IE(),VI(),TT(),_T(),IT(),ST(),ET(),xT(),CT(),Hy(),(e=document.querySelector(`[data-picker-for="${da}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),BT(),G1({api:h}),eT(),await AT()});function CT(){const e=document.getElementById("theme-toggle");if(!e)return;const t=py()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),my(n?"light":"dark")})}function BT(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(!t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;const i=(t.getAttribute("href")||"").match(/^(?:#)?\/issue\/([^/?#]+)$/);if(!i)return;let s;try{s=decodeURIComponent(i[1])}catch{return}e.preventDefault(),Wl(s)})}async function DT(e){try{await Ie(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",QS({getCurrentView:A,getSelectedIndex:Dp,setSelectedIndex:Pn,viewIssue:de,showEditIssueModal:Eg,showInlineDropdown:Cc,isInlineDropdownOpen:xi,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln,beforeNavigate:Nc})),document.addEventListener("keydown",ZS({getCurrentView:A,getSelectedIndex:Yy,setSelectedIndex:Mp,viewDocument:Ie,showEditDocumentModal:Wm,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",JS({getCurrentView:A,getSelectedIndex:jp,setSelectedIndex:ia,viewIssue:de,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",XS({getCurrentView:A,getSelectedIndex:Qy,setSelectedIndex:sa,toggleInboxExpand:I0,collapseInboxExpand:Jx,archiveInboxEntry:x0,isInlineDropdownOpen:xi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",e1()),document.addEventListener("keydown",ou({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&wi(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:Zy,setSelectedIndex:Rp,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",ou({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&dm(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:Xy,setSelectedIndex:Ts,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln})),document.addEventListener("keydown",ou({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:A,getSelectedIndex:M$,setSelectedIndex:j$,isInlineDropdownOpen:xi,isModalOpen:Ke,isCommandPaletteOpen:Sn,isDetailViewActive:Ln}));function Ov(){var e;cS(A())||(O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus())}function MT(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Ck()}document.addEventListener("keydown",WS({closeModal:H,closeSidebar:Oo,navigateTo:O,openProjectSwitcher:Nv,showCreateIssueModal:Ys,showKeyboardShortcutsHelp:qh,isModalOpen:Ke,focusSearch:Ov,isInlineDropdownOpen:xi,closeInlineDropdowns:Ky,isModalDirty:zy,focusModalField:Ap,closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Ti()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:MT,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),iS([{id:"nav-my-issues",title:"Home",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"Issues laid out by status",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>Nv(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"The rituals tabs in Project settings",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Approvals, mentions and assignments awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(Ys,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(Qp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(Km,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>rh(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Ov,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(sh,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>qh(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>fh(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Ch(),category:"Account"}]),document.addEventListener("keydown",YS({isModalOpen:Ke,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Sn,openCommandPalette:sS,closeCommandPalette:Sr})),window.marked=Q,window.DOMPurify=cp,console.log("Chaotic frontend loaded via Vite")})();
