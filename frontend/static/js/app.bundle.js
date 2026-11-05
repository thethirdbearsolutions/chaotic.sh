var N0=Object.defineProperty;var O0=(Ht,Ne,En)=>Ne in Ht?N0(Ht,Ne,{enumerable:!0,configurable:!0,writable:!0,value:En}):Ht[Ne]=En;var oe=(Ht,Ne,En)=>O0(Ht,typeof Ne!="symbol"?Ne+"":Ne,En);(function(){"use strict";var Nd;function Ht(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ne=Ht();function En(e){Ne=e}var Yi={exec:()=>null};function Z(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(Oe.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var Oe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Kh=/^(?:[ \t]*(?:\n|$))+/,Yh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qi=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Rr=/(?:[*+-]|\d{1,9}[.)])/,eu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,tu=Z(eu).replace(/bull/g,Rr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Xh=Z(eu).replace(/bull/g,Rr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),jr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Jh=/^[^\n]+/,Pr=/(?!\s*\])(?:\\.|[^\[\]\\])+/,ev=Z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Pr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),tv=Z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Rr).getRegex(),$a="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",qr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nv=Z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",qr).replace("tag",$a).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),nu=Z(jr).replace("hr",Qi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$a).getRegex(),iv=Z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",nu).getRegex(),Nr={blockquote:iv,code:Yh,def:ev,fences:Qh,heading:Zh,hr:Qi,html:nv,lheading:tu,list:tv,newline:Kh,paragraph:nu,table:Yi,text:Jh},iu=Z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$a).getRegex(),sv={...Nr,lheading:Xh,table:iu,paragraph:Z(jr).replace("hr",Qi).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",iu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$a).getRegex()},av={...Nr,html:Z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",qr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Yi,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Z(jr).replace("hr",Qi).replace("heading",` *#{1,6} *[^
]`).replace("lheading",tu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ov=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rv=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,su=/^( {2,}|\\)\n(?!\s*$)/,lv=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ka=/[\p{P}\p{S}]/u,Or=/[\s\p{P}\p{S}]/u,au=/[^\s\p{P}\p{S}]/u,cv=Z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Or).getRegex(),ou=/(?!~)[\p{P}\p{S}]/u,dv=/(?!~)[\s\p{P}\p{S}]/u,uv=/(?:[^\s\p{P}\p{S}]|~)/u,pv=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ru=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mv=Z(ru,"u").replace(/punct/g,ka).getRegex(),fv=Z(ru,"u").replace(/punct/g,ou).getRegex(),lu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",gv=Z(lu,"gu").replace(/notPunctSpace/g,au).replace(/punctSpace/g,Or).replace(/punct/g,ka).getRegex(),hv=Z(lu,"gu").replace(/notPunctSpace/g,uv).replace(/punctSpace/g,dv).replace(/punct/g,ou).getRegex(),vv=Z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,au).replace(/punctSpace/g,Or).replace(/punct/g,ka).getRegex(),bv=Z(/\\(punct)/,"gu").replace(/punct/g,ka).getRegex(),yv=Z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),wv=Z(qr).replace("(?:-->|$)","-->").getRegex(),$v=Z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",wv).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_a=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,kv=Z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",_a).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),cu=Z(/^!?\[(label)\]\[(ref)\]/).replace("label",_a).replace("ref",Pr).getRegex(),du=Z(/^!?\[(ref)\](?:\[\])?/).replace("ref",Pr).getRegex(),_v=Z("reflink|nolink(?!\\()","g").replace("reflink",cu).replace("nolink",du).getRegex(),Hr={_backpedal:Yi,anyPunctuation:bv,autolink:yv,blockSkip:pv,br:su,code:rv,del:Yi,emStrongLDelim:mv,emStrongRDelimAst:gv,emStrongRDelimUnd:vv,escape:ov,link:kv,nolink:du,punctuation:cv,reflink:cu,reflinkSearch:_v,tag:$v,text:lv,url:Yi},Ev={...Hr,link:Z(/^!?\[(label)\]\((.*?)\)/).replace("label",_a).getRegex(),reflink:Z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_a).getRegex()},Fr={...Hr,emStrongRDelimAst:hv,emStrongLDelim:fv,url:Z(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},xv={...Fr,br:Z(su).replace("{2,}","*").getRegex(),text:Z(Fr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ea={normal:Nr,gfm:sv,pedantic:av},Zi={normal:Hr,gfm:Fr,breaks:xv,pedantic:Ev},Sv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},uu=e=>Sv[e];function Et(e,t){if(t){if(Oe.escapeTest.test(e))return e.replace(Oe.escapeReplace,uu)}else if(Oe.escapeTestNoEncode.test(e))return e.replace(Oe.escapeReplaceNoEncode,uu);return e}function pu(e){try{e=encodeURI(e).replace(Oe.percentDecode,"%")}catch{return null}return e}function mu(e,t){var a;const n=e.replace(Oe.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(Oe.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(Oe.slashPipe,"|");return i}function Xi(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Iv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function fu(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Lv(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var xa=class{constructor(e){oe(this,"options");oe(this,"rules");oe(this,"lexer");this.options=e||Ne}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Xi(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Lv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=Xi(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xi(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Xi(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=p,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.blockquote(b);a[a.length-1]=y,i=i.substring(0,i.length-g.raw.length)+y.raw,s=s.substring(0,s.length-g.text.length)+y.text;break}else if((f==null?void 0:f.type)==="list"){const g=f,b=g.raw+`
`+n.join(`
`),y=this.list(b);a[a.length-1]=y,i=i.substring(0,i.length-f.raw.length)+y.raw,s=s.substring(0,s.length-g.raw.length)+y.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),f=e.split(`
`,1)[0],g=!p.trim(),b=0;if(this.options.pedantic?(b=2,d=p.trimStart()):g?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=p.slice(b),b+=t[1].length),g&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const E=this.rules.other.nextBulletRegex(b),I=this.rules.other.hrRegex(b),A=this.rules.other.fencesBeginRegex(b),R=this.rules.other.headingBeginRegex(b),x=this.rules.other.htmlBeginRegex(b);for(;e;){const w=e.split(`
`,1)[0];let D;if(f=w,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),D=f):D=f.replace(this.rules.other.tabCharGlobal,"    "),A.test(f)||R.test(f)||x.test(f)||E.test(f)||I.test(f))break;if(D.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+D.slice(b);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(p)||R.test(p)||I.test(p))break;d+=`
`+f}!g&&!f.trim()&&(g=!0),c+=w+`
`,e=e.substring(w.length+1),p=D.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let y=null,_;this.options.gfm&&(y=this.rules.other.listIsTask.exec(d),y&&(_=y[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!y,checked:_,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(p=>p.type==="space"),d=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=mu(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(mu(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Xi(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Iv(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),fu(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return fu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const p=[...i[0]][0].length,f=e.slice(0,a+i.index+p+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ft=class Xd{constructor(t){oe(this,"tokens");oe(this,"options");oe(this,"state");oe(this,"tokenizer");oe(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ne,this.options.tokenizer=this.options.tokenizer||new xa,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:Oe,block:Ea.normal,inline:Zi.normal};this.options.pedantic?(n.block=Ea.pedantic,n.inline=Zi.pedantic):this.options.gfm&&(n.block=Ea.gfm,this.options.breaks?n.inline=Zi.breaks:n.inline=Zi.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ea,inline:Zi}}static lex(t,n){return new Xd(n).lex(t)}static lexInline(t,n){return new Xd(n).inlineTokens(t)}lex(t){t=t.replace(Oe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(Oe.tabCharGlobal,"    ").replace(Oe.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let p;this.options.extensions.startBlock.forEach(f=>{p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let p=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const g=t.slice(1);let b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},g),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(p=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(p)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Sa=class{constructor(e){oe(this,"options");oe(this,"parser");this.options=e||Ne}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(Oe.notSpaceStart))==null?void 0:a[0],s=e.replace(Oe.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Et(i)+'">'+(n?s:Et(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Et(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Et(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Et(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=pu(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Et(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=pu(e);if(s===null)return Et(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Et(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Et(e.text)}},Ur=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Ut=class Jd{constructor(t){oe(this,"options");oe(this,"renderer");oe(this,"textRenderer");this.options=t||Ne,this.options.renderer=this.options.renderer||new Sa,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ur}static parse(t,n){return new Jd(n).parse(t)}static parseInline(t,n){return new Jd(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},Ia=(Nd=class{constructor(e){oe(this,"options");oe(this,"block");this.options=e||Ne}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?Ut.parse:Ut.parseInline}},oe(Nd,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Nd),Tv=class{constructor(...e){oe(this,"defaults",Ht());oe(this,"options",this.setOptions);oe(this,"parse",this.parseMarkdown(!0));oe(this,"parseInline",this.parseMarkdown(!1));oe(this,"Parser",Ut);oe(this,"Renderer",Sa);oe(this,"TextRenderer",Ur);oe(this,"Lexer",Ft);oe(this,"Tokenizer",xa);oe(this,"Hooks",Ia);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Sa(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new xa(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new Ia;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];Ia.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(p=>l.call(s,p));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return Ut.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ft.lex:Ft.lexInline,l=a.hooks?a.hooks.provideParser():e?Ut.parse:Ut.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Et(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},xn=new Tv;function Y(e,t){return xn.parse(e,t)}Y.options=Y.setOptions=function(e){return xn.setOptions(e),Y.defaults=xn.defaults,En(Y.defaults),Y},Y.getDefaults=Ht,Y.defaults=Ne,Y.use=function(...e){return xn.use(...e),Y.defaults=xn.defaults,En(Y.defaults),Y},Y.walkTokens=function(e,t){return xn.walkTokens(e,t)},Y.parseInline=xn.parseInline,Y.Parser=Ut,Y.parser=Ut.parse,Y.Renderer=Sa,Y.TextRenderer=Ur,Y.Lexer=Ft,Y.lexer=Ft.lex,Y.Tokenizer=xa,Y.Hooks=Ia,Y.parse=Y,Y.options,Y.setOptions,Y.use,Y.walkTokens,Y.parseInline,Ut.parse,Ft.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:gu,setPrototypeOf:hu,isFrozen:Av,getPrototypeOf:Cv,getOwnPropertyDescriptor:Bv}=Object;let{freeze:He,seal:rt,create:Gr}=Object,{apply:zr,construct:Vr}=typeof Reflect<"u"&&Reflect;He||(He=function(t){return t}),rt||(rt=function(t){return t}),zr||(zr=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Vr||(Vr=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const La=Ue(Array.prototype.forEach),Dv=Ue(Array.prototype.lastIndexOf),vu=Ue(Array.prototype.pop),Ji=Ue(Array.prototype.push),Mv=Ue(Array.prototype.splice),Ta=Ue(String.prototype.toLowerCase),Wr=Ue(String.prototype.toString),Kr=Ue(String.prototype.match),es=Ue(String.prototype.replace),Rv=Ue(String.prototype.indexOf),jv=Ue(String.prototype.trim),vt=Ue(Object.prototype.hasOwnProperty),Fe=Ue(RegExp.prototype.test),ts=Pv(TypeError);function Ue(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return zr(e,t,i)}}function Pv(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Vr(e,n)}}function z(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ta;hu&&hu(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Av(t)||(t[i]=a),s=a)}e[s]=!0}return e}function qv(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function xt(e){const t=Gr(null);for(const[n,i]of gu(e))vt(e,n)&&(Array.isArray(i)?t[n]=qv(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=xt(i):t[n]=i);return t}function ns(e,t){for(;e!==null;){const i=Bv(e,t);if(i){if(i.get)return Ue(i.get);if(typeof i.value=="function")return Ue(i.value)}e=Cv(e)}function n(){return null}return n}const bu=He(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Yr=He(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Qr=He(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nv=He(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zr=He(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ov=He(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),yu=He(["#text"]),wu=He(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xr=He(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),$u=He(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Aa=He(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Hv=rt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fv=rt(/<%[\w\W]*|[\w\W]*%>/gm),Uv=rt(/\$\{[\w\W]*/gm),Gv=rt(/^data-[\-\w.\u00B7-\uFFFF]+$/),zv=rt(/^aria-[\-\w]+$/),ku=rt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vv=rt(/^(?:\w+script|data):/i),Wv=rt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),_u=rt(/^html$/i),Kv=rt(/^[a-z][.\w]*(-[.\w]+)+$/i);var Eu=Object.freeze({__proto__:null,ARIA_ATTR:zv,ATTR_WHITESPACE:Wv,CUSTOM_ELEMENT:Kv,DATA_ATTR:Gv,DOCTYPE_NAME:_u,ERB_EXPR:Fv,IS_ALLOWED_URI:ku,IS_SCRIPT_OR_DATA:Vv,MUSTACHE_EXPR:Hv,TMPLIT_EXPR:Uv});const is={element:1,text:3,progressingInstruction:7,comment:8,document:9},Yv=function(){return typeof window>"u"?null:window},Qv=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},xu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Su(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yv();const t=q=>Su(q);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==is.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:g}=e,b=l.prototype,y=ns(b,"cloneNode"),_=ns(b,"remove"),E=ns(b,"nextSibling"),I=ns(b,"childNodes"),A=ns(b,"parentNode");if(typeof o=="function"){const q=n.createElement("template");q.content&&q.content.ownerDocument&&(n=q.content.ownerDocument)}let R,x="";const{implementation:w,createNodeIterator:D,createDocumentFragment:H,getElementsByTagName:X}=n,{importNode:ne}=i;let J=xu();t.isSupported=typeof gu=="function"&&typeof A=="function"&&w&&w.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:S,ERB_EXPR:j,TMPLIT_EXPR:M,DATA_ATTR:ie,ARIA_ATTR:we,IS_SCRIPT_OR_DATA:$e,ATTR_WHITESPACE:nn,CUSTOM_ELEMENT:B}=Eu;let{IS_ALLOWED_URI:ce}=Eu,K=null;const de=z({},[...bu,...Yr,...Qr,...Zr,...yu]);let ke=null;const Ih=z({},[...wu,...Xr,...$u,...Aa]);let ve=Object.seal(Gr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ba=null,Od=null;const Fi=Object.seal(Gr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Lh=!0,Hd=!0,Th=!1,Ah=!0,Ui=!1,Lr=!0,Wn=!1,Fd=!1,Ud=!1,Gi=!1,Tr=!1,Ar=!1,Ch=!0,Bh=!1;const C0="user-content-";let Gd=!0,ya=!1,zi={},Nt=null;const zd=z({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Dh=null;const Mh=z({},["audio","video","img","source","image","track"]);let Vd=null;const Rh=z({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Cr="http://www.w3.org/1998/Math/MathML",Br="http://www.w3.org/2000/svg",sn="http://www.w3.org/1999/xhtml";let Vi=sn,Wd=!1,Kd=null;const B0=z({},[Cr,Br,sn],Wr);let Dr=z({},["mi","mo","mn","ms","mtext"]),Mr=z({},["annotation-xml"]);const D0=z({},["title","style","font","a","script"]);let wa=null;const M0=["application/xhtml+xml","text/html"],R0="text/html";let Se=null,Wi=null;const j0=n.createElement("form"),jh=function(v){return v instanceof RegExp||v instanceof Function},Yd=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Wi&&Wi===v)){if((!v||typeof v!="object")&&(v={}),v=xt(v),wa=M0.indexOf(v.PARSER_MEDIA_TYPE)===-1?R0:v.PARSER_MEDIA_TYPE,Se=wa==="application/xhtml+xml"?Wr:Ta,K=vt(v,"ALLOWED_TAGS")?z({},v.ALLOWED_TAGS,Se):de,ke=vt(v,"ALLOWED_ATTR")?z({},v.ALLOWED_ATTR,Se):Ih,Kd=vt(v,"ALLOWED_NAMESPACES")?z({},v.ALLOWED_NAMESPACES,Wr):B0,Vd=vt(v,"ADD_URI_SAFE_ATTR")?z(xt(Rh),v.ADD_URI_SAFE_ATTR,Se):Rh,Dh=vt(v,"ADD_DATA_URI_TAGS")?z(xt(Mh),v.ADD_DATA_URI_TAGS,Se):Mh,Nt=vt(v,"FORBID_CONTENTS")?z({},v.FORBID_CONTENTS,Se):zd,ba=vt(v,"FORBID_TAGS")?z({},v.FORBID_TAGS,Se):xt({}),Od=vt(v,"FORBID_ATTR")?z({},v.FORBID_ATTR,Se):xt({}),zi=vt(v,"USE_PROFILES")?v.USE_PROFILES:!1,Lh=v.ALLOW_ARIA_ATTR!==!1,Hd=v.ALLOW_DATA_ATTR!==!1,Th=v.ALLOW_UNKNOWN_PROTOCOLS||!1,Ah=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ui=v.SAFE_FOR_TEMPLATES||!1,Lr=v.SAFE_FOR_XML!==!1,Wn=v.WHOLE_DOCUMENT||!1,Gi=v.RETURN_DOM||!1,Tr=v.RETURN_DOM_FRAGMENT||!1,Ar=v.RETURN_TRUSTED_TYPE||!1,Ud=v.FORCE_BODY||!1,Ch=v.SANITIZE_DOM!==!1,Bh=v.SANITIZE_NAMED_PROPS||!1,Gd=v.KEEP_CONTENT!==!1,ya=v.IN_PLACE||!1,ce=v.ALLOWED_URI_REGEXP||ku,Vi=v.NAMESPACE||sn,Dr=v.MATHML_TEXT_INTEGRATION_POINTS||Dr,Mr=v.HTML_INTEGRATION_POINTS||Mr,ve=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&jh(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ve.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&jh(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ve.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ve.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ui&&(Hd=!1),Tr&&(Gi=!0),zi&&(K=z({},yu),ke=[],zi.html===!0&&(z(K,bu),z(ke,wu)),zi.svg===!0&&(z(K,Yr),z(ke,Xr),z(ke,Aa)),zi.svgFilters===!0&&(z(K,Qr),z(ke,Xr),z(ke,Aa)),zi.mathMl===!0&&(z(K,Zr),z(ke,$u),z(ke,Aa))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?Fi.tagCheck=v.ADD_TAGS:(K===de&&(K=xt(K)),z(K,v.ADD_TAGS,Se))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?Fi.attributeCheck=v.ADD_ATTR:(ke===Ih&&(ke=xt(ke)),z(ke,v.ADD_ATTR,Se))),v.ADD_URI_SAFE_ATTR&&z(Vd,v.ADD_URI_SAFE_ATTR,Se),v.FORBID_CONTENTS&&(Nt===zd&&(Nt=xt(Nt)),z(Nt,v.FORBID_CONTENTS,Se)),v.ADD_FORBID_CONTENTS&&(Nt===zd&&(Nt=xt(Nt)),z(Nt,v.ADD_FORBID_CONTENTS,Se)),Gd&&(K["#text"]=!0),Wn&&z(K,["html","head","body"]),K.table&&(z(K,["tbody"]),delete ba.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw ts('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ts('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=v.TRUSTED_TYPES_POLICY,x=R.createHTML("")}else R===void 0&&(R=Qv(g,s)),R!==null&&typeof x=="string"&&(x=R.createHTML(""));He&&He(v),Wi=v}},Ph=z({},[...Yr,...Qr,...Nv]),qh=z({},[...Zr,...Ov]),P0=function(v){let L=A(v);(!L||!L.tagName)&&(L={namespaceURI:Vi,tagName:"template"});const P=Ta(v.tagName),pe=Ta(L.tagName);return Kd[v.namespaceURI]?v.namespaceURI===Br?L.namespaceURI===sn?P==="svg":L.namespaceURI===Cr?P==="svg"&&(pe==="annotation-xml"||Dr[pe]):!!Ph[P]:v.namespaceURI===Cr?L.namespaceURI===sn?P==="math":L.namespaceURI===Br?P==="math"&&Mr[pe]:!!qh[P]:v.namespaceURI===sn?L.namespaceURI===Br&&!Mr[pe]||L.namespaceURI===Cr&&!Dr[pe]?!1:!qh[P]&&(D0[P]||!Ph[P]):!!(wa==="application/xhtml+xml"&&Kd[v.namespaceURI]):!1},Ot=function(v){Ji(t.removed,{element:v});try{A(v).removeChild(v)}catch{_(v)}},Kn=function(v,L){try{Ji(t.removed,{attribute:L.getAttributeNode(v),from:L})}catch{Ji(t.removed,{attribute:null,from:L})}if(L.removeAttribute(v),v==="is")if(Gi||Tr)try{Ot(L)}catch{}else try{L.setAttribute(v,"")}catch{}},Nh=function(v){let L=null,P=null;if(Ud)v="<remove></remove>"+v;else{const _e=Kr(v,/^[\r\n\t ]+/);P=_e&&_e[0]}wa==="application/xhtml+xml"&&Vi===sn&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const pe=R?R.createHTML(v):v;if(Vi===sn)try{L=new f().parseFromString(pe,wa)}catch{}if(!L||!L.documentElement){L=w.createDocument(Vi,"template",null);try{L.documentElement.innerHTML=Wd?x:pe}catch{}}const qe=L.body||L.documentElement;return v&&P&&qe.insertBefore(n.createTextNode(P),qe.childNodes[0]||null),Vi===sn?X.call(L,Wn?"html":"body")[0]:Wn?L.documentElement:qe},Oh=function(v){return D.call(v.ownerDocument||v,v,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Qd=function(v){return v instanceof p&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof d)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},Hh=function(v){return typeof r=="function"&&v instanceof r};function an(q,v,L){La(q,P=>{P.call(t,v,L,Wi)})}const Fh=function(v){let L=null;if(an(J.beforeSanitizeElements,v,null),Qd(v))return Ot(v),!0;const P=Se(v.nodeName);if(an(J.uponSanitizeElement,v,{tagName:P,allowedTags:K}),Lr&&v.hasChildNodes()&&!Hh(v.firstElementChild)&&Fe(/<[/\w!]/g,v.innerHTML)&&Fe(/<[/\w!]/g,v.textContent)||v.nodeType===is.progressingInstruction||Lr&&v.nodeType===is.comment&&Fe(/<[/\w]/g,v.data))return Ot(v),!0;if(!(Fi.tagCheck instanceof Function&&Fi.tagCheck(P))&&(!K[P]||ba[P])){if(!ba[P]&&Gh(P)&&(ve.tagNameCheck instanceof RegExp&&Fe(ve.tagNameCheck,P)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(P)))return!1;if(Gd&&!Nt[P]){const pe=A(v)||v.parentNode,qe=I(v)||v.childNodes;if(qe&&pe){const _e=qe.length;for(let it=_e-1;it>=0;--it){const on=y(qe[it],!0);on.__removalCount=(v.__removalCount||0)+1,pe.insertBefore(on,E(v))}}}return Ot(v),!0}return v instanceof l&&!P0(v)||(P==="noscript"||P==="noembed"||P==="noframes")&&Fe(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ot(v),!0):(Ui&&v.nodeType===is.text&&(L=v.textContent,La([S,j,M],pe=>{L=es(L,pe," ")}),v.textContent!==L&&(Ji(t.removed,{element:v.cloneNode()}),v.textContent=L)),an(J.afterSanitizeElements,v,null),!1)},Uh=function(v,L,P){if(Ch&&(L==="id"||L==="name")&&(P in n||P in j0))return!1;if(!(Hd&&!Od[L]&&Fe(ie,L))){if(!(Lh&&Fe(we,L))){if(!(Fi.attributeCheck instanceof Function&&Fi.attributeCheck(L,v))){if(!ke[L]||Od[L]){if(!(Gh(v)&&(ve.tagNameCheck instanceof RegExp&&Fe(ve.tagNameCheck,v)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(v))&&(ve.attributeNameCheck instanceof RegExp&&Fe(ve.attributeNameCheck,L)||ve.attributeNameCheck instanceof Function&&ve.attributeNameCheck(L,v))||L==="is"&&ve.allowCustomizedBuiltInElements&&(ve.tagNameCheck instanceof RegExp&&Fe(ve.tagNameCheck,P)||ve.tagNameCheck instanceof Function&&ve.tagNameCheck(P))))return!1}else if(!Vd[L]){if(!Fe(ce,es(P,nn,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&v!=="script"&&Rv(P,"data:")===0&&Dh[v])){if(!(Th&&!Fe($e,es(P,nn,"")))){if(P)return!1}}}}}}}return!0},Gh=function(v){return v!=="annotation-xml"&&Kr(v,B)},zh=function(v){an(J.beforeSanitizeAttributes,v,null);const{attributes:L}=v;if(!L||Qd(v))return;const P={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0};let pe=L.length;for(;pe--;){const qe=L[pe],{name:_e,namespaceURI:it,value:on}=qe,Ki=Se(_e),Zd=on;let Me=_e==="value"?Zd:jv(Zd);if(P.attrName=Ki,P.attrValue=Me,P.keepAttr=!0,P.forceKeepAttr=void 0,an(J.uponSanitizeAttribute,v,P),Me=P.attrValue,Bh&&(Ki==="id"||Ki==="name")&&(Kn(_e,v),Me=C0+Me),Lr&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){Kn(_e,v);continue}if(Ki==="attributename"&&Kr(Me,"href")){Kn(_e,v);continue}if(P.forceKeepAttr)continue;if(!P.keepAttr){Kn(_e,v);continue}if(!Ah&&Fe(/\/>/i,Me)){Kn(_e,v);continue}Ui&&La([S,j,M],Wh=>{Me=es(Me,Wh," ")});const Vh=Se(v.nodeName);if(!Uh(Vh,Ki,Me)){Kn(_e,v);continue}if(R&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!it)switch(g.getAttributeType(Vh,Ki)){case"TrustedHTML":{Me=R.createHTML(Me);break}case"TrustedScriptURL":{Me=R.createScriptURL(Me);break}}if(Me!==Zd)try{it?v.setAttributeNS(it,_e,Me):v.setAttribute(_e,Me),Qd(v)?Ot(v):vu(t.removed)}catch{Kn(_e,v)}}an(J.afterSanitizeAttributes,v,null)},q0=function q(v){let L=null;const P=Oh(v);for(an(J.beforeSanitizeShadowDOM,v,null);L=P.nextNode();)an(J.uponSanitizeShadowNode,L,null),Fh(L),zh(L),L.content instanceof a&&q(L.content);an(J.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(q){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,P=null,pe=null,qe=null;if(Wd=!q,Wd&&(q="<!-->"),typeof q!="string"&&!Hh(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw ts("dirty is not a string, aborting")}else throw ts("toString is not a function");if(!t.isSupported)return q;if(Fd||Yd(v),t.removed=[],typeof q=="string"&&(ya=!1),ya){if(q.nodeName){const on=Se(q.nodeName);if(!K[on]||ba[on])throw ts("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof r)L=Nh("<!---->"),P=L.ownerDocument.importNode(q,!0),P.nodeType===is.element&&P.nodeName==="BODY"||P.nodeName==="HTML"?L=P:L.appendChild(P);else{if(!Gi&&!Ui&&!Wn&&q.indexOf("<")===-1)return R&&Ar?R.createHTML(q):q;if(L=Nh(q),!L)return Gi?null:Ar?x:""}L&&Ud&&Ot(L.firstChild);const _e=Oh(ya?q:L);for(;pe=_e.nextNode();)Fh(pe),zh(pe),pe.content instanceof a&&q0(pe.content);if(ya)return q;if(Gi){if(Tr)for(qe=H.call(L.ownerDocument);L.firstChild;)qe.appendChild(L.firstChild);else qe=L;return(ke.shadowroot||ke.shadowrootmode)&&(qe=ne.call(i,qe,!0)),qe}let it=Wn?L.outerHTML:L.innerHTML;return Wn&&K["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Fe(_u,L.ownerDocument.doctype.name)&&(it="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+it),Ui&&La([S,j,M],on=>{it=es(it,on," ")}),R&&Ar?R.createHTML(it):it},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Yd(q),Fd=!0},t.clearConfig=function(){Wi=null,Fd=!1},t.isValidAttribute=function(q,v,L){Wi||Yd({});const P=Se(q),pe=Se(v);return Uh(P,pe,L)},t.addHook=function(q,v){typeof v=="function"&&Ji(J[q],v)},t.removeHook=function(q,v){if(v!==void 0){const L=Dv(J[q],v);return L===-1?void 0:Mv(J[q],L,1)[0]}return vu(J[q])},t.removeHooks=function(q){J[q]=[]},t.removeAllHooks=function(){J=xu()},t}var Iu=Su();const Jr="chaotic_";function Ge(e){try{return localStorage.getItem(Jr+e)}catch{return null}}function st(e,t){try{localStorage.setItem(Jr+e,t)}catch{}}function St(e){try{localStorage.removeItem(Jr+e)}catch{}}function el(){return Ge("token")}function Zv(e){e?st("token",e):St("token")}function Xv(){return Ge("theme")}function Jv(e){st("theme",e)}function Lu(){return Ge("last_project")}function Tu(e){st("last_project",e)}function eb(){return Ge("onboarding_complete")==="true"}function tb(){st("onboarding_complete","true")}function nb(){St("onboarding_complete")}function ib(e){return e?Ge(`issues_filters_${e}`):null}function sb(e,t){e&&(t?st(`issues_filters_${e}`,t):St(`issues_filters_${e}`))}function Au(e){return Ge(`comment_draft_${e}`)}function Ca(e,t){t?st(`comment_draft_${e}`,t):St(`comment_draft_${e}`)}function Cu(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function ss(e){const t=Ge(`description_draft_${e}`);if(!t)return null;const n=Cu(t);return n?n.draft:t}function Bu(e){const t=Ge(`description_draft_${e}`);if(!t)return null;const n=Cu(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Sn(e,t,n=""){t?st(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):St(`description_draft_${e}`)}function Du(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Mu(e){var n;const t=Ge(`document_draft_${e}`);return t?((n=Du(t))==null?void 0:n.draft)??null:null}function ab(e){const t=Ge(`document_draft_${e}`);if(!t)return null;const n=Du(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Ba(e,t,n=null){t&&(t.title||t.content||t.icon)?st(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):St(`document_draft_${e}`)}function ob(){return{title:Ge("create_issue_title"),description:Ge("create_issue_description")}}function Ru(e,t){e?st("create_issue_title",e):St("create_issue_title"),t?st("create_issue_description",t):St("create_issue_description")}function rb(){St("create_issue_title"),St("create_issue_description")}function lb(){return Ge("doc_view_mode")}function cb(e){st("doc_view_mode",e)}function db(){return Ge("approvals_explainer_dismissed")==="1"}function ub(){st("approvals_explainer_dismissed","1")}function pb(){return Ge("composer_mode")==="markdown"?"markdown":"rich"}function ju(e){st("composer_mode",e==="markdown"?"markdown":"rich")}const mb="chaotic-boot-cache",tl="snapshot",nl="last",Pu=1,fb=336*60*60*1e3,gb=250;let In=null;function hb(){return In||(In=new Promise((e,t)=>{var i;let n;try{n=(i=globalThis.indexedDB)==null?void 0:i.open(mb,1)}catch(s){t(s);return}if(!n){t(new Error("IndexedDB unavailable"));return}n.onupgradeneeded=()=>n.result.createObjectStore(tl),n.onsuccess=()=>{const s=n.result;s.onversionchange=()=>{s.close(),In=null},e(s)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IndexedDB blocked"))}),In.catch(()=>{In=null}),In)}function il(e,t){return hb().then(n=>new Promise((i,s)=>{const a=n.transaction(tl,e),o=t(a.objectStore(tl));a.oncomplete=()=>i(o==null?void 0:o.result),a.onerror=()=>s(a.error),a.onabort=()=>s(a.error)}))}function qu(e){var t;try{const n=String(e).split(".")[1];if(!n)return null;const i=atob(n.replace(/-/g,"+").replace(/_/g,"/")),s=(t=JSON.parse(i))==null?void 0:t.sub;return typeof s=="string"&&s?s:null}catch{return null}}function vb(e){if(!e)return Promise.resolve(null);const t=il("readonly",i=>i.get(nl)).then(i=>!i||i.version!==Pu||i.userId!==e||!(Date.now()-i.savedAt<fb)?null:i).catch(()=>null),n=new Promise(i=>setTimeout(()=>i(null),gb));return Promise.race([t,n])}function bb(e,t){if(!e)return Promise.resolve();const n={...t,version:Pu,userId:e,savedAt:Date.now()};return il("readwrite",i=>i.put(n,nl)).then(()=>{},()=>{})}function sl(){return il("readwrite",e=>e.delete(nl)).then(()=>{},()=>{})}const yb="/api";class wb{constructor(){this.token=el()}setToken(t){this.token=t,Zv(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s},o=typeof Blob<"u"&&i instanceof Blob;o&&(s["Content-Type"]=i.type||"application/octet-stream"),i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=o?i:JSON.stringify(i));let r;try{r=await fetch(`${yb}${n}`,a)}catch(c){const d=new Error("Network error - check your connection");throw d.isNetworkError=!0,d.cause=c,d}if(r.status===204)return null;let l;try{l=await r.json()}catch{const c=r.headers.get("content-type")||"unknown";throw r.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${r.status})`)}if(!r.ok){let c;typeof l.detail=="string"?c=l.detail:l.detail&&typeof l.detail=="object"&&l.detail.message?c=l.detail.message:c="An error occurred";const d=new Error(c);throw d.status=r.status,d.detail=l.detail,d}return l}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async requestEmailVerification(){return this.request("POST","/auth/email-verification")}async confirmEmailVerification(t){return this.request("POST","/auth/email-verification/confirm",{code:t})}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null),sl()}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async uploadAvatar(t){return this.request("PUT","/users/me/avatar",t)}async deleteAvatar(){return this.request("DELETE","/users/me/avatar")}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async getInvitation(t){return this.request("GET",`/teams/invitations/${encodeURIComponent(t)}`)}async acceptInvitation(t,n){const i=`/teams/invitations/${encodeURIComponent(t)}/accept`;return n===void 0?this.request("POST",i):this.request("POST",i,{code:n})}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async issueInvitationVerificationCode(t,n){return this.request("POST",`/teams/${t}/invitations/${encodeURIComponent(n)}/verification-code`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async queryIssues({projectId:t=null,teamId:n=null,where:i=null,filter:s=null,order:a=null,skip:o=0,limit:r=100}={}){let l;if(t)l=`/projects/${encodeURIComponent(t)}/issues/query`;else if(n)l=`/teams/${encodeURIComponent(n)}/issues/query`;else throw new Error("queryIssues needs a projectId or a teamId");const c=new URLSearchParams;return i!=null&&i!==""&&c.set("where",i),s&&c.set("filter",typeof s=="string"?s:JSON.stringify(s)),a&&c.set("order",a),c.set("skip",String(o)),c.set("limit",String(r)),this.request("GET",`${l}?${c.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getProjectEpicProgress(t){return this.request("GET",`/projects/${t}/epics`)}async getTeamEpicProgress(t){return this.request("GET",`/teams/${t}/epics`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/teams/${t}/agents`,a)}async createProjectAgent(t,n,i=null,s=!1){const a={name:n,avatar_url:i};return s&&(a.can_register=!0),this.request("POST",`/projects/${t}/agents`,a)}async getTeamRoster(t,{includeIdle:n=!1}={}){const i=n?"?include_idle=true":"";return this.request("GET",`/teams/${t}/roster${i}`)}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getAgentKeys(t){return this.request("GET",`/agents/${encodeURIComponent(t)}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new wb;let Yn=null;const $b='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Qn=null,as=!1;function al(){as=!0}function kb(){as=!1}function Nu(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function _b(){if(as)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function G(){Qn=document.activeElement,as=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function F(){var e;Gt(),as=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Qn&&document.contains(Qn)&&typeof Qn.focus=="function"&&Qn.focus(),Qn=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll($b);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function ze(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function $(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`,t==="error"&&i.setAttribute("role","alert");const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),p=setTimeout(o,l);return a.addEventListener("click",()=>{clearTimeout(p),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(p),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),p=setTimeout(o,Math.max(c,500))}),i}function Da(e){const n=(Array.isArray(e==null?void 0:e.warnings)?e.warnings:[]).filter(s=>typeof s=="string"&&s);if(n.length===0)return 0;const i=$(n.join(`
`),"warning");return i==null||i.classList.add("toast-multiline"),n.length}function Eb(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function k(e,t){const n=Eb(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";$(`Failed to ${e}: ${n}${i}`,"error")}function Gt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Yn&&(document.removeEventListener("keydown",Yn),Yn=null)}function xb(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));Gt(),t&&ze()&&Nu()}function os(e){Yn&&document.removeEventListener("keydown",Yn),Yn=e,e&&document.addEventListener("keydown",e)}function rs(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(Gt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Te(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ae(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ie(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function se(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function u(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function m(e){return u(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Sb(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function at(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function lt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}const ol=/^\/api\/avatars\/[0-9a-f]{64}$/;function Ou(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||ol.test(e))}function zt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?Ou(i)?`<img class="${t} avatar-img" src="${m(i)}" alt="${m(n)}">`:`<div class="${t} avatar-emoji">${u(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Hu(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${m(n)}">agent</span>`}function Ma(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${m(i)}">${u(n)}</span>`}return Hu(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let le={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const rl=new Set;function ge(e,t){if(typeof e=="string"){const n=le[e];le[e]=t,Fu(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=le[i];le[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Fu(i,s,a)})}}function ct(e){return rl.add(e),()=>rl.delete(e)}function Fu(e,t,n){t!==n&&rl.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const me=()=>le.currentUser,It=e=>ge("currentUser",e),C=()=>le.currentView,ls=e=>ge("currentView",e),ee=()=>le.issues,Je=e=>ge("issues",e),cs=()=>le.detailNavContext,Lt=e=>ge("detailNavContext",e),ll=()=>le.labels,ds=e=>ge("labels",e),Uu=()=>le.activeFilterCategory,Ib=e=>ge("activeFilterCategory",e),Gu=()=>le.selectedIssueIndex,Ln=e=>ge("selectedIssueIndex",e),Lb=()=>le.selectedDocIndex,zu=e=>ge("selectedDocIndex",e),Vu=()=>le.selectedBoardIndex,Ra=e=>ge("selectedBoardIndex",e),Tb=()=>le.selectedInboxIndex,ja=e=>ge("selectedInboxIndex",e),Ab=()=>le.selectedSprintIndex,Wu=e=>ge("selectedSprintIndex",e),Cb=()=>le.selectedEpicIndex,cl=e=>ge("selectedEpicIndex",e),Bb=()=>le.pendingGates,Db=e=>ge("pendingGates",e),he=()=>le.inboxEntries,Vt=e=>ge("inboxEntries",e),Pa=()=>le.inboxUnreadCount,us=e=>ge("inboxUnreadCount",e),Mb=()=>le.searchDebounceTimer,Rb=e=>ge("searchDebounceTimer",e),jb=()=>le.websocket,dl=e=>ge("websocket",e),T=()=>le.currentTeam,Zn=e=>ge("currentTeam",e),Q=()=>le.currentProject,bt=e=>ge("currentProject",e||null),Ee=()=>le.currentDetailIssue,Xn=e=>ge("currentDetailIssue",e),Pb=()=>le.currentDetailSprints,Ku=e=>ge("currentDetailSprints",e),ul=["backlog","todo","in_progress","in_review","done","canceled"],ps=["backlog","todo","in_progress","in_review"],Yu=["urgent","high","medium","low","no_priority"],pl=["no_priority","urgent","high","medium","low"],Qu=["backlog","todo","in_progress","in_review","done"],qa="#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row";function Tn(e){if(!e)return!1;const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||!!e.isContentEditable}const ml={};function ae(e){Object.assign(ml,e)}function qb(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target&&Tn(e.target)||n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=ml[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Zu=!1;function Nb(){if(!Zu){Zu=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,qb);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=ml[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}function V({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${m(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${m(r)}="${m(l)}"`).join(""):""}>${u(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${u(t)}</h3>
            <p>${u(n)}</p>
            ${a}
        </div>
    `}const U={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'},Xu=24,et=new Map,be=new Map,yt=new Map;let Wt=null;function Ob(e){return Array.isArray(e)?[...e].map(String).sort():e}function Ju(e){const t=Object.entries(e||{}).filter(([,n])=>n!=null&&n!==""&&!(Array.isArray(n)&&n.length===0)).map(([n,i])=>[n,Ob(i)]).sort(([n],[i])=>n<i?-1:n>i?1:0);return JSON.stringify(t)}function Na(e,t){for(be.delete(e),be.set(e,t);be.size>Xu;){const n=be.keys().next().value;be.delete(n)}ep()}function ep(){if(et.size===0)return;const e=new Set;be.forEach(t=>t.ids.forEach(n=>e.add(n))),et.forEach((t,n)=>{e.has(n)||et.delete(n)})}function Hb(e){return(e||[]).filter(t=>t&&t.id&&!t._isOptimistic)}function tp(e){const t=be.get(e);return t?(Na(e,t),t.ids.map(n=>et.get(n)).filter(Boolean)):null}function fl(e){return et.get(e)}function Fb(e){var t;return((t=be.get(e))==null?void 0:t.meta)||{}}function np(e,t){if(!e||!t)return!1;const n=Date.parse(e),i=Date.parse(t);return Number.isNaN(n)||Number.isNaN(i)?e>t:n>i}function gl(e){const t=et.get(e.id);if(!np(t==null?void 0:t.updated_at,e.updated_at)){if(e.description==null&&(t==null?void 0:t.description)!=null&&t.updated_at===e.updated_at){et.set(e.id,{...e,description:t.description});return}et.set(e.id,e)}}const hl=new Set;function Ub(e){return hl.add(e),()=>hl.delete(e)}function ip(e,t,n){if(!Array.isArray(t))return;const i=Hb(t);i.forEach(gl);const s=be.get(e);Na(e,{ids:i.map(a=>a.id),meta:n??(s==null?void 0:s.meta)??{}}),hl.forEach(a=>{try{a(e)}catch(o){console.error(o)}})}function Gb(e,t){const n=be.get(e);n&&(n.meta=t)}function Oa(e){e!=null&&e.id&&et.has(e.id)&&gl(e)}function zb(e){be.delete(e),yt.forEach((t,n)=>{t===e&&yt.delete(n)}),Wt===e&&(Wt=null),ep()}function Vb(e){et.delete(e),be.forEach(t=>{t.ids.includes(e)&&(t.ids=t.ids.filter(n=>n!==e))})}function Ha(e){Wt=e}function Wb(){return Wt}function sp(e,t){for(yt.delete(e),yt.set(e,t);yt.size>Xu;)yt.delete(yt.keys().next().value)}function Kb(e){const t=yt.get(e);return t&&be.has(t)?t:null}function Yb({maxQueries:e=3}={}){const t=[...be.entries()].slice(-e),n=new Set(t.map(([s])=>s)),i=new Set;return t.forEach(([,s])=>s.ids.forEach(a=>i.add(a))),{queries:t.map(([s,a])=>[s,{ids:[...a.ids],meta:a.meta||{}}]),entities:[...i].map(s=>et.get(s)).filter(Boolean),views:[...yt.entries()].filter(([,s])=>n.has(s))}}function Qb(e){if(!e||!Array.isArray(e.queries))return;const t=new Map((e.entities||[]).filter(n=>n==null?void 0:n.id).map(n=>[n.id,n]));e.queries.forEach(([n,i])=>{be.has(n)||!Array.isArray(i==null?void 0:i.ids)||(i.ids.forEach(s=>{t.has(s)&&gl(t.get(s))}),Na(n,{ids:i.ids.filter(s=>et.has(s)),meta:i.meta||{}}))}),(e.views||[]).forEach(([n,i])=>{!yt.has(n)&&be.has(i)&&sp(n,i)})}function ap(e){const t=(e.labels||[]).map(i=>`${i.id}:${i.name}:${i.color}`).join(","),n=[e.status,e.priority,e.estimate,e.assignee_id,e.issue_type,e.title].map(i=>i??"").join("|");return`${e.id}|${e.updated_at}|${e.sprint_id??""}|${t}|${e.description==null?0:1}|${n}`}function op(e,t){if(!Array.isArray(e)||!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(ap(e[n])!==ap(t[n]))return!1;return!0}const rp=["status","priority"],lp=["assignee_id","sprint_id","issue_type"],Zb={assignee_id:"unassigned",sprint_id:"no_sprint"},Xb=["scope","project_id","sort_by","order","limit"],An=e=>(e||[]).map(t=>String(t).toLowerCase());function Jb(e,t){if(e.search||t.search||t.sort_by==="random"||Xb.some(n=>(e[n]??null)!==(t[n]??null))||t.label!==void 0&&t.label_match!=="any")return!1;for(const n of rp)if(e[n]!==void 0&&(t[n]===void 0||!t[n].every(i=>e[n].includes(i))))return!1;for(const n of lp)if(e[n]!==void 0&&e[n]!==t[n])return!1;if(e.label!==void 0){if(t.label===void 0||e.label_match!==t.label_match)return!1;const n=An(e.label);if(!An(t.label).every(i=>n.includes(i)))return!1}if(e.exclude_label!==void 0){const n=An(t.exclude_label);if(!An(e.exclude_label).every(i=>n.includes(i)))return!1}return!0}function cp(e){const t=e.label===void 0?null:An(e.label),n=e.exclude_label===void 0?null:An(e.exclude_label);return i=>{for(const s of rp)if(e[s]!==void 0&&!e[s].includes(i[s]))return!1;for(const s of lp){if(e[s]===void 0)continue;const a=e[s]===Zb[s]?null:e[s];if((i[s]??null)!==a)return!1}if(t||n){const s=An((i.labels||[]).map(a=>a.name));if(t&&!t.some(a=>s.includes(a))||n&&n.some(a=>s.includes(a)))return!1}return!0}}function ey(e){if(e!=null&&e.search)return null;const t=Object.fromEntries(JSON.parse(Ju(e)));let n=null,i=null;if(be.forEach((r,l)=>{if(n&&r.ids.length>=n.ids.length)return;let c;try{c=Object.fromEntries(JSON.parse(l))}catch{return}Jb(c,t)&&(n=r,i=l)}),!n)return null;Na(i,n);const s=cp(t),a=n.ids.map(r=>et.get(r)).filter(r=>r&&s(r)),o=t.limit;return{rows:a,complete:!(typeof o=="number"&&n.ids.length>=o)}}function ty(){et.clear(),be.clear(),yt.clear(),Wt=null}ct((e,t,n)=>{if(e==="currentTeam"){((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&ty();return}if(e!=="issues"||Wt===null||!be.has(Wt)||C()!=="issues")return;const i=be.get(Wt);ip(Wt,ee(),i.meta)});let vl=[];function ny(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function iy(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null,kind:e.kind||null,registered_by_id:e.registered_by_id||null,idle:e.idle===!0}}function ms(e,t){const n=e().map(ny),i=t().map(iy);vl=[...n,...i]}function wt(e){return e&&vl.find(t=>t.id===e)||null}function dt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Fa(e,t=!1){const n=u(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${u(e.parent_user_name)})`:" (agent)",s=t===!0?1:Number(t)||0;return`${s?`${"&nbsp;&nbsp;".repeat(s)}- `:""}${n}${i}`}function fs({includeIdle:e=!1,keepId:t=null}={}){const n=vl.filter(b=>e||!b.idle||b.id===t),i=n.filter(b=>!b.is_agent),s=new Set(i.map(b=>b.id)),a=n.filter(b=>b.is_agent),o=new Set(a.map(b=>b.id)),r=(b,y)=>b.name.localeCompare(y.name),l=b=>b.registered_by_id&&o.has(b.registered_by_id),c=new Map,d=new Map;a.forEach(b=>{const[y,_]=l(b)?[c,b.registered_by_id]:[d,b.parent_user_id];y.has(_)||y.set(_,[]),y.get(_).push(b)});const p=[],f=(b,y)=>{p.push({assignee:b,indent:y}),(c.get(b.id)||[]).sort(r).forEach(E=>p.push({assignee:E,indent:2}))};return i.forEach(b=>{p.push({assignee:b,indent:!1}),(d.get(b.id)||[]).sort(r).forEach(y=>f(y,!0))}),a.filter(b=>!l(b)&&!s.has(b.parent_user_id)).sort(r).forEach(b=>f(b,!1)),p}function Jn({keepId:e=null}={}){const t=document.getElementById("assignee-filter");if(!t)return;const n=e||t.value;let i=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;fs({keepId:n}).forEach(({assignee:s,indent:a})=>{i+=`<option value="${m(s.id)}">${Fa(s,a)}</option>`}),t.innerHTML=i,n&&(t.value=n)}function sy(e){const t=document.getElementById("assignee-filter");if(!t||!e)return;!Array.from(t.options).some(i=>i.value===e)&&wt(e)&&Jn({keepId:e}),t.value=e}let Tt=[],bl=[],Ua=-1,yl=null;const dp=5,ay=new Set(["done","canceled"]),up=new Set;function oy(){return Ua}function ry(e){Ua=e;const t=e>=0?document.querySelectorAll("#my-issues-list .issue-row")[e]:null;yl=(t==null?void 0:t.dataset.issueId)??null}const pp=[{status:"in_progress",label:"In progress"},{status:"in_review",label:"In review"},{status:"todo",label:"Todo"},{status:"backlog",label:"Backlog"},{status:"done",label:"Done"},{status:"canceled",label:"Canceled"}];function mp(e){const t=new Set(pp.map(s=>s.status)),n=pp.map(s=>({...s,issues:e.filter(a=>a.status===s.status)})),i=e.filter(s=>!t.has(s.status));return i.length&&n.push({status:"other",label:"Other",issues:i}),n.filter(s=>s.issues.length)}ct(e=>{e==="currentProject"&&C()==="my-issues"&&(ei(),gs(),ti())});function Ve(){return Tt}function Cn(e){Tt=e}let wl=0;async function ei(){var a;const e=T(),t=me();if(!e||!t)return;const n=++wl,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=Q();cy();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==wl)return;Tt=mp(r).flatMap(l=>l.issues),C()==="my-issues"&&Lt(Tt),Bn()}catch(o){if(n!==wl)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=V({icon:U.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),k("load issues",o)}}async function ti({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=Q();bl=await h.getTeamActivities(t.id,0,10,{projectId:i}),ly()}catch{n&&(n.innerHTML=V({icon:U.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function ly(){const e=document.getElementById("dashboard-activity-list");if(e){if(!bl.length){e.innerHTML=V({icon:U.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=bl.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${m(t.issue_identifier)}"><strong>${u(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${m(t.document_id)}"><strong>${s} ${u(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${u(t.document_title)}</strong>`);const i=ac(t);return`
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${Fm(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${rc(t)}${n}</span>
                <span class="activity-actor">by ${u(i)}</span>
                <time class="activity-time" datetime="${m(t.created_at||"")}">${at(t.created_at)}</time>
            </div>
        </div>
    `}).join("")}}function cy(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function fp(){ei()}function Bn(){var o,r;const e=document.getElementById("my-issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=mp(Tt);Tt=t.flatMap(l=>l.issues),C()==="my-issues"&&Lt(Tt),Ua=-1;const n=document.getElementById("my-issues-count");if(n&&(n.textContent=Tt.length?String(Tt.length):""),Tt.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}const i=document.activeElement,s=e.contains(i)?(o=i.closest(".issue-row"))==null?void 0:o.dataset.issueId:null,a=s?(r=i.dataset)==null?void 0:r.dropdownType:null;if(e.innerHTML=t.map(l=>{const c=ay.has(l.status)&&!up.has(l.status)&&l.issues.length>dp,d=c?l.issues.slice(0,dp):l.issues;return`
        <div class="dash-group" role="group" aria-labelledby="dash-group-${l.status}">
            <h4 class="dash-group-header" id="dash-group-${l.status}">
                <span class="dash-group-dot status-${l.status}" aria-hidden="true"></span>
                ${u(l.label)} <span class="dash-group-count">${l.issues.length}</span>
            </h4>
            ${d.map(p=>ui(p)).join("")}
            ${c?`<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${l.status}">Show all ${l.issues.length}</button>`:""}
        </div>`}).join(""),s){const l=[...e.querySelectorAll(".issue-row")].find(d=>d.dataset.issueId===s),c=l&&(a?l.querySelector(`[data-dropdown-type="${a}"]`):l.querySelector(".issue-title"));c==null||c.focus({preventScroll:!0})}if(yl){const l=[...e.querySelectorAll(".issue-row")],c=l.findIndex(d=>d.dataset.issueId===yl);c!==-1&&(l[c].classList.add("keyboard-selected"),Ua=c)}}let $l=0,Ga=[],gp=null;async function gs(){var o;const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++$l,n=Q(),i=`${((o=T())==null?void 0:o.id)??""}:${n??""}`;i!==gp&&(gp=i,hs=!1),Ga=[];const s=te(),a=n?s.filter(r=>r.id===n):s;if(!a.length){e.innerHTML="";return}try{const r=a.map(async c=>{try{const d=await h.getCurrentSprint(c.id);if(!d)return null;let p={},f=!1;if(!n)return{project:c,sprint:d,statusCounts:p};try{const g=await h.getIssues({sprint_id:d.id,project_id:c.id,limit:500});for(const b of g)p[b.status]=(p[b.status]||0)+1}catch(g){console.error(`Failed to load issue counts for sprint ${d.id}:`,g),f=!0}return{project:c,sprint:d,statusCounts:p,countsFailed:f}}catch(d){return console.error(`Failed to load current sprint for project ${c.id}:`,d),null}}),l=(await Promise.all(r)).filter(Boolean);if(t!==$l)return;Ga=l,$p(l,{single:!!n})}catch(r){if(t!==$l)return;console.error("Failed to load sprint status:",r),e.innerHTML=V({icon:U.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}const hp=5;let hs=!1;const vp=["done","in_review","in_progress","todo","backlog"];function za(e){const t=e.points_spent||0,n=e.budget!==null&&e.budget!==void 0,i=n?e.budget:null,s=n&&t>i,a=n?i>0?Math.min(100,Math.round(t/i*100)):t>0?100:0:null,o=e.limbo?"limbo":s?"arrears":n&&a>=80?"near":"";return{spent:t,budget:i,hasBudget:n,overBudget:s,pct:a,state:o}}function dy(e){const t=({sprint:n})=>{const i=za(n);return n.limbo?[0,0]:i.overBudget?[1,-(i.spent-i.budget)]:i.hasBudget?[2,-i.pct]:[3,-i.spent]};return e.map((n,i)=>({d:n,r:t(n),i})).sort((n,i)=>n.r[0]-i.r[0]||n.r[1]-i.r[1]||n.i-i.i).map(n=>n.d)}function uy(e){if(!e.activated_at)return null;const t=Date.now()-new Date(e.activated_at);return Number.isFinite(t)?Math.max(0,Math.floor(t/864e5))+1:null}function py(e){return e.hasBudget?e.overBudget?`<strong>${e.spent-e.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.budget-e.spent}</strong> pts left <span class="sprint-focus-muted">· ${e.spent}/${e.budget}</span>`:`<strong>${e.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`}function my(e,t){return e.limbo?'<span class="badge badge-warning" title="Closed, waiting on sprint rituals">Limbo</span>':t.overBudget?'<span class="badge badge-danger" title="Over budget: close the sprint to keep working">Arrears</span>':""}const fy={near:"is-near",arrears:"is-over",limbo:"is-limbo"};function bp(e){return fy[e.state]||""}function yp(e){return`<span class="meter ${bp(e)}" aria-hidden="true"><span class="meter-fill" style="width: ${e.pct}%"></span></span>`}function gy(e,t){return e.limbo?"in limbo":t.overBudget?"in arrears":t.state==="near"?"nearly spent":""}function wp(e){return`data-action="view-sprint" data-sprint-id="${m(e.id)}" data-sprint-url="/sprint/${m(e.id)}"`}function hy({sprint:e,statusCounts:t,countsFailed:n}){const i=za(e),s=t||{},a=Object.values(s).reduce((d,p)=>d+p,0),o=uy(e),r=n?"Issue counts unavailable":a?`${a} issue${a===1?"":"s"}`:"No issues planned",l=[o?`Day ${o}`:"",r].filter(Boolean).join(" · ");let c="";return e.limbo?c="Closed and waiting on sprint rituals before the next sprint starts.":i.overBudget&&(c="Over budget. Close the sprint to keep moving tickets."),`
        <button type="button" class="sprint-focus ${i.state}" ${wp(e)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${u(e.name)}</span>
                ${my(e,i)}
                <span class="sprint-focus-meta">${u(l)}</span>
            </span>
            <span class="sprint-focus-headline">${py(i)}</span>
            ${i.hasBudget?yp(i):""}
            ${a?`
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${vp.filter(d=>s[d]).map(d=>`<span class="sprint-stacked-segment status-${d}" style="width: ${s[d]/a*100}%"></span>`).join("")}
                    </span>
                    <span class="sprint-status-counts">
                        ${vp.filter(d=>s[d]).map(d=>`<span class="sprint-count-label status-${d}">${s[d]} ${Te(d)}</span>`).join("")}
                    </span>
                </span>
            `:""}
            ${c?`<span class="sprint-focus-note ${i.state}">${c}</span>`:""}
        </button>
    `}function vy({project:e,sprint:t}){const n=za(t),i=n.hasBudget?`${n.spent}/${n.budget}`:`${n.spent}`,s=gy(t,n),a=`${e.name}: ${t.name}, ${n.hasBudget?`${n.spent} of ${n.budget} pts`:`${n.spent} pts, no budget`}${s?`, ${s}`:""}`;return`
        <li>
            <button type="button" class="sprint-row ${n.state}" ${wp(t)} title="${m(a)}">
                <span class="state-dot ${bp(n)}" aria-hidden="true"></span>
                <span class="sprint-row-project">${u(e.name)}</span>
                <span class="sprint-row-sprint">${u(t.name)}</span>
                ${n.hasBudget?yp(n):'<span class="sprint-row-nometer" aria-hidden="true"></span>'}
                <span class="meter-label">${i}<span class="sprint-row-unit"> pts</span>${n.hasBudget?"":'<span class="sr-only">, no budget</span>'}</span>
                ${s?`<span class="sr-only">, ${s}</span>`:""}
            </button>
        </li>
    `}function $p(e,{single:t=e.length===1&&!!Q()}={}){const n=document.getElementById("dashboard-sprint-status");if(!n)return;if(!e.length){n.innerHTML="";return}if(t){n.innerHTML=`
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${hy(e[0])}
        `;return}const i=dy(e),s=i.filter(({sprint:d})=>d.limbo).length,a=i.filter(({sprint:d})=>!d.limbo&&za(d).overBudget).length,o=[a?`${a} in arrears`:"",s?`${s} in limbo`:""].filter(Boolean).join(" · "),r=i.length>hp,l=hs?i:i.slice(0,hp),c=i.length-l.length;n.innerHTML=`
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${i.length}</span>
            ${o?`<span class="sprint-attention">${o}</span>`:""}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${l.map(vy).join("")}
        </ul>
        ${r?`<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${hs}" aria-controls="dashboard-sprint-rows">${c>0?`Show all ${i.length}`:"Show fewer"}</button>`:""}
    `}ae({"filter-my-issues":()=>fp(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),No(t.identifier)},"retry-load-my-issues":()=>ei(),"dash-show-all":(e,t)=>{up.add(t.status),Bn()},"retry-load-sprint-status":()=>gs(),"dash-sprints-toggle":()=>{var e;Ga.length&&(hs=!hs,$p(Ga,{single:!1}),(e=document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]'))==null||e.focus())}});const kp=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function vs(e=null){const t=e||Q()||"";Up([]);const n=te().map(o=>`
        <option value="${o.id}" ${o.id===t?"selected":""}>${u(o.name)}</option>
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
                        ${Ze("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${pt("no_priority")}
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
                                ${kp.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
    `,G(),Qa();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=ob();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Ru(i.value,s.value)}),s.addEventListener("input",()=>{Ru(i.value,s.value)}),i.focus()}function by(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");if(e&&t){const n=e.classList.toggle("collapsed");t.classList.toggle("expanded"),e.toggleAttribute("inert",n),t.setAttribute("aria-expanded",String(!n))}}function yy(e){const t=kp.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function _p(e,t){const n=te().find(i=>i.id===t);Up([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                        ${Ze("backlog")}
                        <span id="create-issue-status-label">Backlog</span>
                    </button>
                    <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                        ${pt("no_priority")}
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
    `,G(),Qa(),document.getElementById("create-issue-title").focus()}async function wy(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){$("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Fp(),parent_id:e});F(),$(`Created sub-issue ${d.identifier}`,"success"),re(e)}catch(d){k("create sub-issue",d)}}async function $y(e,t,n){var o,r;Gt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Qu.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${m(Te(c))}">
                    ${Ze(c)}
                    <span>${Te(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${pl.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${m(Ae(c))}">
                    ${pt(c)}
                    <span>${Ae(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${m(lt(c))}">
                    <span class="issue-type-badge type-${c}">${lt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=ll(),c=!1;if(l.length===0)try{l=await h.getLabels(T().id),ds(l)}catch(d){console.error("Failed to load labels:",d),c=!0}xl(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),rs(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=fs({keepId:l});a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:p})=>{const f=dt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${m(d.id)}" data-label="${m(f)}">
                    ${zt(d,"avatar-small")}
                    <span>${Fa(d,p)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=_i(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(p=>{const f=p.value===null?"":String(p.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${m(f)}" data-label="${m(p.value?p.label:"Estimate")}">
                    <span>${u(p.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const p=(await h.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),rs(a)}function ky(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function _y(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,al();const i=u(n),s=document.querySelector(`.create-issue-modal .toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`);if(e==="status")s&&(s.innerHTML=`${Ze(t)}<span id="create-issue-status-label">${i}</span>`);else if(e==="priority")s&&(s.innerHTML=`${pt(t)}<span id="create-issue-priority-label">${i}</span>`);else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${lt(t)}</span><span id="create-issue-type-label">${i}</span>`)}Gt(),s==null||s.focus()}async function Ep({keepOpen:e=!1}={}){var y,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((y=document.getElementById("create-issue-sprint"))==null?void 0:y.value)||null,p=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,f=p?new Date(`${p}T00:00:00Z`).toISOString():null;if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}const g=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");g&&(g.disabled=!0),b&&(b.disabled=!0);try{const E=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Fp(),due_date:f});$(`Created ${E.identifier}`,"success"),rb(),C()==="issues"?Ct():C()==="my-issues"&&ei(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",kb(),document.getElementById("create-issue-title").focus()):(F(),re(E.id))}catch(E){k("create issue",E)}finally{g&&(g.disabled=!1),b&&(b.disabled=!1)}}async function Ey(){await Ep({keepOpen:!1})}async function xy(){await Ep({keepOpen:!0})}ae({"toggle-create-dropdown":(e,t,n)=>{$y(t.dropdownType,e,n)},"set-create-field":(e,t)=>{_y(t.field,t.value,t.label)},"create-issue-submit":()=>{Ey()},"create-issue-and-new":()=>{xy()},"update-create-project":()=>{ky()},"apply-template":e=>{yy(e.target.value)},"toggle-create-options":()=>{by()},"create-sub-issue-submit":(e,t)=>{wy(t.parentId,t.projectId)}});function bs(e){if(!e||typeof e!="object")return!1;let t=!1;e.open_children&&e.open_children.message&&($(e.open_children.message,"warning"),t=!0);const n=e.parent_prompt;return n&&n.id&&(Sy(n,e.project_id),t=!0),t}function Sy(e,t){const n=document.getElementById("modal-title"),i=document.getElementById("modal-content");!n||!i||(n.textContent=`Close ${e.identifier}?`,i.innerHTML=`
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
    `,G())}async function Iy(e,t){try{const n=await h.updateIssue(e,{status:"done"});F(),$(`${t} closed`,"success"),bs(n)}catch(n){k(`close ${t}`,n)}}ae({"parent-prompt-dismiss":()=>F(),"parent-prompt-close":(e,t)=>Iy(t.parentId,t.identifier),"parent-prompt-add":(e,t)=>{F(),_p(t.parentId,t.projectId)}});function rn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Dn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Mn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Rn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Va(){const e=document.getElementById("group-by-select");return e?e.value:""}const xp=[{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],kl=["done","canceled"],Ly=ps,Ty="all";function Sp(e,t){return e.length===t.length&&t.every(n=>e.includes(n))}function ni(e=rn()){return e.length===0?"all":Sp(e,ps)?"open":Sp(e,kl)?"closed":null}function Ip(e){var t,n,i;switch(e){case"status":{const s=ni();return s==="all"?0:s?1:rn().length}case"priority":return Dn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Mn().length;case"exclude_labels":return Rn().length;default:return 0}}function _l(){let e=0;return xp.forEach(t=>{e+=Ip(t.key)}),e}function Lp(){var b,y,_,E,I,A;const e=new URLSearchParams,t=rn(),n=Dn(),i=Mn(),s=Rn(),a=(b=document.getElementById("assignee-filter"))==null?void 0:b.value,o=Q()||"",r=(y=document.getElementById("sprint-filter"))==null?void 0:y.value,l=(_=document.getElementById("issue-type-filter"))==null?void 0:_.value,c=(E=document.getElementById("group-by-select"))==null?void 0:E.value,d=(I=document.getElementById("sort-by-select"))==null?void 0:I.value,p=ni(t);p==="all"?e.append("status",Ty):p!=="open"&&t.forEach(R=>e.append("status",R)),n.forEach(R=>e.append("priority",R)),i.forEach(R=>e.append("label",R)),s.forEach(R=>e.append("exclude_label",R)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const f=e.toString(),g=f?`/issues?${f}`:"/issues";history.replaceState({view:"issues"},"",g),sb((A=T())==null?void 0:A.id,f)}function Ay(e){var _;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(E=>t.has(E))){const E=ib((_=T())==null?void 0:_.id);if(E){t=new URLSearchParams(E);const I=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",I)}}const s=t.getAll("status"),a=document.getElementById("status-filter-dropdown");if(a&&(s.length>0||!a.dataset.statusApplied)){const E=s.length>0?s:Ly;a.querySelectorAll('input[type="checkbox"]').forEach(A=>{A.checked=E.includes(A.value)}),a.dataset.statusApplied="true",Tp()}const o=t.getAll("priority");if(o.length>0){const E=document.getElementById("priority-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(A=>{A.checked=o.includes(A.value)}),Ap())}const r=t.get("assignee");r&&sy(r);const l=t.get("project"),c=te();l&&(!c.length||c.some(E=>E.id===l))&&(e(!0),bt(l),e(!1));const d=t.get("sprint");if(d){const E=document.getElementById("sprint-filter");E&&(E.value=d)}const p=t.get("issue_type");if(p){const E=document.getElementById("issue-type-filter");E&&(E.value=p)}const f=t.getAll("label");if(f.length>0){const E=document.getElementById("label-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(A=>{A.checked=f.includes(A.value)}),Wa())}const g=t.getAll("exclude_label");if(g.length>0){const E=document.getElementById("exclude-label-filter-dropdown");E&&(E.querySelectorAll('input[type="checkbox"]').forEach(A=>{A.checked=g.includes(A.value)}),Ka())}const b=t.get("groupBy");if(b){const E=document.getElementById("group-by-select");E&&(E.value=b)}const y=t.get("sort");if(y){const E=document.getElementById("sort-by-select");E&&(E.value=y)}}function Tp(){const e=rn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(!n)return;const i=ni(e);i==="all"?n.textContent="All Statuses":i==="open"||i==="closed"?n.textContent=i==="open"?"Open":"Closed":e.length===1?n.textContent=Te(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`}function Ap(){const e=Dn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ae(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Wa(){var i,s;const e=Mn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ka(){var i,s;const e=Rn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Cp(){if(!T())return;let e;try{e=await h.getLabels(T().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Bp("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Bp("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Bp(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${se(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${u(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Dp(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Mp(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const p=d[1],f=document.createElement("a");f.href=`#/issue/${p}`,f.className="issue-link",f.textContent=p,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const p=document.createElement("span");p.className="mention",p.textContent="@"+d[3],o.appendChild(p),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function ii(e){if(!e)return"";const t=ft(e),n=document.createElement("div");return n.innerHTML=t,Dp(n,Mp),n.innerHTML}function jn(e){if(!e)return"";const t=ft(e),n=document.createElement("div");return n.innerHTML=t,Dp(n,Mp),n.innerHTML}const Cy={remove:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},Rp=(e,t,n)=>`<a href="/issue/${encodeURIComponent(t)}" class="related-link" data-action="navigate-issue" data-issue-id="${m(e)}" data-identifier="${m(t)}"><span class="related-id">${u(t)}</span><span class="related-title">${u(n)}</span></a>`;function By(e){return e.relation_type==="blocked_by"||e.relation_type==="blocks"&&e.direction==="incoming"?"Blocked by":e.relation_type==="blocks"?"Blocks":e.relation_type==="duplicates"?e.direction==="incoming"?"Duplicated by":"Duplicates":"Related"}const jp={"Blocked by":0,"Sub-issue":1,Blocks:2,Duplicates:3,"Duplicated by":3,Related:4};function Dy(e,t=[],n=[],{formatEstimate:i=null}={}){const s=o=>o.estimate==null?"":` · ${u(i?i(o.estimate,o.project_id||e.project_id):`${o.estimate} pts`)}`,a=[...(t||[]).map(o=>({kind:"Sub-issue",html:`
                <li class="related-row">
                    <span class="related-status">${Ze(o.status)}</span>
                    ${Rp(o.id,o.identifier,o.title)}
                    <span class="related-kind">Sub-issue${s(o)}</span>
                </li>`})),...(n||[]).map(o=>{const r=By(o);return{kind:r,html:`
                <li class="related-row">
                    <span class="related-status">${Ze(o.related_issue_status)}</span>
                    ${Rp(o.related_issue_id,o.related_issue_identifier,o.related_issue_title)}
                    <span class="related-kind${r==="Blocked by"?" blocked":""}">${r}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${m(e.id)}" data-relation-id="${m(o.id)}" title="Remove link" aria-label="Remove link to ${m(o.related_issue_identifier)}">${Cy.remove}</button>
                </li>`}})].sort((o,r)=>jp[o.kind]-jp[r.kind]);return`
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
            ${a.length?`<ul class="related-list">${a.map(o=>o.html).join("")}</ul>`:""}
        </section>`}const My=e=>e&&e.is_agent?` title="${m(e.owner_name?`AI agent of ${e.owner_name}`:"AI agent")}"`:"";function Ry(e){return`
        <li class="comment timeline-comment">
            <div class="comment-avatar">${u((e.author_name||"U").charAt(0).toUpperCase())}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author"${My(e.author)}>${u(e.author_name||"User")}</span>
                    <span class="comment-date">${u(at(e.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${ii(e.content).trim()}</div>
            </div>
        </li>`}const Pp=(e,t,n=!1)=>`<details class="timeline-note"${n?" open":""}><summary>${e}</summary><div class="markdown-body comment-content">${ii(t).trim()}</div></details>`;function jy(e,{formatText:t,formatActor:n,gateShowsIt:i,awaitingReview:s}){let a,o="",r="";return e.activity_type==="ritual_attested"?(a=`Attested <b>${u(e.field_name||"a ritual")}</b>`,i?o=' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>':(s&&(o=" · waiting for review"),e.new_value&&(r=Pp("Note",e.new_value)))):e.activity_type==="ritual_rejected"?(a=`Sent back <b>${u(e.field_name||"a ritual")}</b>`,e.new_value&&(r=Pp("Reason",e.new_value,!0))):a=t(e),`
        <li class="timeline-event${e.activity_type==="ritual_rejected"?" sent-back":""}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${a}</span>${o}
                <span class="timeline-meta">· ${u(n(e))} · ${u(at(e.created_at))}</span>
                ${r}
            </div>
        </li>`}function Py(e,t){const n=new Set((e||[]).filter(s=>s.activity_type==="ritual_attested").map(s=>s.field_name));return[...t&&t.pending_rituals||[],...t&&t.completed_rituals||[]].filter(s=>s.attestation&&!n.has(s.name)).map(s=>({activity_type:"ritual_attested",field_name:s.name,new_value:s.attestation.note||null,user_name:s.attestation.attested_by_name||null,user:s.attestation.attester||null,created_at:s.attestation.attested_at}))}function qy({comments:e=[],activities:t=[],ritualStatus:n=null,gateRitualName:i=null,activitiesTruncated:s=!1,commentsLoadFailed:a=!1,issueId:o},r){const l=new Set((n&&n.pending_rituals||[]).filter(g=>g.attestation&&!g.attestation.approved_at).map(g=>g.name)),c=[...t||[],...Py(t,n)],d=new Map;for(const g of c){if(g.activity_type!=="ritual_attested"||!l.has(g.field_name))continue;const b=d.get(g.field_name);(!b||new Date(g.created_at)>new Date(b.created_at))&&d.set(g.field_name,g)}const p=[...(e||[]).map(g=>({at:g.created_at,html:Ry(g)})),...c.filter(g=>g.activity_type!=="commented").map(g=>{const b=d.get(g.field_name)===g;return{at:g.created_at,html:jy(g,{...r,awaitingReview:b,gateShowsIt:b&&g.field_name===i})}})].sort((g,b)=>new Date(g.at)-new Date(b.at)),f=(e||[]).length;return`
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${f?` <span class="section-count">· ${f} ${f===1?"comment":"comments"}</span>`:""}</h3>
            ${a?`
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${m(o)}">Retry</button>
                </div>`:""}
            ${s?'<div class="timeline-truncated">Older activity is not shown.</div>':""}
            ${p.length?`<ol class="timeline comments-list">${p.map(g=>g.html).join("")}</ol>`:a?"":'<div class="comments-empty">No comments yet</div>'}
        </section>`}function qp(e,t,{formatEstimate:n=null}={}){const i=[`${Ze(e.status)}<span>${u(Te(e.status))}</span>`,u(t||"Unassigned"),u(Ae(e.priority)),u(lt(e.issue_type))];return e.estimate!=null&&i.push(u(n?n(e.estimate,e.project_id):`${e.estimate} pts`)),`<div class="issue-meta-line">${i.map(s=>`<span class="issue-meta-part">${s}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`}const Np=ul,Ny=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let At=[],Op=Promise.resolve();const Oy={status:"status",priority:"priority",type:"issue_type",assignee:"assignee_id",sprint:"sprint_id"};function Ya(e){const t=document.querySelectorAll(`.issue-row[data-issue-id="${e}"]`);for(const n of t)if(!n.closest(".view.hidden"))return n;return t[0]||null}const Hy={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Hp(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function si(){return!!document.querySelector(".inline-dropdown")}function Fp(){return At}function Up(e){At=e}async function El(e,t,n,i){var p,f,g,b;e.preventDefault(),Gt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Np.map((y,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="status" data-value="${y}">
                    ${Ze(y)}
                    <span>${Te(y)}</span>
                    <span class="dropdown-shortcut">${_+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${pl.map((y,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="priority" data-value="${y}">
                    ${pt(y)}
                    <span>${Ae(y)}</span>
                    <span class="dropdown-shortcut">${_}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Ny.map(y=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="issue_type" data-value="${y}">
                    <span class="issue-type-badge type-${y}">${lt(y)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const y=Ee(),_=ee().find(I=>I.id===n)||Ve().find(I=>I.id===n)||((y==null?void 0:y.id)===n?y:null),E=fs({keepId:(_==null?void 0:_.assignee_id)||null});o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${E.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:E.map(({assignee:I,indent:A},R)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="assignee_id" data-value="${m(I.id)}">
                    ${zt(I,"avatar-small")}
                    <span>${Fa(I,A)}</span>
                    ${R<9?`<span class="dropdown-shortcut">${R+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const y=document.querySelector(`.issue-row[data-issue-id="${n}"]`),_=(y==null?void 0:y.dataset.projectId)||((p=Ee())==null?void 0:p.project_id),E=_i(_);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${E.map((I,A)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="estimate" data-value="${I.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${I.label}</span>
                    ${A<9?`<span class="dropdown-shortcut">${A}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const y=ee(),_=Ve(),E=Ee(),I=y.find(S=>S.id===n)||_.find(S=>S.id===n)||E,A=new Set(((I==null?void 0:I.labels)||[]).map(S=>S.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let x=a.bottom+4,w=a.left;w+R.width>window.innerWidth-8&&(w=a.right-R.width),x+R.height>window.innerHeight-8&&(x=a.top-R.height-4),o.style.top=`${x}px`,o.style.left=`${Math.max(8,w)}px`,rs(o,{multiSelect:!0});let D=[];const H=T();if(H)try{D=await h.getLabels(H.id)}catch(S){console.error("Failed to load labels:",S)}if(!o.parentNode)return;zp(o,n,D,A);const X=o.getBoundingClientRect();let ne=a.bottom+4,J=a.left;J+X.width>window.innerWidth-8&&(J=a.right-X.width),ne+X.height>window.innerHeight-8&&(ne=a.top-X.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,J)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const y=ee(),_=Ve(),E=Ee(),I=y.find(j=>j.id===n)||_.find(j=>j.id===n)||E,A=(I==null?void 0:I.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const R=o.getBoundingClientRect();let x=a.bottom+4,w=a.left;w+R.width>window.innerWidth-8&&(w=a.right-R.width),x+R.height>window.innerHeight-8&&(x=a.top-R.height-4),o.style.top=`${x}px`,o.style.left=`${Math.max(8,w)}px`,rs(o);let D=[];if(A)try{D=await h.getSprints(A),i_(A,D)}catch(j){console.error("Failed to load sprints:",j)}if(!o.parentNode)return;const H=D.filter(j=>j.status!=="completed"||j.id===(I==null?void 0:I.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${H.map((j,M)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${m(n)}" data-field="sprint_id" data-value="${m(j.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${u(j.name)}${j.status==="active"?" (Active)":""}</span>
                    ${M<9?`<span class="dropdown-shortcut">${M+1}</span>`:""}
                </button>
            `).join("")}
        `;const X=o.getBoundingClientRect();let ne=a.bottom+4,J=a.left;J+X.width>window.innerWidth-8&&(J=a.right-X.width),ne+X.height>window.innerHeight-8&&(ne=a.top-X.height-4),o.style.top=`${ne}px`,o.style.left=`${Math.max(8,J)}px`,o.classList.remove("dropdown-positioning");const S=j=>{const M=j.key;if(M==="Escape"||M==="Tab"){Gt(),document.removeEventListener("keydown",S),os(null);return}if(Hp(j,o))return;const ie=parseInt(M);if(isNaN(ie))return;const we=o.querySelectorAll(".dropdown-option");let $e=!1;ie===0?(ai(n,"sprint_id",null),$e=!0):ie>=1&&ie<we.length&&(we[ie].click(),$e=!0),$e&&(document.removeEventListener("keydown",S),os(null))};os(S),document.addEventListener("keydown",S),(g=o.querySelector(".dropdown-option[data-action]"))==null||g.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=y=>{const _=y.key;if(_==="Escape"||_==="Tab"){Gt(),document.removeEventListener("keydown",d);return}if(Hp(y,o))return;const E=parseInt(_);if(isNaN(E))return;let I=!1;if(t==="status"&&E>=1&&E<=6)ai(n,"status",Np[E-1]),I=!0;else if(t==="priority"&&E>=0&&E<=4)ai(n,"priority",pl[E]),I=!0;else if(t==="estimate"){const A=Ee(),R=_i(A==null?void 0:A.project_id);E>=0&&E<R.length&&(ai(n,"estimate",R[E].value),I=!0)}I&&(document.removeEventListener("keydown",d),os(null))};os(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),rs(o)}function Fy(e,t,n,i){El(e,t,n,i)}function Uy(e,t,n){Op=Op.then(()=>Gp(e,t,n))}async function Gp(e,t,n){const i=ee(),s=Ve(),a=Ee(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const d=await h.updateIssue(e,{label_ids:c}),p=d.labels||[],f=I=>({...I,labels:p,updated_at:d.updated_at??I.updated_at}),g=ee();g.some(I=>I.id===e)&&Je(g.map(I=>I.id===e?f(I):I));const b=Ve();b.some(I=>I.id===e)&&Cn(b.map(I=>I.id===e?f(I):I));const y=Ee();(y==null?void 0:y.id)===e&&Xn(f(y));const _=Ya(e);if(_&&_.parentNode){const I=ee().find(A=>A.id===e)||Ve().find(A=>A.id===e);I&&(_.outerHTML=ui(I))}const E=document.querySelector(".property-labels-btn");E&&(E.innerHTML=p.length>0?p.map(I=>`
                    <span class="issue-label" style="background: ${se(I.color)}20; color: ${se(I.color)}">${u(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(k("update labels",d),n){const p=l>=0;n.classList.toggle("selected",p),n.querySelector(".label-check").textContent=p?"✓":""}}}function zp(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${m(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${m(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${m(t)}" data-label-id="${m(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${se(s.color)}20; color: ${se(s.color)}">${u(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Vp(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=T();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);ds(o),a!=null&&a.id&&await Gp(e,a.id,null);const r=ee(),l=Ve(),c=Ee(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,p=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&zp(t,e,o,p),n.value=""}catch(a){k("create label",a)}finally{n.disabled=!1,n.focus()}}}function Qa(){const e=document.getElementById("create-issue-labels-label");e&&(At.length===0?e.textContent="Labels":e.textContent=`Labels (${At.length})`)}function xl(e,{failed:t=!1}={}){const n=ll();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=At.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${m(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${se(i.color)}20; color: ${se(i.color)}">${u(i.name)}</span>
                </button>
            `}).join("")}
    `}function Gy(e){const t=At.indexOf(e);t>=0?At.splice(t,1):At.push(e),al(),Qa();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&xl(n)}async function Wp(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);ds(a),s!=null&&s.id&&!At.includes(s.id)&&(At.push(s.id),al()),Qa(),t&&xl(t),n.value=""}catch(s){k("create label",s)}finally{n.disabled=!1,n.focus()}}}async function ai(e,t,n){var r;Gt();const i=Ky(e,t,n),s=Zy(e,t),a=(r=fl(e))==null?void 0:r[t],o=Yp(e,t,()=>n);o&&Sl(e,t,{focus:!0});try{const l={};l[t]=n;const c=await h.updateIssue(e,l);if(!c||!c.id)throw new Error("Invalid response from server");if(bs(c),Kp(e,t,i)){const d={...c,...Qy(e,t)};Xy(e,{issue:d,myIssue:d,detail:d}),Oa(d),Sl(e,t,{focus:!o})}}catch(l){if(k("update issue",l),Kp(e,t,i)){Yp(e,t,(d,p)=>d[t]===n?s[p]:d[t]);const c=fl(e);c&&c[t]===n&&Oa({...c,[t]:a}),Sl(e,t,{focus:!1})}return}finally{Yy(e,t,i)}if($("Issue updated","success"),t==="status")try{const l=Q();if(l){const d=(await h.getSprints(l)).find(p=>p.status==="active");Il(d||null)}}catch{}}const zy=new Set(["sprint_id","status","priority","assignee_id","estimate","issue_type"]),ln=new Map;function Vy(e){const t=e&&ln.get(e.id);if(!(t!=null&&t.size))return e;const n={...e};return t.forEach((i,s)=>{n[s]=i.value}),n}let Wy=0;function Ky(e,t,n){const i=++Wy;return ln.has(e)||ln.set(e,new Map),ln.get(e).set(t,{seq:i,value:n}),i}function Kp(e,t,n){var i,s;return((s=(i=ln.get(e))==null?void 0:i.get(t))==null?void 0:s.seq)===n}function Yy(e,t,n){var s;const i=ln.get(e);((s=i==null?void 0:i.get(t))==null?void 0:s.seq)===n&&(i.delete(t),i.size===0&&ln.delete(e))}function Qy(e,t){var i;const n={};return(i=ln.get(e))==null||i.forEach((s,a)=>{a!==t&&(n[a]=s.value)}),n}function Zy(e,t){var i,s;const n=Ee();return{issue:(i=ee().find(a=>a.id===e))==null?void 0:i[t],myIssue:(s=Ve().find(a=>a.id===e))==null?void 0:s[t],detail:(n==null?void 0:n.id)===e?n[t]:void 0}}function Yp(e,t,n){const i=(l,c)=>({...l,[t]:n(l,c)});let s=!1;const a=ee();a.some(l=>l.id===e)&&(s=!0,Je(a.map(l=>l.id===e?i(l,"issue"):l)));const o=Ve();o.some(l=>l.id===e)&&(s=!0,Cn(o.map(l=>l.id===e?i(l,"myIssue"):l)));const r=Ee();return(r==null?void 0:r.id)===e&&(s=!0,Xn(i(r,"detail"))),s}function Xy(e,t){var s;const n=ee();t.issue&&n.some(a=>a.id===e)&&Je(n.map(a=>a.id===e?t.issue:a));const i=Ve();t.myIssue&&i.some(a=>a.id===e)&&Cn(i.map(a=>a.id===e?t.myIssue:a)),t.detail&&((s=Ee())==null?void 0:s.id)===e&&Xn(t.detail)}function Jy(e){return e==="estimate"||Oy[Va()]===e}function ew(e,t,n,{focus:i}){var d;const s=Ya(e);if(!s||!s.parentNode||!n)return;const a=s.contains(document.activeElement);if(s.closest("#issues-list")&&!s.closest(".view.hidden")&&Jy(t)&&ee().some(p=>p.id===e))ut();else if(t==="status"&&s.closest("#my-issues-list"))Bn();else{const p=s.classList.contains("keyboard-selected");s.outerHTML=ui(n),p&&((d=Ya(e))==null||d.classList.add("keyboard-selected"))}if(!i&&!a)return;const r=Ya(e),l=Hy[t],c=l&&(r==null?void 0:r.querySelector(`[data-dropdown-type="${l}"]`));c&&c.focus({preventScroll:!0})}function Sl(e,t,{focus:n}){const i=ee().find(a=>a.id===e)||Ve().find(a=>a.id===e);i&&Oa(i),ew(e,t,i,{focus:n});const s=Ee();(s==null?void 0:s.id)===e&&zy.has(t)&&tw(t,s)}function tw(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".issue-meta-line");if(i){const c=t.assignee_id?wt(t.assignee_id):null;i.outerHTML=qp(t,c?dt(c):null,{formatEstimate:gn})}const s=n.querySelector(".detail-sidebar");if(!s)return;let a=e;e==="assignee_id"&&(a="assignee"),e==="sprint_id"&&(a="sprint"),e==="issue_type"&&(a="type");const o=s.querySelectorAll(".property-row");let r=null;for(const c of o){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===a.toLowerCase()){r=c;break}}if(!r)return;const l=r.querySelector(".property-value");if(l){if(e==="status")l.innerHTML=`
            ${Ze(t.status)}
            <span>${Te(t.status)}</span>
        `;else if(e==="priority")l.innerHTML=`
            ${pt(t.priority)}
            <span>${Ae(t.priority)}</span>
        `;else if(e==="issue_type")l.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${lt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?wt(t.assignee_id):null,d=c?dt(c):null;l.innerHTML=d?`${zt(c,"avatar-small")}<span>${u(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Pb(),d=t.sprint_id&&c?c.find(p=>p.id===t.sprint_id):null;l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?u(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(l.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${gn(t.estimate,t.project_id)}</span>
        `);l.classList.add("updated"),setTimeout(()=>l.classList.remove("updated"),500),l==null||l.focus()}}ae({"update-issue-field":(e,t)=>{e.type==="keydown"&&e.preventDefault();const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?ai(t.issueId,i,n==="null"?null:Number(n)):ai(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{e.type==="keydown"&&e.preventDefault(),Uy(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Vp(t.issueId)},"toggle-create-issue-label":(e,t)=>{Gy(t.labelId)},"create-label-for-create-issue":()=>{Wp()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Vp(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Wp())}});function Za(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Qp)},0))}function Qp(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Qp))}function nw(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",oi)):(e.classList.remove("hidden"),e.classList.remove("show-options"),We(),tt(Uu()),setTimeout(()=>{document.addEventListener("click",oi)},0))}function iw(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",oi)):(e.classList.remove("hidden"),pw(),setTimeout(()=>{document.addEventListener("click",oi)},0))}function oi(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",oi))}function ri(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",oi)}function We(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=Q();e.innerHTML=xp.map(n=>{const i=Ip(n.key),s=Uu()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${m(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function tt(e){Ib(e),We();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"status":aw(t);break;case"priority":ow(t);break;case"type":rw(t);break;case"assignee":lw(t);break;case"sprint":cw(t);break;case"labels":dw(t);break;case"exclude_labels":uw(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function sw(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),We()}function aw(e){const t=rn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=ni(t);let s=`
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
                <input type="checkbox" value="${a.value}" ${t.includes(a.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${m(a.value)}">
                <span class="filter-option-icon">${a.icon}</span>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function ow(e){const t=Dn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function rw(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${m(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function lw(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"";let i=`
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
    `;fs({keepId:n||null}).forEach(({assignee:s,indent:a})=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${m(s.id)}">
                <input type="radio" name="assignee-filter-radio" value="${m(s.id)}" ${n===s.id?"checked":""}>
                <span class="filter-option-label">${Fa(s,a)}</span>
            </label>
        `}),e.innerHTML=i}function cw(e){if(!Q()){e.innerHTML=`
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
            <label class="filter-option" data-action="set-sprint-filter" data-value="${m(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${m(o.value)}" ${i===o.value?"checked":""}>
                <span class="filter-option-label">${u(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function dw(e){const t=Mn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${se(d)};"></span>
                    <span class="filter-option-label">${u(c)}</span>
                </label>
            `}),e.innerHTML=s}function uw(e){const t=Rn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${m(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${m(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${se(d)};"></span>
                    <span class="filter-option-label">${u(c)}</span>
                </label>
            `}),e.innerHTML=s}function pw(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(l=>`
                <div class="display-option ${i===l.value?"active":""}" data-action="set-sort" data-value="${m(l.value)}">
                    <span>${l.label}</span>
                    ${i===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(l=>`
                <div class="display-option ${s===l.value?"active":""}" data-action="set-group-by" data-value="${m(l.value)}">
                    <span>${l.label}</span>
                    ${s===l.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Ke(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=rn();if(n.length>0){const d=ni(n),p=d==="open"?"Open":d==="closed"?"Closed":n.map(f=>Te(f)).join(", ");t.push({category:"status",label:"Status",value:p,clearAction:"clear-status-filter-new"})}const i=Dn();if(i.length>0){const d=i.map(p=>Ae(p)).join(", ");t.push({category:"priority",label:"Priority",value:d,clearAction:"clear-priority-filter-new"})}const s=document.getElementById("issue-type-filter");if(s!=null&&s.value){const d=s.options[s.selectedIndex];t.push({category:"type",label:"Type",value:d?d.text:s.value,clearAction:"clear-type-filter"})}const a=document.getElementById("assignee-filter");if(a!=null&&a.value){let d;a.value==="me"?d="Me":a.value==="unassigned"?d="Unassigned":d=dt(wt(a.value))||"Unknown",t.push({category:"assignee",label:"Assignee",value:d,clearAction:"clear-assignee-filter"})}const o=document.getElementById("sprint-filter");if(o!=null&&o.value){const d=o.options[o.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(d==null?void 0:d.text)||o.value,clearAction:"clear-sprint-filter"})}const r=Mn();if(r.length>0){const d=document.getElementById("label-filter-dropdown"),p=r.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:p,clearAction:"clear-label-filter-new"})}const l=Rn();if(l.length>0){const d=document.getElementById("exclude-label-filter-dropdown"),p=l.map(f=>{var y;const g=d==null?void 0:d.querySelector(`input[value="${f}"]`),b=(y=g==null?void 0:g.closest("label"))==null?void 0:y.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:p,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let c=t.map(d=>`
        <span class="filter-chip" title="${m(d.label)}: ${m(d.value)}">
            <span class="filter-chip-label">${d.label}:</span>
            <span class="filter-chip-value">${u(d.value)}</span>
            <button class="filter-chip-remove" data-action="${d.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(c+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=c}function Ye(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=_l();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Zp(){const e=document.getElementById("sprint-filter");if(!e)return;const t=Q(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Il(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${u(a.name)})</option>`),ef(t,a==null?void 0:a.id),Il(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${u(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Il(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${u(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${u(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function mw(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Xp=!1;ct(e=>{if(e!=="currentProject"||C()!=="issues"||Xp)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Zp(),Cp()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),Wa(),Ka(),ot(),Ke(),Ye()}).catch(n=>{console.error("Failed to update filters on project switch:",n),ot(),Ke(),Ye()})});function fw(){Ay(e=>{Xp=e})}function Xa(){Tp(),ot(),Ke(),Ye()}function Ja(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Xa()}function Ll(){Ap(),ot(),Ke(),Ye()}function Tl(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ll()}function Al(){Wa(),ot(),Ke(),Ye()}function eo(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Al()}function Cl(){Ka(),ot(),Ke(),Ye()}function to(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Cl()}function gw(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Jp(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${gw(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let ys=0;function ws(e){const t=document.getElementById("issues-hidden-closed-hint");if(t){if(!e){t.classList.add("hidden"),t.innerHTML="";return}t.innerHTML=`<span>${e} closed match${e===1?"":"es"} hidden by the Open filter</span> · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>`,t.classList.remove("hidden")}}function em(){var t,n,i,s,a,o;const e=new URLSearchParams(window.location.search);return JSON.stringify({team:((t=T())==null?void 0:t.id)||"",project:Q()||"",status:[...rn()].sort(),priority:[...Dn()].sort(),assignee:((n=document.getElementById("assignee-filter"))==null?void 0:n.value)||"",type:((i=document.getElementById("issue-type-filter"))==null?void 0:i.value)||"",sort:((s=document.getElementById("sort-by-select"))==null?void 0:s.value)||"",sprint:e.get("sprint")||"",label:e.getAll("label").sort(),excludeLabel:e.getAll("exclude_label").sort(),search:((o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim())||""})}let cn=null;function hw(){document.querySelectorAll("#issues-list .keyboard-selected").forEach(e=>e.classList.remove("keyboard-selected"))}function li(e){var t;(t=document.getElementById("issues-list"))==null||t.classList.toggle("is-refreshing",!!e)}function tm(e,t){li(!1),Ha(e),Je(t),C()==="issues"&&Lt(t),ut(),cn=e,ws(Fb(e).hiddenClosed||0)}function vw(e,t,{loading:n}){Ha(null),Je(t),C()==="issues"&&Lt(t),ut(),li(n),cn=e,ws(0)}function nm(){Ha(null),cn=null,li(!1),mw(),ws(0)}function bw(){const e=document.getElementById("issues-list");ws(0),e!=null&&e.querySelector(".issue-row")?li(!0):nm()}function yw(){const e=Kb(em()),t=e?tp(e):null;return t?(Ln(-1),tm(e,t),!0):(nm(),!1)}function ww(e,t,n,i=()=>!0){if(!Array.isArray(t))return t;const s=new Map(e.map(c=>[c.id,c])),a=new Set(t.map(c=>c.id)),o=new Set(t.filter(c=>!n.has(c.id)).map(c=>c.title)),r=e.filter(c=>!n.has(c.id)&&!a.has(c.id)&&!(c._isOptimistic&&o.has(c.title))&&(c._isOptimistic||i(c))),l=[];for(const c of t){const d=s.get(c.id);if(!d&&n.has(c.id))continue;const p=d&&np(d.updated_at,c.updated_at)?d:c;l.push(Vy(p))}return r.length?[...r,...l]:l}async function Ct(){var _,E,I,A,R,x,w;Ln(-1),hw();const e=++ys;if(!T())return;const t=Q()||"",n=rn(),i=Dn(),s=(_=document.getElementById("assignee-filter"))==null?void 0:_.value,a=(I=(E=document.getElementById("issue-search"))==null?void 0:E.value)==null?void 0:I.trim();if(!t&&te().length===0){cn=null,document.getElementById("issues-list").innerHTML=V({icon:U.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}const o=em(),r={limit:1e3},l=((A=document.getElementById("sort-by-select"))==null?void 0:A.value)||"created-desc",[c,d]=l.includes("-")?l.split("-"):[l,null];r.sort_by=c,d&&(r.order=d),n.length>0&&(r.status=n),i.length>0&&(r.priority=i),s&&(s==="me"?r.assignee_id=(R=me())==null?void 0:R.id:r.assignee_id=s);const p=(x=document.getElementById("sprint-filter"))==null?void 0:x.value;if(p)if(p==="current"){if(t){const D=s_(t);if(D!==void 0)D&&(r.sprint_id=D);else try{const X=(await h.getSprints(t)).find(ne=>ne.status==="active");ef(t,X==null?void 0:X.id),X&&(r.sprint_id=X.id)}catch(H){console.error("Failed to resolve current sprint:",H)}}}else r.sprint_id=p;const f=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value;f&&(r.issue_type=f),a&&a.length>=1?r.search=a:r.fields="list";let g=!1,b=!1,y=null;try{const D=Jp(Mn(),"label-filter-dropdown");D.length>0&&(r.label=D,r.label_match="any");const H=Jp(Rn(),"exclude-label-filter-dropdown");H.length>0&&(r.exclude_label=H),t&&(r.project_id=t);const X=t||`team:${T().id}`;y=Ju({...r,scope:X});const ne=tp(y);if(ne)g=!0,cn===y&&Wb()===y&&op(ee(),ne)||tm(y,ne);else{const de=ey({...r,scope:X});de&&(de.complete||de.rows.length>0)?(b=!0,vw(y,de.rows,{loading:!de.complete})):bw()}const J=de=>t?h.getIssues(de):te().length>0?h.getTeamIssues(T().id,de):Promise.resolve(void 0),S=r.search&&ni(n)==="open"?J({...r,status:kl}).then(de=>Array.isArray(de)?de.length:0).catch(de=>(console.error("Failed to count closed search matches:",de),0)):Promise.resolve(0),j=new Set(ee().map(de=>de.id)),M=await J(r);if(ip(y,M),e!==ys)return;sp(o,y);const ie=(g||b)&&cn===y,we=ie?ww(ee(),M,j,cp(r)):M,$e=ie&&op(ee(),we);Ha(y),Je(we),C()==="issues"&&Lt(Array.isArray(we)?we.filter(de=>!de._isOptimistic):we);const nn=[...new Set(we.map(de=>de.project_id).filter(Boolean))],B=Object.keys(To()).length;if(await Jm(nn),e!==ys)return;const ce=Object.keys(To()).length!==B;(!$e||ce)&&ut(),cn=y,li(!1);const K=await S;if(Gb(y,{hiddenClosed:K}),e!==ys)return;ws(K)}catch(D){if(e!==ys)return;li(!1);const H=(D==null?void 0:D.status)===403||(D==null?void 0:D.status)===404;if(g&&!H){k("refresh issues",D);return}H&&y&&zb(y),cn=null;const X=document.getElementById("issues-list");X&&(X.innerHTML=V({icon:U.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),k("load issues",D)}}function $w(){clearTimeout(Mb()),Rb(setTimeout(()=>{Ct()},300))}function ot(){Lp(),Ct()}async function im(){if(Lp(),Va()==="sprint"){const e=ee(),t=[...new Set(e.map(n=>n.project_id))];await Jm(t)}ut()}function kw(){Ke(),Ye()}function _w(e){const t=e==="open"?ps:e==="closed"?kl:[],n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Xa(),We(),tt("status")}function Ew(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Xa()),We(),tt("status")}function xw(){Ja(),We(),tt("status"),Ke(),Ye()}function Sw(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ll()),We(),tt("priority")}function Iw(){Tl(),We(),tt("priority"),Ke(),Ye()}function sm(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,ot()),We(),tt("type"),Ke(),Ye(),ri()}function Lw(){sm("")}function am(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,ot()),We(),tt("assignee"),Ke(),Ye(),ri()}function Tw(){am("")}function om(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,ot()),We(),tt("sprint"),Ke(),Ye(),ri()}function Aw(){om("")}function Cw(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Al()),We(),tt("labels")}function Bw(){eo(),We(),tt("labels"),Ke(),Ye()}function Dw(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Cl()),We(),tt("exclude_labels")}function Mw(){to(),We(),tt("exclude_labels"),Ke(),Ye()}function Rw(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,Ct()),ri()}function jw(e){const t=document.getElementById("group-by-select");t&&(t.value=e,im()),ri()}function Pw(){Ja(),Tl();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),eo(),to(),ot(),Ke(),Ye()}ae({"update-label-filter":()=>Al(),"clear-label-filter":()=>eo(),"update-exclude-label-filter":()=>Cl(),"clear-exclude-label-filter":()=>to(),"show-filter-category":(e,t)=>{var n,i;tt(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{sw();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"clear-status-filter-new":()=>xw(),"set-status-preset":(e,t)=>_w(t.value),"show-all-statuses":()=>Ja(),"toggle-status-option":(e,t)=>Ew(t.filterValue,e),"clear-priority-filter-new":()=>Iw(),"toggle-priority-option":(e,t)=>Sw(t.filterValue,e),"set-type-filter":(e,t)=>sm(t.value),"clear-type-filter":()=>Lw(),"set-assignee-filter":(e,t)=>am(t.value),"clear-assignee-filter":()=>Tw(),"set-sprint-filter":(e,t)=>om(t.value),"clear-sprint-filter":()=>Aw(),"clear-label-filter-new":()=>Bw(),"toggle-label-option":(e,t)=>Cw(t.filterValue,e),"clear-exclude-label-filter-new":()=>Mw(),"toggle-exclude-label-option":(e,t)=>Dw(t.filterValue,e),"set-sort":(e,t)=>Rw(t.value),"set-group-by":(e,t)=>jw(t.value),"clear-all-filters":()=>Pw(),"retry-load-issues":()=>Ct()});const rm=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function dn(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function ci(e){const t=dn(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}const qw=60,Nw=150;let Qe=[],$s=1/0,un=null,no=null,ks=null;const io=new Map;let di=null,so=[],_s=null;const lm=e=>{var t;return`${((t=me())==null?void 0:t.id)??""}|${e}`},Ow=24;function Hw(){const e=typeof window.scrollY=="number"?window.scrollY:0,t=window.innerHeight||0;return Math.max(qw,Math.ceil((e+2*t)/Ow))}function pn(e,t){if(e!==null&&(di!=null&&di.has(String(e))))return so.push({groupKey:e,ids:t.map(i=>i.id)}),"";const n=t.slice(0,Math.max(0,$s));return $s-=n.length,n.length<t.length&&Qe.push({groupKey:e,ids:t.slice(n.length).map(i=>i.id)}),n.map(i=>ui(i)).join("")}function cm(e,t){if(t===null)return e;const n=Array.prototype.find.call(e.querySelectorAll(".issue-group"),i=>i.dataset.group===String(t));return(n==null?void 0:n.querySelector(".issue-group-content"))||null}function dm(){clearTimeout(un),un=null,Dl++,Qe=[],no=null,_s=null,ks=null}function Bl(e=1/0){if(Qe.length===0)return;const t=document.getElementById("issues-list");if(!t||!(ks!=null&&ks.isConnected)){dm();return}const n=new Map(ee().map(s=>[s.id,s]));let i=e;for(;Qe.length>0&&i>0;){const s=Qe[0],a=s.ids.slice(0,i),o=cm(t,s.groupKey),r=a.map(l=>n.get(l)).filter(Boolean).map(l=>ui(l)).join("");o==null||o.insertAdjacentHTML("beforeend",r),i-=a.length,a.length===s.ids.length?Qe.shift():s.ids=s.ids.slice(a.length)}if(_s){const s=_s;ao(t,s.issueId)&&(_s=null,gm(t,s))}if(Qe.length===0){clearTimeout(un),un=null;const s=no;no=null,s&&!t.querySelector(".issue-row.keyboard-selected")&&um(s)}}const Fw=e=>typeof requestAnimationFrame=="function"?requestAnimationFrame(()=>{un=setTimeout(e,0)}):un=setTimeout(e,16);let Dl=0;function Uw(){if(clearTimeout(un),Qe.length===0)return;const e=++Dl;Fw(function t(){e===Dl&&(Bl(Nw),Qe.length>0&&(un=setTimeout(t,0)))})}function ut(){var d,p;const e=document.getElementById("issues-list");if(!e)return;const t=e.querySelector(".issue-row.keyboard-selected"),n=t==null?void 0:t.dataset.issueId,i=Jw(e),s=f=>{var g;return((g=f==null?void 0:f.closest(".issue-group"))==null?void 0:g.dataset.group)??null},a=[[n,s(t)],[i==null?void 0:i.issueId,s(i==null?void 0:i.row)]];e.classList.add("issue-list-linear"),dm(),$s=Hw();const o=ee();if(o.length===0){const f=(p=(d=document.getElementById("issue-search"))==null?void 0:d.value)==null?void 0:p.trim(),g=_l()>0,b=f&&f.length>=2;if(g||b){const y=_l(),_=[];b&&_.push(`search "${f}"`),g&&_.push(`${y} active filter${y>1?"s":""}`),e.innerHTML=V({icon:U.issues,heading:"No matching issues",description:`No issues match your ${_.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=V({icon:U.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Ln(-1),$s=1/0;return}const r=Va();di=io.get(lm(r))||null,so=[],r==="status"?Gw(e,o):r==="priority"?zw(e,o):r==="type"?Vw(e,o):r==="assignee"?Ww(e,o):r==="sprint"?Kw(e,o):e.innerHTML=ci(o)+pn(null,o),$s=1/0,ks=e.firstElementChild,Qe.push(...so),so=[];const l=di;di=null,l!=null&&l.size&&(e.querySelectorAll(".issue-group").forEach(f=>{l.has(f.dataset.group)&&mm(f,!0)}),a.forEach(([f,g])=>{f&&Xw(f,e,g)})),i&&(ao(e,i.issueId)?gm(e,i):Qe.length>0&&(_s=i));const c=!!n&&Array.prototype.some.call(e.querySelectorAll(".issue-row"),f=>f.dataset.issueId===n);n&&Qe.length>0&&!c?no=n:um(n),Uw()}function um(e){const t=Gu();if(t<0)return;const n=document.querySelectorAll(qa);if(n.length===0){Ln(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ln(i),n[i].classList.add("keyboard-selected")}function Gw(e,t){const n={};ul.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=ci(t);ul.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ze(s)}</span>
                    <span class="group-title">${Te(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function zw(e,t){const n={};Yu.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=ci(t);Yu.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${pt(s)}</span>
                    <span class="group-title">${Ae(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Vw(e,t){const n={};rm.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=ci(t);rm.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${lt(s)}</span></span>
                    <span class="group-title">${lt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${dn(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(s,a)}
                </div>
            </div>
        `)}),e.innerHTML=i}function Ww(e,t){const n={},i="__unassigned__";n[i]=[];const s=fs({includeIdle:!0});s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=ci(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${dn(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(i,n[i])}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=dt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${m(o.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${m(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${zt(o,"avatar-small")}</span>
                    <span class="group-title">${u(l)}${u(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${dn(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(o.id,r)}
                </div>
            </div>
        `}),e.innerHTML=a}function Kw(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=To();s.sort((l,c)=>{const d=o[l],p=o[c],f=d?a[d.status]??3:3,g=p?a[p.status]??3:3;return f-g});let r=ci(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],p=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",g=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${g}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${g}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${u(p)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${dn(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(g,c)}
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
                    <span class="group-points">${dn(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${pn(n,i[n])}
                </div>
            </div>
        `),e.innerHTML=r}function pm(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-group"),n=>n.dataset.group===String(t))||null}function ao(e,t){return Array.prototype.find.call(e.querySelectorAll(".issue-row"),n=>n.dataset.issueId===t)||null}function Yw(e,t){const n=cm(e,t);if(!n)return;const i=new Map(ee().map(s=>[s.id,s]));Qe=Qe.filter(s=>{if(String(s.groupKey)!==String(t))return!0;const a=s.ids.map(o=>i.get(o)).filter(Boolean).map(o=>ui(o)).join("");return n.insertAdjacentHTML("beforeend",a),!1})}function mm(e,t){var n;e.classList.toggle("collapsed",t),(n=e.querySelector(".issue-group-header"))==null||n.setAttribute("aria-expanded",String(!t))}function Qw(e,t){const n=Array.from(document.querySelectorAll(qa)),i=e.querySelector(".issue-row.keyboard-selected");if(!i)return;let s=n.indexOf(i);s<0&&(i.classList.remove("keyboard-selected"),s=n.findIndex(a=>t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING&&!t.contains(a)),s<0&&(s=n.length-1),s>=0&&n[s].classList.add("keyboard-selected")),Ln(s)}function fm(e,t,n){mm(t,n);const i=lm(Va());io.has(i)||io.set(i,new Set);const s=io.get(i);n?s.add(t.dataset.group):(s.delete(t.dataset.group),Yw(e,t.dataset.group)),Qw(e,t)}function Zw(e){const t=document.getElementById("issues-list"),n=t&&pm(t,e);n&&fm(t,n,!n.classList.contains("collapsed"))}function Xw(e,t=document.getElementById("issues-list"),n=void 0){var a;if(!e||!t)return;const i=Qe.find(o=>o.ids.includes(e)),s=i?i.groupKey===null?null:pm(t,i.groupKey):(a=ao(t,e))==null?void 0:a.closest(".issue-group");s!=null&&s.classList.contains("collapsed")&&(n!==void 0&&s.dataset.group===n||fm(t,s,!1))}function Jw(e){var i;const t=document.activeElement;if(!t||t===e||!e.contains(t))return null;const n=t.closest(".issue-row");return n!=null&&n.dataset.issueId?{issueId:n.dataset.issueId,row:n,dropdownType:((i=t.dataset)==null?void 0:i.dropdownType)||null,isTitle:t.classList.contains("issue-title")}:null}function gm(e,{issueId:t,dropdownType:n,isTitle:i}){if(e.contains(document.activeElement))return;const s=ao(e,t);if(!s)return;const a=n?s.querySelector(`[data-dropdown-type="${n}"]`):i?s.querySelector(".issue-title"):s.querySelector("a[href], button");a==null||a.focus({preventScroll:!0})}function hm(e,t){if(!e)return"";if(!t)return u(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return u(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${u(i)}<mark class="search-match">${u(s)}</mark>${u(a)}`}function e$(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=hm(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}const t$=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"});function ui(e){var f,g,b;const t=e.assignee_id?wt(e.assignee_id):null,n=t?dt(t):null,i=new Date(e.created_at),s=Number.isNaN(i.getTime())?"":t$.format(i),a=e.estimate!=null?gn(e.estimate,e.project_id):"",o=qo(e.estimate,e.project_id),r=e.sprint_id?To()[e.sprint_id]:null,l=r?r.name:null,c=(g=(f=document.getElementById("issue-search"))==null?void 0:f.value)==null?void 0:g.trim(),d=!!c&&((b=e.title)==null?void 0:b.toLowerCase().includes(c.toLowerCase())),p=c&&!d?e$(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${m(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${m(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${m(e.id)}" title="Priority: ${Ae(e.priority)}">
                    ${pt(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${m(e.id)}" title="Status: ${Te(e.status)}">
                    ${Ze(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${lt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.id)}">${hm(e.title,c)}${p?` <span class="issue-search-snippet" title="Matched in description">— ${p}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(y=>`
                            <span class="issue-label" style="background: ${se(y.color)}20; color: ${se(y.color)}">${u(y.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${m(e.id)}" title="Sprint: ${l?u(l):"None"}">
                    ${l?`<span class="sprint-badge">${u(l)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${m(e.id)}" title="${o?"Estimate outside current scale":`Estimate: ${a||"None"}`}">
                    ${a?`<span class="estimate-badge${o?" out-of-scale":""}">${a}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${m(e.id)}" title="${m(n||"Unassigned")}">
                    ${n?zt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function pt(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Ze(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}ae({"toggle-group":(e,t)=>{if((e==null?void 0:e.type)==="keydown"){if(e.repeat)return;e.preventDefault()}Zw(t.group)},"show-inline-dropdown":(e,t,n)=>{El(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),re(t.issueId))}});let pi=[];function mt(){return pi}function n$(e){pi=Array.isArray(e)?e:[]}function i$(e){const t=e==null?void 0:e.avatar_url,n=m((e==null?void 0:e.name)||"Agent");return t?Ou(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${m(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${u(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function s$(e){var t,n;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{const i=await h.getTeamAgents(e);if(((n=T())==null?void 0:n.id)!==e)return;pi=i,ms(jt,mt),Jn()}catch(i){console.error("Failed to load team agents:",i),k("load team agents",i)}}async function Es(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{pi=await h.getTeamAgents(e),ms(jt,mt),Jn(),a$()}catch(n){k("load agents",n)}}function a$(){var a;const e=document.getElementById("agents-list");if(!e)return;const t=(a=me())==null?void 0:a.id,n=pi.filter(o=>o.parent_user_id===t&&o.kind!=="session");if(n.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No agents yet",description:"Create an agent to give CLI automation its own identity"});return}const i=te(),s=o=>{if(!o)return"Team-wide";const r=i.find(l=>l.id===o);return r?`Project ${r.key}`:"One project"};e.innerHTML=n.map(o=>{const r=m(o.id),l=pi.filter(d=>d.registered_by_id===o.id).length,c=[s(o.agent_project_id),o.can_register?`Registrar · ${l} session${l===1?"":"s"}`:null,`Created ${Ie(o.created_at)}`].filter(Boolean).join(" · ");return`
      <a class="list-row-2line agent-link-row" href="/people/${r}" data-action="view-person" data-user-id="${r}">
        <div class="agent-link-avatar" aria-hidden="true">${i$(o)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${u(o.name)}${o.is_active===!1?' <span class="badge badge-neutral">Deactivated</span>':""}</div>
          <div class="list-row-sub">${u(c)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`}).join("")}function o$(){const e=te();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),G()}function vm(e,t,n=!1){const i=u(t),s=n?`<p>Then give each Claude Code session its own identity:</p>
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
  `,G()}async function r$(e){var r,l,c,d;e.preventDefault();const t=(r=T())==null?void 0:r.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((l=document.getElementById("agent-avatar"))==null?void 0:l.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value,o=!!((d=document.getElementById("agent-registrar"))!=null&&d.checked);try{let p;s&&a?p=await h.createProjectAgent(a,n,i,o):p=await h.createTeamAgent(t,n,i,o),F(),vm("Agent Created",p.api_key,!!p.can_register),await Es(),oo(p.id,{created:!0})}catch(p){k("create agent",p)}return!1}async function l$(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);vm("New Agent Key",n.key),oo(e,{credentials:!0})}catch(n){k("generate agent key",n)}}async function c$(e,t,n){const i=n?`Make "${t}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`:`Stop "${t}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;if(confirm(i))try{await h.updateAgent(e,{can_register:n}),$(n?"Agent is now a registrar":"Agent is no longer a registrar","success"),await Es(),oo(e)}catch(s){k("change registrar",s)}}function oo(e,{deleted:t=!1,created:n=!1,credentials:i=!1}={}){window.dispatchEvent(new CustomEvent("chaotic:agent-changed",{detail:{agentId:e,deleted:t,created:n,credentials:i}}))}function d$(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{$("Agent API key copied to clipboard","success")}).catch(()=>{$("Failed to copy","error")})}async function u$(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),$("Agent deleted","success"),await Es(),oo(e,{deleted:!0})}catch(n){k("delete agent",n)}}ae({"create-agent":e=>{r$(e)},"copy-agent-key":()=>{d$()},"dismiss-agent-modal":()=>{F(),Es()},"delete-agent":(e,t)=>{e!=null&&e.type&&e.type!=="click"||u$(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{e!=null&&e.type&&e.type!=="click"||l$(t.agentId,t.agentName)},"toggle-agent-registrar":(e,t)=>{e!=null&&e.type&&e.type!=="click"||c$(t.agentId,t.agentName,t.canRegister!=="true")}});function p$(e){if(e.mention_handle)return e.mention_handle;const t=e.user_name||e.name,n=e.user_email||e.email;return t?t.split(" ")[0].toLowerCase():n?n.split("@")[0].toLowerCase():"user"}function m$(e=[],t=[],{projectId:n}={}){const i=new Set,s=[];for(const a of e){const o=a.user_id||a.id;i.has(o)||(i.add(o),s.push({id:o,name:a.user_name||a.name||a.user_email||a.email||"User",email:a.user_email||a.email||"",handle:p$(a),isAgent:!1}))}for(const a of t)!a.mention_handle||a.is_active===!1||a.idle||i.has(a.id)||n!==void 0&&a.agent_project_id&&a.agent_project_id!==n||(i.add(a.id),s.push({id:a.id,name:a.name||"Agent",email:"",handle:a.mention_handle,isAgent:!0}));return s}function bm(e,t={},n=6){const i=(e||"").toLowerCase();return m$(jt(),mt(),t).filter(s=>!i||s.handle.includes(i)||s.name.toLowerCase().includes(i)||s.email.toLowerCase().includes(i)).slice(0,n)}function f$(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Ml(e="new-comment",t="mention-suggestions",n={}){const i=document.getElementById(e),s=document.getElementById(t);if(!i||!s||(i.mentionContext=n,i.dataset.mentionsBound==="true"))return;i.dataset.mentionsBound="true";let a=-1;const o=()=>{s.classList.add("hidden"),s.innerHTML="",a=-1},r=d=>{var f,g;const p=s.querySelectorAll(".mention-suggestion");p.length!==0&&(a=(d%p.length+p.length)%p.length,p.forEach((b,y)=>b.classList.toggle("highlighted",y===a)),(g=(f=p[a]).scrollIntoView)==null||g.call(f,{block:"nearest"}))},l=d=>{const p=i.selectionStart||0,f=i.value.slice(0,p).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),g=i.value.slice(p);i.value=f+g,i.focus(),o()},c=()=>{if(i.hidden){o();return}const d=i.selectionStart||0;if(f$(i.value,d)){o();return}const f=i.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!f){o();return}const g=f[2].toLowerCase(),b=bm(g,i.mentionContext||{});if(!b.length){o();return}s.innerHTML=b.map(y=>`
            <button type="button" class="mention-suggestion" data-handle="${m(y.handle)}">
                <span class="mention-name">${u(y.name)}${y.isAgent?' <span class="mention-kind">agent</span>':""}</span>
                <span class="mention-handle">@${u(y.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((y,_)=>{y.addEventListener("click",()=>l(y.dataset.handle)),y.addEventListener("mouseenter",()=>r(_))}),r(0)};i.addEventListener("input",c),i.addEventListener("click",c),i.addEventListener("keydown",d=>{const p=!s.classList.contains("hidden");if(d.key==="Escape"&&p){d.preventDefault(),d.stopPropagation(),o();return}if(p){if(d.key==="ArrowDown")d.preventDefault(),r(a+1);else if(d.key==="ArrowUp")d.preventDefault(),r(a-1);else if(d.key==="Enter"||d.key==="Tab"){const g=s.querySelectorAll(".mention-suggestion")[a];g&&(d.preventDefault(),l(g.dataset.handle))}}}),i.addEventListener("blur",()=>{setTimeout(o,150)})}const mi={check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',ring:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',link:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'};function fi(e){return!!(e&&e.attestation&&!e.attestation.approved_at)}function xs(e){return!!(e&&e.approval_mode==="gate"&&!e.attestation)}function Rl(e){const t=e&&e.last_rejection;return t&&!t.superseded_at?t:null}function ro(e){return xs(e)&&!!Rl(e)}function lo(e,{canAct:t=!1}={}){const n=e&&e.pending_rituals||[],i=e&&e.completed_rituals||[],s=[],a=[];for(const o of n)((fi(o)||xs(o)&&!ro(o))&&t?s:a).push(o);return{needsYou:s,waiting:a,done:i,total:n.length+i.length}}function jl(e,t,n){return e===1?t:n}function Ss(e){return fi(e)?"Review":ro(e)?"Ask again for":xs(e)?"Sign off on":Rl(e)?"Re-attest":"Attest"}function Pl(e,t){return fi(e)?"an admin":xs(e)&&!ro(e)?"a person":t||"the assignee"}function g$(e){return e&&e.trigger==="ticket_claim"?"needed to start":"needed to close"}function ym(e,t){return`<div class="ticket-gate-kicker">Waiting on ${u(e)}<span class="ticket-gate-when"> · ${g$(t)}</span></div>`}function h$(e){const t=e&&e.artifact_ref;if(!t||typeof t!="string")return"";if(/^https?:\/\//i.test(t))return`<a class="ticket-gate-artifact" href="${m(t)}" target="_blank" rel="noopener noreferrer">${mi.link}${u(t.replace(/^https?:\/\//i,""))}</a>`;const n=`/document/${encodeURIComponent(t)}`;return`<a class="ticket-gate-artifact" href="${m(n)}" data-action="open-gate-document" data-document-id="${m(t)}">${mi.link}Linked document</a>`}function wm(e){const t=e.attestation;return t?`
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${u(t.attested_by_name||"Someone")} attested ${u(at(t.attested_at))}</div>
            ${t.note?`<div class="ticket-gate-note markdown-body">${ft(t.note)}</div>`:""}
            ${h$(t)}
        </div>`:""}function $m(e){const t=u(e.rejected_by_name||"Someone"),n=e.rejected_at?` ${u(at(e.rejected_at))}`:"";return`${t} sent it back${n}: “${u(e.note||"")}”`}function km(e){const t=e&&e.last_rejection;return!t||!t.superseded_at||!fi(e)?"":`<div class="ticket-gate-earlier">Sent back before: ${$m(t)}</div>`}const gi=(e,t)=>`data-ritual-id="${m(e.id)}" data-issue-id="${m(t)}" data-ritual-name="${m(e.name)}"`;function v$(e,t){const n=`<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${gi(e,t)}>Send back…</button>`;return fi(e)?`
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${gi(e,t)}>Approve</button>
            ${n}`:`
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${gi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off</button>
        ${n}`}function b$(e,t,n){return ro(e)?n?`<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${gi(e,t)} data-ritual-artifact="${m(e.artifact||"")}">Sign off anyway</button>`:"":fi(e)||xs(e)?"":e.note_required||e.artifact?`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${gi(e,t)} data-ritual-prompt="${m(e.prompt||"")}" data-ritual-artifact="${m(e.artifact||"")}" data-ritual-note-required="${e.note_required?"1":""}">Attest it yourself…</button>`:`<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${gi(e,t)}>Attest it yourself</button>`}function _m(e,t){if(e.length===0)return"";const[n,...i]=e,s=i.length?`, and ${i.length} more`:"";return`<div class="ticket-gate-then">${t}: ${u(Ss(n).toLowerCase())} <b>${u(n.name)}</b>${s}.</div>`}function ql(e,t){const{needsYou:n,waiting:i,done:s,total:a}=e,o=(l,c,d,p)=>`<li class="${c}"><span class="ticket-gate-li-ic">${l}</span><span class="ticket-gate-li-name">${u(d)}</span><span class="ticket-gate-li-who">${u(p)}</span></li>`,r=[...s.map(l=>{var c;return o(mi.check,"done",l.name,(c=l.attestation)!=null&&c.attested_by_name?`by ${l.attestation.attested_by_name}`:"done")}),...n.map(l=>o(mi.ring,"you",l.name,"waiting on you")),...i.map(l=>o(mi.ring,"",l.name,`waiting on ${Pl(l,t)}`))];return`
        <details class="ticket-gate-list">
            <summary>${s.length} of ${a} ${jl(a,"ritual","rituals")} done</summary>
            <ul>${r.join("")}</ul>
        </details>`}function y$(e,{canAct:t=!1}={}){const{needsYou:n,waiting:i}=lo(e,{canAct:t});return n[0]||i[0]||null}function w$(e,{canAct:t=!1,assigneeName:n=null}={}){const{needsYou:i,waiting:s,total:a}=lo(e,{canAct:t});if(a===0)return"";const o=i[0]||s[0];return o?`Waiting on ${i.length?"you":Pl(o,n)}: ${Ss(o).toLowerCase()} ${o.name}.`:`All ${a} ${jl(a,"ritual","rituals")} done.`}function $$(e,t,{canAct:n=!1,assigneeName:i=null}={}){const s=lo(e,{canAct:n}),{needsYou:a,waiting:o,total:r}=s;if(r===0)return"";if(a.length===0&&o.length===0)return`
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${mi.check}</span>
                ${ql(s,i).replace(/<summary>[^<]*<\/summary>/,`<summary>All ${r} ${jl(r,"ritual","rituals")} done</summary>`)}
            </section>`;if(a.length>0){const p=a[0];return`
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(p.id)}">
                ${ym("you",p)}
                <h2 class="ticket-gate-step">${u(Ss(p))} <b>${u(p.name)}</b></h2>
                ${p.prompt?`<div class="ticket-gate-asks markdown-body">${ft(p.prompt)}</div>`:""}
                ${wm(p)}
                ${km(p)}
                <div class="ticket-gate-actions">${v$(p,t)}</div>
                ${_m([...a.slice(1),...o],"Then")}
                ${ql(s,i)}
            </section>`}const l=o[0],c=l.attestation?null:Rl(l),d=b$(l,t,n);return`
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${m(l.id)}">
            ${ym(Pl(l,i),l)}
            <h2 class="ticket-gate-step">${u(Ss(l))} <b>${u(l.name)}</b></h2>
            ${c?`<div class="ticket-gate-asks">${$m(c)}</div>`:l.prompt?`<div class="ticket-gate-asks markdown-body">${ft(l.prompt)}</div>`:""}
            ${wm(l)}
            ${km(l)}
            ${d?`<div class="ticket-gate-actions">${d}</div>`:""}
            ${_m(o.slice(1),"After that")}
            ${ql(s,i)}
        </section>`}function k$(e,{canAct:t=!1}={}){const{needsYou:n}=lo(e,{canAct:t});if(n.length===0)return"";const i=n[0],s=n.length>1?`<span class="ticket-gate-sticky-more"> and ${n.length-1} more</span>`:"";return`
        <span class="ticket-gate-sticky-text">Waiting on you: ${u(Ss(i).toLowerCase())} <b>${u(i.name)}</b>${s}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`}const co=new Map;function Nl(){var e;return`${((e=T())==null?void 0:e.id)??""}|${Q()??""}`}function hi(e,t,n){co.set(e,{key:t,value:n})}function uo(e,t){const n=co.get(e);return n&&n.key===t?n.value:void 0}function Is(e,...t){for(const n of t)n!==e&&co.delete(n)}function Ol(){co.clear()}function po(e,t){if(e===t)return!0;try{return JSON.stringify(e)===JSON.stringify(t)}catch{return!1}}ct((e,t,n)=>{e==="currentTeam"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Ol(),e==="currentUser"&&((t==null?void 0:t.id)??null)!==((n==null?void 0:n.id)??null)&&Ol()});let Ce=null,Em=!1,Pn=!1,xm="new-comment";function _$(){return Ce||(Ce=document.createElement("div"),Ce.className="quote-tooltip",Ce.setAttribute("role","button"),Ce.setAttribute("tabindex","0"),Ce.setAttribute("aria-label","Quote selection in comment"),Ce.textContent="Quote",Ce.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),mo())}),Ce.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),Ce.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),mo()}),document.body.appendChild(Ce),Ce)}function Sm(e,t){const n=_$();n.style.display="flex",Pn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!Pn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Ls(){Ce&&(Ce.style.display="none"),Pn=!1}function E$(){return Pn}function Im(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Hl(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Im(t.startContainer),i=Im(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function x$(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function mo(e=xm){const t=Hl();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=x$(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Ls(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function S$(){var i;if(!Hl())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Sm(n.left+n.width/2,n.top),!0}function I$(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Hl()){Ls();return}Sm(t,n)},10)}function Lm({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(xm=t,i.addEventListener("mouseup",I$,n?{signal:n}:void 0),Em||(Em=!0,document.addEventListener("mousedown",s=>{Pn&&Ce&&!Ce.contains(s.target)&&Ls()}),document.addEventListener("selectionchange",()=>{Pn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&Ls()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&Pn&&(s.stopImmediatePropagation(),Ls())}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&S$()})))}function Tm(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let mn=[],Ts=[],fo=null,ue=new Set,vi="list",qn=!1,Fl=null,go=null,Ul=null,Gl=null,Am=null;function Cm(e){if(Am!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const zl=lb();(zl==="list"||zl==="grid")&&(vi=zl);function Bm(e){if(e!=="list"&&e!=="grid")return;vi=e,e==="grid"&&qn&&Vl(),cb(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Kt()}function Dm(){if(vi!=="list")return;qn=!0,ue.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Kt(),yi()}function Vl(){qn=!1,ue.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Kt(),yi()}function L$(){Fl&&clearTimeout(Fl),Fl=setTimeout(()=>{Kt()},300)}function Mm(){const e=document.getElementById("doc-search");e&&(e.value=""),Kt()}async function T$(){Mm()}function A$(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=[];if(t&&n.push(`<span class="filter-chip">Search: "${u(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n.length>0){let s=n.join(" ");n.length>1&&(s+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=s,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function C$(){return mn}function Kt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";A$(),Ts=mn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),Ts.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),P$("",vi)}let bi=0;async function B$(){var i;const e=fo||((i=T())==null?void 0:i.id);if(!e)return;const t=++bi,n=Q()||null;try{const s=await h.getDocuments(e,n);if(t!==bi)return;hi("documents",`${e}|${n??""}`,s),mn=s,Kt()}catch(s){if(t!==bi)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=V({icon:U.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",s)}}ct(e=>{e==="currentProject"&&C()==="documents"&&B$()});async function Nn(e,t=null,{fromMemory:n=!1}={}){var r;if(e||(e=(r=T())==null?void 0:r.id),!e)return;fo=e,zu(-1);const i=++bi;t===null&&(t=Q()||null);const s=`${e}|${t??""}`,a=n?uo("documents",s):void 0,o=document.getElementById("documents-list");a?(mn=a,Kt()):o&&(o.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join(""));try{const l=await h.getDocuments(e,t);if(i!==bi)return;hi("documents",s,l);const c=a&&po(mn,l);mn=l;const d=document.getElementById("doc-view-list"),p=document.getElementById("doc-view-grid");d&&p&&(d.classList.toggle("active",vi==="list"),p.classList.toggle("active",vi==="grid")),c||Kt()}catch(l){if(i!==bi)return;const c=document.getElementById("documents-list");c&&(c.innerHTML=V({icon:U.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),k("load documents",l)}}function Rm(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=fo||((n=T())==null?void 0:n.id);e&&Nn(e).catch(i=>console.error("Failed to refresh documents list:",i))}function jm(e){Cm(e)&&Be(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function D$(e,t){Cm(e)&&($(`Document "${t||"Untitled"}" was deleted`,"warning"),O("documents"))}function M$(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${se(t.color)}20; color: ${se(t.color)}">${u(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function R$(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${M$(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${m(e.id)}" data-action="view-document" data-document-id="${m(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${u(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${u(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?u(Tm(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${u(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function j$(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${se(r.color)}20; color: ${se(r.color)}">${u(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Tm(e.content).substring(0,80):"No content",s=qn?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${m(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ue.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${qn&&ue.has(e.id)?" selected":""}" data-action="${qn?"toggle-doc-selection":"view-document"}" data-document-id="${m(e.id)}" data-doc-id="${m(e.id)}">
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
  `}function P$(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;ue.clear(),yi();const i=Ts;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,p=Q(),f=d||p;n.innerHTML=V({icon:f?U.search:U.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?R$:j$,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=te();i.forEach(d=>{let p,f;if(e==="project")if(p=d.project_id||"__global__",p==="__global__")f="Global (Team-wide)";else{const g=r.find(b=>b.id===d.project_id);f=g?g.name:"Unknown Project"}else e==="sprint"&&(p=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[p]||(o[p]={label:f,docs:[]}),o[p].docs.push(d)});let l="";for(const[d,p]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${u(p.label)}</span>
          <span class="doc-group-count">${p.docs.length}</span>
        </div>
        <div class="${f}">
          ${p.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function q$(e){ue.has(e)?ue.delete(e):ue.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ue.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ue.has(e)),yi()}function N$(){Ts.forEach(e=>ue.add(e.id)),Ts.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),yi()}function Pm(){ue.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ue.clear(),yi()}function yi(){const e=document.getElementById("doc-bulk-actions");e&&(qn?(e.classList.remove("hidden"),ue.size>0?e.innerHTML=`
        <span class="bulk-count">${ue.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function O$(){if(ue.size===0){$("No documents selected","error");return}const t=te().map(n=>`<option value="${n.id}">${u(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ue.size} Document${ue.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ue.size} selected document${ue.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,G()}async function H$(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ue);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=mn.find(d=>d.id===l))==null?void 0:o.title)||l)}F(),Pm(),s.length===0?$(`Moved ${i} document${i>1?"s":""}!`,"success"):$(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=T())==null?void 0:r.id;return await Nn(a),!1}async function F$(){var a,o;if(ue.size===0){$("No documents selected","error");return}const e=ue.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ue);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=mn.find(c=>c.id===r))==null?void 0:a.title)||r)}Vl(),i.length===0?$(`Deleted ${n} document${n>1?"s":""}!`,"success"):$(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=T())==null?void 0:o.id;await Nn(s)}async function U$(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${m(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${u(s.author_name||"Unknown")}</span>
                ${Ma(s.author)}
                <span class="comment-date">${at(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${ii(s.content)}</div>
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
    `}}function G$(e,t,n=null){const i=document.getElementById("new-doc-comment");if(!i)return;const s=Au(e);s&&(i.value=s),i.addEventListener("input",()=>{Ca(e,i.value)},{signal:t}),i.addEventListener("keydown",a=>{var o;a.key==="Enter"&&(a.metaKey||a.ctrlKey)&&(a.preventDefault(),(o=i.closest("form"))==null||o.requestSubmit())},{signal:t}),Ml("new-doc-comment","doc-mention-suggestions",{projectId:n})}async function Be(e,t=!0){try{t&&hn();const n=await h.getDocument(e);Am=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await U$(n);let a=null,o=null,r=!1;if(n.project_id){const D=te().find(H=>H.id===n.project_id);if(a=D?D.name:null,n.sprint_id)try{const H=await h.getSprint(n.sprint_id);o=H?H.name:null}catch(H){console.error("Failed to load sprint name:",H),r=!0}}let l=n.content||"";const c=Y.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=C$(),p=d.findIndex(w=>w.id===n.id),f=p>0?d[p-1]:null,g=p>=0&&p<d.length-1?d[p+1]:null,b=p>=0,y=C()||"documents",_=n.labels&&n.labels.length>0?n.labels.map(w=>`
          <span class="issue-label" style="background: ${se(w.color)}20; color: ${se(w.color)}">
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
            <span class="issue-detail-breadcrumb">${a?u(a)+" ›":""} ${u(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?u(n.icon)+" ":""}${u(n.title)}</h1>

          <div class="document-content markdown-body">${l?jn(l):'<p class="text-muted">No content</p>'}</div>

          ${s}
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-section">
            <h4>Properties</h4>

            <div class="property-row">
              <span class="property-label">Project</span>
              <span class="property-value-static">${a?u(a):'<span class="text-muted">Global</span>'}</span>
            </div>

            ${o||r?`
            <div class="property-row">
              <span class="property-label">Sprint</span>
              <span class="property-value-static">${r?`<span class="sidebar-load-error">Couldn't load</span>`:u(o)}</span>
            </div>
            `:""}

            <div class="property-row">
              <span class="property-label">Labels</span>
              <div class="property-value-static property-labels-btn">
                ${_}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${m(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${u(n.author_name||"Unknown")} ${Ma(n.author)}</span>
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
    `,go&&go.abort(),go=new AbortController;const{signal:I}=go,A=i.querySelector(".sidebar-overflow-trigger"),R=i.querySelector(".overflow-menu-dropdown");if(A&&R){const w=()=>{R.classList.add("hidden"),A.setAttribute("aria-expanded","false")},D=()=>{const H=R.classList.toggle("hidden");A.setAttribute("aria-expanded",String(!H))};A.addEventListener("click",D,{signal:I}),document.addEventListener("click",H=>{!A.contains(H.target)&&!R.contains(H.target)&&w()},{signal:I}),R.addEventListener("keydown",H=>{H.key==="Escape"&&(w(),A.focus())},{signal:I})}G$(n.id,I,n.project_id||null),Lm({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:I}),Ul=f?f.id:null,Gl=g?g.id:null;const x=w=>{if((w.metaKey||w.ctrlKey)&&w.shiftKey&&(w.key===">"||w.key==="."||w.code==="Period")&&mo("new-doc-comment")){w.preventDefault();return}w.metaKey||w.ctrlKey||w.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||w.target.tagName==="INPUT"||w.target.tagName==="TEXTAREA"||w.target.tagName==="SELECT"||w.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(w.key==="ArrowLeft"&&Ul?(w.preventDefault(),Be(Ul)):w.key==="ArrowRight"&&Gl&&(w.preventDefault(),Be(Gl)))};document.addEventListener("keydown",x,{signal:I})}catch(n){k("load document",n)}}async function ho(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${u(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function Wl(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${u(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function z$(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?jn(r):'<span class="text-muted">Nothing to preview.</span>'}}function Kl(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Mu(e);if(o){const l=ab(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Ba(e,null);return}Ba(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function qm(){As=null;const e=te(),t=hf()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${u(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Wl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),Kl("new"),t&&await ho("doc-sprint",t,null,!0)}let As=null;async function V$(e,t,n){As=n||null;const s=te().map(a=>`<option value="${m(a.id)}" ${a.id===t?"selected":""}>${u(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${Wl("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,G(),Kl("new"),t&&await ho("doc-sprint",t,e)}async function W$(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return $("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Ba("new",null),await Nn(t),F(),$("Document created!","success"),As){const o=As;As=null,o()}}catch(o){k("create document",o)}return!1}let Yl=null,Cs=null,Ql=!1;async function Nm(e){try{const t=await h.getDocument(e);Yl=e,Cs={title:t.title||"",content:t.content||""},Ql=!1;const i=te().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${u(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${Wl("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${m(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,G(),Kl(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await ho("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){k("load document",t)}}async function K$(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Yl===t&&Cs&&!Ql){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==Cs.title||(o.content||"")!==Cs.content))return Ql=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),Yl=null,Cs=null;const o=Mu(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Ba(t,null),F(),await Be(t),$("Document updated!","success")}catch(o){k("update document",o)}return!1}async function Y$(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await Nn(n),O("documents"),$("Document deleted!","success")}catch(n){k("delete document",n)}}function Q$(e,t){ho(e,t)}async function Z$(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${m(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,G()}async function X$(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${m(t)}" data-issue-id="${m(o.id)}">
        <span class="link-result-id">${u(o.identifier)}</span>
        <span class="link-result-title">${u(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function J$(e,t){try{await h.linkDocumentToIssue(e,t),F(),$("Issue linked!","success"),await Be(e,!1)}catch(n){k("link issue",n)}}async function ek(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),$("Issue unlinked!","success"),await Be(e,!1)}catch(n){k("unlink issue",n)}}let Zl=!1;async function tk(e,t){if(e.preventDefault(),Zl)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return $("Please enter a comment","error"),!1;Zl=!0;try{const s=await h.createDocumentComment(t,i);n.value="",$("Comment added!","success"),Da(s),await Be(t,!1)}catch(s){k("add comment",s)}finally{Zl=!1}return!1}async function nk(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){$("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,G();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${m(e)}" data-label-id="${m(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${se(a.color)}; color: white;">${u(a.name)}</span>
        ${a.description?`<span class="text-muted">${u(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,G()}catch(i){k("load labels",i)}}async function ik(e,t){try{await h.addLabelToDocument(e,t),F(),$("Label added!","success"),await Be(e,!1)}catch(n){k("add label",n)}}async function sk(e,t){try{await h.removeLabelFromDocument(e,t),$("Label removed!","success"),await Be(e,!1)}catch(n){k("remove label",n)}}ae({"view-document":(e,t)=>{e.preventDefault(),Be(t.documentId)},"set-doc-editor-mode":(e,t)=>{z$(t.target,t.mode)},"retry-load-documents":()=>{Nn(fo)},"retry-document-comments":(e,t)=>{Be(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{q$(t.docId)},"clear-doc-search":()=>{Mm()},"clear-all-doc-filters":()=>{T$()},"show-bulk-move-modal":()=>{O$()},"bulk-delete-documents":()=>{F$()},"select-all-docs":()=>{N$()},"clear-doc-selection":()=>{Pm()},"exit-selection-mode":()=>{Vl()},"enter-selection-mode":()=>{Dm()},"handle-bulk-move":e=>{H$(e)},"unlink-document-issue":(e,t)=>{ek(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Z$(t.documentId)},"add-document-comment":(e,t)=>{tk(e,t.documentId)},"remove-label-from-doc":(e,t)=>{sk(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{nk(t.documentId)},"show-edit-document-modal":(e,t)=>{Nm(t.documentId)},"delete-document":(e,t)=>{Y$(t.documentId)},"create-document":e=>{W$(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Q$(t.sprintSelect,n.value)},"update-document":(e,t)=>{K$(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{X$(n.value,t.documentId)},"link-to-issue":(e,t)=>{J$(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{ik(t.documentId,t.labelId)}});async function Om(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=_i(t.project_id).map(o=>`
            <option value="${o.value===null?"":o.value}" ${t.estimate===o.value?"selected":""}>${u(o.label)}</option>
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
                        ${n.filter(o=>o.status!=="completed").map(o=>`
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${u(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,G();const a=document.getElementById("edit-issue-description");if(a){const o=ss(e);if(o){const r=Bu(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?Sn(e,r,t.description||""):Sn(e,null)})}}catch(t){k("load issue",t)}}async function ak(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};(!s.dataset.original||s.value!==s.dataset.original)&&(c.status=s.value);const d=await h.updateIssue(t,c);ss(t)===c.description&&Sn(t,null),F(),await re(t),$("Issue updated!","success"),bs(d)}catch(n){k("update issue",n)}}async function ok(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await Ct(),await gt(),O("issues"),$("Issue deleted!","success")}catch(t){k("delete issue",t)}}ae({"update-issue":(e,t)=>{ak(e,t.issueId)}});const rk=1,lk={bold:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/></svg>',italic:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="5" x2="10" y2="5"/><line x1="14" y1="19" x2="5" y2="19"/><line x1="15" y1="5" x2="9" y2="19"/></svg>',code:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',link:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',bulletList:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',blockquote:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="5" x2="5" y2="19"/><line x1="10" y1="8" x2="19" y2="8"/><line x1="10" y1="12" x2="19" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/></svg>'},ck=[["bold","Bold"],["italic","Italic"],["code","Code"],["link","Link"],["bulletList","Bulleted list"],["blockquote","Quote"]],dk="This comment uses markdown the editor would change, so it stays as markdown.";let wi=null;function uk(){const e=document.querySelector('meta[name="chaotic-version"]'),t=e?e.getAttribute("data-editor"):"";return`/static/js/editor.bundle.js${!!t&&/^[0-9a-f]{8}$/.test(t)?`?v=${t}`:""}`}function vo(e){return e&&e.API_VERSION===rk?e:null}function pk(){const e=vo(window.ChaoticEditor);return e?Promise.resolve(e):wi||(wi=new Promise((t,n)=>{const i=document.createElement("script");i.src=uk(),i.async=!0,i.onload=()=>{const s=vo(window.ChaoticEditor);s?t(s):n(new Error("editor bundle is a different version"))},i.onerror=()=>{i.remove(),n(new Error("editor bundle failed to load"))},document.head.appendChild(i)}).then(t=>(wi=null,t),t=>{throw wi=null,t}),wi)}const $i=new Map;function mk(e,{signal:t,mentionContext:n={},placeholder:i="",restore:s=null}={}){const a=document.getElementById(e);if(!a||a.dataset.richComposer==="true")return null;a.dataset.richComposer="true";const o=a.closest("form"),r={textarea:a,form:o,editor:null,api:null,wrapper:null,toolbar:null,note:null,mode:"markdown",syncing:!1,composing:!1,pendingApi:null,destroyed:!1,mentionContext:n,placeholder:i||a.getAttribute("placeholder")||"",start:null};return $i.set(e,r),fk(r,t),a.addEventListener("compositionstart",()=>{r.composing=!0},{signal:t}),a.addEventListener("compositionend",()=>{if(r.composing=!1,r.pendingApi){const l=r.pendingApi;r.pendingApi=null,Xl(r,l,{focus:document.activeElement===a})}},{signal:t}),r.start=({focus:l=!1,restoreTo:c=null}={})=>{if(r.editor||r.destroyed||pb()==="markdown")return;const d=vo(window.ChaoticEditor);if(d){Xl(r,d,{focus:l,restore:c});return}pk().then(p=>{if(!(r.destroyed||r.editor||!p)){if(r.composing){r.pendingApi=p;return}Xl(r,p,{focus:l||document.activeElement===a})}}).catch(()=>{})},a.addEventListener("focus",()=>r.start(),{signal:t}),ec(r,"markdown",{}),vo(window.ChaoticEditor)&&r.start({restoreTo:s}),o==null||o.addEventListener("focusin",()=>o.classList.add("composer-active"),{signal:t}),o==null||o.addEventListener("focusout",l=>{!o.contains(l.relatedTarget)&&!a.value&&o.classList.remove("composer-active")},{signal:t}),s&&(o==null||o.classList.add("composer-active")),a.addEventListener("input",()=>{var l,c;if(!(r.syncing||r.mode!=="rich"||!r.editor)){if(!r.api.roundTripsCleanly(r.editor,a.value,ii)){Jl(r,{focus:!0,refused:!0});return}r.editor.commands.setContent(a.value,{contentType:"markdown",emitUpdate:!1}),r.editor.commands.focus("end"),(c=(l=r.wrapper).scrollIntoView)==null||c.call(l,{behavior:"smooth",block:"nearest"})}},{signal:t}),t==null||t.addEventListener("abort",()=>vk(e,r)),r}function fk(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="toolbar rich-composer-toolbar",s.setAttribute("role","toolbar"),s.setAttribute("aria-label","Formatting"),s.innerHTML=`${ck.map(([o,r])=>`<button type="button" class="icon-btn" data-tool="${o}" title="${r}" aria-label="${r}" aria-pressed="false" tabindex="-1">${lk[o]}</button>`).join("")}
        <span class="toolbar-spacer"></span>
        <button type="button" class="btn-link rich-mode-toggle" data-tool="mode" aria-pressed="false" tabindex="0">Markdown</button>`;const a=document.createElement("div");a.className="rich-composer-note",a.setAttribute("role","status"),a.hidden=!0,s.addEventListener("mousedown",o=>{o.target.closest("button")&&o.preventDefault()},{signal:t}),s.addEventListener("click",o=>{const r=o.target.closest("button[data-tool]");if(r){if(r.dataset.tool==="mode"){e.mode==="rich"?Jl(e,{focus:!0,remember:!0}):Hm(e,{focus:!0});return}if(!(!e.editor||e.mode!=="rich")){if(r.dataset.tool==="link"){const l=e.editor.getAttributes("link").href||"",c=window.prompt("Link URL (leave empty to remove the link)",l);if(c===null){e.editor.commands.focus();return}e.api.COMMANDS.link(e.editor,c)||$("That link can’t be added. Use an http, https or mailto address.","error")}else e.api.COMMANDS[r.dataset.tool](e.editor);bo(e)}}},{signal:t}),s.addEventListener("keydown",o=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(o.key))return;const r=[...s.querySelectorAll("button")].filter(d=>!d.disabled&&!d.hidden),l=r.indexOf(document.activeElement);if(l<0||!r.length)return;o.preventDefault();const c=o.key==="Home"?0:o.key==="End"?r.length-1:(l+(o.key==="ArrowRight"?1:-1)+r.length)%r.length;r.forEach(d=>{d.tabIndex=-1}),r[c].tabIndex=0,r[c].focus()},{signal:t}),i?(i.append(s,a),i.classList.add("has-rich-composer")):(n.insertAdjacentElement("afterend",s),s.insertAdjacentElement("afterend",a)),e.toolbar=s,e.note=a}function Xl(e,t,{focus:n=!1,restore:i=null}={}){gk(e,t)&&(Hm(e,{focus:n||!!i,remember:!1}),i&&e.mode==="rich"&&hk(e,i))}function gk(e,t){const{textarea:n,form:i}=e,s=document.createElement("div");s.className="rich-composer",s.hidden=!0,n.insertAdjacentElement("beforebegin",s);try{e.editor=t.createEditor({element:s,markdown:"",placeholder:e.placeholder,getMentionItems:a=>bm(a,e.mentionContext),onUpdate:a=>{e.syncing=!0,n.value=a,n.dispatchEvent(new Event("input",{bubbles:!0})),e.syncing=!1,bo(e)},onSubmit:()=>i==null?void 0:i.requestSubmit(),onEscape:()=>e.editor.commands.blur()})}catch{return s.remove(),e.editor=null,!1}return e.wrapper=s,e.api=t,e.editor.on("selectionUpdate",()=>bo(e)),!0}function Hm(e,{focus:t=!1,remember:n=!0}={}){if(n&&ju("rich"),!e.editor){e.start({focus:t});return}if(!e.api.roundTripsCleanly(e.editor,e.textarea.value,ii)){Jl(e,{focus:t,refused:!0});return}e.editor.commands.setContent(e.textarea.value||"",{contentType:"markdown",emitUpdate:!1}),ec(e,"rich",{focus:t})}function Jl(e,{focus:t=!1,remember:n=!1,refused:i=!1}={}){n&&ju("markdown"),ec(e,"markdown",{focus:t,refused:i})}function ec(e,t,{focus:n=!1,refused:i=!1}={}){const{textarea:s,editor:a,wrapper:o,toolbar:r,note:l}=e,c=t==="rich"&&!!a;e.mode=c?"rich":"markdown",s.hidden=c,o&&(o.hidden=!c),r.classList.toggle("markdown-mode",!c);const d=r.querySelector(".rich-mode-toggle");d.setAttribute("aria-pressed",String(!c)),d.title=c?"Write raw markdown":"Back to the formatted editor",l.hidden=!i,l.textContent=i?dk:"",n&&(c?a.commands.focus("end"):(s.focus(),s.setSelectionRange(s.value.length,s.value.length))),bo(e)}function bo(e){if(!e.toolbar)return;const t=!!e.editor&&e.mode==="rich",n=t?e.api.activeMarks(e.editor):{};e.toolbar.querySelectorAll(".icon-btn[data-tool]").forEach(a=>{const o=!!n[a.dataset.tool];a.setAttribute("aria-pressed",String(o)),a.classList.toggle("is-active",o),a.disabled=!t,a.hidden=!t});const i=[...e.toolbar.querySelectorAll("button")],s=i.filter(a=>!a.disabled&&!a.hidden);s.some(a=>a.tabIndex===0)||(i.forEach(a=>{a.tabIndex=-1}),(s[0]||i.at(-1)).tabIndex=0)}function hk(e,{from:t,to:n}){const i=e.editor.state.doc.content.size,s=a=>Math.max(1,Math.min(a,i));try{e.editor.chain().focus().setTextSelection({from:s(t),to:s(n)}).run()}catch{e.editor.commands.focus("end")}}function vk(e,t){t.destroyed=!0,t.editor&&t.editor.destroy(),t.editor=null,document.querySelectorAll(".rich-mention-suggestions").forEach(n=>n.remove()),$i.get(e)===t&&$i.delete(e)}function bk(e){var i,s,a;const t=$i.get(e);if(t&&t.editor&&t.mode==="rich")return t.editor.commands.focus("end"),(s=(i=t.wrapper).scrollIntoView)==null||s.call(i,{behavior:"smooth",block:"nearest"}),!0;const n=document.getElementById(e);return n?(n.focus(),(a=n.scrollIntoView)==null||a.call(n,{behavior:"smooth",block:"nearest"}),!0):!1}function yk(e){const t=$i.get(e);if(!t||!t.editor||t.mode!=="rich"||!t.editor.isFocused)return null;const{from:n,to:i}=t.editor.state.selection;return{from:n,to:i}}function wk(){for(const e of $i.values())if(e.editor&&(e.editor.view.composing||e.editor.isFocused&&document.querySelector(".rich-mention-suggestions:not([hidden])")))return!0;return!1}let tc=!1,nc=!1,yo=null,Bs=null,Ds=null,wo=null,ic=!1,$o=null;function sc(e=null){ic=!0,e&&($o=e)}function Fm(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔",ritual_approved:"✅"}[e]||"•"}function ac(e){return e.user_name||e.user_email||"Unknown"}const oc=e=>String(e||"").toLowerCase()==="claim"?"start":"close";function rc(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?u(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${u(Te(t(e.old_value)))}</strong> to <strong>${u(Te(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${u(Ae(t(e.old_value)))}</strong> to <strong>${u(Ae(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${u(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${u(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=u(e.field_name||"ritual"),s=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"ritual_approved":return`Approved <strong>${u(e.new_value||"a ritual")}</strong>`;case"intent_opened":return`Tried to ${oc(e.new_value)} it; waiting on rituals`;case"intent_cleared":return`No longer waiting on rituals to ${oc(e.new_value)}`;case"intent_canceled":return`Canceled the pending ${oc(e.new_value)}`;case"lease_expired":return"Claim expired; moved back to <strong>Todo</strong>";case"email_delivery_failed":return u(e.new_value||"An email could not be delivered");case"updated":return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||u(e.field_name)}`:"Updated issue"}}async function Ms(e){const t=()=>{var i;const n=(i=Ee())==null?void 0:i.id;return!n||n===e};try{const n=await h.getTicketRitualsStatus(e);if(!t())return;yo=n,uc(e)}catch(n){if(console.error("Failed to load ticket rituals:",n),!t())return;yo=null,uc(e)}}function Um(){const e=me();if(!e||e.is_agent)return!1;const t=jt();if(!t||t.length===0)return!0;const n=t.find(i=>i.user_id===e.id);return!!n&&(n.role==="admin"||n.role==="owner")}let Rs=null,lc=!0;function cc(){var a;const e=document.getElementById("ticket-gate-sticky");if(!e)return;const n=e.innerHTML.trim()!==""&&!lc;e.classList.toggle("hidden",!n);const i=document.getElementById("issue-detail-view"),s=n&&((a=e.firstElementChild)==null?void 0:a.offsetHeight)||0;i&&i.style.setProperty("--gate-bar-h",`${s}px`)}function Gm(){Rs&&(Rs.disconnect(),Rs=null),lc=!0,cc()}const $k=()=>typeof CSS>"u"||typeof CSS.supports!="function"||CSS.supports("selector(:has(*))");function kk(){Gm();const e=document.getElementById("ticket-gate");!e||typeof IntersectionObserver>"u"||!$k()||(Rs=new IntersectionObserver(t=>{lc=t[t.length-1].isIntersecting,cc()}),Rs.observe(e))}function _k(){var n,i;const e=document.getElementById("ticket-gate");if(!e||e.classList.contains("hidden"))return;(n=e.scrollIntoView)==null||n.call(e,{behavior:"smooth",block:"start"});const t=e.querySelector(".ticket-gate-actions .btn-primary");(i=t==null?void 0:t.focus)==null||i.call(t,{preventScroll:!0})}let dc=null;function uc(e){var g;const t=document.getElementById("ticket-gate"),n=document.getElementById("ticket-gate-sticky"),i=!!t&&t.dataset.issueId===e&&dc===e,s=document.activeElement,a=!!t&&!!s&&(t.contains(s)||s===document.body),o=yo,r=Um(),l=Ee(),c=l&&l.id===e?l:null,d=c!=null&&c.assignee_id?wt(c.assignee_id):null,p=d?dt(d):(c==null?void 0:c.assignee_name)||null;if(((b,y)=>{b&&(b.innerHTML=y,b.classList.toggle("hidden",y.trim()===""))})(t,o?$$(o,e,{canAct:r,assigneeName:p}):""),t&&(t.dataset.issueId=e),dc=e,n){const b=o?k$(o,{canAct:r}):"";n.innerHTML=b?`<div class="ticket-gate-sticky-bar">${b}</div>`:"",cc()}if(i){const b=document.getElementById("ticket-gate-live");if(b&&(b.textContent=o?w$(o,{canAct:r,assigneeName:p}):""),a&&t&&!t.classList.contains("hidden")){const y=t.querySelector(".ticket-gate-actions .btn-primary")||t.querySelector(".ticket-gate");(g=y==null?void 0:y.focus)==null||g.call(y,{preventScroll:!0})}}}function ko({focus:e=!1}={}){var n;const t=document.querySelector("#issue-detail-view details.related-add[open]");return t?(t.open=!1,e&&((n=t.querySelector("summary"))==null||n.focus()),!0):!1}function Ek(e){document.addEventListener("keydown",t=>{t.key==="Escape"&&ko({focus:!0})&&(t.stopPropagation(),t.preventDefault())},{capture:!0,signal:e}),document.addEventListener("click",t=>{var n,i;(i=(n=t.target).closest)!=null&&i.call(n,"details.related-add")||ko()},{signal:e})}async function _o(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await re(t.id,!1),!0):(O("my-issues",!1),!1)}catch{return O("my-issues",!1),!1}}function pc(e){const t=cs(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function mc({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${m(n.id)}" data-identifier="${m(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${m(i.id)}" data-identifier="${m(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function xk(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=Ee();if(!t)return;const n=pc(t.id);Bs=n.prevIssue?n.prevIssue.id:null,Ds=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=mc(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}ct(e=>{e==="detailNavContext"&&xk()});let js=0;const zm=500;function Sk(){js++}let Vm=0,Eo=!1;function Wm(){if(document.querySelector(".description-inline-editor"))return"editor";if(si())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)")||e!=null&&e.querySelector("details.related-add[open]"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||Eo||wk()?"transient":null}function Km(e){return sc(),e==="editor"?"deferred":"retry"}function Ik(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=Ee())==null?void 0:n.id)===e}function Lk(e){return ee().find(t=>t.id===e)||fl(e)||cs().find(t=>t.id===e)||null}function Tk(e){const t=document.getElementById("issue-detail-view"),n=t==null?void 0:t.querySelector("#issue-detail-content");if(!n)return;Gm(),dc=null,Xn(e);const i=pc(e.id);Bs=i.prevIssue?i.prevIssue.id:null,Ds=i.nextIssue?i.nextIssue.id:null;const s=te().find(r=>r.id===e.project_id),a=e.assignee_id?wt(e.assignee_id):null,o=C()||"my-issues";document.querySelectorAll(".view").forEach(r=>r.classList.add("hidden")),t.classList.remove("hidden"),n.innerHTML=`
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(o)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${mc(i)}
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
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${Ze(e.status)}<span>${Te(e.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${pt(e.priority)}<span>${Ae(e.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${a?u(dt(a)):"Unassigned"}</span></div>
                    </div>
                </aside>
            </div>`}async function re(e,t=!0,{refresh:n=!1}={}){var a;const i=n?js:++js,s=++Vm;if(n){const o=Wm();if(o)return Km(o)}try{t&&hn();let o=!1;if(!n){const B=Lk(e);B&&(Tk(B),t&&(history.pushState({issueId:e,view:C()},"",`/issue/${B.identifier}`),o=!0))}let r=!1;const[l,c,d,p,f,g]=await Promise.all([h.getIssue(e),h.getComments(e).catch(B=>(console.error("Failed to load comments:",B),r=!0,[])),h.getActivities(e,0,zm),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),b=[...c].sort((B,ce)=>new Date(B.created_at)-new Date(ce.created_at)),y=[l.parent_id?h.getIssue(l.parent_id):Promise.resolve(null),h.getSprints(l.project_id).catch(B=>(console.error("Failed to load sprints:",B),[]))],[_,E]=await Promise.all(y);if(i!==js)return"dropped";let I=null,A=null,R=null;if(n){if(s!==Vm||!Ik(e))return"dropped";const B=Wm();if(B)return Km(B);R=window.scrollY;const ce=document.activeElement;A=yk("new-comment"),ce!=null&&ce.id&&document.getElementById("issue-detail-view").contains(ce)&&(I={id:ce.id,start:ce.selectionStart,end:ce.selectionEnd})}yo=g,t&&!o&&history.pushState({issueId:e,view:C()},"",`/issue/${l.identifier}`),Xn(l),Ku(E),ic=!1,$o=null,document.querySelectorAll(".view").forEach(B=>B.classList.add("hidden"));const x=document.getElementById("issue-detail-view");x.classList.remove("hidden");const w=C()||"my-issues",D=te().find(B=>B.id===l.project_id),H=l.assignee_id?wt(l.assignee_id):null,X=H?dt(H):null,ne=l.sprint_id?E.find(B=>B.id===l.sprint_id):null,J=pc(l.id),{prevIssue:S,nextIssue:j}=J;x.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(w)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${mc(J)}
                        <span class="issue-detail-breadcrumb">${D?u(D.name):"Project"} › ${u(l.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${u(l.title)}</h1>
                    ${qp(l,X,{formatEstimate:gn})}

                    ${_?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(_.identifier)}" data-action="navigate-issue" data-issue-id="${m(_.id)}" data-identifier="${m(_.identifier)}">${_.identifier}: ${u(_.title)}</a>
                    </div>
                    `:""}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${ss(l.id)?" has-draft":""}" data-action="edit-description" data-issue-id="${m(l.id)}">
                                ${ss(l.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>':'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${l.description?"":"empty"}" data-action="edit-description" data-issue-id="${m(l.id)}">
                            ${l.description?jn(l.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${Dy(l,p,f,{formatEstimate:gn})}

                    ${qy({comments:b,activities:d,ritualStatus:g,commentsLoadFailed:r,issueId:l.id,gateRitualName:((a=y$(g,{canAct:Um()}))==null?void 0:a.name)||null,activitiesTruncated:d.length>=zm},{formatText:rc,formatActor:ac})}

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
                                ${Ze(l.status)}
                                <span>${Te(l.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${m(l.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${pt(l.priority)}
                                <span>${Ae(l.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${m(l.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${l.issue_type||"task"}">${lt(l.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${m(l.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${X?`${zt(H,"avatar-small")}<span>${u(X)}</span>`:'<span class="text-muted">Unassigned</span>'}
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
                                ${l.labels&&l.labels.length>0?l.labels.map(B=>`
                                        <span class="issue-label" style="background: ${se(B.color)}20; color: ${se(B.color)}">${u(B.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${D?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${u(D.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${m(l.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${qo(l.estimate,l.project_id)?" out-of-scale":""}" ${qo(l.estimate,l.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${gn(l.estimate,l.project_id)}</span>
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
                            <span class="property-value-static">${u(l.creator_name||"Unknown")} ${Ma(l.creator)}</span>
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
        `,wo&&wo.abort(),wo=new AbortController;const{signal:M}=wo,ie=document.querySelector(".sidebar-overflow-trigger"),we=document.querySelector(".overflow-menu-dropdown");if(ie&&we){const B=()=>{we.classList.add("hidden"),ie.setAttribute("aria-expanded","false")},ce=()=>{const K=we.classList.toggle("hidden");ie.setAttribute("aria-expanded",String(!K))};ie.addEventListener("click",ce,{signal:M}),document.addEventListener("click",K=>{!ie.contains(K.target)&&!we.contains(K.target)&&B()},{signal:M}),we.addEventListener("keydown",K=>{K.key==="Escape"&&(K.stopPropagation(),B(),ie.focus())},{signal:M})}kk(),uc(l.id),Ml("new-comment","mention-suggestions",{projectId:l.project_id}),Lm({signal:M}),Ek(M);const $e=document.getElementById("new-comment");if(Eo=!1,$e){$e.addEventListener("compositionstart",()=>{Eo=!0},{signal:M}),$e.addEventListener("compositionend",()=>{Eo=!1},{signal:M});const B=Au(l.id);B&&($e.value=B),$e.addEventListener("input",()=>{Ca(l.id,$e.value)}),$e.addEventListener("keydown",ce=>{var K;ce.key==="Enter"&&(ce.metaKey||ce.ctrlKey)&&(ce.preventDefault(),(K=$e.closest("form"))==null||K.requestSubmit())}),mk("new-comment",{signal:M,mentionContext:{projectId:l.project_id},placeholder:"Write a comment…",restore:A})}Bs=S?S.id:null,Ds=j?j.id:null;const nn=B=>{var de;if((B.metaKey||B.ctrlKey)&&B.shiftKey&&(B.key===">"||B.key==="."||B.code==="Period")&&mo()){B.preventDefault();return}if(B.metaKey||B.ctrlKey||B.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||B.target.tagName==="INPUT"||B.target.tagName==="TEXTAREA"||B.target.tagName==="SELECT"||B.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||si())return;B.key==="ArrowLeft"&&Bs?(B.preventDefault(),re(Bs)):B.key==="ArrowRight"&&Ds?(B.preventDefault(),re(Ds)):B.key==="c"?(B.preventDefault(),B.stopImmediatePropagation(),bk("new-comment")):B.key==="j"?(B.preventDefault(),B.stopImmediatePropagation(),xo(1)):B.key==="k"?(B.preventDefault(),B.stopImmediatePropagation(),xo(-1)):B.key==="d"&&(B.preventDefault(),(de=document.querySelector('[data-action="edit-description"]'))==null||de.click());const K={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[B.key];if(K){const ke=document.querySelector(`.property-row[data-field="${K}"]`);ke&&(B.preventDefault(),ke.click())}};if(document.addEventListener("keydown",nn,{signal:M}),I){const B=document.getElementById(I.id);if(B&&(B.focus({preventScroll:!0}),typeof I.start=="number"&&typeof B.setSelectionRange=="function"))try{B.setSelectionRange(I.start,I.end)}catch{}}return R!==null&&window.scrollTo(0,R),"rendered"}catch(o){if(n)console.error("Failed to refresh issue detail:",o);else{if(i!==js)return"dropped";k("load issue",o);const r=document.querySelector("#issue-detail-content .detail-from-row .issue-detail-description");if(r){const l=(o==null?void 0:o.status)===403||(o==null?void 0:o.status)===404;r.innerHTML=V(l?{icon:U.issues,heading:"Issue not found",description:"It may have been deleted, or you no longer have access to it",variant:"error"}:{icon:U.issues,heading:"Failed to load issue",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-issue-comments",data:{"issue-id":e}},variant:"error"})}}return"failed"}}async function Ak(e,t){if(e.preventDefault(),tc)return!1;const n=document.getElementById("new-comment").value;Ca(t,null),tc=!0;try{const i=await h.createComment(t,n);$("Comment added!","success"),Da(i),await re(t)}catch(i){Ca(t,n),k("add comment",i)}finally{tc=!1}return!1}async function Ck(e){const t=Ee()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=ss(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=Bu(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Ml("edit-description","edit-description-mention-suggestions",{projectId:t.project_id}),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?Sn(e,c,t.description||""):Sn(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&Ym()}),a.addEventListener("keydown",c=>{var d,p;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(p=document.getElementById("cancel-description-edit"))==null||p.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var p,f;if(!((((p=document.getElementById("edit-description"))==null?void 0:p.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Sn(e,null),ic){re(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?jn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var g,b;if(nc)return;const c=(g=document.getElementById("edit-description"))==null?void 0:g.value;if(c===void 0)return;const d=$o?$o.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const y=document.getElementById("description-draft-warning");y&&(y.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",y.classList.remove("hidden"));return}const p=document.getElementById("save-description-edit");nc=!0,p&&(p.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Sn(e,null),$("Description updated","success"),await re(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(y){k("update description",y)}finally{nc=!1,p&&(p.disabled=!1)}})}function Ym(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?jn(n):'<span class="text-muted">Nothing to preview.</span>'}function Bk(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?Ym():i.focus()}function Dk(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,G(),document.getElementById("relation-issue-search").focus()}async function Mk(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=T())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${m(r.id)}" data-identifier="${m(r.identifier)}" data-title="${m(r.title)}">
                <span class="link-result-id">${u(r.identifier)}</span>
                <span class="link-result-title">${u(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Rk(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function jk(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Pk(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return $("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),F(),$("Relation added","success"),re(t)}catch(s){k("add relation",s)}return!1}async function qk(e,t){try{await h.deleteRelation(e,t),$("Relation removed","success"),re(e)}catch(n){k("remove relation",n)}}function xo(e){const t=Ee();if(!t)return;const n=cs();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||re(n[s].id)}ae({"retry-issue-comments":(e,t)=>{re(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Fy(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Ck(t.issueId)},"open-gate-document":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Be(t.documentId))},"scroll-to-ticket-gate":()=>{_k()},"save-comment":(e,t)=>{Ak(e,t.issueId)},"show-add-relation-modal":(e,t)=>{ko(),Dk(t.issueId)},"remove-relation":(e,t)=>{qk(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{ko(),_p(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Pk(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Mk(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Rk(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{jk()},"set-description-editor-mode":(e,t)=>{Bk(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>xo(-1),"navigate-next-issue":()=>xo(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Om(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),ok(t.issueId)}});let Bt=[],So={},Io=new Set,Yt=null,fc=null,Lo=[],Ps=[],gc=[];function To(){return So}function Nk(){return fc}function Ok(){return Yt}ct(e=>{e==="currentProject"&&C()==="sprints"&&fn()});let hc=0;async function fn({fromMemory:e=!1}={}){Wu(-1);const t=Q();if(!t){const o=document.getElementById("sprints-list");o&&(o.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Sprints belong to one project. Pick one in the sidebar switcher, or press P.</p>
                </div>
            `);return}const n=++hc;n_();const i=document.getElementById("sprints-list"),s=Nl(),a=e?uo("sprints",s):void 0;a?(Bt=a,Qm()):i&&(i.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{const[,o]=await Promise.all([h.getCurrentSprint(t),h.getSprints(t)]),r=o.some(c=>c.status==="active")?o:await h.getSprints(t);if(n!==hc)return;const l=a&&po(Bt,r);Bt=r,hi("sprints",s,r),l||Qm(),await Ao()}catch(o){return n!==hc?void 0:(i&&(i.innerHTML=V({icon:U.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),k("load sprints",o),!1)}return!0}function Qm(){const e=document.getElementById("sprints-list");if(!e)return;const t=Bt.find(a=>a.status==="active"),n=Bt.find(a=>a.status==="planned"),i=Bt.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 data-action="view-sprint" data-sprint-id="${m(t.id)}" data-sprint-url="/sprint/${m(t.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${u(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
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
        `,s+=Hk(t)}if(n){const a=n.budget_explicit===!0?"set by hand":n.budget_explicit===!1?"follows project default":"",o=(n.budget?`${n.budget} point budget`:"No budget set")+(a?` <span class="text-muted">· ${a}</span>`:"");s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${m(n.id)}" data-sprint-url="/sprint/${m(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${u(n.name)}</div>
                <div class="sprint-card-budget">${o}</div>
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
                    ${i.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${m(a.id)}" data-sprint-url="/sprint/${m(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${u(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=s||V({icon:U.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Zm(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${$c(e.activated_at)}, closed ${$c(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${$c(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Hk(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${u(Zm(e))||"not yet activated"}</span>
                    <span>${u(r)}</span>
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
    `}let vc=0;async function ki(e,t=!0){var n;try{t&&hn();const i=++vc,s=C(),a=await h.getSprint(e);if(i!==vc)return;if(!a){$("Sprint not found","error"),O("sprints");return}fc=a;const o=(n=T())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==vc)return;Lo=r,gc=l,Ps=c,C()===s&&Lt(Lo),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Uk()}catch(i){console.error("Failed to load sprint:",i),$("Failed to load sprint","error"),O("sprints")}}async function Fk(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){$("Invalid sprint ID","error"),O("sprints",!1);return}try{await ki(e,!1)}catch{O("sprints",!1)}}function Uk(){const e=fc,t=Lo;document.querySelectorAll(".view").forEach(g=>g.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(g=>ps.includes(g.status)),a=t.filter(g=>g.status==="done"),o=t.filter(g=>g.status==="canceled"),r=g=>g.reduce((b,y)=>b+(y.estimate||0),0),l=r(t.filter(g=>g.status!=="canceled")),c=r(a),d=o.length>0?`<div class="stat-note">${o.length} canceled not counted</div>`:"";let p="";e.status==="active"?p='<span class="badge badge-status-active">Active</span>':e.status==="planned"?p='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(p='<span class="badge badge-status-completed">Completed</span>');const f=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
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
                    ${u(Zm(e))}
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
                ${s.length===0?V({icon:U.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(g=>bc(g)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?V({icon:U.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(g=>bc(g)).join("")}
                    </div>
                `}
            </details>

            ${o.length>0?`
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${o.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${o.map(g=>bc(g)).join("")}
                    </div>
                </details>
            `:""}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${zk()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Ps.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${m(e.id)}"
                        data-project-id="${m(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Ps.length>0?`
                    <div class="sprint-issues-list">
                        ${Ps.map(g=>Gk(g)).join("")}
                    </div>
                `:V({icon:U.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function bc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=[...Qu,"canceled"].includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${m(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${u(e.identifier)}</span>
            <span class="sprint-issue-title">${u(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${a_(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Gk(e){const t=u(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${m(e.id)}" data-document-url="/document/${m(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${u(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${at(e.created_at)}</span>
            </span>
        </div>
    `}function zk(){const e=gc;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${Vk(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Vk(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Wk(e,t,n,i){const s=i?T_(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function Kk(e,t,n){var p,f,g,b;e.preventDefault();const i=(f=(p=document.getElementById("sprint-name"))==null?void 0:p.value)==null?void 0:f.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((g=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:g.value)||"this",r=(b=document.querySelector('form[data-action="handle-update-budget"]'))==null?void 0:b.dataset.currentBudget,l=r?parseInt(r):null,c=a!==l,d=Bt.find(y=>y.id===t);try{const y={};i&&(y.name=i);const _=o==="default"&&(d==null?void 0:d.status)==="planned"&&(d==null?void 0:d.budget_explicit)===!1;if(c&&!_&&(y.budget=a),Object.keys(y).length&&await h.updateSprint(t,y),o==="planned"){const I=Bt.filter(A=>A.status==="planned"&&A.id!==t);for(const A of I)await h.updateSprint(A.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await fn(),F(),$(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(y){k("update budget",y)}return!1}const Xm="The project has no default sprint budget, so this sprint (and later sprints that follow the default) will have no budget and arrears will not apply. Set a default in the project settings.";async function Yk(e,t=null){const n=Bt.find(c=>c.id===e),i=n?te().find(c=>c.id===n.project_id):null;if(i&&i.default_sprint_budget===null&&!confirm(`${Xm}

Follow the project default anyway?`))return;const s=c=>c==null?"unlimited":`${c} points`;t&&(t.disabled=!0);let a;try{a=await h.updateSprint(e,{budget_follows_default:!0})}catch(c){k("reset budget to project default",c),t&&(t.disabled=!1);try{await fn()}catch{}return}const o=(a==null?void 0:a.name)||(n==null?void 0:n.name)||"Sprint",r=n&&"budget"in n?` (was ${s(n.budget)})`:"";let l;try{l=await fn()!==!1}catch{l=!1}$(`'${o}' follows the project default budget again: ${s(a==null?void 0:a.budget)}${r}.`+(l?"":" Refresh to see it."),"success"),((a==null?void 0:a.budget)===null||(a==null?void 0:a.budget)===void 0)&&$(Xm,"warning")}async function Qk(e){const t=Bt.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,G();const n=ps;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${u(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':i>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${i}</strong> incomplete issue${i===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${s?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${m(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function Zk(e){try{const t=await h.closeSprint(e);await fn(),tf(),t.limbo?Jk(t):$("Sprint completed!","success")}catch(t){k("complete sprint",t)}}async function Ao(){const e=Q();if(e)try{Yt=await h.getLimboStatus(e),Xk()}catch(t){console.error("Failed to load limbo status:",t)}}function Xk(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!Yt||!Yt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${Yt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Jk(e){const t=Q();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,G(),e_(t)}async function e_(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${u(i.name)} <span class="ritual-mode">(${u(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${ft(i.prompt)}</div>
                    ${wc(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function yc(){var t,n;if(!Yt)return;const e=Q();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${Yt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${u(i.name)}</strong>
                            <span class="badge badge-ritual-${m(i.approval_mode)}">${u(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${ft(i.prompt)}</div>
                        ${wc(i.attestation)}
                        ${t_(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=Yt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${Yt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${u(i.name)}</div>
                            ${wc(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,G()}function wc(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${u(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${u(at(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${ft(e.note)}</div>
        </div>
    `}function t_(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${m(e.id)}" data-project-id="${m(t)}" data-ritual-name="${m(e.name)}" data-ritual-artifact="${m(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Jm(e){for(const t of e)if(!Io.has(t))try{(await h.getSprints(t)).forEach(i=>{So[i.id]=i}),Io.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function n_(){So={},Io=new Set,Lo=[],gc=[],Ps=[],Co={}}function i_(e,t){t.forEach(n=>{So[n.id]=n}),Io.add(e)}let Co={};function s_(e){return Co[e]}function ef(e,t){Co[e]=t??null}function tf(){Co={}}ae({"retry-load-sprints":()=>fn(),"view-sprint":(e,t,n)=>{if(!(e.type==="keydown"&&(n==null?void 0:n.tagName)==="BUTTON")){if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}ki(t.sprintId)}},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Wk(t.sprintId,t.sprintName,n,t.projectId)},"follow-default-budget":(e,t,n)=>{Yk(t.sprintId,n)},"show-limbo-details-modal":()=>{yc()},"show-close-sprint-confirmation":(e,t)=>{Qk(t.sprintId)},"handle-update-budget":(e,t)=>{Kk(e,t.sprintId,t.projectId)},"close-modal":()=>{F()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,F(),Zk(t.sprintId)},"dismiss-limbo-modal":()=>{F(),Ao()},"approve-ritual":(e,t)=>{c_(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{sf(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"scroll-to-budget-ledger":()=>{var e;(e=document.getElementById("sprint-budget-ledger"))==null||e.scrollIntoView({behavior:"smooth",block:"start"})},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}re(t.issueId)},"create-sprint-document":async(e,t)=>{await V$(t.sprintId,t.projectId,()=>{ki(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Be(t.documentId)}});function $c(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function a_(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}ct(e=>{e==="currentProject"&&C()==="rituals"&&kc()});let nf=0;async function kc(){const e=Q(),t=document.getElementById("rituals-content"),n=++nf;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=V({icon:U.projects,heading:"Select a project",description:"Rituals belong to one project. Pick one in the sidebar switcher, or press P."}));return}j_(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await Os();n===nf&&!i&&t&&(t.innerHTML=V({icon:U.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function o_(){mf(r_),kc()}function r_(){const e=document.getElementById("rituals-content"),t=P_(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Ei("rv-sprint-rituals-list",n,"sprint"),Ei("rv-close-rituals-list",i,"close"),Ei("rv-claim-rituals-list",s,"claim")}function l_(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function c_(e,t){try{await h.approveAttestation(e,t),$("Ritual approved!","success"),await Ao(),yc()}catch(n){k("approve ritual",n)}}function _c(e){return e==="document"?`
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
        `:""}function Ec(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){$("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){$("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function sf(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${_c(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{d_(s,e,t,i)}),G()}async function d_(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Ec(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),$("Ritual completed!","success"),await Ao();const o=Ok();o&&!o.in_limbo?(F(),$("Limbo cleared! Next sprint is now active.","success")):yc()}catch(o){k("complete gate ritual",o)}return!1}function u_(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${u(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${_c(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{p_(o,e,t,s,a)}),G()}async function p_(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return $("A note is required for this attestation.","error"),!1;const o=Ec(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),$("Ritual attested!","success"),F(),await Ms(n)}catch(r){k("attest ticket ritual",r)}return!1}async function m_(e,t){try{await h.attestTicketRitual(e,t),$("Ritual attested!","success"),await Ms(t)}catch(n){k("attest ticket ritual",n)}}async function f_(e,t){try{await h.approveTicketRitual(e,t),$("Ritual approved!","success"),await Ms(t)}catch(n){k("approve ticket ritual",n)}}function af(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{g_(s,e,t,n,i)}),G()}async function g_(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return $("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),$(`"${i}" rejected. The attester has been told why.`,"success"),F(),s&&await s()}catch(o){k("reject ritual",o)}return!1}function h_(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${_c(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{v_(s,e,t,i)}),G()}async function v_(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Ec(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),$("Ritual completed!","success"),F(),await Ms(n)}catch(o){k("complete ticket ritual",o)}return!1}ae({"show-create-ritual-modal":(e,t)=>{$f(t.trigger)},"approve-ticket-ritual":(e,t)=>{f_(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{af(t.ritualId,t.issueId,t.ritualName,()=>Ms(t.issueId))},"complete-ticket-ritual":(e,t)=>{h_(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{u_(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{m_(t.ritualId,t.issueId)},"retry-load-rituals":()=>kc()});function ft(e){if(!e)return"";try{Y.setOptions({breaks:!0,gfm:!0});const n=Y.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Iu.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function qs(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function b_(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${u(s)}</span>
                    <span class="gate-approval-issue-title">${u(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${u(i)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${u(o)}</strong>${r?` ${qs(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{y_(c,e,t,n)}),G(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function y_(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),$(`GATE ritual "${i}" approved!`,"success"),F(),Dt()}catch(a){k("complete gate ritual",a)}}function w_(e,t,n,i,s,a,o,r){b_(e,t,n,i,s,a,o,r)}function $_(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${u(s)}</span>
                    <span class="gate-approval-issue-title">${u(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(s)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${m(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${u(i)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${u(o)}</strong>${r?` ${qs(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><div class="markdown-body">${ft(l)}</div></div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{k_(d,e,t,n)}),G(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function k_(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{await h.approveTicketRitual(t,n);let r=null;if(s)try{r=await h.createComment(n,s)}catch(l){console.error("Failed to post approval comment:",l)}$(`Review ritual "${i}" approved!`,"success"),Da(r),F(),Dt()}catch(r){k("approve review ritual",r)}}function __(e,t,n,i,s,a,o,r,l){$_(e,t,n,i,s,a,o,r,l)}ct(e=>{e==="currentProject"&&C()==="approvals"&&Dt()});let xc=[],Sc=0;async function Dt(){if(!T())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Sc;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=Q(),i=n?te().filter(r=>r.id===n):te(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==Sc)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(p=>{var f;return(f=p.attestation)!=null&&f.approved_at?!1:p.approval_mode==="gate"||!!p.attestation});d.length>0&&o.push({project:r,rituals:d})}Db(a),xc=o,of()}catch(n){if(t!==Sc)return;e.innerHTML=V({icon:U.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),k("load approvals",n)}}function of(){const e=document.getElementById("approvals-list");if(!e)return;const t=Bb(),n=xc.length>0,i=!db();if(t.length===0&&!n){i?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${U.issues}</div>
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
            `:e.innerHTML=V({icon:U.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${xc.map(({project:d,rituals:p})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${u(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${p.map(f=>{const g=f.attestation&&!f.attestation.approved_at,b=g?"⏳":"○",y=g?`<span class="gate-waiting-info">Attested by <strong>${u(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=g?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${m(f.id)}"
                                            data-project-id="${m(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${m(f.id)}"
                                                data-project-id="${m(d.id)}"
                                                data-ritual-name="${m(f.name)}"
                                                data-ritual-artifact="${m(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${u(f.name)}
                                                    <span class="badge badge-ritual-${m(f.approval_mode)}">${u(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${u(f.prompt)}</span>
                                                ${y}
                                            </div>
                                            ${_}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=d=>d.pending_approvals||[],o=d=>p=>{const f=a(p).filter(d);return f.length>0?{...p,_filteredApprovals:f}:null},r=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="claim")).filter(Boolean),l=t.map(o(d=>d.approval_mode==="gate"&&d.limbo_type==="close")).filter(Boolean),c=t.map(o(d=>d.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(Ic).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(Ic).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Ic).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;w_(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var g;d.disabled=!0;const p=(g=d.closest(".gate-ritual-actions"))==null?void 0:g.querySelector(".review-approve-btn");p&&(p.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),$(`Review ritual "${f.ritualName}" approved!`,"success"),await Dt()}catch(b){d.disabled=!1,p&&(p.disabled=!1),k("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;__(p.ritualId,p.issueId,p.ritualName,p.ritualPrompt,p.issueIdentifier,p.issueTitle,p.requestedBy,p.requestedAt,p.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset;af(p.ritualId,p.issueId,p.ritualName,()=>Dt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),$("Sprint ritual approved!","success"),await Dt()}catch(p){d.disabled=!1,k("approve sprint ritual",p)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{sf(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function E_(){ub(),of()}function Ic(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${u(i.requested_by_name)}</strong>${i.requested_at?` (${qs(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note markdown-body">${ft(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=!s&&i.rejection_note,d=c?`<div class="gate-rejection-note"><strong>Rejected by ${u(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${qs(i.rejected_at)})`:""}: ${u(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",p=`<button class="btn btn-small btn-secondary gate-reject-btn"
                        data-ritual-id="${m(i.ritual_id)}"
                        data-issue-id="${m(e.issue_id)}"
                        data-ritual-name="${m(i.ritual_name)}">Reject</button>`,f=s?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${m(i.ritual_id)}"
                        data-issue-id="${m(e.issue_id)}"
                        data-ritual-name="${m(i.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${m(i.ritual_id)}"
                        data-issue-id="${m(e.issue_id)}"
                        data-ritual-name="${m(i.ritual_name)}"
                        data-ritual-prompt="${m(i.ritual_prompt)}"
                        data-issue-identifier="${m(e.identifier)}"
                        data-issue-title="${m(e.title)}"
                        data-requested-by="${m(i.requested_by_name||"")}"
                        data-requested-at="${m(i.requested_at||"")}"
                        data-attestation-note="${m(i.attestation_note||"")}">Comment &amp; Approve</button>
                    ${p}
                </div>`:`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${m(i.ritual_id)}"
                    data-issue-id="${m(e.issue_id)}"
                    data-ritual-name="${m(i.ritual_name)}"
                    data-ritual-prompt="${m(i.ritual_prompt)}"
                    data-issue-identifier="${m(e.identifier)}"
                    data-issue-title="${m(e.title)}"
                    data-requested-by="${m(i.requested_by_name||"")}"
                    data-requested-at="${m(i.requested_at||"")}">Complete</button>
                    ${c?"":p}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${u(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${u(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${d}
                </div>
                ${f}
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${m(e.issue_id)}" class="gate-issue-link">
                    <span class="gate-issue-id">${u(e.identifier)}</span>
                    <span class="gate-issue-title">${u(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${u(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}ae({"view-issue-from-modal":(e,t)=>{e.preventDefault(),F(),re(t.issueId)},"dismiss-approvals-explainer":()=>{E_()},"retry-load-approvals":()=>Dt()});const Bo={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Do={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let rf=0;function lf(e){rf=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=cf(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function cf(e="",t="",n=""){const i=rf++,s=Object.keys(Bo).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?Bo[e]:Bo.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${Do[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${m(String(r))}" placeholder="Value"${l?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function x_(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",cf()),Mo()}function S_(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Mo()}function I_(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=Bo[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${Do[o]}</option>`).join(""),df(e),Mo()}function df(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Ns(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Mo(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function uf(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw Ns("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw Ns("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const p=`${r}__${l}`;if(n.has(p))throw Ns(`Duplicate condition: ${r} ${Do[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${p}`);if(n.add(p),l==="isnull")t[p]=!0;else if(l==="in"||l==="contains")t[p]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw Ns(`Please enter a numeric value for ${r} ${Do[l]}.`),new Error(`Missing numeric value for ${p}`);const f=parseInt(d,10);if(isNaN(f))throw Ns(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${p}: ${d}`);t[p]=f}else t[p]=d}return Mo(),Object.keys(t).length>0?t:null}ae({"add-condition-row":()=>{x_()},"remove-condition-row":(e,t)=>{S_(Number(t.rowId))},"update-operator-options":(e,t)=>{I_(Number(t.rowId))},"toggle-value-input":(e,t)=>{df(Number(t.rowId))}});let De=[],Lc=null;const Ro="project-switcher",Tc="all";function jo(e=Q()){const t=document.getElementById(Ro);t&&(t.value=e||"")}ct((e,t)=>{e==="currentProject"&&(t&&Tu(t),jo(t),W_(t||""))});function pf(){Tu(Tc),bt(null)}const Po={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function mf(e){Lc=e}function te(){return De}function L_(e){De=e}function _i(e){const t=De.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Po[n]||Po.fibonacci}function gn(e,t){if(e==null)return"No estimate";const i=_i(t).find(s=>s.value===e);return i?i.label:`${e} points`}function qo(e,t){return e==null||e===0?!1:!_i(t).some(i=>i.value===e)}function T_(e){const t=De.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Po[n]||Po.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function gt(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getProjects(e);if(((n=T())==null?void 0:n.id)!==e)return;De=i,gf(),ff()}catch(i){k("load projects",i)}}function ff(){const e=Q();if(e&&De.some(s=>s.id===e))return;const n=new URLSearchParams(window.location.search).get("project");if(n&&De.some(s=>s.id===n)){bt(n);return}const i=Lu();if(i===Tc){e&&bt(null);return}if(i&&De.some(s=>s.id===i)){bt(i);return}De.length>0&&bt(De[0].id)}function gf(){const e=document.getElementById(Ro);e&&(e.innerHTML='<option value="">All projects</option>'+De.map(t=>`<option value="${m(t.id)}" data-hint="${m(t.key||"")}">${u(t.name)}</option>`).join(""),jo())}function hf(){const e=Lu();return e===Tc?null:e}function On(){const e=document.getElementById("projects-list");if(De.length===0){e.innerHTML=V({icon:U.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=De.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${m(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${se(t.color)}20; color: ${se(t.color)}">
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
    `).join("")}function A_(e){bt(e),O("issues")}function vf(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function C_(e){e.preventDefault();const t=T();if(!t){$("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await gt(),On(),F(),$("Project created!","success")}catch(i){k("create project",i)}return!1}async function B_(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await gt(),On(),F(),$("Project updated!","success")}catch(i){k("update project",i)}return!1}async function D_(e){const t=De.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await gt(),On(),F(),$("Project deleted","success")}catch(n){k("delete project",n)}}let Re=null;function bf(e,t){const n=document.getElementById(e);n&&(n.checked=t)}async function M_(e){const t=document.getElementById("ps-default-epic");if(!t)return;t.disabled=!0,t.innerHTML='<option value="">None</option>';let n;try{n=await h.getIssues({project_id:e.id,issue_type:"epic",limit:500})||[]}catch{return}if(Re!==e.id)return;const i=n.filter(a=>a.id===e.default_epic_id||a.status!=="done"&&a.status!=="canceled"),s=e.default_epic_id&&!i.some(a=>a.id===e.default_epic_id)?`<option value="${m(e.default_epic_id)}">Current default (not an open epic)</option>`:"";t.innerHTML='<option value="">None</option>'+s+i.map(a=>`<option value="${m(a.id)}">${u(a.identifier)} ${u(a.title)}</option>`).join(""),t.value=e.default_epic_id||"",t.disabled=!1}async function yf(e){Re=e,De.length===0&&await gt();const t=De.find(n=>n.id===e);if(!t){$("Project not found","error"),O("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,bf("ps-require-assignee-on-claim",t.require_assignee_on_claim===!0),bf("ps-require-epic-on-close",t.require_epic_on_close===!0),M_(t),document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),wf("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function wf(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Qt||Qt.length===0)&&Os()}function R_(){Re=null,Qt=[]}function j_(e){Re=e}function P_(){return Qt}async function q_(){if(!Re)return;const e=document.getElementById("ps-name").value.trim();if(!e){$("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Re,t),await gt(),$("Settings saved","success");const n=De.find(i=>i.id===Re);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){k("save project settings",n)}}async function N_(){if(!Re)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked},i=document.getElementById("ps-require-assignee-on-claim");i&&(n.require_assignee_on_claim=i.checked);const s=document.getElementById("ps-require-epic-on-close");s&&(n.require_epic_on_close=s.checked);const a=document.getElementById("ps-default-epic");a&&!a.disabled&&(n.default_epic_id=a.value||null);try{await h.updateProject(Re,n),await gt(),$("Settings saved","success")}catch(o){k("save settings",o)}}let Qt=[];async function Os(){if(!Re)return!1;try{return Qt=await h.getRituals(Re),O_(),typeof Lc=="function"&&Lc(),!0}catch(e){return k("load rituals",e),!1}}function O_(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Qt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Qt.filter(i=>i.trigger==="ticket_close"),n=Qt.filter(i=>i.trigger==="ticket_claim");Ei("ps-sprint-rituals-list",e,"sprint"),Ei("ps-close-rituals-list",t,"close"),Ei("ps-claim-rituals-list",n,"claim")}function Ei(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>m(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${u(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${u(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${ft(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${s(a.approval_mode)}">${u(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
          ${a.artifact?`<span class="badge badge-artifact">${u(a.artifact)}</span>`:""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${m(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${m(a.id)}" data-ritual-name="${m(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function $f(e){if(!Re)return;let t=[];try{t=await h.getRitualGroups(Re)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${lf(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,G()}function H_(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function F_(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function kf(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw $("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Re,{name:t,selection_mode:n})).id}return e.value||null}async function U_(e){var s;e.preventDefault();let t;try{t=uf()}catch{return!1}let n;try{n=await kf()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(Re,i),await Os(),F(),$("Ritual created!","success")}catch(a){k("create ritual",a)}return!1}async function G_(e){const t=Qt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Re)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
          ${n.map(o=>`<option value="${m(o.id)}" data-mode="${m(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${u(o.name)} (${u(o.selection_mode)})</option>`).join("")}
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
        ${lf(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,G()}async function z_(e,t){var a;e.preventDefault();let n;try{n=uf()}catch{return!1}let i;try{i=await kf()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await Os(),F(),$("Ritual updated!","success")}catch(o){k("update ritual",o)}return!1}async function V_(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Os(),$("Ritual deleted","success")}catch(n){k("delete ritual",n)}}ae({"view-project":(e,t)=>{A_(t.projectId)},"view-project-settings":(e,t)=>{yf(t.projectId)},"create-project":e=>{C_(e)},"update-project":(e,t)=>{B_(e,t.projectId)},"confirm-delete-project":(e,t)=>{D_(t.projectId)},"edit-project-ritual":(e,t)=>{G_(t.ritualId)},"delete-project-ritual":(e,t)=>{V_(t.ritualId,t.ritualName)},"create-project-ritual":e=>{U_(e)},"update-project-ritual":(e,t)=>{z_(e,t.ritualId)},"toggle-ritual-conditions":()=>{H_()},"ritual-group-change":()=>{F_()}});function _f(){const t=new URLSearchParams(window.location.search).get("project");return t||hf()}function W_(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Ac={},Ef=new Map;let Cc=null,Bc=null,Dc=null,Mc=null,Rc=null,jc=null,Pc=null,xf=!1;function K_(e){Object.assign(Ac,e)}function Y_({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a,beforeScrollRestore:o}={}){e&&(Cc=e),t&&(Bc=t),n&&(Dc=n),i&&(Mc=i),s&&(Rc=s),a&&(jc=a),o&&(Pc=o)}function Sf(){return Object.keys(Ac)}const Q_=["issues","query","board","sprints","epics","documents","rituals","approvals","my-issues"],If={issue:"issues",issues:"issues",epic:"epics",sprint:"sprints",document:"documents",projects:"projects",people:"people"};function Hs(e){document.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)})}function Lf(){Cc&&Cc()}function O(e,t=!0,{transition:n=!1}={}){if(t&&hn(),ls(e),t){let a;const o=_f();e==="my-issues"?a=o?`/?project=${o}`:"/":e==="issues"&&window.location.search?a=`/issues${window.location.search}`:Q_.includes(e)&&o?a=`/${e}?project=${o}`:a=`/${e}`,history.pushState({view:e},"",a)}Hs(e),Lf();const i=()=>{document.querySelectorAll(".view").forEach(o=>o.classList.add("hidden"));const a=document.getElementById(`${e}-view`);a&&a.classList.remove("hidden")};n&&document.startViewTransition?document.startViewTransition(i):i();const s=Ac[e];s&&s(),t&&window.scrollTo(0,0)}const Fs={"gate-approvals":"approvals",team:"people"},Z_=new Set(["team"]);function Tf(){var i;ls(null);const e=window.location.pathname.split("/").filter(Boolean),t=e.length===0?"my-issues":Fs[e[0]]||e[0],n=e.length<=1&&Sf().includes(t);document.querySelectorAll(".view").forEach(s=>s.classList.add("hidden")),n?((i=document.getElementById(`${t}-view`))==null||i.classList.remove("hidden"),Hs(t)):Hs(If[e[0]]||null)}function qc(){var i;const t=window.location.pathname.split("/").filter(Boolean);Mc&&Mc(),C()||ls("my-issues");let n="my-issues";if(t.length===0||t[0]==="")O("my-issues",!1);else if(Bc&&Bc(t)){const s=If[t[0]];s&&Hs(s);return}else n=t[0],Fs[n]&&(t.length===1&&Z_.has(n)&&history.replaceState({view:Fs[n]},"",`/${Fs[n]}${window.location.search}`),n=Fs[n]),Sf().includes(n)?O(n,!1):(n="my-issues",O("my-issues",!1));(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function hn(){Ef.set(window.location.href,window.scrollY)}function No(e){hn(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Rc&&Rc(e)}function Af(e){hn(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),jc&&jc(e)}function Cf(){const e=Ef.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{Pc&&Pc(),window.scrollTo(0,e)})}function Bf(){xf||(xf=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Dc&&Dc(e.state)){Cf();return}(t=e.state)!=null&&t.view?O(e.state.view,!1):qc(),Cf()}))}let Zt=0,xi=!1,Us=null,Oo=null,Gs=0;const Hn=new Map;function Ho(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",Zt===0&&!xi),e.textContent=xi?"Stopped":"Offline",e.title=xi?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Xe(e,t){return Hn.has(e)||Hn.set(e,new Set),Hn.get(e).add(t),()=>{var n;return(n=Hn.get(e))==null?void 0:n.delete(t)}}function X_(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const J_=1e3;function Fo(){Oo&&(clearTimeout(Oo),Oo=null)}const eE="chaotic",Nc=4001,tE=4003,nE="chaotic.bearer.";function iE(e){return[eE,nE+e]}function Df(e,{isReconnect:t=!1}={}){Us&&(clearTimeout(Us),Us=null),Fo();const n=jb();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),dl(null)),!t&&(Zt>0||xi)&&(Zt=0,xi=!1,Ho());const i=h.getToken();if(!i)return;const s=++Gs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,iE(i));dl(r);let l=!1;const c=()=>{if(l||s!==Gs)return;l=!0,Fo();const d=Zt>0;d&&$("Live updates reconnected","success"),Zt=0,Ho(),d&&Oc({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Gs&&(console.log("WebSocket connected"),Fo(),Oo=setTimeout(c,J_))},r.onmessage=d=>{if(s!==Gs)return;c();let p;try{p=JSON.parse(d.data)}catch(f){console.error("WebSocket: malformed message",f);return}Oc(p)},r.onclose=d=>{if(s!==Gs)return;console.log("WebSocket disconnected"),Fo();const p=d==null?void 0:d.code;if(p===Nc||p===tE){dl(null),Zt=0;const g=p===Nc&&el()===i;xi=!g,Ho();let b="forbidden";p===Nc&&(b=g?"unauthorized":"superseded"),Oc({type:b,entity:"connection",data:{code:p,teamId:e}});return}Zt++,Zt===1&&$("Live updates disconnected. Reconnecting...","warning"),Ho();const f=X_(Zt-1);Us=setTimeout(()=>{Us=null,T()&&T().id===e&&Df(e,{isReconnect:!0})},f)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function Oc(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Hn.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Hn.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Hn.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const sE={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device",children_closed:"Nothing left open"};let Si=0,Mt=!1,xe=null,vn=null;const Ii=new Set,zs=new Map,Rt=new Map,ht=new Map;function Mf(e){Rt.get(e)===null&&Rt.set(e,Si)}function Hc(e){const t=ht.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=Si)}function aE(e){return e.filter(t=>!Rt.has(t.id)).map(t=>{const n=ht.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Mt&&ht.has(t.id)&&t.id!==xe))}function oE(e){for(const[t,n]of Rt)n!==null&&e>n&&Rt.delete(t);for(const[t,n]of ht)n.confirmedAfter!==null&&e>n.confirmedAfter&&ht.delete(t)}function rE(e,t){t!=null&&t.id&&(e==="archived"?(Rt.has(t.id)||Rt.set(t.id,null),Mf(t.id)):e==="read"&&Hc(t.id))}async function Li(){const e=T();if(e){try{const t=await h.getInboxUnreadCount(e.id);us(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}Vs()}}function Vs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=Pa();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0);const n=document.getElementById("inbox-header-count");n&&(n.textContent=t>0?`${t} unread`:"")}async function Ws({focusFirst:e=!1,background:t=!1}={}){const n=T();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++Si;t||(vn={focusFirst:e||!!(vn!=null&&vn.focusFirst)},xe=null,lE(i));try{const a=await h.getInbox(n.id,{unread:Mt,limit:100});if(s!==Si)return;const o=new Set(Rt.keys());oE(s);const r=aE(a||[]),l=vn;vn=null,l?(Vt(r),Ys(),l.focusFirst&&!ze()&&uE()):cE(r,o)}catch(a){if(s!==Si)return;vn?(vn=null,i.innerHTML=V({icon:U.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),k("load inbox",a)):console.error("Failed to refresh inbox:",a)}Li()}function lE(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function Uo(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Rf(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function jf(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Pf(e,t){if(!e)return;const n=Uo(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Rf(n||t)),i==null||i.focus({preventScroll:!0})}function cE(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=he(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,l=jf(),c=window.scrollY,d=n.scrollTop;let p=e;if(xe&&!e.some(b=>b.id===xe)){const b=i.find(y=>y.id===xe);if(b&&Mt&&!t.has(xe)){p=[...e];const y=p.findIndex(_=>_.created_at<b.created_at);p.splice(y===-1?p.length:y,0,b)}else xe=null}Vt(p),Ys();let f=-1;o&&(f=p.findIndex(b=>b.id===o),f===-1&&p.length&&(f=Math.min(r,p.length-1))),f>=0?Ks(f,{focus:!1}):ja(-1);const g=f>=0?n.querySelectorAll(".inbox-row")[f]:null;Pf(l,g),n.scrollTop!==d&&(n.scrollTop=d),window.scrollY!==c&&window.scrollTo(0,c)}function dE(e,t){if(!(t!=null&&t.id))return!1;const n=he().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function Ti(e){const t=he();for(const n of new Set(e)){const i=Uo(n),s=t.find(l=>l.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?jf():null,o=document.createElement("template");o.innerHTML=Ff(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Pf(a,r)}}function Ks(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){ja(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),ja(i),t&&Rf(n[i]).focus({preventScroll:!0})}function uE(){Ks(0)}async function Fc(e){const t=he(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;xe===e&&(xe=null),zs.delete(e),Rt.set(e,null),Vt(t.filter(a=>a.id!==e)),s&&us(Math.max(0,Pa()-1)),Ys(),Vs(),Ks(n,{focus:!ze()});try{await h.archiveInbox(e),Mf(e)}catch(a){Rt.delete(e),console.error("Failed to archive inbox entry:",a)}}function qf(e){var s,a;const n=he().findIndex(o=>o.id===e);if(n===-1)return;const i=xe;xe=i===e?null:e,xe===e&&Nf(e),Ti([i,e]),Ks(n),xe===e&&((a=(s=Uo(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function Nf(e){const t=he(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,ht.set(e,{readAt:i,confirmedAfter:null}),Vt([...t]),us(Math.max(0,Pa()-1)),Vs(),h.markInboxRead(e).then(()=>Hc(e),s=>{var o;((o=ht.get(e))==null?void 0:o.readAt)===i&&ht.delete(e);const a=he().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,Vt([...he()]),Ti([e])),Li(),k("mark inbox entry read",s)})}function pE(e){var i;const n=he().findIndex(s=>s.id===e);if(n!==-1){if(Nf(e),Mt)xe===e&&(xe=null),Vt(he().filter(s=>s.id!==e)),Ys(),Ks(n);else if(Ti([e]),!document.activeElement||document.activeElement===document.body){const s=Uo(e);(i=s==null?void 0:s.querySelector(".inbox-row-toggle"))==null||i.focus({preventScroll:!0})}}}function mE(){if(xe===null)return!1;const e=xe;return xe=null,Ti([e]),!0}function Of(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}function fE(e){if(Ii.has(e))return;const t=he().find(d=>d.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender",i=t.issue_identifier||"this ticket",s=zs.get(e)||"",a=s?`Already posted on ${u(i)}. Submitting reassigns it to ${u(n)} without posting it again, unless you change it.`:`Posted on ${u(i)} before it is reassigned, so ${u(n)} knows why.`;document.getElementById("modal-title").textContent=`Reassign ${i} back to ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="inbox-reassign-form" class="inbox-reassign-form" novalidate>
            <div class="form-group">
                <label for="inbox-reassign-comment">Comment for ${u(n)}</label>
                <textarea id="inbox-reassign-comment" rows="4" required
                    aria-describedby="inbox-reassign-help"
                    placeholder="Why is this coming back, and what should happen next?">${u(s)}</textarea>
                <p class="form-help" id="inbox-reassign-help">${a}</p>
                <p class="form-error hidden" id="inbox-reassign-error" role="alert">Add a comment first.</p>
            </div>
            <div class="inbox-reassign-actions">
                <button type="button" class="btn btn-secondary" data-action="close-inbox-reassign">Cancel</button>
                <button type="submit" class="btn btn-primary" id="inbox-reassign-submit">Comment and reassign</button>
            </div>
        </form>
    `;const o=document.getElementById("inbox-reassign-form"),r=document.getElementById("inbox-reassign-comment"),l=document.getElementById("inbox-reassign-error");r.addEventListener("input",()=>{r.value.trim()&&l.classList.add("hidden")}),r.addEventListener("keydown",d=>{d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{cancelable:!0})))});let c=!1;o.addEventListener("submit",async d=>{var y;if(d.preventDefault(),c)return;if(!he().some(_=>_.id===e)){$(`That inbox item is gone, so ${i} was not reassigned.`,"warning"),o.isConnected&&F();return}const p=r.value.trim();if(!p){l.classList.remove("hidden"),r.focus();return}const f=document.getElementById("inbox-reassign-submit");c=!0,f&&(f.disabled=!0);const g=await gE(e,p);c=!1;const b=o.isConnected&&ze();if(g){if(b&&(F(),!document.activeElement||document.activeElement===document.body)){const _=document.querySelector("#inbox-list .inbox-row.keyboard-selected");(y=_==null?void 0:_.querySelector(".inbox-row-toggle"))==null||y.focus({preventScroll:!0})}}else f&&f.isConnected&&(f.disabled=!1)}),G()}async function gE(e,t){if(Ii.has(e))return!1;const n=he().find(r=>r.id===e);if(!n||!n.issue_id||!n.source_user_id)return!1;const i=typeof t=="string"?t.trim():"";if(!i)return!1;const s=n.source_user_name||"sender",a=n.issue_identifier||"issue";Ii.add(e),Of(e,!0);const o=(r,l)=>(Ii.delete(e),Of(e,!1),k(r,l),!1);if(zs.get(e)!==i){let r;try{r=await h.createComment(n.issue_id,i)}catch(l){return o(`comment on ${a}`,l)}zs.set(e,i),Da(r)}try{await h.updateIssue(n.issue_id,{assignee_id:n.source_user_id})}catch(r){return o(`reassign ${a} back to ${s}`,r)}return Ii.delete(e),zs.delete(e),Fc(e),!0}function hE(){Hf(!Mt)}function Hf(e){e!==Mt&&(Mt=e,document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(t=>{const n=t.dataset.filter==="unread"===Mt;t.classList.toggle("active",n),t.setAttribute("aria-pressed",n?"true":"false")}),Ws({focusFirst:!0}))}const vE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>',bE='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';function yE(e){const t=[...(e||"").trim()][0];return t?t.toUpperCase():"•"}function Ff(e){const t=!e.read_at,n=e.id===xe,i=sE[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${m(e.id)}"`,e.issue_id?`data-issue-id="${m(e.issue_id)}"`:"",e.document_id?`data-document-id="${m(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
        <div class="inbox-row${t?" inbox-row-unread":""}${n?" inbox-row-expanded":""}"
             ${a}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${m(e.id)}"
                        aria-expanded="${n?"true":"false"}"${n?` aria-controls="${m(o)}"`:""}>
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':'<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${u(yE(e.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${m(e.kind)}">${u(i)}</span>
                        ${s?`<span class="inbox-row-source">${u(s)}</span>`:""}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${u(e.title)}</span>
                        ${!n&&e.body?`<span class="inbox-row-body">${u(e.body)}</span>`:""}
                    </span>
                </button>
                ${n?wE(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${t?`<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${m(e.id)}" title="Mark read" aria-label="Mark read">${vE}</button>`:""}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${m(e.id)}" title="Archive (e)" aria-label="Archive">${bE}</button>
                </span>
                <span class="inbox-row-time">${u(qs(e.created_at))}</span>
            </div>
        </div>
    `}function wE(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${u(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${m(e.id)}"${Ii.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${u(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${m(e.id)}"
                    ${e.issue_id?`data-issue-id="${m(e.issue_id)}"`:""}
                    ${e.document_id?`data-document-id="${m(e.document_id)}"`:""}>${o}</button>`:"",`<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${m(e.id)}">Archive</button>`].filter(Boolean).join("");return`
        <div class="inbox-row-expanded-panel" id="${m(n)}" role="region"
             aria-label="${m(e.title)}">
            ${a?`<div class="inbox-expanded-source">from ${u(a)}</div>`:""}
            ${e.body?`<div class="inbox-expanded-body">${u(e.body)}</div>`:""}
            <div class="inbox-action-bar">${r}</div>
        </div>
    `}function Ys(){const e=document.getElementById("inbox-list");if(!e)return;const t=he();if(t.length===0){e.innerHTML=V({icon:U.inbox,heading:Mt?"No unread items":"Inbox zero",description:Mt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=kE(t)}function $E(e,t=new Date){const n=new Date(e);if(Number.isNaN(n.getTime()))return"Older";const i=a=>new Date(a.getFullYear(),a.getMonth(),a.getDate()).getTime(),s=Math.round((i(t)-i(n))/864e5);return s<=0?"Today":s===1?"Yesterday":s<7?"Last 7 days":"Older"}function kE(e){const t=[];for(const n of e){const i=$E(n.created_at),s=t[t.length-1];s&&s.label===i?s.entries.push(n):t.push({label:i,entries:[n]})}return t.map((n,i)=>`
        <section class="inbox-group" aria-labelledby="inbox-group-${i}">
            <h3 class="inbox-group-header" id="inbox-group-${i}">${u(n.label)}</h3>
            ${n.entries.map(s=>Ff(s)).join("")}
        </section>
    `).join("")}async function _E(e){var s;const t=he().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();ht.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=ht.get(e))==null?void 0:s.readAt)===n&&ht.delete(e);const o=he().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,Vt([...he()]),Ti([e])),console.error("Failed to mark inbox entry read:",a);return}Hc(e);const i=he().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,Vt([...he()]),us(Math.max(0,Pa()-1)),Vs(),Ti([e])):Li()}async function EE(){const e=T();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of he())n.read_at||ht.set(n.id,{readAt:t,confirmedAfter:Si});Vt(he().map(n=>({...n,read_at:n.read_at||t}))),us(0),Vs(),Ys()}catch(t){k("mark all inbox entries read",t)}}function xE(e){e.entryId&&_E(e.entryId),e.issueId?re(e.issueId):e.documentId&&Be(e.documentId)}function SE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Fc(e.dataset.entryId)}function IE(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&qf(e.dataset.entryId)}const LE='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function TE(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(LE);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function AE(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}ae({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&AE((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||TE(e.target,n)||(e.preventDefault(),t.entryId&&qf(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),xE(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&fE(t.entryId)},"close-inbox-reassign":e=>{e.preventDefault(),F()},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&Fc(t.entryId)},"toggle-inbox-unread-filter":()=>hE(),"set-inbox-filter":(e,t)=>Hf(t.filter==="unread"),"mark-inbox-read":(e,t)=>{e.preventDefault(),t.entryId&&pE(t.entryId)},"mark-all-inbox-read":()=>EE(),"retry-load-inbox":()=>Ws({focusFirst:!0})});let Qs=[],Ai=[],Fn=[];function Uc(){return Qs}function Uf(e){Qs=Array.isArray(e)?e:[],Gf()}function jt(){return Ai}async function Go(e=null){try{Qs=await(e||h.getMyTeams()),Gf()}catch(t){k("load teams",t)}}function Gf(){const e=document.getElementById("team-list");Qs.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Qs.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${m(JSON.stringify(t))}">${u(t.name)}</button>
        `).join("")}async function zo(e,t=!1,{seed:n=null}={}){Un=null,Zn(e),Kf(),document.getElementById("current-team-name").textContent=e.name;const i=document.getElementById("mobile-team-name");i&&(i.textContent=e.name);const s=document.getElementById("team-description-text");if(s&&(s.textContent=e.description||""),document.getElementById("team-dropdown").classList.add("hidden"),Df(e.id),n&&BE(n)){let a=!1;try{DE(n),Un=e.id,t?qc():O(C()||"my-issues"),a=!0}catch(o){console.error("Failed to paint from the boot cache:",o),Un=null}if(a){zf(e).catch(o=>console.error("Failed to refresh team data:",o));return}}await zf(e),t?qc():O(C()||"my-issues")}let Un=null;function CE(){var e;return Un&&Un===((e=T())==null?void 0:e.id)?Un:null}async function zf(e){var t;await Promise.all([gt(),ZE(),RE(),s$(),Li()]),((t=T())==null?void 0:t.id)===e.id&&(Un=e.id)}function BE(e){const t=new URLSearchParams(window.location.search).get("project");return!t||Array.isArray(e.projects)&&e.projects.some(n=>n.id===t)}function DE(e){L_(Array.isArray(e.projects)?e.projects:[]),gf(),ff(),ds(Array.isArray(e.labels)?e.labels:[]),Ai=Array.isArray(e.members)?e.members:[],n$(e.agents),ms(jt,mt),Jn(),Qb(e.issues)}function Vf(){document.getElementById("team-dropdown").classList.toggle("hidden")}function ME(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function RE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getTeamMembers(e);if(((n=T())==null?void 0:n.id)!==e)return;Ai=i,ms(jt,mt),Jn()}catch(i){console.error("Failed to load team members:",i),k("load team members",i)}}function jE(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Gc=0;async function Wf(){var n,i;const e=(n=T())==null?void 0:n.id;if(!e)return;const t=++Gc;try{const s=await h.getTeamMembers(e);if(t!==Gc||((i=T())==null?void 0:i.id)!==e)return;Ai=s,ms(jt,mt),Jn()}catch(s){if(t!==Gc)return;Ai=[],k("load team members",s)}PE()}function Ci(){var n;const e=(n=me())==null?void 0:n.id,t=Ai.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function PE(){var t;const e=Ci();for(const n of["invite-member-btn","edit-team-btn"])(t=document.getElementById(n))==null||t.classList.toggle("hidden",!e)}let Vo=0;async function Wo(){var i;if(!T())return;const e=++Vo,t=T().id,n=document.getElementById("team-invitations-list");n&&(n.innerHTML=jE());try{const s=await h.getTeamInvitations(t);if(e!==Vo||((i=T())==null?void 0:i.id)!==t)return;Fn=s,zc()}catch(s){if(e!==Vo)return;if((s==null?void 0:s.status)===403){Fn=[],zc();return}console.error("Failed to load team invitations:",s),Yf(!0),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Kf(){Vo++,Fn=[],zc()}function Yf(e){var t;(t=document.getElementById("people-invitations"))==null||t.classList.toggle("hidden",!e)}function zc(){const e=document.getElementById("team-invitations-list");if(!e)return;const t=document.getElementById("people-invitations-count");if(t&&(t.textContent=String(Fn.length)),Yf(Fn.length>0),Fn.length===0){e.innerHTML="";return}const n=Ci();e.innerHTML=Fn.map(i=>`
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
    `).join("")}function Qf(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,G()}async function qE(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{const i=await h.createInvitation(T().id,t,n);if(await Wo(),i&&i.accept_url)return HE(t,OE(i.accept_url),i.email_queued===!0),!1;F(),$("Invitation created. An email was queued; delivery isn't confirmed.","info")}catch(i){NE(i)?$(`${i.message} Its Cancel button is under Pending Invitations.`,"error"):k("send invitation",i)}return!1}function NE(e){if((e==null?void 0:e.status)!==409)return!1;const t=e.detail;return t&&typeof t=="object"?t.error_code==="invitation_pending":typeof t=="string"&&t.includes("pending invitation")}function Zf(e){let t=String(e??"").trim();if(!t||/[/?#@\\\s%]/.test(t))return!1;t.includes(":")&&!t.startsWith("[")&&(t=`[${t}]`);let n;try{n=new URL(`http://${t}/`).hostname}catch{return!1}return n=n.replace(/\.$/,""),n==="localhost"||n.endsWith(".localhost")||/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(n)||n==="0.0.0.0"?!0:/^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(n)}function OE(e,t=window.location.origin){let n,i;try{n=new URL(e),i=new URL(t)}catch{return e}return!Zf(n.hostname)||Zf(i.hostname)?e:i.origin+n.pathname}function HE(e,t,n=!1){var a;const i=u(e),s=n?`An email was queued to ${i}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`:`This server does not send email: send this link to ${i} yourself. You won't be able to see it again.`;document.getElementById("modal-title").textContent="Invitation Created",document.getElementById("modal-content").innerHTML=`
        <div class="api-key-created">
            <p class="warning-text">${s}</p>
            <div class="api-key-display">
                <code id="invite-link">${u(t)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `,ze()||G(),(a=document.querySelector('[data-action="copy-invite-link"]'))==null||a.focus(),Xf()}function Xf(e="invite-link"){const t=document.getElementById("modal-overlay");if(!t||typeof MutationObserver>"u")return;const n=new MutationObserver(()=>{if(!t.classList.contains("hidden"))return;n.disconnect(),document.getElementById(e)&&(document.getElementById("modal-content").innerHTML="")});n.observe(t,{attributes:!0,attributeFilter:["class"]})}async function FE(){const e=document.getElementById("invite-link");if(e)try{await navigator.clipboard.writeText(e.textContent),$("Invitation link copied","success")}catch{const t=document.createRange();t.selectNodeContents(e);const n=window.getSelection();n.removeAllRanges(),n.addRange(t),$("Could not copy: the link is selected, copy it by hand","error")}}async function UE(e){let t;try{t=await h.issueInvitationVerificationCode(T().id,e)}catch(n){k("get a verification code",n);return}zE(t)}function GE(e,t){const n=new Date(e).getTime(),i=new Date(t).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"invitation time unknown";const s=Math.abs(n-i)/1e3;let a;return s<3600?a=`${Math.max(1,Math.round(s/60))} min`:s<2*86400?a=`${Math.round(s/3600)} h`:a=`${Math.round(s/86400)} days`,`${a} ${n>=i?"after":"before"} the invitation was created`}function zE(e){const t=(e==null?void 0:e.account)||{},n=t.created_at?new Date(t.created_at).toLocaleString():"",i=GE(t.created_at,e==null?void 0:e.invitation_created_at),s=e!=null&&e.expires_at?new Date(e.expires_at).toLocaleTimeString():"";document.getElementById("modal-title").textContent="Invitation Code",document.getElementById("modal-content").innerHTML=`
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
    `,ze()||G(),Xf("invitation-code")}async function VE(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(T().id,e),await Wf(),$("Member removed!","success"),window.dispatchEvent(new CustomEvent("chaotic:member-removed",{detail:{userId:e}}))}catch(t){k("remove member",t)}}async function WE(e){try{await h.deleteInvitation(T().id,e),await Wo(),$("Invitation canceled!","success")}catch(t){k("cancel invitation",t)}}function Jf(){Vf(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,G()}function KE(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,G())}async function YE(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await Go(),await zo(n),F(),$("Team created!","success")}catch(n){k("create team",n)}return!1}async function QE(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(T().id,t);Zn(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||""),await Go(),F(),$("Team updated!","success")}catch(n){k("update team",n)}return!1}async function ZE(){var t,n;const e=(t=T())==null?void 0:t.id;if(e)try{const i=await h.getLabels(e);if(((n=T())==null?void 0:n.id)!==e)return;ds(i)}catch(i){console.error("Failed to load labels:",i),k("load labels",i)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),ae({"select-team":(e,t)=>{zo(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{e!=null&&e.type&&e.type!=="click"||VE(t.userId)},"delete-invitation":(e,t)=>{e!=null&&e.type&&e.type!=="click"||WE(t.invitationId)},"issue-invitation-code":(e,t)=>{e!=null&&e.type&&e.type!=="click"||UE(t.invitationId)},"retry-load-team-invitations":()=>{Wo()},"invite-member":e=>{qE(e)},"copy-invite-link":()=>{FE()},"dismiss-invite-link":()=>{F()},"create-team":e=>{YE(e)},"update-team":e=>{QE(e)}});let Pt=null,Xt=0,Bi=null,Di=null,Zs=null,Vc=!1;function XE(){return eb()}function eg(){tb()}function tg(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function JE(){Pt||(Pt=document.createElement("div"),Pt.id="onboarding-overlay",Pt.className="onboarding-overlay",document.getElementById("app").appendChild(Pt))}function Xs(){if(!Pt)return;const e=Vc?ig():ng(),t=e[Xt],n=e.map((i,s)=>`<span class="onboarding-dot${s===Xt?" active":""}${s<Xt?" completed":""}"></span>`).join("");Pt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function ng(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=tg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=tg(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Bi&&(e.textContent=`${Bi.name} (${Bi.key})`),t&&Di&&(t.textContent=`${Di.name} (${Di.key})`),n&&Zs&&(n.textContent=`${Zs.identifier} - ${Zs.title}`)}}]}function ig(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Wc(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Kc(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Mi(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function ex(){const e=Vc?ig():ng();Xt<e.length-1&&(Xt++,Xs())}function tx(){eg(),ag(),Gn()}function nx(){eg(),ag(),Gn()}async function ix(e){e.preventDefault(),Kc("onboarding-team-error"),Mi("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Bi=await h.createTeam({name:t,key:n}),Xt++,Xs()}catch(i){Wc("onboarding-team-error",i.message||"Failed to create team"),Mi("onboarding-team-submit",!1)}}async function sx(e){e.preventDefault(),Kc("onboarding-project-error"),Mi("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Di=await h.createProject(Bi.id,{name:t,key:n}),Xt++,Xs()}catch(i){Wc("onboarding-project-error",i.message||"Failed to create project"),Mi("onboarding-project-submit",!1)}}async function ax(e){e.preventDefault(),Kc("onboarding-issue-error"),Mi("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Zs=await h.createIssue(Di.id,{title:t}),Xt++,Xs()}catch(n){Wc("onboarding-issue-error",n.message||"Failed to create issue"),Mi("onboarding-issue-submit",!1)}}function sg(e=!1){Vc=e,Xt=0,Bi=null,Di=null,Zs=null,JE(),Xs()}function ag(){Pt&&(Pt.remove(),Pt=null)}function og(){nb(),sg(!0)}ae({"onboarding-next":e=>{e.preventDefault(),ex()},"onboarding-skip":e=>{e.preventDefault(),tx()},"onboarding-finish":e=>{e.preventDefault(),nx()},"onboarding-create-team":e=>{ix(e)},"onboarding-create-project":e=>{sx(e)},"onboarding-create-issue":e=>{ax(e)}});const rg="/oauth/consent/";function ox(e){if(!e||!e.startsWith(rg))return null;const t=e.slice(rg.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function rx(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function lx(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function cx(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const lg={builtin:"Built-in sign-in",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function Ko(e){const t=lg[e.trust]||lg.unverified,n=e.host?` · ${u(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${m(e.trust)}">${u(t)}${n}</span>`}function dx(e,t){return e.teams.map(n=>`<option value="${m(n.id)}"${n.id===t?" selected":""}>${u(n.name)}</option>`).join("")}function ux(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${u(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function cg(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${m(i.id)}"${s}>${u(i.name+a)}</option>`)}return n.join("")}function dg(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${m(t.id)}">
            ${u(t.name)} <span class="oauth-muted">${u(t.key)}</span>
        </label>`).join("")}function px(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${m(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${u(t.name)}${u(i)}
        </label>`}).join("")}function mx(e,t){const n=u(t.client.name),i=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${n}</span> as you?</h1>
            <p>${Ko(t.client)}</p>
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
        </div>`}function fx(e,t){if(t.acts_as==="person"){mx(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(l=>l.id===n),s=u(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${u(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${Ko(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${u(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${dx(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${cg(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${m(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${dg(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${px(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,Yc(e,t)}function Yc(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=ux(t.teams.find(l=>l.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function gx(e){if(e.querySelector(".oauth-app-sign-in-form"))return{policy:"write"};const n=e.querySelector("#oauth-agent").value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function hx(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Js(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${u(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function vx(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function bx(e,t,n,i){var r,l,c;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{const d=n.teams.find(p=>p.id===s.value);e.querySelector("#oauth-agent").innerHTML=cg(d,null),e.querySelector("#oauth-projects").innerHTML=dg(d),Yc(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>Yc(e,n));let a=!1;const o=async d=>{if(!a){a=!0;try{const p=d?await h.approveOAuthRequest(t,gx(e)):await h.denyOAuthRequest(t);if(!rx(p.redirect)){Js(e,"The app's return address isn't one a browser should be sent to.");return}i(p.redirect)}catch(p){if(a=!1,p&&p.status===404){Js(e,"It has expired, was already answered, or belongs to someone else.");return}hx(e,p&&p.message||"Something went wrong")}}};(l=e.querySelector("#oauth-consent-form"))==null||l.addEventListener("submit",d=>{d.preventDefault(),o(!0)}),(c=e.querySelector("#oauth-deny"))==null||c.addEventListener("click",()=>o(!1))}async function yx(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=lx();cx(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?Js(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?vx(i,n):a&&a.status===403?Js(i,"Only a person signed in to Chaotic can approve an app."):Js(i,a&&a.message||"Something went wrong");return}fx(i,s),bx(i,e,s,t)}const Qc="/invite/",ea="/invite",Zc="chaotic.inviteToken",ug="invite-auth-notice";let Xc=null;const wx="This invitation is no longer valid.",$x={owner:"an owner",admin:"an admin",member:"a member"};function kx(e){if(!e||!e.startsWith(Qc))return null;const t=e.slice(Qc.length).replace(/\/$/,"");return/^[A-Za-z0-9_-]{16,128}$/.test(t)?t:null}function pg(){const{pathname:e}=window.location,t=kx(e);if(t){Xc=t;try{sessionStorage.setItem(Zc,t)}catch{}return history.replaceState(null,"",ea),t}if(!mg(e))return null;let n=null;try{n=sessionStorage.getItem(Zc)}catch{}const i=n||Xc;return i&&/^[A-Za-z0-9_-]{16,128}$/.test(i)?i:null}function mg(e){return e===ea||e===`${ea}/`}function fg(e){return mg(e)||!!(e&&e.startsWith(Qc))}function Jc(){Xc=null;try{sessionStorage.removeItem(Zc)}catch{}}function _x(e){const t=e||"",n=t.indexOf("@"),i=n===-1?"":t.slice(0,n),s=n===-1?"":t.slice(n+1);return!i||!s?"***":i.length===1?`***@${s}`:`${i[0]}***@${s}`}function Ex(){let e=document.getElementById("invite-screen");return e||(e=document.createElement("div"),e.id="invite-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function ed(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}function gg(){const e=Ex();return Yo(),ed(e),e}function xx(){var e;(e=document.getElementById("invite-screen"))==null||e.classList.add("hidden"),Yo()}function Yo(){var e;(e=document.getElementById(ug))==null||e.remove()}function td(e){const t=e.invited_by_name?`<strong>${u(e.invited_by_name)}</strong> invited you to join`:"You have been invited to join",n=$x[e.role]||`a ${u(e.role)}`;return`
        <p class="invite-lead">${t}</p>
        <h1 class="invite-team">${u(e.team_name)}</h1>
        <p>on Chaotic, as ${n}.</p>
        <p class="invite-muted">Sent to <strong>${u(e.email_hint)}</strong>${Sx(e)}</p>`}function Sx(e){const t=new Date(e.expires_at);if(Number.isNaN(t.getTime()))return"";const n=t.toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"});return` · expires ${u(n)}`}const Ix="Ask whoever invited you to send a new invitation.",Lx="Reload the page to try again.";function nd(e,t=wx,n=Ix){e.innerHTML=`
        <div class="invite-page">
            <h1>${u(t)}</h1>
            <p class="invite-muted">${u(n)}</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function Tx(e){e.innerHTML=`
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page doesn't have an invitation to show. Open the link in your
                invitation email again, all of it if it was split across lines.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`}function hg(){window.location.pathname!==ea&&history.replaceState(null,"",ea),Tx(gg())}function Ax(e,t){e.innerHTML=`
        <div class="invite-page">
            ${td(t)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`}function Cx(e,t,n){const i=_x(n.email).toLowerCase()!==String(t.email_hint||"").toLowerCase(),s=`<p class="invite-muted">Signed in as <strong>${u(n.email)}</strong></p>`;if(i){e.innerHTML=`
            <div class="invite-page">
                ${td(t)}
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
            ${td(t)}
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
        </div>`}function Bx(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function Dx(e,{onVerified:t,signOut:n}){const i=e.querySelector("#invite-verify"),s=e.querySelector("#invite-send-code"),a=e.querySelector("#invite-code-form"),o=e.querySelector("#invite-code"),r=e.querySelector("#invite-confirm-code"),l=e.querySelector("#invite-verify-status"),c=p=>{l.textContent=p,l.classList.remove("hidden")},d=()=>{var p;a.classList.remove("hidden"),(p=o.focus)==null||p.call(o)};s.addEventListener("click",async()=>{if(!s.disabled){s.disabled=!0;try{const p=await h.requestEmailVerification(),f=Bx(p.expires_at);c(`We sent a code to ${p.email}${f?`; it works until ${f}`:""}.`),s.textContent="Send a new code",d()}catch(p){const f=p&&p.detail&&p.detail.error_code;if(p&&p.status===401){n();return}if(f==="email_already_verified"){t();return}c(p&&p.message||"Something went wrong"),p&&p.status===429&&d()}finally{s.disabled=!1}}}),a.addEventListener("submit",async p=>{var g;if(p.preventDefault(),r.disabled)return;const f=o.value.trim();if(f){r.disabled=!0;try{await h.confirmEmailVerification(f)}catch(b){r.disabled=!1;const y=b&&b.detail&&b.detail.error_code;b&&b.status===401?n():y==="email_already_verified"?t():(c(b&&b.message||"Something went wrong"),(g=o.select)==null||g.call(o));return}r.disabled=!1,i.classList.add("hidden"),t()}})}function Mx(e,t){Yo();const n=document.querySelector("#auth-screen .auth-container");if(!n)return;const i=document.createElement("div");i.id=ug,i.className="invite-auth-notice",i.innerHTML=`
        <p>Sign in or create an account to join <strong>${u(e.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${u(e.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`,n.insertBefore(i,n.firstChild),i.querySelector("#invite-back").addEventListener("click",s=>{s.preventDefault(),Yo(),t()})}function Qo(e,t){const n=e.querySelector("#invite-error");n&&(n.textContent=t,n.classList.remove("hidden"))}async function Rx(e,{user:t=null,showAuth:n,enterTeam:i,signOut:s}={}){var d,p;const a=gg();a.innerHTML='<div class="invite-page"><p>Loading invitation…</p></div>';let o;try{o=await h.getInvitation(e)}catch(f){f&&f.status===404?(Jc(),nd(a)):nd(a,f&&f.message||"Something went wrong.",Lx);return}if(!t){Ax(a,o);const f=g=>{Mx(o,()=>ed(a)),n(g)};a.querySelector("#invite-sign-in").addEventListener("click",()=>f("login")),a.querySelector("#invite-sign-up").addEventListener("click",()=>f("signup"));return}Cx(a,o,t),(d=a.querySelector("#invite-sign-out"))==null||d.addEventListener("click",()=>s());const r=a.querySelector("#invite-accept");if(!r)return;let l=!1;const c=async f=>{var b,y;if(l)return;l=!0,r.disabled=!0;let g;try{g=f===void 0?await h.acceptInvitation(e):await h.acceptInvitation(e,f)}catch(_){l=!1,r.disabled=!1;const E=_&&_.detail&&_.detail.error_code;if(f!==void 0&&(E==="invalid_verification_code"||E==="invitation_code_expired"||_&&_.status===429)){Qo(a,_&&_.message||"That code did not work."),(y=(b=a.querySelector("#invite-admin-code"))==null?void 0:b.select)==null||y.call(b);return}_&&_.status===401?s():_&&(_.status===404||_.status===400)?(Jc(),nd(a)):_&&_.status===403&&_.detail&&_.detail.error_code==="email_unverified"?(Qo(a,"Verify your email address to continue."),a.querySelector("#invite-accept-actions").classList.add("hidden"),a.querySelector("#invite-verify").classList.remove("hidden")):_&&_.status===403?Qo(a,`This invitation is for a different email address. Only ${o.email_hint} can accept it.`):Qo(a,_&&_.message||"Something went wrong");return}Jc(),vg(a,o);try{await i(g.team_id,o.team_name)}catch(_){console.error("Joined the team but could not open it:",_),ed(a),vg(a,o)}};r.addEventListener("click",()=>c()),(p=a.querySelector("#invite-admin-code-form"))==null||p.addEventListener("submit",f=>{f.preventDefault();const g=a.querySelector("#invite-admin-code").value.trim();g&&c(g)}),Dx(a,{onVerified:()=>{a.querySelector("#invite-verify").classList.add("hidden"),a.querySelector("#invite-error").classList.add("hidden"),a.querySelector("#invite-accept-actions").classList.remove("hidden"),c()},signOut:s})}function vg(e,t){e.innerHTML=`
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${u(t.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${u(t.team_name)}</a>
            </div>
        </div>`}function id(e){return Rx(e,{user:me(),showAuth:t=>{ia(),t==="signup"?kg():$g()},enterTeam:async(t,n)=>{history.replaceState(null,"","/"),xx(),await Gn({teamId:t}),$(`You joined ${n}`,"success")},signOut:()=>{h.logout(),It(null),Zn(null),id(e)}})}async function bg(){const e=pg();if(e){await id(e);return}if(fg(window.location.pathname)){hg();return}ia()}async function Gn({teamId:e,teamsRequest:t=null,snapshot:n=null}={}){var r,l;const i=ox(window.location.pathname);if(i){await yx(i);return}const s=pg();if(s){await id(s);return}if(fg(window.location.pathname)){hg();return}Ux(),Tf(),Zo(),Ox();const a=!e&&((l=(r=n==null?void 0:n.teams)==null?void 0:r.find)==null?void 0:l.call(r,c=>c.id===n.teamId));if(a){await jx(n,a,t);return}await Go(t);const o=Uc();if(o.length===0&&!XE()){sg();return}o.length===0&&ls("my-issues");try{if(o.length>0){const c=e&&o.find(d=>d.id===e)||o[0];await zo(c,!0)}}finally{Bf()}}async function jx(e,t,n){Uf(e.teams);try{await zo(t,!0,{seed:e})}finally{Bf()}Promise.resolve(n||Go().then(Uc)).then(async i=>{var a;if(!Array.isArray(i))return;Uf(i);const s=i.find(o=>o.id===t.id);if(!s){await qx(),window.location.reload();return}if(((a=T())==null?void 0:a.id)===s.id&&s.name!==T().name){Zn(s);const o=document.getElementById("current-team-name");o&&(o.textContent=s.name)}},i=>console.error("Failed to refresh teams:",i))}const Px=2e3;let Ri=null,yg=!1,wg=!1;function qx(){return wg=!0,clearTimeout(Ri),Ri=null,sl()}function sd(){if(clearTimeout(Ri),Ri=null,wg)return Promise.resolve();const e=me(),t=T();return!(e!=null&&e.id)||!(t!=null&&t.id)||qu(el())!==e.id||CE()!==t.id?Promise.resolve():bb(e.id,{user:e,teams:Uc(),teamId:t.id,projects:te(),labels:ll(),members:jt(),agents:mt(),issues:Yb({maxQueries:3})})}function Nx(){clearTimeout(Ri),Ri=setTimeout(sd,Px)}function Ox(){yg||(yg=!0,Ub(Nx),document.addEventListener("visibilitychange",Hx),window.addEventListener("pagehide",Fx))}function Hx(){document.visibilityState==="hidden"&&sd()}function Fx(){sd()}let ji=null,ta=null,$t=null,kt=null;function na(){ji||(ji=document.getElementById("auth-screen"),ta=document.getElementById("main-screen"),$t=document.getElementById("login-form"),kt=document.getElementById("signup-form"))}function ia(){na(),ji&&ji.classList.remove("hidden"),ta&&ta.classList.add("hidden")}function Ux(){na(),ji&&ji.classList.add("hidden"),ta&&ta.classList.remove("hidden")}function $g(){na(),$t&&$t.classList.remove("hidden"),kt&&kt.classList.add("hidden")}function kg(){na(),$t&&$t.classList.add("hidden"),kt&&kt.classList.remove("hidden")}async function Gx(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),It(await h.getMe()),await Gn(),$("Welcome back!","success")}catch(i){k("log in",i)}return!1}async function zx(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),It(await h.getMe()),await Gn(),$("Account created successfully!","success")}catch(s){k("sign up",s)}return!1}function _g(){h.logout(),It(null),Zn(null),ia(),$("Signed out","success")}function Vx(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")||/^\/api\/avatars\/[0-9a-f]{64}$/.test(e))}function Zo(){var i;const e=me();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Hu(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Vx(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${m(s)}" alt="${m(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Wx(){na();const e=$t==null?void 0:$t.querySelector("form");e&&e.addEventListener("submit",s=>Gx(s));const t=kt==null?void 0:kt.querySelector("form");t&&t.addEventListener("submit",s=>zx(s));const n=$t==null?void 0:$t.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),kg()});const i=kt==null?void 0:kt.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),$g()})}let ad=[];async function od(){try{ad=await h.getApiKeys(),Kx()}catch(e){k("load API keys",e)}}function Kx(){const e=document.getElementById("api-keys-list");if(e){if(ad.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=ad.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${u(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${u(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${Ie(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ie(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${m(t.id)}" data-key-name="${m(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function Yx(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,G()}async function Qx(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);F(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,G()}catch(n){k("create API key",n)}return!1}async function Zx(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),$("API key copied to clipboard","success")}catch{$("Failed to copy","error")}}async function Xx(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),$("API key revoked","success"),await od()}catch(n){k("revoke API key",n)}}ae({"create-api-key":e=>{Qx(e)},"copy-api-key":()=>{Zx()},"dismiss-api-key-modal":()=>{F(),od()},"revoke-api-key":(e,t)=>{Xx(t.keyId,t.keyName)}});let rd=[];async function Eg(){try{rd=await h.getConnections(),eS()}catch(e){k("load connected apps",e)}}function ld(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function Jx(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function eS(){const e=document.getElementById("connected-apps-list");if(e){if(rd.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=rd.map(t=>t.acts_as==="person"?tS(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(ld(t))} ${Ko(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${u(t.agent?t.agent.name:"an agent")}</span>
                    <span>${u(Jx(t))}</span>
                    <span>policy ${u(t.policy)}</span>
                    <span class="api-key-date">Connected ${Ie(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${Ie(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${u(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(t.id)}" data-connection-name="${m(ld(t))}">Disconnect</button>
        </div>
    `).join("")}}function tS(e){const n=`${e.device_name||"A device"} · ${ld(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${u(n)} ${Ko(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>every team you belong to</span>
                    <span class="api-key-date">Signed in ${Ie(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${Ie(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${m(e.id)}" data-connection-name="${m(n)}">Sign out</button>
        </div>
    `}async function xg(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),$("App disconnected","success"),await Eg()}catch(n){k("disconnect app",n)}}ae({"revoke-connection":(e,t)=>{xg(t.connectionId,t.connectionName)}});let cd=[];async function Sg(){try{cd=await h.getPushDevices(),nS()}catch(e){k("load push devices",e)}}const Ig={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function Lg(e){return e.label||e.platform||"Unnamed device"}function nS(){const e=document.getElementById("push-devices-list");if(e){if(cd.length===0){e.innerHTML=V({icon:U.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=cd.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${u(Lg(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${u(t.platform)}</span>`:""}
                    <span>via ${u(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${Ie(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${Ie(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${u(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Ig[t.status]?`<span class="push-device-status">${u(Ig[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${m(t.installation_id)}" data-device-name="${m(Lg(t))}">Remove</button>
        </div>
    `).join("")}}async function iS(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),$("Device removed","success"),await Sg()}catch(n){k("remove push device",n)}}ae({"remove-push-device":(e,t)=>{iS(t.installationId,t.deviceName)}});let Xo=!1,Jt=0,bn=[],Jo=[];function sS(e){Jo=e,bn=[...e]}function yn(){return Xo}function aS(){if(Xo)return;Xo=!0,Jt=0,bn=[...Jo];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&er()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>oS(n.target.value)),t.addEventListener("keydown",lS),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&rS(Number(i.dataset.commandIndex))}),sa(),requestAnimationFrame(()=>t.focus())}function er(){Xo=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function oS(e){const t=e.toLowerCase().trim();t?bn=Jo.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):bn=[...Jo],Jt=0,sa()}function sa(){const e=document.getElementById("command-results");if(!e)return;if(bn.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};bn.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===Jt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function rS(e){Jt=e,sa()}function Tg(e){const t=bn[e];t&&(er(),t.action())}function lS(e){switch(e.key){case"ArrowDown":e.preventDefault(),Jt=Math.min(Jt+1,bn.length-1),sa();break;case"ArrowUp":e.preventDefault(),Jt=Math.max(Jt-1,0),sa();break;case"Enter":e.preventDefault(),Tg(Jt);break;case"Escape":e.preventDefault(),er();break}}ae({"execute-command":(e,t)=>{Tg(Number(t.commandIndex))}});const cS=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Switch project"},{key:"g p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"People"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function dS(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${u(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${u(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function uS(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${u(e.title)}</h4>
        ${e.shortcuts.map(dS).join("")}
    </div>`}function Ag(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${cS.map(uS).join("")}
        </div>
    `,G()}const tr=100,dd="status!=done,canceled",pS=["created","updated","priority","status","title","estimate"];function Le(e){return e==null?"":u(String(e))}function Cg(e,t,n){return`<a href="/issue/${encodeURIComponent(e)}" data-action="navigate-issue" data-issue-id="${m(t)}">${Le(n)}</a>`}function Bg(e,t){var n;return e[`${t}_name`]||((n=e[t])==null?void 0:n.name)||""}const ud=[{id:"identifier",label:"ID",fixed:!0,render:e=>Cg(e.identifier,e.id,e.identifier)},{id:"title",label:"Title",fixed:!0,render:e=>Cg(e.identifier,e.id,e.title)},{id:"status",label:"Status",render:e=>Le(Te(e.status))},{id:"priority",label:"Priority",render:e=>Le(Ae(e.priority))},{id:"type",label:"Type",render:e=>Le(lt(e.issue_type))},{id:"assignee",label:"Assignee",render:e=>Le(Bg(e,"assignee"))},{id:"creator",label:"Creator",render:e=>Le(Bg(e,"creator"))},{id:"project",label:"Project",render:e=>Le(e.project_key)},{id:"sprint",label:"Sprint",render:e=>Le(e.sprint_name)},{id:"labels",label:"Labels",render:e=>(e.labels||[]).map(t=>{const n=se(t.color);return`<span class="issue-label" style="background: ${n}20; color: ${n}">${Le(t.name)}</span>`}).join(" ")},{id:"estimate",label:"Estimate",render:e=>Le(e.estimate)},{id:"parent",label:"Parent",render:e=>e.parent_identifier?`<a href="/issue/${encodeURIComponent(e.parent_identifier)}" data-action="navigate-issue" data-issue-id="${m(e.parent_id)}">${Le(e.parent_identifier)}</a>`:""},{id:"created",label:"Created",render:e=>Le(Ie(e.created_at))},{id:"updated",label:"Updated",render:e=>Le(Ie(e.updated_at))},{id:"completed",label:"Completed",render:e=>Le(Ie(e.completed_at))},{id:"due",label:"Due",render:e=>Le(Ie(e.due_date))}],nr=Object.fromEntries(ud.map(e=>[e.id,e])),mS=ud.filter(e=>e.fixed).map(e=>e.id),pd=["identifier","title","status","priority","assignee","updated"];function md(e){const t=new Set,n=[];for(const s of e||[]){const a=String(s).trim();!nr[a]||t.has(a)||(t.add(a),n.push(a))}return n.length===0?[...pd]:[...mS.filter(s=>!t.has(s)),...n]}function fS(e,t){return e.length===t.length&&e.every((n,i)=>n===t[i])}function gS(e){const t=new URLSearchParams(e||""),n=parseInt(t.get("page")||"1",10);return{projectId:t.get("project")||null,teamScope:t.get("scope")==="team",where:t.has("where")?t.get("where"):null,order:t.get("order")||null,cols:t.has("cols")?md(t.get("cols").split(",")):[...pd],group:t.get("group")||null,view:t.get("view")||null,page:Number.isSafeInteger(n)&&n>=1?n:1}}function hS(e){const t=new URLSearchParams;e.teamScope?t.set("scope","team"):e.projectId&&t.set("project",e.projectId),e.where!==null&&e.where!==void 0&&t.set("where",e.where),e.order&&t.set("order",e.order),e.cols&&!fS(e.cols,pd)&&t.set("cols",e.cols.join(",")),e.group&&t.set("group",e.group),e.view&&t.set("view",e.view),e.page&&e.page>1&&t.set("page",String(e.page));const n=t.toString();return n?`/query?${n}`:"/query"}function vS(e){return`'${String(e).replace(/'/g,"'\\''")}'`}function bS({where:e,order:t,teamScope:n,projectKey:i=null,limit:s=tr,skip:a=0}){const o=["chaotic","issue","list"];let r=e||"",l=null;n||i?(o.push("--all-projects"),n||(r=r?`project=${i} (${r})`:`project=${i}`)):l="Runs in your CLI's current project.",o.push("--where",vS(r));const c=(t||"").split(",").map(d=>d.trim()).filter(Boolean);if(c.length>0){const d=c[0],p=d.startsWith("-"),f=d.replace(/^[-+]/,"");let g=null;pS.includes(f)?(o.push("--sort",f,"--order",p?"desc":"asc"),c.length>1&&(g=`The CLI sorts by one field; only "${d}" was copied.`)):g=`The CLI cannot sort by "${f}"; the order was not copied.`,g&&(l=l?`${l} ${g}`:g)}return o.push("--limit",String(s)),a>0&&o.push("--skip",String(a)),{command:o.join(" "),warning:l}}function yS(e){if(!e)return"The query failed.";if(Array.isArray(e.detail)){const t=e.detail.map(n=>n&&typeof n.msg=="string"?n.msg:"").filter(Boolean);if(t.length)return t.join("; ")}return e.message||"The query failed."}function wS(e,t){const n=md(t).map(a=>nr[a]),i=n.map(a=>`<th data-col="${m(a.id)}">${Le(a.label)}</th>`).join(""),s=e.map(a=>`<tr class="query-row" data-issue-id="${m(a.id)}">${n.map(o=>`<td class="query-col-${m(o.id)}">${o.render(a)}</td>`).join("")}</tr>`).join("");return`<table class="query-table"><thead><tr>${i}</tr></thead><tbody>${s}</tbody></table>`}function $S(e,t,n){const i=e===1?"issue":"issues";if(e===0)return'<span class="query-total">0 issues</span>';const s=t>0,a=t+n<e;return`<span class="query-total">${n===0?`${e} ${i}`:`${t+1}–${t+n} of ${e} ${i}`}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${s?"":" disabled"}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${a?"":" disabled"}>Next</button>`}let N=null,fd=null,nt=null,gd=0,Pi=!1,Dg=!1;function fe(e){return document.getElementById(e)}function Mg(e){return{projectId:e.projectId,teamScope:e.teamScope,where:e.where,order:e.order,page:e.page}}function Rg(e){const t=hS({...fd,cols:N.cols,group:N.group,view:N.view}),n=window.location.pathname+window.location.search;e==="push"&&t!==n?history.pushState({view:"query"},"",t):history.replaceState({view:"query"},"",t)}function hd(){N&&jo(N.teamScope?null:N.projectId)}function kS(){N&&(!N.teamScope&&N.projectId!==Q()?bt(N.projectId):hd())}function _S(){const e=fe("query-columns-menu");e&&(e.innerHTML=ud.map(t=>`
        <label class="query-column-option">
            <input type="checkbox" value="${m(t.id)}"${N.cols.includes(t.id)?" checked":""}${t.fixed?" disabled":""}>
            ${Le(t.label)}
        </label>`).join(""))}function ir(e){const t=fe("query-error");t&&(e?(t.innerHTML=`<strong>Query error:</strong> ${Le(e)}`,t.classList.remove("hidden")):(t.innerHTML="",t.classList.add("hidden")))}function jg(e){const t=fe("query-notice");t&&(t.textContent=e||"",t.classList.toggle("hidden",!e))}function vd(e){var t;(t=fe("query-pager"))==null||t.querySelectorAll("button[data-query-page]").forEach(n=>{e?n.disabled=!0:n.dataset.enabled==="true"&&(n.disabled=!1)})}function aa(){const e=fe("query-results"),t=fe("query-pager");if(!e)return;if(!nt){e.innerHTML="",t&&(t.innerHTML="");return}const{issues:n,total:i,skip:s}=nt;n.length===0?e.innerHTML=`<div class="empty-state">${i>0?"No issues on this page.":"No issues match this query."}</div>`:e.innerHTML=wS(n,N.cols),t&&(t.innerHTML=$S(i,s,n.length),t.querySelectorAll("button[data-query-page]").forEach(a=>{a.dataset.enabled=String(!a.disabled)}),Pi&&vd(!0))}async function sr(e="replace",{onSuccess:t=null,onFailure:n=null}={}){if(!N)return;const i=T(),s=N.teamScope?{teamId:i==null?void 0:i.id}:{projectId:N.projectId};if(!s.teamId&&!s.projectId){nt=null,aa(),ir(N.teamScope?"Select a team first.":"Select a project.");return}const a=++gd,o=N.where===null?dd:N.where,r=fe("query-results");Pi=!0,r&&r.classList.add("loading"),vd(!0);const l=()=>a===gd&&C()==="query";try{const c=await h.queryIssues({...s,where:o,order:N.order,skip:(N.page-1)*tr,limit:tr});if(!l())return;N.where=c.where,N.order=c.order||null,fd=Mg(N),nt={issues:c.issues||[],total:c.total,skip:c.skip};const d=fe("query-where");d&&d.value.trim()===o.trim()&&(d.value=c.where),ir(null),Pi=!1,aa(),Rg(e),t&&t()}catch(c){if(!l())return;Pi=!1,n?n():nt=null,aa(),ir(yS(c))}finally{a===gd&&(Pi=!1,r&&r.classList.remove("loading"),vd(!1))}}function Pg(){if(!N)return;const e=fe("query-where");return N.where=e?e.value.trim():"",N.page=1,sr("push")}function ES(e){if(!N)return;const t={teamScope:N.teamScope,projectId:N.projectId,page:N.page};return N.teamScope=!e,e&&(N.projectId=e),N.page=1,jg(null),sr("push",{onSuccess:()=>{e?bt(e):pf(),hd()},onFailure:()=>{Object.assign(N,t),hd()}})}function xS(e,t){if(!N||!nr[e]||nr[e].fixed)return;const n=N.cols.filter(i=>i!==e);N.cols=md(t?[...n,e]:n),aa(),Rg("replace")}function SS(e){if(!N||!nt||Pi)return;const t=N.page+e;if(t<1||e>0&&nt.skip+nt.issues.length>=nt.total)return;const n={page:N.page,result:nt};return N.page=t,sr("push",{onFailure:()=>{N.page=n.page,nt=n.result}})}async function IS(){if(!N)return null;const e=fe("query-where"),t=e?e.value.trim():N.where??dd,n=N.teamScope?null:te().find(o=>o.id===N.projectId),{command:i,warning:s}=bS({where:t,order:N.order,teamScope:N.teamScope,projectKey:(n==null?void 0:n.key)||null,limit:tr,skip:nt?nt.skip:0}),a=fe("query-cli-preview");try{await navigator.clipboard.writeText(i),$(s?`Copied. ${s}`:"Copied CLI command",s?"warning":"success"),a&&a.classList.add("hidden")}catch{a&&(a.textContent=i,a.classList.remove("hidden")),$("Could not copy; the command is shown below the box","warning")}return i}function LS(){var e,t,n,i,s,a;Dg||(Dg=!0,(e=fe("query-where"))==null||e.addEventListener("keydown",o=>{o.key==="Enter"&&!o.shiftKey&&!o.isComposing&&(o.preventDefault(),Pg())}),(t=fe("query-run-btn"))==null||t.addEventListener("click",()=>Pg()),(n=fe("query-copy-cli-btn"))==null||n.addEventListener("click",()=>IS()),(i=fe("query-columns-btn"))==null||i.addEventListener("click",o=>{o.stopPropagation();const r=fe("query-columns-menu");if(!r)return;const l=r.classList.toggle("hidden")===!1;o.currentTarget.setAttribute("aria-expanded",String(l))}),(s=fe("query-columns-menu"))==null||s.addEventListener("change",o=>{o.target.matches('input[type="checkbox"]')&&xS(o.target.value,o.target.checked)}),(a=fe("query-pager"))==null||a.addEventListener("click",o=>{const r=o.target.closest("button[data-query-page]");!r||r.disabled||SS(Number(r.dataset.queryPage))}),document.addEventListener("click",o=>{var l;const r=fe("query-columns-menu");r&&!r.classList.contains("hidden")&&!o.target.closest("#query-columns-picker")&&(r.classList.add("hidden"),(l=fe("query-columns-btn"))==null||l.setAttribute("aria-expanded","false"))}))}function TS(){var s,a;LS();const e=gS(window.location.search),t=te();let n=null;if(!e.teamScope){const o=r=>r&&t.some(l=>l.id===r);if(!o(e.projectId)){const r=e.projectId;e.projectId=o(Q())?Q():null,r&&(n=e.projectId?"The project in this link is not available to you; showing your current project.":"The project in this link is not available to you; showing all projects.")}e.projectId||(e.teamScope=!0)}N=e,fd=Mg(N),nt=null;const i=fe("query-where");return i&&(i.value=N.where===null?dd:N.where),(s=fe("query-cli-preview"))==null||s.classList.add("hidden"),(a=fe("query-columns-menu"))==null||a.classList.add("hidden"),kS(),_S(),ir(null),jg(n),aa(),sr("replace")}let ar=[];function AS(){return ar}ct(e=>{e==="currentProject"&&C()==="epics"&&wn()});let bd=0;const oa=new Set(["done","canceled"]);let or=!1;async function wn({fromMemory:e=!1}={}){var a;cl(-1);const t=document.getElementById("epics-list");if(!t)return;const n=++bd,i=Nl(),s=e?uo("epics",i):void 0;s?qg(s,t):t.innerHTML=Array(4).fill(0).map(()=>`
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
        `).join("");try{if(!((a=T())!=null&&a.id)){ar=[],t.innerHTML=V({icon:U.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const o=Q(),r=o?await h.getProjectEpicProgress(o):await h.getTeamEpicProgress(T().id);if(n!==bd||(hi("epics",i,r),s&&po(s,r)))return;qg(r,t)}catch(o){if(n!==bd)return;t.innerHTML=V({icon:U.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),k("load epics",o)}}function qg(e,t){var i;const n=((e==null?void 0:e.untracked)||[]).some(s=>(s.awaiting_human||[]).length);if(!((i=e==null?void 0:e.epics)!=null&&i.length)&&!n){ar=[],t.innerHTML=V({icon:U.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}Hg(e,t)}function yd(e,t){return`${e} ${t}${e===1?"":"s"}`}function CS(e,t){return t<=0?"-":e>=t?"100%":`${Math.floor(e/t*100)}%`}function ra(e){const t=e.children||{};return(t.total||0)-(t.canceled||0)}function qt(e){const t=e?new Date(e).getTime():NaN;return Number.isNaN(t)?0:t}function rr(e){const t=at(e);return t?/ago$|^just now$|future/.test(t)?t:`on ${t}`:""}function Ng(e){const t=e.children||{},n=ra(e);if(n<=0)return'<span class="meter-label">No tickets</span>';const i=t.done||0,s=`${CS(i,n)} done: ${i} done, ${(t.in_progress||0)+(t.in_review||0)} in progress, ${(t.todo||0)+(t.backlog||0)} not started`+(t.canceled?`, ${t.canceled} canceled`:"");return`
        <div class="meter" title="${m(s)}"><div class="meter-fill" style="width: ${Math.round(i/n*100)}%"></div></div>
        <span class="meter-label">${i} of ${n}</span>`}function BS(e){if(!e||e.length===0)return'<span class="epic-sprint-strip" aria-hidden="true"></span>';const t=Math.max(1,...e.map(i=>i.points||0));return`<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${e.map(i=>{const s=i.points?Math.max(15,Math.round(i.points/t*100)):0,a=`${i.name}${i.status==="active"?" (current)":""}: ${yd(i.closed||0,"ticket")} closed, ${i.points||0} pts`;return`<span class="epic-sprint-tick${i.status==="active"?" epic-sprint-current":""}" title="${m(a)}"><span class="epic-sprint-fill" style="height: ${s}%"></span></span>`}).join("")}</span>`}function DS(e){const t=e.in_flight||[],n=t.slice(0,2).map(s=>`${s.assignee?`<b>${u(s.assignee.name)}</b>`:"Unassigned"} on ${u(s.title)}`),i=(e.in_flight_count||t.length)-n.length;return i>0&&n.push(`+${i} more`),n.join(", ")}function Og(e,t="shipped"){const n=e.last_shipped;return n?`${t} ${u(n.title)} ${u(rr(n.completed_at))}`:""}function lr(e,{sub:t,right:n,grouped:i}){const s=e.status_pinned&&!oa.has(e.status)?' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>':"",a=e.status==="canceled"?' <span class="epic-canceled-tag">Canceled</span>':"",o=i?`<span class="epic-project-key">${u(e.project_key)}</span> `:"",r=e.owner?` <span class="epic-owner">· ${u(e.owner.name)}</span>`:"",l=ra(e)<=0;return`
        <div class="list-row-2line epic-row${oa.has(e.status)?" epic-row-closed":""}${l?" epic-row-empty":""}" data-identifier="${m(e.identifier)}" title="${m(e.identifier)}">
            <span class="epic-spark">${BS(e.sprints)}</span>
            <span class="list-row-title">${o}${u(e.title)}${r}${s}${a}</span>
            <span class="list-row-sub">${t}</span>
            <span class="list-row-right">${n}</span>
        </div>`}function cr(e,t,n,i,s=""){return i?`
        <section class="epic-section epic-section-${e}">
            <div class="section-header"><h3>${t} <span class="section-count">${n}</span></h3></div>
            <div class="epic-section-rows">${i}</div>
            ${s}
        </section>`:""}function wd(e){return!oa.has(e.status)&&ra(e)>0&&(e.open_children||0)===0}const $d=5;function Hg(e,t){const n=(e==null?void 0:e.epics)||[],i=(e==null?void 0:e.untracked)||[],s=new Set([...n.map(x=>x.project_key),...i.map(x=>x.project_key)]).size>1,a=(x,w)=>s?`${u(x)} · ${w}`:w,o=n.filter(x=>!oa.has(x.status)),r=o.filter(wd),l=o.filter(x=>!wd(x)&&(x.in_flight_count||0)>0).sort((x,w)=>qt(w.last_activity_at)-qt(x.last_activity_at)),c=o.filter(x=>!wd(x)&&!x.in_flight_count).sort((x,w)=>{var D,H;return(ra(x)<=0)-(ra(w)<=0)||qt((D=w.last_shipped)==null?void 0:D.completed_at)-qt((H=x.last_shipped)==null?void 0:H.completed_at)||qt(w.last_activity_at)-qt(x.last_activity_at)}),d=n.filter(x=>oa.has(x.status)).sort((x,w)=>qt(w.completed_at||w.last_activity_at)-qt(x.completed_at||x.last_activity_at)),p=or?d:d.slice(0,$d),f=[...n.flatMap(x=>(x.awaiting_human||[]).map(w=>({a:w,where:a(x.project_key,u(x.title))}))),...i.flatMap(x=>(x.awaiting_human||[]).map(w=>({a:w,where:a(x.project_key,"No epic")})))].sort((x,w)=>qt(x.a.since)-qt(w.a.since)),g=f.map(({a:x,where:w})=>{const D=x.approval_mode==="review",H=x.requested_by_name?` by ${u(x.requested_by_name)}`:"";return`
        <div class="list-row-2line epic-ask-row" data-issue-identifier="${m(x.identifier)}" title="${m(x.identifier)}">
            <span class="epic-spark" aria-hidden="true"></span>
            <span class="list-row-title">${D?"Approve":"Complete"} ${u(x.ritual_name)}: ${u(x.title)}</span>
            <span class="list-row-sub">${w} · ${D?"attested":"requested"}${H} ${u(rr(x.since))}</span>
            <span class="list-row-right"><span class="list-row-action">${D?"Approve":"Complete"}</span></span>
        </div>`}).join(""),b=r.map(x=>lr(x,{grouped:s,sub:`Every ticket is done${x.last_shipped?` · last shipped ${u(rr(x.last_shipped.completed_at))}`:""}`,right:'<span class="list-row-action">Open epic</span>'})).join(""),y=l.map(x=>lr(x,{grouped:s,sub:[DS(x),Og(x)].filter(Boolean).join(" · "),right:Ng(x)})).join(""),_=c.map(x=>{const w=x.children||{},D=w.todo?`${w.todo} ready to start`:w.backlog?`${w.backlog} in backlog`:"",H=x.last_shipped?Og(x,"Last shipped"):"Nothing shipped yet";return lr(x,{grouped:s,sub:[H,D].filter(Boolean).join(" · "),right:Ng(x)})}).join(""),E=p.map(x=>{var w;return lr(x,{grouped:s,sub:x.completed_at?`Closed ${u(rr(x.completed_at))}`:"Closed",right:`<span class="meter-label">${yd(((w=x.children)==null?void 0:w.done)||0,"ticket")}</span>`})}).join(""),I=d.length>$d?`<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${or?`Show the latest ${$d}`:`Show all ${d.length}`}</button>`:"",A=i.filter(x=>x.open),R=A.length?`<p class="epic-untracked-note">${A.map(x=>`${s?`${u(x.project_key)}: `:""}${yd(x.open,"open ticket")}`).join(", ")} under no epic.</p>`:"";ar=[...r,...l,...c,...d],t.innerHTML=`
        <div class="epic-sections">
            ${cr("waiting","Waiting on you",f.length+r.length,g+b)}
            ${cr("moving","Moving now",l.length,y)}
            ${cr("quiet","Nothing in flight",c.length,_)}
            ${cr("shipped","Shipped",d.length,E,I?`<div class="epic-table-footer">${I}</div>`:"")}
            ${R}
        </div>
    `,t._epicProgress=e,t._epicClickHandler||(t._epicClickHandler=x=>{if(x.target.closest("[data-epics-toggle-closed]")){or=!or,cl(-1),Hg(t._epicProgress,t);return}const w=x.target.closest(".epic-ask-row");if(w&&w.dataset.issueIdentifier){No(w.dataset.issueIdentifier);return}const D=x.target.closest(".epic-row");D&&D.dataset.identifier&&Af(D.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function MS(){const e=Q(),t=te().map(n=>`
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
    `,G(),document.getElementById("create-epic-form").addEventListener("submit",RS),document.getElementById("create-epic-title").focus()}async function RS(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){$("Please select a project","error");return}if(!n){$("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});F(),$(`Created epic ${s.identifier}`,"success"),wn()}catch(s){k("create epic",s)}}async function Fg(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){re(t.id,!1);return}await dr(t.id,!1)}else O("epics",!1)}catch{O("epics",!1)}}async function dr(e,t=!0){var n;try{t&&hn();const[i,s,a,o]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(i.issue_type!=="epic"){re(e,t);return}t&&history.pushState({epicId:e,view:C()},"",`/epic/${i.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const r=document.getElementById("epic-detail-view");r.classList.remove("hidden");const l=C()||"epics",c=te().find(w=>w.id===i.project_id),d=i.assignee_id?wt(i.assignee_id):null,p=d?dt(d):null,f=AS(),g=(n=f.find(w=>w.id===i.id))==null?void 0:n.children,b=g?(g.total||0)-(g.canceled||0):s.filter(w=>w.status!=="canceled").length,y=g?g.done||0:s.filter(w=>w.status==="done").length,_=b>0?Math.round(y/b*100):0,E=f.findIndex(w=>w.id===i.id),I=E>0?f[E-1]:null,A=E>=0&&E<f.length-1?f[E+1]:null,R=E>=0;r.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${m(l)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${R?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${I?`data-action="navigate-epic" data-epic-id="${m(I.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${E+1} / ${f.length}</span>
                            <button class="issue-nav-btn" ${A?`data-action="navigate-epic" data-epic-id="${m(A.id)}"`:"disabled"} title="Next epic">
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
                            ${jn(i.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${_===100?" epic-progress-complete":""}" style="width: ${_}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${y} of ${b} done</span>
                                <span>${_}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?V({icon:U.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(w=>{const D=w.assignee_id?wt(w.assignee_id):null,H=D?dt(D):null;return`
                                <div class="sub-issue-item" data-issue-id="${m(w.id)}" data-identifier="${m(w.identifier)}">
                                    <span class="sub-issue-status">${Ze(w.status)}</span>
                                    <span class="sub-issue-id">${u(w.identifier)}</span>
                                    <span class="sub-issue-title">${u(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${Te(w.status)}</span>
                                    ${H?`<span class="sub-issue-assignee">${u(H)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${a.length===0?V({icon:U.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):a.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Fm(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${rc(w)}</span>
                                        <span class="activity-actor">by ${u(ac(w))}</span>
                                        <span class="activity-time">${at(w.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${o.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${o.map(w=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(w.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${u(w.author_name||"User")}</span>
                                            <span class="comment-date">${at(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${ii(w.content||"")}</div>
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
                                ${Ze(i.status)}
                                ${Te(i.status)}
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
                                ${pt(i.priority)}
                                ${Ae(i.priority)}
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
                                ${gn(i.estimate,i.project_id)}
                            </span>
                        </div>

                        ${i.labels&&i.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${i.labels.map(w=>`
                                    <span class="issue-label" style="background: ${se(w.color)}20; color: ${se(w.color)}">${u(w.name)}</span>
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
        `;const x=r.querySelector(".sub-issues-list");x&&x.addEventListener("click",w=>{const D=w.target.closest(".sub-issue-item");D&&D.dataset.issueId&&re(D.dataset.issueId)})}catch(i){k("load epic",i)}}ae({"navigate-epic":(e,t)=>{dr(t.epicId)},"epic-follow-children":async(e,t)=>{try{await h.updateIssue(t.epicId,{status_follows_children:!0}),$("Status now follows sub-issues"),await dr(t.epicId,!1)}catch(n){k("update epic",n)}}});function jS(e){let t=!1,n=null;return function(s){var o,r,l,c,d,p,f,g;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(Tn(s.target)){s.key==="Escape"&&!s.defaultPrevented&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.leaveDetailView&&((c=e.isDetailViewActive)!=null&&c.call(e))&&e.isMenuOpen&&!e.isMenuOpen()?e.leaveDetailView():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("people");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((p=e.isDetailViewActive)!=null&&p.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((f=e.isDetailViewActive)!=null&&f.call(e))break;s.preventDefault(),(g=e.openProjectSwitcher)!=null&&g.call(e)||e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function PS(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function en(e,t,n=qa){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Ug(){const e=document.querySelector(".main-content");e&&(e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1"),e.focus({preventScroll:!0}))}function la(e){var n,i;return(i=(n=e.target).closest)!=null&&i.call(n,".sidebar-nav")?!e.metaKey&&!e.ctrlKey&&!e.altKey&&(e.key==="j"||e.key==="k")?(Ug(),!1):!0:!1}function qS(e){const t=qa;function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,p,f;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||Tn(a.target)||la(a)||(a.key==="Enter"||a.key===" ")&&((d=(c=a.target).closest)!=null&&d.call(c,".issue-group-header"))||e.isModalOpen()||e.isCommandPaletteOpen()||(p=e.isInlineDropdownOpen)!=null&&p.call(e))return;["j","k","ArrowDown","ArrowUp"].includes(a.key)&&((f=e.beforeNavigate)==null||f.call(e));const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),en(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),en(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.viewIssue(g)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const g=o[r].dataset.issueId;g&&!g.startsWith("temp-")&&e.showEditIssueModal(g)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function NS(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||Tn(i.target)||la(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),en(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),en(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function $n(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function OS(e){const t="#inbox-list .inbox-row";return function(i){var r,l,c,d,p,f;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||Tn(i.target)||la(i)||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=g=>{var y,_,E,I;const b=!!((_=(y=document.activeElement)==null?void 0:y.closest)!=null&&_.call(y,"#inbox-list"));if((E=e.collapseInboxExpand)==null||E.call(e),en(a+g,e.setSelectedIndex,t),b){const A=document.querySelector(`${t}.keyboard-selected`);(I=(A==null?void 0:A.querySelector(".inbox-row-toggle"))||A)==null||I.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((d=(c=i.target).closest)!=null&&d.call(c,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((p=e.isEscapeLayerAbove)!=null&&p.call(e))break;if((f=e.collapseInboxExpand)!=null&&f.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(g=>g.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function HS(e){const t="#kanban-board .kanban-card";return function(i){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||Tn(i.target)||la(i)||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),en(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),en(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const r=s[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function FS(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function kd(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d,p;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||Tn(a.target)||la(a)||e.isModalOpen()||e.isCommandPaletteOpen()||(c=e.isInlineDropdownOpen)!=null&&c.call(e))return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),en(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),en(r-1,e.setSelectedIndex,n);break;case"Enter":if((p=(d=a.target).closest)!=null&&p.call(d,'button, a[href], [role="button"]'))break;r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const US=7,_d=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value"),Gg=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"selectedIndex"),GS='<svg class="picker-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',zS='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';let zg=!1;function VS(){zg||(zg=!0,Object.defineProperty(HTMLSelectElement.prototype,"value",{..._d,set(e){var t;_d.set.call(this,e),(t=this._picker)==null||t.sync()}}),Object.defineProperty(HTMLSelectElement.prototype,"selectedIndex",{...Gg,set(e){var t;Gg.set.call(this,e),(t=this._picker)==null||t.sync()}}))}let ye=null,WS=0;function Vg({restoreFocus:e=!0}={}){return ye?(ye.close(e),!0):!1}function KS(e,{returnFocus:t=!1}={}){var i;const n=(i=e==null?void 0:e._picker)==null?void 0:i.button;if(!n||n.disabled||!n.isConnected||typeof n.checkVisibility=="function"&&!n.checkVisibility({visibilityProperty:!0}))return!1;if((ye==null?void 0:ye.select)!==e){const s=document.activeElement;Ed(e,n,t?s&&s!==document.body?s:null:void 0)}return!0}function YS(e=document){e.querySelectorAll("select[data-picker]").forEach(QS)}function QS(e){var i;if(!e||e._picker)return((i=e==null?void 0:e._picker)==null?void 0:i.button)||null;const t=document.createElement("button");t.type="button",t.className="picker-btn",t.setAttribute("aria-haspopup","listbox"),t.setAttribute("aria-expanded","false"),e.id&&(t.dataset.pickerFor=e.id),t.innerHTML=`<span class="picker-label"></span>${GS}`,e.classList.add("picker-native"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,e.insertAdjacentElement("afterend",t);const n=()=>{Wg(e,t),(ye==null?void 0:ye.select)===e&&ye.refresh()};return e._picker={button:t,sync:n},VS(),e.addEventListener("change",n),typeof MutationObserver<"u"&&new MutationObserver(n).observe(e,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["disabled","selected","hidden"]}),t.addEventListener("click",s=>{s.preventDefault(),(ye==null?void 0:ye.select)===e?Vg():Ed(e,t)}),t.addEventListener("keydown",s=>{s.metaKey||s.ctrlKey||s.altKey||(["ArrowDown","ArrowUp","Enter"," "].includes(s.key)?(s.preventDefault(),s.stopPropagation(),(ye==null?void 0:ye.select)!==e&&Ed(e,t)):s.key.length===1&&e.dataset.pickerKeys!=="pass"&&s.stopPropagation())}),n(),t}function Wg(e,t){const n=e.options[e.selectedIndex],i=n?n.textContent.trim():"",s=(n==null?void 0:n.dataset.hint)||"",a=t.querySelector(".picker-label");a.textContent=i,s&&a.insertAdjacentHTML("afterbegin",`<span class="picker-label-hint">${u(s)}</span>`),t.disabled=e.disabled,t.title=i;const o=e.getAttribute("aria-label");o&&t.setAttribute("aria-label",i?`${o}: ${i}`:o)}function Kg(e){return[...e.options].filter(t=>!t.hidden).map(t=>({value:t.value,text:t.textContent.trim(),hint:t.dataset.hint||"",disabled:t.disabled}))}function Ed(e,t,n){Vg({restoreFocus:!1});const i=Kg(e),s=`picker-list-${++WS}`,a=i.length>=US,o=e.getAttribute("aria-label")||"Options",r=document.createElement("div");r.className="picker-popover",r.tabIndex=-1,r.innerHTML=`
        ${a?`<input type="text" class="picker-search" placeholder="Filter…" aria-label="Filter ${m(o)}"
            role="combobox" aria-expanded="true" aria-controls="${s}" aria-autocomplete="list" autocomplete="off" spellcheck="false">`:""}
        <ul class="picker-list" role="listbox" id="${s}" tabindex="-1" aria-label="${m(o)}"></ul>
    `,document.body.appendChild(r);const l=r.querySelector(".picker-list"),c=r.querySelector(".picker-search"),d=S=>Math.max(0,S.findIndex(j=>!j.disabled));let p=i.findIndex(S=>S.value===e.value&&!S.disabled);p===-1&&(p=d(i));let f=i;const g=()=>{var j;l.innerHTML=f.length?f.map((M,ie)=>`
                <li role="option" id="${s}-${ie}" class="picker-option${ie===p?" active":""}${M.disabled?" disabled":""}"
                    data-index="${ie}" data-value="${m(M.value)}"
                    aria-selected="${M.value===e.value?"true":"false"}"${M.disabled?' aria-disabled="true"':""}>
                    <span class="picker-option-text">${u(M.text)}</span>
                    ${M.hint?`<span class="picker-option-hint">${u(M.hint)}</span>`:""}
                    ${M.value===e.value?`<span class="picker-check">${zS}</span>`:""}
                </li>`).join(""):'<li class="picker-empty" role="presentation">No matches</li>';const S=l.querySelector(".picker-option.active");S?(c||l).setAttribute("aria-activedescendant",S.id):(c||l).removeAttribute("aria-activedescendant"),(j=S==null?void 0:S.scrollIntoView)==null||j.call(S,{block:"nearest"})},b=()=>{var B,ce;const S=t.getBoundingClientRect(),j=((B=window.visualViewport)==null?void 0:B.width)||window.innerWidth,M=((ce=window.visualViewport)==null?void 0:ce.height)||window.innerHeight;r.style.minWidth=`${Math.min(Math.max(S.width,220),j-16)}px`,r.style.maxHeight="",r.style.top="0px";const ie=r.offsetWidth||Math.max(S.width,220),we=r.offsetHeight;r.style.left=`${Math.max(8,Math.min(S.left,j-ie-8))}px`;const $e=M-S.bottom-12,nn=S.top-12;if(we>$e&&nn>$e){const K=Math.max(120,nn);r.style.maxHeight=`${K}px`,r.style.top=`${Math.max(8,S.top-4-Math.min(we,K))}px`}else r.style.maxHeight=`${Math.max(120,$e)}px`,r.style.top=`${S.bottom+4}px`},y=S=>{if(!S||S.disabled||e.disabled)return;if(![...e.options].some(M=>M.value===S.value&&!M.disabled)){ne(!0);return}const j=S.value!==e.value;_d.set.call(e,S.value),Wg(e,t),ne(!0),j&&e.dispatchEvent(new Event("change",{bubbles:!0}))},_=S=>{let j=p+S;for(;j>=0&&j<f.length&&f[j].disabled;)j+=S;j<0||j>=f.length||(p=j,g())},E=(S,j)=>{let M=S;for(;M>=0&&M<f.length&&f[M].disabled;)M+=j;M>=0&&M<f.length&&(p=M,g())},I=S=>{if(!(S.metaKey||S.ctrlKey))switch(S.stopPropagation(),S.key){case"ArrowDown":S.preventDefault(),_(1);break;case"ArrowUp":S.preventDefault(),_(-1);break;case"Home":c||(S.preventDefault(),E(0,1));break;case"End":c||(S.preventDefault(),E(f.length-1,-1));break;case"PageDown":S.preventDefault(),E(Math.min(f.length-1,p+8),-1);break;case"PageUp":S.preventDefault(),E(Math.max(0,p-8),1);break;case"Enter":S.preventDefault(),y(f[p]);break;case"Escape":S.preventDefault(),ne(!0);break;case"Tab":ne(!0);break;case" ":c||(S.preventDefault(),y(f[p]));break;default:if(!c&&S.key.length===1&&!S.metaKey&&!S.ctrlKey&&!S.altKey){A=(Date.now()-R<700?A:"")+S.key.toLowerCase(),R=Date.now();const j=f.findIndex(M=>!M.disabled&&M.text.toLowerCase().startsWith(A));j!==-1&&(p=j,g())}}};let A="",R=0;const x=()=>{const S=c.value.trim().toLowerCase();f=S?i.filter(M=>M.text.toLowerCase().includes(S)||M.hint.toLowerCase().includes(S)):i;const j=f.findIndex(M=>M.value===e.value&&!M.disabled);p=!S&&j!==-1?j:d(f),g()},w=S=>{r.contains(S.target)||t.contains(S.target)||ne(!1)},D=()=>b(),H=S=>{S.key!=="Escape"||r.contains(S.target)||(S.preventDefault(),S.stopPropagation(),ne(!0))},X=()=>ne(!1);function ne(S){var j,M;(ye==null?void 0:ye.popover)===r&&(ye=null,r.remove(),t.setAttribute("aria-expanded","false"),t.classList.remove("open"),t.removeAttribute("aria-controls"),document.removeEventListener("pointerdown",w,!0),document.removeEventListener("keydown",H,!0),window.removeEventListener("popstate",X),window.removeEventListener("resize",D),window.removeEventListener("scroll",D,!0),S&&(n===void 0?t.focus({preventScroll:!0}):n!=null&&n.isConnected?n.focus({preventScroll:!0}):(M=(j=document.activeElement)==null?void 0:j.blur)==null||M.call(j)))}l.addEventListener("click",S=>{const j=S.target.closest(".picker-option");j&&y(f[Number(j.dataset.index)])}),l.addEventListener("mousemove",S=>{const j=S.target.closest(".picker-option");if(!j)return;const M=Number(j.dataset.index);M!==p&&(p=M,g())}),r.addEventListener("keydown",I),c&&c.addEventListener("input",x),document.addEventListener("pointerdown",w,!0),document.addEventListener("keydown",H,!0),window.addEventListener("popstate",X),window.addEventListener("resize",D),window.addEventListener("scroll",D,!0),ye={select:e,button:t,popover:r,close:ne,refresh:()=>{const S=Kg(e);!(S.length===i.length&&S.every((M,ie)=>M.value===i[ie].value&&M.text===i[ie].text&&M.hint===i[ie].hint&&M.disabled===i[ie].disabled))||e.disabled?ne(!1):g()}},t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls",s),t.classList.add("open"),g(),b(),(c||l).focus({preventScroll:!0})}const ZS={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let W=null,kn=0;async function Yg(e,t){var a,o;const n=ZS[e];if(!n){k("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++kn;W=null;let s;try{s=await n.fetchList(t)}catch(r){k("load revision history",r);return}if(i===kn){if(W={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},W.viewVersion!=null)try{const r=await n.fetchOne(t,W.viewVersion);if(i!==kn)return;W.cache.set(W.viewVersion,r)}catch(r){i===kn&&k("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),ur(),G()}}function ur(){const e=document.getElementById("modal-content");if(!e||!W)return;if(W.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=XS(),n=W.mode==="compare"?eI():JS();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function XS(){const e=W.revisions.map(n=>{const i=W.mode==="view"?n.version===W.viewVersion:n.version===W.compareFromVersion||n.version===W.compareToVersion,s=W.mode==="compare"?n.version===W.compareFromVersion?' <span class="rev-tag">from</span>':n.version===W.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${u(n.author_name||"Unknown")} ${Ma(n.author)}</span>
          <span class="revision-time">${at(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${W.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function JS(){const e=W.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=W.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${u(t.title)}</h3>`:"",i=t[W.adapter.bodyField]||"",s=i?`<div class="markdown-body">${ft(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${u(t.author_name||"Unknown")} &middot; ${at(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function eI(){const e=W.compareFromVersion,t=W.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=W.cache.get(e),i=W.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[W.adapter.bodyField]||"",a=i[W.adapter.bodyField]||"",o=tI(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
    ${o}
  `}function tI(e,t){const n=e.split(`
`),i=t.split(`
`),s=nI(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${u(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${u(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${u(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function nI(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(ca(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(ca(a,"del",e[o]),o++):(ca(a,"add",t[r]),r++);for(;o<n;)ca(a,"del",e[o++]);for(;r<i;)ca(a,"add",t[r++]);return a}function ca(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function iI(e){if(!W)return;const t=W.token,n=W;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(W!==n||kn!==t)return;n.cache.set(e,i)}catch(i){W===n&&kn===t&&k("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),ur()}function sI(){if(!W)return;const e=W.token,t=W;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{W===t&&kn===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{W!==t||kn!==e||(s&&k("load revisions to compare",s),ur())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;ur()}ae({"show-document-revisions":(e,t)=>{Yg("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Yg("issue",t.issueId)},"select-revision-version":(e,t)=>{iI(Number(t.version))},"toggle-revision-compare":()=>{sI()},"close-revision-viewer":()=>{W=null,F()}});function pr(e){return mt().find(t=>t.id===(e==null?void 0:e.user_id))||null}function Qg(e){if(!e)return"Team-wide";const t=te().find(n=>n.id===e);return t?`Project ${t.key}`:"One project"}function Zg(e,t=me()){return!(e!=null&&e.is_agent)||!t||!pr(e)?!1:e.owner_id===t.id||Ci()}function Xg(e){const t=pr(e);return t?!!t.can_register:(e==null?void 0:e.kind)==="service"}function aI(e,t){var n,i;return((n=mt().find(s=>s.id===e))==null?void 0:n.name)||((i=t.find(s=>s.user_id===e))==null?void 0:i.name)}function tn(e,t){return`<dt>${u(e)}</dt><dd>${t}</dd>`}function mr(e,t){return e?`<a href="/people/${m(e)}" data-action="view-person" data-user-id="${m(e)}">${u(t||"Unknown")}</a>`:u(t||"Unknown")}function oI(e,t=[]){if(!(e!=null&&e.is_agent))return"";const n=pr(e);if(!n)return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">
                ${tn("Scope","A guest from another team, with a membership here")}
                ${tn("Owner",mr(e.owner_id,e.owner_name))}
            </dl>
        </section>`;const i=(n.kind||e.kind)==="session",s=Xg(e),a=[tn("Scope",u(Qg(n.agent_project_id??e.project_id))),tn("Owner",mr(e.owner_id||n.parent_user_id,e.owner_name||n.parent_user_name))];if(n.is_active===!1&&a.push(tn("Status","Deactivated: its keys no longer sign in")),i){const f=n.registered_by_id;a.push(tn("Registered by",f?mr(f,aI(f,t)):"A registrar")),a.push(tn("Last used",n.last_used_at?u(Ie(n.last_used_at)):"Never"))}else a.push(tn("Registrar",s?"Yes: registers one identity per session and cannot write as itself":"No"));if(s){const f=mt().filter(g=>g.registered_by_id===e.user_id&&g.is_active!==!1);a.push(tn("Sessions registered",f.length?f.map(g=>mr(g.id,g.name)).join(", "):"None active"))}const o=Zg(e),r=m(e.user_id),l=m(e.name||"Agent"),c=n.is_active!==!1,d=o?`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Owner actions</h3></div>
            <div class="agent-profile-actions">
                ${c&&!i?`<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${r}" data-agent-name="${l}" data-can-register="${s?"true":"false"}">${s?"Stop being a registrar":"Make registrar"}</button>`:""}
                <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${r}" data-agent-name="${l}">Delete agent</button>
            </div>
        </section>`:"",p=o?`
        <section class="agent-profile-section">
            <div class="section-header agent-profile-section-head">
                <h3>Credentials</h3>
                ${c?`<button class="btn btn-secondary btn-small" data-action="generate-agent-key" data-agent-id="${r}" data-agent-name="${l}">Generate key</button>`:""}
            </div>
            <div id="agent-credentials" class="agent-credentials" data-agent-id="${r}" aria-busy="true"><div class="skeleton skeleton-title"></div></div>
        </section>`:"";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">${a.join("")}</dl>
        </section>
        ${p}
        ${d}
    `}let Jg=0;async function fr(e){var r;if(((r=document.getElementById("agent-credentials"))==null?void 0:r.dataset.agentId)!==e)return;const t=++Jg;let n,i;try{[n,i]=await Promise.all([h.getAgentKeys(e),h.getConnections().catch(()=>[])])}catch(l){n=null,console.error("Failed to load agent credentials:",l)}if(t!==Jg)return;const s=document.getElementById("agent-credentials");if(!s||s.dataset.agentId!==e)return;if(s.removeAttribute("aria-busy"),n===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load its keys.</p>';return}const a=(i||[]).filter(l=>{var c;return l.acts_as!=="person"&&((c=l.agent)==null?void 0:c.id)===e}),o=n.filter(l=>l.is_active);if(!o.length&&!a.length){s.innerHTML='<p class="person-bio-empty">No active keys or connected apps.</p>';return}s.innerHTML=[...o.map(l=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${u(l.key_prefix||"")}…</code>${l.name?` · ${u(l.name)}`:""}</div>
                    <div class="list-row-sub">Created ${u(Ie(l.created_at))}${l.owner_name?` by ${u(l.owner_name)}`:""} · ${l.last_used_at?`last used ${u(Ie(l.last_used_at))}`:"never used"}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${m(l.id)}" data-agent-id="${m(e)}">Revoke</button>
                </div>
            </div>`),...a.map(l=>{var d;const c=((d=l.client)==null?void 0:d.name)||"An app";return`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${u(c)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${u(Ie(l.created_at))}${l.last_used_at?` · last used ${u(Ie(l.last_used_at))}`:""}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${m(l.id)}" data-connection-name="${m(c)}" data-agent-id="${m(e)}">Disconnect</button>
                </div>
            </div>`})].join("")}async function rI(e,t){if(confirm("Revoke this key? Anything signing in with it stops working at once."))try{await h.revokeApiKey(e),fr(t)}catch(n){k("revoke the key",n)}}const gr={bio:4e3,pronouns:40,tagline:120,name:255};let je=[],hr=null,eh=new Map,xd=!1,vr=0,br=null,qi=null,da=null,yr=!1,Sd=0;async function th(e,t){return h.getTeamRoster(e,{includeIdle:t})}function lI(e,t){!t||hr!==e||(je=je.map(n=>n.user_id===t.user_id?t:n))}function cI(){return Array(4).fill(0).map(()=>`
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join("")}async function dI(e){try{const t=await h.getTeamIssues(e,{status:["in_progress"],sort_by:"updated",order:"desc",limit:200}),n=new Map;for(const i of t||[])i.assignee_id&&(n.has(i.assignee_id)||n.set(i.assignee_id,[]),n.get(i.assignee_id).push(i));return n}catch(t){return console.error("Failed to load what the team is working on:",t),new Map}}async function wr(){const e=T();if(!e)return;const t=++vr,n=xd,i=document.getElementById("people-list");i&&(i.innerHTML=cI(),i.setAttribute("aria-busy","true"));const s=document.getElementById("people-show-idle");s&&(s.checked=xd),Wf().then(()=>{t===vr&&(Ci()?Wo():Kf(),hr===e.id&&Ni())});try{const[a,o]=await Promise.all([th(e.id,n),dI(e.id)]);if(t!==vr)return;je=a,hr=e.id,eh=o,Ni()}catch(a){if(t!==vr)return;i==null||i.removeAttribute("aria-busy"),i&&(i.innerHTML=V({icon:U.team,heading:"Couldn't load the roster",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-people"},variant:"error"})),k("load the roster",a)}}function $r(e){if(!e.is_agent){const i=e.role||"member";return i.charAt(0).toUpperCase()+i.slice(1)}const n=[e.kind==="session"?"Session":e.kind==="service"?"Registrar":"Agent"];return e.owner_name&&n.push(`of ${e.owner_name}`),e.idle&&n.push("· idle"),n.join(" ")}function uI(e){const t=eh.get(e.user_id)||[];if(t.length){const[n]=t,i=t.length>1?` and ${t.length-1} more`:"";return`<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${u(n.identifier)} ${u(n.title)}${i}`}return e.is_agent?`${e.owner_name?`Agent of ${u(e.owner_name)}`:"Agent"}${e.idle?" · idle":""}`:e.tagline?u(e.tagline):u($r(e))}function pI(e){const t=m(e.user_id),n=e.mention_handle?` <span class="person-row-handle">@${u(e.mention_handle)}</span>`:"",i=[];return e.is_agent?(i.push(`<span class="badge badge-neutral">${u(Qg(e.project_id))}</span>`),Xg(e)?i.push('<span class="badge badge-accent">Registrar</span>'):e.kind==="session"&&i.push('<span class="badge badge-neutral">Session</span>')):e.role&&e.role!=="member"&&i.push(`<span class="badge badge-neutral">${u($r(e))}</span>`),`
        <a class="list-row-2line person-row${e.idle?" person-row-idle":""}"
           href="/people/${t}" data-action="view-person" data-user-id="${t}">
            <span class="person-row-avatar" aria-hidden="true">${zt(e,`avatar person-avatar${e.is_agent?" person-avatar-agent":""}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${u(e.name)}${n}</span>
                <span class="list-row-sub">${uI(e)}</span>
            </span>
            <span class="list-row-right">${i.join("")}</span>
        </a>
    `}function nh(e,t,n,i=""){return`
        <div class="section-header people-section-header">
            <h3>${e} <span class="section-count">${t.length}</span></h3>${i}
        </div>
        <div class="people-rows">${t.map(pI).join("")||`<p class="people-empty">${n}</p>`}</div>
    `}function Ni(){const e=document.getElementById("people-list");if(!e)return;e.removeAttribute("aria-busy");const t=je.filter(a=>!a.is_agent),n=je.filter(a=>a.is_agent),i=me(),s=i?`<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${m(i.id)}">Edit your profile</button>`:"";e.innerHTML=nh("Humans",t,"No one yet.",s)+nh("Agents",n,"No agents yet.")+mI()}function mI(){var s;if(!Ci())return"";const e=new Set(je.map(a=>a.user_id)),t=new Set(mt().map(a=>a.id)),n=(s=me())==null?void 0:s.id,i=jt().filter(a=>!e.has(a.user_id)&&!t.has(a.user_id));return i.length?`
        <div class="section-header people-section-header">
            <h3>Not on the roster <span class="section-count">${i.length}</span></h3>
        </div>
        <div class="people-rows">${i.map(a=>`
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">${u(a.user_name||"Unknown")}</div>
                    <div class="list-row-sub">${u(a.user_email||"")}${a.user_email?" · ":""}deactivated account, ${u(a.role||"member")}</div>
                </div>
                ${a.user_id!==n&&a.role!=="owner"?`<div class="list-row-right"><button class="btn btn-danger-outline btn-small" data-action="remove-member" data-user-id="${m(a.user_id)}">Remove from team</button></div>`:""}
            </div>`).join("")}
        </div>
    `:""}function fI(e){return{user_id:e.id,name:e.name,avatar_url:e.avatar_url,pronouns:e.pronouns,tagline:e.tagline,bio:e.bio,mention_handle:null,is_agent:!0,role:null,kind:e.kind,owner_id:e.parent_user_id,owner_name:e.parent_user_name,project_id:e.agent_project_id,idle:!!e.idle,joined_at:e.created_at}}function ih(e,t=me()){return!e||!t?!1:e.user_id===t.id||e.is_agent&&e.owner_id===t.id}async function sh(e,t,{fresh:n=!1}={}){if(!n&&hr===e){const a=je.find(o=>o.user_id===t);if(a)return a}const s=(await th(e,!0)).find(a=>a.user_id===t)||null;return lI(e,s),s}let ah=0,ua=null;async function kr(e,t=!0){var r;t&&hn(),Lf();const n=++ah,i=T();if(!i)return;const s=window.location.pathname,a=()=>{var l;return n!==ah||((l=T())==null?void 0:l.id)!==i.id||window.location.pathname!==s};let o;try{o=await sh(i.id,e)}catch(l){if(a())return;k("load this profile",l),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}if(!a()){if(!o){const l=mt().find(c=>c.id===e);l&&(o=fI(l))}if(!o){$("Not on this team’s roster","error"),t||history.replaceState({view:"people"},"","/people"),O("people",t);return}t&&history.pushState({personId:e,view:"people"},"",`/people/${encodeURIComponent(e)}`),ls("people"),Hs("people"),Id(o),window.scrollTo(0,0),(r=document.querySelector("#person-detail-view .person-profile-name"))==null||r.focus({preventScroll:!0})}}function gI(){let e=document.getElementById("person-detail-view");return e||(e=document.createElement("div"),e.id="person-detail-view",e.className="view",document.querySelector(".main-content").appendChild(e)),e}function Id(e,{withIssues:t=!0}={}){var l;document.querySelectorAll(".view").forEach(c=>c.classList.add("hidden"));const n=gI();n.classList.remove("hidden"),n.dataset.userId=e.user_id,ua=e;const i=m(e.user_id),s=ih(e),a=e.user_id===((l=me())==null?void 0:l.id),o=e.bio?`<div class="person-bio markdown-body">${jn(e.bio)}</div>`:`<p class="person-bio-empty">${a?"You haven’t written a bio yet.":"No bio yet."}</p>`,r=e.joined_at?`<span>Joined ${u(new Date(e.joined_at).toLocaleDateString())}</span>`:"";n.innerHTML=`
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${s?`<button class="btn btn-primary" data-action="edit-profile" data-user-id="${i}">${a?"Edit your profile":"Edit profile"}</button>`:""}
            </div>
        </div>
        <div class="person-profile">
            ${zt(e,"avatar person-avatar-large")}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${u(e.name)}${e.pronouns?`<span class="person-pronouns">${u(e.pronouns)}</span>`:""}</h2>
                ${e.mention_handle?`<div class="person-handle">@${u(e.mention_handle)}</div>`:""}
                ${e.tagline?`<div class="person-tagline">${u(e.tagline)}</div>`:""}
                <div class="person-role">${u($r(e))}${r?" · ":""}${r}</div>
            </div>
        </div>
        ${o}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${e.is_agent?oI(e,je):""}
            ${!e.is_agent||!pr(e)?hI(e):""}
        </div>
    `,t&&yI(e.user_id),Zg(e)&&fr(e.user_id)}function hI(e){var i;if(!Ci())return"";const t=jt().find(s=>s.user_id===e.user_id);if(!t)return"";const n=e.user_id!==((i=me())==null?void 0:i.id)&&t.role!=="owner";return`
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${u($r(e))}</dd>
                ${t.user_email?`<dt>Email</dt><dd>${u(t.user_email)}</dd>`:""}
            </dl>
            ${n?`<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${m(e.user_id)}">Remove from team</button></div>`:""}
        </section>
    `}function _r(){const e=document.getElementById("people-view");return!!e&&!e.classList.contains("hidden")}function vI(e){const{agentId:t,deleted:n,created:i,credentials:s}=e.detail||{};if(s){fr(t);return}if(n){je=je.filter(a=>a.user_id!==t),pa(t)?O("people"):_r()&&Ni();return}if(i){_r()&&wr();return}pa(t)&&ua?Id(ua):_r()&&Ni()}function bI(e){const{userId:t}=e.detail||{};je=je.filter(n=>n.user_id!==t),pa(t)?O("people"):_r()&&Ni()}typeof window<"u"&&(window.addEventListener("chaotic:agent-changed",vI),window.addEventListener("chaotic:member-removed",bI));const oh=["in_progress","in_review","todo"];let rh=0;async function yI(e){const t=T();if(!t)return;const n=++rh;let i;try{i=await h.getTeamIssues(t.id,{assignee_id:e,status:oh,sort_by:"status",order:"asc",limit:20})}catch(o){i=null,console.error("Failed to load their issues:",o)}if(n!==rh)return;const s=document.getElementById("person-issues");if(!s)return;if(i===null){s.innerHTML='<p class="person-bio-empty">Couldn’t load their issues.</p>';return}if(!i.length){s.innerHTML='<p class="person-bio-empty">Nothing open assigned.</p>';return}const a=o=>oh.indexOf(o.status);s.innerHTML=[...i].sort((o,r)=>a(o)-a(r)).map(o=>`
        <a class="person-issue" href="/issue/${encodeURIComponent(o.identifier)}" data-action="person-open-issue" data-identifier="${m(o.identifier)}">
            <span class="person-issue-id">${u(o.identifier)}</span>
            <span class="person-issue-title">${u(o.title)}</span>
            <span class="person-issue-status">${u(String(o.status).replace("_"," "))}</span>
        </a>
    `).join("")}const Ld=["name","avatar_url","pronouns","tagline","bio"];function wI(e){const t=(n,i)=>{const s=String(i??"").replace(/\r\n?/g,`
`);return n==="bio"&&s.startsWith(`
`)?s.slice(1):s};return Object.fromEntries(Ld.map(n=>[n,t(n,e==null?void 0:e[n])]))}let Td=0;async function $I(e){var l;const t=me(),n=T();if(!t||!n)return;const i=++Td,s=window.location.pathname;let a;try{a=await sh(n.id,e,{fresh:!0})}catch(c){i===Td&&k("load this profile",c);return}if(i!==Td||window.location.pathname!==s||((l=T())==null?void 0:l.id)!==n.id||(!a&&e===t.id&&(a={...t,user_id:t.id}),!a||!ih(a,t)))return;br=e,da=a,qi=wI(a),Sd++;const o=e===t.id,r=c=>m(c||"");document.getElementById("modal-title").textContent=o?"Edit your profile":`Edit ${a.name}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${r(a.name)}" maxlength="${gr.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${r(a.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            ${o?`<div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${ma?" disabled":""}>
                    <button type="button" class="btn btn-secondary btn-small${ol.test(a.avatar_url||"")?"":" hidden"}" id="profile-photo-remove" data-action="remove-profile-photo"${ma?" disabled":""}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${dh}px.</p>
            </div>`:""}
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${r(a.pronouns)}" maxlength="${gr.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${r(a.tagline)}" maxlength="${gr.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${gr.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${u(a.bio||"")}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${yr?" disabled":""}>Save</button>
        </form>
    `,G()}function kI(e,t=null){const n=a=>{var o;return((o=e.querySelector(`#${a}`))==null?void 0:o.value)??""},i={name:n("profile-name"),avatar_url:n("profile-avatar").trim(),pronouns:n("profile-pronouns"),tagline:n("profile-tagline"),bio:n("profile-bio")},s={};for(const a of Ld){const o=t?String(t[a]??""):null;(a==="avatar_url"?i[a]===(o==null?void 0:o.trim()):i[a]===o)||(s[a]=a==="avatar_url"?i[a]||null:i[a])}return s}function lh(e){var i;const t=window.scrollY,n=document.getElementById("person-issues");Id(e,{withIssues:!1}),n&&((i=document.getElementById("person-issues"))==null||i.replaceWith(n)),window.scrollTo(0,t)}function pa(e){const t=document.getElementById("person-detail-view");return!!t&&!t.classList.contains("hidden")&&t.dataset.userId===e}function ch(){br=null,qi=null,da=null,F()}async function _I(e){e.preventDefault();const t=br;if(!t||yr)return;const n=e.target.closest("form")||e.target,i=kI(n,qi);if(!Object.keys(i).length){ch();return}const s=me(),a=t===(s==null?void 0:s.id),o=da,r=Sd,l=n.querySelector('button[type="submit"]');yr=!0,l&&(l.disabled=!0);try{const c=a?await h.updateMe(i):await h.updateAgent(t,i),d=Object.fromEntries(Ld.map(p=>[p,(c==null?void 0:c[p])??null]));je=je.map(p=>p.user_id===t?{...p,...d}:p),a&&(It({...s,...d}),Zo()),r===Sd&&ch(),$("Profile saved","success"),pa(t)?lh({...o,...d}):Ni()}catch(c){k("save the profile",c)}finally{yr=!1,l&&(l.disabled=!1);const c=document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');c&&(c.disabled=!1)}}const dh=256;async function EI(e,t=dh){var l;const n=await createImageBitmap(e),i=Math.min(n.width,n.height),s=document.createElement("canvas");s.width=t,s.height=t,s.getContext("2d").drawImage(n,(n.width-i)/2,(n.height-i)/2,i,i,0,0,t,t),(l=n.close)==null||l.call(n);const a=c=>new Promise(d=>s.toBlob(d,c,.9)),o=await a("image/webp");let r=o&&o.type==="image/webp"?o:null;if(!r){const c=s.getContext("2d");c.globalCompositeOperation="destination-over",c.fillStyle="#fff",c.fillRect(0,0,t,t),r=await a("image/jpeg")}if(!r)throw new Error("This browser could not convert the picture. Try a PNG or JPEG file.");return r}let ma=!1;function uh(e){for(const t of["profile-photo","profile-photo-remove"]){const n=document.getElementById(t);n&&(n.disabled=e)}}function xI(e){var i;const t=me();if(!t||!e||e.id&&e.id!==t.id)return;const n=e.avatar_url??null;if(je=je.map(s=>s.user_id===t.id?{...s,avatar_url:n}:s),It({...t,avatar_url:n}),Zo(),br===t.id&&qi){const s=document.getElementById("profile-avatar");s&&(s.value=n||""),qi={...qi,avatar_url:n||""},da={...da,avatar_url:n},(i=document.getElementById("profile-photo-remove"))==null||i.classList.toggle("hidden",!ol.test(n||""))}ua&&pa(t.id)&&lh({...ua,avatar_url:n})}async function ph(e,t,n){if(!ma){ma=!0,uh(!0);try{xI(await e()),$(t,"success")}catch(i){k(n,i)}finally{ma=!1,uh(!1)}}}async function SI(e,t=EI){var i;const n=(i=e.files)==null?void 0:i[0];if(n)try{await ph(async()=>h.uploadAvatar(await t(n)),"Photo uploaded","upload the photo")}finally{e.value=""}}function II(){return ph(()=>h.deleteAvatar(),"Photo removed","remove the photo")}function Ad(e){return e.metaKey||e.ctrlKey||e.shiftKey||e.button===1}ae({"view-person":(e,t)=>{e.type!=="click"||Ad(e)||(e.preventDefault(),kr(t.userId))},"edit-profile":(e,t)=>{e.type==="click"&&(e.preventDefault(),$I(t.userId))},"view-my-profile":e=>{var n;if(e.type!=="click")return;e.preventDefault(),(n=document.getElementById("user-dropdown"))==null||n.classList.add("hidden");const t=me();t&&kr(t.id)},"pick-profile-photo":(e,t,n)=>{e.type==="change"&&SI(n)},"remove-profile-photo":e=>{e.type==="click"&&II()},"save-profile":e=>{_I(e)},"retry-load-people":e=>{e.type==="click"&&wr()},"person-open-issue":(e,t)=>{e.type!=="click"||Ad(e)||(e.preventDefault(),No(t.identifier))},"revoke-agent-key":(e,t)=>{e.type==="click"&&rI(t.keyId,t.agentId)},"revoke-agent-connection":async(e,t)=>{e.type==="click"&&(await xg(t.connectionId,t.connectionName),fr(t.agentId))},"back-to-roster":e=>{e.type!=="click"||Ad(e)||(e.preventDefault(),O("people"))},"toggle-people-idle":(e,t,n)=>{e.type==="change"&&(xd=!!n.checked,wr())}});const LI=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let _t=[],Er=null,xr=null,Cd=0;ct(e=>{e==="currentProject"&&C()==="board"&&fa()});async function fa({fromMemory:e=!1}={}){Ra(-1);const t=++Cd,n=Q();if(!n){const o=document.getElementById("kanban-board");o&&(o.innerHTML=te().length===0?V({icon:U.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):V({icon:U.board,heading:"Select a project",description:"Board shows one project at a time. Pick one in the sidebar switcher, or press P."}));return}const i=document.getElementById("kanban-board"),s=Nl(),a=e?uo("board",s):void 0;a?(_t=a,Er=s,C()==="board"&&Lt(_t),Oi()):i&&(i.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const o=await h.getIssues({project_id:n});if(t!==Cd)return;const r=a&&po(_t,o);_t=o,Er=s,hi("board",s,o),C()==="board"&&Lt(_t),r||Oi()}catch(o){if(t!==Cd)return;i&&(i.innerHTML=V({icon:U.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),k("load board",o)}}const Bd=Sb(()=>fa(),200);function Oi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;Er&&hi("board",Er,_t),e.innerHTML=LI.map(i=>{const s=_t.filter(a=>a.status===i.key);return`
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
                    `:s.map(TI).join("")}
                </div>
            </div>
        `}).join(""),AI(t)}function TI(e){const t=e.assignee_id?wt(e.assignee_id):null,n=t?dt(t):null,i=e.estimate!=null?gn(e.estimate,e.project_id):"",s=qo(e.estimate,e.project_id),a=(e.labels||[]).slice(0,2);return`
        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${m(e.id)}" data-identifier="${m(e.identifier)}">
            <div class="kanban-card-top">
                <span class="kanban-card-identifier">${u(e.identifier)}</span>
                ${n?`<span class="kanban-card-assignee" title="${m(n)}">${zt(t,"avatar-small")}</span>`:""}
            </div>
            <div class="kanban-card-title">${u(e.title)}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority" title="Priority: ${m(Ae(e.priority))}">${pt(e.priority)}</span>
                ${i?`<span class="estimate-badge${s?" out-of-scale":""}"${s?' title="Estimate outside current scale"':""}>${u(i)}</span>`:""}
                ${a.map(o=>`<span class="issue-label" title="${m(o.name)}" style="background: ${se(o.color)}20; color: ${se(o.color)}">${u(o.name)}</span>`).join("")}
            </div>
        </div>
    `}function AI(e){const t=Vu();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ra(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ra(i),n[i].classList.add("keyboard-selected")}function CI(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),xr=t.dataset.id,t.classList.add("dragging")}function BI(e,t){t.classList.remove("dragging"),xr=null}function mh(e){const t=_t.find(n=>n.id===xr);return!!t&&t.status===e}function DI(e,t){e.preventDefault(),!mh(t.dataset.status)&&t.classList.add("drag-over")}function MI(e,t){t.classList.remove("drag-over")}function RI(e,t){e.preventDefault();const n=_t.find(i=>i.id===t.dataset.id);n&&mh(n.status)||t.classList.add("drag-over")}function jI(e,t){t.classList.remove("drag-over")}async function PI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=_t.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Oi();try{const o=await h.updateIssue(n,{status:i});$("Status updated","success"),bs(o)}catch(o){s.status=a,Oi(),k("update status",o)}}}async function qI(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=xr||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=_t.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Oi();try{const l=await h.updateIssue(n,{status:a});$("Status updated","success"),bs(l)}catch(l){o.status=r,Oi(),k("update status",l)}}}ae({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),re(t.id)):e.type==="dragstart"?CI(e,n):e.type==="dragend"?BI(e,n):e.type==="dragover"?RI(e,n):e.type==="dragleave"?jI(e,n):e.type==="drop"&&qI(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?DI(e,n):e.type==="dragleave"?MI(e,n):e.type==="drop"&&PI(e,n)},"retry-load-board":()=>fa()});const _n=new Map,fh=6e4,Dd=100;let Pe=null,Sr=null,Ir=null,ga=null,gh=!1;const hh={backlog:"var(--status-backlog)",todo:"var(--status-todo)",in_progress:"var(--status-in-progress)",in_review:"var(--status-in-review)",done:"var(--status-done)",canceled:"var(--status-canceled)"},vh={urgent:"var(--priority-urgent)",high:"var(--priority-high)",medium:"var(--priority-medium)",low:"var(--priority-low)",no_priority:"var(--priority-none)"},bh={api:null};let Md={...bh};function NI(e={}){Md={...bh,...e},Pe||(Pe=document.createElement("div"),Pe.className="issue-tooltip",Pe.style.display="none",document.body.appendChild(Pe),Pe.addEventListener("mouseenter",()=>{clearTimeout(Sr)}),Pe.addEventListener("mouseleave",()=>{Rd()})),gh||(document.addEventListener("mouseover",OI),document.addEventListener("mouseout",HI),gh=!0)}function OI(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=FI(t);if(n){if(n===ga&&Pe.style.display!=="none"){clearTimeout(Sr);return}clearTimeout(Ir),Ir=setTimeout(()=>{UI(t,n)},200)}}function HI(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ir),Sr=setTimeout(()=>{Rd()},150))}function FI(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function UI(e,t){ga=t;const n=e.getBoundingClientRect();Pe.style.left=`${n.left+window.scrollX}px`,Pe.style.top=`${n.bottom+window.scrollY+8}px`,Pe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',Pe.style.display="block";try{const i=await zI(t);if(ga!==t)return;VI(i)}catch{if(ga!==t)return;Pe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Rd(){clearTimeout(Ir),clearTimeout(Sr),Pe&&(Pe.style.display="none"),ga=null}function GI(){const e=Date.now();for(const[t,n]of _n.entries())e-n.timestamp>=fh&&_n.delete(t)}async function zI(e){_n.size>Dd/2&&GI();const t=_n.get(e);if(t&&Date.now()-t.timestamp<fh)return t.issue;if(!Md.api)throw new Error("API not initialized");const n=await Md.api.getIssueByIdentifier(e);if(_n.size>=Dd){const i=Array.from(_n.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Dd/2);for(const[a]of s)_n.delete(a)}return _n.set(e,{issue:n,timestamp:Date.now()}),n}function VI(e){const t=hh[e.status]||hh.backlog,n=vh[e.priority]||vh.no_priority,i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";Pe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${u(e.identifier)}</span>
            <span class="issue-tooltip-type">${u(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${u(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${WI(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${KI(e.priority)}</span>
        </div>
    `}function WI(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function KI(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function yh(){return!!document.querySelector(".description-inline-editor")}function jd(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Pd(){var e;return jd("issue-detail-view")?((e=Ee())==null?void 0:e.id)??null:null}function zn(e){return!!e&&Pd()===e}function YI(){Xe("issue:created",t0),Xe("issue:updated",n0),Xe("issue:deleted",i0),Xe("comment",o0),Xe("relation",l0),Xe("attestation",c0),Xe("activity",u0),Xe("project",p0),Xe("sprint",m0),Xe("document",r0),Xe("inbox",d0),Xe("connection:reconnected",f0),Xe("connection:unauthorized",ZI),Xe("connection:forbidden",XI),Xe("connection:superseded",QI)}function QI(){$("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function ZI(){h.logout(),It(null),Zn(null),ia(),$("Your session has ended. Please sign in again.","warning")}function XI(){$("Live updates stopped: you no longer have access to this team.","error")}function wh(e,t){var n;return e&&e===((n=me())==null?void 0:n.id)?"You":t||"Someone"}function JI(e){var s;const t=wh(e.creator_id,e.creator_name),n=e.title?`${t} created ${e.identifier}: ${e.title}`:`${t} created ${e.identifier}`,i=[];return e.issue_type&&i.push(lt(e.issue_type)),e.priority&&e.priority!=="no_priority"&&i.push(`${Ae(e.priority)} priority`),e.estimate!=null&&i.push(`${e.estimate} pt${e.estimate===1?"":"s"}`),e.assignee_id&&i.push(e.assignee_id===((s=me())==null?void 0:s.id)?"assigned to you":`assigned to ${e.assignee_name||"someone"}`),e.parent_identifier&&i.push(`under ${e.parent_identifier}`),i.length?[n,i.join(" · ")]:[n]}function e0(e,t){const n=t?`${e.identifier}: ${t}`:e.identifier;return e.deleted_by_id||e.deleted_by_name?[`${wh(e.deleted_by_id,e.deleted_by_name)} deleted ${n}`]:[`Issue ${n} was deleted`]}function $h(e,t,n){const i=$(t.join(`
`),n);if(i&&(t.length>1&&i.classList.add("toast-multiline"),e!=null&&e.id)){const s=i.querySelector(".toast-message");if(s){i.classList.add("toast-clickable"),s.title=`Open ${e.identifier}`,s.setAttribute("role","button"),s.tabIndex=0;const a=()=>{var o;(o=i.querySelector(".toast-close"))==null||o.click(),Promise.resolve(re(e.id)).catch(r=>console.error("Failed to open issue:",r))};s.addEventListener("click",a),s.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),a())})}}}function t0(e){var s;Is(C(),"board","sprints","epics");const t=ee(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,Je(a),C()==="issues"&&ut()}else Je([e,...t]),C()==="issues"&&ut(),$h(e,JI(e),"info");if(e.assignee_id===((s=me())==null?void 0:s.id)){const a=Ve(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)Cn([e,...a]),C()==="my-issues"&&Bn();else if(r>=0){const l=[...a];l[r]=e,Cn(l),C()==="my-issues"&&Bn()}}C()==="board"?Bd():C()==="sprints"?ha():C()==="epics"&&wn(),zn(e.parent_id)&&Vn(e.parent_id)}function n0(e){Is(C(),"board","sprints","epics"),Oa(e);const t=ee();t.some(s=>s.id===e.id)&&Je(t.map(s=>s.id===e.id?e:s));const n=Ve();n.some(s=>s.id===e.id)&&Cn(n.map(s=>s.id===e.id?e:s));const i=cs();i.some(s=>s.id===e.id)&&Lt(i.map(s=>s.id===e.id?e:s)),C()==="issues"?ut():C()==="my-issues"?Bn():C()==="board"?Bd():C()==="sprints"?ha():C()==="epics"&&wn(),zn(e.id)&&(yh()?sc(e):Vn(e.id))}function i0(e){var s,a;const t=e.title??((s=ee().find(o=>o.id===e.id))==null?void 0:s.title)??((a=Ve().find(o=>o.id===e.id))==null?void 0:a.title);Is(C(),"board","sprints","epics"),Vb(e.id),Je(ee().filter(o=>o.id!==e.id)),Cn(Ve().filter(o=>o.id!==e.id));const n=cs();n.some(o=>o.id===e.id)&&Lt(n.filter(o=>o.id!==e.id)),C()==="issues"?ut():C()==="my-issues"?(Bn(),ti({showLoading:!1})):C()==="board"?Bd():C()==="sprints"?ha():C()==="epics"&&wn();const i=zn(e.id);$h(null,e0(e,t),i?"warning":"info"),i&&O("my-issues")}const kh=250,s0=1e3,Hi=new Map;function Vn(e){yh()?sc():qd(e,kh)}function qd(e,t){let n=Hi.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Hi.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>a0(e),t))}async function a0(e){const t=Hi.get(e);if(!t)return;if(t.timer=null,!zn(e)){Hi.delete(e);return}t.inFlight=!0;let n;try{n=await re(e,!1,{refresh:!0})}finally{t.inFlight=!1}Hi.get(e)===t&&(t.again?(t.again=!1,qd(e,kh)):n==="retry"?qd(e,s0):Hi.delete(e))}function o0(e){C()==="my-issues"&&ti({showLoading:!1}),zn(e.issue_id)&&Vn(e.issue_id),e.document_id&&jm(e.document_id)}function r0(e,{type:t}={}){Is(C(),"documents"),Rm(),t==="deleted"?D$(e.id,e.title):jm(e.id)}function l0(e){const t=Pd();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Vn(t)}function c0(e){C()==="approvals"&&Dt(),zn(e.issue_id)&&Vn(e.issue_id)}function d0(e,t){var n;e.recipient_user_id===((n=me())==null?void 0:n.id)&&(Li(),rE(t==null?void 0:t.type,e),C()==="inbox"&&!dE(t==null?void 0:t.type,e)&&Ws({background:!0}))}function u0(e){C()==="my-issues"&&ti({showLoading:!1}),zn(e.issue_id)&&Vn(e.issue_id)}function p0(e,{type:t}){gt().then(()=>{C()==="projects"&&On()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?$(`New project: ${e.name}`,"info"):t==="deleted"&&$(`Project ${e.name} deleted`,"info")}function ha(){const e=Nk();e&&jd("sprint-detail-view")?ki(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):jd("sprints-view")&&fn().catch(t=>console.error("Failed to reload sprints:",t))}function m0(e,{type:t}={}){if(Is(C(),"sprints"),tf(),C()==="sprints"?ha():C()==="my-issues"&&gs(),t==="created")$(`New sprint: ${e.name}`,"info");else if(t==="closed"){const n=/^sprint\b/i.test(e.name||"")?e.name:`Sprint ${e.name}`,i=e.budget!=null&&e.points_spent!=null?` at ${e.points_spent}/${e.budget} points`:"";$(e.limbo?`${n} is closing${i}: rituals pending`:`${n} closed${i}`,"info")}}function f0(){const e=C();Ol(),Li(),e==="issues"?Ct().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(ei().catch(n=>console.error("Failed to resync my issues:",n)),gs().catch(n=>console.error("Failed to resync sprint status:",n)),ti({showLoading:!1})):e==="board"?fa():e==="sprints"?ha():e==="epics"?wn().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?gt().then(()=>{C()==="projects"&&On()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Rm():e==="approvals"?Dt():e==="inbox"&&Ws({background:!0});const t=Pd();t&&Vn(t)}const g0='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function _h(e){return Array.from(e.querySelectorAll(g0)).filter(t=>!t.closest(".hidden, [hidden]"))}function Eh(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function h0(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Eh(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const[n]=_h(t);n&&n.focus()}}}function va(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Eh(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=_h(n);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&va()});async function v0(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=Q();if(!i){$("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=te().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Je([r,...ee()]),ut();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=ee();d.some(p=>p.id===c.id)?Je(d.filter(p=>p.id!==a)):d.some(p=>p.id===a)&&Je(d.map(p=>p.id===a?c:p)),ut(),gt(),$("Issue created!","success")}catch(c){Je(ee().filter(d=>d.id!==a)),ut(),k("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Y_({beforeScrollRestore:Bl,beforeNavigate:()=>{Sk(),R_(),mf(null),Xn(null),Ku(null),va(),Rd(),jo()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Fg(e[1]),!0;if(e[0]==="issue"&&e[1])return _o(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(_o(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(T0(e[1]),!0):e[0]==="sprint"&&e[1]?(Fk(e[1]),!0):e[0]==="people"&&e[1]?(kr(decodeURIComponent(e[1]),!1),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(yf(e[1]),!0):!1},detailPopstate:e=>e.epicId?(dr(e.epicId,!1),!0):e.issueId?(re(e.issueId,!1),!0):e.identifier?(_o(e.identifier),!0):e.documentId?(Be(e.documentId,!1),!0):e.sprintId?(ki(e.sprintId,!1),!0):e.personId?(kr(e.personId,!1),!0):!1,restoreProject:()=>{const e=_f();e&&te().some(t=>t.id===e)&&bt(e)},issueNavigate:e=>_o(e),epicNavigate:e=>Fg(e)}),K_({"my-issues":()=>{gs(),ei(),ti()},approvals:()=>{Dt()},inbox:()=>{Ws({focusFirst:!0})},issues:()=>{var r;fw(),yw(),kw();const e=new URLSearchParams(window.location.search),t=e.getAll("label"),n=e.getAll("exclude_label"),i=e.get("sprint"),s=t.length>0||n.length>0||!!i||!!((r=document.getElementById("sprint-filter"))!=null&&r.value)||Mn().length>0||Rn().length>0;s||Ct();const a=Cp().then(()=>{if(t.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=t.includes(d.value)}),Wa())}if(n.length>0){const l=document.getElementById("exclude-label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(d=>{d.checked=n.includes(d.value)}),Ka())}}),o=Zp().then(()=>{if(i){const l=document.getElementById("sprint-filter");l&&(l.value=i)}});s?Promise.allSettled([a,o]).then(()=>Ct()):(a.catch(l=>console.error("Failed to populate label filter:",l)),o.catch(l=>console.error("Failed to update sprint filter:",l)))},query:()=>{TS()},epics:()=>{wn({fromMemory:!0})},board:()=>{fa({fromMemory:!0})},projects:()=>{On(),gt().then(On)},sprints:()=>{fn({fromMemory:!0})},rituals:()=>{o_()},documents:()=>{Nn(null,null,{fromMemory:!0})},people:wr,settings:()=>{od(),Eg(),Sg(),Es()}});function b0(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||F()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>F())}function y0(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>wf(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>q_());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>N_()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>$f(a))})}function w0(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Bm("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Bm("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Dm());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>L$());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Kt())}function $0(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>fp())}function k0(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>$w());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>nw());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>iw()),document.querySelectorAll(".multi-select-btn").forEach(g=>{const b=g.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?g.addEventListener("click",()=>Za("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?g.addEventListener("click",()=>Za("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?g.addEventListener("click",()=>Za("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&g.addEventListener("click",()=>Za("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Xa())});const g=i.querySelector(".btn-small");g&&g.addEventListener("click",()=>Ja())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Ll())});const g=s.querySelector(".btn-small");g&&g.addEventListener("click",()=>Tl())}const a=document.getElementById("label-filter-dropdown");if(a){const g=a.querySelector(".btn-small");g&&g.addEventListener("click",()=>eo())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const g=o.querySelector(".btn-small");g&&g.addEventListener("click",()=>to())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>ot());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>ot());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>ot());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>Ct());const p=document.getElementById("group-by-select");p&&p.addEventListener("change",()=>im());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",g=>v0(g))}function _0(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>l_(t.dataset.tab))})}function E0(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Vf());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>vs()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),O(o.dataset.view),r.detail>0&&Ug())})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>ME());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>va());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>h0());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>vs())}function x0(e){va(),$n()&&O(C()),C()==="query"?ES(e):e?bt(e):pf()}function xh(){return KS(document.getElementById(Ro),{returnFocus:!0})}ae({"navigate-to":(e,t)=>{O(t.view)},"switch-project":(e,t,n)=>{e.type==="change"&&x0(n.value)},showCreateIssueModal:()=>vs(),showCreateEpicModal:()=>MS(),"retry-load-epics":()=>wn(),showCreateProjectModal:()=>vf(),showCreateDocumentModal:()=>qm(),showCreateTeamModal:()=>Jf(),showEditTeamModal:()=>KE(),showInviteModal:()=>Qf(),showCreateApiKeyModal:()=>Yx(),showCreateAgentModal:()=>o$(),resetOnboarding:()=>og(),logout:()=>_g(),navigateToProjects:()=>O("projects")});async function S0(){if(!h.getToken()){await bg();return}Tf();const e=h.getMyTeams();e.catch(()=>{});const t=h.getMe(),n=await vb(qu(h.getToken()));if(n){t.then(i=>{It(i),Zo()},async i=>{if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await sl(),window.location.reload();return}console.error("Failed to confirm the session on boot:",i),$("Showing saved data — check your connection and reload","error")}),It(n.user),await Gn({teamsRequest:e,snapshot:n});return}try{const i=await t;It(i),await Gn({teamsRequest:e})}catch(i){if((i==null?void 0:i.status)===401||(i==null?void 0:i.status)===403){h.logout(),await bg();return}console.error("Failed to load current user on boot:",i),ia(),$("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{var e;Nb(),Wx(),E0(),b0(),$0(),k0(),_0(),y0(),w0(),I0(),YS(),(e=document.querySelector(`[data-picker-for="${Ro}"]`))==null||e.setAttribute("aria-keyshortcuts","P"),L0(),NI({api:h}),YI(),await S0()});function I0(){const e=document.getElementById("theme-toggle");if(!e)return;const t=Xv()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Jv(n?"light":"dark")})}function L0(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");No(i)}}})}async function T0(e){try{await Be(e,!1)}catch{O("documents",!1)}}document.addEventListener("keydown",qS({getCurrentView:C,getSelectedIndex:Gu,setSelectedIndex:Ln,viewIssue:re,showEditIssueModal:Om,showInlineDropdown:El,isInlineDropdownOpen:si,isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n,beforeNavigate:Bl})),document.addEventListener("keydown",NS({getCurrentView:C,getSelectedIndex:Lb,setSelectedIndex:zu,viewDocument:Be,showEditDocumentModal:Nm,isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",HS({getCurrentView:C,getSelectedIndex:Vu,setSelectedIndex:Ra,viewIssue:re,isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",OS({getCurrentView:C,getSelectedIndex:Tb,setSelectedIndex:ja,toggleInboxExpand:IE,collapseInboxExpand:mE,archiveInboxEntry:SE,isInlineDropdownOpen:si,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",FS()),document.addEventListener("keydown",kd({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&ki(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:Ab,setSelectedIndex:Wu,isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",kd({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Af(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:Cb,setSelectedIndex:cl,isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n})),document.addEventListener("keydown",kd({view:"my-issues",selector:"#my-issues-list .issue-row",open:e=>{var t;return(t=e.querySelector(".issue-title"))==null?void 0:t.click()},getCurrentView:C,getSelectedIndex:oy,setSelectedIndex:ry,isInlineDropdownOpen:si,isModalOpen:ze,isCommandPaletteOpen:yn,isDetailViewActive:$n}));function Sh(){var e;O("issues",!0,{transition:!1}),(e=document.getElementById("issue-search"))==null||e.focus()}function A0(){const e=t=>{const n=document.getElementById(t);return!!n&&!n.classList.contains("hidden")};return e("team-dropdown")||e("user-dropdown")||e("filter-menu-dropdown")||e("display-menu-dropdown")||!!document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)")||!!document.querySelector("#issue-detail-view details.related-add[open]")||E$()}document.addEventListener("keydown",jS({closeModal:F,closeSidebar:va,navigateTo:O,openProjectSwitcher:xh,showCreateIssueModal:vs,showKeyboardShortcutsHelp:Ag,isModalOpen:ze,focusSearch:Sh,isInlineDropdownOpen:si,closeInlineDropdowns:xb,isModalDirty:_b,focusModalField:Nu,closeDropdowns:()=>{var t;document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),ri();const e=document.querySelector("#issue-detail-view .overflow-menu-dropdown:not(.hidden)");e&&(e.classList.add("hidden"),(t=document.querySelector("#issue-detail-view .sidebar-overflow-trigger"))==null||t.setAttribute("aria-expanded","false"))},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))},isMenuOpen:A0,leaveDetailView:()=>{var e;return(e=document.querySelector("#issue-detail-view .back-link"))==null?void 0:e.click()}})),sS([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>O("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>O("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>O("board"),category:"Navigation"},{id:"switch-project",title:"Switch project",subtitle:"Change the project every view shows",icon:"🔀",shortcut:"P",action:()=>xh(),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"G P",action:()=>O("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>O("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>O("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>O("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>O("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>O("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>O("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to People",subtitle:"Everyone on the team, people and agents",icon:"👥",shortcut:"G T",action:()=>O("people"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>O("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{O("issues"),setTimeout(vs,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{O("projects"),setTimeout(vf,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{O("documents"),setTimeout(qm,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Jf(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:Sh,category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{O("people"),setTimeout(Qf,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Ag(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>og(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>_g(),category:"Account"}]),document.addEventListener("keydown",PS({isModalOpen:ze,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:yn,openCommandPalette:aS,closeCommandPalette:er})),window.marked=Y,window.DOMPurify=Iu,console.log("Chaotic frontend loaded via Vite")})();
