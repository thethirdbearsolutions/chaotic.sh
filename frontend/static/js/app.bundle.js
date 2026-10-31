var HE=Object.defineProperty;var FE=(St,Be,un)=>Be in St?HE(St,Be,{enumerable:!0,configurable:!0,writable:!0,value:un}):St[Be]=un;var Q=(St,Be,un)=>FE(St,typeof Be!="symbol"?Be+"":Be,un);(function(){"use strict";var zl;function St(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Be=St();function un(e){Be=e}var ki={exec:()=>null};function K(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(De.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var De={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Sm=/^(?:[ \t]*(?:\n|$))+/,Tm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Lm=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ei=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Cm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,uo=/(?:[*+-]|\d{1,9}[.)])/,oc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,rc=K(oc).replace(/bull/g,uo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Am=K(oc).replace(/bull/g,uo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),po=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Bm=/^[^\n]+/,mo=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Dm=K(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",mo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),jm=K(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,uo).getRegex(),Bs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",fo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mm=K("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",fo).replace("tag",Bs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),lc=K(po).replace("hr",Ei).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bs).getRegex(),Rm=K(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",lc).getRegex(),go={blockquote:Rm,code:Tm,def:Dm,fences:Lm,heading:Cm,hr:Ei,html:Mm,lheading:rc,list:jm,newline:Sm,paragraph:lc,table:ki,text:Bm},cc=K("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ei).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bs).getRegex(),Pm={...go,lheading:Am,table:cc,paragraph:K(po).replace("hr",Ei).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",cc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bs).getRegex()},qm={...go,html:K(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",fo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ki,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:K(po).replace("hr",Ei).replace("heading",` *#{1,6} *[^
]`).replace("lheading",rc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Nm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Om=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,dc=/^( {2,}|\\)\n(?!\s*$)/,Hm=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ds=/[\p{P}\p{S}]/u,ho=/[\s\p{P}\p{S}]/u,uc=/[^\s\p{P}\p{S}]/u,Fm=K(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ho).getRegex(),pc=/(?!~)[\p{P}\p{S}]/u,Um=/(?!~)[\s\p{P}\p{S}]/u,Gm=/(?:[^\s\p{P}\p{S}]|~)/u,zm=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,mc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vm=K(mc,"u").replace(/punct/g,Ds).getRegex(),Wm=K(mc,"u").replace(/punct/g,pc).getRegex(),fc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Km=K(fc,"gu").replace(/notPunctSpace/g,uc).replace(/punctSpace/g,ho).replace(/punct/g,Ds).getRegex(),Ym=K(fc,"gu").replace(/notPunctSpace/g,Gm).replace(/punctSpace/g,Um).replace(/punct/g,pc).getRegex(),Zm=K("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,uc).replace(/punctSpace/g,ho).replace(/punct/g,Ds).getRegex(),Xm=K(/\\(punct)/,"gu").replace(/punct/g,Ds).getRegex(),Qm=K(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Jm=K(fo).replace("(?:-->|$)","-->").getRegex(),ef=K("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Jm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),js=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,tf=K(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",js).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),gc=K(/^!?\[(label)\]\[(ref)\]/).replace("label",js).replace("ref",mo).getRegex(),hc=K(/^!?\[(ref)\](?:\[\])?/).replace("ref",mo).getRegex(),nf=K("reflink|nolink(?!\\()","g").replace("reflink",gc).replace("nolink",hc).getRegex(),vo={_backpedal:ki,anyPunctuation:Xm,autolink:Qm,blockSkip:zm,br:dc,code:Om,del:ki,emStrongLDelim:Vm,emStrongRDelimAst:Km,emStrongRDelimUnd:Zm,escape:Nm,link:tf,nolink:hc,punctuation:Fm,reflink:gc,reflinkSearch:nf,tag:ef,text:Hm,url:ki},sf={...vo,link:K(/^!?\[(label)\]\((.*?)\)/).replace("label",js).getRegex(),reflink:K(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",js).getRegex()},yo={...vo,emStrongRDelimAst:Ym,emStrongLDelim:Wm,url:K(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},af={...yo,br:K(dc).replace("{2,}","*").getRegex(),text:K(yo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ms={normal:go,gfm:Pm,pedantic:qm},_i={normal:vo,gfm:yo,breaks:af,pedantic:sf},of={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},vc=e=>of[e];function ht(e,t){if(t){if(De.escapeTest.test(e))return e.replace(De.escapeReplace,vc)}else if(De.escapeTestNoEncode.test(e))return e.replace(De.escapeReplaceNoEncode,vc);return e}function yc(e){try{e=encodeURI(e).replace(De.percentDecode,"%")}catch{return null}return e}function bc(e,t){var a;const n=e.replace(De.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(De.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(De.slashPipe,"|");return i}function xi(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function rf(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function wc(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function lf(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Rs=class{constructor(e){Q(this,"options");Q(this,"rules");Q(this,"lexer");this.options=e||Be}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:xi(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=lf(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=xi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:xi(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=xi(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,y=g.raw+`
`+n.join(`
`),b=this.blockquote(y);a[a.length-1]=b,i=i.substring(0,i.length-g.raw.length)+b.raw,s=s.substring(0,s.length-g.text.length)+b.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,y=g.raw+`
`+n.join(`
`),b=this.list(y);a[a.length-1]=b,i=i.substring(0,i.length-f.raw.length)+b.raw,s=s.substring(0,s.length-g.raw.length)+b.raw,n=y.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),f=e.split(`
`,1)[0],g=!u.trim(),y=0;if(this.options.pedantic?(y=2,d=u.trimStart()):g?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,d=u.slice(y),y+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const I=this.rules.other.nextBulletRegex(y),S=this.rules.other.hrRegex(y),D=this.rules.other.fencesBeginRegex(y),A=this.rules.other.headingBeginRegex(y),W=this.rules.other.htmlBeginRegex(y);for(;e;){const _=e.split(`
`,1)[0];let j;if(f=_,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),j=f):j=f.replace(this.rules.other.tabCharGlobal,"    "),D.test(f)||A.test(f)||W.test(f)||I.test(f)||S.test(f))break;if(j.search(this.rules.other.nonSpaceChar)>=y||!f.trim())d+=`
`+j.slice(y);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(u)||A.test(u)||S.test(u))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=_+`
`,e=e.substring(_.length+1),u=j.slice(y)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let b=null,$;this.options.gfm&&(b=this.rules.other.listIsTask.exec(d),b&&($=b[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!b,checked:$,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=bc(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(bc(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=xi(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=rf(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),wc(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return wc(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const y=f.slice(1,-1);return{type:"em",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Tt=class sc{constructor(t){Q(this,"tokens");Q(this,"options");Q(this,"state");Q(this,"tokenizer");Q(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Be,this.options.tokenizer=this.options.tokenizer||new Rs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:De,block:Ms.normal,inline:_i.normal};this.options.pedantic?(n.block=Ms.pedantic,n.inline=_i.pedantic):this.options.gfm&&(n.block=Ms.gfm,this.options.breaks?n.inline=_i.breaks:n.inline=_i.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ms,inline:_i}}static lex(t,n){return new sc(n).lex(t)}static lexInline(t,n){return new sc(n).inlineTokens(t)}lex(t){t=t.replace(De.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(De.tabCharGlobal,"    ").replace(De.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},g),typeof y=="number"&&y>=0&&(f=Math.min(f,y))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Ps=class{constructor(e){Q(this,"options");Q(this,"parser");this.options=e||Be}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(De.notSpaceStart))==null?void 0:a[0],s=e.replace(De.endingNewline,"")+`
`;return i?'<pre><code class="language-'+ht(i)+'">'+(n?s:ht(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:ht(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+ht(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ht(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=yc(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+ht(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=yc(e);if(s===null)return ht(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${ht(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ht(e.text)}},bo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Lt=class ac{constructor(t){Q(this,"options");Q(this,"renderer");Q(this,"textRenderer");this.options=t||Be,this.options.renderer=this.options.renderer||new Ps,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new bo}static parse(t,n){return new ac(n).parse(t)}static parseInline(t,n){return new ac(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},qs=(zl=class{constructor(e){Q(this,"options");Q(this,"block");this.options=e||Be}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Tt.lex:Tt.lexInline}provideParser(){return this.block?Lt.parse:Lt.parseInline}},Q(zl,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),zl),cf=class{constructor(...e){Q(this,"defaults",St());Q(this,"options",this.setOptions);Q(this,"parse",this.parseMarkdown(!0));Q(this,"parseInline",this.parseMarkdown(!1));Q(this,"Parser",Lt);Q(this,"Renderer",Ps);Q(this,"TextRenderer",bo);Q(this,"Lexer",Tt);Q(this,"Tokenizer",Rs);Q(this,"Hooks",qs);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Ps(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Rs(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new qs;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];qs.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Tt.lex(e,t??this.defaults)}parser(e,t){return Lt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Tt.lex:Tt.lexInline,l=a.hooks?a.hooks.provideParser():e?Lt.parse:Lt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+ht(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},pn=new cf;function z(e,t){return pn.parse(e,t)}z.options=z.setOptions=function(e){return pn.setOptions(e),z.defaults=pn.defaults,un(z.defaults),z},z.getDefaults=St,z.defaults=Be,z.use=function(...e){return pn.use(...e),z.defaults=pn.defaults,un(z.defaults),z},z.walkTokens=function(e,t){return pn.walkTokens(e,t)},z.parseInline=pn.parseInline,z.Parser=Lt,z.parser=Lt.parse,z.Renderer=Ps,z.TextRenderer=bo,z.Lexer=Tt,z.lexer=Tt.lex,z.Tokenizer=Rs,z.Hooks=qs,z.parse=z,z.options,z.setOptions,z.use,z.walkTokens,z.parseInline,Lt.parse,Tt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:$c,setPrototypeOf:kc,isFrozen:df,getPrototypeOf:uf,getOwnPropertyDescriptor:pf}=Object;let{freeze:je,seal:Ze,create:wo}=Object,{apply:$o,construct:ko}=typeof Reflect<"u"&&Reflect;je||(je=function(t){return t}),Ze||(Ze=function(t){return t}),$o||($o=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),ko||(ko=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ns=Re(Array.prototype.forEach),mf=Re(Array.prototype.lastIndexOf),Ec=Re(Array.prototype.pop),Ii=Re(Array.prototype.push),ff=Re(Array.prototype.splice),Os=Re(String.prototype.toLowerCase),Eo=Re(String.prototype.toString),_o=Re(String.prototype.match),Si=Re(String.prototype.replace),gf=Re(String.prototype.indexOf),hf=Re(String.prototype.trim),ct=Re(Object.prototype.hasOwnProperty),Me=Re(RegExp.prototype.test),Ti=vf(TypeError);function Re(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return $o(e,t,i)}}function vf(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return ko(e,n)}}function O(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Os;kc&&kc(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(df(t)||(t[i]=a),s=a)}e[s]=!0}return e}function yf(e){for(let t=0;t<e.length;t++)ct(e,t)||(e[t]=null);return e}function vt(e){const t=wo(null);for(const[n,i]of $c(e))ct(e,n)&&(Array.isArray(i)?t[n]=yf(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=vt(i):t[n]=i);return t}function Li(e,t){for(;e!==null;){const i=pf(e,t);if(i){if(i.get)return Re(i.get);if(typeof i.value=="function")return Re(i.value)}e=uf(e)}function n(){return null}return n}const _c=je(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),xo=je(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Io=je(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),bf=je(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),So=je(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),wf=je(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),xc=je(["#text"]),Ic=je(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),To=je(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Sc=je(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hs=je(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$f=Ze(/\{\{[\w\W]*|[\w\W]*\}\}/gm),kf=Ze(/<%[\w\W]*|[\w\W]*%>/gm),Ef=Ze(/\$\{[\w\W]*/gm),_f=Ze(/^data-[\-\w.\u00B7-\uFFFF]+$/),xf=Ze(/^aria-[\-\w]+$/),Tc=Ze(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),If=Ze(/^(?:\w+script|data):/i),Sf=Ze(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Lc=Ze(/^html$/i),Tf=Ze(/^[a-z][.\w]*(-[.\w]+)+$/i);var Cc=Object.freeze({__proto__:null,ARIA_ATTR:xf,ATTR_WHITESPACE:Sf,CUSTOM_ELEMENT:Tf,DATA_ATTR:_f,DOCTYPE_NAME:Lc,ERB_EXPR:kf,IS_ALLOWED_URI:Tc,IS_SCRIPT_OR_DATA:If,MUSTACHE_EXPR:$f,TMPLIT_EXPR:Ef});const Ci={element:1,text:3,progressingInstruction:7,comment:8,document:9},Lf=function(){return typeof window>"u"?null:window},Cf=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Ac=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Lf();const t=B=>Bc(B);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Ci.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:g}=e,y=l.prototype,b=Li(y,"cloneNode"),$=Li(y,"remove"),I=Li(y,"nextSibling"),S=Li(y,"childNodes"),D=Li(y,"parentNode");if(typeof o=="function"){const B=n.createElement("template");B.content&&B.content.ownerDocument&&(n=B.content.ownerDocument)}let A,W="";const{implementation:_,createNodeIterator:j,createDocumentFragment:G,getElementsByTagName:se}=n,{importNode:pe}=i;let Y=Ac();t.isSupported=typeof $c=="function"&&typeof D=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ue,ERB_EXPR:X,TMPLIT_EXPR:Fe,DATA_ATTR:ot,ARIA_ATTR:Ht,IS_SCRIPT_OR_DATA:Ue,ATTR_WHITESPACE:rt,CUSTOM_ELEMENT:ce}=Cc;let{IS_ALLOWED_URI:gt}=Cc,me=null;const w=O({},[..._c,...xo,...Io,...So,...xc]);let F=null;const Ce=O({},[...Ic,...To,...Sc,...Hs]);let oe=Object.seal(wo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),lt=null,Vl=null;const gi=Object.seal(wo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let rm=!0,Wl=!0,lm=!1,cm=!0,hi=!1,io=!0,Ln=!1,Kl=!1,Yl=!1,vi=!1,so=!1,ao=!1,dm=!0,um=!1;const DE="user-content-";let Zl=!0,Cs=!1,yi={},xt=null;const Xl=O({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let pm=null;const mm=O({},["audio","video","img","source","image","track"]);let Ql=null;const fm=O({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),oo="http://www.w3.org/1998/Math/MathML",ro="http://www.w3.org/2000/svg",Ft="http://www.w3.org/1999/xhtml";let bi=Ft,Jl=!1,ec=null;const jE=O({},[oo,ro,Ft],Eo);let lo=O({},["mi","mo","mn","ms","mtext"]),co=O({},["annotation-xml"]);const ME=O({},["title","style","font","a","script"]);let As=null;const RE=["application/xhtml+xml","text/html"],PE="text/html";let he=null,wi=null;const qE=n.createElement("form"),gm=function(h){return h instanceof RegExp||h instanceof Function},tc=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(wi&&wi===h)){if((!h||typeof h!="object")&&(h={}),h=vt(h),As=RE.indexOf(h.PARSER_MEDIA_TYPE)===-1?PE:h.PARSER_MEDIA_TYPE,he=As==="application/xhtml+xml"?Eo:Os,me=ct(h,"ALLOWED_TAGS")?O({},h.ALLOWED_TAGS,he):w,F=ct(h,"ALLOWED_ATTR")?O({},h.ALLOWED_ATTR,he):Ce,ec=ct(h,"ALLOWED_NAMESPACES")?O({},h.ALLOWED_NAMESPACES,Eo):jE,Ql=ct(h,"ADD_URI_SAFE_ATTR")?O(vt(fm),h.ADD_URI_SAFE_ATTR,he):fm,pm=ct(h,"ADD_DATA_URI_TAGS")?O(vt(mm),h.ADD_DATA_URI_TAGS,he):mm,xt=ct(h,"FORBID_CONTENTS")?O({},h.FORBID_CONTENTS,he):Xl,lt=ct(h,"FORBID_TAGS")?O({},h.FORBID_TAGS,he):vt({}),Vl=ct(h,"FORBID_ATTR")?O({},h.FORBID_ATTR,he):vt({}),yi=ct(h,"USE_PROFILES")?h.USE_PROFILES:!1,rm=h.ALLOW_ARIA_ATTR!==!1,Wl=h.ALLOW_DATA_ATTR!==!1,lm=h.ALLOW_UNKNOWN_PROTOCOLS||!1,cm=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,hi=h.SAFE_FOR_TEMPLATES||!1,io=h.SAFE_FOR_XML!==!1,Ln=h.WHOLE_DOCUMENT||!1,vi=h.RETURN_DOM||!1,so=h.RETURN_DOM_FRAGMENT||!1,ao=h.RETURN_TRUSTED_TYPE||!1,Yl=h.FORCE_BODY||!1,dm=h.SANITIZE_DOM!==!1,um=h.SANITIZE_NAMED_PROPS||!1,Zl=h.KEEP_CONTENT!==!1,Cs=h.IN_PLACE||!1,gt=h.ALLOWED_URI_REGEXP||Tc,bi=h.NAMESPACE||Ft,lo=h.MATHML_TEXT_INTEGRATION_POINTS||lo,co=h.HTML_INTEGRATION_POINTS||co,oe=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&gm(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&gm(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),hi&&(Wl=!1),so&&(vi=!0),yi&&(me=O({},xc),F=[],yi.html===!0&&(O(me,_c),O(F,Ic)),yi.svg===!0&&(O(me,xo),O(F,To),O(F,Hs)),yi.svgFilters===!0&&(O(me,Io),O(F,To),O(F,Hs)),yi.mathMl===!0&&(O(me,So),O(F,Sc),O(F,Hs))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?gi.tagCheck=h.ADD_TAGS:(me===w&&(me=vt(me)),O(me,h.ADD_TAGS,he))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?gi.attributeCheck=h.ADD_ATTR:(F===Ce&&(F=vt(F)),O(F,h.ADD_ATTR,he))),h.ADD_URI_SAFE_ATTR&&O(Ql,h.ADD_URI_SAFE_ATTR,he),h.FORBID_CONTENTS&&(xt===Xl&&(xt=vt(xt)),O(xt,h.FORBID_CONTENTS,he)),h.ADD_FORBID_CONTENTS&&(xt===Xl&&(xt=vt(xt)),O(xt,h.ADD_FORBID_CONTENTS,he)),Zl&&(me["#text"]=!0),Ln&&O(me,["html","head","body"]),me.table&&(O(me,["tbody"]),delete lt.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ti('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ti('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=h.TRUSTED_TYPES_POLICY,W=A.createHTML("")}else A===void 0&&(A=Cf(g,s)),A!==null&&typeof W=="string"&&(W=A.createHTML(""));je&&je(h),wi=h}},hm=O({},[...xo,...Io,...bf]),vm=O({},[...So,...wf]),NE=function(h){let x=D(h);(!x||!x.tagName)&&(x={namespaceURI:bi,tagName:"template"});const C=Os(h.tagName),re=Os(x.tagName);return ec[h.namespaceURI]?h.namespaceURI===ro?x.namespaceURI===Ft?C==="svg":x.namespaceURI===oo?C==="svg"&&(re==="annotation-xml"||lo[re]):!!hm[C]:h.namespaceURI===oo?x.namespaceURI===Ft?C==="math":x.namespaceURI===ro?C==="math"&&co[re]:!!vm[C]:h.namespaceURI===Ft?x.namespaceURI===ro&&!co[re]||x.namespaceURI===oo&&!lo[re]?!1:!vm[C]&&(ME[C]||!hm[C]):!!(As==="application/xhtml+xml"&&ec[h.namespaceURI]):!1},It=function(h){Ii(t.removed,{element:h});try{D(h).removeChild(h)}catch{$(h)}},Cn=function(h,x){try{Ii(t.removed,{attribute:x.getAttributeNode(h),from:x})}catch{Ii(t.removed,{attribute:null,from:x})}if(x.removeAttribute(h),h==="is")if(vi||so)try{It(x)}catch{}else try{x.setAttribute(h,"")}catch{}},ym=function(h){let x=null,C=null;if(Yl)h="<remove></remove>"+h;else{const fe=_o(h,/^[\r\n\t ]+/);C=fe&&fe[0]}As==="application/xhtml+xml"&&bi===Ft&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const re=A?A.createHTML(h):h;if(bi===Ft)try{x=new f().parseFromString(re,As)}catch{}if(!x||!x.documentElement){x=_.createDocument(bi,"template",null);try{x.documentElement.innerHTML=Jl?W:re}catch{}}const Ae=x.body||x.documentElement;return h&&C&&Ae.insertBefore(n.createTextNode(C),Ae.childNodes[0]||null),bi===Ft?se.call(x,Ln?"html":"body")[0]:Ln?x.documentElement:Ae},bm=function(h){return j.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},nc=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},wm=function(h){return typeof r=="function"&&h instanceof r};function Ut(B,h,x){Ns(B,C=>{C.call(t,h,x,wi)})}const $m=function(h){let x=null;if(Ut(Y.beforeSanitizeElements,h,null),nc(h))return It(h),!0;const C=he(h.nodeName);if(Ut(Y.uponSanitizeElement,h,{tagName:C,allowedTags:me}),io&&h.hasChildNodes()&&!wm(h.firstElementChild)&&Me(/<[/\w!]/g,h.innerHTML)&&Me(/<[/\w!]/g,h.textContent)||h.nodeType===Ci.progressingInstruction||io&&h.nodeType===Ci.comment&&Me(/<[/\w]/g,h.data))return It(h),!0;if(!(gi.tagCheck instanceof Function&&gi.tagCheck(C))&&(!me[C]||lt[C])){if(!lt[C]&&Em(C)&&(oe.tagNameCheck instanceof RegExp&&Me(oe.tagNameCheck,C)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(C)))return!1;if(Zl&&!xt[C]){const re=D(h)||h.parentNode,Ae=S(h)||h.childNodes;if(Ae&&re){const fe=Ae.length;for(let Ve=fe-1;Ve>=0;--Ve){const Gt=b(Ae[Ve],!0);Gt.__removalCount=(h.__removalCount||0)+1,re.insertBefore(Gt,I(h))}}}return It(h),!0}return h instanceof l&&!NE(h)||(C==="noscript"||C==="noembed"||C==="noframes")&&Me(/<\/no(script|embed|frames)/i,h.innerHTML)?(It(h),!0):(hi&&h.nodeType===Ci.text&&(x=h.textContent,Ns([ue,X,Fe],re=>{x=Si(x,re," ")}),h.textContent!==x&&(Ii(t.removed,{element:h.cloneNode()}),h.textContent=x)),Ut(Y.afterSanitizeElements,h,null),!1)},km=function(h,x,C){if(dm&&(x==="id"||x==="name")&&(C in n||C in qE))return!1;if(!(Wl&&!Vl[x]&&Me(ot,x))){if(!(rm&&Me(Ht,x))){if(!(gi.attributeCheck instanceof Function&&gi.attributeCheck(x,h))){if(!F[x]||Vl[x]){if(!(Em(h)&&(oe.tagNameCheck instanceof RegExp&&Me(oe.tagNameCheck,h)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(h))&&(oe.attributeNameCheck instanceof RegExp&&Me(oe.attributeNameCheck,x)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(x,h))||x==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&Me(oe.tagNameCheck,C)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(C))))return!1}else if(!Ql[x]){if(!Me(gt,Si(C,rt,""))){if(!((x==="src"||x==="xlink:href"||x==="href")&&h!=="script"&&gf(C,"data:")===0&&pm[h])){if(!(lm&&!Me(Ue,Si(C,rt,"")))){if(C)return!1}}}}}}}return!0},Em=function(h){return h!=="annotation-xml"&&_o(h,ce)},_m=function(h){Ut(Y.beforeSanitizeAttributes,h,null);const{attributes:x}=h;if(!x||nc(h))return;const C={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F,forceKeepAttr:void 0};let re=x.length;for(;re--;){const Ae=x[re],{name:fe,namespaceURI:Ve,value:Gt}=Ae,$i=he(fe),ic=Gt;let Ee=fe==="value"?ic:hf(ic);if(C.attrName=$i,C.attrValue=Ee,C.keepAttr=!0,C.forceKeepAttr=void 0,Ut(Y.uponSanitizeAttribute,h,C),Ee=C.attrValue,um&&($i==="id"||$i==="name")&&(Cn(fe,h),Ee=DE+Ee),io&&Me(/((--!?|])>)|<\/(style|title|textarea)/i,Ee)){Cn(fe,h);continue}if($i==="attributename"&&_o(Ee,"href")){Cn(fe,h);continue}if(C.forceKeepAttr)continue;if(!C.keepAttr){Cn(fe,h);continue}if(!cm&&Me(/\/>/i,Ee)){Cn(fe,h);continue}hi&&Ns([ue,X,Fe],Im=>{Ee=Si(Ee,Im," ")});const xm=he(h.nodeName);if(!km(xm,$i,Ee)){Cn(fe,h);continue}if(A&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Ve)switch(g.getAttributeType(xm,$i)){case"TrustedHTML":{Ee=A.createHTML(Ee);break}case"TrustedScriptURL":{Ee=A.createScriptURL(Ee);break}}if(Ee!==ic)try{Ve?h.setAttributeNS(Ve,fe,Ee):h.setAttribute(fe,Ee),nc(h)?It(h):Ec(t.removed)}catch{Cn(fe,h)}}Ut(Y.afterSanitizeAttributes,h,null)},OE=function B(h){let x=null;const C=bm(h);for(Ut(Y.beforeSanitizeShadowDOM,h,null);x=C.nextNode();)Ut(Y.uponSanitizeShadowNode,x,null),$m(x),_m(x),x.content instanceof a&&B(x.content);Ut(Y.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(B){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},x=null,C=null,re=null,Ae=null;if(Jl=!B,Jl&&(B="<!-->"),typeof B!="string"&&!wm(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw Ti("dirty is not a string, aborting")}else throw Ti("toString is not a function");if(!t.isSupported)return B;if(Kl||tc(h),t.removed=[],typeof B=="string"&&(Cs=!1),Cs){if(B.nodeName){const Gt=he(B.nodeName);if(!me[Gt]||lt[Gt])throw Ti("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof r)x=ym("<!---->"),C=x.ownerDocument.importNode(B,!0),C.nodeType===Ci.element&&C.nodeName==="BODY"||C.nodeName==="HTML"?x=C:x.appendChild(C);else{if(!vi&&!hi&&!Ln&&B.indexOf("<")===-1)return A&&ao?A.createHTML(B):B;if(x=ym(B),!x)return vi?null:ao?W:""}x&&Yl&&It(x.firstChild);const fe=bm(Cs?B:x);for(;re=fe.nextNode();)$m(re),_m(re),re.content instanceof a&&OE(re.content);if(Cs)return B;if(vi){if(so)for(Ae=G.call(x.ownerDocument);x.firstChild;)Ae.appendChild(x.firstChild);else Ae=x;return(F.shadowroot||F.shadowrootmode)&&(Ae=pe.call(i,Ae,!0)),Ae}let Ve=Ln?x.outerHTML:x.innerHTML;return Ln&&me["!doctype"]&&x.ownerDocument&&x.ownerDocument.doctype&&x.ownerDocument.doctype.name&&Me(Lc,x.ownerDocument.doctype.name)&&(Ve="<!DOCTYPE "+x.ownerDocument.doctype.name+`>
`+Ve),hi&&Ns([ue,X,Fe],Gt=>{Ve=Si(Ve,Gt," ")}),A&&ao?A.createHTML(Ve):Ve},t.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};tc(B),Kl=!0},t.clearConfig=function(){wi=null,Kl=!1},t.isValidAttribute=function(B,h,x){wi||tc({});const C=he(B),re=he(h);return km(C,re,x)},t.addHook=function(B,h){typeof h=="function"&&Ii(Y[B],h)},t.removeHook=function(B,h){if(h!==void 0){const x=mf(Y[B],h);return x===-1?void 0:ff(Y[B],x,1)[0]}return Ec(Y[B])},t.removeHooks=function(B){Y[B]=[]},t.removeAllHooks=function(){Y=Ac()},t}var Dc=Bc();const Lo="chaotic_";function Ge(e){try{return localStorage.getItem(Lo+e)}catch{return null}}function Xe(e,t){try{localStorage.setItem(Lo+e,t)}catch{}}function yt(e){try{localStorage.removeItem(Lo+e)}catch{}}function jc(){return Ge("token")}function Af(e){e?Xe("token",e):yt("token")}function Bf(){return Ge("theme")}function Df(e){Xe("theme",e)}function Mc(){return Ge("last_project")}function jf(e){Xe("last_project",e)}function Mf(){return Ge("onboarding_complete")==="true"}function Rf(){Xe("onboarding_complete","true")}function Pf(){yt("onboarding_complete")}function qf(e){return e?Ge(`issues_filters_${e}`):null}function Nf(e,t){e&&(t?Xe(`issues_filters_${e}`,t):yt(`issues_filters_${e}`))}function Rc(e){return Ge(`comment_draft_${e}`)}function Fs(e,t){t?Xe(`comment_draft_${e}`,t):yt(`comment_draft_${e}`)}function Pc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Us(e){const t=Ge(`description_draft_${e}`);if(!t)return null;const n=Pc(t);return n?n.draft:t}function qc(e){const t=Ge(`description_draft_${e}`);if(!t)return null;const n=Pc(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function mn(e,t,n=""){t?Xe(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):yt(`description_draft_${e}`)}function Nc(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Oc(e){var n;const t=Ge(`document_draft_${e}`);return t?((n=Nc(t))==null?void 0:n.draft)??null:null}function Of(e){const t=Ge(`document_draft_${e}`);if(!t)return null;const n=Nc(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Gs(e,t,n=null){t&&(t.title||t.content||t.icon)?Xe(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):yt(`document_draft_${e}`)}function Hf(){return{title:Ge("create_issue_title"),description:Ge("create_issue_description")}}function Hc(e,t){e?Xe("create_issue_title",e):yt("create_issue_title"),t?Xe("create_issue_description",t):yt("create_issue_description")}function Ff(){yt("create_issue_title"),yt("create_issue_description")}function Uf(){return Ge("doc_view_mode")}function Gf(e){Xe("doc_view_mode",e)}function zf(){return Ge("approvals_explainer_dismissed")==="1"}function Vf(){Xe("approvals_explainer_dismissed","1")}const Wf="/api";class Kf{constructor(){this.token=jc()}setToken(t){this.token=t,Af(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Wf}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new Kf;let An=null;const Yf='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Bn=null,Ai=!1;function Co(){Ai=!0}function Zf(){Ai=!1}function Fc(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Xf(){if(Ai)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function U(){Bn=document.activeElement,Ai=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function P(){var e;Ct(),Ai=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Bn&&document.contains(Bn)&&typeof Bn.focus=="function"&&Bn.focus(),Bn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Yf);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Qe(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function Ao(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Qf(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=Qf(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Ct(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),An&&(document.removeEventListener("keydown",An),An=null)}function Jf(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Ct(),t&&Qe()&&Fc()}function Bi(e){An&&document.removeEventListener("keydown",An),An=e,e&&document.addEventListener("keydown",e)}function Di(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Ct(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function ve(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Pe(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function We(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function J(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function eg(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function Je(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function bt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function tg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Dn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?tg(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Bo(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function jn(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${m(n)}</span>`}return Bo(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let te={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Do=new Set;function de(e,t){if(typeof e=="string"){const n=te[e];te[e]=t,Uc(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=te[i];te[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Uc(i,s,a)})}}function dt(e){return Do.add(e),()=>Do.delete(e)}function Uc(e,t,n){t!==n&&Do.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const At=()=>te.currentUser,Mn=e=>de("currentUser",e),T=()=>te.currentView,ng=e=>de("currentView",e),le=()=>te.issues,Ke=e=>de("issues",e),ji=()=>te.detailNavContext,zt=e=>de("detailNavContext",e),Gc=()=>te.labels,zs=e=>de("labels",e),zc=()=>te.activeFilterCategory,ig=e=>de("activeFilterCategory",e),Vc=()=>te.selectedIssueIndex,Rn=e=>de("selectedIssueIndex",e),sg=()=>te.selectedDocIndex,Wc=e=>de("selectedDocIndex",e),Kc=()=>te.selectedBoardIndex,Vs=e=>de("selectedBoardIndex",e),ag=()=>te.selectedInboxIndex,Ws=e=>de("selectedInboxIndex",e),og=()=>te.selectedSprintIndex,Yc=e=>de("selectedSprintIndex",e),rg=()=>te.selectedEpicIndex,jo=e=>de("selectedEpicIndex",e),lg=()=>te.pendingGates,cg=e=>de("pendingGates",e),ye=()=>te.inboxEntries,Vt=e=>de("inboxEntries",e),Ks=()=>te.inboxUnreadCount,Mi=e=>de("inboxUnreadCount",e),dg=()=>te.searchDebounceTimer,ug=e=>de("searchDebounceTimer",e),pg=()=>te.websocket,Mo=e=>de("websocket",e),L=()=>te.currentTeam,Ri=e=>de("currentTeam",e),V=()=>te.currentProject,et=e=>de("currentProject",e||null),_e=()=>te.currentDetailIssue,Pn=e=>de("currentDetailIssue",e),mg=()=>te.currentDetailSprints,Zc=e=>de("currentDetailSprints",e),Ro={};function ee(e){Object.assign(Ro,e)}function fg(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Ro[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Xc=!1;function gg(){if(!Xc){Xc=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,fg);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Ro[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Po=["backlog","todo","in_progress","in_review","done","canceled"],Pi=["backlog","todo","in_progress","in_review"],Qc=["urgent","high","medium","low","no_priority"],qo=["no_priority","urgent","high","medium","low"],Jc=["backlog","todo","in_progress","in_review","done"];function q({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${m(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${a}
        </div>
    `}const M={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},ed=24,tt=new Map,be=new Map,Bt=new Map;let Dt=null;function hg(e){return Array.isArray(e)?[...e].map(String).sort():e}function td(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,hg(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function No(e,t){for(be.delete(e),be.set(e,t);be.size>ed;){const n=be.keys().next().value;be.delete(n)}nd()}function nd(){if(tt.size===0)return;const e=new Set;be.forEach(t=>t.ids.forEach(n=>e.add(n))),tt.forEach((t,n)=>{e.has(n)||tt.delete(n)})}function vg(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function id(e){const t=be.get(e);return t?(No(e,t),t.ids.map(n=>tt.get(n)).filter(Boolean)):null}function Oo(e){return tt.get(e)}function yg(e){var t;return((t=be.get(e))==null?void 0:t.meta)||{}}function sd(e){const t=tt.get(e.id);if(!(t!=null&&t.updated_at&&e.updated_at&&e.updated_at<t.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){tt.set(e.id,{...e,description:t.description});return}tt.set(e.id,e)}}function ad(e,t,n){if(!Array.isArray(t))return;const i=vg(t);i.forEach(sd);const s=be.get(e);No(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}})}function bg(e,t){const n=be.get(e);n&&(n.meta=t)}function Ys(e){e!=null&&e.id&&tt.has(e.id)&&sd(e)}function wg(e){be.delete(e),Bt.forEach((t,n)=>{t===e&&Bt.delete(n)}),Dt===e&&(Dt=null),nd()}function $g(e){tt.delete(e),be.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Zs(e){Dt=e}function kg(){return Dt}function Eg(e,t){for(Bt.delete(e),Bt.set(e,t);Bt.size>ed;)Bt.delete(Bt.keys().next().value)}function _g(e){const t=Bt.get(e);return t&&be.has(t)?t:null}function od(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function rd(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(od(e[n])!==od(t[n]))return!1;return!0}const ld=["status","priority"],cd=["assignee_id","sprint_id","issue_type"],xg={assignee_id:"unassigned",sprint_id:"no_sprint"},Ig=["scope","project_id","sort_by","order","limit"],fn=e=>(e||[]).map(t=>String(t).toLowerCase());function Sg(e,t){if(e.search||t.search||t.sort_by==="random"||Ig.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of ld)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of cd)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=fn(e.label);if(!fn(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=fn(t.exclude_label);if(!fn(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function Tg(e){const t=e.label===void 0?null:fn(e.label),n=e.exclude_label===void 0?null:fn(e.exclude_label);return i=>{for(const s of ld)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of cd){if(e[s]===void 0)continue;const a=e[s]===xg[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=fn((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function Lg(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(td(e)));let n=null,i=null;if(be.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Sg(c,t)&&(n=r,i=l)}),!n)return null;No(i,n);const s=Tg(t),a=n.ids.map(r=>tt.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function Cg(){tt.clear(),be.clear(),Bt.clear(),Dt=null}dt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Cg();return}if(e!=="issues"||Dt===null||!be.has(Dt)||T()!=="issues")return;const i=be.get(Dt);ad(Dt,le(),i.meta)});let Ho=[];function Ag(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Bg(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function Xs(e,t){const n=e().map(Ag),i=t().map(Bg);Ho=[...n,...i]}function Wt(e){return e&&Ho.find(t=>t.id===e)||null}function Kt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Fo(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function Qs({includeIdle:e=!1,keepId:t=null}={}){const n=Ho.filter(y=>e||!y.idle||y.id===t),i=n.filter(y=>!y.is_agent),s=new Set(i.map(y=>y.id)),a=n.filter(y=>y.is_agent),o=new Set(a.map(y=>y.id)),r=(y,b)=>y.name.localeCompare(b.name),l=y=>y.registered_by_id&&o.has(y.registered_by_id),c=new Map,d=new Map;a.forEach(y=>{const[b,$]=l(y)?[c,y.registered_by_id]:[d,y.parent_user_id];b.has($)||b.set($,[]),b.get($).push(y)});const u=[],f=(y,b)=>{u.push({assignee:y,indent:b}),(c.get(y.id)||[]).sort(r).forEach(I=>u.push({assignee:I,indent:2}))};return i.forEach(y=>{u.push({assignee:y,indent:!1}),(d.get(y.id)||[]).sort(r).forEach(b=>f(b,!0))}),a.filter(y=>!l(y)&&!s.has(y.parent_user_id)).sort(r).forEach(y=>f(y,!1)),u}function qi({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Qs({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${s.id}">${Fo(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Dg(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Wt(e)&&qi({keepId:e}),t.value=e}function Yt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function gn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function qn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Nn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Uo(){const e=document.getElementById("group-by-select");return e?e.value:""}const dd=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Go=["done","canceled"],jg=Pi,Mg="all";function ud(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function On(e=Yt()){return e.length===0?"all":ud(e,Pi)?"open":ud(e,Go)?"closed":null}function pd(e){var t,n,i;switch(e){case"project":return V()?1:0;case"status":{const s=On();return s==="all"?0:s?1:Yt().length}case"priority":return gn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return qn().length;case"exclude_labels":return Nn().length;default:return 0}}function zo(){let e=0;return dd.forEach(t=>{e+=pd(t.key)}),e}function md(){var y,b,$,I,S,D;const e=new URLSearchParams,t=Yt(),n=gn(),i=qn(),s=Nn(),a=(y=document.getElementById("assignee-filter"))==null?void 0:y.value,o=V()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,c=(I=document.getElementById("group-by-select"))==null?void 0:I.value,d=(S=document.getElementById("sort-by-select"))==null?void 0:S.value,u=On(t);u==="all"?e.append("status",Mg):u!=="open"&&t.forEach(A=>e.append("status",A)),n.forEach(A=>e.append("priority",A)),i.forEach(A=>e.append("label",A)),s.forEach(A=>e.append("exclude_label",A)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),Nf((D=L())==null?void 0:D.id,f)}function Rg(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some($=>t.has($))){const $=qf((b=L())==null?void 0:b.id);if($){t=new URLSearchParams($);const I=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",I)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const $=s.length>0?s:jg;a.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=$.includes(S.value)}),a.dataset.statusApplied="true",fd()}const o=t.getAll("priority");if(o.length>0){const $=document.getElementById("priority-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=o.includes(S.value)}),gd())}const r=t.get("assignee");r&&Dg(r);const l=t.get("project");l&&(e(!0),et(l),e(!1));const c=t.get("sprint");if(c){const $=document.getElementById("sprint-filter");$&&($.value=c)}const d=t.get("issue_type");if(d){const $=document.getElementById("issue-type-filter");$&&($.value=d)}const u=t.getAll("label");if(u.length>0){const $=document.getElementById("label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=u.includes(S.value)}),Js())}const f=t.getAll("exclude_label");if(f.length>0){const $=document.getElementById("exclude-label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=f.includes(S.value)}),ea())}const g=t.get("groupBy");if(g){const $=document.getElementById("group-by-select");$&&($.value=g)}const y=t.get("sort");if(y){const $=document.getElementById("sort-by-select");$&&($.value=y)}}function fd(){const e=Yt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=On(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=ve(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function gd(){const e=gn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Pe(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Js(){var i,s;const e=qn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function ea(){var i,s;const e=Nn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function hd(){if(!L())return;let e;try{e=await v.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}vd("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),vd("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function vd(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${J(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function ta(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",yd)},0))}function yd(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",yd))}function Pg(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Hn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),xe(),qe(zc()),setTimeout(()=>{document.addEventListener("click",Hn)},0))}function qg(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",Hn)):(e.classList.remove("hidden"),Kg(),setTimeout(()=>{document.addEventListener("click",Hn)},0))}function Hn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Hn))}function hn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Hn)}function xe(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=V();e.innerHTML=dd.map(n=>{const i=pd(n.key),s=zc()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function qe(e){ig(e),xe();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Og(t);break;case"status":Hg(t);break;case"priority":Fg(t);break;case"type":Ug(t);break;case"assignee":Gg(t);break;case"sprint":zg(t);break;case"labels":Vg(t);break;case"exclude_labels":Wg(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Ng(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),xe()}function Og(e){const t=V()||"",n=Z()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${J(s.color)};"></span>
                <span class="filter-option-label">${m(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function Hg(e){const t=Yt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=On(t);let s=`
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
        `}),e.innerHTML=s}function Fg(e){const t=gn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Ug(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Gg(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=_n()||[];let s=`
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
        `}),e.innerHTML=s}function zg(e){if(!V()){e.innerHTML=`
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
        `}),e.innerHTML=a}function Vg(e){const t=qn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${J(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function Wg(e){const t=Nn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${J(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function Kg(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ne(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=V();if(n){const f=(Z()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=Yt();if(i.length>0){const u=On(i),f=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>ve(g)).join(", ");t.push({category:"status",label:"Status",value:f,clearAction:"clear-status-filter-new"})}const s=gn();if(s.length>0){const u=s.map(f=>Pe(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const g=(_n()||[]).find(y=>y.user_id===o.value);u=(g==null?void 0:g.name)||(g==null?void 0:g.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=qn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),f=l.map(g=>{var $;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),b=($=y==null?void 0:y.closest("label"))==null?void 0:$.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=Nn();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(g=>{var $;const y=u==null?void 0:u.querySelector(`input[value="${g}"]`),b=($=y==null?void 0:y.closest("label"))==null?void 0:$.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${m(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Oe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=zo();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function bd(){const e=document.getElementById("sprint-filter");if(!e)return;const t=V(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Vo(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${m(a.name)})</option>`),Eu(t,a==null?void 0:a.id),Vo(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Vo(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Yg(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let wd=!1;dt(e=>{if(e!=="currentProject"||T()!=="issues"||wd)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([bd(),hd()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Js(),ea(),Ye(),Ne(),Oe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),Ye(),Ne(),Oe()})});function Zg(){Rg(e=>{wd=e})}function na(){fd(),Ye(),Ne(),Oe()}function ia(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),na()}function Wo(){gd(),Ye(),Ne(),Oe()}function Ko(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Wo()}function Yo(){Js(),Ye(),Ne(),Oe()}function sa(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Yo()}function Zo(){ea(),Ye(),Ne(),Oe()}function aa(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Zo()}function Xg(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function $d(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Xg(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Ni=0;function Oi(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function kd(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=L())==null?void 0:t.id)||"",project:V()||"",status:[...Yt()].sort(),priority:[...gn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let Zt=null;function Qg(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function Fn(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function Ed(e,t){Fn(!1),Zs(e),Ke(t),T()==="issues"&&zt(t),it(),Zt=e,Oi(yg(e).hiddenClosed||0)}function Jg(e,t,{loading:n}){Zs(null),Ke(t),T()==="issues"&&zt(t),it(),Fn(n),Zt=e,Oi(0)}function _d(){Zs(null),Zt=null,Fn(!1),Yg(),Oi(0)}function eh(){const e=document.getElementById("issues-list");Oi(0),e!=null&&e.querySelector(".issue-row")?Fn(!0):_d()}function th(){const e=_g(kd()),t=e?id(e):null;return t?(Rn(-1),Ed(e,t),!0):(_d(),!1)}async function jt(){var $,I,S,D,A,W,_;Rn(-1),Qg();const e=++Ni;if(!L())return;const t=V()||"",n=Yt(),i=gn(),s=($=document.getElementById("assignee-filter"))==null?void 0:$.value,a=(S=(I=document.getElementById("issue-search"))==null?void 0:I.value)==null?void 0:S.trim();if(!t&&Z().length===0){Zt=null,document.getElementById("issues-list").innerHTML=q({icon:M.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=kd(),r={limit:1e3},l=((D=document.getElementById("sort-by-select"))==null?void 0:D.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(A=At())==null?void 0:A.id:r.assignee_id=s);const u=(W=document.getElementById("sprint-filter"))==null?void 0:W.value;if(u)if(u==="current"){if(t){const j=zy(t);if(j!==void 0)j&&(r.sprint_id=j);else try{const se=(await v.getSprints(t)).find(pe=>pe.status==="active");Eu(t,se==null?void 0:se.id),se&&(r.sprint_id=se.id)}catch(G){console.error("Failed to resolve current sprint:",G)}}}else r.sprint_id=u;const f=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,y=!1,b=null;try{const j=$d(qn(),"label-filter-dropdown");j.length>0&&(r.label=j,r.label_match="any");const G=$d(Nn(),"exclude-label-filter-dropdown");G.length>0&&(r.exclude_label=G),t&&(r.project_id=t);const se=t||`team:${L().id}`;b=td({...r,scope:se});const pe=id(b);if(pe)g=!0,Zt===b&&kg()===b&&rd(le(),pe)||Ed(b,pe);else{const ce=Lg({...r,scope:se});ce&&(ce.complete||ce.rows.length>0)?(y=!0,Jg(b,ce.rows,{loading:!ce.complete})):eh()}const Y=ce=>t?v.getIssues(ce):Z().length>0?v.getTeamIssues(L().id,ce):Promise.resolve(void 0),ue=r.search&&On(n)==="open"?Y({...r,status:Go}).then(ce=>Array.isArray(ce)?ce.length:0).catch(ce=>(console.error("Failed to count closed search matches:",ce),0)):Promise.resolve(0),X=await Y(r);if(ad(b,X),e!==Ni)return;Eg(o,b);const Fe=(g||y)&&Zt===b&&rd(le(),X);Zs(b),Ke(X),T()==="issues"&&zt(X);const ot=[...new Set(X.map(ce=>ce.project_id))],Ht=Object.keys(ka()).length;if(await ku(ot),e!==Ni)return;const Ue=Object.keys(ka()).length!==Ht;(!Fe||Ue)&&it(),Zt=b,Fn(!1);const rt=await ue;if(bg(b,{hiddenClosed:rt}),e!==Ni)return;Oi(rt)}catch(j){if(e!==Ni)return;Fn(!1);const G=(j==null?void 0:j.status)===403||(j==null?void 0:j.status)===404;if(g&&!G){E("refresh issues",j);return}G&&b&&wg(b),Zt=null;const se=document.getElementById("issues-list");se&&(se.innerHTML=q({icon:M.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",j)}}function nh(){clearTimeout(dg()),ug(setTimeout(()=>{jt()},300))}function Ye(){md(),jt()}async function xd(){if(md(),Uo()==="sprint"){const e=le(),t=[...new Set(e.map(n=>n.project_id))];await ku(t)}it()}function ih(){Ne(),Oe()}function Id(e){et(e),xe(),qe("project"),hn()}function sh(){Id("")}function ah(e){const t=e==="open"?Pi:e==="closed"?Go:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),na(),xe(),qe("status")}function oh(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,na()),xe(),qe("status")}function rh(){ia(),xe(),qe("status"),Ne(),Oe()}function lh(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Wo()),xe(),qe("priority")}function ch(){Ko(),xe(),qe("priority"),Ne(),Oe()}function Sd(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Ye()),xe(),qe("type"),Ne(),Oe(),hn()}function dh(){Sd("")}function Td(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Ye()),xe(),qe("assignee"),Ne(),Oe(),hn()}function uh(){Td("")}function Ld(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Ye()),xe(),qe("sprint"),Ne(),Oe(),hn()}function ph(){Ld("")}function mh(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Yo()),xe(),qe("labels")}function fh(){sa(),xe(),qe("labels"),Ne(),Oe()}function gh(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Zo()),xe(),qe("exclude_labels")}function hh(){aa(),xe(),qe("exclude_labels"),Ne(),Oe()}function vh(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,jt()),hn()}function yh(e){const t=document.getElementById("group-by-select");t&&(t.value=e,xd()),hn()}function bh(){et(null),ia(),Ko();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),sa(),aa(),Ye(),Ne(),Oe()}ee({"update-label-filter":()=>Yo(),"clear-label-filter":()=>sa(),"update-exclude-label-filter":()=>Zo(),"clear-exclude-label-filter":()=>aa(),"show-filter-category":(e,t)=>{var n,i;qe(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Ng();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>Id(t.value),"clear-project-filter":()=>sh(),"clear-status-filter-new":()=>rh(),"set-status-preset":(e,t)=>ah(t.value),"show-all-statuses":()=>ia(),"toggle-status-option":(e,t)=>oh(t.filterValue,e),"clear-priority-filter-new":()=>ch(),"toggle-priority-option":(e,t)=>lh(t.filterValue,e),"set-type-filter":(e,t)=>Sd(t.value),"clear-type-filter":()=>dh(),"set-assignee-filter":(e,t)=>Td(t.value),"clear-assignee-filter":()=>uh(),"set-sprint-filter":(e,t)=>Ld(t.value),"clear-sprint-filter":()=>ph(),"clear-label-filter-new":()=>fh(),"toggle-label-option":(e,t)=>mh(t.filterValue,e),"clear-exclude-label-filter-new":()=>hh(),"toggle-exclude-label-option":(e,t)=>gh(t.filterValue,e),"set-sort":(e,t)=>vh(t.value),"set-group-by":(e,t)=>yh(t.value),"clear-all-filters":()=>bh(),"retry-load-issues":()=>jt()});let Un=[],Xo=[];dt(e=>{e==="currentProject"&&T()==="my-issues"&&(Gn(),Fi(),zn())});function nt(){return Un}function vn(e){Un=e}let Qo=0;async function Gn(){var a;const e=L(),t=At();if(!e||!t)return;const n=++Qo,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=V();$h();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==Qo)return;Un=r,T()==="my-issues"&&zt(Un),Hi()}catch(o){if(n!==Qo)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=q({icon:M.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",o)}}async function zn({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=V();Xo=await v.getTeamActivities(t.id,0,10,{projectId:i}),wh()}catch{n&&(n.innerHTML=q({icon:M.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function wh(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Xo.length){e.innerHTML=q({icon:M.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Xo.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${ur(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${mr(t)}${n}</span>
                <span class="activity-actor">by ${m(pr(t))}</span>
                <span class="activity-time">${Je(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function $h(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Cd(){Gn()}function Hi(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Un.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=Un.map(t=>Ki(t)).join("")}}let Jo=0;async function Fi(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Jo,n=V(),i=Z(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await v.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await v.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Jo)return;kh(o)}catch(a){if(t!==Jo)return;console.error("Failed to load sprint status:",a),e.innerHTML=q({icon:M.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function kh(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},f=Object.values(u).reduce((g,y)=>g+y,0);return`
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
                                    ${n.filter(g=>u[g]).map(g=>{const y=Math.round(u[g]/f*100);return`<div class="sprint-stacked-segment status-${g}" style="width: ${y}%" title="${ve(g)}: ${u[g]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(g=>u[g]).map(g=>`<span class="sprint-count-label status-${g}">${u[g]} ${ve(g)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}ee({"filter-my-issues":()=>Cd(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Wu(t.identifier)},"retry-load-my-issues":()=>Gn(),"retry-load-sprint-status":()=>Fi()});const Ad=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Ui(e=null){const t=e||V()||"";qd([]);const n=Z().map(o=>`
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
                        ${Ie("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${ut("no_priority")}
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
                                ${Ad.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,U(),ra();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Hf();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Hc(i.value,s.value)}),s.addEventListener("input",()=>{Hc(i.value,s.value)}),i.focus()}function Eh(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function _h(e){const t=Ad.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Bd(e,t){const n=Z().find(i=>i.id===t);qd([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${Ie("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${ut("no_priority")}
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
    `,U(),ra(),document.getElementById("create-issue-title").focus()}async function xh(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Pd(),parent_id:e});P(),k(`Created sub-issue ${d.identifier}`,"success"),ne(e)}catch(d){E("create sub-issue",d)}}async function Ih(e,t,n){var o,r;Ct();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Jc.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(ve(c))}">
                    ${Ie(c)}
                    <span>${ve(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${qo.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Pe(c))}">
                    ${ut(c)}
                    <span>${Pe(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(bt(c))}">
                    <span class="issue-type-badge type-${c}">${bt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=Gc(),c=!1;if(l.length===0)try{l=await v.getLabels(L().id),zs(l)}catch(d){console.error("Failed to load labels:",d),c=!0}tr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Di(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=Qs({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=Kt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(f)}">
                    ${Dn(d,"avatar-small")}
                    <span>${Fo(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=ei(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(f)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${m(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await v.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Di(a)}function Sh(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Th(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Co();const i=m(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Ie(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${ut(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${bt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Ct(),s==null||s.focus()}async function Dd({keepOpen:e=!1}={}){var b,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((b=document.getElementById("create-issue-sprint"))==null?void 0:b.value)||null,u=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),y=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),y&&(y.disabled=!0);try{const I=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Pd(),due_date:f});k(`Created ${I.identifier}`,"success"),Ff(),T()==="issues"?jt():T()==="my-issues"&&Gn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Zf(),document.getElementById("create-issue-title").focus()):(P(),ne(I.id))}catch(I){E("create issue",I)}finally{g&&(g.disabled=!1),y&&(y.disabled=!1)}}async function Lh(){await Dd({keepOpen:!1})}async function Ch(){await Dd({keepOpen:!0})}ee({"toggle-create-dropdown":(e,t,n)=>{Ih(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Th(t.field,t.value,t.label)},"create-issue-submit":()=>{Lh()},"create-issue-and-new":()=>{Ch()},"update-create-project":()=>{Sh()},"apply-template":e=>{_h(e.target.value)},"toggle-create-options":()=>{Eh()},"create-sub-issue-submit":(e,t)=>{xh(t.parentId,t.projectId)}});function Gi(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Ah(n,e.project_id),t=!0),t}function Ah(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${m(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${p(e.id)}" data-project-id="${p(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${p(e.id)}" data-identifier="${p(e.identifier)}">Close ${m(e.identifier)}</button>
            </div>
        </div>
    `,U())}async function Bh(e,t){try{const n=await v.updateIssue(e,{status:"done"});P(),k(`${t} closed`,"success"),Gi(n)}catch(n){E(`close ${t}`,n)}}ee({"parent-prompt-dismiss":()=>P(),"parent-prompt-close":(e,t)=>Bh(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{P(),Bd(t.parentId,t.projectId)}});const jd=Po,Dh=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let wt=[],Md=Promise.resolve();const jh={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function oa(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Mh={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Rd(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function zi(){return!!document.querySelector(".inline-dropdown")}function Pd(){return wt}function qd(e){wt=e}async function er(e,t,n,i){var u,f,g,y;e.preventDefault(),Ct();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${jd.map((b,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${b}">
                    ${Ie(b)}
                    <span>${ve(b)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${qo.map((b,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${b}">
                    ${ut(b)}
                    <span>${Pe(b)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Dh.map(b=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${b}">
                    <span class="issue-type-badge type-${b}">${bt(b)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const b=_e(),$=le().find(S=>S.id===n)||nt().find(S=>S.id===n)||((b==null?void 0:b.id)===n?b:null),I=Qs({keepId:($==null?void 0:$.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${I.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:I.map(({assignee:S,indent:D},A)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(S.id)}">
                    ${Dn(S,"avatar-small")}
                    <span>${Fo(S,D)}</span>
                    ${A<9?`<span class="dropdown-shortcut">${A+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const b=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(b==null?void 0:b.dataset.projectId)||((u=_e())==null?void 0:u.project_id),I=ei($);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${I.map((S,D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${S.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${S.label}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const b=le(),$=nt(),I=_e(),S=b.find(ue=>ue.id===n)||$.find(ue=>ue.id===n)||I,D=new Set(((S==null?void 0:S.labels)||[]).map(ue=>ue.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const A=o.getBoundingClientRect();let W=a.bottom+4,_=a.left;_+A.width>window.innerWidth-8&&(_=a.right-A.width),W+A.height>window.innerHeight-8&&(W=a.top-A.height-4),o.style.top=`${W}px`,o.style.left=`${Math.max(8,_)}px`,Di(o,{multiSelect:!0});let j=[];const G=L();if(G)try{j=await v.getLabels(G.id)}catch(ue){console.error("Failed to load labels:",ue)}if(!o.parentNode)return;Od(o,n,j,D);const se=o.getBoundingClientRect();let pe=a.bottom+4,Y=a.left;Y+se.width>window.innerWidth-8&&(Y=a.right-se.width),pe+se.height>window.innerHeight-8&&(pe=a.top-se.height-4),o.style.top=`${pe}px`,o.style.left=`${Math.max(8,Y)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const b=le(),$=nt(),I=_e(),S=b.find(X=>X.id===n)||$.find(X=>X.id===n)||I,D=(S==null?void 0:S.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const A=o.getBoundingClientRect();let W=a.bottom+4,_=a.left;_+A.width>window.innerWidth-8&&(_=a.right-A.width),W+A.height>window.innerHeight-8&&(W=a.top-A.height-4),o.style.top=`${W}px`,o.style.left=`${Math.max(8,_)}px`,Di(o);let j=[];if(D)try{j=await v.getSprints(D),Gy(D,j)}catch(X){console.error("Failed to load sprints:",X)}if(!o.parentNode)return;const G=j.filter(X=>X.status!=="completed"||X.id===(S==null?void 0:S.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${G.map((X,Fe)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(X.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(X.name)}${X.status==="active"?" (Active)":""}</span>
                    ${Fe<9?`<span class="dropdown-shortcut">${Fe+1}</span>`:""}
                </button>
            `).join("")}
        `;const se=o.getBoundingClientRect();let pe=a.bottom+4,Y=a.left;Y+se.width>window.innerWidth-8&&(Y=a.right-se.width),pe+se.height>window.innerHeight-8&&(pe=a.top-se.height-4),o.style.top=`${pe}px`,o.style.left=`${Math.max(8,Y)}px`,o.classList.remove("dropdown-positioning");const ue=X=>{const Fe=X.key;if(Fe==="Escape"||Fe==="Tab"){Ct(),document.removeEventListener("keydown",ue),Bi(null);return}if(Rd(X,o))return;const ot=parseInt(Fe);if(isNaN(ot))return;const Ht=o.querySelectorAll(".dropdown-option");let Ue=!1;ot===0?(Vn(n,"sprint_id",null),Ue=!0):ot>=1&&ot<Ht.length&&(Ht[ot].click(),Ue=!0),Ue&&(document.removeEventListener("keydown",ue),Bi(null))};Bi(ue),document.addEventListener("keydown",ue),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=b=>{const $=b.key;if($==="Escape"||$==="Tab"){Ct(),document.removeEventListener("keydown",d);return}if(Rd(b,o))return;const I=parseInt($);if(isNaN(I))return;let S=!1;if(t==="status"&&I>=1&&I<=6)Vn(n,"status",jd[I-1]),S=!0;else if(t==="priority"&&I>=0&&I<=4)Vn(n,"priority",qo[I]),S=!0;else if(t==="estimate"){const D=_e(),A=ei(D==null?void 0:D.project_id);I>=0&&I<A.length&&(Vn(n,"estimate",A[I].value),S=!0)}S&&(document.removeEventListener("keydown",d),Bi(null))};Bi(d),document.addEventListener("keydown",d),(y=o.querySelector(".dropdown-option[data-action]"))==null||y.focus(),Di(o)}function Rh(e,t,n,i){er(e,t,n,i)}function Ph(e,t,n){Md=Md.then(()=>Nd(e,t,n))}async function Nd(e,t,n){const i=le(),s=nt(),a=_e(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const u=(await v.updateIssue(e,{label_ids:c})).labels||[],f=i.findIndex($=>$.id===e);f!==-1&&(i[f].labels=u,Ke([...i]));const g=s.findIndex($=>$.id===e);g!==-1&&(s[g].labels=u,vn([...s])),(a==null?void 0:a.id)===e&&Pn({...a,labels:u});const y=oa(e);if(y&&y.parentNode){const $=i.find(I=>I.id===e)||s.find(I=>I.id===e);$&&(y.outerHTML=Ki($))}const b=document.querySelector(".property-labels-btn");b&&(b.innerHTML=u.length>0?u.map($=>`
                    <span class="issue-label" style="background: ${J($.color)}20; color: ${J($.color)}">${m($.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function Od(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${J(s.color)}20; color: ${J(s.color)}">${m(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Hd(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=L();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);zs(o),a!=null&&a.id&&await Nd(e,a.id,null);const r=le(),l=nt(),c=_e(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&Od(t,e,o,u),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function ra(){const e=document.getElementById("create-issue-labels-label");e&&(wt.length===0?e.textContent="Labels":e.textContent=`Labels (${wt.length})`)}function tr(e,{failed:t=!1}={}){const n=Gc();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=wt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${J(i.color)}20; color: ${J(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function qh(e){const t=wt.indexOf(e);t>=0?wt.splice(t,1):wt.push(e),Co(),ra();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&tr(n)}async function Fd(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);zs(a),s!=null&&s.id&&!wt.includes(s.id)&&(wt.push(s.id),Co()),ra(),t&&tr(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function Vn(e,t,n){var r;Ct();const i=Hh(e,t,n),s=Gh(e,t),a=(r=Oo(e))==null?void 0:r[t],o=Gd(e,t,()=>n);o&&nr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await v.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(Gi(c),Ud(e,t,i)){const d={...c,...Uh(e,t)};zh(e,{issue:d,myIssue:d,detail:d}),Ys(d),nr(e,t,{focus:!o})}}catch(l){if(E("update issue",l),Ud(e,t,i)){Gd(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=Oo(e);c&&c[t]===n&&Ys({...c,[t]:a}),nr(e,t,{focus:!1})}return}finally{Fh(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=V();if(l){const d=(await v.getSprints(l)).find(u=>u.status==="active");Vo(d||null)}}catch{}}const Nh=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),yn=new Map;let Oh=0;function Hh(e,t,n){const i=++Oh;return yn.has(e)||yn.set(e,new Map),yn.get(e).set(t,{seq:i,value:n}),i}function Ud(e,t,n){var i,s;return((s=(i=yn.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Fh(e,t,n){var s;const i=yn.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&yn.delete(e))}function Uh(e,t){var i;const n={};return(i=yn.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Gh(e,t){var i,s;const n=_e();return{issue:(i=le().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=nt().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function Gd(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=le();a.some(l=>l.id===e)&&(s=!0,Ke(a.map(l=>l.id===e?i(l,"issue"):l)));const o=nt();o.some(l=>l.id===e)&&(s=!0,vn(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=_e();return(r==null?void 0:r.id)===e&&(s=!0,Pn(i(r,"detail"))),s}function zh(e,t){var s;const n=le();t.issue&&n.some(a=>a.id===e)&&Ke(n.map(a=>a.id===e?t.issue:a));const i=nt();t.myIssue&&i.some(a=>a.id===e)&&vn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=_e())==null?void 0:s.id)===e&&Pn(t.detail)}function Vh(e){return e==="estimate"||jh[Uo()]===e}function Wh(e,t,n,{focus:i}){var d;const s=oa(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Vh(t)&&le().some(u=>u.id===e))it();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=Ki(n),u&&((d=oa(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=oa(e),l=Mh[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function nr(e,t,{focus:n}){const i=le().find(a=>a.id===e)||nt().find(a=>a.id===e);i&&Ys(i),Wh(e,t,i,{focus:n});const s=_e();(s==null?void 0:s.id)===e&&Nh.has(t)&&Kh(t,s)}function Kh(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Ie(t.status)}
            <span>${ve(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${ut(t.priority)}
            <span>${Pe(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${bt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?Wt(t.assignee_id):null,c=l?Kt(l):null;r.innerHTML=c?`${Dn(l,"avatar-small")}<span>${m(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=mg(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?m(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${La(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}ee({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?Vn(t.issueId,i,n==="null"?null:Number(n)):Vn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{Ph(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Hd(t.issueId)},"toggle-create-issue-label":(e,t)=>{qh(t.labelId)},"create-label-for-create-issue":()=>{Fd()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Hd(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Fd())}});const zd=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function Xt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Wn(e){const t=Xt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Yh=60,Zh=150;let $t=[],Vi=1/0,Qt=null,la=null,Wi=null;const Xh=24;function Qh(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Yh,Math.ceil((e+2*t)/Xh))}function Jt(e,t){const n=t.slice(0,Math.max(0,Vi));return Vi-=n.length,n.length<t.length&&$t.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>Ki(i)).join("")}function Jh(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function Vd(){clearTimeout(Qt),Qt=null,sr++,$t=[],la=null,Wi=null}function ir(e=1/0){if($t.length===0)return;const t=document.getElementById("issues-list");if(!t||!(Wi!=null&&Wi.isConnected)){Vd();return}const n=new Map(le().map(s=>[s.id,s]));let i=e;for(;$t.length>0&&i>0;){const s=$t[0],a=s.ids.slice(0,i),o=Jh(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>Ki(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?$t.shift():s.ids=s.ids.slice(a.length)}if($t.length===0){clearTimeout(Qt),Qt=null;const s=la;la=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&Wd(s)}}const ev=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{Qt=setTimeout(e,0)}):Qt=setTimeout(e,16);let sr=0;function tv(){if(clearTimeout(Qt),$t.length===0)return;const e=++sr;ev(function t(){e===sr&&(ir(Zh),$t.length>0&&(Qt=setTimeout(t,0)))})}function it(){var a,o,r;const e=document.getElementById("issues-list");if(!e)return;const t=(a=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:a.dataset.issueId;e.classList.add("issue-list-linear"),Vd(),Vi=Qh();const n=le();if(n.length===0){const l=(r=(o=document.getElementById("issue-search"))==null?void 0:o.value)==null?void 0:r.trim(),c=zo()>0,d=l&&l.length>=2;if(c||d){const u=zo(),f=[];d&&f.push(`search "${l}"`),c&&f.push(`${u} active filter${u>1?"s":""}`),e.innerHTML=q({icon:M.issues,heading:"No matching issues",description:`No issues match your ${f.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=q({icon:M.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Rn(-1),Vi=1/0;return}const i=Uo();i==="status"?nv(e,n):i==="priority"?iv(e,n):i==="type"?sv(e,n):i==="assignee"?av(e,n):i==="sprint"?ov(e,n):e.innerHTML=Wn(n)+Jt(null,n),Vi=1/0,Wi=e.firstElementChild;const s=!!t&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),l=>l.dataset.issueId===t);t&&$t.length>0&&!s?la=t:Wd(t),tv()}function Wd(e){const t=Vc();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Rn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Rn(i),n[i].classList.add("keyboard-selected")}function nv(e,t){const n={};Po.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=Wn(t);Po.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ie(s)}</span>
                    <span class="group-title">${ve(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Xt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function iv(e,t){const n={};Qc.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=Wn(t);Qc.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ut(s)}</span>
                    <span class="group-title">${Pe(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Xt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function sv(e,t){const n={};zd.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=Wn(t);zd.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${bt(s)}</span></span>
                    <span class="group-title">${bt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Xt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function av(e,t){const n={},i="__unassigned__";n[i]=[];const s=Qs({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=Wn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${Xt(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=Kt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Dn(o,"avatar-small")}</span>
                    <span class="group-title">${m(l)}${m(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${Xt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function ov(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=ka();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return f-g});let r=Wn(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${Xt(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(g,c)}
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
                    <span class="group-points">${Xt(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${Jt(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function rv(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Kd(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(i)}<mark class="search-match">${m(s)}</mark>${m(a)}`}function lv(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Kd(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const cv=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function Ki(e){var f,g,y;const t=e.assignee_id?Wt(e.assignee_id):null,n=t?Kt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":cv.format(i),a=e.estimate!=null?La(e.estimate,e.project_id):"",o=Hr(e.estimate,e.project_id),r=e.sprint_id?ka()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((y=e.title)==null?void 0:y.toLowerCase().includes(c.toLowerCase())),u=c&&!d?lv(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Pe(e.priority)}">
                    ${ut(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${ve(e.status)}">
                    ${Ie(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${bt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${Kd(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${J(b.color)}20; color: ${J(b.color)}">${m(b.name)}</span>
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
                    ${n?Dn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function ut(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ie(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ee({"toggle-group":(e,t)=>{rv(t.group)},"show-inline-dropdown":(e,t,n)=>{er(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),ne(t.issueId))}});let Yi=[];function Zi(){return Yi}function dv(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function uv(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?dv(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function pv(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Yi=await v.getTeamAgents(e),Xs(_n,Zi),qi()}catch(n){console.error("Failed to load team agents:",n),E("load team agents",n)}}async function ca(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Yi=await v.getTeamAgents(e),Xs(_n,Zi),qi(),mv()}catch(n){E("load agents",n)}}function mv(){const e=document.getElementById("agents-list");if(e){if(Yi.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Yi.map(t=>{var l;const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=At())==null?void 0:l.id)||Ra())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${uv(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${We(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function fv(){const e=Z();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}function Yd(e,t,n=!1){const i=m(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,U()}async function gv(e){var r,l,c,d;e.preventDefault();const t=(r=L())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await v.createProjectAgent(a,n,i,o):u=await v.createTeamAgent(t,n,i,o),P(),Yd("Agent Created",u.api_key,!!u.can_register)}catch(u){E("create agent",u)}return!1}async function hv(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await v.createAgentKey(e);Yd("New Agent Key",n.key)}catch(n){E("generate agent key",n)}}async function vv(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await v.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),ca()}catch(s){E("change registrar",s)}}function yv(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function bv(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),k("Agent deleted","success"),ca()}catch(n){E("delete agent",n)}}ee({"create-agent":e=>{gv(e)},"copy-agent-key":()=>{yv()},"dismiss-agent-modal":()=>{P(),ca()},"delete-agent":(e,t)=>{bv(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{hv(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{vv(t.agentId,t.agentName,t.canRegister!=="true")}});function wv(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function $v(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:wv(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function kv(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function ar(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((y,b)=>y.classList.toggle("highlighted",b===a)),(g=(f=u[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,f=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=f+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(kv(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),y=$v(_n(),Zi(),i.mentionContext||{}).filter(b=>!g||b.handle.includes(g)||b.name.toLowerCase().includes(g)||b.email.toLowerCase().includes(g)).slice(0,6);if(!y.length){o();return}s.innerHTML=y.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${m(b.name)}${b.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${m(b.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((b,$)=>{b.addEventListener("click",()=>l(b.dataset.handle)),b.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}async function Zd(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=ei(t.project_id).map(o=>`
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
                    <select id="edit-issue-status" data-original="${p(t.status)}">
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
        `,U();const a=document.getElementById("edit-issue-description");if(a){const o=Us(e);if(o){const r=qc(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?mn(e,r,t.description||""):mn(e,null)})}}catch(t){E("load issue",t)}}async function Ev(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await v.updateIssue(t,c);Us(t)===c.description&&mn(t,null),P(),await ne(t),k("Issue updated!","success"),Gi(d)}catch(n){E("update issue",n)}}async function _v(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await jt(),await st(),N("issues"),k("Issue deleted!","success")}catch(t){E("delete issue",t)}}ee({"update-issue":(e,t)=>{Ev(e,t.issueId)}});let we=null,Xd=!1,bn=!1,Qd="new-comment";function xv(){return we||(we=document.createElement("div"),we.className="quote-tooltip",we.setAttribute("role","button"),we.setAttribute("tabindex","0"),we.setAttribute("aria-label","Quote selection in comment"),we.textContent="Quote",we.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),da())}),we.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),we.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),da()}),document.body.appendChild(we),we)}function Jd(e,t){const n=xv();n.style.display="flex",bn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!bn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Xi(){we&&(we.style.display="none"),bn=!1}function Iv(){return bn}function eu(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function or(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=eu(t.startContainer),i=eu(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Sv(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function da(e=Qd){const t=or();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Sv(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Xi(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Tv(){var i;if(!or())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Jd(n.left+n.width/2,n.top),!0}function Lv(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!or()){Xi();return}Jd(t,n)},10)}function tu({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(Qd=t,i.addEventListener("mouseup",Lv,n?{signal:n}:void 0),Xd||(Xd=!0,document.addEventListener("mousedown",s=>{bn&&we&&!we.contains(s.target)&&Xi()}),document.addEventListener("selectionchange",()=>{bn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Xi()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&bn&&(s.stopImmediatePropagation(),Xi())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Tv()})))}function nu(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function iu(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function su(e){if(!e)return"";const t=pt(e),n=document.createElement("div");return n.innerHTML=t,nu(n,iu),n.innerHTML}function Kn(e){if(!e)return"";const t=pt(e),n=document.createElement("div");return n.innerHTML=t,nu(n,iu),n.innerHTML}let rr=!1,lr=!1,en=!0,Qi=null,Ji=null,es=null,ua=null,cr=!1,pa=null;function dr(e=null){cr=!0,e&&(pa=e)}function ur(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function pr(e){return e.user_name||e.user_email||"Unknown"}function mr(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(ve(t(e.old_value)))}</strong> to <strong>${m(ve(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(Pe(t(e.old_value)))}</strong> to <strong>${m(Pe(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function Cv(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function Av(){en=!en;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",en),n&&n.classList.toggle("rotated",en)}async function ts(e){try{Qi=await v.getTicketRitualsStatus(e),au(e)}catch(t){console.error("Failed to load ticket rituals:",t),Qi=null}}function au(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Qi){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=Qi;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(en=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",en);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",en);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?pt(d.prompt):""}</div>
                        ${d.attestation?"":ib(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Je(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${pt(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${Qy(d,e)}
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
                                <span class="attestation-time">${Je(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function ma(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await ne(t.id,!1),!0):(N("my-issues",!1),!1)}catch{return N("my-issues",!1),!1}}function fr(e){const t=ji(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function gr({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Bv(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=_e();if(!t)return;const n=fr(t.id);Ji=n.prevIssue?n.prevIssue.id:null,es=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=gr(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}dt(e=>{e==="detailNavContext"&&Bv()});let ns=0;function Dv(){ns++}let ou=0,fa=!1;function ru(){if(document.querySelector(".description-inline-editor"))return"editor";if(zi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||fa?"transient":null}function lu(e){return dr(),e==="editor"?"deferred":"retry"}function jv(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=_e())==null?void 0:n.id)===e}function Mv(e){return le().find(t=>t.id===e)||Oo(e)||ji().find(t=>t.id===e)||null}function Rv(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Pn(e);const i=fr(e.id);Ji=i.prevIssue?i.prevIssue.id:null,es=i.nextIssue?i.nextIssue.id:null;const s=Z().find(r=>r.id===e.project_id),a=e.assignee_id?Wt(e.assignee_id):null,o=T()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${gr(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Ie(e.status)}<span>${ve(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${ut(e.priority)}<span>${Pe(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?m(Kt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function ne(e,t=!0,{refresh:n=!1}={}){const i=n?ns:++ns,s=++ou;if(n){const a=ru();if(a)return lu(a)}try{t&&kn(),n||(en=!0);let a=!1;if(!n){const w=Mv(e);w&&(Rv(w),t&&(history.pushState({issueId:e,view:T()},"",`/issue/${w.identifier}`),a=!0))}let o=!1;const[r,l,c,d,u,f]=await Promise.all([v.getIssue(e),v.getComments(e).catch(w=>(console.error("Failed to load comments:",w),o=!0,[])),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),y=[...f.pending_rituals||[],...f.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",author:w.attestation.attester||null,content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at})),b=[...l,...y].sort((w,F)=>new Date(w.created_at)-new Date(F.created_at)),$=[r.parent_id?v.getIssue(r.parent_id):Promise.resolve(null),v.getSprints(r.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[I,S]=await Promise.all($);if(i!==ns)return"dropped";let D=null,A=null;if(n){if(s!==ou||!jv(e))return"dropped";const w=ru();if(w)return lu(w);A=window.scrollY;const F=document.activeElement;F!=null&&F.id&&document.getElementById("issue-detail-view").contains(F)&&(D={id:F.id,start:F.selectionStart,end:F.selectionEnd})}Qi=f;const W=u.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),_=u.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),j=u.filter(w=>w.relation_type==="relates_to");t&&!a&&history.pushState({issueId:e,view:T()},"",`/issue/${r.identifier}`),Pn(r),Zc(S),cr=!1,pa=null,document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const G=document.getElementById("issue-detail-view");G.classList.remove("hidden");const se=T()||"my-issues",pe=Z().find(w=>w.id===r.project_id),Y=r.assignee_id?Wt(r.assignee_id):null,ue=Y?Kt(Y):null,X=r.sprint_id?S.find(w=>w.id===r.sprint_id):null,Fe=fr(r.id),{prevIssue:ot,nextIssue:Ht}=Fe;G.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(se)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${gr(Fe)}
                        <span class="issue-detail-breadcrumb">${pe?m(pe.name):"Project"} › ${m(r.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(r.title)}</h1>

                    ${I?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(I.identifier)}" data-action="navigate-issue" data-issue-id="${p(I.id)}" data-identifier="${p(I.identifier)}">${I.identifier}: ${m(I.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(r.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${Us(r.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${r.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(r.id)}">
                            ${r.description?Kn(r.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${d.length===0?q({icon:M.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):d.map(w=>`
                                <a href="/issue/${encodeURIComponent(w.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(w.id)}" data-identifier="${p(w.identifier)}">
                                    <span class="sub-issue-status">${Ie(w.status)}</span>
                                    <span class="sub-issue-id">${w.identifier}</span>
                                    <span class="sub-issue-title">${m(w.title)}</span>
                                    ${w.estimate!=null?`<span class="sub-issue-estimate">${w.estimate}pts</span>`:""}
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
                            ${W.length===0&&_.length===0&&j.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${_.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${W.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${W.map(w=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ie(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${j.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${j.map(w=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${Ie(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${m(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
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
                            <h3>Comments${b.length>0?` <span class="section-count">(${b.length})</span>`:""}</h3>
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
                            ${b.length===0?o?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:b.map(w=>{var F;return`
                                <div class="comment ${w.is_attestation?"comment-attestation":""} ${w.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?w.is_pending?"⏳":"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(w.author_name||"User")}</span>
                                            ${w.author?jn(w.author):Bo((F=Wt(w.author_id))==null?void 0:F.is_agent)}
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${m(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Je(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${su(w.content)}</div>
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
                            ${c.length===0?q({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):c.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ur(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${mr(w)}</span>
                                        <span class="activity-actor">by ${m(pr(w))} ${jn(w.user)}</span>
                                        <span class="activity-time">${Je(w.created_at)}</span>
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
                                ${Ie(r.status)}
                                <span>${ve(r.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(r.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${ut(r.priority)}
                                <span>${Pe(r.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(r.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${r.issue_type||"task"}">${bt(r.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(r.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${ue?`${Dn(Y,"avatar-small")}<span>${m(ue)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(r.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${X?m(X.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(r.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${r.labels&&r.labels.length>0?r.labels.map(w=>`
                                        <span class="issue-label" style="background: ${J(w.color)}20; color: ${J(w.color)}">${m(w.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${pe?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(pe.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(r.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Hr(r.estimate,r.project_id)?" out-of-scale":""}" ${Hr(r.estimate,r.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${La(r.estimate,r.project_id)}</span>
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
                            <span class="property-value-static">${m(r.creator_name||"Unknown")} ${jn(r.creator)}</span>
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
        `,ua&&ua.abort(),ua=new AbortController;const{signal:Ue}=ua,rt=document.querySelector(".sidebar-overflow-trigger"),ce=document.querySelector(".overflow-menu-dropdown");if(rt&&ce){const w=()=>{ce.classList.add("hidden"),rt.setAttribute("aria-expanded","false")},F=()=>{const Ce=ce.classList.toggle("hidden");rt.setAttribute("aria-expanded",String(!Ce))};rt.addEventListener("click",F,{signal:Ue}),document.addEventListener("click",Ce=>{!rt.contains(Ce.target)&&!ce.contains(Ce.target)&&w()},{signal:Ue}),ce.addEventListener("keydown",Ce=>{Ce.key==="Escape"&&(Ce.stopPropagation(),w(),rt.focus())},{signal:Ue})}au(r.id),ar("new-comment","mention-suggestions",{projectId:r.project_id}),tu({signal:Ue});const gt=document.getElementById("new-comment");if(fa=!1,gt){gt.addEventListener("compositionstart",()=>{fa=!0},{signal:Ue}),gt.addEventListener("compositionend",()=>{fa=!1},{signal:Ue});const w=Rc(r.id);w&&(gt.value=w),gt.addEventListener("input",()=>{Fs(r.id,gt.value)}),gt.addEventListener("keydown",F=>{var Ce;F.key==="Enter"&&(F.metaKey||F.ctrlKey)&&(F.preventDefault(),(Ce=gt.closest("form"))==null||Ce.requestSubmit())})}Ji=ot?ot.id:null,es=Ht?Ht.id:null;const me=w=>{var oe;if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&da()){w.preventDefault();return}if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||zi())return;if(w.key==="ArrowLeft"&&Ji)w.preventDefault(),ne(Ji);else if(w.key==="ArrowRight"&&es)w.preventDefault(),ne(es);else if(w.key==="c"){w.preventDefault(),w.stopImmediatePropagation();const lt=document.getElementById("new-comment");lt&&(lt.focus(),lt.scrollIntoView({behavior:"smooth",block:"nearest"}))}else w.key==="j"?(w.preventDefault(),w.stopImmediatePropagation(),ga(1)):w.key==="k"?(w.preventDefault(),w.stopImmediatePropagation(),ga(-1)):w.key==="d"&&(w.preventDefault(),(oe=document.querySelector('[data-action="edit-description"]'))==null||oe.click());const Ce={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(Ce){const lt=document.querySelector(`.property-row[data-field="${Ce}"]`);lt&&(w.preventDefault(),lt.click())}};if(document.addEventListener("keydown",me,{signal:Ue}),D){const w=document.getElementById(D.id);if(w&&(w.focus({preventScroll:!0}),typeof D.start=="number"&&typeof w.setSelectionRange=="function"))try{w.setSelectionRange(D.start,D.end)}catch{}}return A!==null&&window.scrollTo(0,A),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==ns)return"dropped";E("load issue",a);const o=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(o){const r=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;o.innerHTML=q(r?{icon:M.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:M.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Pv(e,t){if(e.preventDefault(),rr)return!1;const n=document.getElementById("new-comment").value;Fs(t,null),rr=!0;try{const i=await v.createComment(t,n);k("Comment added!","success"),Ao(i),await ne(t)}catch(i){Fs(t,n),E("add comment",i)}finally{rr=!1}return!1}async function qv(e){const t=_e()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Us(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=qc(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}ar("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?mn(e,c,t.description||""):mn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&cu()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(mn(e,null),cr){ne(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?Kn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,y;if(lr)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=pa?pa.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const b=document.getElementById("description-draft-warning");b&&(b.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",b.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");lr=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await v.updateIssue(e,{description:c}),mn(e,null),k("Description updated","success"),await ne(e,!1),window.scrollTo(0,f),(y=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||y.focus()}catch(b){E("update description",b)}finally{lr=!1,u&&(u.disabled=!1)}})}function cu(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Kn(n):'<span class="text-muted">Nothing to preview.</span>'}function Nv(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?cu():i.focus()}function Ov(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function Hv(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Fv(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Uv(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Gv(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),P(),k("Relation added","success"),ne(t)}catch(s){E("add relation",s)}return!1}async function zv(e,t){try{await v.deleteRelation(e,t),k("Relation removed","success"),ne(e)}catch(n){E("remove relation",n)}}function ga(e){const t=_e();if(!t)return;const n=ji();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||ne(n[s].id)}ee({"retry-issue-comments":(e,t)=>{ne(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Rh(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||qv(t.issueId)},"toggle-section":(e,t)=>{Cv(t.section)},"toggle-ticket-rituals":()=>{Av()},"save-comment":(e,t)=>{Pv(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Ov(t.issueId)},"remove-relation":(e,t)=>{zv(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Bd(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Gv(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Hv(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Fv(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Uv()},"set-description-editor-mode":(e,t)=>{Nv(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>ga(-1),"navigate-next-issue":()=>ga(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Zd(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),_v(t.issueId)}});function du(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Yn=[],is=[],ha=null,ae=new Set,Zn="list",wn=!1,hr=null,va=null,vr=null,yr=null,uu=null;function pu(e){if(uu!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const br=Uf();(br==="list"||br==="grid")&&(Zn=br);function mu(e){if(e!=="list"&&e!=="grid")return;Zn=e,e==="grid"&&wn&&wr(),Gf(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),tn()}function fu(){if(Zn!=="list")return;wn=!0,ae.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),tn(),Qn()}function wr(){wn=!1,ae.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),tn(),Qn()}function Vv(){hr&&clearTimeout(hr),hr=setTimeout(()=>{tn()},300)}function Wv(){const e=document.getElementById("doc-search");e&&(e.value=""),tn()}async function Kv(){et(null)}async function Yv(){const e=document.getElementById("doc-search");e&&(e.value=""),et(null)}function Zv(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=V()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Z().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function Xv(){return Yn}function tn(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";Zv(),is=Yn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),is.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),iy("",Zn)}let Xn=0;async function Qv(){var i;const e=ha||((i=L())==null?void 0:i.id);if(!e)return;const t=++Xn,n=V()||null;try{const s=await v.getDocuments(e,n);if(t!==Xn)return;Yn=s,tn()}catch(s){if(t!==Xn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=q({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}dt(e=>{e==="currentProject"&&T()==="documents"&&Qv()});async function $n(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;ha=e,Wc(-1);const n=++Xn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=V()||null);try{const a=await v.getDocuments(e,t);if(n!==Xn)return;Yn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",Zn==="list"),r.classList.toggle("active",Zn==="grid")),tn()}catch(a){if(n!==Xn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=q({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",a)}}function gu(){var t,n;if(T()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=ha||((n=L())==null?void 0:n.id);e&&$n(e).catch(i=>console.error("Failed to refresh documents list:",i))}function hu(e){pu(e)&&Se(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Jv(e,t){pu(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),N("documents"))}function ey(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${J(t.color)}20; color: ${J(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function ty(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ey(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(du(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function ny(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${J(r.color)}20; color: ${J(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?du(e.content).substring(0,80):"No content",s=wn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ae.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${wn&&ae.has(e.id)?" selected":""}" data-action="${wn?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function iy(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;ae.clear(),Qn();const i=is;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=V(),f=d||u;n.innerHTML=q({icon:f?M.search:M.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?ty:ny,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=Z();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const g=r.find(y=>y.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function sy(e){ae.has(e)?ae.delete(e):ae.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ae.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ae.has(e)),Qn()}function ay(){is.forEach(e=>ae.add(e.id)),is.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Qn()}function vu(){ae.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ae.clear(),Qn()}function Qn(){const e=document.getElementById("doc-bulk-actions");e&&(wn?(e.classList.remove("hidden"),ae.size>0?e.innerHTML=`
        <span class="bulk-count">${ae.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function oy(){if(ae.size===0){k("No documents selected","error");return}const t=Z().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ae.size} Document${ae.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ae.size} selected document${ae.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function ry(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ae);let i=0;const s=[];for(const l of n)try{await v.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=Yn.find(d=>d.id===l))==null?void 0:o.title)||l)}P(),vu(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=L())==null?void 0:r.id;return await $n(a),!1}async function ly(){var a,o;if(ae.size===0){k("No documents selected","error");return}const e=ae.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ae);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=Yn.find(c=>c.id===r))==null?void 0:a.title)||r)}wr(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=L())==null?void 0:o.id;await $n(s)}async function cy(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${m(s.author_name||"Unknown")}</span>
                ${jn(s.author)}
                <span class="comment-date">${Je(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${su(s.content)}</div>
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
    `}}function dy(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=Rc(e);s&&(i.value=s),i.addEventListener("input",()=>{Fs(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),ar("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Se(e,t=!0){try{t&&kn();const n=await v.getDocument(e);uu=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await cy(n);let a=null,o=null,r=!1;if(n.project_id){const j=Z().find(G=>G.id===n.project_id);if(a=j?j.name:null,n.sprint_id)try{const G=await v.getSprint(n.sprint_id);o=G?G.name:null}catch(G){console.error("Failed to load sprint name:",G),r=!0}}let l=n.content||"";const c=z.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=Xv(),u=d.findIndex(_=>_.id===n.id),f=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,y=u>=0,b=T()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(_=>`
          <span class="issue-label" style="background: ${J(_.color)}20; color: ${J(_.color)}">
            ${m(_.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(_.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let I='<span class="text-muted">None</span>';try{const _=await v.getDocumentIssues(n.id);_.length>0&&(I=_.map(j=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(j.identifier)}</span>
            <span class="linked-item-title">${m(j.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(j.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(_){console.error("Failed to load linked issues:",_),I=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(b)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${y?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${p(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${p(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${l?Kn(l):'<p class="text-muted">No content</p>'}</div>

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
                ${$}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${m(n.author_name||"Unknown")} ${jn(n.author)}</span>
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
              ${I}
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
    `,va&&va.abort(),va=new AbortController;const{signal:S}=va,D=i.querySelector(".sidebar-overflow-trigger"),A=i.querySelector(".overflow-menu-dropdown");if(D&&A){const _=()=>{A.classList.add("hidden"),D.setAttribute("aria-expanded","false")},j=()=>{const G=A.classList.toggle("hidden");D.setAttribute("aria-expanded",String(!G))};D.addEventListener("click",j,{signal:S}),document.addEventListener("click",G=>{!D.contains(G.target)&&!A.contains(G.target)&&_()},{signal:S}),A.addEventListener("keydown",G=>{G.key==="Escape"&&(_(),D.focus())},{signal:S})}dy(n.id,S,n.project_id||null),tu({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:S}),vr=f?f.id:null,yr=g?g.id:null;const W=_=>{if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key===">"||_.key==="."||_.code==="Period")&&da("new-doc-comment")){_.preventDefault();return}_.metaKey||_.ctrlKey||_.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA"||_.target.tagName==="SELECT"||_.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(_.key==="ArrowLeft"&&vr?(_.preventDefault(),Se(vr)):_.key==="ArrowRight"&&yr&&(_.preventDefault(),Se(yr)))};document.addEventListener("keydown",W,{signal:S})}catch(n){E("load document",n)}}async function ya(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${m(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function $r(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${m(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function uy(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?Kn(r):'<span class="text-muted">Nothing to preview.</span>'}}function kr(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Oc(e);if(o){const l=Of(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Gs(e,null);return}Gs(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function yu(){ss=null;const e=Z(),t=Ru()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${$r("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),kr("new"),t&&await ya("doc-sprint",t,null,!0)}let ss=null;async function py(e,t,n){ss=n||null;const s=Z().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${$r("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),kr("new"),t&&await ya("doc-sprint",t,e)}async function my(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),Gs("new",null),await $n(t),P(),k("Document created!","success"),ss){const o=ss;ss=null,o()}}catch(o){E("create document",o)}return!1}let Er=null,as=null,_r=!1;async function bu(e){try{const t=await v.getDocument(e);Er=e,as={title:t.title||"",content:t.content||""},_r=!1;const i=Z().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${$r("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),kr(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await ya("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function fy(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Er===t&&as&&!_r){let o=null;try{o=await v.getDocument(t)}catch{}if(o&&((o.title||"")!==as.title||(o.content||"")!==as.content))return _r=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await v.updateDocument(t,s),Er=null,as=null;const o=Oc(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Gs(t,null),P(),await Se(t),k("Document updated!","success")}catch(o){E("update document",o)}return!1}async function gy(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await $n(n),N("documents"),k("Document deleted!","success")}catch(n){E("delete document",n)}}function hy(e,t){ya(e,t)}async function vy(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function yy(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function by(e,t){try{await v.linkDocumentToIssue(e,t),P(),k("Issue linked!","success"),await Se(e,!1)}catch(n){E("link issue",n)}}async function wy(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Se(e,!1)}catch(n){E("unlink issue",n)}}let xr=!1;async function $y(e,t){if(e.preventDefault(),xr)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;xr=!0;try{const s=await v.createDocumentComment(t,i);n.value="",k("Comment added!","success"),Ao(s),await Se(t,!1)}catch(s){E("add comment",s)}finally{xr=!1}return!1}async function ky(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${J(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,U()}catch(i){E("load labels",i)}}async function Ey(e,t){try{await v.addLabelToDocument(e,t),P(),k("Label added!","success"),await Se(e,!1)}catch(n){E("add label",n)}}async function _y(e,t){try{await v.removeLabelFromDocument(e,t),k("Label removed!","success"),await Se(e,!1)}catch(n){E("remove label",n)}}ee({"view-document":(e,t)=>{e.preventDefault(),Se(t.documentId)},"set-doc-editor-mode":(e,t)=>{uy(t.target,t.mode)},"retry-load-documents":()=>{$n(ha)},"retry-document-comments":(e,t)=>{Se(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{sy(t.docId)},"clear-doc-search":()=>{Wv()},"clear-doc-project-filter":()=>{Kv()},"clear-all-doc-filters":()=>{Yv()},"show-bulk-move-modal":()=>{oy()},"bulk-delete-documents":()=>{ly()},"select-all-docs":()=>{ay()},"clear-doc-selection":()=>{vu()},"exit-selection-mode":()=>{wr()},"enter-selection-mode":()=>{fu()},"handle-bulk-move":e=>{ry(e)},"unlink-document-issue":(e,t)=>{wy(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{vy(t.documentId)},"add-document-comment":(e,t)=>{$y(e,t.documentId)},"remove-label-from-doc":(e,t)=>{_y(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{ky(t.documentId)},"show-edit-document-modal":(e,t)=>{bu(t.documentId)},"delete-document":(e,t)=>{gy(t.documentId)},"create-document":e=>{my(e)},"update-doc-sprint-dropdown":(e,t,n)=>{hy(t.sprintSelect,n.value)},"update-document":(e,t)=>{fy(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{yy(n.value,t.documentId)},"link-to-issue":(e,t)=>{by(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Ey(t.documentId,t.labelId)}});let nn=[],ba={},wa=new Set,Mt=null,Ir=null,$a=[],os=[],Sr=[];function ka(){return ba}function xy(){return Ir}function Iy(){return Mt}dt(e=>{e==="currentProject"&&T()==="sprints"&&sn()});let Tr=0;async function sn(){Yc(-1);const e=V();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++Tr;Uy();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await v.getCurrentSprint(e);const i=await v.getSprints(e);if(t!==Tr)return;nn=i,Sy(),await Ea()}catch(i){return t!==Tr?void 0:(n&&(n.innerHTML=q({icon:M.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",i),!1)}return!0}function Sy(){const e=document.getElementById("sprints-list");if(!e)return;const t=nn.find(a=>a.status==="active"),n=nn.find(a=>a.status==="planned"),i=nn.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Ty(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
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
        `),e.innerHTML=s||q({icon:M.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function wu(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${Dr(e.activated_at)}, closed ${Dr(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${Dr(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Ty(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${m(wu(e))||"not yet activated"}</span>
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
    `}let Lr=0;async function Jn(e,t=!0){var n;try{t&&kn();const i=++Lr,s=T(),a=await v.getSprint(e);if(i!==Lr)return;if(!a){k("Sprint not found","error"),N("sprints");return}Ir=a;const o=(n=L())==null?void 0:n.id,[r,l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?v.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==Lr)return;$a=r,Sr=l,os=c,T()===s&&zt($a),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Cy()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),N("sprints")}}async function Ly(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),N("sprints",!1);return}try{await Jn(e,!1)}catch{N("sprints",!1)}}function Cy(){const e=Ir,t=$a;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=T()||"sprints",s=t.filter(g=>Pi.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((y,b)=>y+(b.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${m(wu(e))}
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
                ${s.length===0?q({icon:M.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>Cr(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?q({icon:M.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>Cr(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>Cr(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${By()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${os.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${os.length>0?`
                    <div class="sprint-issues-list">
                        ${os.map(g=>Ay(g)).join("")}
                    </div>
                `:q({icon:M.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Cr(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Jc,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Vy(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Ay(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Je(e.created_at)}</span>
            </span>
        </div>
    `}function By(){const e=Sr;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Dy(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Dy(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function jy(e,t,n,i){const s=i?vb(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function My(e,t,n){var u,f,g,y;e.preventDefault();const i=(f=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(y=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:y.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=nn.find(b=>b.id===t);try{const b={};i&&(b.name=i);const $=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!$&&(b.budget=a),Object.keys(b).length&&await v.updateSprint(t,b),o==="planned"){const S=nn.filter(D=>D.status==="planned"&&D.id!==t);for(const D of S)await v.updateSprint(D.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await sn(),P(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(b){E("update budget",b)}return!1}const $u="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Ry(e,t=null){const n=nn.find(c=>c.id===e),i=n?Z().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${$u}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await v.updateSprint(e,{budget_follows_default:!0})}catch(c){E("reset budget to project default",c),t&&(t.disabled=!1);try{await sn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await sn()!==!1}catch{l=!1}k(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&k($u,"warning")}async function Py(e){const t=nn.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=Pi;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function qy(e){try{const t=await v.closeSprint(e);await sn(),_u(),t.limbo?Oy(t):k("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Ea(){const e=V();if(e)try{Mt=await v.getLimboStatus(e),Ny()}catch(t){console.error("Failed to load limbo status:",t)}}function Ny(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Mt||!Mt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Mt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Oy(e){const t=V();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,U(),Hy(t)}async function Hy(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(i.name)} <span class="ritual-mode">(${m(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${pt(i.prompt)}</div>
                    ${Br(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Ar(){var t,n;if(!Mt)return;const e=V();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Mt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${m(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${pt(i.prompt)}</div>
                        ${Br(i.attestation)}
                        ${Fy(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Mt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Mt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(i.name)}</div>
                            ${Br(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function Br(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(Je(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${pt(e.note)}</div>
        </div>
    `}function Fy(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function ku(e){for(const t of e)if(!wa.has(t))try{(await v.getSprints(t)).forEach(i=>{ba[i.id]=i}),wa.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Uy(){ba={},wa=new Set,$a=[],Sr=[],os=[],_a={}}function Gy(e,t){t.forEach(n=>{ba[n.id]=n}),wa.add(e)}let _a={};function zy(e){return _a[e]}function Eu(e,t){_a[e]=t??null}function _u(){_a={}}ee({"retry-load-sprints":()=>sn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Jn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;jy(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Ry(t.sprintId,n)},"show-limbo-details-modal":()=>{Ar()},"show-close-sprint-confirmation":(e,t)=>{Py(t.sprintId)},"handle-update-budget":(e,t)=>{My(e,t.sprintId,t.projectId)},"close-modal":()=>{P()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,P(),qy(t.sprintId)},"dismiss-limbo-modal":()=>{P(),Ea()},"approve-ritual":(e,t)=>{Zy(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Iu(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}ne(t.issueId)},"create-sprint-document":async(e,t)=>{await py(t.sprintId,t.projectId,()=>{Jn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Se(t.documentId)}});function Dr(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Vy(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}dt(e=>{e==="currentProject"&&T()==="rituals"&&jr()});let xu=0;async function jr(){const e=V(),t=document.getElementById("rituals-content"),n=++xu;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=q({icon:M.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}xb(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await cs();n===xu&&!i&&t&&(t.innerHTML=q({icon:M.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Wy(){Mu(Ky),jr()}function Ky(){const e=document.getElementById("rituals-content"),t=Ib(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,ni("rv-sprint-rituals-list",n,"sprint"),ni("rv-close-rituals-list",i,"close"),ni("rv-claim-rituals-list",s,"claim")}function Yy(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function Zy(e,t){try{await v.approveAttestation(e,t),k("Ritual approved!","success"),await Ea(),Ar()}catch(n){E("approve ritual",n)}}function Mr(e){return e==="document"?`
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
        `:""}function Rr(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Iu(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Mr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{Xy(s,e,t,i)}),U()}async function Xy(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Rr(i);if(a===void 0)return!1;try{await v.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await Ea();const o=Iy();o&&!o.in_limbo?(P(),k("Limbo cleared! Next sprint is now active.","success")):Ar()}catch(o){E("complete gate ritual",o)}return!1}function Qy(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function Jy(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${m(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Mr(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{eb(o,e,t,s,a)}),U()}async function eb(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=Rr(i);if(o===void 0)return!1;try{await v.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),P(),await ts(n)}catch(r){E("attest ticket ritual",r)}return!1}async function tb(e,t){try{await v.attestTicketRitual(e,t),k("Ritual attested!","success"),await ts(t)}catch(n){E("attest ticket ritual",n)}}async function nb(e,t){try{await v.approveTicketRitual(e,t),k("Ritual approved!","success"),await ts(t)}catch(n){E("approve ticket ritual",n)}}function ib(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${m(e.rejected_by_name||"Someone")}:</strong> ${m(e.note||"")}</div>`}function Su(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{sb(s,e,t,n,i)}),U()}async function sb(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await v.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),P(),s&&await s()}catch(o){E("reject ritual",o)}return!1}function ab(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Mr(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{ob(s,e,t,i)}),U()}async function ob(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Rr(i);if(a===void 0)return!1;try{await v.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),P(),await ts(n)}catch(o){E("complete ticket ritual",o)}return!1}ee({"show-create-ritual-modal":(e,t)=>{Hu(t.trigger)},"approve-ticket-ritual":(e,t)=>{nb(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Su(t.ritualId,t.issueId,t.ritualName,()=>ts(t.issueId))},"complete-ticket-ritual":(e,t)=>{ab(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{Jy(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{tb(t.ritualId,t.issueId)},"retry-load-rituals":()=>jr()});function pt(e){if(!e)return"";try{z.setOptions({breaks:!0,gfm:!0});const n=z.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Dc.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function rs(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function rb(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${rs(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{lb(c,e,t,n)}),U(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function lb(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),P(),kt()}catch(a){E("complete gate ritual",a)}}function cb(e,t,n,i,s,a,o,r){rb(e,t,n,i,s,a,o,r)}function db(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${rs(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${pt(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{ub(d,e,t,n)}),U(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function ub(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await v.approveTicketRitual(t,n);let r=null;if(s)try{r=await v.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}k(`Review ritual "${i}" approved!`,"success"),Ao(r),P(),kt()}catch(r){E("approve review ritual",r)}}function pb(e,t,n,i,s,a,o,r,l){db(e,t,n,i,s,a,o,r,l)}dt(e=>{e==="currentProject"&&T()==="approvals"&&kt()});let Pr=[],qr=0;async function kt(){if(!L())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++qr;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=V(),i=n?Z().filter(r=>r.id===n):Z(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==qr)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}cg(a),Pr=o,Tu()}catch(n){if(t!==qr)return;e.innerHTML=q({icon:M.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),E("load approvals",n)}}function Tu(){const e=document.getElementById("approvals-list");if(!e)return;const t=lg(),n=Pr.length>0,i=!zf();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${M.issues}</div>
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
            `:e.innerHTML=q({icon:M.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Pr.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const g=f.attestation&&!f.attestation.approved_at,y=g?"⏳":"○",b=g?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',$=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(f.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(f.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(f.name)}"
                                                data-ritual-artifact="${p(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${y} ${m(f.name)}
                                                    <span class="badge badge-ritual-${p(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
                                                ${b}
                                            </div>
                                            ${$}
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
                    ${r.map(Nr).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Nr).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Nr).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;cb(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await v.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await kt()}catch(y){d.disabled=!1,u&&(u.disabled=!1),E("approve review ritual",y)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;pb(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Su(u.ritualId,u.issueId,u.ritualName,()=>kt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await v.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await kt()}catch(u){d.disabled=!1,E("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Iu(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function mb(){Vf(),Tu()}function Nr(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(i.requested_by_name)}</strong>${i.requested_at?` (${rs(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${pt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${m(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${rs(i.rejected_at)})`:""}: ${m(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
    `}ee({"view-issue-from-modal":(e,t)=>{e.preventDefault(),P(),ne(t.issueId)},"dismiss-approvals-explainer":()=>{mb()},"retry-load-approvals":()=>kt()});const xa={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Ia={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Lu=0;function Cu(e){Lu=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Au(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Au(e="",t="",n=""){const i=Lu++,s=Object.keys(xa).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?xa[e]:xa.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Ia[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function fb(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Au()),Sa()}function gb(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Sa()}function hb(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=xa[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${Ia[o]}</option>`).join(""),Bu(e),Sa()}function Bu(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function ls(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Sa(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Du(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw ls("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw ls("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw ls(`Duplicate condition: ${r} ${Ia[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw ls(`Please enter a numeric value for ${r} ${Ia[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw ls(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return Sa(),Object.keys(t).length>0?t:null}ee({"add-condition-row":()=>{fb()},"remove-condition-row":(e,t)=>{gb(Number(t.rowId))},"update-operator-options":(e,t)=>{hb(Number(t.rowId))},"toggle-value-input":(e,t)=>{Bu(Number(t.rowId))}});let $e=[],Or=null;const ju=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];dt((e,t)=>{e==="currentProject"&&(t&&jf(t),ju.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Rb(t||""))});const Ta={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Mu(e){Or=e}function Z(){return $e}function ei(e){const t=$e.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Ta[n]||Ta.fibonacci}function La(e,t){if(e==null)return"No estimate";const i=ei(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Hr(e,t){return e==null||e===0?!1:!ei(t).some(i=>i.value===e)}function vb(e){const t=$e.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Ta[n]||Ta.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function st(){if(L())try{$e=await v.getProjects(L().id),yb();const e=V();if(e&&$e.some(i=>i.id===e))return;const t=Fr();if(t&&$e.some(i=>i.id===t)){et(t);return}const n=Mc();if(n&&$e.some(i=>i.id===n)){et(n);return}$e.length>0&&et($e[0].id)}catch(e){E("load projects",e)}}function yb(){const e='<option value="">All Projects</option>'+$e.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+$e.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=V();ju.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Ru(){return Mc()}function ti(){const e=document.getElementById("projects-list");if($e.length===0){e.innerHTML=q({icon:M.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=$e.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${J(t.color)}20; color: ${J(t.color)}">
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
    `).join("")}function bb(e){et(e),N("issues")}function Pu(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function wb(e){e.preventDefault();const t=L();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(t.id,n),await st(),ti(),P(),k("Project created!","success")}catch(i){E("create project",i)}return!1}async function $b(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await st(),ti(),P(),k("Project updated!","success")}catch(i){E("update project",i)}return!1}async function kb(e){const t=$e.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await st(),ti(),P(),k("Project deleted","success")}catch(n){E("delete project",n)}}let Te=null;function qu(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function Eb(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await v.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Te!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${p(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${p(a.id)}">${m(a.identifier)} ${m(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function Nu(e){Te=e,$e.length===0&&await st();const t=$e.find(n=>n.id===e);if(!t){k("Project not found","error"),N("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,qu("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),qu("ps-require-epic-on-close",t.require_epic_on_close===!0),Eb(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Ou("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Ou(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Rt||Rt.length===0)&&cs()}function _b(){Te=null,Rt=[]}function xb(e){Te=e}function Ib(){return Rt}async function Sb(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(Te,t),await st(),k("Settings saved","success");const n=$e.find(i=>i.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function Tb(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await v.updateProject(Te,n),await st(),k("Settings saved","success")}catch(o){E("save settings",o)}}let Rt=[];async function cs(){if(!Te)return!1;try{return Rt=await v.getRituals(Te),Lb(),typeof Or=="function"&&Or(),!0}catch(e){return E("load rituals",e),!1}}function Lb(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Rt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Rt.filter(i=>i.trigger==="ticket_close"),n=Rt.filter(i=>i.trigger==="ticket_claim");ni("ps-sprint-rituals-list",e,"sprint"),ni("ps-close-rituals-list",t,"close"),ni("ps-claim-rituals-list",n,"claim")}function ni(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${pt(a.prompt)}</div>
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
  `}).join("")}async function Hu(e){if(!Te)return;let t=[];try{t=await v.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Cu(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function Cb(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Ab(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Fu(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function Bb(e){var s;e.preventDefault();let t;try{t=Du()}catch{return!1}let n;try{n=await Fu()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.createRitual(Te,i),await cs(),P(),k("Ritual created!","success")}catch(a){E("create ritual",a)}return!1}async function Db(e){const t=Rt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(Te)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Cu(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function jb(e,t){var a;e.preventDefault();let n;try{n=Du()}catch{return!1}let i;try{i=await Fu()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await v.updateRitual(t,s),await cs(),P(),k("Ritual updated!","success")}catch(o){E("update ritual",o)}return!1}async function Mb(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await cs(),k("Ritual deleted","success")}catch(n){E("delete ritual",n)}}ee({"view-project":(e,t)=>{bb(t.projectId)},"view-project-settings":(e,t)=>{Nu(t.projectId)},"create-project":e=>{wb(e)},"update-project":(e,t)=>{$b(e,t.projectId)},"confirm-delete-project":(e,t)=>{kb(t.projectId)},"edit-project-ritual":(e,t)=>{Db(t.ritualId)},"delete-project-ritual":(e,t)=>{Mb(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Bb(e)},"update-project-ritual":(e,t)=>{jb(e,t.ritualId)},"toggle-ritual-conditions":()=>{Cb()},"ritual-group-change":()=>{Ab()}});function Fr(){const t=new URLSearchParams(window.location.search).get("project");return t||Ru()}function Rb(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Ur={},Uu=new Map;let Gr=null,zr=null,Vr=null,Wr=null,Kr=null,Yr=null,Zr=null,Gu=!1;function Pb(e){Object.assign(Ur,e)}function qb({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(Gr=e),t&&(zr=t),n&&(Vr=n),i&&(Wr=i),s&&(Kr=s),a&&(Yr=a),o&&(Zr=o)}function Nb(){return Object.keys(Ur)}const Ob=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],Hb={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects"};function zu(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function N(e,t=!0,{transition:n=!1}={}){if(t&&kn(),ng(e),t){let a;const o=Fr();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:Ob.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}zu(e),Gr&&Gr();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Ur[e];s&&s(),t&&window.scrollTo(0,0)}function Vu(){var i;const t=window.location.pathname.split("/").filter(Boolean);Wr&&Wr();let n="my-issues";if(t.length===0||t[0]==="")N("my-issues",!1);else if(zr&&zr(t)){const s=Hb[t[0]];s&&zu(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Nb().includes(n)?N(n,!1):(n="my-issues",N("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function kn(){Uu.set(window.location.href,window.scrollY)}function Wu(e){kn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Kr&&Kr(e)}function Ku(e){kn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Yr&&Yr(e)}function Yu(){const e=Uu.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Zr&&Zr(),window.scrollTo(0,e)})}function Fb(){Gu||(Gu=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Vr&&Vr(e.state)){Yu();return}(t=e.state)!=null&&t.view?N(e.state.view,!1):Vu(),Yu()}))}let Pt=0,ii=!1,ds=null,Ca=null,us=0;const En=new Map;function Aa(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Pt===0&&!ii),e.textContent=ii?"Stopped":"Offline",e.title=ii?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function He(e,t){return En.has(e)||En.set(e,new Set),En.get(e).add(t),()=>{var n;return(n=En.get(e))==null?void 0:n.delete(t)}}function Ub(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const Gb=1e3;function Ba(){Ca&&(clearTimeout(Ca),Ca=null)}const zb="chaotic",Xr=4001,Vb=4003,Wb="chaotic.bearer.";function Kb(e){return[zb,Wb+e]}function Zu(e,{isReconnect:t=!1}={}){ds&&(clearTimeout(ds),ds=null),Ba();const n=pg();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Mo(null)),!t&&(Pt>0||ii)&&(Pt=0,ii=!1,Aa());const i=v.getToken();if(!i)return;const s=++us,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,Kb(i));Mo(r);let l=!1;const c=()=>{if(l||s!==us)return;l=!0,Ba();const d=Pt>0;d&&k("Live updates reconnected","success"),Pt=0,Aa(),d&&Qr({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===us&&(console.log("WebSocket connected"),Ba(),Ca=setTimeout(c,Gb))},r.onmessage=d=>{if(s!==us)return;c();let u;try{u=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}Qr(u)},r.onclose=d=>{if(s!==us)return;console.log("WebSocket disconnected"),Ba();const u=d==null?void 0:d.code;if(u===Xr||u===Vb){Mo(null),Pt=0;const g=u===Xr&&jc()===i;ii=!g,Aa();let y="forbidden";u===Xr&&(y=g?"unauthorized":"superseded"),Qr({type:y,entity:"connection",data:{code:u,teamId:e}});return}Pt++,Pt===1&&k("Live updates disconnected. Reconnecting...","warning"),Aa();const f=Ub(Pt-1);ds=setTimeout(()=>{ds=null,L()&&L().id===e&&Zu(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Qr(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=En.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=En.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=En.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const Yb={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device"};let si=0,an=!1,ke=null,on=null;const ps=new Set,Et=new Map,at=new Map;function Xu(e){Et.get(e)===null&&Et.set(e,si)}function Jr(e){const t=at.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=si)}function Zb(e){return e.filter(t=>!Et.has(t.id)).map(t=>{const n=at.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(an&&at.has(t.id)&&t.id!==ke))}function Xb(e){for(const[t,n]of Et)n!==null&&e>n&&Et.delete(t);for(const[t,n]of at)n.confirmedAfter!==null&&e>n.confirmedAfter&&at.delete(t)}function Qb(e,t){t!=null&&t.id&&(e==="archived"?(Et.has(t.id)||Et.set(t.id,null),Xu(t.id)):e==="read"&&Jr(t.id))}async function ai(){const e=L();if(e){try{const t=await v.getInboxUnreadCount(e.id);Mi(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}ms()}}function ms(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Ks();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function fs({focusFirst:e=!1,background:t=!1}={}){const n=L();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++si;t||(on={focusFirst:e||!!(on!=null&&on.focusFirst)},ke=null,Jb(i));try{const a=await v.getInbox(n.id,{unread:an,limit:100});if(s!==si)return;const o=new Set(Et.keys());Xb(s);const r=Zb(a||[]),l=on;on=null,l?(Vt(r),ja(),l.focusFirst&&!Qe()&&nw()):ew(r,o)}catch(a){if(s!==si)return;on?(on=null,i.innerHTML=q({icon:M.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",a)):console.error("Failed to refresh inbox:",a)}ai()}function Jb(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function el(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Qu(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Ju(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function ep(e,t){if(!e)return;const n=el(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Qu(n||t)),i==null||i.focus({preventScroll:!0})}function ew(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=ye(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=Ju(),c=window.scrollY,d=n.scrollTop;let u=e;if(ke&&!e.some(y=>y.id===ke)){const y=i.find(b=>b.id===ke);y&&an&&!t.has(ke)?(u=[...e],u.splice(Math.min(i.indexOf(y),u.length),0,y)):ke=null}Vt(u),ja();let f=-1;o&&(f=u.findIndex(y=>y.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?Da(f,{focus:!1}):Ws(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;ep(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function tw(e,t){if(!(t!=null&&t.id))return!1;const n=ye().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function gs(e){const t=ye();for(const n of new Set(e)){const i=el(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?Ju():null,o=document.createElement("template");o.innerHTML=ip(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),ep(a,r)}}function Da(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){Ws(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),Ws(i),t&&Qu(n[i]).focus({preventScroll:!0})}function nw(){Da(0)}async function tl(e){const t=ye(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;ke===e&&(ke=null),Et.set(e,null),Vt(t.filter(a=>a.id!==e)),s&&Mi(Math.max(0,Ks()-1)),ja(),ms(),Da(n);try{await v.archiveInbox(e),Xu(e)}catch(a){Et.delete(e),console.error("Failed to archive inbox entry:",a)}}function tp(e){var s,a;const n=ye().findIndex(o=>o.id===e);if(n===-1)return;const i=ke;ke=i===e?null:e,ke===e&&iw(e),gs([i,e]),Da(n),ke===e&&((a=(s=el(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function iw(e){const t=ye(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,at.set(e,{readAt:i,confirmedAfter:null}),Vt([...t]),Mi(Math.max(0,Ks()-1)),ms(),v.markInboxRead(e).then(()=>Jr(e),s=>{var o;((o=at.get(e))==null?void 0:o.readAt)===i&&at.delete(e);const a=ye().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Vt([...ye()]),gs([e])),ai(),E("mark inbox entry read",s)})}function sw(){if(ke===null)return!1;const e=ke;return ke=null,gs([e]),!0}function np(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function aw(e){if(ps.has(e))return;const t=ye().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";ps.add(e),np(e,!0);try{await v.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){ps.delete(e),np(e,!1),E(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}ps.delete(e),tl(e)}function ow(){an=!an;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",an),fs({focusFirst:!0})}function ip(e){const t=!e.read_at,n=e.id===ke,i=Yb[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
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
                ${n?rw(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-time">${m(rs(e.created_at))}</span>
                <button type="button" class="inbox-row-archive" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">&times;</button>
            </div>
        </div>
    `}function rw(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${m(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${ps.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${m(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
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
    `}function ja(){const e=document.getElementById("inbox-list");if(!e)return;const t=ye();if(t.length===0){e.innerHTML=q({icon:M.inbox,heading:an?"No unread items":"Inbox zero",description:an?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>ip(n)).join("")}async function lw(e){var s;const t=ye().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();at.set(e,{readAt:n,confirmedAfter:null});try{await v.markInboxRead(e)}catch(a){((s=at.get(e))==null?void 0:s.readAt)===n&&at.delete(e);const o=ye().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Vt([...ye()]),gs([e])),console.error("Failed to mark inbox entry read:",a);return}Jr(e);const i=ye().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Vt([...ye()]),Mi(Math.max(0,Ks()-1)),ms(),gs([e])):ai()}async function cw(){const e=L();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of ye())n.read_at||at.set(n.id,{readAt:t,confirmedAfter:si});Vt(ye().map(n=>({...n,read_at:n.read_at||t}))),Mi(0),ms(),ja()}catch(t){E("mark all inbox entries read",t)}}function dw(e){e.entryId&&lw(e.entryId),e.issueId?ne(e.issueId):e.documentId&&Se(e.documentId)}function uw(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&tl(e.dataset.entryId)}function pw(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&tp(e.dataset.entryId)}const mw='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function fw(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(mw);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function gw(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ee({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&gw((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||fw(e.target,n)||(e.preventDefault(),t.entryId&&tp(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),dw(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&aw(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&tl(t.entryId)},"toggle-inbox-unread-filter":()=>ow(),"mark-all-inbox-read":()=>cw(),"retry-load-inbox":()=>fs({focusFirst:!0})});let Ma=[],oi=[],nl=[],il=[];function hw(){return Ma}function _n(){return oi}async function sl(){try{Ma=await v.getMyTeams(),vw()}catch(e){E("load teams",e)}}function vw(){const e=document.getElementById("team-list");Ma.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ma.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function al(e,t=!1){Ri(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),Zu(e.id),await Promise.all([st(),Rw(),bw(),pv(),ai()]),t?Vu():N(T())}function sp(){document.getElementById("team-dropdown").classList.toggle("hidden")}function yw(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function bw(){if(L())try{oi=await v.getTeamMembers(L().id),Xs(_n,Zi),qi()}catch(e){console.error("Failed to load team members:",e),E("load team members",e)}}function ol(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let rl=0;async function ll(){if(!L())return;const e=++rl,t=document.getElementById("team-members-list");t&&(t.innerHTML=ol());try{const n=await v.getTeamMembers(L().id);if(e!==rl)return;oi=n,Xs(_n,Zi),qi(),ww()}catch(n){if(e!==rl)return;t&&(t.innerHTML=q({icon:M.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),oi=[],ap(),E("load team members",n)}}function Ra(){var n;const e=(n=At())==null?void 0:n.id,t=oi.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function ap(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!Ra())}function ww(){const e=document.getElementById("team-members-list"),t=Ra();ap(),e.innerHTML=oi.map(n=>`
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
                ${t&&n.user_id!==At().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let cl=0;async function Pa(){if(!L())return;const e=++cl,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=ol());try{const n=await v.getTeamInvitations(L().id);if(e!==cl)return;nl=n,$w()}catch(n){if(e!==cl)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function $w(){const e=document.getElementById("team-invitations-list");if(nl.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=Ra();e.innerHTML=nl.map(n=>`
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
    `).join("")}let dl=0;async function op(){if(!L())return;const e=++dl,t=document.getElementById("team-agents-list");t&&(t.innerHTML=ol());try{const n=await v.getTeamAgents(L().id);if(e!==dl)return;il=n,kw()}catch(n){if(e!==dl)return;t&&(t.innerHTML=q({icon:M.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),E("load team agents",n)}}function kw(){const e=document.getElementById("team-agents-list");if(e){if(il.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=il.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function rp(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Ew(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await v.createInvitation(L().id,t,n);if(await Pa(),i&&i.accept_url)return Iw(t,xw(i.accept_url),i.email_queued===!0),!1;P(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){_w(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):E("send invitation",i)}return!1}function _w(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function lp(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function xw(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!lp(n.hostname)||lp(i.hostname)?e:i.origin+n.pathname}function Iw(e,t,n=!1){var a;const i=m(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${m(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,Qe()||U(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),cp()}function cp(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function Sw(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function Tw(e){let t;try{t=await v.issueInvitationVerificationCode(L().id,e)}catch(n){E("get a verification code",n);return}Cw(t)}function Lw(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function Cw(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=Lw(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,Qe()||U(),cp("invitation-code")}async function Aw(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(L().id,e),await ll(),k("Member removed!","success")}catch(t){E("remove member",t)}}async function Bw(e){try{await v.deleteInvitation(L().id,e),await Pa(),k("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function dp(){sp(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function Dw(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,U())}async function jw(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await sl(),await al(n),P(),k("Team created!","success")}catch(n){E("create team",n)}return!1}async function Mw(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(L().id,t);Ri(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await sl(),P(),k("Team updated!","success")}catch(n){E("update team",n)}return!1}async function Rw(){if(L())try{const e=await v.getLabels(L().id);zs(e)}catch(e){console.error("Failed to load labels:",e),E("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ee({"select-team":(e,t)=>{al(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Aw(t.userId)},"delete-invitation":(e,t)=>{Bw(t.invitationId)},"issue-invitation-code":(e,t)=>{Tw(t.invitationId)},"retry-load-team-invitations":()=>{Pa()},"retry-load-team-members":()=>{ll()},"retry-load-team-agents":()=>{op()},"invite-member":e=>{Ew(e)},"copy-invite-link":()=>{Sw()},"dismiss-invite-link":()=>{P()},"create-team":e=>{jw(e)},"update-team":e=>{Mw(e)}});let _t=null,qt=0,ri=null,li=null,hs=null,ul=!1;function Pw(){return Mf()}function up(){Rf()}function pp(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function qw(){_t||(_t=document.createElement("div"),_t.id="onboarding-overlay",_t.className="onboarding-overlay",document.getElementById("app").appendChild(_t))}function vs(){if(!_t)return;const e=ul?fp():mp(),t=e[qt],n=e.map((i,s)=>`<span class="onboarding-dot${s===qt?" active":""}${s<qt?" completed":""}"></span>`).join("");_t.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function mp(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=pp(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=pp(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&ri&&(e.textContent=`${ri.name} (${ri.key})`),t&&li&&(t.textContent=`${li.name} (${li.key})`),n&&hs&&(n.textContent=`${hs.identifier} - ${hs.title}`)}}]}function fp(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function pl(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ml(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function ci(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Nw(){const e=ul?fp():mp();qt<e.length-1&&(qt++,vs())}function Ow(){up(),hp(),di()}function Hw(){up(),hp(),di()}async function Fw(e){e.preventDefault(),ml("onboarding-team-error"),ci("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{ri=await v.createTeam({name:t,key:n}),qt++,vs()}catch(i){pl("onboarding-team-error",i.message||"Failed to create team"),ci("onboarding-team-submit",!1)}}async function Uw(e){e.preventDefault(),ml("onboarding-project-error"),ci("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{li=await v.createProject(ri.id,{name:t,key:n}),qt++,vs()}catch(i){pl("onboarding-project-error",i.message||"Failed to create project"),ci("onboarding-project-submit",!1)}}async function Gw(e){e.preventDefault(),ml("onboarding-issue-error"),ci("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{hs=await v.createIssue(li.id,{title:t}),qt++,vs()}catch(n){pl("onboarding-issue-error",n.message||"Failed to create issue"),ci("onboarding-issue-submit",!1)}}function gp(e=!1){ul=e,qt=0,ri=null,li=null,hs=null,qw(),vs()}function hp(){_t&&(_t.remove(),_t=null)}function vp(){Pf(),gp(!0)}ee({"onboarding-next":e=>{e.preventDefault(),Nw()},"onboarding-skip":e=>{e.preventDefault(),Ow()},"onboarding-finish":e=>{e.preventDefault(),Hw()},"onboarding-create-team":e=>{Fw(e)},"onboarding-create-project":e=>{Uw(e)},"onboarding-create-issue":e=>{Gw(e)}});const yp="/oauth/consent/";function zw(e){if(!e||!e.startsWith(yp))return null;const t=e.slice(yp.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function Vw(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function Ww(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Kw(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const bp={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function qa(e){const t=bp[e.trust]||bp.unverified,n=e.host?` · ${m(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${m(t)}${n}</span>`}function Yw(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${m(n.name)}</option>`).join("")}function Zw(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${m(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function wp(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${m(i.name+a)}</option>`)}return n.join("")}function $p(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${m(t.name)} <span class="oauth-muted">${m(t.key)}</span>
        </label>`).join("")}function Xw(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${m(t.name)}${m(i)}
        </label>`}).join("")}function Qw(e,t){const n=m(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${qa(t.client)}</p>
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
        </div>`}function Jw(e,t){if(t.acts_as==="person"){Qw(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=m(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${m(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${qa(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${m(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${Yw(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${wp(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${$p(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${Xw(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,fl(e,t)}function fl(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=Zw(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function e$(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function t$(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function ys(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${m(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function n$(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{v.logout(),t()})}function i$(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=wp(d,null),e.querySelector("#oauth-projects").innerHTML=$p(d),fl(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>fl(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await v.approveOAuthRequest(t,e$(e)):await v.denyOAuthRequest(t);if(!Vw(u.redirect)){ys(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){ys(e,"It has expired, was already answered, or belongs to someone else.");return}t$(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function s$(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=Ww();Kw(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await v.getOAuthRequest(e)}catch(a){a&&a.status===404?ys(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?n$(i,n):a&&a.status===403?ys(i,"Only a person signed in to Chaotic can approve an app."):ys(i,a&&a.message||"Something went wrong");return}Jw(i,s),i$(i,e,s,t)}const gl="/invite/",bs="/invite",hl="chaotic.inviteToken",kp="invite-auth-notice";let vl=null;const a$="This invitation is no longer valid.",o$={owner:"an owner",admin:"an admin",member:"a member"};function r$(e){if(!e||!e.startsWith(gl))return null;const t=e.slice(gl.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Ep(){const{pathname:e}=window.location,t=r$(e);if(t){vl=t;try{sessionStorage.setItem(hl,t)}catch{}return history.replaceState(null,"",bs),t}if(!_p(e))return null;let n=null;try{n=sessionStorage.getItem(hl)}catch{}const i=n||vl;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function _p(e){return e===bs||e===`${bs}/`}function xp(e){return _p(e)||!!(e&&e.startsWith(gl))}function yl(){vl=null;try{sessionStorage.removeItem(hl)}catch{}}function l$(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function c$(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function bl(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Ip(){const e=c$();return Na(),bl(e),e}function d$(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Na()}function Na(){var e;(e=document.getElementById(kp))==null||e.remove()}function wl(e){const t=e.invited_by_name?`<strong>${m(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=o$[e.role]||`a ${m(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${m(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${m(e.email_hint)}</strong>${u$(e)}</p>`}function u$(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${m(n)}`}const p$="Ask whoever invited you to send a new invitation.",m$="Reload the page to try again.";function $l(e,t=a$,n=p$){e.innerHTML=`
        <div class="invite-page">
            <h1>${m(t)}</h1>
            <p class="invite-muted">${m(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function f$(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Sp(){window.location.pathname!==bs&&history.replaceState(null,"",bs),f$(Ip())}function g$(e,t){e.innerHTML=`
        <div class="invite-page">
            ${wl(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function h$(e,t,n){const i=l$(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${m(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${wl(t)}
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
            ${wl(t)}
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
        </div>`}function v$(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function y$(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await v.requestEmailVerification(),f=v$(u.expires_at);c(`We sent a code to ${u.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(u){const f=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(f==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await v.confirmEmailVerification(f)}catch(y){r.disabled=!1;const b=y&&y.detail&&y.detail.error_code;y&&y.status===401?n():b==="email_already_verified"?t():(c(y&&y.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function b$(e,t){Na();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=kp,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${m(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${m(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Na(),t()})}function Oa(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function w$(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=Ip();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await v.getInvitation(e)}catch(f){f&&f.status===404?(yl(),$l(a)):$l(a,f&&f.message||"Something went wrong.",m$);return}if(!t){g$(a,o);const f=g=>{b$(o,()=>bl(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}h$(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var y,b;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await v.acceptInvitation(e):await v.acceptInvitation(e,f)}catch($){l=!1,r.disabled=!1;const I=$&&$.detail&&$.detail.error_code;if(f!==void 0&&(I==="invalid_verification_code"||I==="invitation_code_expired"||$&&$.status===429)){Oa(a,$&&$.message||"That code did not work."),(b=(y=a.querySelector("#invite-admin-code"))==null?void 0:y.select)==null||b.call(y);return}$&&$.status===401?s():$&&($.status===404||$.status===400)?(yl(),$l(a)):$&&$.status===403&&$.detail&&$.detail.error_code==="email_unverified"?(Oa(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):$&&$.status===403?Oa(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Oa(a,$&&$.message||"Something went wrong");return}yl(),Tp(a,o);try{await i(g.team_id,o.team_name)}catch($){console.error("Joined the team but could not open it:",$),bl(a),Tp(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),y$(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Tp(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${m(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${m(t.team_name)}</a>
            </div>
        </div>`}function kl(e){return w$(e,{user:At(),showAuth:t=>{ks(),t==="signup"?Ap():Cp()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),d$(),await di({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{v.logout(),Mn(null),Ri(null),kl(e)}})}async function Lp(){const e=Ep();if(e){await kl(e);return}if(xp(window.location.pathname)){Sp();return}ks()}async function di({teamId:e}={}){const t=zw(window.location.pathname);if(t){await s$(t);return}const n=Ep();if(n){await kl(n);return}if(xp(window.location.pathname)){Sp();return}$$(),x$(),await sl();const i=hw();if(i.length===0&&!Pw()){gp();return}try{if(i.length>0){const s=e&&i.find(a=>a.id===e)||i[0];await al(s,!0)}}finally{Fb()}}let ui=null,ws=null,mt=null,ft=null;function $s(){ui||(ui=document.getElementById("auth-screen"),ws=document.getElementById("main-screen"),mt=document.getElementById("login-form"),ft=document.getElementById("signup-form"))}function ks(){$s(),ui&&ui.classList.remove("hidden"),ws&&ws.classList.add("hidden")}function $$(){$s(),ui&&ui.classList.add("hidden"),ws&&ws.classList.remove("hidden")}function Cp(){$s(),mt&&mt.classList.remove("hidden"),ft&&ft.classList.add("hidden")}function Ap(){$s(),mt&&mt.classList.add("hidden"),ft&&ft.classList.remove("hidden")}async function k$(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),Mn(await v.getMe()),await di(),k("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function E$(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),Mn(await v.getMe()),await di(),k("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function Bp(){v.logout(),Mn(null),Ri(null),ks(),k("Signed out","success")}function _$(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function x$(){var i;const e=At();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Bo(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?_$(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function I$(){$s();const e=mt==null?void 0:mt.querySelector("form");e&&e.addEventListener("submit",s=>k$(s));const t=ft==null?void 0:ft.querySelector("form");t&&t.addEventListener("submit",s=>E$(s));const n=mt==null?void 0:mt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Ap()});const i=ft==null?void 0:ft.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Cp()})}let El=[];async function _l(){try{El=await v.getApiKeys(),S$()}catch(e){E("load API keys",e)}}function S$(){const e=document.getElementById("api-keys-list");if(e){if(El.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=El.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${We(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${We(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function T$(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function L$(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);P(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){E("create API key",n)}return!1}async function C$(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function A$(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),k("API key revoked","success"),await _l()}catch(n){E("revoke API key",n)}}ee({"create-api-key":e=>{L$(e)},"copy-api-key":()=>{C$()},"dismiss-api-key-modal":()=>{P(),_l()},"revoke-api-key":(e,t)=>{A$(t.keyId,t.keyName)}});let xl=[];async function Dp(){try{xl=await v.getConnections(),D$()}catch(e){E("load connected apps",e)}}function Il(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function B$(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function D$(){const e=document.getElementById("connected-apps-list");if(e){if(xl.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=xl.map(t=>t.acts_as==="person"?j$(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(Il(t))} ${qa(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${m(t.agent?t.agent.name:"an agent")}</span>
                    <span>${m(B$(t))}</span>
                    <span>policy ${m(t.policy)}</span>
                    <span class="api-key-date">Connected ${We(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${We(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${m(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(Il(t))}">Disconnect</button>
        </div>
    `).join("")}}function j$(e){const n=`${e.device_name||"A device"} · ${Il(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${m(n)} ${qa(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${We(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${We(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function M$(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await v.revokeConnection(e),k("App disconnected","success"),await Dp()}catch(n){E("disconnect app",n)}}ee({"revoke-connection":(e,t)=>{M$(t.connectionId,t.connectionName)}});let Sl=[];async function jp(){try{Sl=await v.getPushDevices(),R$()}catch(e){E("load push devices",e)}}const Mp={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Rp(e){return e.label||e.platform||"Unnamed device"}function R$(){const e=document.getElementById("push-devices-list");if(e){if(Sl.length===0){e.innerHTML=q({icon:M.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=Sl.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(Rp(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${m(t.platform)}</span>`:""}
                    <span>via ${m(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${We(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${We(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${m(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Mp[t.status]?`<span class="push-device-status">${m(Mp[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(Rp(t))}">Remove</button>
        </div>
    `).join("")}}async function P$(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await v.deletePushDevice(e),k("Device removed","success"),await jp()}catch(n){E("remove push device",n)}}ee({"remove-push-device":(e,t)=>{P$(t.installationId,t.deviceName)}});let Ha=!1,Nt=0,rn=[],Fa=[];function q$(e){Fa=e,rn=[...e]}function xn(){return Ha}function N$(){if(Ha)return;Ha=!0,Nt=0,rn=[...Fa];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Ua()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>O$(n.target.value)),t.addEventListener("keydown",F$),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&H$(Number(i.dataset.commandIndex))}),Es(),requestAnimationFrame(()=>t.focus())}function Ua(){Ha=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function O$(e){const t=e.toLowerCase().trim();t?rn=Fa.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):rn=[...Fa],Nt=0,Es()}function Es(){const e=document.getElementById("command-results");if(!e)return;if(rn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};rn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Nt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function H$(e){Nt=e,Es()}function Pp(e){const t=rn[e];t&&(Ua(),t.action())}function F$(e){switch(e.key){case"ArrowDown":e.preventDefault(),Nt=Math.min(Nt+1,rn.length-1),Es();break;case"ArrowUp":e.preventDefault(),Nt=Math.max(Nt-1,0),Es();break;case"Enter":e.preventDefault(),Pp(Nt);break;case"Escape":e.preventDefault(),Ua();break}}ee({"execute-command":(e,t)=>{Pp(Number(t.commandIndex))}});const U$=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function G$(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function z$(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(G$).join("")}
    </div>`}function qp(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${U$.map(z$).join("")}
        </div>
    `,U()}const Ga=100,Tl="status!=done,canceled",V$=["created","updated","priority","status","title","estimate"];function ge(e){return e==null?"":m(String(e))}function Np(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${ge(n)}</a>`}function Op(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const Ll=[{id:"identifier",label:"ID",fixed:!0,render:e=>Np(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Np(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>ge(ve(e.status))},{id:"priority",label:"Priority",render:e=>ge(Pe(e.priority))},{id:"type",label:"Type",render:e=>ge(bt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>ge(Op(e,"assignee"))},{id:"creator",label:"Creator",render:e=>ge(Op(e,"creator"))},{id:"project",label:"Project",render:e=>ge(e.project_key)},{id:"sprint",label:"Sprint",render:e=>ge(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=J(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${ge(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>ge(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${ge(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>ge(We(e.created_at))},{id:"updated",label:"Updated",render:e=>ge(We(e.updated_at))},{id:"completed",label:"Completed",render:e=>ge(We(e.completed_at))},{id:"due",label:"Due",render:e=>ge(We(e.due_date))}],za=Object.fromEntries(Ll.map(e=>[e.id,e])),W$=Ll.filter(e=>e.fixed).map(e=>e.id),Cl=["identifier","title","status","priority","assignee","updated"];function Al(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!za[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...Cl]:[...W$.filter(s=>!t.has(s)),...n]}function K$(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function Y$(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?Al(t.get("cols").split(",")):[...Cl],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function Z$(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!K$(e.cols,Cl)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function X$(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function Q$({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=Ga,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",X$(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;V$.includes(f)?(o.push("--sort",f,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function J$(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function ek(e,t){const n=Al(t).map(a=>za[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${ge(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function tk(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let R=null,Bl=null,ze=null,Dl=0,pi=!1,Hp=!1;function ie(e){return document.getElementById(e)}function Fp(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Up(e){const t=Z$({...Bl,cols:R.cols,group:R.group,view:R.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function nk(){const e=ie("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(Z().map(n=>`<option value="${p(n.id)}">${ge(n.name)}</option>`));e.innerHTML=t.join(""),e.value=R.teamScope?"":R.projectId||""}function ik(){const e=ie("query-columns-menu");e&&(e.innerHTML=Ll.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${R.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${ge(t.label)}
        </label>`).join(""))}function Va(e){const t=ie("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${ge(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function Gp(e){const t=ie("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function jl(e){var t;(t=ie("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function _s(){const e=ie("query-results"),t=ie("query-pager");if(!e)return;if(!ze){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=ze;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=ek(n,R.cols),t&&(t.innerHTML=tk(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),pi&&jl(!0))}async function Wa(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!R)return;const i=L(),s=R.teamScope?{teamId:i==null?void 0:i.id}:{projectId:R.projectId};if(!s.teamId&&!s.projectId){ze=null,_s(),Va(R.teamScope?"Select a team first.":"Select a project.");return}const a=++Dl,o=R.where===null?Tl:R.where,r=ie("query-results");pi=!0,r&&r.classList.add("loading"),jl(!0);const l=()=>a===Dl&&T()==="query";try{const c=await v.queryIssues({...s,where:o,order:R.order,skip:(R.page-1)*Ga,limit:Ga});if(!l())return;R.where=c.where,R.order=c.order||null,Bl=Fp(R),ze={issues:c.issues||[],total:c.total,skip:c.skip};const d=ie("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),Va(null),pi=!1,_s(),Up(e),t&&t()}catch(c){if(!l())return;pi=!1,n?n():ze=null,_s(),Va(J$(c))}finally{a===Dl&&(pi=!1,r&&r.classList.remove("loading"),jl(!1))}}function zp(){if(!R)return;const e=ie("query-where");return R.where=e?e.value.trim():"",R.page=1,Wa("push")}function sk(e){if(R)return R.teamScope=!e,e&&(R.projectId=e),R.page=1,Gp(null),Wa("push",{onSuccess:()=>{e&&et(e)}})}function ak(e,t){if(!R||!za[e]||za[e].fixed)return;const n=R.cols.filter(i=>i!==e);R.cols=Al(t?[...n,e]:n),_s(),Up("replace")}function ok(e){if(!R||!ze||pi)return;const t=R.page+e;if(t<1||e>0&&ze.skip+ze.issues.length>=ze.total)return;const n={page:R.page,result:ze};return R.page=t,Wa("push",{onFailure:()=>{R.page=n.page,ze=n.result}})}async function rk(){if(!R)return null;const e=ie("query-where"),t=e?e.value.trim():R.where??Tl,n=R.teamScope?null:Z().find(o=>o.id===R.projectId),{command:i,warning:s}=Q$({where:t,order:R.order,teamScope:R.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:Ga,skip:ze?ze.skip:0}),a=ie("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function lk(){var e,t,n,i,s,a,o;Hp||(Hp=!0,(e=ie("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),zp())}),(t=ie("query-run-btn"))==null||t.addEventListener("click",()=>zp()),(n=ie("query-copy-cli-btn"))==null||n.addEventListener("click",()=>rk()),(i=ie("query-project-filter"))==null||i.addEventListener("change",r=>sk(r.target.value)),(s=ie("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=ie("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=ie("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&ak(r.target.value,r.target.checked)}),(o=ie("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||ok(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=ie("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=ie("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function ck(){var s,a;lk();const e=Y$(window.location.search),t=Z();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(V())?V():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}R=e,Bl=Fp(R),ze=null;const i=ie("query-where");return i&&(i.value=R.where===null?Tl:R.where),(s=ie("query-cli-preview"))==null||s.classList.add("hidden"),(a=ie("query-columns-menu"))==null||a.classList.add("hidden"),nk(),ik(),Va(null),Gp(n),_s(),Wa("replace")}let Ka=[];function dk(){return Ka}dt(e=>{e==="currentProject"&&T()==="epics"&&ln()});let Ml=0;const Ya=new Set(["done","canceled"]);let Za=!1;async function ln(){var n,i;jo(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++Ml;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=L())!=null&&n.id)){Ka=[],e.innerHTML=q({icon:M.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const s=V(),a=s?await v.getProjectEpicProgress(s):await v.getTeamEpicProgress(L().id);if(t!==Ml)return;if(!((i=a==null?void 0:a.epics)!=null&&i.length)){Ka=[],e.innerHTML=q({icon:M.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Kp(a,e)}catch(s){if(t!==Ml)return;e.innerHTML=q({icon:M.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",s)}}function uk(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Rl(e,t){return`${e} ${t}${e===1?"":"s"}`}function pk(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${p(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function Vp(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Rl(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${p(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function Wp(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function mk(e){const t=`status-${(e.status||"backlog").replace(/_/g,"-")}`,n=e.status_pinned&&!Ya.has(e.status)?' <span class="epic-status-pinned-mark" title="Set by hand, so it no longer follows its tickets">✎</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-";return`
        <tr class="epic-row${Ya.has(e.status)?" epic-row-closed":""}" data-identifier="${p(e.identifier)}" style="cursor: pointer;">
            <td class="epic-identifier">${m(e.identifier)}</td>
            <td class="epic-title">${m(e.title)}</td>
            <td class="epic-progress">${pk(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${Wp(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Vp(e.sprints)}</td>
            <td class="epic-status"><span class="status-badge ${t}">${uk(e.status)}</span>${n}</td>
        </tr>
    `}function fk(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${m(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${Rl(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${Wp(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${Vp(e.sprints)}</td>
            <td class="epic-status"></td>
        </tr>
    `}function Kp(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(u=>Ya.has(u.status)).length,a=Za?n:n.filter(u=>!Ya.has(u.status));Ka=a;const o=[...new Set([...n.map(u=>u.project_key),...i.map(u=>u.project_key)])],r=o.length>1,l=o.map(u=>{const f=a.filter(b=>b.project_key===u).map(mk).join(""),g=fk(i.find(b=>b.project_key===u));return!f&&!g?"":(r?`<tr class="epic-group-row"><th colspan="7">${m(u)}</th></tr>`:"")+f+g}).join(""),c=!l.trim()&&s>0?'<tr class="epic-empty-row"><td colspan="7" class="text-muted">Every epic here is closed.</td></tr>':"",d=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${Za?"Hide":"Show"} ${Rl(s,"closed epic")}</button>`:"";t.innerHTML=`
        <table class="epic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Progress</th>
                    <th>Points</th>
                    <th title="Closed while the current sprint is active">This sprint</th>
                    <th title="Points closed in each recent sprint, oldest first">Sprints</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${l}${c}
            </tbody>
        </table>
        ${d?`<div class="epic-table-footer">${d}</div>`:""}
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=u=>{if(u.target.closest("[data-epics-toggle-closed]")){Za=!Za,jo(-1),Kp(t._epicProgress,t);return}const f=u.target.closest(".epic-row");f&&f.dataset.identifier&&Ku(f.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function gk(){const e=V(),t=Z().map(n=>`
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",hk),document.getElementById("create-epic-title").focus()}async function hk(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});P(),k(`Created epic ${s.identifier}`,"success"),ln()}catch(s){E("create epic",s)}}async function Yp(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){ne(t.id,!1);return}await Xa(t.id,!1)}else N("epics",!1)}catch{N("epics",!1)}}async function Xa(e,t=!0){var n;try{t&&kn();const[i,s,a,o]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(i.issue_type!=="epic"){ne(e,t);return}t&&history.pushState({epicId:e,view:T()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=T()||"epics",c=Z().find(_=>_.id===i.project_id),d=i.assignee_id?Wt(i.assignee_id):null,u=d?Kt(d):null,f=dk(),g=(n=f.find(_=>_.id===i.id))==null?void 0:n.children,y=g?(g.total||0)-(g.canceled||0):s.filter(_=>_.status!=="canceled").length,b=g?g.done||0:s.filter(_=>_.status==="done").length,$=y>0?Math.round(b/y*100):0,I=f.findIndex(_=>_.id===i.id),S=I>0?f[I-1]:null,D=I>=0&&I<f.length-1?f[I+1]:null,A=I>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${A?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${S?`data-action="navigate-epic" data-epic-id="${p(S.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${I+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${D?`data-action="navigate-epic" data-epic-id="${p(D.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?m(c.name):"Project"} › ${m(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Kn(i.description)}
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
                                <span>${b} of ${y} done</span>
                                <span>${$}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?q({icon:M.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(_=>{const j=_.assignee_id?Wt(_.assignee_id):null,G=j?Kt(j):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(_.id)}" data-identifier="${p(_.identifier)}">
                                    <span class="sub-issue-status">${Ie(_.status)}</span>
                                    <span class="sub-issue-id">${m(_.identifier)}</span>
                                    <span class="sub-issue-title">${m(_.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(_.status||"backlog").replace(/_/g,"-")}">${ve(_.status)}</span>
                                    ${G?`<span class="sub-issue-assignee">${m(G)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?q({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(_=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ur(_.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${mr(_)}</span>
                                        <span class="activity-actor">by ${m(pr(_))}</span>
                                        <span class="activity-time">${Je(_.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${o.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${o.map(_=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(_.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(_.author_name||"User")}</span>
                                            <span class="comment-date">${Je(_.created_at)}</span>
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
                                ${Ie(i.status)}
                                ${ve(i.status)}
                            </span>
                        </div>
                        ${i.status_pinned&&!["done","canceled"].includes(i.status)?`
                        <div class="property-row epic-status-pinned">
                            <span class="property-label"></span>
                            <span class="property-value-static">
                                <span class="text-muted" title="Set by hand, so it no longer follows its sub-issues">Set by hand</span>
                                <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${p(i.id)}">Follow sub-issues</button>
                            </span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${ut(i.priority)}
                                ${Pe(i.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${u?m(u):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${La(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(_=>`
                                    <span class="issue-label" style="background: ${J(_.color)}20; color: ${J(_.color)}">${m(_.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const W=r.querySelector(".sub-issues-list");W&&W.addEventListener("click",_=>{const j=_.target.closest(".sub-issue-item");j&&j.dataset.issueId&&ne(j.dataset.issueId)})}catch(i){E("load epic",i)}}ee({"navigate-epic":(e,t)=>{Xa(t.epicId)},"epic-follow-children":async(e,t)=>{try{await v.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows sub-issues"),await Xa(t.epicId,!1)}catch(n){E("update epic",n)}}});function vk(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,f;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function yk(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Ot(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function bk(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Ot(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Ot(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function wk(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o,r,l;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Ot(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Ot(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.viewDocument(c)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.showEditDocumentModal&&e.showEditDocumentModal(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function mi(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function $k(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,f,g,y;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(l=i.target).closest)!=null&&c.call(l,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(d=e.isInlineDropdownOpen)!=null&&d.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=b=>{var I,S,D,A;const $=!!((S=(I=document.activeElement)==null?void 0:I.closest)!=null&&S.call(I,"#inbox-list"));if((D=e.collapseInboxExpand)==null||D.call(e),Ot(a+b,e.setSelectedIndex,t),$){const W=document.querySelector(`${t}.keyboard-selected`);(A=(W==null?void 0:W.querySelector(".inbox-row-toggle"))||W)==null||A.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((f=(u=i.target).closest)!=null&&f.call(u,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((g=e.isEscapeLayerAbove)!=null&&g.call(e))break;if((y=e.collapseInboxExpand)!=null&&y.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(b=>b.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function kk(e){const t="#kanban-board .kanban-card";return function(i){var o,r,l;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Ot(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Ot(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.id;c&&e.viewIssue(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ek(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Zp(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Ot(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Ot(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(u=>u.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const _k={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>v.getDocumentRevisions(e),fetchOne:(e,t)=>v.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>v.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>v.getIssueDescriptionRevision(e,t)}};let H=null,cn=0;async function Xp(e,t){var a,o;const n=_k[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++cn;H=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===cn){if(H={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},H.viewVersion!=null)try{const r=await n.fetchOne(t,H.viewVersion);if(i!==cn)return;H.cache.set(H.viewVersion,r)}catch(r){i===cn&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Qa(),U()}}function Qa(){const e=document.getElementById("modal-content");if(!e||!H)return;if(H.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=xk(),n=H.mode==="compare"?Sk():Ik();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function xk(){const e=H.revisions.map(n=>{const i=H.mode==="view"?n.version===H.viewVersion:n.version===H.compareFromVersion||n.version===H.compareToVersion,s=H.mode==="compare"?n.version===H.compareFromVersion?' <span class="rev-tag">from</span>':n.version===H.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${m(n.author_name||"Unknown")} ${jn(n.author)}</span>
          <span class="revision-time">${Je(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${H.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function Ik(){const e=H.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=H.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${m(t.title)}</h3>`:"",i=t[H.adapter.bodyField]||"",s=i?`<div class="markdown-body">${pt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${m(t.author_name||"Unknown")} &middot; ${Je(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function Sk(){const e=H.compareFromVersion,t=H.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=H.cache.get(e),i=H.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[H.adapter.bodyField]||"",a=i[H.adapter.bodyField]||"",o=Tk(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function Tk(e,t){const n=e.split(`
`),i=t.split(`
`),s=Lk(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${m(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${m(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${m(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function Lk(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(xs(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(xs(a,"del",e[o]),o++):(xs(a,"add",t[r]),r++);for(;o<n;)xs(a,"del",e[o++]);for(;r<i;)xs(a,"add",t[r++]);return a}function xs(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function Ck(e){if(!H)return;const t=H.token,n=H;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(H!==n||cn!==t)return;n.cache.set(e,i)}catch(i){H===n&&cn===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Qa()}function Ak(){if(!H)return;const e=H.token,t=H;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{H===t&&cn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{H!==t||cn!==e||(s&&E("load revisions to compare",s),Qa())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Qa()}ee({"show-document-revisions":(e,t)=>{Xp("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Xp("issue",t.issueId)},"select-revision-version":(e,t)=>{Ck(Number(t.version))},"toggle-revision-compare":()=>{Ak()},"close-revision-viewer":()=>{H=null,P()}});const Bk=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let In=[],Ja=null,Pl=0;dt(e=>{e==="currentProject"&&T()==="board"&&Is()});async function Is(){Vs(-1);const e=++Pl,t=V();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=Z().length===0?q({icon:M.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):q({icon:M.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await v.getIssues({project_id:t});if(e!==Pl)return;In=i,T()==="board"&&zt(In),Ss()}catch(i){if(e!==Pl)return;n&&(n.innerHTML=q({icon:M.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",i)}}const ql=eg(()=>Is(),200);function Ss(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Bk.map(i=>{const s=In.filter(a=>a.status===i.key);return`
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
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Pe(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),Dk(t)}function Dk(e){const t=Kc();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Vs(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Vs(i),n[i].classList.add("keyboard-selected")}function jk(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Ja=t.dataset.id,t.classList.add("dragging")}function Mk(e,t){t.classList.remove("dragging"),Ja=null}function Qp(e){const t=In.find(n=>n.id===Ja);return!!t&&t.status===e}function Rk(e,t){e.preventDefault(),!Qp(t.dataset.status)&&t.classList.add("drag-over")}function Pk(e,t){t.classList.remove("drag-over")}function qk(e,t){e.preventDefault();const n=In.find(i=>i.id===t.dataset.id);n&&Qp(n.status)||t.classList.add("drag-over")}function Nk(e,t){t.classList.remove("drag-over")}async function Ok(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=In.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Ss();try{const o=await v.updateIssue(n,{status:i});k("Status updated","success"),Gi(o)}catch(o){s.status=a,Ss(),E("update status",o)}}}async function Hk(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Ja||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=In.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Ss();try{const l=await v.updateIssue(n,{status:a});k("Status updated","success"),Gi(l)}catch(l){o.status=r,Ss(),E("update status",l)}}}ee({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),ne(t.id)):e.type==="dragstart"?jk(e,n):e.type==="dragend"?Mk(e,n):e.type==="dragover"?qk(e,n):e.type==="dragleave"?Nk(e,n):e.type==="drop"&&Hk(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?Rk(e,n):e.type==="dragleave"?Pk(e,n):e.type==="drop"&&Ok(e,n)},"retry-load-board":()=>Is()});const dn=new Map,Jp=6e4,Nl=100;let Le=null,eo=null,to=null,Ts=null,em=!1;const Fk={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Uk={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},tm={api:null};let Ol={...tm};function Gk(e={}){Ol={...tm,...e},Le||(Le=document.createElement("div"),Le.className="issue-tooltip",Le.style.display="none",document.body.appendChild(Le),Le.addEventListener("mouseenter",()=>{clearTimeout(eo)}),Le.addEventListener("mouseleave",()=>{Hl()})),em||(document.addEventListener("mouseover",zk),document.addEventListener("mouseout",Vk),em=!0)}function zk(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Wk(t);if(n){if(n===Ts&&Le.style.display!=="none"){clearTimeout(eo);return}clearTimeout(to),to=setTimeout(()=>{Kk(t,n)},200)}}function Vk(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(to),eo=setTimeout(()=>{Hl()},150))}function Wk(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function Kk(e,t){Ts=t;const n=e.getBoundingClientRect();Le.style.left=`${n.left+window.scrollX}px`,Le.style.top=`${n.bottom+window.scrollY+8}px`,Le.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Le.style.display="block";try{const i=await Zk(t);if(Ts!==t)return;Xk(i)}catch{if(Ts!==t)return;Le.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Hl(){clearTimeout(to),clearTimeout(eo),Le&&(Le.style.display="none"),Ts=null}function Yk(){const e=Date.now();for(const[t,n]of dn.entries())e-n.timestamp>=Jp&&dn.delete(t)}async function Zk(e){dn.size>Nl/2&&Yk();const t=dn.get(e);if(t&&Date.now()-t.timestamp<Jp)return t.issue;if(!Ol.api)throw new Error("API not initialized");const n=await Ol.api.getIssueByIdentifier(e);if(dn.size>=Nl){const i=Array.from(dn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Nl/2);for(const[a]of s)dn.delete(a)}return dn.set(e,{issue:n,timestamp:Date.now()}),n}function Xk(e){const t=Fk[e.status]||"#6b7280",n=Uk[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Le.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Qk(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Jk(e.priority)}</span>
        </div>
    `}function Qk(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Jk(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function nm(){return!!document.querySelector(".description-inline-editor")}function Fl(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Ul(){var e;return Fl("issue-detail-view")?((e=_e())==null?void 0:e.id)??null:null}function Sn(e){return!!e&&Ul()===e}function eE(){He("issue:created",sE),He("issue:updated",aE),He("issue:deleted",oE),He("comment",cE),He("relation",uE),He("attestation",pE),He("activity",fE),He("project",gE),He("sprint",hE),He("document",dE),He("inbox",mE),He("connection:reconnected",vE),He("connection:unauthorized",nE),He("connection:forbidden",iE),He("connection:superseded",tE)}function tE(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function nE(){v.logout(),Mn(null),Ri(null),ks(),k("Your session has ended. Please sign in again.","warning")}function iE(){k("Live updates stopped: you no longer have access to this team.","error")}function sE(e){var s;const t=le(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Ke(a),T()==="issues"&&it()}else Ke([e,...t]),T()==="issues"&&it(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=At())==null?void 0:s.id)){const a=nt(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)vn([e,...a]),T()==="my-issues"&&Hi();else if(r>=0){const l=[...a];l[r]=e,vn(l),T()==="my-issues"&&Hi()}}T()==="board"?ql():T()==="sprints"?Ls():T()==="epics"&&ln(),Sn(e.parent_id)&&Tn(e.parent_id)}function aE(e){Ys(e);const t=le();t.some(s=>s.id===e.id)&&Ke(t.map(s=>s.id===e.id?e:s));const n=nt();n.some(s=>s.id===e.id)&&vn(n.map(s=>s.id===e.id?e:s));const i=ji();i.some(s=>s.id===e.id)&&zt(i.map(s=>s.id===e.id?e:s)),T()==="issues"?it():T()==="my-issues"?Hi():T()==="board"?ql():T()==="sprints"?Ls():T()==="epics"&&ln(),Sn(e.id)&&(nm()?dr(e):Tn(e.id))}function oE(e){$g(e.id),Ke(le().filter(n=>n.id!==e.id)),vn(nt().filter(n=>n.id!==e.id));const t=ji();t.some(n=>n.id===e.id)&&zt(t.filter(n=>n.id!==e.id)),T()==="issues"?it():T()==="my-issues"?(Hi(),zn({showLoading:!1})):T()==="board"?ql():T()==="sprints"?Ls():T()==="epics"&&ln(),k(`Issue ${e.identifier} deleted`,"info"),Sn(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),N("my-issues"))}const im=250,rE=1e3,fi=new Map;function Tn(e){nm()?dr():Gl(e,im)}function Gl(e,t){let n=fi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},fi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>lE(e),t))}async function lE(e){const t=fi.get(e);if(!t)return;if(t.timer=null,!Sn(e)){fi.delete(e);return}t.inFlight=!0;let n;try{n=await ne(e,!1,{refresh:!0})}finally{t.inFlight=!1}fi.get(e)===t&&(t.again?(t.again=!1,Gl(e,im)):n==="retry"?Gl(e,rE):fi.delete(e))}function cE(e){T()==="my-issues"&&zn({showLoading:!1}),Sn(e.issue_id)&&Tn(e.issue_id),e.document_id&&hu(e.document_id)}function dE(e,{type:t}={}){gu(),t==="deleted"?Jv(e.id,e.title):hu(e.id)}function uE(e){const t=Ul();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Tn(t)}function pE(e){T()==="approvals"&&kt(),Sn(e.issue_id)&&Tn(e.issue_id)}function mE(e,t){var n;e.recipient_user_id===((n=At())==null?void 0:n.id)&&(ai(),Qb(t==null?void 0:t.type,e),T()==="inbox"&&!tw(t==null?void 0:t.type,e)&&fs({background:!0}))}function fE(e){T()==="my-issues"&&zn({showLoading:!1}),Sn(e.issue_id)&&Tn(e.issue_id)}function gE(e,{type:t}){st().then(()=>{T()==="projects"&&ti()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function Ls(){const e=xy();e&&Fl("sprint-detail-view")?Jn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Fl("sprints-view")&&sn().catch(t=>console.error("Failed to reload sprints:",t))}function hE(e,{type:t}={}){_u(),T()==="sprints"?Ls():T()==="my-issues"&&Fi(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function vE(){const e=T();ai(),e==="issues"?jt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(Gn().catch(n=>console.error("Failed to resync my issues:",n)),Fi().catch(n=>console.error("Failed to resync sprint status:",n)),zn({showLoading:!1})):e==="board"?Is():e==="sprints"?Ls():e==="epics"?ln().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?st().then(()=>{T()==="projects"&&ti()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?gu():e==="approvals"?kt():e==="inbox"&&fs({background:!0});const t=Ul();t&&Tn(t)}const yE='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function sm(e){return Array.from(e.querySelectorAll(yE)).filter(t=>!t.closest(".hidden, [hidden]"))}function am(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function bE(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),am(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=sm(t);n&&n.focus()}}}function no(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),am(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=sm(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&no()});async function wE(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=V();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Z().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Ke([r,...le()]),it();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=le();d.some(u=>u.id===a)&&Ke(d.map(u=>u.id===a?c:u)),it(),st(),k("Issue created!","success")}catch(c){Ke(le().filter(d=>d.id!==a)),it(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}qb({beforeScrollRestore:ir,beforeNavigate:()=>{Dv(),_b(),Mu(null),Pn(null),Zc(null),no(),Hl()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Yp(e[1]),!0;if(e[0]==="issue"&&e[1])return ma(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(ma(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(AE(e[1]),!0):e[0]==="sprint"&&e[1]?(Ly(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Nu(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Xa(e.epicId,!1),!0):e.issueId?(ne(e.issueId,!1),!0):e.identifier?(ma(e.identifier),!0):e.documentId?(Se(e.documentId,!1),!0):e.sprintId?(Jn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Fr();e&&Z().some(t=>t.id===e)&&et(e)},issueNavigate:e=>ma(e),epicNavigate:e=>Yp(e)}),Pb({"my-issues":()=>{Fi(),Gn(),zn()},approvals:()=>{kt()},inbox:()=>{fs({focusFirst:!0})},issues:()=>{Zg(),th(),ih(),hd().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Js())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),ea())}}),bd().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}jt()})},query:()=>{ck()},epics:()=>{ln()},board:()=>{Is()},projects:()=>{st().then(ti)},sprints:()=>{sn()},rituals:()=>{Wy()},documents:()=>{$n()},team:()=>{ll(),op(),Pa()},settings:()=>{_l(),Dp(),jp(),ca()}});function $E(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||P()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>P())}function kE(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>Ou(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Sb());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Tb()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>Hu(a))})}function EE(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>mu("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>mu("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>fu());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Vv());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>tn())}function _E(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Cd())}function xE(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>nh());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Pg());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>qg()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const y=g.parentElement;y!=null&&y.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>ta("status-filter-dropdown")):y!=null&&y.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>ta("priority-filter-dropdown")):y!=null&&y.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>ta("label-filter-dropdown")):y!=null&&y.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>ta("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>na())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>ia())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(y=>{y.addEventListener("change",()=>Wo())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ko())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>sa())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>aa())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Ye());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>Ye());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>Ye());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>jt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>xd());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>wE(g))}function IE(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Yy(t.dataset.tab))})}function SE(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>sp());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Ui()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),N(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>yw());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>no());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>bE());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Ui())}ee({"navigate-to":(e,t)=>{N(t.view)},"set-current-project":(e,t,n)=>{et(n.value)},showCreateIssueModal:()=>Ui(),showCreateEpicModal:()=>gk(),"retry-load-epics":()=>ln(),showCreateProjectModal:()=>Pu(),showCreateDocumentModal:()=>yu(),showCreateTeamModal:()=>dp(),showEditTeamModal:()=>Dw(),showInviteModal:()=>rp(),showCreateApiKeyModal:()=>T$(),showCreateAgentModal:()=>fv(),resetOnboarding:()=>vp(),logout:()=>Bp(),navigateToProjects:()=>N("projects")});async function TE(){if(!v.getToken()){await Lp();return}try{const e=await v.getMe();Mn(e),await di()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){v.logout(),await Lp();return}console.error("Failed to load current user on boot:",e),ks(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{gg(),I$(),SE(),$E(),_E(),xE(),IE(),kE(),EE(),LE(),CE(),Gk({api:v}),eE(),await TE()});function LE(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Bf()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Df(n?"light":"dark")})}function CE(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Wu(i)}}})}async function AE(e){try{await Se(e,!1)}catch{N("documents",!1)}}document.addEventListener("keydown",bk({getCurrentView:T,getSelectedIndex:Vc,setSelectedIndex:Rn,viewIssue:ne,showEditIssueModal:Zd,showInlineDropdown:er,isInlineDropdownOpen:zi,isModalOpen:Qe,isCommandPaletteOpen:xn,isDetailViewActive:mi,beforeNavigate:ir})),document.addEventListener("keydown",wk({getCurrentView:T,getSelectedIndex:sg,setSelectedIndex:Wc,viewDocument:Se,showEditDocumentModal:bu,isModalOpen:Qe,isCommandPaletteOpen:xn,isDetailViewActive:mi})),document.addEventListener("keydown",kk({getCurrentView:T,getSelectedIndex:Kc,setSelectedIndex:Vs,viewIssue:ne,isModalOpen:Qe,isCommandPaletteOpen:xn,isDetailViewActive:mi})),document.addEventListener("keydown",$k({getCurrentView:T,getSelectedIndex:ag,setSelectedIndex:Ws,toggleInboxExpand:pw,collapseInboxExpand:sw,archiveInboxEntry:uw,isInlineDropdownOpen:zi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:Qe,isCommandPaletteOpen:xn,isDetailViewActive:mi})),document.addEventListener("keydown",Ek()),document.addEventListener("keydown",Zp({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&Jn(e.dataset.sprintId)},getCurrentView:T,getSelectedIndex:og,setSelectedIndex:Yc,isModalOpen:Qe,isCommandPaletteOpen:xn,isDetailViewActive:mi})),document.addEventListener("keydown",Zp({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Ku(e.dataset.identifier)},getCurrentView:T,getSelectedIndex:rg,setSelectedIndex:jo,isModalOpen:Qe,isCommandPaletteOpen:xn,isDetailViewActive:mi}));function om(){var e;N("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function BE(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||Iv()}document.addEventListener("keydown",vk({closeModal:P,closeSidebar:no,navigateTo:N,showCreateIssueModal:Ui,showKeyboardShortcutsHelp:qp,isModalOpen:Qe,focusSearch:om,isInlineDropdownOpen:zi,closeInlineDropdowns:Jf,isModalDirty:Xf,focusModalField:Fc,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),hn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:BE,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),q$([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>N("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>N("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>N("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>N("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>N("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>N("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>N("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>N("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>N("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>N("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>N("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>N("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{N("issues"),setTimeout(Ui,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{N("projects"),setTimeout(Pu,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{N("documents"),setTimeout(yu,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>dp(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:om,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{N("team"),setTimeout(rp,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>qp(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>vp(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Bp(),category:"Account"}]),document.addEventListener("keydown",yk({isModalOpen:Qe,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:xn,openCommandPalette:N$,closeCommandPalette:Ua})),window.marked=z,window.DOMPurify=Dc,console.log("Chaotic frontend loaded via Vite")})();
