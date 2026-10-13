var qb=Object.defineProperty;var Nb=(dt,be,jt)=>be in dt?qb(dt,be,{enumerable:!0,configurable:!0,writable:!0,value:jt}):dt[be]=jt;var K=(dt,be,jt)=>Nb(dt,typeof be!="symbol"?be+"":be,jt);(function(){"use strict";var ur;function dt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var be=dt();function jt(e){be=e}var Fn={exec:()=>null};function U(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ye.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qd=/^(?:[ \t]*(?:\n|$))+/,Jd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,eu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,tu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,oa=/(?:[*+-]|\d{1,9}[.)])/,_r=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Sr=U(_r).replace(/bull/g,oa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),nu=U(_r).replace(/bull/g,oa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ra=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,iu=/^[^\n]+/,la=/(?!\s*\])(?:\\.|[^\[\]\\])+/,su=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",la).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),au=U(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,oa).getRegex(),Bi="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ca=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ou=U("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ca).replace("tag",Bi).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Tr=U(ra).replace("hr",Un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bi).getRegex(),ru=U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Tr).getRegex(),da={blockquote:ru,code:Jd,def:su,fences:eu,heading:tu,hr:Un,html:ou,lheading:Sr,list:au,newline:Qd,paragraph:Tr,table:Fn,text:iu},Lr=U("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bi).getRegex(),lu={...da,lheading:nu,table:Lr,paragraph:U(ra).replace("hr",Un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Lr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bi).getRegex()},cu={...da,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ca).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Fn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(ra).replace("hr",Un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},du=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,uu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Cr=/^( {2,}|\\)\n(?!\s*$)/,pu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Di=/[\p{P}\p{S}]/u,ua=/[\s\p{P}\p{S}]/u,Ar=/[^\s\p{P}\p{S}]/u,mu=U(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ua).getRegex(),Br=/(?!~)[\p{P}\p{S}]/u,fu=/(?!~)[\s\p{P}\p{S}]/u,gu=/(?:[^\s\p{P}\p{S}]|~)/u,hu=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Dr=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,vu=U(Dr,"u").replace(/punct/g,Di).getRegex(),bu=U(Dr,"u").replace(/punct/g,Br).getRegex(),Mr="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",yu=U(Mr,"gu").replace(/notPunctSpace/g,Ar).replace(/punctSpace/g,ua).replace(/punct/g,Di).getRegex(),wu=U(Mr,"gu").replace(/notPunctSpace/g,gu).replace(/punctSpace/g,fu).replace(/punct/g,Br).getRegex(),ku=U("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ar).replace(/punctSpace/g,ua).replace(/punct/g,Di).getRegex(),$u=U(/\\(punct)/,"gu").replace(/punct/g,Di).getRegex(),Eu=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),xu=U(ca).replace("(?:-->|$)","-->").getRegex(),Iu=U("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",xu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Mi=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,_u=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Mi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),jr=U(/^!?\[(label)\]\[(ref)\]/).replace("label",Mi).replace("ref",la).getRegex(),Rr=U(/^!?\[(ref)\](?:\[\])?/).replace("ref",la).getRegex(),Su=U("reflink|nolink(?!\\()","g").replace("reflink",jr).replace("nolink",Rr).getRegex(),pa={_backpedal:Fn,anyPunctuation:$u,autolink:Eu,blockSkip:hu,br:Cr,code:uu,del:Fn,emStrongLDelim:vu,emStrongRDelimAst:yu,emStrongRDelimUnd:ku,escape:du,link:_u,nolink:Rr,punctuation:mu,reflink:jr,reflinkSearch:Su,tag:Iu,text:pu,url:Fn},Tu={...pa,link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",Mi).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Mi).getRegex()},ma={...pa,emStrongRDelimAst:wu,emStrongLDelim:bu,url:U(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Lu={...ma,br:U(Cr).replace("{2,}","*").getRegex(),text:U(ma.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ji={normal:da,gfm:lu,pedantic:cu},Gn={normal:pa,gfm:ma,breaks:Lu,pedantic:Tu},Cu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pr=e=>Cu[e];function Ze(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Pr)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Pr);return e}function qr(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function Nr(e,t){var a;const n=e.replace(ye.findPipe,(o,r,l)=>{let c=!1,d=r;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),i=n.split(ye.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(ye.slashPipe,"|");return i}function zn(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function Au(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Or(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,l}function Bu(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var Ri=class{constructor(e){K(this,"options");K(this,"rules");K(this,"lexer");this.options=e||be}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:zn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=Bu(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=zn(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:zn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=zn(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))r.push(n[l]),o=!0;else if(!o)r.push(n[l]);else break;n=n.slice(l);const c=r.join(`
`),d=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${d}`:d;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const y=f,b=y.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,i=i.substring(0,i.length-y.raw.length)+w.raw,s=s.substring(0,s.length-y.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const y=f,b=y.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,i=i.substring(0,i.length-f.raw.length)+w.raw,s=s.substring(0,s.length-y.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let l=!1,c="",d="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),f=e.split(`
`,1)[0],y=!u.trim(),b=0;if(this.options.pedantic?(b=2,d=u.trimStart()):y?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,d=u.slice(b),b+=t[1].length),y&&this.rules.other.blankLine.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const S=this.rules.other.nextBulletRegex(b),D=this.rules.other.hrRegex(b),B=this.rules.other.fencesBeginRegex(b),x=this.rules.other.headingBeginRegex(b),R=this.rules.other.htmlBeginRegex(b);for(;e;){const _=e.split(`
`,1)[0];let V;if(f=_,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),V=f):V=f.replace(this.rules.other.tabCharGlobal,"    "),B.test(f)||x.test(f)||R.test(f)||S.test(f)||D.test(f))break;if(V.search(this.rules.other.nonSpaceChar)>=b||!f.trim())d+=`
`+V.slice(b);else{if(y||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||x.test(u)||D.test(u))break;d+=`
`+f}!y&&!f.trim()&&(y=!0),c+=_+`
`,e=e.substring(_.length+1),u=V.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let w=null,I;this.options.gfm&&(w=this.rules.other.listIsTask.exec(d),w&&(I=w[0]!=="[ ] ",d=d.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:c,task:!!w,checked:I,loose:!1,text:d,tokens:[]}),s.raw+=c}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(u=>u.type==="space"),d=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=d}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=Nr(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(Nr(r,a.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=zn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Au(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),Or(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Or(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,l=a,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+a);(i=d.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){l+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(l-=r,l>0)continue;r=Math.min(r,r+l+c);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const y=f.slice(2,-2);return{type:"strong",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},ut=class xr{constructor(t){K(this,"tokens");K(this,"options");K(this,"state");K(this,"tokenizer");K(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||be,this.options.tokenizer=this.options.tokenizer||new Ri,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ye,block:ji.normal,inline:Gn.normal};this.options.pedantic?(n.block=ji.pedantic,n.inline=Gn.pedantic):this.options.gfm&&(n.block=ji.gfm,this.options.breaks?n.inline=Gn.breaks:n.inline=Gn.gfm),this.tokenizer.rules=n}static get rules(){return{block:ji,inline:Gn}}static lex(t,n){return new xr(n).lex(t)}static lexInline(t,n){return new xr(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let l=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const d=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},d),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){const c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=l.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,l,c;let i=t,s=null;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let d;if((l=(r=this.options.extensions)==null?void 0:r.inline)!=null&&l.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);const f=n.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let f=1/0;const y=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},y),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(u)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Pi=class{constructor(e){K(this,"options");K(this,"parser");this.options=e||be}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(ye.notSpaceStart))==null?void 0:a[0],s=e.replace(ye.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Ze(i)+'">'+(n?s:Ze(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ze(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Ze(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ze(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=qr(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ze(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=qr(e);if(s===null)return Ze(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ze(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ze(e.text)}},fa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},pt=class Ir{constructor(t){K(this,"options");K(this,"renderer");K(this,"textRenderer");this.options=t||be,this.options.renderer=this.options.renderer||new Pi,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new fa}static parse(t,n){return new Ir(n).parse(t)}static parseInline(t,n){return new Ir(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=r,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){i+=d||"";continue}}const l=r;switch(l.type){case"space":{i+=this.renderer.space(l);continue}case"hr":{i+=this.renderer.hr(l);continue}case"heading":{i+=this.renderer.heading(l);continue}case"code":{i+=this.renderer.code(l);continue}case"table":{i+=this.renderer.table(l);continue}case"blockquote":{i+=this.renderer.blockquote(l);continue}case"list":{i+=this.renderer.list(l);continue}case"html":{i+=this.renderer.html(l);continue}case"paragraph":{i+=this.renderer.paragraph(l);continue}case"text":{let c=l,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?i+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):i+=d;continue}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=c||"";continue}}const l=r;switch(l.type){case"escape":{i+=n.text(l);break}case"html":{i+=n.html(l);break}case"link":{i+=n.link(l);break}case"image":{i+=n.image(l);break}case"strong":{i+=n.strong(l);break}case"em":{i+=n.em(l);break}case"codespan":{i+=n.codespan(l);break}case"br":{i+=n.br(l);break}case"del":{i+=n.del(l);break}case"text":{i+=n.text(l);break}default:{const c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},qi=(ur=class{constructor(e){K(this,"options");K(this,"block");this.options=e||be}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?ut.lex:ut.lexInline}provideParser(){return this.block?pt.parse:pt.parseInline}},K(ur,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),ur),Du=class{constructor(...e){K(this,"defaults",dt());K(this,"options",this.setOptions);K(this,"parse",this.parseMarkdown(!0));K(this,"parseInline",this.parseMarkdown(!1));K(this,"Parser",pt);K(this,"Renderer",Pi);K(this,"TextRenderer",fa);K(this,"Lexer",ut);K(this,"Tokenizer",Ri);K(this,"Hooks",qi);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const l of r)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const l=o[r].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new Pi(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new Ri(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],l=s[o];s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new qi;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],l=s[o];qi.passThroughHooks.has(a)?s[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(s,c)).then(u=>l.call(s,u));const d=r.call(s,c);return l.call(s,d)}:s[o]=(...c)=>{let d=r.apply(s,c);return d===!1&&(d=l.apply(s,c)),d}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ut.lex(e,t??this.defaults)}parser(e,t){return pt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?ut.lex:ut.lexInline,l=a.hooks?a.hooks.provideParser():e?pt.parse:pt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>l(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let d=l(c,a);return a.hooks&&(d=a.hooks.postprocess(d)),d}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Ze(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Rt=new Du;function F(e,t){return Rt.parse(e,t)}F.options=F.setOptions=function(e){return Rt.setOptions(e),F.defaults=Rt.defaults,jt(F.defaults),F},F.getDefaults=dt,F.defaults=be,F.use=function(...e){return Rt.use(...e),F.defaults=Rt.defaults,jt(F.defaults),F},F.walkTokens=function(e,t){return Rt.walkTokens(e,t)},F.parseInline=Rt.parseInline,F.Parser=pt,F.parser=pt.parse,F.Renderer=Pi,F.TextRenderer=fa,F.Lexer=ut,F.lexer=ut.lex,F.Tokenizer=Ri,F.Hooks=qi,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,pt.parse,ut.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:Hr,setPrototypeOf:Fr,isFrozen:Mu,getPrototypeOf:ju,getOwnPropertyDescriptor:Ru}=Object;let{freeze:we,seal:Re,create:ga}=Object,{apply:ha,construct:va}=typeof Reflect<"u"&&Reflect;we||(we=function(t){return t}),Re||(Re=function(t){return t}),ha||(ha=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),va||(va=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const Ni=$e(Array.prototype.forEach),Pu=$e(Array.prototype.lastIndexOf),Ur=$e(Array.prototype.pop),Vn=$e(Array.prototype.push),qu=$e(Array.prototype.splice),Oi=$e(String.prototype.toLowerCase),ba=$e(String.prototype.toString),ya=$e(String.prototype.match),Wn=$e(String.prototype.replace),Nu=$e(String.prototype.indexOf),Ou=$e(String.prototype.trim),Ge=$e(Object.prototype.hasOwnProperty),ke=$e(RegExp.prototype.test),Kn=Hu(TypeError);function $e(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return ha(e,t,i)}}function Hu(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return va(e,n)}}function P(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Oi;Fr&&Fr(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(Mu(t)||(t[i]=a),s=a)}e[s]=!0}return e}function Fu(e){for(let t=0;t<e.length;t++)Ge(e,t)||(e[t]=null);return e}function Xe(e){const t=ga(null);for(const[n,i]of Hr(e))Ge(e,n)&&(Array.isArray(i)?t[n]=Fu(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Xe(i):t[n]=i);return t}function Yn(e,t){for(;e!==null;){const i=Ru(e,t);if(i){if(i.get)return $e(i.get);if(typeof i.value=="function")return $e(i.value)}e=ju(e)}function n(){return null}return n}const Gr=we(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),wa=we(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ka=we(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Uu=we(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$a=we(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gu=we(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zr=we(["#text"]),Vr=we(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ea=we(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wr=we(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hi=we(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),zu=Re(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vu=Re(/<%[\w\W]*|[\w\W]*%>/gm),Wu=Re(/\$\{[\w\W]*/gm),Ku=Re(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yu=Re(/^aria-[\-\w]+$/),Kr=Re(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zu=Re(/^(?:\w+script|data):/i),Xu=Re(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yr=Re(/^html$/i),Qu=Re(/^[a-z][.\w]*(-[.\w]+)+$/i);var Zr=Object.freeze({__proto__:null,ARIA_ATTR:Yu,ATTR_WHITESPACE:Xu,CUSTOM_ELEMENT:Qu,DATA_ATTR:Ku,DOCTYPE_NAME:Yr,ERB_EXPR:Vu,IS_ALLOWED_URI:Kr,IS_SCRIPT_OR_DATA:Zu,MUSTACHE_EXPR:zu,TMPLIT_EXPR:Wu});const Zn={element:1,text:3,progressingInstruction:7,comment:8,document:9},Ju=function(){return typeof window>"u"?null:window},ep=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},Xr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Qr(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ju();const t=A=>Qr(A);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Zn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:l,NodeFilter:c,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:y}=e,b=l.prototype,w=Yn(b,"cloneNode"),I=Yn(b,"remove"),S=Yn(b,"nextSibling"),D=Yn(b,"childNodes"),B=Yn(b,"parentNode");if(typeof o=="function"){const A=n.createElement("template");A.content&&A.content.ownerDocument&&(n=A.content.ownerDocument)}let x,R="";const{implementation:_,createNodeIterator:V,createDocumentFragment:se,getElementsByTagName:he}=n,{importNode:Me}=i;let Y=Xr();t.isSupported=typeof Hr=="function"&&typeof B=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:le,ERB_EXPR:ae,TMPLIT_EXPR:je,DATA_ATTR:ot,ARIA_ATTR:Fe,IS_SCRIPT_OR_DATA:Ue,ATTR_WHITESPACE:Mt,CUSTOM_ELEMENT:rt}=Zr;let{IS_ALLOWED_URI:Qs}=Zr,v=null;const ie=P({},[...Gr,...wa,...ka,...$a,...zr]);let G=null;const Ti=P({},[...Vr,...Ea,...Wr,...Hi]);let W=Object.seal(ga(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Li=null,pr=null;const jn=Object.seal(ga(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Bd=!0,mr=!0,Dd=!1,Md=!0,Rn=!1,Js=!0,Zt=!1,fr=!1,gr=!1,Pn=!1,ea=!1,ta=!1,jd=!0,Rd=!1;const Cb="user-content-";let hr=!0,Ci=!1,qn={},lt=null;const vr=P({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Pd=null;const qd=P({},["audio","video","img","source","image","track"]);let br=null;const Nd=P({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),na="http://www.w3.org/1998/Math/MathML",ia="http://www.w3.org/2000/svg",$t="http://www.w3.org/1999/xhtml";let Nn=$t,yr=!1,wr=null;const Ab=P({},[na,ia,$t],ba);let sa=P({},["mi","mo","mn","ms","mtext"]),aa=P({},["annotation-xml"]);const Bb=P({},["title","style","font","a","script"]);let Ai=null;const Db=["application/xhtml+xml","text/html"],Mb="text/html";let ce=null,On=null;const jb=n.createElement("form"),Od=function(g){return g instanceof RegExp||g instanceof Function},kr=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(On&&On===g)){if((!g||typeof g!="object")&&(g={}),g=Xe(g),Ai=Db.indexOf(g.PARSER_MEDIA_TYPE)===-1?Mb:g.PARSER_MEDIA_TYPE,ce=Ai==="application/xhtml+xml"?ba:Oi,v=Ge(g,"ALLOWED_TAGS")?P({},g.ALLOWED_TAGS,ce):ie,G=Ge(g,"ALLOWED_ATTR")?P({},g.ALLOWED_ATTR,ce):Ti,wr=Ge(g,"ALLOWED_NAMESPACES")?P({},g.ALLOWED_NAMESPACES,ba):Ab,br=Ge(g,"ADD_URI_SAFE_ATTR")?P(Xe(Nd),g.ADD_URI_SAFE_ATTR,ce):Nd,Pd=Ge(g,"ADD_DATA_URI_TAGS")?P(Xe(qd),g.ADD_DATA_URI_TAGS,ce):qd,lt=Ge(g,"FORBID_CONTENTS")?P({},g.FORBID_CONTENTS,ce):vr,Li=Ge(g,"FORBID_TAGS")?P({},g.FORBID_TAGS,ce):Xe({}),pr=Ge(g,"FORBID_ATTR")?P({},g.FORBID_ATTR,ce):Xe({}),qn=Ge(g,"USE_PROFILES")?g.USE_PROFILES:!1,Bd=g.ALLOW_ARIA_ATTR!==!1,mr=g.ALLOW_DATA_ATTR!==!1,Dd=g.ALLOW_UNKNOWN_PROTOCOLS||!1,Md=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Rn=g.SAFE_FOR_TEMPLATES||!1,Js=g.SAFE_FOR_XML!==!1,Zt=g.WHOLE_DOCUMENT||!1,Pn=g.RETURN_DOM||!1,ea=g.RETURN_DOM_FRAGMENT||!1,ta=g.RETURN_TRUSTED_TYPE||!1,gr=g.FORCE_BODY||!1,jd=g.SANITIZE_DOM!==!1,Rd=g.SANITIZE_NAMED_PROPS||!1,hr=g.KEEP_CONTENT!==!1,Ci=g.IN_PLACE||!1,Qs=g.ALLOWED_URI_REGEXP||Kr,Nn=g.NAMESPACE||$t,sa=g.MATHML_TEXT_INTEGRATION_POINTS||sa,aa=g.HTML_INTEGRATION_POINTS||aa,W=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&Od(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(W.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&Od(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(W.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(W.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Rn&&(mr=!1),ea&&(Pn=!0),qn&&(v=P({},zr),G=[],qn.html===!0&&(P(v,Gr),P(G,Vr)),qn.svg===!0&&(P(v,wa),P(G,Ea),P(G,Hi)),qn.svgFilters===!0&&(P(v,ka),P(G,Ea),P(G,Hi)),qn.mathMl===!0&&(P(v,$a),P(G,Wr),P(G,Hi))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?jn.tagCheck=g.ADD_TAGS:(v===ie&&(v=Xe(v)),P(v,g.ADD_TAGS,ce))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?jn.attributeCheck=g.ADD_ATTR:(G===Ti&&(G=Xe(G)),P(G,g.ADD_ATTR,ce))),g.ADD_URI_SAFE_ATTR&&P(br,g.ADD_URI_SAFE_ATTR,ce),g.FORBID_CONTENTS&&(lt===vr&&(lt=Xe(lt)),P(lt,g.FORBID_CONTENTS,ce)),g.ADD_FORBID_CONTENTS&&(lt===vr&&(lt=Xe(lt)),P(lt,g.ADD_FORBID_CONTENTS,ce)),hr&&(v["#text"]=!0),Zt&&P(v,["html","head","body"]),v.table&&(P(v,["tbody"]),delete Li.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw Kn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Kn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=g.TRUSTED_TYPES_POLICY,R=x.createHTML("")}else x===void 0&&(x=ep(y,s)),x!==null&&typeof R=="string"&&(R=x.createHTML(""));we&&we(g),On=g}},Hd=P({},[...wa,...ka,...Uu]),Fd=P({},[...$a,...Gu]),Rb=function(g){let $=B(g);(!$||!$.tagName)&&($={namespaceURI:Nn,tagName:"template"});const T=Oi(g.tagName),ee=Oi($.tagName);return wr[g.namespaceURI]?g.namespaceURI===ia?$.namespaceURI===$t?T==="svg":$.namespaceURI===na?T==="svg"&&(ee==="annotation-xml"||sa[ee]):!!Hd[T]:g.namespaceURI===na?$.namespaceURI===$t?T==="math":$.namespaceURI===ia?T==="math"&&aa[ee]:!!Fd[T]:g.namespaceURI===$t?$.namespaceURI===ia&&!aa[ee]||$.namespaceURI===na&&!sa[ee]?!1:!Fd[T]&&(Bb[T]||!Hd[T]):!!(Ai==="application/xhtml+xml"&&wr[g.namespaceURI]):!1},ct=function(g){Vn(t.removed,{element:g});try{B(g).removeChild(g)}catch{I(g)}},Xt=function(g,$){try{Vn(t.removed,{attribute:$.getAttributeNode(g),from:$})}catch{Vn(t.removed,{attribute:null,from:$})}if($.removeAttribute(g),g==="is")if(Pn||ea)try{ct($)}catch{}else try{$.setAttribute(g,"")}catch{}},Ud=function(g){let $=null,T=null;if(gr)g="<remove></remove>"+g;else{const re=ya(g,/^[\r\n\t ]+/);T=re&&re[0]}Ai==="application/xhtml+xml"&&Nn===$t&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const ee=x?x.createHTML(g):g;if(Nn===$t)try{$=new f().parseFromString(ee,Ai)}catch{}if(!$||!$.documentElement){$=_.createDocument(Nn,"template",null);try{$.documentElement.innerHTML=yr?R:ee}catch{}}const ve=$.body||$.documentElement;return g&&T&&ve.insertBefore(n.createTextNode(T),ve.childNodes[0]||null),Nn===$t?he.call($,Zt?"html":"body")[0]:Zt?$.documentElement:ve},Gd=function(g){return V.call(g.ownerDocument||g,g,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},$r=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof d)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},zd=function(g){return typeof r=="function"&&g instanceof r};function Et(A,g,$){Ni(A,T=>{T.call(t,g,$,On)})}const Vd=function(g){let $=null;if(Et(Y.beforeSanitizeElements,g,null),$r(g))return ct(g),!0;const T=ce(g.nodeName);if(Et(Y.uponSanitizeElement,g,{tagName:T,allowedTags:v}),Js&&g.hasChildNodes()&&!zd(g.firstElementChild)&&ke(/<[/\w!]/g,g.innerHTML)&&ke(/<[/\w!]/g,g.textContent)||g.nodeType===Zn.progressingInstruction||Js&&g.nodeType===Zn.comment&&ke(/<[/\w]/g,g.data))return ct(g),!0;if(!(jn.tagCheck instanceof Function&&jn.tagCheck(T))&&(!v[T]||Li[T])){if(!Li[T]&&Kd(T)&&(W.tagNameCheck instanceof RegExp&&ke(W.tagNameCheck,T)||W.tagNameCheck instanceof Function&&W.tagNameCheck(T)))return!1;if(hr&&!lt[T]){const ee=B(g)||g.parentNode,ve=D(g)||g.childNodes;if(ve&&ee){const re=ve.length;for(let Ce=re-1;Ce>=0;--Ce){const xt=w(ve[Ce],!0);xt.__removalCount=(g.__removalCount||0)+1,ee.insertBefore(xt,S(g))}}}return ct(g),!0}return g instanceof l&&!Rb(g)||(T==="noscript"||T==="noembed"||T==="noframes")&&ke(/<\/no(script|embed|frames)/i,g.innerHTML)?(ct(g),!0):(Rn&&g.nodeType===Zn.text&&($=g.textContent,Ni([le,ae,je],ee=>{$=Wn($,ee," ")}),g.textContent!==$&&(Vn(t.removed,{element:g.cloneNode()}),g.textContent=$)),Et(Y.afterSanitizeElements,g,null),!1)},Wd=function(g,$,T){if(jd&&($==="id"||$==="name")&&(T in n||T in jb))return!1;if(!(mr&&!pr[$]&&ke(ot,$))){if(!(Bd&&ke(Fe,$))){if(!(jn.attributeCheck instanceof Function&&jn.attributeCheck($,g))){if(!G[$]||pr[$]){if(!(Kd(g)&&(W.tagNameCheck instanceof RegExp&&ke(W.tagNameCheck,g)||W.tagNameCheck instanceof Function&&W.tagNameCheck(g))&&(W.attributeNameCheck instanceof RegExp&&ke(W.attributeNameCheck,$)||W.attributeNameCheck instanceof Function&&W.attributeNameCheck($,g))||$==="is"&&W.allowCustomizedBuiltInElements&&(W.tagNameCheck instanceof RegExp&&ke(W.tagNameCheck,T)||W.tagNameCheck instanceof Function&&W.tagNameCheck(T))))return!1}else if(!br[$]){if(!ke(Qs,Wn(T,Mt,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&g!=="script"&&Nu(T,"data:")===0&&Pd[g])){if(!(Dd&&!ke(Ue,Wn(T,Mt,"")))){if(T)return!1}}}}}}}return!0},Kd=function(g){return g!=="annotation-xml"&&ya(g,rt)},Yd=function(g){Et(Y.beforeSanitizeAttributes,g,null);const{attributes:$}=g;if(!$||$r(g))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:G,forceKeepAttr:void 0};let ee=$.length;for(;ee--;){const ve=$[ee],{name:re,namespaceURI:Ce,value:xt}=ve,Hn=ce(re),Er=xt;let pe=re==="value"?Er:Ou(Er);if(T.attrName=Hn,T.attrValue=pe,T.keepAttr=!0,T.forceKeepAttr=void 0,Et(Y.uponSanitizeAttribute,g,T),pe=T.attrValue,Rd&&(Hn==="id"||Hn==="name")&&(Xt(re,g),pe=Cb+pe),Js&&ke(/((--!?|])>)|<\/(style|title|textarea)/i,pe)){Xt(re,g);continue}if(Hn==="attributename"&&ya(pe,"href")){Xt(re,g);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){Xt(re,g);continue}if(!Md&&ke(/\/>/i,pe)){Xt(re,g);continue}Rn&&Ni([le,ae,je],Xd=>{pe=Wn(pe,Xd," ")});const Zd=ce(g.nodeName);if(!Wd(Zd,Hn,pe)){Xt(re,g);continue}if(x&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ce)switch(y.getAttributeType(Zd,Hn)){case"TrustedHTML":{pe=x.createHTML(pe);break}case"TrustedScriptURL":{pe=x.createScriptURL(pe);break}}if(pe!==Er)try{Ce?g.setAttributeNS(Ce,re,pe):g.setAttribute(re,pe),$r(g)?ct(g):Ur(t.removed)}catch{Xt(re,g)}}Et(Y.afterSanitizeAttributes,g,null)},Pb=function A(g){let $=null;const T=Gd(g);for(Et(Y.beforeSanitizeShadowDOM,g,null);$=T.nextNode();)Et(Y.uponSanitizeShadowNode,$,null),Vd($),Yd($),$.content instanceof a&&A($.content);Et(Y.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(A){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,T=null,ee=null,ve=null;if(yr=!A,yr&&(A="<!-->"),typeof A!="string"&&!zd(A))if(typeof A.toString=="function"){if(A=A.toString(),typeof A!="string")throw Kn("dirty is not a string, aborting")}else throw Kn("toString is not a function");if(!t.isSupported)return A;if(fr||kr(g),t.removed=[],typeof A=="string"&&(Ci=!1),Ci){if(A.nodeName){const xt=ce(A.nodeName);if(!v[xt]||Li[xt])throw Kn("root node is forbidden and cannot be sanitized in-place")}}else if(A instanceof r)$=Ud("<!---->"),T=$.ownerDocument.importNode(A,!0),T.nodeType===Zn.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?$=T:$.appendChild(T);else{if(!Pn&&!Rn&&!Zt&&A.indexOf("<")===-1)return x&&ta?x.createHTML(A):A;if($=Ud(A),!$)return Pn?null:ta?R:""}$&&gr&&ct($.firstChild);const re=Gd(Ci?A:$);for(;ee=re.nextNode();)Vd(ee),Yd(ee),ee.content instanceof a&&Pb(ee.content);if(Ci)return A;if(Pn){if(ea)for(ve=se.call($.ownerDocument);$.firstChild;)ve.appendChild($.firstChild);else ve=$;return(G.shadowroot||G.shadowrootmode)&&(ve=Me.call(i,ve,!0)),ve}let Ce=Zt?$.outerHTML:$.innerHTML;return Zt&&v["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ke(Yr,$.ownerDocument.doctype.name)&&(Ce="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Ce),Rn&&Ni([le,ae,je],xt=>{Ce=Wn(Ce,xt," ")}),x&&ta?x.createHTML(Ce):Ce},t.setConfig=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kr(A),fr=!0},t.clearConfig=function(){On=null,fr=!1},t.isValidAttribute=function(A,g,$){On||kr({});const T=ce(A),ee=ce(g);return Wd(T,ee,$)},t.addHook=function(A,g){typeof g=="function"&&Vn(Y[A],g)},t.removeHook=function(A,g){if(g!==void 0){const $=Pu(Y[A],g);return $===-1?void 0:qu(Y[A],$,1)[0]}return Ur(Y[A])},t.removeHooks=function(A){Y[A]=[]},t.removeAllHooks=function(){Y=Xr()},t}var Jr=Qr();const xa="chaotic_";function Le(e){try{return localStorage.getItem(xa+e)}catch{return null}}function Pe(e,t){try{localStorage.setItem(xa+e,t)}catch{}}function Qe(e){try{localStorage.removeItem(xa+e)}catch{}}function tp(){return Le("token")}function np(e){e?Pe("token",e):Qe("token")}function ip(){return Le("theme")}function sp(e){Pe("theme",e)}function el(){return Le("last_project")}function ap(e){Pe("last_project",e)}function op(){return Le("onboarding_complete")==="true"}function rp(){Pe("onboarding_complete","true")}function lp(){Qe("onboarding_complete")}function cp(e){return e?Le(`issues_filters_${e}`):null}function dp(e,t){e&&(t?Pe(`issues_filters_${e}`,t):Qe(`issues_filters_${e}`))}function tl(e){return Le(`comment_draft_${e}`)}function Fi(e,t){t?Pe(`comment_draft_${e}`,t):Qe(`comment_draft_${e}`)}function nl(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Ui(e){const t=Le(`description_draft_${e}`);if(!t)return null;const n=nl(t);return n?n.draft:t}function il(e){const t=Le(`description_draft_${e}`);if(!t)return null;const n=nl(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function Pt(e,t,n=""){t?Pe(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Qe(`description_draft_${e}`)}function sl(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function al(e){var n;const t=Le(`document_draft_${e}`);return t?((n=sl(t))==null?void 0:n.draft)??null:null}function up(e){const t=Le(`document_draft_${e}`);if(!t)return null;const n=sl(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Gi(e,t,n=null){t&&(t.title||t.content||t.icon)?Pe(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Qe(`document_draft_${e}`)}function pp(){return{title:Le("create_issue_title"),description:Le("create_issue_description")}}function ol(e,t){e?Pe("create_issue_title",e):Qe("create_issue_title"),t?Pe("create_issue_description",t):Qe("create_issue_description")}function mp(){Qe("create_issue_title"),Qe("create_issue_description")}function fp(){return Le("doc_view_mode")}function gp(e){Pe("doc_view_mode",e)}function hp(){return Le("approvals_explainer_dismissed")==="1"}function vp(){Pe("approvals_explainer_dismissed","1")}const bp="/api";class yp{constructor(){this.token=tp()}setToken(t){this.token=t,np(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${bp}${n}`,a)}catch(l){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=l,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const l=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${l})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let l;typeof r.detail=="string"?l=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?l=r.detail.message:l="An error occurred";const c=new Error(l);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,i=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:i})}async createProjectAgent(t,n,i=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:i})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new yp;let Qt=null;const wp='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Jt=null,Xn=!1;function Ia(){Xn=!0}function kp(){Xn=!1}function rl(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function $p(){if(Xn)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function H(){Jt=document.activeElement,Xn=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;mt(),Xn=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Jt&&document.contains(Jt)&&typeof Jt.focus=="function"&&Jt.focus(),Jt=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(wp);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function Je(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`;const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},l=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=l,d=Date.now(),u=setTimeout(o,l);a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-d}),i.addEventListener("mouseleave",()=>{d=Date.now(),u=setTimeout(o,Math.max(c,500))})}function Ep(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function E(e,t){const n=Ep(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function mt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Qt&&(document.removeEventListener("keydown",Qt),Qt=null)}function xp(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));mt(),t&&Je()&&rl()}function Qn(e){Qt&&document.removeEventListener("keydown",Qt),Qt=e,e&&document.addEventListener("keydown",e)}function Jn(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(mt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function Ee(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function Ae(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function _a(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Z(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ip(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function qe(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function ft(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function _p(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function en(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?_p(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function ll(e){return e?'<span class="badge badge-agent" title="AI agent">agent</span>':""}let X={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Sa=new Set;function oe(e,t){if(typeof e=="string"){const n=X[e];X[e]=t,cl(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=X[i];X[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{cl(i,s,a)})}}function et(e){return Sa.add(e),()=>Sa.delete(e)}function cl(e,t,n){t!==n&&Sa.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const qt=()=>X.currentUser,zi=e=>oe("currentUser",e),C=()=>X.currentView,Sp=e=>oe("currentView",e),Be=()=>X.issues,tt=e=>oe("issues",e),Vi=()=>X.detailNavContext,tn=e=>oe("detailNavContext",e),dl=()=>X.labels,Wi=e=>oe("labels",e),ul=()=>X.activeFilterCategory,Tp=e=>oe("activeFilterCategory",e),pl=()=>X.selectedIssueIndex,ei=e=>oe("selectedIssueIndex",e),Lp=()=>X.selectedDocIndex,ml=e=>oe("selectedDocIndex",e),fl=()=>X.selectedBoardIndex,Ki=e=>oe("selectedBoardIndex",e),Cp=()=>X.selectedInboxIndex,Ta=e=>oe("selectedInboxIndex",e),Ap=()=>X.selectedSprintIndex,gl=e=>oe("selectedSprintIndex",e),Bp=()=>X.selectedEpicIndex,hl=e=>oe("selectedEpicIndex",e),Dp=()=>X.pendingGates,Mp=e=>oe("pendingGates",e),Yi=()=>X.inboxEntries,Zi=e=>oe("inboxEntries",e),La=()=>X.inboxUnreadCount,Xi=e=>oe("inboxUnreadCount",e),jp=()=>X.searchDebounceTimer,Rp=e=>oe("searchDebounceTimer",e),Pp=()=>X.websocket,vl=e=>oe("websocket",e),L=()=>X.currentTeam,Ca=e=>oe("currentTeam",e),z=()=>X.currentProject,ze=e=>oe("currentProject",e||null),Ne=()=>X.currentDetailIssue,Qi=e=>oe("currentDetailIssue",e),qp=()=>X.currentDetailSprints,bl=e=>oe("currentDetailSprints",e),Aa={};function te(e){Object.assign(Aa,e)}function Np(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Aa[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let yl=!1;function Op(){if(!yl){yl=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Np);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Aa[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Ba=["backlog","todo","in_progress","in_review","done","canceled"],nn=["backlog","todo","in_progress","in_review"],wl=["urgent","high","medium","low","no_priority"],Da=["no_priority","urgent","high","medium","low"],kl=["backlog","todo","in_progress","in_review","done"];function q({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,l])=>` data-${p(r)}="${p(l)}"`).join(""):""}>${m(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${a}
        </div>
    `}const j={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'};let ti=[];function Hp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Fp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function Ji(e,t){const n=e().map(Hp),i=t().map(Fp);ti=[...n,...i]}function sn(e){return e&&ti.find(t=>t.id===e)||null}function Nt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ma(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${i}`}function es(){const e=ti.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));ti.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const i=[];e.forEach(a=>{i.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,l)=>r.name.localeCompare(l.name)),o.forEach(r=>i.push({assignee:r,indent:!0}))});const s=ti.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return s.sort((a,o)=>a.name.localeCompare(o.name)),s.forEach(a=>i.push({assignee:a,indent:!1})),i}function ts(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;es().forEach(({assignee:i,indent:s})=>{n+=`<option value="${i.id}">${Ma(i,s)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function an(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function on(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function rn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function ln(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function $l(){const e=document.getElementById("group-by-select");return e?e.value:""}const El=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],ns=["done","canceled"];function xl(e){var t,n,i;switch(e){case"project":return z()?1:0;case"status":return an().length;case"priority":return on().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return rn().length;case"exclude_labels":return ln().length;default:return 0}}function ja(){let e=0;return El.forEach(t=>{e+=xl(t.key)}),e}function Il(){var y,b,w,I,S,D;const e=new URLSearchParams,t=an(),n=on(),i=rn(),s=ln(),a=(y=document.getElementById("assignee-filter"))==null?void 0:y.value,o=z()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,l=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,c=(I=document.getElementById("group-by-select"))==null?void 0:I.value,d=(S=document.getElementById("sort-by-select"))==null?void 0:S.value;t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),i.forEach(B=>e.append("label",B)),s.forEach(B=>e.append("exclude_label",B)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),l&&e.set("issue_type",l),c&&e.set("groupBy",c),d&&d!=="created-desc"&&e.set("sort",d);const u=e.toString(),f=u?`/issues?${u}`:"/issues";history.replaceState({view:"issues"},"",f),dp((D=L())==null?void 0:D.id,u)}function Up(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=cp((b=L())==null?void 0:b.id);if(w){t=new URLSearchParams(w);const I=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",I)}}const s=t.getAll("status");if(s.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=s.includes(S.value)}),_l())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=a.includes(S.value)}),Sl())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),ze(r),e(!1));const l=t.get("sprint");if(l){const w=document.getElementById("sprint-filter");w&&(w.value=l)}const c=t.get("issue_type");if(c){const w=document.getElementById("issue-type-filter");w&&(w.value=c)}const d=t.getAll("label");if(d.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=d.includes(S.value)}),is())}const u=t.getAll("exclude_label");if(u.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=u.includes(S.value)}),ss())}const f=t.get("groupBy");if(f){const w=document.getElementById("group-by-select");w&&(w.value=f)}const y=t.get("sort");if(y){const w=document.getElementById("sort-by-select");w&&(w.value=y)}}function _l(){const e=an(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=Ee(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Sl(){const e=on(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=Ae(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function is(){var i,s;const e=rn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function ss(){var i,s;const e=ln(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Tl(){if(!L())return;let e;try{e=await h.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Ll("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Ll("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Ll(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const l=document.createElement("label");l.className="multi-select-option",l.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${Z(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(l)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function as(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Cl)},0))}function Cl(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Cl))}function Gp(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",cn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),me(),xe(ul()),setTimeout(()=>{document.addEventListener("click",cn)},0))}function zp(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",cn)):(e.classList.remove("hidden"),tm(),setTimeout(()=>{document.addEventListener("click",cn)},0))}function cn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",cn))}function Ot(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",cn)}function me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=z();e.innerHTML=El.map(n=>{const i=xl(n.key),s=ul()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function xe(e){Tp(e),me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Wp(t);break;case"status":Kp(t);break;case"priority":Yp(t);break;case"type":Zp(t);break;case"assignee":Xp(t);break;case"sprint":Qp(t);break;case"labels":Jp(t);break;case"exclude_labels":em(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Vp(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),me()}function Wp(e){const t=z()||"",n=ne()||[];let i=`
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
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Z(s.color)};"></span>
                <span class="filter-option-label">${m(s.name)}</span>
            </label>
        `}),e.innerHTML=i}function Kp(e){const t=an(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=nn.every(o=>t.includes(o))&&!ns.some(o=>t.includes(o))&&t.length===nn.length,s=ns.every(o=>t.includes(o))&&!nn.some(o=>t.includes(o))&&t.length===ns.length;let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${i?"active":""}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${s?"active":""}" data-action="set-status-preset" data-value="closed">Closed</button>
        </div>
    `;n.forEach(o=>{a+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${p(o.value)}">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function Yp(e){const t=on(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Zp(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Xp(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=zt()||[];let s=`
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
        `}),e.innerHTML=s}function Qp(e){if(!z()){e.innerHTML=`
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
        `}),e.innerHTML=a}function Jp(e){const t=rn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Z(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function em(e){const t=ln(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),l=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",d=(l==null?void 0:l.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Z(d)};"></span>
                    <span class="filter-option-label">${m(c)}</span>
                </label>
            `}),e.innerHTML=s}function tm(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
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
    `;e.innerHTML=r}function Ie(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=z();if(n){const f=(ne()||[]).find(y=>y.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=an();if(i.length>0){const u=i.map(f=>Ee(f)).join(", ");t.push({category:"status",label:"Status",value:u,clearAction:"clear-status-filter-new"})}const s=on();if(s.length>0){const u=s.map(f=>Ae(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const y=(zt()||[]).find(b=>b.user_id===o.value);u=(y==null?void 0:y.name)||(y==null?void 0:y.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const l=rn();if(l.length>0){const u=document.getElementById("label-filter-dropdown"),f=l.map(y=>{var I;const b=u==null?void 0:u.querySelector(`input[value="${y}"]`),w=(I=b==null?void 0:b.closest("label"))==null?void 0:I.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const c=ln();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=c.map(y=>{var I;const b=u==null?void 0:u.querySelector(`input[value="${y}"]`),w=(I=b==null?void 0:b.closest("label"))==null?void 0:I.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${m(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=d}function _e(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=ja();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Al(){const e=document.getElementById("sprint-filter");if(!e)return;const t=z(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",Ra(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${m(a.name)})</option>`),Cc(t,a==null?void 0:a.id),Ra(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function Ra(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Bl(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Dl=!1;et(e=>{if(e!=="currentProject"||C()!=="issues"||Dl)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Al(),Tl()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),is(),ss(),De(),Ie(),_e()}).catch(n=>{console.error("Failed to update filters on project switch:",n),De(),Ie(),_e()})});function nm(){Up(e=>{Dl=e})}function os(){_l(),De(),Ie(),_e()}function Pa(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),os()}function qa(){Sl(),De(),Ie(),_e()}function Na(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),qa()}function Oa(){is(),De(),Ie(),_e()}function rs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Oa()}function Ha(){ss(),De(),Ie(),_e()}function ls(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ha()}function im(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Ml(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${im(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let cs=0;async function gt(){var f,y,b,w,I,S,D;ei(-1);const e=++cs;if(!L())return;const t=z()||"",n=an(),i=on(),s=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,a=(b=(y=document.getElementById("issue-search"))==null?void 0:y.value)==null?void 0:b.trim();if(!t&&ne().length===0){document.getElementById("issues-list").innerHTML=q({icon:j.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}Bl();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[l,c]=r.includes("-")?r.split("-"):[r,null];o.sort_by=l,c&&(o.order=c),n.length>0&&(o.status=n),i.length>0&&(o.priority=i),s&&(s==="me"?o.assignee_id=(I=qt())==null?void 0:I.id:o.assignee_id=s);const d=(S=document.getElementById("sprint-filter"))==null?void 0:S.value;if(d)if(d==="current"){if(t){const B=fg(t);if(B!==void 0)B&&(o.sprint_id=B);else try{const R=(await h.getSprints(t)).find(_=>_.status==="active");Cc(t,R==null?void 0:R.id),R&&(o.sprint_id=R.id)}catch(x){console.error("Failed to resolve current sprint:",x)}}}else o.sprint_id=d;const u=(D=document.getElementById("issue-type-filter"))==null?void 0:D.value;u&&(o.issue_type=u),a&&a.length>=1&&(o.search=a);try{const B=Ml(rn(),"label-filter-dropdown");B.length>0&&(o.label=B,o.label_match="any");const x=Ml(ln(),"exclude-label-filter-dropdown");x.length>0&&(o.exclude_label=x);let R;if(t?(o.project_id=t,R=await h.getIssues(o)):ne().length>0&&(R=await h.getTeamIssues(L().id,o)),e!==cs)return;tt(R),C()==="issues"&&tn(R);const _=[...new Set(R.map(V=>V.project_id))];if(await Lc(_),e!==cs)return;ht()}catch(B){if(e!==cs)return;const x=document.getElementById("issues-list");x&&(x.innerHTML=q({icon:j.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),E("load issues",B)}}function sm(){clearTimeout(jp()),Rp(setTimeout(()=>{gt()},300))}function De(){Il(),gt()}async function jl(){if(Il(),$l()==="sprint"){const e=Be(),t=[...new Set(e.map(n=>n.project_id))];await Lc(t)}ht()}function am(){Ie(),_e()}function Rl(e){ze(e),me(),xe("project"),Ot()}function om(){Rl("")}function rm(e){const t=e==="open"?nn:ns,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),os(),me(),xe("status")}function lm(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,os()),me(),xe("status")}function cm(){Pa(),me(),xe("status"),Ie(),_e()}function dm(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,qa()),me(),xe("priority")}function um(){Na(),me(),xe("priority"),Ie(),_e()}function Pl(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,De()),me(),xe("type"),Ie(),_e(),Ot()}function pm(){Pl("")}function ql(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,De()),me(),xe("assignee"),Ie(),_e(),Ot()}function mm(){ql("")}function Nl(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,De()),me(),xe("sprint"),Ie(),_e(),Ot()}function fm(){Nl("")}function gm(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Oa()),me(),xe("labels")}function hm(){rs(),me(),xe("labels"),Ie(),_e()}function vm(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ha()),me(),xe("exclude_labels")}function bm(){ls(),me(),xe("exclude_labels"),Ie(),_e()}function ym(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,gt()),Ot()}function wm(e){const t=document.getElementById("group-by-select");t&&(t.value=e,jl()),Ot()}function km(){ze(null),Pa(),Na();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),rs(),ls(),De(),Ie(),_e()}te({"update-label-filter":()=>Oa(),"clear-label-filter":()=>rs(),"update-exclude-label-filter":()=>Ha(),"clear-exclude-label-filter":()=>ls(),"show-filter-category":(e,t)=>{var n,i;xe(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Vp();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>Rl(t.value),"clear-project-filter":()=>om(),"clear-status-filter-new":()=>cm(),"set-status-preset":(e,t)=>rm(t.value),"toggle-status-option":(e,t)=>lm(t.filterValue,e),"clear-priority-filter-new":()=>um(),"toggle-priority-option":(e,t)=>dm(t.filterValue,e),"set-type-filter":(e,t)=>Pl(t.value),"clear-type-filter":()=>pm(),"set-assignee-filter":(e,t)=>ql(t.value),"clear-assignee-filter":()=>mm(),"set-sprint-filter":(e,t)=>Nl(t.value),"clear-sprint-filter":()=>fm(),"clear-label-filter-new":()=>hm(),"toggle-label-option":(e,t)=>gm(t.filterValue,e),"clear-exclude-label-filter-new":()=>bm(),"toggle-exclude-label-option":(e,t)=>vm(t.filterValue,e),"set-sort":(e,t)=>ym(t.value),"set-group-by":(e,t)=>wm(t.value),"clear-all-filters":()=>km(),"retry-load-issues":()=>gt()});let dn=[],Fa=[];et(e=>{e==="currentProject"&&C()==="my-issues"&&(pn(),ii(),mn())});function It(){return dn}function un(e){dn=e}let Ua=0;async function pn(){var a;const e=L(),t=qt();if(!e||!t)return;const n=++Ua,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=z();Em();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==Ua)return;dn=r,C()==="my-issues"&&tn(dn),ni()}catch(o){if(n!==Ua)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=q({icon:j.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),E("load issues",o)}}async function mn({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=z();Fa=await h.getTeamActivities(t.id,0,10,{projectId:i}),$m()}catch{n&&(n.innerHTML=q({icon:j.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function $m(){const e=document.getElementById("dashboard-activity-list");if(e){if(!Fa.length){e.innerHTML=q({icon:j.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=Fa.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Ja(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${to(t)}${n}</span>
                <span class="activity-actor">by ${m(eo(t))}</span>
                <span class="activity-time">${qe(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function Em(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Ol(){pn()}function ni(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),dn.length===0){e.innerHTML=q({icon:j.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=dn.map(t=>Ve(t)).join("")}}let Ga=0;async function ii(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++Ga,n=z(),i=ne(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const l=await h.getCurrentSprint(r.id);if(!l)return null;let c={};try{const d=await h.getIssues({sprint_id:l.id,project_id:r.id,limit:500});for(const u of d)c[u.status]=(c[u.status]||0)+1}catch(d){console.error(`Failed to load issue counts for sprint ${l.id}:`,d)}return{project:r,sprint:l,statusCounts:c}}catch(l){return console.error(`Failed to load current sprint for project ${r.id}:`,l),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==Ga)return;xm(o)}catch(a){if(t!==Ga)return;console.error("Failed to load sprint status:",a),e.innerHTML=q({icon:j.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function xm(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,l=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,d=s.limbo?"limbo":c?"arrears":"",u=a||{},f=Object.values(u).reduce((y,b)=>y+b,0);return`
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
                                    ${n.filter(y=>u[y]).map(y=>{const b=Math.round(u[y]/f*100);return`<div class="sprint-stacked-segment status-${y}" style="width: ${b}%" title="${Ee(y)}: ${u[y]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(y=>u[y]).map(y=>`<span class="sprint-count-label status-${y}">${u[y]} ${Ee(y)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}te({"filter-my-issues":()=>Ol(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),Xc(t.identifier)},"retry-load-my-issues":()=>pn(),"retry-load-sprint-status":()=>ii()});const Hl=Ba,Im=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let nt=[],Fl=Promise.resolve();const _m={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function Ul(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function ds(){return!!document.querySelector(".inline-dropdown")}function Gl(){return nt}function zl(e){nt=e}async function za(e,t,n,i){var u,f,y,b;e.preventDefault(),mt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${Hl.map((w,I)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${w}">
                    ${Se(w)}
                    <span>${Ee(w)}</span>
                    <span class="dropdown-shortcut">${I+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Da.map((w,I)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${w}">
                    ${it(w)}
                    <span>${Ae(w)}</span>
                    <span class="dropdown-shortcut">${I}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Im.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${ft(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=es();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${w.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:w.map(({assignee:I,indent:S},D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(I.id)}">
                    ${en(I,"avatar-small")}
                    <span>${Ma(I,S)}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),I=(w==null?void 0:w.dataset.projectId)||((u=Ne())==null?void 0:u.project_id),S=In(I);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${S.map((D,B)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${D.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${D.label}</span>
                    ${B<9?`<span class="dropdown-shortcut">${B}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=Be(),I=It(),S=Ne(),D=w.find(le=>le.id===n)||I.find(le=>le.id===n)||S,B=new Set(((D==null?void 0:D.labels)||[]).map(le=>le.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const x=o.getBoundingClientRect();let R=a.bottom+4,_=a.left;_+x.width>window.innerWidth-8&&(_=a.right-x.width),R+x.height>window.innerHeight-8&&(R=a.top-x.height-4),o.style.top=`${R}px`,o.style.left=`${Math.max(8,_)}px`,Jn(o,{multiSelect:!0});let V=[];const se=L();if(se)try{V=await h.getLabels(se.id)}catch(le){console.error("Failed to load labels:",le)}if(!o.parentNode)return;Wl(o,n,V,B);const he=o.getBoundingClientRect();let Me=a.bottom+4,Y=a.left;Y+he.width>window.innerWidth-8&&(Y=a.right-he.width),Me+he.height>window.innerHeight-8&&(Me=a.top-he.height-4),o.style.top=`${Me}px`,o.style.left=`${Math.max(8,Y)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=Be(),I=It(),S=Ne(),D=w.find(ae=>ae.id===n)||I.find(ae=>ae.id===n)||S,B=(D==null?void 0:D.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const x=o.getBoundingClientRect();let R=a.bottom+4,_=a.left;_+x.width>window.innerWidth-8&&(_=a.right-x.width),R+x.height>window.innerHeight-8&&(R=a.top-x.height-4),o.style.top=`${R}px`,o.style.left=`${Math.max(8,_)}px`,Jn(o);let V=[];if(B)try{V=await h.getSprints(B),mg(B,V)}catch(ae){console.error("Failed to load sprints:",ae)}if(!o.parentNode)return;const se=V.filter(ae=>ae.status!=="completed"||ae.id===(D==null?void 0:D.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${se.map((ae,je)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(ae.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(ae.name)}${ae.status==="active"?" (Active)":""}</span>
                    ${je<9?`<span class="dropdown-shortcut">${je+1}</span>`:""}
                </button>
            `).join("")}
        `;const he=o.getBoundingClientRect();let Me=a.bottom+4,Y=a.left;Y+he.width>window.innerWidth-8&&(Y=a.right-he.width),Me+he.height>window.innerHeight-8&&(Me=a.top-he.height-4),o.style.top=`${Me}px`,o.style.left=`${Math.max(8,Y)}px`,o.classList.remove("dropdown-positioning");const le=ae=>{const je=ae.key;if(je==="Escape"||je==="Tab"){mt(),document.removeEventListener("keydown",le),Qn(null);return}if(Ul(ae,o))return;const ot=parseInt(je);if(isNaN(ot))return;const Fe=o.querySelectorAll(".dropdown-option");let Ue=!1;ot===0?(fn(n,"sprint_id",null),Ue=!0):ot>=1&&ot<Fe.length&&(Fe[ot].click(),Ue=!0),Ue&&(document.removeEventListener("keydown",le),Qn(null))};Qn(le),document.addEventListener("keydown",le),(y=o.querySelector(".dropdown-option[data-action]"))==null||y.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let l=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),l+r.height>window.innerHeight-8&&(l=a.top-r.height-4),o.style.top=`${l}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const d=w=>{const I=w.key;if(I==="Escape"||I==="Tab"){mt(),document.removeEventListener("keydown",d);return}if(Ul(w,o))return;const S=parseInt(I);if(isNaN(S))return;let D=!1;if(t==="status"&&S>=1&&S<=6)fn(n,"status",Hl[S-1]),D=!0;else if(t==="priority"&&S>=0&&S<=4)fn(n,"priority",Da[S]),D=!0;else if(t==="estimate"){const B=Ne(),x=In(B==null?void 0:B.project_id);S>=0&&S<x.length&&(fn(n,"estimate",x[S].value),D=!0)}D&&(document.removeEventListener("keydown",d),Qn(null))};Qn(d),document.addEventListener("keydown",d),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),Jn(o)}function Sm(e,t,n,i){za(e,t,n,i)}function Tm(e,t,n){Fl=Fl.then(()=>Vl(e,t,n))}async function Vl(e,t,n){const i=Be(),s=It(),a=Ne(),o=i.find(d=>d.id===e)||s.find(d=>d.id===e)||a;if(!o)return;const r=(o.labels||[]).map(d=>d.id),l=r.indexOf(t);let c;if(l>=0?c=r.filter(d=>d!==t):c=[...r,t],n){const d=l<0;n.classList.toggle("selected",d),n.querySelector(".label-check").textContent=d?"✓":""}try{const u=(await h.updateIssue(e,{label_ids:c})).labels||[],f=i.findIndex(I=>I.id===e);f!==-1&&(i[f].labels=u,tt([...i]));const y=s.findIndex(I=>I.id===e);y!==-1&&(s[y].labels=u,un([...s])),(a==null?void 0:a.id)===e&&Qi({...a,labels:u});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const I=i.find(S=>S.id===e)||s.find(S=>S.id===e);I&&(b.outerHTML=Ve(I))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map(I=>`
                    <span class="issue-label" style="background: ${Z(I.color)}20; color: ${Z(I.color)}">${m(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(d){if(E("update labels",d),n){const u=l>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function Wl(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const a=i.has(s.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(s.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${Z(s.color)}20; color: ${Z(s.color)}">${m(s.name)}</span>
                </button>
            `}).join("")}
    `}async function Kl(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=L();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);Wi(o),a!=null&&a.id&&await Vl(e,a.id,null);const r=Be(),l=It(),c=Ne(),d=r.find(f=>f.id===e)||l.find(f=>f.id===e)||c,u=new Set(((d==null?void 0:d.labels)||[]).map(f=>f.id));t&&Wl(t,e,o,u),n.value=""}catch(a){E("create label",a)}finally{n.disabled=!1,n.focus()}}}function us(){const e=document.getElementById("create-issue-labels-label");e&&(nt.length===0?e.textContent="Labels":e.textContent=`Labels (${nt.length})`)}function Va(e,{failed:t=!1}={}){const n=dl();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=nt.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${Z(i.color)}20; color: ${Z(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function Lm(e){const t=nt.indexOf(e);t>=0?nt.splice(t,1):nt.push(e),Ia(),us();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&Va(n)}async function Yl(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);Wi(a),s!=null&&s.id&&!nt.includes(s.id)&&(nt.push(s.id),Ia()),us(),t&&Va(t),n.value=""}catch(s){E("create label",s)}finally{n.disabled=!1,n.focus()}}}async function fn(e,t,n){mt();const i=document.querySelector(`.issue-row[data-issue-id="${e}"]`);i&&i.classList.add("updating");try{const s={};s[t]=n;const a=await h.updateIssue(e,s);if(!a||!a.id)throw new Error("Invalid response from server");const o=Be(),r=o.findIndex(u=>u.id===e);r!==-1&&(o[r]=a,tt([...o]));const l=It(),c=l.findIndex(u=>u.id===e);c!==-1&&(l[c]=a,un([...l]));const d=Ne();if((d==null?void 0:d.id)===e&&Qi(a),i&&i.parentNode){const u=o.find(f=>f.id===e)||l.find(f=>f.id===e)||a;if(u){i.outerHTML=Ve(u);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(f){f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500);const y=_m[t],b=y&&f.querySelector(`[data-dropdown-type="${y}"]`);b&&b.focus()}}}if(k("Issue updated","success"),t==="status"){const u=z();if(u)try{const y=(await h.getSprints(u)).find(b=>b.status==="active");Ra(y||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&Cm(t,a)}}catch(s){E("update issue",s),i&&i.classList.remove("updating")}}function Cm(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const l of a){const c=l.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===s.toLowerCase()){o=l;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Se(t.status)}
            <span>${Ee(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${it(t.priority)}
            <span>${Ae(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${ft(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const l=t.assignee_id?sn(t.assignee_id):null,c=l?Nt(l):null;r.innerHTML=c?`${en(l,"avatar-small")}<span>${m(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const l=qp(),c=t.sprint_id&&l?l.find(d=>d.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?m(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Ms(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}te({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?fn(t.issueId,i,n==="null"?null:Number(n)):fn(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{Tm(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{Kl(t.issueId)},"toggle-create-issue-label":(e,t)=>{Lm(t.labelId)},"create-label-for-create-issue":()=>{Yl()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),Kl(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),Yl())}});const Zl=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function _t(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function gn(e){const t=_t(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function ht(){var s,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(s=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:s.dataset.issueId;e.classList.add("issue-list-linear");const n=Be();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),l=ja()>0,c=r&&r.length>=2;if(l||c){const d=ja(),u=[];c&&u.push(`search "${r}"`),l&&u.push(`${d} active filter${d>1?"s":""}`),e.innerHTML=q({icon:j.issues,heading:"No matching issues",description:`No issues match your ${u.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=q({icon:j.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});ei(-1);return}const i=$l();i==="status"?Bm(e,n):i==="priority"?Dm(e,n):i==="type"?Mm(e,n):i==="assignee"?jm(e,n):i==="sprint"?Rm(e,n):e.innerHTML=gn(n)+n.map(r=>Ve(r)).join(""),Am(t)}function Am(e){const t=pl();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){ei(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),ei(i),n[i].classList.add("keyboard-selected")}function Bm(e,t){const n={};Ba.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=gn(t);Ba.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Se(s)}</span>
                    <span class="group-title">${Ee(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${_t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ve(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function Dm(e,t){const n={};wl.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=gn(t);wl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${it(s)}</span>
                    <span class="group-title">${Ae(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${_t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ve(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function Mm(e,t){const n={};Zl.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=gn(t);Zl.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${ft(s)}</span></span>
                    <span class="group-title">${ft(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${_t(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ve(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function jm(e,t){const n={},i="__unassigned__";n[i]=[];const s=es();s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=gn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${_t(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[i].map(o=>Ve(o)).join("")}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const l=Nt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${en(o,"avatar-small")}</span>
                    <span class="group-title">${m(l)}${m(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${_t(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(d=>Ve(d)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Rm(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(l=>{l.sprint_id?(i[l.sprint_id]||(i[l.sprint_id]=[],s.push(l.sprint_id)),i[l.sprint_id].push(l)):i[n].push(l)});const a={active:0,planned:1,completed:2},o=_c();s.sort((l,c)=>{const d=o[l],u=o[c],f=d?a[d.status]??3:3,y=u?a[u.status]??3:3;return f-y});let r=gn(t);s.forEach(l=>{const c=i[l];if(c.length===0)return;const d=o[l],u=d?d.name:l,f=d?d.status==="active"?" (Active)":d.status==="completed"?" (Done)":"":"",y=l.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${y}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${y}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(u)}${f}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${_t(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${c.map(b=>Ve(b)).join("")}
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
                    <span class="group-points">${_t(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${i[n].map(l=>Ve(l)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Pm(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Xl(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(i)}<mark class="search-match">${m(s)}</mark>${m(a)}`}function qm(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=Xl(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}function Ve(e){var u,f,y;const t=e.assignee_id?sn(e.assignee_id):null,n=t?Nt(t):null,i=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),s=e.estimate!=null?Ms(e.estimate,e.project_id):"",a=To(e.estimate,e.project_id),o=e.sprint_id?_c()[e.sprint_id]:null,r=o?o.name:null,l=(f=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:f.trim(),c=!!l&&((y=e.title)==null?void 0:y.toLowerCase().includes(l.toLowerCase())),d=l&&!c?qm(e.description,l):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${Ae(e.priority)}">
                    ${it(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${Ee(e.status)}">
                    ${Se(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${ft(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${Xl(e.title,l)}${d?` <span class="issue-search-snippet" title="Matched in description">— ${d}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(b=>`
                            <span class="issue-label" style="background: ${Z(b.color)}20; color: ${Z(b.color)}">${m(b.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${r?m(r):"None"}">
                    ${r?`<span class="sprint-badge">${m(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${s||"None"}`}">
                    ${s?`<span class="estimate-badge${a?" out-of-scale":""}">${s}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${i}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?en(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function it(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Se(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}te({"toggle-group":(e,t)=>{Pm(t.group)},"show-inline-dropdown":(e,t,n)=>{za(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),Q(t.issueId))}});function Nm(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Om(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function Wa(e="new-comment",t="mention-suggestions"){const n=document.getElementById(e),i=document.getElementById(t);if(!n||!i||n.dataset.mentionsBound==="true")return;n.dataset.mentionsBound="true";let s=-1;const a=()=>{i.classList.add("hidden"),i.innerHTML="",s=-1},o=c=>{var u,f;const d=i.querySelectorAll(".mention-suggestion");d.length!==0&&(s=(c%d.length+d.length)%d.length,d.forEach((y,b)=>y.classList.toggle("highlighted",b===s)),(f=(u=d[s]).scrollIntoView)==null||f.call(u,{block:"nearest"}))},r=c=>{const d=n.selectionStart||0,u=n.value.slice(0,d).replace(/@([a-zA-Z0-9._-]*)$/,`@${c} `),f=n.value.slice(d);n.value=u+f,n.focus(),a()},l=()=>{const c=n.selectionStart||0;if(Om(n.value,c)){a();return}const u=n.value.slice(0,c).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!u){a();return}const f=u[2].toLowerCase(),y=zt().map(b=>({id:b.id,name:b.name||b.email||"User",email:b.email||"",handle:Nm(b)})).filter(b=>!f||b.handle.includes(f)||b.name.toLowerCase().includes(f)||b.email.toLowerCase().includes(f)).slice(0,6);if(!y.length){a();return}i.innerHTML=y.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${m(b.name)}</span>
                <span class="mention-handle">@${m(b.handle)}</span>
            </button>
        `).join(""),i.classList.remove("hidden"),i.querySelectorAll(".mention-suggestion").forEach((b,w)=>{b.addEventListener("click",()=>r(b.dataset.handle)),b.addEventListener("mouseenter",()=>o(w))}),o(0)};n.addEventListener("input",l),n.addEventListener("click",l),n.addEventListener("keydown",c=>{const d=!i.classList.contains("hidden");if(c.key==="Escape"&&d){c.preventDefault(),c.stopPropagation(),a();return}if(d){if(c.key==="ArrowDown")c.preventDefault(),o(s+1);else if(c.key==="ArrowUp")c.preventDefault(),o(s-1);else if(c.key==="Enter"||c.key==="Tab"){const f=i.querySelectorAll(".mention-suggestion")[s];f&&(c.preventDefault(),r(f.dataset.handle))}}}),n.addEventListener("blur",()=>{setTimeout(a,150)})}const Ql=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function si(e=null){const t=e||z()||"";zl([]);const n=ne().map(o=>`
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
                            ${Ql.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${Se("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${it("no_priority")}
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
    `,H(),us();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=pp();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{ol(i.value,s.value)}),s.addEventListener("input",()=>{ol(i.value,s.value)}),i.focus()}function Hm(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Fm(e){const t=Ql.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function Um(e,t){const n=ne().find(i=>i.id===t);zl([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?m(n.name):"Project"}</span>
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
                            ${Se("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${it("no_priority")}
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
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${p(e)}" data-project-id="${p(t)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,H(),us(),document.getElementById("create-issue-title").focus()}async function Gm(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null;if(!n){k("Please enter a title","error");return}try{const d=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:Gl(),parent_id:e});O(),k(`Created sub-issue ${d.identifier}`,"success"),Q(e)}catch(d){E("create sub-issue",d)}}async function zm(e,t,n){var o,r;mt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const l=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${kl.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(Ee(c))}">
                    ${Se(c)}
                    <span>${Ee(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const l=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Da.map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(Ae(c))}">
                    ${it(c)}
                    <span>${Ae(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const l=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(c=>`
                <button class="dropdown-option ${c===l?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(ft(c))}">
                    <span class="issue-type-badge type-${c}">${ft(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let l=dl(),c=!1;if(l.length===0)try{l=await h.getLabels(L().id),Wi(l)}catch(d){console.error("Failed to load labels:",d),c=!0}Va(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Jn(a,{multiSelect:!0});return}else if(e==="assignee"){const l=document.getElementById("create-issue-assignee").value,c=es();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${l?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:u})=>{const f=Nt(d)||"User";return`
                <button class="dropdown-option ${d.id===l?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(d.id)}" data-label="${p(f)}">
                    ${en(d,"avatar-small")}
                    <span>${Ma(d,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const l=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,d=In(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===l?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(f)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${m(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const l=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await h.getSprints(c)).filter(f=>f.status!=="completed");a.innerHTML=`
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
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Jn(a)}function Vm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Wm(e,t,n){var s;document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,Ia();const i=m(n);if(e==="status"){const a=document.querySelector(".toolbar-btn:first-child");a.innerHTML=`${Se(t)}<span id="create-issue-status-label">${i}</span>`}else if(e==="priority"){const a=document.querySelectorAll(".toolbar-btn")[1];a.innerHTML=`${it(t)}<span id="create-issue-priority-label">${i}</span>`}else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${ft(t)}</span><span id="create-issue-type-label">${i}</span>`)}mt(),(s=document.querySelector(`.toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`))==null||s.focus()}async function Jl({keepOpen:e=!1}={}){var w,I;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,l=document.getElementById("create-issue-estimate").value,c=l?parseInt(l):null,d=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=(I=document.getElementById("create-issue-due-date"))==null?void 0:I.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const y=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");y&&(y.disabled=!0),b&&(b.disabled=!0);try{const S=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:d,label_ids:Gl(),due_date:f});k(`Created ${S.identifier}`,"success"),mp(),C()==="issues"?gt():C()==="my-issues"&&pn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",kp(),document.getElementById("create-issue-title").focus()):(O(),Q(S.id))}catch(S){E("create issue",S)}finally{y&&(y.disabled=!1),b&&(b.disabled=!1)}}async function Km(){await Jl({keepOpen:!1})}async function Ym(){await Jl({keepOpen:!0})}te({"toggle-create-dropdown":(e,t,n)=>{zm(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Wm(t.field,t.value,t.label)},"create-issue-submit":()=>{Km()},"create-issue-and-new":()=>{Ym()},"update-create-project":()=>{Vm()},"apply-template":e=>{Fm(e.target.value)},"toggle-create-options":()=>{Hm()},"create-sub-issue-submit":(e,t)=>{Gm(t.parentId,t.projectId)}});async function ec(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=In(t.project_id).map(o=>`
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
        `,H();const a=document.getElementById("edit-issue-description");if(a){const o=Ui(e);if(o){const r=il(e),l=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,l&&(l.textContent="Restored your unsaved description draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",l.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?Pt(e,r,t.description||""):Pt(e,null)})}}catch(t){E("load issue",t)}}async function Zm(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),l=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:i?i.value:"",status:s.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:l&&l.value?l.value:null};await h.updateIssue(t,c),Ui(t)===c.description&&Pt(t,null),O(),await Q(t),k("Issue updated!","success")}catch(n){E("update issue",n)}}async function Xm(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await gt(),await Oe(),M("issues"),k("Issue deleted!","success")}catch(t){E("delete issue",t)}}te({"update-issue":(e,t)=>{Zm(e,t.issueId)}});let de=null,tc=!1,hn=!1,nc="new-comment";function Qm(){return de||(de=document.createElement("div"),de.className="quote-tooltip",de.setAttribute("role","button"),de.setAttribute("tabindex","0"),de.setAttribute("aria-label","Quote selection in comment"),de.textContent="Quote",de.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),ps())}),de.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),de.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),ps()}),document.body.appendChild(de),de)}function ic(e,t){const n=Qm();n.style.display="flex",hn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!hn)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function ai(){de&&(de.style.display="none"),hn=!1}function sc(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function Ka(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=sc(t.startContainer),i=sc(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Jm(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function ps(e=nc){const t=Ka();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Jm(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),ai(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function ef(){var i;if(!Ka())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return ic(n.left+n.width/2,n.top),!0}function tf(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!Ka()){ai();return}ic(t,n)},10)}function ac({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(nc=t,i.addEventListener("mouseup",tf,n?{signal:n}:void 0),tc||(tc=!0,document.addEventListener("mousedown",s=>{hn&&de&&!de.contains(s.target)&&ai()}),document.addEventListener("selectionchange",()=>{hn&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&ai()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&hn&&ai()}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&ef()})))}function oc(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function rc(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,l=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let d;for(;(d=c.exec(t))!==null;)if(l=!0,d.index>r&&o.appendChild(document.createTextNode(t.slice(r,d.index))),d[1]){const u=d[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=d.index+d[0].length}else if(d[3]){d[2]&&o.appendChild(document.createTextNode(d[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+d[3],o.appendChild(u),r=d.index+d[0].length}l&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function lc(e){if(!e)return"";const t=We(e),n=document.createElement("div");return n.innerHTML=t,oc(n,rc),n.innerHTML}function vn(e){if(!e)return"";const t=We(e),n=document.createElement("div");return n.innerHTML=t,oc(n,rc),n.innerHTML}let Ya=!1,Za=!1,St=!0,oi=null,ms=null,fs=null,gs=null,Xa=!1,hs=null;function Qa(e=null){Xa=!0,e&&(hs=e)}function Ja(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function eo(e){return e.user_name||e.user_email||"Unknown"}function to(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(Ee(t(e.old_value)))}</strong> to <strong>${m(Ee(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(Ae(t(e.old_value)))}</strong> to <strong>${m(Ae(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function nf(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function sf(){St=!St;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",St),n&&n.classList.toggle("rotated",St)}async function vs(e){try{oi=await h.getTicketRitualsStatus(e),cc(e)}catch(t){console.error("Failed to load ticket rituals:",t),oi=null}}function cc(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!oi){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=oi;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(d=>d.approval_mode==="gate")&&(St=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",St);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",St);const r=n.some(d=>d.trigger==="ticket_close"),l=n.some(d=>d.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&l?c="⚠️ Pending rituals (claim before starting, close before completing):":l?c="⚠️ Complete these rituals before claiming this ticket:":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
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
                        <div class="ticket-ritual-prompt markdown-body">${d.prompt?We(d.prompt):""}</div>
                        ${d.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(d.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${qe(d.attestation.attested_at)}</span>
                                ${d.attestation.note?`<div class="attestation-note markdown-body">${We(d.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${kg(d,e)}
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
                                <span class="attestation-time">${qe(d.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function bs(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await Q(t.id,!1),!0):(M("my-issues",!1),!1)}catch{return M("my-issues",!1),!1}}function dc(e){const t=Vi(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function uc({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function af(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=Ne();if(!t)return;const n=dc(t.id);ms=n.prevIssue?n.prevIssue.id:null,fs=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=uc(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}et(e=>{e==="detailNavContext"&&af()});let no=0,pc=0,ys=!1;function mc(){if(document.querySelector(".description-inline-editor"))return"editor";if(ds())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||ys?"transient":null}function fc(e){return Qa(),e==="editor"?"deferred":"retry"}function of(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=Ne())==null?void 0:n.id)===e}async function Q(e,t=!0,{refresh:n=!1}={}){const i=n?no:++no,s=++pc;if(n){const a=mc();if(a)return fc(a)}try{t&&Ut(),n||(St=!0);let a=!1;const[o,r,l,c,d,u]=await Promise.all([h.getIssue(e),h.getComments(e).catch(v=>(console.error("Failed to load comments:",v),a=!0,[])),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),y=[...u.pending_rituals||[],...u.completed_rituals||[]].filter(v=>v.attestation&&v.attestation.note).map(v=>({id:`attestation-${v.attestation.id}`,author_name:v.attestation.attested_by_name||"Unknown",content:v.attestation.note,created_at:v.attestation.attested_at,is_attestation:!0,ritual_name:v.name,is_pending:!v.attestation.approved_at})),b=[...r,...y].sort((v,ie)=>new Date(v.created_at)-new Date(ie.created_at)),w=[o.parent_id?h.getIssue(o.parent_id):Promise.resolve(null),h.getSprints(o.project_id).catch(v=>(console.error("Failed to load sprints:",v),[]))],[I,S]=await Promise.all(w);if(i!==no)return"dropped";let D=null,B=null;if(n){if(s!==pc||!of(e))return"dropped";const v=mc();if(v)return fc(v);B=window.scrollY;const ie=document.activeElement;ie!=null&&ie.id&&document.getElementById("issue-detail-view").contains(ie)&&(D={id:ie.id,start:ie.selectionStart,end:ie.selectionEnd})}oi=u;const x=d.filter(v=>v.relation_type==="blocks"&&v.direction==="outgoing"),R=d.filter(v=>v.relation_type==="blocked_by"||v.relation_type==="blocks"&&v.direction==="incoming"),_=d.filter(v=>v.relation_type==="relates_to");t&&history.pushState({issueId:e,view:C()},"",`/issue/${o.identifier}`),Qi(o),bl(S),Xa=!1,hs=null,document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));const V=document.getElementById("issue-detail-view");V.classList.remove("hidden");const se=C()||"my-issues",he=ne().find(v=>v.id===o.project_id),Me=o.assignee_id?sn(o.assignee_id):null,Y=Me?Nt(Me):null,le=o.sprint_id?S.find(v=>v.id===o.sprint_id):null,ae=dc(o.id),{prevIssue:je,nextIssue:ot}=ae;V.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(se)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${uc(ae)}
                        <span class="issue-detail-breadcrumb">${he?m(he.name):"Project"} › ${m(o.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(o.title)}</h1>

                    ${I?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(I.identifier)}" data-action="navigate-issue" data-issue-id="${p(I.id)}" data-identifier="${p(I.identifier)}">${I.identifier}: ${m(I.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(o.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${Ui(o.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${o.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(o.id)}">
                            ${o.description?vn(o.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${p(o.id)}" data-project-id="${p(o.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${c.length===0?q({icon:j.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):c.map(v=>`
                                <a href="/issue/${encodeURIComponent(v.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(v.id)}" data-identifier="${p(v.identifier)}">
                                    <span class="sub-issue-status">${Se(v.status)}</span>
                                    <span class="sub-issue-id">${v.identifier}</span>
                                    <span class="sub-issue-title">${m(v.title)}</span>
                                    ${v.estimate!=null?`<span class="sub-issue-estimate">${v.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(o.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${x.length===0&&R.length===0&&_.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${R.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${R.map(v=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Se(v.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(v.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(v.related_issue_id)}" data-identifier="${p(v.related_issue_identifier)}" class="relation-link">${v.related_issue_identifier}</a>
                                            <span class="relation-title">${m(v.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(v.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${x.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${x.map(v=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Se(v.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(v.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(v.related_issue_id)}" data-identifier="${p(v.related_issue_identifier)}" class="relation-link">${v.related_issue_identifier}</a>
                                            <span class="relation-title">${m(v.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(v.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${_.map(v=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${Se(v.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(v.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(v.related_issue_id)}" data-identifier="${p(v.related_issue_identifier)}" class="relation-link">${v.related_issue_identifier}</a>
                                            <span class="relation-title">${m(v.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(v.id)}" title="Remove relation">
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
                            ${a?`
                                <div class="comments-error">
                                    Comments failed to load.
                                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${p(o.id)}">Retry</button>
                                </div>
                            `:""}
                            ${b.length===0?a?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:b.map(v=>{var ie;return`
                                <div class="comment ${v.is_attestation?"comment-attestation":""} ${v.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${v.is_attestation?"avatar-attestation":""}">${v.is_attestation?v.is_pending?"⏳":"✓":(v.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(v.author_name||"User")}</span>
                                            ${ll((ie=sn(v.author_id))==null?void 0:ie.is_agent)}
                                            ${v.is_attestation?`<span class="comment-ritual-badge">${v.is_pending?"Pending approval — ":""}Ritual: ${m(v.ritual_name)}</span>`:""}
                                            <span class="comment-date">${qe(v.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${lc(v.content)}</div>
                                    </div>
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${l.length>0?` <span class="section-count">(${l.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${l.length===0?q({icon:j.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):l.map(v=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ja(v.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${to(v)}</span>
                                        <span class="activity-actor">by ${m(eo(v))}</span>
                                        <span class="activity-time">${qe(v.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${p(o.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${p(o.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${Se(o.status)}
                                <span>${Ee(o.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(o.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${it(o.priority)}
                                <span>${Ae(o.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(o.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${o.issue_type||"task"}">${ft(o.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(o.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${Y?`${en(Me,"avatar-small")}<span>${m(Y)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(o.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${le?m(le.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(o.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${o.labels&&o.labels.length>0?o.labels.map(v=>`
                                        <span class="issue-label" style="background: ${Z(v.color)}20; color: ${Z(v.color)}">${m(v.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${he?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(he.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(o.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${To(o.estimate,o.project_id)?" out-of-scale":""}" ${To(o.estimate,o.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Ms(o.estimate,o.project_id)}</span>
                            </button>
                        </div>

                        ${o.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(o.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${m(o.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(o.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${p(o.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${p(o.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(o.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,gs&&gs.abort(),gs=new AbortController;const{signal:Fe}=gs,Ue=document.querySelector(".sidebar-overflow-trigger"),Mt=document.querySelector(".overflow-menu-dropdown");if(Ue&&Mt){const v=()=>{Mt.classList.add("hidden"),Ue.setAttribute("aria-expanded","false")},ie=()=>{const G=Mt.classList.toggle("hidden");Ue.setAttribute("aria-expanded",String(!G))};Ue.addEventListener("click",ie,{signal:Fe}),document.addEventListener("click",G=>{!Ue.contains(G.target)&&!Mt.contains(G.target)&&v()},{signal:Fe}),Mt.addEventListener("keydown",G=>{G.key==="Escape"&&(v(),Ue.focus())},{signal:Fe})}cc(o.id),Wa(),ac({signal:Fe});const rt=document.getElementById("new-comment");if(ys=!1,rt){rt.addEventListener("compositionstart",()=>{ys=!0},{signal:Fe}),rt.addEventListener("compositionend",()=>{ys=!1},{signal:Fe});const v=tl(o.id);v&&(rt.value=v),rt.addEventListener("input",()=>{Fi(o.id,rt.value)}),rt.addEventListener("keydown",ie=>{var G;ie.key==="Enter"&&(ie.metaKey||ie.ctrlKey)&&(ie.preventDefault(),(G=rt.closest("form"))==null||G.requestSubmit())})}ms=je?je.id:null,fs=ot?ot.id:null;const Qs=v=>{var Ti;if((v.metaKey||v.ctrlKey)&&v.shiftKey&&(v.key===">"||v.key==="."||v.code==="Period")&&ps()){v.preventDefault();return}if(v.metaKey||v.ctrlKey||v.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||v.target.tagName==="INPUT"||v.target.tagName==="TEXTAREA"||v.target.tagName==="SELECT"||v.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||ds())return;if(v.key==="ArrowLeft"&&ms)v.preventDefault(),Q(ms);else if(v.key==="ArrowRight"&&fs)v.preventDefault(),Q(fs);else if(v.key==="c"){v.preventDefault(),v.stopImmediatePropagation();const W=document.getElementById("new-comment");W&&(W.focus(),W.scrollIntoView({behavior:"smooth",block:"nearest"}))}else v.key==="j"?(v.preventDefault(),v.stopImmediatePropagation(),ws(1)):v.key==="k"?(v.preventDefault(),v.stopImmediatePropagation(),ws(-1)):v.key==="d"&&(v.preventDefault(),(Ti=document.querySelector('[data-action="edit-description"]'))==null||Ti.click());const G={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[v.key];if(G){const W=document.querySelector(`.property-row[data-field="${G}"]`);W&&(v.preventDefault(),W.click())}};if(document.addEventListener("keydown",Qs,{signal:Fe}),D){const v=document.getElementById(D.id);if(v&&(v.focus({preventScroll:!0}),typeof D.start=="number"&&typeof v.setSelectionRange=="function"))try{v.setSelectionRange(D.start,D.end)}catch{}}return B!==null&&window.scrollTo(0,B),"rendered"}catch(a){return n?console.error("Failed to refresh issue detail:",a):E("load issue",a),"failed"}}async function rf(e,t){if(e.preventDefault(),Ya)return!1;const n=document.getElementById("new-comment").value;Fi(t,null),Ya=!0;try{await h.createComment(t,n),await Q(t),k("Comment added!","success")}catch(i){Fi(t,n),E("add comment",i)}finally{Ya=!1}return!1}async function lf(e){const t=Ne()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=Ui(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=il(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}Wa("edit-description","edit-description-mention-suggestions"),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?Pt(e,c,t.description||""):Pt(e,null);const d=document.getElementById("edit-description-preview");d&&d.style.display!=="none"&&gc()}),a.addEventListener("keydown",c=>{var d,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(d=document.getElementById("save-description-edit"))==null||d.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(Pt(e,null),Xa){Q(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?vn(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let l=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var y,b;if(Za)return;const c=(y=document.getElementById("edit-description"))==null?void 0:y.value;if(c===void 0)return;const d=hs?hs.description||"":null;if(d!==null&&d!==(t.description||"")&&!l){l=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Za=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:c}),Pt(e,null),k("Description updated","success"),await Q(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(w){E("update description",w)}finally{Za=!1,u&&(u.disabled=!1)}})}function gc(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?vn(n):'<span class="text-muted">Nothing to preview.</span>'}function cf(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?gc():i.focus()}function df(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,H(),document.getElementById("relation-issue-search").focus()}async function uf(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function pf(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function mf(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function ff(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),O(),k("Relation added","success"),Q(t)}catch(s){E("add relation",s)}return!1}async function gf(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),Q(e)}catch(n){E("remove relation",n)}}function ws(e){const t=Ne();if(!t)return;const n=Vi();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||Q(n[s].id)}te({"retry-issue-comments":(e,t)=>{Q(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Sm(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||lf(t.issueId)},"toggle-section":(e,t)=>{nf(t.section)},"toggle-ticket-rituals":()=>{sf()},"save-comment":(e,t)=>{rf(e,t.issueId)},"show-add-relation-modal":(e,t)=>{df(t.issueId)},"remove-relation":(e,t)=>{gf(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Um(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{ff(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{uf(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{pf(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{mf()},"set-description-editor-mode":(e,t)=>{cf(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>ws(-1),"navigate-next-issue":()=>ws(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),ec(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Xm(t.issueId)}});function hc(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let bn=[],ri=[],ks=null,J=new Set,yn="list",Ht=!1,io=null,$s=null,so=null,ao=null,vc=null;function bc(e){if(vc!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const oo=fp();(oo==="list"||oo==="grid")&&(yn=oo);function yc(e){if(e!=="list"&&e!=="grid")return;yn=e,e==="grid"&&Ht&&ro(),gp(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Tt()}function wc(){if(yn!=="list")return;Ht=!0,J.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Tt(),kn()}function ro(){Ht=!1,J.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Tt(),kn()}function hf(){io&&clearTimeout(io),io=setTimeout(()=>{Tt()},300)}function vf(){const e=document.getElementById("doc-search");e&&(e.value=""),Tt()}async function bf(){ze(null)}async function yf(){const e=document.getElementById("doc-search");e&&(e.value=""),ze(null)}function wf(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=z()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=ne().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function kf(){return bn}function Tt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";wf(),ri=bn.filter(a=>{var o,r;if(e){const l=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!l&&!c)return!1}return!0}),ri.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),Sf("",yn)}let wn=0;async function $f(){var i;const e=ks||((i=L())==null?void 0:i.id);if(!e)return;const t=++wn,n=z()||null;try{const s=await h.getDocuments(e,n);if(t!==wn)return;bn=s,Tt()}catch(s){if(t!==wn)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=q({icon:j.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",s)}}et(e=>{e==="currentProject"&&C()==="documents"&&$f()});async function Ft(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;ks=e,ml(-1);const n=++wn,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=z()||null);try{const a=await h.getDocuments(e,t);if(n!==wn)return;bn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",yn==="list"),r.classList.toggle("active",yn==="grid")),Tt()}catch(a){if(n!==wn)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=q({icon:j.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),E("load documents",a)}}function kc(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=ks||((n=L())==null?void 0:n.id);e&&Ft(e).catch(i=>console.error("Failed to refresh documents list:",i))}function $c(e){bc(e)&&fe(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function Ef(e,t){bc(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),M("documents"))}function xf(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${Z(t.color)}20; color: ${Z(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function If(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${xf(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(hc(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function _f(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${Z(r.color)}20; color: ${Z(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?hc(e.content).substring(0,80):"No content",s=Ht?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${J.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Ht&&J.has(e.id)?" selected":""}" data-action="${Ht?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function Sf(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;J.clear(),kn();const i=ri;if(i.length===0){const d=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=z(),f=d||u;n.innerHTML=q({icon:f?j.search:j.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?If:_f,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=ne();i.forEach(d=>{let u,f;if(e==="project")if(u=d.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const y=r.find(b=>b.id===d.project_id);f=y?y.name:"Unknown Project"}else e==="sprint"&&(u=d.sprint_id||"__no_sprint__",f=d.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(d)});let l="";for(const[d,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";l+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=l}function Tf(e){J.has(e)?J.delete(e):J.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=J.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",J.has(e)),kn()}function Lf(){ri.forEach(e=>J.add(e.id)),ri.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),kn()}function Ec(){J.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),J.clear(),kn()}function kn(){const e=document.getElementById("doc-bulk-actions");e&&(Ht?(e.classList.remove("hidden"),J.size>0?e.innerHTML=`
        <span class="bulk-count">${J.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Cf(){if(J.size===0){k("No documents selected","error");return}const t=ne().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${J.size} Document${J.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${J.size} selected document${J.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,H()}async function Af(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(J);let i=0;const s=[];for(const l of n)try{await h.updateDocument(l,{project_id:t}),i++}catch(c){console.error(`Failed to move document ${l}:`,c),s.push(((o=bn.find(d=>d.id===l))==null?void 0:o.title)||l)}O(),Ec(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=L())==null?void 0:r.id;return await Ft(a),!1}async function Bf(){var a,o;if(J.size===0){k("No documents selected","error");return}const e=J.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(J);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(l){console.error(`Failed to delete document ${r}:`,l),i.push(((a=bn.find(c=>c.id===r))==null?void 0:a.title)||r)}ro(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=L())==null?void 0:o.id;await Ft(s)}async function Df(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${m(s.author_name||"Unknown")}</span>
                <span class="comment-date">${qe(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${lc(s.content)}</div>
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
    `}}function Mf(e,t){const n=document.getElementById("new-doc-comment");if(!n)return;const i=tl(e);i&&(n.value=i),n.addEventListener("input",()=>{Fi(e,n.value)},{signal:t}),n.addEventListener("keydown",s=>{var a;s.key==="Enter"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),(a=n.closest("form"))==null||a.requestSubmit())},{signal:t}),Wa("new-doc-comment","doc-mention-suggestions")}async function fe(e,t=!0){try{t&&Ut();const n=await h.getDocument(e);vc=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(_=>_.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await Df(n);let a=null,o=null,r=!1;if(n.project_id){const V=ne().find(se=>se.id===n.project_id);if(a=V?V.name:null,n.sprint_id)try{const se=await h.getSprint(n.sprint_id);o=se?se.name:null}catch(se){console.error("Failed to load sprint name:",se),r=!0}}let l=n.content||"";const c=F.lexer(l);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(l=l.slice(c[0].raw.length).trimStart());const d=kf(),u=d.findIndex(_=>_.id===n.id),f=u>0?d[u-1]:null,y=u>=0&&u<d.length-1?d[u+1]:null,b=u>=0,w=C()||"documents",I=n.labels&&n.labels.length>0?n.labels.map(_=>`
          <span class="issue-label" style="background: ${Z(_.color)}20; color: ${Z(_.color)}">
            ${m(_.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(_.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const _=await h.getDocumentIssues(n.id);_.length>0&&(S=_.map(V=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(V.identifier)}</span>
            <span class="linked-item-title">${m(V.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(V.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(_){console.error("Failed to load linked issues:",_),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${b?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${f?`data-action="view-document" data-document-id="${p(f.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${d.length}</span>
              <button class="issue-nav-btn" ${y?`data-action="view-document" data-document-id="${p(y.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${l?vn(l):'<p class="text-muted">No content</p>'}</div>

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
                ${I}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${m(n.author_name||"Unknown")}</span>
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
    `,$s&&$s.abort(),$s=new AbortController;const{signal:D}=$s,B=i.querySelector(".sidebar-overflow-trigger"),x=i.querySelector(".overflow-menu-dropdown");if(B&&x){const _=()=>{x.classList.add("hidden"),B.setAttribute("aria-expanded","false")},V=()=>{const se=x.classList.toggle("hidden");B.setAttribute("aria-expanded",String(!se))};B.addEventListener("click",V,{signal:D}),document.addEventListener("click",se=>{!B.contains(se.target)&&!x.contains(se.target)&&_()},{signal:D}),x.addEventListener("keydown",se=>{se.key==="Escape"&&(_(),B.focus())},{signal:D})}Mf(n.id,D),ac({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:D}),so=f?f.id:null,ao=y?y.id:null;const R=_=>{if((_.metaKey||_.ctrlKey)&&_.shiftKey&&(_.key===">"||_.key==="."||_.code==="Period")&&ps("new-doc-comment")){_.preventDefault();return}_.metaKey||_.ctrlKey||_.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA"||_.target.tagName==="SELECT"||_.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(_.key==="ArrowLeft"&&so?(_.preventDefault(),fe(so)):_.key==="ArrowRight"&&ao&&(_.preventDefault(),fe(ao)))};document.addEventListener("keydown",R,{signal:D})}catch(n){E("load document",n)}}async function Es(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const l=a.find(c=>c.status==="active");l&&(o=l.id)}const r=a.map(l=>`<option value="${l.id}" ${l.id===o?"selected":""}>${m(l.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function lo(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${m(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function jf(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?vn(r):'<span class="text-muted">Nothing to preview.</span>'}}function co(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=al(e);if(o){const l=up(e),c=n!==null&&l!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon,d=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),d&&(d.textContent="Restored your unsaved draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",d.classList.remove("hidden"))}const r=()=>{const l={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&l.title===n.title&&l.content===n.content&&l.icon===n.icon){Gi(e,null);return}Gi(e,l,n)};[i,s,a].forEach(l=>l==null?void 0:l.addEventListener("input",r))}async function xc(){li=null;const e=ne(),t=Fc()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${lo("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,H(),co("new"),t&&await Es("doc-sprint",t,null,!0)}let li=null;async function Rf(e,t,n){li=n||null;const s=ne().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${lo("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,H(),co("new"),t&&await Es("doc-sprint",t,e)}async function Pf(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),Gi("new",null),await Ft(t),O(),k("Document created!","success"),li){const o=li;li=null,o()}}catch(o){E("create document",o)}return!1}let uo=null,ci=null,po=!1;async function Ic(e){try{const t=await h.getDocument(e);uo=e,ci={title:t.title||"",content:t.content||""},po=!1;const i=ne().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${lo("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,H(),co(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Es("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){E("load document",t)}}async function qf(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&uo===t&&ci&&!po){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==ci.title||(o.content||"")!==ci.content))return po=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),uo=null,ci=null;const o=al(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&Gi(t,null),O(),await fe(t),k("Document updated!","success")}catch(o){E("update document",o)}return!1}async function Nf(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await Ft(n),M("documents"),k("Document deleted!","success")}catch(n){E("delete document",n)}}function Of(e,t){Es(e,t)}async function Hf(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,H()}async function Ff(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Uf(e,t){try{await h.linkDocumentToIssue(e,t),O(),k("Issue linked!","success"),await fe(e,!1)}catch(n){E("link issue",n)}}async function Gf(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await fe(e,!1)}catch(n){E("unlink issue",n)}}let mo=!1;async function zf(e,t){if(e.preventDefault(),mo)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;mo=!0;try{await h.createDocumentComment(t,i),n.value="",k("Comment added!","success"),await fe(t,!1)}catch(s){E("add comment",s)}finally{mo=!1}return!1}async function Vf(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,H();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${Z(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,H()}catch(i){E("load labels",i)}}async function Wf(e,t){try{await h.addLabelToDocument(e,t),O(),k("Label added!","success"),await fe(e,!1)}catch(n){E("add label",n)}}async function Kf(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await fe(e,!1)}catch(n){E("remove label",n)}}te({"view-document":(e,t)=>{e.preventDefault(),fe(t.documentId)},"set-doc-editor-mode":(e,t)=>{jf(t.target,t.mode)},"retry-load-documents":()=>{Ft(ks)},"retry-document-comments":(e,t)=>{fe(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{Tf(t.docId)},"clear-doc-search":()=>{vf()},"clear-doc-project-filter":()=>{bf()},"clear-all-doc-filters":()=>{yf()},"show-bulk-move-modal":()=>{Cf()},"bulk-delete-documents":()=>{Bf()},"select-all-docs":()=>{Lf()},"clear-doc-selection":()=>{Ec()},"exit-selection-mode":()=>{ro()},"enter-selection-mode":()=>{wc()},"handle-bulk-move":e=>{Af(e)},"unlink-document-issue":(e,t)=>{Gf(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{Hf(t.documentId)},"add-document-comment":(e,t)=>{zf(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Kf(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Vf(t.documentId)},"show-edit-document-modal":(e,t)=>{Ic(t.documentId)},"delete-document":(e,t)=>{Nf(t.documentId)},"create-document":e=>{Pf(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Of(t.sprintSelect,n.value)},"update-document":(e,t)=>{qf(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Ff(n.value,t.documentId)},"link-to-issue":(e,t)=>{Uf(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Wf(t.documentId,t.labelId)}});let $n=[],xs={},Is=new Set,vt=null,fo=null,_s=[],di=[],go=[];function _c(){return xs}function Yf(){return fo}function Zf(){return vt}et(e=>{e==="currentProject"&&C()==="sprints"&&En()});let ho=0;async function En(){gl(-1);const e=z();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++ho;pg();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e);const i=await h.getSprints(e);if(t!==ho)return;$n=i,Xf(),await Ss()}catch(i){if(t!==ho)return;n&&(n.innerHTML=q({icon:j.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),E("load sprints",i)}}function Xf(){const e=document.getElementById("sprints-list");if(!e)return;const t=$n.find(a=>a.status==="active"),n=$n.find(a=>a.status==="planned"),i=$n.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Qf(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";s+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${m(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(n.id)}" data-sprint-name="${p(n.name)}" data-budget="${n.budget||""}" data-project-id="${p(n.project_id)}">Edit Sprint</button>
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
        `),e.innerHTML=s||q({icon:j.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Sc(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${wo(e.activated_at)}, closed ${wo(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${wo(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Qf(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${m(Sc(e))||"not yet activated"}</span>
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
    `}let vo=0;async function xn(e,t=!0){var n;try{t&&Ut();const i=++vo,s=C(),a=await h.getSprint(e);if(i!==vo)return;if(!a){k("Sprint not found","error"),M("sprints");return}fo=a;const o=(n=L())==null?void 0:n.id,[r,l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(d=>(console.error("Failed to load sprint transactions:",d),[])),o?h.getDocuments(o,a.project_id,null,e).catch(d=>(console.error("Failed to load sprint documents:",d),[])):[]]);if(i!==vo)return;_s=r,go=l,di=c,C()===s&&tn(_s),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),eg()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),M("sprints")}}async function Jf(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),M("sprints",!1);return}try{await xn(e,!1)}catch{M("sprints",!1)}}function eg(){const e=fo,t=_s;document.querySelectorAll(".view").forEach(d=>d.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(d=>nn.includes(d.status)),a=t.filter(d=>d.status==="done"),o=t.reduce((d,u)=>d+(u.estimate||0),0),r=a.reduce((d,u)=>d+(u.estimate||0),0);let l="";e.status==="active"?l='<span class="badge badge-status-active">Active</span>':e.status==="planned"?l='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(l='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${l}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${m(Sc(e))}
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
            <div class="stat-card">
                <div class="stat-value">${c}</div>
                <div class="stat-label">Budget</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${r} / ${o}</div>
                <div class="stat-label">Points Done</div>
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${s.length})</h3>
                ${s.length===0?q({icon:j.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(d=>Tc(d)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?q({icon:j.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(d=>Tc(d)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${ng()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${di.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${di.length>0?`
                    <div class="sprint-issues-list">
                        ${di.map(d=>tg(d)).join("")}
                    </div>
                `:q({icon:j.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Tc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=kl.includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${gg(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function tg(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${qe(e.created_at)}</span>
            </span>
        </div>
    `}function ng(){const e=go;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${ig(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function ig(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function sg(e,t,n,i){const s=i?qg(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(i)}">
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
    `,H()}async function ag(e,t,n){var r,l,c;e.preventDefault();const i=(l=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:l.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((c=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:c.value)||"this";try{const d={budget:a};if(i&&(d.name=i),await h.updateSprint(t,d),o==="planned"||o==="default"){const f=$n.filter(y=>y.status==="planned"&&y.id!==t);for(const y of f)await h.updateSprint(y.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await En(),O(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(d){E("update budget",d)}return!1}async function og(e){const t=$n.find(l=>l.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,H();const n=nn;let i=0,s=!1,a=!1;try{const[l,c]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=l.filter(d=>n.includes(d.status)).length,s=c.some(d=>d.is_active&&d.trigger==="every_sprint")}catch(l){console.error("Failed to load sprint details:",l),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function rg(e){try{const t=await h.closeSprint(e);await En(),Ac(),t.limbo?cg(t):k("Sprint completed!","success")}catch(t){E("complete sprint",t)}}async function Ss(){const e=z();if(e)try{vt=await h.getLimboStatus(e),lg()}catch(t){console.error("Failed to load limbo status:",t)}}function lg(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!vt||!vt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${vt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function cg(e){const t=z();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,H(),dg(t)}async function dg(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(i.name)} <span class="ritual-mode">(${m(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${We(i.prompt)}</div>
                    ${yo(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function bo(){var t,n;if(!vt)return;const e=z();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${vt.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${m(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${We(i.prompt)}</div>
                        ${yo(i.attestation)}
                        ${ug(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=vt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${vt.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(i.name)}</div>
                            ${yo(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,H()}function yo(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(qe(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${We(e.note)}</div>
        </div>
    `}function ug(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Lc(e){for(const t of e)if(!Is.has(t))try{(await h.getSprints(t)).forEach(i=>{xs[i.id]=i}),Is.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function pg(){xs={},Is=new Set,_s=[],go=[],di=[],Ts={}}function mg(e,t){t.forEach(n=>{xs[n.id]=n}),Is.add(e)}let Ts={};function fg(e){return Ts[e]}function Cc(e,t){Ts[e]=t??null}function Ac(){Ts={}}te({"retry-load-sprints":()=>En(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}xn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;sg(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{bo()},"show-close-sprint-confirmation":(e,t)=>{og(t.sprintId)},"handle-update-budget":(e,t)=>{ag(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),rg(t.sprintId)},"dismiss-limbo-modal":()=>{O(),Ss()},"approve-ritual":(e,t)=>{yg(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Dc(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}Q(t.issueId)},"create-sprint-document":async(e,t)=>{await Rf(t.sprintId,t.projectId,()=>{xn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}fe(t.documentId)}});function wo(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function gg(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}et(e=>{e==="currentProject"&&C()==="rituals"&&ko()});let Bc=0;async function ko(){const e=z(),t=document.getElementById("rituals-content"),n=++Bc;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=q({icon:j.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}zg(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await pi();n===Bc&&!i&&t&&(t.innerHTML=q({icon:j.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function hg(){Hc(vg),ko()}function vg(){const e=document.getElementById("rituals-content"),t=Vg(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Sn("rv-sprint-rituals-list",n,"sprint"),Sn("rv-close-rituals-list",i,"close"),Sn("rv-claim-rituals-list",s,"claim")}function bg(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function yg(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await Ss(),bo()}catch(n){E("approve ritual",n)}}function $o(e){return e==="document"?`
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
        `:""}function Eo(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function Dc(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${$o(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{wg(s,e,t,i)}),H()}async function wg(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Eo(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await Ss();const o=Zf();o&&!o.in_limbo?(O(),k("Limbo cleared! Next sprint is now active.","success")):bo()}catch(o){E("complete gate ritual",o)}return!1}function kg(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
        `;const n=p(e.artifact||"");return e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`:e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function $g(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${m(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${$o(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{Eg(o,e,t,s,a)}),H()}async function Eg(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=Eo(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),O(),await vs(n)}catch(r){E("attest ticket ritual",r)}return!1}async function xg(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await vs(t)}catch(n){E("attest ticket ritual",n)}}async function Ig(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await vs(t)}catch(n){E("approve ticket ritual",n)}}function _g(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${$o(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Sg(s,e,t,i)}),H()}async function Sg(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Eo(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),O(),await vs(n)}catch(o){E("complete ticket ritual",o)}return!1}te({"show-create-ritual-modal":(e,t)=>{Vc(t.trigger)},"approve-ticket-ritual":(e,t)=>{Ig(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{_g(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{$g(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{xg(t.ritualId,t.issueId)},"retry-load-rituals":()=>ko()});function We(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Jr.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Ls(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Tg(e,t,n,i,s,a,o,r){var l;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${Ls(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{Lg(c,e,t,n)}),H(),(l=document.querySelector(".modal"))==null||l.classList.add("modal-wide")}async function Lg(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),O(),bt()}catch(a){E("complete gate ritual",a)}}function Cg(e,t,n,i,s,a,o,r){Tg(e,t,n,i,s,a,o,r)}function Ag(e,t,n,i,s,a,o,r,l){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${Ls(r)}`:""}</div>`:""}
                ${l?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${We(l)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",d=>{Bg(d,e,t,n)}),H(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Bg(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),s)try{await h.createComment(n,s)}catch(r){console.error("Failed to post approval comment:",r)}k(`Review ritual "${i}" approved!`,"success"),O(),bt()}catch(r){E("approve review ritual",r)}}function Dg(e,t,n,i,s,a,o,r,l){Ag(e,t,n,i,s,a,o,r,l)}et(e=>{e==="currentProject"&&C()==="approvals"&&bt()});let xo=[],Io=0;async function bt(){if(!L())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Io;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=z(),i=n?ne().filter(r=>r.id===n):ne(),s=await Promise.all(i.map(async r=>{const[l,c]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:l,limbo:c}}));if(t!==Io)return;const a=[],o=[];for(const{project:r,approvals:l,limbo:c}of s)if(a.push(...l),c&&c.in_limbo){const d=(c.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});d.length>0&&o.push({project:r,rituals:d})}Mp(a),xo=o,Mc()}catch(n){if(t!==Io)return;e.innerHTML=q({icon:j.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),E("load approvals",n)}}function Mc(){const e=document.getElementById("approvals-list");if(!e)return;const t=Dp(),n=xo.length>0,i=!hp();if(t.length===0&&!n){i?e.innerHTML=`
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
            `:e.innerHTML=q({icon:j.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${xo.map(({project:d,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(d.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const y=f.attestation&&!f.attestation.approved_at,b=y?"⏳":"○",w=y?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',I=y?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(f.id)}"
                                            data-project-id="${p(d.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(f.id)}"
                                                data-project-id="${p(d.id)}"
                                                data-ritual-name="${p(f.name)}"
                                                data-ritual-artifact="${p(f.artifact||"")}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${m(f.name)}
                                                    <span class="badge badge-ritual-${p(f.approval_mode)}">${m(f.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${m(f.prompt)}</span>
                                                ${w}
                                            </div>
                                            ${I}
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
                    ${r.map(_o).join("")}
                </div>
            </div>
        `),l.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${l.map(_o).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(_o).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Cg(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{var y;d.disabled=!0;const u=(y=d.closest(".gate-ritual-actions"))==null?void 0:y.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=d.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await bt()}catch(b){d.disabled=!1,u&&(u.disabled=!1),E("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset;Dg(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(d=>{d.addEventListener("click",async()=>{d.disabled=!0;try{await h.approveAttestation(d.dataset.ritualId,d.dataset.projectId),k("Sprint ritual approved!","success"),await bt()}catch(u){d.disabled=!1,E("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(d=>{d.addEventListener("click",()=>{Dc(d.dataset.ritualId,d.dataset.projectId,d.dataset.ritualName,d.dataset.ritualArtifact||"")})})}function Mg(){vp(),Mc()}function _o(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(i.requested_by_name)}</strong>${i.requested_at?` (${Ls(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${We(i.attestation_note)}</div>`:"",l=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=s?`<div class="gate-ritual-actions">
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
                </div>`:`<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${p(i.ritual_id)}"
                    data-issue-id="${p(e.issue_id)}"
                    data-ritual-name="${p(i.ritual_name)}"
                    data-ritual-prompt="${p(i.ritual_prompt)}"
                    data-issue-identifier="${p(e.identifier)}"
                    data-issue-title="${p(e.title)}"
                    data-requested-by="${p(i.requested_by_name||"")}"
                    data-requested-at="${p(i.requested_at||"")}">Complete</button>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(i.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${m(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${c}
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
    `}te({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),Q(t.issueId)},"dismiss-approvals-explainer":()=>{Mg()},"retry-load-approvals":()=>bt()});const Cs={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},As={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let jc=0;function Rc(e){jc=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=Pc(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Pc(e="",t="",n=""){const i=jc++,s=Object.keys(Cs).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?Cs[e]:Cs.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${As[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",l=t==="isnull";return`
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
    `}function jg(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Pc()),Bs()}function Rg(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Bs()}function Pg(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=Cs[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${As[o]}</option>`).join(""),qc(e),Bs()}function qc(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function ui(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Bs(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Nc(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,l=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,c=o.querySelector(".condition-value");let d=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!l)continue;if(!r)throw ui("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!l)throw ui("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${l}`;if(n.has(u))throw ui(`Duplicate condition: ${r} ${As[l]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),l==="isnull")t[u]=!0;else if(l==="in"||l==="contains")t[u]=d?d.split(",").map(f=>f.trim()).filter(f=>f):[];else if(l==="gte"||l==="lte"){if(!d)throw ui(`Please enter a numeric value for ${r} ${As[l]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(d,10);if(isNaN(f))throw ui(`Invalid number "${d}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${d}`);t[u]=f}else t[u]=d}return Bs(),Object.keys(t).length>0?t:null}te({"add-condition-row":()=>{jg()},"remove-condition-row":(e,t)=>{Rg(Number(t.rowId))},"update-operator-options":(e,t)=>{Pg(Number(t.rowId))},"toggle-value-input":(e,t)=>{qc(Number(t.rowId))}});let ue=[],So=null;const Oc=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];et((e,t)=>{e==="currentProject"&&(t&&ap(t),Oc.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),nh(t||""))});const Ds={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Hc(e){So=e}function ne(){return ue}function In(e){const t=ue.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Ds[n]||Ds.fibonacci}function Ms(e,t){if(e==null)return"No estimate";const i=In(t).find(s=>s.value===e);return i?i.label:`${e} points`}function To(e,t){return e==null||e===0?!1:!In(t).some(i=>i.value===e)}function qg(e){const t=ue.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Ds[n]||Ds.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function Oe(){if(L())try{ue=await h.getProjects(L().id),Ng();const e=z();if(e&&ue.some(i=>i.id===e))return;const t=Lo();if(t&&ue.some(i=>i.id===t)){ze(t);return}const n=el();if(n&&ue.some(i=>i.id===n)){ze(n);return}ue.length>0&&ze(ue[0].id)}catch(e){E("load projects",e)}}function Ng(){const e='<option value="">All Projects</option>'+ue.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+ue.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=z();Oc.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function Fc(){return el()}function _n(){const e=document.getElementById("projects-list");if(ue.length===0){e.innerHTML=q({icon:j.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=ue.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${Z(t.color)}20; color: ${Z(t.color)}">
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
    `).join("")}function Og(e){ze(e),M("issues")}function Uc(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function Hg(e){e.preventDefault();const t=L();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await Oe(),_n(),O(),k("Project created!","success")}catch(i){E("create project",i)}return!1}async function Fg(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await Oe(),_n(),O(),k("Project updated!","success")}catch(i){E("update project",i)}return!1}async function Ug(e){const t=ue.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await Oe(),_n(),O(),k("Project deleted","success")}catch(n){E("delete project",n)}}let Te=null;async function Gc(e){Te=e,ue.length===0&&await Oe();const t=ue.find(n=>n.id===e);if(!t){k("Project not found","error"),M("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),zc("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function zc(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!yt||yt.length===0)&&pi()}function Gg(){Te=null,yt=[]}function zg(e){Te=e}function Vg(){return yt}async function Wg(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Te,t),await Oe(),k("Settings saved","success");const n=ue.find(i=>i.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){E("save project settings",n)}}async function Kg(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(Te,n),await Oe(),k("Settings saved","success")}catch(i){E("save settings",i)}}let yt=[];async function pi(){if(!Te)return!1;try{return yt=await h.getRituals(Te),Yg(),typeof So=="function"&&So(),!0}catch(e){return E("load rituals",e),!1}}function Yg(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=yt.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=yt.filter(i=>i.trigger==="ticket_close"),n=yt.filter(i=>i.trigger==="ticket_claim");Sn("ps-sprint-rituals-list",e,"sprint"),Sn("ps-close-rituals-list",t,"close"),Sn("ps-claim-rituals-list",n,"claim")}function Sn(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${We(a.prompt)}</div>
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
  `}).join("")}async function Vc(e){if(!Te)return;let t=[];try{t=await h.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Rc(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,H()}function Zg(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Xg(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function Wc(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function Qg(e){var s;e.preventDefault();let t;try{t=Nc()}catch{return!1}let n;try{n=await Wc()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(Te,i),await pi(),O(),k("Ritual created!","success")}catch(a){E("create ritual",a)}return!1}async function Jg(e){const t=yt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Te)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Rc(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,H()}async function eh(e,t){var a;e.preventDefault();let n;try{n=Nc()}catch{return!1}let i;try{i=await Wc()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await pi(),O(),k("Ritual updated!","success")}catch(o){E("update ritual",o)}return!1}async function th(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await pi(),k("Ritual deleted","success")}catch(n){E("delete ritual",n)}}te({"view-project":(e,t)=>{Og(t.projectId)},"view-project-settings":(e,t)=>{Gc(t.projectId)},"create-project":e=>{Hg(e)},"update-project":(e,t)=>{Fg(e,t.projectId)},"confirm-delete-project":(e,t)=>{Ug(t.projectId)},"edit-project-ritual":(e,t)=>{Jg(t.ritualId)},"delete-project-ritual":(e,t)=>{th(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Qg(e)},"update-project-ritual":(e,t)=>{eh(e,t.ritualId)},"toggle-ritual-conditions":()=>{Zg()},"ritual-group-change":()=>{Xg()}});function Lo(){const t=new URLSearchParams(window.location.search).get("project");return t||Fc()}function nh(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Co={},Kc=new Map;let Ao=null,Bo=null,Do=null,Mo=null,jo=null,Ro=null,Yc=!1;function ih(e){Object.assign(Co,e)}function sh({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a}={}){e&&(Ao=e),t&&(Bo=t),n&&(Do=n),i&&(Mo=i),s&&(jo=s),a&&(Ro=a)}function ah(){return Object.keys(Co)}const oh=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function M(e,t=!0){if(t&&Ut(),Sp(e),t){let s;const a=Lo();e==="my-issues"?s=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?s=`/issues${window.location.search}`:oh.includes(e)&&a?s=`/${e}?project=${a}`:s=`/${e}`,history.pushState({view:e},"",s)}document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===e)}),Ao&&Ao();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const s=document.getElementById(`${e}-view`);s&&s.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const i=Co[e];i&&i(),t&&window.scrollTo(0,0)}function Zc(){var i;const t=window.location.pathname.split("/").filter(Boolean);Mo&&Mo();let n="my-issues";if(t.length===0||t[0]==="")M("my-issues",!1);else{if(Bo&&Bo(t))return;{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),ah().includes(n)?M(n,!1):(n="my-issues",M("my-issues",!1))}}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function Ut(){Kc.set(window.location.href,window.scrollY)}function Xc(e){Ut(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),jo&&jo(e)}function Qc(e){Ut(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Ro&&Ro(e)}function Jc(){const e=Kc.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function rh(){Yc||(Yc=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Do&&Do(e.state)){Jc();return}(t=e.state)!=null&&t.view?M(e.state.view,!1):Zc(),Jc()}))}let mi=[];function js(){return mi}function lh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ch(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?lh(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function dh(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{mi=await h.getTeamAgents(e),Ji(zt,js),ts()}catch(n){console.error("Failed to load team agents:",n),E("load team agents",n)}}async function Po(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{mi=await h.getTeamAgents(e),Ji(zt,js),ts(),uh()}catch(n){E("load agents",n)}}function uh(){const e=document.getElementById("agents-list");if(e){if(mi.length===0){e.innerHTML=q({icon:j.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=mi.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ch(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${i} ${_a(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function ph(){const e=ne();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),H()}function ed(e,t){const n=m(t);document.getElementById("modal-title").textContent=e,document.getElementById("modal-content").innerHTML=`
    <div class="api-key-created">
      <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
      <div class="api-key-display">
        <code id="new-agent-key">${n}</code>
        <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
      </div>
      <div class="api-key-instructions">
        <p>Configure the CLI to use this agent:</p>
        <code>chaotic auth set-key ${n}</code>
      </div>
      <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
    </div>
  `,H()}async function mh(e){var o,r,l;e.preventDefault();const t=(o=L())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(l=document.getElementById("agent-project"))==null?void 0:l.value;try{let c;s&&a?c=await h.createProjectAgent(a,n,i):c=await h.createTeamAgent(t,n,i),O(),ed("Agent Created",c.api_key)}catch(c){E("create agent",c)}return!1}async function fh(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);ed("New Agent Key",n.key)}catch(n){E("generate agent key",n)}}function gh(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function hh(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),Po()}catch(n){E("delete agent",n)}}te({"create-agent":e=>{mh(e)},"copy-agent-key":()=>{gh()},"dismiss-agent-modal":()=>{O(),Po()},"delete-agent":(e,t)=>{hh(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{fh(t.agentId,t.agentName)}});let Lt=0,fi=null,Rs=0;const Gt=new Map;function qo(){const e=document.getElementById("ws-status-badge");e&&e.classList.toggle("hidden",Lt===0)}function He(e,t){return Gt.has(e)||Gt.set(e,new Set),Gt.get(e).add(t),()=>{var n;return(n=Gt.get(e))==null?void 0:n.delete(t)}}function vh(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function td(e,{isReconnect:t=!1}={}){fi&&(clearTimeout(fi),fi=null);const n=Pp();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),vl(null)),!t&&Lt>0&&(Lt=0,qo());const i=h.getToken();if(!i)return;const s=++Rs,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(i)}&team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o);vl(r),r.onopen=()=>{if(s!==Rs)return;console.log("WebSocket connected");const l=Lt>0;l&&k("Live updates reconnected","success"),Lt=0,qo(),l&&nd({type:"reconnected",entity:"connection",data:{}})},r.onmessage=l=>{if(s!==Rs)return;let c;try{c=JSON.parse(l.data)}catch(d){console.error("WebSocket: malformed message",d);return}nd(c)},r.onclose=()=>{if(s!==Rs)return;console.log("WebSocket disconnected"),Lt++,Lt===1&&k("Live updates disconnected. Reconnecting...","warning"),qo();const l=vh(Lt-1);fi=setTimeout(()=>{fi=null,L()&&L().id===e&&td(e,{isReconnect:!0})},l)},r.onerror=l=>{console.error("WebSocket error:",l)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function nd(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Gt.get(`${n}:${t}`);if(a)for(const l of a)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Gt.get(n);if(o)for(const l of o)try{l(i,s)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Gt.get("*");if(r)for(const l of r)try{l(i,s)}catch(c){console.error("WebSocket handler error (*):",c)}}const bh={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested"};let No=0,Tn=!1;async function Ps(){const e=L();if(e){try{const t=await h.getInboxUnreadCount(e.id);Xi(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}qs()}}function qs(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=La();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function gi({focusFirst:e=!1}={}){const t=L();if(!t)return;const n=document.getElementById("inbox-list");if(!n)return;const i=++No;n.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const s=await h.getInbox(t.id,{unread:Tn,limit:100});if(i!==No)return;Zi(s||[]),Oo(),e&&!Je()&&yh()}catch(s){if(i!==No)return;n.innerHTML=q({icon:j.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),E("load inbox",s)}Ps()}function id(e){const t=document.querySelectorAll("#inbox-list .inbox-row");if(t.forEach(i=>i.classList.remove("keyboard-selected")),t.length===0){Ta(-1);return}const n=Math.max(0,Math.min(e,t.length-1));t[n].classList.add("keyboard-selected"),Ta(n),t[n].focus({preventScroll:!0})}function yh(){id(0)}async function sd(e){const t=Yi(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;Zi(t.filter(a=>a.id!==e)),s&&Xi(Math.max(0,La()-1)),Oo(),qs(),id(n);try{await h.archiveInbox(e)}catch(a){console.error("Failed to archive inbox entry:",a)}}function wh(){Tn=!Tn;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",Tn),gi({focusFirst:!0})}function kh(e){const t=!e.read_at,n=bh[e.kind]||e.kind,i=e.issue_identifier||e.document_title||"",s=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" ");return`
        <div class="inbox-row list-item${t?" inbox-row-unread":""}"
             data-action="open-inbox-entry" ${s} role="button" tabindex="0">
            <div class="inbox-row-main">
                <div class="inbox-row-header">
                    <span class="badge badge-inbox-${p(e.kind)}">${m(n)}</span>
                    ${i?`<span class="inbox-row-source">${m(i)}</span>`:""}
                    ${t?'<span class="inbox-row-unread-dot" title="Unread"></span>':""}
                </div>
                <div class="inbox-row-title">${m(e.title)}</div>
                ${e.body?`<div class="inbox-row-body">${m(e.body)}</div>`:""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-time">${m(Ls(e.created_at))}</span>
                <button type="button" class="inbox-row-archive" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">&times;</button>
            </div>
        </div>
    `}function Oo(){const e=document.getElementById("inbox-list");if(!e)return;const t=Yi();if(t.length===0){e.innerHTML=q({icon:j.inbox,heading:Tn?"No unread items":"Inbox zero",description:Tn?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>kh(n)).join("")}async function $h(e){const t=Yi(),n=t.find(i=>i.id===e);if(!(!n||n.read_at))try{await h.markInboxRead(e),n.read_at=new Date().toISOString(),Zi([...t]),Xi(Math.max(0,La()-1)),qs();const i=document.querySelector(`.inbox-row[data-entry-id="${e}"]`);i&&i.classList.remove("inbox-row-unread")}catch(i){console.error("Failed to mark inbox entry read:",i)}}async function Eh(){const e=L();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();Zi(Yi().map(n=>({...n,read_at:n.read_at||t}))),Xi(0),qs(),Oo()}catch(t){E("mark all inbox entries read",t)}}function ad(e){e.entryId&&$h(e.entryId),e.issueId?Q(e.issueId):e.documentId&&fe(e.documentId)}function xh(e){if(!e)return;const{entryId:t,issueId:n,documentId:i}=e.dataset;ad({entryId:t,issueId:n,documentId:i})}function Ih(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&sd(e.dataset.entryId)}te({"open-inbox-entry":(e,t)=>{e.preventDefault(),ad(t)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&sd(t.entryId)},"toggle-inbox-unread-filter":()=>wh(),"mark-all-inbox-read":()=>Eh(),"retry-load-inbox":()=>gi({focusFirst:!0})});let Ns=[],Ln=[],Ho=[],Fo=[];function _h(){return Ns}function zt(){return Ln}async function Uo(){try{Ns=await h.getMyTeams(),Sh()}catch(e){E("load teams",e)}}function Sh(){const e=document.getElementById("team-list");Ns.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=Ns.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function Go(e,t=!1){Ca(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),td(e.id),await Promise.all([Oe(),Nh(),Lh(),dh(),Ps()]),t?Zc():M(C())}function od(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Th(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Lh(){if(L())try{Ln=await h.getTeamMembers(L().id),Ji(zt,js),ts()}catch(e){console.error("Failed to load team members:",e),E("load team members",e)}}function zo(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let Vo=0;async function Wo(){if(!L())return;const e=++Vo,t=document.getElementById("team-members-list");t&&(t.innerHTML=zo());try{const n=await h.getTeamMembers(L().id);if(e!==Vo)return;Ln=n,Ji(zt,js),ts(),Ch()}catch(n){if(e!==Vo)return;t&&(t.innerHTML=q({icon:j.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),Ln=[],rd(),E("load team members",n)}}function Ko(){var n;const e=(n=qt())==null?void 0:n.id,t=Ln.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function rd(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!Ko())}function Ch(){const e=document.getElementById("team-members-list"),t=Ko();rd(),e.innerHTML=Ln.map(n=>`
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
                ${t&&n.user_id!==qt().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let Yo=0;async function Os(){if(!L())return;const e=++Yo,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=zo());try{const n=await h.getTeamInvitations(L().id);if(e!==Yo)return;Ho=n,Ah()}catch(n){if(e!==Yo)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Ah(){const e=document.getElementById("team-invitations-list");if(Ho.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=Ko();e.innerHTML=Ho.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${m(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${m(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let Zo=0;async function ld(){if(!L())return;const e=++Zo,t=document.getElementById("team-agents-list");t&&(t.innerHTML=zo());try{const n=await h.getTeamAgents(L().id);if(e!==Zo)return;Fo=n,Bh()}catch(n){if(e!==Zo)return;t&&(t.innerHTML=q({icon:j.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),E("load team agents",n)}}function Bh(){const e=document.getElementById("team-agents-list");if(e){if(Fo.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=Fo.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function cd(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function Dh(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(L().id,t,n),await Os(),O(),k("Invitation sent!","success")}catch(i){E("send invitation",i)}return!1}async function Mh(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(L().id,e),await Wo(),k("Member removed!","success")}catch(t){E("remove member",t)}}async function jh(e){try{await h.deleteInvitation(L().id,e),await Os(),k("Invitation canceled!","success")}catch(t){E("cancel invitation",t)}}function dd(){od(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,H()}function Rh(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,H())}async function Ph(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await Uo(),await Go(n),O(),k("Team created!","success")}catch(n){E("create team",n)}return!1}async function qh(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(L().id,t);Ca(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await Uo(),O(),k("Team updated!","success")}catch(n){E("update team",n)}return!1}async function Nh(){if(L())try{const e=await h.getLabels(L().id);Wi(e)}catch(e){console.error("Failed to load labels:",e),E("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),te({"select-team":(e,t)=>{Go(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Mh(t.userId)},"delete-invitation":(e,t)=>{jh(t.invitationId)},"retry-load-team-invitations":()=>{Os()},"retry-load-team-members":()=>{Wo()},"retry-load-team-agents":()=>{ld()},"invite-member":e=>{Dh(e)},"create-team":e=>{Ph(e)},"update-team":e=>{qh(e)}});let st=null,wt=0,Cn=null,An=null,hi=null,Xo=!1;function Oh(){return op()}function ud(){rp()}function pd(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Hh(){st||(st=document.createElement("div"),st.id="onboarding-overlay",st.className="onboarding-overlay",document.getElementById("app").appendChild(st))}function vi(){if(!st)return;const e=Xo?fd():md(),t=e[wt],n=e.map((i,s)=>`<span class="onboarding-dot${s===wt?" active":""}${s<wt?" completed":""}"></span>`).join("");st.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function md(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=pd(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=pd(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Cn&&(e.textContent=`${Cn.name} (${Cn.key})`),t&&An&&(t.textContent=`${An.name} (${An.key})`),n&&hi&&(n.textContent=`${hi.identifier} - ${hi.title}`)}}]}function fd(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function Qo(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Jo(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Bn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Fh(){const e=Xo?fd():md();wt<e.length-1&&(wt++,vi())}function Uh(){ud(),hd(),bi()}function Gh(){ud(),hd(),bi()}async function zh(e){e.preventDefault(),Jo("onboarding-team-error"),Bn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Cn=await h.createTeam({name:t,key:n}),wt++,vi()}catch(i){Qo("onboarding-team-error",i.message||"Failed to create team"),Bn("onboarding-team-submit",!1)}}async function Vh(e){e.preventDefault(),Jo("onboarding-project-error"),Bn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{An=await h.createProject(Cn.id,{name:t,key:n}),wt++,vi()}catch(i){Qo("onboarding-project-error",i.message||"Failed to create project"),Bn("onboarding-project-submit",!1)}}async function Wh(e){e.preventDefault(),Jo("onboarding-issue-error"),Bn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{hi=await h.createIssue(An.id,{title:t}),wt++,vi()}catch(n){Qo("onboarding-issue-error",n.message||"Failed to create issue"),Bn("onboarding-issue-submit",!1)}}function gd(e=!1){Xo=e,wt=0,Cn=null,An=null,hi=null,Hh(),vi()}function hd(){st&&(st.remove(),st=null)}function vd(){lp(),gd(!0)}te({"onboarding-next":e=>{e.preventDefault(),Fh()},"onboarding-skip":e=>{e.preventDefault(),Uh()},"onboarding-finish":e=>{e.preventDefault(),Gh()},"onboarding-create-team":e=>{zh(e)},"onboarding-create-project":e=>{Vh(e)},"onboarding-create-issue":e=>{Wh(e)}});async function bi(){Kh(),ev(),await Uo();const e=_h();if(e.length===0&&!Oh()){gd();return}e.length>0&&await Go(e[0],!0)}let Dn=null,yi=null,Ke=null,Ye=null;function wi(){Dn||(Dn=document.getElementById("auth-screen"),yi=document.getElementById("main-screen"),Ke=document.getElementById("login-form"),Ye=document.getElementById("signup-form"))}function Hs(){wi(),Dn&&Dn.classList.remove("hidden"),yi&&yi.classList.add("hidden")}function Kh(){wi(),Dn&&Dn.classList.add("hidden"),yi&&yi.classList.remove("hidden")}function Yh(){wi(),Ke&&Ke.classList.remove("hidden"),Ye&&Ye.classList.add("hidden")}function Zh(){wi(),Ke&&Ke.classList.add("hidden"),Ye&&Ye.classList.remove("hidden")}async function Xh(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),zi(await h.getMe()),await bi(),k("Welcome back!","success")}catch(i){E("log in",i)}return!1}async function Qh(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),zi(await h.getMe()),await bi(),k("Account created successfully!","success")}catch(s){E("sign up",s)}return!1}function bd(){h.logout(),zi(null),Ca(null),Hs(),k("Signed out","success")}function Jh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ev(){var i;const e=qt();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",ll(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Jh(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function tv(){wi();const e=Ke==null?void 0:Ke.querySelector("form");e&&e.addEventListener("submit",s=>Xh(s));const t=Ye==null?void 0:Ye.querySelector("form");t&&t.addEventListener("submit",s=>Qh(s));const n=Ke==null?void 0:Ke.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),Zh()});const i=Ye==null?void 0:Ye.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),Yh()})}let er=[];async function tr(){try{er=await h.getApiKeys(),nv()}catch(e){E("load API keys",e)}}function nv(){const e=document.getElementById("api-keys-list");if(e){if(er.length===0){e.innerHTML=q({icon:j.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=er.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${_a(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${_a(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function iv(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,H()}async function sv(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,H()}catch(n){E("create API key",n)}return!1}async function av(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function ov(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await tr()}catch(n){E("revoke API key",n)}}te({"create-api-key":e=>{sv(e)},"copy-api-key":()=>{av()},"dismiss-api-key-modal":()=>{O(),tr()},"revoke-api-key":(e,t)=>{ov(t.keyId,t.keyName)}});let Fs=!1,kt=0,Ct=[],Us=[];function rv(e){Us=e,Ct=[...e]}function Vt(){return Fs}function lv(){if(Fs)return;Fs=!0,kt=0,Ct=[...Us];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Gs()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>cv(n.target.value)),t.addEventListener("keydown",uv),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&dv(Number(i.dataset.commandIndex))}),ki(),requestAnimationFrame(()=>t.focus())}function Gs(){Fs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function cv(e){const t=e.toLowerCase().trim();t?Ct=Us.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):Ct=[...Us],kt=0,ki()}function ki(){const e=document.getElementById("command-results");if(!e)return;if(Ct.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};Ct.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===kt?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function dv(e){kt=e,ki()}function yd(e){const t=Ct[e];t&&(Gs(),t.action())}function uv(e){switch(e.key){case"ArrowDown":e.preventDefault(),kt=Math.min(kt+1,Ct.length-1),ki();break;case"ArrowUp":e.preventDefault(),kt=Math.max(kt-1,0),ki();break;case"Enter":e.preventDefault(),yd(kt);break;case"Escape":e.preventDefault(),Gs();break}}te({"execute-command":(e,t)=>{yd(Number(t.commandIndex))}});const pv=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function mv(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function fv(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(mv).join("")}
    </div>`}function wd(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${pv.map(fv).join("")}
        </div>
    `,H()}let zs=[];function gv(){return zs}et(e=>{e==="currentProject"&&C()==="epics"&&At()});let Vs=0;async function At(){var n;hl(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++Vs;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=L())!=null&&n.id)){zs=[],e.innerHTML=q({icon:j.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const i=z();let s;if(i?s=await h.getIssues({project_id:i,issue_type:"epic"}):s=await h.getTeamIssues(L().id,{issue_type:"epic"}),t!==Vs)return;if(!s||s.length===0){zs=[],e.innerHTML=q({icon:j.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(s.map(async o=>{let r=[];try{r=await h.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==Vs)return;zs=a,hv(a,e)}catch(i){if(t!==Vs)return;e.innerHTML=q({icon:j.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),E("load epics",i)}}function hv(e,t){const n=e.map(i=>{const s=i.subIssues?i.subIssues.length:0,a=i.subIssues?i.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=s>0?Math.round(a/s*100):0,r=s>0?`${a}/${s}`:"-",l=`status-${(i.status||"backlog").replace(/_/g,"-")}`,c=(i.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),d=i.estimate!=null?`${i.estimate}pts`:"-";return`
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
    `,t._epicClickHandler||(t._epicClickHandler=i=>{const s=i.target.closest(".epic-row");s&&s.dataset.identifier&&Qc(s.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function vv(){const e=z(),t=ne().map(n=>`
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
    `,H(),document.getElementById("create-epic-form").addEventListener("submit",bv),document.getElementById("create-epic-title").focus()}async function bv(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),k(`Created epic ${s.identifier}`,"success"),At()}catch(s){E("create epic",s)}}async function kd(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){Q(t.id,!1);return}await nr(t.id,!1)}else M("epics",!1)}catch{M("epics",!1)}}async function nr(e,t=!0){try{t&&Ut();const[n,i,s,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){Q(e,t);return}t&&history.pushState({epicId:e,view:C()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=C()||"epics",l=ne().find(x=>x.id===n.project_id),c=n.assignee_id?sn(n.assignee_id):null,d=c?Nt(c):null,u=i.length,f=i.filter(x=>x.status==="done"||x.status==="canceled").length,y=u>0?Math.round(f/u*100):0,b=gv(),w=b.findIndex(x=>x.id===n.id),I=w>0?b[w-1]:null,S=w>=0&&w<b.length-1?b[w+1]:null,D=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${D?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${I?`data-action="navigate-epic" data-epic-id="${p(I.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${b.length}</span>
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
                            ${vn(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${y===100?" epic-progress-complete":""}" style="width: ${y}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${f} of ${u} done</span>
                                <span>${y}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${i.length===0?q({icon:j.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):i.map(x=>{const R=x.assignee_id?sn(x.assignee_id):null,_=R?Nt(R):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(x.id)}" data-identifier="${p(x.identifier)}">
                                    <span class="sub-issue-status">${Se(x.status)}</span>
                                    <span class="sub-issue-id">${m(x.identifier)}</span>
                                    <span class="sub-issue-title">${m(x.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(x.status||"backlog").replace(/_/g,"-")}">${Ee(x.status)}</span>
                                    ${_?`<span class="sub-issue-assignee">${m(_)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${s.length===0?q({icon:j.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):s.map(x=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Ja(x.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${to(x)}</span>
                                        <span class="activity-actor">by ${m(eo(x))}</span>
                                        <span class="activity-time">${qe(x.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(x=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(x.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${m(x.author_name||"User")}</span>
                                            <span class="comment-date">${qe(x.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${m(x.content||"")}</div>
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
                                ${Se(n.status)}
                                ${Ee(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${it(n.priority)}
                                ${Ae(n.priority)}
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
                                ${Ms(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(x=>`
                                    <span class="issue-label" style="background: ${Z(x.color)}20; color: ${Z(x.color)}">${m(x.name)}</span>
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
        `;const B=o.querySelector(".sub-issues-list");B&&B.addEventListener("click",x=>{const R=x.target.closest(".sub-issue-item");R&&R.dataset.issueId&&Q(R.dataset.issueId)})}catch(n){E("load epic",n)}}te({"navigate-epic":(e,t)=>{nr(t.epicId)}});function yv(e){let t=!1,n=null;return function(s){var o,r,l,c,d,u;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(l=e.focusModalField)==null||l.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(c=e.isDetailViewActive)!=null&&c.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((d=e.isDetailViewActive)!=null&&d.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function wv(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function at(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function kv(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const l=n(a);if(!l)return;const c=l.dataset.issueId;if(!c||c.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const d=l.querySelector(`.${r}`);d&&e.showInlineDropdown&&e.showInlineDropdown(s,o,c,d)}return function(a){var l,c,d,u;if(e.getCurrentView()!=="issues"||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),at(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),at(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const f=o[r].dataset.issueId;f&&!f.startsWith("temp-")&&e.viewIssue(f)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const f=o[r].dataset.issueId;f&&!f.startsWith("temp-")&&e.showEditIssueModal(f)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function $v(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o,r,l;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),at(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),at(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.viewDocument(c)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.documentId;c&&e.showEditDocumentModal&&e.showEditDocumentModal(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Ev(e){const t="#inbox-list .inbox-row";return function(i){var o,r;if(e.getCurrentView()!=="inbox"||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(r=(o=i.target).closest)!=null&&r.call(o,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),at(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),at(a-1,e.setSelectedIndex,t);break;case"Enter":a>=0&&s[a]&&(i.preventDefault(),e.openInboxEntry(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(l=>l.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function xv(e){const t="#kanban-board .kanban-card";return function(i){var o,r,l;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(l=(r=i.target).closest)!=null&&l.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),at(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),at(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const c=s[a].dataset.id;c&&e.viewIssue(c)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Iv(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function $d(e){const{view:t,selector:n,open:i}=e;return function(a){var l,c,d;if(e.getCurrentView()!==t||(l=e.isDetailViewActive)!=null&&l.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(d=(c=a.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),at(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),at(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(u=>u.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const _v={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let N=null,Bt=0;async function Ed(e,t){var a,o;const n=_v[e];if(!n){E("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++Bt;N=null;let s;try{s=await n.fetchList(t)}catch(r){E("load revision history",r);return}if(i===Bt){if(N={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},N.viewVersion!=null)try{const r=await n.fetchOne(t,N.viewVersion);if(i!==Bt)return;N.cache.set(N.viewVersion,r)}catch(r){i===Bt&&E("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),Ws(),H()}}function Ws(){const e=document.getElementById("modal-content");if(!e||!N)return;if(N.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=Sv(),n=N.mode==="compare"?Lv():Tv();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function Sv(){const e=N.revisions.map(n=>{const i=N.mode==="view"?n.version===N.viewVersion:n.version===N.compareFromVersion||n.version===N.compareToVersion,s=N.mode==="compare"?n.version===N.compareFromVersion?' <span class="rev-tag">from</span>':n.version===N.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${m(n.author_name||"Unknown")}</span>
          <span class="revision-time">${qe(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${N.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function Tv(){const e=N.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=N.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${m(t.title)}</h3>`:"",i=t[N.adapter.bodyField]||"",s=i?`<div class="markdown-body">${We(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${m(t.author_name||"Unknown")} &middot; ${qe(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function Lv(){const e=N.compareFromVersion,t=N.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=N.cache.get(e),i=N.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[N.adapter.bodyField]||"",a=i[N.adapter.bodyField]||"",o=Cv(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function Cv(e,t){const n=e.split(`
`),i=t.split(`
`),s=Av(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${m(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${m(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${m(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function Av(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let l=n-1;l>=0;l--)for(let c=i-1;c>=0;c--)e[l]===t[c]?s[l][c]=s[l+1][c+1]+1:s[l][c]=Math.max(s[l+1][c],s[l][c+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?($i(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?($i(a,"del",e[o]),o++):($i(a,"add",t[r]),r++);for(;o<n;)$i(a,"del",e[o++]);for(;r<i;)$i(a,"add",t[r++]);return a}function $i(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function Bv(e){if(!N)return;const t=N.token,n=N;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(N!==n||Bt!==t)return;n.cache.set(e,i)}catch(i){N===n&&Bt===t&&E("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),Ws()}function Dv(){if(!N)return;const e=N.token,t=N;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{N===t&&Bt===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{N!==t||Bt!==e||(s&&E("load revisions to compare",s),Ws())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;Ws()}te({"show-document-revisions":(e,t)=>{Ed("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{Ed("issue",t.issueId)},"select-revision-version":(e,t)=>{Bv(Number(t.version))},"toggle-revision-compare":()=>{Dv()},"close-revision-viewer":()=>{N=null,O()}});const Mv=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Wt=[],Ks=null,ir=0;et(e=>{e==="currentProject"&&C()==="board"&&Ei()});async function Ei(){Ki(-1);const e=++ir,t=z();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=ne().length===0?q({icon:j.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):q({icon:j.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await h.getIssues({project_id:t});if(e!==ir)return;Wt=i,C()==="board"&&tn(Wt),xi()}catch(i){if(e!==ir)return;n&&(n.innerHTML=q({icon:j.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),E("load board",i)}}const sr=Ip(()=>Ei(),200);function xi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=Mv.map(i=>{const s=Wt.filter(a=>a.status===i.key);return`
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
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${Ae(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),jv(t)}function jv(e){const t=fl();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){Ki(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),Ki(i),n[i].classList.add("keyboard-selected")}function Rv(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),Ks=t.dataset.id,t.classList.add("dragging")}function Pv(e,t){t.classList.remove("dragging"),Ks=null}function xd(e){const t=Wt.find(n=>n.id===Ks);return!!t&&t.status===e}function qv(e,t){e.preventDefault(),!xd(t.dataset.status)&&t.classList.add("drag-over")}function Nv(e,t){t.classList.remove("drag-over")}function Ov(e,t){e.preventDefault();const n=Wt.find(i=>i.id===t.dataset.id);n&&xd(n.status)||t.classList.add("drag-over")}function Hv(e,t){t.classList.remove("drag-over")}async function Fv(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=Wt.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,xi();try{await h.updateIssue(n,{status:i}),k("Status updated","success")}catch(o){s.status=a,xi(),E("update status",o)}}}async function Uv(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=Ks||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=Wt.find(l=>l.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,xi();try{await h.updateIssue(n,{status:a}),k("Status updated","success")}catch(l){o.status=r,xi(),E("update status",l)}}}te({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),Q(t.id)):e.type==="dragstart"?Rv(e,n):e.type==="dragend"?Pv(e,n):e.type==="dragover"?Ov(e,n):e.type==="dragleave"?Hv(e,n):e.type==="drop"&&Uv(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?qv(e,n):e.type==="dragleave"?Nv(e,n):e.type==="drop"&&Fv(e,n)},"retry-load-board":()=>Ei()});const Dt=new Map,Id=6e4,ar=100;let ge=null,Ys=null,Zs=null,Ii=null,_d=!1;const Gv={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},zv={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Sd={api:null};let or={...Sd};function Vv(e={}){or={...Sd,...e},ge||(ge=document.createElement("div"),ge.className="issue-tooltip",ge.style.display="none",document.body.appendChild(ge),ge.addEventListener("mouseenter",()=>{clearTimeout(Ys)}),ge.addEventListener("mouseleave",()=>{rr()})),_d||(document.addEventListener("mouseover",Wv),document.addEventListener("mouseout",Kv),_d=!0)}function Wv(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Yv(t);if(n){if(n===Ii&&ge.style.display!=="none"){clearTimeout(Ys);return}clearTimeout(Zs),Zs=setTimeout(()=>{Zv(t,n)},200)}}function Kv(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Zs),Ys=setTimeout(()=>{rr()},150))}function Yv(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function Zv(e,t){Ii=t;const n=e.getBoundingClientRect();ge.style.left=`${n.left+window.scrollX}px`,ge.style.top=`${n.bottom+window.scrollY+8}px`,ge.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ge.style.display="block";try{const i=await Qv(t);if(Ii!==t)return;Jv(i)}catch{if(Ii!==t)return;ge.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function rr(){clearTimeout(Zs),clearTimeout(Ys),ge&&(ge.style.display="none"),Ii=null}function Xv(){const e=Date.now();for(const[t,n]of Dt.entries())e-n.timestamp>=Id&&Dt.delete(t)}async function Qv(e){Dt.size>ar/2&&Xv();const t=Dt.get(e);if(t&&Date.now()-t.timestamp<Id)return t.issue;if(!or.api)throw new Error("API not initialized");const n=await or.api.getIssueByIdentifier(e);if(Dt.size>=ar){const i=Array.from(Dt.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,ar/2);for(const[a]of s)Dt.delete(a)}return Dt.set(e,{issue:n,timestamp:Date.now()}),n}function Jv(e){const t=Gv[e.status]||"#6b7280",n=zv[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";ge.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${eb(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${tb(e.priority)}</span>
        </div>
    `}function eb(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function tb(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Td(){return!!document.querySelector(".description-inline-editor")}function lr(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function cr(){var e;return lr("issue-detail-view")?((e=Ne())==null?void 0:e.id)??null:null}function Kt(e){return!!e&&cr()===e}function nb(){He("issue:created",ib),He("issue:updated",sb),He("issue:deleted",ab),He("comment",lb),He("relation",db),He("attestation",ub),He("activity",mb),He("project",fb),He("sprint",gb),He("document",cb),He("inbox",pb),He("connection:reconnected",hb)}function ib(e){var s;const t=Be(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,tt(a),C()==="issues"&&ht()}else tt([e,...t]),C()==="issues"&&ht(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=qt())==null?void 0:s.id)){const a=It(),o=a.findIndex(l=>l.id===e.id),r=a.findIndex(l=>l._isOptimistic&&l.title===e.title);if(o===-1&&r===-1)un([e,...a]),C()==="my-issues"&&ni();else if(r>=0){const l=[...a];l[r]=e,un(l),C()==="my-issues"&&ni()}}C()==="board"?sr():C()==="sprints"?_i():C()==="epics"&&At(),Kt(e.parent_id)&&Yt(e.parent_id)}function sb(e){const t=Be();t.some(s=>s.id===e.id)&&tt(t.map(s=>s.id===e.id?e:s));const n=It();n.some(s=>s.id===e.id)&&un(n.map(s=>s.id===e.id?e:s));const i=Vi();i.some(s=>s.id===e.id)&&tn(i.map(s=>s.id===e.id?e:s)),C()==="issues"?ht():C()==="my-issues"?ni():C()==="board"?sr():C()==="sprints"?_i():C()==="epics"&&At(),Kt(e.id)&&(Td()?Qa(e):Yt(e.id))}function ab(e){tt(Be().filter(n=>n.id!==e.id)),un(It().filter(n=>n.id!==e.id));const t=Vi();t.some(n=>n.id===e.id)&&tn(t.filter(n=>n.id!==e.id)),C()==="issues"?ht():C()==="my-issues"?(ni(),mn({showLoading:!1})):C()==="board"?sr():C()==="sprints"?_i():C()==="epics"&&At(),k(`Issue ${e.identifier} deleted`,"info"),Kt(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),M("my-issues"))}const Ld=250,ob=1e3,Mn=new Map;function Yt(e){Td()?Qa():dr(e,Ld)}function dr(e,t){let n=Mn.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Mn.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>rb(e),t))}async function rb(e){const t=Mn.get(e);if(!t)return;if(t.timer=null,!Kt(e)){Mn.delete(e);return}t.inFlight=!0;let n;try{n=await Q(e,!1,{refresh:!0})}finally{t.inFlight=!1}Mn.get(e)===t&&(t.again?(t.again=!1,dr(e,Ld)):n==="retry"?dr(e,ob):Mn.delete(e))}function lb(e){C()==="my-issues"&&mn({showLoading:!1}),Kt(e.issue_id)&&Yt(e.issue_id),e.document_id&&$c(e.document_id)}function cb(e,{type:t}={}){kc(),t==="deleted"?Ef(e.id,e.title):$c(e.id)}function db(e){const t=cr();t&&(e.source_issue_id===t||e.target_issue_id===t)&&Yt(t)}function ub(e){C()==="approvals"&&bt(),Kt(e.issue_id)&&Yt(e.issue_id)}function pb(e){var t;e.recipient_user_id===((t=qt())==null?void 0:t.id)&&(Ps(),C()==="inbox"&&gi())}function mb(e){C()==="my-issues"&&mn({showLoading:!1}),Kt(e.issue_id)&&Yt(e.issue_id)}function fb(e,{type:t}){Oe().then(()=>{C()==="projects"&&_n()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function _i(){const e=Yf();e&&lr("sprint-detail-view")?xn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):lr("sprints-view")&&En().catch(t=>console.error("Failed to reload sprints:",t))}function gb(e,{type:t}={}){Ac(),C()==="sprints"?_i():C()==="my-issues"&&ii(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function hb(){const e=C();Ps(),e==="issues"?gt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(pn().catch(n=>console.error("Failed to resync my issues:",n)),ii().catch(n=>console.error("Failed to resync sprint status:",n)),mn({showLoading:!1})):e==="board"?Ei():e==="sprints"?_i():e==="epics"?At().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?Oe().then(()=>{C()==="projects"&&_n()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?kc():e==="approvals"?bt():e==="inbox"&&gi();const t=cr();t&&Yt(t)}const Cd='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Ad(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function vb(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Ad(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Cd);n&&n.focus()}}}function Xs(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Ad(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=n.querySelectorAll(Cd);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Xs()});async function bb(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=z();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ne().find(c=>c.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};tt([r,...Be()]),ht();const l=document.querySelector(`[data-id="${a}"]`);l&&l.classList.add("new");try{const c=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const d=Be(),u=d.findIndex(f=>f.id===a);u!==-1&&(d[u]=c,tt(d)),ht(),Oe(),k("Issue created!","success")}catch(c){tt(Be().filter(d=>d.id!==a)),ht(),E("create issue",c)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}sh({beforeNavigate:()=>{Gg(),Hc(null),Qi(null),bl(null),Xs(),rr()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return kd(e[1]),!0;if(e[0]==="issue"&&e[1])return bs(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(bs(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(Lb(e[1]),!0):e[0]==="sprint"&&e[1]?(Jf(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Gc(e[1]),!0):!1},detailPopstate:e=>e.epicId?(nr(e.epicId,!1),!0):e.issueId?(Q(e.issueId,!1),!0):e.identifier?(bs(e.identifier),!0):e.documentId?(fe(e.documentId,!1),!0):e.sprintId?(xn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Lo();e&&ne().some(t=>t.id===e)&&ze(e)},issueNavigate:e=>bs(e),epicNavigate:e=>kd(e)}),ih({"my-issues":()=>{ii(),pn(),mn()},approvals:()=>{bt()},inbox:()=>{gi({focusFirst:!0})},issues:()=>{Bl(),nm(),am(),Tl().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),is())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),ss())}}),Al().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}gt()})},epics:()=>{At()},board:()=>{Ei()},projects:()=>{Oe().then(_n)},sprints:()=>{En()},rituals:()=>{hg()},documents:()=>{Ft()},team:()=>{Wo(),ld(),Os()},settings:()=>{tr(),Po()}});function yb(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function wb(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>zc(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Wg());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Kg()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>Vc(a))})}function kb(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>yc("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>yc("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>wc());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>hf());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Tt())}function $b(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>Ol())}function Eb(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>sm());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Gp());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>zp()),document.querySelectorAll(".multi-select-btn").forEach(y=>{const b=y.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?y.addEventListener("click",()=>as("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?y.addEventListener("click",()=>as("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?y.addEventListener("click",()=>as("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&y.addEventListener("click",()=>as("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>os())});const y=i.querySelector(".btn-small");y&&y.addEventListener("click",()=>Pa())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>qa())});const y=s.querySelector(".btn-small");y&&y.addEventListener("click",()=>Na())}const a=document.getElementById("label-filter-dropdown");if(a){const y=a.querySelector(".btn-small");y&&y.addEventListener("click",()=>rs())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const y=o.querySelector(".btn-small");y&&y.addEventListener("click",()=>ls())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>De());const l=document.getElementById("assignee-filter");l&&l.addEventListener("change",()=>De());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>De());const d=document.getElementById("sort-by-select");d&&d.addEventListener("change",()=>gt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>jl());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",y=>bb(y))}function xb(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>bg(t.dataset.tab))})}function Ib(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>od());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>si()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),M(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Th());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>Xs());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>vb());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>si())}te({"navigate-to":(e,t)=>{M(t.view)},"set-current-project":(e,t,n)=>{ze(n.value)},showCreateIssueModal:()=>si(),showCreateEpicModal:()=>vv(),"retry-load-epics":()=>At(),showCreateProjectModal:()=>Uc(),showCreateDocumentModal:()=>xc(),showCreateTeamModal:()=>dd(),showEditTeamModal:()=>Rh(),showInviteModal:()=>cd(),showCreateApiKeyModal:()=>iv(),showCreateAgentModal:()=>ph(),resetOnboarding:()=>vd(),logout:()=>bd(),navigateToProjects:()=>M("projects")});async function _b(){if(!h.getToken()){Hs();return}try{const e=await h.getMe();zi(e),await bi()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){h.logout(),Hs();return}console.error("Failed to load current user on boot:",e),Hs(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{Op(),tv(),Ib(),yb(),$b(),Eb(),xb(),wb(),kb(),Sb(),Tb(),Vv({api:h}),rh(),nb(),await _b()});function Sb(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ip()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),sp(n?"light":"dark")})}function Tb(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");Xc(i)}}})}async function Lb(e){try{await fe(e,!1)}catch{M("documents",!1)}}const Si=()=>["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return t&&!t.classList.contains("hidden")});document.addEventListener("keydown",kv({getCurrentView:C,getSelectedIndex:pl,setSelectedIndex:ei,viewIssue:Q,showEditIssueModal:ec,showInlineDropdown:za,isInlineDropdownOpen:ds,isModalOpen:Je,isCommandPaletteOpen:Vt,isDetailViewActive:Si})),document.addEventListener("keydown",$v({getCurrentView:C,getSelectedIndex:Lp,setSelectedIndex:ml,viewDocument:fe,showEditDocumentModal:Ic,isModalOpen:Je,isCommandPaletteOpen:Vt,isDetailViewActive:Si})),document.addEventListener("keydown",xv({getCurrentView:C,getSelectedIndex:fl,setSelectedIndex:Ki,viewIssue:Q,isModalOpen:Je,isCommandPaletteOpen:Vt,isDetailViewActive:Si})),document.addEventListener("keydown",Ev({getCurrentView:C,getSelectedIndex:Cp,setSelectedIndex:Ta,openInboxEntry:xh,archiveInboxEntry:Ih,isModalOpen:Je,isCommandPaletteOpen:Vt})),document.addEventListener("keydown",Iv()),document.addEventListener("keydown",$d({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&xn(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:Ap,setSelectedIndex:gl,isModalOpen:Je,isCommandPaletteOpen:Vt,isDetailViewActive:Si})),document.addEventListener("keydown",$d({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&Qc(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:Bp,setSelectedIndex:hl,isModalOpen:Je,isCommandPaletteOpen:Vt,isDetailViewActive:Si})),document.addEventListener("keydown",yv({closeModal:O,closeSidebar:Xs,navigateTo:M,showCreateIssueModal:si,showKeyboardShortcutsHelp:wd,isModalOpen:Je,focusSearch:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},isInlineDropdownOpen:ds,closeInlineDropdowns:xp,isModalDirty:$p,focusModalField:rl,closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Ot()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),rv([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>M("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>M("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>M("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>M("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>M("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>M("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>M("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>M("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>M("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>M("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>M("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>M("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{M("issues"),setTimeout(si,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{M("projects"),setTimeout(Uc,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{M("documents"),setTimeout(xc,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>dd(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{M("team"),setTimeout(cd,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>wd(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>vd(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>bd(),category:"Account"}]),document.addEventListener("keydown",wv({isModalOpen:Je,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Vt,openCommandPalette:lv,closeCommandPalette:Gs})),window.marked=F,window.DOMPurify=Jr,console.log("Chaotic frontend loaded via Vite")})();
