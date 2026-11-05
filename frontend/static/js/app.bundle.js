var nL=Object.defineProperty;var iL=(Ut,Oe,Cn)=>Oe in Ut?nL(Ut,Oe,{enumerable:!0,configurable:!0,writable:!0,value:Cn}):Ut[Oe]=Cn;var ce=(Ut,Oe,Cn)=>iL(Ut,typeof Oe!="symbol"?Oe+"":Oe,Cn);(function(){"use strict";var du;function Ut(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Oe=Ut();function Cn(e){Oe=e}var ss={exec:()=>null};function J(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(He.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Rv=/^(?:[ \t]*(?:\n|$))+/,Pv=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,qv=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,os=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Nv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Qr=/(?:[*+-]|\d{1,9}[.)])/,xu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Su=J(xu).replace(/bull/g,Qr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ov=J(xu).replace(/bull/g,Qr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Zr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hv=/^[^\n]+/,Xr=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Fv=J(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Xr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Uv=J(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Qr).getRegex(),Do="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Jr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Gv=J("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Jr).replace("tag",Do).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Iu=J(Zr).replace("hr",os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Do).getRegex(),zv=J(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Iu).getRegex(),el={blockquote:zv,code:Pv,def:Fv,fences:qv,heading:Nv,hr:os,html:Gv,lheading:Su,list:Uv,newline:Rv,paragraph:Iu,table:ss,text:Hv},Lu=J("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Do).getRegex(),Vv={...el,lheading:Ov,table:Lu,paragraph:J(Zr).replace("hr",os).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Lu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Do).getRegex()},Wv={...el,html:J(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Jr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ss,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:J(Zr).replace("hr",os).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Su).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Kv=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Yv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Tu=/^( {2,}|\\)\n(?!\s*$)/,Qv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Mo=/[\p{P}\p{S}]/u,tl=/[\s\p{P}\p{S}]/u,Au=/[^\s\p{P}\p{S}]/u,Zv=J(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,tl).getRegex(),Cu=/(?!~)[\p{P}\p{S}]/u,Xv=/(?!~)[\s\p{P}\p{S}]/u,Jv=/(?:[^\s\p{P}\p{S}]|~)/u,eb=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Bu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,tb=J(Bu,"u").replace(/punct/g,Mo).getRegex(),nb=J(Bu,"u").replace(/punct/g,Cu).getRegex(),Du="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ib=J(Du,"gu").replace(/notPunctSpace/g,Au).replace(/punctSpace/g,tl).replace(/punct/g,Mo).getRegex(),sb=J(Du,"gu").replace(/notPunctSpace/g,Jv).replace(/punctSpace/g,Xv).replace(/punct/g,Cu).getRegex(),ob=J("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Au).replace(/punctSpace/g,tl).replace(/punct/g,Mo).getRegex(),ab=J(/\\(punct)/,"gu").replace(/punct/g,Mo).getRegex(),rb=J(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),lb=J(Jr).replace("(?:-->|$)","-->").getRegex(),cb=J("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",lb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),jo=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,db=J(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",jo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mu=J(/^!?\[(label)\]\[(ref)\]/).replace("label",jo).replace("ref",Xr).getRegex(),ju=J(/^!?\[(ref)\](?:\[\])?/).replace("ref",Xr).getRegex(),ub=J("reflink|nolink(?!\\()","g").replace("reflink",Mu).replace("nolink",ju).getRegex(),nl={_backpedal:ss,anyPunctuation:ab,autolink:rb,blockSkip:eb,br:Tu,code:Yv,del:ss,emStrongLDelim:tb,emStrongRDelimAst:ib,emStrongRDelimUnd:ob,escape:Kv,link:db,nolink:ju,punctuation:Zv,reflink:Mu,reflinkSearch:ub,tag:cb,text:Qv,url:ss},pb={...nl,link:J(/^!?\[(label)\]\((.*?)\)/).replace("label",jo).getRegex(),reflink:J(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",jo).getRegex()},il={...nl,emStrongRDelimAst:sb,emStrongLDelim:nb,url:J(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},mb={...il,br:J(Tu).replace("{2,}","*").getRegex(),text:J(il.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ro={normal:el,gfm:Vv,pedantic:Wv},as={normal:nl,gfm:il,breaks:mb,pedantic:pb},fb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ru=e=>fb[e];function Lt(e,t){if(t){if(He.escapeTest.test(e))return e.replace(He.escapeReplace,Ru)}else if(He.escapeTestNoEncode.test(e))return e.replace(He.escapeReplaceNoEncode,Ru);return e}function Pu(e){try{e=encodeURI(e).replace(He.percentDecode,"%")}catch{return null}return e}function qu(e,t){var o;const n=e.replace(He.findPipe,(a,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(He.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(He.slashPipe,"|");return i}function rs(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function gb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Nu(e,t,n,i,s){const o=t.href,a=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function hb(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(o=>{const a=o.match(n.other.beginningSpace);if(a===null)return o;const[r]=a;return r.length>=s.length?o.slice(s.length):o}).join(`
`)}var Po=class{constructor(e){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=e||Oe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:rs(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=hb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=rs(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:rs(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=rs(t[0],`
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
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),f=e.split(`
`,1)[0],g=!p.trim(),b=0;if(this.options.pedantic?(b=2,d=p.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=p.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const E=this.rules.other.nextBulletRegex(b),L=this.rules.other.hrRegex(b),T=this.rules.other.fencesBeginRegex(b),j=this.rules.other.headingBeginRegex(b),x=this.rules.other.htmlBeginRegex(b);for(;e;){const w=e.split(`
`,1)[0];let D;if(f=w,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),D=f):D=f.replace(this.rules.other.tabCharGlobal,"    "),T.test(f)||j.test(f)||x.test(f)||E.test(f)||L.test(f))break;if(D.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+D.slice(b);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(p)||j.test(p)||L.test(p))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=w+`
`,e=e.substring(w.length+1),p=D.slice(b)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0));let y=null,$;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&($=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:$,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var a;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=qu(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(const r of s)o.rows.push(qu(r,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const o=rs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{const o=gb(t[2],"()");if(o===-2)return;if(o>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Nu(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Nu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const o=[...i[0]].length-1;let a,r,l=o,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(i=d.exec(t))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(r=[...a].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&o%3&&!((o+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const p=[...i[0]][0].length,f=e.slice(0,o+i.index+p+r);if(Math.min(o,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Gt=class _u{constructor(t){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"tokenizer");ce(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Oe,this.options.tokenizer=this.options.tokenizer||new Po,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:He,block:Ro.normal,inline:as.normal};this.options.pedantic?(n.block=Ro.pedantic,n.inline=as.pedantic):this.options.gfm&&(n.block=Ro.gfm,this.options.breaks?n.inline=as.breaks:n.inline=as.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ro,inline:as}}static lex(t,n){return new _u(n).lex(t)}static lexInline(t,n){return new _u(n).inlineTokens(t)}lex(t){t=t.replace(He.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,a;for(this.options.pedantic&&(t=t.replace(He.tabCharGlobal,"    ").replace(He.spaceLine,""));t;){let r;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let o=!1,a="";for(;t;){o||(a=""),o=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,a)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(a=d.raw.slice(-1)),o=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},qo=class{constructor(e){ce(this,"options");ce(this,"parser");this.options=e||Oe}space(e){return""}code({text:e,lang:t,escaped:n}){var o;const i=(o=(t||"").match(He.notSpaceStart))==null?void 0:o[0],s=e.replace(He.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Lt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Pu(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Lt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Pu(e);if(s===null)return Lt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Lt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Lt(e.text)}},sl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},zt=class Eu{constructor(t){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=t||Oe,this.options.renderer=this.options.renderer||new qo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new sl}static parse(t,n){return new Eu(n).parse(t)}static parseInline(t,n){return new Eu(n).parseInline(t)}parse(t,n=!0){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;a+1<t.length&&t[a+1].type==="text";)c=t[++a],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},No=(du=class{constructor(e){ce(this,"options");ce(this,"block");this.options=e||Oe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?zt.parse:zt.parseInline}},ce(du,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),du),vb=class{constructor(...e){ce(this,"defaults",Ut());ce(this,"options",this.setOptions);ce(this,"parse",this.parseMarkdown(!0));ce(this,"parseInline",this.parseMarkdown(!1));ce(this,"Parser",zt);ce(this,"Renderer",qo);ce(this,"TextRenderer",sl);ce(this,"Lexer",Gt);ce(this,"Tokenizer",Po);ce(this,"Hooks",No);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{const a=o;for(const r of a.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of a.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const a=o;n=n.concat(this.walkTokens(a.items,t));break}default:{const a=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{const l=a[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let r=s.renderer.apply(this,a);return r===!1&&(r=o.apply(this,a)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new qo(this.defaults);for(const o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const a=o,r=n.renderer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Po(this.defaults);for(const o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const a=o,r=n.tokenizer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new No;for(const o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const a=o,r=n.hooks[a],l=s[a];No.passThroughHooks.has(o)?s[a]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(p=>l.call(s,p));const d=r.call(s,c);return l.call(s,d)}:s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(a){let r=[];return r.push(o.call(this,a)),s&&(r=r.concat(s.call(this,a))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return zt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},o={...this.defaults,...s},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const r=o.hooks?o.hooks.provideLexer():e?Gt.lex:Gt.lexInline,l=o.hooks?o.hooks.provideParser():e?zt.parse:zt.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(n):n).then(c=>r(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>l(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(a);try{o.hooks&&(n=o.hooks.preprocess(n));let c=r(n,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let d=l(c,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(c){return a(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Lt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Bn=new vb;function Q(e,t){return Bn.parse(e,t)}Q.options=Q.setOptions=function(e){return Bn.setOptions(e),Q.defaults=Bn.defaults,Cn(Q.defaults),Q},Q.getDefaults=Ut,Q.defaults=Oe,Q.use=function(...e){return Bn.use(...e),Q.defaults=Bn.defaults,Cn(Q.defaults),Q},Q.walkTokens=function(e,t){return Bn.walkTokens(e,t)},Q.parseInline=Bn.parseInline,Q.Parser=zt,Q.parser=zt.parse,Q.Renderer=qo,Q.TextRenderer=sl,Q.Lexer=Gt,Q.lexer=Gt.lex,Q.Tokenizer=Po,Q.Hooks=No,Q.parse=Q,Q.options,Q.setOptions,Q.use,Q.walkTokens,Q.parseInline,zt.parse,Gt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Ou,setPrototypeOf:Hu,isFrozen:bb,getPrototypeOf:yb,getOwnPropertyDescriptor:wb}=Object;let{freeze:Fe,seal:lt,create:ol}=Object,{apply:al,construct:rl}=typeof Reflect<"u"&&Reflect;Fe||(Fe=function(t){return t}),lt||(lt=function(t){return t}),al||(al=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)}),rl||(rl=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Oo=Ge(Array.prototype.forEach),kb=Ge(Array.prototype.lastIndexOf),Fu=Ge(Array.prototype.pop),ls=Ge(Array.prototype.push),$b=Ge(Array.prototype.splice),Ho=Ge(String.prototype.toLowerCase),ll=Ge(String.prototype.toString),cl=Ge(String.prototype.match),cs=Ge(String.prototype.replace),_b=Ge(String.prototype.indexOf),Eb=Ge(String.prototype.trim),bt=Ge(Object.prototype.hasOwnProperty),Ue=Ge(RegExp.prototype.test),ds=xb(TypeError);function Ge(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return al(e,t,i)}}function xb(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return rl(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ho;Hu&&Hu(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(bb(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Sb(e){for(let t=0;t<e.length;t++)bt(e,t)||(e[t]=null);return e}function Tt(e){const t=ol(null);for(const[n,i]of Ou(e))bt(e,n)&&(Array.isArray(i)?t[n]=Sb(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Tt(i):t[n]=i);return t}function us(e,t){for(;e!==null;){const i=wb(e,t);if(i){if(i.get)return Ge(i.get);if(typeof i.value=="function")return Ge(i.value)}e=yb(e)}function n(){return null}return n}const Uu=Fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),dl=Fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ul=Fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ib=Fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pl=Fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Lb=Fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gu=Fe(["#text"]),zu=Fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ml=Fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vu=Fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Fo=Fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Tb=lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ab=lt(/<%[\w\W]*|[\w\W]*%>/gm),Cb=lt(/\$\{[\w\W]*/gm),Bb=lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Db=lt(/^aria-[\-\w]+$/),Wu=lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Mb=lt(/^(?:\w+script|data):/i),jb=lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ku=lt(/^html$/i),Rb=lt(/^[a-z][.\w]*(-[.\w]+)+$/i);var Yu=Object.freeze({__proto__:null,ARIA_ATTR:Db,ATTR_WHITESPACE:jb,CUSTOM_ELEMENT:Rb,DATA_ATTR:Bb,DOCTYPE_NAME:Ku,ERB_EXPR:Ab,IS_ALLOWED_URI:Wu,IS_SCRIPT_OR_DATA:Mb,MUSTACHE_EXPR:Tb,TMPLIT_EXPR:Cb});const ps={element:1,text:3,progressingInstruction:7,comment:8,document:9},Pb=function(){return typeof window>"u"?null:window},qb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Qu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Zu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pb();const t=q=>Zu(q);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==ps.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=us(b,"cloneNode"),$=us(b,"remove"),E=us(b,"nextSibling"),L=us(b,"childNodes"),T=us(b,"parentNode");if(typeof a=="function"){const q=n.createElement("template");q.content&&q.content.ownerDocument&&(n=q.content.ownerDocument)}let j,x="";const{implementation:w,createNodeIterator:D,createDocumentFragment:H,getElementsByTagName:te}=n,{importNode:se}=i;let ne=Qu();t.isSupported=typeof Ou=="function"&&typeof T=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:S,ERB_EXPR:M,TMPLIT_EXPR:P,DATA_ATTR:Z,ARIA_ATTR:he,IS_SCRIPT_OR_DATA:Me,ATTR_WHITESPACE:qe,CUSTOM_ELEMENT:An}=Yu;let{IS_ALLOWED_URI:A}=Yu,U=null;const K=z({},[...Uu,...dl,...ul,...pl,...Gu]);let ke=null;const To=z({},[...zu,...ml,...Vu,...Fo]);let ve=Object.seal(ol(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ao=null,uu=null;const Zi=Object.seal(ol(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let hv=!0,pu=!0,vv=!1,bv=!0,Xi=!1,Ur=!0,ni=!1,mu=!1,fu=!1,Ji=!1,Gr=!1,zr=!1,yv=!0,wv=!1;const K1="user-content-";let gu=!0,Co=!1,es={},Ht=null;const hu=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let kv=null;const $v=z({},["audio","video","img","source","image","track"]);let vu=null;const _v=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vr="http://www.w3.org/1998/Math/MathML",Wr="http://www.w3.org/2000/svg",an="http://www.w3.org/1999/xhtml";let ts=an,bu=!1,yu=null;const Y1=z({},[Vr,Wr,an],ll);let Kr=z({},["mi","mo","mn","ms","mtext"]),Yr=z({},["annotation-xml"]);const Q1=z({},["title","style","font","a","script"]);let Bo=null;const Z1=["application/xhtml+xml","text/html"],X1="text/html";let xe=null,ns=null;const J1=n.createElement("form"),Ev=function(v){return v instanceof RegExp||v instanceof Function},wu=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ns&&ns===v)){if((!v||typeof v!="object")&&(v={}),v=Tt(v),Bo=Z1.indexOf(v.PARSER_MEDIA_TYPE)===-1?X1:v.PARSER_MEDIA_TYPE,xe=Bo==="application/xhtml+xml"?ll:Ho,U=bt(v,"ALLOWED_TAGS")?z({},v.ALLOWED_TAGS,xe):K,ke=bt(v,"ALLOWED_ATTR")?z({},v.ALLOWED_ATTR,xe):To,yu=bt(v,"ALLOWED_NAMESPACES")?z({},v.ALLOWED_NAMESPACES,ll):Y1,vu=bt(v,"ADD_URI_SAFE_ATTR")?z(Tt(_v),v.ADD_URI_SAFE_ATTR,xe):_v,kv=bt(v,"ADD_DATA_URI_TAGS")?z(Tt($v),v.ADD_DATA_URI_TAGS,xe):$v,Ht=bt(v,"FORBID_CONTENTS")?z({},v.FORBID_CONTENTS,xe):hu,Ao=bt(v,"FORBID_TAGS")?z({},v.FORBID_TAGS,xe):Tt({}),uu=bt(v,"FORBID_ATTR")?z({},v.FORBID_ATTR,xe):Tt({}),es=bt(v,"USE_PROFILES")?v.USE_PROFILES:!1,hv=v.ALLOW_ARIA_ATTR!==!1,pu=v.ALLOW_DATA_ATTR!==!1,vv=v.ALLOW_UNKNOWN_PROTOCOLS||!1,bv=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Xi=v.SAFE_FOR_TEMPLATES||!1,Ur=v.SAFE_FOR_XML!==!1,ni=v.WHOLE_DOCUMENT||!1,Ji=v.RETURN_DOM||!1,Gr=v.RETURN_DOM_FRAGMENT||!1,zr=v.RETURN_TRUSTED_TYPE||!1,fu=v.FORCE_BODY||!1,yv=v.SANITIZE_DOM!==!1,wv=v.SANITIZE_NAMED_PROPS||!1,gu=v.KEEP_CONTENT!==!1,Co=v.IN_PLACE||!1,A=v.ALLOWED_URI_REGEXP||Wu,ts=v.NAMESPACE||an,Kr=v.MATHML_TEXT_INTEGRATION_POINTS||Kr,Yr=v.HTML_INTEGRATION_POINTS||Yr,ve=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&Ev(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&Ev(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Xi&&(pu=!1),Gr&&(Ji=!0),es&&(U=z({},Gu),ke=[],es.html===!0&&(z(U,Uu),z(ke,zu)),es.svg===!0&&(z(U,dl),z(ke,ml),z(ke,Fo)),es.svgFilters===!0&&(z(U,ul),z(ke,ml),z(ke,Fo)),es.mathMl===!0&&(z(U,pl),z(ke,Vu),z(ke,Fo))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?Zi.tagCheck=v.ADD_TAGS:(U===K&&(U=Tt(U)),z(U,v.ADD_TAGS,xe))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?Zi.attributeCheck=v.ADD_ATTR:(ke===To&&(ke=Tt(ke)),z(ke,v.ADD_ATTR,xe))),v.ADD_URI_SAFE_ATTR&&z(vu,v.ADD_URI_SAFE_ATTR,xe),v.FORBID_CONTENTS&&(Ht===hu&&(Ht=Tt(Ht)),z(Ht,v.FORBID_CONTENTS,xe)),v.ADD_FORBID_CONTENTS&&(Ht===hu&&(Ht=Tt(Ht)),z(Ht,v.ADD_FORBID_CONTENTS,xe)),gu&&(U["#text"]=!0),ni&&z(U,["html","head","body"]),U.table&&(z(U,["tbody"]),delete Ao.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=v.TRUSTED_TYPES_POLICY,x=j.createHTML("")}else j===void 0&&(j=qb(g,s)),j!==null&&typeof x=="string"&&(x=j.createHTML(""));Fe&&Fe(v),ns=v}},xv=z({},[...dl,...ul,...Ib]),Sv=z({},[...pl,...Lb]),eL=function(v){let I=T(v);(!I||!I.tagName)&&(I={namespaceURI:ts,tagName:"template"});const R=Ho(v.tagName),fe=Ho(I.tagName);return yu[v.namespaceURI]?v.namespaceURI===Wr?I.namespaceURI===an?R==="svg":I.namespaceURI===Vr?R==="svg"&&(fe==="annotation-xml"||Kr[fe]):!!xv[R]:v.namespaceURI===Vr?I.namespaceURI===an?R==="math":I.namespaceURI===Wr?R==="math"&&Yr[fe]:!!Sv[R]:v.namespaceURI===an?I.namespaceURI===Wr&&!Yr[fe]||I.namespaceURI===Vr&&!Kr[fe]?!1:!Sv[R]&&(Q1[R]||!xv[R]):!!(Bo==="application/xhtml+xml"&&yu[v.namespaceURI]):!1},Ft=function(v){ls(t.removed,{element:v});try{T(v).removeChild(v)}catch{$(v)}},ii=function(v,I){try{ls(t.removed,{attribute:I.getAttributeNode(v),from:I})}catch{ls(t.removed,{attribute:null,from:I})}if(I.removeAttribute(v),v==="is")if(Ji||Gr)try{Ft(I)}catch{}else try{I.setAttribute(v,"")}catch{}},Iv=function(v){let I=null,R=null;if(fu)v="<remove></remove>"+v;else{const $e=cl(v,/^[\r\n\t ]+/);R=$e&&$e[0]}Bo==="application/xhtml+xml"&&ts===an&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const fe=j?j.createHTML(v):v;if(ts===an)try{I=new f().parseFromString(fe,Bo)}catch{}if(!I||!I.documentElement){I=w.createDocument(ts,"template",null);try{I.documentElement.innerHTML=bu?x:fe}catch{}}const Ne=I.body||I.documentElement;return v&&R&&Ne.insertBefore(n.createTextNode(R),Ne.childNodes[0]||null),ts===an?te.call(I,ni?"html":"body")[0]:ni?I.documentElement:Ne},Lv=function(v){return D.call(v.ownerDocument||v,v,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},ku=function(v){return v instanceof p&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof d)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},Tv=function(v){return typeof r=="function"&&v instanceof r};function rn(q,v,I){Oo(q,R=>{R.call(t,v,I,ns)})}const Av=function(v){let I=null;if(rn(ne.beforeSanitizeElements,v,null),ku(v))return Ft(v),!0;const R=xe(v.nodeName);if(rn(ne.uponSanitizeElement,v,{tagName:R,allowedTags:U}),Ur&&v.hasChildNodes()&&!Tv(v.firstElementChild)&&Ue(/<[/\w!]/g,v.innerHTML)&&Ue(/<[/\w!]/g,v.textContent)||v.nodeType===ps.progressingInstruction||Ur&&v.nodeType===ps.comment&&Ue(/<[/\w]/g,v.data))return Ft(v),!0;if(!(Zi.tagCheck instanceof Function&&Zi.tagCheck(R))&&(!U[R]||Ao[R])){if(!Ao[R]&&Bv(R)&&(ve.tagNameCheck instanceof RegExp&&Ue(ve.tagNameCheck,R)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(R)))return!1;if(gu&&!Ht[R]){const fe=T(v)||v.parentNode,Ne=L(v)||v.childNodes;if(Ne&&fe){const $e=Ne.length;for(let at=$e-1;at>=0;--at){const ln=y(Ne[at],!0);ln.__removalCount=(v.__removalCount||0)+1,fe.insertBefore(ln,E(v))}}}return Ft(v),!0}return v instanceof l&&!eL(v)||(R==="noscript"||R==="noembed"||R==="noframes")&&Ue(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ft(v),!0):(Xi&&v.nodeType===ps.text&&(I=v.textContent,Oo([S,M,P],fe=>{I=cs(I,fe," ")}),v.textContent!==I&&(ls(t.removed,{element:v.cloneNode()}),v.textContent=I)),rn(ne.afterSanitizeElements,v,null),!1)},Cv=function(v,I,R){if(yv&&(I==="id"||I==="name")&&(R in n||R in J1))return!1;if(!(pu&&!uu[I]&&Ue(Z,I))){if(!(hv&&Ue(he,I))){if(!(Zi.attributeCheck instanceof Function&&Zi.attributeCheck(I,v))){if(!ke[I]||uu[I]){if(!(Bv(v)&&(ve.tagNameCheck instanceof RegExp&&Ue(ve.tagNameCheck,v)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(v))&&(ve.attributeNameCheck instanceof RegExp&&Ue(ve.attributeNameCheck,I)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(I,v))||I==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&Ue(ve.tagNameCheck,R)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(R))))return!1}else if(!vu[I]){if(!Ue(A,cs(R,qe,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&v!=="script"&&_b(R,"data:")===0&&kv[v])){if(!(vv&&!Ue(Me,cs(R,qe,"")))){if(R)return!1}}}}}}}return!0},Bv=function(v){return v!=="annotation-xml"&&cl(v,An)},Dv=function(v){rn(ne.beforeSanitizeAttributes,v,null);const{attributes:I}=v;if(!I||ku(v))return;const R={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0};let fe=I.length;for(;fe--;){const Ne=I[fe],{name:$e,namespaceURI:at,value:ln}=Ne,is=xe($e),$u=ln;let je=$e==="value"?$u:Eb($u);if(R.attrName=is,R.attrValue=je,R.keepAttr=!0,R.forceKeepAttr=void 0,rn(ne.uponSanitizeAttribute,v,R),je=R.attrValue,wv&&(is==="id"||is==="name")&&(ii($e,v),je=K1+je),Ur&&Ue(/((--!?|])>)|<\/(style|title|textarea)/i,je)){ii($e,v);continue}if(is==="attributename"&&cl(je,"href")){ii($e,v);continue}if(R.forceKeepAttr)continue;if(!R.keepAttr){ii($e,v);continue}if(!bv&&Ue(/\/>/i,je)){ii($e,v);continue}Xi&&Oo([S,M,P],jv=>{je=cs(je,jv," ")});const Mv=xe(v.nodeName);if(!Cv(Mv,is,je)){ii($e,v);continue}if(j&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!at)switch(g.getAttributeType(Mv,is)){case"TrustedHTML":{je=j.createHTML(je);break}case"TrustedScriptURL":{je=j.createScriptURL(je);break}}if(je!==$u)try{at?v.setAttributeNS(at,$e,je):v.setAttribute($e,je),ku(v)?Ft(v):Fu(t.removed)}catch{ii($e,v)}}rn(ne.afterSanitizeAttributes,v,null)},tL=function q(v){let I=null;const R=Lv(v);for(rn(ne.beforeSanitizeShadowDOM,v,null);I=R.nextNode();)rn(ne.uponSanitizeShadowNode,I,null),Av(I),Dv(I),I.content instanceof o&&q(I.content);rn(ne.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(q){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,R=null,fe=null,Ne=null;if(bu=!q,bu&&(q="<!-->"),typeof q!="string"&&!Tv(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw ds("dirty is not a string, aborting")}else throw ds("toString is not a function");if(!t.isSupported)return q;if(mu||wu(v),t.removed=[],typeof q=="string"&&(Co=!1),Co){if(q.nodeName){const ln=xe(q.nodeName);if(!U[ln]||Ao[ln])throw ds("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof r)I=Iv("<!---->"),R=I.ownerDocument.importNode(q,!0),R.nodeType===ps.element&&R.nodeName==="BODY"||R.nodeName==="HTML"?I=R:I.appendChild(R);else{if(!Ji&&!Xi&&!ni&&q.indexOf("<")===-1)return j&&zr?j.createHTML(q):q;if(I=Iv(q),!I)return Ji?null:zr?x:""}I&&fu&&Ft(I.firstChild);const $e=Lv(Co?q:I);for(;fe=$e.nextNode();)Av(fe),Dv(fe),fe.content instanceof o&&tL(fe.content);if(Co)return q;if(Ji){if(Gr)for(Ne=H.call(I.ownerDocument);I.firstChild;)Ne.appendChild(I.firstChild);else Ne=I;return(ke.shadowroot||ke.shadowrootmode)&&(Ne=se.call(i,Ne,!0)),Ne}let at=ni?I.outerHTML:I.innerHTML;return ni&&U["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Ue(Ku,I.ownerDocument.doctype.name)&&(at="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+at),Xi&&Oo([S,M,P],ln=>{at=cs(at,ln," ")}),j&&zr?j.createHTML(at):at},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};wu(q),mu=!0},t.clearConfig=function(){ns=null,mu=!1},t.isValidAttribute=function(q,v,I){ns||wu({});const R=xe(q),fe=xe(v);return Cv(R,fe,I)},t.addHook=function(q,v){typeof v=="function"&&ls(ne[q],v)},t.removeHook=function(q,v){if(v!==void 0){const I=kb(ne[q],v);return I===-1?void 0:$b(ne[q],I,1)[0]}return Fu(ne[q])},t.removeHooks=function(q){ne[q]=[]},t.removeAllHooks=function(){ne=Qu()},t}var Xu=Zu();const fl="chaotic_";function Je(e){try{return localStorage.getItem(fl+e)}catch{return null}}function ct(e,t){try{localStorage.setItem(fl+e,t)}catch{}}function At(e){try{localStorage.removeItem(fl+e)}catch{}}function gl(){return Je("token")}function Nb(e){e?ct("token",e):At("token")}function Ob(){return Je("theme")}function Hb(e){ct("theme",e)}function Ju(){return Je("last_project")}function ep(e){ct("last_project",e)}function Fb(){return Je("onboarding_complete")==="true"}function Ub(){ct("onboarding_complete","true")}function Gb(){At("onboarding_complete")}function zb(e){return e?Je(`issues_filters_${e}`):null}function Vb(e,t){e&&(t?ct(`issues_filters_${e}`,t):At(`issues_filters_${e}`))}function tp(e){return Je(`comment_draft_${e}`)}function Uo(e,t){t?ct(`comment_draft_${e}`,t):At(`comment_draft_${e}`)}function np(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function ms(e){const t=Je(`description_draft_${e}`);if(!t)return null;const n=np(t);return n?n.draft:t}function ip(e){const t=Je(`description_draft_${e}`);if(!t)return null;const n=np(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Dn(e,t,n=""){t?ct(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):At(`description_draft_${e}`)}function sp(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function op(e){var n;const t=Je(`document_draft_${e}`);return t?((n=sp(t))==null?void 0:n.draft)??null:null}function Wb(e){const t=Je(`document_draft_${e}`);if(!t)return null;const n=sp(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Go(e,t,n=null){t&&(t.title||t.content||t.icon)?ct(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):At(`document_draft_${e}`)}function Kb(){return{title:Je("create_issue_title"),description:Je("create_issue_description")}}function ap(e,t){e?ct("create_issue_title",e):At("create_issue_title"),t?ct("create_issue_description",t):At("create_issue_description")}function Yb(){At("create_issue_title"),At("create_issue_description")}function Qb(){return Je("doc_view_mode")}function Zb(e){ct("doc_view_mode",e)}function Xb(){return Je("composer_mode")==="markdown"?"markdown":"rich"}function rp(e){ct("composer_mode",e==="markdown"?"markdown":"rich")}const Jb="chaotic-boot-cache",hl="snapshot",vl="last",lp=1,ey=336*60*60*1e3,ty=250;let Mn=null;function ny(){return Mn||(Mn=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(Jb,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(hl),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),Mn=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),Mn.catch(()=>{Mn=null}),Mn)}function bl(e,t){return ny().then(n=>new Promise((i,s)=>{const o=n.transaction(hl,e),a=t(o.objectStore(hl));o.oncomplete=()=>i(a==null?void 0:a.result),o.onerror=()=>s(o.error),o.onabort=()=>s(o.error)}))}function cp(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function iy(e){if(!e)return Promise.resolve(null);const t=bl("readonly",i=>i.get(vl)).then(i=>!i||i.version!==lp||i.userId!==e||!(Date.now()-i.savedAt<ey)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),ty));return Promise.race([t,n])}function sy(e,t){if(!e)return Promise.resolve();const n={...t,version:lp,userId:e,savedAt:Date.now()};return bl("readwrite",i=>i.put(n,vl)).then(()=>{},()=>{})}function yl(){return bl("readwrite",e=>e.delete(vl)).then(()=>{},()=>{})}const fs=/^[0-9a-f-]{36}$/,oy=/^\/api\/attachments\/([0-9a-f-]{36})\/content$/;function dp(e){if(typeof e!="string"||e==="")return null;const t=window.location.origin;let n;try{n=new URL(e,t)}catch{return null}if(n.origin!==t||n.search!==""||n.hash!==""||n.username||n.password)return null;const i=oy.exec(n.pathname);return i?i[1]:null}function ay(e){for(const t of e.querySelectorAll("img[src]")){const n=dp(t.getAttribute("src"));n&&(t.removeAttribute("src"),t.removeAttribute("srcset"),t.setAttribute("data-attachment-id",n),t.classList.add("attachment-inline"),!t.closest("a[href]")&&(t.setAttribute("data-action","open-attachment"),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label",`View ${t.getAttribute("alt")||"image"}`)))}for(const t of e.querySelectorAll("a[href]")){const n=dp(t.getAttribute("href"));n&&(t.setAttribute("data-attachment-ref",n),t.setAttribute("data-action","open-attachment"),t.classList.add("attachment-link"))}}const up="/api";class ry{constructor(){this.token=gl()}setToken(t){this.token=t,Nb(t)}getToken(){return this.token}async request(t,n,i=null,{headers:s=null}={}){const o={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(o.Authorization=`Bearer ${this.token}`),s&&Object.assign(o,s);const a={method:t,headers:o},r=typeof Blob<"u"&&i instanceof Blob;r&&(o["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=r?i:JSON.stringify(i));let l;try{l=await fetch(`${up}${n}`,a)}catch(d){const p=new Error("Network error - check your connection");throw p.isNetworkError=!0,p.cause=d,p}if(l.status===204)return null;let c;try{c=await l.json()}catch{const d=l.headers.get("content-type")||"unknown";throw l.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${l.status})`)}if(!l.ok){let d;typeof c.detail=="string"?d=c.detail:c.detail&&typeof c.detail=="object"&&c.detail.message?d=c.detail.message:d="An error occurred";const p=new Error(d);throw p.status=l.status,p.detail=c.detail,p}return c}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),yl()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(o=>n.append(i,o)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:o=null,skip:a=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),o&&c.set("order",o),c.set("skip",String(a)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,o=50){let a=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${o}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,o])=>{o==null||o===""||(Array.isArray(o)?o.forEach(a=>i.append(s,a)):i.append(s,o))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let o=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getAttachments(t){return this.request("GET",`/issues/${t}/attachments`)}async uploadAttachment(t,n,{idempotencyKey:i}={}){const s=encodeURIComponent(n.name||"file"),o=i?{"Idempotency-Key":i}:null;return this.request("POST",`/issues/${t}/attachments?filename=${s}`,n,{headers:o})}async deleteAttachment(t){return this.request("DELETE",`/attachments/${encodeURIComponent(t)}`)}async fetchAttachmentContent(t){if(!fs.test(t))throw new Error("Not an attachment id");const n={};this.token&&(n.Authorization=`Bearer ${this.token}`);let i;try{i=await fetch(`${up}/attachments/${t}/content`,{headers:n,credentials:"same-origin",redirect:"error"})}catch(s){const o=new Error("Network error - check your connection");throw o.isNetworkError=!0,o.cause=s,o}if(!i.ok){let s=null;try{s=(await i.json()).detail}catch{}const o=typeof s=="string"?s:(s==null?void 0:s.message)||`Request failed (${i.status})`,a=new Error(o);throw a.status=i.status,a.detail=s,a}return i.blob()}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let o=`/teams/${t}/documents`;const a=[];return n&&a.push(`project_id=${n}`),s&&a.push(`sprint_id=${s}`),i&&a.push(`search=${encodeURIComponent(i)}`),a.length&&(o+=`?${a.join("&")}`),this.request("GET",o)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/teams/${t}/agents`,o)}async createProjectAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/projects/${t}/agents`,o)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,kinds:i=null,includeArchived:s=!1,skip:o=0,limit:a=50}={}){const r=new URLSearchParams({team_id:t,skip:o,limit:a});n&&r.set("unread","true"),s&&r.set("include_archived","true");for(const l of i||[])r.append("kind",l);return this.request("GET",`/inbox?${r.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new ry;let si=null;const ly='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let oi=null,gs=!1;function wl(){gs=!0}function cy(){gs=!1}function pp(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function dy(){if(gs)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function G(){oi=document.activeElement,gs=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function F(){var e;Vt(),gs=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),oi&&document.contains(oi)&&typeof oi.focus=="function"&&oi.focus(),oi=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(ly);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())});function ze(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const o=document.createElement("button");o.type="button",o.className="toast-close",o.setAttribute("aria-label","Dismiss"),o.textContent="×",i.appendChild(o),n.appendChild(i);const a=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),p=setTimeout(a,l);return o.addEventListener("click",()=>{clearTimeout(p),a()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),p=setTimeout(a,Math.max(c,500))}),i}function hs(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function uy(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function _(e,t){const n=uy(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Vt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),si&&(document.removeEventListener("keydown",si),si=null)}function py(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Vt(),t&&ze()&&pp()}function vs(e){si&&document.removeEventListener("keydown",si),si=e,e&&document.addEventListener("keydown",e)}function bs(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Vt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Le(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Te(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Se(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ae(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function my(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function et(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),o=Math.floor(i/36e5),a=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:a<7?`${a}d ago`:t.toLocaleDateString()}function dt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const kl=/^\/api\/avatars\/[0-9a-f]{64}$/;function mp(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||kl.test(e))}function Wt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?mp(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function fp(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function zo(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return fp(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ue={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const $l=new Set;function be(e,t){if(typeof e=="string"){const n=ue[e];ue[e]=t,gp(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const o=ue[i];ue[i]=s,n.push({key:i,value:s,oldValue:o})}n.forEach(({key:i,value:s,oldValue:o})=>{gp(i,s,o)})}}function yt(e){return $l.add(e),()=>$l.delete(e)}function gp(e,t,n){t!==n&&$l.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const pe=()=>ue.currentUser,Ct=e=>be("currentUser",e),B=()=>ue.currentView,jn=e=>be("currentView",e),ie=()=>ue.issues,tt=e=>be("issues",e),ys=()=>ue.detailNavContext,Bt=e=>be("detailNavContext",e),_l=()=>ue.labels,ws=e=>be("labels",e),hp=()=>ue.activeFilterCategory,fy=e=>be("activeFilterCategory",e),vp=()=>ue.selectedIssueIndex,Rn=e=>be("selectedIssueIndex",e),gy=()=>ue.selectedDocIndex,bp=e=>be("selectedDocIndex",e),yp=()=>ue.selectedBoardIndex,Vo=e=>be("selectedBoardIndex",e),hy=()=>ue.selectedInboxIndex,Wo=e=>be("selectedInboxIndex",e),vy=()=>ue.selectedSprintIndex,wp=e=>be("selectedSprintIndex",e),by=()=>ue.selectedEpicIndex,El=e=>be("selectedEpicIndex",e),re=()=>ue.inboxEntries,Kt=e=>be("inboxEntries",e),Ko=()=>ue.inboxUnreadCount,ks=e=>be("inboxUnreadCount",e),yy=()=>ue.searchDebounceTimer,wy=e=>be("searchDebounceTimer",e),ky=()=>ue.websocket,xl=e=>be("websocket",e),C=()=>ue.currentTeam,ai=e=>be("currentTeam",e),X=()=>ue.currentProject,wt=e=>be("currentProject",e||null),_e=()=>ue.currentDetailIssue,ri=e=>be("currentDetailIssue",e),$y=()=>ue.currentDetailSprints,kp=e=>be("currentDetailSprints",e),Sl=["backlog","todo","in_progress","in_review","done","canceled"],$s=["backlog","todo","in_progress","in_review"],$p=["urgent","high","medium","low","no_priority"],Il=["no_priority","urgent","high","medium","low"],_p=["backlog","todo","in_progress","in_review","done"],Yo="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function Pn(e){if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||!!e.isContentEditable}const Ll={};function le(e){Object.assign(Ll,e)}function _y(e){var o;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target&&Pn(e.target)||n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Ll[i];if(!s){typeof process<"u"&&((o=process.env)==null?void 0:o.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Ep=!1;function Ey(){if(!Ep){Ep=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,_y);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Ll[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function xy(e){const t=document.createElement("template");return t.innerHTML=e,ay(t.content),t.innerHTML}function ut(e){if(!e)return"";try{Q.setOptions({breaks:!0,gfm:!0});const n=Q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;")),i=Xu.sanitize(n,{FORCE_BODY:!0,ALLOW_DATA_ATTR:!1});return i.includes("/api/attachments/")?xy(i):i}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Sy(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),o=Math.floor(s/60),a=Math.floor(o/60),r=Math.floor(a/24);return s<60?"just now":o<60?`${o}m ago`:a<24?`${a}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Y({icon:e,heading:t,description:n,cta:i,variant:s}){const o=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${o}
        </div>
    `}const W={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},Qo={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Zo={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let xp=0;function Sp(e){xp=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,o]=n.split("__");t+=Ip(s,o,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Ip(e="",t="",n=""){const i=xp++,s=Object.keys(Qo).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),a=(e?Qo[e]:Qo.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Zo[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function Iy(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Ip()),Xo()}function Ly(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Xo()}function Ty(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const o=Qo[s]||[];i.innerHTML=o.map(a=>`<option value="${a}">${Zo[a]}</option>`).join(""),Lp(e),Xo()}function Lp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function _s(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Xo(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Tp(){var i,s,o;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const a of e){const r=(i=a.querySelector(".condition-field"))==null?void 0:i.value,l=(s=a.querySelector(".condition-operator"))==null?void 0:s.value,c=a.querySelector(".condition-value");let d=(o=c==null?void 0:c.value)==null?void 0:o.trim();if(!r&&!l)continue;if(!r)throw _s("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw _s("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw _s(`Duplicate condition: ${r} ${Zo[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw _s(`Please enter a numeric value for ${r} ${Zo[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw _s(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return Xo(),Object.keys(t).length>0?t:null}le({"add-condition-row":()=>{Iy()},"remove-condition-row":(e,t)=>{Ly(Number(t.rowId))},"update-operator-options":(e,t)=>{Ty(Number(t.rowId))},"toggle-value-input":(e,t)=>{Lp(Number(t.rowId))}});let Ae=[];const Jo="project-switcher",Tl="all";function ea(e=X()){const t=document.getElementById(Jo);t&&(t.value=e||"")}yt((e,t)=>{e==="currentProject"&&(t&&ep(t),ea(t),Ky(t||""))});function Ap(){ep(Tl),wt(null)}const ta={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function oe(){return Ae}function Ay(e){Ae=e}function li(e){const t=Ae.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return ta[n]||ta.fibonacci}function cn(e,t){if(e==null)return"No estimate";const i=li(t).find(s=>s.value===e);return i?i.label:`${e} points`}function na(e,t){return e==null||e===0?!1:!li(t).some(i=>i.value===e)}function Cy(e){const t=Ae.find(a=>a.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(ta[n]||ta.fibonacci).filter(a=>a.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(a=>a.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function pt(){var t,n;const e=(t=C())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=C())==null?void 0:n.id)!==e)return;Ae=i,Bp(),Cp()}catch(i){_("load projects",i)}}function Cp(){const e=X();if(e&&Ae.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Ae.some(s=>s.id===n)){wt(n);return}const i=Ju();if(i===Tl){e&&wt(null);return}if(i&&Ae.some(s=>s.id===i)){wt(i);return}Ae.length>0&&wt(Ae[0].id)}function Bp(){const e=document.getElementById(Jo);e&&(e.innerHTML='<option value="">All projects</option>'+Ae.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),ea())}function Dp(){const e=Ju();return e===Tl?null:e}function qn(){const e=document.getElementById("projects-list");if(Ae.length===0){e.innerHTML=Y({icon:W.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Ae.map(t=>`
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
    `).join("")}function By(e){wt(e),O("issues")}function Mp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function Dy(e){e.preventDefault();const t=C();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await pt(),qn(),F(),k("Project created!","success")}catch(i){_("create project",i)}return!1}async function My(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await pt(),qn(),F(),k("Project updated!","success")}catch(i){_("update project",i)}return!1}async function jy(e){const t=Ae.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await pt(),qn(),F(),k("Project deleted","success")}catch(n){_("delete project",n)}}let Ce=null;function jp(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function Ry(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Ce!==e.id)return;const i=n.filter(o=>o.id===e.default_epic_id||o.status!=="done"&&o.status!=="canceled"),s=e.default_epic_id&&!i.some(o=>o.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(o=>`<option value="${m(o.id)}">${u(o.identifier)} ${u(o.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function ia(e,{tab:t="general",replace:n=!1,onlyIfView:i}={}){if(Ae.length===0&&(await pt(),i&&B()!==i))return;e!==Ce&&(Yt=[]),Ce=e,jn("projects");const s=Ae.find(r=>r.id===e);if(!s){k("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${s.name} Settings`,document.getElementById("ps-name").value=s.name||"",document.getElementById("ps-key").value=s.key||"",document.getElementById("ps-description").value=s.description||"",document.getElementById("ps-color").value=s.color||"#6366f1",document.getElementById("ps-estimate-scale").value=s.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=s.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=s.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=s.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=s.require_estimate_on_claim===!0,jp("ps-require-assignee-on-claim",s.require_assignee_on_claim===!0),jp("ps-require-epic-on-close",s.require_epic_on_close===!0),Ry(s),document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden");const o=Pp(e,t),a=qp(e,o.tab);n?window.history.replaceState(o,"",a):window.history.pushState(o,"",a),Np(t)}const Rp=["general","rules","sprint-rituals","close-rituals","claim-rituals"];function Pp(e,t){return{view:"project-settings",settingsProjectId:e,tab:Rp.includes(t)?t:"general"}}function qp(e,t){const n=`/projects/${encodeURIComponent(e)}/settings`;return t==="general"?n:`${n}?tab=${t}`}function Np(e){Rp.includes(e)||(e="general");const t=Ce;t&&window.location.pathname===`/projects/${encodeURIComponent(t)}/settings`&&window.history.replaceState(Pp(t,e),"",qp(t,e)),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Yt||Yt.length===0)&&sa()}function Py(){Ce=null,Yt=[]}async function qy(){if(!Ce)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Ce,t),await pt(),k("Settings saved","success");const n=Ae.find(i=>i.id===Ce);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){_("save project settings",n)}}async function Ny(){if(!Ce)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const o=document.getElementById("ps-default-epic");o&&!o.disabled&&(n.default_epic_id=o.value||null);try{await h.updateProject(Ce,n),await pt(),k("Settings saved","success")}catch(a){_("save settings",a)}}let Yt=[];async function sa(){const e=Ce;if(!e)return!1;try{const t=await h.getRituals(e);return e!==Ce?!1:(Yt=t,Oy(),!0)}catch(t){return _("load rituals",t),!1}}function Oy(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Yt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Yt.filter(i=>i.trigger==="ticket_close"),n=Yt.filter(i=>i.trigger==="ticket_claim");Al("ps-sprint-rituals-list",e,"sprint"),Al("ps-close-rituals-list",t,"close"),Al("ps-claim-rituals-list",n,"claim")}function Al(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const o={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${o[n]} rituals configured.</p>`;return}const s=o=>m(o||"auto");i.innerHTML=t.map(o=>{let a="";if(o.group_name){const r=o.weight!=null&&o.weight!==1?` w:${o.weight}`:o.percentage!=null?` ${o.percentage}%`:"";a=`<span class="badge badge-ritual-group">${u(o.group_name)}${r}</span>`}return`
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
  `}).join("")}async function Hy(e){if(!Ce)return;let t=[];try{t=await h.getRitualGroups(Ce)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Sp(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,G()}function Fy(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Uy(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const o=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",o!=="random_one"),i.classList.toggle("hidden",o!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Op(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Ce,{name:t,selection_mode:n})).id}return e.value||null}async function Gy(e){var s;e.preventDefault();let t;try{t=Tp()}catch{return!1}let n;try{n=await Op()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const o=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(i.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(i.percentage=parseFloat(a.value))}try{await h.createRitual(Ce,i),await sa(),F(),k("Ritual created!","success")}catch(o){_("create ritual",o)}return!1}async function zy(e){const t=Yt.find(a=>a.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Ce)}catch{}const i=n.find(a=>a.id===t.group_id),s=i&&i.selection_mode==="random_one",o=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Sp(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,G()}async function Vy(e,t){var o;e.preventDefault();let n;try{n=Tp()}catch{return!1}let i;try{i=await Op()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((o=document.getElementById("ritual-artifact"))==null?void 0:o.value)||null,conditions:n,group_id:i||""};if(i){const a=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(s.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await sa(),F(),k("Ritual updated!","success")}catch(a){_("update ritual",a)}return!1}async function Wy(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await sa(),k("Ritual deleted","success")}catch(n){_("delete ritual",n)}}le({"view-project":(e,t)=>{By(t.projectId)},"view-project-settings":(e,t)=>{ia(t.projectId)},"create-project":e=>{Dy(e)},"update-project":(e,t)=>{My(e,t.projectId)},"confirm-delete-project":(e,t)=>{jy(t.projectId)},"edit-project-ritual":(e,t)=>{zy(t.ritualId)},"delete-project-ritual":(e,t)=>{Wy(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Gy(e)},"update-project-ritual":(e,t)=>{Vy(e,t.ritualId)},"toggle-ritual-conditions":()=>{Fy()},"ritual-group-change":()=>{Uy()}});function Hp(){const t=new URLSearchParams(window.location.search).get("project");return t||Dp()}function Ky(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Cl={},Fp=new Map;let Bl=null,Dl=null,Ml=null,jl=null,Rl=null,Pl=null,ql=null,Up=!1;function Yy(e){Object.assign(Cl,e)}function Qy({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:o,beforeScrollRestore:a}={}){e&&(Bl=e),t&&(Dl=t),n&&(Ml=n),i&&(jl=i),s&&(Rl=s),o&&(Pl=o),a&&(ql=a)}function Gp(){return Object.keys(Cl)}const Zy=["issues","query","board","sprints","epics","documents","rituals","my-issues"],zp={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"},Xy={board:"issues",rituals:"projects"};function Es(e){const t=Xy[e]||e;document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)})}function Vp(){Bl&&Bl()}function O(e,t=!0,{transition:n=!1}={}){if(t&&dn(),jn(e),t){let o;const a=Hp();e==="my-issues"?o=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?o=`/issues${window.location.search}`:Zy.includes(e)&&a?o=`/${e}?project=${a}`:o=`/${e}`,history.pushState({view:e},"",o)}Es(e),Vp();const i=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const o=document.getElementById(`${e}-view`);o&&o.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Cl[e];s&&s(),t&&window.scrollTo(0,0)}const xs={"gate-approvals":"inbox",approvals:"inbox",team:"people"},Jy=new Set(["team","approvals","gate-approvals"]),ew={approvals:"kind=approvals","gate-approvals":"kind=approvals"};function Wp(){var i;jn(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":xs[e[0]]||e[0],n=e.length<=1&&Gp().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Es(t)):Es(zp[e[0]]||null)}function Nl(){var i;const t=window.location.pathname.split("/").filter(Boolean);jl&&jl(),B()||jn("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Dl&&Dl(t)){const s=zp[t[0]];s&&Es(s);return}else{if(n=t[0],xs[n]){if(t.length===1&&Jy.has(n)){const o=ew[n]||window.location.search.slice(1);history.replaceState({view:xs[n]},"",`/${xs[n]}${o?`?${o}`:""}`)}n=xs[n]}Gp().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function dn(){Fp.set(window.location.href,window.scrollY)}function oa(e){dn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Rl&&Rl(e)}function Kp(e){dn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Pl&&Pl(e)}function Yp(){const e=Fp.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{ql&&ql(),window.scrollTo(0,e)})}function Qp(){Up||(Up=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Ml&&Ml(e.state)){Yp();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):Nl(),Yp()}))}let Ol=[];function tw(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function nw(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Ss(e,t){const n=e().map(tw),i=t().map(nw);Ol=[...n,...i]}function kt(e){return e&&Ol.find(t=>t.id===e)||null}function mt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function aa(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function Is({includeIdle:e=!1,keepId:t=null}={}){const n=Ol.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),o=n.filter(b=>b.is_agent),a=new Set(o.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&a.has(b.registered_by_id),c=new Map,d=new Map;o.forEach(b=>{const[y,$]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has($)||y.set($,[]),y.get($).push(b)});const p=[],f=(b,y)=>{p.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(E=>p.push({assignee:E,indent:2}))};return i.forEach(b=>{p.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),o.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),p}function ci({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Is({keepId:n}).forEach(({assignee:s,indent:o})=>{i+=`<option value="${m(s.id)}">${aa(s,o)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function iw(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&kt(e)&&ci({keepId:e}),t.value=e}let di=[];function ft(){return di}function sw(e){di=Array.isArray(e)?e:[]}function ow(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?mp(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function aw(e){var t,n;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=C())==null?void 0:n.id)!==e)return;di=i,Ss(Et,ft),ci()}catch(i){console.error("Failed to load team agents:",i),_("load team agents",i)}}async function Ls(e){var t;if(e||(e=(t=C())==null?void 0:t.id),!!e)try{di=await h.getTeamAgents(e),Ss(Et,ft),ci(),rw()}catch(n){_("load agents",n)}}function rw(){var o;const e=document.getElementById("agents-list");if(!e)return;const t=(o=pe())==null?void 0:o.id,n=di.filter(a=>a.parent_user_id===t&&a.kind!=="session");if(n.length===0){e.innerHTML=Y({icon:W.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=oe(),s=a=>{if(!a)return"Team-wide";const r=i.find(l=>l.id===a);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(a=>{const r=m(a.id),l=di.filter(d=>d.registered_by_id===a.id).length,c=[s(a.agent_project_id),a.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Se(a.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${ow(a)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(a.name)}${a.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function lw(){const e=oe();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),G()}function Zp(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,G()}async function cw(e){var r,l,c,d;e.preventDefault();const t=(r=C())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,o=(c=document.getElementById("agent-project"))==null?void 0:c.value,a=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let p;s&&o?p=await h.createProjectAgent(o,n,i,a):p=await h.createTeamAgent(t,n,i,a),F(),Zp("Agent Created",p.api_key,!!p.can_register),await Ls(),ra(p.id,{created:!0})}catch(p){_("create agent",p)}return!1}async function dw(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);Zp("New Agent Key",n.key),ra(e,{credentials:!0})}catch(n){_("generate agent key",n)}}async function uw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await Ls(),ra(e)}catch(s){_("change registrar",s)}}function ra(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function pw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function mw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),await Ls(),ra(e,{deleted:!0})}catch(n){_("delete agent",n)}}le({"create-agent":e=>{cw(e)},"copy-agent-key":()=>{pw()},"dismiss-agent-modal":()=>{F(),Ls()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||mw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||dw(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||uw(t.agentId,t.agentName,t.canRegister!=="true")}});const Xp=24,nt=new Map,ye=new Map,$t=new Map;let Qt=null;function fw(e){return Array.isArray(e)?[...e].map(String).sort():e}function Jp(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,fw(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function la(e,t){for(ye.delete(e),ye.set(e,t);ye.size>Xp;){const n=ye.keys().next().value;ye.delete(n)}em()}function em(){if(nt.size===0)return;const e=new Set;ye.forEach(t=>t.ids.forEach(n=>e.add(n))),nt.forEach((t,n)=>{e.has(n)||nt.delete(n)})}function gw(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function tm(e){const t=ye.get(e);return t?(la(e,t),t.ids.map(n=>nt.get(n)).filter(Boolean)):null}function Hl(e){return nt.get(e)}function hw(e){var t;return((t=ye.get(e))==null?void 0:t.meta)||{}}function nm(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Fl(e){const t=nt.get(e.id);if(!nm(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){nt.set(e.id,{...e,description:t.description});return}nt.set(e.id,e)}}const Ul=new Set;function vw(e){return Ul.add(e),()=>Ul.delete(e)}function im(e,t,n){if(!Array.isArray(t))return;const i=gw(t);i.forEach(Fl);const s=ye.get(e);la(e,{ids:i.map(o=>o.id),meta:n??(s==null?void 0:s.meta)??{}}),Ul.forEach(o=>{try{o(e)}catch(a){console.error(a)}})}function bw(e,t){const n=ye.get(e);n&&(n.meta=t)}function ca(e){e!=null&&e.id&&nt.has(e.id)&&Fl(e)}function yw(e){ye.delete(e),$t.forEach((t,n)=>{t===e&&$t.delete(n)}),Qt===e&&(Qt=null),em()}function ww(e){nt.delete(e),ye.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function da(e){Qt=e}function kw(){return Qt}function sm(e,t){for($t.delete(e),$t.set(e,t);$t.size>Xp;)$t.delete($t.keys().next().value)}function $w(e){const t=$t.get(e);return t&&ye.has(t)?t:null}function _w({maxQueries:e=3}={}){const t=[...ye.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(o=>i.add(o))),{queries:t.map(([s,o])=>[s,{ids:[...o.ids],meta:o.meta||{}}]),entities:[...i].map(s=>nt.get(s)).filter(Boolean),views:[...$t.entries()].filter(([,s])=>n.has(s))}}function Ew(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{ye.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Fl(t.get(s))}),la(n,{ids:i.ids.filter(s=>nt.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!$t.has(n)&&ye.has(i)&&sm(n,i)})}function om(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function am(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(om(e[n])!==om(t[n]))return!1;return!0}const rm=["status","priority"],lm=["assignee_id","sprint_id","issue_type"],xw={assignee_id:"unassigned",sprint_id:"no_sprint"},Sw=["scope","project_id","sort_by","order","limit"],Nn=e=>(e||[]).map(t=>String(t).toLowerCase());function Iw(e,t){if(e.search||t.search||t.sort_by==="random"||Sw.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of rm)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of lm)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=Nn(e.label);if(!Nn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=Nn(t.exclude_label);if(!Nn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function cm(e){const t=e.label===void 0?null:Nn(e.label),n=e.exclude_label===void 0?null:Nn(e.exclude_label);return i=>{for(const s of rm)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of lm){if(e[s]===void 0)continue;const o=e[s]===xw[s]?null:e[s];if((i[s]??null)!==o)return!1}if(t||n){const s=Nn((i.labels||[]).map(o=>o.name));if(t&&!t.some(o=>s.includes(o))||n&&n.some(o=>s.includes(o)))return!1}return!0}}function Lw(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Jp(e)));let n=null,i=null;if(ye.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Iw(c,t)&&(n=r,i=l)}),!n)return null;la(i,n);const s=cm(t),o=n.ids.map(r=>nt.get(r)).filter(r=>r&&s(r)),a=t.limit;return{rows:o,complete:!(typeof a=="number"&&n.ids.length>=a)}}function Tw(){nt.clear(),ye.clear(),$t.clear(),Qt=null}yt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Tw();return}if(e!=="issues"||Qt===null||!ye.has(Qt)||B()!=="issues")return;const i=ye.get(Qt);im(Qt,ie(),i.meta)});let Zt=0,ui=!1,Ts=null,ua=null,As=0;const On=new Map;function pa(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Zt===0&&!ui),e.textContent=ui?"Stopped":"Offline",e.title=ui?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ve(e,t){return On.has(e)||On.set(e,new Set),On.get(e).add(t),()=>{var n;return(n=On.get(e))==null?void 0:n.delete(t)}}function Aw(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const Cw=1e3;function ma(){ua&&(clearTimeout(ua),ua=null)}const Bw="chaotic",Gl=4001,Dw=4003,Mw="chaotic.bearer.";function jw(e){return[Bw,Mw+e]}function dm(e,{isReconnect:t=!1}={}){Ts&&(clearTimeout(Ts),Ts=null),ma();const n=ky();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),xl(null)),!t&&(Zt>0||ui)&&(Zt=0,ui=!1,pa());const i=h.getToken();if(!i)return;const s=++As,a=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(a,jw(i));xl(r);let l=!1;const c=()=>{if(l||s!==As)return;l=!0,ma();const d=Zt>0;d&&k("Live updates reconnected","success"),Zt=0,pa(),d&&zl({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===As&&(console.log("WebSocket connected"),ma(),ua=setTimeout(c,Cw))},r.onmessage=d=>{if(s!==As)return;c();let p;try{p=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}zl(p)},r.onclose=d=>{if(s!==As)return;console.log("WebSocket disconnected"),ma();const p=d==null?void 0:d.code;if(p===Gl||p===Dw){xl(null),Zt=0;const g=p===Gl&&gl()===i;ui=!g,pa();let b="forbidden";p===Gl&&(b=g?"unauthorized":"superseded"),zl({type:b,entity:"connection",data:{code:p,teamId:e}});return}Zt++,Zt===1&&k("Live updates disconnected. Reconnecting...","warning"),pa();const f=Aw(Zt-1);Ts=setTimeout(()=>{Ts=null,C()&&C().id===e&&dm(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function zl(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},o=On.get(`${n}:${t}`);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const a=On.get(n);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=On.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}yt(e=>{e==="currentProject"&&B()==="rituals"&&queueMicrotask(()=>um())});async function um(){const e=X();if(e){jn("projects"),await ia(e,{tab:"sprint-rituals",replace:!0,onlyIfView:"projects"});return}const t=document.getElementById("rituals-content");t&&(t.innerHTML=Y({icon:W.projects,heading:"Select a project",description:"Rituals live in each project's settings. Pick a project in the sidebar switcher, or press P."}))}async function Rw(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await Ps(),mc()}catch(n){_("approve ritual",n)}}function Vl(e){return e==="document"?`
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
        `:""}function Wl(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function pm(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Vl(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",o=>{Pw(o,e,t,i,s,n)}),G()}async function Pw(e,t,n,i="",s=null,o=""){e.preventDefault();const a=document.getElementById("gate-note").value,r=Wl(i);if(r===void 0)return!1;try{if(await h.completeGateRitual(t,n,a||null,r),k(o?`Signed off on ${o}.`:"Signed off.","success"),await Ps(),s)return F(),await s(),!1;const l=Bk();l&&!l.in_limbo?(F(),k("Limbo cleared! Next sprint is now active.","success")):mc()}catch(l){_("complete gate ritual",l)}return!1}function qw(e,t,n,i,s="",o=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${o?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${o?"required":""}></textarea>
            </div>
            ${Vl(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",a=>{Nw(a,e,t,s,o)}),G()}async function Nw(e,t,n,i="",s=!0){e.preventDefault();const o=document.getElementById("attest-ritual-note").value.trim();if(s&&!o)return k("A note is required for this attestation.","error"),!1;const a=Wl(i);if(a===void 0)return!1;try{await h.attestTicketRitual(t,n,o||null,a),k("Ritual attested!","success"),F(),await eo(n)}catch(r){_("attest ticket ritual",r)}return!1}async function Ow(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await eo(t)}catch(n){_("attest ticket ritual",n)}}async function Hw(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await eo(t)}catch(n){_("approve ticket ritual",n)}}function mm(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{Fw(s,e,t,n,i)}),G()}async function Fw(e,t,n,i,s=null){e.preventDefault();const o=document.getElementById("reject-ritual-note").value.trim();if(!o)return k("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,o),k(`"${i}" rejected. The attester has been told why.`,"success"),F(),s&&await s()}catch(a){_("reject ritual",a)}return!1}function fm(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Vl(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",o=>{Uw(o,e,t,i,s)}),G()}async function Uw(e,t,n,i="",s=null){e.preventDefault();const o=document.getElementById("ticket-ritual-note").value,a=Wl(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,o||null,a),k("Signed off.","success"),F(),s?await s():await eo(n)}catch(r){_("complete ticket ritual",r)}return!1}le({"approve-ticket-ritual":(e,t)=>{Hw(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{mm(t.ritualId,t.issueId,t.ritualName,()=>eo(t.issueId))},"complete-ticket-ritual":(e,t)=>{fm(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{qw(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{Ow(t.ritualId,t.issueId)}});function gm(e){const t=ut(e),n=document.createElement("template");return n.innerHTML=t,Gw(n.content,zw),n.innerHTML}function Gw(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(o){let a=o.parentElement;for(;a&&a!==e;){if(a.tagName==="CODE"||a.tagName==="PRE")return NodeFilter.FILTER_REJECT;a=a.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(o=>{t(o)})}function zw(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),o=i.test(t);if(!s&&!o)return;const a=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&a.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,a.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&a.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],a.appendChild(p),r=d.index+d[0].length}l&&(r<t.length&&a.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(a,e))}function pi(e){return e?gm(e):""}function Hn(e){return e?gm(e):""}const fa=new Map;function Kl(){var e;return`${((e=C())==null?void 0:e.id)??""}|${X()??""}`}function mi(e,t,n){fa.set(e,{key:t,value:n})}function ga(e,t){const n=fa.get(e);return n&&n.key===t?n.value:void 0}function Cs(e,...t){for(const n of t)n!==e&&fa.delete(n)}function Yl(){fa.clear()}function ha(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}yt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Yl(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Yl()});function Vw(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Ww(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const o of e){const a=o.user_id||o.id;i.has(a)||(i.add(a),s.push({id:a,name:o.user_name||o.name||o.user_email||o.email||"User",email:o.user_email||o.email||"",handle:Vw(o),isAgent:!1}))}for(const o of t)!o.mention_handle||o.is_active===!1||o.idle||i.has(o.id)||n!==void 0&&o.agent_project_id&&o.agent_project_id!==n||(i.add(o.id),s.push({id:o.id,name:o.name||"Agent",email:"",handle:o.mention_handle,isAgent:!0}));return s}function hm(e,t={},n=6){const i=(e||"").toLowerCase();return Ww(Et(),ft(),t).filter(s=>!i||s.handle.includes(i)||s.name.toLowerCase().includes(i)||s.email.toLowerCase().includes(i)).slice(0,n)}function Kw(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Ql(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let o=-1;const a=()=>{s.classList.add("hidden"),s.innerHTML="",o=-1},r=d=>{var f,g;const p=s.querySelectorAll(".mention-suggestion");p.length!==0&&(o=(d%p.length+p.length)%p.length,p.forEach((b,y)=>b.classList.toggle("highlighted",y===o)),(g=(f=p[o]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const p=i.selectionStart||0,f=i.value.slice(0,p).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(p);i.value=f+g,i.focus(),a()},c=()=>{if(i.hidden){a();return}const d=i.selectionStart||0;if(Kw(i.value,d)){a();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){a();return}const g=f[2].toLowerCase(),b=hm(g,i.mentionContext||{});if(!b.length){a();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${u(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,$)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const p=!s.classList.contains("hidden");if(d.key==="Escape"&&p){d.preventDefault(),d.stopPropagation(),a();return}if(p){if(d.key==="ArrowDown")d.preventDefault(),r(o+1);else if(d.key==="ArrowUp")d.preventDefault(),r(o-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[o];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(a,150)})}let Be=null,vm=!1,Fn=!1,bm="new-comment";function Yw(){return Be||(Be=document.createElement("div"),Be.className="quote-tooltip",Be.setAttribute("role","button"),Be.setAttribute("tabindex","0"),Be.setAttribute("aria-label","Quote selection in comment"),Be.textContent="Quote",Be.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),va())}),Be.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Be.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),va()}),document.body.appendChild(Be),Be)}function ym(e,t){const n=Yw();n.style.display="flex",Fn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Fn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Bs(){Be&&(Be.style.display="none"),Fn=!1}function Qw(){return Fn}function wm(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Zl(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=wm(t.startContainer),i=wm(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Zw(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function va(e=bm){const t=Zl();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Zw(t),s=n.value,o=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+o+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Bs(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Xw(){var i;if(!Zl())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return ym(n.left+n.width/2,n.top),!0}function Jw(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Zl()){Bs();return}ym(t,n)},10)}function km({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(bm=t,i.addEventListener("mouseup",Jw,n?{signal:n}:void 0),vm||(vm=!0,document.addEventListener("mousedown",s=>{Fn&&Be&&!Be.contains(s.target)&&Bs()}),document.addEventListener("selectionchange",()=>{Fn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Bs()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Fn&&(s.stopImmediatePropagation(),Bs())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Xw()})))}function $m(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let un=[],Ds=[],ba=null,me=new Set,fi="list",Un=!1,Xl=null,ya=null,Jl=null,ec=null,_m=null;function Em(e){if(_m!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const tc=Qb();(tc==="list"||tc==="grid")&&(fi=tc);function xm(e){if(e!=="list"&&e!=="grid")return;fi=e,e==="grid"&&Un&&nc(),Zb(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Xt()}function Sm(){if(fi!=="list")return;Un=!0,me.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Xt(),hi()}function nc(){Un=!1,me.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Xt(),hi()}function ek(){Xl&&clearTimeout(Xl),Xl=setTimeout(()=>{Xt()},300)}function Im(){const e=document.getElementById("doc-search");e&&(e.value=""),Xt()}async function tk(){Im()}function nk(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function ik(){return un}function Xt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";nk(),Ds=un.filter(o=>{var a,r;if(e){const l=(a=o.title)==null?void 0:a.toLowerCase().includes(e),c=(r=o.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Ds.sort((o,a)=>{switch(t){case"title_asc":return(o.title||"").localeCompare(a.title||"");case"title_desc":return(a.title||"").localeCompare(o.title||"");case"updated_asc":return new Date(o.updated_at)-new Date(a.updated_at);case"updated_desc":default:return new Date(a.updated_at)-new Date(o.updated_at)}}),ck("",fi)}let gi=0;async function sk(){var i;const e=ba||((i=C())==null?void 0:i.id);if(!e)return;const t=++gi,n=X()||null;try{const s=await h.getDocuments(e,n);if(t!==gi)return;mi("documents",`${e}|${n??""}`,s),un=s,Xt()}catch(s){if(t!==gi)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=Y({icon:W.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),_("load documents",s)}}yt(e=>{e==="currentProject"&&B()==="documents"&&sk()});async function Gn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=C())==null?void 0:r.id),!e)return;ba=e,bp(-1);const i=++gi;t===null&&(t=X()||null);const s=`${e}|${t??""}`,o=n?ga("documents",s):void 0,a=document.getElementById("documents-list");o?(un=o,Xt()):a&&(a.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==gi)return;mi("documents",s,l);const c=o&&ha(un,l);un=l;const d=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");d&&p&&(d.classList.toggle("active",fi==="list"),p.classList.toggle("active",fi==="grid")),c||Xt()}catch(l){if(i!==gi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=Y({icon:W.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),_("load documents",l)}}function Lm(){var t,n;if(B()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=ba||((n=C())==null?void 0:n.id);e&&Gn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Tm(e){Em(e)&&De(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function ok(e,t){Em(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function ak(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ae(t.color)}20; color: ${ae(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function rk(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ak(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u($m(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function lk(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ae(r.color)}20; color: ${ae(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?$m(e.content).substring(0,80):"No content",s=Un?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${me.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Un&&me.has(e.id)?" selected":""}" data-action="${Un?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
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
  `}function ck(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;me.clear(),hi();const i=Ds;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=X(),f=d||p;n.innerHTML=Y({icon:f?W.search:W.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?rk:lk,o=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${o}">${i.map(s).join("")}</div>`;return}const a={},r=oe();i.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");a[p]||(a[p]={label:f,docs:[]}),a[p].docs.push(d)});let l="";for(const[d,p]of Object.entries(a)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function dk(e){me.has(e)?me.delete(e):me.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=me.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",me.has(e)),hi()}function uk(){Ds.forEach(e=>me.add(e.id)),Ds.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),hi()}function Am(){me.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),me.clear(),hi()}function hi(){const e=document.getElementById("doc-bulk-actions");e&&(Un?(e.classList.remove("hidden"),me.size>0?e.innerHTML=`
        <span class="bulk-count">${me.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function pk(){if(me.size===0){k("No documents selected","error");return}const t=oe().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${me.size} Document${me.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${me.size} selected document${me.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,G()}async function mk(e){var a,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(me);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((a=un.find(d=>d.id===l))==null?void 0:a.title)||l)}F(),Am(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const o=(r=C())==null?void 0:r.id;return await Gn(o),!1}async function fk(){var o,a;if(me.size===0){k("No documents selected","error");return}const e=me.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(me);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((o=un.find(c=>c.id===r))==null?void 0:o.title)||r)}nc(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(a=C())==null?void 0:a.id;await Gn(s)}async function gk(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var o,a;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((a=(o=s.author_name)==null?void 0:o.charAt(0))==null?void 0:a.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${u(s.author_name||"Unknown")}</span>
                ${zo(s.author)}
                <span class="comment-date">${et(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${pi(s.content)}</div>
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
    `}}function hk(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=tp(e);s&&(i.value=s),i.addEventListener("input",()=>{Uo(e,i.value)},{signal:t}),i.addEventListener("keydown",o=>{var a;o.key==="Enter"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),(a=i.closest("form"))==null||a.requestSubmit())},{signal:t}),Ql("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function De(e,t=!0){try{t&&dn();const n=await h.getDocument(e);_m=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await gk(n);let o=null,a=null,r=!1;if(n.project_id){const D=oe().find(H=>H.id===n.project_id);if(o=D?D.name:null,n.sprint_id)try{const H=await h.getSprint(n.sprint_id);a=H?H.name:null}catch(H){console.error("Failed to load sprint name:",H),r=!0}}let l=n.content||"";const c=Q.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=ik(),p=d.findIndex(w=>w.id===n.id),f=p>0?d[p-1]:null,g=p>=0&&p<d.length-1?d[p+1]:null,b=p>=0,y=B()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(w=>`
          <span class="issue-label" style="background: ${ae(w.color)}20; color: ${ae(w.color)}">
            ${u(w.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(w.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let E='<span class="text-muted">None</span>';try{const w=await h.getDocumentIssues(n.id);w.length>0&&(E=w.map(D=>`
          <div class="linked-item">
            <span class="linked-item-id">${u(D.identifier)}</span>
            <span class="linked-item-title">${u(D.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(D.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(w){console.error("Failed to load linked issues:",w),E=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
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

          <div class="document-content markdown-body">${l?Hn(l):'<p class="text-muted">No content</p>'}</div>

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
              <span class="property-value-static">${u(n.author_name||"Unknown")} ${zo(n.author)}</span>
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
              ${E}
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
    `,ya&&ya.abort(),ya=new AbortController;const{signal:L}=ya,T=i.querySelector(".sidebar-overflow-trigger"),j=i.querySelector(".overflow-menu-dropdown");if(T&&j){const w=()=>{j.classList.add("hidden"),T.setAttribute("aria-expanded","false")},D=()=>{const H=j.classList.toggle("hidden");T.setAttribute("aria-expanded",String(!H))};T.addEventListener("click",D,{signal:L}),document.addEventListener("click",H=>{!T.contains(H.target)&&!j.contains(H.target)&&w()},{signal:L}),j.addEventListener("keydown",H=>{H.key==="Escape"&&(w(),T.focus())},{signal:L})}hk(n.id,L,n.project_id||null),km({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:L}),Jl=f?f.id:null,ec=g?g.id:null;const x=w=>{if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&va("new-doc-comment")){w.preventDefault();return}w.metaKey||w.ctrlKey||w.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(w.key==="ArrowLeft"&&Jl?(w.preventDefault(),De(Jl)):w.key==="ArrowRight"&&ec&&(w.preventDefault(),De(ec)))};document.addEventListener("keydown",x,{signal:L})}catch(n){_("load document",n)}}async function wa(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const o=await h.getSprints(t);let a=n;if(i&&!n){const l=o.find(c=>c.status==="active");l&&(a=l.id)}const r=o.map(l=>`<option value="${l.id}" ${l.id===a?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function ic(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function vk(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),o=document.getElementById(`${e}-preview`);if(!n||!i||!s||!o)return;const a=t==="preview";if(n.classList.toggle("active",!a),i.classList.toggle("active",a),s.style.display=a?"none":"block",o.style.display=a?"block":"none",a){const r=s.value.trim();o.innerHTML=r?Hn(r):'<span class="text-muted">Nothing to preview.</span>'}}function sc(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),o=document.getElementById(t.icon),a=op(e);if(a){const l=Wb(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(a.title&&i&&(i.value=a.title),a.content&&s&&(s.value=a.content),a.icon&&o&&(o.value=a.icon)):c?(i&&(i.value=a.title||""),s&&(s.value=a.content||""),o&&(o.value=a.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(o==null?void 0:o.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Go(e,null);return}Go(e,l,n)};[i,s,o].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Cm(){Ms=null;const e=oe(),t=Dp()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${ic("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),sc("new"),t&&await wa("doc-sprint",t,null,!0)}let Ms=null;async function bk(e,t,n){Ms=n||null;const s=oe().map(o=>`<option value="${m(o.id)}" ${o.id===t?"selected":""}>${u(o.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${ic("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),sc("new"),t&&await wa("doc-sprint",t,e)}async function yk(e){var o;e.preventDefault();const t=(o=C())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Go("new",null),await Gn(t),F(),k("Document created!","success"),Ms){const a=Ms;Ms=null,a()}}catch(a){_("create document",a)}return!1}let oc=null,js=null,ac=!1;async function Bm(e){try{const t=await h.getDocument(e);oc=e,js={title:t.title||"",content:t.content||""},ac=!1;const i=oe().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${ic("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,G(),sc(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await wa("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){_("load document",t)}}async function wk(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},o=document.getElementById("edit-doc-content-draft-warning");if(o&&oc===t&&js&&!ac){let a=null;try{a=await h.getDocument(t)}catch{}if(a&&((a.title||"")!==js.title||(a.content||"")!==js.content))return ac=!0,o.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',o.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),oc=null,js=null;const a=op(t);a&&a.title===s.title&&a.content===s.content&&(a.icon||"")===(s.icon||"")&&Go(t,null),F(),await De(t),k("Document updated!","success")}catch(a){_("update document",a)}return!1}async function kk(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=C())==null?void 0:t.id;await Gn(n),O("documents"),k("Document deleted!","success")}catch(n){_("delete document",n)}}function $k(e,t){wa(e,t)}async function _k(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,G()}async function Ek(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,o=await h.searchIssues(s,e);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(a=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(a.id)}">
        <span class="link-result-id">${u(a.identifier)}</span>
        <span class="link-result-title">${u(a.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function xk(e,t){try{await h.linkDocumentToIssue(e,t),F(),k("Issue linked!","success"),await De(e,!1)}catch(n){_("link issue",n)}}async function Sk(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await De(e,!1)}catch(n){_("unlink issue",n)}}let rc=!1;async function Ik(e,t){if(e.preventDefault(),rc)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;rc=!0;try{const s=await h.createDocumentComment(t,i);n.value="",k("Comment added!","success"),hs(s),await De(t,!1)}catch(s){_("add comment",s)}finally{rc=!1}return!1}async function Lk(e){var n;const t=(n=C())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,G();return}const s=i.map(o=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(o.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ae(o.color)}; color: white;">${u(o.name)}</span>
        ${o.description?`<span class="text-muted">${u(o.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,G()}catch(i){_("load labels",i)}}async function Tk(e,t){try{await h.addLabelToDocument(e,t),F(),k("Label added!","success"),await De(e,!1)}catch(n){_("add label",n)}}async function Ak(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await De(e,!1)}catch(n){_("remove label",n)}}le({"view-document":(e,t)=>{e.preventDefault(),De(t.documentId)},"set-doc-editor-mode":(e,t)=>{vk(t.target,t.mode)},"retry-load-documents":()=>{Gn(ba)},"retry-document-comments":(e,t)=>{De(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{dk(t.docId)},"clear-doc-search":()=>{Im()},"clear-all-doc-filters":()=>{tk()},"show-bulk-move-modal":()=>{pk()},"bulk-delete-documents":()=>{fk()},"select-all-docs":()=>{uk()},"clear-doc-selection":()=>{Am()},"exit-selection-mode":()=>{nc()},"enter-selection-mode":()=>{Sm()},"handle-bulk-move":e=>{mk(e)},"unlink-document-issue":(e,t)=>{Sk(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{_k(t.documentId)},"add-document-comment":(e,t)=>{Ik(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Ak(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Lk(t.documentId)},"show-edit-document-modal":(e,t)=>{Bm(t.documentId)},"delete-document":(e,t)=>{kk(t.documentId)},"create-document":e=>{yk(e)},"update-doc-sprint-dropdown":(e,t,n)=>{$k(t.sprintSelect,n.value)},"update-document":(e,t)=>{wk(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Ek(n.value,t.documentId)},"link-to-issue":(e,t)=>{xk(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Tk(t.documentId,t.labelId)}});let Dt=[],ka={},$a=new Set,Jt=null,lc=null,_a=[],Rs=[],cc=[];function Ea(){return ka}function Ck(){return lc}function Bk(){return Jt}yt(e=>{e==="currentProject"&&B()==="sprints"&&pn()});let dc=0;async function pn({fromMemory:e=!1}={}){wp(-1);const t=X();if(!t){const a=document.getElementById("sprints-list");a&&(a.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++dc;Kk();const i=document.getElementById("sprints-list"),s=Kl(),o=e?ga("sprints",s):void 0;o?(Dt=o,Dm()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,a]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=a.some(c=>c.status==="active")?a:await h.getSprints(t);if(n!==dc)return;const l=o&&ha(Dt,r);Dt=r,mi("sprints",s,r),l||Dm(),await Ps()}catch(a){return n!==dc?void 0:(i&&(i.innerHTML=Y({icon:W.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),_("load sprints",a),!1)}return!0}function Dm(){const e=document.getElementById("sprints-list");if(!e)return;const t=Dt.find(o=>o.status==="active"),n=Dt.find(o=>o.status==="planned"),i=Dt.filter(o=>o.status==="completed");let s="";if(t){const o=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",a=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Dk(t)}if(n){const o=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",a=(n.budget?`${n.budget} point budget`:"No budget set")+(o?` <span class="text-muted">· ${o}</span>`:"");s+=`
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
        `),e.innerHTML=s||Y({icon:W.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Mm(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${gc(e.activated_at)}, closed ${gc(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${gc(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Dk(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${u(Mm(e))||"not yet activated"}</span>
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
    `}let uc=0;async function vi(e,t=!0){var n;try{t&&dn();const i=++uc,s=B(),o=await h.getSprint(e);if(i!==uc)return;if(!o){k("Sprint not found","error"),O("sprints");return}lc=o;const a=(n=C())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),a?h.getDocuments(a,o.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==uc)return;_a=r,cc=l,Rs=c,B()===s&&Bt(_a),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),jk()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),O("sprints")}}async function Mk(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),O("sprints",!1);return}try{await vi(e,!1)}catch{O("sprints",!1)}}function jk(){const e=lc,t=_a;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=B()||"sprints",s=t.filter(g=>$s.includes(g.status)),o=t.filter(g=>g.status==="done"),a=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(o),d=a.length>0?`<div class="stat-note">${a.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${u(Mm(e))}
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
                ${s.length===0?Y({icon:W.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>pc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${o.length>0?"open":""}>
                <summary><h3>Completed Issues (${o.length})</h3></summary>
                ${o.length===0?Y({icon:W.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${o.map(g=>pc(g)).join("")}
                    </div>
                `}
            </details>

            ${a.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${a.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${a.map(g=>pc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Pk()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Rs.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Rs.length>0?`
                    <div class="sprint-issues-list">
                        ${Rs.map(g=>Rk(g)).join("")}
                    </div>
                `:Y({icon:W.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function pc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[..._p,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Zk(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Rk(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${et(e.created_at)}</span>
            </span>
        </div>
    `}function Pk(){const e=cc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${qk(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function qk(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Nk(e,t,n,i){const s=i?Cy(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function Ok(e,t,n){var p,f,g,b;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,o=s?parseInt(s):null,a=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=o!==l,d=Dt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const $=a==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!$&&(y.budget=o),Object.keys(y).length&&await h.updateSprint(t,y),a==="planned"){const L=Dt.filter(T=>T.status==="planned"&&T.id!==t);for(const T of L)await h.updateSprint(T.id,{budget:o})}a==="default"&&n&&await h.updateProject(n,{default_sprint_budget:o}),await pn(),F(),k(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(y){_("update budget",y)}return!1}const jm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Hk(e,t=null){const n=Dt.find(c=>c.id===e),i=n?oe().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${jm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let o;try{o=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){_("reset budget to project default",c),t&&(t.disabled=!1);try{await pn()}catch{}return}const a=(o==null?void 0:o.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await pn()!==!1}catch{l=!1}k(`'${a}' follows the project default budget again: ${s(o==null?void 0:o.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((o==null?void 0:o.budget)===null||(o==null?void 0:o.budget)===void 0)&&k(jm,"warning")}async function Fk(e){const t=Dt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,G();const n=$s;let i=0,s=!1,o=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),o=!0}const a=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${a}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${a}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function Uk(e){try{const t=await h.closeSprint(e);await pn(),qm(),t.limbo?zk(t):k("Sprint completed!","success")}catch(t){_("complete sprint",t)}}async function Ps(){const e=X();if(e)try{Jt=await h.getLimboStatus(e),Gk()}catch(t){console.error("Failed to load limbo status:",t)}}function Gk(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Jt||!Jt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Jt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function zk(e){const t=X();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,G(),Vk(t)}async function Vk(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${ut(i.prompt)}</div>
                    ${fc(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function mc(){var t,n;if(!Jt)return;const e=X();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Jt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${u(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${u(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${ut(i.prompt)}</div>
                        ${fc(i.attestation)}
                        ${Wk(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Jt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Jt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${fc(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,G()}function fc(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(et(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${ut(e.note)}</div>
        </div>
    `}function Wk(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Rm(e){for(const t of e)if(!$a.has(t))try{(await h.getSprints(t)).forEach(i=>{ka[i.id]=i}),$a.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Kk(){ka={},$a=new Set,_a=[],cc=[],Rs=[],xa={}}function Yk(e,t){t.forEach(n=>{ka[n.id]=n}),$a.add(e)}let xa={};function Qk(e){return xa[e]}function Pm(e,t){xa[e]=t??null}function qm(){xa={}}le({"retry-load-sprints":()=>pn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}vi(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Nk(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Hk(t.sprintId,n)},"show-limbo-details-modal":()=>{mc()},"show-close-sprint-confirmation":(e,t)=>{Fk(t.sprintId)},"handle-update-budget":(e,t)=>{Ok(e,t.sprintId,t.projectId)},"close-modal":()=>{F()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,F(),Uk(t.sprintId)},"dismiss-limbo-modal":()=>{F(),Ps()},"approve-ritual":(e,t)=>{Rw(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{pm(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}de(t.issueId)},"create-sprint-document":async(e,t)=>{await bk(t.sprintId,t.projectId,()=>{vi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}De(t.documentId)}});function gc(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Zk(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let Mt=[],hc=[],Sa=-1,vc=null;const Nm=5,Xk=new Set(["done","canceled"]),Om=new Set;function Jk(){return Sa}function e$(e){Sa=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;vc=(t==null?void 0:t.dataset.issueId)??null}const Hm=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Fm(e){const t=new Set(Hm.map(s=>s.status)),n=Hm.map(s=>({...s,issues:e.filter(o=>o.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}yt(e=>{e==="currentProject"&&B()==="my-issues"&&(bi(),qs(),yi())});function We(){return Mt}function zn(e){Mt=e}let bc=0;async function bi(){var o;const e=C(),t=pe();if(!e||!t)return;const n=++bc,i=(o=document.getElementById("my-issues-status-filter"))==null?void 0:o.value,s=X();n$();try{const a={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...a,project_id:s}):r=await h.getTeamIssues(e.id,a),n!==bc)return;Mt=Fm(r).flatMap(l=>l.issues),B()==="my-issues"&&Bt(Mt),Vn()}catch(a){if(n!==bc)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=Y({icon:W.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),_("load issues",a)}}async function yi({showLoading:e=!0}={}){const t=C();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=X();hc=await h.getTeamActivities(t.id,0,10,{projectId:i}),t$()}catch{n&&(n.innerHTML=Y({icon:W.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function t$(){const e=document.getElementById("dashboard-activity-list");if(e){if(!hc.length){e.innerHTML=Y({icon:W.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=hc.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=Jc(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${dg(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${td(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${et(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function n$(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Um(){bi()}function Vn(){var a,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Fm(Mt);Mt=t.flatMap(l=>l.issues),B()==="my-issues"&&Bt(Mt),Sa=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Mt.length?String(Mt.length):""),Mt.length===0){e.innerHTML=Y({icon:W.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(a=i.closest(".issue-row"))==null?void 0:a.dataset.issueId:null,o=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=Xk.has(l.status)&&!Om.has(l.status)&&l.issues.length>Nm,d=c?l.issues.slice(0,Nm):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(p=>Li(p)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(o?l.querySelector(`[data-dropdown-type="${o}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(vc){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===vc);c!==-1&&(l[c].classList.add("keyboard-selected"),Sa=c)}}let yc=0,Ia=[],Gm=null;async function qs(){var a;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++yc,n=X(),i=`${((a=C())==null?void 0:a.id)??""}:${n??""}`;i!==Gm&&(Gm=i,Ns=!1),Ia=[];const s=oe(),o=n?s.filter(r=>r.id===n):s;if(!o.length){e.innerHTML="";return}try{const r=o.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let p={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:p};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const b of g)p[b.status]=(p[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:p,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==yc)return;Ia=l,Qm(l,{single:!!n})}catch(r){if(t!==yc)return;console.error("Failed to load sprint status:",r),e.innerHTML=Y({icon:W.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const zm=5;let Ns=!1;const Vm=["done","in_review","in_progress","todo","backlog"];function La(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,o=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,a=e.limbo?"limbo":s?"arrears":n&&o>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:o,state:a}}function i$(e){const t=({sprint:n})=>{const i=La(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function s$(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function o$(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function a$(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const r$={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function Wm(e){return r$[e.state]||""}function Km(e){return`<span class="meter ${Wm(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function l$(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function Ym(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function c$({sprint:e,statusCounts:t,countsFailed:n}){const i=La(e),s=t||{},o=Object.values(s).reduce((d,p)=>d+p,0),a=s$(e),r=n?"Issue counts unavailable":o?`${o} issue${o===1?"":"s"}`:"No issues planned",l=[a?`Day ${a}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${Ym(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${a$(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${o$(i)}</span>
            ${i.hasBudget?Km(i):""}
            ${o?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${Vm.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/o*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${Vm.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Le(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function d$({project:e,sprint:t}){const n=La(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=l$(t,n),o=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${Ym(t)} title="${m(o)}">
                <span class="state-dot ${Wm(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?Km(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function Qm(e,{single:t=e.length===1&&!!X()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${c$(e[0])}
        `;return}const i=i$(e),s=i.filter(({sprint:d})=>d.limbo).length,o=i.filter(({sprint:d})=>!d.limbo&&La(d).overBudget).length,a=[o?`${o} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>zm,l=Ns?i:i.slice(0,zm),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${a?`<span class="sprint-attention">${a}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(d$).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${Ns}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}le({"filter-my-issues":()=>Um(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),oa(t.identifier)},"retry-load-my-issues":()=>bi(),"dash-show-all":(e,t)=>{Om.add(t.status),Vn()},"retry-load-sprint-status":()=>qs(),"dash-sprints-toggle":()=>{var e;Ia.length&&(Ns=!Ns,Qm(Ia,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const Zm=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Os(e=null){const t=e||X()||"";vf([]);const n=oe().map(a=>`
        <option value="${a.id}" ${a.id===t?"selected":""}>${u(a.name)}</option>
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
                        ${Xe("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${ht("no_priority")}
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
                                ${Zm.map(a=>`<option value="${a.id}">${a.label}</option>`).join("")}
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
    `,G(),Da();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),o=Kb();o.title&&(i.value=o.title),o.description&&(s.value=o.description),i.addEventListener("input",()=>{ap(i.value,s.value)}),s.addEventListener("input",()=>{ap(i.value,s.value)}),i.focus()}function u$(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function p$(e){const t=Zm.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Xm(e,t){const n=oe().find(i=>i.id===t);vf([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${Xe("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${ht("no_priority")}
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
    `,G(),Da(),document.getElementById("create-issue-title").focus()}async function m$(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,label_ids:hf(),parent_id:e});F(),k(`Created sub-issue ${d.identifier}`,"success"),de(e)}catch(d){_("create sub-issue",d)}}async function f$(e,t,n){var a,r;Vt();const s=(n||t.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown dropdown-positioning",o.style.top=`${s.top-8}px`,o.style.left=`${s.left}px`,o.style.transform="translateY(-100%)",o.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;o.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${_p.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Le(c))}">
                    ${Xe(c)}
                    <span>${Le(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;o.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Il.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(Te(c))}">
                    ${ht(c)}
                    <span>${Te(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;o.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(dt(c))}">
                    <span class="issue-type-badge type-${c}">${dt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!C())o.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=_l(),c=!1;if(l.length===0)try{l=await h.getLabels(C().id),ws(l)}catch(d){console.error("Failed to load labels:",d),c=!0}_c(o,{failed:c}),document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),bs(o,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=Is({keepId:l});o.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:p})=>{const f=mt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${Wt(d,"avatar-small")}
                    <span>${aa(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,d=li(c);o.innerHTML=`
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
                `}catch{o.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),bs(o)}function g$(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function h$(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,wl();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Xe(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${ht(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const o=document.getElementById("create-issue-type-btn");o&&(o.innerHTML=`<span class="issue-type-badge type-${t}">${dt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Vt(),s==null||s.focus()}async function Jm({keepOpen:e=!1}={}){var y,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,p=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const E=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,sprint_id:d,label_ids:hf(),due_date:f});k(`Created ${E.identifier}`,"success"),Yb(),B()==="issues"?Rt():B()==="my-issues"&&bi(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",cy(),document.getElementById("create-issue-title").focus()):(F(),de(E.id))}catch(E){_("create issue",E)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function v$(){await Jm({keepOpen:!1})}async function b$(){await Jm({keepOpen:!0})}le({"toggle-create-dropdown":(e,t,n)=>{f$(t.dropdownType,e,n)},"set-create-field":(e,t)=>{h$(t.field,t.value,t.label)},"create-issue-submit":()=>{v$()},"create-issue-and-new":()=>{b$()},"update-create-project":()=>{g$()},"apply-template":e=>{p$(e.target.value)},"toggle-create-options":()=>{u$()},"create-sub-issue-submit":(e,t)=>{m$(t.parentId,t.projectId)}});function Hs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(y$(n,e.project_id),t=!0),t}function y$(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,G())}async function w$(e,t){try{const n=await h.updateIssue(e,{status:"done"});F(),k(`${t} closed`,"success"),Hs(n)}catch(n){_(`close ${t}`,n)}}le({"parent-prompt-dismiss":()=>F(),"parent-prompt-close":(e,t)=>w$(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{F(),Xm(t.parentId,t.projectId)}});function mn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Kn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Yn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ta(){const e=document.getElementById("group-by-select");return e?e.value:""}const ef=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],wc=["done","canceled"],k$=$s,$$="all";function tf(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function wi(e=mn()){return e.length===0?"all":tf(e,$s)?"open":tf(e,wc)?"closed":null}function nf(e){var t,n,i;switch(e){case"status":{const s=wi();return s==="all"?0:s?1:mn().length}case"priority":return Wn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Kn().length;case"exclude_labels":return Yn().length;default:return 0}}function kc(){let e=0;return ef.forEach(t=>{e+=nf(t.key)}),e}function sf(){var b,y,$,E,L,T;const e=new URLSearchParams,t=mn(),n=Wn(),i=Kn(),s=Yn(),o=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,a=X()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,c=(E=document.getElementById("group-by-select"))==null?void 0:E.value,d=(L=document.getElementById("sort-by-select"))==null?void 0:L.value,p=wi(t);p==="all"?e.append("status",$$):p!=="open"&&t.forEach(j=>e.append("status",j)),n.forEach(j=>e.append("priority",j)),i.forEach(j=>e.append("label",j)),s.forEach(j=>e.append("exclude_label",j)),o&&e.set("assignee",o),a&&e.set("project",a),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),Vb((T=C())==null?void 0:T.id,f)}function _$(e){var $;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(E=>t.has(E))){const E=zb(($=C())==null?void 0:$.id);if(E){t=new URLSearchParams(E);const L=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",L)}}const s=t.getAll("status"),o=document.getElementById("status-filter-dropdown");if(o&&(s.length>0||!o.dataset.statusApplied)){const E=s.length>0?s:k$;o.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=E.includes(T.value)}),o.dataset.statusApplied="true",of()}const a=t.getAll("priority");if(a.length>0){const E=document.getElementById("priority-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=a.includes(T.value)}),af())}const r=t.get("assignee");r&&iw(r);const l=t.get("project"),c=oe();l&&(!c.length||c.some(E=>E.id===l))&&(e(!0),wt(l),e(!1));const d=t.get("sprint");if(d){const E=document.getElementById("sprint-filter");E&&(E.value=d)}const p=t.get("issue_type");if(p){const E=document.getElementById("issue-type-filter");E&&(E.value=p)}const f=t.getAll("label");if(f.length>0){const E=document.getElementById("label-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=f.includes(T.value)}),Aa())}const g=t.getAll("exclude_label");if(g.length>0){const E=document.getElementById("exclude-label-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(T=>{T.checked=g.includes(T.value)}),Ca())}const b=t.get("groupBy");if(b){const E=document.getElementById("group-by-select");E&&(E.value=b)}const y=t.get("sort");if(y){const E=document.getElementById("sort-by-select");E&&(E.value=y)}}function of(){const e=mn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=wi(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Le(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function af(){const e=Wn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Te(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Aa(){var i,s;const e=Kn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=a}else n.textContent=`${e.length} Labels`}function Ca(){var i,s;const e=Yn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${a}`}else n.textContent=`Excl: ${e.length} Labels`}async function rf(){if(!C())return;let e;try{e=await h.getLabels(C().id)}catch(t){console.error("Failed to load labels for filter:",t);return}lf("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),lf("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function lf(e,t,n,i){const s=document.getElementById(e);if(!s)return;const o=s.querySelector(".multi-select-options");o.innerHTML="",t.length===0?o.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ae(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,o.appendChild(l)});const a=document.createElement("div");a.className="multi-select-actions",a.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,o.appendChild(a)}const E$={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},cf=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function x$(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const df={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function S$(e,t=[],n=[],{formatEstimate:i=null}={}){const s=a=>a.estimate==null?"":` · ${u(i?i(a.estimate,a.project_id||e.project_id):`${a.estimate} pts`)}`,o=[...(t||[]).map(a=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${Xe(a.status)}</span>
                    ${cf(a.id,a.identifier,a.title)}
                    <span class="related-kind">Sub-issue${s(a)}</span>
                </li>`})),...(n||[]).map(a=>{const r=x$(a);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${Xe(a.related_issue_status)}</span>
                    ${cf(a.related_issue_id,a.related_issue_identifier,a.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(a.id)}" title="Remove link" aria-label="Remove link to ${m(a.related_issue_identifier)}">${E$.remove}</button>
                </li>`}})].sort((a,r)=>df[a.kind]-df[r.kind]);return`
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
            ${o.length?`<ul class="related-list">${o.map(a=>a.html).join("")}</ul>`:""}
        </section>`}const I$=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function L$(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${I$(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(et(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${pi(e.content).trim()}</div>
            </div>
        </li>`}const uf=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${pi(t).trim()}</div></details>`;function T$(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let o,a="",r="";return e.activity_type==="ritual_attested"?(o=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?a=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(a=" · waiting for review"),e.new_value&&(r=uf("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(o=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=uf("Reason",e.new_value,!0))):o=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${o}</span>${a}
                <span class="timeline-meta">· ${u(n(e))} · ${u(et(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function A$(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function C$({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:o=!1,issueId:a},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...A$(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:L$(g)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:T$(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i})}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${o?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(a)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${p.map(g=>g.html).join("")}</ol>`:o?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function pf(e,t,{formatEstimate:n=null}={}){const i=[`${Xe(e.status)}<span>${u(Le(e.status))}</span>`,u(t||"Unassigned"),u(Te(e.priority)),u(dt(e.issue_type))];return e.estimate!=null&&i.push(u(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const mf=Sl,B$=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let jt=[],ff=Promise.resolve();const D$={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Ba(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const M$={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function gf(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let o;return n==="first"?o=i[0]:n==="last"?o=i[i.length-1]:n===1?o=i[s<0?0:Math.min(i.length-1,s+1)]:o=i[s<0?i.length-1:Math.max(0,s-1)],o&&o.focus(),!0}function ki(){return!!document.querySelector(".inline-dropdown")}function hf(){return jt}function vf(e){jt=e}async function $c(e,t,n,i){var p,f,g,b;e.preventDefault(),Vt();const o=(i||e.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${mf.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${Xe(y)}
                    <span>${Le(y)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Il.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${ht(y)}
                    <span>${Te(y)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${B$.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${dt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=_e(),$=ie().find(L=>L.id===n)||We().find(L=>L.id===n)||((y==null?void 0:y.id)===n?y:null),E=Is({keepId:($==null?void 0:$.assignee_id)||null});a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${E.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:E.map(({assignee:L,indent:T},j)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(L.id)}">
                    ${Wt(L,"avatar-small")}
                    <span>${aa(L,T)}</span>
                    ${j<9?`<span class="dropdown-shortcut">${j+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(y==null?void 0:y.dataset.projectId)||((p=_e())==null?void 0:p.project_id),E=li($);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${E.map((L,T)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${L.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${L.label}</span>
                    ${T<9?`<span class="dropdown-shortcut">${T}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=ie(),$=We(),E=_e(),L=y.find(S=>S.id===n)||$.find(S=>S.id===n)||E,T=new Set(((L==null?void 0:L.labels)||[]).map(S=>S.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const j=a.getBoundingClientRect();let x=o.bottom+4,w=o.left;w+j.width>window.innerWidth-8&&(w=o.right-j.width),x+j.height>window.innerHeight-8&&(x=o.top-j.height-4),a.style.top=`${x}px`,a.style.left=`${Math.max(8,w)}px`,bs(a,{multiSelect:!0});let D=[];const H=C();if(H)try{D=await h.getLabels(H.id)}catch(S){console.error("Failed to load labels:",S)}if(!a.parentNode)return;yf(a,n,D,T);const te=a.getBoundingClientRect();let se=o.bottom+4,ne=o.left;ne+te.width>window.innerWidth-8&&(ne=o.right-te.width),se+te.height>window.innerHeight-8&&(se=o.top-te.height-4),a.style.top=`${se}px`,a.style.left=`${Math.max(8,ne)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=ie(),$=We(),E=_e(),L=y.find(M=>M.id===n)||$.find(M=>M.id===n)||E,T=(L==null?void 0:L.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const j=a.getBoundingClientRect();let x=o.bottom+4,w=o.left;w+j.width>window.innerWidth-8&&(w=o.right-j.width),x+j.height>window.innerHeight-8&&(x=o.top-j.height-4),a.style.top=`${x}px`,a.style.left=`${Math.max(8,w)}px`,bs(a);let D=[];if(T)try{D=await h.getSprints(T),Yk(T,D)}catch(M){console.error("Failed to load sprints:",M)}if(!a.parentNode)return;const H=D.filter(M=>M.status!=="completed"||M.id===(L==null?void 0:L.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${H.map((M,P)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(M.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(M.name)}${M.status==="active"?" (Active)":""}</span>
                    ${P<9?`<span class="dropdown-shortcut">${P+1}</span>`:""}
                </button>
            `).join("")}
        `;const te=a.getBoundingClientRect();let se=o.bottom+4,ne=o.left;ne+te.width>window.innerWidth-8&&(ne=o.right-te.width),se+te.height>window.innerHeight-8&&(se=o.top-te.height-4),a.style.top=`${se}px`,a.style.left=`${Math.max(8,ne)}px`,a.classList.remove("dropdown-positioning");const S=M=>{const P=M.key;if(P==="Escape"||P==="Tab"){Vt(),document.removeEventListener("keydown",S),vs(null);return}if(gf(M,a))return;const Z=parseInt(P);if(isNaN(Z))return;const he=a.querySelectorAll(".dropdown-option");let Me=!1;Z===0?($i(n,"sprint_id",null),Me=!0):Z>=1&&Z<he.length&&(he[Z].click(),Me=!0),Me&&(document.removeEventListener("keydown",S),vs(null))};vs(S),document.addEventListener("keydown",S),(g=a.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const r=a.getBoundingClientRect();let l=o.bottom+4,c=o.left;c+r.width>window.innerWidth-8&&(c=o.right-r.width),l+r.height>window.innerHeight-8&&(l=o.top-r.height-4),a.style.top=`${l}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const d=y=>{const $=y.key;if($==="Escape"||$==="Tab"){Vt(),document.removeEventListener("keydown",d);return}if(gf(y,a))return;const E=parseInt($);if(isNaN(E))return;let L=!1;if(t==="status"&&E>=1&&E<=6)$i(n,"status",mf[E-1]),L=!0;else if(t==="priority"&&E>=0&&E<=4)$i(n,"priority",Il[E]),L=!0;else if(t==="estimate"){const T=_e(),j=li(T==null?void 0:T.project_id);E>=0&&E<j.length&&($i(n,"estimate",j[E].value),L=!0)}L&&(document.removeEventListener("keydown",d),vs(null))};vs(d),document.addEventListener("keydown",d),(b=a.querySelector(".dropdown-option[data-action]"))==null||b.focus(),bs(a)}function j$(e,t,n,i){$c(e,t,n,i)}function R$(e,t,n){ff=ff.then(()=>bf(e,t,n))}async function bf(e,t,n){const i=ie(),s=We(),o=_e(),a=i.find(d=>d.id===e)||s.find(d=>d.id===e)||o;if(!a)return;const r=(a.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),p=d.labels||[],f=L=>({...L,labels:p,updated_at:d.updated_at??L.updated_at}),g=ie();g.some(L=>L.id===e)&&tt(g.map(L=>L.id===e?f(L):L));const b=We();b.some(L=>L.id===e)&&zn(b.map(L=>L.id===e?f(L):L));const y=_e();(y==null?void 0:y.id)===e&&ri(f(y));const $=Ba(e);if($&&$.parentNode){const L=ie().find(T=>T.id===e)||We().find(T=>T.id===e);L&&($.outerHTML=Li(L))}const E=document.querySelector(".property-labels-btn");E&&(E.innerHTML=p.length>0?p.map(L=>`
                    <span class="issue-label" style="background: ${ae(L.color)}20; color: ${ae(L.color)}">${u(L.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(_("update labels",d),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function yf(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}async function wf(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=C();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const o=await h.createLabel(i.id,{name:s}),a=await h.getLabels(i.id);ws(a),o!=null&&o.id&&await bf(e,o.id,null);const r=ie(),l=We(),c=_e(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&yf(t,e,a,p),n.value=""}catch(o){_("create label",o)}finally{n.disabled=!1,n.focus()}}}function Da(){const e=document.getElementById("create-issue-labels-label");e&&(jt.length===0?e.textContent="Labels":e.textContent=`Labels (${jt.length})`)}function _c(e,{failed:t=!1}={}){const n=_l();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=jt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${ae(i.color)}20; color: ${ae(i.color)}">${u(i.name)}</span>
                </button>
            `}).join("")}
    `}function P$(e){const t=jt.indexOf(e);t>=0?jt.splice(t,1):jt.push(e),wl(),Da();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&_c(n)}async function kf(){const e=C();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),o=await h.getLabels(e.id);ws(o),s!=null&&s.id&&!jt.includes(s.id)&&(jt.push(s.id),wl()),Da(),t&&_c(t),n.value=""}catch(s){_("create label",s)}finally{n.disabled=!1,n.focus()}}}async function $i(e,t,n){var r;Vt();const i=H$(e,t,n),s=G$(e,t),o=(r=Hl(e))==null?void 0:r[t],a=_f(e,t,()=>n);a&&Ec(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Hs(c),$f(e,t,i)){const d={...c,...U$(e,t)};z$(e,{issue:d,myIssue:d,detail:d}),ca(d),Ec(e,t,{focus:!a})}}catch(l){if(_("update issue",l),$f(e,t,i)){_f(e,t,(d,p)=>d[t]===n?s[p]:d[t]);const c=Hl(e);c&&c[t]===n&&ca({...c,[t]:o}),Ec(e,t,{focus:!1})}return}finally{F$(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=X();if(l){const d=(await h.getSprints(l)).find(p=>p.status==="active");xc(d||null)}}catch{}}const q$=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),fn=new Map;function N$(e){const t=e&&fn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let O$=0;function H$(e,t,n){const i=++O$;return fn.has(e)||fn.set(e,new Map),fn.get(e).set(t,{seq:i,value:n}),i}function $f(e,t,n){var i,s;return((s=(i=fn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function F$(e,t,n){var s;const i=fn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&fn.delete(e))}function U$(e,t){var i;const n={};return(i=fn.get(e))==null||i.forEach((s,o)=>{o!==t&&(n[o]=s.value)}),n}function G$(e,t){var i,s;const n=_e();return{issue:(i=ie().find(o=>o.id===e))==null?void 0:i[t],myIssue:(s=We().find(o=>o.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function _f(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const o=ie();o.some(l=>l.id===e)&&(s=!0,tt(o.map(l=>l.id===e?i(l,"issue"):l)));const a=We();a.some(l=>l.id===e)&&(s=!0,zn(a.map(l=>l.id===e?i(l,"myIssue"):l)));const r=_e();return(r==null?void 0:r.id)===e&&(s=!0,ri(i(r,"detail"))),s}function z$(e,t){var s;const n=ie();t.issue&&n.some(o=>o.id===e)&&tt(n.map(o=>o.id===e?t.issue:o));const i=We();t.myIssue&&i.some(o=>o.id===e)&&zn(i.map(o=>o.id===e?t.myIssue:o)),t.detail&&((s=_e())==null?void 0:s.id)===e&&ri(t.detail)}function V$(e){return e==="estimate"||D$[Ta()]===e}function W$(e,t,n,{focus:i}){var d;const s=Ba(e);if(!s||!s.parentNode||!n)return;const o=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&V$(t)&&ie().some(p=>p.id===e))gt();else if(t==="status"&&s.closest("#my-issues-list"))Vn();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=Li(n),p&&((d=Ba(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!o)return;const r=Ba(e),l=M$[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Ec(e,t,{focus:n}){const i=ie().find(o=>o.id===e)||We().find(o=>o.id===e);i&&ca(i),W$(e,t,i,{focus:n});const s=_e();(s==null?void 0:s.id)===e&&q$.has(t)&&K$(t,s)}function K$(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?kt(t.assignee_id):null;i.outerHTML=pf(t,c?mt(c):null,{formatEstimate:cn})}const s=n.querySelector(".detail-sidebar");if(!s)return;let o=e;e==="assignee_id"&&(o="assignee"),e==="sprint_id"&&(o="sprint"),e==="issue_type"&&(o="type");const a=s.querySelectorAll(".property-row");let r=null;for(const c of a){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===o.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${Xe(t.status)}
            <span>${Le(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${ht(t.priority)}
            <span>${Te(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${dt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?kt(t.assignee_id):null,d=c?mt(c):null;l.innerHTML=d?`${Wt(c,"avatar-small")}<span>${u(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=$y(),d=t.sprint_id&&c?c.find(p=>p.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?u(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${cn(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}le({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?$i(t.issueId,i,n==="null"?null:Number(n)):$i(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),R$(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{wf(t.issueId)},"toggle-create-issue-label":(e,t)=>{P$(t.labelId)},"create-label-for-create-issue":()=>{kf()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),wf(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),kf())}});function Ma(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Ef)},0))}function Ef(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Ef))}function Y$(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",_i)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Ke(),it(hp()),setTimeout(()=>{document.addEventListener("click",_i)},0))}function Q$(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",_i)):(e.classList.remove("hidden"),o_(),setTimeout(()=>{document.addEventListener("click",_i)},0))}function _i(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),o=document.querySelector(".display-menu-container"),a=s&&i.includes(s),r=o&&i.includes(o);!a&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",_i))}function Ei(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",_i)}function Ke(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=X();e.innerHTML=ef.map(n=>{const i=nf(n.key),s=hp()===n.key,o=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${o?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function it(e){fy(e),Ke();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":X$(t);break;case"priority":J$(t);break;case"type":e_(t);break;case"assignee":t_(t);break;case"sprint":n_(t);break;case"labels":i_(t);break;case"exclude_labels":s_(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Z$(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Ke()}function X$(e){const t=mn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=wi(t);let s=`
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
        `}),e.innerHTML=s}function J$(e){const t=Wn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function e_(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(o.value)}">
                <input type="radio" name="type-filter-radio" value="${o.value}" ${n===o.value?"checked":""}>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=s}function t_(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;Is({keepId:n||null}).forEach(({assignee:s,indent:o})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${aa(s,o)}</span>
            </label>
        `}),e.innerHTML=i}function n_(e){if(!X()){e.innerHTML=`
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
        `}),e.innerHTML=o}function i_(e){const t=Kn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function s_(e){const t=Yn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function o_(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",o=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],a=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ye(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=mn();if(n.length>0){const d=wi(n),p=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Le(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Wn();if(i.length>0){const d=i.map(p=>Te(p)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;o.value==="me"?d="Me":o.value==="unassigned"?d="Unassigned":d=mt(kt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const a=document.getElementById("sprint-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||a.value,clearAction:"clear-sprint-filter"})}const r=Kn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Yn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${u(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Qe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=kc();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function xf(){const e=document.getElementById("sprint-filter");if(!e)return;const t=X(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",xc(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),o=s.find(a=>a.status==="active");o&&(i+=`<option value="current">Current Sprint (${u(o.name)})</option>`),Pm(t,o==null?void 0:o.id),xc(o||null),s.forEach(a=>{const r=a.status==="active"?" (Active)":a.status==="completed"?" (Done)":"";i+=`<option value="${a.id}">${u(a.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function xc(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,o=n>i,a=s>=80&&!o,r=o?"budget-over":a?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",o),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${o?'<span class="arrears-badge">In Arrears</span>':""}
    `}function a_(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Sf=!1;yt(e=>{if(e!=="currentProject"||B()!=="issues"||Sf)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([xf(),rf()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Aa(),Ca(),rt(),Ye(),Qe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),rt(),Ye(),Qe()})});function r_(){_$(e=>{Sf=e})}function ja(){of(),rt(),Ye(),Qe()}function Ra(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ja()}function Sc(){af(),rt(),Ye(),Qe()}function Ic(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Sc()}function Lc(){Aa(),rt(),Ye(),Qe()}function Pa(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Lc()}function Tc(){Ca(),rt(),Ye(),Qe()}function qa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Tc()}function l_(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function If(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,o,a;return(a=(o=(s=n==null?void 0:n.querySelector(`input[value="${l_(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:o.querySelector(".label-name"))==null?void 0:a.textContent}).filter(Boolean)}let Fs=0;function Us(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Lf(){var t,n,i,s,o,a;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=C())==null?void 0:t.id)||"",project:X()||"",status:[...mn()].sort(),priority:[...Wn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((a=(o=document.getElementById("issue-search"))==null?void 0:o.value)==null?void 0:a.trim())||""})}let gn=null;function c_(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function xi(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Tf(e,t){xi(!1),da(e),tt(t),B()==="issues"&&Bt(t),gt(),gn=e,Us(hw(e).hiddenClosed||0)}function d_(e,t,{loading:n}){da(null),tt(t),B()==="issues"&&Bt(t),gt(),xi(n),gn=e,Us(0)}function Af(){da(null),gn=null,xi(!1),a_(),Us(0)}function u_(){const e=document.getElementById("issues-list");Us(0),e!=null&&e.querySelector(".issue-row")?xi(!0):Af()}function p_(){const e=$w(Lf()),t=e?tm(e):null;return t?(Rn(-1),Tf(e,t),!0):(Af(),!1)}function m_(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),o=new Set(t.map(c=>c.id)),a=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!o.has(c.id)&&!(c._isOptimistic&&a.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const p=d&&nm(d.updated_at,c.updated_at)?d:c;l.push(N$(p))}return r.length?[...r,...l]:l}async function Rt(){var $,E,L,T,j,x,w;Rn(-1),c_();const e=++Fs;if(!C())return;const t=X()||"",n=mn(),i=Wn(),s=($=document.getElementById("assignee-filter"))==null?void 0:$.value,o=(L=(E=document.getElementById("issue-search"))==null?void 0:E.value)==null?void 0:L.trim();if(!t&&oe().length===0){gn=null,document.getElementById("issues-list").innerHTML=Y({icon:W.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const a=Lf(),r={limit:1e3},l=((T=document.getElementById("sort-by-select"))==null?void 0:T.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(j=pe())==null?void 0:j.id:r.assignee_id=s);const p=(x=document.getElementById("sprint-filter"))==null?void 0:x.value;if(p)if(p==="current"){if(t){const D=Qk(t);if(D!==void 0)D&&(r.sprint_id=D);else try{const te=(await h.getSprints(t)).find(se=>se.status==="active");Pm(t,te==null?void 0:te.id),te&&(r.sprint_id=te.id)}catch(H){console.error("Failed to resolve current sprint:",H)}}}else r.sprint_id=p;const f=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value;f&&(r.issue_type=f),o&&o.length>=1?r.search=o:r.fields="list";let g=!1,b=!1,y=null;try{const D=If(Kn(),"label-filter-dropdown");D.length>0&&(r.label=D,r.label_match="any");const H=If(Yn(),"exclude-label-filter-dropdown");H.length>0&&(r.exclude_label=H),t&&(r.project_id=t);const te=t||`team:${C().id}`;y=Jp({...r,scope:te});const se=tm(y);if(se)g=!0,gn===y&&kw()===y&&am(ie(),se)||Tf(y,se);else{const K=Lw({...r,scope:te});K&&(K.complete||K.rows.length>0)?(b=!0,d_(y,K.rows,{loading:!K.complete})):u_()}const ne=K=>t?h.getIssues(K):oe().length>0?h.getTeamIssues(C().id,K):Promise.resolve(void 0),S=r.search&&wi(n)==="open"?ne({...r,status:wc}).then(K=>Array.isArray(K)?K.length:0).catch(K=>(console.error("Failed to count closed search matches:",K),0)):Promise.resolve(0),M=new Set(ie().map(K=>K.id)),P=await ne(r);if(im(y,P),e!==Fs)return;sm(a,y);const Z=(g||b)&&gn===y,he=Z?m_(ie(),P,M,cm(r)):P,Me=Z&&am(ie(),he);da(y),tt(he),B()==="issues"&&Bt(Array.isArray(he)?he.filter(K=>!K._isOptimistic):he);const qe=[...new Set(he.map(K=>K.project_id).filter(Boolean))],An=Object.keys(Ea()).length;if(await Rm(qe),e!==Fs)return;const A=Object.keys(Ea()).length!==An;(!Me||A)&&gt(),gn=y,xi(!1);const U=await S;if(bw(y,{hiddenClosed:U}),e!==Fs)return;Us(U)}catch(D){if(e!==Fs)return;xi(!1);const H=(D==null?void 0:D.status)===403||(D==null?void 0:D.status)===404;if(g&&!H){_("refresh issues",D);return}H&&y&&yw(y),gn=null;const te=document.getElementById("issues-list");te&&(te.innerHTML=Y({icon:W.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),_("load issues",D)}}function f_(){clearTimeout(yy()),wy(setTimeout(()=>{Rt()},300))}function rt(){sf(),Rt()}async function Cf(){if(sf(),Ta()==="sprint"){const e=ie(),t=[...new Set(e.map(n=>n.project_id))];await Rm(t)}gt()}function g_(){Ye(),Qe()}function h_(e){const t=e==="open"?$s:e==="closed"?wc:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),ja(),Ke(),it("status")}function v_(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,ja()),Ke(),it("status")}function b_(){Ra(),Ke(),it("status"),Ye(),Qe()}function y_(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Sc()),Ke(),it("priority")}function w_(){Ic(),Ke(),it("priority"),Ye(),Qe()}function Bf(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,rt()),Ke(),it("type"),Ye(),Qe(),Ei()}function k_(){Bf("")}function Df(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,rt()),Ke(),it("assignee"),Ye(),Qe(),Ei()}function $_(){Df("")}function Mf(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,rt()),Ke(),it("sprint"),Ye(),Qe(),Ei()}function __(){Mf("")}function E_(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Lc()),Ke(),it("labels")}function x_(){Pa(),Ke(),it("labels"),Ye(),Qe()}function S_(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Tc()),Ke(),it("exclude_labels")}function I_(){qa(),Ke(),it("exclude_labels"),Ye(),Qe()}function L_(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Rt()),Ei()}function T_(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Cf()),Ei()}function A_(){Ra(),Ic();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Pa(),qa(),rt(),Ye(),Qe()}le({"update-label-filter":()=>Lc(),"clear-label-filter":()=>Pa(),"update-exclude-label-filter":()=>Tc(),"clear-exclude-label-filter":()=>qa(),"show-filter-category":(e,t)=>{var n,i;it(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Z$();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>b_(),"set-status-preset":(e,t)=>h_(t.value),"show-all-statuses":()=>Ra(),"toggle-status-option":(e,t)=>v_(t.filterValue,e),"clear-priority-filter-new":()=>w_(),"toggle-priority-option":(e,t)=>y_(t.filterValue,e),"set-type-filter":(e,t)=>Bf(t.value),"clear-type-filter":()=>k_(),"set-assignee-filter":(e,t)=>Df(t.value),"clear-assignee-filter":()=>$_(),"set-sprint-filter":(e,t)=>Mf(t.value),"clear-sprint-filter":()=>__(),"clear-label-filter-new":()=>x_(),"toggle-label-option":(e,t)=>E_(t.filterValue,e),"clear-exclude-label-filter-new":()=>I_(),"toggle-exclude-label-option":(e,t)=>S_(t.filterValue,e),"set-sort":(e,t)=>L_(t.value),"set-group-by":(e,t)=>T_(t.value),"clear-all-filters":()=>A_(),"retry-load-issues":()=>Rt()});const jf=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function hn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Si(e){const t=hn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const C_=60,B_=150;let Ze=[],Gs=1/0,vn=null,Na=null,zs=null;const Oa=new Map;let Ii=null,Ha=[],Vs=null;const Rf=e=>{var t;return`${((t=pe())==null?void 0:t.id)??""}|${e}`},D_=24;function M_(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(C_,Math.ceil((e+2*t)/D_))}function bn(e,t){if(e!==null&&(Ii!=null&&Ii.has(String(e))))return Ha.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Gs));return Gs-=n.length,n.length<t.length&&Ze.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Li(i)).join("")}function Pf(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function qf(){clearTimeout(vn),vn=null,Cc++,Ze=[],Na=null,Vs=null,zs=null}function Ac(e=1/0){if(Ze.length===0)return;const t=document.getElementById("issues-list");if(!t||!(zs!=null&&zs.isConnected)){qf();return}const n=new Map(ie().map(s=>[s.id,s]));let i=e;for(;Ze.length>0&&i>0;){const s=Ze[0],o=s.ids.slice(0,i),a=Pf(t,s.groupKey),r=o.map(l=>n.get(l)).filter(Boolean).map(l=>Li(l)).join("");a==null||a.insertAdjacentHTML("beforeend",r),i-=o.length,o.length===s.ids.length?Ze.shift():s.ids=s.ids.slice(o.length)}if(Vs){const s=Vs;Fa(t,s.issueId)&&(Vs=null,Uf(t,s))}if(Ze.length===0){clearTimeout(vn),vn=null;const s=Na;Na=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Nf(s)}}const j_=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{vn=setTimeout(e,0)}):vn=setTimeout(e,16);let Cc=0;function R_(){if(clearTimeout(vn),Ze.length===0)return;const e=++Cc;j_(function t(){e===Cc&&(Ac(B_),Ze.length>0&&(vn=setTimeout(t,0)))})}function gt(){var d,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=V_(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},o=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),qf(),Gs=M_();const a=ie();if(a.length===0){const f=(p=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:p.trim(),g=kc()>0,b=f&&f.length>=2;if(g||b){const y=kc(),$=[];b&&$.push(`search "${f}"`),g&&$.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=Y({icon:W.issues,heading:"No matching issues",description:`No issues match your ${$.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=Y({icon:W.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Rn(-1),Gs=1/0;return}const r=Ta();Ii=Oa.get(Rf(r))||null,Ha=[],r==="status"?P_(e,a):r==="priority"?q_(e,a):r==="type"?N_(e,a):r==="assignee"?O_(e,a):r==="sprint"?H_(e,a):e.innerHTML=Si(a)+bn(null,a),Gs=1/0,zs=e.firstElementChild,Ze.push(...Ha),Ha=[];const l=Ii;Ii=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&Hf(f,!0)}),o.forEach(([f,g])=>{f&&z_(f,e,g)})),i&&(Fa(e,i.issueId)?Uf(e,i):Ze.length>0&&(Vs=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Ze.length>0&&!c?Na=n:Nf(n),R_()}function Nf(e){const t=vp();if(t<0)return;const n=document.querySelectorAll(Yo);if(n.length===0){Rn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Rn(i),n[i].classList.add("keyboard-selected")}function P_(e,t){const n={};Sl.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Si(t);Sl.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Xe(s)}</span>
                    <span class="group-title">${Le(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${hn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function q_(e,t){const n={};$p.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Si(t);$p.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ht(s)}</span>
                    <span class="group-title">${Te(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${hn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function N_(e,t){const n={};jf.forEach(s=>n[s]=[]),t.forEach(s=>{const o=s.issue_type||"task";n[o]&&n[o].push(s)});let i=Si(t);jf.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${dt(s)}</span></span>
                    <span class="group-title">${dt(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${hn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function O_(e,t){const n={},i="__unassigned__";n[i]=[];const s=Is({includeIdle:!0});s.forEach(({assignee:a})=>{n[a.id]=[]}),t.forEach(a=>{a.assignee_id&&n[a.assignee_id]?n[a.assignee_id].push(a):n[i].push(a)});let o=Si(t);n[i].length>0&&(o+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${hn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:a})=>{const r=n[a.id];if(!r||r.length===0)return;const l=mt(a)||"Unknown",c=a.is_agent?a.parent_user_name?` (${a.parent_user_name})`:" (agent)":"";o+=`
            <div class="issue-group" data-group="${m(a.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(a.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Wt(a,"avatar-small")}</span>
                    <span class="group-title">${u(l)}${u(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${hn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(a.id,r)}
                </div>
            </div>
        `}),e.innerHTML=o}function H_(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const o={active:0,planned:1,completed:2},a=Ea();s.sort((l,c)=>{const d=a[l],p=a[c],f=d?o[d.status]??3:3,g=p?o[p.status]??3:3;return f-g});let r=Si(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=a[l],p=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${u(p)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${hn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(g,c)}
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
                    <span class="group-points">${hn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${bn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function Of(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Fa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function F_(e,t){const n=Pf(e,t);if(!n)return;const i=new Map(ie().map(s=>[s.id,s]));Ze=Ze.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const o=s.ids.map(a=>i.get(a)).filter(Boolean).map(a=>Li(a)).join("");return n.insertAdjacentHTML("beforeend",o),!1})}function Hf(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function U_(e,t){const n=Array.from(document.querySelectorAll(Yo)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(o=>t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(o)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Rn(s)}function Ff(e,t,n){Hf(t,n);const i=Rf(Ta());Oa.has(i)||Oa.set(i,new Set);const s=Oa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),F_(e,t.dataset.group)),U_(e,t)}function G_(e){const t=document.getElementById("issues-list"),n=t&&Of(t,e);n&&Ff(t,n,!n.classList.contains("collapsed"))}function z_(e,t=document.getElementById("issues-list"),n=void 0){var o;if(!e||!t)return;const i=Ze.find(a=>a.ids.includes(e)),s=i?i.groupKey===null?null:Of(t,i.groupKey):(o=Fa(t,e))==null?void 0:o.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||Ff(t,s,!1))}function V_(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Uf(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Fa(e,t);if(!s)return;const o=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");o==null||o.focus({preventScroll:!0})}function Gf(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),o=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(o)}`}function W_(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),o=Math.min(e.length,i+t.length+n),a=e.slice(s,o),r=Gf(a,t);return`${s>0?"…":""}${r}${o<e.length?"…":""}`}const K_=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Li(e){var f,g,b;const t=e.assignee_id?kt(e.assignee_id):null,n=t?mt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":K_.format(i),o=e.estimate!=null?cn(e.estimate,e.project_id):"",a=na(e.estimate,e.project_id),r=e.sprint_id?Ea()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),p=c&&!d?W_(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${Te(e.priority)}">
                    ${ht(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Le(e.status)}">
                    ${Xe(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${dt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${Gf(e.title,c)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
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
                    ${n?Wt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function ht(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Xe(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}le({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}G_(t.group)},"show-inline-dropdown":(e,t,n)=>{$c(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),de(t.issueId))}});const Ws=new Set(["image/png","image/jpeg","image/gif","image/webp"]),Bc={file:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',clip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',remove:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>'},Ks=new Map,yn=new Map;function Dc(e){for(const t of e||[])t&&fs.test(t.id)&&Ks.set(t.id,t)}function Ys(e){return String(e||"").split(";")[0].trim().toLowerCase()}function zf(e){let t=yn.get(e);return t||(t={promise:null,url:null,type:null},yn.set(e,t),t.promise=h.fetchAttachmentContent(e).then(n=>(t.type=Ys(n.type),yn.get(e)===t&&Ws.has(t.type)&&(t.url=URL.createObjectURL(n)),t)),t.promise.catch(()=>{yn.get(e)===t&&yn.delete(e)})),t.promise}function Y_(e){const t=yn.get(e);t!=null&&t.url&&URL.revokeObjectURL(t.url),yn.delete(e)}function Vf(){for(const e of[...yn.keys()])document.querySelector(`img[data-attachment-id="${e}"]`)||Y_(e)}function Q_(e){return`/api/attachments/${e}/content`}function Wf(e,t){const n=document.createElement("a");return n.className="attachment-link",n.href=Q_(e),n.setAttribute("data-action","open-attachment"),n.setAttribute("data-attachment-ref",e),t&&n.setAttribute("data-filename",t),n.innerHTML=Bc.clip,n.append(` ${t||"Download attachment"}`),n}function Z_(e,t){const n=document.createElement("span");n.className="attachment-unavailable";const i=(e==null?void 0:e.status)===410?"file no longer stored":(e==null?void 0:e.status)===404?"not found":"could not be loaded";return n.textContent=`${t||"Attachment"}: ${i}`,n}function Ua(e=document){var n;const t=e.querySelectorAll("img[data-attachment-id]:not([data-attachment-state])");for(const i of t){const s=i.getAttribute("data-attachment-id");if(!fs.test(s)){i.setAttribute("data-attachment-state","invalid");continue}const o=i.getAttribute("alt")||((n=Ks.get(s))==null?void 0:n.filename)||"",a=Ks.get(s);if(a&&!Ws.has(Ys(a.content_type))){i.replaceWith(Wf(s,a.filename||o));continue}i.setAttribute("data-attachment-state","loading"),zf(s).then(r=>{r.url?(i.src=r.url,i.setAttribute("data-attachment-state","loaded")):i.isConnected&&i.replaceWith(Wf(s,o))},r=>{i.setAttribute("data-attachment-state","failed"),i.isConnected&&!i.closest(".attachment-thumb")&&i.replaceWith(Z_(r,o))}).finally(jc)}}let Mc=!1;function jc(){Mc||(Mc=!0,queueMicrotask(()=>{Mc=!1,!(typeof document>"u")&&(Ua(document),Vf())}))}let Rc=null;function X_(){Rc||typeof MutationObserver>"u"||!document.body||(Rc=new MutationObserver(jc),Rc.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("auxclick",hE),jc())}async function Kf(e,t){try{const n=await h.fetchAttachmentContent(e),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t||"attachment",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}catch(n){_("download attachment",n)}}let wn=null;function J_(){wn==null||wn.disconnect(),wn=null;const e=document.getElementById("modal-overlay");!e||typeof MutationObserver>"u"||(wn=new MutationObserver(()=>{var t;e.classList.contains("hidden")&&(wn.disconnect(),wn=null,(t=document.querySelector("#modal-content .attachment-viewer"))==null||t.remove(),Vf())}),wn.observe(e,{attributes:!0,attributeFilter:["class"]}))}function eE(e,t){var n,i;document.getElementById("modal-title").textContent=t||"Attachment",document.getElementById("modal-content").innerHTML=`
        <figure class="attachment-viewer">
            <img data-attachment-id="${m(e)}" alt="${m(t||"")}">
            <figcaption class="attachment-viewer-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-action="download-attachment" data-attachment-id="${m(e)}" data-filename="${m(t||"")}">Download</button>
            </figcaption>
        </figure>`,(n=document.querySelector(".modal"))==null||n.classList.add("modal-wide"),G(),J_(),(i=document.querySelector("#modal-content .attachment-viewer-actions button"))==null||i.focus(),Ua(document.getElementById("modal-content"))}async function tE(e,{filename:t="",contentType:n=""}={}){if(!fs.test(e||""))return;const i=Ks.get(e),s=t||(i==null?void 0:i.filename)||"";let o=Ys(n||(i==null?void 0:i.content_type));if(!o)try{o=(await zf(e)).type}catch(a){_("open attachment",a);return}Ws.has(o)?eE(e,s):Kf(e,s)}let ee=null;function Pc(e){const t=Number(e)||0;return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(t<10*1024?1:0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function nE(e,{userId:t,isAdmin:n}){return n!==!1||!!t&&e.uploader_id===t}function iE(e,t){const n=Ws.has(Ys(e.content_type)),i=e.filename||"attachment",s=[Pc(e.size),e.uploader_name||"Unknown",et(e.created_at)].filter(Boolean).map(u).join(" · ");return`
        <li class="attachment-item">
            <button type="button" class="attachment-open" data-action="open-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" data-content-type="${m(e.content_type||"")}" title="${n?"View":"Download"} ${m(i)}">
                <span class="attachment-thumb">${n?`<img data-attachment-id="${m(e.id)}" alt="">`:Bc.file}</span>
                <span class="attachment-name">${u(i)}</span>
                <span class="attachment-meta">${s}</span>
            </button>
            ${nE(e,t)?`<button type="button" class="attachment-delete" data-action="delete-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" title="Delete" aria-label="Delete ${m(i)}">${Bc.remove}</button>`:""}
        </li>`}const Yf=10*1024*1024,sE=/^(image\/|video\/|audio\/|font\/)|^application\/(zip|gzip|x-gzip|x-tar|x-7z-compressed|x-rar-compressed|vnd\.rar|x-bzip2|x-xz|java-archive|vnd\.android\.package-archive|x-msdownload|wasm)$/,oE=2*1024*1024;function aE(e){const t=(e==null?void 0:e.name)||"file",n=Ys(e==null?void 0:e.type);return!e||e.size===0&&!n?`${t} is empty or a folder`:e.size>Yf?`${t} is ${Pc(e.size)}; the limit is ${Pc(Yf)}`:n&&!Ws.has(n)&&sE.test(n)?`${t} can't be attached: only PNG, JPEG, GIF, WebP, PDF or plain text`:null}const rE="Drop files here, or use Add. PNG, JPEG, GIF, WebP, PDF or text, up to 10 MB.";function Qf(e,t){return e===null?'<p class="attachments-hint">Attachments could not be loaded.</p>':e.length?`<ul class="attachment-grid">${e.map(n=>iE(n,t)).join("")}</ul>`:`<p class="attachments-hint">${rE}</p>`}function lE(e,t,{userId:n=null,isAdmin:i=!1}={}){ee={issueId:e,attachments:t?[...t]:null,userId:n,isAdmin:i},Dc(t||[]);const s=(t==null?void 0:t.length)||0;return`
        <section class="attachments" id="issue-attachments" aria-label="Attachments" data-issue-id="${m(e)}">
            <div class="related-head">
                <h3 id="attachments-heading" tabindex="-1">Attachments <span class="section-count">${s||""}</span></h3>
                <label class="ticket-gate-text-btn attachments-add">
                    + Add
                    <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${m(e)}" aria-label="Attach files">
                </label>
            </div>
            <div class="attachments-status" role="status" aria-live="polite"></div>
            <div class="attachments-body">${Qf(ee.attachments,{userId:n,isAdmin:i})}</div>
        </section>`}function qc(e){const t=document.getElementById("issue-attachments");return t&&ee&&ee.issueId===e&&t.dataset.issueId===e?t:null}function Nc(e,t){var i;const n=(i=qc(e))==null?void 0:i.querySelector(".attachments-status");n&&(n.textContent=t)}function Zf(e){const t=qc(e);if(!t)return;const{attachments:n,userId:i,isAdmin:s}=ee;t.querySelector(".section-count").textContent=n!=null&&n.length?String(n.length):"";const o=t.querySelector(".attachments-body");o.innerHTML=Qf(n,{userId:i,isAdmin:s}),Ua(o)}function cE(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const dE=e=>new Promise(t=>setTimeout(t,e)),Xf={inFlightRetryMs:1e3,inFlightTries:3},Jf=e=>{var t;return((t=e==null?void 0:e.detail)==null?void 0:t.error_code)==="idempotency_in_flight"};async function uE(e,t){const n=cE(),i=()=>h.uploadAttachment(e,t,{idempotencyKey:n});try{return await i()}catch(s){if(!(s!=null&&s.isNetworkError)||t.size>oE)throw s}for(let s=1;;s++)try{return await i()}catch(o){if(!Jf(o)||s>=Xf.inFlightTries)throw o;await dE(Xf.inFlightRetryMs)}}async function pE(e){try{const t=await h.getAttachments(e);return Dc(t),(ee==null?void 0:ee.issueId)===e&&(ee.attachments=[...t]),t}catch{return null}}let eg=Promise.resolve();function tg(e,t){const n=[...t||[]],i=eg.then(()=>mE(e,n));return eg=i.catch(()=>0),i}async function mE(e,t){if(!t.length)return 0;let n=0,i=!1;for(const[s,o]of t.entries()){const a=aE(o);if(a){k(a,"error");continue}Nc(e,t.length>1?`Uploading ${o.name} (${s+1} of ${t.length})…`:`Uploading ${o.name}…`);try{const r=await uE(e,o);n+=1,Dc([r]),(ee==null?void 0:ee.issueId)===e&&ee.attachments&&(ee.attachments=[...ee.attachments.filter(l=>l.id!==r.id),r])}catch(r){r!=null&&r.isNetworkError||Jf(r)?(i=!0,k(`${o.name} may not have been attached; the list shows what was`,"error")):_(`attach ${o.name}`,r)}}return(ee==null?void 0:ee.issueId)===e&&(i||n&&ee.attachments===null)&&await pE(e),Zf(e),Nc(e,n?n===1?"1 file attached":`${n} files attached`:""),n&&k(n===1?"File attached":`${n} files attached`,"success"),n}async function fE(e,t){if(!fs.test(e||"")||!confirm(`Delete ${t||"this attachment"}? Comments that show it will show it as missing.`))return!1;try{await h.deleteAttachment(e)}catch(a){return _("delete attachment",a),!1}Ks.delete(e);const n=ee==null?void 0:ee.issueId,i=(ee==null?void 0:ee.attachments)||[],s=i.findIndex(a=>a.id===e);ee!=null&&ee.attachments&&(ee.attachments=i.filter(a=>a.id!==e)),Zf(n);const o=qc(n);if(o){const a=ee.attachments||[],r=a[Math.min(Math.max(s,0),a.length-1)],l=r?o.querySelector(`.attachment-open[data-attachment-id="${r.id}"]`):o.querySelector("#attachments-heading");l==null||l.focus(),Nc(n,`${t||"Attachment"} deleted`)}return k("Attachment deleted","success"),!0}function gE(e,t,n){if(!e)return;const i=r=>{var l;return Array.from(((l=r.dataTransfer)==null?void 0:l.types)||[]).includes("Files")},s=r=>{var l;return(l=document.getElementById("issue-attachments"))==null?void 0:l.classList.toggle("is-dragover",r)};e.addEventListener("dragover",r=>{i(r)&&(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="copy"),s(!0))},{signal:n}),e.addEventListener("dragleave",r=>{r.relatedTarget&&e.contains(r.relatedTarget)||s(!1)},{signal:n}),e.addEventListener("drop",r=>{i(r)&&(r.preventDefault(),s(!1),tg(t,r.dataTransfer.files))},{signal:n});const o=new AbortController;n==null||n.addEventListener("abort",()=>o.abort(),{once:!0});const a=()=>e.isConnected&&!e.closest(".hidden");for(const r of["dragover","drop"])document.addEventListener(r,l=>{var c,d;if(!a()){o.abort();return}!i(l)||l.defaultPrevented||e.contains(l.target)||(d=(c=l.target)==null?void 0:c.closest)!=null&&d.call(c,'input[type="file"]')||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="none"),r==="drop"&&s(!1))},{signal:o.signal})}const Oc=(e,t)=>e.type==="click"||e.type==="keydown"&&t.tagName!=="A"&&t.tagName!=="BUTTON";function ng(e){tE(e.dataset.attachmentId||e.dataset.attachmentRef,{filename:e.dataset.filename||e.getAttribute("alt")||"",contentType:e.dataset.contentType||""})}function hE(e){var n,i;if(e.button!==1)return;const t=(i=(n=e.target)==null?void 0:n.closest)==null?void 0:i.call(n,'[data-action="open-attachment"]');t&&(e.preventDefault(),ng(t))}le({"open-attachment":(e,t,n)=>{Oc(e,n)&&(e.preventDefault(),ng(n))},"download-attachment":(e,t,n)=>{Oc(e,n)&&Kf(t.attachmentId,t.filename)},"delete-attachment":(e,t,n)=>{Oc(e,n)&&fE(t.attachmentId,t.filename)},"pick-attachments":(e,t,n)=>{if(e.type!=="change")return;const i=[...n.files||[]];n.value="",tg(t.issueId,i)}});const Ti={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function kn(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function Qs(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Hc(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function Ga(e){return Qs(e)&&!!Hc(e)}function za(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],o=[];for(const a of n)((kn(a)||Qs(a)&&!Ga(a))&&t?s:o).push(a);return{needsYou:s,waiting:o,done:i,total:n.length+i.length}}function Fc(e,t,n){return e===1?t:n}function Zs(e){return kn(e)?"Review":Ga(e)?"Ask again for":Qs(e)?"Sign off on":Hc(e)?"Re-attest":"Attest"}function Uc(e,t){return kn(e)?"an admin":Qs(e)&&!Ga(e)?"a person":t||"the assignee"}function vE(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function ig(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${vE(t)}</span></div>`}function sg(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${Ti.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${Ti.link}Linked document</a>`}function og(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(et(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${ut(t.note)}</div>`:""}
            ${sg(t)}
        </div>`:""}function ag(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(et(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function Gc(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!kn(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${ag(t)}</div>`}const Ai=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function bE(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${Ai(e,t)}>Send back…</button>`;return kn(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${Ai(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${Ai(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function yE(e,t,n){return Ga(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${Ai(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":kn(e)||Qs(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${Ai(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${Ai(e,t)}>Attest it yourself</button>`}function rg(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(Zs(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function zc(e,t){const{needsYou:n,waiting:i,done:s,total:o}=e,a=(l,c,d,p)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(d)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var c;return a(Ti.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>a(Ti.ring,"you",l.name,"waiting on you")),...i.map(l=>a(Ti.ring,"",l.name,`waiting on ${Uc(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${o} ${Fc(o,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function wE(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=za(e,{canAct:t});return n[0]||i[0]||null}function kE(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:o}=za(e,{canAct:t});if(o===0)return"";const a=i[0]||s[0];return a?`Waiting on ${i.length?"you":Uc(a,n)}: ${Zs(a).toLowerCase()} ${a.name}.`:`All ${o} ${Fc(o,"ritual","rituals")} done.`}function $E(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=za(e,{canAct:n}),{needsYou:o,waiting:a,total:r}=s;if(r===0)return"";if(o.length===0&&a.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${Ti.check}</span>
                ${zc(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${Fc(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(o.length>0){const p=o[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${ig("you",p)}
                <h2 class="ticket-gate-step">${u(Zs(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${ut(p.prompt)}</div>`:""}
                ${og(p)}
                ${Gc(p)}
                <div class="ticket-gate-actions">${bE(p,t)}</div>
                ${rg([...o.slice(1),...a],"Then")}
                ${zc(s,i)}
            </section>`}const l=a[0],c=l.attestation?null:Hc(l),d=yE(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${ig(Uc(l,i),l)}
            <h2 class="ticket-gate-step">${u(Zs(l))} <b>${u(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${ag(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${ut(l.prompt)}</div>`:""}
            ${og(l)}
            ${Gc(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${rg(a.slice(1),"After that")}
            ${zc(s,i)}
        </section>`}function _E(e,{canAct:t=!1}={}){const{needsYou:n}=za(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(Zs(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}async function lg(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=li(t.project_id).map(a=>`
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
        `,G();const o=document.getElementById("edit-issue-description");if(o){const a=ms(e);if(a){const r=ip(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(o.value=a,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}o.addEventListener("input",()=>{const r=o.value;r!==(t.description||"")?Dn(e,r,t.description||""):Dn(e,null)})}}catch(t){_("load issue",t)}}async function EE(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),o=document.getElementById("edit-issue-priority"),a=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!o||!a)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:o.value,issue_type:a.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);ms(t)===c.description&&Dn(t,null),F(),await de(t),k("Issue updated!","success"),Hs(d)}catch(n){_("update issue",n)}}async function xE(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Rt(),await pt(),O("issues"),k("Issue deleted!","success")}catch(t){_("delete issue",t)}}le({"update-issue":(e,t)=>{EE(e,t.issueId)}});const SE=1,IE={bold:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',italic:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',code:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',bulletList:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',blockquote:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>'},LE=[["bold","Bold"],["italic","Italic"],["code","Code"],["link","Link"],["bulletList","Bulleted list"],["blockquote","Quote"]],TE="This comment uses markdown the editor would change, so it stays as markdown.";let Ci=null;function AE(){const e=document.querySelector('meta[name="chaotic-version"]'),t=e?e.getAttribute("data-editor"):"";return`/static/js/editor.bundle.js${!!t&&/^[0-9a-f]{8}$/.test(t)?`?v=${t}`:""}`}function Va(e){return e&&e.API_VERSION===SE?e:null}function CE(){const e=Va(window.ChaoticEditor);return e?Promise.resolve(e):Ci||(Ci=new Promise((t,n)=>{const i=document.createElement("script");i.src=AE(),i.async=!0,i.onload=()=>{const s=Va(window.ChaoticEditor);s?t(s):n(new Error("editor bundle is a different version"))},i.onerror=()=>{i.remove(),n(new Error("editor bundle failed to load"))},document.head.appendChild(i)}).then(t=>(Ci=null,t),t=>{throw Ci=null,t}),Ci)}const Bi=new Map;function BE(e,{signal:t,mentionContext:n={},placeholder:i="",restore:s=null}={}){const o=document.getElementById(e);if(!o||o.dataset.richComposer==="true")return null;o.dataset.richComposer="true";const a=o.closest("form"),r={textarea:o,form:a,editor:null,api:null,wrapper:null,toolbar:null,note:null,mode:"markdown",syncing:!1,composing:!1,pendingApi:null,destroyed:!1,mentionContext:n,placeholder:i||o.getAttribute("placeholder")||"",start:null};return Bi.set(e,r),DE(r,t),o.addEventListener("compositionstart",()=>{r.composing=!0},{signal:t}),o.addEventListener("compositionend",()=>{if(r.composing=!1,r.pendingApi){const l=r.pendingApi;r.pendingApi=null,Vc(r,l,{focus:document.activeElement===o})}},{signal:t}),r.start=({focus:l=!1,restoreTo:c=null}={})=>{if(r.editor||r.destroyed||Xb()==="markdown")return;const d=Va(window.ChaoticEditor);if(d){Vc(r,d,{focus:l,restore:c});return}CE().then(p=>{if(!(r.destroyed||r.editor||!p)){if(r.composing){r.pendingApi=p;return}Vc(r,p,{focus:l||document.activeElement===o})}}).catch(()=>{})},o.addEventListener("focus",()=>r.start(),{signal:t}),Kc(r,"markdown",{}),Va(window.ChaoticEditor)&&r.start({restoreTo:s}),a==null||a.addEventListener("focusin",()=>a.classList.add("composer-active"),{signal:t}),a==null||a.addEventListener("focusout",l=>{!a.contains(l.relatedTarget)&&!o.value&&a.classList.remove("composer-active")},{signal:t}),s&&(a==null||a.classList.add("composer-active")),o.addEventListener("input",()=>{var l,c;if(!(r.syncing||r.mode!=="rich"||!r.editor)){if(!r.api.roundTripsCleanly(r.editor,o.value,pi)){Wc(r,{focus:!0,refused:!0});return}r.editor.commands.setContent(o.value,{contentType:"markdown",emitUpdate:!1}),r.editor.commands.focus("end"),(c=(l=r.wrapper).scrollIntoView)==null||c.call(l,{behavior:"smooth",block:"nearest"})}},{signal:t}),t==null||t.addEventListener("abort",()=>RE(e,r)),r}function DE(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="toolbar rich-composer-toolbar",s.setAttribute("role","toolbar"),s.setAttribute("aria-label","Formatting"),s.innerHTML=`${LE.map(([a,r])=>`<button type="button" class="icon-btn" data-tool="${a}" title="${r}" aria-label="${r}" aria-pressed="false" tabindex="-1">${IE[a]}</button>`).join("")}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;const o=document.createElement("div");o.className="rich-composer-note",o.setAttribute("role","status"),o.hidden=!0,s.addEventListener("mousedown",a=>{a.target.closest("button")&&a.preventDefault()},{signal:t}),s.addEventListener("click",a=>{const r=a.target.closest("button[data-tool]");if(r){if(r.dataset.tool==="mode"){e.mode==="rich"?Wc(e,{focus:!0,remember:!0}):cg(e,{focus:!0});return}if(!(!e.editor||e.mode!=="rich")){if(r.dataset.tool==="link"){const l=e.editor.getAttributes("link").href||"",c=window.prompt("Link URL (leave empty to remove the link)",l);if(c===null){e.editor.commands.focus();return}e.api.COMMANDS.link(e.editor,c)||k("That link can’t be added. Use an http, https or mailto address.","error")}else e.api.COMMANDS[r.dataset.tool](e.editor);Wa(e)}}},{signal:t}),s.addEventListener("keydown",a=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(a.key))return;const r=[...s.querySelectorAll("button")].filter(d=>!d.disabled&&!d.hidden),l=r.indexOf(document.activeElement);if(l<0||!r.length)return;a.preventDefault();const c=a.key==="Home"?0:a.key==="End"?r.length-1:(l+(a.key==="ArrowRight"?1:-1)+r.length)%r.length;r.forEach(d=>{d.tabIndex=-1}),r[c].tabIndex=0,r[c].focus()},{signal:t}),i?(i.append(s,o),i.classList.add("has-rich-composer")):(n.insertAdjacentElement("afterend",s),s.insertAdjacentElement("afterend",o)),e.toolbar=s,e.note=o}function Vc(e,t,{focus:n=!1,restore:i=null}={}){ME(e,t)&&(cg(e,{focus:n||!!i,remember:!1}),i&&e.mode==="rich"&&jE(e,i))}function ME(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="rich-composer",s.hidden=!0,n.insertAdjacentElement("beforebegin",s);try{e.editor=t.createEditor({element:s,markdown:"",placeholder:e.placeholder,getMentionItems:o=>hm(o,e.mentionContext),onUpdate:o=>{e.syncing=!0,n.value=o,n.dispatchEvent(new Event("input",{bubbles:!0})),e.syncing=!1,Wa(e)},onSubmit:()=>i==null?void 0:i.requestSubmit(),onEscape:()=>e.editor.commands.blur()})}catch{return s.remove(),e.editor=null,!1}return e.wrapper=s,e.api=t,e.editor.on("selectionUpdate",()=>Wa(e)),!0}function cg(e,{focus:t=!1,remember:n=!0}={}){if(n&&rp("rich"),!e.editor){e.start({focus:t});return}if(!e.api.roundTripsCleanly(e.editor,e.textarea.value,pi)){Wc(e,{focus:t,refused:!0});return}e.editor.commands.setContent(e.textarea.value||"",{contentType:"markdown",emitUpdate:!1}),Kc(e,"rich",{focus:t})}function Wc(e,{focus:t=!1,remember:n=!1,refused:i=!1}={}){n&&rp("markdown"),Kc(e,"markdown",{focus:t,refused:i})}function Kc(e,t,{focus:n=!1,refused:i=!1}={}){const{textarea:s,editor:o,wrapper:a,toolbar:r,note:l}=e,c=t==="rich"&&!!o;e.mode=c?"rich":"markdown",s.hidden=c,a&&(a.hidden=!c),r.classList.toggle("markdown-mode",!c);const d=r.querySelector(".rich-mode-toggle");d.setAttribute("aria-pressed",String(!c)),d.title=c?"Write raw markdown":"Back to the formatted editor",l.hidden=!i,l.textContent=i?TE:"",n&&(c?o.commands.focus("end"):(s.focus(),s.setSelectionRange(s.value.length,s.value.length))),Wa(e)}function Wa(e){if(!e.toolbar)return;const t=!!e.editor&&e.mode==="rich",n=t?e.api.activeMarks(e.editor):{};e.toolbar.querySelectorAll(".icon-btn[data-tool]").forEach(o=>{const a=!!n[o.dataset.tool];o.setAttribute("aria-pressed",String(a)),o.classList.toggle("is-active",a),o.disabled=!t,o.hidden=!t});const i=[...e.toolbar.querySelectorAll("button")],s=i.filter(o=>!o.disabled&&!o.hidden);s.some(o=>o.tabIndex===0)||(i.forEach(o=>{o.tabIndex=-1}),(s[0]||i.at(-1)).tabIndex=0)}function jE(e,{from:t,to:n}){const i=e.editor.state.doc.content.size,s=o=>Math.max(1,Math.min(o,i));try{e.editor.chain().focus().setTextSelection({from:s(t),to:s(n)}).run()}catch{e.editor.commands.focus("end")}}function RE(e,t){t.destroyed=!0,t.editor&&t.editor.destroy(),t.editor=null,document.querySelectorAll(".rich-mention-suggestions").forEach(n=>n.remove()),Bi.get(e)===t&&Bi.delete(e)}function PE(e){var i,s,o;const t=Bi.get(e);if(t&&t.editor&&t.mode==="rich")return t.editor.commands.focus("end"),(s=(i=t.wrapper).scrollIntoView)==null||s.call(i,{behavior:"smooth",block:"nearest"}),!0;const n=document.getElementById(e);return n?(n.focus(),(o=n.scrollIntoView)==null||o.call(n,{behavior:"smooth",block:"nearest"}),!0):!1}function qE(e){const t=Bi.get(e);if(!t||!t.editor||t.mode!=="rich"||!t.editor.isFocused)return null;const{from:n,to:i}=t.editor.state.selection;return{from:n,to:i}}function NE(){for(const e of Bi.values())if(e.editor&&(e.editor.view.composing||e.editor.isFocused&&document.querySelector(".rich-mention-suggestions:not([hidden])")))return!0;return!1}let Yc=!1,Qc=!1,Ka=null,Xs=null,Js=null,Ya=null,Zc=!1,Qa=null;function Xc(e=null){Zc=!0,e&&(Qa=e)}function dg(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function Jc(e){return e.user_name||e.user_email||"Unknown"}const ed=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function td(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Le(t(e.old_value)))}</strong> to <strong>${u(Le(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(Te(t(e.old_value)))}</strong> to <strong>${u(Te(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${ed(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${ed(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${ed(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function eo(e){const t=()=>{var i;const n=(i=_e())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;Ka=n,od(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;Ka=null,od(e)}}function ug(){const e=pe();if(!e||e.is_agent)return!1;const t=Et();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}function OE(e){const t=pe(),n=oe().find(a=>a.id===(e==null?void 0:e.project_id)),i=C(),s=Et()||[];if(!n||!i||n.team_id!==i.id||s.length===0)return{userId:(t==null?void 0:t.id)||null,isAdmin:null};const o=s.find(a=>a.user_id===(t==null?void 0:t.id));return{userId:(t==null?void 0:t.id)||null,isAdmin:!!o&&(o.role==="admin"||o.role==="owner")}}let to=null,nd=!0;function id(){var o;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!nd;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((o=e.firstElementChild)==null?void 0:o.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function pg(){to&&(to.disconnect(),to=null),nd=!0,id()}const HE=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function FE(){pg();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!HE()||(to=new IntersectionObserver(t=>{nd=t[t.length-1].isIntersecting,id()}),to.observe(e))}function UE(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let sd=null;function od(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&sd===e,s=document.activeElement,o=!!t&&!!s&&(t.contains(s)||s===document.body),a=Ka,r=ug(),l=_e(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?kt(c.assignee_id):null,p=d?mt(d):(c==null?void 0:c.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,a?$E(a,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),sd=e,n){const b=a?_E(a,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",id()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=a?kE(a,{canAct:r,assigneeName:p}):""),o&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function Za({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function GE(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&Za({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||Za()},{signal:e})}async function Xa(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await de(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function ad(e){const t=ys(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function rd({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function zE(){var a;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=_e();if(!t)return;const n=ad(t.id);Xs=n.prevIssue?n.prevIssue.id:null,Js=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),o=rd(n);s?o?s.outerHTML=o:s.remove():o&&((a=i.querySelector(".back-link"))==null||a.insertAdjacentHTML("afterend",o))}yt(e=>{e==="detailNavContext"&&zE()});let no=0;const mg=500;function VE(){no++}let fg=0,Ja=!1;function gg(){if(document.querySelector(".description-inline-editor"))return"editor";if(ki())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Ja||NE()?"transient":null}function hg(e){return Xc(),e==="editor"?"deferred":"retry"}function WE(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=_e())==null?void 0:n.id)===e}function KE(e){return ie().find(t=>t.id===e)||Hl(e)||ys().find(t=>t.id===e)||null}function YE(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;pg(),sd=null,ri(e);const i=ad(e.id);Xs=i.prevIssue?i.prevIssue.id:null,Js=i.nextIssue?i.nextIssue.id:null;const s=oe().find(r=>r.id===e.project_id),o=e.assignee_id?kt(e.assignee_id):null,a=B()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(a)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${rd(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Xe(e.status)}<span>${Le(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${ht(e.priority)}<span>${Te(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${o?u(mt(o)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function de(e,t=!0,{refresh:n=!1}={}){var o;const i=n?no:++no,s=++fg;if(n){const a=gg();if(a)return hg(a)}try{t&&dn();let a=!1;if(!n){const A=KE(e);A&&(YE(A),t&&(history.pushState({issueId:e,view:B()},"",`/issue/${A.identifier}`),a=!0))}let r=!1;const[l,c,d,p,f,g,b]=await Promise.all([h.getIssue(e),h.getComments(e).catch(A=>(console.error("Failed to load comments:",A),r=!0,[])),h.getActivities(e,0,mg),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]})),h.getAttachments(e).catch(A=>(console.error("Failed to load attachments:",A),null))]),y=[...c].sort((A,U)=>new Date(A.created_at)-new Date(U.created_at)),$=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(A=>(console.error("Failed to load sprints:",A),[]))],[E,L]=await Promise.all($);if(i!==no)return"dropped";let T=null,j=null,x=null;if(n){if(s!==fg||!WE(e))return"dropped";const A=gg();if(A)return hg(A);x=window.scrollY;const U=document.activeElement;j=qE("new-comment"),U!=null&&U.id&&document.getElementById("issue-detail-view").contains(U)&&(T={id:U.id,start:U.selectionStart,end:U.selectionEnd})}Ka=g,t&&!a&&history.pushState({issueId:e,view:B()},"",`/issue/${l.identifier}`),ri(l),kp(L),Zc=!1,Qa=null,document.querySelectorAll(".view").forEach(A=>A.classList.add("hidden"));const w=document.getElementById("issue-detail-view");w.classList.remove("hidden");const D=B()||"my-issues",H=oe().find(A=>A.id===l.project_id),te=l.assignee_id?kt(l.assignee_id):null,se=te?mt(te):null,ne=l.sprint_id?L.find(A=>A.id===l.sprint_id):null,S=ad(l.id),{prevIssue:M,nextIssue:P}=S;w.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(D)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${rd(S)}
                        <span class="issue-detail-breadcrumb">${H?u(H.name):"Project"} › ${u(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(l.title)}</h1>
                    ${pf(l,se,{formatEstimate:cn})}

                    ${E?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(E.identifier)}" data-action="navigate-issue" data-issue-id="${m(E.id)}" data-identifier="${m(E.identifier)}">${E.identifier}: ${u(E.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${ms(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${ms(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?Hn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${lE(l.id,b,OE(l))}

                    ${S$(l,p,f,{formatEstimate:cn})}

                    ${C$({comments:y,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((o=wE(g,{canAct:ug()}))==null?void 0:o.name)||null,activitiesTruncated:d.length>=mg},{formatText:td,formatActor:Jc})}

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
                                ${Xe(l.status)}
                                <span>${Le(l.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${ht(l.priority)}
                                <span>${Te(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${dt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${se?`${Wt(te,"avatar-small")}<span>${u(se)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${ne?u(ne.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(A=>`
                                        <span class="issue-label" style="background: ${ae(A.color)}20; color: ${ae(A.color)}">${u(A.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${H?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(H.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${na(l.estimate,l.project_id)?" out-of-scale":""}" ${na(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${cn(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${u(l.creator_name||"Unknown")} ${zo(l.creator)}</span>
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
        `,Ya&&Ya.abort(),Ya=new AbortController;const{signal:Z}=Ya,he=document.querySelector(".sidebar-overflow-trigger"),Me=document.querySelector(".overflow-menu-dropdown");if(he&&Me){const A=()=>{Me.classList.add("hidden"),he.setAttribute("aria-expanded","false")},U=()=>{const K=Me.classList.toggle("hidden");he.setAttribute("aria-expanded",String(!K))};he.addEventListener("click",U,{signal:Z}),document.addEventListener("click",K=>{!he.contains(K.target)&&!Me.contains(K.target)&&A()},{signal:Z}),Me.addEventListener("keydown",K=>{K.key==="Escape"&&(K.stopPropagation(),A(),he.focus())},{signal:Z})}FE(),od(l.id),Ql("new-comment","mention-suggestions",{projectId:l.project_id}),km({signal:Z}),GE(Z),gE(w.querySelector(".detail-main"),l.id,Z),Ua(w);const qe=document.getElementById("new-comment");if(Ja=!1,qe){qe.addEventListener("compositionstart",()=>{Ja=!0},{signal:Z}),qe.addEventListener("compositionend",()=>{Ja=!1},{signal:Z});const A=tp(l.id);A&&(qe.value=A),qe.addEventListener("input",()=>{Uo(l.id,qe.value)}),qe.addEventListener("keydown",U=>{var K;U.key==="Enter"&&(U.metaKey||U.ctrlKey)&&(U.preventDefault(),(K=qe.closest("form"))==null||K.requestSubmit())}),BE("new-comment",{signal:Z,mentionContext:{projectId:l.project_id},placeholder:"Write a comment…",restore:j})}Xs=M?M.id:null,Js=P?P.id:null;const An=A=>{var ke;if((A.metaKey||A.ctrlKey)&&A.shiftKey&&(A.key===">"||A.key==="."||A.code==="Period")&&va()){A.preventDefault();return}if(A.metaKey||A.ctrlKey||A.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||A.target.tagName==="INPUT"||A.target.tagName==="TEXTAREA"||A.target.tagName==="SELECT"||A.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ki())return;A.key==="ArrowLeft"&&Xs?(A.preventDefault(),de(Xs)):A.key==="ArrowRight"&&Js?(A.preventDefault(),de(Js)):A.key==="c"?(A.preventDefault(),A.stopImmediatePropagation(),PE("new-comment")):A.key==="j"?(A.preventDefault(),A.stopImmediatePropagation(),er(1)):A.key==="k"?(A.preventDefault(),A.stopImmediatePropagation(),er(-1)):A.key==="d"&&(A.preventDefault(),(ke=document.querySelector('[data-action="edit-description"]'))==null||ke.click());const K={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[A.key];if(K){const To=document.querySelector(`.property-row[data-field="${K}"]`);To&&(A.preventDefault(),To.click())}};if(document.addEventListener("keydown",An,{signal:Z}),T){const A=document.getElementById(T.id);if(A&&(A.focus({preventScroll:!0}),typeof T.start=="number"&&typeof A.setSelectionRange=="function"))try{A.setSelectionRange(T.start,T.end)}catch{}}return x!==null&&window.scrollTo(0,x),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==no)return"dropped";_("load issue",a);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;r.innerHTML=Y(l?{icon:W.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:W.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function QE(e,t){if(e.preventDefault(),Yc)return!1;const n=document.getElementById("new-comment").value;Uo(t,null),Yc=!0;try{const i=await h.createComment(t,n);k("Comment added!","success"),hs(i),await de(t)}catch(i){Uo(t,n),_("add comment",i)}finally{Yc=!1}return!1}async function ZE(e){const t=_e()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const o=document.getElementById("edit-description"),a=ms(e),r=document.getElementById("description-draft-warning");if(a){o.value=a;const c=ip(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Ql("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),o.addEventListener("input",()=>{const c=o.value;c!==(t.description||"")?Dn(e,c,t.description||""):Dn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&vg()}),o.addEventListener("keydown",c=>{var d,p;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),o.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Dn(e,null),Zc){de(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Hn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(Qc)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=Qa?Qa.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");Qc=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Dn(e,null),k("Description updated","success"),await de(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){_("update description",y)}finally{Qc=!1,p&&(p.disabled=!1)}})}function vg(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Hn(n):'<span class="text-muted">Nothing to preview.</span>'}function XE(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const o=e==="preview";t.classList.toggle("active",!o),n.classList.toggle("active",o),i.style.display=o?"none":"block",s.style.display=o?"block":"none",o?vg():i.focus()}function JE(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,G(),document.getElementById("relation-issue-search").focus()}async function ex(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=C())==null?void 0:i.id,a=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function tx(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function nx(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function ix(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),F(),k("Relation added","success"),de(t)}catch(s){_("add relation",s)}return!1}async function sx(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),de(e)}catch(n){_("remove relation",n)}}function er(e){const t=_e();if(!t)return;const n=ys();if(!n||n.length===0)return;const i=n.findIndex(o=>o.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||de(n[s].id)}le({"retry-issue-comments":(e,t)=>{de(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{j$(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||ZE(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),De(t.documentId))},"scroll-to-ticket-gate":()=>{UE()},"save-comment":(e,t)=>{QE(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Za(),JE(t.issueId)},"remove-relation":(e,t)=>{sx(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Za(),Xm(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{ix(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{ex(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{tx(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{nx()},"set-description-editor-mode":(e,t)=>{XE(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>er(-1),"navigate-next-issue":()=>er(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),lg(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),xE(t.issueId)}});function ox(e){return e==="gate"?"Sign off":"Approve"}function ax(e){return Object.entries(e||{}).filter(([,t])=>t!=null).map(([t,n])=>`data-${t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`)}="${m(String(n))}"`).join(" ")}function bg(e,{approveAction:t,sendBackAction:n=null,data:i={},busy:s=!1,size:o="",sendBackClass:a="ticket-gate-text-btn"}={}){const r=ax(i),l=s?' aria-disabled="true" aria-busy="true"':"",d=[`<button type="button" class="${o==="sm"?"btn btn-primary btn-sm":"btn btn-primary"}" data-action="${m(t)}" ${r}${l}>${ox(e)}</button>`];return n&&d.push(`<button type="button" class="${m(a)}" data-action="${m(n)}" ${r}${l}>Send back…</button>`),d}const rx={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open",sprint_ritual:"Sprint"},lx={sprint_ritual:"badge badge-warning"};let Di=0,Pt=!1,Ee=null,$n=null;const Mi=new Set,io=new Map,yg=new Set(["review_requested","gate_pending","sprint_ritual"]),ld={all:null,approvals:["review_requested","gate_pending","sprint_ritual"],mentions:["mention"],assigned:["assignment"]};let st="all";const _t=new Map,en=new Set,ji=new Map,tr=new Set,qt=new Map,vt=new Map;function wg(e){qt.get(e)===null&&qt.set(e,Di)}function cd(e){const t=vt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Di)}function cx(e){return e.filter(t=>!qt.has(t.id)).map(t=>{const n=vt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Pt&&vt.has(t.id)&&t.id!==Ee))}function dx(e){for(const[t,n]of qt)n!==null&&e>n&&qt.delete(t);for(const[t,n]of vt)n.confirmedAfter!==null&&e>n.confirmedAfter&&vt.delete(t)}function ux(e,t){t!=null&&t.id&&(e==="archived"?(qt.has(t.id)||qt.set(t.id,null),wg(t.id)):e==="read"&&cd(t.id))}async function Ri(){const e=C();if(e){try{const t=await h.getInboxUnreadCount(e.id);ks(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Pi()}}function Pi(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Ko();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0&&st==="all"?`${t} unread`:"")}async function qi({focusFirst:e=!1,background:t=!1}={}){const n=C();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++Di;t||($n={focusFirst:e||!!($n!=null&&$n.focusFirst)},Ee=null,px(i));try{const o=await h.getInbox(n.id,{unread:Pt,kinds:ld[st],limit:100,includeArchived:st==="approvals"});if(s!==Di)return;const a=new Set(qt.keys());dx(s);const r=_x(cx(o||[])),l=$n;$n=null,l?(Kt(r),oo(),l.focusFirst&&!ze()&&gx()):mx(r,a)}catch(o){if(s!==Di)return;$n?($n=null,i.innerHTML=Y({icon:W.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),_("load inbox",o)):console.error("Failed to refresh inbox:",o)}Ri()}function px(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function nr(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function kg(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function $g(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function _g(e,t){if(!e)return;const n=nr(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=kg(n||t)),i==null||i.focus({preventScroll:!0})}function mx(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=re(),s=[...n.querySelectorAll(".inbox-row")],o=n.querySelector(".inbox-row.keyboard-selected"),a=(o==null?void 0:o.dataset.entryId)||null,r=o?s.indexOf(o):-1,l=$g(),c=window.scrollY,d=n.scrollTop;let p=e,f=null;if(Ee&&!e.some(y=>y.id===Ee)){const y=i.find($=>$.id===Ee);if(y&&Pt&&!t.has(Ee)){p=[...e];const $=p.findIndex(E=>E.created_at<y.created_at);p.splice($===-1?p.length:$,0,y),yg.has(y.kind)&&(f=y)}else Ee=null}Kt(p),oo(),f&&ir(f);let g=-1;a&&(g=p.findIndex(y=>y.id===a),g===-1&&p.length&&(g=Math.min(r,p.length-1))),g>=0?so(g,{focus:!1}):Wo(-1);const b=g>=0?n.querySelectorAll(".inbox-row")[g]:null;_g(l,b),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function fx(e,t){if(!(t!=null&&t.id))return!1;const n=re().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function _n(e){const t=re();for(const n of new Set(e)){const i=nr(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const o=i.contains(document.activeElement)?$g():null,a=document.createElement("template");a.innerHTML=md(s).trim();const r=a.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),_g(o,r)}}function so(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Wo(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Wo(i),t&&kg(n[i]).focus({preventScroll:!0})}function gx(){so(0)}async function Qn(e){const t=re(),n=t.findIndex(o=>o.id===e);if(n===-1)return;const s=!t[n].read_at;Ee===e&&(Ee=null),io.delete(e),_t.delete(e),tr.delete(e),ji.delete(e),qt.set(e,null),Kt(t.filter(o=>o.id!==e)),s&&ks(Math.max(0,Ko()-1)),oo(),Pi(),so(n,{focus:!ze()});try{await h.archiveInbox(e),wg(e)}catch(o){qt.delete(e),console.error("Failed to archive inbox entry:",o)}}function Eg(e){var s,o;const t=re(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=Ee;Ee=i===e?null:e,Ee===e&&(xg(e),ir(t[n])),_n([i,e]),so(n),Ee===e&&((o=(s=nr(e))==null?void 0:s.scrollIntoView)==null||o.call(s,{block:"nearest"}))}function xg(e){const t=re(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,vt.set(e,{readAt:i,confirmedAfter:null}),Kt([...t]),ks(Math.max(0,Ko()-1)),Pi(),h.markInboxRead(e).then(()=>cd(e),s=>{var a;((a=vt.get(e))==null?void 0:a.readAt)===i&&vt.delete(e);const o=re().find(r=>r.id===e);o&&o.read_at===i&&(o.read_at=null,Kt([...re()]),_n([e])),Ri(),_("mark inbox entry read",s)})}function hx(e){var i;const n=re().findIndex(s=>s.id===e);if(n!==-1){if(xg(e),Pt)Ee===e&&(Ee=null),Kt(re().filter(s=>s.id!==e)),oo(),so(n);else if(_n([e]),!document.activeElement||document.activeElement===document.body){const s=nr(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function vx(){if(Ee===null)return!1;const e=Ee;return Ee=null,_n([e]),!0}function Sg(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function bx(e){if(Mi.has(e))return;const t=re().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=io.get(e)||"",o=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
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
    `;const a=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),a.requestSubmit?a.requestSubmit():a.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;a.addEventListener("submit",async d=>{var y;if(d.preventDefault(),c)return;if(!re().some($=>$.id===e)){k(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),a.isConnected&&F();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await yx(e,p);c=!1;const b=a.isConnected&&ze();if(g){if(b&&(F(),!document.activeElement||document.activeElement===document.body)){const $=document.querySelector("#inbox-list .inbox-row.keyboard-selected");(y=$==null?void 0:$.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),G()}async function yx(e,t){if(Mi.has(e))return!1;const n=re().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",o=n.issue_identifier||"issue";Mi.add(e),Sg(e,!0);const a=(r,l)=>(Mi.delete(e),Sg(e,!1),_(r,l),!1);if(io.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return a(`comment on ${o}`,l)}io.set(e,i),hs(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return a(`reassign ${o} back to ${s}`,r)}return Mi.delete(e),io.delete(e),Qn(e),!0}function wx(){Ig(!Pt)}function Ig(e){e!==Pt&&(Pt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Pt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),qi({focusFirst:!0}))}function kx(e){!(e in ld)||e===st||(st=e,Lg(),qi({focusFirst:!0}))}function $x(){const e=new URLSearchParams(window.location.search).get("kind");!e||!(e in ld)||e===st||(st=e,Lg())}function Lg(){document.querySelectorAll('[data-action="mark-all-inbox-read"]').forEach(e=>{e.disabled=st!=="all",e.title=st==="all"?"":"Only on Everything: it marks every kind read"}),Pi(),document.querySelectorAll('[data-action="set-inbox-kind"]').forEach(e=>{const t=e.dataset.kind===st;e.classList.toggle("active",t),e.setAttribute("aria-pressed",t?"true":"false")})}async function ir(e,{force:t=!1}={}){var o;if(!e||!dd(e)||e.state==="resolved")return;const n=_t.get(e.id),i={};_t.set(e.id,(n==null?void 0:n.state)==="ready"&&!t?{...n,token:i}:{state:"loading",token:i}),t&&_n([e.id]);let s;try{if(e.kind==="sprint_ritual"){const a=await h.getLimboStatus(e.project_id);s={state:"ready",ritual:a!=null&&a.in_limbo&&(a.pending_rituals||[]).find(l=>l.id===e.ritual_id)||null,decided:null,sprintClosed:!(a!=null&&a.in_limbo)}}else{const a=await h.getTicketRitualsStatus(e.issue_id),r=((a==null?void 0:a.pending_rituals)||[]).find(c=>c.id===e.ritual_id)||null,l=r?null:((a==null?void 0:a.completed_rituals)||[]).find(c=>c.id===e.ritual_id)||null;s={state:"ready",ritual:r,decided:l}}}catch(a){console.error("Failed to load ritual for inbox entry:",a),s=(n==null?void 0:n.state)==="ready"&&!t?n:{state:"error"}}((o=_t.get(e.id))==null?void 0:o.token)===i&&(_t.set(e.id,s),_n([e.id]))}function _x(e){if(st!=="approvals")return e;const t=e.filter(n=>n.kind==="sprint_ritual");return t.length?[...t,...e.filter(n=>n.kind!=="sprint_ritual")]:e}function Ex(e){e&&X()===e&&Ps()}function dd(e){return!yg.has(e.kind)||!e.ritual_id?!1:e.kind==="sprint_ritual"?!!e.project_id:!!e.issue_id}function ud(e,t){return e.kind==="sprint_ritual"?(t==null?void 0:t.approval_mode)==="gate"?"gate":"review":e.kind==="review_requested"?"review":"gate"}function xx(e){return(e.actions||[]).some(t=>t.kind==="approve")}function Sx(e){return(e.actions||[]).length>0}function Ix(e){var c;const t=d=>({meta:"",body:`<div class="inbox-decision-status">${d}</div>`});if(e.state==="resolved")return t("Already decided. Nothing is waiting on you here.");const n=_t.get(e.id);if(!n||n.state==="loading")return{meta:"",body:'<div class="inbox-decision-status" role="status">Loading the attestation…</div>'};if(n.state==="error")return t(`Couldn’t load the attestation.
            <button type="button" class="ticket-gate-text-btn accent" data-action="retry-inbox-decision"
                data-entry-id="${m(e.id)}">Try again</button>`);const i=n.ritual;if(!i){if(n.sprintClosed)return t("The sprint has closed. Nothing is waiting on you here.");if(e.kind==="sprint_ritual")return t("Already done. Nothing is waiting on you here.");if(n.decided){const d=(c=n.decided.attestation)==null?void 0:c.approved_by_name;return t(`Already decided${d?` by ${u(d)}`:""}. Nothing is waiting on you here.`)}return t("This ritual no longer applies to the ticket. Open it to see where it stands.")}const s=ud(e,i)==="review",o=i.last_rejection&&!i.last_rejection.superseded_at?i.last_rejection:null,a=i.prompt?`<details class="inbox-decision-asks" data-entry-id="${m(e.id)}"${tr.has(e.id)?" open":""}><summary>What ${u(i.name)} asks</summary>
               <div class="inbox-decision-asks-text markdown-body">${ut(i.prompt)}</div></details>`:"";let r="";e.kind==="sprint_ritual"&&s&&!i.attestation?r='<div class="inbox-decision-status">Waiting on an attestation.</div>':s&&!kn(i)?r=o?`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”. Waiting on a new attestation.</div>`:'<div class="inbox-decision-status">Not attested any more. Waiting on a new attestation.</div>':!s&&o&&(r=`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”.</div>`);const l=i.attestation;return s?l?{meta:Tg(l.attested_by_name||"Someone","attested"),body:`<div class="inbox-expanded-body inbox-expanded-markdown">
                ${l.note?`<div class="markdown-body">${ut(l.note)}</div>`:'<div class="text-muted">No note.</div>'}
                ${sg(l)}
            </div>`,after:Gc(i)+a+r}:{meta:"",body:"",after:a+r}:{meta:"Waiting on a sign-off",body:i.prompt?`<div class="inbox-expanded-body inbox-expanded-markdown"><div class="markdown-body">${ut(i.prompt)}</div></div>`:"",after:r}}function Tg(e,t){return`${u(e)} ${u(t)}`}const Lx={assignment:"assigned you this",mention:"mentioned you",review_requested:"attested",gate_rejected:"sent it back",agent_status:"changed your agent"};function sr(e){const t=_t.get(e.id),n=(t==null?void 0:t.state)==="ready"?t.ritual:null;if(!n||!xx(e))return null;if(e.kind==="sprint_ritual")return n.approval_mode==="gate"?n.attestation?null:n:n.attestation&&!n.attestation.approved_at?n:null;if(e.kind==="review_requested")return kn(n)?n:null;const i=n.last_rejection&&!n.last_rejection.superseded_at;return!n.attestation&&!i?n:null}function Tx(e){if(!dd(e))return[];const t=sr(e);if(e.kind==="sprint_ritual"){if(!t)return[];const a=ud(e,t);return bg(a,{approveAction:a==="review"?"approve-inbox-entry":"sign-off-inbox-entry",size:"sm",busy:en.has(e.id),data:{entryId:e.id,ritualId:t.id,projectId:e.project_id,ritualName:t.name,...a==="gate"?{ritualArtifact:t.artifact||""}:{}}})}const n=Sx(e)?`<button type="button" class="inbox-action-btn" data-action="comment-inbox-entry"
        data-entry-id="${m(e.id)}">Comment…</button>`:"";if(!t)return n?[n]:[];const i=e.kind==="review_requested",[s,o]=bg(i?"review":"gate",{approveAction:i?"approve-inbox-entry":"sign-off-inbox-entry",sendBackAction:"send-back-inbox-entry",size:"sm",sendBackClass:"inbox-action-btn",busy:en.has(e.id),data:{entryId:e.id,ritualId:t.id,issueId:e.issue_id,ritualName:t.name,...i?{}:{ritualArtifact:t.artifact||""}}});return[s,o,n].filter(Boolean)}const Ax=["approve-inbox-entry","sign-off-inbox-entry","send-back-inbox-entry","comment-inbox-entry"].map(e=>`#inbox-list [data-action="${e}"]`).join(", ");function Ag(e,t){document.querySelectorAll(Ax).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function pd(e,{comment:t=null}={}){if(en.has(e))return!1;const n=re().find(l=>l.id===e),i=n?sr(n):null;if(!i)return n&&k("This is no longer waiting on a decision from you.","error"),!1;const s=ud(n,i)==="review",o=n.kind==="sprint_ritual";en.add(e),Ag(e,!0);const a=`${s?"approve":"sign off on"} ${i.name}`;try{t&&s&&ji.get(e)!==t&&(hs(await h.createComment(n.issue_id,t)),ji.set(e,t)),o?s?await h.approveAttestation(i.id,n.project_id):await h.completeGateRitual(i.id,n.project_id,t||null):s?await h.approveTicketRitual(i.id,n.issue_id):await h.completeTicketGateRitual(i.id,n.issue_id,t||null)}catch(l){return en.delete(e),Ag(e,!1),_(a,l),ir(n,{force:!0}),!1}en.delete(e),_t.delete(e),ji.delete(e);const r=n.issue_identifier?` on ${n.issue_identifier}`:"";return o&&Ex(n.project_id),k(`${s?"Approved":"Signed off on"} ${i.name}${r}.`,"success"),Qn(e),!0}function Cx(e){if(en.has(e.entryId))return;const t=re().find(n=>n.id===e.entryId);if((t==null?void 0:t.kind)==="sprint_ritual"){const n=e.entryId;pm(e.ritualId,e.projectId,e.ritualName,e.ritualArtifact||"",()=>{_t.delete(n),Qn(n)});return}if(e.ritualArtifact){const n=e.entryId;fm(e.ritualId,e.issueId,e.ritualName,e.ritualArtifact,()=>{_t.delete(n),Qn(n)});return}pd(e.entryId)}function Bx(e){const t=e.entryId;en.has(t)||mm(e.ritualId,e.issueId,e.ritualName,()=>{_t.delete(t),Qn(t)})}function Dx(e){const t=re().find(c=>c.id===e);if(!t||!t.issue_id||en.has(e))return;const n=sr(t),i=!!n&&!(t.kind==="gate_pending"&&n.artifact),s=t.kind==="review_requested"?"Comment and approve":"Comment and sign off",o=t.issue_identifier||"the ticket";document.getElementById("modal-title").textContent=`Comment on ${o}`,document.getElementById("modal-content").innerHTML=`
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
    `;const a=document.getElementById("inbox-comment-form"),r=document.getElementById("inbox-comment-text"),l=document.getElementById("inbox-comment-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",c=>{if(c.key==="Enter"&&(c.metaKey||c.ctrlKey)){c.preventDefault();const d=a.querySelector('button.btn-primary[type="submit"]');a.requestSubmit?a.requestSubmit(d||void 0):d==null||d.click()}}),a.addEventListener("submit",async c=>{var b,y;if(c.preventDefault(),!r.value.trim()){l.classList.remove("hidden"),r.focus();return}const d=[...a.querySelectorAll('button[type="submit"]')];d.forEach($=>{$.disabled=!0});const p=((b=c.submitter)==null?void 0:b.value)==="decide";if(await Mx(e,r.value,{decide:p})){F();return}d.forEach($=>{document.contains($)&&($.disabled=!1)});const g=re().find($=>$.id===e);(!g||!sr(g))&&((y=a.querySelector('button[value="decide"]'))==null||y.remove())}),G(),r.focus()}async function Mx(e,t,{decide:n=!1}={}){const i=(t||"").trim(),s=re().find(a=>a.id===e);if(!i||!s||!s.issue_id)return!1;if(n)return pd(e,{comment:i});if(ji.get(e)===i)return ji.delete(e),k(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0;let o;try{o=await h.createComment(s.issue_id,i)}catch(a){return _(`comment on ${s.issue_identifier||"the ticket"}`,a),!1}return hs(o),k(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0}const jx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',Rx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function Px(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function md(e){const t=!e.read_at,n=e.id===Ee,i=rx[e.kind]||e.kind,s=lx[e.kind]||`badge badge-inbox-${e.kind}`,o=e.kind==="sprint_ritual"&&e.project_id?oe().find(c=>c.id===e.project_id):null,a=e.issue_identifier||e.document_title||(o==null?void 0:o.name)||"",r=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),l=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${r}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(l)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(Px(e.source_user_name))}</span>
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
                ${n?qx(e,a,l):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${jx}</button>`:""}
                    ${e.archived_at?"":`<button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${Rx}</button>`}
                </span>
                <span class="inbox-row-time">${u(Sy(e.created_at))}</span>
            </div>
        </div>
    `}function qx(e,t,n){const i=e.kind==="assignment"&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,o=e.source_user_name,a=t?`Open ${u(t)}`:"Open",r=dd(e),l=[...r?Tx(e):[],i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Mi.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${o?` to ${u(o)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${a}</button>`:"",e.archived_at?"":`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join(""),c=r?Ix(e):null,d=Lx[e.kind],p=o&&e.source_user_id!==e.recipient_user_id,f=c?c.meta:p&&d?Tg(o,d):"",g=c?c.body:e.body?`<div class="inbox-expanded-body">${u(e.body)}</div>`:"";return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${f?`<div class="inbox-expanded-source">${f}</div>`:""}
            ${g||""}
            ${(c==null?void 0:c.after)||""}
            <div class="inbox-action-bar">${l}</div>
        </div>
    `}const Cg={all:{noun:"items",heading:"Inbox zero",description:"Approvals, mentions, assignments, and more will show up here."},approvals:{noun:"approvals",heading:"Nothing to approve",description:"Reviews, gates and sprint rituals waiting on you show up here. Rituals are the checks a project runs when tickets are claimed or closed and when a sprint closes."},mentions:{noun:"mentions",heading:"No mentions",description:"Comments that @mention you will show up here."},assigned:{noun:"assignments",heading:"Nothing newly assigned",description:"Tickets someone assigns to you will show up here."}};function oo(){const e=document.getElementById("inbox-list");if(!e)return;const t=re();if(t.length===0){const n=Cg[st]||Cg.all;e.innerHTML=Y({icon:W.inbox,heading:Pt?`No unread ${n.noun}`:n.heading,description:Pt?"Nothing unread right now.":n.description});return}e.innerHTML=Ox(t)}function Nx(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=o=>new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function Ox(e){let t="";if(st==="approvals"){const i=[];for(;e.length&&e[0].kind==="sprint_ritual";)i.push(e[0]),e=e.slice(1);i.length&&(t=`
        <section class="inbox-group inbox-sprint-close" aria-labelledby="inbox-group-sprint">
            <div class="section-header">
                <h3 id="inbox-group-sprint">Sprint close <span class="section-count">${i.length}</span></h3>
            </div>
            <p class="text-muted">The sprint closes when these are done.</p>
            ${i.map(s=>md(s)).join("")}
        </section>`)}const n=[];for(const i of e){const s=Nx(i.created_at),o=n[n.length-1];o&&o.label===s?o.entries.push(i):n.push({label:s,entries:[i]})}return t+n.map((i,s)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${s}">
            <h3 class="inbox-group-header" id="inbox-group-${s}">${u(i.label)}</h3>
            ${i.entries.map(o=>md(o)).join("")}
        </section>
    `).join("")}async function Hx(e){var s;const t=re().find(o=>o.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();vt.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(o){((s=vt.get(e))==null?void 0:s.readAt)===n&&vt.delete(e);const a=re().find(r=>r.id===e);a&&a.read_at===n&&(a.read_at=null,Kt([...re()]),_n([e])),console.error("Failed to mark inbox entry read:",o);return}cd(e);const i=re().find(o=>o.id===e);i&&!i.read_at?(i.read_at=n,Kt([...re()]),ks(Math.max(0,Ko()-1)),Pi(),_n([e])):Ri()}async function Fx(){const e=C();if(!(!e||st!=="all"))try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of re())n.read_at||vt.set(n.id,{readAt:t,confirmedAfter:Di});Kt(re().map(n=>({...n,read_at:n.read_at||t}))),ks(0),Pi(),oo()}catch(t){_("mark all inbox entries read",t)}}function Ux(e){e.entryId&&Hx(e.entryId),e.issueId?de(e.issueId):e.documentId&&De(e.documentId)}function Gx(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Qn(e.dataset.entryId)}function zx(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Eg(e.dataset.entryId)}const Vx='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function Wx(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(Vx);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function Kx(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}typeof document<"u"&&document.addEventListener("toggle",e=>{var n;const t=e.target;!((n=t==null?void 0:t.classList)!=null&&n.contains("inbox-decision-asks"))||!t.dataset.entryId||(t.open?tr.add(t.dataset.entryId):tr.delete(t.dataset.entryId))},!0),le({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&Kx((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||Wx(e.target,n)||(e.preventDefault(),t.entryId&&Eg(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),Ux(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&bx(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),F()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Qn(t.entryId)},"toggle-inbox-unread-filter":()=>wx(),"set-inbox-filter":(e,t)=>Ig(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&hx(t.entryId)},"mark-all-inbox-read":()=>Fx(),"set-inbox-kind":(e,t)=>kx(t.kind),"approve-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&pd(t.entryId)},"sign-off-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Cx(t)},"send-back-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Bx(t)},"close-inbox-comment":e=>{e.preventDefault(),F()},"comment-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Dx(t.entryId)},"retry-inbox-decision":(e,t)=>{e.preventDefault();const n=re().find(i=>i.id===t.entryId);n&&ir(n,{force:!0})},"retry-load-inbox":()=>qi({focusFirst:!0})});let ao=[],Ni=[],Zn=[];function fd(){return ao}function Bg(e){ao=Array.isArray(e)?e:[],Dg()}function Et(){return Ni}async function or(e=null){try{ao=await(e||h.getMyTeams()),Dg()}catch(t){_("load teams",t)}}function Dg(){const e=document.getElementById("team-list");ao.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=ao.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function ar(e,t=!1,{seed:n=null}={}){Xn=null,ai(e),Pg(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),dm(e.id),n&&Qx(n)){let o=!1;try{Zx(n),Xn=e.id,t?Nl():O(B()||"my-issues"),o=!0}catch(a){console.error("Failed to paint from the boot cache:",a),Xn=null}if(o){Mg(e).catch(a=>console.error("Failed to refresh team data:",a));return}}await Mg(e),t?Nl():O(B()||"my-issues")}let Xn=null;function Yx(){var e;return Xn&&Xn===((e=C())==null?void 0:e.id)?Xn:null}async function Mg(e){var t;await Promise.all([pt(),gS(),Jx(),aw(),Ri()]),((t=C())==null?void 0:t.id)===e.id&&(Xn=e.id)}function Qx(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function Zx(e){Ay(Array.isArray(e.projects)?e.projects:[]),Bp(),Cp(),ws(Array.isArray(e.labels)?e.labels:[]),Ni=Array.isArray(e.members)?e.members:[],sw(e.agents),Ss(Et,ft),ci(),Ew(e.issues)}function jg(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Xx(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Jx(){var t,n;const e=(t=C())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=C())==null?void 0:n.id)!==e)return;Ni=i,Ss(Et,ft),ci()}catch(i){console.error("Failed to load team members:",i),_("load team members",i)}}function eS(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let gd=0;async function Rg(){var n,i;const e=(n=C())==null?void 0:n.id;if(!e)return;const t=++gd;try{const s=await h.getTeamMembers(e);if(t!==gd||((i=C())==null?void 0:i.id)!==e)return;Ni=s,Ss(Et,ft),ci()}catch(s){if(t!==gd)return;Ni=[],_("load team members",s)}tS()}function Oi(){var n;const e=(n=pe())==null?void 0:n.id,t=Ni.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function tS(){var t;const e=Oi();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let rr=0;async function lr(){var i;if(!C())return;const e=++rr,t=C().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=eS());try{const s=await h.getTeamInvitations(t);if(e!==rr||((i=C())==null?void 0:i.id)!==t)return;Zn=s,hd()}catch(s){if(e!==rr)return;if((s==null?void 0:s.status)===403){Zn=[],hd();return}console.error("Failed to load team invitations:",s),qg(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Pg(){rr++,Zn=[],hd()}function qg(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function hd(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Zn.length)),qg(Zn.length>0),Zn.length===0){e.innerHTML="";return}const n=Oi();e.innerHTML=Zn.map(i=>`
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
    `).join("")}function Ng(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function nS(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(C().id,t,n);if(await lr(),i&&i.accept_url)return oS(t,sS(i.accept_url),i.email_queued===!0),!1;F(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){iS(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):_("send invitation",i)}return!1}function iS(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Og(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function sS(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Og(n.hostname)||Og(i.hostname)?e:i.origin+n.pathname}function oS(e,t,n=!1){var o;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,ze()||G(),(o=document.querySelector('[data-action="copy-invite-link"]'))==null||o.focus(),Hg()}function Hg(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function aS(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function rS(e){let t;try{t=await h.issueInvitationVerificationCode(C().id,e)}catch(n){_("get a verification code",n);return}cS(t)}function lS(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let o;return s<3600?o=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?o=`${Math.round(s/3600)} h`:o=`${Math.round(s/86400)} days`,`${o} ${n>=i?"after":"before"} the invitation was created`}function cS(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=lS(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,ze()||G(),Hg("invitation-code")}async function dS(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(C().id,e),await Rg(),k("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){_("remove member",t)}}async function uS(e){try{await h.deleteInvitation(C().id,e),await lr(),k("Invitation canceled!","success")}catch(t){_("cancel invitation",t)}}function Fg(){jg(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,G()}function pS(){C()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${m(C().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${m(C().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${u(C().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,G())}async function mS(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await or(),await ar(n),F(),k("Team created!","success")}catch(n){_("create team",n)}return!1}async function fS(e){if(e.preventDefault(),!C())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(C().id,t);ai(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await or(),F(),k("Team updated!","success")}catch(n){_("update team",n)}return!1}async function gS(){var t,n;const e=(t=C())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=C())==null?void 0:n.id)!==e)return;ws(i)}catch(i){console.error("Failed to load labels:",i),_("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),le({"select-team":(e,t)=>{ar(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||dS(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||uS(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||rS(t.invitationId)},"retry-load-team-invitations":()=>{lr()},"invite-member":e=>{nS(e)},"copy-invite-link":()=>{aS()},"dismiss-invite-link":()=>{F()},"create-team":e=>{mS(e)},"update-team":e=>{fS(e)}});let Nt=null,tn=0,Hi=null,Fi=null,ro=null,vd=!1;function hS(){return Fb()}function Ug(){Ub()}function Gg(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function vS(){Nt||(Nt=document.createElement("div"),Nt.id="onboarding-overlay",Nt.className="onboarding-overlay",document.getElementById("app").appendChild(Nt))}function lo(){if(!Nt)return;const e=vd?Vg():zg(),t=e[tn],n=e.map((i,s)=>`<span class="onboarding-dot${s===tn?" active":""}${s<tn?" completed":""}"></span>`).join("");Nt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function zg(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Gg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Gg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Hi&&(e.textContent=`${Hi.name} (${Hi.key})`),t&&Fi&&(t.textContent=`${Fi.name} (${Fi.key})`),n&&ro&&(n.textContent=`${ro.identifier} - ${ro.title}`)}}]}function Vg(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function bd(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function yd(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Ui(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function bS(){const e=vd?Vg():zg();tn<e.length-1&&(tn++,lo())}function yS(){Ug(),Kg(),Jn()}function wS(){Ug(),Kg(),Jn()}async function kS(e){e.preventDefault(),yd("onboarding-team-error"),Ui("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Hi=await h.createTeam({name:t,key:n}),tn++,lo()}catch(i){bd("onboarding-team-error",i.message||"Failed to create team"),Ui("onboarding-team-submit",!1)}}async function $S(e){e.preventDefault(),yd("onboarding-project-error"),Ui("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Fi=await h.createProject(Hi.id,{name:t,key:n}),tn++,lo()}catch(i){bd("onboarding-project-error",i.message||"Failed to create project"),Ui("onboarding-project-submit",!1)}}async function _S(e){e.preventDefault(),yd("onboarding-issue-error"),Ui("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{ro=await h.createIssue(Fi.id,{title:t}),tn++,lo()}catch(n){bd("onboarding-issue-error",n.message||"Failed to create issue"),Ui("onboarding-issue-submit",!1)}}function Wg(e=!1){vd=e,tn=0,Hi=null,Fi=null,ro=null,vS(),lo()}function Kg(){Nt&&(Nt.remove(),Nt=null)}function Yg(){Gb(),Wg(!0)}le({"onboarding-next":e=>{e.preventDefault(),bS()},"onboarding-skip":e=>{e.preventDefault(),yS()},"onboarding-finish":e=>{e.preventDefault(),wS()},"onboarding-create-team":e=>{kS(e)},"onboarding-create-project":e=>{$S(e)},"onboarding-create-issue":e=>{_S(e)}});const Qg="/oauth/consent/";function ES(e){if(!e||!e.startsWith(Qg))return null;const t=e.slice(Qg.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function xS(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function SS(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function IS(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Zg={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function cr(e){const t=Zg[e.trust]||Zg.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function LS(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function TS(e,t){const n=e&&t?e.agents.find(o=>o.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Xg(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",o=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+o)}</option>`)}return n.join("")}function Jg(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function AS(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function CS(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${cr(t.client)}</p>
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
        </div>`}function BS(e,t){if(t.acts_as==="person"){CS(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),o=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",a=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${u(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${cr(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${u(t.redirect_host)}</strong></p>
            ${a}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${LS(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Xg(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Jg(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${AS(t)}
                </fieldset>
                ${o}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,wd(e,t)}function wd(e,t){var o;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const a=(o=e.querySelector("#oauth-team"))==null?void 0:o.value,r=TS(t.teams.find(l=>l.id===a),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function DS(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(a=>a.value),s=e.querySelector('input[name="oauth-policy"]:checked'),o={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const a=e.querySelector("#oauth-agent-name").value.trim();a&&(o.agent_name=a)}return o}function MS(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function co(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function jS(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function RS(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=Xg(d,null),e.querySelector("#oauth-projects").innerHTML=Jg(d),wd(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>wd(e,n));let o=!1;const a=async d=>{if(!o){o=!0;try{const p=d?await h.approveOAuthRequest(t,DS(e)):await h.denyOAuthRequest(t);if(!xS(p.redirect)){co(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(o=!1,p&&p.status===404){co(e,"It has expired, was already answered, or belongs to someone else.");return}MS(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),a(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>a(!1))}async function PS(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=SS();IS(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(o){o&&o.status===404?co(i,"It has expired, was already answered, or belongs to someone else."):o&&o.status===403&&o.detail&&o.detail.error_code==="web_login_required"?jS(i,n):o&&o.status===403?co(i,"Only a person signed in to Chaotic can approve an app."):co(i,o&&o.message||"Something went wrong");return}BS(i,s),RS(i,e,s,t)}const kd="/invite/",uo="/invite",$d="chaotic.inviteToken",eh="invite-auth-notice";let _d=null;const qS="This invitation is no longer valid.",NS={owner:"an owner",admin:"an admin",member:"a member"};function OS(e){if(!e||!e.startsWith(kd))return null;const t=e.slice(kd.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function th(){const{pathname:e}=window.location,t=OS(e);if(t){_d=t;try{sessionStorage.setItem($d,t)}catch{}return history.replaceState(null,"",uo),t}if(!nh(e))return null;let n=null;try{n=sessionStorage.getItem($d)}catch{}const i=n||_d;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function nh(e){return e===uo||e===`${uo}/`}function ih(e){return nh(e)||!!(e&&e.startsWith(kd))}function Ed(){_d=null;try{sessionStorage.removeItem($d)}catch{}}function HS(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function FS(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function xd(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function sh(){const e=FS();return dr(),xd(e),e}function US(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),dr()}function dr(){var e;(e=document.getElementById(eh))==null||e.remove()}function Sd(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=NS[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${GS(e)}</p>`}function GS(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const zS="Ask whoever invited you to send a new invitation.",VS="Reload the page to try again.";function Id(e,t=qS,n=zS){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function WS(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function oh(){window.location.pathname!==uo&&history.replaceState(null,"",uo),WS(sh())}function KS(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Sd(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function YS(e,t,n){const i=HS(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Sd(t)}
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
            ${Sd(t)}
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
        </div>`}function QS(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function ZS(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),o=e.querySelector("#invite-code-form"),a=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=p=>{l.textContent=p,l.classList.remove("hidden")},d=()=>{var p;o.classList.remove("hidden"),(p=a.focus)==null||p.call(a)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=QS(p.expires_at);c(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}c(p&&p.message||"Something went wrong"),p&&p.status===429&&d()}finally{s.disabled=!1}}}),o.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=a.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=a.select)==null||g.call(a));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function XS(e,t){dr();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=eh,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),dr(),t()})}function ur(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function JS(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,p;const o=sh();o.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let a;try{a=await h.getInvitation(e)}catch(f){f&&f.status===404?(Ed(),Id(o)):Id(o,f&&f.message||"Something went wrong.",VS);return}if(!t){KS(o,a);const f=g=>{XS(a,()=>xd(o)),n(g)};o.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),o.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}YS(o,a,t),(d=o.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=o.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch($){l=!1,r.disabled=!1;const E=$&&$.detail&&$.detail.error_code;if(f!==void 0&&(E==="invalid_verification_code"||E==="invitation_code_expired"||$&&$.status===429)){ur(o,$&&$.message||"That code did not work."),(y=(b=o.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}$&&$.status===401?s():$&&($.status===404||$.status===400)?(Ed(),Id(o)):$&&$.status===403&&$.detail&&$.detail.error_code==="email_unverified"?(ur(o,"Verify your email address to continue."),o.querySelector("#invite-accept-actions").classList.add("hidden"),o.querySelector("#invite-verify").classList.remove("hidden")):$&&$.status===403?ur(o,`This invitation is for a different email address. Only ${a.email_hint} can accept it.`):ur(o,$&&$.message||"Something went wrong");return}Ed(),ah(o,a);try{await i(g.team_id,a.team_name)}catch($){console.error("Joined the team but could not open it:",$),xd(o),ah(o,a)}};r.addEventListener("click",()=>c()),(p=o.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=o.querySelector("#invite-admin-code").value.trim();g&&c(g)}),ZS(o,{onVerified:()=>{o.querySelector("#invite-verify").classList.add("hidden"),o.querySelector("#invite-error").classList.add("hidden"),o.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function ah(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function Ld(e){return JS(e,{user:pe(),showAuth:t=>{fo(),t==="signup"?uh():dh()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),US(),await Jn({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Ct(null),ai(null),Ld(e)}})}async function rh(){const e=th();if(e){await Ld(e);return}if(ih(window.location.pathname)){oh();return}fo()}async function Jn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=ES(window.location.pathname);if(i){await PS(i);return}const s=th();if(s){await Ld(s);return}if(ih(window.location.pathname)){oh();return}r0(),Wp(),pr(),s0();const o=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(o){await e0(n,o,t);return}await or(t);const a=fd();if(a.length===0&&!hS()){Wg();return}a.length===0&&jn("my-issues");try{if(a.length>0){const c=e&&a.find(d=>d.id===e)||a[0];await ar(c,!0)}}finally{Qp()}}async function e0(e,t,n){Bg(e.teams);try{await ar(t,!0,{seed:e})}finally{Qp()}Promise.resolve(n||or().then(fd)).then(async i=>{var o;if(!Array.isArray(i))return;Bg(i);const s=i.find(a=>a.id===t.id);if(!s){await n0(),window.location.reload();return}if(((o=C())==null?void 0:o.id)===s.id&&s.name!==C().name){ai(s);const a=document.getElementById("current-team-name");a&&(a.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const t0=2e3;let Gi=null,lh=!1,ch=!1;function n0(){return ch=!0,clearTimeout(Gi),Gi=null,yl()}function Td(){if(clearTimeout(Gi),Gi=null,ch)return Promise.resolve();const e=pe(),t=C();return!(e!=null&&e.id)||!(t!=null&&t.id)||cp(gl())!==e.id||Yx()!==t.id?Promise.resolve():sy(e.id,{user:e,teams:fd(),teamId:t.id,projects:oe(),labels:_l(),members:Et(),agents:ft(),issues:_w({maxQueries:3})})}function i0(){clearTimeout(Gi),Gi=setTimeout(Td,t0)}function s0(){lh||(lh=!0,vw(i0),document.addEventListener("visibilitychange",o0),window.addEventListener("pagehide",a0))}function o0(){document.visibilityState==="hidden"&&Td()}function a0(){Td()}let zi=null,po=null,xt=null,St=null;function mo(){zi||(zi=document.getElementById("auth-screen"),po=document.getElementById("main-screen"),xt=document.getElementById("login-form"),St=document.getElementById("signup-form"))}function fo(){mo(),zi&&zi.classList.remove("hidden"),po&&po.classList.add("hidden")}function r0(){mo(),zi&&zi.classList.add("hidden"),po&&po.classList.remove("hidden")}function dh(){mo(),xt&&xt.classList.remove("hidden"),St&&St.classList.add("hidden")}function uh(){mo(),xt&&xt.classList.add("hidden"),St&&St.classList.remove("hidden")}async function l0(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Ct(await h.getMe()),await Jn(),k("Welcome back!","success")}catch(i){_("log in",i)}return!1}async function c0(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Ct(await h.getMe()),await Jn(),k("Account created successfully!","success")}catch(s){_("sign up",s)}return!1}function ph(){h.logout(),Ct(null),ai(null),fo(),k("Signed out","success")}function d0(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function pr(){var i;const e=pe();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",fp(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?d0(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function u0(){mo();const e=xt==null?void 0:xt.querySelector("form");e&&e.addEventListener("submit",s=>l0(s));const t=St==null?void 0:St.querySelector("form");t&&t.addEventListener("submit",s=>c0(s));const n=xt==null?void 0:xt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),uh()});const i=St==null?void 0:St.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),dh()})}let Ad=[];async function Cd(){try{Ad=await h.getApiKeys(),p0()}catch(e){_("load API keys",e)}}function p0(){const e=document.getElementById("api-keys-list");if(e){if(Ad.length===0){e.innerHTML=Y({icon:W.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Ad.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${u(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${u(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Se(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Se(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function m0(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,G()}async function f0(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);F(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,G()}catch(n){_("create API key",n)}return!1}async function g0(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function h0(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await Cd()}catch(n){_("revoke API key",n)}}le({"create-api-key":e=>{f0(e)},"copy-api-key":()=>{g0()},"dismiss-api-key-modal":()=>{F(),Cd()},"revoke-api-key":(e,t)=>{h0(t.keyId,t.keyName)}});let Bd=[];async function mh(){try{Bd=await h.getConnections(),b0()}catch(e){_("load connected apps",e)}}function Dd(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function v0(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function b0(){const e=document.getElementById("connected-apps-list");if(e){if(Bd.length===0){e.innerHTML=Y({icon:W.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Bd.map(t=>t.acts_as==="person"?y0(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Dd(t))} ${cr(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(v0(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Se(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Se(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Dd(t))}">Disconnect</button>
        </div>
    `).join("")}}function y0(e){const n=`${e.device_name||"A device"} · ${Dd(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${u(n)} ${cr(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Se(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Se(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function fh(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),k("App disconnected","success"),await mh()}catch(n){_("disconnect app",n)}}le({"revoke-connection":(e,t)=>{fh(t.connectionId,t.connectionName)}});let Md=[];async function gh(){try{Md=await h.getPushDevices(),w0()}catch(e){_("load push devices",e)}}const hh={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function vh(e){return e.label||e.platform||"Unnamed device"}function w0(){const e=document.getElementById("push-devices-list");if(e){if(Md.length===0){e.innerHTML=Y({icon:W.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Md.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(vh(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Se(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Se(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${hh[t.status]?`<span class="push-device-status">${u(hh[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(vh(t))}">Remove</button>
        </div>
    `).join("")}}async function k0(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),k("Device removed","success"),await gh()}catch(n){_("remove push device",n)}}le({"remove-push-device":(e,t)=>{k0(t.installationId,t.deviceName)}});let mr=!1,nn=0,En=[],fr=[];function $0(e){fr=e,En=[...e]}function xn(){return mr}function _0(){if(mr)return;mr=!0,nn=0,En=[...fr];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&gr()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>E0(n.target.value)),t.addEventListener("keydown",S0),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&x0(Number(i.dataset.commandIndex))}),go(),requestAnimationFrame(()=>t.focus())}function gr(){mr=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function E0(e){const t=e.toLowerCase().trim();t?En=fr.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):En=[...fr],nn=0,go()}function go(){const e=document.getElementById("command-results");if(!e)return;if(En.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};En.forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)});let n="",i=0;for(const[o,a]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${o}</div>`;for(const r of a)n+=`
                <div class="command-item ${i===nn?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function x0(e){nn=e,go()}function bh(e){const t=En[e];t&&(gr(),t.action())}function S0(e){switch(e.key){case"ArrowDown":e.preventDefault(),nn=Math.min(nn+1,En.length-1),go();break;case"ArrowUp":e.preventDefault(),nn=Math.max(nn-1,0),go();break;case"Enter":e.preventDefault(),bh(nn);break;case"Escape":e.preventDefault(),gr();break}}le({"execute-command":(e,t)=>{bh(Number(t.commandIndex))}});const I0=[{title:"Navigation",shortcuts:[{key:"m",description:"Home"},{key:"i",description:"Issues"},{key:"b",description:"Issues as a board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals (in Project settings)"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function L0(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function T0(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(L0).join("")}
    </div>`}function yh(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${I0.map(T0).join("")}
        </div>
    `,G()}const hr=100,jd="status!=done,canceled",A0=["created","updated","priority","status","title","estimate"];function Ie(e){return e==null?"":u(String(e))}function wh(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Ie(n)}</a>`}function kh(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Rd=[{id:"identifier",label:"ID",fixed:!0,render:e=>wh(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>wh(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Ie(Le(e.status))},{id:"priority",label:"Priority",render:e=>Ie(Te(e.priority))},{id:"type",label:"Type",render:e=>Ie(dt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Ie(kh(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Ie(kh(e,"creator"))},{id:"project",label:"Project",render:e=>Ie(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Ie(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ae(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Ie(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Ie(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Ie(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Ie(Se(e.created_at))},{id:"updated",label:"Updated",render:e=>Ie(Se(e.updated_at))},{id:"completed",label:"Completed",render:e=>Ie(Se(e.completed_at))},{id:"due",label:"Due",render:e=>Ie(Se(e.due_date))}],vr=Object.fromEntries(Rd.map(e=>[e.id,e])),C0=Rd.filter(e=>e.fixed).map(e=>e.id),Pd=["identifier","title","status","priority","assignee","updated"];function qd(e){const t=new Set,n=[];for(const s of e||[]){const o=String(s).trim();!vr[o]||t.has(o)||(t.add(o),n.push(o))}return n.length===0?[...Pd]:[...C0.filter(s=>!t.has(s)),...n]}function B0(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function D0(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?qd(t.get("cols").split(",")):[...Pd],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function M0(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!B0(e.cols,Pd)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function j0(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function R0({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=hr,skip:o=0}){const a=["chaotic","issue","list"];let r=e||"",l=null;n||i?(a.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",a.push("--where",j0(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],p=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;A0.includes(f)?(a.push("--sort",f,"--order",p?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return a.push("--limit",String(s)),o>0&&a.push("--skip",String(o)),{command:a.join(" "),warning:l}}function P0(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function q0(e,t){const n=qd(t).map(o=>vr[o]),i=n.map(o=>`<th data-col="${m(o.id)}">${Ie(o.label)}</th>`).join(""),s=e.map(o=>`<tr class="query-row" data-issue-id="${m(o.id)}">${n.map(a=>`<td class="query-col-${m(a.id)}">${a.render(o)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function N0(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,o=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${o?"":" disabled"}>Next</button>`}let N=null,Nd=null,ot=null,Od=0,Vi=!1,$h=!1;function ge(e){return document.getElementById(e)}function _h(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Eh(e){const t=M0({...Nd,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Hd(){N&&ea(N.teamScope?null:N.projectId)}function O0(){N&&(!N.teamScope&&N.projectId!==X()?wt(N.projectId):Hd())}function H0(){const e=ge("query-columns-menu");e&&(e.innerHTML=Rd.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Ie(t.label)}
        </label>`).join(""))}function br(e){const t=ge("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Ie(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function xh(e){const t=ge("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Fd(e){var t;(t=ge("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function ho(){const e=ge("query-results"),t=ge("query-pager");if(!e)return;if(!ot){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=ot;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=q0(n,N.cols),t&&(t.innerHTML=N0(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(o=>{o.dataset.enabled=String(!o.disabled)}),Vi&&Fd(!0))}async function yr(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=C(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){ot=null,ho(),br(N.teamScope?"Select a team first.":"Select a project.");return}const o=++Od,a=N.where===null?jd:N.where,r=ge("query-results");Vi=!0,r&&r.classList.add("loading"),Fd(!0);const l=()=>o===Od&&B()==="query";try{const c=await h.queryIssues({...s,where:a,order:N.order,skip:(N.page-1)*hr,limit:hr});if(!l())return;N.where=c.where,N.order=c.order||null,Nd=_h(N),ot={issues:c.issues||[],total:c.total,skip:c.skip};const d=ge("query-where");d&&d.value.trim()===a.trim()&&(d.value=c.where),br(null),Vi=!1,ho(),Eh(e),t&&t()}catch(c){if(!l())return;Vi=!1,n?n():ot=null,ho(),br(P0(c))}finally{o===Od&&(Vi=!1,r&&r.classList.remove("loading"),Fd(!1))}}function Sh(){if(!N)return;const e=ge("query-where");return N.where=e?e.value.trim():"",N.page=1,yr("push")}function F0(e){if(!N)return;const t={teamScope:N.teamScope,projectId:N.projectId,page:N.page};return N.teamScope=!e,e&&(N.projectId=e),N.page=1,xh(null),yr("push",{onSuccess:()=>{e?wt(e):Ap(),Hd()},onFailure:()=>{Object.assign(N,t),Hd()}})}function U0(e,t){if(!N||!vr[e]||vr[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=qd(t?[...n,e]:n),ho(),Eh("replace")}function G0(e){if(!N||!ot||Vi)return;const t=N.page+e;if(t<1||e>0&&ot.skip+ot.issues.length>=ot.total)return;const n={page:N.page,result:ot};return N.page=t,yr("push",{onFailure:()=>{N.page=n.page,ot=n.result}})}async function z0(){if(!N)return null;const e=ge("query-where"),t=e?e.value.trim():N.where??jd,n=N.teamScope?null:oe().find(a=>a.id===N.projectId),{command:i,warning:s}=R0({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:hr,skip:ot?ot.skip:0}),o=ge("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),o&&o.classList.add("hidden")}catch{o&&(o.textContent=i,o.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function V0(){var e,t,n,i,s,o;$h||($h=!0,(e=ge("query-where"))==null||e.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&!a.isComposing&&(a.preventDefault(),Sh())}),(t=ge("query-run-btn"))==null||t.addEventListener("click",()=>Sh()),(n=ge("query-copy-cli-btn"))==null||n.addEventListener("click",()=>z0()),(i=ge("query-columns-btn"))==null||i.addEventListener("click",a=>{a.stopPropagation();const r=ge("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;a.currentTarget.setAttribute("aria-expanded",String(l))}),(s=ge("query-columns-menu"))==null||s.addEventListener("change",a=>{a.target.matches('input[type="checkbox"]')&&U0(a.target.value,a.target.checked)}),(o=ge("query-pager"))==null||o.addEventListener("click",a=>{const r=a.target.closest("button[data-query-page]");!r||r.disabled||G0(Number(r.dataset.queryPage))}),document.addEventListener("click",a=>{var l;const r=ge("query-columns-menu");r&&!r.classList.contains("hidden")&&!a.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=ge("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function W0(){var s,o;V0();const e=D0(window.location.search),t=oe();let n=null;if(!e.teamScope){const a=r=>r&&t.some(l=>l.id===r);if(!a(e.projectId)){const r=e.projectId;e.projectId=a(X())?X():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,Nd=_h(N),ot=null;const i=ge("query-where");return i&&(i.value=N.where===null?jd:N.where),(s=ge("query-cli-preview"))==null||s.classList.add("hidden"),(o=ge("query-columns-menu"))==null||o.classList.add("hidden"),O0(),H0(),br(null),xh(n),ho(),yr("replace")}let wr=[];function K0(){return wr}yt(e=>{e==="currentProject"&&B()==="epics"&&Sn()});let Ud=0;const vo=new Set(["done","canceled"]);let kr=!1;async function Sn({fromMemory:e=!1}={}){var o;El(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++Ud,i=Kl(),s=e?ga("epics",i):void 0;s?Ih(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((o=C())!=null&&o.id)){wr=[],t.innerHTML=Y({icon:W.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const a=X(),r=a?await h.getProjectEpicProgress(a):await h.getTeamEpicProgress(C().id);if(n!==Ud||(mi("epics",i,r),s&&ha(s,r)))return;Ih(r,t)}catch(a){if(n!==Ud)return;t.innerHTML=Y({icon:W.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),_("load epics",a)}}function Ih(e,t){var i;const n=((e==null?void 0:e.untracked)||[]).some(s=>(s.awaiting_human||[]).length);if(!((i=e==null?void 0:e.epics)!=null&&i.length)&&!n){wr=[],t.innerHTML=Y({icon:W.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Ah(e,t)}function Gd(e,t){return`${e} ${t}${e===1?"":"s"}`}function Y0(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function bo(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function Ot(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function $r(e){const t=et(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Lh(e){const t=e.children||{},n=bo(e);if(n<=0)return'<span class="meter-label">No tickets</span>';const i=t.done||0,s=`${Y0(i,n)} done: ${i} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="meter" title="${m(s)}"><div class="meter-fill" style="width: ${Math.round(i/n*100)}%"></div></div>
        <span class="meter-label">${i} of ${n}</span>`}function Q0(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,o=`${i.name}${i.status==="active"?" (current)":""}: ${Gd(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(o)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function Z0(e){const t=e.in_flight||[],n=t.slice(0,2).map(s=>`${s.assignee?`<b>${u(s.assignee.name)}</b>`:"Unassigned"} on ${u(s.title)}`),i=(e.in_flight_count||t.length)-n.length;return i>0&&n.push(`+${i} more`),n.join(", ")}function Th(e,t="shipped"){const n=e.last_shipped;return n?`${t} ${u(n.title)} ${u($r(n.completed_at))}`:""}function _r(e,{sub:t,right:n,grouped:i}){const s=e.status_pinned&&!vo.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",o=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",a=i?`<span class="epic-project-key">${u(e.project_key)}</span> `:"",r=e.owner?` <span class="epic-owner">· ${u(e.owner.name)}</span>`:"",l=bo(e)<=0;return`
        <div class="list-row-2line epic-row${vo.has(e.status)?" epic-row-closed":""}${l?" epic-row-empty":""}" data-identifier="${m(e.identifier)}" title="${m(e.identifier)}">
            <span class="epic-spark">${Q0(e.sprints)}</span>
            <span class="list-row-title">${a}${u(e.title)}${r}${s}${o}</span>
            <span class="list-row-sub">${t}</span>
            <span class="list-row-right">${n}</span>
        </div>`}function Er(e,t,n,i,s=""){return i?`
        <section class="epic-section epic-section-${e}">
            <div class="section-header"><h3>${t} <span class="section-count">${n}</span></h3></div>
            <div class="epic-section-rows">${i}</div>
            ${s}
        </section>`:""}function zd(e){return!vo.has(e.status)&&bo(e)>0&&(e.open_children||0)===0}const Vd=5;function Ah(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(x=>x.project_key),...i.map(x=>x.project_key)]).size>1,o=(x,w)=>s?`${u(x)} · ${w}`:w,a=n.filter(x=>!vo.has(x.status)),r=a.filter(zd),l=a.filter(x=>!zd(x)&&(x.in_flight_count||0)>0).sort((x,w)=>Ot(w.last_activity_at)-Ot(x.last_activity_at)),c=a.filter(x=>!zd(x)&&!x.in_flight_count).sort((x,w)=>{var D,H;return(bo(x)<=0)-(bo(w)<=0)||Ot((D=w.last_shipped)==null?void 0:D.completed_at)-Ot((H=x.last_shipped)==null?void 0:H.completed_at)||Ot(w.last_activity_at)-Ot(x.last_activity_at)}),d=n.filter(x=>vo.has(x.status)).sort((x,w)=>Ot(w.completed_at||w.last_activity_at)-Ot(x.completed_at||x.last_activity_at)),p=kr?d:d.slice(0,Vd),f=[...n.flatMap(x=>(x.awaiting_human||[]).map(w=>({a:w,where:o(x.project_key,u(x.title))}))),...i.flatMap(x=>(x.awaiting_human||[]).map(w=>({a:w,where:o(x.project_key,"No epic")})))].sort((x,w)=>Ot(x.a.since)-Ot(w.a.since)),g=f.map(({a:x,where:w})=>{const D=x.approval_mode==="review",H=x.requested_by_name?` by ${u(x.requested_by_name)}`:"";return`
        <div class="list-row-2line epic-ask-row" data-issue-identifier="${m(x.identifier)}" title="${m(x.identifier)}">
            <span class="epic-spark" aria-hidden="true"></span>
            <span class="list-row-title">${D?"Approve":"Complete"} ${u(x.ritual_name)}: ${u(x.title)}</span>
            <span class="list-row-sub">${w} · ${D?"attested":"requested"}${H} ${u($r(x.since))}</span>
            <span class="list-row-right"><span class="list-row-action">${D?"Approve":"Complete"}</span></span>
        </div>`}).join(""),b=r.map(x=>_r(x,{grouped:s,sub:`Every ticket is done${x.last_shipped?` · last shipped ${u($r(x.last_shipped.completed_at))}`:""}`,right:'<span class="list-row-action">Open epic</span>'})).join(""),y=l.map(x=>_r(x,{grouped:s,sub:[Z0(x),Th(x)].filter(Boolean).join(" · "),right:Lh(x)})).join(""),$=c.map(x=>{const w=x.children||{},D=w.todo?`${w.todo} ready to start`:w.backlog?`${w.backlog} in backlog`:"",H=x.last_shipped?Th(x,"Last shipped"):"Nothing shipped yet";return _r(x,{grouped:s,sub:[H,D].filter(Boolean).join(" · "),right:Lh(x)})}).join(""),E=p.map(x=>{var w;return _r(x,{grouped:s,sub:x.completed_at?`Closed ${u($r(x.completed_at))}`:"Closed",right:`<span class="meter-label">${Gd(((w=x.children)==null?void 0:w.done)||0,"ticket")}</span>`})}).join(""),L=d.length>Vd?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${kr?`Show the latest ${Vd}`:`Show all ${d.length}`}</button>`:"",T=i.filter(x=>x.open),j=T.length?`<p class="epic-untracked-note">${T.map(x=>`${s?`${u(x.project_key)}: `:""}${Gd(x.open,"open ticket")}`).join(", ")} under no epic.</p>`:"";wr=[...r,...l,...c,...d],t.innerHTML=`
        <div class="epic-sections">
            ${Er("waiting","Waiting on you",f.length+r.length,g+b)}
            ${Er("moving","Moving now",l.length,y)}
            ${Er("quiet","Nothing in flight",c.length,$)}
            ${Er("shipped","Shipped",d.length,E,L?`<div class="epic-table-footer">${L}</div>`:"")}
            ${j}
        </div>
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=x=>{if(x.target.closest("[data-epics-toggle-closed]")){kr=!kr,El(-1),Ah(t._epicProgress,t);return}const w=x.target.closest(".epic-ask-row");if(w&&w.dataset.issueIdentifier){oa(w.dataset.issueIdentifier);return}const D=x.target.closest(".epic-row");D&&D.dataset.identifier&&Kp(D.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function X0(){const e=X(),t=oe().map(n=>`
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
    `,G(),document.getElementById("create-epic-form").addEventListener("submit",J0),document.getElementById("create-epic-title").focus()}async function J0(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});F(),k(`Created epic ${s.identifier}`,"success"),Sn()}catch(s){_("create epic",s)}}async function Ch(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){de(t.id,!1);return}await xr(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function xr(e,t=!0){var n;try{t&&dn();const[i,s,o,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(i.issue_type!=="epic"){de(e,t);return}t&&history.pushState({epicId:e,view:B()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=B()||"epics",c=oe().find(w=>w.id===i.project_id),d=i.assignee_id?kt(i.assignee_id):null,p=d?mt(d):null,f=K0(),g=(n=f.find(w=>w.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(w=>w.status!=="canceled").length,y=g?g.done||0:s.filter(w=>w.status==="done").length,$=b>0?Math.round(y/b*100):0,E=f.findIndex(w=>w.id===i.id),L=E>0?f[E-1]:null,T=E>=0&&E<f.length-1?f[E+1]:null,j=E>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${j?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${L?`data-action="navigate-epic" data-epic-id="${m(L.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${E+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${T?`data-action="navigate-epic" data-epic-id="${m(T.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?u(c.name):"Project"} › ${u(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Hn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${$===100?" epic-progress-complete":""}" style="width: ${$}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${b} done</span>
                                <span>${$}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?Y({icon:W.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(w=>{const D=w.assignee_id?kt(w.assignee_id):null,H=D?mt(D):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">
                                    <span class="sub-issue-status">${Xe(w.status)}</span>
                                    <span class="sub-issue-id">${u(w.identifier)}</span>
                                    <span class="sub-issue-title">${u(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${Le(w.status)}</span>
                                    ${H?`<span class="sub-issue-assignee">${u(H)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${o.length===0?Y({icon:W.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):o.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${dg(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${td(w)}</span>
                                        <span class="activity-actor">by ${u(Jc(w))}</span>
                                        <span class="activity-time">${et(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(w=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${u(w.author_name||"User")}</span>
                                            <span class="comment-date">${et(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${pi(w.content||"")}</div>
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
                                ${Xe(i.status)}
                                ${Le(i.status)}
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
                                ${ht(i.priority)}
                                ${Te(i.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${p?u(p):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${cn(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(w=>`
                                    <span class="issue-label" style="background: ${ae(w.color)}20; color: ${ae(w.color)}">${u(w.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const x=r.querySelector(".sub-issues-list");x&&x.addEventListener("click",w=>{const D=w.target.closest(".sub-issue-item");D&&D.dataset.issueId&&de(D.dataset.issueId)})}catch(i){_("load epic",i)}}le({"navigate-epic":(e,t)=>{xr(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows sub-issues"),await xr(t.epicId,!1)}catch(n){_("update epic",n)}}});function eI(e){let t=!1,n=null;return function(s){var a,r,l,c,d,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((a=e.isInlineDropdownOpen)!=null&&a.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(Pn(s.target)){s.key==="Escape"&&!s.defaultPrevented&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const o=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),o?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!o){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function tI(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const o=e.getModalPrimaryBtn();o&&!o.disabled&&(n.preventDefault(),o.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function sn(e,t,n=Yo){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Bh(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function yo(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Bh(),!1):!0:!1}function nI(e){const t=Yo;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,o,a,r){const l=n(o);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,a,c,d)}return function(o){var l,c,d,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||Pn(o.target)||yo(o)||(o.key==="Enter"||o.key===" ")&&((d=(c=o.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(o.key)&&((f=e.beforeNavigate)==null||f.call(e));const a=document.querySelectorAll(t);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),sn(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":o.preventDefault(),sn(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(o,r,"status","status-btn");break;case"p":i(o,r,"priority","priority-btn");break;case"a":i(o,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function iI(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var a;if(e.getCurrentView()!=="documents"||(a=e.isDetailViewActive)!=null&&a.call(e)||Pn(i.target)||yo(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),sn(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),sn(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function In(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function sI(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||Pn(i.target)||yo(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex(),a=g=>{var y,$,E,L;const b=!!(($=(y=document.activeElement)==null?void 0:y.closest)!=null&&$.call(y,"#inbox-list"));if((E=e.collapseInboxExpand)==null||E.call(e),sn(o+g,e.setSelectedIndex,t),b){const T=document.querySelector(`${t}.keyboard-selected`);(L=(T==null?void 0:T.querySelector(".inbox-row-toggle"))||T)==null||L.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),a(1);break;case"k":case"ArrowUp":i.preventDefault(),a(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;o>=0&&s[o]&&(i.preventDefault(),e.toggleInboxExpand(s[o]));break;case"e":o>=0&&s[o]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[o]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}o>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function oI(e){const t="#kanban-board .kanban-card";return function(i){var a;if(e.getCurrentView()!=="board"||(a=e.isDetailViewActive)!=null&&a.call(e)||Pn(i.target)||yo(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),sn(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),sn(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.id;r&&e.viewIssue(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function aI(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),o=s.indexOf(i);if(o===-1)return;let a;switch(n.key){case"ArrowDown":a=s[Math.min(s.length-1,o+1)];break;case"ArrowUp":a=s[Math.max(0,o-1)];break;case"Home":a=s[0];break;case"End":a=s[s.length-1];break;default:return}a&&(n.preventDefault(),a.focus())}}function Wd(e){const{view:t,selector:n,open:i}=e;return function(o){var l,c,d,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||Pn(o.target)||yo(o)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const a=document.querySelectorAll(n);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),sn(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":o.preventDefault(),sn(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(d=o.target).closest)!=null&&p.call(d,'button, a[href], [role="button"]'))break;r>=0&&a[r]&&(o.preventDefault(),i(a[r]));break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const rI=7,Kd=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),Dh=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),lI='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',cI='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Mh=!1;function dI(){Mh||(Mh=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Kd,set(e){var t;Kd.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...Dh,set(e){var t;Dh.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let we=null,uI=0;function jh({restoreFocus:e=!0}={}){return we?(we.close(e),!0):!1}function pI(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if((we==null?void 0:we.select)!==e){const s=document.activeElement;Yd(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function mI(e=document){e.querySelectorAll("select[data-picker]").forEach(fI)}function fI(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${lI}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Rh(e,t),(we==null?void 0:we.select)===e&&we.refresh()};return e._picker={button:t,sync:n},dI(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(we==null?void 0:we.select)===e?jh():Yd(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(we==null?void 0:we.select)!==e&&Yd(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function Rh(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",o=t.querySelector(".picker-label");o.textContent=i,s&&o.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const a=e.getAttribute("aria-label");a&&t.setAttribute("aria-label",i?`${a}: ${i}`:a)}function Ph(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function Yd(e,t,n){jh({restoreFocus:!1});const i=Ph(e),s=`picker-list-${++uI}`,o=i.length>=rI,a=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${o?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=S=>Math.max(0,S.findIndex(M=>!M.disabled));let p=i.findIndex(S=>S.value===e.value&&!S.disabled);p===-1&&(p=d(i));let f=i;const g=()=>{var M;l.innerHTML=f.length?f.map((P,Z)=>`
                <li role="option" id="${s}-${Z}" class="picker-option${Z===p?" active":""}${P.disabled?" disabled":""}"
                    data-index="${Z}" data-value="${m(P.value)}"
                    aria-selected="${P.value===e.value?"true":"false"}"${P.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(P.text)}</span>
                    ${P.hint?`<span class="picker-option-hint">${u(P.hint)}</span>`:""}
                    ${P.value===e.value?`<span class="picker-check">${cI}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const S=l.querySelector(".picker-option.active");S?(c||l).setAttribute("aria-activedescendant",S.id):(c||l).removeAttribute("aria-activedescendant"),(M=S==null?void 0:S.scrollIntoView)==null||M.call(S,{block:"nearest"})},b=()=>{var An,A;const S=t.getBoundingClientRect(),M=((An=window.visualViewport)==null?void 0:An.width)||window.innerWidth,P=((A=window.visualViewport)==null?void 0:A.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(S.width,220),M-16)}px`,r.style.maxHeight="",r.style.top="0px";const Z=r.offsetWidth||Math.max(S.width,220),he=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(S.left,M-Z-8))}px`;const Me=P-S.bottom-12,qe=S.top-12;if(he>Me&&qe>Me){const U=Math.max(120,qe);r.style.maxHeight=`${U}px`,r.style.top=`${Math.max(8,S.top-4-Math.min(he,U))}px`}else r.style.maxHeight=`${Math.max(120,Me)}px`,r.style.top=`${S.bottom+4}px`},y=S=>{if(!S||S.disabled||e.disabled)return;if(![...e.options].some(P=>P.value===S.value&&!P.disabled)){se(!0);return}const M=S.value!==e.value;Kd.set.call(e,S.value),Rh(e,t),se(!0),M&&e.dispatchEvent(new Event("change",{bubbles:!0}))},$=S=>{let M=p+S;for(;M>=0&&M<f.length&&f[M].disabled;)M+=S;M<0||M>=f.length||(p=M,g())},E=(S,M)=>{let P=S;for(;P>=0&&P<f.length&&f[P].disabled;)P+=M;P>=0&&P<f.length&&(p=P,g())},L=S=>{if(!(S.metaKey||S.ctrlKey))switch(S.stopPropagation(),S.key){case"ArrowDown":S.preventDefault(),$(1);break;case"ArrowUp":S.preventDefault(),$(-1);break;case"Home":c||(S.preventDefault(),E(0,1));break;case"End":c||(S.preventDefault(),E(f.length-1,-1));break;case"PageDown":S.preventDefault(),E(Math.min(f.length-1,p+8),-1);break;case"PageUp":S.preventDefault(),E(Math.max(0,p-8),1);break;case"Enter":S.preventDefault(),y(f[p]);break;case"Escape":S.preventDefault(),se(!0);break;case"Tab":se(!0);break;case" ":c||(S.preventDefault(),y(f[p]));break;default:if(!c&&S.key.length===1&&!S.metaKey&&!S.ctrlKey&&!S.altKey){T=(Date.now()-j<700?T:"")+S.key.toLowerCase(),j=Date.now();const M=f.findIndex(P=>!P.disabled&&P.text.toLowerCase().startsWith(T));M!==-1&&(p=M,g())}}};let T="",j=0;const x=()=>{const S=c.value.trim().toLowerCase();f=S?i.filter(P=>P.text.toLowerCase().includes(S)||P.hint.toLowerCase().includes(S)):i;const M=f.findIndex(P=>P.value===e.value&&!P.disabled);p=!S&&M!==-1?M:d(f),g()},w=S=>{r.contains(S.target)||t.contains(S.target)||se(!1)},D=()=>b(),H=S=>{S.key!=="Escape"||r.contains(S.target)||(S.preventDefault(),S.stopPropagation(),se(!0))},te=()=>se(!1);function se(S){var M,P;(we==null?void 0:we.popover)===r&&(we=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",w,!0),document.removeEventListener("keydown",H,!0),window.removeEventListener("popstate",te),window.removeEventListener("resize",D),window.removeEventListener("scroll",D,!0),S&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(P=(M=document.activeElement)==null?void 0:M.blur)==null||P.call(M)))}l.addEventListener("click",S=>{const M=S.target.closest(".picker-option");M&&y(f[Number(M.dataset.index)])}),l.addEventListener("mousemove",S=>{const M=S.target.closest(".picker-option");if(!M)return;const P=Number(M.dataset.index);P!==p&&(p=P,g())}),r.addEventListener("keydown",L),c&&c.addEventListener("input",x),document.addEventListener("pointerdown",w,!0),document.addEventListener("keydown",H,!0),window.addEventListener("popstate",te),window.addEventListener("resize",D),window.addEventListener("scroll",D,!0),we={select:e,button:t,popover:r,close:se,refresh:()=>{const S=Ph(e);!(S.length===i.length&&S.every((P,Z)=>P.value===i[Z].value&&P.text===i[Z].text&&P.hint===i[Z].hint&&P.disabled===i[Z].disabled))||e.disabled?se(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),b(),(c||l).focus({preventScroll:!0})}const gI={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let V=null,Ln=0;async function qh(e,t){var o,a;const n=gI[e];if(!n){_("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++Ln;V=null;let s;try{s=await n.fetchList(t)}catch(r){_("load revision history",r);return}if(i===Ln){if(V={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((o=s[0])==null?void 0:o.version)??null,compareFromVersion:null,compareToVersion:null},V.viewVersion!=null)try{const r=await n.fetchOne(t,V.viewVersion);if(i!==Ln)return;V.cache.set(V.viewVersion,r)}catch(r){i===Ln&&_("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(a=document.querySelector(".modal"))==null||a.classList.add("modal-wide"),Sr(),G()}}function Sr(){const e=document.getElementById("modal-content");if(!e||!V)return;if(V.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=hI(),n=V.mode==="compare"?bI():vI();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function hI(){const e=V.revisions.map(n=>{const i=V.mode==="view"?n.version===V.viewVersion:n.version===V.compareFromVersion||n.version===V.compareToVersion,s=V.mode==="compare"?n.version===V.compareFromVersion?' <span class="rev-tag">from</span>':n.version===V.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${u(n.author_name||"Unknown")} ${zo(n.author)}</span>
          <span class="revision-time">${et(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${V.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function vI(){const e=V.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=V.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[V.adapter.bodyField]||"",s=i?`<div class="markdown-body">${ut(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${et(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function bI(){const e=V.compareFromVersion,t=V.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=V.cache.get(e),i=V.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[V.adapter.bodyField]||"",o=i[V.adapter.bodyField]||"",a=yI(s,o);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function yI(e,t){const n=e.split(`
`),i=t.split(`
`),s=wI(n,i);return s.every(a=>a.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(a=>a.type==="equal"?a.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):a.type==="add"?a.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):a.type==="del"?a.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function wI(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const o=[];let a=0,r=0;for(;a<n&&r<i;)e[a]===t[r]?(wo(o,"equal",e[a]),a++,r++):s[a+1][r]>=s[a][r+1]?(wo(o,"del",e[a]),a++):(wo(o,"add",t[r]),r++);for(;a<n;)wo(o,"del",e[a++]);for(;r<i;)wo(o,"add",t[r++]);return o}function wo(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function kI(e){if(!V)return;const t=V.token,n=V;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(V!==n||Ln!==t)return;n.cache.set(e,i)}catch(i){V===n&&Ln===t&&_("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Sr()}function $I(){if(!V)return;const e=V.token,t=V;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(a=>a.version===n);if(i>=0&&i+1<t.revisions.length){const a=t.revisions[i+1].version;t.compareFromVersion=a,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const o=[t.compareFromVersion,t.compareToVersion].filter(a=>a!=null&&!t.cache.has(a));Promise.all(o.map(a=>t.adapter.fetchOne(t.entityId,a).then(r=>{V===t&&Ln===e&&t.cache.set(a,r)}).catch(r=>{s||(s=r)}))).then(()=>{V!==t||Ln!==e||(s&&_("load revisions to compare",s),Sr())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Sr()}le({"show-document-revisions":(e,t)=>{qh("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{qh("issue",t.issueId)},"select-revision-version":(e,t)=>{kI(Number(t.version))},"toggle-revision-compare":()=>{$I()},"close-revision-viewer":()=>{V=null,F()}});function Ir(e){return ft().find(t=>t.id===(e==null?void 0:e.user_id))||null}function Nh(e){if(!e)return"Team-wide";const t=oe().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function Oh(e,t=pe()){return!(e!=null&&e.is_agent)||!t||!Ir(e)?!1:e.owner_id===t.id||Oi()}function Hh(e){const t=Ir(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function _I(e,t){var n,i;return((n=ft().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function on(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function Lr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function EI(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=Ir(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${on("Scope","A guest from another team, with a membership here")}
                ${on("Owner",Lr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=Hh(e),o=[on("Scope",u(Nh(n.agent_project_id??e.project_id))),on("Owner",Lr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&o.push(on("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;o.push(on("Registered by",f?Lr(f,_I(f,t)):"A registrar")),o.push(on("Last used",n.last_used_at?u(Se(n.last_used_at)):"Never"))}else o.push(on("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=ft().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);o.push(on("Sessions registered",f.length?f.map(g=>Lr(g.id,g.name)).join(", "):"None active"))}const a=Oh(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=a?`
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
    `}let Fh=0;async function Tr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++Fh;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==Fh)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const o=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),a=n.filter(l=>l.is_active);if(!a.length&&!o.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...a.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${u(l.key_prefix||"")}…</code>${l.name?` · ${u(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${u(Se(l.created_at))}${l.owner_name?` by ${u(l.owner_name)}`:""} · ${l.last_used_at?`last used ${u(Se(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...o.map(l=>{var d;const c=((d=l.client)==null?void 0:d.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${u(c)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${u(Se(l.created_at))}${l.last_used_at?` · last used ${u(Se(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(c)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function xI(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),Tr(t)}catch(n){_("revoke the key",n)}}const Ar={bio:4e3,pronouns:40,tagline:120,name:255};let Re=[],Cr=null,Uh=new Map,Qd=!1,Br=0,Dr=null,Wi=null,ko=null,Mr=!1,Zd=0;async function Gh(e,t){return h.getTeamRoster(e,{includeIdle:t})}function SI(e,t){!t||Cr!==e||(Re=Re.map(n=>n.user_id===t.user_id?t:n))}function II(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function LI(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function jr(){const e=C();if(!e)return;const t=++Br,n=Qd,i=document.getElementById("people-list");i&&(i.innerHTML=II(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=Qd),Rg().then(()=>{t===Br&&(Oi()?lr():Pg(),Cr===e.id&&Ki())});try{const[o,a]=await Promise.all([Gh(e.id,n),LI(e.id)]);if(t!==Br)return;Re=o,Cr=e.id,Uh=a,Ki()}catch(o){if(t!==Br)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=Y({icon:W.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),_("load the roster",o)}}function Rr(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function TI(e){const t=Uh.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u(Rr(e))}function AI(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(Nh(e.project_id))}</span>`),Hh(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u(Rr(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${Wt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${TI(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function zh(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(AI).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function Ki(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=Re.filter(o=>!o.is_agent),n=Re.filter(o=>o.is_agent),i=pe(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=zh("Humans",t,"No one yet.",s)+zh("Agents",n,"No agents yet.")+CI()}function CI(){var s;if(!Oi())return"";const e=new Set(Re.map(o=>o.user_id)),t=new Set(ft().map(o=>o.id)),n=(s=pe())==null?void 0:s.id,i=Et().filter(o=>!e.has(o.user_id)&&!t.has(o.user_id));return i.length?`
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
    `:""}function BI(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function Vh(e,t=pe()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function Wh(e,t,{fresh:n=!1}={}){if(!n&&Cr===e){const o=Re.find(a=>a.user_id===t);if(o)return o}const s=(await Gh(e,!0)).find(o=>o.user_id===t)||null;return SI(e,s),s}let Kh=0,$o=null;async function Pr(e,t=!0){var r;t&&dn(),Vp();const n=++Kh,i=C();if(!i)return;const s=window.location.pathname,o=()=>{var l;return n!==Kh||((l=C())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let a;try{a=await Wh(i.id,e)}catch(l){if(o())return;_("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!o()){if(!a){const l=ft().find(c=>c.id===e);l&&(a=BI(l))}if(!a){k("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),jn("people"),Es("people"),Xd(a),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function DI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function Xd(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=DI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,$o=e;const i=m(e.user_id),s=Vh(e),o=e.user_id===((l=pe())==null?void 0:l.id),a=e.bio?`<div class="person-bio markdown-body">${Hn(e.bio)}</div>`:`<p class="person-bio-empty">${o?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${o?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${Wt(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${u(e.name)}${e.pronouns?`<span class="person-pronouns">${u(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${u(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${u(e.tagline)}</div>`:""}
                <div class="person-role">${u(Rr(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${a}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?EI(e,Re):""}
            ${!e.is_agent||!Ir(e)?MI(e):""}
        </div>
    `,t&&PI(e.user_id),Oh(e)&&Tr(e.user_id)}function MI(e){var i;if(!Oi())return"";const t=Et().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=pe())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u(Rr(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function qr(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function jI(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){Tr(t);return}if(n){Re=Re.filter(o=>o.user_id!==t),_o(t)?O("people"):qr()&&Ki();return}if(i){qr()&&jr();return}_o(t)&&$o?Xd($o):qr()&&Ki()}function RI(e){const{userId:t}=e.detail||{};Re=Re.filter(n=>n.user_id!==t),_o(t)?O("people"):qr()&&Ki()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",jI),window.addEventListener("chaotic:member-removed",RI));const Yh=["in_progress","in_review","todo"];let Qh=0;async function PI(e){const t=C();if(!t)return;const n=++Qh;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:Yh,sort_by:"status",order:"asc",limit:20})}catch(a){i=null,console.error("Failed to load their issues:",a)}if(n!==Qh)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const o=a=>Yh.indexOf(a.status);s.innerHTML=[...i].sort((a,r)=>o(a)-o(r)).map(a=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(a.identifier)}" data-action="person-open-issue" data-identifier="${m(a.identifier)}">
            <span class="person-issue-id">${u(a.identifier)}</span>
            <span class="person-issue-title">${u(a.title)}</span>
            <span class="person-issue-status">${u(String(a.status).replace("_"," "))}</span>
        </a>
    `).join("")}const Jd=["name","avatar_url","pronouns","tagline","bio"];function qI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(Jd.map(n=>[n,t(n,e==null?void 0:e[n])]))}let eu=0;async function NI(e){var l;const t=pe(),n=C();if(!t||!n)return;const i=++eu,s=window.location.pathname;let o;try{o=await Wh(n.id,e,{fresh:!0})}catch(c){i===eu&&_("load this profile",c);return}if(i!==eu||window.location.pathname!==s||((l=C())==null?void 0:l.id)!==n.id||(!o&&e===t.id&&(o={...t,user_id:t.id}),!o||!Vh(o,t)))return;Dr=e,ko=o,Wi=qI(o),Zd++;const a=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=a?"Edit your profile":`Edit ${o.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(o.name)}" maxlength="${Ar.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(o.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${a?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${Eo?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${kl.test(o.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${Eo?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${Jh}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(o.pronouns)}" maxlength="${Ar.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(o.tagline)}" maxlength="${Ar.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${Ar.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${u(o.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Mr?" disabled":""}>Save</button>
        </form>
    `,G()}function OI(e,t=null){const n=o=>{var a;return((a=e.querySelector(`#${o}`))==null?void 0:a.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const o of Jd){const a=t?String(t[o]??""):null;(o==="avatar_url"?i[o]===(a==null?void 0:a.trim()):i[o]===a)||(s[o]=o==="avatar_url"?i[o]||null:i[o])}return s}function Zh(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");Xd(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function _o(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function Xh(){Dr=null,Wi=null,ko=null,F()}async function HI(e){e.preventDefault();const t=Dr;if(!t||Mr)return;const n=e.target.closest("form")||e.target,i=OI(n,Wi);if(!Object.keys(i).length){Xh();return}const s=pe(),o=t===(s==null?void 0:s.id),a=ko,r=Zd,l=n.querySelector('button[type="submit"]');Mr=!0,l&&(l.disabled=!0);try{const c=o?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(Jd.map(p=>[p,(c==null?void 0:c[p])??null]));Re=Re.map(p=>p.user_id===t?{...p,...d}:p),o&&(Ct({...s,...d}),pr()),r===Zd&&Xh(),k("Profile saved","success"),_o(t)?Zh({...a,...d}):Ki()}catch(c){_("save the profile",c)}finally{Mr=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const Jh=256;async function FI(e,t=Jh){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const o=c=>new Promise(d=>s.toBlob(d,c,.9)),a=await o("image/webp");let r=a&&a.type==="image/webp"?a:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await o("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let Eo=!1;function ev(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function UI(e){var i;const t=pe();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(Re=Re.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),Ct({...t,avatar_url:n}),pr(),Dr===t.id&&Wi){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),Wi={...Wi,avatar_url:n||""},ko={...ko,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!kl.test(n||""))}$o&&_o(t.id)&&Zh({...$o,avatar_url:n})}async function tv(e,t,n){if(!Eo){Eo=!0,ev(!0);try{UI(await e()),k(t,"success")}catch(i){_(n,i)}finally{Eo=!1,ev(!1)}}}async function GI(e,t=FI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await tv(async()=>h.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function zI(){return tv(()=>h.deleteAvatar(),"Photo removed","remove the photo")}function tu(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}le({"view-person":(e,t)=>{e.type!=="click"||tu(e)||(e.preventDefault(),Pr(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),NI(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=pe();t&&Pr(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&GI(n)},"remove-profile-photo":e=>{e.type==="click"&&zI()},"save-profile":e=>{HI(e)},"retry-load-people":e=>{e.type==="click"&&jr()},"person-open-issue":(e,t)=>{e.type!=="click"||tu(e)||(e.preventDefault(),oa(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&xI(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await fh(t.connectionId,t.connectionName),Tr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||tu(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(Qd=!!n.checked,jr())}});const VI=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let It=[],Nr=null,Or=null,nu=0;yt(e=>{e==="currentProject"&&B()==="board"&&xo()});async function xo({fromMemory:e=!1}={}){Vo(-1);const t=++nu,n=X();if(!n){const a=document.getElementById("kanban-board");a&&(a.innerHTML=oe().length===0?Y({icon:W.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):Y({icon:W.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=Kl(),o=e?ga("board",s):void 0;o?(It=o,Nr=s,B()==="board"&&Bt(It),Yi()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const a=await h.getIssues({project_id:n});if(t!==nu)return;const r=o&&ha(It,a);It=a,Nr=s,mi("board",s,a),B()==="board"&&Bt(It),r||Yi()}catch(a){if(t!==nu)return;i&&(i.innerHTML=Y({icon:W.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),_("load board",a)}}const iu=my(()=>xo(),200);function Yi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Nr&&mi("board",Nr,It),e.innerHTML=VI.map(i=>{const s=It.filter(o=>o.status===i.key);return`
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
                    `:s.map(WI).join("")}
                </div>
            </div>
        `}).join(""),KI(t)}function WI(e){const t=e.assignee_id?kt(e.assignee_id):null,n=t?mt(t):null,i=e.estimate!=null?cn(e.estimate,e.project_id):"",s=na(e.estimate,e.project_id),o=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${u(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Wt(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${u(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(Te(e.priority))}">${ht(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${u(i)}</span>`:""}
                ${o.map(a=>`<span class="issue-label" title="${m(a.name)}" style="background: ${ae(a.color)}20; color: ${ae(a.color)}">${u(a.name)}</span>`).join("")}
            </div>
        </div>
    `}function KI(e){const t=yp();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Vo(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Vo(i),n[i].classList.add("keyboard-selected")}function YI(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Or=t.dataset.id,t.classList.add("dragging")}function QI(e,t){t.classList.remove("dragging"),Or=null}function nv(e){const t=It.find(n=>n.id===Or);return!!t&&t.status===e}function ZI(e,t){e.preventDefault(),!nv(t.dataset.status)&&t.classList.add("drag-over")}function XI(e,t){t.classList.remove("drag-over")}function JI(e,t){e.preventDefault();const n=It.find(i=>i.id===t.dataset.id);n&&nv(n.status)||t.classList.add("drag-over")}function e1(e,t){t.classList.remove("drag-over")}async function t1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=It.find(a=>a.id===n);if(!s)return;const o=s.status;if(o!==i){s.status=i,Yi();try{const a=await h.updateIssue(n,{status:i});k("Status updated","success"),Hs(a)}catch(a){s.status=o,Yi(),_("update status",a)}}}async function n1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Or||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),o=s==null?void 0:s.dataset.status;if(!o)return;const a=It.find(l=>l.id===n);if(!a)return;const r=a.status;if(r!==o){a.status=o,Yi();try{const l=await h.updateIssue(n,{status:o});k("Status updated","success"),Hs(l)}catch(l){a.status=r,Yi(),_("update status",l)}}}le({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),de(t.id)):e.type==="dragstart"?YI(e,n):e.type==="dragend"?QI(e,n):e.type==="dragover"?JI(e,n):e.type==="dragleave"?e1(e,n):e.type==="drop"&&n1(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?ZI(e,n):e.type==="dragleave"?XI(e,n):e.type==="drop"&&t1(e,n)},"retry-load-board":()=>xo()});const Tn=new Map,iv=6e4,su=100;let Pe=null,Hr=null,Fr=null,So=null,sv=!1;const ov={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},av={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},rv={api:null};let ou={...rv};function i1(e={}){ou={...rv,...e},Pe||(Pe=document.createElement("div"),Pe.className="issue-tooltip",Pe.style.display="none",document.body.appendChild(Pe),Pe.addEventListener("mouseenter",()=>{clearTimeout(Hr)}),Pe.addEventListener("mouseleave",()=>{au()})),sv||(document.addEventListener("mouseover",s1),document.addEventListener("mouseout",o1),sv=!0)}function s1(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=a1(t);if(n){if(n===So&&Pe.style.display!=="none"){clearTimeout(Hr);return}clearTimeout(Fr),Fr=setTimeout(()=>{r1(t,n)},200)}}function o1(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Fr),Hr=setTimeout(()=>{au()},150))}function a1(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function r1(e,t){So=t;const n=e.getBoundingClientRect();Pe.style.left=`${n.left+window.scrollX}px`,Pe.style.top=`${n.bottom+window.scrollY+8}px`,Pe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Pe.style.display="block";try{const i=await c1(t);if(So!==t)return;d1(i)}catch{if(So!==t)return;Pe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function au(){clearTimeout(Fr),clearTimeout(Hr),Pe&&(Pe.style.display="none"),So=null}function l1(){const e=Date.now();for(const[t,n]of Tn.entries())e-n.timestamp>=iv&&Tn.delete(t)}async function c1(e){Tn.size>su/2&&l1();const t=Tn.get(e);if(t&&Date.now()-t.timestamp<iv)return t.issue;if(!ou.api)throw new Error("API not initialized");const n=await ou.api.getIssueByIdentifier(e);if(Tn.size>=su){const i=Array.from(Tn.entries());i.sort((o,a)=>o[1].timestamp-a[1].timestamp);const s=i.slice(0,su/2);for(const[o]of s)Tn.delete(o)}return Tn.set(e,{issue:n,timestamp:Date.now()}),n}function d1(e){const t=ov[e.status]||ov.backlog,n=av[e.priority]||av.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Pe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${u1(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${p1(e.priority)}</span>
        </div>
    `}function u1(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function p1(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function lv(){return!!document.querySelector(".description-inline-editor")}function ru(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function lu(){var e;return ru("issue-detail-view")?((e=_e())==null?void 0:e.id)??null:null}function ei(e){return!!e&&lu()===e}function m1(){Ve("issue:created",y1),Ve("issue:updated",w1),Ve("issue:deleted",k1),Ve("comment",E1),Ve("relation",S1),Ve("attestation",I1),Ve("activity",T1),Ve("project",A1),Ve("sprint",C1),Ve("document",x1),Ve("inbox",L1),Ve("connection:reconnected",B1),Ve("connection:unauthorized",g1),Ve("connection:forbidden",h1),Ve("connection:superseded",f1)}function f1(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function g1(){h.logout(),Ct(null),ai(null),fo(),k("Your session has ended. Please sign in again.","warning")}function h1(){k("Live updates stopped: you no longer have access to this team.","error")}function cv(e,t){var n;return e&&e===((n=pe())==null?void 0:n.id)?"You":t||"Someone"}function v1(e){var s;const t=cv(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(dt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Te(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=pe())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function b1(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${cv(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function dv(e,t,n){const i=k(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const o=()=>{var a;(a=i.querySelector(".toast-close"))==null||a.click(),Promise.resolve(de(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",o),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),o())})}}}function y1(e){var s;Cs(B(),"board","sprints","epics");const t=ie(),n=t.findIndex(o=>o.id===e.id),i=t.findIndex(o=>o._isOptimistic&&o.title===e.title);if(!(n>=0))if(i>=0){const o=[...t];o[i]=e,tt(o),B()==="issues"&&gt()}else tt([e,...t]),B()==="issues"&&gt(),dv(e,v1(e),"info");if(e.assignee_id===((s=pe())==null?void 0:s.id)){const o=We(),a=o.findIndex(l=>l.id===e.id),r=o.findIndex(l=>l._isOptimistic&&l.title===e.title);if(a===-1&&r===-1)zn([e,...o]),B()==="my-issues"&&Vn();else if(r>=0){const l=[...o];l[r]=e,zn(l),B()==="my-issues"&&Vn()}}B()==="board"?iu():B()==="sprints"?Io():B()==="epics"&&Sn(),ei(e.parent_id)&&ti(e.parent_id)}function w1(e){Cs(B(),"board","sprints","epics"),ca(e);const t=ie();t.some(s=>s.id===e.id)&&tt(t.map(s=>s.id===e.id?e:s));const n=We();n.some(s=>s.id===e.id)&&zn(n.map(s=>s.id===e.id?e:s));const i=ys();i.some(s=>s.id===e.id)&&Bt(i.map(s=>s.id===e.id?e:s)),B()==="issues"?gt():B()==="my-issues"?Vn():B()==="board"?iu():B()==="sprints"?Io():B()==="epics"&&Sn(),ei(e.id)&&(lv()?Xc(e):ti(e.id))}function k1(e){var s,o;const t=e.title??((s=ie().find(a=>a.id===e.id))==null?void 0:s.title)??((o=We().find(a=>a.id===e.id))==null?void 0:o.title);Cs(B(),"board","sprints","epics"),ww(e.id),tt(ie().filter(a=>a.id!==e.id)),zn(We().filter(a=>a.id!==e.id));const n=ys();n.some(a=>a.id===e.id)&&Bt(n.filter(a=>a.id!==e.id)),B()==="issues"?gt():B()==="my-issues"?(Vn(),yi({showLoading:!1})):B()==="board"?iu():B()==="sprints"?Io():B()==="epics"&&Sn();const i=ei(e.id);dv(null,b1(e,t),i?"warning":"info"),i&&O("my-issues")}const uv=250,$1=1e3,Qi=new Map;function ti(e){lv()?Xc():cu(e,uv)}function cu(e,t){let n=Qi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Qi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>_1(e),t))}async function _1(e){const t=Qi.get(e);if(!t)return;if(t.timer=null,!ei(e)){Qi.delete(e);return}t.inFlight=!0;let n;try{n=await de(e,!1,{refresh:!0})}finally{t.inFlight=!1}Qi.get(e)===t&&(t.again?(t.again=!1,cu(e,uv)):n==="retry"?cu(e,$1):Qi.delete(e))}function E1(e){B()==="my-issues"&&yi({showLoading:!1}),ei(e.issue_id)&&ti(e.issue_id),e.document_id&&Tm(e.document_id)}function x1(e,{type:t}={}){Cs(B(),"documents"),Lm(),t==="deleted"?ok(e.id,e.title):Tm(e.id)}function S1(e){const t=lu();t&&(e.source_issue_id===t||e.target_issue_id===t)&&ti(t)}function I1(e){ei(e.issue_id)&&ti(e.issue_id)}function L1(e,t){var n;e.recipient_user_id===((n=pe())==null?void 0:n.id)&&(Ri(),ux(t==null?void 0:t.type,e),B()==="inbox"&&!fx(t==null?void 0:t.type,e)&&qi({background:!0}))}function T1(e){B()==="my-issues"&&yi({showLoading:!1}),ei(e.issue_id)&&ti(e.issue_id)}function A1(e,{type:t}){pt().then(()=>{B()==="projects"&&qn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function Io(){const e=Ck();e&&ru("sprint-detail-view")?vi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):ru("sprints-view")&&pn().catch(t=>console.error("Failed to reload sprints:",t))}function C1(e,{type:t}={}){if(Cs(B(),"sprints"),qm(),B()==="sprints"?Io():B()==="my-issues"&&qs(),t==="created")k(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";k(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function B1(){const e=B();Yl(),Ri(),e==="issues"?Rt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(bi().catch(n=>console.error("Failed to resync my issues:",n)),qs().catch(n=>console.error("Failed to resync sprint status:",n)),yi({showLoading:!1})):e==="board"?xo():e==="sprints"?Io():e==="epics"?Sn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?pt().then(()=>{B()==="projects"&&qn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Lm():e==="inbox"&&qi({background:!0});const t=lu();t&&ti(t)}const D1='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function pv(e){return Array.from(e.querySelectorAll(D1)).filter(t=>!t.closest(".hidden, [hidden]"))}function mv(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function M1(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),mv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=pv(t);n&&n.focus()}}}function Lo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),mv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=pv(n);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Lo()});async function j1(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=X();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const o="temp-"+Date.now(),a=oe().find(c=>c.id===i),r={id:o,title:n,identifier:`${(a==null?void 0:a.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};tt([r,...ie()]),gt();const l=document.querySelector(`[data-id="${o}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ie();d.some(p=>p.id===c.id)?tt(d.filter(p=>p.id!==o)):d.some(p=>p.id===o)&&tt(d.map(p=>p.id===o?c:p)),gt(),pt(),k("Issue created!","success")}catch(c){tt(ie().filter(d=>d.id!==o)),gt(),_("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Qy({beforeScrollRestore:Ac,beforeNavigate:()=>{VE(),Py(),ri(null),kp(null),Lo(),au(),ea()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Ch(e[1]),!0;if(e[0]==="issue"&&e[1])return Xa(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Xa(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}if(e[0]==="document"&&e[1])return V1(e[1]),!0;if(e[0]==="sprint"&&e[1])return Mk(e[1]),!0;if(e[0]==="people"&&e[1])return Pr(decodeURIComponent(e[1]),!1),!0;if(e[0]==="projects"&&e[1]&&e[2]==="settings"){const t=new URLSearchParams(window.location.search).get("tab")||void 0;return ia(decodeURIComponent(e[1]),{tab:t,replace:!0}),!0}return!1},detailPopstate:e=>e.epicId?(xr(e.epicId,!1),!0):e.issueId?(de(e.issueId,!1),!0):e.identifier?(Xa(e.identifier),!0):e.documentId?(De(e.documentId,!1),!0):e.sprintId?(vi(e.sprintId,!1),!0):e.personId?(Pr(e.personId,!1),!0):e.settingsProjectId?(ia(e.settingsProjectId,{tab:e.tab,replace:!0}),!0):!1,restoreProject:()=>{const e=Hp();e&&oe().some(t=>t.id===e)&&wt(e)},issueNavigate:e=>Xa(e),epicNavigate:e=>Ch(e)}),Yy({"my-issues":()=>{qs(),bi(),yi()},inbox:()=>{$x(),qi({focusFirst:!0})},issues:()=>{var r;r_(),p_(),g_();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Kn().length>0||Yn().length>0;s||Rt();const o=rf().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Aa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Ca())}}),a=xf().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([o,a]).then(()=>Rt()):(o.catch(l=>console.error("Failed to populate label filter:",l)),a.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{W0()},epics:()=>{Sn({fromMemory:!0})},board:()=>{xo({fromMemory:!0})},projects:()=>{qn(),pt().then(qn)},sprints:()=>{pn({fromMemory:!0})},rituals:()=>{um()},documents:()=>{Gn(null,null,{fromMemory:!0})},people:jr,settings:()=>{Cd(),mh(),gh(),Ls()}});function R1(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||F()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>F())}function P1(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Np(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>qy());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Ny()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,o])=>{const a=e.querySelector(`#${s} .btn-primary`);a&&a.addEventListener("click",()=>Hy(o))})}function q1(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>xm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>xm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Sm());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>ek());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Xt())}function N1(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Um())}function O1(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>f_());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Y$());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Q$()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Ma("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Ma("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Ma("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Ma("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>ja())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ra())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Sc())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ic())}const o=document.getElementById("label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>Pa())}const a=document.getElementById("exclude-label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>qa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>rt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>rt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>rt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Rt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>Cf());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>j1(g))}function H1(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>jg());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Os()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(a=>{a.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(a.dataset.view),r.detail>0&&Bh())})}),document.querySelectorAll(".issues-layout-toggle a[data-view]").forEach(a=>{a.addEventListener("click",r=>{var c;if(r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0)return;r.preventDefault();const l=a.dataset.view;B()!==l&&O(l),(c=document.querySelector(`#${l}-view .issues-layout-toggle a[data-view="${l}"]`))==null||c.focus()})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Xx());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Lo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>M1());const o=document.querySelector(".mobile-fab");o&&o.addEventListener("click",()=>Os())}function F1(e){Lo(),In()&&O(B()),B()==="query"?F0(e):e?wt(e):Ap()}function fv(){return pI(document.getElementById(Jo),{returnFocus:!0})}le({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&F1(n.value)},showCreateIssueModal:()=>Os(),showCreateEpicModal:()=>X0(),"retry-load-epics":()=>Sn(),showCreateProjectModal:()=>Mp(),showCreateDocumentModal:()=>Cm(),showCreateTeamModal:()=>Fg(),showEditTeamModal:()=>pS(),showInviteModal:()=>Ng(),showCreateApiKeyModal:()=>m0(),showCreateAgentModal:()=>lw(),resetOnboarding:()=>Yg(),logout:()=>ph(),navigateToProjects:()=>O("projects")});async function U1(){if(!h.getToken()){await rh();return}Wp();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await iy(cp(h.getToken()));if(n){t.then(i=>{Ct(i),pr()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await yl(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),k("Showing saved data — check your connection and reload","error")}),Ct(n.user),await Jn({teamsRequest:e,snapshot:n});return}try{const i=await t;Ct(i),await Jn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await rh();return}console.error("Failed to load current user on boot:",i),fo(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;Ey(),X_(),u0(),H1(),R1(),N1(),O1(),P1(),q1(),G1(),mI(),(e=document.querySelector(`[data-picker-for="${Jo}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),z1(),i1({api:h}),m1(),await U1()});function G1(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Ob()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Hb(n?"light":"dark")})}function z1(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");oa(i)}}})}async function V1(e){try{await De(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",nI({getCurrentView:B,getSelectedIndex:vp,setSelectedIndex:Rn,viewIssue:de,showEditIssueModal:lg,showInlineDropdown:$c,isInlineDropdownOpen:ki,isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In,beforeNavigate:Ac})),document.addEventListener("keydown",iI({getCurrentView:B,getSelectedIndex:gy,setSelectedIndex:bp,viewDocument:De,showEditDocumentModal:Bm,isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In})),document.addEventListener("keydown",oI({getCurrentView:B,getSelectedIndex:yp,setSelectedIndex:Vo,viewIssue:de,isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In})),document.addEventListener("keydown",sI({getCurrentView:B,getSelectedIndex:hy,setSelectedIndex:Wo,toggleInboxExpand:zx,collapseInboxExpand:vx,archiveInboxEntry:Gx,isInlineDropdownOpen:ki,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In})),document.addEventListener("keydown",aI()),document.addEventListener("keydown",Wd({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&vi(e.dataset.sprintId)},getCurrentView:B,getSelectedIndex:vy,setSelectedIndex:wp,isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In})),document.addEventListener("keydown",Wd({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Kp(e.dataset.identifier)},getCurrentView:B,getSelectedIndex:by,setSelectedIndex:El,isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In})),document.addEventListener("keydown",Wd({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:B,getSelectedIndex:Jk,setSelectedIndex:e$,isInlineDropdownOpen:ki,isModalOpen:ze,isCommandPaletteOpen:xn,isDetailViewActive:In}));function gv(){var e;O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function W1(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||Qw()}document.addEventListener("keydown",eI({closeModal:F,closeSidebar:Lo,navigateTo:O,openProjectSwitcher:fv,showCreateIssueModal:Os,showKeyboardShortcutsHelp:yh,isModalOpen:ze,focusSearch:gv,isInlineDropdownOpen:ki,closeInlineDropdowns:py,isModalDirty:dy,focusModalField:pp,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Ei();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:W1,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),$0([{id:"nav-my-issues",title:"Home",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"Issues laid out by status",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>fv(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"The rituals tabs in Project settings",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Approvals, mentions and assignments awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(Os,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(Mp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(Cm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Fg(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:gv,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(Ng,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>yh(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Yg(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>ph(),category:"Account"}]),document.addEventListener("keydown",tI({isModalOpen:ze,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:xn,openCommandPalette:_0,closeCommandPalette:gr})),window.marked=Q,window.DOMPurify=Xu,console.log("Chaotic frontend loaded via Vite")})();
