var MT=Object.defineProperty;var jT=(zt,He,Bn)=>He in zt?MT(zt,He,{enumerable:!0,configurable:!0,writable:!0,value:Bn}):zt[He]=Bn;var de=(zt,He,Bn)=>jT(zt,typeof He!="symbol"?He+"":He,Bn);(function(){"use strict";var vu;function zt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var He=zt();function Bn(e){He=e}var cs={exec:()=>null};function te(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Fe.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var Fe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qv=/^(?:[ \t]*(?:\n|$))+/,Zv=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xv=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ds=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jv=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,tl=/(?:[*+-]|\d{1,9}[.)])/,Bu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Du=te(Bu).replace(/bull/g,tl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),eb=te(Bu).replace(/bull/g,tl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),nl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tb=/^[^\n]+/,il=/(?!\s*\])(?:\\.|[^\[\]\\])+/,nb=te(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",il).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ib=te(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,tl).getRegex(),Fo="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",sl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sb=te("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",sl).replace("tag",Fo).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mu=te(nl).replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex(),ob=te(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mu).getRegex(),ol={blockquote:ob,code:Zv,def:nb,fences:Xv,heading:Jv,hr:ds,html:sb,lheading:Du,list:ib,newline:Qv,paragraph:Mu,table:cs,text:tb},ju=te("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex(),ab={...ol,lheading:eb,table:ju,paragraph:te(nl).replace("hr",ds).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ju).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fo).getRegex()},rb={...ol,html:te(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",sl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:cs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:te(nl).replace("hr",ds).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Du).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ru=/^( {2,}|\\)\n(?!\s*$)/,db=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Uo=/[\p{P}\p{S}]/u,al=/[\s\p{P}\p{S}]/u,Pu=/[^\s\p{P}\p{S}]/u,ub=te(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,al).getRegex(),qu=/(?!~)[\p{P}\p{S}]/u,pb=/(?!~)[\s\p{P}\p{S}]/u,mb=/(?:[^\s\p{P}\p{S}]|~)/u,fb=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Nu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,gb=te(Nu,"u").replace(/punct/g,Uo).getRegex(),hb=te(Nu,"u").replace(/punct/g,qu).getRegex(),Ou="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vb=te(Ou,"gu").replace(/notPunctSpace/g,Pu).replace(/punctSpace/g,al).replace(/punct/g,Uo).getRegex(),bb=te(Ou,"gu").replace(/notPunctSpace/g,mb).replace(/punctSpace/g,pb).replace(/punct/g,qu).getRegex(),yb=te("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Pu).replace(/punctSpace/g,al).replace(/punct/g,Uo).getRegex(),wb=te(/\\(punct)/,"gu").replace(/punct/g,Uo).getRegex(),$b=te(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kb=te(sl).replace("(?:-->|$)","-->").getRegex(),_b=te("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Go=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Eb=te(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Go).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Hu=te(/^!?\[(label)\]\[(ref)\]/).replace("label",Go).replace("ref",il).getRegex(),Fu=te(/^!?\[(ref)\](?:\[\])?/).replace("ref",il).getRegex(),xb=te("reflink|nolink(?!\\()","g").replace("reflink",Hu).replace("nolink",Fu).getRegex(),rl={_backpedal:cs,anyPunctuation:wb,autolink:$b,blockSkip:fb,br:Ru,code:cb,del:cs,emStrongLDelim:gb,emStrongRDelimAst:vb,emStrongRDelimUnd:yb,escape:lb,link:Eb,nolink:Fu,punctuation:ub,reflink:Hu,reflinkSearch:xb,tag:_b,text:db,url:cs},Ib={...rl,link:te(/^!?\[(label)\]\((.*?)\)/).replace("label",Go).getRegex(),reflink:te(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Go).getRegex()},ll={...rl,emStrongRDelimAst:bb,emStrongLDelim:hb,url:te(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Sb={...ll,br:te(Ru).replace("{2,}","*").getRegex(),text:te(ll.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},zo={normal:ol,gfm:ab,pedantic:rb},us={normal:rl,gfm:ll,breaks:Sb,pedantic:Ib},Tb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Uu=e=>Tb[e];function Tt(e,t){if(t){if(Fe.escapeTest.test(e))return e.replace(Fe.escapeReplace,Uu)}else if(Fe.escapeTestNoEncode.test(e))return e.replace(Fe.escapeReplaceNoEncode,Uu);return e}function Gu(e){try{e=encodeURI(e).replace(Fe.percentDecode,"%")}catch{return null}return e}function zu(e,t){var o;const n=e.replace(Fe.findPipe,(a,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Fe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((o=i.at(-1))!=null&&o.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Fe.slashPipe,"|");return i}function ps(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Lb(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Vu(e,t,n,i,s){const o=t.href,a=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Ab(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(o=>{const a=o.match(n.other.beginningSpace);if(a===null)return o;const[r]=a;return r.length>=s.length?o.slice(s.length):o}).join(`
`)}var Vo=class{constructor(e){de(this,"options");de(this,"rules");de(this,"lexer");this.options=e||He}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ps(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Ab(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=ps(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ps(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=ps(t[0],`
`).split(`
`),i="",s="";const o=[];for(;n.length>0;){let a=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),a=!0;else if(!a)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,n.length===0)break;const f=o.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,v=g.raw+`
`+n.join(`
`),y=this.blockquote(v);o[o.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,v=g.raw+`
`+n.join(`
`),y=this.list(v);o[o.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const o=this.rules.other.listItemRegex(n);let a=!1;for(;e;){let l=!1,c="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,x=>" ".repeat(3*x.length)),f=e.split(`
`,1)[0],g=!p.trim(),v=0;if(this.options.pedantic?(v=2,d=p.trimStart()):g?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,d=p.slice(v),v+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const x=this.rules.other.nextBulletRegex(v),w=this.rules.other.hrRegex(v),_=this.rules.other.fencesBeginRegex(v),B=this.rules.other.headingBeginRegex(v),G=this.rules.other.htmlBeginRegex(v);for(;e;){const C=e.split(`
`,1)[0];let q;if(f=C,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),q=f):q=f.replace(this.rules.other.tabCharGlobal,"    "),_.test(f)||B.test(f)||G.test(f)||x.test(f)||w.test(f))break;if(q.search(this.rules.other.nonSpaceChar)>=v||!f.trim())d+=`
`+q.slice(v);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||_.test(p)||B.test(p)||w.test(p))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=C+`
`,e=e.substring(C.length+1),p=q.slice(v)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0));let y=null,k;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(k=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:k,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var a;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=zu(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?o.align.push("right"):this.rules.other.tableAlignCenter.test(r)?o.align.push("center"):this.rules.other.tableAlignLeft.test(r)?o.align.push("left"):o.align.push(null);for(let r=0;r<n.length;r++)o.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:o.align[r]});for(const r of s)o.rows.push(zu(r,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const o=ps(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{const o=Lb(t[2],"()");if(o===-2)return;if(o>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const o=this.rules.other.pedanticHrefTitle.exec(i);o&&(i=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Vu(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Vu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const o=[...i[0]].length-1;let a,r,l=o,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(i=d.exec(t))!=null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(r=[...a].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&o%3&&!((o+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const p=[...i[0]][0].length,f=e.slice(0,o+i.index+p+r);if(Math.min(o,r)%2){const v=f.slice(1,-1);return{type:"em",raw:f,text:v,tokens:this.lexer.inlineTokens(v)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let o;do o=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(o!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Vt=class Au{constructor(t){de(this,"tokens");de(this,"options");de(this,"state");de(this,"tokenizer");de(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||He,this.options.tokenizer=this.options.tokenizer||new Vo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Fe,block:zo.normal,inline:us.normal};this.options.pedantic?(n.block=zo.pedantic,n.inline=us.pedantic):this.options.gfm&&(n.block=zo.gfm,this.options.breaks?n.inline=us.breaks:n.inline=us.gfm),this.tokenizer.rules=n}static get rules(){return{block:zo,inline:us}}static lex(t,n){return new Au(n).lex(t)}static lexInline(t,n){return new Au(n).inlineTokens(t)}lex(t){t=t.replace(Fe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,o,a;for(this.options.pedantic&&(t=t.replace(Fe.tabCharGlobal,"    ").replace(Fe.spaceLine,""));t;){let r;if((o=(s=this.options.extensions)==null?void 0:s.block)!=null&&o.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let o=!1,a="";for(;t;){o||(a=""),o=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,a)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let v;this.options.extensions.startInline.forEach(y=>{v=y.call({lexer:this},g),typeof v=="number"&&v>=0&&(f=Math.min(f,v))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(a=d.raw.slice(-1)),o=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Ko=class{constructor(e){de(this,"options");de(this,"parser");this.options=e||He}space(e){return""}code({text:e,lang:t,escaped:n}){var o;const i=(o=(t||"").match(Fe.notSpaceStart))==null?void 0:o[0],s=e.replace(Fe.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Tt(i)+'">'+(n?s:Tt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Tt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let a=0;a<e.items.length;a++){const r=e.items[a];i+=this.listitem(r)}const s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Tt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Tt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=Gu(e);if(s===null)return i;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Tt(t)+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=Gu(e);if(s===null)return Tt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Tt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Tt(e.text)}},cl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Kt=class Cu{constructor(t){de(this,"options");de(this,"renderer");de(this,"textRenderer");this.options=t||He,this.options.renderer=this.options.renderer||new Ko,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cl}static parse(t,n){return new Cu(n).parse(t)}static parseInline(t,n){return new Cu(n).parseInline(t)}parse(t,n=!0){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;a+1<t.length&&t[a+1].type==="text";)c=t[++a],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,o;let i="";for(let a=0;a<t.length;a++){const r=t[a];if((o=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&o[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Wo=(vu=class{constructor(e){de(this,"options");de(this,"block");this.options=e||He}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Vt.lex:Vt.lexInline}provideParser(){return this.block?Kt.parse:Kt.parseInline}},de(vu,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),vu),Cb=class{constructor(...e){de(this,"defaults",zt());de(this,"options",this.setOptions);de(this,"parse",this.parseMarkdown(!0));de(this,"parseInline",this.parseMarkdown(!1));de(this,"Parser",Kt);de(this,"Renderer",Ko);de(this,"TextRenderer",cl);de(this,"Lexer",Vt);de(this,"Tokenizer",Vo);de(this,"Hooks",Wo);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{const a=o;for(const r of a.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of a.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const a=o;n=n.concat(this.walkTokens(a.items,t));break}default:{const a=o;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{const l=a[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let r=s.renderer.apply(this,a);return r===!1&&(r=o.apply(this,a)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Ko(this.defaults);for(const o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const a=o,r=n.renderer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Vo(this.defaults);for(const o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const a=o,r=n.tokenizer[a],l=s[a];s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Wo;for(const o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const a=o,r=n.hooks[a],l=s[a];Wo.passThroughHooks.has(o)?s[a]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(p=>l.call(s,p));const d=r.call(s,c);return l.call(s,d)}:s[a]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,o=n.walkTokens;i.walkTokens=function(a){let r=[];return r.push(o.call(this,a)),s&&(r=r.concat(s.call(this,a))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Vt.lex(e,t??this.defaults)}parser(e,t){return Kt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},o={...this.defaults,...s},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const r=o.hooks?o.hooks.provideLexer():e?Vt.lex:Vt.lexInline,l=o.hooks?o.hooks.provideParser():e?Kt.parse:Kt.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(n):n).then(c=>r(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>l(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(a);try{o.hooks&&(n=o.hooks.preprocess(n));let c=r(n,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let d=l(c,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(c){return a(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Tt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Dn=new Cb;function Q(e,t){return Dn.parse(e,t)}Q.options=Q.setOptions=function(e){return Dn.setOptions(e),Q.defaults=Dn.defaults,Bn(Q.defaults),Q},Q.getDefaults=zt,Q.defaults=He,Q.use=function(...e){return Dn.use(...e),Q.defaults=Dn.defaults,Bn(Q.defaults),Q},Q.walkTokens=function(e,t){return Dn.walkTokens(e,t)},Q.parseInline=Dn.parseInline,Q.Parser=Kt,Q.parser=Kt.parse,Q.Renderer=Ko,Q.TextRenderer=cl,Q.Lexer=Vt,Q.lexer=Vt.lex,Q.Tokenizer=Vo,Q.Hooks=Wo,Q.parse=Q,Q.options,Q.setOptions,Q.use,Q.walkTokens,Q.parseInline,Kt.parse,Vt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Ku,setPrototypeOf:Wu,isFrozen:Bb,getPrototypeOf:Db,getOwnPropertyDescriptor:Mb}=Object;let{freeze:Ue,seal:dt,create:dl}=Object,{apply:ul,construct:pl}=typeof Reflect<"u"&&Reflect;Ue||(Ue=function(t){return t}),dt||(dt=function(t){return t}),ul||(ul=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),o=2;o<i;o++)s[o-2]=arguments[o];return t.apply(n,s)}),pl||(pl=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Yo=ze(Array.prototype.forEach),jb=ze(Array.prototype.lastIndexOf),Yu=ze(Array.prototype.pop),ms=ze(Array.prototype.push),Rb=ze(Array.prototype.splice),Qo=ze(String.prototype.toLowerCase),ml=ze(String.prototype.toString),fl=ze(String.prototype.match),fs=ze(String.prototype.replace),Pb=ze(String.prototype.indexOf),qb=ze(String.prototype.trim),bt=ze(Object.prototype.hasOwnProperty),Ge=ze(RegExp.prototype.test),gs=Nb(TypeError);function ze(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ul(e,t,i)}}function Nb(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return pl(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qo;Wu&&Wu(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const o=n(s);o!==s&&(Bb(t)||(t[i]=o),s=o)}e[s]=!0}return e}function Ob(e){for(let t=0;t<e.length;t++)bt(e,t)||(e[t]=null);return e}function Lt(e){const t=dl(null);for(const[n,i]of Ku(e))bt(e,n)&&(Array.isArray(i)?t[n]=Ob(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Lt(i):t[n]=i);return t}function hs(e,t){for(;e!==null;){const i=Mb(e,t);if(i){if(i.get)return ze(i.get);if(typeof i.value=="function")return ze(i.value)}e=Db(e)}function n(){return null}return n}const Qu=Ue(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gl=Ue(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),hl=Ue(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hb=Ue(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),vl=Ue(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fb=Ue(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Zu=Ue(["#text"]),Xu=Ue(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),bl=Ue(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ju=Ue(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Zo=Ue(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ub=dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Gb=dt(/<%[\w\W]*|[\w\W]*%>/gm),zb=dt(/\$\{[\w\W]*/gm),Vb=dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Kb=dt(/^aria-[\-\w]+$/),ep=dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wb=dt(/^(?:\w+script|data):/i),Yb=dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),tp=dt(/^html$/i),Qb=dt(/^[a-z][.\w]*(-[.\w]+)+$/i);var np=Object.freeze({__proto__:null,ARIA_ATTR:Kb,ATTR_WHITESPACE:Yb,CUSTOM_ELEMENT:Qb,DATA_ATTR:Vb,DOCTYPE_NAME:tp,ERB_EXPR:Gb,IS_ALLOWED_URI:ep,IS_SCRIPT_OR_DATA:Wb,MUSTACHE_EXPR:Ub,TMPLIT_EXPR:zb});const vs={element:1,text:3,progressingInstruction:7,comment:8,document:9},Zb=function(){return typeof window>"u"?null:window},Xb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const o="dompurify"+(i?"#"+i:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ip=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function sp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Zb();const t=R=>sp(R);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==vs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,v=l.prototype,y=hs(v,"cloneNode"),k=hs(v,"remove"),x=hs(v,"nextSibling"),w=hs(v,"childNodes"),_=hs(v,"parentNode");if(typeof a=="function"){const R=n.createElement("template");R.content&&R.content.ownerDocument&&(n=R.content.ownerDocument)}let B,G="";const{implementation:C,createNodeIterator:q,createDocumentFragment:F,getElementsByTagName:Y}=n,{importNode:ee}=i;let Z=ip();t.isSupported=typeof Ku=="function"&&typeof _=="function"&&C&&C.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:I,ERB_EXPR:D,TMPLIT_EXPR:M,DATA_ATTR:X,ARIA_ATTR:N,IS_SCRIPT_OR_DATA:Ie,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:ve}=np;let{IS_ALLOWED_URI:ct}=np,ce=null;const pe=z({},[...Qu,...gl,...hl,...vl,...Zu]);let Re=null;const Lv=z({},[...Xu,...bl,...Ju,...Zo]);let be=Object.seal(dl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),No=null,bu=null;const ns=Object.seal(dl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Av=!0,yu=!0,Cv=!1,Bv=!0,is=!1,Wr=!0,ii=!1,wu=!1,$u=!1,ss=!1,Yr=!1,Qr=!1,Dv=!0,Mv=!1;const IT="user-content-";let ku=!0,Oo=!1,os={},Ut=null;const _u=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let jv=null;const Rv=z({},["audio","video","img","source","image","track"]);let Eu=null;const Pv=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Zr="http://www.w3.org/1998/Math/MathML",Xr="http://www.w3.org/2000/svg",ln="http://www.w3.org/1999/xhtml";let as=ln,xu=!1,Iu=null;const ST=z({},[Zr,Xr,ln],ml);let Jr=z({},["mi","mo","mn","ms","mtext"]),el=z({},["annotation-xml"]);const TT=z({},["title","style","font","a","script"]);let Ho=null;const LT=["application/xhtml+xml","text/html"],AT="text/html";let Se=null,rs=null;const CT=n.createElement("form"),qv=function(b){return b instanceof RegExp||b instanceof Function},Su=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(rs&&rs===b)){if((!b||typeof b!="object")&&(b={}),b=Lt(b),Ho=LT.indexOf(b.PARSER_MEDIA_TYPE)===-1?AT:b.PARSER_MEDIA_TYPE,Se=Ho==="application/xhtml+xml"?ml:Qo,ce=bt(b,"ALLOWED_TAGS")?z({},b.ALLOWED_TAGS,Se):pe,Re=bt(b,"ALLOWED_ATTR")?z({},b.ALLOWED_ATTR,Se):Lv,Iu=bt(b,"ALLOWED_NAMESPACES")?z({},b.ALLOWED_NAMESPACES,ml):ST,Eu=bt(b,"ADD_URI_SAFE_ATTR")?z(Lt(Pv),b.ADD_URI_SAFE_ATTR,Se):Pv,jv=bt(b,"ADD_DATA_URI_TAGS")?z(Lt(Rv),b.ADD_DATA_URI_TAGS,Se):Rv,Ut=bt(b,"FORBID_CONTENTS")?z({},b.FORBID_CONTENTS,Se):_u,No=bt(b,"FORBID_TAGS")?z({},b.FORBID_TAGS,Se):Lt({}),bu=bt(b,"FORBID_ATTR")?z({},b.FORBID_ATTR,Se):Lt({}),os=bt(b,"USE_PROFILES")?b.USE_PROFILES:!1,Av=b.ALLOW_ARIA_ATTR!==!1,yu=b.ALLOW_DATA_ATTR!==!1,Cv=b.ALLOW_UNKNOWN_PROTOCOLS||!1,Bv=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,is=b.SAFE_FOR_TEMPLATES||!1,Wr=b.SAFE_FOR_XML!==!1,ii=b.WHOLE_DOCUMENT||!1,ss=b.RETURN_DOM||!1,Yr=b.RETURN_DOM_FRAGMENT||!1,Qr=b.RETURN_TRUSTED_TYPE||!1,$u=b.FORCE_BODY||!1,Dv=b.SANITIZE_DOM!==!1,Mv=b.SANITIZE_NAMED_PROPS||!1,ku=b.KEEP_CONTENT!==!1,Oo=b.IN_PLACE||!1,ct=b.ALLOWED_URI_REGEXP||ep,as=b.NAMESPACE||ln,Jr=b.MATHML_TEXT_INTEGRATION_POINTS||Jr,el=b.HTML_INTEGRATION_POINTS||el,be=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&qv(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&qv(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),is&&(yu=!1),Yr&&(ss=!0),os&&(ce=z({},Zu),Re=[],os.html===!0&&(z(ce,Qu),z(Re,Xu)),os.svg===!0&&(z(ce,gl),z(Re,bl),z(Re,Zo)),os.svgFilters===!0&&(z(ce,hl),z(Re,bl),z(Re,Zo)),os.mathMl===!0&&(z(ce,vl),z(Re,Ju),z(Re,Zo))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?ns.tagCheck=b.ADD_TAGS:(ce===pe&&(ce=Lt(ce)),z(ce,b.ADD_TAGS,Se))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?ns.attributeCheck=b.ADD_ATTR:(Re===Lv&&(Re=Lt(Re)),z(Re,b.ADD_ATTR,Se))),b.ADD_URI_SAFE_ATTR&&z(Eu,b.ADD_URI_SAFE_ATTR,Se),b.FORBID_CONTENTS&&(Ut===_u&&(Ut=Lt(Ut)),z(Ut,b.FORBID_CONTENTS,Se)),b.ADD_FORBID_CONTENTS&&(Ut===_u&&(Ut=Lt(Ut)),z(Ut,b.ADD_FORBID_CONTENTS,Se)),ku&&(ce["#text"]=!0),ii&&z(ce,["html","head","body"]),ce.table&&(z(ce,["tbody"]),delete No.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw gs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw gs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=b.TRUSTED_TYPES_POLICY,G=B.createHTML("")}else B===void 0&&(B=Xb(g,s)),B!==null&&typeof G=="string"&&(G=B.createHTML(""));Ue&&Ue(b),rs=b}},Nv=z({},[...gl,...hl,...Hb]),Ov=z({},[...vl,...Fb]),BT=function(b){let S=_(b);(!S||!S.tagName)&&(S={namespaceURI:as,tagName:"template"});const j=Qo(b.tagName),ge=Qo(S.tagName);return Iu[b.namespaceURI]?b.namespaceURI===Xr?S.namespaceURI===ln?j==="svg":S.namespaceURI===Zr?j==="svg"&&(ge==="annotation-xml"||Jr[ge]):!!Nv[j]:b.namespaceURI===Zr?S.namespaceURI===ln?j==="math":S.namespaceURI===Xr?j==="math"&&el[ge]:!!Ov[j]:b.namespaceURI===ln?S.namespaceURI===Xr&&!el[ge]||S.namespaceURI===Zr&&!Jr[ge]?!1:!Ov[j]&&(TT[j]||!Nv[j]):!!(Ho==="application/xhtml+xml"&&Iu[b.namespaceURI]):!1},Gt=function(b){ms(t.removed,{element:b});try{_(b).removeChild(b)}catch{k(b)}},si=function(b,S){try{ms(t.removed,{attribute:S.getAttributeNode(b),from:S})}catch{ms(t.removed,{attribute:null,from:S})}if(S.removeAttribute(b),b==="is")if(ss||Yr)try{Gt(S)}catch{}else try{S.setAttribute(b,"")}catch{}},Hv=function(b){let S=null,j=null;if($u)b="<remove></remove>"+b;else{const _e=fl(b,/^[\r\n\t ]+/);j=_e&&_e[0]}Ho==="application/xhtml+xml"&&as===ln&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");const ge=B?B.createHTML(b):b;if(as===ln)try{S=new f().parseFromString(ge,Ho)}catch{}if(!S||!S.documentElement){S=C.createDocument(as,"template",null);try{S.documentElement.innerHTML=xu?G:ge}catch{}}const Oe=S.body||S.documentElement;return b&&j&&Oe.insertBefore(n.createTextNode(j),Oe.childNodes[0]||null),as===ln?Y.call(S,ii?"html":"body")[0]:ii?S.documentElement:Oe},Fv=function(b){return q.call(b.ownerDocument||b,b,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tu=function(b){return b instanceof p&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof d)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},Uv=function(b){return typeof r=="function"&&b instanceof r};function cn(R,b,S){Yo(R,j=>{j.call(t,b,S,rs)})}const Gv=function(b){let S=null;if(cn(Z.beforeSanitizeElements,b,null),Tu(b))return Gt(b),!0;const j=Se(b.nodeName);if(cn(Z.uponSanitizeElement,b,{tagName:j,allowedTags:ce}),Wr&&b.hasChildNodes()&&!Uv(b.firstElementChild)&&Ge(/<[/\w!]/g,b.innerHTML)&&Ge(/<[/\w!]/g,b.textContent)||b.nodeType===vs.progressingInstruction||Wr&&b.nodeType===vs.comment&&Ge(/<[/\w]/g,b.data))return Gt(b),!0;if(!(ns.tagCheck instanceof Function&&ns.tagCheck(j))&&(!ce[j]||No[j])){if(!No[j]&&Vv(j)&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,j)||be.tagNameCheck instanceof Function&&be.tagNameCheck(j)))return!1;if(ku&&!Ut[j]){const ge=_(b)||b.parentNode,Oe=w(b)||b.childNodes;if(Oe&&ge){const _e=Oe.length;for(let rt=_e-1;rt>=0;--rt){const dn=y(Oe[rt],!0);dn.__removalCount=(b.__removalCount||0)+1,ge.insertBefore(dn,x(b))}}}return Gt(b),!0}return b instanceof l&&!BT(b)||(j==="noscript"||j==="noembed"||j==="noframes")&&Ge(/<\/no(script|embed|frames)/i,b.innerHTML)?(Gt(b),!0):(is&&b.nodeType===vs.text&&(S=b.textContent,Yo([I,D,M],ge=>{S=fs(S,ge," ")}),b.textContent!==S&&(ms(t.removed,{element:b.cloneNode()}),b.textContent=S)),cn(Z.afterSanitizeElements,b,null),!1)},zv=function(b,S,j){if(Dv&&(S==="id"||S==="name")&&(j in n||j in CT))return!1;if(!(yu&&!bu[S]&&Ge(X,S))){if(!(Av&&Ge(N,S))){if(!(ns.attributeCheck instanceof Function&&ns.attributeCheck(S,b))){if(!Re[S]||bu[S]){if(!(Vv(b)&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,b)||be.tagNameCheck instanceof Function&&be.tagNameCheck(b))&&(be.attributeNameCheck instanceof RegExp&&Ge(be.attributeNameCheck,S)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(S,b))||S==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&Ge(be.tagNameCheck,j)||be.tagNameCheck instanceof Function&&be.tagNameCheck(j))))return!1}else if(!Eu[S]){if(!Ge(ct,fs(j,L,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&b!=="script"&&Pb(j,"data:")===0&&jv[b])){if(!(Cv&&!Ge(Ie,fs(j,L,"")))){if(j)return!1}}}}}}}return!0},Vv=function(b){return b!=="annotation-xml"&&fl(b,ve)},Kv=function(b){cn(Z.beforeSanitizeAttributes,b,null);const{attributes:S}=b;if(!S||Tu(b))return;const j={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Re,forceKeepAttr:void 0};let ge=S.length;for(;ge--;){const Oe=S[ge],{name:_e,namespaceURI:rt,value:dn}=Oe,ls=Se(_e),Lu=dn;let Pe=_e==="value"?Lu:qb(Lu);if(j.attrName=ls,j.attrValue=Pe,j.keepAttr=!0,j.forceKeepAttr=void 0,cn(Z.uponSanitizeAttribute,b,j),Pe=j.attrValue,Mv&&(ls==="id"||ls==="name")&&(si(_e,b),Pe=IT+Pe),Wr&&Ge(/((--!?|])>)|<\/(style|title|textarea)/i,Pe)){si(_e,b);continue}if(ls==="attributename"&&fl(Pe,"href")){si(_e,b);continue}if(j.forceKeepAttr)continue;if(!j.keepAttr){si(_e,b);continue}if(!Bv&&Ge(/\/>/i,Pe)){si(_e,b);continue}is&&Yo([I,D,M],Yv=>{Pe=fs(Pe,Yv," ")});const Wv=Se(b.nodeName);if(!zv(Wv,ls,Pe)){si(_e,b);continue}if(B&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!rt)switch(g.getAttributeType(Wv,ls)){case"TrustedHTML":{Pe=B.createHTML(Pe);break}case"TrustedScriptURL":{Pe=B.createScriptURL(Pe);break}}if(Pe!==Lu)try{rt?b.setAttributeNS(rt,_e,Pe):b.setAttribute(_e,Pe),Tu(b)?Gt(b):Yu(t.removed)}catch{si(_e,b)}}cn(Z.afterSanitizeAttributes,b,null)},DT=function R(b){let S=null;const j=Fv(b);for(cn(Z.beforeSanitizeShadowDOM,b,null);S=j.nextNode();)cn(Z.uponSanitizeShadowNode,S,null),Gv(S),Kv(S),S.content instanceof o&&R(S.content);cn(Z.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(R){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,j=null,ge=null,Oe=null;if(xu=!R,xu&&(R="<!-->"),typeof R!="string"&&!Uv(R))if(typeof R.toString=="function"){if(R=R.toString(),typeof R!="string")throw gs("dirty is not a string, aborting")}else throw gs("toString is not a function");if(!t.isSupported)return R;if(wu||Su(b),t.removed=[],typeof R=="string"&&(Oo=!1),Oo){if(R.nodeName){const dn=Se(R.nodeName);if(!ce[dn]||No[dn])throw gs("root node is forbidden and cannot be sanitized in-place")}}else if(R instanceof r)S=Hv("<!---->"),j=S.ownerDocument.importNode(R,!0),j.nodeType===vs.element&&j.nodeName==="BODY"||j.nodeName==="HTML"?S=j:S.appendChild(j);else{if(!ss&&!is&&!ii&&R.indexOf("<")===-1)return B&&Qr?B.createHTML(R):R;if(S=Hv(R),!S)return ss?null:Qr?G:""}S&&$u&&Gt(S.firstChild);const _e=Fv(Oo?R:S);for(;ge=_e.nextNode();)Gv(ge),Kv(ge),ge.content instanceof o&&DT(ge.content);if(Oo)return R;if(ss){if(Yr)for(Oe=F.call(S.ownerDocument);S.firstChild;)Oe.appendChild(S.firstChild);else Oe=S;return(Re.shadowroot||Re.shadowrootmode)&&(Oe=ee.call(i,Oe,!0)),Oe}let rt=ii?S.outerHTML:S.innerHTML;return ii&&ce["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Ge(tp,S.ownerDocument.doctype.name)&&(rt="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+rt),is&&Yo([I,D,M],dn=>{rt=fs(rt,dn," ")}),B&&Qr?B.createHTML(rt):rt},t.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Su(R),wu=!0},t.clearConfig=function(){rs=null,wu=!1},t.isValidAttribute=function(R,b,S){rs||Su({});const j=Se(R),ge=Se(b);return zv(j,ge,S)},t.addHook=function(R,b){typeof b=="function"&&ms(Z[R],b)},t.removeHook=function(R,b){if(b!==void 0){const S=jb(Z[R],b);return S===-1?void 0:Rb(Z[R],S,1)[0]}return Yu(Z[R])},t.removeHooks=function(R){Z[R]=[]},t.removeAllHooks=function(){Z=ip()},t}var op=sp();const yl="chaotic_";function tt(e){try{return localStorage.getItem(yl+e)}catch{return null}}function ut(e,t){try{localStorage.setItem(yl+e,t)}catch{}}function At(e){try{localStorage.removeItem(yl+e)}catch{}}function wl(){return tt("token")}function Jb(e){e?ut("token",e):At("token")}function ey(){return tt("theme")}function ty(e){ut("theme",e)}function ap(){return tt("last_project")}function rp(e){ut("last_project",e)}function ny(){return tt("onboarding_complete")==="true"}function iy(){ut("onboarding_complete","true")}function sy(){At("onboarding_complete")}function oy(e){return e?tt(`issues_filters_${e}`):null}function ay(e,t){e&&(t?ut(`issues_filters_${e}`,t):At(`issues_filters_${e}`))}function lp(e){return tt(`comment_draft_${e}`)}function Xo(e,t){t?ut(`comment_draft_${e}`,t):At(`comment_draft_${e}`)}function cp(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function bs(e){const t=tt(`description_draft_${e}`);if(!t)return null;const n=cp(t);return n?n.draft:t}function dp(e){const t=tt(`description_draft_${e}`);if(!t)return null;const n=cp(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Mn(e,t,n=""){t?ut(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):At(`description_draft_${e}`)}function up(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function pp(e){var n;const t=tt(`document_draft_${e}`);return t?((n=up(t))==null?void 0:n.draft)??null:null}function ry(e){const t=tt(`document_draft_${e}`);if(!t)return null;const n=up(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Jo(e,t,n=null){t&&(t.title||t.content||t.icon)?ut(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):At(`document_draft_${e}`)}function ly(){return{title:tt("create_issue_title"),description:tt("create_issue_description")}}function mp(e,t){e?ut("create_issue_title",e):At("create_issue_title"),t?ut("create_issue_description",t):At("create_issue_description")}function cy(){At("create_issue_title"),At("create_issue_description")}function dy(){return tt("doc_view_mode")}function uy(e){ut("doc_view_mode",e)}function py(){return tt("composer_mode")==="markdown"?"markdown":"rich"}function fp(e){ut("composer_mode",e==="markdown"?"markdown":"rich")}const my="chaotic-boot-cache",$l="snapshot",kl="last",gp=1,fy=336*60*60*1e3,gy=250;let jn=null;function hy(){return jn||(jn=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(my,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore($l),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),jn=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),jn.catch(()=>{jn=null}),jn)}function _l(e,t){return hy().then(n=>new Promise((i,s)=>{const o=n.transaction($l,e),a=t(o.objectStore($l));o.oncomplete=()=>i(a==null?void 0:a.result),o.onerror=()=>s(o.error),o.onabort=()=>s(o.error)}))}function hp(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function vy(e){if(!e)return Promise.resolve(null);const t=_l("readonly",i=>i.get(kl)).then(i=>!i||i.version!==gp||i.userId!==e||!(Date.now()-i.savedAt<fy)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),gy));return Promise.race([t,n])}function by(e,t){if(!e)return Promise.resolve();const n={...t,version:gp,userId:e,savedAt:Date.now()};return _l("readwrite",i=>i.put(n,kl)).then(()=>{},()=>{})}function El(){return _l("readwrite",e=>e.delete(kl)).then(()=>{},()=>{})}const ys=/^[0-9a-f-]{36}$/,yy=/^\/api\/attachments\/([0-9a-f-]{36})\/content$/;function vp(e){if(typeof e!="string"||e==="")return null;const t=window.location.origin;let n;try{n=new URL(e,t)}catch{return null}if(n.origin!==t||n.search!==""||n.hash!==""||n.username||n.password)return null;const i=yy.exec(n.pathname);return i?i[1]:null}function wy(e){for(const t of e.querySelectorAll("img[src]")){const n=vp(t.getAttribute("src"));n&&(t.removeAttribute("src"),t.removeAttribute("srcset"),t.setAttribute("data-attachment-id",n),t.classList.add("attachment-inline"),!t.closest("a[href]")&&(t.setAttribute("data-action","open-attachment"),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label",`View ${t.getAttribute("alt")||"image"}`)))}for(const t of e.querySelectorAll("a[href]")){const n=vp(t.getAttribute("href"));n&&(t.setAttribute("data-attachment-ref",n),t.setAttribute("data-action","open-attachment"),t.classList.add("attachment-link"))}}const bp="/api";class $y{constructor(){this.token=wl()}setToken(t){this.token=t,Jb(t)}getToken(){return this.token}async request(t,n,i=null,{headers:s=null}={}){const o={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(o.Authorization=`Bearer ${this.token}`),s&&Object.assign(o,s);const a={method:t,headers:o},r=typeof Blob<"u"&&i instanceof Blob;r&&(o["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=r?i:JSON.stringify(i));let l;try{l=await fetch(`${bp}${n}`,a)}catch(d){const p=new Error("Network error - check your connection");throw p.isNetworkError=!0,p.cause=d,p}if(l.status===204)return null;let c;try{c=await l.json()}catch{const d=l.headers.get("content-type")||"unknown";throw l.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${l.status})`)}if(!l.ok){let d;typeof c.detail=="string"?d=c.detail:c.detail&&typeof c.detail=="object"&&c.detail.message?d=c.detail.message:d="An error occurred";const p=new Error(d);throw p.status=l.status,p.detail=c.detail,p}return c}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),El()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async uploadAgentAvatar(t,n){return this.request("PUT",`/agents/${t}/avatar`,n)}async deleteAgentAvatar(t){return this.request("DELETE",`/agents/${t}/avatar`)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(o=>n.append(i,o)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:o=null,skip:a=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),o&&c.set("order",o),c.set("skip",String(a)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,o=50){let a=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${o}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,o])=>{o==null||o===""||(Array.isArray(o)?o.forEach(a=>i.append(s,a)):i.append(s,o))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let o=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getEpicOverview(t,{activitySkip:n=0,activityLimit:i=50}={}){const s=new URLSearchParams({activity_skip:n,activity_limit:i});return this.request("GET",`/issues/${t}/epic-overview?${s.toString()}`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getAttachments(t){return this.request("GET",`/issues/${t}/attachments`)}async uploadAttachment(t,n,{idempotencyKey:i}={}){const s=encodeURIComponent(n.name||"file"),o=i?{"Idempotency-Key":i}:null;return this.request("POST",`/issues/${t}/attachments?filename=${s}`,n,{headers:o})}async deleteAttachment(t){return this.request("DELETE",`/attachments/${encodeURIComponent(t)}`)}async fetchAttachmentContent(t){if(!ys.test(t))throw new Error("Not an attachment id");const n={};this.token&&(n.Authorization=`Bearer ${this.token}`);let i;try{i=await fetch(`${bp}/attachments/${t}/content`,{headers:n,credentials:"same-origin",redirect:"error"})}catch(s){const o=new Error("Network error - check your connection");throw o.isNetworkError=!0,o.cause=s,o}if(!i.ok){let s=null;try{s=(await i.json()).detail}catch{}const o=typeof s=="string"?s:(s==null?void 0:s.message)||`Request failed (${i.status})`,a=new Error(o);throw a.status=i.status,a.detail=s,a}return i.blob()}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let o=`/teams/${t}/documents`;const a=[];return n&&a.push(`project_id=${n}`),s&&a.push(`sprint_id=${s}`),i&&a.push(`search=${encodeURIComponent(i)}`),a.length&&(o+=`?${a.join("&")}`),this.request("GET",o)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/teams/${t}/agents`,o)}async createProjectAgent(t,n,i=null,s=!1){const o={name:n,avatar_url:i};return s&&(o.can_register=!0),this.request("POST",`/projects/${t}/agents`,o)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,kinds:i=null,includeArchived:s=!1,skip:o=0,limit:a=50}={}){const r=new URLSearchParams({team_id:t,skip:o,limit:a});n&&r.set("unread","true"),s&&r.set("include_archived","true");for(const l of i||[])r.append("kind",l);return this.request("GET",`/inbox?${r.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new $y;let oi=null;const ky='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let ai=null,ws=!1;function xl(){ws=!0}function _y(){ws=!1}function yp(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Ey(){if(ws)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function U(){ai=document.activeElement,ws=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;Wt(),ws=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),ai&&document.contains(ai)&&typeof ai.focus=="function"&&ai.focus(),ai=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(ky);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())});function Ve(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const o=document.createElement("button");o.type="button",o.className="toast-close",o.setAttribute("aria-label","Dismiss"),o.textContent="×",i.appendChild(o),n.appendChild(i);const a=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),p=setTimeout(a,l);return o.addEventListener("click",()=>{clearTimeout(p),a()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),p=setTimeout(a,Math.max(c,500))}),i}function $s(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function xy(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=xy(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Wt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),oi&&(document.removeEventListener("keydown",oi),oi=null)}function Iy(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Wt(),t&&Ve()&&yp()}function ks(e){oi&&document.removeEventListener("keydown",oi),oi=e,e&&document.addEventListener("keydown",e)}function _s(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Wt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Ke(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function qe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Te(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function ae(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Sy(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function Le(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),o=Math.floor(i/36e5),a=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:o<24?`${o}h ago`:a<7?`${a}d ago`:t.toLocaleDateString()}function yt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const Il=/^\/api\/avatars\/[0-9a-f]{64}$/;function wp(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||Il.test(e))}function Ct(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?wp(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function $p(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function ea(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return $p(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let me={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Sl=new Set;function ye(e,t){if(typeof e=="string"){const n=me[e];me[e]=t,kp(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const o=me[i];me[i]=s,n.push({key:i,value:s,oldValue:o})}n.forEach(({key:i,value:s,oldValue:o})=>{kp(i,s,o)})}}function wt(e){return Sl.add(e),()=>Sl.delete(e)}function kp(e,t,n){t!==n&&Sl.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const re=()=>me.currentUser,Bt=e=>ye("currentUser",e),A=()=>me.currentView,Rn=e=>ye("currentView",e),ie=()=>me.issues,nt=e=>ye("issues",e),Es=()=>me.detailNavContext,Dt=e=>ye("detailNavContext",e),Tl=()=>me.labels,xs=e=>ye("labels",e),_p=()=>me.activeFilterCategory,Ty=e=>ye("activeFilterCategory",e),Ep=()=>me.selectedIssueIndex,Pn=e=>ye("selectedIssueIndex",e),Ly=()=>me.selectedDocIndex,xp=e=>ye("selectedDocIndex",e),Ip=()=>me.selectedBoardIndex,ta=e=>ye("selectedBoardIndex",e),Ay=()=>me.selectedInboxIndex,na=e=>ye("selectedInboxIndex",e),Cy=()=>me.selectedSprintIndex,Sp=e=>ye("selectedSprintIndex",e),By=()=>me.selectedEpicIndex,Is=e=>ye("selectedEpicIndex",e),se=()=>me.inboxEntries,Mt=e=>ye("inboxEntries",e),ia=()=>me.inboxUnreadCount,Ss=e=>ye("inboxUnreadCount",e),Dy=()=>me.searchDebounceTimer,My=e=>ye("searchDebounceTimer",e),jy=()=>me.websocket,Ll=e=>ye("websocket",e),T=()=>me.currentTeam,ri=e=>ye("currentTeam",e),J=()=>me.currentProject,$t=e=>ye("currentProject",e||null),Ee=()=>me.currentDetailIssue,li=e=>ye("currentDetailIssue",e),Ry=()=>me.currentDetailSprints,Tp=e=>ye("currentDetailSprints",e),Al=["backlog","todo","in_progress","in_review","done","canceled"],Ts=["backlog","todo","in_progress","in_review"],Lp=["urgent","high","medium","low","no_priority"],Cl=["no_priority","urgent","high","medium","low"],Ap=["backlog","todo","in_progress","in_review","done"],sa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function qn(e){if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||!!e.isContentEditable}const Bl={};function le(e){Object.assign(Bl,e)}function Py(e){var o;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target&&qn(e.target)||n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Bl[i];if(!s){typeof process<"u"&&((o=process.env)==null?void 0:o.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Cp=!1;function qy(){if(!Cp){Cp=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Py);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Bl[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function Ny(e){const t=document.createElement("template");return t.innerHTML=e,wy(t.content),t.innerHTML}function pt(e){if(!e)return"";try{Q.setOptions({breaks:!0,gfm:!0});const n=Q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;")),i=op.sanitize(n,{FORCE_BODY:!0,ALLOW_DATA_ATTR:!1});return i.includes("/api/attachments/")?Ny(i):i}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Oy(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),o=Math.floor(s/60),a=Math.floor(o/60),r=Math.floor(a/24);return s<60?"just now":o<60?`${o}m ago`:a<24?`${a}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function W({icon:e,heading:t,description:n,cta:i,variant:s}){const o=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${o}
        </div>
    `}const K={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},oa={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},aa={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Bp=0;function Dp(e){Bp=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,o]=n.split("__");t+=Mp(s,o,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Mp(e="",t="",n=""){const i=Bp++,s=Object.keys(oa).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),a=(e?oa[e]:oa.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${aa[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function Hy(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Mp()),ra()}function Fy(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ra()}function Uy(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const o=oa[s]||[];i.innerHTML=o.map(a=>`<option value="${a}">${aa[a]}</option>`).join(""),jp(e),ra()}function jp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Ls(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ra(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Rp(){var i,s,o;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const a of e){const r=(i=a.querySelector(".condition-field"))==null?void 0:i.value,l=(s=a.querySelector(".condition-operator"))==null?void 0:s.value,c=a.querySelector(".condition-value");let d=(o=c==null?void 0:c.value)==null?void 0:o.trim();if(!r&&!l)continue;if(!r)throw Ls("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Ls("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw Ls(`Duplicate condition: ${r} ${aa[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Ls(`Please enter a numeric value for ${r} ${aa[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw Ls(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return ra(),Object.keys(t).length>0?t:null}le({"add-condition-row":()=>{Hy()},"remove-condition-row":(e,t)=>{Fy(Number(t.rowId))},"update-operator-options":(e,t)=>{Uy(Number(t.rowId))},"toggle-value-input":(e,t)=>{jp(Number(t.rowId))}});let Ce=[];const la="project-switcher",Dl="all";function ca(e=J()){const t=document.getElementById(la);t&&(t.value=e||"")}wt((e,t)=>{e==="currentProject"&&(t&&rp(t),ca(t),lw(t||""))});function Pp(){rp(Dl),$t(null)}const da={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function oe(){return Ce}function Gy(e){Ce=e}function ci(e){const t=Ce.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return da[n]||da.fibonacci}function di(e,t){if(e==null)return"No estimate";const i=ci(t).find(s=>s.value===e);return i?i.label:`${e} points`}function ua(e,t){return e==null||e===0?!1:!ci(t).some(i=>i.value===e)}function zy(e){const t=Ce.find(a=>a.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(da[n]||da.fibonacci).filter(a=>a.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(a=>a.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function mt(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;Ce=i,Np(),qp()}catch(i){E("load projects",i)}}function qp(){const e=J();if(e&&Ce.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&Ce.some(s=>s.id===n)){$t(n);return}const i=ap();if(i===Dl){e&&$t(null);return}if(i&&Ce.some(s=>s.id===i)){$t(i);return}Ce.length>0&&$t(Ce[0].id)}function Np(){const e=document.getElementById(la);e&&(e.innerHTML='<option value="">All projects</option>'+Ce.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),ca())}function Op(){const e=ap();return e===Dl?null:e}function Nn(){const e=document.getElementById("projects-list");if(Ce.length===0){e.innerHTML=W({icon:K.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=Ce.map(t=>`
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
    `).join("")}function Vy(e){$t(e),O("issues")}function Hp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Ky(e){e.preventDefault();const t=T();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await mt(),Nn(),H(),$("Project created!","success")}catch(i){E("create project",i)}return!1}async function Wy(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await mt(),Nn(),H(),$("Project updated!","success")}catch(i){E("update project",i)}return!1}async function Yy(e){const t=Ce.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await mt(),Nn(),H(),$("Project deleted","success")}catch(n){E("delete project",n)}}let Be=null;function Fp(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function Qy(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Be!==e.id)return;const i=n.filter(o=>o.id===e.default_epic_id||o.status!=="done"&&o.status!=="canceled"),s=e.default_epic_id&&!i.some(o=>o.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(o=>`<option value="${m(o.id)}">${u(o.identifier)} ${u(o.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function pa(e,{tab:t="general",replace:n=!1,onlyIfView:i}={}){if(Ce.length===0&&(await mt(),i&&A()!==i))return;e!==Be&&(Yt=[]),Be=e,Rn("projects");const s=Ce.find(r=>r.id===e);if(!s){$("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${s.name} Settings`,document.getElementById("ps-name").value=s.name||"",document.getElementById("ps-key").value=s.key||"",document.getElementById("ps-description").value=s.description||"",document.getElementById("ps-color").value=s.color||"#6366f1",document.getElementById("ps-estimate-scale").value=s.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=s.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=s.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=s.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=s.require_estimate_on_claim===!0,Fp("ps-require-assignee-on-claim",s.require_assignee_on_claim===!0),Fp("ps-require-epic-on-close",s.require_epic_on_close===!0),Qy(s),document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden");const o=Gp(e,t),a=zp(e,o.tab);n?window.history.replaceState(o,"",a):window.history.pushState(o,"",a),Vp(t)}const Up=["general","rules","sprint-rituals","close-rituals","claim-rituals"];function Gp(e,t){return{view:"project-settings",settingsProjectId:e,tab:Up.includes(t)?t:"general"}}function zp(e,t){const n=`/projects/${encodeURIComponent(e)}/settings`;return t==="general"?n:`${n}?tab=${t}`}function Vp(e){Up.includes(e)||(e="general");const t=Be;t&&window.location.pathname===`/projects/${encodeURIComponent(t)}/settings`&&window.history.replaceState(Gp(t,e),"",zp(t,e)),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Yt||Yt.length===0)&&ma()}function Zy(){Be=null,Yt=[]}async function Xy(){if(!Be)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Be,t),await mt(),$("Settings saved","success");const n=Ce.find(i=>i.id===Be);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function Jy(){if(!Be)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const o=document.getElementById("ps-default-epic");o&&!o.disabled&&(n.default_epic_id=o.value||null);try{await h.updateProject(Be,n),await mt(),$("Settings saved","success")}catch(a){E("save settings",a)}}let Yt=[];async function ma(){const e=Be;if(!e)return!1;try{const t=await h.getRituals(e);return e!==Be?!1:(Yt=t,ew(),!0)}catch(t){return E("load rituals",t),!1}}function ew(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Yt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Yt.filter(i=>i.trigger==="ticket_close"),n=Yt.filter(i=>i.trigger==="ticket_claim");Ml("ps-sprint-rituals-list",e,"sprint"),Ml("ps-close-rituals-list",t,"close"),Ml("ps-claim-rituals-list",n,"claim")}function Ml(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const o={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${o[n]} rituals configured.</p>`;return}const s=o=>m(o||"auto");i.innerHTML=t.map(o=>{let a="";if(o.group_name){const r=o.weight!=null&&o.weight!==1?` w:${o.weight}`:o.percentage!=null?` ${o.percentage}%`:"";a=`<span class="badge badge-ritual-group">${u(o.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(o.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${u(o.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${pt(o.prompt)}</div>
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
  `}).join("")}async function tw(e){if(!Be)return;let t=[];try{t=await h.getRitualGroups(Be)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Dp(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function nw(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function iw(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const o=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",o!=="random_one"),i.classList.toggle("hidden",o!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Kp(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Be,{name:t,selection_mode:n})).id}return e.value||null}async function sw(e){var s;e.preventDefault();let t;try{t=Rp()}catch{return!1}let n;try{n=await Kp()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const o=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(i.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(i.percentage=parseFloat(a.value))}try{await h.createRitual(Be,i),await ma(),H(),$("Ritual created!","success")}catch(o){E("create ritual",o)}return!1}async function ow(e){const t=Yt.find(a=>a.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Be)}catch{}const i=n.find(a=>a.id===t.group_id),s=i&&i.selection_mode==="random_one",o=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Dp(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function aw(e,t){var o;e.preventDefault();let n;try{n=Rp()}catch{return!1}let i;try{i=await Kp()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((o=document.getElementById("ritual-artifact"))==null?void 0:o.value)||null,conditions:n,group_id:i||""};if(i){const a=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(s.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await ma(),H(),$("Ritual updated!","success")}catch(a){E("update ritual",a)}return!1}async function rw(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await ma(),$("Ritual deleted","success")}catch(n){E("delete ritual",n)}}le({"view-project":(e,t)=>{Vy(t.projectId)},"view-project-settings":(e,t)=>{pa(t.projectId)},"create-project":e=>{Ky(e)},"update-project":(e,t)=>{Wy(e,t.projectId)},"confirm-delete-project":(e,t)=>{Yy(t.projectId)},"edit-project-ritual":(e,t)=>{ow(t.ritualId)},"delete-project-ritual":(e,t)=>{rw(t.ritualId,t.ritualName)},"create-project-ritual":e=>{sw(e)},"update-project-ritual":(e,t)=>{aw(e,t.ritualId)},"toggle-ritual-conditions":()=>{nw()},"ritual-group-change":()=>{iw()}});function Wp(){const t=new URLSearchParams(window.location.search).get("project");return t||Op()}function lw(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const jl={},Yp=new Map;let Rl=null,Pl=null,ql=null,Nl=null,Ol=null,Hl=null,Fl=null,Qp=!1;function cw(e){Object.assign(jl,e)}function dw({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:o,beforeScrollRestore:a}={}){e&&(Rl=e),t&&(Pl=t),n&&(ql=n),i&&(Nl=i),s&&(Ol=s),o&&(Hl=o),a&&(Fl=a)}function Zp(){return Object.keys(jl)}const uw=["issues","query","board","sprints","epics","documents","rituals","my-issues"],Xp={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"},pw={board:"issues",rituals:"projects"};function As(e){const t=pw[e]||e;document.querySelectorAll(".nav-item").forEach(n=>{n.classList.toggle("active",n.dataset.view===t)})}function Jp(){Rl&&Rl()}function O(e,t=!0,{transition:n=!1}={}){if(t&&un(),Rn(e),t){let o;const a=Wp();e==="my-issues"?o=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?o=`/issues${window.location.search}`:uw.includes(e)&&a?o=`/${e}?project=${a}`:o=`/${e}`,history.pushState({view:e},"",o)}As(e),Jp();const i=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const o=document.getElementById(`${e}-view`);o&&o.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=jl[e];s&&s(),t&&window.scrollTo(0,0)}const Cs={"gate-approvals":"inbox",approvals:"inbox",team:"people"},mw=new Set(["team","approvals","gate-approvals"]),fw={approvals:"kind=approvals","gate-approvals":"kind=approvals"};function em(){var i;Rn(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":Cs[e[0]]||e[0],n=e.length<=1&&Zp().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),As(t)):As(Xp[e[0]]||null)}function Ul(){var i;const t=window.location.pathname.split("/").filter(Boolean);Nl&&Nl(),A()||Rn("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Pl&&Pl(t)){const s=Xp[t[0]];s&&As(s);return}else{if(n=t[0],Cs[n]){if(t.length===1&&mw.has(n)){const o=fw[n]||window.location.search.slice(1);history.replaceState({view:Cs[n]},"",`/${Cs[n]}${o?`?${o}`:""}`)}n=Cs[n]}Zp().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function un(){Yp.set(window.location.href,window.scrollY)}function Gl(e){un(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Ol&&Ol(e)}function tm(e){un(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Hl&&Hl(e)}function nm(){const e=Yp.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Fl&&Fl(),window.scrollTo(0,e)})}function im(){Qp||(Qp=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&ql&&ql(e.state)){nm();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):Ul(),nm()}))}let zl=[];function gw(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function hw(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Bs(e,t){const n=e().map(gw),i=t().map(hw);zl=[...n,...i]}function Qt(e){return e&&zl.find(t=>t.id===e)||null}function jt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function fa(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function Ds({includeIdle:e=!1,keepId:t=null}={}){const n=zl.filter(v=>e||!v.idle||v.id===t),i=n.filter(v=>!v.is_agent),s=new Set(i.map(v=>v.id)),o=n.filter(v=>v.is_agent),a=new Set(o.map(v=>v.id)),r=(v,y)=>v.name.localeCompare(y.name),l=v=>v.registered_by_id&&a.has(v.registered_by_id),c=new Map,d=new Map;o.forEach(v=>{const[y,k]=l(v)?[c,v.registered_by_id]:[d,v.parent_user_id];y.has(k)||y.set(k,[]),y.get(k).push(v)});const p=[],f=(v,y)=>{p.push({assignee:v,indent:y}),(c.get(v.id)||[]).sort(r).forEach(x=>p.push({assignee:x,indent:2}))};return i.forEach(v=>{p.push({assignee:v,indent:!1}),(d.get(v.id)||[]).sort(r).forEach(y=>f(y,!0))}),o.filter(v=>!l(v)&&!s.has(v.parent_user_id)).sort(r).forEach(v=>f(v,!1)),p}function ui({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Ds({keepId:n}).forEach(({assignee:s,indent:o})=>{i+=`<option value="${m(s.id)}">${fa(s,o)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function vw(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Qt(e)&&ui({keepId:e}),t.value=e}let pi=[];function ft(){return pi}function bw(e){pi=Array.isArray(e)?e:[]}function yw(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?wp(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function ww(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;pi=i,Bs(Et,ft),ui()}catch(i){console.error("Failed to load team agents:",i),E("load team agents",i)}}async function Ms(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{pi=await h.getTeamAgents(e),Bs(Et,ft),ui(),$w()}catch(n){E("load agents",n)}}function $w(){var o;const e=document.getElementById("agents-list");if(!e)return;const t=(o=re())==null?void 0:o.id,n=pi.filter(a=>a.parent_user_id===t&&a.kind!=="session");if(n.length===0){e.innerHTML=W({icon:K.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=oe(),s=a=>{if(!a)return"Team-wide";const r=i.find(l=>l.id===a);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(a=>{const r=m(a.id),l=pi.filter(d=>d.registered_by_id===a.id).length,c=[s(a.agent_project_id),a.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Te(a.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${yw(a)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(a.name)}${a.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function kw(){const e=oe();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}function sm(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,U()}async function _w(e){var r,l,c,d;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,o=(c=document.getElementById("agent-project"))==null?void 0:c.value,a=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let p;s&&o?p=await h.createProjectAgent(o,n,i,a):p=await h.createTeamAgent(t,n,i,a),H(),sm("Agent Created",p.api_key,!!p.can_register),await Ms(),ga(p.id,{created:!0})}catch(p){E("create agent",p)}return!1}async function Ew(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);sm("New Agent Key",n.key),ga(e,{credentials:!0})}catch(n){E("generate agent key",n)}}async function xw(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await Ms(),ga(e)}catch(s){E("change registrar",s)}}function ga(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function Iw(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function Sw(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),$("Agent deleted","success"),await Ms(),ga(e,{deleted:!0})}catch(n){E("delete agent",n)}}le({"create-agent":e=>{_w(e)},"copy-agent-key":()=>{Iw()},"dismiss-agent-modal":()=>{H(),Ms()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Sw(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||Ew(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||xw(t.agentId,t.agentName,t.canRegister!=="true")}});const om=24,it=new Map,we=new Map,kt=new Map;let Zt=null;function Tw(e){return Array.isArray(e)?[...e].map(String).sort():e}function am(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Tw(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ha(e,t){for(we.delete(e),we.set(e,t);we.size>om;){const n=we.keys().next().value;we.delete(n)}rm()}function rm(){if(it.size===0)return;const e=new Set;we.forEach(t=>t.ids.forEach(n=>e.add(n))),it.forEach((t,n)=>{e.has(n)||it.delete(n)})}function Lw(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function lm(e){const t=we.get(e);return t?(ha(e,t),t.ids.map(n=>it.get(n)).filter(Boolean)):null}function Vl(e){return it.get(e)}function Aw(e){var t;return((t=we.get(e))==null?void 0:t.meta)||{}}function cm(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Kl(e){const t=it.get(e.id);if(!cm(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){it.set(e.id,{...e,description:t.description});return}it.set(e.id,e)}}const Wl=new Set;function Cw(e){return Wl.add(e),()=>Wl.delete(e)}function dm(e,t,n){if(!Array.isArray(t))return;const i=Lw(t);i.forEach(Kl);const s=we.get(e);ha(e,{ids:i.map(o=>o.id),meta:n??(s==null?void 0:s.meta)??{}}),Wl.forEach(o=>{try{o(e)}catch(a){console.error(a)}})}function Bw(e,t){const n=we.get(e);n&&(n.meta=t)}function va(e){e!=null&&e.id&&it.has(e.id)&&Kl(e)}function Dw(e){we.delete(e),kt.forEach((t,n)=>{t===e&&kt.delete(n)}),Zt===e&&(Zt=null),rm()}function Mw(e){it.delete(e),we.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function ba(e){Zt=e}function jw(){return Zt}function um(e,t){for(kt.delete(e),kt.set(e,t);kt.size>om;)kt.delete(kt.keys().next().value)}function Rw(e){const t=kt.get(e);return t&&we.has(t)?t:null}function Pw({maxQueries:e=3}={}){const t=[...we.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(o=>i.add(o))),{queries:t.map(([s,o])=>[s,{ids:[...o.ids],meta:o.meta||{}}]),entities:[...i].map(s=>it.get(s)).filter(Boolean),views:[...kt.entries()].filter(([,s])=>n.has(s))}}function qw(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{we.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Kl(t.get(s))}),ha(n,{ids:i.ids.filter(s=>it.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!kt.has(n)&&we.has(i)&&um(n,i)})}function pm(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function mm(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(pm(e[n])!==pm(t[n]))return!1;return!0}const fm=["status","priority"],gm=["assignee_id","sprint_id","issue_type"],Nw={assignee_id:"unassigned",sprint_id:"no_sprint"},Ow=["scope","project_id","sort_by","order","limit"],On=e=>(e||[]).map(t=>String(t).toLowerCase());function Hw(e,t){if(e.search||t.search||t.sort_by==="random"||Ow.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of fm)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of gm)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=On(e.label);if(!On(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=On(t.exclude_label);if(!On(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function hm(e){const t=e.label===void 0?null:On(e.label),n=e.exclude_label===void 0?null:On(e.exclude_label);return i=>{for(const s of fm)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of gm){if(e[s]===void 0)continue;const o=e[s]===Nw[s]?null:e[s];if((i[s]??null)!==o)return!1}if(t||n){const s=On((i.labels||[]).map(o=>o.name));if(t&&!t.some(o=>s.includes(o))||n&&n.some(o=>s.includes(o)))return!1}return!0}}function Fw(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(am(e)));let n=null,i=null;if(we.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Hw(c,t)&&(n=r,i=l)}),!n)return null;ha(i,n);const s=hm(t),o=n.ids.map(r=>it.get(r)).filter(r=>r&&s(r)),a=t.limit;return{rows:o,complete:!(typeof a=="number"&&n.ids.length>=a)}}function Uw(){it.clear(),we.clear(),kt.clear(),Zt=null}wt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Uw();return}if(e!=="issues"||Zt===null||!we.has(Zt)||A()!=="issues")return;const i=we.get(Zt);dm(Zt,ie(),i.meta)});let Xt=0,mi=!1,js=null,ya=null,Rs=0;const Hn=new Map;function wa(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Xt===0&&!mi),e.textContent=mi?"Stopped":"Offline",e.title=mi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function We(e,t){return Hn.has(e)||Hn.set(e,new Set),Hn.get(e).add(t),()=>{var n;return(n=Hn.get(e))==null?void 0:n.delete(t)}}function Gw(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const zw=1e3;function $a(){ya&&(clearTimeout(ya),ya=null)}const Vw="chaotic",Yl=4001,Kw=4003,Ww="chaotic.bearer.";function Yw(e){return[Vw,Ww+e]}function vm(e,{isReconnect:t=!1}={}){js&&(clearTimeout(js),js=null),$a();const n=jy();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Ll(null)),!t&&(Xt>0||mi)&&(Xt=0,mi=!1,wa());const i=h.getToken();if(!i)return;const s=++Rs,a=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(a,Yw(i));Ll(r);let l=!1;const c=()=>{if(l||s!==Rs)return;l=!0,$a();const d=Xt>0;d&&$("Live updates reconnected","success"),Xt=0,wa(),d&&Ql({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Rs&&(console.log("WebSocket connected"),$a(),ya=setTimeout(c,zw))},r.onmessage=d=>{if(s!==Rs)return;c();let p;try{p=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}Ql(p)},r.onclose=d=>{if(s!==Rs)return;console.log("WebSocket disconnected"),$a();const p=d==null?void 0:d.code;if(p===Yl||p===Kw){Ll(null),Xt=0;const g=p===Yl&&wl()===i;mi=!g,wa();let v="forbidden";p===Yl&&(v=g?"unauthorized":"superseded"),Ql({type:v,entity:"connection",data:{code:p,teamId:e}});return}Xt++,Xt===1&&$("Live updates disconnected. Reconnecting...","warning"),wa();const f=Gw(Xt-1);js=setTimeout(()=>{js=null,T()&&T().id===e&&vm(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Ql(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},o=Hn.get(`${n}:${t}`);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const a=Hn.get(n);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Hn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}wt(e=>{e==="currentProject"&&A()==="rituals"&&queueMicrotask(()=>bm())});async function bm(){const e=J();if(e){Rn("projects"),await pa(e,{tab:"sprint-rituals",replace:!0,onlyIfView:"projects"});return}const t=document.getElementById("rituals-content");t&&(t.innerHTML=W({icon:K.projects,heading:"Select a project",description:"Rituals live in each project's settings. Pick a project in the sidebar switcher, or press P."}))}async function Qw(e,t){try{await h.approveAttestation(e,t),$("Ritual approved!","success"),await Gs(),bc()}catch(n){E("approve ritual",n)}}function Zl(e){return e==="document"?`
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
        `:""}function Xl(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function ym(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Zl(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",o=>{Zw(o,e,t,i,s,n)}),U()}async function Zw(e,t,n,i="",s=null,o=""){e.preventDefault();const a=document.getElementById("gate-note").value,r=Xl(i);if(r===void 0)return!1;try{if(await h.completeGateRitual(t,n,a||null,r),$(o?`Signed off on ${o}.`:"Signed off.","success"),await Gs(),s)return H(),await s(),!1;const l=V$();l&&!l.in_limbo?(H(),$("Limbo cleared! Next sprint is now active.","success")):bc()}catch(l){E("complete gate ritual",l)}return!1}function Xw(e,t,n,i,s="",o=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${o?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${o?"required":""}></textarea>
            </div>
            ${Zl(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",a=>{Jw(a,e,t,s,o)}),U()}async function Jw(e,t,n,i="",s=!0){e.preventDefault();const o=document.getElementById("attest-ritual-note").value.trim();if(s&&!o)return $("A note is required for this attestation.","error"),!1;const a=Xl(i);if(a===void 0)return!1;try{await h.attestTicketRitual(t,n,o||null,a),$("Ritual attested!","success"),H(),await ro(n)}catch(r){E("attest ticket ritual",r)}return!1}async function e$(e,t){try{await h.attestTicketRitual(e,t),$("Ritual attested!","success"),await ro(t)}catch(n){E("attest ticket ritual",n)}}async function t$(e,t){try{await h.approveTicketRitual(e,t),$("Ritual approved!","success"),await ro(t)}catch(n){E("approve ticket ritual",n)}}function wm(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{n$(s,e,t,n,i)}),U()}async function n$(e,t,n,i,s=null){e.preventDefault();const o=document.getElementById("reject-ritual-note").value.trim();if(!o)return $("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,o),$(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(a){E("reject ritual",a)}return!1}function $m(e,t,n,i="",s=null){document.getElementById("modal-title").textContent=`Sign off: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Zl(i)}
            <button type="submit" class="btn btn-primary">Sign off</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",o=>{i$(o,e,t,i,s)}),U()}async function i$(e,t,n,i="",s=null){e.preventDefault();const o=document.getElementById("ticket-ritual-note").value,a=Xl(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,o||null,a),$("Signed off.","success"),H(),s?await s():await ro(n)}catch(r){E("complete ticket ritual",r)}return!1}le({"approve-ticket-ritual":(e,t)=>{t$(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{wm(t.ritualId,t.issueId,t.ritualName,()=>ro(t.issueId))},"complete-ticket-ritual":(e,t)=>{$m(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{Xw(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{e$(t.ritualId,t.issueId)}});function km(e){const t=pt(e),n=document.createElement("template");return n.innerHTML=t,s$(n.content,o$),n.innerHTML}function s$(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(o){let a=o.parentElement;for(;a&&a!==e;){if(a.tagName==="CODE"||a.tagName==="PRE")return NodeFilter.FILTER_REJECT;a=a.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(o=>{t(o)})}function o$(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),o=i.test(t);if(!s&&!o)return;const a=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&a.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,a.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&a.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],a.appendChild(p),r=d.index+d[0].length}l&&(r<t.length&&a.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(a,e))}function Ps(e){return e?km(e):""}function Fn(e){return e?km(e):""}const ka=new Map;function Jl(){var e;return`${((e=T())==null?void 0:e.id)??""}|${J()??""}`}function fi(e,t,n){ka.set(e,{key:t,value:n})}function _a(e,t){const n=ka.get(e);return n&&n.key===t?n.value:void 0}function qs(e,...t){for(const n of t)n!==e&&ka.delete(n)}function ec(){ka.clear()}function Ea(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}wt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ec(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ec()});function a$(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function r$(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const o of e){const a=o.user_id||o.id;i.has(a)||(i.add(a),s.push({id:a,name:o.user_name||o.name||o.user_email||o.email||"User",email:o.user_email||o.email||"",handle:a$(o),isAgent:!1}))}for(const o of t)!o.mention_handle||o.is_active===!1||o.idle||i.has(o.id)||n!==void 0&&o.agent_project_id&&o.agent_project_id!==n||(i.add(o.id),s.push({id:o.id,name:o.name||"Agent",email:"",handle:o.mention_handle,isAgent:!0}));return s}function _m(e,t={},n=6){const i=(e||"").toLowerCase();return r$(Et(),ft(),t).filter(s=>!i||s.handle.includes(i)||s.name.toLowerCase().includes(i)||s.email.toLowerCase().includes(i)).slice(0,n)}function l$(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function tc(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let o=-1;const a=()=>{s.classList.add("hidden"),s.innerHTML="",o=-1},r=d=>{var f,g;const p=s.querySelectorAll(".mention-suggestion");p.length!==0&&(o=(d%p.length+p.length)%p.length,p.forEach((v,y)=>v.classList.toggle("highlighted",y===o)),(g=(f=p[o]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const p=i.selectionStart||0,f=i.value.slice(0,p).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(p);i.value=f+g,i.focus(),a()},c=()=>{if(i.hidden){a();return}const d=i.selectionStart||0;if(l$(i.value,d)){a();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){a();return}const g=f[2].toLowerCase(),v=_m(g,i.mentionContext||{});if(!v.length){a();return}s.innerHTML=v.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${u(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,k)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(k))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const p=!s.classList.contains("hidden");if(d.key==="Escape"&&p){d.preventDefault(),d.stopPropagation(),a();return}if(p){if(d.key==="ArrowDown")d.preventDefault(),r(o+1);else if(d.key==="ArrowUp")d.preventDefault(),r(o-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[o];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(a,150)})}let De=null,Em=!1,Un=!1,xm="new-comment";function c$(){return De||(De=document.createElement("div"),De.className="quote-tooltip",De.setAttribute("role","button"),De.setAttribute("tabindex","0"),De.setAttribute("aria-label","Quote selection in comment"),De.textContent="Quote",De.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),xa())}),De.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),De.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),xa()}),document.body.appendChild(De),De)}function Im(e,t){const n=c$();n.style.display="flex",Un=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Un)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Ns(){De&&(De.style.display="none"),Un=!1}function d$(){return Un}function Sm(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function nc(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Sm(t.startContainer),i=Sm(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function u$(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function xa(e=xm){const t=nc();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=u$(t),s=n.value,o=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+o+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Ns(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function p$(){var i;if(!nc())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Im(n.left+n.width/2,n.top),!0}function m$(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!nc()){Ns();return}Im(t,n)},10)}function Tm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(xm=t,i.addEventListener("mouseup",m$,n?{signal:n}:void 0),Em||(Em=!0,document.addEventListener("mousedown",s=>{Un&&De&&!De.contains(s.target)&&Ns()}),document.addEventListener("selectionchange",()=>{Un&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Ns()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Un&&(s.stopImmediatePropagation(),Ns())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&p$()})))}function Lm(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let pn=[],Os=[],Ia=null,fe=new Set,gi="list",Gn=!1,ic=null,Sa=null,sc=null,oc=null,Am=null;function Cm(e){if(Am!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const ac=dy();(ac==="list"||ac==="grid")&&(gi=ac);function Bm(e){if(e!=="list"&&e!=="grid")return;gi=e,e==="grid"&&Gn&&rc(),uy(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Jt()}function Dm(){if(gi!=="list")return;Gn=!0,fe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Jt(),vi()}function rc(){Gn=!1,fe.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Jt(),vi()}function f$(){ic&&clearTimeout(ic),ic=setTimeout(()=>{Jt()},300)}function Mm(){const e=document.getElementById("doc-search");e&&(e.value=""),Jt()}async function g$(){Mm()}function h$(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function v$(){return pn}function Jt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";h$(),Os=pn.filter(o=>{var a,r;if(e){const l=(a=o.title)==null?void 0:a.toLowerCase().includes(e),c=(r=o.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Os.sort((o,a)=>{switch(t){case"title_asc":return(o.title||"").localeCompare(a.title||"");case"title_desc":return(a.title||"").localeCompare(o.title||"");case"updated_asc":return new Date(o.updated_at)-new Date(a.updated_at);case"updated_desc":default:return new Date(a.updated_at)-new Date(o.updated_at)}}),_$("",gi)}let hi=0;async function b$(){var i;const e=Ia||((i=T())==null?void 0:i.id);if(!e)return;const t=++hi,n=J()||null;try{const s=await h.getDocuments(e,n);if(t!==hi)return;fi("documents",`${e}|${n??""}`,s),pn=s,Jt()}catch(s){if(t!==hi)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=W({icon:K.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}wt(e=>{e==="currentProject"&&A()==="documents"&&b$()});async function zn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;Ia=e,xp(-1);const i=++hi;t===null&&(t=J()||null);const s=`${e}|${t??""}`,o=n?_a("documents",s):void 0,a=document.getElementById("documents-list");o?(pn=o,Jt()):a&&(a.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==hi)return;fi("documents",s,l);const c=o&&Ea(pn,l);pn=l;const d=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");d&&p&&(d.classList.toggle("active",gi==="list"),p.classList.toggle("active",gi==="grid")),c||Jt()}catch(l){if(i!==hi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=W({icon:K.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",l)}}function jm(){var t,n;if(A()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ia||((n=T())==null?void 0:n.id);e&&zn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Rm(e){Cm(e)&&xe(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function y$(e,t){Cm(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function w$(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${ae(t.color)}20; color: ${ae(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function $$(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${w$(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u(Lm(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function k$(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${ae(r.color)}20; color: ${ae(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Lm(e.content).substring(0,80):"No content",s=Gn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${fe.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Gn&&fe.has(e.id)?" selected":""}" data-action="${Gn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
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
  `}function _$(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;fe.clear(),vi();const i=Os;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=J(),f=d||p;n.innerHTML=W({icon:f?K.search:K.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?$$:k$,o=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${o}">${i.map(s).join("")}</div>`;return}const a={},r=oe();i.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(v=>v.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");a[p]||(a[p]={label:f,docs:[]}),a[p].docs.push(d)});let l="";for(const[d,p]of Object.entries(a)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function E$(e){fe.has(e)?fe.delete(e):fe.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=fe.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",fe.has(e)),vi()}function x$(){Os.forEach(e=>fe.add(e.id)),Os.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),vi()}function Pm(){fe.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),fe.clear(),vi()}function vi(){const e=document.getElementById("doc-bulk-actions");e&&(Gn?(e.classList.remove("hidden"),fe.size>0?e.innerHTML=`
        <span class="bulk-count">${fe.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function I$(){if(fe.size===0){$("No documents selected","error");return}const t=oe().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${fe.size} Document${fe.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${fe.size} selected document${fe.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function S$(e){var a,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(fe);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((a=pn.find(d=>d.id===l))==null?void 0:a.title)||l)}H(),Pm(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const o=(r=T())==null?void 0:r.id;return await zn(o),!1}async function T$(){var o,a;if(fe.size===0){$("No documents selected","error");return}const e=fe.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(fe);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((o=pn.find(c=>c.id===r))==null?void 0:o.title)||r)}rc(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(a=T())==null?void 0:a.id;await zn(s)}async function L$(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var o,a;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((a=(o=s.author_name)==null?void 0:o.charAt(0))==null?void 0:a.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${u(s.author_name||"Unknown")}</span>
                ${ea(s.author)}
                <span class="comment-date">${Le(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Ps(s.content)}</div>
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
    `}}function A$(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=lp(e);s&&(i.value=s),i.addEventListener("input",()=>{Xo(e,i.value)},{signal:t}),i.addEventListener("keydown",o=>{var a;o.key==="Enter"&&(o.metaKey||o.ctrlKey)&&(o.preventDefault(),(a=i.closest("form"))==null||a.requestSubmit())},{signal:t}),tc("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function xe(e,t=!0){try{t&&un();const n=await h.getDocument(e);Am=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(C=>C.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await L$(n);let o=null,a=null,r=!1;if(n.project_id){const q=oe().find(F=>F.id===n.project_id);if(o=q?q.name:null,n.sprint_id)try{const F=await h.getSprint(n.sprint_id);a=F?F.name:null}catch(F){console.error("Failed to load sprint name:",F),r=!0}}let l=n.content||"";const c=Q.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=v$(),p=d.findIndex(C=>C.id===n.id),f=p>0?d[p-1]:null,g=p>=0&&p<d.length-1?d[p+1]:null,v=p>=0,y=A()||"documents",k=n.labels&&n.labels.length>0?n.labels.map(C=>`
          <span class="issue-label" style="background: ${ae(C.color)}20; color: ${ae(C.color)}">
            ${u(C.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${m(n.id)}" data-label-id="${m(C.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let x='<span class="text-muted">None</span>';try{const C=await h.getDocumentIssues(n.id);C.length>0&&(x=C.map(q=>`
          <div class="linked-item">
            <span class="linked-item-id">${u(q.identifier)}</span>
            <span class="linked-item-title">${u(q.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${m(n.id)}" data-issue-id="${m(q.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(C){console.error("Failed to load linked issues:",C),x=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${m(y)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
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
              <span class="property-value-static">${u(n.author_name||"Unknown")} ${ea(n.author)}</span>
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
    `,Sa&&Sa.abort(),Sa=new AbortController;const{signal:w}=Sa,_=i.querySelector(".sidebar-overflow-trigger"),B=i.querySelector(".overflow-menu-dropdown");if(_&&B){const C=()=>{B.classList.add("hidden"),_.setAttribute("aria-expanded","false")},q=()=>{const F=B.classList.toggle("hidden");_.setAttribute("aria-expanded",String(!F))};_.addEventListener("click",q,{signal:w}),document.addEventListener("click",F=>{!_.contains(F.target)&&!B.contains(F.target)&&C()},{signal:w}),B.addEventListener("keydown",F=>{F.key==="Escape"&&(C(),_.focus())},{signal:w})}A$(n.id,w,n.project_id||null),Tm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:w}),sc=f?f.id:null,oc=g?g.id:null;const G=C=>{if((C.metaKey||C.ctrlKey)&&C.shiftKey&&(C.key===">"||C.key==="."||C.code==="Period")&&xa("new-doc-comment")){C.preventDefault();return}C.metaKey||C.ctrlKey||C.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||C.target.tagName==="INPUT"||C.target.tagName==="TEXTAREA"||C.target.tagName==="SELECT"||C.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(C.key==="ArrowLeft"&&sc?(C.preventDefault(),xe(sc)):C.key==="ArrowRight"&&oc&&(C.preventDefault(),xe(oc)))};document.addEventListener("keydown",G,{signal:w})}catch(n){E("load document",n)}}async function Ta(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const o=await h.getSprints(t);let a=n;if(i&&!n){const l=o.find(c=>c.status==="active");l&&(a=l.id)}const r=o.map(l=>`<option value="${l.id}" ${l.id===a?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function lc(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function C$(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),o=document.getElementById(`${e}-preview`);if(!n||!i||!s||!o)return;const a=t==="preview";if(n.classList.toggle("active",!a),i.classList.toggle("active",a),s.style.display=a?"none":"block",o.style.display=a?"block":"none",a){const r=s.value.trim();o.innerHTML=r?Fn(r):'<span class="text-muted">Nothing to preview.</span>'}}function cc(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),o=document.getElementById(t.icon),a=pp(e);if(a){const l=ry(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(a.title&&i&&(i.value=a.title),a.content&&s&&(s.value=a.content),a.icon&&o&&(o.value=a.icon)):c?(i&&(i.value=a.title||""),s&&(s.value=a.content||""),o&&(o.value=a.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(o==null?void 0:o.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Jo(e,null);return}Jo(e,l,n)};[i,s,o].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function qm(){Hs=null;const e=oe(),t=Op()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${lc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),cc("new"),t&&await Ta("doc-sprint",t,null,!0)}let Hs=null;async function B$(e,t,n){Hs=n||null;const s=oe().map(o=>`<option value="${m(o.id)}" ${o.id===t?"selected":""}>${u(o.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${lc("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),cc("new"),t&&await Ta("doc-sprint",t,e)}async function D$(e){var o;e.preventDefault();const t=(o=T())==null?void 0:o.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Jo("new",null),await zn(t),H(),$("Document created!","success"),Hs){const a=Hs;Hs=null,a()}}catch(a){E("create document",a)}return!1}let dc=null,Fs=null,uc=!1;async function Nm(e){try{const t=await h.getDocument(e);dc=e,Fs={title:t.title||"",content:t.content||""},uc=!1;const i=oe().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${lc("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),cc(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Ta("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function M$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},o=document.getElementById("edit-doc-content-draft-warning");if(o&&dc===t&&Fs&&!uc){let a=null;try{a=await h.getDocument(t)}catch{}if(a&&((a.title||"")!==Fs.title||(a.content||"")!==Fs.content))return uc=!0,o.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',o.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),dc=null,Fs=null;const a=pp(t);a&&a.title===s.title&&a.content===s.content&&(a.icon||"")===(s.icon||"")&&Jo(t,null),H(),await xe(t),$("Document updated!","success")}catch(a){E("update document",a)}return!1}async function j$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await zn(n),O("documents"),$("Document deleted!","success")}catch(n){E("delete document",n)}}function R$(e,t){Ta(e,t)}async function P$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function q$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=await h.searchIssues(s,e);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(a=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(a.id)}">
        <span class="link-result-id">${u(a.identifier)}</span>
        <span class="link-result-title">${u(a.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function N$(e,t){try{await h.linkDocumentToIssue(e,t),H(),$("Issue linked!","success"),await xe(e,!1)}catch(n){E("link issue",n)}}async function O$(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await xe(e,!1)}catch(n){E("unlink issue",n)}}let pc=!1;async function H$(e,t){if(e.preventDefault(),pc)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;pc=!0;try{const s=await h.createDocumentComment(t,i);n.value="",$("Comment added!","success"),$s(s),await xe(t,!1)}catch(s){E("add comment",s)}finally{pc=!1}return!1}async function F$(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const s=i.map(o=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(o.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${ae(o.color)}; color: white;">${u(o.name)}</span>
        ${o.description?`<span class="text-muted">${u(o.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,U()}catch(i){E("load labels",i)}}async function U$(e,t){try{await h.addLabelToDocument(e,t),H(),$("Label added!","success"),await xe(e,!1)}catch(n){E("add label",n)}}async function G$(e,t){try{await h.removeLabelFromDocument(e,t),$("Label removed!","success"),await xe(e,!1)}catch(n){E("remove label",n)}}le({"view-document":(e,t)=>{e.preventDefault(),xe(t.documentId)},"set-doc-editor-mode":(e,t)=>{C$(t.target,t.mode)},"retry-load-documents":()=>{zn(Ia)},"retry-document-comments":(e,t)=>{xe(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{E$(t.docId)},"clear-doc-search":()=>{Mm()},"clear-all-doc-filters":()=>{g$()},"show-bulk-move-modal":()=>{I$()},"bulk-delete-documents":()=>{T$()},"select-all-docs":()=>{x$()},"clear-doc-selection":()=>{Pm()},"exit-selection-mode":()=>{rc()},"enter-selection-mode":()=>{Dm()},"handle-bulk-move":e=>{S$(e)},"unlink-document-issue":(e,t)=>{O$(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{P$(t.documentId)},"add-document-comment":(e,t)=>{H$(e,t.documentId)},"remove-label-from-doc":(e,t)=>{G$(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{F$(t.documentId)},"show-edit-document-modal":(e,t)=>{Nm(t.documentId)},"delete-document":(e,t)=>{j$(t.documentId)},"create-document":e=>{D$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{R$(t.sprintSelect,n.value)},"update-document":(e,t)=>{M$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{q$(n.value,t.documentId)},"link-to-issue":(e,t)=>{N$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{U$(t.documentId,t.labelId)}});let Rt=[],La={},Aa=new Set,en=null,mc=null,Ca=[],Us=[],fc=[];function Ba(){return La}function z$(){return mc}function V$(){return en}wt(e=>{e==="currentProject"&&A()==="sprints"&&mn()});let gc=0;async function mn({fromMemory:e=!1}={}){Sp(-1);const t=J();if(!t){const a=document.getElementById("sprints-list");a&&(a.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++gc;lk();const i=document.getElementById("sprints-list"),s=Jl(),o=e?_a("sprints",s):void 0;o?(Rt=o,Om()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,a]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=a.some(c=>c.status==="active")?a:await h.getSprints(t);if(n!==gc)return;const l=o&&Ea(Rt,r);Rt=r,fi("sprints",s,r),l||Om(),await Gs()}catch(a){return n!==gc?void 0:(i&&(i.innerHTML=W({icon:K.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",a),!1)}return!0}function Om(){const e=document.getElementById("sprints-list");if(!e)return;const t=Rt.find(o=>o.status==="active"),n=Rt.find(o=>o.status==="planned"),i=Rt.filter(o=>o.status==="completed");let s="";if(t){const o=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",a=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=K$(t)}if(n){const o=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",a=(n.budget?`${n.budget} point budget`:"No budget set")+(o?` <span class="text-muted">· ${o}</span>`:"");s+=`
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
        `),e.innerHTML=s||W({icon:K.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Hm(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${wc(e.activated_at)}, closed ${wc(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${wc(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function K$(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${u(Hm(e))||"not yet activated"}</span>
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
    `}let hc=0;async function bi(e,t=!0){var n;try{t&&un();const i=++hc,s=A(),o=await h.getSprint(e);if(i!==hc)return;if(!o){$("Sprint not found","error"),O("sprints");return}mc=o;const a=(n=T())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),a?h.getDocuments(a,o.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==hc)return;Ca=r,fc=l,Us=c,A()===s&&Dt(Ca),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Y$()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),O("sprints")}}async function W$(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),O("sprints",!1);return}try{await bi(e,!1)}catch{O("sprints",!1)}}function Y$(){const e=mc,t=Ca;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=A()||"sprints",s=t.filter(g=>Ts.includes(g.status)),o=t.filter(g=>g.status==="done"),a=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((v,y)=>v+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(o),d=a.length>0?`<div class="stat-note">${a.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${u(Hm(e))}
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
                ${s.length===0?W({icon:K.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>vc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${o.length>0?"open":""}>
                <summary><h3>Completed Issues (${o.length})</h3></summary>
                ${o.length===0?W({icon:K.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${o.map(g=>vc(g)).join("")}
                    </div>
                `}
            </details>

            ${a.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${a.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${a.map(g=>vc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Z$()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Us.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Us.length>0?`
                    <div class="sprint-issues-list">
                        ${Us.map(g=>Q$(g)).join("")}
                    </div>
                `:W({icon:K.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function vc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Ap,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${uk(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Q$(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Le(e.created_at)}</span>
            </span>
        </div>
    `}function Z$(){const e=fc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${X$(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function X$(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function J$(e,t,n,i){const s=i?zy(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function ek(e,t,n){var p,f,g,v;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,o=s?parseInt(s):null,a=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(v=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:v.dataset.currentBudget,l=r?parseInt(r):null,c=o!==l,d=Rt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const k=a==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!k&&(y.budget=o),Object.keys(y).length&&await h.updateSprint(t,y),a==="planned"){const w=Rt.filter(_=>_.status==="planned"&&_.id!==t);for(const _ of w)await h.updateSprint(_.id,{budget:o})}a==="default"&&n&&await h.updateProject(n,{default_sprint_budget:o}),await mn(),H(),$(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(y){E("update budget",y)}return!1}const Fm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function tk(e,t=null){const n=Rt.find(c=>c.id===e),i=n?oe().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Fm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let o;try{o=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){E("reset budget to project default",c),t&&(t.disabled=!1);try{await mn()}catch{}return}const a=(o==null?void 0:o.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await mn()!==!1}catch{l=!1}$(`'${a}' follows the project default budget again: ${s(o==null?void 0:o.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((o==null?void 0:o.budget)===null||(o==null?void 0:o.budget)===void 0)&&$(Fm,"warning")}async function nk(e){const t=Rt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=Ts;let i=0,s=!1,o=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),o=!0}const a=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${a}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${a}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function ik(e){try{const t=await h.closeSprint(e);await mn(),zm(),t.limbo?ok(t):$("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Gs(){const e=J();if(e)try{en=await h.getLimboStatus(e),sk()}catch(t){console.error("Failed to load limbo status:",t)}}function sk(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!en||!en.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${en.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function ok(e){const t=J();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,U(),ak(t)}async function ak(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${pt(i.prompt)}</div>
                    ${yc(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function bc(){var t,n;if(!en)return;const e=J();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
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
                        <div class="ritual-prompt markdown-body">${pt(i.prompt)}</div>
                        ${yc(i.attestation)}
                        ${rk(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=en.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${en.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${yc(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function yc(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(Le(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${pt(e.note)}</div>
        </div>
    `}function rk(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Um(e){for(const t of e)if(!Aa.has(t))try{(await h.getSprints(t)).forEach(i=>{La[i.id]=i}),Aa.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function lk(){La={},Aa=new Set,Ca=[],fc=[],Us=[],Da={}}function ck(e,t){t.forEach(n=>{La[n.id]=n}),Aa.add(e)}let Da={};function dk(e){return Da[e]}function Gm(e,t){Da[e]=t??null}function zm(){Da={}}le({"retry-load-sprints":()=>mn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}bi(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;J$(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{tk(t.sprintId,n)},"show-limbo-details-modal":()=>{bc()},"show-close-sprint-confirmation":(e,t)=>{nk(t.sprintId)},"handle-update-budget":(e,t)=>{ek(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),ik(t.sprintId)},"dismiss-limbo-modal":()=>{H(),Gs()},"approve-ritual":(e,t)=>{Qw(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{ym(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}ue(t.issueId)},"create-sprint-document":async(e,t)=>{await B$(t.sprintId,t.projectId,()=>{bi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}xe(t.documentId)}});function wc(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function uk(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}let Pt=[],$c=[],Ma=-1,kc=null;const Vm=5,pk=new Set(["done","canceled"]),Km=new Set;function mk(){return Ma}function fk(e){Ma=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;kc=(t==null?void 0:t.dataset.issueId)??null}const Wm=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function Ym(e){const t=new Set(Wm.map(s=>s.status)),n=Wm.map(s=>({...s,issues:e.filter(o=>o.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}wt(e=>{e==="currentProject"&&A()==="my-issues"&&(yi(),zs(),wi())});function Ye(){return Pt}function Vn(e){Pt=e}let _c=0;async function yi(){var o;const e=T(),t=re();if(!e||!t)return;const n=++_c,i=(o=document.getElementById("my-issues-status-filter"))==null?void 0:o.value,s=J();hk();try{const a={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...a,project_id:s}):r=await h.getTeamIssues(e.id,a),n!==_c)return;Pt=Ym(r).flatMap(l=>l.issues),A()==="my-issues"&&Dt(Pt),Kn()}catch(a){if(n!==_c)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=W({icon:K.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",a)}}async function wi({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=J();$c=await h.getTeamActivities(t.id,0,10,{projectId:i}),gk()}catch{n&&(n.innerHTML=W({icon:K.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function gk(){const e=document.getElementById("dashboard-activity-list");if(e){if(!$c.length){e.innerHTML=W({icon:K.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=$c.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=sd(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${hg(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ad(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${Le(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function hk(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Qm(){yi()}function Kn(){var a,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=Ym(Pt);Pt=t.flatMap(l=>l.issues),A()==="my-issues"&&Dt(Pt),Ma=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Pt.length?String(Pt.length):""),Pt.length===0){e.innerHTML=W({icon:K.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(a=i.closest(".issue-row"))==null?void 0:a.dataset.issueId:null,o=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=pk.has(l.status)&&!Km.has(l.status)&&l.issues.length>Vm,d=c?l.issues.slice(0,Vm):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(p=>Li(p)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(o?l.querySelector(`[data-dropdown-type="${o}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(kc){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===kc);c!==-1&&(l[c].classList.add("keyboard-selected"),Ma=c)}}let Ec=0,ja=[],Zm=null;async function zs(){var a;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Ec,n=J(),i=`${((a=T())==null?void 0:a.id)??""}:${n??""}`;i!==Zm&&(Zm=i,Vs=!1),ja=[];const s=oe(),o=n?s.filter(r=>r.id===n):s;if(!o.length){e.innerHTML="";return}try{const r=o.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let p={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:p};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const v of g)p[v.status]=(p[v.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:p,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==Ec)return;ja=l,sf(l,{single:!!n})}catch(r){if(t!==Ec)return;console.error("Failed to load sprint status:",r),e.innerHTML=W({icon:K.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const Xm=5;let Vs=!1;const Jm=["done","in_review","in_progress","todo","backlog"];function Ra(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,o=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,a=e.limbo?"limbo":s?"arrears":n&&o>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:o,state:a}}function vk(e){const t=({sprint:n})=>{const i=Ra(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function bk(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function yk(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function wk(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const $k={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function ef(e){return $k[e.state]||""}function tf(e){return`<span class="meter ${ef(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function kk(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function nf(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function _k({sprint:e,statusCounts:t,countsFailed:n}){const i=Ra(e),s=t||{},o=Object.values(s).reduce((d,p)=>d+p,0),a=bk(e),r=n?"Issue counts unavailable":o?`${o} issue${o===1?"":"s"}`:"No issues planned",l=[a?`Day ${a}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${nf(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${wk(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${yk(i)}</span>
            ${i.hasBudget?tf(i):""}
            ${o?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${Jm.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/o*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${Jm.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Ke(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function Ek({project:e,sprint:t}){const n=Ra(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=kk(t,n),o=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${nf(t)} title="${m(o)}">
                <span class="state-dot ${ef(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?tf(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function sf(e,{single:t=e.length===1&&!!J()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${_k(e[0])}
        `;return}const i=vk(e),s=i.filter(({sprint:d})=>d.limbo).length,o=i.filter(({sprint:d})=>!d.limbo&&Ra(d).overBudget).length,a=[o?`${o} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>Xm,l=Vs?i:i.slice(0,Xm),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${a?`<span class="sprint-attention">${a}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(Ek).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${Vs}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}le({"filter-my-issues":()=>Qm(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Gl(t.identifier)},"retry-load-my-issues":()=>yi(),"dash-show-all":(e,t)=>{Km.add(t.status),Kn()},"retry-load-sprint-status":()=>zs(),"dash-sprints-toggle":()=>{var e;ja.length&&(Vs=!Vs,sf(ja,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const of=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ks(e=null){const t=e||J()||"";wf([]);const n=oe().map(a=>`
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
                        ${et("backlog")}
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
                                ${of.map(a=>`<option value="${a.id}">${a.label}</option>`).join("")}
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
    `,U(),Ha();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),o=ly();o.title&&(i.value=o.title),o.description&&(s.value=o.description),i.addEventListener("input",()=>{mp(i.value,s.value)}),s.addEventListener("input",()=>{mp(i.value,s.value)}),i.focus()}function xk(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function Ik(e){const t=of.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function af(e,t){const n=oe().find(i=>i.id===t);wf([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${et("backlog")}
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
    `,U(),Ha(),document.getElementById("create-issue-title").focus()}async function Sk(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,label_ids:yf(),parent_id:e});H(),$(`Created sub-issue ${d.identifier}`,"success"),ue(e)}catch(d){E("create sub-issue",d)}}async function Tk(e,t,n){var a,r;Wt();const s=(n||t.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown dropdown-positioning",o.style.top=`${s.top-8}px`,o.style.left=`${s.left}px`,o.style.transform="translateY(-100%)",o.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;o.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Ap.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Ke(c))}">
                    ${et(c)}
                    <span>${Ke(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;o.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Cl.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(qe(c))}">
                    ${ht(c)}
                    <span>${qe(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;o.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(yt(c))}">
                    <span class="issue-type-badge type-${c}">${yt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())o.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Tl(),c=!1;if(l.length===0)try{l=await h.getLabels(T().id),xs(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Tc(o,{failed:c}),document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),_s(o,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=Ds({keepId:l});o.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:p})=>{const f=jt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${Ct(d,"avatar-small")}
                    <span>${fa(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,d=ci(c);o.innerHTML=`
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
                `}catch{o.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(o),requestAnimationFrame(()=>{requestAnimationFrame(()=>{o.classList.remove("dropdown-positioning")})}),_s(o)}function Lk(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Ak(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,xl();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${et(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${ht(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const o=document.getElementById("create-issue-type-btn");o&&(o.innerHTML=`<span class="issue-type-badge type-${t}">${yt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Wt(),s==null||s.focus()}async function rf({keepOpen:e=!1}={}){var y,k;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,o=document.getElementById("create-issue-priority").value,a=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,p=(k=document.getElementById("create-issue-due-date"))==null?void 0:k.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),v&&(v.disabled=!0);try{const x=await h.createIssue(t,{title:n,description:i||null,status:s,priority:o,issue_type:a,assignee_id:r,estimate:c,sprint_id:d,label_ids:yf(),due_date:f});$(`Created ${x.identifier}`,"success"),cy(),A()==="issues"?Nt():A()==="my-issues"&&yi(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",_y(),document.getElementById("create-issue-title").focus()):(H(),ue(x.id))}catch(x){E("create issue",x)}finally{g&&(g.disabled=!1),v&&(v.disabled=!1)}}async function Ck(){await rf({keepOpen:!1})}async function Bk(){await rf({keepOpen:!0})}le({"toggle-create-dropdown":(e,t,n)=>{Tk(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Ak(t.field,t.value,t.label)},"create-issue-submit":()=>{Ck()},"create-issue-and-new":()=>{Bk()},"update-create-project":()=>{Lk()},"apply-template":e=>{Ik(e.target.value)},"toggle-create-options":()=>{xk()},"create-sub-issue-submit":(e,t)=>{Sk(t.parentId,t.projectId)}});function Ws(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Dk(n,e.project_id),t=!0),t}function Dk(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,U())}async function Mk(e,t){try{const n=await h.updateIssue(e,{status:"done"});H(),$(`${t} closed`,"success"),Ws(n)}catch(n){E(`close ${t}`,n)}}le({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>Mk(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),af(t.parentId,t.projectId)}});function fn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Wn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Yn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Qn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Pa(){const e=document.getElementById("group-by-select");return e?e.value:""}const lf=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],xc=["done","canceled"],jk=Ts,Rk="all";function cf(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function $i(e=fn()){return e.length===0?"all":cf(e,Ts)?"open":cf(e,xc)?"closed":null}function df(e){var t,n,i;switch(e){case"status":{const s=$i();return s==="all"?0:s?1:fn().length}case"priority":return Wn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Yn().length;case"exclude_labels":return Qn().length;default:return 0}}function Ic(){let e=0;return lf.forEach(t=>{e+=df(t.key)}),e}function uf(){var v,y,k,x,w,_;const e=new URLSearchParams,t=fn(),n=Wn(),i=Yn(),s=Qn(),o=(v=document.getElementById("assignee-filter"))==null?void 0:v.value,a=J()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(k=document.getElementById("issue-type-filter"))==null?void 0:k.value,c=(x=document.getElementById("group-by-select"))==null?void 0:x.value,d=(w=document.getElementById("sort-by-select"))==null?void 0:w.value,p=$i(t);p==="all"?e.append("status",Rk):p!=="open"&&t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),i.forEach(B=>e.append("label",B)),s.forEach(B=>e.append("exclude_label",B)),o&&e.set("assignee",o),a&&e.set("project",a),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),ay((_=T())==null?void 0:_.id,f)}function Pk(e){var k;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(x=>t.has(x))){const x=oy((k=T())==null?void 0:k.id);if(x){t=new URLSearchParams(x);const w=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",w)}}const s=t.getAll("status"),o=document.getElementById("status-filter-dropdown");if(o&&(s.length>0||!o.dataset.statusApplied)){const x=s.length>0?s:jk;o.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=x.includes(_.value)}),o.dataset.statusApplied="true",pf()}const a=t.getAll("priority");if(a.length>0){const x=document.getElementById("priority-filter-dropdown");x&&(x.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=a.includes(_.value)}),mf())}const r=t.get("assignee");r&&vw(r);const l=t.get("project"),c=oe();l&&(!c.length||c.some(x=>x.id===l))&&(e(!0),$t(l),e(!1));const d=t.get("sprint");if(d){const x=document.getElementById("sprint-filter");x&&(x.value=d)}const p=t.get("issue_type");if(p){const x=document.getElementById("issue-type-filter");x&&(x.value=p)}const f=t.getAll("label");if(f.length>0){const x=document.getElementById("label-filter-dropdown");x&&(x.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=f.includes(_.value)}),qa())}const g=t.getAll("exclude_label");if(g.length>0){const x=document.getElementById("exclude-label-filter-dropdown");x&&(x.querySelectorAll('input[type="checkbox"]').forEach(_=>{_.checked=g.includes(_.value)}),Na())}const v=t.get("groupBy");if(v){const x=document.getElementById("group-by-select");x&&(x.value=v)}const y=t.get("sort");if(y){const x=document.getElementById("sort-by-select");x&&(x.value=y)}}function pf(){const e=fn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=$i(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ke(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function mf(){const e=Wn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=qe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function qa(){var i,s;const e=Yn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=a}else n.textContent=`${e.length} Labels`}function Na(){var i,s;const e=Qn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const o=t.querySelector(`input[value="${e[0]}"]`),a=((s=(i=o==null?void 0:o.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${a}`}else n.textContent=`Excl: ${e.length} Labels`}async function ff(){if(!T())return;let e;try{e=await h.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}gf("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),gf("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function gf(e,t,n,i){const s=document.getElementById(e);if(!s)return;const o=s.querySelector(".multi-select-options");o.innerHTML="",t.length===0?o.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${ae(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,o.appendChild(l)});const a=document.createElement("div");a.className="multi-select-actions",a.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,o.appendChild(a)}const hf=Al,qk=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let qt=[],vf=Promise.resolve();const Nk={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Oa(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Ok={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function bf(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let o;return n==="first"?o=i[0]:n==="last"?o=i[i.length-1]:n===1?o=i[s<0?0:Math.min(i.length-1,s+1)]:o=i[s<0?i.length-1:Math.max(0,s-1)],o&&o.focus(),!0}function ki(){return!!document.querySelector(".inline-dropdown")}function yf(){return qt}function wf(e){qt=e}async function Sc(e,t,n,i){var p,f,g,v;e.preventDefault(),Wt();const o=(i||e.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${hf.map((y,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${et(y)}
                    <span>${Ke(y)}</span>
                    <span class="dropdown-shortcut">${k+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Cl.map((y,k)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${ht(y)}
                    <span>${qe(y)}</span>
                    <span class="dropdown-shortcut">${k}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${qk.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${yt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=Ee(),k=ie().find(w=>w.id===n)||Ye().find(w=>w.id===n)||((y==null?void 0:y.id)===n?y:null),x=Ds({keepId:(k==null?void 0:k.assignee_id)||null});a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${x.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:x.map(({assignee:w,indent:_},B)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(w.id)}">
                    ${Ct(w,"avatar-small")}
                    <span>${fa(w,_)}</span>
                    ${B<9?`<span class="dropdown-shortcut">${B+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),k=(y==null?void 0:y.dataset.projectId)||((p=Ee())==null?void 0:p.project_id),x=ci(k);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${x.map((w,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${w.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${w.label}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=ie(),k=Ye(),x=Ee(),w=y.find(I=>I.id===n)||k.find(I=>I.id===n)||x,_=new Set(((w==null?void 0:w.labels)||[]).map(I=>I.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const B=a.getBoundingClientRect();let G=o.bottom+4,C=o.left;C+B.width>window.innerWidth-8&&(C=o.right-B.width),G+B.height>window.innerHeight-8&&(G=o.top-B.height-4),a.style.top=`${G}px`,a.style.left=`${Math.max(8,C)}px`,_s(a,{multiSelect:!0});let q=[];const F=T();if(F)try{q=await h.getLabels(F.id)}catch(I){console.error("Failed to load labels:",I)}if(!a.parentNode)return;kf(a,n,q,_);const Y=a.getBoundingClientRect();let ee=o.bottom+4,Z=o.left;Z+Y.width>window.innerWidth-8&&(Z=o.right-Y.width),ee+Y.height>window.innerHeight-8&&(ee=o.top-Y.height-4),a.style.top=`${ee}px`,a.style.left=`${Math.max(8,Z)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=ie(),k=Ye(),x=Ee(),w=y.find(D=>D.id===n)||k.find(D=>D.id===n)||x,_=(w==null?void 0:w.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const B=a.getBoundingClientRect();let G=o.bottom+4,C=o.left;C+B.width>window.innerWidth-8&&(C=o.right-B.width),G+B.height>window.innerHeight-8&&(G=o.top-B.height-4),a.style.top=`${G}px`,a.style.left=`${Math.max(8,C)}px`,_s(a);let q=[];if(_)try{q=await h.getSprints(_),ck(_,q)}catch(D){console.error("Failed to load sprints:",D)}if(!a.parentNode)return;const F=q.filter(D=>D.status!=="completed"||D.id===(w==null?void 0:w.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${F.map((D,M)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(D.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(D.name)}${D.status==="active"?" (Active)":""}</span>
                    ${M<9?`<span class="dropdown-shortcut">${M+1}</span>`:""}
                </button>
            `).join("")}
        `;const Y=a.getBoundingClientRect();let ee=o.bottom+4,Z=o.left;Z+Y.width>window.innerWidth-8&&(Z=o.right-Y.width),ee+Y.height>window.innerHeight-8&&(ee=o.top-Y.height-4),a.style.top=`${ee}px`,a.style.left=`${Math.max(8,Z)}px`,a.classList.remove("dropdown-positioning");const I=D=>{const M=D.key;if(M==="Escape"||M==="Tab"){Wt(),document.removeEventListener("keydown",I),ks(null);return}if(bf(D,a))return;const X=parseInt(M);if(isNaN(X))return;const N=a.querySelectorAll(".dropdown-option");let Ie=!1;X===0?(_i(n,"sprint_id",null),Ie=!0):X>=1&&X<N.length&&(N[X].click(),Ie=!0),Ie&&(document.removeEventListener("keydown",I),ks(null))};ks(I),document.addEventListener("keydown",I),(g=a.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const r=a.getBoundingClientRect();let l=o.bottom+4,c=o.left;c+r.width>window.innerWidth-8&&(c=o.right-r.width),l+r.height>window.innerHeight-8&&(l=o.top-r.height-4),a.style.top=`${l}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const d=y=>{const k=y.key;if(k==="Escape"||k==="Tab"){Wt(),document.removeEventListener("keydown",d);return}if(bf(y,a))return;const x=parseInt(k);if(isNaN(x))return;let w=!1;if(t==="status"&&x>=1&&x<=6)_i(n,"status",hf[x-1]),w=!0;else if(t==="priority"&&x>=0&&x<=4)_i(n,"priority",Cl[x]),w=!0;else if(t==="estimate"){const _=Ee(),B=ci(_==null?void 0:_.project_id);x>=0&&x<B.length&&(_i(n,"estimate",B[x].value),w=!0)}w&&(document.removeEventListener("keydown",d),ks(null))};ks(d),document.addEventListener("keydown",d),(v=a.querySelector(".dropdown-option[data-action]"))==null||v.focus(),_s(a)}function Hk(e,t,n,i){Sc(e,t,n,i)}function Fk(e,t,n){vf=vf.then(()=>$f(e,t,n))}async function $f(e,t,n){const i=ie(),s=Ye(),o=Ee(),a=i.find(d=>d.id===e)||s.find(d=>d.id===e)||o;if(!a)return;const r=(a.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),p=d.labels||[],f=w=>({...w,labels:p,updated_at:d.updated_at??w.updated_at}),g=ie();g.some(w=>w.id===e)&&nt(g.map(w=>w.id===e?f(w):w));const v=Ye();v.some(w=>w.id===e)&&Vn(v.map(w=>w.id===e?f(w):w));const y=Ee();(y==null?void 0:y.id)===e&&li(f(y));const k=Oa(e);if(k&&k.parentNode){const w=ie().find(_=>_.id===e)||Ye().find(_=>_.id===e);w&&(k.outerHTML=Li(w))}const x=document.querySelector(".property-labels-btn");x&&(x.innerHTML=p.length>0?p.map(w=>`
                    <span class="issue-label" style="background: ${ae(w.color)}20; color: ${ae(w.color)}">${u(w.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function kf(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}async function _f(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const o=await h.createLabel(i.id,{name:s}),a=await h.getLabels(i.id);xs(a),o!=null&&o.id&&await $f(e,o.id,null);const r=ie(),l=Ye(),c=Ee(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&kf(t,e,a,p),n.value=""}catch(o){E("create label",o)}finally{n.disabled=!1,n.focus()}}}function Ha(){const e=document.getElementById("create-issue-labels-label");e&&(qt.length===0?e.textContent="Labels":e.textContent=`Labels (${qt.length})`)}function Tc(e,{failed:t=!1}={}){const n=Tl();e.dataset.dropdownType="create-labels",e.innerHTML=`
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
    `}function Uk(e){const t=qt.indexOf(e);t>=0?qt.splice(t,1):qt.push(e),xl(),Ha();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Tc(n)}async function Ef(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),o=await h.getLabels(e.id);xs(o),s!=null&&s.id&&!qt.includes(s.id)&&(qt.push(s.id),xl()),Ha(),t&&Tc(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function _i(e,t,n){var r;Wt();const i=Kk(e,t,n),s=Qk(e,t),o=(r=Vl(e))==null?void 0:r[t],a=If(e,t,()=>n);a&&Lc(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Ws(c),xf(e,t,i)){const d={...c,...Yk(e,t)};Zk(e,{issue:d,myIssue:d,detail:d}),va(d),Lc(e,t,{focus:!a})}}catch(l){if(E("update issue",l),xf(e,t,i)){If(e,t,(d,p)=>d[t]===n?s[p]:d[t]);const c=Vl(e);c&&c[t]===n&&va({...c,[t]:o}),Lc(e,t,{focus:!1})}return}finally{Wk(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=J();if(l){const d=(await h.getSprints(l)).find(p=>p.status==="active");Ac(d||null)}}catch{}}const Gk=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),gn=new Map;function zk(e){const t=e&&gn.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Vk=0;function Kk(e,t,n){const i=++Vk;return gn.has(e)||gn.set(e,new Map),gn.get(e).set(t,{seq:i,value:n}),i}function xf(e,t,n){var i,s;return((s=(i=gn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Wk(e,t,n){var s;const i=gn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&gn.delete(e))}function Yk(e,t){var i;const n={};return(i=gn.get(e))==null||i.forEach((s,o)=>{o!==t&&(n[o]=s.value)}),n}function Qk(e,t){var i,s;const n=Ee();return{issue:(i=ie().find(o=>o.id===e))==null?void 0:i[t],myIssue:(s=Ye().find(o=>o.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function If(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const o=ie();o.some(l=>l.id===e)&&(s=!0,nt(o.map(l=>l.id===e?i(l,"issue"):l)));const a=Ye();a.some(l=>l.id===e)&&(s=!0,Vn(a.map(l=>l.id===e?i(l,"myIssue"):l)));const r=Ee();return(r==null?void 0:r.id)===e&&(s=!0,li(i(r,"detail"))),s}function Zk(e,t){var s;const n=ie();t.issue&&n.some(o=>o.id===e)&&nt(n.map(o=>o.id===e?t.issue:o));const i=Ye();t.myIssue&&i.some(o=>o.id===e)&&Vn(i.map(o=>o.id===e?t.myIssue:o)),t.detail&&((s=Ee())==null?void 0:s.id)===e&&li(t.detail)}function Xk(e){return e==="estimate"||Nk[Pa()]===e}function Jk(e,t,n,{focus:i}){var d;const s=Oa(e);if(!s||!s.parentNode||!n)return;const o=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Xk(t)&&ie().some(p=>p.id===e))gt();else if(t==="status"&&s.closest("#my-issues-list"))Kn();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=Li(n),p&&((d=Oa(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!o)return;const r=Oa(e),l=Ok[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Lc(e,t,{focus:n}){const i=ie().find(o=>o.id===e)||Ye().find(o=>o.id===e);i&&va(i),Jk(e,t,i,{focus:n});const s=Ee();(s==null?void 0:s.id)===e&&Gk.has(t)&&e_(t,s)}function e_(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const s=n.querySelector(`.property-row[data-field="${i}"]`);if(!s)return;const o=s.querySelector(".property-value");if(o){if(e==="status")o.innerHTML=`
            ${et(t.status)}
            <span>${Ke(t.status)}</span>
        `;else if(e==="priority")o.innerHTML=`
            ${ht(t.priority)}
            <span>${qe(t.priority)}</span>
        `;else if(e==="issue_type")o.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${yt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const a=t.assignee_id?Qt(t.assignee_id):null,r=a?jt(a):null;o.innerHTML=r?`${Ct(a,"avatar-small")}<span>${u(r)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const a=Ry(),r=t.sprint_id&&a?a.find(l=>l.id===t.sprint_id):null;o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${r?u(r.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(o.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${di(t.estimate,t.project_id)}</span>
        `);o.classList.add("updated"),setTimeout(()=>o.classList.remove("updated"),500),o==null||o.focus()}}le({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?_i(t.issueId,i,n==="null"?null:Number(n)):_i(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),Fk(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{_f(t.issueId)},"toggle-create-issue-label":(e,t)=>{Uk(t.labelId)},"create-label-for-create-issue":()=>{Ef()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),_f(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Ef())}});function Fa(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Sf)},0))}function Sf(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Sf))}function t_(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Ei)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Qe(),st(_p()),setTimeout(()=>{document.addEventListener("click",Ei)},0))}function n_(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Ei)):(e.classList.remove("hidden"),u_(),setTimeout(()=>{document.addEventListener("click",Ei)},0))}function Ei(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),o=document.querySelector(".display-menu-container"),a=s&&i.includes(s),r=o&&i.includes(o);!a&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Ei))}function xi(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Ei)}function Qe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=J();e.innerHTML=lf.map(n=>{const i=df(n.key),s=_p()===n.key,o=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${o?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function st(e){Ty(e),Qe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":s_(t);break;case"priority":o_(t);break;case"type":a_(t);break;case"assignee":r_(t);break;case"sprint":l_(t);break;case"labels":c_(t);break;case"exclude_labels":d_(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function i_(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Qe()}function s_(e){const t=fn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=$i(t);let s=`
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
        `}),e.innerHTML=s}function o_(e){const t=Wn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function a_(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(o.value)}">
                <input type="radio" name="type-filter-radio" value="${o.value}" ${n===o.value?"checked":""}>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=s}function r_(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;Ds({keepId:n||null}).forEach(({assignee:s,indent:o})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${fa(s,o)}</span>
            </label>
        `}),e.innerHTML=i}function l_(e){if(!J()){e.innerHTML=`
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
        `}),e.innerHTML=o}function c_(e){const t=Yn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function d_(e){const t=Qn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
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
            `}),e.innerHTML=s}function u_(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",o=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],a=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ze(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=fn();if(n.length>0){const d=$i(n),p=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Ke(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Wn();if(i.length>0){const d=i.map(p=>qe(p)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let d;o.value==="me"?d="Me":o.value==="unassigned"?d="Unassigned":d=jt(Qt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const a=document.getElementById("sprint-filter");if(a!=null&&a.value){const d=a.options[a.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||a.value,clearAction:"clear-sprint-filter"})}const r=Yn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),v=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(v==null?void 0:v.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Qn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),v=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(v==null?void 0:v.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${u(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Xe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Ic();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Tf(){const e=document.getElementById("sprint-filter");if(!e)return;const t=J(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Ac(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),o=s.find(a=>a.status==="active");o&&(i+=`<option value="current">Current Sprint (${u(o.name)})</option>`),Gm(t,o==null?void 0:o.id),Ac(o||null),s.forEach(a=>{const r=a.status==="active"?" (Active)":a.status==="completed"?" (Done)":"";i+=`<option value="${a.id}">${u(a.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function Ac(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,o=n>i,a=s>=80&&!o,r=o?"budget-over":a?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",o),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${o?'<span class="arrears-badge">In Arrears</span>':""}
    `}function p_(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Lf=!1;wt(e=>{if(e!=="currentProject"||A()!=="issues"||Lf)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Tf(),ff()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),qa(),Na(),lt(),Ze(),Xe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),lt(),Ze(),Xe()})});function m_(){Pk(e=>{Lf=e})}function Ua(){pf(),lt(),Ze(),Xe()}function Ga(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ua()}function Cc(){mf(),lt(),Ze(),Xe()}function Bc(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Cc()}function Dc(){qa(),lt(),Ze(),Xe()}function za(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Dc()}function Mc(){Na(),lt(),Ze(),Xe()}function Va(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Mc()}function f_(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Af(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,o,a;return(a=(o=(s=n==null?void 0:n.querySelector(`input[value="${f_(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:o.querySelector(".label-name"))==null?void 0:a.textContent}).filter(Boolean)}let Ys=0;function Qs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Cf(){var t,n,i,s,o,a;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:J()||"",status:[...fn()].sort(),priority:[...Wn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((a=(o=document.getElementById("issue-search"))==null?void 0:o.value)==null?void 0:a.trim())||""})}let hn=null;function g_(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Ii(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Bf(e,t){Ii(!1),ba(e),nt(t),A()==="issues"&&Dt(t),gt(),hn=e,Qs(Aw(e).hiddenClosed||0)}function h_(e,t,{loading:n}){ba(null),nt(t),A()==="issues"&&Dt(t),gt(),Ii(n),hn=e,Qs(0)}function Df(){ba(null),hn=null,Ii(!1),p_(),Qs(0)}function v_(){const e=document.getElementById("issues-list");Qs(0),e!=null&&e.querySelector(".issue-row")?Ii(!0):Df()}function b_(){const e=Rw(Cf()),t=e?lm(e):null;return t?(Pn(-1),Bf(e,t),!0):(Df(),!1)}function y_(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),o=new Set(t.map(c=>c.id)),a=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!o.has(c.id)&&!(c._isOptimistic&&a.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const p=d&&cm(d.updated_at,c.updated_at)?d:c;l.push(zk(p))}return r.length?[...r,...l]:l}async function Nt(){var k,x,w,_,B,G,C;Pn(-1),g_();const e=++Ys;if(!T())return;const t=J()||"",n=fn(),i=Wn(),s=(k=document.getElementById("assignee-filter"))==null?void 0:k.value,o=(w=(x=document.getElementById("issue-search"))==null?void 0:x.value)==null?void 0:w.trim();if(!t&&oe().length===0){hn=null,document.getElementById("issues-list").innerHTML=W({icon:K.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const a=Cf(),r={limit:1e3},l=((_=document.getElementById("sort-by-select"))==null?void 0:_.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(B=re())==null?void 0:B.id:r.assignee_id=s);const p=(G=document.getElementById("sprint-filter"))==null?void 0:G.value;if(p)if(p==="current"){if(t){const q=dk(t);if(q!==void 0)q&&(r.sprint_id=q);else try{const Y=(await h.getSprints(t)).find(ee=>ee.status==="active");Gm(t,Y==null?void 0:Y.id),Y&&(r.sprint_id=Y.id)}catch(F){console.error("Failed to resolve current sprint:",F)}}}else r.sprint_id=p;const f=(C=document.getElementById("issue-type-filter"))==null?void 0:C.value;f&&(r.issue_type=f),o&&o.length>=1?r.search=o:r.fields="list";let g=!1,v=!1,y=null;try{const q=Af(Yn(),"label-filter-dropdown");q.length>0&&(r.label=q,r.label_match="any");const F=Af(Qn(),"exclude-label-filter-dropdown");F.length>0&&(r.exclude_label=F),t&&(r.project_id=t);const Y=t||`team:${T().id}`;y=am({...r,scope:Y});const ee=lm(y);if(ee)g=!0,hn===y&&jw()===y&&mm(ie(),ee)||Bf(y,ee);else{const pe=Fw({...r,scope:Y});pe&&(pe.complete||pe.rows.length>0)?(v=!0,h_(y,pe.rows,{loading:!pe.complete})):v_()}const Z=pe=>t?h.getIssues(pe):oe().length>0?h.getTeamIssues(T().id,pe):Promise.resolve(void 0),I=r.search&&$i(n)==="open"?Z({...r,status:xc}).then(pe=>Array.isArray(pe)?pe.length:0).catch(pe=>(console.error("Failed to count closed search matches:",pe),0)):Promise.resolve(0),D=new Set(ie().map(pe=>pe.id)),M=await Z(r);if(dm(y,M),e!==Ys)return;um(a,y);const X=(g||v)&&hn===y,N=X?y_(ie(),M,D,hm(r)):M,Ie=X&&mm(ie(),N);ba(y),nt(N),A()==="issues"&&Dt(Array.isArray(N)?N.filter(pe=>!pe._isOptimistic):N);const L=[...new Set(N.map(pe=>pe.project_id).filter(Boolean))],ve=Object.keys(Ba()).length;if(await Um(L),e!==Ys)return;const ct=Object.keys(Ba()).length!==ve;(!Ie||ct)&&gt(),hn=y,Ii(!1);const ce=await I;if(Bw(y,{hiddenClosed:ce}),e!==Ys)return;Qs(ce)}catch(q){if(e!==Ys)return;Ii(!1);const F=(q==null?void 0:q.status)===403||(q==null?void 0:q.status)===404;if(g&&!F){E("refresh issues",q);return}F&&y&&Dw(y),hn=null;const Y=document.getElementById("issues-list");Y&&(Y.innerHTML=W({icon:K.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",q)}}function w_(){clearTimeout(Dy()),My(setTimeout(()=>{Nt()},300))}function lt(){uf(),Nt()}async function Mf(){if(uf(),Pa()==="sprint"){const e=ie(),t=[...new Set(e.map(n=>n.project_id))];await Um(t)}gt()}function $_(){Ze(),Xe()}function k_(e){const t=e==="open"?Ts:e==="closed"?xc:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ua(),Qe(),st("status")}function __(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ua()),Qe(),st("status")}function E_(){Ga(),Qe(),st("status"),Ze(),Xe()}function x_(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Cc()),Qe(),st("priority")}function I_(){Bc(),Qe(),st("priority"),Ze(),Xe()}function jf(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,lt()),Qe(),st("type"),Ze(),Xe(),xi()}function S_(){jf("")}function Rf(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,lt()),Qe(),st("assignee"),Ze(),Xe(),xi()}function T_(){Rf("")}function Pf(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,lt()),Qe(),st("sprint"),Ze(),Xe(),xi()}function L_(){Pf("")}function A_(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Dc()),Qe(),st("labels")}function C_(){za(),Qe(),st("labels"),Ze(),Xe()}function B_(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Mc()),Qe(),st("exclude_labels")}function D_(){Va(),Qe(),st("exclude_labels"),Ze(),Xe()}function M_(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Nt()),xi()}function j_(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Mf()),xi()}function R_(){Ga(),Bc();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),za(),Va(),lt(),Ze(),Xe()}le({"update-label-filter":()=>Dc(),"clear-label-filter":()=>za(),"update-exclude-label-filter":()=>Mc(),"clear-exclude-label-filter":()=>Va(),"show-filter-category":(e,t)=>{var n,i;st(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{i_();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>E_(),"set-status-preset":(e,t)=>k_(t.value),"show-all-statuses":()=>Ga(),"toggle-status-option":(e,t)=>__(t.filterValue,e),"clear-priority-filter-new":()=>I_(),"toggle-priority-option":(e,t)=>x_(t.filterValue,e),"set-type-filter":(e,t)=>jf(t.value),"clear-type-filter":()=>S_(),"set-assignee-filter":(e,t)=>Rf(t.value),"clear-assignee-filter":()=>T_(),"set-sprint-filter":(e,t)=>Pf(t.value),"clear-sprint-filter":()=>L_(),"clear-label-filter-new":()=>C_(),"toggle-label-option":(e,t)=>A_(t.filterValue,e),"clear-exclude-label-filter-new":()=>D_(),"toggle-exclude-label-option":(e,t)=>B_(t.filterValue,e),"set-sort":(e,t)=>M_(t.value),"set-group-by":(e,t)=>j_(t.value),"clear-all-filters":()=>R_(),"retry-load-issues":()=>Nt()});const qf=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function vn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Si(e){const t=vn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const P_=60,q_=150;let Je=[],Zs=1/0,bn=null,Ka=null,Xs=null;const Wa=new Map;let Ti=null,Ya=[],Js=null;const Nf=e=>{var t;return`${((t=re())==null?void 0:t.id)??""}|${e}`},N_=24;function O_(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(P_,Math.ceil((e+2*t)/N_))}function yn(e,t){if(e!==null&&(Ti!=null&&Ti.has(String(e))))return Ya.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,Zs));return Zs-=n.length,n.length<t.length&&Je.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Li(i)).join("")}function Of(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Hf(){clearTimeout(bn),bn=null,Rc++,Je=[],Ka=null,Js=null,Xs=null}function jc(e=1/0){if(Je.length===0)return;const t=document.getElementById("issues-list");if(!t||!(Xs!=null&&Xs.isConnected)){Hf();return}const n=new Map(ie().map(s=>[s.id,s]));let i=e;for(;Je.length>0&&i>0;){const s=Je[0],o=s.ids.slice(0,i),a=Of(t,s.groupKey),r=o.map(l=>n.get(l)).filter(Boolean).map(l=>Li(l)).join("");a==null||a.insertAdjacentHTML("beforeend",r),i-=o.length,o.length===s.ids.length?Je.shift():s.ids=s.ids.slice(o.length)}if(Js){const s=Js;Qa(t,s.issueId)&&(Js=null,Vf(t,s))}if(Je.length===0){clearTimeout(bn),bn=null;const s=Ka;Ka=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Ff(s)}}const H_=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{bn=setTimeout(e,0)}):bn=setTimeout(e,16);let Rc=0;function F_(){if(clearTimeout(bn),Je.length===0)return;const e=++Rc;H_(function t(){e===Rc&&(jc(q_),Je.length>0&&(bn=setTimeout(t,0)))})}function gt(){var d,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=X_(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},o=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),Hf(),Zs=O_();const a=ie();if(a.length===0){const f=(p=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:p.trim(),g=Ic()>0,v=f&&f.length>=2;if(g||v){const y=Ic(),k=[];v&&k.push(`search "${f}"`),g&&k.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=W({icon:K.issues,heading:"No matching issues",description:`No issues match your ${k.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=W({icon:K.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Pn(-1),Zs=1/0;return}const r=Pa();Ti=Wa.get(Nf(r))||null,Ya=[],r==="status"?U_(e,a):r==="priority"?G_(e,a):r==="type"?z_(e,a):r==="assignee"?V_(e,a):r==="sprint"?K_(e,a):e.innerHTML=Si(a)+yn(null,a),Zs=1/0,Xs=e.firstElementChild,Je.push(...Ya),Ya=[];const l=Ti;Ti=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&Gf(f,!0)}),o.forEach(([f,g])=>{f&&Z_(f,e,g)})),i&&(Qa(e,i.issueId)?Vf(e,i):Je.length>0&&(Js=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Je.length>0&&!c?Ka=n:Ff(n),F_()}function Ff(e){const t=Ep();if(t<0)return;const n=document.querySelectorAll(sa);if(n.length===0){Pn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Pn(i),n[i].classList.add("keyboard-selected")}function U_(e,t){const n={};Al.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Si(t);Al.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${et(s)}</span>
                    <span class="group-title">${Ke(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${vn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function G_(e,t){const n={};Lp.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Si(t);Lp.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ht(s)}</span>
                    <span class="group-title">${qe(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${vn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function z_(e,t){const n={};qf.forEach(s=>n[s]=[]),t.forEach(s=>{const o=s.issue_type||"task";n[o]&&n[o].push(s)});let i=Si(t);qf.forEach(s=>{const o=n[s];o.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${yt(s)}</span></span>
                    <span class="group-title">${yt(s)}</span>
                    <span class="group-count">${o.length}</span>
                    <span class="group-points">${vn(o)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(s,o)}
                </div>
            </div>
        `)}),e.innerHTML=i}function V_(e,t){const n={},i="__unassigned__";n[i]=[];const s=Ds({includeIdle:!0});s.forEach(({assignee:a})=>{n[a.id]=[]}),t.forEach(a=>{a.assignee_id&&n[a.assignee_id]?n[a.assignee_id].push(a):n[i].push(a)});let o=Si(t);n[i].length>0&&(o+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${vn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:a})=>{const r=n[a.id];if(!r||r.length===0)return;const l=jt(a)||"Unknown",c=a.is_agent?a.parent_user_name?` (${a.parent_user_name})`:" (agent)":"";o+=`
            <div class="issue-group" data-group="${m(a.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(a.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ct(a,"avatar-small")}</span>
                    <span class="group-title">${u(l)}${u(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${vn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(a.id,r)}
                </div>
            </div>
        `}),e.innerHTML=o}function K_(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const o={active:0,planned:1,completed:2},a=Ba();s.sort((l,c)=>{const d=a[l],p=a[c],f=d?o[d.status]??3:3,g=p?o[p.status]??3:3;return f-g});let r=Si(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=a[l],p=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${u(p)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${vn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(g,c)}
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
                    <span class="group-points">${vn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${yn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function Uf(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Qa(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function W_(e,t){const n=Of(e,t);if(!n)return;const i=new Map(ie().map(s=>[s.id,s]));Je=Je.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const o=s.ids.map(a=>i.get(a)).filter(Boolean).map(a=>Li(a)).join("");return n.insertAdjacentHTML("beforeend",o),!1})}function Gf(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function Y_(e,t){const n=Array.from(document.querySelectorAll(sa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(o=>t.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(o)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Pn(s)}function zf(e,t,n){Gf(t,n);const i=Nf(Pa());Wa.has(i)||Wa.set(i,new Set);const s=Wa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),W_(e,t.dataset.group)),Y_(e,t)}function Q_(e){const t=document.getElementById("issues-list"),n=t&&Uf(t,e);n&&zf(t,n,!n.classList.contains("collapsed"))}function Z_(e,t=document.getElementById("issues-list"),n=void 0){var o;if(!e||!t)return;const i=Je.find(a=>a.ids.includes(e)),s=i?i.groupKey===null?null:Uf(t,i.groupKey):(o=Qa(t,e))==null?void 0:o.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||zf(t,s,!1))}function X_(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function Vf(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Qa(e,t);if(!s)return;const o=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");o==null||o.focus({preventScroll:!0})}function Kf(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),o=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(o)}`}function J_(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),o=Math.min(e.length,i+t.length+n),a=e.slice(s,o),r=Kf(a,t);return`${s>0?"…":""}${r}${o<e.length?"…":""}`}const eE=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Li(e){var f,g,v;const t=e.assignee_id?Qt(e.assignee_id):null,n=t?jt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":eE.format(i),o=e.estimate!=null?di(e.estimate,e.project_id):"",a=ua(e.estimate,e.project_id),r=e.sprint_id?Ba()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((v=e.title)==null?void 0:v.toLowerCase().includes(c.toLowerCase())),p=c&&!d?J_(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${qe(e.priority)}">
                    ${ht(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Ke(e.status)}">
                    ${et(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${yt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${Kf(e.title,c)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
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
                    ${n?Ct(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function ht(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function et(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}le({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}Q_(t.group)},"show-inline-dropdown":(e,t,n)=>{Sc(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),ue(t.issueId))}});const eo=new Set(["image/png","image/jpeg","image/gif","image/webp"]),Pc={file:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',clip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',remove:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>'},to=new Map,wn=new Map;function qc(e){for(const t of e||[])t&&ys.test(t.id)&&to.set(t.id,t)}function no(e){return String(e||"").split(";")[0].trim().toLowerCase()}function Wf(e){let t=wn.get(e);return t||(t={promise:null,url:null,type:null},wn.set(e,t),t.promise=h.fetchAttachmentContent(e).then(n=>(t.type=no(n.type),wn.get(e)===t&&eo.has(t.type)&&(t.url=URL.createObjectURL(n)),t)),t.promise.catch(()=>{wn.get(e)===t&&wn.delete(e)})),t.promise}function tE(e){const t=wn.get(e);t!=null&&t.url&&URL.revokeObjectURL(t.url),wn.delete(e)}function Yf(){for(const e of[...wn.keys()])document.querySelector(`img[data-attachment-id="${e}"]`)||tE(e)}function nE(e){return`/api/attachments/${e}/content`}function Qf(e,t){const n=document.createElement("a");return n.className="attachment-link",n.href=nE(e),n.setAttribute("data-action","open-attachment"),n.setAttribute("data-attachment-ref",e),t&&n.setAttribute("data-filename",t),n.innerHTML=Pc.clip,n.append(` ${t||"Download attachment"}`),n}function iE(e,t){const n=document.createElement("span");n.className="attachment-unavailable";const i=(e==null?void 0:e.status)===410?"file no longer stored":(e==null?void 0:e.status)===404?"not found":"could not be loaded";return n.textContent=`${t||"Attachment"}: ${i}`,n}function Za(e=document){var n;const t=e.querySelectorAll("img[data-attachment-id]:not([data-attachment-state])");for(const i of t){const s=i.getAttribute("data-attachment-id");if(!ys.test(s)){i.setAttribute("data-attachment-state","invalid");continue}const o=i.getAttribute("alt")||((n=to.get(s))==null?void 0:n.filename)||"",a=to.get(s);if(a&&!eo.has(no(a.content_type))){i.replaceWith(Qf(s,a.filename||o));continue}i.setAttribute("data-attachment-state","loading"),Wf(s).then(r=>{r.url?(i.src=r.url,i.setAttribute("data-attachment-state","loaded")):i.isConnected&&i.replaceWith(Qf(s,o))},r=>{i.setAttribute("data-attachment-state","failed"),i.isConnected&&!i.closest(".attachment-thumb")&&i.replaceWith(iE(r,o))}).finally(Oc)}}let Nc=!1;function Oc(){Nc||(Nc=!0,queueMicrotask(()=>{Nc=!1,!(typeof document>"u")&&(Za(document),Yf())}))}let Hc=null;function sE(){Hc||typeof MutationObserver>"u"||!document.body||(Hc=new MutationObserver(Oc),Hc.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("auxclick",kE),Oc())}async function Zf(e,t){try{const n=await h.fetchAttachmentContent(e),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t||"attachment",s.rel="noopener",s.style.display="none",document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e4)}catch(n){E("download attachment",n)}}let $n=null;function oE(){$n==null||$n.disconnect(),$n=null;const e=document.getElementById("modal-overlay");!e||typeof MutationObserver>"u"||($n=new MutationObserver(()=>{var t;e.classList.contains("hidden")&&($n.disconnect(),$n=null,(t=document.querySelector("#modal-content .attachment-viewer"))==null||t.remove(),Yf())}),$n.observe(e,{attributes:!0,attributeFilter:["class"]}))}function aE(e,t){var n,i;document.getElementById("modal-title").textContent=t||"Attachment",document.getElementById("modal-content").innerHTML=`
        <figure class="attachment-viewer">
            <img data-attachment-id="${m(e)}" alt="${m(t||"")}">
            <figcaption class="attachment-viewer-actions">
                <button type="button" class="btn btn-secondary btn-sm" data-action="download-attachment" data-attachment-id="${m(e)}" data-filename="${m(t||"")}">Download</button>
            </figcaption>
        </figure>`,(n=document.querySelector(".modal"))==null||n.classList.add("modal-wide"),U(),oE(),(i=document.querySelector("#modal-content .attachment-viewer-actions button"))==null||i.focus(),Za(document.getElementById("modal-content"))}async function rE(e,{filename:t="",contentType:n=""}={}){if(!ys.test(e||""))return;const i=to.get(e),s=t||(i==null?void 0:i.filename)||"";let o=no(n||(i==null?void 0:i.content_type));if(!o)try{o=(await Wf(e)).type}catch(a){E("open attachment",a);return}eo.has(o)?aE(e,s):Zf(e,s)}let ne=null;function Fc(e){const t=Number(e)||0;return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(t<10*1024?1:0)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function lE(e,{userId:t,isAdmin:n}){return n!==!1||!!t&&e.uploader_id===t}function cE(e,t){const n=eo.has(no(e.content_type)),i=e.filename||"attachment",s=[Fc(e.size),e.uploader_name||"Unknown",Le(e.created_at)].filter(Boolean).map(u).join(" · ");return`
        <li class="attachment-item">
            <button type="button" class="attachment-open" data-action="open-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" data-content-type="${m(e.content_type||"")}" title="${n?"View":"Download"} ${m(i)}">
                <span class="attachment-thumb">${n?`<img data-attachment-id="${m(e.id)}" alt="">`:Pc.file}</span>
                <span class="attachment-name">${u(i)}</span>
                <span class="attachment-meta">${s}</span>
            </button>
            ${lE(e,t)?`<button type="button" class="attachment-delete" data-action="delete-attachment" data-attachment-id="${m(e.id)}" data-filename="${m(i)}" title="Delete" aria-label="Delete ${m(i)}">${Pc.remove}</button>`:""}
        </li>`}const Xf=10*1024*1024,dE=/^(image\/|video\/|audio\/|font\/)|^application\/(zip|gzip|x-gzip|x-tar|x-7z-compressed|x-rar-compressed|vnd\.rar|x-bzip2|x-xz|java-archive|vnd\.android\.package-archive|x-msdownload|wasm)$/,uE=2*1024*1024;function pE(e){const t=(e==null?void 0:e.name)||"file",n=no(e==null?void 0:e.type);return!e||e.size===0&&!n?`${t} is empty or a folder`:e.size>Xf?`${t} is ${Fc(e.size)}; the limit is ${Fc(Xf)}`:n&&!eo.has(n)&&dE.test(n)?`${t} can't be attached: only PNG, JPEG, GIF, WebP, PDF or plain text`:null}const mE="Drop files here, or use Add. PNG, JPEG, GIF, WebP, PDF or text, up to 10 MB.";function Jf(e,t){return e===null?'<p class="attachments-hint">Attachments could not be loaded.</p>':e.length?`<ul class="attachment-grid">${e.map(n=>cE(n,t)).join("")}</ul>`:`<p class="attachments-hint">${mE}</p>`}function fE(e,t,{userId:n=null,isAdmin:i=!1}={}){ne={issueId:e,attachments:t?[...t]:null,userId:n,isAdmin:i},qc(t||[]);const s=(t==null?void 0:t.length)||0;return`
        <section class="attachments${Array.isArray(t)&&!s?" is-empty":""}" id="issue-attachments" aria-label="Attachments" data-issue-id="${m(e)}">
            <div class="related-head">
                <h3 id="attachments-heading" tabindex="-1">Attachments <span class="section-count">${s||""}</span></h3>
                <label class="ticket-gate-text-btn attachments-add">
                    + Add
                    <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${m(e)}" aria-label="Attach files">
                </label>
            </div>
            <div class="attachments-status" role="status" aria-live="polite"></div>
            <div class="attachments-body">${Jf(ne.attachments,{userId:n,isAdmin:i})}</div>
        </section>`}function Uc(e){const t=document.getElementById("issue-attachments");return t&&ne&&ne.issueId===e&&t.dataset.issueId===e?t:null}function Gc(e,t){var i;const n=(i=Uc(e))==null?void 0:i.querySelector(".attachments-status");n&&(n.textContent=t)}function eg(e){const t=Uc(e);if(!t)return;const{attachments:n,userId:i,isAdmin:s}=ne;t.querySelector(".section-count").textContent=n!=null&&n.length?String(n.length):"",t.classList.toggle("is-empty",Array.isArray(n)&&n.length===0);const o=t.querySelector(".attachments-body");o.innerHTML=Jf(n,{userId:i,isAdmin:s}),Za(o)}function gE(){if(typeof crypto<"u"&&typeof crypto.randomUUID=="function")return crypto.randomUUID();const e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;const t=[...e].map(n=>n.toString(16).padStart(2,"0")).join("");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}const hE=e=>new Promise(t=>setTimeout(t,e)),tg={inFlightRetryMs:1e3,inFlightTries:3},ng=e=>{var t;return((t=e==null?void 0:e.detail)==null?void 0:t.error_code)==="idempotency_in_flight"};async function vE(e,t){const n=gE(),i=()=>h.uploadAttachment(e,t,{idempotencyKey:n});try{return await i()}catch(s){if(!(s!=null&&s.isNetworkError)||t.size>uE)throw s}for(let s=1;;s++)try{return await i()}catch(o){if(!ng(o)||s>=tg.inFlightTries)throw o;await hE(tg.inFlightRetryMs)}}async function bE(e){try{const t=await h.getAttachments(e);return qc(t),(ne==null?void 0:ne.issueId)===e&&(ne.attachments=[...t]),t}catch{return null}}let ig=Promise.resolve();function sg(e,t){const n=[...t||[]],i=ig.then(()=>yE(e,n));return ig=i.catch(()=>0),i}async function yE(e,t){if(!t.length)return 0;let n=0,i=!1;for(const[s,o]of t.entries()){const a=pE(o);if(a){$(a,"error");continue}Gc(e,t.length>1?`Uploading ${o.name} (${s+1} of ${t.length})…`:`Uploading ${o.name}…`);try{const r=await vE(e,o);n+=1,qc([r]),(ne==null?void 0:ne.issueId)===e&&ne.attachments&&(ne.attachments=[...ne.attachments.filter(l=>l.id!==r.id),r])}catch(r){r!=null&&r.isNetworkError||ng(r)?(i=!0,$(`${o.name} may not have been attached; the list shows what was`,"error")):E(`attach ${o.name}`,r)}}return(ne==null?void 0:ne.issueId)===e&&(i||n&&ne.attachments===null)&&await bE(e),eg(e),Gc(e,n?n===1?"1 file attached":`${n} files attached`:""),n&&$(n===1?"File attached":`${n} files attached`,"success"),n}async function wE(e,t){if(!ys.test(e||"")||!confirm(`Delete ${t||"this attachment"}? Comments that show it will show it as missing.`))return!1;try{await h.deleteAttachment(e)}catch(a){return E("delete attachment",a),!1}to.delete(e);const n=ne==null?void 0:ne.issueId,i=(ne==null?void 0:ne.attachments)||[],s=i.findIndex(a=>a.id===e);ne!=null&&ne.attachments&&(ne.attachments=i.filter(a=>a.id!==e)),eg(n);const o=Uc(n);if(o){const a=ne.attachments||[],r=a[Math.min(Math.max(s,0),a.length-1)],l=r?o.querySelector(`.attachment-open[data-attachment-id="${r.id}"]`):(o.classList.contains("is-empty")?document.querySelector('.sidebar-actions input[data-action="pick-attachments"]'):null)||o.querySelector("#attachments-heading");l==null||l.focus(),Gc(n,`${t||"Attachment"} deleted`)}return $("Attachment deleted","success"),!0}function $E(e,t,n){if(!e)return;const i=r=>{var l;return Array.from(((l=r.dataTransfer)==null?void 0:l.types)||[]).includes("Files")},s=r=>{var l;return(l=document.getElementById("issue-attachments"))==null?void 0:l.classList.toggle("is-dragover",r)};e.addEventListener("dragover",r=>{i(r)&&(r.preventDefault(),r.dataTransfer&&(r.dataTransfer.dropEffect="copy"),s(!0))},{signal:n}),e.addEventListener("dragleave",r=>{r.relatedTarget&&e.contains(r.relatedTarget)||s(!1)},{signal:n}),e.addEventListener("drop",r=>{i(r)&&(r.preventDefault(),s(!1),sg(t,r.dataTransfer.files))},{signal:n});const o=new AbortController;n==null||n.addEventListener("abort",()=>o.abort(),{once:!0});const a=()=>e.isConnected&&!e.closest(".hidden");for(const r of["dragover","drop"])document.addEventListener(r,l=>{var c,d;if(!a()){o.abort();return}!i(l)||l.defaultPrevented||e.contains(l.target)||(d=(c=l.target)==null?void 0:c.closest)!=null&&d.call(c,'input[type="file"]')||(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="none"),r==="drop"&&s(!1))},{signal:o.signal})}const zc=(e,t)=>e.type==="click"||e.type==="keydown"&&t.tagName!=="A"&&t.tagName!=="BUTTON";function og(e){rE(e.dataset.attachmentId||e.dataset.attachmentRef,{filename:e.dataset.filename||e.getAttribute("alt")||"",contentType:e.dataset.contentType||""})}function kE(e){var n,i;if(e.button!==1)return;const t=(i=(n=e.target)==null?void 0:n.closest)==null?void 0:i.call(n,'[data-action="open-attachment"]');t&&(e.preventDefault(),og(t))}le({"open-attachment":(e,t,n)=>{zc(e,n)&&(e.preventDefault(),og(n))},"download-attachment":(e,t,n)=>{zc(e,n)&&Zf(t.attachmentId,t.filename)},"delete-attachment":(e,t,n)=>{zc(e,n)&&wE(t.attachmentId,t.filename)},"pick-attachments":(e,t,n)=>{if(e.type!=="change")return;const i=[...n.files||[]];n.value="",sg(t.issueId,i)}});const Ai={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function kn(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function io(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Vc(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function Xa(e){return io(e)&&!!Vc(e)}function Ja(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],o=[];for(const a of n)((kn(a)||io(a)&&!Xa(a))&&t?s:o).push(a);return{needsYou:s,waiting:o,done:i,total:n.length+i.length}}function Kc(e,t,n){return e===1?t:n}function so(e){return kn(e)?"Review":Xa(e)?"Ask again for":io(e)?"Sign off on":Vc(e)?"Re-attest":"Attest"}function Wc(e,t){return kn(e)?"an admin":io(e)&&!Xa(e)?"a person":t||"the assignee"}function _E(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function ag(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${_E(t)}</span></div>`}function rg(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${Ai.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${Ai.link}Linked document</a>`}function lg(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(Le(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${pt(t.note)}</div>`:""}
            ${rg(t)}
        </div>`:""}function cg(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(Le(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function Yc(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!kn(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${cg(t)}</div>`}const Ci=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function EE(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${Ci(e,t)}>Send back…</button>`;return kn(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${Ci(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${Ci(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function xE(e,t,n){return Xa(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${Ci(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":kn(e)||io(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${Ci(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${Ci(e,t)}>Attest it yourself</button>`}function dg(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(so(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function Qc(e,t){const{needsYou:n,waiting:i,done:s,total:o}=e,a=(l,c,d,p)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(d)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var c;return a(Ai.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>a(Ai.ring,"you",l.name,"waiting on you")),...i.map(l=>a(Ai.ring,"",l.name,`waiting on ${Wc(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${o} ${Kc(o,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function IE(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=Ja(e,{canAct:t});return n[0]||i[0]||null}function SE(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:o}=Ja(e,{canAct:t});if(o===0)return"";const a=i[0]||s[0];return a?`Waiting on ${i.length?"you":Wc(a,n)}: ${so(a).toLowerCase()} ${a.name}.`:`All ${o} ${Kc(o,"ritual","rituals")} done.`}function TE(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=Ja(e,{canAct:n}),{needsYou:o,waiting:a,total:r}=s;if(r===0)return"";if(o.length===0&&a.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${Ai.check}</span>
                ${Qc(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${Kc(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(o.length>0){const p=o[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${ag("you",p)}
                <h2 class="ticket-gate-step">${u(so(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${pt(p.prompt)}</div>`:""}
                ${lg(p)}
                ${Yc(p)}
                <div class="ticket-gate-actions">${EE(p,t)}</div>
                ${dg([...o.slice(1),...a],"Then")}
                ${Qc(s,i)}
            </section>`}const l=a[0],c=l.attestation?null:Vc(l),d=xE(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${ag(Wc(l,i),l)}
            <h2 class="ticket-gate-step">${u(so(l))} <b>${u(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${cg(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${pt(l.prompt)}</div>`:""}
            ${lg(l)}
            ${Yc(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${dg(a.slice(1),"After that")}
            ${Qc(s,i)}
        </section>`}function LE(e,{canAct:t=!1}={}){const{needsYou:n}=Ja(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(so(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const AE={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},ug=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function CE(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const pg={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function BE(e,t=[],n=[],{formatEstimate:i=null}={}){const s=a=>a.estimate==null?"":` · ${u(i?i(a.estimate,a.project_id||e.project_id):`${a.estimate} pts`)}`,o=[...(t||[]).map(a=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${et(a.status)}</span>
                    ${ug(a.id,a.identifier,a.title)}
                    <span class="related-kind">Sub-issue${s(a)}</span>
                </li>`})),...(n||[]).map(a=>{const r=CE(a);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${et(a.related_issue_status)}</span>
                    ${ug(a.related_issue_id,a.related_issue_identifier,a.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(a.id)}" title="Remove link" aria-label="Remove link to ${m(a.related_issue_identifier)}">${AE.remove}</button>
                </li>`}})].sort((a,r)=>pg[a.kind]-pg[r.kind]);return`
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
        </section>`}const DE=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function ME(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${DE(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(Le(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${Ps(e.content).trim()}</div>
            </div>
        </li>`}const mg=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${Ps(t).trim()}</div></details>`;function jE(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let o,a="",r="";return e.activity_type==="ritual_attested"?(o=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?a=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(a=" · waiting for review"),e.new_value&&(r=mg("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(o=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=mg("Reason",e.new_value,!0))):o=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${o}</span>${a}
                <span class="timeline-meta">· ${u(n(e))} · ${u(Le(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function RE(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function PE(e){const t=[];let n=[];const i=()=>{n.length>1?t.push(`<li class="timeline-run"><details><summary>${n.length} updates</summary><ol class="timeline timeline-run-list">${n.join("")}</ol></details></li>`):t.push(...n),n=[]};for(const s of e)s.fold?n.push(s.html):(i(),t.push(s.html));return i(),t.join("")}function qE({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:o=!1,issueId:a},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...RE(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const v=d.get(g.field_name);(!v||new Date(g.created_at)>new Date(v.created_at))&&d.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:ME(g),fold:!1})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const v=d.get(g.field_name)===g;return{at:g.created_at,html:jE(g,{...r,awaitingReview:v,gateShowsIt:v&&g.field_name===i}),fold:!v&&g.activity_type!=="ritual_rejected"}})].sort((g,v)=>new Date(g.at)-new Date(v.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${o?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(a)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${PE(p)}</ol>`:o?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}async function fg(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=ci(t.project_id).map(a=>`
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
        `,U();const o=document.getElementById("edit-issue-description");if(o){const a=bs(e);if(a){const r=dp(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(o.value=a,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}o.addEventListener("input",()=>{const r=o.value;r!==(t.description||"")?Mn(e,r,t.description||""):Mn(e,null)})}}catch(t){E("load issue",t)}}async function NE(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),o=document.getElementById("edit-issue-priority"),a=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!o||!a)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:o.value,issue_type:a.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);bs(t)===c.description&&Mn(t,null),H(),await ue(t),$("Issue updated!","success"),Ws(d)}catch(n){E("update issue",n)}}async function OE(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Nt(),await mt(),O("issues"),$("Issue deleted!","success")}catch(t){E("delete issue",t)}}le({"update-issue":(e,t)=>{NE(e,t.issueId)}});const HE=1,FE={bold:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',italic:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',code:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',bulletList:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',blockquote:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>'},UE=[["bold","Bold"],["italic","Italic"],["code","Code"],["link","Link"],["bulletList","Bulleted list"],["blockquote","Quote"]],GE="This comment uses markdown the editor would change, so it stays as markdown.";let Bi=null;function zE(){const e=document.querySelector('meta[name="chaotic-version"]'),t=e?e.getAttribute("data-editor"):"";return`/static/js/editor.bundle.js${!!t&&/^[0-9a-f]{8}$/.test(t)?`?v=${t}`:""}`}function er(e){return e&&e.API_VERSION===HE?e:null}function VE(){const e=er(window.ChaoticEditor);return e?Promise.resolve(e):Bi||(Bi=new Promise((t,n)=>{const i=document.createElement("script");i.src=zE(),i.async=!0,i.onload=()=>{const s=er(window.ChaoticEditor);s?t(s):n(new Error("editor bundle is a different version"))},i.onerror=()=>{i.remove(),n(new Error("editor bundle failed to load"))},document.head.appendChild(i)}).then(t=>(Bi=null,t),t=>{throw Bi=null,t}),Bi)}const Di=new Map;function KE(e,{signal:t,mentionContext:n={},placeholder:i="",restore:s=null}={}){const o=document.getElementById(e);if(!o||o.dataset.richComposer==="true")return null;o.dataset.richComposer="true";const a=o.closest("form"),r={textarea:o,form:a,editor:null,api:null,wrapper:null,toolbar:null,note:null,mode:"markdown",syncing:!1,composing:!1,pendingApi:null,destroyed:!1,mentionContext:n,placeholder:i||o.getAttribute("placeholder")||"",start:null};return Di.set(e,r),WE(r,t),o.addEventListener("compositionstart",()=>{r.composing=!0},{signal:t}),o.addEventListener("compositionend",()=>{if(r.composing=!1,r.pendingApi){const l=r.pendingApi;r.pendingApi=null,Zc(r,l,{focus:document.activeElement===o})}},{signal:t}),r.start=({focus:l=!1,restoreTo:c=null}={})=>{if(r.editor||r.destroyed||py()==="markdown")return;const d=er(window.ChaoticEditor);if(d){Zc(r,d,{focus:l,restore:c});return}VE().then(p=>{if(!(r.destroyed||r.editor||!p)){if(r.composing){r.pendingApi=p;return}Zc(r,p,{focus:l||document.activeElement===o})}}).catch(()=>{})},o.addEventListener("focus",()=>r.start(),{signal:t}),Jc(r,"markdown",{}),er(window.ChaoticEditor)&&r.start({restoreTo:s}),a==null||a.addEventListener("focusin",()=>a.classList.add("composer-active"),{signal:t}),a==null||a.addEventListener("focusout",l=>{!a.contains(l.relatedTarget)&&!o.value&&a.classList.remove("composer-active")},{signal:t}),s&&(a==null||a.classList.add("composer-active")),o.addEventListener("input",()=>{var l,c;if(!(r.syncing||r.mode!=="rich"||!r.editor)){if(!r.api.roundTripsCleanly(r.editor,o.value,Ps)){Xc(r,{focus:!0,refused:!0});return}r.editor.commands.setContent(o.value,{contentType:"markdown",emitUpdate:!1}),r.editor.commands.focus("end"),(c=(l=r.wrapper).scrollIntoView)==null||c.call(l,{behavior:"smooth",block:"nearest"})}},{signal:t}),t==null||t.addEventListener("abort",()=>ZE(e,r)),r}function WE(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="toolbar rich-composer-toolbar",s.setAttribute("role","toolbar"),s.setAttribute("aria-label","Formatting"),s.innerHTML=`${UE.map(([r,l])=>`<button type="button" class="icon-btn" data-tool="${r}" title="${l}" aria-label="${l}" aria-pressed="false" tabindex="-1">${FE[r]}</button>`).join("")}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;const o=document.createElement("div");o.className="rich-composer-note",o.setAttribute("role","status"),o.hidden=!0,s.addEventListener("mousedown",r=>{r.target.closest("button")&&r.preventDefault()},{signal:t}),s.addEventListener("click",r=>{const l=r.target.closest("button[data-tool]");if(l){if(l.dataset.tool==="mode"){e.mode==="rich"?Xc(e,{focus:!0,remember:!0}):gg(e,{focus:!0});return}if(!(!e.editor||e.mode!=="rich")){if(l.dataset.tool==="link"){const c=e.editor.getAttributes("link").href||"",d=window.prompt("Link URL (leave empty to remove the link)",c);if(d===null){e.editor.commands.focus();return}e.api.COMMANDS.link(e.editor,d)||$("That link can’t be added. Use an http, https or mailto address.","error")}else e.api.COMMANDS[l.dataset.tool](e.editor);tr(e)}}},{signal:t}),s.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const l=[...s.querySelectorAll("button")].filter(p=>!p.disabled&&!p.hidden),c=l.indexOf(document.activeElement);if(c<0||!l.length)return;r.preventDefault();const d=r.key==="Home"?0:r.key==="End"?l.length-1:(c+(r.key==="ArrowRight"?1:-1)+l.length)%l.length;l.forEach(p=>{p.tabIndex=-1}),l[d].tabIndex=0,l[d].focus()},{signal:t});const a=i==null?void 0:i.querySelector(".comment-box-foot");a?(a.prepend(s),i.append(o),i.classList.add("has-rich-composer")):i?(i.append(s,o),i.classList.add("has-rich-composer")):(n.insertAdjacentElement("afterend",s),s.insertAdjacentElement("afterend",o)),e.toolbar=s,e.note=o}function Zc(e,t,{focus:n=!1,restore:i=null}={}){YE(e,t)&&(gg(e,{focus:n||!!i,remember:!1}),i&&e.mode==="rich"&&QE(e,i))}function YE(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="rich-composer",s.hidden=!0,n.insertAdjacentElement("beforebegin",s);try{e.editor=t.createEditor({element:s,markdown:"",placeholder:e.placeholder,getMentionItems:o=>_m(o,e.mentionContext),onUpdate:o=>{e.syncing=!0,n.value=o,n.dispatchEvent(new Event("input",{bubbles:!0})),e.syncing=!1,tr(e)},onSubmit:()=>i==null?void 0:i.requestSubmit(),onEscape:()=>e.editor.commands.blur()})}catch{return s.remove(),e.editor=null,!1}return e.wrapper=s,e.api=t,e.editor.on("selectionUpdate",()=>tr(e)),!0}function gg(e,{focus:t=!1,remember:n=!0}={}){if(n&&fp("rich"),!e.editor){e.start({focus:t});return}if(!e.api.roundTripsCleanly(e.editor,e.textarea.value,Ps)){Xc(e,{focus:t,refused:!0});return}e.editor.commands.setContent(e.textarea.value||"",{contentType:"markdown",emitUpdate:!1}),Jc(e,"rich",{focus:t})}function Xc(e,{focus:t=!1,remember:n=!1,refused:i=!1}={}){n&&fp("markdown"),Jc(e,"markdown",{focus:t,refused:i})}function Jc(e,t,{focus:n=!1,refused:i=!1}={}){const{textarea:s,editor:o,wrapper:a,toolbar:r,note:l}=e,c=t==="rich"&&!!o;e.mode=c?"rich":"markdown",s.hidden=c,a&&(a.hidden=!c),r.classList.toggle("markdown-mode",!c);const d=r.querySelector(".rich-mode-toggle");d.setAttribute("aria-pressed",String(!c)),d.title=c?"Write raw markdown":"Back to the formatted editor",l.hidden=!i,l.textContent=i?GE:"",n&&(c?o.commands.focus("end"):(s.focus(),s.setSelectionRange(s.value.length,s.value.length))),tr(e)}function tr(e){if(!e.toolbar)return;const t=!!e.editor&&e.mode==="rich",n=t?e.api.activeMarks(e.editor):{};e.toolbar.querySelectorAll(".icon-btn[data-tool]").forEach(o=>{const a=!!n[o.dataset.tool];o.setAttribute("aria-pressed",String(a)),o.classList.toggle("is-active",a),o.disabled=!t,o.hidden=!t});const i=[...e.toolbar.querySelectorAll("button")],s=i.filter(o=>!o.disabled&&!o.hidden);s.some(o=>o.tabIndex===0)||(i.forEach(o=>{o.tabIndex=-1}),(s[0]||i.at(-1)).tabIndex=0)}function QE(e,{from:t,to:n}){const i=e.editor.state.doc.content.size,s=o=>Math.max(1,Math.min(o,i));try{e.editor.chain().focus().setTextSelection({from:s(t),to:s(n)}).run()}catch{e.editor.commands.focus("end")}}function ZE(e,t){t.destroyed=!0,t.editor&&t.editor.destroy(),t.editor=null,document.querySelectorAll(".rich-mention-suggestions").forEach(n=>n.remove()),Di.get(e)===t&&Di.delete(e)}function XE(e){var i,s,o;const t=Di.get(e);if(t&&t.editor&&t.mode==="rich")return t.editor.commands.focus("end"),(s=(i=t.wrapper).scrollIntoView)==null||s.call(i,{behavior:"smooth",block:"nearest"}),!0;const n=document.getElementById(e);return n?(n.focus(),(o=n.scrollIntoView)==null||o.call(n,{behavior:"smooth",block:"nearest"}),!0):!1}function JE(e){const t=Di.get(e);if(!t||!t.editor||t.mode!=="rich"||!t.editor.isFocused)return null;const{from:n,to:i}=t.editor.state.selection;return{from:n,to:i}}function ex(){for(const e of Di.values())if(e.editor&&(e.editor.view.composing||e.editor.isFocused&&document.querySelector(".rich-mention-suggestions:not([hidden])")))return!0;return!1}let ed=!1,td=!1,nr=null,oo=null,ao=null,ir=null,nd=!1,sr=null;function id(e=null){nd=!0,e&&(sr=e)}function hg(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function sd(e){return e.user_name||e.user_email||"Unknown"}const od=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function ad(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Ke(t(e.old_value)))}</strong> to <strong>${u(Ke(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(qe(t(e.old_value)))}</strong> to <strong>${u(qe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${od(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${od(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${od(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function ro(e){const t=()=>{var i;const n=(i=Ee())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;nr=n,dd(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;nr=null,dd(e)}}function vg(){const e=re();if(!e||e.is_agent)return!1;const t=Et();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}function tx(e){const t=re(),n=oe().find(a=>a.id===(e==null?void 0:e.project_id)),i=T(),s=Et()||[];if(!n||!i||n.team_id!==i.id||s.length===0)return{userId:(t==null?void 0:t.id)||null,isAdmin:null};const o=s.find(a=>a.user_id===(t==null?void 0:t.id));return{userId:(t==null?void 0:t.id)||null,isAdmin:!!o&&(o.role==="admin"||o.role==="owner")}}let lo=null,rd=!0;function ld(){var o;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!rd;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((o=e.firstElementChild)==null?void 0:o.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function bg(){lo&&(lo.disconnect(),lo=null),rd=!0,ld()}const nx=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function ix(){bg();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!nx()||(lo=new IntersectionObserver(t=>{rd=t[t.length-1].isIntersecting,ld()}),lo.observe(e))}function sx(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let cd=null;function dd(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&cd===e,s=document.activeElement,o=!!t&&!!s&&(t.contains(s)||s===document.body),a=nr,r=vg(),l=Ee(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?Qt(c.assignee_id):null,p=d?jt(d):(c==null?void 0:c.assignee_name)||null;if(((v,y)=>{v&&(v.innerHTML=y,v.classList.toggle("hidden",y.trim()===""))})(t,a?TE(a,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),cd=e,n){const v=a?LE(a,{canAct:r}):"";n.innerHTML=v?`<div class="ticket-gate-sticky-bar">${v}</div>`:"",ld()}if(i){const v=document.getElementById("ticket-gate-live");if(v&&(v.textContent=a?SE(a,{canAct:r,assigneeName:p}):""),o&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function or({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function ox(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&or({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||or()},{signal:e})}async function ar(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await ue(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function ud(e){const t=Es(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function pd({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function ax(){var a;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=Ee();if(!t)return;const n=ud(t.id);oo=n.prevIssue?n.prevIssue.id:null,ao=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),o=pd(n);s?o?s.outerHTML=o:s.remove():o&&((a=i.querySelector(".back-link"))==null||a.insertAdjacentHTML("afterend",o))}wt(e=>{e==="detailNavContext"&&ax()});let co=0;const yg=500;function rx(){co++}let wg=0,rr=!1;function $g(){if(document.querySelector(".description-inline-editor"))return"editor";if(ki())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector("details.related-add[open]")||e!=null&&e.querySelector(".timeline-run details[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||rr||ex()?"transient":null}function kg(e){return id(),e==="editor"?"deferred":"retry"}function lx(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=Ee())==null?void 0:n.id)===e}function cx(e){return ie().find(t=>t.id===e)||Vl(e)||Es().find(t=>t.id===e)||null}function dx(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;bg(),cd=null,li(e);const i=ud(e.id);oo=i.prevIssue?i.prevIssue.id:null,ao=i.nextIssue?i.nextIssue.id:null;const s=oe().find(r=>r.id===e.project_id),o=e.assignee_id?Qt(e.assignee_id):null,a=A()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(a)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${pd(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${et(e.status)}<span>${Ke(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${ht(e.priority)}<span>${qe(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${o?u(jt(o)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function ue(e,t=!0,{refresh:n=!1}={}){var o;const i=n?co:++co,s=++wg;if(n){const a=$g();if(a)return kg(a)}try{t&&un();let a=!1;if(!n){const L=cx(e);L&&(dx(L),t&&(history.pushState({issueId:e,view:A()},"",`/issue/${L.identifier}`),a=!0))}let r=!1;const[l,c,d,p,f,g,v]=await Promise.all([h.getIssue(e),h.getComments(e).catch(L=>(console.error("Failed to load comments:",L),r=!0,[])),h.getActivities(e,0,yg),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]})),h.getAttachments(e).catch(L=>(console.error("Failed to load attachments:",L),null))]),y=[...c].sort((L,ve)=>new Date(L.created_at)-new Date(ve.created_at)),k=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(L=>(console.error("Failed to load sprints:",L),[]))],[x,w]=await Promise.all(k);if(i!==co)return"dropped";let _=null,B=null,G=null;if(n){if(s!==wg||!lx(e))return"dropped";const L=$g();if(L)return kg(L);G=window.scrollY;const ve=document.activeElement;B=JE("new-comment"),ve!=null&&ve.id&&document.getElementById("issue-detail-view").contains(ve)&&(_={id:ve.id,start:ve.selectionStart,end:ve.selectionEnd})}nr=g,t&&!a&&history.pushState({issueId:e,view:A()},"",`/issue/${l.identifier}`),li(l),Tp(w),nd=!1,sr=null,document.querySelectorAll(".view").forEach(L=>L.classList.add("hidden"));const C=document.getElementById("issue-detail-view");C.classList.remove("hidden");const q=A()||"my-issues",F=oe().find(L=>L.id===l.project_id),Y=l.assignee_id?Qt(l.assignee_id):null,ee=Y?jt(Y):null,Z=l.sprint_id?w.find(L=>L.id===l.sprint_id):null,I=ud(l.id),{prevIssue:D,nextIssue:M}=I;C.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(q)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${pd(I)}
                        <span class="issue-detail-breadcrumb">${F?u(F.name):"Project"} › ${u(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(l.title)}</h1>
                    <div class="issue-state" role="group" aria-label="Status, assignee and priority">
                    <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${m(l.id)}">
                        <span class="property-label sr-only" id="issue-state-status-label">Status</span>
                        <button class="property-value" id="issue-state-status" aria-labelledby="issue-state-status-label issue-state-status">
                            ${et(l.status)}
                            <span>${Ke(l.status)}</span>
                        </button>
                    </div>
                    <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                        <span class="property-label sr-only" id="issue-state-assignee-label">Assignee</span>
                        <button class="property-value" id="issue-state-assignee" aria-labelledby="issue-state-assignee-label issue-state-assignee">
                            ${ee?`${Ct(Y,"avatar-small")}<span>${u(ee)}</span>`:'<span class="text-muted">Unassigned</span>'}
                        </button>
                    </div>
                    <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                        <span class="property-label sr-only" id="issue-state-priority-label">Priority</span>
                        <button class="property-value" id="issue-state-priority" aria-labelledby="issue-state-priority-label issue-state-priority">
                            ${ht(l.priority)}
                            <span>${qe(l.priority)}</span>
                        </button>
                    </div>
                    </div>

                    ${x?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(x.identifier)}" data-action="navigate-issue" data-issue-id="${m(x.id)}" data-identifier="${m(x.identifier)}">${x.identifier}: ${u(x.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${bs(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${bs(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?Fn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${fE(l.id,v,tx(l))}

                    ${BE(l,p,f,{formatEstimate:di})}

                    ${qE({comments:y,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((o=IE(g,{canAct:vg()}))==null?void 0:o.name)||null,activitiesTruncated:d.length>=yg},{formatText:ad,formatActor:sd})}

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
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${yt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${m(l.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${Z?u(Z.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${m(l.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${l.labels&&l.labels.length>0?l.labels.map(L=>`
                                        <span class="issue-label" style="background: ${ae(L.color)}20; color: ${ae(L.color)}">${u(L.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${F?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(F.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${ua(l.estimate,l.project_id)?" out-of-scale":""}" ${ua(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${di(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${l.creator?Ct(l.creator,"avatar-small"):""}<span>${u(l.creator_name||"Unknown")}</span> ${ea(l.creator)}</span>
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
        `,ir&&ir.abort(),ir=new AbortController;const{signal:X}=ir;ix(),dd(l.id),tc("new-comment","mention-suggestions",{projectId:l.project_id}),Tm({signal:X}),ox(X),$E(C.querySelector(".detail-main"),l.id,X),Za(C);const N=document.getElementById("new-comment");if(rr=!1,N){N.addEventListener("compositionstart",()=>{rr=!0},{signal:X}),N.addEventListener("compositionend",()=>{rr=!1},{signal:X});const L=lp(l.id);L&&(N.value=L),N.addEventListener("input",()=>{Xo(l.id,N.value)}),N.addEventListener("keydown",ve=>{var ct;ve.key==="Enter"&&(ve.metaKey||ve.ctrlKey)&&(ve.preventDefault(),(ct=N.closest("form"))==null||ct.requestSubmit())}),KE("new-comment",{signal:X,mentionContext:{projectId:l.project_id},placeholder:"Add a comment…",restore:B})}oo=D?D.id:null,ao=M?M.id:null;const Ie=L=>{var ce;if((L.metaKey||L.ctrlKey)&&L.shiftKey&&(L.key===">"||L.key==="."||L.code==="Period")&&xa()){L.preventDefault();return}if(L.metaKey||L.ctrlKey||L.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||L.target.tagName==="INPUT"||L.target.tagName==="TEXTAREA"||L.target.tagName==="SELECT"||L.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ki())return;L.key==="ArrowLeft"&&oo?(L.preventDefault(),ue(oo)):L.key==="ArrowRight"&&ao?(L.preventDefault(),ue(ao)):L.key==="c"?(L.preventDefault(),L.stopImmediatePropagation(),XE("new-comment")):L.key==="j"?(L.preventDefault(),L.stopImmediatePropagation(),lr(1)):L.key==="k"?(L.preventDefault(),L.stopImmediatePropagation(),lr(-1)):L.key==="d"&&(L.preventDefault(),(ce=document.querySelector('[data-action="edit-description"]'))==null||ce.click());const ct={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[L.key];if(ct){const pe=document.querySelector(`.property-row[data-field="${ct}"]`);pe&&(L.preventDefault(),pe.click())}};if(document.addEventListener("keydown",Ie,{signal:X}),_){const L=document.getElementById(_.id);if(L&&(L.focus({preventScroll:!0}),typeof _.start=="number"&&typeof L.setSelectionRange=="function"))try{L.setSelectionRange(_.start,_.end)}catch{}}return G!==null&&window.scrollTo(0,G),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==co)return"dropped";E("load issue",a);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;r.innerHTML=W(l?{icon:K.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:K.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function ux(e,t){if(e.preventDefault(),ed)return!1;const n=document.getElementById("new-comment").value;Xo(t,null),ed=!0;try{const i=await h.createComment(t,n);$("Comment added!","success"),$s(i),await ue(t)}catch(i){Xo(t,n),E("add comment",i)}finally{ed=!1}return!1}async function px(e){const t=Ee()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const o=document.getElementById("edit-description"),a=bs(e),r=document.getElementById("description-draft-warning");if(a){o.value=a;const c=dp(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}tc("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),o.addEventListener("input",()=>{const c=o.value;c!==(t.description||"")?Mn(e,c,t.description||""):Mn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&_g()}),o.addEventListener("keydown",c=>{var d,p;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),o.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Mn(e,null),nd){ue(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Fn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,v;if(td)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=sr?sr.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");td=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Mn(e,null),$("Description updated","success"),await ue(e,!1),window.scrollTo(0,f),(v=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||v.focus()}catch(y){E("update description",y)}finally{td=!1,p&&(p.disabled=!1)}})}function _g(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Fn(n):'<span class="text-muted">Nothing to preview.</span>'}function mx(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const o=e==="preview";t.classList.toggle("active",!o),n.classList.toggle("active",o),i.style.display=o?"none":"block",s.style.display=o?"block":"none",o?_g():i.focus()}function fx(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function gx(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function hx(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function vx(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function bx(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),H(),$("Relation added","success"),ue(t)}catch(s){E("add relation",s)}return!1}async function yx(e,t){try{await h.deleteRelation(e,t),$("Relation removed","success"),ue(e)}catch(n){E("remove relation",n)}}function lr(e){const t=Ee();if(!t)return;const n=Es();if(!n||n.length===0)return;const i=n.findIndex(o=>o.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||ue(n[s].id)}le({"retry-issue-comments":(e,t)=>{ue(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Hk(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||px(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),xe(t.documentId))},"scroll-to-ticket-gate":()=>{sx()},"save-comment":(e,t)=>{ux(e,t.issueId)},"show-add-relation-modal":(e,t)=>{or(),fx(t.issueId)},"remove-relation":(e,t)=>{yx(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{or(),af(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{bx(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{gx(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{hx(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{vx()},"set-description-editor-mode":(e,t)=>{mx(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>lr(-1),"navigate-next-issue":()=>lr(1),edit:(e,t)=>fg(t.issueId),delete:(e,t)=>OE(t.issueId)});function wx(e){return e==="gate"?"Sign off":"Approve"}function $x(e){return Object.entries(e||{}).filter(([,t])=>t!=null).map(([t,n])=>`data-${t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`)}="${m(String(n))}"`).join(" ")}function Eg(e,{approveAction:t,sendBackAction:n=null,data:i={},busy:s=!1,size:o="",sendBackClass:a="ticket-gate-text-btn"}={}){const r=$x(i),l=s?' aria-disabled="true" aria-busy="true"':"",d=[`<button type="button" class="${o==="sm"?"btn btn-primary btn-sm":"btn btn-primary"}" data-action="${m(t)}" ${r}${l}>${wx(e)}</button>`];return n&&d.push(`<button type="button" class="${m(a)}" data-action="${m(n)}" ${r}${l}>Send back…</button>`),d}const kx={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open",sprint_ritual:"Sprint"};let Mi=0,Ot=!1,$e=null,_n=null;const ji=new Set,uo=new Map,xg=new Set(["review_requested","gate_pending","sprint_ritual"]),md={all:null,approvals:["review_requested","gate_pending","sprint_ritual"],mentions:["mention"],assigned:["assignment"]};let ot="all";const _t=new Map,tn=new Set,Ri=new Map,cr=new Set,Ht=new Map,vt=new Map;function Ig(e){Ht.get(e)===null&&Ht.set(e,Mi)}function fd(e){const t=vt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Mi)}const dr="inbox-list";let Me={id:dr};function _x(e,t,{empty:n="",reload:i=null}={}){Me={id:e,empty:n,reload:i},$e=null,Mt(Sg(t||[])),Oi()}function Sg(e){return e.filter(t=>!Ht.has(t.id)).map(t=>{const n=vt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Ot&&vt.has(t.id)&&t.id!==$e))}function Ex(e){for(const[t,n]of Ht)n!==null&&e>n&&Ht.delete(t);for(const[t,n]of vt)n.confirmedAfter!==null&&e>n.confirmedAfter&&vt.delete(t)}function xx(e,t){t!=null&&t.id&&(e==="archived"?(Ht.has(t.id)||Ht.set(t.id,null),Ig(t.id)):e==="read"&&fd(t.id))}async function Pi(){const e=T();if(e){try{const t=await h.getInboxUnreadCount(e.id);Ss(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}qi()}}function qi(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=ia();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0&&ot==="all"?`${t} unread`:"")}async function Ni({focusFirst:e=!1,background:t=!1}={}){var o;const n=T();if(!n)return;if(Me.id!==dr){const a=document.getElementById(Me.id);if(a&&!a.closest(".view.hidden")&&A()!=="inbox"){t&&((o=Me.reload)==null||o.call(Me));return}Me={id:dr}}const i=document.getElementById("inbox-list");if(!i)return;const s=++Mi;t||(_n={focusFirst:e||!!(_n!=null&&_n.focusFirst)},$e=null,Ix(i));try{const a=await h.getInbox(n.id,{unread:Ot,kinds:md[ot],limit:100,includeArchived:ot==="approvals"});if(s!==Mi)return;const r=new Set(Ht.keys());Ex(s);const l=Rg(Sg(a||[])),c=_n;_n=null,c?(Mt(l),Oi(),c.focusFirst&&!Ve()&&Lx()):Sx(l,r)}catch(a){if(s!==Mi)return;_n?(_n=null,i.innerHTML=W({icon:K.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",a)):console.error("Failed to refresh inbox:",a)}Pi()}function Ix(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function ur(e){return e&&[...document.querySelectorAll(`#${Me.id} .inbox-row`)].find(t=>t.dataset.entryId===e)||null}function Tg(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Lg(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,`#${Me.id} .inbox-row`);return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Ag(e,t){if(!e)return;const n=ur(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Tg(n||t)),i==null||i.focus({preventScroll:!0})}function Sx(e,t){const n=document.getElementById(Me.id);if(!n)return;const i=se(),s=[...n.querySelectorAll(".inbox-row")],o=n.querySelector(".inbox-row.keyboard-selected"),a=(o==null?void 0:o.dataset.entryId)||null,r=o?s.indexOf(o):-1,l=Lg(),c=window.scrollY,d=n.scrollTop;let p=e,f=null;if($e&&!e.some(y=>y.id===$e)){const y=i.find(k=>k.id===$e);if(y&&Ot&&!t.has($e)){p=[...e];const k=p.findIndex(x=>x.created_at<y.created_at);p.splice(k===-1?p.length:k,0,y),p=Rg(p),xg.has(y.kind)&&(f=y)}else $e=null}Mt(p),Oi(),f&&pr(f);let g=-1;a&&(g=p.findIndex(y=>y.id===a),g===-1&&p.length&&(g=Math.min(r,p.length-1))),g>=0?po(g,{focus:!1}):na(-1);const v=g>=0?n.querySelectorAll(".inbox-row")[g]:null;Ag(l,v),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function Tx(e,t){if(!(t!=null&&t.id))return!1;const n=se().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function En(e){const t=se();for(const n of new Set(e)){const i=ur(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const o=i.contains(document.activeElement)?Lg():null,a=document.createElement("template");a.innerHTML=fr(s).trim();const r=a.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Ag(o,r)}}function po(e,{focus:t=!0}={}){const n=document.querySelectorAll(`#${Me.id} .inbox-row`);if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){na(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),na(i),t&&Tg(n[i]).focus({preventScroll:!0})}function Lx(){po(0)}async function Zn(e){const t=se(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=t[n],s=!i.read_at,o=!!i.archived_at;if($e===e&&($e=null),uo.delete(e),_t.delete(e),cr.delete(e),Ri.delete(e),Ht.set(e,null),Mt(t.filter(a=>a.id!==e)),s&&Ss(Math.max(0,ia()-1)),Oi(),qi(),po(n,{focus:!Ve()}),!o)try{await h.archiveInbox(e),Ig(e)}catch(a){Ht.delete(e),console.error("Failed to archive inbox entry:",a)}}function Cg(e){var s,o;const t=se(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const i=$e;$e=i===e?null:e,$e===e&&(Bg(e),pr(t[n])),En([i,e]),po(n),$e===e&&((o=(s=ur(e))==null?void 0:s.scrollIntoView)==null||o.call(s,{block:"nearest"}))}function Bg(e){const t=se(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,vt.set(e,{readAt:i,confirmedAfter:null}),Mt([...t]),Ss(Math.max(0,ia()-1)),qi(),h.markInboxRead(e).then(()=>fd(e),s=>{var a;((a=vt.get(e))==null?void 0:a.readAt)===i&&vt.delete(e);const o=se().find(r=>r.id===e);o&&o.read_at===i&&(o.read_at=null,Mt([...se()]),En([e])),Pi(),E("mark inbox entry read",s)})}function Ax(e){var i;const n=se().findIndex(s=>s.id===e);if(n!==-1){if(Bg(e),Ot)$e===e&&($e=null),Mt(se().filter(s=>s.id!==e)),Oi(),po(n);else if(En([e]),!document.activeElement||document.activeElement===document.body){const s=ur(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function Cx(){if($e===null)return!1;const e=$e;return $e=null,En([e]),!0}function Dg(e,t){document.querySelectorAll(`#${Me.id} [data-action="reassign-inbox-entry"]`).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function Bx(e){if(ji.has(e))return;const t=se().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=uo.get(e)||"",o=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
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
    `;const a=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),a.requestSubmit?a.requestSubmit():a.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;a.addEventListener("submit",async d=>{var y;if(d.preventDefault(),c)return;if(!se().some(k=>k.id===e)){$(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),a.isConnected&&H();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await Dx(e,p);c=!1;const v=a.isConnected&&Ve();if(g){if(v&&(H(),!document.activeElement||document.activeElement===document.body)){const k=document.querySelector(`#${Me.id} .inbox-row.keyboard-selected`);(y=k==null?void 0:k.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),U()}async function Dx(e,t){if(ji.has(e))return!1;const n=se().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",o=n.issue_identifier||"issue";ji.add(e),Dg(e,!0);const a=(r,l)=>(ji.delete(e),Dg(e,!1),E(r,l),!1);if(uo.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return a(`comment on ${o}`,l)}uo.set(e,i),$s(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return a(`reassign ${o} back to ${s}`,r)}return ji.delete(e),uo.delete(e),Zn(e),!0}function Mx(){Mg(!Ot)}function Mg(e){e!==Ot&&(Ot=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Ot;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Ni({focusFirst:!0}))}function jx(e){!(e in md)||e===ot||(ot=e,jg(),Ni({focusFirst:!0}))}function Rx(){const e=new URLSearchParams(window.location.search).get("kind");!e||!(e in md)||e===ot||(ot=e,jg())}function jg(){document.querySelectorAll('[data-action="mark-all-inbox-read"]').forEach(e=>{e.disabled=ot!=="all",e.title=ot==="all"?"":"Only on Everything: it marks every kind read"}),qi(),document.querySelectorAll('[data-action="set-inbox-kind"]').forEach(e=>{const t=e.dataset.kind===ot;e.classList.toggle("active",t),e.setAttribute("aria-pressed",t?"true":"false")})}async function pr(e,{force:t=!1}={}){var o;if(!e||!gd(e)||e.state==="resolved")return;const n=_t.get(e.id),i={};_t.set(e.id,(n==null?void 0:n.state)==="ready"&&!t?{...n,token:i}:{state:"loading",token:i}),t&&En([e.id]);let s;try{if(e.kind==="sprint_ritual"){const a=await h.getLimboStatus(e.project_id);s={state:"ready",ritual:a!=null&&a.in_limbo&&(a.pending_rituals||[]).find(l=>l.id===e.ritual_id)||null,decided:null,sprintClosed:!(a!=null&&a.in_limbo)}}else{const a=await h.getTicketRitualsStatus(e.issue_id),r=((a==null?void 0:a.pending_rituals)||[]).find(c=>c.id===e.ritual_id)||null,l=r?null:((a==null?void 0:a.completed_rituals)||[]).find(c=>c.id===e.ritual_id)||null;s={state:"ready",ritual:r,decided:l}}}catch(a){console.error("Failed to load ritual for inbox entry:",a),s=(n==null?void 0:n.state)==="ready"&&!t?n:{state:"error"}}((o=_t.get(e.id))==null?void 0:o.token)===i&&(_t.set(e.id,s),En([e.id]))}function Rg(e){if(ot!=="approvals")return e;const t=e.filter(n=>n.kind==="sprint_ritual");return t.length?[...t,...e.filter(n=>n.kind!=="sprint_ritual")]:e}function Px(e){e&&J()===e&&Gs()}function gd(e){return!xg.has(e.kind)||!e.ritual_id?!1:e.kind==="sprint_ritual"?!!e.project_id:!!e.issue_id}function hd(e,t){return e.kind==="sprint_ritual"?(t==null?void 0:t.approval_mode)==="gate"?"gate":"review":e.kind==="review_requested"?"review":"gate"}function qx(e){return(e.actions||[]).some(t=>t.kind==="approve")}function Nx(e){return(e.actions||[]).length>0}function Ox(e){var c;const t=d=>({meta:"",body:`<div class="inbox-decision-status">${d}</div>`});if(e.state==="resolved")return t("Already decided. Nothing is waiting on you here.");const n=_t.get(e.id);if(!n||n.state==="loading")return{meta:"",body:'<div class="inbox-decision-status" role="status">Loading the attestation…</div>'};if(n.state==="error")return t(`Couldn’t load the attestation.
            <button type="button" class="ticket-gate-text-btn accent" data-action="retry-inbox-decision"
                data-entry-id="${m(e.id)}">Try again</button>`);const i=n.ritual;if(!i){if(n.sprintClosed)return t("The sprint has closed. Nothing is waiting on you here.");if(e.kind==="sprint_ritual")return t("Already done. Nothing is waiting on you here.");if(n.decided){const d=(c=n.decided.attestation)==null?void 0:c.approved_by_name;return t(`Already decided${d?` by ${u(d)}`:""}. Nothing is waiting on you here.`)}return t("This ritual no longer applies to the ticket. Open it to see where it stands.")}const s=hd(e,i)==="review",o=i.last_rejection&&!i.last_rejection.superseded_at?i.last_rejection:null,a=i.prompt?`<details class="inbox-decision-asks" data-entry-id="${m(e.id)}"${cr.has(e.id)?" open":""}><summary>What ${u(i.name)} asks</summary>
               <div class="inbox-decision-asks-text markdown-body">${pt(i.prompt)}</div></details>`:"";let r="";e.kind==="sprint_ritual"&&s&&!i.attestation?r='<div class="inbox-decision-status">Waiting on an attestation.</div>':s&&!kn(i)?r=o?`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”. Waiting on a new attestation.</div>`:'<div class="inbox-decision-status">Not attested any more. Waiting on a new attestation.</div>':!s&&o&&(r=`<div class="inbox-decision-status">Sent back by ${u(o.rejected_by_name||"someone")}: “${u(o.note||"")}”.</div>`);const l=i.attestation;return s?l?{meta:Pg(l.attested_by_name||"Someone","attested"),body:`<div class="inbox-expanded-body inbox-expanded-markdown">
                ${l.note?`<div class="markdown-body">${pt(l.note)}</div>`:'<div class="text-muted">No note.</div>'}
                ${rg(l)}
            </div>`,after:Yc(i)+a+r}:{meta:"",body:"",after:a+r}:{meta:"Waiting on a sign-off",body:i.prompt?`<div class="inbox-expanded-body inbox-expanded-markdown"><div class="markdown-body">${pt(i.prompt)}</div></div>`:"",after:r}}function Pg(e,t){return`${u(e)} ${u(t)}`}const Hx={assignment:"assigned you this",mention:"mentioned you",review_requested:"attested",gate_rejected:"sent it back",agent_status:"changed your agent"};function mr(e){const t=_t.get(e.id),n=(t==null?void 0:t.state)==="ready"?t.ritual:null;if(!n||!qx(e))return null;if(e.kind==="sprint_ritual")return n.approval_mode==="gate"?n.attestation?null:n:n.attestation&&!n.attestation.approved_at?n:null;if(e.kind==="review_requested")return kn(n)?n:null;const i=n.last_rejection&&!n.last_rejection.superseded_at;return!n.attestation&&!i?n:null}function Fx(e){if(!gd(e))return[];const t=mr(e);if(e.kind==="sprint_ritual"){if(!t)return[];const a=hd(e,t);return Eg(a,{approveAction:a==="review"?"approve-inbox-entry":"sign-off-inbox-entry",size:"sm",busy:tn.has(e.id),data:{entryId:e.id,ritualId:t.id,projectId:e.project_id,ritualName:t.name,...a==="gate"?{ritualArtifact:t.artifact||""}:{}}})}const n=Nx(e)?`<button type="button" class="inbox-action-btn" data-action="comment-inbox-entry"
        data-entry-id="${m(e.id)}">Comment…</button>`:"";if(!t)return n?[n]:[];const i=e.kind==="review_requested",[s,o]=Eg(i?"review":"gate",{approveAction:i?"approve-inbox-entry":"sign-off-inbox-entry",sendBackAction:"send-back-inbox-entry",size:"sm",sendBackClass:"inbox-action-btn",busy:tn.has(e.id),data:{entryId:e.id,ritualId:t.id,issueId:e.issue_id,ritualName:t.name,...i?{}:{ritualArtifact:t.artifact||""}}});return[s,o,n].filter(Boolean)}const Ux=()=>["approve-inbox-entry","sign-off-inbox-entry","send-back-inbox-entry","comment-inbox-entry"].map(e=>`#${Me.id} [data-action="${e}"]`).join(", ");function qg(e,t){document.querySelectorAll(Ux()).forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function vd(e,{comment:t=null}={}){if(tn.has(e))return!1;const n=se().find(l=>l.id===e),i=n?mr(n):null;if(!i)return n&&$("This is no longer waiting on a decision from you.","error"),!1;const s=hd(n,i)==="review",o=n.kind==="sprint_ritual";tn.add(e),qg(e,!0);const a=`${s?"approve":"sign off on"} ${i.name}`;try{t&&s&&Ri.get(e)!==t&&($s(await h.createComment(n.issue_id,t)),Ri.set(e,t)),o?s?await h.approveAttestation(i.id,n.project_id):await h.completeGateRitual(i.id,n.project_id,t||null):s?await h.approveTicketRitual(i.id,n.issue_id):await h.completeTicketGateRitual(i.id,n.issue_id,t||null)}catch(l){return tn.delete(e),qg(e,!1),E(a,l),pr(n,{force:!0}),!1}tn.delete(e),_t.delete(e),Ri.delete(e);const r=n.issue_identifier?` on ${n.issue_identifier}`:"";return o&&Px(n.project_id),$(`${s?"Approved":"Signed off on"} ${i.name}${r}.`,"success"),Zn(e),!0}function Gx(e){if(tn.has(e.entryId))return;const t=se().find(n=>n.id===e.entryId);if((t==null?void 0:t.kind)==="sprint_ritual"){const n=e.entryId;ym(e.ritualId,e.projectId,e.ritualName,e.ritualArtifact||"",()=>{_t.delete(n),Zn(n)});return}if(e.ritualArtifact){const n=e.entryId;$m(e.ritualId,e.issueId,e.ritualName,e.ritualArtifact,()=>{_t.delete(n),Zn(n)});return}vd(e.entryId)}function zx(e){const t=e.entryId;tn.has(t)||wm(e.ritualId,e.issueId,e.ritualName,()=>{_t.delete(t),Zn(t)})}function Vx(e){const t=se().find(c=>c.id===e);if(!t||!t.issue_id||tn.has(e))return;const n=mr(t),i=!!n&&!(t.kind==="gate_pending"&&n.artifact),s=t.kind==="review_requested"?"Comment and approve":"Comment and sign off",o=t.issue_identifier||"the ticket";document.getElementById("modal-title").textContent=`Comment on ${o}`,document.getElementById("modal-content").innerHTML=`
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
    `;const a=document.getElementById("inbox-comment-form"),r=document.getElementById("inbox-comment-text"),l=document.getElementById("inbox-comment-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",c=>{if(c.key==="Enter"&&(c.metaKey||c.ctrlKey)){c.preventDefault();const d=a.querySelector('button.btn-primary[type="submit"]');a.requestSubmit?a.requestSubmit(d||void 0):d==null||d.click()}}),a.addEventListener("submit",async c=>{var v,y;if(c.preventDefault(),!r.value.trim()){l.classList.remove("hidden"),r.focus();return}const d=[...a.querySelectorAll('button[type="submit"]')];d.forEach(k=>{k.disabled=!0});const p=((v=c.submitter)==null?void 0:v.value)==="decide";if(await Kx(e,r.value,{decide:p})){H();return}d.forEach(k=>{document.contains(k)&&(k.disabled=!1)});const g=se().find(k=>k.id===e);(!g||!mr(g))&&((y=a.querySelector('button[value="decide"]'))==null||y.remove())}),U(),r.focus()}async function Kx(e,t,{decide:n=!1}={}){const i=(t||"").trim(),s=se().find(a=>a.id===e);if(!i||!s||!s.issue_id)return!1;if(n)return vd(e,{comment:i});if(Ri.get(e)===i)return Ri.delete(e),$(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0;let o;try{o=await h.createComment(s.issue_id,i)}catch(a){return E(`comment on ${s.issue_identifier||"the ticket"}`,a),!1}return $s(o),$(`Comment posted on ${s.issue_identifier||"the ticket"}.`,"success"),!0}const Wx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',Yx='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function Qx(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function fr(e){const t=!e.read_at,n=e.id===$e,i=kx[e.kind]||e.kind,s=`badge badge-inbox-${e.kind}`,o=e.kind==="sprint_ritual"&&e.project_id?oe().find(c=>c.id===e.project_id):null,a=e.issue_identifier||e.document_title||(o==null?void 0:o.name)||"",r=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),l=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${r}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(l)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(Qx(e.source_user_name))}</span>
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
                ${n?Zx(e,a,l):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${Wx}</button>`:""}
                    ${e.archived_at?"":`<button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${Yx}</button>`}
                </span>
                <span class="inbox-row-time">${u(Oy(e.created_at))}</span>
            </div>
        </div>
    `}function Zx(e,t,n){const i=e.kind==="assignment"&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,o=e.source_user_name,a=t?`Open ${u(t)}`:"Open",r=gd(e),l=[...r?Fx(e):[],i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${ji.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${o?` to ${u(o)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${a}</button>`:"",e.archived_at?"":`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join(""),c=r?Ox(e):null,d=Hx[e.kind],p=o&&e.source_user_id!==e.recipient_user_id,f=c?c.meta:p&&d?Pg(o,d):"",g=c?c.body:e.body?`<div class="inbox-expanded-body">${u(e.body)}</div>`:"";return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${f?`<div class="inbox-expanded-source">${f}</div>`:""}
            ${g||""}
            ${(c==null?void 0:c.after)||""}
            <div class="inbox-action-bar">${l}</div>
        </div>
    `}const Ng={all:{noun:"items",heading:"Inbox zero",description:"Approvals, mentions, assignments, and more will show up here."},approvals:{noun:"approvals",heading:"Nothing to approve",description:"Reviews, gates and sprint rituals waiting on you show up here. Rituals are the checks a project runs when tickets are claimed or closed and when a sprint closes."},mentions:{noun:"mentions",heading:"No mentions",description:"Comments that @mention you will show up here."},assigned:{noun:"assignments",heading:"Nothing newly assigned",description:"Tickets someone assigns to you will show up here."}};function Oi(){const e=document.getElementById(Me.id);if(!e)return;const t=se();if(Me.id!==dr){e.innerHTML=t.length?t.map(fr).join(""):Me.empty||"";return}if(t.length===0){const n=Ng[ot]||Ng.all;e.innerHTML=W({icon:K.inbox,heading:Ot?`No unread ${n.noun}`:n.heading,description:Ot?"Nothing unread right now.":n.description});return}e.innerHTML=Jx(t)}function Xx(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=o=>new Date(o.getFullYear(),o.getMonth(),o.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function Jx(e){let t="";if(ot==="approvals"){const i=[];for(;e.length&&e[0].kind==="sprint_ritual";)i.push(e[0]),e=e.slice(1);i.length&&(t=`
        <section class="inbox-group inbox-sprint-close" aria-labelledby="inbox-group-sprint">
            <h3 class="inbox-group-header" id="inbox-group-sprint">Sprint close <span class="section-count">${i.length}</span></h3>
            <p class="inbox-group-note text-muted">The sprint closes when these are done.</p>
            ${i.map(s=>fr(s)).join("")}
        </section>`)}const n=[];for(const i of e){const s=Xx(i.created_at),o=n[n.length-1];o&&o.label===s?o.entries.push(i):n.push({label:s,entries:[i]})}return t+n.map((i,s)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${s}">
            <h3 class="inbox-group-header" id="inbox-group-${s}">${u(i.label)}</h3>
            ${i.entries.map(o=>fr(o)).join("")}
        </section>
    `).join("")}async function eI(e){var s;const t=se().find(o=>o.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();vt.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(o){((s=vt.get(e))==null?void 0:s.readAt)===n&&vt.delete(e);const a=se().find(r=>r.id===e);a&&a.read_at===n&&(a.read_at=null,Mt([...se()]),En([e])),console.error("Failed to mark inbox entry read:",o);return}fd(e);const i=se().find(o=>o.id===e);i&&!i.read_at?(i.read_at=n,Mt([...se()]),Ss(Math.max(0,ia()-1)),qi(),En([e])):Pi()}async function tI(){const e=T();if(!(!e||ot!=="all"))try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of se())n.read_at||vt.set(n.id,{readAt:t,confirmedAfter:Mi});Mt(se().map(n=>({...n,read_at:n.read_at||t}))),Ss(0),qi(),Oi()}catch(t){E("mark all inbox entries read",t)}}function nI(e){e.entryId&&eI(e.entryId),e.issueId?ue(e.issueId):e.documentId&&xe(e.documentId)}function iI(e){var n,i;const t=(n=e==null?void 0:e.dataset)==null?void 0:n.entryId;t&&((i=se().find(s=>s.id===t))!=null&&i.archived_at||Zn(t))}function sI(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Cg(e.dataset.entryId)}const oI='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function aI(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(oI);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function rI(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}typeof document<"u"&&document.addEventListener("toggle",e=>{var n;const t=e.target;!((n=t==null?void 0:t.classList)!=null&&n.contains("inbox-decision-asks"))||!t.dataset.entryId||(t.open?cr.add(t.dataset.entryId):cr.delete(t.dataset.entryId))},!0),le({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&rI((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||aI(e.target,n)||(e.preventDefault(),t.entryId&&Cg(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),nI(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Bx(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),H()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Zn(t.entryId)},"toggle-inbox-unread-filter":()=>Mx(),"set-inbox-filter":(e,t)=>Mg(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&Ax(t.entryId)},"mark-all-inbox-read":()=>tI(),"set-inbox-kind":(e,t)=>jx(t.kind),"approve-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&vd(t.entryId)},"sign-off-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Gx(t)},"send-back-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&zx(t)},"close-inbox-comment":e=>{e.preventDefault(),H()},"comment-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Vx(t.entryId)},"retry-inbox-decision":(e,t)=>{e.preventDefault();const n=se().find(i=>i.id===t.entryId);n&&pr(n,{force:!0})},"retry-load-inbox":()=>Ni({focusFirst:!0})});let mo=[],Hi=[],Xn=[];function bd(){return mo}function Og(e){mo=Array.isArray(e)?e:[],Hg()}function Et(){return Hi}async function gr(e=null){try{mo=await(e||h.getMyTeams()),Hg()}catch(t){E("load teams",t)}}function Hg(){const e=document.getElementById("team-list");mo.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=mo.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function hr(e,t=!1,{seed:n=null}={}){Jn=null,ri(e),zg(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),vm(e.id),n&&cI(n)){let o=!1;try{dI(n),Jn=e.id,t?Ul():O(A()||"my-issues"),o=!0}catch(a){console.error("Failed to paint from the boot cache:",a),Jn=null}if(o){Fg(e).catch(a=>console.error("Failed to refresh team data:",a));return}}await Fg(e),t?Ul():O(A()||"my-issues")}let Jn=null;function lI(){var e;return Jn&&Jn===((e=T())==null?void 0:e.id)?Jn:null}async function Fg(e){var t;await Promise.all([mt(),TI(),pI(),ww(),Pi()]),((t=T())==null?void 0:t.id)===e.id&&(Jn=e.id)}function cI(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function dI(e){Gy(Array.isArray(e.projects)?e.projects:[]),Np(),qp(),xs(Array.isArray(e.labels)?e.labels:[]),Hi=Array.isArray(e.members)?e.members:[],bw(e.agents),Bs(Et,ft),ui(),qw(e.issues)}function Ug(){document.getElementById("team-dropdown").classList.toggle("hidden")}function uI(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function pI(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Hi=i,Bs(Et,ft),ui()}catch(i){console.error("Failed to load team members:",i),E("load team members",i)}}function mI(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let yd=0;async function Gg(){var n,i;const e=(n=T())==null?void 0:n.id;if(!e)return;const t=++yd;try{const s=await h.getTeamMembers(e);if(t!==yd||((i=T())==null?void 0:i.id)!==e)return;Hi=s,Bs(Et,ft),ui()}catch(s){if(t!==yd)return;Hi=[],E("load team members",s)}fI()}function Fi(){var n;const e=(n=re())==null?void 0:n.id,t=Hi.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function fI(){var t;const e=Fi();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let vr=0;async function br(){var i;if(!T())return;const e=++vr,t=T().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=mI());try{const s=await h.getTeamInvitations(t);if(e!==vr||((i=T())==null?void 0:i.id)!==t)return;Xn=s,wd()}catch(s){if(e!==vr)return;if((s==null?void 0:s.status)===403){Xn=[],wd();return}console.error("Failed to load team invitations:",s),Vg(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function zg(){vr++,Xn=[],wd()}function Vg(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function wd(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Xn.length)),Vg(Xn.length>0),Xn.length===0){e.innerHTML="";return}const n=Fi();e.innerHTML=Xn.map(i=>`
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
    `).join("")}function Kg(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function gI(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(T().id,t,n);if(await br(),i&&i.accept_url)return bI(t,vI(i.accept_url),i.email_queued===!0),!1;H(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){hI(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):E("send invitation",i)}return!1}function hI(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Wg(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function vI(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Wg(n.hostname)||Wg(i.hostname)?e:i.origin+n.pathname}function bI(e,t,n=!1){var o;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Ve()||U(),(o=document.querySelector('[data-action="copy-invite-link"]'))==null||o.focus(),Yg()}function Yg(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function yI(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function wI(e){let t;try{t=await h.issueInvitationVerificationCode(T().id,e)}catch(n){E("get a verification code",n);return}kI(t)}function $I(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let o;return s<3600?o=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?o=`${Math.round(s/3600)} h`:o=`${Math.round(s/86400)} days`,`${o} ${n>=i?"after":"before"} the invitation was created`}function kI(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=$I(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,Ve()||U(),Yg("invitation-code")}async function _I(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(T().id,e),await Gg(),$("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){E("remove member",t)}}async function EI(e){try{await h.deleteInvitation(T().id,e),await br(),$("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function Qg(){Ug(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function xI(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,U())}async function II(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await gr(),await hr(n),H(),$("Team created!","success")}catch(n){E("create team",n)}return!1}async function SI(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(T().id,t);ri(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await gr(),H(),$("Team updated!","success")}catch(n){E("update team",n)}return!1}async function TI(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;xs(i)}catch(i){console.error("Failed to load labels:",i),E("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),le({"select-team":(e,t)=>{hr(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||_I(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||EI(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||wI(t.invitationId)},"retry-load-team-invitations":()=>{br()},"invite-member":e=>{gI(e)},"copy-invite-link":()=>{yI()},"dismiss-invite-link":()=>{H()},"create-team":e=>{II(e)},"update-team":e=>{SI(e)}});let Ft=null,nn=0,Ui=null,Gi=null,fo=null,$d=!1;function LI(){return ny()}function Zg(){iy()}function Xg(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function AI(){Ft||(Ft=document.createElement("div"),Ft.id="onboarding-overlay",Ft.className="onboarding-overlay",document.getElementById("app").appendChild(Ft))}function go(){if(!Ft)return;const e=$d?eh():Jg(),t=e[nn],n=e.map((i,s)=>`<span class="onboarding-dot${s===nn?" active":""}${s<nn?" completed":""}"></span>`).join("");Ft.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Jg(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Xg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Xg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Ui&&(e.textContent=`${Ui.name} (${Ui.key})`),t&&Gi&&(t.textContent=`${Gi.name} (${Gi.key})`),n&&fo&&(n.textContent=`${fo.identifier} - ${fo.title}`)}}]}function eh(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function kd(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function _d(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function zi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function CI(){const e=$d?eh():Jg();nn<e.length-1&&(nn++,go())}function BI(){Zg(),nh(),ei()}function DI(){Zg(),nh(),ei()}async function MI(e){e.preventDefault(),_d("onboarding-team-error"),zi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Ui=await h.createTeam({name:t,key:n}),nn++,go()}catch(i){kd("onboarding-team-error",i.message||"Failed to create team"),zi("onboarding-team-submit",!1)}}async function jI(e){e.preventDefault(),_d("onboarding-project-error"),zi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Gi=await h.createProject(Ui.id,{name:t,key:n}),nn++,go()}catch(i){kd("onboarding-project-error",i.message||"Failed to create project"),zi("onboarding-project-submit",!1)}}async function RI(e){e.preventDefault(),_d("onboarding-issue-error"),zi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{fo=await h.createIssue(Gi.id,{title:t}),nn++,go()}catch(n){kd("onboarding-issue-error",n.message||"Failed to create issue"),zi("onboarding-issue-submit",!1)}}function th(e=!1){$d=e,nn=0,Ui=null,Gi=null,fo=null,AI(),go()}function nh(){Ft&&(Ft.remove(),Ft=null)}function ih(){sy(),th(!0)}le({"onboarding-next":e=>{e.preventDefault(),CI()},"onboarding-skip":e=>{e.preventDefault(),BI()},"onboarding-finish":e=>{e.preventDefault(),DI()},"onboarding-create-team":e=>{MI(e)},"onboarding-create-project":e=>{jI(e)},"onboarding-create-issue":e=>{RI(e)}});const sh="/oauth/consent/";function PI(e){if(!e||!e.startsWith(sh))return null;const t=e.slice(sh.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function qI(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function NI(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function OI(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const oh={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function yr(e){const t=oh[e.trust]||oh.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function HI(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function FI(e,t){const n=e&&t?e.agents.find(o=>o.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function ah(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",o=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+o)}</option>`)}return n.join("")}function rh(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function UI(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function GI(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${yr(t.client)}</p>
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
        </div>`}function zI(e,t){if(t.acts_as==="person"){GI(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),o=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",a=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${u(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${yr(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${u(t.redirect_host)}</strong></p>
            ${a}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${HI(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${ah(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${rh(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${UI(t)}
                </fieldset>
                ${o}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Ed(e,t)}function Ed(e,t){var o;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const a=(o=e.querySelector("#oauth-team"))==null?void 0:o.value,r=FI(t.teams.find(l=>l.id===a),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function VI(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(a=>a.value),s=e.querySelector('input[name="oauth-policy"]:checked'),o={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const a=e.querySelector("#oauth-agent-name").value.trim();a&&(o.agent_name=a)}return o}function KI(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function ho(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function WI(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function YI(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=ah(d,null),e.querySelector("#oauth-projects").innerHTML=rh(d),Ed(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Ed(e,n));let o=!1;const a=async d=>{if(!o){o=!0;try{const p=d?await h.approveOAuthRequest(t,VI(e)):await h.denyOAuthRequest(t);if(!qI(p.redirect)){ho(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(o=!1,p&&p.status===404){ho(e,"It has expired, was already answered, or belongs to someone else.");return}KI(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),a(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>a(!1))}async function QI(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=NI();OI(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(o){o&&o.status===404?ho(i,"It has expired, was already answered, or belongs to someone else."):o&&o.status===403&&o.detail&&o.detail.error_code==="web_login_required"?WI(i,n):o&&o.status===403?ho(i,"Only a person signed in to Chaotic can approve an app."):ho(i,o&&o.message||"Something went wrong");return}zI(i,s),YI(i,e,s,t)}const xd="/invite/",vo="/invite",Id="chaotic.inviteToken",lh="invite-auth-notice";let Sd=null;const ZI="This invitation is no longer valid.",XI={owner:"an owner",admin:"an admin",member:"a member"};function JI(e){if(!e||!e.startsWith(xd))return null;const t=e.slice(xd.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function ch(){const{pathname:e}=window.location,t=JI(e);if(t){Sd=t;try{sessionStorage.setItem(Id,t)}catch{}return history.replaceState(null,"",vo),t}if(!dh(e))return null;let n=null;try{n=sessionStorage.getItem(Id)}catch{}const i=n||Sd;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function dh(e){return e===vo||e===`${vo}/`}function uh(e){return dh(e)||!!(e&&e.startsWith(xd))}function Td(){Sd=null;try{sessionStorage.removeItem(Id)}catch{}}function e0(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function t0(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Ld(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function ph(){const e=t0();return wr(),Ld(e),e}function n0(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),wr()}function wr(){var e;(e=document.getElementById(lh))==null||e.remove()}function Ad(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=XI[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${i0(e)}</p>`}function i0(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const s0="Ask whoever invited you to send a new invitation.",o0="Reload the page to try again.";function Cd(e,t=ZI,n=s0){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function a0(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function mh(){window.location.pathname!==vo&&history.replaceState(null,"",vo),a0(ph())}function r0(e,t){e.innerHTML=`
        <div class="invite-page">
            ${Ad(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function l0(e,t,n){const i=e0(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${Ad(t)}
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
            ${Ad(t)}
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
        </div>`}function c0(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function d0(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),o=e.querySelector("#invite-code-form"),a=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=p=>{l.textContent=p,l.classList.remove("hidden")},d=()=>{var p;o.classList.remove("hidden"),(p=a.focus)==null||p.call(a)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=c0(p.expires_at);c(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}c(p&&p.message||"Something went wrong"),p&&p.status===429&&d()}finally{s.disabled=!1}}}),o.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=a.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(v){r.disabled=!1;const y=v&&v.detail&&v.detail.error_code;v&&v.status===401?n():y==="email_already_verified"?t():(c(v&&v.message||"Something went wrong"),(g=a.select)==null||g.call(a));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function u0(e,t){wr();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=lh,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),wr(),t()})}function $r(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function p0(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,p;const o=ph();o.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let a;try{a=await h.getInvitation(e)}catch(f){f&&f.status===404?(Td(),Cd(o)):Cd(o,f&&f.message||"Something went wrong.",o0);return}if(!t){r0(o,a);const f=g=>{u0(a,()=>Ld(o)),n(g)};o.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),o.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}l0(o,a,t),(d=o.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=o.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var v,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch(k){l=!1,r.disabled=!1;const x=k&&k.detail&&k.detail.error_code;if(f!==void 0&&(x==="invalid_verification_code"||x==="invitation_code_expired"||k&&k.status===429)){$r(o,k&&k.message||"That code did not work."),(y=(v=o.querySelector("#invite-admin-code"))==null?void 0:v.select)==null||y.call(v);return}k&&k.status===401?s():k&&(k.status===404||k.status===400)?(Td(),Cd(o)):k&&k.status===403&&k.detail&&k.detail.error_code==="email_unverified"?($r(o,"Verify your email address to continue."),o.querySelector("#invite-accept-actions").classList.add("hidden"),o.querySelector("#invite-verify").classList.remove("hidden")):k&&k.status===403?$r(o,`This invitation is for a different email address. Only ${a.email_hint} can accept it.`):$r(o,k&&k.message||"Something went wrong");return}Td(),fh(o,a);try{await i(g.team_id,a.team_name)}catch(k){console.error("Joined the team but could not open it:",k),Ld(o),fh(o,a)}};r.addEventListener("click",()=>c()),(p=o.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=o.querySelector("#invite-admin-code").value.trim();g&&c(g)}),d0(o,{onVerified:()=>{o.querySelector("#invite-verify").classList.add("hidden"),o.querySelector("#invite-error").classList.add("hidden"),o.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function fh(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function Bd(e){return p0(e,{user:re(),showAuth:t=>{wo(),t==="signup"?yh():bh()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),n0(),await ei({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{h.logout(),Bt(null),ri(null),Bd(e)}})}async function gh(){const e=ch();if(e){await Bd(e);return}if(uh(window.location.pathname)){mh();return}wo()}async function ei({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=PI(window.location.pathname);if(i){await QI(i);return}const s=ch();if(s){await Bd(s);return}if(uh(window.location.pathname)){mh();return}w0(),em(),kr(),v0();const o=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(o){await m0(n,o,t);return}await gr(t);const a=bd();if(a.length===0&&!LI()){th();return}a.length===0&&Rn("my-issues");try{if(a.length>0){const c=e&&a.find(d=>d.id===e)||a[0];await hr(c,!0)}}finally{im()}}async function m0(e,t,n){Og(e.teams);try{await hr(t,!0,{seed:e})}finally{im()}Promise.resolve(n||gr().then(bd)).then(async i=>{var o;if(!Array.isArray(i))return;Og(i);const s=i.find(a=>a.id===t.id);if(!s){await g0(),window.location.reload();return}if(((o=T())==null?void 0:o.id)===s.id&&s.name!==T().name){ri(s);const a=document.getElementById("current-team-name");a&&(a.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const f0=2e3;let Vi=null,hh=!1,vh=!1;function g0(){return vh=!0,clearTimeout(Vi),Vi=null,El()}function Dd(){if(clearTimeout(Vi),Vi=null,vh)return Promise.resolve();const e=re(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||hp(wl())!==e.id||lI()!==t.id?Promise.resolve():by(e.id,{user:e,teams:bd(),teamId:t.id,projects:oe(),labels:Tl(),members:Et(),agents:ft(),issues:Pw({maxQueries:3})})}function h0(){clearTimeout(Vi),Vi=setTimeout(Dd,f0)}function v0(){hh||(hh=!0,Cw(h0),document.addEventListener("visibilitychange",b0),window.addEventListener("pagehide",y0))}function b0(){document.visibilityState==="hidden"&&Dd()}function y0(){Dd()}let Ki=null,bo=null,xt=null,It=null;function yo(){Ki||(Ki=document.getElementById("auth-screen"),bo=document.getElementById("main-screen"),xt=document.getElementById("login-form"),It=document.getElementById("signup-form"))}function wo(){yo(),Ki&&Ki.classList.remove("hidden"),bo&&bo.classList.add("hidden")}function w0(){yo(),Ki&&Ki.classList.add("hidden"),bo&&bo.classList.remove("hidden")}function bh(){yo(),xt&&xt.classList.remove("hidden"),It&&It.classList.add("hidden")}function yh(){yo(),xt&&xt.classList.add("hidden"),It&&It.classList.remove("hidden")}async function $0(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),Bt(await h.getMe()),await ei(),$("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function k0(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),Bt(await h.getMe()),await ei(),$("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function wh(){h.logout(),Bt(null),ri(null),wo(),$("Signed out","success")}function _0(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function kr(){var i;const e=re();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",$p(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?_0(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function E0(){yo();const e=xt==null?void 0:xt.querySelector("form");e&&e.addEventListener("submit",s=>$0(s));const t=It==null?void 0:It.querySelector("form");t&&t.addEventListener("submit",s=>k0(s));const n=xt==null?void 0:xt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),yh()});const i=It==null?void 0:It.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),bh()})}let Md=[];async function jd(){try{Md=await h.getApiKeys(),x0()}catch(e){E("load API keys",e)}}function x0(){const e=document.getElementById("api-keys-list");if(e){if(Md.length===0){e.innerHTML=W({icon:K.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=Md.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${u(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${u(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Te(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Te(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function I0(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function S0(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){E("create API key",n)}return!1}async function T0(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function L0(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),$("API key revoked","success"),await jd()}catch(n){E("revoke API key",n)}}le({"create-api-key":e=>{S0(e)},"copy-api-key":()=>{T0()},"dismiss-api-key-modal":()=>{H(),jd()},"revoke-api-key":(e,t)=>{L0(t.keyId,t.keyName)}});let Rd=[];async function $h(){try{Rd=await h.getConnections(),C0()}catch(e){E("load connected apps",e)}}function Pd(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function A0(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function C0(){const e=document.getElementById("connected-apps-list");if(e){if(Rd.length===0){e.innerHTML=W({icon:K.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Rd.map(t=>t.acts_as==="person"?B0(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Pd(t))} ${yr(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(A0(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Te(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Te(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(Pd(t))}">Disconnect</button>
        </div>
    `).join("")}}function B0(e){const n=`${e.device_name||"A device"} · ${Pd(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${u(n)} ${yr(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Te(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Te(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function kh(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),$("App disconnected","success"),await $h()}catch(n){E("disconnect app",n)}}le({"revoke-connection":(e,t)=>{kh(t.connectionId,t.connectionName)}});let qd=[];async function _h(){try{qd=await h.getPushDevices(),D0()}catch(e){E("load push devices",e)}}const Eh={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function xh(e){return e.label||e.platform||"Unnamed device"}function D0(){const e=document.getElementById("push-devices-list");if(e){if(qd.length===0){e.innerHTML=W({icon:K.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=qd.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(xh(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Te(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Te(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Eh[t.status]?`<span class="push-device-status">${u(Eh[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(xh(t))}">Remove</button>
        </div>
    `).join("")}}async function M0(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),$("Device removed","success"),await _h()}catch(n){E("remove push device",n)}}le({"remove-push-device":(e,t)=>{M0(t.installationId,t.deviceName)}});let _r=!1,sn=0,xn=[],Er=[];function j0(e){Er=e,xn=[...e]}function In(){return _r}function R0(){if(_r)return;_r=!0,sn=0,xn=[...Er];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&xr()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>P0(n.target.value)),t.addEventListener("keydown",N0),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&q0(Number(i.dataset.commandIndex))}),$o(),requestAnimationFrame(()=>t.focus())}function xr(){_r=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function P0(e){const t=e.toLowerCase().trim();t?xn=Er.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):xn=[...Er],sn=0,$o()}function $o(){const e=document.getElementById("command-results");if(!e)return;if(xn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};xn.forEach(o=>{t[o.category]||(t[o.category]=[]),t[o.category].push(o)});let n="",i=0;for(const[o,a]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${o}</div>`;for(const r of a)n+=`
                <div class="command-item ${i===sn?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function q0(e){sn=e,$o()}function Ih(e){const t=xn[e];t&&(xr(),t.action())}function N0(e){switch(e.key){case"ArrowDown":e.preventDefault(),sn=Math.min(sn+1,xn.length-1),$o();break;case"ArrowUp":e.preventDefault(),sn=Math.max(sn-1,0),$o();break;case"Enter":e.preventDefault(),Ih(sn);break;case"Escape":e.preventDefault(),xr();break}}le({"execute-command":(e,t)=>{Ih(Number(t.commandIndex))}});const Nd=new Map;function O0(e,t){Nd.set(e,t)}function H0(e){var n;const t=Nd.has(e)&&document.getElementById(Nd.get(e));return t?(t.focus(),(n=t.select)==null||n.call(t),!0):!1}const F0=[{title:"Navigation",shortcuts:[{key:"m",description:"Home"},{key:"i",description:"Issues"},{key:"b",description:"Issues as a board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals (in Project settings)"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Filter this screen, or search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function U0(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function G0(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(U0).join("")}
    </div>`}function Sh(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${F0.map(G0).join("")}
        </div>
    `,U()}const Ir=100,Od="status!=done,canceled",z0=["created","updated","priority","status","title","estimate"];function Ae(e){return e==null?"":u(String(e))}function Th(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Ae(n)}</a>`}function Lh(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Hd=[{id:"identifier",label:"ID",fixed:!0,render:e=>Th(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Th(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Ae(Ke(e.status))},{id:"priority",label:"Priority",render:e=>Ae(qe(e.priority))},{id:"type",label:"Type",render:e=>Ae(yt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Ae(Lh(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Ae(Lh(e,"creator"))},{id:"project",label:"Project",render:e=>Ae(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Ae(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=ae(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Ae(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Ae(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Ae(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Ae(Te(e.created_at))},{id:"updated",label:"Updated",render:e=>Ae(Te(e.updated_at))},{id:"completed",label:"Completed",render:e=>Ae(Te(e.completed_at))},{id:"due",label:"Due",render:e=>Ae(Te(e.due_date))}],Sr=Object.fromEntries(Hd.map(e=>[e.id,e])),V0=Hd.filter(e=>e.fixed).map(e=>e.id),Fd=["identifier","title","status","priority","assignee","updated"];function Ud(e){const t=new Set,n=[];for(const s of e||[]){const o=String(s).trim();!Sr[o]||t.has(o)||(t.add(o),n.push(o))}return n.length===0?[...Fd]:[...V0.filter(s=>!t.has(s)),...n]}function K0(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function W0(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Ud(t.get("cols").split(",")):[...Fd],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function Y0(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!K0(e.cols,Fd)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function Q0(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function Z0({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Ir,skip:o=0}){const a=["chaotic","issue","list"];let r=e||"",l=null;n||i?(a.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",a.push("--where",Q0(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],p=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;z0.includes(f)?(a.push("--sort",f,"--order",p?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return a.push("--limit",String(s)),o>0&&a.push("--skip",String(o)),{command:a.join(" "),warning:l}}function X0(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function J0(e,t){const n=Ud(t).map(o=>Sr[o]),i=n.map(o=>`<th data-col="${m(o.id)}">${Ae(o.label)}</th>`).join(""),s=e.map(o=>`<tr class="query-row" data-issue-id="${m(o.id)}">${n.map(a=>`<td class="query-col-${m(a.id)}">${a.render(o)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function eS(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,o=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${o?"":" disabled"}>Next</button>`}let P=null,Gd=null,at=null,zd=0,Wi=!1,Ah=!1;function he(e){return document.getElementById(e)}function Ch(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Bh(e){const t=Y0({...Gd,cols:P.cols,group:P.group,view:P.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function Vd(){P&&ca(P.teamScope?null:P.projectId)}function tS(){P&&(!P.teamScope&&P.projectId!==J()?$t(P.projectId):Vd())}function nS(){const e=he("query-columns-menu");e&&(e.innerHTML=Hd.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${P.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Ae(t.label)}
        </label>`).join(""))}function Tr(e){const t=he("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Ae(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Dh(e){const t=he("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function Kd(e){var t;(t=he("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function ko(){const e=he("query-results"),t=he("query-pager");if(!e)return;if(!at){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=at;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=J0(n,P.cols),t&&(t.innerHTML=eS(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(o=>{o.dataset.enabled=String(!o.disabled)}),Wi&&Kd(!0))}async function Lr(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!P)return;const i=T(),s=P.teamScope?{teamId:i==null?void 0:i.id}:{projectId:P.projectId};if(!s.teamId&&!s.projectId){at=null,ko(),Tr(P.teamScope?"Select a team first.":"Select a project.");return}const o=++zd,a=P.where===null?Od:P.where,r=he("query-results");Wi=!0,r&&r.classList.add("loading"),Kd(!0);const l=()=>o===zd&&A()==="query";try{const c=await h.queryIssues({...s,where:a,order:P.order,skip:(P.page-1)*Ir,limit:Ir});if(!l())return;P.where=c.where,P.order=c.order||null,Gd=Ch(P),at={issues:c.issues||[],total:c.total,skip:c.skip};const d=he("query-where");d&&d.value.trim()===a.trim()&&(d.value=c.where),Tr(null),Wi=!1,ko(),Bh(e),t&&t()}catch(c){if(!l())return;Wi=!1,n?n():at=null,ko(),Tr(X0(c))}finally{o===zd&&(Wi=!1,r&&r.classList.remove("loading"),Kd(!1))}}function Mh(){if(!P)return;const e=he("query-where");return P.where=e?e.value.trim():"",P.page=1,Lr("push")}function iS(e){if(!P)return;const t={teamScope:P.teamScope,projectId:P.projectId,page:P.page};return P.teamScope=!e,e&&(P.projectId=e),P.page=1,Dh(null),Lr("push",{onSuccess:()=>{e?$t(e):Pp(),Vd()},onFailure:()=>{Object.assign(P,t),Vd()}})}function sS(e,t){if(!P||!Sr[e]||Sr[e].fixed)return;const n=P.cols.filter(i=>i!==e);P.cols=Ud(t?[...n,e]:n),ko(),Bh("replace")}function oS(e){if(!P||!at||Wi)return;const t=P.page+e;if(t<1||e>0&&at.skip+at.issues.length>=at.total)return;const n={page:P.page,result:at};return P.page=t,Lr("push",{onFailure:()=>{P.page=n.page,at=n.result}})}async function aS(){if(!P)return null;const e=he("query-where"),t=e?e.value.trim():P.where??Od,n=P.teamScope?null:oe().find(a=>a.id===P.projectId),{command:i,warning:s}=Z0({where:t,order:P.order,teamScope:P.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Ir,skip:at?at.skip:0}),o=he("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),o&&o.classList.add("hidden")}catch{o&&(o.textContent=i,o.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function rS(){var e,t,n,i,s,o;Ah||(Ah=!0,(e=he("query-where"))==null||e.addEventListener("keydown",a=>{a.key==="Enter"&&!a.shiftKey&&!a.isComposing&&(a.preventDefault(),Mh())}),(t=he("query-run-btn"))==null||t.addEventListener("click",()=>Mh()),(n=he("query-copy-cli-btn"))==null||n.addEventListener("click",()=>aS()),(i=he("query-columns-btn"))==null||i.addEventListener("click",a=>{a.stopPropagation();const r=he("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;a.currentTarget.setAttribute("aria-expanded",String(l))}),(s=he("query-columns-menu"))==null||s.addEventListener("change",a=>{a.target.matches('input[type="checkbox"]')&&sS(a.target.value,a.target.checked)}),(o=he("query-pager"))==null||o.addEventListener("click",a=>{const r=a.target.closest("button[data-query-page]");!r||r.disabled||oS(Number(r.dataset.queryPage))}),document.addEventListener("click",a=>{var l;const r=he("query-columns-menu");r&&!r.classList.contains("hidden")&&!a.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=he("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function lS(){var s,o;rS();const e=W0(window.location.search),t=oe();let n=null;if(!e.teamScope){const a=r=>r&&t.some(l=>l.id===r);if(!a(e.projectId)){const r=e.projectId;e.projectId=a(J())?J():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}P=e,Gd=Ch(P),at=null;const i=he("query-where");return i&&(i.value=P.where===null?Od:P.where),(s=he("query-cli-preview"))==null||s.classList.add("hidden"),(o=he("query-columns-menu"))==null||o.classList.add("hidden"),tS(),nS(),Tr(null),Dh(n),ko(),Lr("replace")}let Yi=[];function cS(){return Yi}wt(e=>{e==="currentProject"&&A()==="epics"&&Sn()});let Wd=0;const Qi=new Set(["done","canceled"]),Yd={open:"Open",in_progress:"In progress",all_done:"All sub-issues done",needs_you:"Approvals",shipped:"Closed",all:"All"};let on="open",_o="",Eo=new Set;O0("epics","epics-filter");function jh(e,t){var i;return t?[e.title,e.identifier,(i=e.owner)==null?void 0:i.name,...(e.in_flight||[]).map(s=>s.title)].filter(Boolean).join(`
`).toLowerCase().includes(t):!0}async function Sn({fromMemory:e=!1}={}){var o;Is(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++Wd;t._epicProgress=null,Oh(t);const i=Jl(),s=e?_a("epics",i):void 0;s?Rh(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((o=T())!=null&&o.id)){Yi=[],t.innerHTML=W({icon:K.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const a=J(),r=a?await h.getProjectEpicProgress(a):await h.getTeamEpicProgress(T().id);if(n!==Wd||(fi("epics",i,r),s&&Ea(s,r)))return;Rh(r,t)}catch(a){if(n!==Wd)return;Yi=[],t.innerHTML=W({icon:K.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",a)}}function Rh(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){Yi=[],t.innerHTML=W({icon:K.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Br(e,t)}function Ar(e,t){return`${e} ${t}${e===1?"":"s"}`}function dS(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function Qd(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function uS(e){const t=Le(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Ph(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,o=`${i.name}${i.status==="active"?" (current)":""}: ${Ar(i.closed||0,"issue")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(o)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}const pS=[["in_progress","in progress"],["in_review","in review"],["todo","todo"],["backlog","backlog"]];function qh(e){const n={...e.epic.children||{}};let i=Qd(e.epic.last_activity_at),s=(e.epic.awaiting_human||[]).length;for(const o of e.subs){const a=qh(o),r=o.epic.status;Cr(a.children)>0&&n[r]>0&&(n[r]-=1,n.total=(n.total||0)-1);for(const l of["total","backlog","todo","in_progress","in_review","done","canceled"])n[l]=(n[l]||0)+(a.children[l]||0);i=Math.max(i,a.last),s+=a.asks}return e.rolled={children:n,last:i,asks:s},e.rolled}function Cr(e){return(e.total||0)-(e.canceled||0)}function mS(e){return(e.backlog||0)+(e.todo||0)+(e.in_progress||0)+(e.in_review||0)}function Nh(e){const t=e.rolled.children;return!Qi.has(e.epic.status)&&Cr(t)>0&&mS(t)===0&&e.subs.every(n=>Qi.has(n.epic.status))}const Zd={open:e=>!Qi.has(e.epic.status),in_progress:e=>!Qi.has(e.epic.status)&&(e.rolled.children.in_progress||0)+(e.rolled.children.in_review||0)>0,all_done:Nh,needs_you:e=>e.rolled.asks>0,shipped:e=>Qi.has(e.epic.status),all:()=>!0};function fS(e){const t=pS.filter(([n])=>e[n]>0).map(([n,i])=>`${e[n]} ${i}`);return t.length?t.join(" · "):""}function gS(e){return(e.in_flight||[]).map(t=>`${t.assignee?t.assignee.name:"Unassigned"}: ${t.title}`).join(`
`)}function hS(e){const t=Cr(e);if(t<=0)return'<span class="meter-label">No sub-issues</span>';const n=e.done||0,i=`${dS(n,t)} done: ${n} of ${t}`+(e.canceled?`, ${e.canceled} canceled`:"");return`
        <div class="meter" title="${m(i)}"><div class="meter-fill" style="width: ${Math.round(n/t*100)}%"></div></div>
        <span class="meter-label">${n} of ${t}</span>`}function vS(e,{grouped:t,depth:n,shownSubs:i}){const s=e.epic,{children:o,last:a,asks:r}=e.rolled,l=Qi.has(s.status),c=s.status_pinned&&!l?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its sub-issues">✎<span class="sr-only"> (status set by hand)</span></span>':"",d=s.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",p=t?`<span class="epic-project-key">${u(s.project_key)}</span> `:"",f=s.owner?` <span class="epic-owner">· ${u(s.owner.name)}</span>`:"",g=Cr(o)<=0,v=[];if(l)v.push(s.completed_at?`Closed ${u(uS(s.completed_at))}`:"Closed");else if(Nh(e))v.push('<span class="epic-all-done">All sub-issues done</span>');else{const k=fS(o),x=gS(s);k?v.push(x?`<span title="${m(x)}">${k}</span>`:k):g&&v.push("No sub-issues yet")}if(r&&v.push(`<span class="epic-needs-you">${Ar(r,"approval")}</span>`),i){const k=Eo.has(s.id);v.push(`<button type="button" class="epic-subs-toggle" data-epic-toggle-subs="${m(s.id)}" aria-expanded="${k}">${k?"▾":"▸"} ${Ar(i,"sub-epic")}</button>`)}const y=a?`<span class="meter-label epic-touched" title="Updated">${u(Le(new Date(a).toISOString()))}</span>`:"";return`
        <div class="list-row-2line epic-row${l?" epic-row-closed":""}${g?" epic-row-empty":""}${n?" epic-row-sub":""}" data-identifier="${m(s.identifier)}" title="${m(s.identifier)}" style="--epic-depth: ${n}">
            <span class="epic-spark">${Ph(s.sprints)}</span>
            <span class="list-row-title">${p}${u(s.title)}${f}${c}${d}</span>
            <span class="list-row-sub">${v.join(" · ")}</span>
            <span class="list-row-right">${hS(o)}${y}</span>
        </div>`}function Br(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(w=>w.project_key),...i.map(w=>w.project_key)]).size>1,o=new Map(n.map(w=>[w.id,{epic:w,subs:[],parent:null}]));for(const w of o.values()){const _=w.epic.parent_epic_id&&o.get(w.epic.parent_epic_id);_&&_!==w&&(w.parent=_,_.subs.push(w))}for(const w of o.values())w.parent&&!bS(w)&&(w.parent=null);for(const w of o.values())w.subs=[];for(const w of o.values())w.parent&&w.parent.subs.push(w);[...o.values()].filter(w=>!w.parent).forEach(qh);const a=Zd[on]||Zd.open,r=w=>a(w)&&jh(w.epic,_o),l=on==="shipped"?(w,_)=>Qd(_.epic.completed_at||_.epic.last_activity_at)-Qd(w.epic.completed_at||w.epic.last_activity_at):(w,_)=>_.rolled.last-w.rolled.last,c=w=>{for(let _=w.parent;_;_=_.parent)if(r(_))return _;return null},d=[...o.values()].filter(r),p=new Map,f=[];for(const w of d){const _=c(w);_?(p.has(_)||p.set(_,[]),p.get(_).push(w)):f.push(w)}const g=[],v=(w,_)=>{const B=(p.get(w)||[]).sort(l);g.push(vS(w,{grouped:s,depth:_,shownSubs:B.length})),Yi.push(w.epic),B.length&&Eo.has(w.epic.id)&&B.forEach(G=>v(G,_+1))};Yi=[],f.sort(l).forEach(w=>v(w,0));const y=Object.entries(Yd).map(([w,_])=>{const B=[...o.values()].filter(G=>Zd[w](G)&&jh(G.epic,_o)).length;return`<button type="button" class="segmented-btn${w===on?" active":""}" data-epics-filter="${w}" aria-pressed="${w===on}">${_} <span class="segmented-count">${B}</span></button>`}).join(""),k=i.filter(w=>w.open),x=k.length&&on!=="shipped"?`<p class="epic-untracked-note">${k.map(w=>`${s?`${u(w.project_key)}: `:""}${Ar(w.open,"open issue")}`).join(", ")} in no epic.</p>`:"";t.innerHTML=`
        <div class="epic-sections">
            <div class="segmented epic-filter" role="group" aria-label="Show">${y}</div>
            <section class="epic-section epic-section-list">
                ${g.length?`<div class="epic-section-rows">${g.join("")}</div>`:`<p class="epic-filter-empty">${_o?`No epics in ${u(Yd[on])} match “${u(_o)}”.`:`No epics in ${u(Yd[on])}.`}</p>`}
            </section>
            ${x}
        </div>
    `,t._epicProgress=e,Oh(t),t._epicClickHandler||(t._epicClickHandler=w=>{const _=w.target.closest("[data-epics-filter]");if(_){if(_.dataset.epicsFilter===on)return;on=_.dataset.epicsFilter,Is(-1),Br(t._epicProgress,t);return}const B=w.target.closest("[data-epic-toggle-subs]");if(B){const C=B.dataset.epicToggleSubs;Eo.has(C)?Eo.delete(C):Eo.add(C),Is(-1),Br(t._epicProgress,t);return}const G=w.target.closest(".epic-row");G&&G.dataset.identifier&&tm(G.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Oh(e){const t=document.getElementById("epics-filter");t&&!t._epicFilterHandler&&(t._epicFilterHandler=()=>{_o=t.value.trim().toLowerCase(),e._epicProgress&&(Is(-1),Br(e._epicProgress,e))},t.addEventListener("input",t._epicFilterHandler),t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),t.blur())}))}function bS(e){const t=new Set;for(let n=e;n;n=n.parent){if(t.has(n))return!1;t.add(n)}return!0}function yS(){const e=J(),t=oe().map(n=>`
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",wS),document.getElementById("create-epic-title").focus()}async function wS(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),$(`Created epic ${s.identifier}`,"success"),Sn()}catch(s){E("create epic",s)}}async function Hh(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){ue(t.id,!1);return}await xo(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function xo(e,t=!0,{focus:n=null}={}){var i,s;try{t&&un();const o=await h.getIssue(e);if(o.issue_type!=="epic"){ue(e,t);return}const a=(i=T())==null?void 0:i.id,[r,l,c]=await Promise.all([h.getEpicOverview(e),h.getProjectEpicProgress(o.project_id).catch(()=>null),a?h.getInbox(a,{kinds:Fh,includeArchived:!0,limit:200}).catch(()=>[]):Promise.resolve([])]);t&&history.pushState({epicId:e,view:A()},"",`/epic/${o.identifier}`),document.querySelectorAll(".view").forEach(f=>f.classList.add("hidden"));const d=document.getElementById("epic-detail-view");d.classList.remove("hidden");const p={epic:o,overview:r,progress:l,inbox:c||[]};d.querySelector("#epic-detail-content").innerHTML=LS(p),d._epicState=p,ES(p),AS(d),n&&((s=document.getElementById(n))==null||s.scrollIntoView({block:"start"}))}catch(o){E("load epic",o)}}const Fh=["review_requested","gate_pending"],$S=new Set(["done","canceled"]);function Zi(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function kS(e){return new Set([e.epic.id,...e.overview.tickets.map(t=>t.id)])}function Xd(e){const t=kS(e);return e.inbox.filter(n=>n.issue_id&&t.has(n.issue_id)&&n.state!=="resolved")}const _S='<p class="epic-page-empty">No approvals waiting.</p>';function ES(e){if(!Xd(e).length)return;const t=()=>_x("epic-needs-you-rows",Xd(e),{empty:_S,reload:()=>{var i;const n=(i=T())==null?void 0:i.id;n&&h.getInbox(n,{kinds:Fh,includeArchived:!0,limit:200}).then(s=>{e.inbox=s||[],document.getElementById("epic-needs-you-rows")&&t()}).catch(()=>{})}});t()}function Tn(e,t,n,i,{open:s=!0,collapsible:o=!1}={}){const a=`${u(t)}${n==null?"":` <span class="section-count">${n}</span>`}`;return o?`
            <details class="issue-detail-section epic-page-section" id="${e}"${s?" open":""}>
                <summary><h3>${a}</h3></summary>
                ${i}
            </details>`:`
        <section class="issue-detail-section epic-page-section" id="${e}">
            <h3>${a}</h3>
            ${i}
        </section>`}function xS(e,t,n){const i=e.epic_id!==n?t.get(e.epic_id):null;if(e.issue_type==="epic"&&t.has(e.id))return TS(t.get(e.id),i);const s=e.status==="done"?e.completed_at:e.updated_at;return`
        <div class="sub-issue-item" data-issue-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <span class="sub-issue-status">${et(e.status)}</span>
            <span class="sub-issue-id">${u(e.identifier)}</span>
            <span class="sub-issue-title">${u(e.title)}${i?` <span class="epic-page-under">in ${u(i.title)}</span>`:""}</span>
            ${e.assignee?`<span class="sub-issue-assignee">${u(e.assignee.name)}</span>`:""}
            ${s?`<span class="epic-page-when">${u(Le(s))}</span>`:""}
        </div>`}function Io(e,t,n){return`<div class="sub-issues-list">${e.map(i=>xS(i,t,n)).join("")}</div>`}function IS(e,t,n){var s,o;const i=new Map;for(const a of[...e].sort((r,l)=>Zi(l.completed_at)-Zi(r.completed_at))){const r=((s=a.closed_in)==null?void 0:s.id)||"";i.has(r)||i.set(r,{name:((o=a.closed_in)==null?void 0:o.name)||"No sprint",tickets:[]}),i.get(r).tickets.push(a)}return[...i.values()].map(a=>`
        <div class="epic-page-sprint-group">
            <h4>${u(a.name)} <span class="section-count">${a.tickets.length}</span></h4>
            ${Io(a.tickets,t,n)}
        </div>`).join("")}function SS(e){return`<div class="epic-page-docs">${e.map(t=>`
        <div class="epic-page-doc" data-document-id="${m(t.id)}" role="link" tabindex="0">
            <span class="epic-page-doc-icon" aria-hidden="true">${u(t.icon||"📄")}</span>
            <span class="epic-page-doc-title">${u(t.title)}</span>
            <span class="epic-page-doc-links">${(t.linked_to||[]).map(n=>`<span class="epic-page-tag">${u(n)}</span>`).join("")}</span>
            ${t.updated_at?`<span class="epic-page-when">${u(Le(t.updated_at))}</span>`:""}
        </div>`).join("")}</div>`}function TS(e,t){const n=e.children||{},i=(n.total||0)-(n.canceled||0),s=n.done||0;return`
        <div class="sub-issue-item epic-page-subepic" data-epic-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <span class="sub-issue-status">${et(e.status)}</span>
            <span class="sub-issue-id">${u(e.identifier)}</span>
            <span class="sub-issue-title">${u(e.title)}${t?` <span class="epic-page-under">in ${u(t.title)}</span>`:""}</span>
            <span class="epic-page-subepic-meter">${i>0?`<div class="meter"><div class="meter-fill" style="width: ${Math.round(s/i*100)}%"></div></div><span class="meter-label">${s} of ${i}</span>`:'<span class="meter-label">No sub-issues</span>'}</span>
            ${e.last_activity_at?`<span class="epic-page-when">${u(Le(e.last_activity_at))}</span>`:""}
        </div>`}function Uh(e,t){return e.map(n=>`
        <div class="activity-item">
            <div class="activity-icon">${hg(n.activity_type)}</div>
            <div class="activity-content">
                ${t.get(n.issue_id)?`<span class="epic-page-tag">${u(t.get(n.issue_id))}</span>`:""}
                <span class="activity-text">${ad(n)}</span>
                <span class="activity-actor">by ${u(sd(n))}</span>
                <span class="activity-time">${Le(n.created_at)}</span>
            </div>
        </div>`).join("")}function LS(e){var X;const{epic:t,overview:n,progress:i}=e,s=A()||"epics",o=oe().find(N=>N.id===t.project_id),a=t.assignee_id?Qt(t.assignee_id):null,r=a?jt(a):null,l=(i==null?void 0:i.epics)||[],c=new Map(l.map(N=>[N.id,N])),d=c.get(t.id),p=n.tickets.filter(N=>N.issue_type!=="epic"),f=N=>n.tickets.filter(Ie=>Ie.status===N).sort((Ie,L)=>Zi(L.updated_at)-Zi(Ie.updated_at)),g=f("in_progress"),v=f("in_review"),y=f("todo"),k=f("backlog"),x=p.filter(N=>N.status==="done"),w=f("done"),_=p.filter(N=>N.status!=="canceled"),B=N=>N.reduce((Ie,L)=>Ie+(L.estimate??1),0),G=_.length?Math.round(x.length/_.length*100):0,C=Math.max(Zi(t.updated_at),...n.tickets.map(N=>Zi(N.updated_at))),q=cS(),F=q.findIndex(N=>N.id===t.id),Y=F>0?q[F-1]:null,ee=F>=0&&F<q.length-1?q[F+1]:null,Z=F>=0,I=new Map([[t.id,t.identifier],...n.tickets.map(N=>[N.id,N.identifier])]),D=Xd(e),M=[`${et(t.status)} ${u(Ke(t.status))}`,r?u(r):'<span class="text-muted">Unassigned</span>',C?`Updated ${u(Le(new Date(C).toISOString()))}`:""].filter(Boolean).join(' <span class="epic-page-dot">·</span> ');return`
        <div class="detail-layout epic-page">
            <div class="detail-main">
                <div class="issue-detail-nav">
                    <button class="back-link" data-action="navigate-to" data-view="${m(s)}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Back
                    </button>
                    ${Z?`
                    <div class="issue-nav-arrows">
                        <button class="issue-nav-btn" ${Y?`data-action="navigate-epic" data-epic-id="${m(Y.id)}"`:"disabled"} title="Previous epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span class="issue-nav-counter">${F+1} / ${q.length}</span>
                        <button class="issue-nav-btn" ${ee?`data-action="navigate-epic" data-epic-id="${m(ee.id)}"`:"disabled"} title="Next epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                    `:""}
                    <span class="issue-detail-breadcrumb">${o?u(o.name):"Project"} › ${u(t.identifier)}</span>
                    <button class="btn btn-secondary btn-small epic-page-open-ticket" data-action="epic-open-as-ticket" data-epic-id="${m(t.id)}">Edit issue</button>
                </div>

                <h1 class="issue-detail-title">${u(t.title)}</h1>
                <div class="epic-page-facts">${M}</div>
                ${t.status_pinned&&!$S.has(t.status)?`
                <div class="epic-page-pinned text-muted">Status set by hand, so it no longer follows its sub-issues.
                    <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${m(t.id)}">Follow sub-issues</button>
                </div>`:""}

                <div class="epic-page-progress">
                    <div class="epic-detail-progress">
                        <div class="epic-detail-progress-bar">
                            <div class="epic-detail-progress-fill${G===100?" epic-progress-complete":""}" style="width: ${G}%"></div>
                        </div>
                        <div class="epic-detail-progress-label">
                            <span>${x.length} of ${_.length} sub-issues done · ${B(x)} of ${B(_)} points</span>
                            <span>${_.length?`${G}%`:"No sub-issues yet"}</span>
                        </div>
                    </div>
                    ${(X=d==null?void 0:d.sprints)!=null&&X.length?`
                    <div class="epic-page-sprints" title="Points closed toward this goal in each recent sprint, oldest first">
                        ${Ph(d.sprints)}
                        <span class="epic-page-sprints-label">${d.sprints.map(N=>`${u(N.name)}: ${N.points||0}`).slice(-3).join(" · ")}</span>
                    </div>`:""}
                </div>

                ${D.length?Tn("epic-approvals","Approvals",D.length,'<div id="epic-needs-you-rows" class="inbox-list epic-page-inbox"></div>'):""}

                ${n.documents.length?Tn("epic-documents","Documents",n.documents.length,SS(n.documents)):""}

                ${g.length?Tn("epic-in-progress","In progress",g.length,Io(g,c,t.id)):""}

                ${v.length?Tn("epic-in-review","In review",v.length,Io(v,c,t.id)):""}

                ${y.length?Tn("epic-todo","Todo",y.length,Io(y,c,t.id)):""}

                ${w.length?Tn("epic-done","Done",w.length,IS(w,c,t.id)):""}

                ${k.length?Tn("epic-backlog","Backlog",k.length,Io(k,c,t.id),{open:!1,collapsible:!0}):""}

                ${n.tickets.length?"":W({icon:K.issues,heading:"No sub-issues yet",description:"Break this epic down by creating sub-issues"})}

                ${Tn("epic-activity","Activity",null,`
                    <div class="activity-list" id="epic-activity-rows">
                        ${n.activities.length?Uh(n.activities,I):'<p class="epic-page-empty">No activity yet.</p>'}
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
                        <span class="property-value-static">${ht(t.priority)} ${qe(t.priority)}</span>
                    </div>
                    <div class="property-row">
                        <span class="property-label">Estimate</span>
                        <span class="property-value-static">${di(t.estimate,t.project_id)}</span>
                    </div>
                    ${t.labels&&t.labels.length>0?`
                    <div class="property-row">
                        <span class="property-label">Labels</span>
                        <span class="property-value-static property-labels-btn">
                            ${t.labels.map(N=>`
                                <span class="issue-label" style="background: ${ae(N.color)}20; color: ${ae(N.color)}">${u(N.name)}</span>
                            `).join("")}
                        </span>
                    </div>`:""}
                    ${o?`
                    <div class="property-row">
                        <span class="property-label">Project</span>
                        <span class="property-value-static">${u(o.name)}</span>
                    </div>`:""}
                    <div class="property-row">
                        <span class="property-label">Created</span>
                        <span class="property-value-static">${new Date(t.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </aside>
        </div>
    `}function AS(e){e._epicPageHandler||(e._epicPageHandler=async t=>{var r;const n=e._epicState,i=t.target.closest("[data-epic-more-activity]");if(i&&n){i.disabled=!0;try{const l=await h.getEpicOverview(n.epic.id,{activitySkip:Number(i.dataset.skip)||0}),c=new Map([[n.epic.id,n.epic.identifier],...n.overview.tickets.map(d=>[d.id,d.identifier])]);(r=e.querySelector("#epic-activity-rows"))==null||r.insertAdjacentHTML("beforeend",Uh(l.activities,c)),l.more_activity?(i.dataset.skip=String((Number(i.dataset.skip)||0)+l.activities.length),i.disabled=!1):i.remove()}catch(l){i.disabled=!1,E("load activity",l)}return}if(t.target.closest("#epic-needs-you-rows"))return;const s=t.target.closest(".epic-page-doc");if(s){xe(s.dataset.documentId);return}const o=t.target.closest(".epic-page-subepic");if(o){xo(o.dataset.epicId);return}const a=t.target.closest(".sub-issue-item");a&&a.dataset.issueId&&ue(a.dataset.issueId)},e.addEventListener("click",e._epicPageHandler),e.addEventListener("keydown",t=>{var i,s;if(t.key!=="Enter")return;const n=(s=(i=t.target).closest)==null?void 0:s.call(i,".epic-page-doc");n&&xe(n.dataset.documentId)}))}le({"navigate-epic":(e,t)=>{xo(t.epicId)},"epic-open-as-ticket":(e,t)=>{ue(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows its sub-issues"),await xo(t.epicId,!1)}catch(n){E("update epic",n)}}});function CS(e){let t=!1,n=null;return function(s){var a,r,l,c,d,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((a=e.isInlineDropdownOpen)!=null&&a.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(qn(s.target)){s.key==="Escape"&&!s.defaultPrevented&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const o=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),o?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!o){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function BS(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const o=e.getModalPrimaryBtn();o&&!o.disabled&&(n.preventDefault(),o.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function an(e,t,n=sa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Gh(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function So(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Gh(),!1):!0:!1}function DS(e){const t=sa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,o,a,r){const l=n(o);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,a,c,d)}return function(o){var l,c,d,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||qn(o.target)||So(o)||(o.key==="Enter"||o.key===" ")&&((d=(c=o.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(o.key)&&((f=e.beforeNavigate)==null||f.call(e));const a=document.querySelectorAll(t);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),an(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":o.preventDefault(),an(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&a[r]){o.preventDefault();const g=a[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(o,r,"status","status-btn");break;case"p":i(o,r,"priority","priority-btn");break;case"a":i(o,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function MS(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var a;if(e.getCurrentView()!=="documents"||(a=e.isDetailViewActive)!=null&&a.call(e)||qn(i.target)||So(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),an(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),an(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ln(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function jS(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||qn(i.target)||So(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex(),a=g=>{var y,k,x,w;const v=!!((k=(y=document.activeElement)==null?void 0:y.closest)!=null&&k.call(y,"#inbox-list"));if((x=e.collapseInboxExpand)==null||x.call(e),an(o+g,e.setSelectedIndex,t),v){const _=document.querySelector(`${t}.keyboard-selected`);(w=(_==null?void 0:_.querySelector(".inbox-row-toggle"))||_)==null||w.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),a(1);break;case"k":case"ArrowUp":i.preventDefault(),a(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;o>=0&&s[o]&&(i.preventDefault(),e.toggleInboxExpand(s[o]));break;case"e":o>=0&&s[o]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[o]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}o>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function RS(e){const t="#kanban-board .kanban-card";return function(i){var a;if(e.getCurrentView()!=="board"||(a=e.isDetailViewActive)!=null&&a.call(e)||qn(i.target)||So(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const o=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),an(o+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),an(o-1,e.setSelectedIndex,t);break;case"Enter":if(o>=0&&s[o]){i.preventDefault();const r=s[o].dataset.id;r&&e.viewIssue(r)}break;case"Escape":o>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function PS(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),o=s.indexOf(i);if(o===-1)return;let a;switch(n.key){case"ArrowDown":a=s[Math.min(s.length-1,o+1)];break;case"ArrowUp":a=s[Math.max(0,o-1)];break;case"Home":a=s[0];break;case"End":a=s[s.length-1];break;default:return}a&&(n.preventDefault(),a.focus())}}function Jd(e){const{view:t,selector:n,open:i}=e;return function(o){var l,c,d,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||qn(o.target)||So(o)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const a=document.querySelectorAll(n);if(a.length===0)return;const r=e.getSelectedIndex();switch(o.key){case"j":case"ArrowDown":o.preventDefault(),an(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":o.preventDefault(),an(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(d=o.target).closest)!=null&&p.call(d,'button, a[href], [role="button"]'))break;r>=0&&a[r]&&(o.preventDefault(),i(a[r]));break;case"Escape":r>=0&&(o.preventDefault(),a.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const qS=7,eu=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),zh=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),NS='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',OS='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Vh=!1;function HS(){Vh||(Vh=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...eu,set(e){var t;eu.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...zh,set(e){var t;zh.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let ke=null,FS=0;function Kh({restoreFocus:e=!0}={}){return ke?(ke.close(e),!0):!1}function US(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if((ke==null?void 0:ke.select)!==e){const s=document.activeElement;tu(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function GS(e=document){e.querySelectorAll("select[data-picker]").forEach(zS)}function zS(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${NS}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Wh(e,t),(ke==null?void 0:ke.select)===e&&ke.refresh()};return e._picker={button:t,sync:n},HS(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(ke==null?void 0:ke.select)===e?Kh():tu(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(ke==null?void 0:ke.select)!==e&&tu(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function Wh(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",o=t.querySelector(".picker-label");o.textContent=i,s&&o.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const a=e.getAttribute("aria-label");a&&t.setAttribute("aria-label",i?`${a}: ${i}`:a)}function Yh(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function tu(e,t,n){Kh({restoreFocus:!1});const i=Yh(e),s=`picker-list-${++FS}`,o=i.length>=qS,a=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${o?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(a)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(a)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=I=>Math.max(0,I.findIndex(D=>!D.disabled));let p=i.findIndex(I=>I.value===e.value&&!I.disabled);p===-1&&(p=d(i));let f=i;const g=()=>{var D;l.innerHTML=f.length?f.map((M,X)=>`
                <li role="option" id="${s}-${X}" class="picker-option${X===p?" active":""}${M.disabled?" disabled":""}"
                    data-index="${X}" data-value="${m(M.value)}"
                    aria-selected="${M.value===e.value?"true":"false"}"${M.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(M.text)}</span>
                    ${M.hint?`<span class="picker-option-hint">${u(M.hint)}</span>`:""}
                    ${M.value===e.value?`<span class="picker-check">${OS}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const I=l.querySelector(".picker-option.active");I?(c||l).setAttribute("aria-activedescendant",I.id):(c||l).removeAttribute("aria-activedescendant"),(D=I==null?void 0:I.scrollIntoView)==null||D.call(I,{block:"nearest"})},v=()=>{var ve,ct;const I=t.getBoundingClientRect(),D=((ve=window.visualViewport)==null?void 0:ve.width)||window.innerWidth,M=((ct=window.visualViewport)==null?void 0:ct.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(I.width,220),D-16)}px`,r.style.maxHeight="",r.style.top="0px";const X=r.offsetWidth||Math.max(I.width,220),N=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(I.left,D-X-8))}px`;const Ie=M-I.bottom-12,L=I.top-12;if(N>Ie&&L>Ie){const ce=Math.max(120,L);r.style.maxHeight=`${ce}px`,r.style.top=`${Math.max(8,I.top-4-Math.min(N,ce))}px`}else r.style.maxHeight=`${Math.max(120,Ie)}px`,r.style.top=`${I.bottom+4}px`},y=I=>{if(!I||I.disabled||e.disabled)return;if(![...e.options].some(M=>M.value===I.value&&!M.disabled)){ee(!0);return}const D=I.value!==e.value;eu.set.call(e,I.value),Wh(e,t),ee(!0),D&&e.dispatchEvent(new Event("change",{bubbles:!0}))},k=I=>{let D=p+I;for(;D>=0&&D<f.length&&f[D].disabled;)D+=I;D<0||D>=f.length||(p=D,g())},x=(I,D)=>{let M=I;for(;M>=0&&M<f.length&&f[M].disabled;)M+=D;M>=0&&M<f.length&&(p=M,g())},w=I=>{if(!(I.metaKey||I.ctrlKey))switch(I.stopPropagation(),I.key){case"ArrowDown":I.preventDefault(),k(1);break;case"ArrowUp":I.preventDefault(),k(-1);break;case"Home":c||(I.preventDefault(),x(0,1));break;case"End":c||(I.preventDefault(),x(f.length-1,-1));break;case"PageDown":I.preventDefault(),x(Math.min(f.length-1,p+8),-1);break;case"PageUp":I.preventDefault(),x(Math.max(0,p-8),1);break;case"Enter":I.preventDefault(),y(f[p]);break;case"Escape":I.preventDefault(),ee(!0);break;case"Tab":ee(!0);break;case" ":c||(I.preventDefault(),y(f[p]));break;default:if(!c&&I.key.length===1&&!I.metaKey&&!I.ctrlKey&&!I.altKey){_=(Date.now()-B<700?_:"")+I.key.toLowerCase(),B=Date.now();const D=f.findIndex(M=>!M.disabled&&M.text.toLowerCase().startsWith(_));D!==-1&&(p=D,g())}}};let _="",B=0;const G=()=>{const I=c.value.trim().toLowerCase();f=I?i.filter(M=>M.text.toLowerCase().includes(I)||M.hint.toLowerCase().includes(I)):i;const D=f.findIndex(M=>M.value===e.value&&!M.disabled);p=!I&&D!==-1?D:d(f),g()},C=I=>{r.contains(I.target)||t.contains(I.target)||ee(!1)},q=()=>v(),F=I=>{I.key!=="Escape"||r.contains(I.target)||(I.preventDefault(),I.stopPropagation(),ee(!0))},Y=()=>ee(!1);function ee(I){var D,M;(ke==null?void 0:ke.popover)===r&&(ke=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",C,!0),document.removeEventListener("keydown",F,!0),window.removeEventListener("popstate",Y),window.removeEventListener("resize",q),window.removeEventListener("scroll",q,!0),I&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(M=(D=document.activeElement)==null?void 0:D.blur)==null||M.call(D)))}l.addEventListener("click",I=>{const D=I.target.closest(".picker-option");D&&y(f[Number(D.dataset.index)])}),l.addEventListener("mousemove",I=>{const D=I.target.closest(".picker-option");if(!D)return;const M=Number(D.dataset.index);M!==p&&(p=M,g())}),r.addEventListener("keydown",w),c&&c.addEventListener("input",G),document.addEventListener("pointerdown",C,!0),document.addEventListener("keydown",F,!0),window.addEventListener("popstate",Y),window.addEventListener("resize",q),window.addEventListener("scroll",q,!0),ke={select:e,button:t,popover:r,close:ee,refresh:()=>{const I=Yh(e);!(I.length===i.length&&I.every((M,X)=>M.value===i[X].value&&M.text===i[X].text&&M.hint===i[X].hint&&M.disabled===i[X].disabled))||e.disabled?ee(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),v(),(c||l).focus({preventScroll:!0})}const VS={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let V=null,An=0;async function Qh(e,t){var o,a;const n=VS[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++An;V=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===An){if(V={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((o=s[0])==null?void 0:o.version)??null,compareFromVersion:null,compareToVersion:null},V.viewVersion!=null)try{const r=await n.fetchOne(t,V.viewVersion);if(i!==An)return;V.cache.set(V.viewVersion,r)}catch(r){i===An&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(a=document.querySelector(".modal"))==null||a.classList.add("modal-wide"),Dr(),U()}}function Dr(){const e=document.getElementById("modal-content");if(!e||!V)return;if(V.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=KS(),n=V.mode==="compare"?YS():WS();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function KS(){const e=V.revisions.map(n=>{const i=V.mode==="view"?n.version===V.viewVersion:n.version===V.compareFromVersion||n.version===V.compareToVersion,s=V.mode==="compare"?n.version===V.compareFromVersion?' <span class="rev-tag">from</span>':n.version===V.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${u(n.author_name||"Unknown")} ${ea(n.author)}</span>
          <span class="revision-time">${Le(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${V.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function WS(){const e=V.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=V.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[V.adapter.bodyField]||"",s=i?`<div class="markdown-body">${pt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${Le(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function YS(){const e=V.compareFromVersion,t=V.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=V.cache.get(e),i=V.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[V.adapter.bodyField]||"",o=i[V.adapter.bodyField]||"",a=QS(s,o);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function QS(e,t){const n=e.split(`
`),i=t.split(`
`),s=ZS(n,i);return s.every(a=>a.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(a=>a.type==="equal"?a.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):a.type==="add"?a.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):a.type==="del"?a.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function ZS(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const o=[];let a=0,r=0;for(;a<n&&r<i;)e[a]===t[r]?(To(o,"equal",e[a]),a++,r++):s[a+1][r]>=s[a][r+1]?(To(o,"del",e[a]),a++):(To(o,"add",t[r]),r++);for(;a<n;)To(o,"del",e[a++]);for(;r<i;)To(o,"add",t[r++]);return o}function To(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function XS(e){if(!V)return;const t=V.token,n=V;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(V!==n||An!==t)return;n.cache.set(e,i)}catch(i){V===n&&An===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Dr()}function JS(){if(!V)return;const e=V.token,t=V;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(a=>a.version===n);if(i>=0&&i+1<t.revisions.length){const a=t.revisions[i+1].version;t.compareFromVersion=a,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const o=[t.compareFromVersion,t.compareToVersion].filter(a=>a!=null&&!t.cache.has(a));Promise.all(o.map(a=>t.adapter.fetchOne(t.entityId,a).then(r=>{V===t&&An===e&&t.cache.set(a,r)}).catch(r=>{s||(s=r)}))).then(()=>{V!==t||An!==e||(s&&E("load revisions to compare",s),Dr())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Dr()}le({"show-document-revisions":(e,t)=>{Qh("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Qh("issue",t.issueId)},"select-revision-version":(e,t)=>{XS(Number(t.version))},"toggle-revision-compare":()=>{JS()},"close-revision-viewer":()=>{V=null,H()}});function Mr(e){return ft().find(t=>t.id===(e==null?void 0:e.user_id))||null}function Zh(e){if(!e)return"Team-wide";const t=oe().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function Xh(e,t=re()){return!(e!=null&&e.is_agent)||!t||!Mr(e)?!1:e.owner_id===t.id||Fi()}function Jh(e){const t=Mr(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function e1(e,t){var n,i;return((n=ft().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function rn(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function jr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function t1(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=Mr(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${rn("Scope","A guest from another team, with a membership here")}
                ${rn("Owner",jr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=Jh(e),o=[rn("Scope",u(Zh(n.agent_project_id??e.project_id))),rn("Owner",jr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&o.push(rn("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;o.push(rn("Registered by",f?jr(f,e1(f,t)):"A registrar")),o.push(rn("Last used",n.last_used_at?u(Te(n.last_used_at)):"Never"))}else o.push(rn("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=ft().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);o.push(rn("Sessions registered",f.length?f.map(g=>jr(g.id,g.name)).join(", "):"None active"))}const a=Xh(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=a?`
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
    `}let ev=0;async function Rr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++ev;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==ev)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const o=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),a=n.filter(l=>l.is_active);if(!a.length&&!o.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...a.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${u(l.key_prefix||"")}…</code>${l.name?` · ${u(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${u(Te(l.created_at))}${l.owner_name?` by ${u(l.owner_name)}`:""} · ${l.last_used_at?`last used ${u(Te(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...o.map(l=>{var d;const c=((d=l.client)==null?void 0:d.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${u(c)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${u(Te(l.created_at))}${l.last_used_at?` · last used ${u(Te(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(c)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function n1(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),Rr(t)}catch(n){E("revoke the key",n)}}const Pr={bio:4e3,pronouns:40,tagline:120,name:255};let je=[],Lo=null,tv=new Map,nu=!1,qr=0,Ao=null,Xi=null,Co=null,Nr=!1,iu=0,su={teamId:null,role:null};async function nv(e,t){const n=await h.getTeamRoster(e,{includeIdle:t}),i=re(),s=Array.isArray(n)?n.find(o=>o.user_id===(i==null?void 0:i.id)):null;return su={teamId:e,role:(s==null?void 0:s.role)??null},n}function i1(e,t){!t||Lo!==e||(je=je.map(n=>n.user_id===t.user_id?t:n))}function s1(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function o1(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function Or(){const e=T();if(!e)return;const t=++qr,n=nu,i=document.getElementById("people-list");i&&(i.innerHTML=s1(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=nu),Gg().then(()=>{t===qr&&(Fi()?br():zg(),Lo===e.id&&Ji())});try{const[o,a]=await Promise.all([nv(e.id,n),o1(e.id)]);if(t!==qr)return;je=o,Lo=e.id,tv=a,Ji()}catch(o){if(t!==qr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=W({icon:K.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),E("load the roster",o)}}function Hr(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function a1(e){const t=tv.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u(Hr(e))}function r1(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(Zh(e.project_id))}</span>`),Jh(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u(Hr(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${Ct(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${a1(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function iv(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(r1).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function Ji(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=je.filter(o=>!o.is_agent),n=je.filter(o=>o.is_agent),i=re(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=iv("Humans",t,"No one yet.",s)+iv("Agents",n,"No agents yet.")+l1()}function l1(){var s;if(!Fi())return"";const e=new Set(je.map(o=>o.user_id)),t=new Set(ft().map(o=>o.id)),n=(s=re())==null?void 0:s.id,i=Et().filter(o=>!e.has(o.user_id)&&!t.has(o.user_id));return i.length?`
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
    `:""}function c1(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function d1(e){var i,s,o;const t=(i=T())==null?void 0:i.id;if(!t||!e)return!1;let n=null;return e.id===((s=re())==null?void 0:s.id)&&su.teamId===t?n=su.role:Lo===t&&(n=((o=je.find(a=>a.user_id===e.id))==null?void 0:o.role)??null),n==="admin"||n==="owner"}function sv(e,t=re()){return!e||!t?!1:e.user_id===t.id?!0:!!e.is_agent&&(e.owner_id===t.id||d1(t))}async function ov(e,t,{fresh:n=!1}={}){if(!n&&Lo===e){const o=je.find(a=>a.user_id===t);if(o)return o}const s=(await nv(e,!0)).find(o=>o.user_id===t)||null;return i1(e,s),s}let av=0,Bo=null;async function Fr(e,t=!0){var r;t&&un(),Jp();const n=++av,i=T();if(!i)return;const s=window.location.pathname,o=()=>{var l;return n!==av||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let a;try{a=await ov(i.id,e)}catch(l){if(o())return;E("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!o()){if(!a){const l=ft().find(c=>c.id===e);l&&(a=c1(l))}if(!a){$("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Rn("people"),As("people"),ou(a),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function u1(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function ou(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=u1();n.classList.remove("hidden"),n.dataset.userId=e.user_id,Bo=e;const i=m(e.user_id),s=sv(e),o=e.user_id===((l=re())==null?void 0:l.id),a=e.bio?`<div class="person-bio markdown-body">${Fn(e.bio)}</div>`:`<p class="person-bio-empty">${o?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${o?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${Ct(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${u(e.name)}${e.pronouns?`<span class="person-pronouns">${u(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${u(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${u(e.tagline)}</div>`:""}
                <div class="person-role">${u(Hr(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${a}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?t1(e,je):""}
            ${!e.is_agent||!Mr(e)?p1(e):""}
        </div>
    `,t&&g1(e.user_id),Xh(e)&&Rr(e.user_id)}function p1(e){var i;if(!Fi())return"";const t=Et().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=re())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u(Hr(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function Ur(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function m1(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){Rr(t);return}if(n){je=je.filter(o=>o.user_id!==t),Do(t)?O("people"):Ur()&&Ji();return}if(i){Ur()&&Or();return}Do(t)&&Bo?ou(Bo):Ur()&&Ji()}function f1(e){const{userId:t}=e.detail||{};je=je.filter(n=>n.user_id!==t),Do(t)?O("people"):Ur()&&Ji()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",m1),window.addEventListener("chaotic:member-removed",f1));const rv=["in_progress","in_review","todo"];let lv=0;async function g1(e){const t=T();if(!t)return;const n=++lv;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:rv,sort_by:"status",order:"asc",limit:20})}catch(a){i=null,console.error("Failed to load their issues:",a)}if(n!==lv)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const o=a=>rv.indexOf(a.status);s.innerHTML=[...i].sort((a,r)=>o(a)-o(r)).map(a=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(a.identifier)}" data-action="person-open-issue" data-identifier="${m(a.identifier)}">
            <span class="person-issue-id">${u(a.identifier)}</span>
            <span class="person-issue-title">${u(a.title)}</span>
            <span class="person-issue-status">${u(String(a.status).replace("_"," "))}</span>
        </a>
    `).join("")}const au=["name","avatar_url","pronouns","tagline","bio"];function h1(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(au.map(n=>[n,t(n,e==null?void 0:e[n])]))}let ru=0;async function v1(e){var l;const t=re(),n=T();if(!t||!n)return;const i=++ru,s=window.location.pathname;let o;try{o=await ov(n.id,e,{fresh:!0})}catch(c){i===ru&&E("load this profile",c);return}if(i!==ru||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!o&&e===t.id&&(o={...t,user_id:t.id}),!o||!sv(o,t)))return;Ao=e,Co=o,Xi=h1(o),iu++;const a=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=a?"Edit your profile":`Edit ${o.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(o.name)}" maxlength="${Pr.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(o.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            <div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${Mo?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${Il.test(o.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${Mo?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${uv}px.</p>
            </div>
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(o.pronouns)}" maxlength="${Pr.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(o.tagline)}" maxlength="${Pr.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${Pr.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${u(o.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${Nr?" disabled":""}>Save</button>
        </form>
    `,U()}function b1(e,t=null){const n=o=>{var a;return((a=e.querySelector(`#${o}`))==null?void 0:a.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const o of au){const a=t?String(t[o]??""):null;(o==="avatar_url"?i[o]===(a==null?void 0:a.trim()):i[o]===a)||(s[o]=o==="avatar_url"?i[o]||null:i[o])}return s}function cv(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");ou(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function Do(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function dv(){Ao=null,Xi=null,Co=null,H()}async function y1(e){e.preventDefault();const t=Ao;if(!t||Nr)return;const n=e.target.closest("form")||e.target,i=b1(n,Xi);if(!Object.keys(i).length){dv();return}const s=re(),o=t===(s==null?void 0:s.id),a=Co,r=iu,l=n.querySelector('button[type="submit"]');Nr=!0,l&&(l.disabled=!0);try{const c=o?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(au.map(p=>[p,(c==null?void 0:c[p])??null]));je=je.map(p=>p.user_id===t?{...p,...d}:p),o&&(Bt({...s,...d}),kr()),r===iu&&dv(),$("Profile saved","success"),Do(t)?cv({...a,...d}):Ji()}catch(c){E("save the profile",c)}finally{Nr=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const uv=256;async function w1(e,t=uv){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const o=c=>new Promise(d=>s.toBlob(d,c,.9)),a=await o("image/webp");let r=a&&a.type==="image/webp"?a:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await o("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let Mo=!1;function pv(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function $1(e,t){var s;if(!e||!t||t.id&&t.id!==e)return;const n=t.avatar_url??null;je=je.map(o=>o.user_id===e?{...o,avatar_url:n}:o);const i=re();if(i&&i.id===e&&(Bt({...i,avatar_url:n}),kr()),Ao===e&&Xi){const o=document.getElementById("profile-avatar");o&&(o.value=n||""),Xi={...Xi,avatar_url:n||""},Co={...Co,avatar_url:n},(s=document.getElementById("profile-photo-remove"))==null||s.classList.toggle("hidden",!Il.test(n||""))}Bo&&Do(e)&&cv({...Bo,avatar_url:n})}function mv(){const e=re(),t=Ao||(e==null?void 0:e.id);return t?{userId:t,self:t===(e==null?void 0:e.id)}:null}async function fv(e,t,n,i){if(!(Mo||!e)){Mo=!0,pv(!0);try{$1(e.userId,await t()),$(n,"success")}catch(s){E(i,s)}finally{Mo=!1,pv(!1)}}}async function k1(e,t=w1){var s;const n=(s=e.files)==null?void 0:s[0];if(!n)return;const i=mv();try{await fv(i,async()=>{const o=await t(n);return i.self?h.uploadAvatar(o):h.uploadAgentAvatar(i.userId,o)},"Photo uploaded","upload the photo")}finally{e.value=""}}function _1(){const e=mv();return fv(e,()=>e.self?h.deleteAvatar():h.deleteAgentAvatar(e.userId),"Photo removed","remove the photo")}function lu(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}le({"view-person":(e,t)=>{e.type!=="click"||lu(e)||(e.preventDefault(),Fr(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),v1(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=re();t&&Fr(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&k1(n)},"remove-profile-photo":e=>{e.type==="click"&&_1()},"save-profile":e=>{y1(e)},"retry-load-people":e=>{e.type==="click"&&Or()},"person-open-issue":(e,t)=>{e.type!=="click"||lu(e)||(e.preventDefault(),Gl(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&n1(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await kh(t.connectionId,t.connectionName),Rr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||lu(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(nu=!!n.checked,Or())}});const E1=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let St=[],Gr=null,zr=null,cu=0;wt(e=>{e==="currentProject"&&A()==="board"&&jo()});async function jo({fromMemory:e=!1}={}){ta(-1);const t=++cu,n=J();if(!n){const a=document.getElementById("kanban-board");a&&(a.innerHTML=oe().length===0?W({icon:K.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):W({icon:K.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=Jl(),o=e?_a("board",s):void 0;o?(St=o,Gr=s,A()==="board"&&Dt(St),es()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const a=await h.getIssues({project_id:n});if(t!==cu)return;const r=o&&Ea(St,a);St=a,Gr=s,fi("board",s,a),A()==="board"&&Dt(St),r||es()}catch(a){if(t!==cu)return;i&&(i.innerHTML=W({icon:K.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",a)}}const du=Sy(()=>jo(),200);function es(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Gr&&fi("board",Gr,St),e.innerHTML=E1.map(i=>{const s=St.filter(o=>o.status===i.key);return`
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
                    `:s.map(x1).join("")}
                </div>
            </div>
        `}).join(""),I1(t)}function x1(e){const t=e.assignee_id?Qt(e.assignee_id):null,n=t?jt(t):null,i=e.estimate!=null?di(e.estimate,e.project_id):"",s=ua(e.estimate,e.project_id),o=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${u(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${Ct(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${u(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(qe(e.priority))}">${ht(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${u(i)}</span>`:""}
                ${o.map(a=>`<span class="issue-label" title="${m(a.name)}" style="background: ${ae(a.color)}20; color: ${ae(a.color)}">${u(a.name)}</span>`).join("")}
            </div>
        </div>
    `}function I1(e){const t=Ip();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ta(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ta(i),n[i].classList.add("keyboard-selected")}function S1(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),zr=t.dataset.id,t.classList.add("dragging")}function T1(e,t){t.classList.remove("dragging"),zr=null}function gv(e){const t=St.find(n=>n.id===zr);return!!t&&t.status===e}function L1(e,t){e.preventDefault(),!gv(t.dataset.status)&&t.classList.add("drag-over")}function A1(e,t){t.classList.remove("drag-over")}function C1(e,t){e.preventDefault();const n=St.find(i=>i.id===t.dataset.id);n&&gv(n.status)||t.classList.add("drag-over")}function B1(e,t){t.classList.remove("drag-over")}async function D1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=St.find(a=>a.id===n);if(!s)return;const o=s.status;if(o!==i){s.status=i,es();try{const a=await h.updateIssue(n,{status:i});$("Status updated","success"),Ws(a)}catch(a){s.status=o,es(),E("update status",a)}}}async function M1(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=zr||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),o=s==null?void 0:s.dataset.status;if(!o)return;const a=St.find(l=>l.id===n);if(!a)return;const r=a.status;if(r!==o){a.status=o,es();try{const l=await h.updateIssue(n,{status:o});$("Status updated","success"),Ws(l)}catch(l){a.status=r,es(),E("update status",l)}}}le({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),ue(t.id)):e.type==="dragstart"?S1(e,n):e.type==="dragend"?T1(e,n):e.type==="dragover"?C1(e,n):e.type==="dragleave"?B1(e,n):e.type==="drop"&&M1(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?L1(e,n):e.type==="dragleave"?A1(e,n):e.type==="drop"&&D1(e,n)},"retry-load-board":()=>jo()});const Cn=new Map,hv=6e4,uu=100;let Ne=null,Vr=null,Kr=null,Ro=null,vv=!1;const bv={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},yv={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},wv={api:null};let pu={...wv};function j1(e={}){pu={...wv,...e},Ne||(Ne=document.createElement("div"),Ne.className="issue-tooltip",Ne.style.display="none",document.body.appendChild(Ne),Ne.addEventListener("mouseenter",()=>{clearTimeout(Vr)}),Ne.addEventListener("mouseleave",()=>{mu()})),vv||(document.addEventListener("mouseover",R1),document.addEventListener("mouseout",P1),vv=!0)}function R1(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=q1(t);if(n){if(n===Ro&&Ne.style.display!=="none"){clearTimeout(Vr);return}clearTimeout(Kr),Kr=setTimeout(()=>{N1(t,n)},200)}}function P1(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Kr),Vr=setTimeout(()=>{mu()},150))}function q1(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function N1(e,t){Ro=t;const n=e.getBoundingClientRect();Ne.style.left=`${n.left+window.scrollX}px`,Ne.style.top=`${n.bottom+window.scrollY+8}px`,Ne.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Ne.style.display="block";try{const i=await H1(t);if(Ro!==t)return;F1(i)}catch{if(Ro!==t)return;Ne.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function mu(){clearTimeout(Kr),clearTimeout(Vr),Ne&&(Ne.style.display="none"),Ro=null}function O1(){const e=Date.now();for(const[t,n]of Cn.entries())e-n.timestamp>=hv&&Cn.delete(t)}async function H1(e){Cn.size>uu/2&&O1();const t=Cn.get(e);if(t&&Date.now()-t.timestamp<hv)return t.issue;if(!pu.api)throw new Error("API not initialized");const n=await pu.api.getIssueByIdentifier(e);if(Cn.size>=uu){const i=Array.from(Cn.entries());i.sort((o,a)=>o[1].timestamp-a[1].timestamp);const s=i.slice(0,uu/2);for(const[o]of s)Cn.delete(o)}return Cn.set(e,{issue:n,timestamp:Date.now()}),n}function F1(e){const t=bv[e.status]||bv.backlog,n=yv[e.priority]||yv.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Ne.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${U1(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${G1(e.priority)}</span>
        </div>
    `}function U1(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function G1(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function $v(){return!!document.querySelector(".description-inline-editor")}function fu(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function gu(){var e;return fu("issue-detail-view")?((e=Ee())==null?void 0:e.id)??null:null}function ti(e){return!!e&&gu()===e}function z1(){We("issue:created",Z1),We("issue:updated",X1),We("issue:deleted",J1),We("comment",nT),We("relation",sT),We("attestation",oT),We("activity",rT),We("project",lT),We("sprint",cT),We("document",iT),We("inbox",aT),We("connection:reconnected",dT),We("connection:unauthorized",K1),We("connection:forbidden",W1),We("connection:superseded",V1)}function V1(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function K1(){h.logout(),Bt(null),ri(null),wo(),$("Your session has ended. Please sign in again.","warning")}function W1(){$("Live updates stopped: you no longer have access to this team.","error")}function kv(e,t){var n;return e&&e===((n=re())==null?void 0:n.id)?"You":t||"Someone"}function Y1(e){var s;const t=kv(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(yt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${qe(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=re())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function Q1(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${kv(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function _v(e,t,n){const i=$(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const o=()=>{var a;(a=i.querySelector(".toast-close"))==null||a.click(),Promise.resolve(ue(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",o),s.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),o())})}}}function Z1(e){var s;qs(A(),"board","sprints","epics");const t=ie(),n=t.findIndex(o=>o.id===e.id),i=t.findIndex(o=>o._isOptimistic&&o.title===e.title);if(!(n>=0))if(i>=0){const o=[...t];o[i]=e,nt(o),A()==="issues"&&gt()}else nt([e,...t]),A()==="issues"&&gt(),_v(e,Y1(e),"info");if(e.assignee_id===((s=re())==null?void 0:s.id)){const o=Ye(),a=o.findIndex(l=>l.id===e.id),r=o.findIndex(l=>l._isOptimistic&&l.title===e.title);if(a===-1&&r===-1)Vn([e,...o]),A()==="my-issues"&&Kn();else if(r>=0){const l=[...o];l[r]=e,Vn(l),A()==="my-issues"&&Kn()}}A()==="board"?du():A()==="sprints"?Po():A()==="epics"&&Sn(),ti(e.parent_id)&&ni(e.parent_id)}function X1(e){qs(A(),"board","sprints","epics"),va(e);const t=ie();t.some(s=>s.id===e.id)&&nt(t.map(s=>s.id===e.id?e:s));const n=Ye();n.some(s=>s.id===e.id)&&Vn(n.map(s=>s.id===e.id?e:s));const i=Es();i.some(s=>s.id===e.id)&&Dt(i.map(s=>s.id===e.id?e:s)),A()==="issues"?gt():A()==="my-issues"?Kn():A()==="board"?du():A()==="sprints"?Po():A()==="epics"&&Sn(),ti(e.id)&&($v()?id(e):ni(e.id))}function J1(e){var s,o;const t=e.title??((s=ie().find(a=>a.id===e.id))==null?void 0:s.title)??((o=Ye().find(a=>a.id===e.id))==null?void 0:o.title);qs(A(),"board","sprints","epics"),Mw(e.id),nt(ie().filter(a=>a.id!==e.id)),Vn(Ye().filter(a=>a.id!==e.id));const n=Es();n.some(a=>a.id===e.id)&&Dt(n.filter(a=>a.id!==e.id)),A()==="issues"?gt():A()==="my-issues"?(Kn(),wi({showLoading:!1})):A()==="board"?du():A()==="sprints"?Po():A()==="epics"&&Sn();const i=ti(e.id);_v(null,Q1(e,t),i?"warning":"info"),i&&O("my-issues")}const Ev=250,eT=1e3,ts=new Map;function ni(e){$v()?id():hu(e,Ev)}function hu(e,t){let n=ts.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},ts.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>tT(e),t))}async function tT(e){const t=ts.get(e);if(!t)return;if(t.timer=null,!ti(e)){ts.delete(e);return}t.inFlight=!0;let n;try{n=await ue(e,!1,{refresh:!0})}finally{t.inFlight=!1}ts.get(e)===t&&(t.again?(t.again=!1,hu(e,Ev)):n==="retry"?hu(e,eT):ts.delete(e))}function nT(e){A()==="my-issues"&&wi({showLoading:!1}),ti(e.issue_id)&&ni(e.issue_id),e.document_id&&Rm(e.document_id)}function iT(e,{type:t}={}){qs(A(),"documents"),jm(),t==="deleted"?y$(e.id,e.title):Rm(e.id)}function sT(e){const t=gu();t&&(e.source_issue_id===t||e.target_issue_id===t)&&ni(t)}function oT(e){ti(e.issue_id)&&ni(e.issue_id)}function aT(e,t){var n;e.recipient_user_id===((n=re())==null?void 0:n.id)&&(Pi(),xx(t==null?void 0:t.type,e),A()==="inbox"&&!Tx(t==null?void 0:t.type,e)&&Ni({background:!0}))}function rT(e){A()==="my-issues"&&wi({showLoading:!1}),ti(e.issue_id)&&ni(e.issue_id)}function lT(e,{type:t}){mt().then(()=>{A()==="projects"&&Nn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function Po(){const e=z$();e&&fu("sprint-detail-view")?bi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):fu("sprints-view")&&mn().catch(t=>console.error("Failed to reload sprints:",t))}function cT(e,{type:t}={}){if(qs(A(),"sprints"),zm(),A()==="sprints"?Po():A()==="my-issues"&&zs(),t==="created")$(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";$(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function dT(){const e=A();ec(),Pi(),e==="issues"?Nt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(yi().catch(n=>console.error("Failed to resync my issues:",n)),zs().catch(n=>console.error("Failed to resync sprint status:",n)),wi({showLoading:!1})):e==="board"?jo():e==="sprints"?Po():e==="epics"?Sn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?mt().then(()=>{A()==="projects"&&Nn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?jm():e==="inbox"&&Ni({background:!0});const t=gu();t&&ni(t)}const uT='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function xv(e){return Array.from(e.querySelectorAll(uT)).filter(t=>!t.closest(".hidden, [hidden]"))}function Iv(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function pT(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Iv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=xv(t);n&&n.focus()}}}function qo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Iv(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=xv(n);if(i.length===0)return;const s=i[0],o=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),o.focus()):!e.shiftKey&&document.activeElement===o&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&qo()});async function mT(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=J();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const o="temp-"+Date.now(),a=oe().find(c=>c.id===i),r={id:o,title:n,identifier:`${(a==null?void 0:a.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};nt([r,...ie()]),gt();const l=document.querySelector(`[data-id="${o}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ie();d.some(p=>p.id===c.id)?nt(d.filter(p=>p.id!==o)):d.some(p=>p.id===o)&&nt(d.map(p=>p.id===o?c:p)),gt(),mt(),$("Issue created!","success")}catch(c){nt(ie().filter(d=>d.id!==o)),gt(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}dw({beforeScrollRestore:jc,beforeNavigate:()=>{rx(),Zy(),li(null),Tp(null),qo(),mu(),ca()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Hh(e[1]),!0;if(e[0]==="issue"&&e[1])return ar(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(ar(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}if(e[0]==="document"&&e[1])return ET(e[1]),!0;if(e[0]==="sprint"&&e[1])return W$(e[1]),!0;if(e[0]==="people"&&e[1])return Fr(decodeURIComponent(e[1]),!1),!0;if(e[0]==="projects"&&e[1]&&e[2]==="settings"){const t=new URLSearchParams(window.location.search).get("tab")||void 0;return pa(decodeURIComponent(e[1]),{tab:t,replace:!0}),!0}return!1},detailPopstate:e=>e.epicId?(xo(e.epicId,!1),!0):e.issueId?(ue(e.issueId,!1),!0):e.identifier?(ar(e.identifier),!0):e.documentId?(xe(e.documentId,!1),!0):e.sprintId?(bi(e.sprintId,!1),!0):e.personId?(Fr(e.personId,!1),!0):e.settingsProjectId?(pa(e.settingsProjectId,{tab:e.tab,replace:!0}),!0):!1,restoreProject:()=>{const e=Wp();e&&oe().some(t=>t.id===e)&&$t(e)},issueNavigate:e=>ar(e),epicNavigate:e=>Hh(e)}),cw({"my-issues":()=>{zs(),yi(),wi()},inbox:()=>{Rx(),Ni({focusFirst:!0})},issues:()=>{var r;m_(),b_(),$_();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Yn().length>0||Qn().length>0;s||Nt();const o=ff().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),qa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Na())}}),a=Tf().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([o,a]).then(()=>Nt()):(o.catch(l=>console.error("Failed to populate label filter:",l)),a.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{lS()},epics:()=>{Sn({fromMemory:!0})},board:()=>{jo({fromMemory:!0})},projects:()=>{Nn(),mt().then(Nn)},sprints:()=>{mn({fromMemory:!0})},rituals:()=>{bm()},documents:()=>{zn(null,null,{fromMemory:!0})},people:Or,settings:()=>{jd(),$h(),_h(),Ms()}});function fT(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function gT(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Vp(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Xy());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Jy()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,o])=>{const a=e.querySelector(`#${s} .btn-primary`);a&&a.addEventListener("click",()=>tw(o))})}function hT(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Bm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Bm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Dm());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>f$());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Jt())}function vT(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Qm())}function bT(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>w_());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>t_());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>n_()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const v=g.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Fa("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Fa("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Fa("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Fa("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Ua())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ga())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Cc())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Bc())}const o=document.getElementById("label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>za())}const a=document.getElementById("exclude-label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Va())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>lt());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>lt());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>lt());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Nt());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>Mf());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>mT(g))}function yT(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Ug());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ks()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(a=>{a.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(a.dataset.view),r.detail>0&&Gh())})}),document.querySelectorAll(".issues-layout-toggle a[data-view]").forEach(a=>{a.addEventListener("click",r=>{var c;if(r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0)return;r.preventDefault();const l=a.dataset.view;A()!==l&&O(l),(c=document.querySelector(`#${l}-view .issues-layout-toggle a[data-view="${l}"]`))==null||c.focus()})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>uI());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>qo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>pT());const o=document.querySelector(".mobile-fab");o&&o.addEventListener("click",()=>Ks())}function wT(e){qo(),Ln()&&O(A()),A()==="query"?iS(e):e?$t(e):Pp()}function Sv(){return US(document.getElementById(la),{returnFocus:!0})}le({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&wT(n.value)},showCreateIssueModal:()=>Ks(),showCreateEpicModal:()=>yS(),"retry-load-epics":()=>Sn(),showCreateProjectModal:()=>Hp(),showCreateDocumentModal:()=>qm(),showCreateTeamModal:()=>Qg(),showEditTeamModal:()=>xI(),showInviteModal:()=>Kg(),showCreateApiKeyModal:()=>I0(),showCreateAgentModal:()=>kw(),resetOnboarding:()=>ih(),logout:()=>wh(),navigateToProjects:()=>O("projects")});async function $T(){if(!h.getToken()){await gh();return}em();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await vy(hp(h.getToken()));if(n){t.then(i=>{Bt(i),kr()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await El(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),$("Showing saved data — check your connection and reload","error")}),Bt(n.user),await ei({teamsRequest:e,snapshot:n});return}try{const i=await t;Bt(i),await ei({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await gh();return}console.error("Failed to load current user on boot:",i),wo(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;qy(),sE(),E0(),yT(),fT(),vT(),bT(),gT(),hT(),kT(),GS(),(e=document.querySelector(`[data-picker-for="${la}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),_T(),j1({api:h}),z1(),await $T()});function kT(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ey()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),ty(n?"light":"dark")})}function _T(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Gl(i)}}})}async function ET(e){try{await xe(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",DS({getCurrentView:A,getSelectedIndex:Ep,setSelectedIndex:Pn,viewIssue:ue,showEditIssueModal:fg,showInlineDropdown:Sc,isInlineDropdownOpen:ki,isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln,beforeNavigate:jc})),document.addEventListener("keydown",MS({getCurrentView:A,getSelectedIndex:Ly,setSelectedIndex:xp,viewDocument:xe,showEditDocumentModal:Nm,isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln})),document.addEventListener("keydown",RS({getCurrentView:A,getSelectedIndex:Ip,setSelectedIndex:ta,viewIssue:ue,isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln})),document.addEventListener("keydown",jS({getCurrentView:A,getSelectedIndex:Ay,setSelectedIndex:na,toggleInboxExpand:sI,collapseInboxExpand:Cx,archiveInboxEntry:iI,isInlineDropdownOpen:ki,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln})),document.addEventListener("keydown",PS()),document.addEventListener("keydown",Jd({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&bi(e.dataset.sprintId)},getCurrentView:A,getSelectedIndex:Cy,setSelectedIndex:Sp,isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln})),document.addEventListener("keydown",Jd({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&tm(e.dataset.identifier)},getCurrentView:A,getSelectedIndex:By,setSelectedIndex:Is,isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln})),document.addEventListener("keydown",Jd({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:A,getSelectedIndex:mk,setSelectedIndex:fk,isInlineDropdownOpen:ki,isModalOpen:Ve,isCommandPaletteOpen:In,isDetailViewActive:Ln}));function Tv(){var e;H0(A())||(O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus())}function xT(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view details.related-add[open]")||d$()}document.addEventListener("keydown",CS({closeModal:H,closeSidebar:qo,navigateTo:O,openProjectSwitcher:Sv,showCreateIssueModal:Ks,showKeyboardShortcutsHelp:Sh,isModalOpen:Ve,focusSearch:Tv,isInlineDropdownOpen:ki,closeInlineDropdowns:Iy,isModalDirty:Ey,focusModalField:yp,closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),xi()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:xT,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),j0([{id:"nav-my-issues",title:"Home",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"Issues laid out by status",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>Sv(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"The rituals tabs in Project settings",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Approvals, mentions and assignments awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(Ks,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(Hp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(qm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Qg(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Tv,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(Kg,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Sh(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>ih(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>wh(),category:"Account"}]),document.addEventListener("keydown",BS({isModalOpen:Ve,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:In,openCommandPalette:R0,closeCommandPalette:xr})),window.marked=Q,window.DOMPurify=op,console.log("Chaotic frontend loaded via Vite")})();
