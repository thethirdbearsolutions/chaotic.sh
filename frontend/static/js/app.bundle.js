var y0=Object.defineProperty;var w0=(Pt,qe,$n)=>qe in Pt?y0(Pt,qe,{enumerable:!0,configurable:!0,writable:!0,value:$n}):Pt[qe]=$n;var ie=(Pt,qe,$n)=>w0(Pt,typeof qe!="symbol"?qe+"":qe,$n);(function(){"use strict";var Vc;function Pt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var qe=Pt();function $n(e){qe=e}var qi={exec:()=>null};function X(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Ne.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Ne={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},yg=/^(?:[ \t]*(?:\n|$))+/,wg=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,$g=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ni=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,kg=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Fo=/(?:[*+-]|\d{1,9}[.)])/,rd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ld=X(rd).replace(/bull/g,Fo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Eg=X(rd).replace(/bull/g,Fo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Uo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,_g=/^[^\n]+/,Go=/(?!\s*\])(?:\\.|[^\[\]\\])+/,xg=X(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Go).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ig=X(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Fo).getRegex(),Zs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",zo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Sg=X("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",zo).replace("tag",Zs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),cd=X(Uo).replace("hr",Ni).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zs).getRegex(),Tg=X(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",cd).getRegex(),Vo={blockquote:Tg,code:wg,def:xg,fences:$g,heading:kg,hr:Ni,html:Sg,lheading:ld,list:Ig,newline:yg,paragraph:cd,table:qi,text:_g},dd=X("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ni).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zs).getRegex(),Lg={...Vo,lheading:Eg,table:dd,paragraph:X(Uo).replace("hr",Ni).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",dd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zs).getRegex()},Cg={...Vo,html:X(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",zo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:qi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:X(Uo).replace("hr",Ni).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ld).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ag=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Bg=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ud=/^( {2,}|\\)\n(?!\s*$)/,Dg=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Js=/[\p{P}\p{S}]/u,Wo=/[\s\p{P}\p{S}]/u,pd=/[^\s\p{P}\p{S}]/u,Mg=X(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Wo).getRegex(),md=/(?!~)[\p{P}\p{S}]/u,jg=/(?!~)[\s\p{P}\p{S}]/u,Rg=/(?:[^\s\p{P}\p{S}]|~)/u,Pg=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,fd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,qg=X(fd,"u").replace(/punct/g,Js).getRegex(),Ng=X(fd,"u").replace(/punct/g,md).getRegex(),gd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Og=X(gd,"gu").replace(/notPunctSpace/g,pd).replace(/punctSpace/g,Wo).replace(/punct/g,Js).getRegex(),Hg=X(gd,"gu").replace(/notPunctSpace/g,Rg).replace(/punctSpace/g,jg).replace(/punct/g,md).getRegex(),Fg=X("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pd).replace(/punctSpace/g,Wo).replace(/punct/g,Js).getRegex(),Ug=X(/\\(punct)/,"gu").replace(/punct/g,Js).getRegex(),Gg=X(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),zg=X(zo).replace("(?:-->|$)","-->").getRegex(),Vg=X("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",zg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ea=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Wg=X(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ea).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),hd=X(/^!?\[(label)\]\[(ref)\]/).replace("label",ea).replace("ref",Go).getRegex(),vd=X(/^!?\[(ref)\](?:\[\])?/).replace("ref",Go).getRegex(),Kg=X("reflink|nolink(?!\\()","g").replace("reflink",hd).replace("nolink",vd).getRegex(),Ko={_backpedal:qi,anyPunctuation:Ug,autolink:Gg,blockSkip:Pg,br:ud,code:Bg,del:qi,emStrongLDelim:qg,emStrongRDelimAst:Og,emStrongRDelimUnd:Fg,escape:Ag,link:Wg,nolink:vd,punctuation:Mg,reflink:hd,reflinkSearch:Kg,tag:Vg,text:Dg,url:qi},Yg={...Ko,link:X(/^!?\[(label)\]\((.*?)\)/).replace("label",ea).getRegex(),reflink:X(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ea).getRegex()},Yo={...Ko,emStrongRDelimAst:Hg,emStrongLDelim:Ng,url:X(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Qg={...Yo,br:X(ud).replace("{2,}","*").getRegex(),text:X(Yo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ta={normal:Vo,gfm:Lg,pedantic:Cg},Oi={normal:Ko,gfm:Yo,breaks:Qg,pedantic:Yg},Xg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bd=e=>Xg[e];function kt(e,t){if(t){if(Ne.escapeTest.test(e))return e.replace(Ne.escapeReplace,bd)}else if(Ne.escapeTestNoEncode.test(e))return e.replace(Ne.escapeReplaceNoEncode,bd);return e}function yd(e){try{e=encodeURI(e).replace(Ne.percentDecode,"%")}catch{return null}return e}function wd(e,t){var a;const n=e.replace(Ne.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Ne.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Ne.slashPipe,"|");return i}function Hi(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Zg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function $d(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Jg(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var na=class{constructor(e){ie(this,"options");ie(this,"rules");ie(this,"lexer");this.options=e||qe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Hi(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Jg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Hi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Hi(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Hi(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const g=m,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((m==null?void 0:m.type)==="list"){const g=m,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,i=i.substring(0,i.length-m.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),m=e.split(`
`,1)[0],g=!u.trim(),b=0;if(this.options.pedantic?(b=2,d=u.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=u.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(m)&&(c+=m+`
`,e=e.substring(m.length+1),l=!0),!l){const T=this.rules.other.nextBulletRegex(b),I=this.rules.other.hrRegex(b),A=this.rules.other.fencesBeginRegex(b),D=this.rules.other.headingBeginRegex(b),Z=this.rules.other.htmlBeginRegex(b);for(;e;){const _=e.split(`
`,1)[0];let P;if(m=_,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),P=m):P=m.replace(this.rules.other.tabCharGlobal,"    "),A.test(m)||D.test(m)||Z.test(m)||T.test(m)||I.test(m))break;if(P.search(this.rules.other.nonSpaceChar)>=b||!m.trim())d+=`
`+P.slice(b);else{if(g||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(u)||D.test(u)||I.test(u))break;d+=`
`+m}!g&&!m.trim()&&(g=!0),c+=_+`
`,e=e.substring(_.length+1),u=P.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,$;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&($=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:$,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=wd(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(wd(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Hi(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Zg(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),$d(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return $d(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,m=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}const g=m.slice(2,-2);return{type:"strong",raw:m,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},qt=class ad{constructor(t){ie(this,"tokens");ie(this,"options");ie(this,"state");ie(this,"tokenizer");ie(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||qe,this.options.tokenizer=this.options.tokenizer||new na,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Ne,block:ta.normal,inline:Oi.normal};this.options.pedantic?(n.block=ta.pedantic,n.inline=Oi.pedantic):this.options.gfm&&(n.block=ta.gfm,this.options.breaks?n.inline=Oi.breaks:n.inline=Oi.gfm),this.tokenizer.rules=n}static get rules(){return{block:ta,inline:Oi}}static lex(t,n){return new ad(n).lex(t)}static lexInline(t,n){return new ad(n).inlineTokens(t)}lex(t){t=t.replace(Ne.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Ne.tabCharGlobal,"    ").replace(Ne.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(m=>(d=m.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const m=n.at(-1);d.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let m=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(m=Math.min(m,b))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=d.raw,m.text+=d.text):n.push(d);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},ia=class{constructor(e){ie(this,"options");ie(this,"parser");this.options=e||qe}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Ne.notSpaceStart))==null?void 0:a[0],s=e.replace(Ne.endingNewline,"")+`
`;return i?'<pre><code class="language-'+kt(i)+'">'+(n?s:kt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:kt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+kt(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${kt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=yd(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+kt(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=yd(e);if(s===null)return kt(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${kt(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:kt(e.text)}},Qo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Nt=class od{constructor(t){ie(this,"options");ie(this,"renderer");ie(this,"textRenderer");this.options=t||qe,this.options.renderer=this.options.renderer||new ia,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Qo}static parse(t,n){return new od(n).parse(t)}static parseInline(t,n){return new od(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},sa=(Vc=class{constructor(e){ie(this,"options");ie(this,"block");this.options=e||qe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?qt.lex:qt.lexInline}provideParser(){return this.block?Nt.parse:Nt.parseInline}},ie(Vc,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Vc),eh=class{constructor(...e){ie(this,"defaults",Pt());ie(this,"options",this.setOptions);ie(this,"parse",this.parseMarkdown(!0));ie(this,"parseInline",this.parseMarkdown(!1));ie(this,"Parser",Nt);ie(this,"Renderer",ia);ie(this,"TextRenderer",Qo);ie(this,"Lexer",qt);ie(this,"Tokenizer",na);ie(this,"Hooks",sa);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new ia(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new na(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new sa;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];sa.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return qt.lex(e,t??this.defaults)}parser(e,t){return Nt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?qt.lex:qt.lexInline,l=a.hooks?a.hooks.provideParser():e?Nt.parse:Nt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+kt(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},kn=new eh;function Q(e,t){return kn.parse(e,t)}Q.options=Q.setOptions=function(e){return kn.setOptions(e),Q.defaults=kn.defaults,$n(Q.defaults),Q},Q.getDefaults=Pt,Q.defaults=qe,Q.use=function(...e){return kn.use(...e),Q.defaults=kn.defaults,$n(Q.defaults),Q},Q.walkTokens=function(e,t){return kn.walkTokens(e,t)},Q.parseInline=kn.parseInline,Q.Parser=Nt,Q.parser=Nt.parse,Q.Renderer=ia,Q.TextRenderer=Qo,Q.Lexer=qt,Q.lexer=qt.lex,Q.Tokenizer=na,Q.Hooks=sa,Q.parse=Q,Q.options,Q.setOptions,Q.use,Q.walkTokens,Q.parseInline,Nt.parse,qt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:kd,setPrototypeOf:Ed,isFrozen:th,getPrototypeOf:nh,getOwnPropertyDescriptor:ih}=Object;let{freeze:Oe,seal:at,create:Xo}=Object,{apply:Zo,construct:Jo}=typeof Reflect<"u"&&Reflect;Oe||(Oe=function(t){return t}),at||(at=function(t){return t}),Zo||(Zo=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Jo||(Jo=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const aa=Fe(Array.prototype.forEach),sh=Fe(Array.prototype.lastIndexOf),_d=Fe(Array.prototype.pop),Fi=Fe(Array.prototype.push),ah=Fe(Array.prototype.splice),oa=Fe(String.prototype.toLowerCase),er=Fe(String.prototype.toString),tr=Fe(String.prototype.match),Ui=Fe(String.prototype.replace),oh=Fe(String.prototype.indexOf),rh=Fe(String.prototype.trim),gt=Fe(Object.prototype.hasOwnProperty),He=Fe(RegExp.prototype.test),Gi=lh(TypeError);function Fe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Zo(e,t,i)}}function lh(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Jo(e,n)}}function U(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:oa;Ed&&Ed(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(th(t)||(t[i]=a),s=a)}e[s]=!0}return e}function ch(e){for(let t=0;t<e.length;t++)gt(e,t)||(e[t]=null);return e}function Et(e){const t=Xo(null);for(const[n,i]of kd(e))gt(e,n)&&(Array.isArray(i)?t[n]=ch(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Et(i):t[n]=i);return t}function zi(e,t){for(;e!==null;){const i=ih(e,t);if(i){if(i.get)return Fe(i.get);if(typeof i.value=="function")return Fe(i.value)}e=nh(e)}function n(){return null}return n}const xd=Oe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nr=Oe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ir=Oe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dh=Oe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),sr=Oe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),uh=Oe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Id=Oe(["#text"]),Sd=Oe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ar=Oe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Td=Oe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ra=Oe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ph=at(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mh=at(/<%[\w\W]*|[\w\W]*%>/gm),fh=at(/\$\{[\w\W]*/gm),gh=at(/^data-[\-\w.\u00B7-\uFFFF]+$/),hh=at(/^aria-[\-\w]+$/),Ld=at(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),vh=at(/^(?:\w+script|data):/i),bh=at(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Cd=at(/^html$/i),yh=at(/^[a-z][.\w]*(-[.\w]+)+$/i);var Ad=Object.freeze({__proto__:null,ARIA_ATTR:hh,ATTR_WHITESPACE:bh,CUSTOM_ELEMENT:yh,DATA_ATTR:gh,DOCTYPE_NAME:Cd,ERB_EXPR:mh,IS_ALLOWED_URI:Ld,IS_SCRIPT_OR_DATA:vh,MUSTACHE_EXPR:ph,TMPLIT_EXPR:fh});const Vi={element:1,text:3,progressingInstruction:7,comment:8,document:9},wh=function(){return typeof window>"u"?null:window},$h=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Bd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Dd(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wh();const t=j=>Dd(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Vi.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:g}=e,b=l.prototype,y=zi(b,"cloneNode"),$=zi(b,"remove"),T=zi(b,"nextSibling"),I=zi(b,"childNodes"),A=zi(b,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let D,Z="";const{implementation:_,createNodeIterator:P,createDocumentFragment:V,getElementsByTagName:K}=n,{importNode:me}=i;let x=Bd();t.isSupported=typeof kd=="function"&&typeof A=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:R,ERB_EXPR:M,TMPLIT_EXPR:ne,DATA_ATTR:Me,ARIA_ATTR:$e,IS_SCRIPT_OR_DATA:ke,ATTR_WHITESPACE:et,CUSTOM_ELEMENT:mt}=Ad;let{IS_ALLOWED_URI:je}=Ad,ue=null;const w=U({},[...xd,...nr,...ir,...sr,...Id]);let W=null;const Re=U({},[...Sd,...ar,...Td,...ra]);let ce=Object.seal(Xo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ft=null,Wc=null;const Ai=Object.seal(Xo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Jf=!0,Kc=!0,eg=!1,tg=!0,Bi=!1,jo=!0,Wn=!1,Yc=!1,Qc=!1,Di=!1,Ro=!1,Po=!1,ng=!0,ig=!1;const u0="user-content-";let Xc=!0,Qs=!1,Mi={},jt=null;const Zc=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let sg=null;const ag=U({},["audio","video","img","source","image","track"]);let Jc=null;const og=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),qo="http://www.w3.org/1998/Math/MathML",No="http://www.w3.org/2000/svg",Jt="http://www.w3.org/1999/xhtml";let ji=Jt,ed=!1,td=null;const p0=U({},[qo,No,Jt],er);let Oo=U({},["mi","mo","mn","ms","mtext"]),Ho=U({},["annotation-xml"]);const m0=U({},["title","style","font","a","script"]);let Xs=null;const f0=["application/xhtml+xml","text/html"],g0="text/html";let ye=null,Ri=null;const h0=n.createElement("form"),rg=function(h){return h instanceof RegExp||h instanceof Function},nd=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ri&&Ri===h)){if((!h||typeof h!="object")&&(h={}),h=Et(h),Xs=f0.indexOf(h.PARSER_MEDIA_TYPE)===-1?g0:h.PARSER_MEDIA_TYPE,ye=Xs==="application/xhtml+xml"?er:oa,ue=gt(h,"ALLOWED_TAGS")?U({},h.ALLOWED_TAGS,ye):w,W=gt(h,"ALLOWED_ATTR")?U({},h.ALLOWED_ATTR,ye):Re,td=gt(h,"ALLOWED_NAMESPACES")?U({},h.ALLOWED_NAMESPACES,er):p0,Jc=gt(h,"ADD_URI_SAFE_ATTR")?U(Et(og),h.ADD_URI_SAFE_ATTR,ye):og,sg=gt(h,"ADD_DATA_URI_TAGS")?U(Et(ag),h.ADD_DATA_URI_TAGS,ye):ag,jt=gt(h,"FORBID_CONTENTS")?U({},h.FORBID_CONTENTS,ye):Zc,ft=gt(h,"FORBID_TAGS")?U({},h.FORBID_TAGS,ye):Et({}),Wc=gt(h,"FORBID_ATTR")?U({},h.FORBID_ATTR,ye):Et({}),Mi=gt(h,"USE_PROFILES")?h.USE_PROFILES:!1,Jf=h.ALLOW_ARIA_ATTR!==!1,Kc=h.ALLOW_DATA_ATTR!==!1,eg=h.ALLOW_UNKNOWN_PROTOCOLS||!1,tg=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Bi=h.SAFE_FOR_TEMPLATES||!1,jo=h.SAFE_FOR_XML!==!1,Wn=h.WHOLE_DOCUMENT||!1,Di=h.RETURN_DOM||!1,Ro=h.RETURN_DOM_FRAGMENT||!1,Po=h.RETURN_TRUSTED_TYPE||!1,Qc=h.FORCE_BODY||!1,ng=h.SANITIZE_DOM!==!1,ig=h.SANITIZE_NAMED_PROPS||!1,Xc=h.KEEP_CONTENT!==!1,Qs=h.IN_PLACE||!1,je=h.ALLOWED_URI_REGEXP||Ld,ji=h.NAMESPACE||Jt,Oo=h.MATHML_TEXT_INTEGRATION_POINTS||Oo,Ho=h.HTML_INTEGRATION_POINTS||Ho,ce=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&rg(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ce.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&rg(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ce.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ce.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Bi&&(Kc=!1),Ro&&(Di=!0),Mi&&(ue=U({},Id),W=[],Mi.html===!0&&(U(ue,xd),U(W,Sd)),Mi.svg===!0&&(U(ue,nr),U(W,ar),U(W,ra)),Mi.svgFilters===!0&&(U(ue,ir),U(W,ar),U(W,ra)),Mi.mathMl===!0&&(U(ue,sr),U(W,Td),U(W,ra))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?Ai.tagCheck=h.ADD_TAGS:(ue===w&&(ue=Et(ue)),U(ue,h.ADD_TAGS,ye))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?Ai.attributeCheck=h.ADD_ATTR:(W===Re&&(W=Et(W)),U(W,h.ADD_ATTR,ye))),h.ADD_URI_SAFE_ATTR&&U(Jc,h.ADD_URI_SAFE_ATTR,ye),h.FORBID_CONTENTS&&(jt===Zc&&(jt=Et(jt)),U(jt,h.FORBID_CONTENTS,ye)),h.ADD_FORBID_CONTENTS&&(jt===Zc&&(jt=Et(jt)),U(jt,h.ADD_FORBID_CONTENTS,ye)),Xc&&(ue["#text"]=!0),Wn&&U(ue,["html","head","body"]),ue.table&&(U(ue,["tbody"]),delete ft.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw Gi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Gi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=h.TRUSTED_TYPES_POLICY,Z=D.createHTML("")}else D===void 0&&(D=$h(g,s)),D!==null&&typeof Z=="string"&&(Z=D.createHTML(""));Oe&&Oe(h),Ri=h}},lg=U({},[...nr,...ir,...dh]),cg=U({},[...sr,...uh]),v0=function(h){let S=A(h);(!S||!S.tagName)&&(S={namespaceURI:ji,tagName:"template"});const B=oa(h.tagName),de=oa(S.tagName);return td[h.namespaceURI]?h.namespaceURI===No?S.namespaceURI===Jt?B==="svg":S.namespaceURI===qo?B==="svg"&&(de==="annotation-xml"||Oo[de]):!!lg[B]:h.namespaceURI===qo?S.namespaceURI===Jt?B==="math":S.namespaceURI===No?B==="math"&&Ho[de]:!!cg[B]:h.namespaceURI===Jt?S.namespaceURI===No&&!Ho[de]||S.namespaceURI===qo&&!Oo[de]?!1:!cg[B]&&(m0[B]||!lg[B]):!!(Xs==="application/xhtml+xml"&&td[h.namespaceURI]):!1},Rt=function(h){Fi(t.removed,{element:h});try{A(h).removeChild(h)}catch{$(h)}},Kn=function(h,S){try{Fi(t.removed,{attribute:S.getAttributeNode(h),from:S})}catch{Fi(t.removed,{attribute:null,from:S})}if(S.removeAttribute(h),h==="is")if(Di||Ro)try{Rt(S)}catch{}else try{S.setAttribute(h,"")}catch{}},dg=function(h){let S=null,B=null;if(Qc)h="<remove></remove>"+h;else{const ge=tr(h,/^[\r\n\t ]+/);B=ge&&ge[0]}Xs==="application/xhtml+xml"&&ji===Jt&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");const de=D?D.createHTML(h):h;if(ji===Jt)try{S=new m().parseFromString(de,Xs)}catch{}if(!S||!S.documentElement){S=_.createDocument(ji,"template",null);try{S.documentElement.innerHTML=ed?Z:de}catch{}}const Pe=S.body||S.documentElement;return h&&B&&Pe.insertBefore(n.createTextNode(B),Pe.childNodes[0]||null),ji===Jt?K.call(S,Wn?"html":"body")[0]:Wn?S.documentElement:Pe},ug=function(h){return P.call(h.ownerDocument||h,h,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},id=function(h){return h instanceof u&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof d)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},pg=function(h){return typeof r=="function"&&h instanceof r};function en(j,h,S){aa(j,B=>{B.call(t,h,S,Ri)})}const mg=function(h){let S=null;if(en(x.beforeSanitizeElements,h,null),id(h))return Rt(h),!0;const B=ye(h.nodeName);if(en(x.uponSanitizeElement,h,{tagName:B,allowedTags:ue}),jo&&h.hasChildNodes()&&!pg(h.firstElementChild)&&He(/<[/\w!]/g,h.innerHTML)&&He(/<[/\w!]/g,h.textContent)||h.nodeType===Vi.progressingInstruction||jo&&h.nodeType===Vi.comment&&He(/<[/\w]/g,h.data))return Rt(h),!0;if(!(Ai.tagCheck instanceof Function&&Ai.tagCheck(B))&&(!ue[B]||ft[B])){if(!ft[B]&&gg(B)&&(ce.tagNameCheck instanceof RegExp&&He(ce.tagNameCheck,B)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(B)))return!1;if(Xc&&!jt[B]){const de=A(h)||h.parentNode,Pe=I(h)||h.childNodes;if(Pe&&de){const ge=Pe.length;for(let tt=ge-1;tt>=0;--tt){const tn=y(Pe[tt],!0);tn.__removalCount=(h.__removalCount||0)+1,de.insertBefore(tn,T(h))}}}return Rt(h),!0}return h instanceof l&&!v0(h)||(B==="noscript"||B==="noembed"||B==="noframes")&&He(/<\/no(script|embed|frames)/i,h.innerHTML)?(Rt(h),!0):(Bi&&h.nodeType===Vi.text&&(S=h.textContent,aa([R,M,ne],de=>{S=Ui(S,de," ")}),h.textContent!==S&&(Fi(t.removed,{element:h.cloneNode()}),h.textContent=S)),en(x.afterSanitizeElements,h,null),!1)},fg=function(h,S,B){if(ng&&(S==="id"||S==="name")&&(B in n||B in h0))return!1;if(!(Kc&&!Wc[S]&&He(Me,S))){if(!(Jf&&He($e,S))){if(!(Ai.attributeCheck instanceof Function&&Ai.attributeCheck(S,h))){if(!W[S]||Wc[S]){if(!(gg(h)&&(ce.tagNameCheck instanceof RegExp&&He(ce.tagNameCheck,h)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(h))&&(ce.attributeNameCheck instanceof RegExp&&He(ce.attributeNameCheck,S)||ce.attributeNameCheck instanceof Function&&ce.attributeNameCheck(S,h))||S==="is"&&ce.allowCustomizedBuiltInElements&&(ce.tagNameCheck instanceof RegExp&&He(ce.tagNameCheck,B)||ce.tagNameCheck instanceof Function&&ce.tagNameCheck(B))))return!1}else if(!Jc[S]){if(!He(je,Ui(B,et,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&h!=="script"&&oh(B,"data:")===0&&sg[h])){if(!(eg&&!He(ke,Ui(B,et,"")))){if(B)return!1}}}}}}}return!0},gg=function(h){return h!=="annotation-xml"&&tr(h,mt)},hg=function(h){en(x.beforeSanitizeAttributes,h,null);const{attributes:S}=h;if(!S||id(h))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:W,forceKeepAttr:void 0};let de=S.length;for(;de--;){const Pe=S[de],{name:ge,namespaceURI:tt,value:tn}=Pe,Pi=ye(ge),sd=tn;let Te=ge==="value"?sd:rh(sd);if(B.attrName=Pi,B.attrValue=Te,B.keepAttr=!0,B.forceKeepAttr=void 0,en(x.uponSanitizeAttribute,h,B),Te=B.attrValue,ig&&(Pi==="id"||Pi==="name")&&(Kn(ge,h),Te=u0+Te),jo&&He(/((--!?|])>)|<\/(style|title|textarea)/i,Te)){Kn(ge,h);continue}if(Pi==="attributename"&&tr(Te,"href")){Kn(ge,h);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){Kn(ge,h);continue}if(!tg&&He(/\/>/i,Te)){Kn(ge,h);continue}Bi&&aa([R,M,ne],bg=>{Te=Ui(Te,bg," ")});const vg=ye(h.nodeName);if(!fg(vg,Pi,Te)){Kn(ge,h);continue}if(D&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!tt)switch(g.getAttributeType(vg,Pi)){case"TrustedHTML":{Te=D.createHTML(Te);break}case"TrustedScriptURL":{Te=D.createScriptURL(Te);break}}if(Te!==sd)try{tt?h.setAttributeNS(tt,ge,Te):h.setAttribute(ge,Te),id(h)?Rt(h):_d(t.removed)}catch{Kn(ge,h)}}en(x.afterSanitizeAttributes,h,null)},b0=function j(h){let S=null;const B=ug(h);for(en(x.beforeSanitizeShadowDOM,h,null);S=B.nextNode();)en(x.uponSanitizeShadowNode,S,null),mg(S),hg(S),S.content instanceof a&&j(S.content);en(x.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,B=null,de=null,Pe=null;if(ed=!j,ed&&(j="<!-->"),typeof j!="string"&&!pg(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw Gi("dirty is not a string, aborting")}else throw Gi("toString is not a function");if(!t.isSupported)return j;if(Yc||nd(h),t.removed=[],typeof j=="string"&&(Qs=!1),Qs){if(j.nodeName){const tn=ye(j.nodeName);if(!ue[tn]||ft[tn])throw Gi("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof r)S=dg("<!---->"),B=S.ownerDocument.importNode(j,!0),B.nodeType===Vi.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?S=B:S.appendChild(B);else{if(!Di&&!Bi&&!Wn&&j.indexOf("<")===-1)return D&&Po?D.createHTML(j):j;if(S=dg(j),!S)return Di?null:Po?Z:""}S&&Qc&&Rt(S.firstChild);const ge=ug(Qs?j:S);for(;de=ge.nextNode();)mg(de),hg(de),de.content instanceof a&&b0(de.content);if(Qs)return j;if(Di){if(Ro)for(Pe=V.call(S.ownerDocument);S.firstChild;)Pe.appendChild(S.firstChild);else Pe=S;return(W.shadowroot||W.shadowrootmode)&&(Pe=me.call(i,Pe,!0)),Pe}let tt=Wn?S.outerHTML:S.innerHTML;return Wn&&ue["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&He(Cd,S.ownerDocument.doctype.name)&&(tt="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+tt),Bi&&aa([R,M,ne],tn=>{tt=Ui(tt,tn," ")}),D&&Po?D.createHTML(tt):tt},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};nd(j),Yc=!0},t.clearConfig=function(){Ri=null,Yc=!1},t.isValidAttribute=function(j,h,S){Ri||nd({});const B=ye(j),de=ye(h);return fg(B,de,S)},t.addHook=function(j,h){typeof h=="function"&&Fi(x[j],h)},t.removeHook=function(j,h){if(h!==void 0){const S=sh(x[j],h);return S===-1?void 0:ah(x[j],S,1)[0]}return _d(x[j])},t.removeHooks=function(j){x[j]=[]},t.removeAllHooks=function(){x=Bd()},t}var Md=Dd();const or="chaotic_";function Ye(e){try{return localStorage.getItem(or+e)}catch{return null}}function ot(e,t){try{localStorage.setItem(or+e,t)}catch{}}function _t(e){try{localStorage.removeItem(or+e)}catch{}}function rr(){return Ye("token")}function kh(e){e?ot("token",e):_t("token")}function Eh(){return Ye("theme")}function _h(e){ot("theme",e)}function jd(){return Ye("last_project")}function xh(e){ot("last_project",e)}function Ih(){return Ye("onboarding_complete")==="true"}function Sh(){ot("onboarding_complete","true")}function Th(){_t("onboarding_complete")}function Lh(e){return e?Ye(`issues_filters_${e}`):null}function Ch(e,t){e&&(t?ot(`issues_filters_${e}`,t):_t(`issues_filters_${e}`))}function Rd(e){return Ye(`comment_draft_${e}`)}function la(e,t){t?ot(`comment_draft_${e}`,t):_t(`comment_draft_${e}`)}function Pd(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function ca(e){const t=Ye(`description_draft_${e}`);if(!t)return null;const n=Pd(t);return n?n.draft:t}function qd(e){const t=Ye(`description_draft_${e}`);if(!t)return null;const n=Pd(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function En(e,t,n=""){t?ot(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):_t(`description_draft_${e}`)}function Nd(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Od(e){var n;const t=Ye(`document_draft_${e}`);return t?((n=Nd(t))==null?void 0:n.draft)??null:null}function Ah(e){const t=Ye(`document_draft_${e}`);if(!t)return null;const n=Nd(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function da(e,t,n=null){t&&(t.title||t.content||t.icon)?ot(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):_t(`document_draft_${e}`)}function Bh(){return{title:Ye("create_issue_title"),description:Ye("create_issue_description")}}function Hd(e,t){e?ot("create_issue_title",e):_t("create_issue_title"),t?ot("create_issue_description",t):_t("create_issue_description")}function Dh(){_t("create_issue_title"),_t("create_issue_description")}function Mh(){return Ye("doc_view_mode")}function jh(e){ot("doc_view_mode",e)}function Rh(){return Ye("approvals_explainer_dismissed")==="1"}function Ph(){ot("approvals_explainer_dismissed","1")}const qh="chaotic-boot-cache",lr="snapshot",cr="last",Fd=1,Nh=336*60*60*1e3,Oh=250;let _n=null;function Hh(){return _n||(_n=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(qh,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(lr),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),_n=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),_n.catch(()=>{_n=null}),_n)}function dr(e,t){return Hh().then(n=>new Promise((i,s)=>{const a=n.transaction(lr,e),o=t(a.objectStore(lr));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function Ud(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function Fh(e){if(!e)return Promise.resolve(null);const t=dr("readonly",i=>i.get(cr)).then(i=>!i||i.version!==Fd||i.userId!==e||!(Date.now()-i.savedAt<Nh)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),Oh));return Promise.race([t,n])}function Uh(e,t){if(!e)return Promise.resolve();const n={...t,version:Fd,userId:e,savedAt:Date.now()};return dr("readwrite",i=>i.put(n,cr)).then(()=>{},()=>{})}function ur(){return dr("readwrite",e=>e.delete(cr)).then(()=>{},()=>{})}const Gh="/api";class zh{constructor(){this.token=rr()}setToken(t){this.token=t,kh(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Gh}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),ur()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const v=new zh;let Yn=null;const Vh='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Qn=null,Wi=!1;function pr(){Wi=!0}function Wh(){Wi=!1}function Gd(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function Kh(){if(Wi)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function G(){Qn=document.activeElement,Wi=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function H(){var e;Ot(),Wi=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Qn&&document.contains(Qn)&&typeof Qn.focus=="function"&&Qn.focus(),Qn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(Vh);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function nt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))}),i}function mr(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=k(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Yh(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=Yh(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function Ot(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Yn&&(document.removeEventListener("keydown",Yn),Yn=null)}function Qh(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Ot(),t&&nt()&&Gd()}function Ki(e){Yn&&document.removeEventListener("keydown",Yn),Yn=e,e&&document.addEventListener("keydown",e)}function Yi(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Ot(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Ee(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ue(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function it(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function se(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Xh(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function rt(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function xt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function Zh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function nn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Zh(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${f(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function fr(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function Xn(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${f(n)}</span>`}return fr(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let ae={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const gr=new Set;function pe(e,t){if(typeof e=="string"){const n=ae[e];ae[e]=t,zd(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=ae[i];ae[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{zd(i,s,a)})}}function lt(e){return gr.add(e),()=>gr.delete(e)}function zd(e,t,n){t!==n&&gr.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const _e=()=>ae.currentUser,Ht=e=>pe("currentUser",e),C=()=>ae.currentView,Qi=e=>pe("currentView",e),ee=()=>ae.issues,Qe=e=>pe("issues",e),Xi=()=>ae.detailNavContext,It=e=>pe("detailNavContext",e),hr=()=>ae.labels,Zi=e=>pe("labels",e),Vd=()=>ae.activeFilterCategory,Jh=e=>pe("activeFilterCategory",e),Wd=()=>ae.selectedIssueIndex,xn=e=>pe("selectedIssueIndex",e),ev=()=>ae.selectedDocIndex,Kd=e=>pe("selectedDocIndex",e),Yd=()=>ae.selectedBoardIndex,ua=e=>pe("selectedBoardIndex",e),tv=()=>ae.selectedInboxIndex,pa=e=>pe("selectedInboxIndex",e),nv=()=>ae.selectedSprintIndex,Qd=e=>pe("selectedSprintIndex",e),iv=()=>ae.selectedEpicIndex,vr=e=>pe("selectedEpicIndex",e),sv=()=>ae.pendingGates,av=e=>pe("pendingGates",e),he=()=>ae.inboxEntries,Ft=e=>pe("inboxEntries",e),ma=()=>ae.inboxUnreadCount,Ji=e=>pe("inboxUnreadCount",e),ov=()=>ae.searchDebounceTimer,rv=e=>pe("searchDebounceTimer",e),lv=()=>ae.websocket,br=e=>pe("websocket",e),L=()=>ae.currentTeam,Zn=e=>pe("currentTeam",e),Y=()=>ae.currentProject,ct=e=>pe("currentProject",e||null),xe=()=>ae.currentDetailIssue,Jn=e=>pe("currentDetailIssue",e),cv=()=>ae.currentDetailSprints,Xd=e=>pe("currentDetailSprints",e),yr={};function te(e){Object.assign(yr,e)}function dv(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=yr[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Zd=!1;function uv(){if(!Zd){Zd=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,dv);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=yr[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const wr=["backlog","todo","in_progress","in_review","done","canceled"],es=["backlog","todo","in_progress","in_review"],Jd=["urgent","high","medium","low","no_priority"],$r=["no_priority","urgent","high","medium","low"],eu=["backlog","todo","in_progress","in_review","done"],fa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function F({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${f(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${f(t)}</h3>
            <p>${f(n)}</p>
            ${a}
        </div>
    `}const q={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},tu=24,Xe=new Map,fe=new Map,ht=new Map;let Ut=null;function pv(e){return Array.isArray(e)?[...e].map(String).sort():e}function nu(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,pv(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function ga(e,t){for(fe.delete(e),fe.set(e,t);fe.size>tu;){const n=fe.keys().next().value;fe.delete(n)}iu()}function iu(){if(Xe.size===0)return;const e=new Set;fe.forEach(t=>t.ids.forEach(n=>e.add(n))),Xe.forEach((t,n)=>{e.has(n)||Xe.delete(n)})}function mv(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function su(e){const t=fe.get(e);return t?(ga(e,t),t.ids.map(n=>Xe.get(n)).filter(Boolean)):null}function kr(e){return Xe.get(e)}function fv(e){var t;return((t=fe.get(e))==null?void 0:t.meta)||{}}function au(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function Er(e){const t=Xe.get(e.id);if(!au(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){Xe.set(e.id,{...e,description:t.description});return}Xe.set(e.id,e)}}const _r=new Set;function gv(e){return _r.add(e),()=>_r.delete(e)}function ou(e,t,n){if(!Array.isArray(t))return;const i=mv(t);i.forEach(Er);const s=fe.get(e);ga(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),_r.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function hv(e,t){const n=fe.get(e);n&&(n.meta=t)}function ha(e){e!=null&&e.id&&Xe.has(e.id)&&Er(e)}function vv(e){fe.delete(e),ht.forEach((t,n)=>{t===e&&ht.delete(n)}),Ut===e&&(Ut=null),iu()}function bv(e){Xe.delete(e),fe.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function va(e){Ut=e}function yv(){return Ut}function ru(e,t){for(ht.delete(e),ht.set(e,t);ht.size>tu;)ht.delete(ht.keys().next().value)}function wv(e){const t=ht.get(e);return t&&fe.has(t)?t:null}function $v({maxQueries:e=3}={}){const t=[...fe.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>Xe.get(s)).filter(Boolean),views:[...ht.entries()].filter(([,s])=>n.has(s))}}function kv(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{fe.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&Er(t.get(s))}),ga(n,{ids:i.ids.filter(s=>Xe.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!ht.has(n)&&fe.has(i)&&ru(n,i)})}function lu(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function cu(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(lu(e[n])!==lu(t[n]))return!1;return!0}const du=["status","priority"],uu=["assignee_id","sprint_id","issue_type"],Ev={assignee_id:"unassigned",sprint_id:"no_sprint"},_v=["scope","project_id","sort_by","order","limit"],In=e=>(e||[]).map(t=>String(t).toLowerCase());function xv(e,t){if(e.search||t.search||t.sort_by==="random"||_v.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of du)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of uu)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=In(e.label);if(!In(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=In(t.exclude_label);if(!In(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function pu(e){const t=e.label===void 0?null:In(e.label),n=e.exclude_label===void 0?null:In(e.exclude_label);return i=>{for(const s of du)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of uu){if(e[s]===void 0)continue;const a=e[s]===Ev[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=In((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function Iv(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(nu(e)));let n=null,i=null;if(fe.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}xv(c,t)&&(n=r,i=l)}),!n)return null;ga(i,n);const s=pu(t),a=n.ids.map(r=>Xe.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function Sv(){Xe.clear(),fe.clear(),ht.clear(),Ut=null}lt((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Sv();return}if(e!=="issues"||Ut===null||!fe.has(Ut)||C()!=="issues")return;const i=fe.get(Ut);ou(Ut,ee(),i.meta)});let xr=[];function Tv(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Lv(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function ts(e,t){const n=e().map(Tv),i=t().map(Lv);xr=[...n,...i]}function Gt(e){return e&&xr.find(t=>t.id===e)||null}function zt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function ba(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function ns({includeIdle:e=!1,keepId:t=null}={}){const n=xr.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),a=n.filter(b=>b.is_agent),o=new Set(a.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&o.has(b.registered_by_id),c=new Map,d=new Map;a.forEach(b=>{const[y,$]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has($)||y.set($,[]),y.get($).push(b)});const u=[],m=(b,y)=>{u.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(T=>u.push({assignee:T,indent:2}))};return i.forEach(b=>{u.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>m(y,!0))}),a.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>m(b,!1)),u}function ei({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ns({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${p(s.id)}">${ba(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function Cv(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&Gt(e)&&ei({keepId:e}),t.value=e}let St=[],Ir=[],ya=-1,Sr=null;const mu=5,Av=new Set(["done","canceled"]),fu=new Set;function Bv(){return ya}function Dv(e){ya=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;Sr=(t==null?void 0:t.dataset.issueId)??null}const gu=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function hu(e){const t=new Set(gu.map(s=>s.status)),n=gu.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}lt(e=>{e==="currentProject"&&C()==="my-issues"&&(ti(),is(),ni())});function Ze(){return St}function Sn(e){St=e}let Tr=0;async function ti(){var a;const e=L(),t=_e();if(!e||!t)return;const n=++Tr,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=Y();jv();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),n!==Tr)return;St=hu(r).flatMap(l=>l.issues),C()==="my-issues"&&It(St),Tn()}catch(o){if(n!==Tr)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=F({icon:q.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",o)}}async function ni({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=Y();Ir=await v.getTeamActivities(t.id,0,10,{projectId:i}),Mv()}catch{n&&(n.innerHTML=F({icon:q.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function Mv(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Ir.length){e.innerHTML=F({icon:q.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Ir.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${s} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);const i=Yr(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Kr(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Qr(t)}${n}</span>
                <span class="activity-actor">by ${f(i)}</span>
                <time class="activity-time" datetime="${p(t.created_at||"")}">${rt(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function jv(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function vu(){ti()}function Tn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=hu(St);St=t.flatMap(l=>l.issues),C()==="my-issues"&&It(St),ya=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=St.length?String(St.length):""),St.length===0){e.innerHTML=F({icon:q.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=Av.has(l.status)&&!fu.has(l.status)&&l.issues.length>mu,d=c?l.issues.slice(0,mu):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${f(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(u=>di(u)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(Sr){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===Sr);c!==-1&&(l[c].classList.add("keyboard-selected"),ya=c)}}let Lr=0;async function is(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Lr,n=Y(),i=J(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await v.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await v.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Lr)return;Rv(o)}catch(a){if(t!==Lr)return;console.error("Failed to load sprint status:",a),e.innerHTML=F({icon:q.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function Rv(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},m=Object.values(u).reduce((g,b)=>g+b,0);return`
                    <div class="sprint-status-card ${d}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${f(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${c?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${f(s.name)}</div>
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
                        ${m>0?`
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${n.filter(g=>u[g]).map(g=>{const b=Math.round(u[g]/m*100);return`<div class="sprint-stacked-segment status-${g}" style="width: ${b}%" title="${Ee(g)}: ${u[g]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(g=>u[g]).map(g=>`<span class="sprint-count-label status-${g}">${u[g]} ${Ee(g)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}te({"filter-my-issues":()=>vu(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Pl(t.identifier)},"retry-load-my-issues":()=>ti(),"dash-show-all":(e,t)=>{fu.add(t.status),Tn()},"retry-load-sprint-status":()=>is()});const bu=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function ss(e=null){const t=e||Y()||"";Du([]);const n=J().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${f(o.name)}</option>
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
                        ${Ce("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${vt("no_priority")}
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
                                ${bu.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,G(),_a();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Bh();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Hd(i.value,s.value)}),s.addEventListener("input",()=>{Hd(i.value,s.value)}),i.focus()}function Pv(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function qv(e){const t=bu.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function yu(e,t){const n=J().find(i=>i.id===t);Du([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?f(n.name):"Project"}</span>
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
                        ${Ce("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${vt("no_priority")}
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
    `,G(),_a(),document.getElementById("create-issue-title").focus()}async function Nv(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Bu(),parent_id:e});H(),k(`Created sub-issue ${d.identifier}`,"success"),oe(e)}catch(d){E("create sub-issue",d)}}async function Ov(e,t,n){var o,r;Ot();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${eu.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(Ee(c))}">
                    ${Ce(c)}
                    <span>${Ee(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${$r.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Ue(c))}">
                    ${vt(c)}
                    <span>${Ue(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(xt(c))}">
                    <span class="issue-type-badge type-${c}">${xt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=hr(),c=!1;if(l.length===0)try{l=await v.getLabels(L().id),Zi(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Dr(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Yi(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=ns({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const m=zt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(m)}">
                    ${nn(d,"avatar-small")}
                    <span>${ba(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=vi(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const m=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${m===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(m)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${f(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await v.getSprints(c)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(m=>`
                        <button class="dropdown-option ${m.id===l?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(m.id)}" data-label="${p(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${f(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Yi(a)}function Hv(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Fv(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,pr();const i=f(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Ce(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${vt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${xt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Ot(),s==null||s.focus()}async function wu({keepOpen:e=!1}={}){var y,$;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,u=($=document.getElementById("create-issue-due-date"))==null?void 0:$.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const T=await v.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Bu(),due_date:m});k(`Created ${T.identifier}`,"success"),Dh(),C()==="issues"?Lt():C()==="my-issues"&&ti(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",Wh(),document.getElementById("create-issue-title").focus()):(H(),oe(T.id))}catch(T){E("create issue",T)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function Uv(){await wu({keepOpen:!1})}async function Gv(){await wu({keepOpen:!0})}te({"toggle-create-dropdown":(e,t,n)=>{Ov(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Fv(t.field,t.value,t.label)},"create-issue-submit":()=>{Uv()},"create-issue-and-new":()=>{Gv()},"update-create-project":()=>{Hv()},"apply-template":e=>{qv(e.target.value)},"toggle-create-options":()=>{Pv()},"create-sub-issue-submit":(e,t)=>{Nv(t.parentId,t.projectId)}});function as(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&(k(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(zv(n,e.project_id),t=!0),t}function zv(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
        <div class="parent-prompt">
            <p>${f(e.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${p(e.id)}" data-project-id="${p(t||"")}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${p(e.id)}" data-identifier="${p(e.identifier)}">Close ${f(e.identifier)}</button>
            </div>
        </div>
    `,G())}async function Vv(e,t){try{const n=await v.updateIssue(e,{status:"done"});H(),k(`${t} closed`,"success"),as(n)}catch(n){E(`close ${t}`,n)}}te({"parent-prompt-dismiss":()=>H(),"parent-prompt-close":(e,t)=>Vv(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{H(),yu(t.parentId,t.projectId)}});function sn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Ln(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Cn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function An(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function wa(){const e=document.getElementById("group-by-select");return e?e.value:""}const $u=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Cr=["done","canceled"],Wv=es,Kv="all";function ku(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function ii(e=sn()){return e.length===0?"all":ku(e,es)?"open":ku(e,Cr)?"closed":null}function Eu(e){var t,n,i;switch(e){case"project":return Y()?1:0;case"status":{const s=ii();return s==="all"?0:s?1:sn().length}case"priority":return Ln().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Cn().length;case"exclude_labels":return An().length;default:return 0}}function Ar(){let e=0;return $u.forEach(t=>{e+=Eu(t.key)}),e}function _u(){var b,y,$,T,I,A;const e=new URLSearchParams,t=sn(),n=Ln(),i=Cn(),s=An(),a=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,o=Y()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=($=document.getElementById("issue-type-filter"))==null?void 0:$.value,c=(T=document.getElementById("group-by-select"))==null?void 0:T.value,d=(I=document.getElementById("sort-by-select"))==null?void 0:I.value,u=ii(t);u==="all"?e.append("status",Kv):u!=="open"&&t.forEach(D=>e.append("status",D)),n.forEach(D=>e.append("priority",D)),i.forEach(D=>e.append("label",D)),s.forEach(D=>e.append("exclude_label",D)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const m=e.toString(),g=m?`/issues?${m}`:"/issues";history.replaceState({view:"issues"},"",g),Ch((A=L())==null?void 0:A.id,m)}function Yv(e){var y;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some($=>t.has($))){const $=Lh((y=L())==null?void 0:y.id);if($){t=new URLSearchParams($);const T=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",T)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const $=s.length>0?s:Wv;a.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=$.includes(I.value)}),a.dataset.statusApplied="true",xu()}const o=t.getAll("priority");if(o.length>0){const $=document.getElementById("priority-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=o.includes(I.value)}),Iu())}const r=t.get("assignee");r&&Cv(r);const l=t.get("project");l&&(e(!0),ct(l),e(!1));const c=t.get("sprint");if(c){const $=document.getElementById("sprint-filter");$&&($.value=c)}const d=t.get("issue_type");if(d){const $=document.getElementById("issue-type-filter");$&&($.value=d)}const u=t.getAll("label");if(u.length>0){const $=document.getElementById("label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=u.includes(I.value)}),$a())}const m=t.getAll("exclude_label");if(m.length>0){const $=document.getElementById("exclude-label-filter-dropdown");$&&($.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=m.includes(I.value)}),ka())}const g=t.get("groupBy");if(g){const $=document.getElementById("group-by-select");$&&($.value=g)}const b=t.get("sort");if(b){const $=document.getElementById("sort-by-select");$&&($.value=b)}}function xu(){const e=sn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=ii(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Ee(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Iu(){const e=Ln(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ue(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function $a(){var i,s;const e=Cn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function ka(){var i,s;const e=An(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Su(){if(!L())return;let e;try{e=await v.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Tu("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Tu("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Tu(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${se(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${f(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}const Lu=wr,Qv=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let Tt=[],Cu=Promise.resolve();const Xv={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Ea(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Zv={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Au(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function si(){return!!document.querySelector(".inline-dropdown")}function Bu(){return Tt}function Du(e){Tt=e}async function Br(e,t,n,i){var u,m,g,b;e.preventDefault(),Ot();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Lu.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${y}">
                    ${Ce(y)}
                    <span>${Ee(y)}</span>
                    <span class="dropdown-shortcut">${$+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${$r.map((y,$)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${y}">
                    ${vt(y)}
                    <span>${Ue(y)}</span>
                    <span class="dropdown-shortcut">${$}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Qv.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${xt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=xe(),$=ee().find(I=>I.id===n)||Ze().find(I=>I.id===n)||((y==null?void 0:y.id)===n?y:null),T=ns({keepId:($==null?void 0:$.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${T.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:T.map(({assignee:I,indent:A},D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(I.id)}">
                    ${nn(I,"avatar-small")}
                    <span>${ba(I,A)}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),$=(y==null?void 0:y.dataset.projectId)||((u=xe())==null?void 0:u.project_id),T=vi($);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${T.map((I,A)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${I.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${A<9?`<span class="dropdown-shortcut">${A}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=ee(),$=Ze(),T=xe(),I=y.find(R=>R.id===n)||$.find(R=>R.id===n)||T,A=new Set(((I==null?void 0:I.labels)||[]).map(R=>R.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const D=o.getBoundingClientRect();let Z=a.bottom+4,_=a.left;_+D.width>window.innerWidth-8&&(_=a.right-D.width),Z+D.height>window.innerHeight-8&&(Z=a.top-D.height-4),o.style.top=`${Z}px`,o.style.left=`${Math.max(8,_)}px`,Yi(o,{multiSelect:!0});let P=[];const V=L();if(V)try{P=await v.getLabels(V.id)}catch(R){console.error("Failed to load labels:",R)}if(!o.parentNode)return;ju(o,n,P,A);const K=o.getBoundingClientRect();let me=a.bottom+4,x=a.left;x+K.width>window.innerWidth-8&&(x=a.right-K.width),me+K.height>window.innerHeight-8&&(me=a.top-K.height-4),o.style.top=`${me}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=ee(),$=Ze(),T=xe(),I=y.find(M=>M.id===n)||$.find(M=>M.id===n)||T,A=(I==null?void 0:I.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const D=o.getBoundingClientRect();let Z=a.bottom+4,_=a.left;_+D.width>window.innerWidth-8&&(_=a.right-D.width),Z+D.height>window.innerHeight-8&&(Z=a.top-D.height-4),o.style.top=`${Z}px`,o.style.left=`${Math.max(8,_)}px`,Yi(o);let P=[];if(A)try{P=await v.getSprints(A),Yw(A,P)}catch(M){console.error("Failed to load sprints:",M)}if(!o.parentNode)return;const V=P.filter(M=>M.status!=="completed"||M.id===(I==null?void 0:I.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${V.map((M,ne)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(M.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${f(M.name)}${M.status==="active"?" (Active)":""}</span>
                    ${ne<9?`<span class="dropdown-shortcut">${ne+1}</span>`:""}
                </button>
            `).join("")}
        `;const K=o.getBoundingClientRect();let me=a.bottom+4,x=a.left;x+K.width>window.innerWidth-8&&(x=a.right-K.width),me+K.height>window.innerHeight-8&&(me=a.top-K.height-4),o.style.top=`${me}px`,o.style.left=`${Math.max(8,x)}px`,o.classList.remove("dropdown-positioning");const R=M=>{const ne=M.key;if(ne==="Escape"||ne==="Tab"){Ot(),document.removeEventListener("keydown",R),Ki(null);return}if(Au(M,o))return;const Me=parseInt(ne);if(isNaN(Me))return;const $e=o.querySelectorAll(".dropdown-option");let ke=!1;Me===0?(ai(n,"sprint_id",null),ke=!0):Me>=1&&Me<$e.length&&($e[Me].click(),ke=!0),ke&&(document.removeEventListener("keydown",R),Ki(null))};Ki(R),document.addEventListener("keydown",R),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const $=y.key;if($==="Escape"||$==="Tab"){Ot(),document.removeEventListener("keydown",d);return}if(Au(y,o))return;const T=parseInt($);if(isNaN(T))return;let I=!1;if(t==="status"&&T>=1&&T<=6)ai(n,"status",Lu[T-1]),I=!0;else if(t==="priority"&&T>=0&&T<=4)ai(n,"priority",$r[T]),I=!0;else if(t==="estimate"){const A=xe(),D=vi(A==null?void 0:A.project_id);T>=0&&T<D.length&&(ai(n,"estimate",D[T].value),I=!0)}I&&(document.removeEventListener("keydown",d),Ki(null))};Ki(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),Yi(o)}function Jv(e,t,n,i){Br(e,t,n,i)}function eb(e,t,n){Cu=Cu.then(()=>Mu(e,t,n))}async function Mu(e,t,n){const i=ee(),s=Ze(),a=xe(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await v.updateIssue(e,{label_ids:c}),u=d.labels||[],m=I=>({...I,labels:u,updated_at:d.updated_at??I.updated_at}),g=ee();g.some(I=>I.id===e)&&Qe(g.map(I=>I.id===e?m(I):I));const b=Ze();b.some(I=>I.id===e)&&Sn(b.map(I=>I.id===e?m(I):I));const y=xe();(y==null?void 0:y.id)===e&&Jn(m(y));const $=Ea(e);if($&&$.parentNode){const I=ee().find(A=>A.id===e)||Ze().find(A=>A.id===e);I&&($.outerHTML=di(I))}const T=document.querySelector(".property-labels-btn");T&&(T.innerHTML=u.length>0?u.map(I=>`
                    <span class="issue-label" style="background: ${se(I.color)}20; color: ${se(I.color)}">${f(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function ju(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${se(s.color)}20; color: ${se(s.color)}">${f(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Ru(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=L();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await v.createLabel(i.id,{name:s}),o=await v.getLabels(i.id);Zi(o),a!=null&&a.id&&await Mu(e,a.id,null);const r=ee(),l=Ze(),c=xe(),d=r.find(m=>m.id===e)||l.find(m=>m.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(m=>m.id));t&&ju(t,e,o,u),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function _a(){const e=document.getElementById("create-issue-labels-label");e&&(Tt.length===0?e.textContent="Labels":e.textContent=`Labels (${Tt.length})`)}function Dr(e,{failed:t=!1}={}){const n=hr();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=Tt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${se(i.color)}20; color: ${se(i.color)}">${f(i.name)}</span>
                </button>
            `}).join("")}
    `}function tb(e){const t=Tt.indexOf(e);t>=0?Tt.splice(t,1):Tt.push(e),pr(),_a();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Dr(n)}async function Pu(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await v.createLabel(e.id,{name:i}),a=await v.getLabels(e.id);Zi(a),s!=null&&s.id&&!Tt.includes(s.id)&&(Tt.push(s.id),pr()),_a(),t&&Dr(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ai(e,t,n){var r;Ot();const i=ab(e,t,n),s=lb(e,t),a=(r=kr(e))==null?void 0:r[t],o=Nu(e,t,()=>n);o&&Mr(e,t,{focus:!0});try{const l={};l[t]=n;const c=await v.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(as(c),qu(e,t,i)){const d={...c,...rb(e,t)};cb(e,{issue:d,myIssue:d,detail:d}),ha(d),Mr(e,t,{focus:!o})}}catch(l){if(E("update issue",l),qu(e,t,i)){Nu(e,t,(d,u)=>d[t]===n?s[u]:d[t]);const c=kr(e);c&&c[t]===n&&ha({...c,[t]:a}),Mr(e,t,{focus:!1})}return}finally{ob(e,t,i)}if(k("Issue updated","success"),t==="status")try{const l=Y();if(l){const d=(await v.getSprints(l)).find(u=>u.status==="active");jr(d||null)}}catch{}}const nb=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),an=new Map;function ib(e){const t=e&&an.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let sb=0;function ab(e,t,n){const i=++sb;return an.has(e)||an.set(e,new Map),an.get(e).set(t,{seq:i,value:n}),i}function qu(e,t,n){var i,s;return((s=(i=an.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function ob(e,t,n){var s;const i=an.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&an.delete(e))}function rb(e,t){var i;const n={};return(i=an.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function lb(e,t){var i,s;const n=xe();return{issue:(i=ee().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ze().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function Nu(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=ee();a.some(l=>l.id===e)&&(s=!0,Qe(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Ze();o.some(l=>l.id===e)&&(s=!0,Sn(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=xe();return(r==null?void 0:r.id)===e&&(s=!0,Jn(i(r,"detail"))),s}function cb(e,t){var s;const n=ee();t.issue&&n.some(a=>a.id===e)&&Qe(n.map(a=>a.id===e?t.issue:a));const i=Ze();t.myIssue&&i.some(a=>a.id===e)&&Sn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=xe())==null?void 0:s.id)===e&&Jn(t.detail)}function db(e){return e==="estimate"||Xv[wa()]===e}function ub(e,t,n,{focus:i}){var d;const s=Ea(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&db(t)&&ee().some(u=>u.id===e))dt();else if(t==="status"&&s.closest("#my-issues-list"))Tn();else{const u=s.classList.contains("keyboard-selected");s.outerHTML=di(n),u&&((d=Ea(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Ea(e),l=Zv[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Mr(e,t,{focus:n}){const i=ee().find(a=>a.id===e)||Ze().find(a=>a.id===e);i&&ha(i),ub(e,t,i,{focus:n});const s=xe();(s==null?void 0:s.id)===e&&nb.has(t)&&pb(t,s)}function pb(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Ce(t.status)}
            <span>${Ee(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${vt(t.priority)}
            <span>${Ue(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${xt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?Gt(t.assignee_id):null,c=l?zt(l):null;r.innerHTML=c?`${nn(l,"avatar-small")}<span>${f(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=cv(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?f(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${io(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}te({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ai(t.issueId,i,n==="null"?null:Number(n)):ai(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),eb(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Ru(t.issueId)},"toggle-create-issue-label":(e,t)=>{tb(t.labelId)},"create-label-for-create-issue":()=>{Pu()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Ru(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Pu())}});function xa(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Ou)},0))}function Ou(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Ou))}function mb(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",oi)):(e.classList.remove("hidden"),e.classList.remove("show-options"),Le(),Ge(Vd()),setTimeout(()=>{document.addEventListener("click",oi)},0))}function fb(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",oi)):(e.classList.remove("hidden"),_b(),setTimeout(()=>{document.addEventListener("click",oi)},0))}function oi(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",oi))}function Bn(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",oi)}function Le(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=Y();e.innerHTML=$u.map(n=>{const i=Eu(n.key),s=Vd()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ge(e){Jh(e),Le();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":hb(t);break;case"status":vb(t);break;case"priority":bb(t);break;case"type":yb(t);break;case"assignee":wb(t);break;case"sprint":$b(t);break;case"labels":kb(t);break;case"exclude_labels":Eb(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function gb(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),Le()}function hb(e){const t=Y()||"",n=J()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${se(s.color)};"></span>
                <span class="filter-option-label">${f(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function vb(e){const t=sn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=ii(t);let s=`
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
        `}),e.innerHTML=s}function bb(e){const t=Ln(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function yb(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function wb(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;ns({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${p(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${p(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${ba(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function $b(e){if(!Y()){e.innerHTML=`
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
                <span class="filter-option-label">${f(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function kb(e){const t=Cn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${se(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=s}function Eb(e){const t=An(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${se(d)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=s}function _b(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function ze(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=Y();if(n){const m=(J()||[]).find(g=>g.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const i=sn();if(i.length>0){const u=ii(i),m=u==="open"?"Open":u==="closed"?"Closed":i.map(g=>Ee(g)).join(", ");t.push({category:"status",label:"Status",value:m,clearAction:"clear-status-filter-new"})}const s=Ln();if(s.length>0){const u=s.map(m=>Ue(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;o.value==="me"?u="Me":o.value==="unassigned"?u="Unassigned":u=zt(Gt(o.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=Cn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),m=l.map(g=>{var $;const b=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=($=b==null?void 0:b.closest("label"))==null?void 0:$.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const c=An();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=c.map(g=>{var $;const b=u==null?void 0:u.querySelector(`input[value="${g}"]`),y=($=b==null?void 0:b.closest("label"))==null?void 0:$.querySelector(".label-name");return(y==null?void 0:y.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${f(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function Ve(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Ar();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Hu(){const e=document.getElementById("sprint-filter");if(!e)return;const t=Y(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",jr(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await v.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${f(a.name)})</option>`),Pp(t,a==null?void 0:a.id),jr(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${f(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function jr(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function xb(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Fu=!1;lt(e=>{if(e!=="currentProject"||C()!=="issues"||Fu)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Hu(),Su()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),$a(),ka(),st(),ze(),Ve()}).catch(n=>{console.error("Failed to update filters on project switch:",n),st(),ze(),Ve()})});function Ib(){Yv(e=>{Fu=e})}function Ia(){xu(),st(),ze(),Ve()}function Sa(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ia()}function Rr(){Iu(),st(),ze(),Ve()}function Pr(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Rr()}function qr(){$a(),st(),ze(),Ve()}function Ta(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),qr()}function Nr(){ka(),st(),ze(),Ve()}function La(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Nr()}function Sb(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Uu(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${Sb(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let os=0;function rs(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function Gu(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=L())==null?void 0:t.id)||"",project:Y()||"",status:[...sn()].sort(),priority:[...Ln()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let on=null;function Tb(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function ri(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function zu(e,t){ri(!1),va(e),Qe(t),C()==="issues"&&It(t),dt(),on=e,rs(fv(e).hiddenClosed||0)}function Lb(e,t,{loading:n}){va(null),Qe(t),C()==="issues"&&It(t),dt(),ri(n),on=e,rs(0)}function Vu(){va(null),on=null,ri(!1),xb(),rs(0)}function Cb(){const e=document.getElementById("issues-list");rs(0),e!=null&&e.querySelector(".issue-row")?ri(!0):Vu()}function Ab(){const e=wv(Gu()),t=e?su(e):null;return t?(xn(-1),zu(e,t),!0):(Vu(),!1)}function Bb(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const u=d&&au(d.updated_at,c.updated_at)?d:c;l.push(ib(u))}return r.length?[...r,...l]:l}async function Lt(){var $,T,I,A,D,Z,_;xn(-1),Tb();const e=++os;if(!L())return;const t=Y()||"",n=sn(),i=Ln(),s=($=document.getElementById("assignee-filter"))==null?void 0:$.value,a=(I=(T=document.getElementById("issue-search"))==null?void 0:T.value)==null?void 0:I.trim();if(!t&&J().length===0){on=null,document.getElementById("issues-list").innerHTML=F({icon:q.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=Gu(),r={limit:1e3},l=((A=document.getElementById("sort-by-select"))==null?void 0:A.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(D=_e())==null?void 0:D.id:r.assignee_id=s);const u=(Z=document.getElementById("sprint-filter"))==null?void 0:Z.value;if(u)if(u==="current"){if(t){const P=Qw(t);if(P!==void 0)P&&(r.sprint_id=P);else try{const K=(await v.getSprints(t)).find(me=>me.status==="active");Pp(t,K==null?void 0:K.id),K&&(r.sprint_id=K.id)}catch(V){console.error("Failed to resolve current sprint:",V)}}}else r.sprint_id=u;const m=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value;m&&(r.issue_type=m),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,b=!1,y=null;try{const P=Uu(Cn(),"label-filter-dropdown");P.length>0&&(r.label=P,r.label_match="any");const V=Uu(An(),"exclude-label-filter-dropdown");V.length>0&&(r.exclude_label=V),t&&(r.project_id=t);const K=t||`team:${L().id}`;y=nu({...r,scope:K});const me=su(y);if(me)g=!0,on===y&&yv()===y&&cu(ee(),me)||zu(y,me);else{const w=Iv({...r,scope:K});w&&(w.complete||w.rows.length>0)?(b=!0,Lb(y,w.rows,{loading:!w.complete})):Cb()}const x=w=>t?v.getIssues(w):J().length>0?v.getTeamIssues(L().id,w):Promise.resolve(void 0),R=r.search&&ii(n)==="open"?x({...r,status:Cr}).then(w=>Array.isArray(w)?w.length:0).catch(w=>(console.error("Failed to count closed search matches:",w),0)):Promise.resolve(0),M=new Set(ee().map(w=>w.id)),ne=await x(r);if(ou(y,ne),e!==os)return;ru(o,y);const Me=(g||b)&&on===y,$e=Me?Bb(ee(),ne,M,pu(r)):ne,ke=Me&&cu(ee(),$e);va(y),Qe($e),C()==="issues"&&It(Array.isArray($e)?$e.filter(w=>!w._isOptimistic):$e);const et=[...new Set($e.map(w=>w.project_id).filter(Boolean))],mt=Object.keys(Qa()).length;if(await Rp(et),e!==os)return;const je=Object.keys(Qa()).length!==mt;(!ke||je)&&dt(),on=y,ri(!1);const ue=await R;if(hv(y,{hiddenClosed:ue}),e!==os)return;rs(ue)}catch(P){if(e!==os)return;ri(!1);const V=(P==null?void 0:P.status)===403||(P==null?void 0:P.status)===404;if(g&&!V){E("refresh issues",P);return}V&&y&&vv(y),on=null;const K=document.getElementById("issues-list");K&&(K.innerHTML=F({icon:q.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",P)}}function Db(){clearTimeout(ov()),rv(setTimeout(()=>{Lt()},300))}function st(){_u(),Lt()}async function Wu(){if(_u(),wa()==="sprint"){const e=ee(),t=[...new Set(e.map(n=>n.project_id))];await Rp(t)}dt()}function Mb(){ze(),Ve()}function Ku(e){ct(e),Le(),Ge("project"),Bn()}function jb(){Ku("")}function Rb(e){const t=e==="open"?es:e==="closed"?Cr:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ia(),Le(),Ge("status")}function Pb(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ia()),Le(),Ge("status")}function qb(){Sa(),Le(),Ge("status"),ze(),Ve()}function Nb(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Rr()),Le(),Ge("priority")}function Ob(){Pr(),Le(),Ge("priority"),ze(),Ve()}function Yu(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,st()),Le(),Ge("type"),ze(),Ve(),Bn()}function Hb(){Yu("")}function Qu(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,st()),Le(),Ge("assignee"),ze(),Ve(),Bn()}function Fb(){Qu("")}function Xu(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,st()),Le(),Ge("sprint"),ze(),Ve(),Bn()}function Ub(){Xu("")}function Gb(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,qr()),Le(),Ge("labels")}function zb(){Ta(),Le(),Ge("labels"),ze(),Ve()}function Vb(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Nr()),Le(),Ge("exclude_labels")}function Wb(){La(),Le(),Ge("exclude_labels"),ze(),Ve()}function Kb(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Lt()),Bn()}function Yb(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Wu()),Bn()}function Qb(){ct(null),Sa(),Pr();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ta(),La(),st(),ze(),Ve()}te({"update-label-filter":()=>qr(),"clear-label-filter":()=>Ta(),"update-exclude-label-filter":()=>Nr(),"clear-exclude-label-filter":()=>La(),"show-filter-category":(e,t)=>{var n,i;Ge(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{gb();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>Ku(t.value),"clear-project-filter":()=>jb(),"clear-status-filter-new":()=>qb(),"set-status-preset":(e,t)=>Rb(t.value),"show-all-statuses":()=>Sa(),"toggle-status-option":(e,t)=>Pb(t.filterValue,e),"clear-priority-filter-new":()=>Ob(),"toggle-priority-option":(e,t)=>Nb(t.filterValue,e),"set-type-filter":(e,t)=>Yu(t.value),"clear-type-filter":()=>Hb(),"set-assignee-filter":(e,t)=>Qu(t.value),"clear-assignee-filter":()=>Fb(),"set-sprint-filter":(e,t)=>Xu(t.value),"clear-sprint-filter":()=>Ub(),"clear-label-filter-new":()=>zb(),"toggle-label-option":(e,t)=>Gb(t.filterValue,e),"clear-exclude-label-filter-new":()=>Wb(),"toggle-exclude-label-option":(e,t)=>Vb(t.filterValue,e),"set-sort":(e,t)=>Kb(t.value),"set-group-by":(e,t)=>Yb(t.value),"clear-all-filters":()=>Qb(),"retry-load-issues":()=>Lt()});const Zu=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function rn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function li(e){const t=rn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const Xb=60,Zb=150;let We=[],ls=1/0,ln=null,Ca=null,cs=null;const Aa=new Map;let ci=null,Ba=[],ds=null;const Ju=e=>{var t;return`${((t=_e())==null?void 0:t.id)??""}|${e}`},Jb=24;function ey(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(Xb,Math.ceil((e+2*t)/Jb))}function cn(e,t){if(e!==null&&(ci!=null&&ci.has(String(e))))return Ba.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,ls));return ls-=n.length,n.length<t.length&&We.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>di(i)).join("")}function ep(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function tp(){clearTimeout(ln),ln=null,Hr++,We=[],Ca=null,ds=null,cs=null}function Or(e=1/0){if(We.length===0)return;const t=document.getElementById("issues-list");if(!t||!(cs!=null&&cs.isConnected)){tp();return}const n=new Map(ee().map(s=>[s.id,s]));let i=e;for(;We.length>0&&i>0;){const s=We[0],a=s.ids.slice(0,i),o=ep(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>di(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?We.shift():s.ids=s.ids.slice(a.length)}if(ds){const s=ds;Da(t,s.issueId)&&(ds=null,op(t,s))}if(We.length===0){clearTimeout(ln),ln=null;const s=Ca;Ca=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&np(s)}}const ty=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{ln=setTimeout(e,0)}):ln=setTimeout(e,16);let Hr=0;function ny(){if(clearTimeout(ln),We.length===0)return;const e=++Hr;ty(function t(){e===Hr&&(Or(Zb),We.length>0&&(ln=setTimeout(t,0)))})}function dt(){var d,u;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=py(e),s=m=>{var g;return((g=m==null?void 0:m.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),tp(),ls=ey();const o=ee();if(o.length===0){const m=(u=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:u.trim(),g=Ar()>0,b=m&&m.length>=2;if(g||b){const y=Ar(),$=[];b&&$.push(`search "${m}"`),g&&$.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=F({icon:q.issues,heading:"No matching issues",description:`No issues match your ${$.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=F({icon:q.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});xn(-1),ls=1/0;return}const r=wa();ci=Aa.get(Ju(r))||null,Ba=[],r==="status"?iy(e,o):r==="priority"?sy(e,o):r==="type"?ay(e,o):r==="assignee"?oy(e,o):r==="sprint"?ry(e,o):e.innerHTML=li(o)+cn(null,o),ls=1/0,cs=e.firstElementChild,We.push(...Ba),Ba=[];const l=ci;ci=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(m=>{l.has(m.dataset.group)&&sp(m,!0)}),a.forEach(([m,g])=>{m&&uy(m,e,g)})),i&&(Da(e,i.issueId)?op(e,i):We.length>0&&(ds=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),m=>m.dataset.issueId===n);n&&We.length>0&&!c?Ca=n:np(n),ny()}function np(e){const t=Wd();if(t<0)return;const n=document.querySelectorAll(fa);if(n.length===0){xn(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),xn(i),n[i].classList.add("keyboard-selected")}function iy(e,t){const n={};wr.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=li(t);wr.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ce(s)}</span>
                    <span class="group-title">${Ee(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${rn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function sy(e,t){const n={};Jd.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=li(t);Jd.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${vt(s)}</span>
                    <span class="group-title">${Ue(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${rn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function ay(e,t){const n={};Zu.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=li(t);Zu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${xt(s)}</span></span>
                    <span class="group-title">${xt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${rn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function oy(e,t){const n={},i="__unassigned__";n[i]=[];const s=ns({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=li(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${rn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=zt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${nn(o,"avatar-small")}</span>
                    <span class="group-title">${f(l)}${f(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${rn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function ry(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=Qa();s.sort((l,c)=>{const d=o[l],u=o[c],m=d?a[d.status]??3:3,g=u?a[u.status]??3:3;return m-g});let r=li(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,m=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${f(u)}${m}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${rn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(g,c)}
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
                    <span class="group-points">${rn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${cn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function ip(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function Da(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function ly(e,t){const n=ep(e,t);if(!n)return;const i=new Map(ee().map(s=>[s.id,s]));We=We.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>di(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function sp(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function cy(e,t){const n=Array.from(document.querySelectorAll(fa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),xn(s)}function ap(e,t,n){sp(t,n);const i=Ju(wa());Aa.has(i)||Aa.set(i,new Set);const s=Aa.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),ly(e,t.dataset.group)),cy(e,t)}function dy(e){const t=document.getElementById("issues-list"),n=t&&ip(t,e);n&&ap(t,n,!n.classList.contains("collapsed"))}function uy(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=We.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:ip(t,i.groupKey):(a=Da(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||ap(t,s,!1))}function py(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function op(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=Da(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function rp(e,t){if(!e)return"";if(!t)return f(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return f(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${f(i)}<mark class="search-match">${f(s)}</mark>${f(a)}`}function my(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=rp(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const fy=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function di(e){var m,g,b;const t=e.assignee_id?Gt(e.assignee_id):null,n=t?zt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":fy.format(i),a=e.estimate!=null?io(e.estimate,e.project_id):"",o=Il(e.estimate,e.project_id),r=e.sprint_id?Qa()[e.sprint_id]:null,l=r?r.name:null,c=(g=(m=document.getElementById("issue-search"))==null?void 0:m.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),u=c&&!d?my(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Ue(e.priority)}">
                    ${vt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${Ee(e.status)}">
                    ${Ce(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${xt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${rp(e.title,c)}${u?` <span class="issue-search-snippet" title="Matched in description">— ${u}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${se(y.color)}20; color: ${se(y.color)}">${f(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${l?f(l):"None"}">
                    ${l?`<span class="sprint-badge">${f(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?nn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function vt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ce(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}te({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}dy(t.group)},"show-inline-dropdown":(e,t,n)=>{Br(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),oe(t.issueId))}});let ui=[];function Dn(){return ui}function gy(e){ui=Array.isArray(e)?e:[]}function hy(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function vy(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?hy(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function by(e){var t,n;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{const i=await v.getTeamAgents(e);if(((n=L())==null?void 0:n.id)!==e)return;ui=i,ts(Hn,Dn),ei()}catch(i){console.error("Failed to load team agents:",i),E("load team agents",i)}}async function Ma(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{ui=await v.getTeamAgents(e),ts(Hn,Dn),ei(),yy()}catch(n){E("load agents",n)}}function yy(){const e=document.getElementById("agents-list");if(e){if(ui.length===0){e.innerHTML=F({icon:q.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=ui.map(t=>{var l;const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.kind==="session",a=t.can_register?'<span class="agent-scope" title="Registers one identity per session; cannot write as itself">Registrar</span>':s?`<span class="agent-scope" title="Registered by a registrar for one session">Session${t.idle?" · idle":""}</span>`:"",r=!s&&t.is_active!==!1&&(t.parent_user_id===((l=_e())==null?void 0:l.id)||uo())?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}" data-can-register="${t.can_register?"true":"false"}">${t.can_register?"Stop being a registrar":"Make registrar"}</button>`:"";return`
      <div class="agent-item">
        ${vy(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            ${a}
            <span class="agent-date">Created by ${i} ${it(t.created_at)}</span>
          </div>
        </div>
        ${r}
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function wy(){const e=J();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),G()}function lp(e,t,n=!1){const i=f(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,G()}async function $y(e){var r,l,c,d;e.preventDefault();const t=(r=L())==null?void 0:r.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let u;s&&a?u=await v.createProjectAgent(a,n,i,o):u=await v.createTeamAgent(t,n,i,o),H(),lp("Agent Created",u.api_key,!!u.can_register)}catch(u){E("create agent",u)}return!1}async function ky(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await v.createAgentKey(e);lp("New Agent Key",n.key)}catch(n){E("generate agent key",n)}}async function Ey(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await v.updateAgent(e,{can_register:n}),k(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),Ma()}catch(s){E("change registrar",s)}}function _y(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function xy(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),k("Agent deleted","success"),Ma()}catch(n){E("delete agent",n)}}te({"create-agent":e=>{$y(e)},"copy-agent-key":()=>{_y()},"dismiss-agent-modal":()=>{H(),Ma()},"delete-agent":(e,t)=>{xy(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{ky(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{Ey(t.agentId,t.agentName,t.canRegister!=="true")}});function Iy(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function Sy(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:Iy(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function Ty(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Fr(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var m,g;const u=s.querySelectorAll(".mention-suggestion");u.length!==0&&(a=(d%u.length+u.length)%u.length,u.forEach((b,y)=>b.classList.toggle("highlighted",y===a)),(g=(m=u[a]).scrollIntoView)==null||g.call(m,{block:"nearest"}))},l=d=>{const u=i.selectionStart||0,m=i.value.slice(0,u).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(u);i.value=m+g,i.focus(),o()},c=()=>{const d=i.selectionStart||0;if(Ty(i.value,d)){o();return}const m=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!m){o();return}const g=m[2].toLowerCase(),b=Sy(Hn(),Dn(),i.mentionContext||{}).filter(y=>!g||y.handle.includes(g)||y.name.toLowerCase().includes(g)||y.email.toLowerCase().includes(g)).slice(0,6);if(!b.length){o();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${p(y.handle)}">
                <span class="mention-name">${f(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${f(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,$)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r($))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const u=!s.classList.contains("hidden");if(d.key==="Escape"&&u){d.preventDefault(),d.stopPropagation(),o();return}if(u){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}async function cp(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),s=vi(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${f(o.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form data-action="update-issue" data-issue-id="${p(e)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${p(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${f(t.description||"")}</textarea>
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
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${f(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,G();const a=document.getElementById("edit-issue-description");if(a){const o=ca(e);if(o){const r=qd(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?En(e,r,t.description||""):En(e,null)})}}catch(t){E("load issue",t)}}async function Ly(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await v.updateIssue(t,c);ca(t)===c.description&&En(t,null),H(),await oe(t),k("Issue updated!","success"),as(d)}catch(n){E("update issue",n)}}async function Cy(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await Lt(),await ut(),N("issues"),k("Issue deleted!","success")}catch(t){E("delete issue",t)}}te({"update-issue":(e,t)=>{Ly(e,t.issueId)}});let Ie=null,dp=!1,Mn=!1,up="new-comment";function Ay(){return Ie||(Ie=document.createElement("div"),Ie.className="quote-tooltip",Ie.setAttribute("role","button"),Ie.setAttribute("tabindex","0"),Ie.setAttribute("aria-label","Quote selection in comment"),Ie.textContent="Quote",Ie.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),ja())}),Ie.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Ie.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ja()}),document.body.appendChild(Ie),Ie)}function pp(e,t){const n=Ay();n.style.display="flex",Mn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Mn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function us(){Ie&&(Ie.style.display="none"),Mn=!1}function By(){return Mn}function mp(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Ur(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=mp(t.startContainer),i=mp(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Dy(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function ja(e=up){const t=Ur();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Dy(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),us(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function My(){var i;if(!Ur())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return pp(n.left+n.width/2,n.top),!0}function jy(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Ur()){us();return}pp(t,n)},10)}function fp({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(up=t,i.addEventListener("mouseup",jy,n?{signal:n}:void 0),dp||(dp=!0,document.addEventListener("mousedown",s=>{Mn&&Ie&&!Ie.contains(s.target)&&us()}),document.addEventListener("selectionchange",()=>{Mn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&us()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Mn&&(s.stopImmediatePropagation(),us())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&My()})))}function gp(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function hp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function vp(e){if(!e)return"";const t=bt(e),n=document.createElement("div");return n.innerHTML=t,gp(n,hp),n.innerHTML}function jn(e){if(!e)return"";const t=bt(e),n=document.createElement("div");return n.innerHTML=t,gp(n,hp),n.innerHTML}let Gr=!1,zr=!1,dn=!0,ps=null,ms=null,fs=null,Ra=null,Vr=!1,Pa=null;function Wr(e=null){Vr=!0,e&&(Pa=e)}function Kr(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function Yr(e){return e.user_name||e.user_email||"Unknown"}function Qr(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${f(Ee(t(e.old_value)))}</strong> to <strong>${f(Ee(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${f(Ue(t(e.old_value)))}</strong> to <strong>${f(Ue(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${f(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${f(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=f(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue"}}function Ry(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function Py(){dn=!dn;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",dn),n&&n.classList.toggle("rotated",dn)}async function gs(e){try{ps=await v.getTicketRitualsStatus(e),bp(e)}catch(t){console.error("Failed to load ticket rituals:",t),ps=null}}function bp(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ps){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=ps;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(dn=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",dn);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",dn);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket (or closing it unclaimed):":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${c}</p>
                ${n.map(d=>`
                    <div class="ticket-ritual-item pending${d.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${d.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${f(d.name)}</span>
                            <span class="badge badge-trigger-${d.trigger||"ticket_close"}">${d.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${d.approval_mode||"auto"}">${d.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?bt(d.prompt):""}</div>
                        ${d.attestation?"":l$(d.last_rejection)}
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${rt(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${bt(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${i$(d,e)}
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
                            <span class="ticket-ritual-name">${f(d.name)}</span>
                        </div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${rt(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function qa(e){try{let t;return e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?(await oe(t.id,!1),!0):(N("my-issues",!1),!1)}catch{return N("my-issues",!1),!1}}function Xr(e){const t=Xi(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Zr({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function qy(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=xe();if(!t)return;const n=Xr(t.id);ms=n.prevIssue?n.prevIssue.id:null,fs=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=Zr(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}lt(e=>{e==="detailNavContext"&&qy()});let hs=0;function Ny(){hs++}let yp=0,Na=!1;function wp(){if(document.querySelector(".description-inline-editor"))return"editor";if(si())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Na?"transient":null}function $p(e){return Wr(),e==="editor"?"deferred":"retry"}function Oy(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=xe())==null?void 0:n.id)===e}function Hy(e){return ee().find(t=>t.id===e)||kr(e)||Xi().find(t=>t.id===e)||null}function Fy(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Jn(e);const i=Xr(e.id);ms=i.prevIssue?i.prevIssue.id:null,fs=i.nextIssue?i.nextIssue.id:null;const s=J().find(r=>r.id===e.project_id),a=e.assignee_id?Gt(e.assignee_id):null,o=C()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Zr(i)}
                        <span class="issue-detail-breadcrumb">${s?f(s.name):"Project"} › ${f(e.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${f(e.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Ce(e.status)}<span>${Ee(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${vt(e.priority)}<span>${Ue(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?f(zt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function oe(e,t=!0,{refresh:n=!1}={}){const i=n?hs:++hs,s=++yp;if(n){const a=wp();if(a)return $p(a)}try{t&&mn(),n||(dn=!0);let a=!1;if(!n){const w=Hy(e);w&&(Fy(w),t&&(history.pushState({issueId:e,view:C()},"",`/issue/${w.identifier}`),a=!0))}let o=!1;const[r,l,c,d,u,m]=await Promise.all([v.getIssue(e),v.getComments(e).catch(w=>(console.error("Failed to load comments:",w),o=!0,[])),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),b=[...m.pending_rituals||[],...m.completed_rituals||[]].filter(w=>w.attestation&&w.attestation.note).map(w=>({id:`attestation-${w.attestation.id}`,author_name:w.attestation.attested_by_name||"Unknown",author:w.attestation.attester||null,content:w.attestation.note,created_at:w.attestation.attested_at,is_attestation:!0,ritual_name:w.name,is_pending:!w.attestation.approved_at})),y=[...l,...b].sort((w,W)=>new Date(w.created_at)-new Date(W.created_at)),$=[r.parent_id?v.getIssue(r.parent_id):Promise.resolve(null),v.getSprints(r.project_id).catch(w=>(console.error("Failed to load sprints:",w),[]))],[T,I]=await Promise.all($);if(i!==hs)return"dropped";let A=null,D=null;if(n){if(s!==yp||!Oy(e))return"dropped";const w=wp();if(w)return $p(w);D=window.scrollY;const W=document.activeElement;W!=null&&W.id&&document.getElementById("issue-detail-view").contains(W)&&(A={id:W.id,start:W.selectionStart,end:W.selectionEnd})}ps=m;const Z=u.filter(w=>w.relation_type==="blocks"&&w.direction==="outgoing"),_=u.filter(w=>w.relation_type==="blocked_by"||w.relation_type==="blocks"&&w.direction==="incoming"),P=u.filter(w=>w.relation_type==="relates_to");t&&!a&&history.pushState({issueId:e,view:C()},"",`/issue/${r.identifier}`),Jn(r),Xd(I),Vr=!1,Pa=null,document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const V=document.getElementById("issue-detail-view");V.classList.remove("hidden");const K=C()||"my-issues",me=J().find(w=>w.id===r.project_id),x=r.assignee_id?Gt(r.assignee_id):null,R=x?zt(x):null,M=r.sprint_id?I.find(w=>w.id===r.sprint_id):null,ne=Xr(r.id),{prevIssue:Me,nextIssue:$e}=ne;V.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(K)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Zr(ne)}
                        <span class="issue-detail-breadcrumb">${me?f(me.name):"Project"} › ${f(r.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(r.title)}</h1>

                    ${T?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(T.identifier)}" data-action="navigate-issue" data-issue-id="${p(T.id)}" data-identifier="${p(T.identifier)}">${T.identifier}: ${f(T.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(r.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${ca(r.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${r.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(r.id)}">
                            ${r.description?jn(r.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${d.length===0?F({icon:q.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):d.map(w=>`
                                <a href="/issue/${encodeURIComponent(w.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(w.id)}" data-identifier="${p(w.identifier)}">
                                    <span class="sub-issue-status">${Ce(w.status)}</span>
                                    <span class="sub-issue-id">${w.identifier}</span>
                                    <span class="sub-issue-title">${f(w.title)}</span>
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
                            ${Z.length===0&&_.length===0&&P.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${_.map(w=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ce(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${f(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${Z.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${Z.map(w=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Ce(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${f(w.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(r.id)}" data-relation-id="${p(w.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${P.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${P.map(w=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${Ce(w.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(w.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(w.related_issue_id)}" data-identifier="${p(w.related_issue_identifier)}" class="relation-link">${w.related_issue_identifier}</a>
                                            <span class="relation-title">${f(w.related_issue_title)}</span>
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
                            <h3>Comments${y.length>0?` <span class="section-count">(${y.length})</span>`:""}</h3>
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
                            ${y.length===0?o?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:y.map(w=>{var W;return`
                                <div class="comment ${w.is_attestation?"comment-attestation":""} ${w.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${w.is_attestation?"avatar-attestation":""}">${w.is_attestation?w.is_pending?"⏳":"✓":(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(w.author_name||"User")}</span>
                                            ${w.author?Xn(w.author):fr((W=Gt(w.author_id))==null?void 0:W.is_agent)}
                                            ${w.is_attestation?`<span class="comment-ritual-badge">${w.is_pending?"Pending approval — ":""}Ritual: ${f(w.ritual_name)}</span>`:""}
                                            <span class="comment-date">${rt(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${vp(w.content)}</div>
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
                            ${c.length===0?F({icon:q.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):c.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Kr(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Qr(w)}</span>
                                        <span class="activity-actor">by ${f(Yr(w))} ${Xn(w.user)}</span>
                                        <span class="activity-time">${rt(w.created_at)}</span>
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
                                ${Ce(r.status)}
                                <span>${Ee(r.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(r.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${vt(r.priority)}
                                <span>${Ue(r.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(r.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${r.issue_type||"task"}">${xt(r.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(r.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${R?`${nn(x,"avatar-small")}<span>${f(R)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(r.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${M?f(M.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(r.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${r.labels&&r.labels.length>0?r.labels.map(w=>`
                                        <span class="issue-label" style="background: ${se(w.color)}20; color: ${se(w.color)}">${f(w.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${me?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(me.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(r.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Il(r.estimate,r.project_id)?" out-of-scale":""}" ${Il(r.estimate,r.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${io(r.estimate,r.project_id)}</span>
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
                            <span class="property-value-static">${f(r.creator_name||"Unknown")} ${Xn(r.creator)}</span>
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
        `,Ra&&Ra.abort(),Ra=new AbortController;const{signal:ke}=Ra,et=document.querySelector(".sidebar-overflow-trigger"),mt=document.querySelector(".overflow-menu-dropdown");if(et&&mt){const w=()=>{mt.classList.add("hidden"),et.setAttribute("aria-expanded","false")},W=()=>{const Re=mt.classList.toggle("hidden");et.setAttribute("aria-expanded",String(!Re))};et.addEventListener("click",W,{signal:ke}),document.addEventListener("click",Re=>{!et.contains(Re.target)&&!mt.contains(Re.target)&&w()},{signal:ke}),mt.addEventListener("keydown",Re=>{Re.key==="Escape"&&(Re.stopPropagation(),w(),et.focus())},{signal:ke})}bp(r.id),Fr("new-comment","mention-suggestions",{projectId:r.project_id}),fp({signal:ke});const je=document.getElementById("new-comment");if(Na=!1,je){je.addEventListener("compositionstart",()=>{Na=!0},{signal:ke}),je.addEventListener("compositionend",()=>{Na=!1},{signal:ke});const w=Rd(r.id);w&&(je.value=w),je.addEventListener("input",()=>{la(r.id,je.value)}),je.addEventListener("keydown",W=>{var Re;W.key==="Enter"&&(W.metaKey||W.ctrlKey)&&(W.preventDefault(),(Re=je.closest("form"))==null||Re.requestSubmit())})}ms=Me?Me.id:null,fs=$e?$e.id:null;const ue=w=>{var ce;if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&ja()){w.preventDefault();return}if(w.metaKey||w.ctrlKey||w.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||si())return;if(w.key==="ArrowLeft"&&ms)w.preventDefault(),oe(ms);else if(w.key==="ArrowRight"&&fs)w.preventDefault(),oe(fs);else if(w.key==="c"){w.preventDefault(),w.stopImmediatePropagation();const ft=document.getElementById("new-comment");ft&&(ft.focus(),ft.scrollIntoView({behavior:"smooth",block:"nearest"}))}else w.key==="j"?(w.preventDefault(),w.stopImmediatePropagation(),Oa(1)):w.key==="k"?(w.preventDefault(),w.stopImmediatePropagation(),Oa(-1)):w.key==="d"&&(w.preventDefault(),(ce=document.querySelector('[data-action="edit-description"]'))==null||ce.click());const Re={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[w.key];if(Re){const ft=document.querySelector(`.property-row[data-field="${Re}"]`);ft&&(w.preventDefault(),ft.click())}};if(document.addEventListener("keydown",ue,{signal:ke}),A){const w=document.getElementById(A.id);if(w&&(w.focus({preventScroll:!0}),typeof A.start=="number"&&typeof w.setSelectionRange=="function"))try{w.setSelectionRange(A.start,A.end)}catch{}}return D!==null&&window.scrollTo(0,D),"rendered"}catch(a){if(n)console.error("Failed to refresh issue detail:",a);else{if(i!==hs)return"dropped";E("load issue",a);const o=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(o){const r=(a==null?void 0:a.status)===403||(a==null?void 0:a.status)===404;o.innerHTML=F(r?{icon:q.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:q.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Uy(e,t){if(e.preventDefault(),Gr)return!1;const n=document.getElementById("new-comment").value;la(t,null),Gr=!0;try{const i=await v.createComment(t,n);k("Comment added!","success"),mr(i),await oe(t)}catch(i){la(t,n),E("add comment",i)}finally{Gr=!1}return!1}async function Gy(e){const t=xe()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${f(t.description||"")}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=ca(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=qd(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Fr("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?En(e,c,t.description||""):En(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&kp()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(En(e,null),Vr){oe(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?jn(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(zr)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=Pa?Pa.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");zr=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await v.updateIssue(e,{description:c}),En(e,null),k("Description updated","success"),await oe(e,!1),window.scrollTo(0,m),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){E("update description",y)}finally{zr=!1,u&&(u.disabled=!1)}})}function kp(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?jn(n):'<span class="text-muted">Nothing to preview.</span>'}function zy(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?kp():i.focus()}function Vy(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,G(),document.getElementById("relation-issue-search").focus()}async function Wy(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,o=(await v.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${f(r.identifier)}</span>
                <span class="link-result-title">${f(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Ky(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Yy(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Qy(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(i,t,"blocks"):await v.createRelation(t,i,n),H(),k("Relation added","success"),oe(t)}catch(s){E("add relation",s)}return!1}async function Xy(e,t){try{await v.deleteRelation(e,t),k("Relation removed","success"),oe(e)}catch(n){E("remove relation",n)}}function Oa(e){const t=xe();if(!t)return;const n=Xi();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||oe(n[s].id)}te({"retry-issue-comments":(e,t)=>{oe(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Jv(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Gy(t.issueId)},"toggle-section":(e,t)=>{Ry(t.section)},"toggle-ticket-rituals":()=>{Py()},"save-comment":(e,t)=>{Uy(e,t.issueId)},"show-add-relation-modal":(e,t)=>{Vy(t.issueId)},"remove-relation":(e,t)=>{Xy(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{yu(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Qy(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Wy(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Ky(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Yy()},"set-description-editor-mode":(e,t)=>{zy(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Oa(-1),"navigate-next-issue":()=>Oa(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),cp(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Cy(t.issueId)}});const Ha=new Map;function Jr(){var e;return`${((e=L())==null?void 0:e.id)??""}|${Y()??""}`}function pi(e,t,n){Ha.set(e,{key:t,value:n})}function Fa(e,t){const n=Ha.get(e);return n&&n.key===t?n.value:void 0}function vs(e,...t){for(const n of t)n!==e&&Ha.delete(n)}function el(){Ha.clear()}function Ua(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}lt((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&el(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&el()});function Ep(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let un=[],bs=[],Ga=null,le=new Set,mi="list",Rn=!1,tl=null,za=null,nl=null,il=null,_p=null;function xp(e){if(_p!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const sl=Mh();(sl==="list"||sl==="grid")&&(mi=sl);function Ip(e){if(e!=="list"&&e!=="grid")return;mi=e,e==="grid"&&Rn&&al(),jh(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Vt()}function Sp(){if(mi!=="list")return;Rn=!0,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Vt(),gi()}function al(){Rn=!1,le.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Vt(),gi()}function Zy(){tl&&clearTimeout(tl),tl=setTimeout(()=>{Vt()},300)}function Jy(){const e=document.getElementById("doc-search");e&&(e.value=""),Vt()}async function ew(){ct(null)}async function tw(){const e=document.getElementById("doc-search");e&&(e.value=""),ct(null)}function nw(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=Y()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=J().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${f(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function iw(){return un}function Vt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";nw(),bs=un.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),bs.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),cw("",mi)}let fi=0;async function sw(){var i;const e=Ga||((i=L())==null?void 0:i.id);if(!e)return;const t=++fi,n=Y()||null;try{const s=await v.getDocuments(e,n);if(t!==fi)return;pi("documents",`${e}|${n??""}`,s),un=s,Vt()}catch(s){if(t!==fi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=F({icon:q.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}lt(e=>{e==="currentProject"&&C()==="documents"&&sw()});async function Pn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=L())==null?void 0:r.id),!e)return;Ga=e,Kd(-1);const i=++fi;t===null&&(t=Y()||null);const s=`${e}|${t??""}`,a=n?Fa("documents",s):void 0,o=document.getElementById("documents-list");a?(un=a,Vt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await v.getDocuments(e,t);if(i!==fi)return;pi("documents",s,l);const c=a&&Ua(un,l);un=l;const d=document.getElementById("doc-view-list"),u=document.getElementById("doc-view-grid");d&&u&&(d.classList.toggle("active",mi==="list"),u.classList.toggle("active",mi==="grid")),c||Vt()}catch(l){if(i!==fi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=F({icon:q.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",l)}}function Tp(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Ga||((n=L())==null?void 0:n.id);e&&Pn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function Lp(e){xp(e)&&Ae(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function aw(e,t){xp(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),N("documents"))}function ow(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${se(t.color)}20; color: ${se(t.color)}">${f(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function rw(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ow(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Ep(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function lw(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${se(r.color)}20; color: ${se(r.color)}">${f(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Ep(e.content).substring(0,80):"No content",s=Rn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${le.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Rn&&le.has(e.id)?" selected":""}" data-action="${Rn?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
      ${s}
      <div class="document-list-icon">${f(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${f(e.title)}</div>
        <div class="document-list-snippet text-muted">${f(i)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function cw(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;le.clear(),gi();const i=bs;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=Y(),m=d||u;n.innerHTML=F({icon:m?q.search:q.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?rw:lw,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=J();i.forEach(d=>{let u,m;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);m=g?g.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",m=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function dw(e){le.has(e)?le.delete(e):le.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=le.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",le.has(e)),gi()}function uw(){bs.forEach(e=>le.add(e.id)),bs.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),gi()}function Cp(){le.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),le.clear(),gi()}function gi(){const e=document.getElementById("doc-bulk-actions");e&&(Rn?(e.classList.remove("hidden"),le.size>0?e.innerHTML=`
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
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function pw(){if(le.size===0){k("No documents selected","error");return}const t=J().map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${le.size} Document${le.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
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
  `,G()}async function mw(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(le);let i=0;const s=[];for(const l of n)try{await v.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=un.find(d=>d.id===l))==null?void 0:o.title)||l)}H(),Cp(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=L())==null?void 0:r.id;return await Pn(a),!1}async function fw(){var a,o;if(le.size===0){k("No documents selected","error");return}const e=le.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(le);let n=0;const i=[];for(const r of t)try{await v.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=un.find(c=>c.id===r))==null?void 0:a.title)||r)}al(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=L())==null?void 0:o.id;await Pn(s)}async function gw(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await v.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${f(s.author_name||"Unknown")}</span>
                ${Xn(s.author)}
                <span class="comment-date">${rt(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${vp(s.content)}</div>
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
    `}}function hw(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=Rd(e);s&&(i.value=s),i.addEventListener("input",()=>{la(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),Fr("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Ae(e,t=!0){try{t&&mn();const n=await v.getDocument(e);_p=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await gw(n);let a=null,o=null,r=!1;if(n.project_id){const P=J().find(V=>V.id===n.project_id);if(a=P?P.name:null,n.sprint_id)try{const V=await v.getSprint(n.sprint_id);o=V?V.name:null}catch(V){console.error("Failed to load sprint name:",V),r=!0}}let l=n.content||"";const c=Q.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=iw(),u=d.findIndex(_=>_.id===n.id),m=u>0?d[u-1]:null,g=u>=0&&u<d.length-1?d[u+1]:null,b=u>=0,y=C()||"documents",$=n.labels&&n.labels.length>0?n.labels.map(_=>`
          <span class="issue-label" style="background: ${se(_.color)}20; color: ${se(_.color)}">
            ${f(_.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(_.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let T='<span class="text-muted">None</span>';try{const _=await v.getDocumentIssues(n.id);_.length>0&&(T=_.map(P=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(P.identifier)}</span>
            <span class="linked-item-title">${f(P.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(P.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(_){console.error("Failed to load linked issues:",_),T=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(y)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${p(m.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${g?`data-action="view-document" data-document-id="${p(g.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?f(a)+" ›":""} ${f(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?f(n.icon)+" ":""}${f(n.title)}</h1>

          <div class="document-content markdown-body">${l?jn(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?f(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:f(o)}</span>
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
              <span class="property-value-static">${f(n.author_name||"Unknown")} ${Xn(n.author)}</span>
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
              ${T}
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
    `,za&&za.abort(),za=new AbortController;const{signal:I}=za,A=i.querySelector(".sidebar-overflow-trigger"),D=i.querySelector(".overflow-menu-dropdown");if(A&&D){const _=()=>{D.classList.add("hidden"),A.setAttribute("aria-expanded","false")},P=()=>{const V=D.classList.toggle("hidden");A.setAttribute("aria-expanded",String(!V))};A.addEventListener("click",P,{signal:I}),document.addEventListener("click",V=>{!A.contains(V.target)&&!D.contains(V.target)&&_()},{signal:I}),D.addEventListener("keydown",V=>{V.key==="Escape"&&(_(),A.focus())},{signal:I})}hw(n.id,I,n.project_id||null),fp({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:I}),nl=m?m.id:null,il=g?g.id:null;const Z=_=>{if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key===">"||_.key==="."||_.code==="Period")&&ja("new-doc-comment")){_.preventDefault();return}_.metaKey||_.ctrlKey||_.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA"||_.target.tagName==="SELECT"||_.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(_.key==="ArrowLeft"&&nl?(_.preventDefault(),Ae(nl)):_.key==="ArrowRight"&&il&&(_.preventDefault(),Ae(il)))};document.addEventListener("keydown",Z,{signal:I})}catch(n){E("load document",n)}}async function Va(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${f(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function ol(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${f(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function vw(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?jn(r):'<span class="text-muted">Nothing to preview.</span>'}}function rl(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Od(e);if(o){const l=Ah(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){da(e,null);return}da(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function Ap(){ys=null;const e=J(),t=Zp()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${ol("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),rl("new"),t&&await Va("doc-sprint",t,null,!0)}let ys=null;async function bw(e,t,n){ys=n||null;const s=J().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${f(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${ol("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),rl("new"),t&&await Va("doc-sprint",t,e)}async function yw(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await v.createDocument(t,s),da("new",null),await Pn(t),H(),k("Document created!","success"),ys){const o=ys;ys=null,o()}}catch(o){E("create document",o)}return!1}let ll=null,ws=null,cl=!1;async function Bp(e){try{const t=await v.getDocument(e);ll=e,ws={title:t.title||"",content:t.content||""},cl=!1;const i=J().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${ol("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,G(),rl(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Va("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function ww(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&ll===t&&ws&&!cl){let o=null;try{o=await v.getDocument(t)}catch{}if(o&&((o.title||"")!==ws.title||(o.content||"")!==ws.content))return cl=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await v.updateDocument(t,s),ll=null,ws=null;const o=Od(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&da(t,null),H(),await Ae(t),k("Document updated!","success")}catch(o){E("update document",o)}return!1}async function $w(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await Pn(n),N("documents"),k("Document deleted!","success")}catch(n){E("delete document",n)}}function kw(e,t){Va(e,t)}async function Ew(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,G()}async function _w(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,a=await v.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function xw(e,t){try{await v.linkDocumentToIssue(e,t),H(),k("Issue linked!","success"),await Ae(e,!1)}catch(n){E("link issue",n)}}async function Iw(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Ae(e,!1)}catch(n){E("unlink issue",n)}}let dl=!1;async function Sw(e,t){if(e.preventDefault(),dl)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;dl=!0;try{const s=await v.createDocumentComment(t,i);n.value="",k("Comment added!","success"),mr(s),await Ae(t,!1)}catch(s){E("add comment",s)}finally{dl=!1}return!1}async function Tw(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await v.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,G();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${se(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,G()}catch(i){E("load labels",i)}}async function Lw(e,t){try{await v.addLabelToDocument(e,t),H(),k("Label added!","success"),await Ae(e,!1)}catch(n){E("add label",n)}}async function Cw(e,t){try{await v.removeLabelFromDocument(e,t),k("Label removed!","success"),await Ae(e,!1)}catch(n){E("remove label",n)}}te({"view-document":(e,t)=>{e.preventDefault(),Ae(t.documentId)},"set-doc-editor-mode":(e,t)=>{vw(t.target,t.mode)},"retry-load-documents":()=>{Pn(Ga)},"retry-document-comments":(e,t)=>{Ae(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{dw(t.docId)},"clear-doc-search":()=>{Jy()},"clear-doc-project-filter":()=>{ew()},"clear-all-doc-filters":()=>{tw()},"show-bulk-move-modal":()=>{pw()},"bulk-delete-documents":()=>{fw()},"select-all-docs":()=>{uw()},"clear-doc-selection":()=>{Cp()},"exit-selection-mode":()=>{al()},"enter-selection-mode":()=>{Sp()},"handle-bulk-move":e=>{mw(e)},"unlink-document-issue":(e,t)=>{Iw(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Ew(t.documentId)},"add-document-comment":(e,t)=>{Sw(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Cw(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Tw(t.documentId)},"show-edit-document-modal":(e,t)=>{Bp(t.documentId)},"delete-document":(e,t)=>{$w(t.documentId)},"create-document":e=>{yw(e)},"update-doc-sprint-dropdown":(e,t,n)=>{kw(t.sprintSelect,n.value)},"update-document":(e,t)=>{ww(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{_w(n.value,t.documentId)},"link-to-issue":(e,t)=>{xw(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Lw(t.documentId,t.labelId)}});let Ct=[],Wa={},Ka=new Set,Wt=null,ul=null,Ya=[],$s=[],pl=[];function Qa(){return Wa}function Aw(){return ul}function Bw(){return Wt}lt(e=>{e==="currentProject"&&C()==="sprints"&&pn()});let ml=0;async function pn({fromMemory:e=!1}={}){Qd(-1);const t=Y();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const n=++ml;Kw();const i=document.getElementById("sprints-list"),s=Jr(),a=e?Fa("sprints",s):void 0;a?(Ct=a,Dp()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([v.getCurrentSprint(t),v.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await v.getSprints(t);if(n!==ml)return;const l=a&&Ua(Ct,r);Ct=r,pi("sprints",s,r),l||Dp(),await Xa()}catch(o){return n!==ml?void 0:(i&&(i.innerHTML=F({icon:q.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",o),!1)}return!0}function Dp(){const e=document.getElementById("sprints-list");if(!e)return;const t=Ct.find(a=>a.status==="active"),n=Ct.find(a=>a.status==="planned"),i=Ct.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${p(t.id)}" data-sprint-url="/sprint/${p(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${f(t.name)}</div>
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
        `,s+=Dw(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${f(n.name)}</div>
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
                            <span class="sprint-history-name">${f(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||F({icon:q.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Mp(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${bl(e.activated_at)}, closed ${bl(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${bl(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Dw(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${f(Mp(e))||"not yet activated"}</span>
                    <span>${f(r)}</span>
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
    `}let fl=0;async function hi(e,t=!0){var n;try{t&&mn();const i=++fl,s=C(),a=await v.getSprint(e);if(i!==fl)return;if(!a){k("Sprint not found","error"),N("sprints");return}ul=a;const o=(n=L())==null?void 0:n.id,[r,l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?v.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==fl)return;Ya=r,pl=l,$s=c,C()===s&&It(Ya),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),jw()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),N("sprints")}}async function Mw(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),N("sprints",!1);return}try{await hi(e,!1)}catch{N("sprints",!1)}}function jw(){const e=ul,t=Ya;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(g=>es.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let u="";e.status==="active"?u='<span class="badge badge-status-active">Active</span>':e.status==="planned"?u='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(u='<span class="badge badge-status-completed">Completed</span>');const m=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${f(e.name)}</h2>
                ${u}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${f(Mp(e))}
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
                <div class="stat-value">${m}</div>
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
                ${s.length===0?F({icon:q.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>gl(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?F({icon:q.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>gl(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>gl(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${Pw()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${$s.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${$s.length>0?`
                    <div class="sprint-issues-list">
                        ${$s.map(g=>Rw(g)).join("")}
                    </div>
                `:F({icon:q.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function gl(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...eu,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Xw(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Rw(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${rt(e.created_at)}</span>
            </span>
        </div>
    `}function Pw(){const e=pl;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${f(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${f(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${qw(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function qw(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Nw(e,t,n,i){const s=i?E$(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(i)}" data-current-budget="${p(n??"")}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${p(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${s?`<small class="form-hint">${f(s)}</small>`:""}
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
    `,G()}async function Ow(e,t,n){var u,m,g,b;e.preventDefault();const i=(m=(u=document.getElementById("sprint-name"))==null?void 0:u.value)==null?void 0:m.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Ct.find(y=>y.id===t);try{const y={};i&&(y.name=i);const $=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!$&&(y.budget=a),Object.keys(y).length&&await v.updateSprint(t,y),o==="planned"){const I=Ct.filter(A=>A.status==="planned"&&A.id!==t);for(const A of I)await v.updateSprint(A.id,{budget:a})}o==="default"&&n&&await v.updateProject(n,{default_sprint_budget:a}),await pn(),H(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){E("update budget",y)}return!1}const jp="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Hw(e,t=null){const n=Ct.find(c=>c.id===e),i=n?J().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${jp}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await v.updateSprint(e,{budget_follows_default:!0})}catch(c){E("reset budget to project default",c),t&&(t.disabled=!1);try{await pn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await pn()!==!1}catch{l=!1}k(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&k(jp,"warning")}async function Fw(e){const t=Ct.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,G();const n=es;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${f(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${p(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function Uw(e){try{const t=await v.closeSprint(e);await pn(),qp(),t.limbo?zw(t):k("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Xa(){const e=Y();if(e)try{Wt=await v.getLimboStatus(e),Gw()}catch(t){console.error("Failed to load limbo status:",t)}}function Gw(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Wt||!Wt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Wt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function zw(e){const t=Y();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `,G(),Vw(t)}async function Vw(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(i.name)} <span class="ritual-mode">(${f(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${bt(i.prompt)}</div>
                    ${vl(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function hl(){var t,n;if(!Wt)return;const e=Y();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Wt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${f(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${bt(i.prompt)}</div>
                        ${vl(i.attestation)}
                        ${Ww(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Wt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Wt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(i.name)}</div>
                            ${vl(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,G()}function vl(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(rt(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${bt(e.note)}</div>
        </div>
    `}function Ww(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Rp(e){for(const t of e)if(!Ka.has(t))try{(await v.getSprints(t)).forEach(i=>{Wa[i.id]=i}),Ka.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Kw(){Wa={},Ka=new Set,Ya=[],pl=[],$s=[],Za={}}function Yw(e,t){t.forEach(n=>{Wa[n.id]=n}),Ka.add(e)}let Za={};function Qw(e){return Za[e]}function Pp(e,t){Za[e]=t??null}function qp(){Za={}}te({"retry-load-sprints":()=>pn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}hi(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Nw(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Hw(t.sprintId,n)},"show-limbo-details-modal":()=>{hl()},"show-close-sprint-confirmation":(e,t)=>{Fw(t.sprintId)},"handle-update-budget":(e,t)=>{Ow(e,t.sprintId,t.projectId)},"close-modal":()=>{H()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,H(),Uw(t.sprintId)},"dismiss-limbo-modal":()=>{H(),Xa()},"approve-ritual":(e,t)=>{t$(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Op(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}oe(t.issueId)},"create-sprint-document":async(e,t)=>{await bw(t.sprintId,t.projectId,()=>{hi(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ae(t.documentId)}});function bl(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Xw(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}lt(e=>{e==="currentProject"&&C()==="rituals"&&yl()});let Np=0;async function yl(){const e=Y(),t=document.getElementById("rituals-content"),n=++Np;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=F({icon:q.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}C$(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await _s();n===Np&&!i&&t&&(t.innerHTML=F({icon:q.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Zw(){Yp(Jw),yl()}function Jw(){const e=document.getElementById("rituals-content"),t=A$(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,bi("rv-sprint-rituals-list",n,"sprint"),bi("rv-close-rituals-list",i,"close"),bi("rv-claim-rituals-list",s,"claim")}function e$(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function t$(e,t){try{await v.approveAttestation(e,t),k("Ritual approved!","success"),await Xa(),hl()}catch(n){E("approve ritual",n)}}function wl(e){return e==="document"?`
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
        `:""}function $l(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Op(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${wl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{n$(s,e,t,i)}),G()}async function n$(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=$l(i);if(a===void 0)return!1;try{await v.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await Xa();const o=Bw();o&&!o.in_limbo?(H(),k("Limbo cleared! Next sprint is now active.","success")):hl()}catch(o){E("complete gate ritual",o)}return!1}function i$(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function s$(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${f(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${wl(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{a$(o,e,t,s,a)}),G()}async function a$(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=$l(i);if(o===void 0)return!1;try{await v.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),H(),await gs(n)}catch(r){E("attest ticket ritual",r)}return!1}async function o$(e,t){try{await v.attestTicketRitual(e,t),k("Ritual attested!","success"),await gs(t)}catch(n){E("attest ticket ritual",n)}}async function r$(e,t){try{await v.approveTicketRitual(e,t),k("Ritual approved!","success"),await gs(t)}catch(n){E("approve ticket ritual",n)}}function l$(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${f(e.rejected_by_name||"Someone")}:</strong> ${f(e.note||"")}</div>`}function Hp(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{c$(s,e,t,n,i)}),G()}async function c$(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await v.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),H(),s&&await s()}catch(o){E("reject ritual",o)}return!1}function d$(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${wl(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{u$(s,e,t,i)}),G()}async function u$(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=$l(i);if(a===void 0)return!1;try{await v.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),H(),await gs(n)}catch(o){E("complete ticket ritual",o)}return!1}te({"show-create-ritual-modal":(e,t)=>{im(t.trigger)},"approve-ticket-ritual":(e,t)=>{r$(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{Hp(t.ritualId,t.issueId,t.ritualName,()=>gs(t.issueId))},"complete-ticket-ritual":(e,t)=>{d$(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{s$(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{o$(t.ritualId,t.issueId)},"retry-load-rituals":()=>yl()});function bt(e){if(!e)return"";try{Q.setOptions({breaks:!0,gfm:!0});const n=Q.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Md.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ks(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function p$(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(s)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${ks(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{m$(c,e,t,n)}),G(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function m$(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),H(),At()}catch(a){E("complete gate ritual",a)}}function f$(e,t,n,i,s,a,o,r){p$(e,t,n,i,s,a,o,r)}function g$(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(s)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${ks(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${bt(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{h$(d,e,t,n)}),G(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function h$(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await v.approveTicketRitual(t,n);let r=null;if(s)try{r=await v.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}k(`Review ritual "${i}" approved!`,"success"),mr(r),H(),At()}catch(r){E("approve review ritual",r)}}function v$(e,t,n,i,s,a,o,r,l){g$(e,t,n,i,s,a,o,r,l)}lt(e=>{e==="currentProject"&&C()==="approvals"&&At()});let kl=[],El=0;async function At(){if(!L())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++El;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=Y(),i=n?J().filter(r=>r.id===n):J(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([v.getPendingApprovals(r.id),v.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==El)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}av(a),kl=o,Fp()}catch(n){if(t!==El)return;e.innerHTML=F({icon:q.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),E("load approvals",n)}}function Fp(){const e=document.getElementById("approvals-list");if(!e)return;const t=sv(),n=kl.length>0,i=!Rh();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${q.issues}</div>
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
            `:e.innerHTML=F({icon:q.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${kl.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(m=>{const g=m.attestation&&!m.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${f(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',$=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(m.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(m.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(m.name)}"
                                                data-ritual-artifact="${p(m.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${f(m.name)}
                                                    <span class="badge badge-ritual-${p(m.approval_mode)}">${f(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(m.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${$}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>u=>{const m=a(u).filter(d);return m.length>0?{...u,_filteredApprovals:m}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(_l).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(_l).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(_l).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;f$(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const u=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=d.dataset;try{await v.approveTicketRitual(m.ritualId,m.issueId),k(`Review ritual "${m.ritualName}" approved!`,"success"),await At()}catch(b){d.disabled=!1,u&&(u.disabled=!1),E("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;v$(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Hp(u.ritualId,u.issueId,u.ritualName,()=>At())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await v.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await At()}catch(u){d.disabled=!1,E("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Op(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function b$(){Ph(),Fp()}function _l(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(i.requested_by_name)}</strong>${i.requested_at?` (${ks(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${bt(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${f(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${ks(i.rejected_at)})`:""}: ${f(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
                        data-ritual-id="${p(i.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(i.ritual_name)}">Reject</button>`,m=s?`<div class="gate-ritual-actions">
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
                    <span class="gate-ritual-name">${f(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${f(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${d}
                </div>
                ${m}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.issue_id)}" class="gate-issue-link">
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
    `}te({"view-issue-from-modal":(e,t)=>{e.preventDefault(),H(),oe(t.issueId)},"dismiss-approvals-explainer":()=>{b$()},"retry-load-approvals":()=>At()});const Ja={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},eo={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Up=0;function Gp(e){Up=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=zp(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function zp(e="",t="",n=""){const i=Up++,s=Object.keys(Ja).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?Ja[e]:Ja.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${eo[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function y$(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",zp()),to()}function w$(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),to()}function $$(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=Ja[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${eo[o]}</option>`).join(""),Vp(e),to()}function Vp(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Es(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function to(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Wp(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Es("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Es("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw Es(`Duplicate condition: ${r} ${eo[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(m=>m.trim()).filter(m=>m):[];else if(l==="gte"||l==="lte"){if(!d)throw Es(`Please enter a numeric value for ${r} ${eo[l]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(d,10);if(isNaN(m))throw Es(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=m}else t[u]=d}return to(),Object.keys(t).length>0?t:null}te({"add-condition-row":()=>{y$()},"remove-condition-row":(e,t)=>{w$(Number(t.rowId))},"update-operator-options":(e,t)=>{$$(Number(t.rowId))},"toggle-value-input":(e,t)=>{Vp(Number(t.rowId))}});let we=[],xl=null;const Kp=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];lt((e,t)=>{e==="currentProject"&&(t&&xh(t),Kp.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),H$(t||""))});const no={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Yp(e){xl=e}function J(){return we}function k$(e){we=e}function vi(e){const t=we.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return no[n]||no.fibonacci}function io(e,t){if(e==null)return"No estimate";const i=vi(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Il(e,t){return e==null||e===0?!1:!vi(t).some(i=>i.value===e)}function E$(e){const t=we.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(no[n]||no.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function ut(){var t,n;const e=(t=L())==null?void 0:t.id;if(e)try{const i=await v.getProjects(e);if(((n=L())==null?void 0:n.id)!==e)return;we=i,Xp(),Qp()}catch(i){E("load projects",i)}}function Qp(){const e=Y();if(e&&we.some(i=>i.id===e))return;const t=Sl();if(t&&we.some(i=>i.id===t)){ct(t);return}const n=jd();if(n&&we.some(i=>i.id===n)){ct(n);return}we.length>0&&ct(we[0].id)}function Xp(){const e='<option value="">All Projects</option>'+we.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+we.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=Y();Kp.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Zp(){return jd()}function qn(){const e=document.getElementById("projects-list");if(we.length===0){e.innerHTML=F({icon:q.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=we.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${se(t.color)}20; color: ${se(t.color)}">
                    ${f(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${f(t.name)}</div>
                <button class="grid-item-edit" data-action="view-project-settings" data-project-id="${p(t.id)}" title="Project settings">
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
    `).join("")}function _$(e){ct(e),N("issues")}function Jp(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function x$(e){e.preventDefault();const t=L();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(t.id,n),await ut(),qn(),H(),k("Project created!","success")}catch(i){E("create project",i)}return!1}async function I$(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await ut(),qn(),H(),k("Project updated!","success")}catch(i){E("update project",i)}return!1}async function S$(e){const t=we.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await ut(),qn(),H(),k("Project deleted","success")}catch(n){E("delete project",n)}}let Be=null;function em(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function T$(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await v.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Be!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${p(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${p(a.id)}">${f(a.identifier)} ${f(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function tm(e){Be=e,we.length===0&&await ut();const t=we.find(n=>n.id===e);if(!t){k("Project not found","error"),N("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,em("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),em("ps-require-epic-on-close",t.require_epic_on_close===!0),T$(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),nm("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function nm(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Kt||Kt.length===0)&&_s()}function L$(){Be=null,Kt=[]}function C$(e){Be=e}function A$(){return Kt}async function B$(){if(!Be)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(Be,t),await ut(),k("Settings saved","success");const n=we.find(i=>i.id===Be);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function D$(){if(!Be)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await v.updateProject(Be,n),await ut(),k("Settings saved","success")}catch(o){E("save settings",o)}}let Kt=[];async function _s(){if(!Be)return!1;try{return Kt=await v.getRituals(Be),M$(),typeof xl=="function"&&xl(),!0}catch(e){return E("load rituals",e),!1}}function M$(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Kt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Kt.filter(i=>i.trigger==="ticket_close"),n=Kt.filter(i=>i.trigger==="ticket_claim");bi("ps-sprint-rituals-list",e,"sprint"),bi("ps-close-rituals-list",t,"close"),bi("ps-claim-rituals-list",n,"claim")}function bi(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${bt(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${f(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${f(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${p(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${p(a.id)}" data-ritual-name="${p(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function im(e){if(!Be)return;let t=[];try{t=await v.getRitualGroups(Be)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${t.map(n=>`<option value="${p(n.id)}" data-mode="${p(n.selection_mode)}">${f(n.name)} (${f(n.selection_mode)})</option>`).join("")}
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
        ${Gp(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,G()}function j$(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function R$(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function sm(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(Be,{name:t,selection_mode:n})).id}return e.value||null}async function P$(e){var s;e.preventDefault();let t;try{t=Wp()}catch{return!1}let n;try{n=await sm()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.createRitual(Be,i),await _s(),H(),k("Ritual created!","success")}catch(a){E("create ritual",a)}return!1}async function q$(e){const t=Kt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(Be)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form data-action="update-project-ritual" data-ritual-id="${p(e)}">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${p(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${f(t.prompt)}</textarea>
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
          ${n.map(o=>`<option value="${p(o.id)}" data-mode="${p(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${f(o.name)} (${f(o.selection_mode)})</option>`).join("")}
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
        ${Gp(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,G()}async function N$(e,t){var a;e.preventDefault();let n;try{n=Wp()}catch{return!1}let i;try{i=await sm()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await v.updateRitual(t,s),await _s(),H(),k("Ritual updated!","success")}catch(o){E("update ritual",o)}return!1}async function O$(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await _s(),k("Ritual deleted","success")}catch(n){E("delete ritual",n)}}te({"view-project":(e,t)=>{_$(t.projectId)},"view-project-settings":(e,t)=>{tm(t.projectId)},"create-project":e=>{x$(e)},"update-project":(e,t)=>{I$(e,t.projectId)},"confirm-delete-project":(e,t)=>{S$(t.projectId)},"edit-project-ritual":(e,t)=>{q$(t.ritualId)},"delete-project-ritual":(e,t)=>{O$(t.ritualId,t.ritualName)},"create-project-ritual":e=>{P$(e)},"update-project-ritual":(e,t)=>{N$(e,t.ritualId)},"toggle-ritual-conditions":()=>{j$()},"ritual-group-change":()=>{R$()}});function Sl(){const t=new URLSearchParams(window.location.search).get("project");return t||Zp()}function H$(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Tl={},am=new Map;let Ll=null,Cl=null,Al=null,Bl=null,Dl=null,Ml=null,jl=null,om=!1;function F$(e){Object.assign(Tl,e)}function U$({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(Ll=e),t&&(Cl=t),n&&(Al=n),i&&(Bl=i),s&&(Dl=s),a&&(Ml=a),o&&(jl=o)}function rm(){return Object.keys(Tl)}const G$=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],lm={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function xs(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function cm(){Ll&&Ll()}function N(e,t=!0,{transition:n=!1}={}){if(t&&mn(),Qi(e),t){let a;const o=Sl();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:G$.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}xs(e),cm();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Tl[e];s&&s(),t&&window.scrollTo(0,0)}function dm(){var s;Qi(null);const e=window.location.pathname.split("/").filter(Boolean),t={"gate-approvals":"approvals"},n=e.length===0?"my-issues":t[e[0]]||e[0],i=e.length<=1&&rm().includes(n);document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden")),i?((s=document.getElementById(`${n}-view`))==null||s.classList.remove("hidden"),xs(n)):xs(lm[e[0]]||null)}function Rl(){var i;const t=window.location.pathname.split("/").filter(Boolean);Bl&&Bl(),C()||Qi("my-issues");let n="my-issues";if(t.length===0||t[0]==="")N("my-issues",!1);else if(Cl&&Cl(t)){const s=lm[t[0]];s&&xs(s);return}else{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),rm().includes(n)?N(n,!1):(n="my-issues",N("my-issues",!1))}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function mn(){am.set(window.location.href,window.scrollY)}function Pl(e){mn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Dl&&Dl(e)}function um(e){mn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Ml&&Ml(e)}function pm(){const e=am.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{jl&&jl(),window.scrollTo(0,e)})}function mm(){om||(om=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Al&&Al(e.state)){pm();return}(t=e.state)!=null&&t.view?N(e.state.view,!1):Rl(),pm()}))}let Yt=0,yi=!1,Is=null,so=null,Ss=0;const Nn=new Map;function ao(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Yt===0&&!yi),e.textContent=yi?"Stopped":"Offline",e.title=yi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ke(e,t){return Nn.has(e)||Nn.set(e,new Set),Nn.get(e).add(t),()=>{var n;return(n=Nn.get(e))==null?void 0:n.delete(t)}}function z$(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const V$=1e3;function oo(){so&&(clearTimeout(so),so=null)}const W$="chaotic",ql=4001,K$=4003,Y$="chaotic.bearer.";function Q$(e){return[W$,Y$+e]}function fm(e,{isReconnect:t=!1}={}){Is&&(clearTimeout(Is),Is=null),oo();const n=lv();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),br(null)),!t&&(Yt>0||yi)&&(Yt=0,yi=!1,ao());const i=v.getToken();if(!i)return;const s=++Ss,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,Q$(i));br(r);let l=!1;const c=()=>{if(l||s!==Ss)return;l=!0,oo();const d=Yt>0;d&&k("Live updates reconnected","success"),Yt=0,ao(),d&&Nl({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Ss&&(console.log("WebSocket connected"),oo(),so=setTimeout(c,V$))},r.onmessage=d=>{if(s!==Ss)return;c();let u;try{u=JSON.parse(d.data)}catch(m){console.error("WebSocket: malformed message",m);return}Nl(u)},r.onclose=d=>{if(s!==Ss)return;console.log("WebSocket disconnected"),oo();const u=d==null?void 0:d.code;if(u===ql||u===K$){br(null),Yt=0;const g=u===ql&&rr()===i;yi=!g,ao();let b="forbidden";u===ql&&(b=g?"unauthorized":"superseded"),Nl({type:b,entity:"connection",data:{code:u,teamId:e}});return}Yt++,Yt===1&&k("Live updates disconnected. Reconnecting...","warning"),ao();const m=z$(Yt-1);Is=setTimeout(()=>{Is=null,L()&&L().id===e&&fm(e,{isReconnect:!0})},m)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Nl(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Nn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Nn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Nn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const X$={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let wi=0,Bt=!1,ve=null,fn=null;const Ts=new Set,Dt=new Map,pt=new Map;function gm(e){Dt.get(e)===null&&Dt.set(e,wi)}function Ol(e){const t=pt.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=wi)}function Z$(e){return e.filter(t=>!Dt.has(t.id)).map(t=>{const n=pt.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Bt&&pt.has(t.id)&&t.id!==ve))}function J$(e){for(const[t,n]of Dt)n!==null&&e>n&&Dt.delete(t);for(const[t,n]of pt)n.confirmedAfter!==null&&e>n.confirmedAfter&&pt.delete(t)}function ek(e,t){t!=null&&t.id&&(e==="archived"?(Dt.has(t.id)||Dt.set(t.id,null),gm(t.id)):e==="read"&&Ol(t.id))}async function $i(){const e=L();if(e){try{const t=await v.getInboxUnreadCount(e.id);Ji(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Ls()}}function Ls(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=ma();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function Cs({focusFirst:e=!1,background:t=!1}={}){const n=L();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++wi;t||(fn={focusFirst:e||!!(fn!=null&&fn.focusFirst)},ve=null,tk(i));try{const a=await v.getInbox(n.id,{unread:Bt,limit:100});if(s!==wi)return;const o=new Set(Dt.keys());J$(s);const r=Z$(a||[]),l=fn;fn=null,l?(Ft(r),Bs(),l.focusFirst&&!nt()&&sk()):nk(r,o)}catch(a){if(s!==wi)return;fn?(fn=null,i.innerHTML=F({icon:q.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",a)):console.error("Failed to refresh inbox:",a)}$i()}function tk(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function ro(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function hm(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function vm(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function bm(e,t){if(!e)return;const n=ro(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=hm(n||t)),i==null||i.focus({preventScroll:!0})}function nk(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=he(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=vm(),c=window.scrollY,d=n.scrollTop;let u=e;if(ve&&!e.some(b=>b.id===ve)){const b=i.find(y=>y.id===ve);if(b&&Bt&&!t.has(ve)){u=[...e];const y=u.findIndex($=>$.created_at<b.created_at);u.splice(y===-1?u.length:y,0,b)}else ve=null}Ft(u),Bs();let m=-1;o&&(m=u.findIndex(b=>b.id===o),m===-1&&u.length&&(m=Math.min(r,u.length-1))),m>=0?As(m,{focus:!1}):pa(-1);const g=m>=0?n.querySelectorAll(".inbox-row")[m]:null;bm(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function ik(e,t){if(!(t!=null&&t.id))return!1;const n=he().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function ki(e){const t=he();for(const n of new Set(e)){const i=ro(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?vm():null,o=document.createElement("template");o.innerHTML=Em(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),bm(a,r)}}function As(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){pa(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),pa(i),t&&hm(n[i]).focus({preventScroll:!0})}function sk(){As(0)}async function Hl(e){const t=he(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;ve===e&&(ve=null),Dt.set(e,null),Ft(t.filter(a=>a.id!==e)),s&&Ji(Math.max(0,ma()-1)),Bs(),Ls(),As(n);try{await v.archiveInbox(e),gm(e)}catch(a){Dt.delete(e),console.error("Failed to archive inbox entry:",a)}}function ym(e){var s,a;const n=he().findIndex(o=>o.id===e);if(n===-1)return;const i=ve;ve=i===e?null:e,ve===e&&wm(e),ki([i,e]),As(n),ve===e&&((a=(s=ro(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function wm(e){const t=he(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,pt.set(e,{readAt:i,confirmedAfter:null}),Ft([...t]),Ji(Math.max(0,ma()-1)),Ls(),v.markInboxRead(e).then(()=>Ol(e),s=>{var o;((o=pt.get(e))==null?void 0:o.readAt)===i&&pt.delete(e);const a=he().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Ft([...he()]),ki([e])),$i(),E("mark inbox entry read",s)})}function ak(e){var i;const n=he().findIndex(s=>s.id===e);if(n!==-1){if(wm(e),Bt)ve===e&&(ve=null),Ft(he().filter(s=>s.id!==e)),Bs(),As(n);else if(ki([e]),!document.activeElement||document.activeElement===document.body){const s=ro(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function ok(){if(ve===null)return!1;const e=ve;return ve=null,ki([e]),!0}function $m(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function rk(e){if(Ts.has(e))return;const t=he().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";Ts.add(e),$m(e,!0);try{await v.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){Ts.delete(e),$m(e,!1),E(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}Ts.delete(e),Hl(e)}function lk(){km(!Bt)}function km(e){e!==Bt&&(Bt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Bt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Cs({focusFirst:!0}))}const ck='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',dk='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function uk(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function Em(e){const t=!e.read_at,n=e.id===ve,i=X$[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${p(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${p(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${f(uk(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${p(e.kind)}">${f(i)}</span>
                        ${s?`<span class="inbox-row-source">${f(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${f(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${f(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?pk(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${p(e.id)}" title="Mark read" aria-label="Mark read">${ck}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">${dk}</button>
                </span>
                <span class="inbox-row-time">${f(ks(e.created_at))}</span>
            </div>
        </div>
    `}function pk(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${f(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${Ts.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${f(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${p(e.id)}"
                    ${e.issue_id?`data-issue-id="${p(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${p(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${p(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${p(n)}" role="region"
             aria-label="${p(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${f(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${f(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function Bs(){const e=document.getElementById("inbox-list");if(!e)return;const t=he();if(t.length===0){e.innerHTML=F({icon:q.inbox,heading:Bt?"No unread items":"Inbox zero",description:Bt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=fk(t)}function mk(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function fk(e){const t=[];for(const n of e){const i=mk(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${f(n.label)}</h3>
            ${n.entries.map(s=>Em(s)).join("")}
        </section>
    `).join("")}async function gk(e){var s;const t=he().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();pt.set(e,{readAt:n,confirmedAfter:null});try{await v.markInboxRead(e)}catch(a){((s=pt.get(e))==null?void 0:s.readAt)===n&&pt.delete(e);const o=he().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Ft([...he()]),ki([e])),console.error("Failed to mark inbox entry read:",a);return}Ol(e);const i=he().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Ft([...he()]),Ji(Math.max(0,ma()-1)),Ls(),ki([e])):$i()}async function hk(){const e=L();if(e)try{await v.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of he())n.read_at||pt.set(n.id,{readAt:t,confirmedAfter:wi});Ft(he().map(n=>({...n,read_at:n.read_at||t}))),Ji(0),Ls(),Bs()}catch(t){E("mark all inbox entries read",t)}}function vk(e){e.entryId&&gk(e.entryId),e.issueId?oe(e.issueId):e.documentId&&Ae(e.documentId)}function bk(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Hl(e.dataset.entryId)}function yk(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&ym(e.dataset.entryId)}const wk='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function $k(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(wk);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function kk(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}te({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&kk((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||$k(e.target,n)||(e.preventDefault(),t.entryId&&ym(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),vk(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&rk(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Hl(t.entryId)},"toggle-inbox-unread-filter":()=>lk(),"set-inbox-filter":(e,t)=>km(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&ak(t.entryId)},"mark-all-inbox-read":()=>hk(),"retry-load-inbox":()=>Cs({focusFirst:!0})});let Ds=[],On=[],Fl=[],Ul=[];function Gl(){return Ds}function _m(e){Ds=Array.isArray(e)?e:[],xm()}function Hn(){return On}async function lo(e=null){try{Ds=await(e||v.getMyTeams()),xm()}catch(t){E("load teams",t)}}function xm(){const e=document.getElementById("team-list");Ds.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ds.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${f(t.name)}</button>
        `).join("")}async function co(e,t=!1,{seed:n=null}={}){Fn=null,Zn(e),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),fm(e.id),n&&_k(n)){let a=!1;try{xk(n),Fn=e.id,t?Rl():N(C()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),Fn=null}if(a){Im(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await Im(e),t?Rl():N(C()||"my-issues")}let Fn=null;function Ek(){var e;return Fn&&Fn===((e=L())==null?void 0:e.id)?Fn:null}async function Im(e){var t;await Promise.all([ut(),Gk(),Sk(),by(),$i()]),((t=L())==null?void 0:t.id)===e.id&&(Fn=e.id)}function _k(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function xk(e){k$(Array.isArray(e.projects)?e.projects:[]),Xp(),Qp(),Zi(Array.isArray(e.labels)?e.labels:[]),On=Array.isArray(e.members)?e.members:[],gy(e.agents),ts(Hn,Dn),ei(),kv(e.issues)}function Sm(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Ik(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Sk(){var t,n;const e=(t=L())==null?void 0:t.id;if(e)try{const i=await v.getTeamMembers(e);if(((n=L())==null?void 0:n.id)!==e)return;On=i,ts(Hn,Dn),ei()}catch(i){console.error("Failed to load team members:",i),E("load team members",i)}}function zl(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Vl=0;async function Wl(){if(!L())return;const e=++Vl,t=document.getElementById("team-members-list");t&&(t.innerHTML=zl());try{const n=await v.getTeamMembers(L().id);if(e!==Vl)return;On=n,ts(Hn,Dn),ei(),Tk()}catch(n){if(e!==Vl)return;t&&(t.innerHTML=F({icon:q.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),On=[],Tm(),E("load team members",n)}}function uo(){var n;const e=(n=_e())==null?void 0:n.id,t=On.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function Tm(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!uo())}function Tk(){const e=document.getElementById("team-members-list"),t=uo();Tm(),e.innerHTML=On.map(n=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(n.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${f(n.user_name||"Unknown")}</span>
                    <span class="member-email">${f(n.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${n.role}</span>
                ${t&&n.user_id!==_e().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Kl=0;async function po(){if(!L())return;const e=++Kl,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=zl());try{const n=await v.getTeamInvitations(L().id);if(e!==Kl)return;Fl=n,Lk()}catch(n){if(e!==Kl)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Lk(){const e=document.getElementById("team-invitations-list");if(Fl.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=uo();e.innerHTML=Fl.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${f(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${f(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${p(n.id)}" title="For an invitee whose verification email never arrives">Code for invitee</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let Yl=0;async function Lm(){if(!L())return;const e=++Yl,t=document.getElementById("team-agents-list");t&&(t.innerHTML=zl());try{const n=await v.getTeamAgents(L().id);if(e!==Yl)return;Ul=n,Ck()}catch(n){if(e!==Yl)return;t&&(t.innerHTML=F({icon:q.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),E("load team agents",n)}}function Ck(){const e=document.getElementById("team-agents-list");if(e){if(Ul.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Ul.map(t=>{const n=f(t.name),i=f(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${f(s)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${i} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function Cm(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function Ak(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await v.createInvitation(L().id,t,n);if(await po(),i&&i.accept_url)return Mk(t,Dk(i.accept_url),i.email_queued===!0),!1;H(),k("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){Bk(i)?k(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):E("send invitation",i)}return!1}function Bk(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Am(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function Dk(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Am(n.hostname)||Am(i.hostname)?e:i.origin+n.pathname}function Mk(e,t,n=!1){var a;const i=f(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${f(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,nt()||G(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Bm()}function Bm(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function jk(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),k("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),k("Could not copy: the link is selected, copy it by hand","error")}}async function Rk(e){let t;try{t=await v.issueInvitationVerificationCode(L().id,e)}catch(n){E("get a verification code",n);return}qk(t)}function Pk(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function qk(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=Pk(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">Send this code only through a channel you already trust for the invitee, never to whoever asked you for it. Anyone who saw the link can sign up with their address and ask, and chooses the name shown below.</p>
            <p>The account it is for:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${f(t.name||"")}</strong></li>
                <li>Email: ${f(t.email||"")}</li>
                <li>Signed up: ${f(n)} (${f(i)})</li>
                <li>Already in a team: ${t.member_of_any_team?"yes":"no"}</li>
            </ul>
            <p class="warning-text">A signup shortly after you sent the link fits both the invitee and someone who saw the link: confirm with the invitee directly. One that predates the invitation was not made from the link, but check that the invitee recognises it. If they don't, don't give out the code: cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${f((e==null?void 0:e.code)||"")}</code>
            </div>
            <p>Expires at ${f(s)}. It lets that account accept this invitation only: they enter it on the invitation page, or run <code>chaotic team accept-invite &lt;link&gt; --code &lt;code&gt;</code>. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,nt()||G(),Bm("invitation-code")}async function Nk(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(L().id,e),await Wl(),k("Member removed!","success")}catch(t){E("remove member",t)}}async function Ok(e){try{await v.deleteInvitation(L().id,e),await po(),k("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function Dm(){Sm(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,G()}function Hk(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
                <textarea id="team-description">${f(L().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,G())}async function Fk(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await lo(),await co(n),H(),k("Team created!","success")}catch(n){E("create team",n)}return!1}async function Uk(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(L().id,t);Zn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await lo(),H(),k("Team updated!","success")}catch(n){E("update team",n)}return!1}async function Gk(){var t,n;const e=(t=L())==null?void 0:t.id;if(e)try{const i=await v.getLabels(e);if(((n=L())==null?void 0:n.id)!==e)return;Zi(i)}catch(i){console.error("Failed to load labels:",i),E("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),te({"select-team":(e,t)=>{co(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Nk(t.userId)},"delete-invitation":(e,t)=>{Ok(t.invitationId)},"issue-invitation-code":(e,t)=>{Rk(t.invitationId)},"retry-load-team-invitations":()=>{po()},"retry-load-team-members":()=>{Wl()},"retry-load-team-agents":()=>{Lm()},"invite-member":e=>{Ak(e)},"copy-invite-link":()=>{jk()},"dismiss-invite-link":()=>{H()},"create-team":e=>{Fk(e)},"update-team":e=>{Uk(e)}});let Mt=null,Qt=0,Ei=null,_i=null,Ms=null,Ql=!1;function zk(){return Ih()}function Mm(){Sh()}function jm(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Vk(){Mt||(Mt=document.createElement("div"),Mt.id="onboarding-overlay",Mt.className="onboarding-overlay",document.getElementById("app").appendChild(Mt))}function js(){if(!Mt)return;const e=Ql?Pm():Rm(),t=e[Qt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Qt?" active":""}${s<Qt?" completed":""}"></span>`).join("");Mt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Rm(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=jm(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=jm(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Ei&&(e.textContent=`${Ei.name} (${Ei.key})`),t&&_i&&(t.textContent=`${_i.name} (${_i.key})`),n&&Ms&&(n.textContent=`${Ms.identifier} - ${Ms.title}`)}}]}function Pm(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Xl(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Zl(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function xi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Wk(){const e=Ql?Pm():Rm();Qt<e.length-1&&(Qt++,js())}function Kk(){Mm(),Nm(),Un()}function Yk(){Mm(),Nm(),Un()}async function Qk(e){e.preventDefault(),Zl("onboarding-team-error"),xi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Ei=await v.createTeam({name:t,key:n}),Qt++,js()}catch(i){Xl("onboarding-team-error",i.message||"Failed to create team"),xi("onboarding-team-submit",!1)}}async function Xk(e){e.preventDefault(),Zl("onboarding-project-error"),xi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{_i=await v.createProject(Ei.id,{name:t,key:n}),Qt++,js()}catch(i){Xl("onboarding-project-error",i.message||"Failed to create project"),xi("onboarding-project-submit",!1)}}async function Zk(e){e.preventDefault(),Zl("onboarding-issue-error"),xi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Ms=await v.createIssue(_i.id,{title:t}),Qt++,js()}catch(n){Xl("onboarding-issue-error",n.message||"Failed to create issue"),xi("onboarding-issue-submit",!1)}}function qm(e=!1){Ql=e,Qt=0,Ei=null,_i=null,Ms=null,Vk(),js()}function Nm(){Mt&&(Mt.remove(),Mt=null)}function Om(){Th(),qm(!0)}te({"onboarding-next":e=>{e.preventDefault(),Wk()},"onboarding-skip":e=>{e.preventDefault(),Kk()},"onboarding-finish":e=>{e.preventDefault(),Yk()},"onboarding-create-team":e=>{Qk(e)},"onboarding-create-project":e=>{Xk(e)},"onboarding-create-issue":e=>{Zk(e)}});const Hm="/oauth/consent/";function Jk(e){if(!e||!e.startsWith(Hm))return null;const t=e.slice(Hm.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function eE(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function tE(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function nE(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Fm={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function mo(e){const t=Fm[e.trust]||Fm.unverified,n=e.host?` · ${f(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${f(t)}${n}</span>`}function iE(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${f(n.name)}</option>`).join("")}function sE(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${f(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Um(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${f(i.name+a)}</option>`)}return n.join("")}function Gm(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${f(t.name)} <span class="oauth-muted">${f(t.key)}</span>
        </label>`).join("")}function aE(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${f(t.name)}${f(i)}
        </label>`}).join("")}function oE(e,t){const n=f(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${mo(t.client)}</p>
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
        </div>`}function rE(e,t){if(t.acts_as==="person"){oE(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=f(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${f(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${mo(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${f(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${iE(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Um(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Gm(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${aE(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Jl(e,t)}function Jl(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=sE(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function lE(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function cE(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Rs(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${f(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function dE(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{v.logout(),t()})}function uE(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=Um(d,null),e.querySelector("#oauth-projects").innerHTML=Gm(d),Jl(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Jl(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const u=d?await v.approveOAuthRequest(t,lE(e)):await v.denyOAuthRequest(t);if(!eE(u.redirect)){Rs(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Rs(e,"It has expired, was already answered, or belongs to someone else.");return}cE(e,u&&u.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function pE(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=tE();nE(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await v.getOAuthRequest(e)}catch(a){a&&a.status===404?Rs(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?dE(i,n):a&&a.status===403?Rs(i,"Only a person signed in to Chaotic can approve an app."):Rs(i,a&&a.message||"Something went wrong");return}rE(i,s),uE(i,e,s,t)}const ec="/invite/",Ps="/invite",tc="chaotic.inviteToken",zm="invite-auth-notice";let nc=null;const mE="This invitation is no longer valid.",fE={owner:"an owner",admin:"an admin",member:"a member"};function gE(e){if(!e||!e.startsWith(ec))return null;const t=e.slice(ec.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function Vm(){const{pathname:e}=window.location,t=gE(e);if(t){nc=t;try{sessionStorage.setItem(tc,t)}catch{}return history.replaceState(null,"",Ps),t}if(!Wm(e))return null;let n=null;try{n=sessionStorage.getItem(tc)}catch{}const i=n||nc;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function Wm(e){return e===Ps||e===`${Ps}/`}function Km(e){return Wm(e)||!!(e&&e.startsWith(ec))}function ic(){nc=null;try{sessionStorage.removeItem(tc)}catch{}}function hE(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function vE(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function sc(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function Ym(){const e=vE();return fo(),sc(e),e}function bE(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),fo()}function fo(){var e;(e=document.getElementById(zm))==null||e.remove()}function ac(e){const t=e.invited_by_name?`<strong>${f(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=fE[e.role]||`a ${f(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${f(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${f(e.email_hint)}</strong>${yE(e)}</p>`}function yE(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${f(n)}`}const wE="Ask whoever invited you to send a new invitation.",$E="Reload the page to try again.";function oc(e,t=mE,n=wE){e.innerHTML=`
        <div class="invite-page">
            <h1>${f(t)}</h1>
            <p class="invite-muted">${f(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function kE(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Qm(){window.location.pathname!==Ps&&history.replaceState(null,"",Ps),kE(Ym())}function EE(e,t){e.innerHTML=`
        <div class="invite-page">
            ${ac(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function _E(e,t,n){const i=hE(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${f(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${ac(t)}
                ${s}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${f(t.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;return}e.innerHTML=`
        <div class="invite-page">
            ${ac(t)}
            ${s}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${f(n.email)}</strong>.</p>
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
        </div>`}function xE(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function IE(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=u=>{l.textContent=u,l.classList.remove("hidden")},d=()=>{var u;a.classList.remove("hidden"),(u=o.focus)==null||u.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const u=await v.requestEmailVerification(),m=xE(u.expires_at);c(`We sent a code to ${u.email}${m?`; it works until ${m}`:""}.`),s.textContent="Send a new code",d()}catch(u){const m=u&&u.detail&&u.detail.error_code;if(u&&u.status===401){n();return}if(m==="email_already_verified"){t();return}c(u&&u.message||"Something went wrong"),u&&u.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async u=>{var g;if(u.preventDefault(),r.disabled)return;const m=o.value.trim();if(m){r.disabled=!0;try{await v.confirmEmailVerification(m)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function SE(e,t){fo();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=zm,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${f(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${f(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),fo(),t()})}function go(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function TE(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,u;const a=Ym();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await v.getInvitation(e)}catch(m){m&&m.status===404?(ic(),oc(a)):oc(a,m&&m.message||"Something went wrong.",$E);return}if(!t){EE(a,o);const m=g=>{SE(o,()=>sc(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>m("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>m("signup"));return}_E(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async m=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=m===void 0?await v.acceptInvitation(e):await v.acceptInvitation(e,m)}catch($){l=!1,r.disabled=!1;const T=$&&$.detail&&$.detail.error_code;if(m!==void 0&&(T==="invalid_verification_code"||T==="invitation_code_expired"||$&&$.status===429)){go(a,$&&$.message||"That code did not work."),(y=(b=a.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}$&&$.status===401?s():$&&($.status===404||$.status===400)?(ic(),oc(a)):$&&$.status===403&&$.detail&&$.detail.error_code==="email_unverified"?(go(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):$&&$.status===403?go(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):go(a,$&&$.message||"Something went wrong");return}ic(),Xm(a,o);try{await i(g.team_id,o.team_name)}catch($){console.error("Joined the team but could not open it:",$),sc(a),Xm(a,o)}};r.addEventListener("click",()=>c()),(u=a.querySelector("#invite-admin-code-form"))==null||u.addEventListener("submit",m=>{m.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),IE(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function Xm(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${f(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${f(t.team_name)}</a>
            </div>
        </div>`}function rc(e){return TE(e,{user:_e(),showAuth:t=>{Os(),t==="signup"?nf():tf()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),bE(),await Un({teamId:t}),k(`You joined ${n}`,"success")},signOut:()=>{v.logout(),Ht(null),Zn(null),rc(e)}})}async function Zm(){const e=Vm();if(e){await rc(e);return}if(Km(window.location.pathname)){Qm();return}Os()}async function Un({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=Jk(window.location.pathname);if(i){await pE(i);return}const s=Vm();if(s){await rc(s);return}if(Km(window.location.pathname)){Qm();return}RE(),dm(),cc(),DE();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await LE(n,a,t);return}await lo(t);const o=Gl();if(o.length===0&&!zk()){qm();return}o.length===0&&Qi("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await co(c,!0)}}finally{mm()}}async function LE(e,t,n){_m(e.teams);try{await co(t,!0,{seed:e})}finally{mm()}Promise.resolve(n||lo().then(Gl)).then(async i=>{var a;if(!Array.isArray(i))return;_m(i);const s=i.find(o=>o.id===t.id);if(!s){await AE(),window.location.reload();return}if(((a=L())==null?void 0:a.id)===s.id&&s.name!==L().name){Zn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const CE=2e3;let Ii=null,Jm=!1,ef=!1;function AE(){return ef=!0,clearTimeout(Ii),Ii=null,ur()}function lc(){if(clearTimeout(Ii),Ii=null,ef)return Promise.resolve();const e=_e(),t=L();return!(e!=null&&e.id)||!(t!=null&&t.id)||Ud(rr())!==e.id||Ek()!==t.id?Promise.resolve():Uh(e.id,{user:e,teams:Gl(),teamId:t.id,projects:J(),labels:hr(),members:Hn(),agents:Dn(),issues:$v({maxQueries:3})})}function BE(){clearTimeout(Ii),Ii=setTimeout(lc,CE)}function DE(){Jm||(Jm=!0,gv(BE),document.addEventListener("visibilitychange",ME),window.addEventListener("pagehide",jE))}function ME(){document.visibilityState==="hidden"&&lc()}function jE(){lc()}let Si=null,qs=null,yt=null,wt=null;function Ns(){Si||(Si=document.getElementById("auth-screen"),qs=document.getElementById("main-screen"),yt=document.getElementById("login-form"),wt=document.getElementById("signup-form"))}function Os(){Ns(),Si&&Si.classList.remove("hidden"),qs&&qs.classList.add("hidden")}function RE(){Ns(),Si&&Si.classList.add("hidden"),qs&&qs.classList.remove("hidden")}function tf(){Ns(),yt&&yt.classList.remove("hidden"),wt&&wt.classList.add("hidden")}function nf(){Ns(),yt&&yt.classList.add("hidden"),wt&&wt.classList.remove("hidden")}async function PE(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),Ht(await v.getMe()),await Un(),k("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function qE(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await v.signup(t,n,i),await v.login(n,i),Ht(await v.getMe()),await Un(),k("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function sf(){v.logout(),Ht(null),Zn(null),Os(),k("Signed out","success")}function NE(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function cc(){var i;const e=_e();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",fr(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?NE(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function OE(){Ns();const e=yt==null?void 0:yt.querySelector("form");e&&e.addEventListener("submit",s=>PE(s));const t=wt==null?void 0:wt.querySelector("form");t&&t.addEventListener("submit",s=>qE(s));const n=yt==null?void 0:yt.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),nf()});const i=wt==null?void 0:wt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),tf()})}let dc=[];async function uc(){try{dc=await v.getApiKeys(),HE()}catch(e){E("load API keys",e)}}function HE(){const e=document.getElementById("api-keys-list");if(e){if(dc.length===0){e.innerHTML=F({icon:q.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=dc.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${it(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${it(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function FE(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,G()}async function UE(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);H(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,G()}catch(n){E("create API key",n)}return!1}async function GE(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function zE(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),k("API key revoked","success"),await uc()}catch(n){E("revoke API key",n)}}te({"create-api-key":e=>{UE(e)},"copy-api-key":()=>{GE()},"dismiss-api-key-modal":()=>{H(),uc()},"revoke-api-key":(e,t)=>{zE(t.keyId,t.keyName)}});let pc=[];async function af(){try{pc=await v.getConnections(),WE()}catch(e){E("load connected apps",e)}}function mc(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function VE(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function WE(){const e=document.getElementById("connected-apps-list");if(e){if(pc.length===0){e.innerHTML=F({icon:q.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=pc.map(t=>t.acts_as==="person"?KE(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(mc(t))} ${mo(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${f(t.agent?t.agent.name:"an agent")}</span>
                    <span>${f(VE(t))}</span>
                    <span>policy ${f(t.policy)}</span>
                    <span class="api-key-date">Connected ${it(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${it(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${f(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(mc(t))}">Disconnect</button>
        </div>
    `).join("")}}function KE(e){const n=`${e.device_name||"A device"} · ${mc(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${f(n)} ${mo(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${it(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${it(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function YE(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await v.revokeConnection(e),k("App disconnected","success"),await af()}catch(n){E("disconnect app",n)}}te({"revoke-connection":(e,t)=>{YE(t.connectionId,t.connectionName)}});let fc=[];async function of(){try{fc=await v.getPushDevices(),QE()}catch(e){E("load push devices",e)}}const rf={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function lf(e){return e.label||e.platform||"Unnamed device"}function QE(){const e=document.getElementById("push-devices-list");if(e){if(fc.length===0){e.innerHTML=F({icon:q.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=fc.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${f(lf(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${f(t.platform)}</span>`:""}
                    <span>via ${f(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${it(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${it(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${f(String(t.failure_count))} failed deliveries</span>`:""}
                    ${rf[t.status]?`<span class="push-device-status">${f(rf[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(lf(t))}">Remove</button>
        </div>
    `).join("")}}async function XE(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await v.deletePushDevice(e),k("Device removed","success"),await of()}catch(n){E("remove push device",n)}}te({"remove-push-device":(e,t)=>{XE(t.installationId,t.deviceName)}});let ho=!1,Xt=0,gn=[],vo=[];function ZE(e){vo=e,gn=[...e]}function hn(){return ho}function JE(){if(ho)return;ho=!0,Xt=0,gn=[...vo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&bo()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>e_(n.target.value)),t.addEventListener("keydown",n_),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&t_(Number(i.dataset.commandIndex))}),Hs(),requestAnimationFrame(()=>t.focus())}function bo(){ho=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function e_(e){const t=e.toLowerCase().trim();t?gn=vo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):gn=[...vo],Xt=0,Hs()}function Hs(){const e=document.getElementById("command-results");if(!e)return;if(gn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};gn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Xt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function t_(e){Xt=e,Hs()}function cf(e){const t=gn[e];t&&(bo(),t.action())}function n_(e){switch(e.key){case"ArrowDown":e.preventDefault(),Xt=Math.min(Xt+1,gn.length-1),Hs();break;case"ArrowUp":e.preventDefault(),Xt=Math.max(Xt-1,0),Hs();break;case"Enter":e.preventDefault(),cf(Xt);break;case"Escape":e.preventDefault(),bo();break}}te({"execute-command":(e,t)=>{cf(Number(t.commandIndex))}});const i_=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function s_(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${f(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${f(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function a_(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${f(e.title)}</h4>
        ${e.shortcuts.map(s_).join("")}
    </div>`}function df(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${i_.map(a_).join("")}
        </div>
    `,G()}const yo=100,gc="status!=done,canceled",o_=["created","updated","priority","status","title","estimate"];function be(e){return e==null?"":f(String(e))}function uf(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${p(t)}">${be(n)}</a>`}function pf(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const hc=[{id:"identifier",label:"ID",fixed:!0,render:e=>uf(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>uf(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>be(Ee(e.status))},{id:"priority",label:"Priority",render:e=>be(Ue(e.priority))},{id:"type",label:"Type",render:e=>be(xt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>be(pf(e,"assignee"))},{id:"creator",label:"Creator",render:e=>be(pf(e,"creator"))},{id:"project",label:"Project",render:e=>be(e.project_key)},{id:"sprint",label:"Sprint",render:e=>be(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=se(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${be(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>be(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${p(e.parent_id)}">${be(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>be(it(e.created_at))},{id:"updated",label:"Updated",render:e=>be(it(e.updated_at))},{id:"completed",label:"Completed",render:e=>be(it(e.completed_at))},{id:"due",label:"Due",render:e=>be(it(e.due_date))}],wo=Object.fromEntries(hc.map(e=>[e.id,e])),r_=hc.filter(e=>e.fixed).map(e=>e.id),vc=["identifier","title","status","priority","assignee","updated"];function bc(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!wo[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...vc]:[...r_.filter(s=>!t.has(s)),...n]}function l_(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function c_(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?bc(t.get("cols").split(",")):[...vc],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function d_(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!l_(e.cols,vc)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function u_(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function p_({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=yo,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",u_(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],u=d.startsWith("-"),m=d.replace(/^[-+]/,"");let g=null;o_.includes(m)?(o.push("--sort",m,"--order",u?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${m}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function m_(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function f_(e,t){const n=bc(t).map(a=>wo[a]),i=n.map(a=>`<th data-col="${p(a.id)}">${be(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${p(a.id)}">${n.map(o=>`<td class="query-col-${p(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function g_(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let O=null,yc=null,Je=null,wc=0,Ti=!1,mf=!1;function re(e){return document.getElementById(e)}function ff(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function gf(e){const t=d_({...yc,cols:O.cols,group:O.group,view:O.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function h_(){const e=re("query-project-filter");if(!e)return;const t=['<option value="">All projects</option>'].concat(J().map(n=>`<option value="${p(n.id)}">${be(n.name)}</option>`));e.innerHTML=t.join(""),e.value=O.teamScope?"":O.projectId||""}function v_(){const e=re("query-columns-menu");e&&(e.innerHTML=hc.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${p(t.id)}"${O.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${be(t.label)}
        </label>`).join(""))}function $o(e){const t=re("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${be(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function hf(e){const t=re("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function $c(e){var t;(t=re("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function Fs(){const e=re("query-results"),t=re("query-pager");if(!e)return;if(!Je){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=Je;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=f_(n,O.cols),t&&(t.innerHTML=g_(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Ti&&$c(!0))}async function ko(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!O)return;const i=L(),s=O.teamScope?{teamId:i==null?void 0:i.id}:{projectId:O.projectId};if(!s.teamId&&!s.projectId){Je=null,Fs(),$o(O.teamScope?"Select a team first.":"Select a project.");return}const a=++wc,o=O.where===null?gc:O.where,r=re("query-results");Ti=!0,r&&r.classList.add("loading"),$c(!0);const l=()=>a===wc&&C()==="query";try{const c=await v.queryIssues({...s,where:o,order:O.order,skip:(O.page-1)*yo,limit:yo});if(!l())return;O.where=c.where,O.order=c.order||null,yc=ff(O),Je={issues:c.issues||[],total:c.total,skip:c.skip};const d=re("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),$o(null),Ti=!1,Fs(),gf(e),t&&t()}catch(c){if(!l())return;Ti=!1,n?n():Je=null,Fs(),$o(m_(c))}finally{a===wc&&(Ti=!1,r&&r.classList.remove("loading"),$c(!1))}}function vf(){if(!O)return;const e=re("query-where");return O.where=e?e.value.trim():"",O.page=1,ko("push")}function b_(e){if(O)return O.teamScope=!e,e&&(O.projectId=e),O.page=1,hf(null),ko("push",{onSuccess:()=>{e&&ct(e)}})}function y_(e,t){if(!O||!wo[e]||wo[e].fixed)return;const n=O.cols.filter(i=>i!==e);O.cols=bc(t?[...n,e]:n),Fs(),gf("replace")}function w_(e){if(!O||!Je||Ti)return;const t=O.page+e;if(t<1||e>0&&Je.skip+Je.issues.length>=Je.total)return;const n={page:O.page,result:Je};return O.page=t,ko("push",{onFailure:()=>{O.page=n.page,Je=n.result}})}async function $_(){if(!O)return null;const e=re("query-where"),t=e?e.value.trim():O.where??gc,n=O.teamScope?null:J().find(o=>o.id===O.projectId),{command:i,warning:s}=p_({where:t,order:O.order,teamScope:O.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:yo,skip:Je?Je.skip:0}),a=re("query-cli-preview");try{await navigator.clipboard.writeText(i),k(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),k("Could not copy; the command is shown below the box","warning")}return i}function k_(){var e,t,n,i,s,a,o;mf||(mf=!0,(e=re("query-where"))==null||e.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&!r.isComposing&&(r.preventDefault(),vf())}),(t=re("query-run-btn"))==null||t.addEventListener("click",()=>vf()),(n=re("query-copy-cli-btn"))==null||n.addEventListener("click",()=>$_()),(i=re("query-project-filter"))==null||i.addEventListener("change",r=>b_(r.target.value)),(s=re("query-columns-btn"))==null||s.addEventListener("click",r=>{r.stopPropagation();const l=re("query-columns-menu");if(!l)return;const c=l.classList.toggle("hidden")===!1;r.currentTarget.setAttribute("aria-expanded",String(c))}),(a=re("query-columns-menu"))==null||a.addEventListener("change",r=>{r.target.matches('input[type="checkbox"]')&&y_(r.target.value,r.target.checked)}),(o=re("query-pager"))==null||o.addEventListener("click",r=>{const l=r.target.closest("button[data-query-page]");!l||l.disabled||w_(Number(l.dataset.queryPage))}),document.addEventListener("click",r=>{var c;const l=re("query-columns-menu");l&&!l.classList.contains("hidden")&&!r.target.closest("#query-columns-picker")&&(l.classList.add("hidden"),(c=re("query-columns-btn"))==null||c.setAttribute("aria-expanded","false"))}))}function E_(){var s,a;k_();const e=c_(window.location.search),t=J();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(Y())?Y():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}O=e,yc=ff(O),Je=null;const i=re("query-where");return i&&(i.value=O.where===null?gc:O.where),(s=re("query-cli-preview"))==null||s.classList.add("hidden"),(a=re("query-columns-menu"))==null||a.classList.add("hidden"),h_(),v_(),$o(null),hf(n),Fs(),ko("replace")}let Eo=[];function __(){return Eo}lt(e=>{e==="currentProject"&&C()==="epics"&&vn()});let kc=0;const Us=new Set(["done","canceled"]);let _o=!1;async function vn({fromMemory:e=!1}={}){var a;vr(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++kc,i=Jr(),s=e?Fa("epics",i):void 0;s?bf(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=L())!=null&&a.id)){Eo=[],t.innerHTML=F({icon:q.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=Y(),r=o?await v.getProjectEpicProgress(o):await v.getTeamEpicProgress(L().id);if(n!==kc||(pi("epics",i,r),s&&Ua(s,r)))return;bf(r,t)}catch(o){if(n!==kc)return;t.innerHTML=F({icon:q.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",o)}}function bf(e,t){var n;if(!((n=e==null?void 0:e.epics)!=null&&n.length)){Eo=[],t.innerHTML=F({icon:q.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Ef(e,t)}function Ec(e,t){return`${e} ${t}${e===1?"":"s"}`}function yf(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function x_(e){const t=e.children||{},n=(t.total||0)-(t.canceled||0);if(n<=0)return'<span class="epic-progress-text">No tickets</span>';const i=Math.round((t.done||0)/n*100),s=Math.round(((t.in_progress||0)+(t.in_review||0))/n*100),a=t.done===n,o=`${t.done||0} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="epic-progress-bar-container" title="${p(o)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${a?" epic-progress-complete":""}" style="width: ${i}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(s,100-i)}%"></div>
            </div>
            <span class="epic-progress-pct" title="Tickets done">${yf(t.done||0,n)}</span>
            <span class="epic-progress-text">${t.done||0}/${n}</span>
        </div>
    `}function wf(e){if(!e||e.length===0)return'<span class="text-muted">-</span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${Ec(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${p(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function $f(e,t){return e?`<span class="epic-this-sprint">+${e} <span class="text-muted">(${t} pts)</span></span>`:'<span class="text-muted">-</span>'}function I_(e){const t=e.status_pinned&&!Us.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",n=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",i=(e.points_total||0)>0?`${e.points_done||0}/${e.points_total} pts`:"-",s=Gs(e)<=0;return`
        <tr class="epic-row${Us.has(e.status)?" epic-row-closed":""}${s?" epic-row-empty":""}" data-identifier="${p(e.identifier)}">
            <td class="epic-identifier">${f(e.identifier)}</td>
            <td class="epic-title">${f(e.title)}${t}${n}</td>
            <td class="epic-progress">${x_(e)}</td>
            <td class="epic-points">${i}</td>
            <td class="epic-sprint">${$f(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${wf(e.sprints)}</td>
        </tr>
    `}function S_(e){return!e||!e.open&&!e.closed_this_sprint&&!(e.sprints||[]).some(t=>t.closed)?"":`
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${f(e.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${Ec(e.open||0,"open ticket")}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${$f(e.closed_this_sprint,e.points_this_sprint)}</td>
            <td class="epic-sprints">${wf(e.sprints)}</td>
        </tr>
    `}function Gs(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function kf(e){var n;const t=Gs(e);return t>0?(((n=e.children)==null?void 0:n.done)||0)/t:0}const _c=[{key:"active",label:"In progress",statuses:["in_progress","in_review"]},{key:"todo",label:"Todo",statuses:["todo"]},{key:"backlog",label:"Backlog",statuses:["backlog"]},{key:"closed",label:"Closed",statuses:["done","canceled"]}];function T_(e){const t=e.status||"backlog";return _c.find(n=>n.statuses.includes(t))||_c[2]}function L_(e,t){const n=Gs(e)<=0,i=Gs(t)<=0;if(n!==i)return n?1:-1;const s=(t.points_this_sprint||0)-(e.points_this_sprint||0);if(s)return s;const a=(t.closed_this_sprint||0)-(e.closed_this_sprint||0);return a||kf(t)-kf(e)}function C_(e){return _c.map(t=>({group:t,epics:e.filter(n=>T_(n)===t).sort(L_)})).filter(t=>t.epics.length)}function A_(e,t){const n=e.filter(u=>!Us.has(u.status)),i=n.filter(u=>(u.closed_this_sprint||0)>0).length,s=n.reduce((u,m)=>{var g;return u+(((g=m.children)==null?void 0:g.done)||0)},0),a=n.reduce((u,m)=>u+Gs(m),0),o=[...e,...t],r=o.reduce((u,m)=>u+(m.closed_this_sprint||0),0),l=o.reduce((u,m)=>u+(m.points_this_sprint||0),0),c=t.reduce((u,m)=>u+(m.open||0),0);if(!n.length&&!r&&!c)return"";const d=(u,m,g="")=>`
        <div class="epic-stat${g}">
            <div class="epic-stat-value">${u}</div>
            <div class="epic-stat-label">${m}</div>
        </div>`;return`
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${n.length?d(`${i}<span class="epic-stat-of"> / ${n.length}</span>`,"open epics moved this sprint"):""}
            ${n.length?d(yf(s,a),a?`of their tickets done (${s}/${a})`:"no tickets yet"):""}
            ${d(r?`+${r}`:"0",`${r===1?"ticket":"tickets"} closed this sprint (${l} pts)`,r?" epic-stat-up":"")}
            ${c?d(String(c),`open ${c===1?"ticket":"tickets"} under no epic`," epic-stat-warn"):""}
        </div>`}const xc=6;function Ef(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=n.filter(m=>Us.has(m.status)).length,a=_o?n:n.filter(m=>!Us.has(m.status)),o=[...new Set([...n.map(m=>m.project_key),...i.map(m=>m.project_key)])],r=o.length>1,l=[],c=o.map(m=>{const b=C_(a.filter(T=>T.project_key===m)).map(({group:T,epics:I})=>(l.push(...I),`<tr class="epic-state-row epic-state-${T.key}"><th colspan="${xc}" scope="colgroup"><span class="epic-state-dot" aria-hidden="true"></span>${T.label}<span class="epic-state-count">${I.length}</span></th></tr>`+I.map(I_).join(""))).join(""),y=S_(i.find(T=>T.project_key===m));return!b&&!y?"":(r?`<tr class="epic-group-row"><th colspan="${xc}" scope="colgroup">${f(m)}</th></tr>`:"")+b+y}).join("");Eo=l;const d=!c.trim()&&s>0?`<tr class="epic-empty-row"><td colspan="${xc}" class="text-muted">Every epic here is closed.</td></tr>`:"",u=s>0?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${_o?"Hide":"Show"} ${Ec(s,"closed epic")}</button>`:"";t.innerHTML=`
        ${A_(n,i)}
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
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=m=>{if(m.target.closest("[data-epics-toggle-closed]")){_o=!_o,vr(-1),Ef(t._epicProgress,t);return}const g=m.target.closest(".epic-row");g&&g.dataset.identifier&&um(g.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function B_(){const e=Y(),t=J().map(n=>`
        <option value="${p(n.id)}" ${n.id===e?"selected":""}>${f(n.name)}</option>
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
    `,G(),document.getElementById("create-epic-form").addEventListener("submit",D_),document.getElementById("create-epic-title").focus()}async function D_(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await v.createIssue(t,{title:n,description:i||null,issue_type:"epic"});H(),k(`Created epic ${s.identifier}`,"success"),vn()}catch(s){E("create epic",s)}}async function _f(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){oe(t.id,!1);return}await xo(t.id,!1)}else N("epics",!1)}catch{N("epics",!1)}}async function xo(e,t=!0){var n;try{t&&mn();const[i,s,a,o]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(i.issue_type!=="epic"){oe(e,t);return}t&&history.pushState({epicId:e,view:C()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=C()||"epics",c=J().find(_=>_.id===i.project_id),d=i.assignee_id?Gt(i.assignee_id):null,u=d?zt(d):null,m=__(),g=(n=m.find(_=>_.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(_=>_.status!=="canceled").length,y=g?g.done||0:s.filter(_=>_.status==="done").length,$=b>0?Math.round(y/b*100):0,T=m.findIndex(_=>_.id===i.id),I=T>0?m[T-1]:null,A=T>=0&&T<m.length-1?m[T+1]:null,D=T>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${D?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${I?`data-action="navigate-epic" data-epic-id="${p(I.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${T+1} / ${m.length}</span>
                            <button class="issue-nav-btn" ${A?`data-action="navigate-epic" data-epic-id="${p(A.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?f(c.name):"Project"} › ${f(i.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(i.title)}</h1>

                    ${i.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${jn(i.description)}
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
                            ${s.length===0?F({icon:q.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(_=>{const P=_.assignee_id?Gt(_.assignee_id):null,V=P?zt(P):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(_.id)}" data-identifier="${p(_.identifier)}">
                                    <span class="sub-issue-status">${Ce(_.status)}</span>
                                    <span class="sub-issue-id">${f(_.identifier)}</span>
                                    <span class="sub-issue-title">${f(_.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(_.status||"backlog").replace(/_/g,"-")}">${Ee(_.status)}</span>
                                    ${V?`<span class="sub-issue-assignee">${f(V)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?F({icon:q.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(_=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Kr(_.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Qr(_)}</span>
                                        <span class="activity-actor">by ${f(Yr(_))}</span>
                                        <span class="activity-time">${rt(_.created_at)}</span>
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
                                            <span class="comment-author">${f(_.author_name||"User")}</span>
                                            <span class="comment-date">${rt(_.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${f(_.content||"")}</div>
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
                                ${Ce(i.status)}
                                ${Ee(i.status)}
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
                                ${vt(i.priority)}
                                ${Ue(i.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${u?f(u):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${io(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(_=>`
                                    <span class="issue-label" style="background: ${se(_.color)}20; color: ${se(_.color)}">${f(_.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(i.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const Z=r.querySelector(".sub-issues-list");Z&&Z.addEventListener("click",_=>{const P=_.target.closest(".sub-issue-item");P&&P.dataset.issueId&&oe(P.dataset.issueId)})}catch(i){E("load epic",i)}}te({"navigate-epic":(e,t)=>{xo(t.epicId)},"epic-follow-children":async(e,t)=>{try{await v.updateIssue(t.epicId,{status_follows_children:!0}),k("Status now follows sub-issues"),await xo(t.epicId,!1)}catch(n){E("update epic",n)}}});function M_(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u,m;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((m=e.isDetailViewActive)!=null&&m.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function j_(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function Zt(e,t,n=fa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function xf(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function zs(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(xf(),!1):!0:!1}function R_(e){const t=fa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u,m;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||zs(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((m=e.beforeNavigate)==null||m.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Zt(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),Zt(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function P_(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||zs(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Zt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Zt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Gn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function q_(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,u,m;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||zs(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,$,T,I;const b=!!(($=(y=document.activeElement)==null?void 0:y.closest)!=null&&$.call(y,"#inbox-list"));if((T=e.collapseInboxExpand)==null||T.call(e),Zt(a+g,e.setSelectedIndex,t),b){const A=document.querySelector(`${t}.keyboard-selected`);(I=(A==null?void 0:A.querySelector(".inbox-row-toggle"))||A)==null||I.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((u=e.isEscapeLayerAbove)!=null&&u.call(e))break;if((m=e.collapseInboxExpand)!=null&&m.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function N_(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||zs(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),Zt(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),Zt(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function O_(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function Ic(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,u;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||zs(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),Zt(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),Zt(r-1,e.setSelectedIndex,n);break;case"Enter":if((u=(d=a.target).closest)!=null&&u.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(m=>m.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const H_=7,Sc=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),If=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),F_='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',U_='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let Sf=!1;function G_(){Sf||(Sf=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{...Sc,set(e){var t;Sc.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...If,set(e){var t;If.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let Se=null,z_=0;function Tf({restoreFocus:e=!0}={}){return Se?(Se.close(e),!0):!1}function V_(e=document){e.querySelectorAll("select[data-picker]").forEach(W_)}function W_(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${F_}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Lf(e,t),(Se==null?void 0:Se.select)===e&&Se.refresh()};return e._picker={button:t,sync:n},G_(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(Se==null?void 0:Se.select)===e?Tf():Af(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(Se==null?void 0:Se.select)!==e&&Af(e,t)):s.key.length===1&&s.stopPropagation())}),n(),t}function Lf(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"";t.querySelector(".picker-label").textContent=i,t.disabled=e.disabled,t.title=i;const s=e.getAttribute("aria-label");s&&t.setAttribute("aria-label",i?`${s}: ${i}`:s)}function Cf(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),disabled:t.disabled}))}function Af(e,t){Tf({restoreFocus:!1});const n=Cf(e),i=`picker-list-${++z_}`,s=n.length>=H_,a=e.getAttribute("aria-label")||"Options",o=document.createElement("div");o.className="picker-popover",o.tabIndex=-1,o.innerHTML=`
        ${s?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${p(a)}"
            role="combobox" aria-expanded="true" aria-controls="${i}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${i}" tabindex="-1" aria-label="${p(a)}"></ul>
    `,document.body.appendChild(o);const r=o.querySelector(".picker-list"),l=o.querySelector(".picker-search"),c=x=>Math.max(0,x.findIndex(R=>!R.disabled));let d=n.findIndex(x=>x.value===e.value&&!x.disabled);d===-1&&(d=c(n));let u=n;const m=()=>{var R;r.innerHTML=u.length?u.map((M,ne)=>`
                <li role="option" id="${i}-${ne}" class="picker-option${ne===d?" active":""}${M.disabled?" disabled":""}"
                    data-index="${ne}" data-value="${p(M.value)}"
                    aria-selected="${M.value===e.value?"true":"false"}"${M.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${f(M.text)}</span>
                    ${M.value===e.value?`<span class="picker-check">${U_}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const x=r.querySelector(".picker-option.active");x?(l||r).setAttribute("aria-activedescendant",x.id):(l||r).removeAttribute("aria-activedescendant"),(R=x==null?void 0:x.scrollIntoView)==null||R.call(x,{block:"nearest"})},g=()=>{var et,mt;const x=t.getBoundingClientRect(),R=((et=window.visualViewport)==null?void 0:et.width)||window.innerWidth,M=((mt=window.visualViewport)==null?void 0:mt.height)||window.innerHeight;o.style.minWidth=`${Math.min(Math.max(x.width,220),R-16)}px`,o.style.maxHeight="",o.style.top="0px";const ne=o.offsetWidth||Math.max(x.width,220),Me=o.offsetHeight;o.style.left=`${Math.max(8,Math.min(x.left,R-ne-8))}px`;const $e=M-x.bottom-12,ke=x.top-12;if(Me>$e&&ke>$e){const je=Math.max(120,ke);o.style.maxHeight=`${je}px`,o.style.top=`${Math.max(8,x.top-4-Math.min(Me,je))}px`}else o.style.maxHeight=`${Math.max(120,$e)}px`,o.style.top=`${x.bottom+4}px`},b=x=>{if(!x||x.disabled||e.disabled)return;if(![...e.options].some(M=>M.value===x.value&&!M.disabled)){K(!0);return}const R=x.value!==e.value;Sc.set.call(e,x.value),Lf(e,t),K(!0),R&&e.dispatchEvent(new Event("change",{bubbles:!0}))},y=x=>{let R=d+x;for(;R>=0&&R<u.length&&u[R].disabled;)R+=x;R<0||R>=u.length||(d=R,m())},$=(x,R)=>{let M=x;for(;M>=0&&M<u.length&&u[M].disabled;)M+=R;M>=0&&M<u.length&&(d=M,m())},T=x=>{if(!(x.metaKey||x.ctrlKey))switch(x.stopPropagation(),x.key){case"ArrowDown":x.preventDefault(),y(1);break;case"ArrowUp":x.preventDefault(),y(-1);break;case"Home":l||(x.preventDefault(),$(0,1));break;case"End":l||(x.preventDefault(),$(u.length-1,-1));break;case"PageDown":x.preventDefault(),$(Math.min(u.length-1,d+8),-1);break;case"PageUp":x.preventDefault(),$(Math.max(0,d-8),1);break;case"Enter":x.preventDefault(),b(u[d]);break;case"Escape":x.preventDefault(),K(!0);break;case"Tab":K(!0);break;case" ":l||(x.preventDefault(),b(u[d]));break;default:if(!l&&x.key.length===1&&!x.metaKey&&!x.ctrlKey&&!x.altKey){I=(Date.now()-A<700?I:"")+x.key.toLowerCase(),A=Date.now();const R=u.findIndex(M=>!M.disabled&&M.text.toLowerCase().startsWith(I));R!==-1&&(d=R,m())}}};let I="",A=0;const D=()=>{const x=l.value.trim().toLowerCase();u=x?n.filter(M=>M.text.toLowerCase().includes(x)):n;const R=u.findIndex(M=>M.value===e.value&&!M.disabled);d=!x&&R!==-1?R:c(u),m()},Z=x=>{o.contains(x.target)||t.contains(x.target)||K(!1)},_=()=>g(),P=x=>{x.key!=="Escape"||o.contains(x.target)||(x.preventDefault(),x.stopPropagation(),K(!0))},V=()=>K(!1);function K(x){(Se==null?void 0:Se.popover)===o&&(Se=null,o.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",Z,!0),document.removeEventListener("keydown",P,!0),window.removeEventListener("popstate",V),window.removeEventListener("resize",_),window.removeEventListener("scroll",_,!0),x&&t.focus({preventScroll:!0}))}r.addEventListener("click",x=>{const R=x.target.closest(".picker-option");R&&b(u[Number(R.dataset.index)])}),r.addEventListener("mousemove",x=>{const R=x.target.closest(".picker-option");if(!R)return;const M=Number(R.dataset.index);M!==d&&(d=M,m())}),o.addEventListener("keydown",T),l&&l.addEventListener("input",D),document.addEventListener("pointerdown",Z,!0),document.addEventListener("keydown",P,!0),window.addEventListener("popstate",V),window.addEventListener("resize",_),window.addEventListener("scroll",_,!0),Se={select:e,button:t,popover:o,close:K,refresh:()=>{const x=Cf(e);!(x.length===n.length&&x.every((M,ne)=>M.value===n[ne].value&&M.text===n[ne].text&&M.disabled===n[ne].disabled))||e.disabled?K(!1):m()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",i),t.classList.add("open"),m(),g(),(l||r).focus({preventScroll:!0})}const K_={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>v.getDocumentRevisions(e),fetchOne:(e,t)=>v.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>v.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>v.getIssueDescriptionRevision(e,t)}};let z=null,bn=0;async function Bf(e,t){var a,o;const n=K_[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++bn;z=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===bn){if(z={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},z.viewVersion!=null)try{const r=await n.fetchOne(t,z.viewVersion);if(i!==bn)return;z.cache.set(z.viewVersion,r)}catch(r){i===bn&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Io(),G()}}function Io(){const e=document.getElementById("modal-content");if(!e||!z)return;if(z.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=Y_(),n=z.mode==="compare"?X_():Q_();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function Y_(){const e=z.revisions.map(n=>{const i=z.mode==="view"?n.version===z.viewVersion:n.version===z.compareFromVersion||n.version===z.compareToVersion,s=z.mode==="compare"?n.version===z.compareFromVersion?' <span class="rev-tag">from</span>':n.version===z.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${f(n.author_name||"Unknown")} ${Xn(n.author)}</span>
          <span class="revision-time">${rt(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${z.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function Q_(){const e=z.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=z.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${f(t.title)}</h3>`:"",i=t[z.adapter.bodyField]||"",s=i?`<div class="markdown-body">${bt(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${f(t.author_name||"Unknown")} &middot; ${rt(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function X_(){const e=z.compareFromVersion,t=z.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=z.cache.get(e),i=z.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[z.adapter.bodyField]||"",a=i[z.adapter.bodyField]||"",o=Z_(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
      <div class="revision-title-change">
        Title: <span class="diff-del">${f(n.title||"")}</span>
        &rarr; <span class="diff-add">${f(i.title||"")}</span>
      </div>
    `),`
    <div class="revision-panel-header">
      <div>
        Comparing <strong>v${e}</strong> &rarr; <strong>v${t}</strong>
      </div>
    </div>
    ${r}
    ${o}
  `}function Z_(e,t){const n=e.split(`
`),i=t.split(`
`),s=J_(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${f(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${f(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${f(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function J_(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(Vs(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(Vs(a,"del",e[o]),o++):(Vs(a,"add",t[r]),r++);for(;o<n;)Vs(a,"del",e[o++]);for(;r<i;)Vs(a,"add",t[r++]);return a}function Vs(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function ex(e){if(!z)return;const t=z.token,n=z;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(z!==n||bn!==t)return;n.cache.set(e,i)}catch(i){z===n&&bn===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Io()}function tx(){if(!z)return;const e=z.token,t=z;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{z===t&&bn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{z!==t||bn!==e||(s&&E("load revisions to compare",s),Io())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Io()}te({"show-document-revisions":(e,t)=>{Bf("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Bf("issue",t.issueId)},"select-revision-version":(e,t)=>{ex(Number(t.version))},"toggle-revision-compare":()=>{tx()},"close-revision-viewer":()=>{z=null,H()}});const So={bio:4e3,pronouns:40,tagline:120,name:255};let yn=[],Tc=null,Lc=!1,Cc=0,Ac=null,Bc=null,Dc=null,To=!1;async function Df(e,t){return v.getTeamRoster(e,{includeIdle:t})}function nx(e,t){!t||Tc!==e||(yn=yn.map(n=>n.user_id===t.user_id?t:n))}function ix(){return Array(4).fill(0).map(()=>`
        <div class="person-card person-card-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function Mc(){const e=L();if(!e)return;const t=++Cc,n=Lc,i=document.getElementById("people-list");i&&(i.innerHTML=ix(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=Lc);try{const a=await Df(e.id,n);if(t!==Cc)return;yn=a,Tc=e.id,Rf()}catch(a){if(t!==Cc)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=F({icon:q.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),E("load the roster",a)}}function Mf(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function jf(e){const t=p(e.user_id),n=e.pronouns?`<span class="person-pronouns">${f(e.pronouns)}</span>`:"",i=e.mention_handle?`<div class="person-handle">@${f(e.mention_handle)}</div>`:"",s=e.tagline?`<div class="person-tagline">${f(e.tagline)}</div>`:"";return`
        <a class="person-card${e.is_agent?" person-card-agent":""}${e.idle?" person-card-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-card-avatar" aria-hidden="true">${nn(e,"avatar person-avatar")}</span>
            <div class="person-card-body">
                <div class="person-name">${f(e.name)}${n}</div>
                ${i}
                ${s}
                <div class="person-role">${f(Mf(e))}</div>
            </div>
        </a>
    `}function Rf(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=yn.filter(a=>!a.is_agent),n=yn.filter(a=>a.is_agent),i=_e(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${p(i.id)}">Edit your profile</button>`:"";e.innerHTML=`
        <div class="people-section-header"><h3>People</h3>${s}</div>
        <div class="people-grid">${t.map(jf).join("")||'<p class="people-empty">No one yet.</p>'}</div>
        <div class="people-section-header"><h3>Agents</h3></div>
        <div class="people-grid">${n.map(jf).join("")||'<p class="people-empty">No agents yet.</p>'}</div>
    `}function Pf(e,t=_e()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function qf(e,t,{fresh:n=!1}={}){if(!n&&Tc===e){const a=yn.find(o=>o.user_id===t);if(a)return a}const s=(await Df(e,!0)).find(a=>a.user_id===t)||null;return nx(e,s),s}let Nf=0;async function Lo(e,t=!0){var r;t&&mn(),cm();const n=++Nf,i=L();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==Nf||((l=L())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await qf(i.id,e)}catch(l){if(a())return;E("load this profile",l),N("people",t);return}if(!a()){if(!o){k("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),N("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),Qi("people"),xs("people"),Of(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function sx(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function Of(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=sx();n.classList.remove("hidden");const i=p(e.user_id),s=Pf(e),a=e.user_id===((l=_e())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${jn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${f(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${a?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${nn(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${f(e.name)}${e.pronouns?`<span class="person-pronouns">${f(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${f(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${f(e.tagline)}</div>`:""}
                <div class="person-role">${f(Mf(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <section class="person-work">
            <h3>Working on</h3>
            <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
        </section>
    `,t&&ax(e.user_id)}const Hf=["in_progress","in_review","todo"];let Ff=0;async function ax(e){const t=L();if(!t)return;const n=++Ff;let i;try{i=await v.getTeamIssues(t.id,{assignee_id:e,status:Hf,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==Ff)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>Hf.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${p(o.identifier)}">
            <span class="person-issue-id">${f(o.identifier)}</span>
            <span class="person-issue-title">${f(o.title)}</span>
            <span class="person-issue-status">${f(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const jc=["name","avatar_url","pronouns","tagline","bio"];function ox(e){return Object.fromEntries(jc.map(t=>[t,(e==null?void 0:e[t])??""]))}let Rc=0;async function rx(e){const t=_e(),n=L();if(!t||!n)return;const i=++Rc;let s;try{s=await qf(n.id,e,{fresh:!0})}catch(r){i===Rc&&E("load this profile",r);return}if(i!==Rc||(!s&&e===t.id&&(s={...t,user_id:t.id}),!s||!Pf(s,t)))return;Ac=e,Dc=s,Bc=ox(s),To=!1;const a=e===t.id,o=r=>p(r||"");document.getElementById("modal-title").textContent=a?"Edit your profile":`Edit ${s.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${o(s.name)}" maxlength="${So.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${o(s.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${o(s.pronouns)}" maxlength="${So.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${o(s.tagline)}" maxlength="${So.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${So.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${f(s.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `,G()}function lx(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of jc){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function Uf(){Ac=null,Bc=null,Dc=null,H()}async function cx(e){var l;e.preventDefault();const t=Ac;if(!t||To)return;const n=e.target.closest("form")||e.target,i=lx(n,Bc);if(!Object.keys(i).length){Uf();return}const s=_e(),a=t===(s==null?void 0:s.id),o=Dc,r=n.querySelector('button[type="submit"]');To=!0,r&&(r.disabled=!0);try{const c=a?await v.updateMe(i):await v.updateAgent(t,i),d=Object.fromEntries(jc.map(g=>[g,(c==null?void 0:c[g])??null]));yn=yn.map(g=>g.user_id===t?{...g,...d}:g),a&&(Ht({...s,...d}),cc()),Uf(),k("Profile saved","success");const u={...o,...d},m=document.getElementById("person-detail-view");if(m&&!m.classList.contains("hidden")){const g=window.scrollY,b=document.getElementById("person-issues");Of(u,{withIssues:!1}),b&&((l=document.getElementById("person-issues"))==null||l.replaceWith(b)),window.scrollTo(0,g)}else Rf()}catch(c){E("save the profile",c)}finally{To=!1,r&&(r.disabled=!1)}}function Pc(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}te({"view-person":(e,t)=>{e.type!=="click"||Pc(e)||(e.preventDefault(),Lo(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),rx(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=_e();t&&Lo(t.id)},"save-profile":e=>{cx(e)},"retry-load-people":e=>{e.type==="click"&&Mc()},"person-open-issue":(e,t)=>{e.type!=="click"||Pc(e)||(e.preventDefault(),Pl(t.identifier))},"back-to-roster":e=>{e.type!=="click"||Pc(e)||(e.preventDefault(),N("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(Lc=!!n.checked,Mc())}});const dx=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let $t=[],Co=null,Ao=null,qc=0;lt(e=>{e==="currentProject"&&C()==="board"&&Ws()});async function Ws({fromMemory:e=!1}={}){ua(-1);const t=++qc,n=Y();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=J().length===0?F({icon:q.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):F({icon:q.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const i=document.getElementById("kanban-board"),s=Jr(),a=e?Fa("board",s):void 0;a?($t=a,Co=s,C()==="board"&&It($t),Li()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await v.getIssues({project_id:n});if(t!==qc)return;const r=a&&Ua($t,o);$t=o,Co=s,pi("board",s,o),C()==="board"&&It($t),r||Li()}catch(o){if(t!==qc)return;i&&(i.innerHTML=F({icon:q.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",o)}}const Nc=Xh(()=>Ws(),200);function Li(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Co&&pi("board",Co,$t),e.innerHTML=dx.map(i=>{const s=$t.filter(a=>a.status===i.key);return`
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
                            <div class="kanban-card-title">${f(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Ue(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),ux(t)}function ux(e){const t=Yd();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){ua(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),ua(i),n[i].classList.add("keyboard-selected")}function px(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Ao=t.dataset.id,t.classList.add("dragging")}function mx(e,t){t.classList.remove("dragging"),Ao=null}function Gf(e){const t=$t.find(n=>n.id===Ao);return!!t&&t.status===e}function fx(e,t){e.preventDefault(),!Gf(t.dataset.status)&&t.classList.add("drag-over")}function gx(e,t){t.classList.remove("drag-over")}function hx(e,t){e.preventDefault();const n=$t.find(i=>i.id===t.dataset.id);n&&Gf(n.status)||t.classList.add("drag-over")}function vx(e,t){t.classList.remove("drag-over")}async function bx(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=$t.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Li();try{const o=await v.updateIssue(n,{status:i});k("Status updated","success"),as(o)}catch(o){s.status=a,Li(),E("update status",o)}}}async function yx(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Ao||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=$t.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Li();try{const l=await v.updateIssue(n,{status:a});k("Status updated","success"),as(l)}catch(l){o.status=r,Li(),E("update status",l)}}}te({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),oe(t.id)):e.type==="dragstart"?px(e,n):e.type==="dragend"?mx(e,n):e.type==="dragover"?hx(e,n):e.type==="dragleave"?vx(e,n):e.type==="drop"&&yx(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?fx(e,n):e.type==="dragleave"?gx(e,n):e.type==="drop"&&bx(e,n)},"retry-load-board":()=>Ws()});const wn=new Map,zf=6e4,Oc=100;let De=null,Bo=null,Do=null,Ks=null,Vf=!1;const wx={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},$x={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Wf={api:null};let Hc={...Wf};function kx(e={}){Hc={...Wf,...e},De||(De=document.createElement("div"),De.className="issue-tooltip",De.style.display="none",document.body.appendChild(De),De.addEventListener("mouseenter",()=>{clearTimeout(Bo)}),De.addEventListener("mouseleave",()=>{Fc()})),Vf||(document.addEventListener("mouseover",Ex),document.addEventListener("mouseout",_x),Vf=!0)}function Ex(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=xx(t);if(n){if(n===Ks&&De.style.display!=="none"){clearTimeout(Bo);return}clearTimeout(Do),Do=setTimeout(()=>{Ix(t,n)},200)}}function _x(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Do),Bo=setTimeout(()=>{Fc()},150))}function xx(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function Ix(e,t){Ks=t;const n=e.getBoundingClientRect();De.style.left=`${n.left+window.scrollX}px`,De.style.top=`${n.bottom+window.scrollY+8}px`,De.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',De.style.display="block";try{const i=await Tx(t);if(Ks!==t)return;Lx(i)}catch{if(Ks!==t)return;De.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Fc(){clearTimeout(Do),clearTimeout(Bo),De&&(De.style.display="none"),Ks=null}function Sx(){const e=Date.now();for(const[t,n]of wn.entries())e-n.timestamp>=zf&&wn.delete(t)}async function Tx(e){wn.size>Oc/2&&Sx();const t=wn.get(e);if(t&&Date.now()-t.timestamp<zf)return t.issue;if(!Hc.api)throw new Error("API not initialized");const n=await Hc.api.getIssueByIdentifier(e);if(wn.size>=Oc){const i=Array.from(wn.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Oc/2);for(const[a]of s)wn.delete(a)}return wn.set(e,{issue:n,timestamp:Date.now()}),n}function Lx(e){const t=wx[e.status]||"#6b7280",n=$x[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";De.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Cx(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Ax(e.priority)}</span>
        </div>
    `}function Cx(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ax(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Kf(){return!!document.querySelector(".description-inline-editor")}function Uc(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Gc(){var e;return Uc("issue-detail-view")?((e=xe())==null?void 0:e.id)??null:null}function zn(e){return!!e&&Gc()===e}function Bx(){Ke("issue:created",Rx),Ke("issue:updated",Px),Ke("issue:deleted",qx),Ke("comment",Hx),Ke("relation",Ux),Ke("attestation",Gx),Ke("activity",Vx),Ke("project",Wx),Ke("sprint",Kx),Ke("document",Fx),Ke("inbox",zx),Ke("connection:reconnected",Yx),Ke("connection:unauthorized",Mx),Ke("connection:forbidden",jx),Ke("connection:superseded",Dx)}function Dx(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function Mx(){v.logout(),Ht(null),Zn(null),Os(),k("Your session has ended. Please sign in again.","warning")}function jx(){k("Live updates stopped: you no longer have access to this team.","error")}function Rx(e){var s;vs(C(),"board","sprints","epics");const t=ee(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Qe(a),C()==="issues"&&dt()}else Qe([e,...t]),C()==="issues"&&dt(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=_e())==null?void 0:s.id)){const a=Ze(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)Sn([e,...a]),C()==="my-issues"&&Tn();else if(r>=0){const l=[...a];l[r]=e,Sn(l),C()==="my-issues"&&Tn()}}C()==="board"?Nc():C()==="sprints"?Ys():C()==="epics"&&vn(),zn(e.parent_id)&&Vn(e.parent_id)}function Px(e){vs(C(),"board","sprints","epics"),ha(e);const t=ee();t.some(s=>s.id===e.id)&&Qe(t.map(s=>s.id===e.id?e:s));const n=Ze();n.some(s=>s.id===e.id)&&Sn(n.map(s=>s.id===e.id?e:s));const i=Xi();i.some(s=>s.id===e.id)&&It(i.map(s=>s.id===e.id?e:s)),C()==="issues"?dt():C()==="my-issues"?Tn():C()==="board"?Nc():C()==="sprints"?Ys():C()==="epics"&&vn(),zn(e.id)&&(Kf()?Wr(e):Vn(e.id))}function qx(e){vs(C(),"board","sprints","epics"),bv(e.id),Qe(ee().filter(n=>n.id!==e.id)),Sn(Ze().filter(n=>n.id!==e.id));const t=Xi();t.some(n=>n.id===e.id)&&It(t.filter(n=>n.id!==e.id)),C()==="issues"?dt():C()==="my-issues"?(Tn(),ni({showLoading:!1})):C()==="board"?Nc():C()==="sprints"?Ys():C()==="epics"&&vn(),k(`Issue ${e.identifier} deleted`,"info"),zn(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),N("my-issues"))}const Yf=250,Nx=1e3,Ci=new Map;function Vn(e){Kf()?Wr():zc(e,Yf)}function zc(e,t){let n=Ci.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Ci.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>Ox(e),t))}async function Ox(e){const t=Ci.get(e);if(!t)return;if(t.timer=null,!zn(e)){Ci.delete(e);return}t.inFlight=!0;let n;try{n=await oe(e,!1,{refresh:!0})}finally{t.inFlight=!1}Ci.get(e)===t&&(t.again?(t.again=!1,zc(e,Yf)):n==="retry"?zc(e,Nx):Ci.delete(e))}function Hx(e){C()==="my-issues"&&ni({showLoading:!1}),zn(e.issue_id)&&Vn(e.issue_id),e.document_id&&Lp(e.document_id)}function Fx(e,{type:t}={}){vs(C(),"documents"),Tp(),t==="deleted"?aw(e.id,e.title):Lp(e.id)}function Ux(e){const t=Gc();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Vn(t)}function Gx(e){C()==="approvals"&&At(),zn(e.issue_id)&&Vn(e.issue_id)}function zx(e,t){var n;e.recipient_user_id===((n=_e())==null?void 0:n.id)&&($i(),ek(t==null?void 0:t.type,e),C()==="inbox"&&!ik(t==null?void 0:t.type,e)&&Cs({background:!0}))}function Vx(e){C()==="my-issues"&&ni({showLoading:!1}),zn(e.issue_id)&&Vn(e.issue_id)}function Wx(e,{type:t}){ut().then(()=>{C()==="projects"&&qn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function Ys(){const e=Aw();e&&Uc("sprint-detail-view")?hi(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Uc("sprints-view")&&pn().catch(t=>console.error("Failed to reload sprints:",t))}function Kx(e,{type:t}={}){vs(C(),"sprints"),qp(),C()==="sprints"?Ys():C()==="my-issues"&&is(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function Yx(){const e=C();el(),$i(),e==="issues"?Lt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(ti().catch(n=>console.error("Failed to resync my issues:",n)),is().catch(n=>console.error("Failed to resync sprint status:",n)),ni({showLoading:!1})):e==="board"?Ws():e==="sprints"?Ys():e==="epics"?vn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?ut().then(()=>{C()==="projects"&&qn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Tp():e==="approvals"?At():e==="inbox"&&Cs({background:!0});const t=Gc();t&&Vn(t)}const Qx='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Qf(e){return Array.from(e.querySelectorAll(Qx)).filter(t=>!t.closest(".hidden, [hidden]"))}function Xf(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function Xx(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Xf(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=Qf(t);n&&n.focus()}}}function Mo(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Xf(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=Qf(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Mo()});async function Zx(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=Y();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=J().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Qe([r,...ee()]),dt();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await v.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ee();d.some(u=>u.id===c.id)?Qe(d.filter(u=>u.id!==a)):d.some(u=>u.id===a)&&Qe(d.map(u=>u.id===a?c:u)),dt(),ut(),k("Issue created!","success")}catch(c){Qe(ee().filter(d=>d.id!==a)),dt(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}U$({beforeScrollRestore:Or,beforeNavigate:()=>{Ny(),L$(),Yp(null),Jn(null),Xd(null),Mo(),Fc()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return _f(e[1]),!0;if(e[0]==="issue"&&e[1])return qa(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(qa(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(c0(e[1]),!0):e[0]==="sprint"&&e[1]?(Mw(e[1]),!0):e[0]==="people"&&e[1]?(Lo(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(tm(e[1]),!0):!1},detailPopstate:e=>e.epicId?(xo(e.epicId,!1),!0):e.issueId?(oe(e.issueId,!1),!0):e.identifier?(qa(e.identifier),!0):e.documentId?(Ae(e.documentId,!1),!0):e.sprintId?(hi(e.sprintId,!1),!0):e.personId?(Lo(e.personId,!1),!0):!1,restoreProject:()=>{const e=Sl();e&&J().some(t=>t.id===e)&&ct(e)},issueNavigate:e=>qa(e),epicNavigate:e=>_f(e)}),F$({"my-issues":()=>{is(),ti(),ni()},approvals:()=>{At()},inbox:()=>{Cs({focusFirst:!0})},issues:()=>{var r;Ib(),Ab(),Mb();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Cn().length>0||An().length>0;s||Lt();const a=Su().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),$a())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),ka())}}),o=Hu().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>Lt()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{E_()},epics:()=>{vn({fromMemory:!0})},board:()=>{Ws({fromMemory:!0})},projects:()=>{qn(),ut().then(qn)},sprints:()=>{pn({fromMemory:!0})},rituals:()=>{Zw()},documents:()=>{Pn(null,null,{fromMemory:!0})},people:Mc,team:()=>{Wl(),Lm(),po()},settings:()=>{uc(),af(),of(),Ma()}});function Jx(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||H()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>H())}function e0(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>nm(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>B$());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>D$()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>im(a))})}function t0(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Ip("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Ip("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Sp());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Zy());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Vt())}function n0(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>vu())}function i0(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Db());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>mb());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>fb()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>xa("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>xa("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>xa("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>xa("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Ia())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Sa())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Rr())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Pr())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ta())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>La())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>st());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>st());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>st());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Lt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>Wu());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",g=>Zx(g))}function s0(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>e$(t.dataset.tab))})}function a0(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Sm());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>ss()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),N(o.dataset.view),r.detail>0&&xf())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Ik());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Mo());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>Xx());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>ss())}te({"navigate-to":(e,t)=>{N(t.view)},"set-current-project":(e,t,n)=>{ct(n.value)},showCreateIssueModal:()=>ss(),showCreateEpicModal:()=>B_(),"retry-load-epics":()=>vn(),showCreateProjectModal:()=>Jp(),showCreateDocumentModal:()=>Ap(),showCreateTeamModal:()=>Dm(),showEditTeamModal:()=>Hk(),showInviteModal:()=>Cm(),showCreateApiKeyModal:()=>FE(),showCreateAgentModal:()=>wy(),resetOnboarding:()=>Om(),logout:()=>sf(),navigateToProjects:()=>N("projects")});async function o0(){if(!v.getToken()){await Zm();return}dm();const e=v.getMyTeams();e.catch(()=>{});const t=v.getMe(),n=await Fh(Ud(v.getToken()));if(n){t.then(i=>{Ht(i),cc()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){v.logout(),await ur(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),k("Showing saved data — check your connection and reload","error")}),Ht(n.user),await Un({teamsRequest:e,snapshot:n});return}try{const i=await t;Ht(i),await Un({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){v.logout(),await Zm();return}console.error("Failed to load current user on boot:",i),Os(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{uv(),OE(),a0(),Jx(),n0(),i0(),s0(),e0(),t0(),r0(),V_(),l0(),kx({api:v}),Bx(),await o0()});function r0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Eh()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),_h(n?"light":"dark")})}function l0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Pl(i)}}})}async function c0(e){try{await Ae(e,!1)}catch{N("documents",!1)}}document.addEventListener("keydown",R_({getCurrentView:C,getSelectedIndex:Wd,setSelectedIndex:xn,viewIssue:oe,showEditIssueModal:cp,showInlineDropdown:Br,isInlineDropdownOpen:si,isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn,beforeNavigate:Or})),document.addEventListener("keydown",P_({getCurrentView:C,getSelectedIndex:ev,setSelectedIndex:Kd,viewDocument:Ae,showEditDocumentModal:Bp,isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn})),document.addEventListener("keydown",N_({getCurrentView:C,getSelectedIndex:Yd,setSelectedIndex:ua,viewIssue:oe,isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn})),document.addEventListener("keydown",q_({getCurrentView:C,getSelectedIndex:tv,setSelectedIndex:pa,toggleInboxExpand:yk,collapseInboxExpand:ok,archiveInboxEntry:bk,isInlineDropdownOpen:si,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn})),document.addEventListener("keydown",O_()),document.addEventListener("keydown",Ic({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&hi(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:nv,setSelectedIndex:Qd,isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn})),document.addEventListener("keydown",Ic({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&um(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:iv,setSelectedIndex:vr,isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn})),document.addEventListener("keydown",Ic({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:C,getSelectedIndex:Bv,setSelectedIndex:Dv,isInlineDropdownOpen:si,isModalOpen:nt,isCommandPaletteOpen:hn,isDetailViewActive:Gn}));function Zf(){var e;N("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function d0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||By()}document.addEventListener("keydown",M_({closeModal:H,closeSidebar:Mo,navigateTo:N,showCreateIssueModal:ss,showKeyboardShortcutsHelp:df,isModalOpen:nt,focusSearch:Zf,isInlineDropdownOpen:si,closeInlineDropdowns:Qh,isModalDirty:Kh,focusModalField:Gd,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Bn();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:d0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),ZE([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>N("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>N("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>N("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>N("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>N("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>N("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>N("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>N("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>N("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>N("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>N("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>N("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{N("issues"),setTimeout(ss,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{N("projects"),setTimeout(Jp,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{N("documents"),setTimeout(Ap,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Dm(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Zf,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{N("team"),setTimeout(Cm,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>df(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Om(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>sf(),category:"Account"}]),document.addEventListener("keydown",j_({isModalOpen:nt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:hn,openCommandPalette:JE,closeCommandPalette:bo})),window.marked=Q,window.DOMPurify=Md,console.log("Chaotic frontend loaded via Vite")})();
