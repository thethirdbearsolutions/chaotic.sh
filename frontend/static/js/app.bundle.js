var rw=Object.defineProperty;var lw=(ft,we,Ut)=>we in ft?rw(ft,we,{enumerable:!0,configurable:!0,writable:!0,value:Ut}):ft[we]=Ut;var K=(ft,we,Ut)=>lw(ft,typeof we!="symbol"?we+"":we,Ut);(function(){"use strict";var Mr;function ft(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var we=ft();function Ut(e){we=e}var ei={exec:()=>null};function U(e,t=""){let n=typeof e=="string"?e:e.source;const i={replace:(s,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ke.caret,"$1"),n=n.replace(s,o),i},getRegex:()=>new RegExp(n,t)};return i}var ke={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},ju=/^(?:[ \t]*(?:\n|$))+/,Mu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ru=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ti=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Pu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ia=/(?:[*+-]|\d{1,9}[.)])/,Zr=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Xr=U(Zr).replace(/bull/g,Ia).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),qu=U(Zr).replace(/bull/g,Ia).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Sa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Nu=/^[^\n]+/,Ta=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ou=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ta).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Hu=U(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ia).getRegex(),es="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",La=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Fu=U("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",La).replace("tag",es).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qr=U(Sa).replace("hr",ti).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",es).getRegex(),Uu=U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qr).getRegex(),Ca={blockquote:Uu,code:Mu,def:Ou,fences:Ru,heading:Pu,hr:ti,html:Fu,lheading:Xr,list:Hu,newline:ju,paragraph:Qr,table:ei,text:Nu},Jr=U("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ti).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",es).getRegex(),Gu={...Ca,lheading:qu,table:Jr,paragraph:U(Sa).replace("hr",ti).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Jr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",es).getRegex()},zu={...Ca,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",La).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ei,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(Sa).replace("hr",ti).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Xr).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Wu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,el=/^( {2,}|\\)\n(?!\s*$)/,Ku=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ts=/[\p{P}\p{S}]/u,Aa=/[\s\p{P}\p{S}]/u,tl=/[^\s\p{P}\p{S}]/u,Yu=U(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Aa).getRegex(),nl=/(?!~)[\p{P}\p{S}]/u,Zu=/(?!~)[\s\p{P}\p{S}]/u,Xu=/(?:[^\s\p{P}\p{S}]|~)/u,Qu=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,il=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ju=U(il,"u").replace(/punct/g,ts).getRegex(),ep=U(il,"u").replace(/punct/g,nl).getRegex(),sl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tp=U(sl,"gu").replace(/notPunctSpace/g,tl).replace(/punctSpace/g,Aa).replace(/punct/g,ts).getRegex(),np=U(sl,"gu").replace(/notPunctSpace/g,Xu).replace(/punctSpace/g,Zu).replace(/punct/g,nl).getRegex(),ip=U("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,tl).replace(/punctSpace/g,Aa).replace(/punct/g,ts).getRegex(),sp=U(/\\(punct)/,"gu").replace(/punct/g,ts).getRegex(),ap=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),op=U(La).replace("(?:-->|$)","-->").getRegex(),rp=U("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",op).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ns=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,lp=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ns).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),al=U(/^!?\[(label)\]\[(ref)\]/).replace("label",ns).replace("ref",Ta).getRegex(),ol=U(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ta).getRegex(),cp=U("reflink|nolink(?!\\()","g").replace("reflink",al).replace("nolink",ol).getRegex(),Ba={_backpedal:ei,anyPunctuation:sp,autolink:ap,blockSkip:Qu,br:el,code:Wu,del:ei,emStrongLDelim:Ju,emStrongRDelimAst:tp,emStrongRDelimUnd:ip,escape:Vu,link:lp,nolink:ol,punctuation:Yu,reflink:al,reflinkSearch:cp,tag:rp,text:Ku,url:ei},dp={...Ba,link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",ns).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ns).getRegex()},Da={...Ba,emStrongRDelimAst:np,emStrongLDelim:ep,url:U(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},up={...Da,br:U(el).replace("{2,}","*").getRegex(),text:U(Da.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},is={normal:Ca,gfm:Gu,pedantic:zu},ni={normal:Ba,gfm:Da,breaks:up,pedantic:dp},pp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},rl=e=>pp[e];function Je(e,t){if(t){if(ke.escapeTest.test(e))return e.replace(ke.escapeReplace,rl)}else if(ke.escapeTestNoEncode.test(e))return e.replace(ke.escapeReplaceNoEncode,rl);return e}function ll(e){try{e=encodeURI(e).replace(ke.percentDecode,"%")}catch{return null}return e}function cl(e,t){var a;const n=e.replace(ke.findPipe,(o,r,c)=>{let d=!1,l=r;for(;--l>=0&&c[l]==="\\";)d=!d;return d?"|":" |"}),i=n.split(ke.splitPipe);let s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(ke.slashPipe,"|");return i}function ii(e,t,n){const i=e.length;if(i===0)return"";let s=0;for(;s<i&&e.charAt(i-s-1)===t;)s++;return e.slice(0,i-s)}function mp(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function dl(e,t,n,i,s){const a=t.href,o=t.title||null,r=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:i.inlineTokens(r)};return i.state.inLink=!1,c}function fp(e,t,n){const i=e.match(n.other.indentCodeCompensation);if(i===null)return t;const s=i[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=s.length?a.slice(s.length):a}).join(`
`)}var ss=class{constructor(e){K(this,"options");K(this,"rules");K(this,"lexer");this.options=e||we}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ii(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],i=fp(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const i=ii(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ii(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=ii(t[0],`
`).split(`
`),i="",s="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const d=r.join(`
`),l=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${d}`:d,s=s?`${s}
${l}`:l;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=u,n.length===0)break;const f=a.at(-1);if((f==null?void 0:f.type)==="code")break;if((f==null?void 0:f.type)==="blockquote"){const y=f,b=y.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,i=i.substring(0,i.length-y.raw.length)+w.raw,s=s.substring(0,s.length-y.text.length)+w.text;break}else if((f==null?void 0:f.type)==="list"){const y=f,b=y.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,i=i.substring(0,i.length-f.raw.length)+w.raw,s=s.substring(0,s.length-y.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,d="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),f=e.split(`
`,1)[0],y=!u.trim(),b=0;if(this.options.pedantic?(b=2,l=u.trimStart()):y?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,l=u.slice(b),b+=t[1].length),y&&this.rules.other.blankLine.test(f)&&(d+=f+`
`,e=e.substring(f.length+1),c=!0),!c){const I=this.rules.other.nextBulletRegex(b),D=this.rules.other.hrRegex(b),B=this.rules.other.fencesBeginRegex(b),x=this.rules.other.headingBeginRegex(b),j=this.rules.other.htmlBeginRegex(b);for(;e;){const S=e.split(`
`,1)[0];let V;if(f=S,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),V=f):V=f.replace(this.rules.other.tabCharGlobal,"    "),B.test(f)||x.test(f)||j.test(f)||I.test(f)||D.test(f))break;if(V.search(this.rules.other.nonSpaceChar)>=b||!f.trim())l+=`
`+V.slice(b);else{if(y||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||x.test(u)||D.test(u))break;l+=`
`+f}!y&&!f.trim()&&(y=!0),d+=S+`
`,e=e.substring(S.length+1),u=V.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0));let w=null,_;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(_=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),s.items.push({type:"list_item",raw:d,task:!!w,checked:_,loose:!1,text:l,tokens:[]}),s.raw+=d}const r=s.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c=0;c<s.items.length;c++)if(this.lexer.state.top=!1,s.items[c].tokens=this.lexer.blockTokens(s.items[c].text,[]),!s.loose){const d=s.items[c].tokens.filter(u=>u.type==="space"),l=d.length>0&&d.some(u=>this.rules.other.anyLine.test(u.raw));s.loose=l}if(s.loose)for(let c=0;c<s.items.length;c++)s.items[c].loose=!0;return s}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=cl(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(const r of i)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of s)a.rows.push(cl(r,a.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[d]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=ii(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=mp(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),dl(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return dl(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(i[1]||i[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...i[0]].length-1;let o,r,c=a,d=0;const l=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(i=l.exec(t))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=[...o].length,i[3]||i[4]){c+=r;continue}else if((i[5]||i[6])&&a%3&&!((a+r)%3)){d+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+d);const u=[...i[0]][0].length,f=e.slice(0,a+i.index+u+r);if(Math.min(a,r)%2){const b=f.slice(1,-1);return{type:"em",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}const y=f.slice(2,-2);return{type:"strong",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},gt=class Kr{constructor(t){K(this,"tokens");K(this,"options");K(this,"state");K(this,"tokenizer");K(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||we,this.options.tokenizer=this.options.tokenizer||new ss,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ke,block:is.normal,inline:ni.normal};this.options.pedantic?(n.block=is.pedantic,n.inline=ni.pedantic):this.options.gfm&&(n.block=is.gfm,this.options.breaks?n.inline=ni.breaks:n.inline=ni.gfm),this.tokenizer.rules=n}static get rules(){return{block:is,inline:ni}}static lex(t,n){return new Kr(n).lex(t)}static lexInline(t,n){return new Kr(n).inlineTokens(t)}lex(t){t=t.replace(ke.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){var s,a,o;for(this.options.pedantic&&(t=t.replace(ke.tabCharGlobal,"    ").replace(ke.spaceLine,""));t;){let r;if((a=(s=this.options.extensions)==null?void 0:s.block)!=null&&a.some(d=>(r=d.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const d=n.at(-1);r.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let d=1/0;const l=t.slice(1);let u;this.options.extensions.startBlock.forEach(f=>{u=f.call({lexer:this},l),typeof u=="number"&&u>=0&&(d=Math.min(d,u))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const d=n.at(-1);i&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r),i=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(t){const d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,d;let i=t,s=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(f=>(l=f.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const f=n.at(-1);l.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=l.raw,f.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,i,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if((d=this.options.extensions)!=null&&d.startInline){let f=1/0;const y=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},y),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const f=n.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=l.raw,f.text+=l.text):n.push(l);continue}if(t){const f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},as=class{constructor(e){K(this,"options");K(this,"parser");this.options=e||we}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const i=(a=(t||"").match(ke.notSpaceStart))==null?void 0:a[0],s=e.replace(ke.endingNewline,"")+`
`;return i?'<pre><code class="language-'+Je(i)+'">'+(n?s:Je(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Je(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let i="";for(let o=0;o<e.items.length;o++){const r=e.items[o];i+=this.listitem(r)}const s=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(e){var n;let t="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+Je(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" ",escaped:!0}):t+=i+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){const a=e.rows[s];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Je(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const i=this.parser.parseInline(n),s=ll(e);if(s===null)return i;e=s;let a='<a href="'+e+'"';return t&&(a+=' title="'+Je(t)+'"'),a+=">"+i+"</a>",a}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));const s=ll(e);if(s===null)return Je(n);e=s;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Je(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Je(e.text)}},ja=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},ht=class Yr{constructor(t){K(this,"options");K(this,"renderer");K(this,"textRenderer");this.options=t||we,this.options.renderer=this.options.renderer||new as,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ja}static parse(t,n){return new Yr(n).parse(t)}static parseInline(t,n){return new Yr(n).parseInline(t)}parse(t,n=!0){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const d=r,l=this.options.extensions.renderers[d.type].call({parser:this},d);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){i+=l||"";continue}}const c=r;switch(c.type){case"space":{i+=this.renderer.space(c);continue}case"hr":{i+=this.renderer.hr(c);continue}case"heading":{i+=this.renderer.heading(c);continue}case"code":{i+=this.renderer.code(c);continue}case"table":{i+=this.renderer.table(c);continue}case"blockquote":{i+=this.renderer.blockquote(c);continue}case"list":{i+=this.renderer.list(c);continue}case"html":{i+=this.renderer.html(c);continue}case"paragraph":{i+=this.renderer.paragraph(c);continue}case"text":{let d=c,l=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],l+=`
`+this.renderer.text(d);n?i+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):i+=l;continue}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return i}parseInline(t,n=this.renderer){var s,a;let i="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[r.type]){const d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=d||"";continue}}const c=r;switch(c.type){case"escape":{i+=n.text(c);break}case"html":{i+=n.html(c);break}case"link":{i+=n.link(c);break}case"image":{i+=n.image(c);break}case"strong":{i+=n.strong(c);break}case"em":{i+=n.em(c);break}case"codespan":{i+=n.codespan(c);break}case"br":{i+=n.br(c);break}case"del":{i+=n.del(c);break}case"text":{i+=n.text(c);break}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return i}},os=(Mr=class{constructor(e){K(this,"options");K(this,"block");this.options=e||we}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?gt.lex:gt.lexInline}provideParser(){return this.block?ht.parse:ht.parseInline}},K(Mr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Mr),gp=class{constructor(...e){K(this,"defaults",ft());K(this,"options",this.setOptions);K(this,"parse",this.parseMarkdown(!0));K(this,"parseInline",this.parseMarkdown(!1));K(this,"Parser",ht);K(this,"Renderer",as);K(this,"TextRenderer",ja);K(this,"Lexer",gt);K(this,"Tokenizer",ss);K(this,"Hooks",os);this.use(...e)}walkTokens(e,t){var i,s;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const a=t.renderers[s.name];a?t.renderers[s.name]=function(...o){let r=s.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[s.level];a?a.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){const s=this.defaults.renderer||new as(this.defaults);for(const a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=s[o];s[o]=(...d)=>{let l=r.apply(s,d);return l===!1&&(l=c.apply(s,d)),l||""}}i.renderer=s}if(n.tokenizer){const s=this.defaults.tokenizer||new ss(this.defaults);for(const a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=s[o];s[o]=(...d)=>{let l=r.apply(s,d);return l===!1&&(l=c.apply(s,d)),l}}i.tokenizer=s}if(n.hooks){const s=this.defaults.hooks||new os;for(const a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=s[o];os.passThroughHooks.has(a)?s[o]=d=>{if(this.defaults.async)return Promise.resolve(r.call(s,d)).then(u=>c.call(s,u));const l=r.call(s,d);return c.call(s,l)}:s[o]=(...d)=>{let l=r.apply(s,d);return l===!1&&(l=c.apply(s,d)),l}}i.hooks=s}if(n.walkTokens){const s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),s&&(r=r.concat(s.call(this,o))),r}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return gt.lex(e,t??this.defaults)}parser(e,t){return ht.parse(e,t??this.defaults)}parseMarkdown(e){return(n,i)=>{const s={...i},a={...this.defaults,...s},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?gt.lex:gt.lexInline,c=a.hooks?a.hooks.provideParser():e?ht.parse:ht.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(d=>r(d,a)).then(d=>a.hooks?a.hooks.processAllTokens(d):d).then(d=>a.walkTokens?Promise.all(this.walkTokens(d,a.walkTokens)).then(()=>d):d).then(d=>c(d,a)).then(d=>a.hooks?a.hooks.postprocess(d):d).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let d=r(n,a);a.hooks&&(d=a.hooks.processAllTokens(d)),a.walkTokens&&this.walkTokens(d,a.walkTokens);let l=c(d,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(d){return o(d)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Je(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}},Gt=new gp;function F(e,t){return Gt.parse(e,t)}F.options=F.setOptions=function(e){return Gt.setOptions(e),F.defaults=Gt.defaults,Ut(F.defaults),F},F.getDefaults=ft,F.defaults=we,F.use=function(...e){return Gt.use(...e),F.defaults=Gt.defaults,Ut(F.defaults),F},F.walkTokens=function(e,t){return Gt.walkTokens(e,t)},F.parseInline=Gt.parseInline,F.Parser=ht,F.parser=ht.parse,F.Renderer=as,F.TextRenderer=ja,F.Lexer=gt,F.lexer=gt.lex,F.Tokenizer=ss,F.Hooks=os,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,ht.parse,gt.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:ul,setPrototypeOf:pl,isFrozen:hp,getPrototypeOf:vp,getOwnPropertyDescriptor:bp}=Object;let{freeze:$e,seal:Ne,create:Ma}=Object,{apply:Ra,construct:Pa}=typeof Reflect<"u"&&Reflect;$e||($e=function(t){return t}),Ne||(Ne=function(t){return t}),Ra||(Ra=function(t,n){for(var i=arguments.length,s=new Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];return t.apply(n,s)}),Pa||(Pa=function(t){for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return new t(...i)});const rs=xe(Array.prototype.forEach),yp=xe(Array.prototype.lastIndexOf),ml=xe(Array.prototype.pop),si=xe(Array.prototype.push),wp=xe(Array.prototype.splice),ls=xe(String.prototype.toLowerCase),qa=xe(String.prototype.toString),Na=xe(String.prototype.match),ai=xe(String.prototype.replace),kp=xe(String.prototype.indexOf),$p=xe(String.prototype.trim),We=xe(Object.prototype.hasOwnProperty),Ee=xe(RegExp.prototype.test),oi=Ep(TypeError);function xe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];return Ra(e,t,i)}}function Ep(e){return function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return Pa(e,n)}}function q(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ls;pl&&pl(e,null);let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){const a=n(s);a!==s&&(hp(t)||(t[i]=a),s=a)}e[s]=!0}return e}function xp(e){for(let t=0;t<e.length;t++)We(e,t)||(e[t]=null);return e}function et(e){const t=Ma(null);for(const[n,i]of ul(e))We(e,n)&&(Array.isArray(i)?t[n]=xp(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=et(i):t[n]=i);return t}function ri(e,t){for(;e!==null;){const i=bp(e,t);if(i){if(i.get)return xe(i.get);if(typeof i.value=="function")return xe(i.value)}e=vp(e)}function n(){return null}return n}const fl=$e(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Oa=$e(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ha=$e(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_p=$e(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fa=$e(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ip=$e(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gl=$e(["#text"]),hl=$e(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ua=$e(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vl=$e(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),cs=$e(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sp=Ne(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Tp=Ne(/<%[\w\W]*|[\w\W]*%>/gm),Lp=Ne(/\$\{[\w\W]*/gm),Cp=Ne(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ap=Ne(/^aria-[\-\w]+$/),bl=Ne(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Bp=Ne(/^(?:\w+script|data):/i),Dp=Ne(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yl=Ne(/^html$/i),jp=Ne(/^[a-z][.\w]*(-[.\w]+)+$/i);var wl=Object.freeze({__proto__:null,ARIA_ATTR:Ap,ATTR_WHITESPACE:Dp,CUSTOM_ELEMENT:jp,DATA_ATTR:Cp,DOCTYPE_NAME:yl,ERB_EXPR:Tp,IS_ALLOWED_URI:bl,IS_SCRIPT_OR_DATA:Bp,MUSTACHE_EXPR:Sp,TMPLIT_EXPR:Lp});const li={element:1,text:3,progressingInstruction:7,comment:8,document:9},Mp=function(){return typeof window>"u"?null:window},Rp=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(i=n.getAttribute(s));const a="dompurify"+(i?"#"+i:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},kl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $l(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Mp();const t=A=>$l(A);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==li.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const i=n,s=i.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:d,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:f,trustedTypes:y}=e,b=c.prototype,w=ri(b,"cloneNode"),_=ri(b,"remove"),I=ri(b,"nextSibling"),D=ri(b,"childNodes"),B=ri(b,"parentNode");if(typeof o=="function"){const A=n.createElement("template");A.content&&A.content.ownerDocument&&(n=A.content.ownerDocument)}let x,j="";const{implementation:S,createNodeIterator:V,createDocumentFragment:se,getElementsByTagName:be}=n,{importNode:Pe}=i;let Y=kl();t.isSupported=typeof ul=="function"&&typeof B=="function"&&S&&S.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:le,ERB_EXPR:ae,TMPLIT_EXPR:qe,DATA_ATTR:dt,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:Ve,ATTR_WHITESPACE:Ft,CUSTOM_ELEMENT:ut}=wl;let{IS_ALLOWED_URI:ba}=wl,v=null;const ie=q({},[...fl,...Oa,...Ha,...Fa,...gl]);let G=null;const Zi=q({},[...hl,...Ua,...vl,...cs]);let W=Object.seal(Ma(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Xi=null,Rr=null;const Wn=Object.seal(Ma(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let fu=!0,Pr=!0,gu=!1,hu=!0,Kn=!1,ya=!0,an=!1,qr=!1,Nr=!1,Yn=!1,wa=!1,ka=!1,vu=!0,bu=!1;const Jy="user-content-";let Or=!0,Qi=!1,Zn={},pt=null;const Hr=q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let yu=null;const wu=q({},["audio","video","img","source","image","track"]);let Fr=null;const ku=q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$a="http://www.w3.org/1998/Math/MathML",Ea="http://www.w3.org/2000/svg",Tt="http://www.w3.org/1999/xhtml";let Xn=Tt,Ur=!1,Gr=null;const ew=q({},[$a,Ea,Tt],qa);let xa=q({},["mi","mo","mn","ms","mtext"]),_a=q({},["annotation-xml"]);const tw=q({},["title","style","font","a","script"]);let Ji=null;const nw=["application/xhtml+xml","text/html"],iw="text/html";let ce=null,Qn=null;const sw=n.createElement("form"),$u=function(g){return g instanceof RegExp||g instanceof Function},zr=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Qn&&Qn===g)){if((!g||typeof g!="object")&&(g={}),g=et(g),Ji=nw.indexOf(g.PARSER_MEDIA_TYPE)===-1?iw:g.PARSER_MEDIA_TYPE,ce=Ji==="application/xhtml+xml"?qa:ls,v=We(g,"ALLOWED_TAGS")?q({},g.ALLOWED_TAGS,ce):ie,G=We(g,"ALLOWED_ATTR")?q({},g.ALLOWED_ATTR,ce):Zi,Gr=We(g,"ALLOWED_NAMESPACES")?q({},g.ALLOWED_NAMESPACES,qa):ew,Fr=We(g,"ADD_URI_SAFE_ATTR")?q(et(ku),g.ADD_URI_SAFE_ATTR,ce):ku,yu=We(g,"ADD_DATA_URI_TAGS")?q(et(wu),g.ADD_DATA_URI_TAGS,ce):wu,pt=We(g,"FORBID_CONTENTS")?q({},g.FORBID_CONTENTS,ce):Hr,Xi=We(g,"FORBID_TAGS")?q({},g.FORBID_TAGS,ce):et({}),Rr=We(g,"FORBID_ATTR")?q({},g.FORBID_ATTR,ce):et({}),Zn=We(g,"USE_PROFILES")?g.USE_PROFILES:!1,fu=g.ALLOW_ARIA_ATTR!==!1,Pr=g.ALLOW_DATA_ATTR!==!1,gu=g.ALLOW_UNKNOWN_PROTOCOLS||!1,hu=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Kn=g.SAFE_FOR_TEMPLATES||!1,ya=g.SAFE_FOR_XML!==!1,an=g.WHOLE_DOCUMENT||!1,Yn=g.RETURN_DOM||!1,wa=g.RETURN_DOM_FRAGMENT||!1,ka=g.RETURN_TRUSTED_TYPE||!1,Nr=g.FORCE_BODY||!1,vu=g.SANITIZE_DOM!==!1,bu=g.SANITIZE_NAMED_PROPS||!1,Or=g.KEEP_CONTENT!==!1,Qi=g.IN_PLACE||!1,ba=g.ALLOWED_URI_REGEXP||bl,Xn=g.NAMESPACE||Tt,xa=g.MATHML_TEXT_INTEGRATION_POINTS||xa,_a=g.HTML_INTEGRATION_POINTS||_a,W=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&$u(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(W.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&$u(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(W.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(W.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Kn&&(Pr=!1),wa&&(Yn=!0),Zn&&(v=q({},gl),G=[],Zn.html===!0&&(q(v,fl),q(G,hl)),Zn.svg===!0&&(q(v,Oa),q(G,Ua),q(G,cs)),Zn.svgFilters===!0&&(q(v,Ha),q(G,Ua),q(G,cs)),Zn.mathMl===!0&&(q(v,Fa),q(G,vl),q(G,cs))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?Wn.tagCheck=g.ADD_TAGS:(v===ie&&(v=et(v)),q(v,g.ADD_TAGS,ce))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?Wn.attributeCheck=g.ADD_ATTR:(G===Zi&&(G=et(G)),q(G,g.ADD_ATTR,ce))),g.ADD_URI_SAFE_ATTR&&q(Fr,g.ADD_URI_SAFE_ATTR,ce),g.FORBID_CONTENTS&&(pt===Hr&&(pt=et(pt)),q(pt,g.FORBID_CONTENTS,ce)),g.ADD_FORBID_CONTENTS&&(pt===Hr&&(pt=et(pt)),q(pt,g.ADD_FORBID_CONTENTS,ce)),Or&&(v["#text"]=!0),an&&q(v,["html","head","body"]),v.table&&(q(v,["tbody"]),delete Xi.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw oi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw oi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=g.TRUSTED_TYPES_POLICY,j=x.createHTML("")}else x===void 0&&(x=Rp(y,s)),x!==null&&typeof j=="string"&&(j=x.createHTML(""));$e&&$e(g),Qn=g}},Eu=q({},[...Oa,...Ha,..._p]),xu=q({},[...Fa,...Ip]),aw=function(g){let E=B(g);(!E||!E.tagName)&&(E={namespaceURI:Xn,tagName:"template"});const T=ls(g.tagName),te=ls(E.tagName);return Gr[g.namespaceURI]?g.namespaceURI===Ea?E.namespaceURI===Tt?T==="svg":E.namespaceURI===$a?T==="svg"&&(te==="annotation-xml"||xa[te]):!!Eu[T]:g.namespaceURI===$a?E.namespaceURI===Tt?T==="math":E.namespaceURI===Ea?T==="math"&&_a[te]:!!xu[T]:g.namespaceURI===Tt?E.namespaceURI===Ea&&!_a[te]||E.namespaceURI===$a&&!xa[te]?!1:!xu[T]&&(tw[T]||!Eu[T]):!!(Ji==="application/xhtml+xml"&&Gr[g.namespaceURI]):!1},mt=function(g){si(t.removed,{element:g});try{B(g).removeChild(g)}catch{_(g)}},on=function(g,E){try{si(t.removed,{attribute:E.getAttributeNode(g),from:E})}catch{si(t.removed,{attribute:null,from:E})}if(E.removeAttribute(g),g==="is")if(Yn||wa)try{mt(E)}catch{}else try{E.setAttribute(g,"")}catch{}},_u=function(g){let E=null,T=null;if(Nr)g="<remove></remove>"+g;else{const re=Na(g,/^[\r\n\t ]+/);T=re&&re[0]}Ji==="application/xhtml+xml"&&Xn===Tt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const te=x?x.createHTML(g):g;if(Xn===Tt)try{E=new f().parseFromString(te,Ji)}catch{}if(!E||!E.documentElement){E=S.createDocument(Xn,"template",null);try{E.documentElement.innerHTML=Ur?j:te}catch{}}const ye=E.body||E.documentElement;return g&&T&&ye.insertBefore(n.createTextNode(T),ye.childNodes[0]||null),Xn===Tt?be.call(E,an?"html":"body")[0]:an?E.documentElement:ye},Iu=function(g){return V.call(g.ownerDocument||g,g,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Vr=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof l)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Su=function(g){return typeof r=="function"&&g instanceof r};function Lt(A,g,E){rs(A,T=>{T.call(t,g,E,Qn)})}const Tu=function(g){let E=null;if(Lt(Y.beforeSanitizeElements,g,null),Vr(g))return mt(g),!0;const T=ce(g.nodeName);if(Lt(Y.uponSanitizeElement,g,{tagName:T,allowedTags:v}),ya&&g.hasChildNodes()&&!Su(g.firstElementChild)&&Ee(/<[/\w!]/g,g.innerHTML)&&Ee(/<[/\w!]/g,g.textContent)||g.nodeType===li.progressingInstruction||ya&&g.nodeType===li.comment&&Ee(/<[/\w]/g,g.data))return mt(g),!0;if(!(Wn.tagCheck instanceof Function&&Wn.tagCheck(T))&&(!v[T]||Xi[T])){if(!Xi[T]&&Cu(T)&&(W.tagNameCheck instanceof RegExp&&Ee(W.tagNameCheck,T)||W.tagNameCheck instanceof Function&&W.tagNameCheck(T)))return!1;if(Or&&!pt[T]){const te=B(g)||g.parentNode,ye=D(g)||g.childNodes;if(ye&&te){const re=ye.length;for(let De=re-1;De>=0;--De){const Ct=w(ye[De],!0);Ct.__removalCount=(g.__removalCount||0)+1,te.insertBefore(Ct,I(g))}}}return mt(g),!0}return g instanceof c&&!aw(g)||(T==="noscript"||T==="noembed"||T==="noframes")&&Ee(/<\/no(script|embed|frames)/i,g.innerHTML)?(mt(g),!0):(Kn&&g.nodeType===li.text&&(E=g.textContent,rs([le,ae,qe],te=>{E=ai(E,te," ")}),g.textContent!==E&&(si(t.removed,{element:g.cloneNode()}),g.textContent=E)),Lt(Y.afterSanitizeElements,g,null),!1)},Lu=function(g,E,T){if(vu&&(E==="id"||E==="name")&&(T in n||T in sw))return!1;if(!(Pr&&!Rr[E]&&Ee(dt,E))){if(!(fu&&Ee(ze,E))){if(!(Wn.attributeCheck instanceof Function&&Wn.attributeCheck(E,g))){if(!G[E]||Rr[E]){if(!(Cu(g)&&(W.tagNameCheck instanceof RegExp&&Ee(W.tagNameCheck,g)||W.tagNameCheck instanceof Function&&W.tagNameCheck(g))&&(W.attributeNameCheck instanceof RegExp&&Ee(W.attributeNameCheck,E)||W.attributeNameCheck instanceof Function&&W.attributeNameCheck(E,g))||E==="is"&&W.allowCustomizedBuiltInElements&&(W.tagNameCheck instanceof RegExp&&Ee(W.tagNameCheck,T)||W.tagNameCheck instanceof Function&&W.tagNameCheck(T))))return!1}else if(!Fr[E]){if(!Ee(ba,ai(T,Ft,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&g!=="script"&&kp(T,"data:")===0&&yu[g])){if(!(gu&&!Ee(Ve,ai(T,Ft,"")))){if(T)return!1}}}}}}}return!0},Cu=function(g){return g!=="annotation-xml"&&Na(g,ut)},Au=function(g){Lt(Y.beforeSanitizeAttributes,g,null);const{attributes:E}=g;if(!E||Vr(g))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:G,forceKeepAttr:void 0};let te=E.length;for(;te--;){const ye=E[te],{name:re,namespaceURI:De,value:Ct}=ye,Jn=ce(re),Wr=Ct;let fe=re==="value"?Wr:$p(Wr);if(T.attrName=Jn,T.attrValue=fe,T.keepAttr=!0,T.forceKeepAttr=void 0,Lt(Y.uponSanitizeAttribute,g,T),fe=T.attrValue,bu&&(Jn==="id"||Jn==="name")&&(on(re,g),fe=Jy+fe),ya&&Ee(/((--!?|])>)|<\/(style|title|textarea)/i,fe)){on(re,g);continue}if(Jn==="attributename"&&Na(fe,"href")){on(re,g);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){on(re,g);continue}if(!hu&&Ee(/\/>/i,fe)){on(re,g);continue}Kn&&rs([le,ae,qe],Du=>{fe=ai(fe,Du," ")});const Bu=ce(g.nodeName);if(!Lu(Bu,Jn,fe)){on(re,g);continue}if(x&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!De)switch(y.getAttributeType(Bu,Jn)){case"TrustedHTML":{fe=x.createHTML(fe);break}case"TrustedScriptURL":{fe=x.createScriptURL(fe);break}}if(fe!==Wr)try{De?g.setAttributeNS(De,re,fe):g.setAttribute(re,fe),Vr(g)?mt(g):ml(t.removed)}catch{on(re,g)}}Lt(Y.afterSanitizeAttributes,g,null)},ow=function A(g){let E=null;const T=Iu(g);for(Lt(Y.beforeSanitizeShadowDOM,g,null);E=T.nextNode();)Lt(Y.uponSanitizeShadowNode,E,null),Tu(E),Au(E),E.content instanceof a&&A(E.content);Lt(Y.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(A){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,T=null,te=null,ye=null;if(Ur=!A,Ur&&(A="<!-->"),typeof A!="string"&&!Su(A))if(typeof A.toString=="function"){if(A=A.toString(),typeof A!="string")throw oi("dirty is not a string, aborting")}else throw oi("toString is not a function");if(!t.isSupported)return A;if(qr||zr(g),t.removed=[],typeof A=="string"&&(Qi=!1),Qi){if(A.nodeName){const Ct=ce(A.nodeName);if(!v[Ct]||Xi[Ct])throw oi("root node is forbidden and cannot be sanitized in-place")}}else if(A instanceof r)E=_u("<!---->"),T=E.ownerDocument.importNode(A,!0),T.nodeType===li.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?E=T:E.appendChild(T);else{if(!Yn&&!Kn&&!an&&A.indexOf("<")===-1)return x&&ka?x.createHTML(A):A;if(E=_u(A),!E)return Yn?null:ka?j:""}E&&Nr&&mt(E.firstChild);const re=Iu(Qi?A:E);for(;te=re.nextNode();)Tu(te),Au(te),te.content instanceof a&&ow(te.content);if(Qi)return A;if(Yn){if(wa)for(ye=se.call(E.ownerDocument);E.firstChild;)ye.appendChild(E.firstChild);else ye=E;return(G.shadowroot||G.shadowrootmode)&&(ye=Pe.call(i,ye,!0)),ye}let De=an?E.outerHTML:E.innerHTML;return an&&v["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&Ee(yl,E.ownerDocument.doctype.name)&&(De="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+De),Kn&&rs([le,ae,qe],Ct=>{De=ai(De,Ct," ")}),x&&ka?x.createHTML(De):De},t.setConfig=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};zr(A),qr=!0},t.clearConfig=function(){Qn=null,qr=!1},t.isValidAttribute=function(A,g,E){Qn||zr({});const T=ce(A),te=ce(g);return Lu(T,te,E)},t.addHook=function(A,g){typeof g=="function"&&si(Y[A],g)},t.removeHook=function(A,g){if(g!==void 0){const E=yp(Y[A],g);return E===-1?void 0:wp(Y[A],E,1)[0]}return ml(Y[A])},t.removeHooks=function(A){Y[A]=[]},t.removeAllHooks=function(){Y=kl()},t}var El=$l();const Ga="chaotic_";function Be(e){try{return localStorage.getItem(Ga+e)}catch{return null}}function Oe(e,t){try{localStorage.setItem(Ga+e,t)}catch{}}function tt(e){try{localStorage.removeItem(Ga+e)}catch{}}function xl(){return Be("token")}function Pp(e){e?Oe("token",e):tt("token")}function qp(){return Be("theme")}function Np(e){Oe("theme",e)}function _l(){return Be("last_project")}function Op(e){Oe("last_project",e)}function Hp(){return Be("onboarding_complete")==="true"}function Fp(){Oe("onboarding_complete","true")}function Up(){tt("onboarding_complete")}function Gp(e){return e?Be(`issues_filters_${e}`):null}function zp(e,t){e&&(t?Oe(`issues_filters_${e}`,t):tt(`issues_filters_${e}`))}function Il(e){return Be(`comment_draft_${e}`)}function ds(e,t){t?Oe(`comment_draft_${e}`,t):tt(`comment_draft_${e}`)}function Sl(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function us(e){const t=Be(`description_draft_${e}`);if(!t)return null;const n=Sl(t);return n?n.draft:t}function Tl(e){const t=Be(`description_draft_${e}`);if(!t)return null;const n=Sl(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function zt(e,t,n=""){t?Oe(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):tt(`description_draft_${e}`)}function Ll(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function Cl(e){var n;const t=Be(`document_draft_${e}`);return t?((n=Ll(t))==null?void 0:n.draft)??null:null}function Vp(e){const t=Be(`document_draft_${e}`);if(!t)return null;const n=Ll(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function ps(e,t,n=null){t&&(t.title||t.content||t.icon)?Oe(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):tt(`document_draft_${e}`)}function Wp(){return{title:Be("create_issue_title"),description:Be("create_issue_description")}}function Al(e,t){e?Oe("create_issue_title",e):tt("create_issue_title"),t?Oe("create_issue_description",t):tt("create_issue_description")}function Kp(){tt("create_issue_title"),tt("create_issue_description")}function Yp(){return Be("doc_view_mode")}function Zp(e){Oe("doc_view_mode",e)}function Xp(){return Be("approvals_explainer_dismissed")==="1"}function Qp(){Oe("approvals_explainer_dismissed","1")}const Jp="/api";class em{constructor(){this.token=xl()}setToken(t){this.token=t,Pp(t)}getToken(){return this.token}async request(t,n,i=null){const s={"Content-Type":"application/json","X-Chaotic-Interactive":"1"};this.token&&(s.Authorization=`Bearer ${this.token}`);const a={method:t,headers:s};i&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(i));let o;try{o=await fetch(`${Jp}${n}`,a)}catch(c){const d=new Error("Network error - check your connection");throw d.isNetworkError=!0,d.cause=c,d}if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const d=new Error(c);throw d.status=o.status,d.detail=r.detail,d}return r}async signup(t,n,i){return this.request("POST","/auth/signup",{name:t,email:n,password:i})}async login(t,n){const i=await this.request("POST","/auth/login",{email:t,password:n,client:"web"});return this.setToken(i.access_token),i}async getMe(){return this.request("GET","/auth/me")}async getOAuthRequest(t){return this.request("GET",`/oauth/requests/${encodeURIComponent(t)}`)}async approveOAuthRequest(t,n){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/approve`,n)}async denyOAuthRequest(t){return this.request("POST",`/oauth/requests/${encodeURIComponent(t)}/deny`,{})}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,i){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:i})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,i="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:i})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([i,s])=>{s==null||s===""||(Array.isArray(s)?s.forEach(a=>n.append(i,a)):n.append(i,s))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,i=null,s=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${s}&limit=${a}`;return i&&(o+=`&project_id=${i}`),this.request("GET",o)}async getTeamIssues(t,n={}){const i=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([s,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>i.append(s,o)):i.append(s,a))}),this.request("GET",`/issues?${i.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async getIssueDescriptionRevisions(t){return this.request("GET",`/issues/${t}/description-revisions`)}async getIssueDescriptionRevision(t,n){return this.request("GET",`/issues/${t}/description-revisions/${n}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,i){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:i})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,i=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${i}`)}async getTeamActivities(t,n=0,i=20,{projectId:s}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${i}`;return s&&(a+=`&project_id=${s}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,i="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:i})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let i=`/projects/${t}/sprints`;return n&&(i+=`?sprint_status=${n}`),this.request("GET",i)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}attestationBody(t,n){const i={};return t&&(i.note=t),n&&n.document_id&&(i.document_id=n.document_id),n&&n.url&&(i.url=n.url),i}async attestRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest?project_id=${n}`,this.attestationBody(i,s))}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete?project_id=${n}`,this.attestationBody(i,s))}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/attest-issue/${n}`,this.attestationBody(i,s))}async completeTicketGateRitual(t,n,i=null,s=null){return this.request("POST",`/rituals/${t}/complete-issue/${n}`,this.attestationBody(i,s))}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async rejectTicketRitual(t,n,i){return this.request("POST",`/rituals/${t}/reject-issue/${n}`,{note:i})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,i=null,s=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),s&&o.push(`sprint_id=${s}`),i&&o.push(`search=${encodeURIComponent(i)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentRevisions(t){return this.request("GET",`/documents/${t}/revisions`)}async getDocumentRevision(t,n){return this.request("GET",`/documents/${t}/revisions/${n}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,i){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:i})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async getConnections(){return this.request("GET","/oauth/connections")}async revokeConnection(t){return this.request("DELETE",`/oauth/connections/${encodeURIComponent(t)}`)}async getPushDevices(){return this.request("GET","/push/devices")}async deletePushDevice(t){return this.request("DELETE",`/push/devices/${encodeURIComponent(t)}`)}async createTeamAgent(t,n,i=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:i})}async createProjectAgent(t,n,i=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:i})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}async createAgentKey(t){return this.request("POST",`/agents/${t}/keys`)}async getInbox(t,{unread:n=!1,skip:i=0,limit:s=50}={}){const a=new URLSearchParams({team_id:t,skip:i,limit:s});return n&&a.set("unread","true"),this.request("GET",`/inbox?${a.toString()}`)}async getInboxUnreadCount(t){return this.request("GET",`/inbox/unread-count?team_id=${t}`)}async markInboxRead(t){return this.request("POST",`/inbox/${t}/read`,{})}async archiveInbox(t){return this.request("POST",`/inbox/${t}/archive`,{})}async markAllInboxRead(t){return this.request("POST",`/inbox/mark-all-read?team_id=${t}`,{})}}const h=new em;let rn=null;const tm='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let ln=null,ci=!1;function za(){ci=!0}function nm(){ci=!1}function Bl(){var e;(e=document.querySelector('#modal-content input:not([type="hidden"]), #modal-content textarea'))==null||e.focus()}function im(){if(ci)return!0;const e=document.getElementById("modal-content");if(!e)return!1;for(const t of e.querySelectorAll("input, textarea, select"))if(t.tagName==="SELECT"){const n=Array.from(t.options);if(t.multiple){if(n.some(i=>i.selected!==i.defaultSelected))return!0}else{const i=Math.max(0,n.findIndex(s=>s.defaultSelected));if(n.length&&t.selectedIndex!==i)return!0}}else{if(t.type==="hidden")continue;if(t.type==="checkbox"||t.type==="radio"){if(t.checked!==t.defaultChecked)return!0}else if(t.value!==t.defaultValue)return!0}return!1}function H(){ln=document.activeElement,ci=!1,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;vt(),ci=!1,document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),ln&&document.contains(ln)&&typeof ln.focus=="function"&&ln.focus(),ln=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,i=n.querySelectorAll(tm);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())});function nt(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${t}`;const s=document.createElement("span");s.className="toast-message",s.textContent=e,i.appendChild(s);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",i.appendChild(a),n.appendChild(i);const o=()=>{i.classList.add("toast-exit"),i.addEventListener("animationend",()=>i.remove(),{once:!0}),setTimeout(()=>{i.parentNode&&i.remove()},500)},c=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let d=c,l=Date.now(),u=setTimeout(o,c);a.addEventListener("click",()=>{clearTimeout(u),o()}),i.addEventListener("mouseenter",()=>{clearTimeout(u),d-=Date.now()-l}),i.addEventListener("mouseleave",()=>{l=Date.now(),u=setTimeout(o,Math.max(d,500))})}function sm(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function $(e,t){const n=sm(t),i=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${i}`,"error")}function vt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),rn&&(document.removeEventListener("keydown",rn),rn=null)}function am(){var n;const e=document.activeElement,t=!!((n=e==null?void 0:e.closest)!=null&&n.call(e,".inline-dropdown"));vt(),t&&nt()&&Bl()}function di(e){rn&&document.removeEventListener("keydown",rn),rn=e,e&&document.addEventListener("keydown",e)}function ui(e,t={}){const{multiSelect:n=!1}=t,i=s=>{n&&e.contains(s.target)||(vt(),document.removeEventListener("click",i,!0))};return setTimeout(()=>document.addEventListener("click",i,!0),0),()=>document.removeEventListener("click",i,!0)}function _e(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function je(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function bt(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Z(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,i]=e;return`#${t}${t}${n}${n}${i}${i}`}return e}function m(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return m(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function om(e,t=300){let n;const i=function(...s){clearTimeout(n),n=setTimeout(()=>e.apply(this,s),t)};return i.cancel=function(){clearTimeout(n)},i}function He(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"in the future";const s=Math.floor(i/6e4),a=Math.floor(i/36e5),o=Math.floor(i/864e5);return s<1?"just now":s<60?`${s}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function yt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",refactor:"Refactor",epic:"Epic"}[e]||"Task"}function rm(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function cn(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",i=e==null?void 0:e.avatar_url;return i?rm(i)?`<img class="${t} avatar-img" src="${p(i)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${m(i)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}function Va(e,t=null){if(!e)return"";const n=t?`AI agent of ${t}`:"AI agent";return`<span class="badge badge-agent" title="${p(n)}">agent</span>`}function dn(e){if(e!=null&&e.is_agent&&(e==null?void 0:e.kind)==="session"){const t=e.registered_by_name,n=t?`session · via ${t}`:"session",i=e.owner_name?`AI session identity of ${e.owner_name}`:"AI session identity";return`<span class="badge badge-agent" title="${p(i)}">${m(n)}</span>`}return Va(e==null?void 0:e.is_agent,e==null?void 0:e.owner_name)}let X={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,selectedInboxIndex:-1,selectedSprintIndex:-1,selectedEpicIndex:-1,pendingGates:[],inboxEntries:[],inboxUnreadCount:0,searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const Wa=new Set;function oe(e,t){if(typeof e=="string"){const n=X[e];X[e]=t,Dl(e,t,n)}else if(typeof e=="object"){const n=[];for(const[i,s]of Object.entries(e)){const a=X[i];X[i]=s,n.push({key:i,value:s,oldValue:a})}n.forEach(({key:i,value:s,oldValue:a})=>{Dl(i,s,a)})}}function it(e){return Wa.add(e),()=>Wa.delete(e)}function Dl(e,t,n){t!==n&&Wa.forEach(i=>{try{i(e,t,n)}catch(s){console.error("State subscriber error:",s)}})}const Vt=()=>X.currentUser,pi=e=>oe("currentUser",e),C=()=>X.currentView,lm=e=>oe("currentView",e),Me=()=>X.issues,st=e=>oe("issues",e),ms=()=>X.detailNavContext,un=e=>oe("detailNavContext",e),jl=()=>X.labels,fs=e=>oe("labels",e),Ml=()=>X.activeFilterCategory,cm=e=>oe("activeFilterCategory",e),Rl=()=>X.selectedIssueIndex,mi=e=>oe("selectedIssueIndex",e),dm=()=>X.selectedDocIndex,Pl=e=>oe("selectedDocIndex",e),ql=()=>X.selectedBoardIndex,gs=e=>oe("selectedBoardIndex",e),um=()=>X.selectedInboxIndex,hs=e=>oe("selectedInboxIndex",e),pm=()=>X.selectedSprintIndex,Nl=e=>oe("selectedSprintIndex",e),mm=()=>X.selectedEpicIndex,Ol=e=>oe("selectedEpicIndex",e),fm=()=>X.pendingGates,gm=e=>oe("pendingGates",e),de=()=>X.inboxEntries,At=e=>oe("inboxEntries",e),vs=()=>X.inboxUnreadCount,fi=e=>oe("inboxUnreadCount",e),hm=()=>X.searchDebounceTimer,vm=e=>oe("searchDebounceTimer",e),bm=()=>X.websocket,Ka=e=>oe("websocket",e),L=()=>X.currentTeam,bs=e=>oe("currentTeam",e),z=()=>X.currentProject,Ke=e=>oe("currentProject",e||null),Fe=()=>X.currentDetailIssue,ys=e=>oe("currentDetailIssue",e),ym=()=>X.currentDetailSprints,Hl=e=>oe("currentDetailSprints",e),Ya={};function Q(e){Object.assign(Ya,e)}function wm(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const i=t.dataset.action,s=Ya[i];if(!s){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${i}"`);return}s(e,t.dataset,t)}let Fl=!1;function km(){if(!Fl){Fl=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,wm);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=Ya[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const Za=["backlog","todo","in_progress","in_review","done","canceled"],pn=["backlog","todo","in_progress","in_review"],Ul=["urgent","high","medium","low","no_priority"],Xa=["no_priority","urgent","high","medium","low"],Gl=["backlog","todo","in_progress","in_review","done"];function P({icon:e,heading:t,description:n,cta:i,variant:s}){const a=i?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(i.action)}"${i.data?Object.entries(i.data).map(([r,c])=>` data-${p(r)}="${p(c)}"`).join(""):""}>${m(i.label)}</button>
    `:"";return`
        <div class="empty-state${s==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${m(t)}</h3>
            <p>${m(n)}</p>
            ${a}
        </div>
    `}const M={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',inbox:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'};let gi=[];function $m(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function Em(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function ws(e,t){const n=e().map($m),i=t().map(Em);gi=[...n,...i]}function mn(e){return e&&gi.find(t=>t.id===e)||null}function Wt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Qa(e,t=!1){const n=m(e.name||e.email||"Unknown");if(!e.is_agent)return n;const i=e.parent_user_name?` (${m(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${i}`}function ks(){const e=gi.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));gi.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const i=[];e.forEach(a=>{i.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>i.push({assignee:r,indent:!0}))});const s=gi.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return s.sort((a,o)=>a.name.localeCompare(o.name)),s.forEach(a=>i.push({assignee:a,indent:!1})),i}function $s(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;ks().forEach(({assignee:i,indent:s})=>{n+=`<option value="${i.id}">${Qa(i,s)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function fn(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function gn(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function hn(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function vn(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function zl(){const e=document.getElementById("group-by-select");return e?e.value:""}const Vl=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Es=["done","canceled"];function Wl(e){var t,n,i;switch(e){case"project":return z()?1:0;case"status":return fn().length;case"priority":return gn().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return hn().length;case"exclude_labels":return vn().length;default:return 0}}function Ja(){let e=0;return Vl.forEach(t=>{e+=Wl(t.key)}),e}function Kl(){var y,b,w,_,I,D;const e=new URLSearchParams,t=fn(),n=gn(),i=hn(),s=vn(),a=(y=document.getElementById("assignee-filter"))==null?void 0:y.value,o=z()||"",r=(b=document.getElementById("sprint-filter"))==null?void 0:b.value,c=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,d=(_=document.getElementById("group-by-select"))==null?void 0:_.value,l=(I=document.getElementById("sort-by-select"))==null?void 0:I.value;t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),i.forEach(B=>e.append("label",B)),s.forEach(B=>e.append("exclude_label",B)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),c&&e.set("issue_type",c),d&&e.set("groupBy",d),l&&l!=="created-desc"&&e.set("sort",l);const u=e.toString(),f=u?`/issues?${u}`:"/issues";history.replaceState({view:"issues"},"",f),zp((D=L())==null?void 0:D.id,u)}function xm(e){var b;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=Gp((b=L())==null?void 0:b.id);if(w){t=new URLSearchParams(w);const _=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",_)}}const s=t.getAll("status");if(s.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=s.includes(I.value)}),Yl())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=a.includes(I.value)}),Zl())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),Ke(r),e(!1));const c=t.get("sprint");if(c){const w=document.getElementById("sprint-filter");w&&(w.value=c)}const d=t.get("issue_type");if(d){const w=document.getElementById("issue-type-filter");w&&(w.value=d)}const l=t.getAll("label");if(l.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=l.includes(I.value)}),xs())}const u=t.getAll("exclude_label");if(u.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(I=>{I.checked=u.includes(I.value)}),_s())}const f=t.get("groupBy");if(f){const w=document.getElementById("group-by-select");w&&(w.value=f)}const y=t.get("sort");if(y){const w=document.getElementById("sort-by-select");w&&(w.value=y)}}function Yl(){const e=fn(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=_e(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Zl(){const e=gn(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=je(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function xs(){var i,s;const e=hn(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function _s(){var i,s;const e=vn(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((s=(i=a==null?void 0:a.closest("label"))==null?void 0:i.querySelector(".label-name"))==null?void 0:s.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Xl(){if(!L())return;let e;try{e=await h.getLabels(L().id)}catch(t){console.error("Failed to load labels for filter:",t);return}Ql("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),Ql("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function Ql(e,t,n,i){const s=document.getElementById(e);if(!s)return;const a=s.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const c=document.createElement("label");c.className="multi-select-option",c.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${Z(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${m(r.name)}</span>
                </span>
            `,a.appendChild(c)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${i}">Clear</button>`,a.appendChild(o)}function Is(e){const n=document.getElementById(e).querySelector(".multi-select-options"),i=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(s=>{s.classList.add("hidden")}),i||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Jl)},0))}function Jl(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Jl))}function _m(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",bn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),ge(),Ie(Ml()),setTimeout(()=>{document.addEventListener("click",bn)},0))}function Im(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",bn)):(e.classList.remove("hidden"),Rm(),setTimeout(()=>{document.addEventListener("click",bn)},0))}function bn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),i=e.composedPath(),s=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=s&&i.includes(s),r=a&&i.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",bn))}function Kt(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",bn)}function ge(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=z();e.innerHTML=Vl.map(n=>{const i=Wl(n.key),s=Ml()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${s?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${i>0?`<span class="filter-menu-category-count">${i}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function Ie(e){cm(e),ge();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Tm(t);break;case"status":Lm(t);break;case"priority":Cm(t);break;case"type":Am(t);break;case"assignee":Bm(t);break;case"sprint":Dm(t);break;case"labels":jm(t);break;case"exclude_labels":Mm(t);break}const n=t.querySelector(".filter-options-header");if(n){const i=document.createElement("button");i.type="button",i.className="filter-options-back",i.dataset.action="filter-menu-back",i.setAttribute("aria-label","Back to filter categories"),i.textContent="←",n.prepend(i)}}function Sm(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),ge()}function Tm(e){const t=z()||"",n=ne()||[];let i=`
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
        `}),e.innerHTML=i}function Lm(e){const t=fn(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],i=pn.every(o=>t.includes(o))&&!Es.some(o=>t.includes(o))&&t.length===pn.length,s=Es.every(o=>t.includes(o))&&!pn.some(o=>t.includes(o))&&t.length===Es.length;let a=`
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
        `}),e.innerHTML=a}function Cm(e){const t=gn(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let i=`
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
        `}),e.innerHTML=i}function Am(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",i=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"refactor",label:"Refactor"},{value:"epic",label:"Epic"}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(a=>{s+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=s}function Bm(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",i=Jt()||[];let s=`
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
        `}),e.innerHTML=s}function Dm(e){if(!z()){e.innerHTML=`
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
        `}),e.innerHTML=a}function jm(e){const t=hn(),n=document.getElementById("label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Z(l)};"></span>
                    <span class="filter-option-label">${m(d)}</span>
                </label>
            `}),e.innerHTML=s}function Mm(e){const t=vn(),n=document.getElementById("exclude-label-filter-dropdown"),i=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;i.length===0?s+='<div class="filter-options-empty">No labels available</div>':i.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";s+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Z(l)};"></span>
                    <span class="filter-option-label">${m(d)}</span>
                </label>
            `}),e.innerHTML=s}function Rm(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),i=(t==null?void 0:t.value)||"created-desc",s=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" data-action="set-sort" data-value="${p(c.value)}">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" data-action="set-group-by" data-value="${p(c.value)}">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Se(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=z();if(n){const f=(ne()||[]).find(y=>y.id===n);t.push({category:"project",label:"Project",value:(f==null?void 0:f.name)||"Unknown",clearAction:"clear-project-filter"})}const i=fn();if(i.length>0){const u=i.map(f=>_e(f)).join(", ");t.push({category:"status",label:"Status",value:u,clearAction:"clear-status-filter-new"})}const s=gn();if(s.length>0){const u=s.map(f=>je(f)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const y=(Jt()||[]).find(b=>b.user_id===o.value);u=(y==null?void 0:y.name)||(y==null?void 0:y.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const c=hn();if(c.length>0){const u=document.getElementById("label-filter-dropdown"),f=c.map(y=>{var _;const b=u==null?void 0:u.querySelector(`input[value="${y}"]`),w=(_=b==null?void 0:b.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:f,clearAction:"clear-label-filter-new"})}const d=vn();if(d.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),f=d.map(y=>{var _;const b=u==null?void 0:u.querySelector(`input[value="${y}"]`),w=(_=b==null?void 0:b.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:f,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${m(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function Te(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=Ja();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function ec(){const e=document.getElementById("sprint-filter");if(!e)return;const t=z(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",eo(null);return}let i=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const s=await h.getSprints(t),a=s.find(o=>o.status==="active");a&&(i+=`<option value="current">Current Sprint (${m(a.name)})</option>`),Jc(t,a==null?void 0:a.id),eo(a||null),s.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";i+=`<option value="${o.id}">${m(o.name)}${r}</option>`})}catch(s){console.error("Failed to load sprints:",s)}e.innerHTML=i,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function eo(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,i=e.budget;if(i==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${m(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const s=i>0?Math.min(n/i*100,100):0,a=n>i,o=s>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${m(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${s}%"></div>
        </div>
        <span class="budget-text">${n} / ${i} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function tc(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let nc=!1;it(e=>{if(e!=="currentProject"||C()!=="issues"||nc)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([ec(),Xl()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1});const i=document.getElementById("exclude-label-filter-dropdown");i==null||i.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=!1}),xs(),_s(),Re(),Se(),Te()}).catch(n=>{console.error("Failed to update filters on project switch:",n),Re(),Se(),Te()})});function Pm(){xm(e=>{nc=e})}function Ss(){Yl(),Re(),Se(),Te()}function to(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Ss()}function no(){Zl(),Re(),Se(),Te()}function io(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),no()}function so(){xs(),Re(),Se(),Te()}function Ts(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),so()}function ao(){_s(),Re(),Se(),Te()}function Ls(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ao()}function qm(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function ic(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(i=>{var s,a,o;return(o=(a=(s=n==null?void 0:n.querySelector(`input[value="${qm(i)}"]`))==null?void 0:s.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Cs=0;async function wt(){var f,y,b,w,_,I,D;mi(-1);const e=++Cs;if(!L())return;const t=z()||"",n=fn(),i=gn(),s=(f=document.getElementById("assignee-filter"))==null?void 0:f.value,a=(b=(y=document.getElementById("issue-search"))==null?void 0:y.value)==null?void 0:b.trim();if(!t&&ne().length===0){document.getElementById("issues-list").innerHTML=P({icon:M.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}tc();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[c,d]=r.includes("-")?r.split("-"):[r,null];o.sort_by=c,d&&(o.order=d),n.length>0&&(o.status=n),i.length>0&&(o.priority=i),s&&(s==="me"?o.assignee_id=(_=Vt())==null?void 0:_.id:o.assignee_id=s);const l=(I=document.getElementById("sprint-filter"))==null?void 0:I.value;if(l)if(l==="current"){if(t){const B=Yg(t);if(B!==void 0)B&&(o.sprint_id=B);else try{const j=(await h.getSprints(t)).find(S=>S.status==="active");Jc(t,j==null?void 0:j.id),j&&(o.sprint_id=j.id)}catch(x){console.error("Failed to resolve current sprint:",x)}}}else o.sprint_id=l;const u=(D=document.getElementById("issue-type-filter"))==null?void 0:D.value;u&&(o.issue_type=u),a&&a.length>=1&&(o.search=a);try{const B=ic(hn(),"label-filter-dropdown");B.length>0&&(o.label=B,o.label_match="any");const x=ic(vn(),"exclude-label-filter-dropdown");x.length>0&&(o.exclude_label=x);let j;if(t?(o.project_id=t,j=await h.getIssues(o)):ne().length>0&&(j=await h.getTeamIssues(L().id,o)),e!==Cs)return;st(j),C()==="issues"&&un(j);const S=[...new Set(j.map(V=>V.project_id))];if(await Qc(S),e!==Cs)return;kt()}catch(B){if(e!==Cs)return;const x=document.getElementById("issues-list");x&&(x.innerHTML=P({icon:M.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),$("load issues",B)}}function Nm(){clearTimeout(hm()),vm(setTimeout(()=>{wt()},300))}function Re(){Kl(),wt()}async function sc(){if(Kl(),zl()==="sprint"){const e=Me(),t=[...new Set(e.map(n=>n.project_id))];await Qc(t)}kt()}function Om(){Se(),Te()}function ac(e){Ke(e),ge(),Ie("project"),Kt()}function Hm(){ac("")}function Fm(e){const t=e==="open"?pn:Es,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.checked=t.includes(s.value)}),Ss(),ge(),Ie("status")}function Um(e,t){const n=document.getElementById("status-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,Ss()),ge(),Ie("status")}function Gm(){to(),ge(),Ie("status"),Se(),Te()}function zm(e,t){const n=document.getElementById("priority-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,no()),ge(),Ie("priority")}function Vm(){io(),ge(),Ie("priority"),Se(),Te()}function oc(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Re()),ge(),Ie("type"),Se(),Te(),Kt()}function Wm(){oc("")}function rc(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Re()),ge(),Ie("assignee"),Se(),Te(),Kt()}function Km(){rc("")}function lc(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Re()),ge(),Ie("sprint"),Se(),Te(),Kt()}function Ym(){lc("")}function Zm(e,t){const n=document.getElementById("label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,so()),ge(),Ie("labels")}function Xm(){Ts(),ge(),Ie("labels"),Se(),Te()}function Qm(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),i=n==null?void 0:n.querySelector(`input[value="${e}"]`),s=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);i&&s&&(i.checked=s.checked,ao()),ge(),Ie("exclude_labels")}function Jm(){Ls(),ge(),Ie("exclude_labels"),Se(),Te()}function ef(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,wt()),Kt()}function tf(e){const t=document.getElementById("group-by-select");t&&(t.value=e,sc()),Kt()}function nf(){Ke(null),to(),io();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const i=document.getElementById("issue-search");i&&(i.value=""),Ts(),Ls(),Re(),Se(),Te()}Q({"update-label-filter":()=>so(),"clear-label-filter":()=>Ts(),"update-exclude-label-filter":()=>ao(),"clear-exclude-label-filter":()=>Ls(),"show-filter-category":(e,t)=>{var n,i;Ie(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(i=document.querySelector("#filter-menu-options .filter-options-back"))==null||i.focus()},"filter-menu-back":()=>{Sm();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>ac(t.value),"clear-project-filter":()=>Hm(),"clear-status-filter-new":()=>Gm(),"set-status-preset":(e,t)=>Fm(t.value),"toggle-status-option":(e,t)=>Um(t.filterValue,e),"clear-priority-filter-new":()=>Vm(),"toggle-priority-option":(e,t)=>zm(t.filterValue,e),"set-type-filter":(e,t)=>oc(t.value),"clear-type-filter":()=>Wm(),"set-assignee-filter":(e,t)=>rc(t.value),"clear-assignee-filter":()=>Km(),"set-sprint-filter":(e,t)=>lc(t.value),"clear-sprint-filter":()=>Ym(),"clear-label-filter-new":()=>Xm(),"toggle-label-option":(e,t)=>Zm(t.filterValue,e),"clear-exclude-label-filter-new":()=>Jm(),"toggle-exclude-label-option":(e,t)=>Qm(t.filterValue,e),"set-sort":(e,t)=>ef(t.value),"set-group-by":(e,t)=>tf(t.value),"clear-all-filters":()=>nf(),"retry-load-issues":()=>wt()});let yn=[],oo=[];it(e=>{e==="currentProject"&&C()==="my-issues"&&(kn(),vi(),$n())});function Bt(){return yn}function wn(e){yn=e}let ro=0;async function kn(){var a;const e=L(),t=Vt();if(!e||!t)return;const n=++ro,i=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,s=z();af();try{const o={assignee_id:t.id,status:i||void 0,limit:1e3};let r;if(s?r=await h.getIssues({...o,project_id:s}):r=await h.getTeamIssues(e.id,o),n!==ro)return;yn=r,C()==="my-issues"&&un(yn),hi()}catch(o){if(n!==ro)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=P({icon:M.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),$("load issues",o)}}async function $n({showLoading:e=!0}={}){const t=L();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const i=z();oo=await h.getTeamActivities(t.id,0,10,{projectId:i}),sf()}catch{n&&(n.innerHTML=P({icon:M.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function sf(){const e=document.getElementById("dashboard-activity-list");if(e){if(!oo.length){e.innerHTML=P({icon:M.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=oo.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${m(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const i=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${i} ${m(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${m(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${bo(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${wo(t)}${n}</span>
                <span class="activity-actor">by ${m(yo(t))}</span>
                <span class="activity-time">${He(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function af(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function cc(){kn()}function hi(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),yn.length===0){e.innerHTML=P({icon:M.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=yn.map(t=>Ye(t)).join("")}}let lo=0;async function vi(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++lo,n=z(),i=ne(),s=n?i.filter(a=>a.id===n):i;if(!s.length){e.innerHTML="";return}try{const a=s.map(async r=>{try{const c=await h.getCurrentSprint(r.id);if(!c)return null;let d={};try{const l=await h.getIssues({sprint_id:c.id,project_id:r.id,limit:500});for(const u of l)d[u.status]=(d[u.status]||0)+1}catch(l){console.error(`Failed to load issue counts for sprint ${c.id}:`,l)}return{project:r,sprint:c,statusCounts:d}}catch(c){return console.error(`Failed to load current sprint for project ${r.id}:`,c),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==lo)return;of(o)}catch(a){if(t!==lo)return;console.error("Failed to load sprint status:",a),e.innerHTML=P({icon:M.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function of(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:i,sprint:s,statusCounts:a})=>{const o=s.budget||0,r=s.points_spent||0,c=o>0?Math.min(100,Math.round(r/o*100)):0,d=o>0&&r>o,l=s.limbo?"limbo":d?"arrears":"",u=a||{},f=Object.values(u).reduce((y,b)=>y+b,0);return`
                    <div class="sprint-status-card ${l}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${m(i.name)}</span>
                            ${s.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${d?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${m(s.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${l}" style="width: ${c}%"></div>
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
                                    ${n.filter(y=>u[y]).map(y=>{const b=Math.round(u[y]/f*100);return`<div class="sprint-stacked-segment status-${y}" style="width: ${b}%" title="${_e(y)}: ${u[y]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(y=>u[y]).map(y=>`<span class="sprint-count-label status-${y}">${u[y]} ${_e(y)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}Q({"filter-my-issues":()=>cc(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),kd(t.identifier)},"retry-load-my-issues":()=>kn(),"retry-load-sprint-status":()=>vi()});const dc=Za,rf=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];let at=[],uc=Promise.resolve();const lf={status:"status",priority:"priority",assignee_id:"assignee",estimate:"estimate",sprint_id:"sprint"};function pc(e,t){const n={ArrowDown:1,ArrowUp:-1,Home:"first",End:"last"}[e.key];if(n===void 0)return!1;const i=Array.from(t.querySelectorAll(".dropdown-option[data-action]"));if(i.length===0)return!1;e.preventDefault();const s=i.indexOf(document.activeElement);let a;return n==="first"?a=i[0]:n==="last"?a=i[i.length-1]:n===1?a=i[s<0?0:Math.min(i.length-1,s+1)]:a=i[s<0?i.length-1:Math.max(0,s-1)],a&&a.focus(),!0}function bi(){return!!document.querySelector(".inline-dropdown")}function mc(){return at}function fc(e){at=e}async function co(e,t,n,i){var u,f,y,b;e.preventDefault(),vt();const a=(i||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${dc.map((w,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${w}">
                    ${Le(w)}
                    <span>${_e(w)}</span>
                    <span class="dropdown-shortcut">${_+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${Xa.map((w,_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${w}">
                    ${ot(w)}
                    <span>${je(w)}</span>
                    <span class="dropdown-shortcut">${_}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${rf.map(w=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${w}">
                    <span class="issue-type-badge type-${w}">${yt(w)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const w=ks();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${w.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:w.map(({assignee:_,indent:I},D)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(_.id)}">
                    ${cn(_,"avatar-small")}
                    <span>${Qa(_,I)}</span>
                    ${D<9?`<span class="dropdown-shortcut">${D+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const w=document.querySelector(`.issue-row[data-issue-id="${n}"]`),_=(w==null?void 0:w.dataset.projectId)||((u=Fe())==null?void 0:u.project_id),I=jn(_);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${I.map((D,B)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${D.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${D.label}</span>
                    ${B<9?`<span class="dropdown-shortcut">${B}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const w=Me(),_=Bt(),I=Fe(),D=w.find(le=>le.id===n)||_.find(le=>le.id===n)||I,B=new Set(((D==null?void 0:D.labels)||[]).map(le=>le.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const x=o.getBoundingClientRect();let j=a.bottom+4,S=a.left;S+x.width>window.innerWidth-8&&(S=a.right-x.width),j+x.height>window.innerHeight-8&&(j=a.top-x.height-4),o.style.top=`${j}px`,o.style.left=`${Math.max(8,S)}px`,ui(o,{multiSelect:!0});let V=[];const se=L();if(se)try{V=await h.getLabels(se.id)}catch(le){console.error("Failed to load labels:",le)}if(!o.parentNode)return;hc(o,n,V,B);const be=o.getBoundingClientRect();let Pe=a.bottom+4,Y=a.left;Y+be.width>window.innerWidth-8&&(Y=a.right-be.width),Pe+be.height>window.innerHeight-8&&(Pe=a.top-be.height-4),o.style.top=`${Pe}px`,o.style.left=`${Math.max(8,Y)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const w=Me(),_=Bt(),I=Fe(),D=w.find(ae=>ae.id===n)||_.find(ae=>ae.id===n)||I,B=(D==null?void 0:D.project_id)||((f=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:f.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const x=o.getBoundingClientRect();let j=a.bottom+4,S=a.left;S+x.width>window.innerWidth-8&&(S=a.right-x.width),j+x.height>window.innerHeight-8&&(j=a.top-x.height-4),o.style.top=`${j}px`,o.style.left=`${Math.max(8,S)}px`,ui(o);let V=[];if(B)try{V=await h.getSprints(B),Kg(B,V)}catch(ae){console.error("Failed to load sprints:",ae)}if(!o.parentNode)return;const se=V.filter(ae=>ae.status!=="completed"||ae.id===(D==null?void 0:D.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${se.map((ae,qe)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(ae.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${m(ae.name)}${ae.status==="active"?" (Active)":""}</span>
                    ${qe<9?`<span class="dropdown-shortcut">${qe+1}</span>`:""}
                </button>
            `).join("")}
        `;const be=o.getBoundingClientRect();let Pe=a.bottom+4,Y=a.left;Y+be.width>window.innerWidth-8&&(Y=a.right-be.width),Pe+be.height>window.innerHeight-8&&(Pe=a.top-be.height-4),o.style.top=`${Pe}px`,o.style.left=`${Math.max(8,Y)}px`,o.classList.remove("dropdown-positioning");const le=ae=>{const qe=ae.key;if(qe==="Escape"||qe==="Tab"){vt(),document.removeEventListener("keydown",le),di(null);return}if(pc(ae,o))return;const dt=parseInt(qe);if(isNaN(dt))return;const ze=o.querySelectorAll(".dropdown-option");let Ve=!1;dt===0?(En(n,"sprint_id",null),Ve=!0):dt>=1&&dt<ze.length&&(ze[dt].click(),Ve=!0),Ve&&(document.removeEventListener("keydown",le),di(null))};di(le),document.addEventListener("keydown",le),(y=o.querySelector(".dropdown-option[data-action]"))==null||y.focus();return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let c=a.bottom+4,d=a.left;d+r.width>window.innerWidth-8&&(d=a.right-r.width),c+r.height>window.innerHeight-8&&(c=a.top-r.height-4),o.style.top=`${c}px`,o.style.left=`${Math.max(8,d)}px`,o.classList.remove("dropdown-positioning");const l=w=>{const _=w.key;if(_==="Escape"||_==="Tab"){vt(),document.removeEventListener("keydown",l);return}if(pc(w,o))return;const I=parseInt(_);if(isNaN(I))return;let D=!1;if(t==="status"&&I>=1&&I<=6)En(n,"status",dc[I-1]),D=!0;else if(t==="priority"&&I>=0&&I<=4)En(n,"priority",Xa[I]),D=!0;else if(t==="estimate"){const B=Fe(),x=jn(B==null?void 0:B.project_id);I>=0&&I<x.length&&(En(n,"estimate",x[I].value),D=!0)}D&&(document.removeEventListener("keydown",l),di(null))};di(l),document.addEventListener("keydown",l),(b=o.querySelector(".dropdown-option[data-action]"))==null||b.focus(),ui(o)}function cf(e,t,n,i){co(e,t,n,i)}function df(e,t,n){uc=uc.then(()=>gc(e,t,n))}async function gc(e,t,n){const i=Me(),s=Bt(),a=Fe(),o=i.find(l=>l.id===e)||s.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),c=r.indexOf(t);let d;if(c>=0?d=r.filter(l=>l!==t):d=[...r,t],n){const l=c<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const u=(await h.updateIssue(e,{label_ids:d})).labels||[],f=i.findIndex(_=>_.id===e);f!==-1&&(i[f].labels=u,st([...i]));const y=s.findIndex(_=>_.id===e);y!==-1&&(s[y].labels=u,wn([...s])),(a==null?void 0:a.id)===e&&ys({...a,labels:u});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const _=i.find(I=>I.id===e)||s.find(I=>I.id===e);_&&(b.outerHTML=Ye(_))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map(_=>`
                    <span class="issue-label" style="background: ${Z(_.color)}20; color: ${Z(_.color)}">${m(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(l){if($("update labels",l),n){const u=c>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function hc(e,t,n,i){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
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
    `}async function vc(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),i=L();if(!n||!i)return;const s=n.value.trim();if(s){n.disabled=!0;try{const a=await h.createLabel(i.id,{name:s}),o=await h.getLabels(i.id);fs(o),a!=null&&a.id&&await gc(e,a.id,null);const r=Me(),c=Bt(),d=Fe(),l=r.find(f=>f.id===e)||c.find(f=>f.id===e)||d,u=new Set(((l==null?void 0:l.labels)||[]).map(f=>f.id));t&&hc(t,e,o,u),n.value=""}catch(a){$("create label",a)}finally{n.disabled=!1,n.focus()}}}function As(){const e=document.getElementById("create-issue-labels-label");e&&(at.length===0?e.textContent="Labels":e.textContent=`Labels (${at.length})`)}function uo(e,{failed:t=!1}={}){const n=jl();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const s=at.includes(i.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(i.id)}">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${Z(i.color)}20; color: ${Z(i.color)}">${m(i.name)}</span>
                </button>
            `}).join("")}
    `}function uf(e){const t=at.indexOf(e);t>=0?at.splice(t,1):at.push(e),za(),As();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&uo(n)}async function bc(){const e=L();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const i=n.value.trim();if(i){n.disabled=!0;try{const s=await h.createLabel(e.id,{name:i}),a=await h.getLabels(e.id);fs(a),s!=null&&s.id&&!at.includes(s.id)&&(at.push(s.id),za()),As(),t&&uo(t),n.value=""}catch(s){$("create label",s)}finally{n.disabled=!1,n.focus()}}}async function En(e,t,n){vt();const i=document.querySelector(`.issue-row[data-issue-id="${e}"]`);i&&i.classList.add("updating");try{const s={};s[t]=n;const a=await h.updateIssue(e,s);if(!a||!a.id)throw new Error("Invalid response from server");const o=Me(),r=o.findIndex(u=>u.id===e);r!==-1&&(o[r]=a,st([...o]));const c=Bt(),d=c.findIndex(u=>u.id===e);d!==-1&&(c[d]=a,wn([...c]));const l=Fe();if((l==null?void 0:l.id)===e&&ys(a),i&&i.parentNode){const u=o.find(f=>f.id===e)||c.find(f=>f.id===e)||a;if(u){i.outerHTML=Ye(u);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(f){f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500);const y=lf[t],b=y&&f.querySelector(`[data-dropdown-type="${y}"]`);b&&b.focus()}}}if(k("Issue updated","success"),t==="status"){const u=z();if(u)try{const y=(await h.getSprints(u)).find(b=>b.status==="active");eo(y||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&pf(t,a)}}catch(s){$("update issue",s),i&&i.classList.remove("updating")}}function pf(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const i=n.querySelector(".detail-sidebar");if(!i)return;let s=e;e==="assignee_id"&&(s="assignee"),e==="sprint_id"&&(s="sprint"),e==="issue_type"&&(s="type");const a=i.querySelectorAll(".property-row");let o=null;for(const c of a){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===s.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${Le(t.status)}
            <span>${_e(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${ot(t.priority)}
            <span>${je(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${yt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?mn(t.assignee_id):null,d=c?Wt(c):null;r.innerHTML=d?`${cn(c,"avatar-small")}<span>${m(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=ym(),d=t.sprint_id&&c?c.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?m(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${Qs(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500),r==null||r.focus()}}Q({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,i=t.field;i==="estimate"?En(t.issueId,i,n==="null"?null:Number(n)):En(t.issueId,i,n)},"toggle-issue-label":(e,t,n)=>{df(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{vc(t.issueId)},"toggle-create-issue-label":(e,t)=>{uf(t.labelId)},"create-label-for-create-issue":()=>{bc()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),vc(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),bc())}});const yc=["task","bug","feature","chore","docs","tech_debt","refactor","epic"];function Dt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function xn(e){const t=Dt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function kt(){var s,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(s=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:s.dataset.issueId;e.classList.add("issue-list-linear");const n=Me();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),c=Ja()>0,d=r&&r.length>=2;if(c||d){const l=Ja(),u=[];d&&u.push(`search "${r}"`),c&&u.push(`${l} active filter${l>1?"s":""}`),e.innerHTML=P({icon:M.issues,heading:"No matching issues",description:`No issues match your ${u.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=P({icon:M.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});mi(-1);return}const i=zl();i==="status"?ff(e,n):i==="priority"?gf(e,n):i==="type"?hf(e,n):i==="assignee"?vf(e,n):i==="sprint"?bf(e,n):e.innerHTML=xn(n)+n.map(r=>Ye(r)).join(""),mf(t)}function mf(e){const t=Rl();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){mi(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.issueId===e):-1;i<0&&(i=Math.min(t,n.length-1)),mi(i),n[i].classList.add("keyboard-selected")}function ff(e,t){const n={};Za.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.status]&&n[s.status].push(s)});let i=xn(t);Za.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Le(s)}</span>
                    <span class="group-title">${_e(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Dt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ye(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function gf(e,t){const n={};Ul.forEach(s=>n[s]=[]),t.forEach(s=>{n[s.priority]&&n[s.priority].push(s)});let i=xn(t);Ul.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ot(s)}</span>
                    <span class="group-title">${je(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Dt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ye(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function hf(e,t){const n={};yc.forEach(s=>n[s]=[]),t.forEach(s=>{const a=s.issue_type||"task";n[a]&&n[a].push(s)});let i=xn(t);yc.forEach(s=>{const a=n[s];a.length!==0&&(i+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${s}">${yt(s)}</span></span>
                    <span class="group-title">${yt(s)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${Dt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Ye(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=i}function vf(e,t){const n={},i="__unassigned__";n[i]=[];const s=ks();s.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[i].push(o)});let a=xn(t);n[i].length>0&&(a+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[i].length}</span>
                    <span class="group-points">${Dt(n[i])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[i].map(o=>Ye(o)).join("")}
                </div>
            </div>
        `),s.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=Wt(o)||"Unknown",d=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${cn(o,"avatar-small")}</span>
                    <span class="group-title">${m(c)}${m(d)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${Dt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>Ye(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function bf(e,t){const n="__no_sprint__",i={};i[n]=[];const s=[];t.forEach(c=>{c.sprint_id?(i[c.sprint_id]||(i[c.sprint_id]=[],s.push(c.sprint_id)),i[c.sprint_id].push(c)):i[n].push(c)});const a={active:0,planned:1,completed:2},o=Yc();s.sort((c,d)=>{const l=o[c],u=o[d],f=l?a[l.status]??3:3,y=u?a[u.status]??3:3;return f-y});let r=xn(t);s.forEach(c=>{const d=i[c];if(d.length===0)return;const l=o[c],u=l?l.name:c,f=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",y=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${y}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${y}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${m(u)}${f}</span>
                    <span class="group-count">${d.length}</span>
                    <span class="group-points">${Dt(d)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${d.map(b=>Ye(b)).join("")}
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
                    <span class="group-points">${Dt(i[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${i[n].map(c=>Ye(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function yf(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function wc(e,t){if(!e)return"";if(!t)return m(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return m(e);const i=e.slice(0,n),s=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${m(i)}<mark class="search-match">${m(s)}</mark>${m(a)}`}function wf(e,t,n=40){if(!e||!t)return null;const i=e.toLowerCase().indexOf(t.toLowerCase());if(i===-1)return null;const s=Math.max(0,i-n),a=Math.min(e.length,i+t.length+n),o=e.slice(s,a),r=wc(o,t);return`${s>0?"…":""}${r}${a<e.length?"…":""}`}function Ye(e){var u,f,y;const t=e.assignee_id?mn(e.assignee_id):null,n=t?Wt(t):null,i=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),s=e.estimate!=null?Qs(e.estimate,e.project_id):"",a=Vo(e.estimate,e.project_id),o=e.sprint_id?Yc()[e.sprint_id]:null,r=o?o.name:null,c=(f=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:f.trim(),d=!!c&&((y=e.title)==null?void 0:y.toLowerCase().includes(c.toLowerCase())),l=c&&!d?wf(e.description,c):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${je(e.priority)}">
                    ${ot(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${_e(e.status)}">
                    ${Le(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${yt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${wc(e.title,c)}${l?` <span class="issue-search-snippet" title="Matched in description">— ${l}</span>`:""}</a>
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
                    ${n?cn(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function ot(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function Le(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}Q({"toggle-group":(e,t)=>{yf(t.group)},"show-inline-dropdown":(e,t,n)=>{co(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),J(t.issueId))}});function kf(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function $f(e,t){return!(e.slice(0,t)+"\0"+e.slice(t)).replace(/(`{3,})[\s\S]*?(?:\1|$)/g,"").replace(/(`{1,2})[\s\S]*?\1/g,"").includes("\0")}function po(e="new-comment",t="mention-suggestions"){const n=document.getElementById(e),i=document.getElementById(t);if(!n||!i||n.dataset.mentionsBound==="true")return;n.dataset.mentionsBound="true";let s=-1;const a=()=>{i.classList.add("hidden"),i.innerHTML="",s=-1},o=d=>{var u,f;const l=i.querySelectorAll(".mention-suggestion");l.length!==0&&(s=(d%l.length+l.length)%l.length,l.forEach((y,b)=>y.classList.toggle("highlighted",b===s)),(f=(u=l[s]).scrollIntoView)==null||f.call(u,{block:"nearest"}))},r=d=>{const l=n.selectionStart||0,u=n.value.slice(0,l).replace(/@([a-zA-Z0-9._-]*)$/,`@${d} `),f=n.value.slice(l);n.value=u+f,n.focus(),a()},c=()=>{const d=n.selectionStart||0;if($f(n.value,d)){a();return}const u=n.value.slice(0,d).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!u){a();return}const f=u[2].toLowerCase(),y=Jt().map(b=>({id:b.id,name:b.name||b.email||"User",email:b.email||"",handle:kf(b)})).filter(b=>!f||b.handle.includes(f)||b.name.toLowerCase().includes(f)||b.email.toLowerCase().includes(f)).slice(0,6);if(!y.length){a();return}i.innerHTML=y.map(b=>`
            <button type="button" class="mention-suggestion" data-handle="${p(b.handle)}">
                <span class="mention-name">${m(b.name)}</span>
                <span class="mention-handle">@${m(b.handle)}</span>
            </button>
        `).join(""),i.classList.remove("hidden"),i.querySelectorAll(".mention-suggestion").forEach((b,w)=>{b.addEventListener("click",()=>r(b.dataset.handle)),b.addEventListener("mouseenter",()=>o(w))}),o(0)};n.addEventListener("input",c),n.addEventListener("click",c),n.addEventListener("keydown",d=>{const l=!i.classList.contains("hidden");if(d.key==="Escape"&&l){d.preventDefault(),d.stopPropagation(),a();return}if(l){if(d.key==="ArrowDown")d.preventDefault(),o(s+1);else if(d.key==="ArrowUp")d.preventDefault(),o(s-1);else if(d.key==="Enter"||d.key==="Tab"){const f=i.querySelectorAll(".mention-suggestion")[s];f&&(d.preventDefault(),r(f.dataset.handle))}}}),n.addEventListener("blur",()=>{setTimeout(a,150)})}const kc=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function yi(e=null){const t=e||z()||"";fc([]);const n=ne().map(o=>`
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
                            ${kc.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${Le("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${ot("no_priority")}
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
    `,H(),As();const i=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description"),a=Wp();a.title&&(i.value=a.title),a.description&&(s.value=a.description),i.addEventListener("input",()=>{Al(i.value,s.value)}),s.addEventListener("input",()=>{Al(i.value,s.value)}),i.focus()}function Ef(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function xf(e){const t=kc.find(s=>s.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),i&&t.description!==void 0&&(i.value=t.description)}function _f(e,t){const n=ne().find(i=>i.id===t);fc([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
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
                            ${Le("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${ot("no_priority")}
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
    `,H(),As(),document.getElementById("create-issue-title").focus()}async function If(e,t){const n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null;if(!n){k("Please enter a title","error");return}try{const l=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:d,label_ids:mc(),parent_id:e});O(),k(`Created sub-issue ${l.identifier}`,"success"),J(e)}catch(l){$("create sub-issue",l)}}async function Sf(e,t,n){var o,r;vt();const s=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${s.top-8}px`,a.style.left=`${s.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const c=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Gl.map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="status" data-value="${d}" data-label="${p(_e(d))}">
                    ${Le(d)}
                    <span>${_e(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const c=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${Xa.map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${d}" data-label="${p(je(d))}">
                    ${ot(d)}
                    <span>${je(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const c=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","refactor","epic"].map(d=>`
                <button class="dropdown-option ${d===c?"selected":""}" data-action="set-create-field" data-field="type" data-value="${d}" data-label="${p(yt(d))}">
                    <span class="issue-type-badge type-${d}">${yt(d)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!L())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let c=jl(),d=!1;if(c.length===0)try{c=await h.getLabels(L().id),fs(c)}catch(l){console.error("Failed to load labels:",l),d=!0}uo(a,{failed:d}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),ui(a,{multiSelect:!0});return}else if(e==="assignee"){const c=document.getElementById("create-issue-assignee").value,d=ks();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${d.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:d.map(({assignee:l,indent:u})=>{const f=Wt(l)||"User";return`
                <button class="dropdown-option ${l.id===c?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(l.id)}" data-label="${p(f)}">
                    ${cn(l,"avatar-small")}
                    <span>${Qa(l,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const c=document.getElementById("create-issue-estimate").value,d=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,l=jn(d);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(u=>{const f=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${f===c?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(f)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${m(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const c=document.getElementById("create-issue-sprint").value,d=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!d)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await h.getSprints(d)).filter(f=>f.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${c?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(f=>`
                        <button class="dropdown-option ${f.id===c?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(f.id)}" data-label="${p(f.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${m(f.name)}${f.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),ui(a)}function Tf(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Lf(e,t,n){var s;document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n,za();const i=m(n);if(e==="status"){const a=document.querySelector(".toolbar-btn:first-child");a.innerHTML=`${Le(t)}<span id="create-issue-status-label">${i}</span>`}else if(e==="priority"){const a=document.querySelectorAll(".toolbar-btn")[1];a.innerHTML=`${ot(t)}<span id="create-issue-priority-label">${i}</span>`}else if(e==="type"){const a=document.getElementById("create-issue-type-btn");a&&(a.innerHTML=`<span class="issue-type-badge type-${t}">${yt(t)}</span><span id="create-issue-type-label">${i}</span>`)}vt(),(s=document.querySelector(`.toolbar-btn[data-action="toggle-create-dropdown"][data-dropdown-type="${e}"]`))==null||s.focus()}async function $c({keepOpen:e=!1}={}){var w,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),i=document.getElementById("create-issue-description").value.trim(),s=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null,l=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,f=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const y=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");y&&(y.disabled=!0),b&&(b.disabled=!0);try{const I=await h.createIssue(t,{title:n,description:i||null,status:s,priority:a,issue_type:o,assignee_id:r,estimate:d,sprint_id:l,label_ids:mc(),due_date:f});k(`Created ${I.identifier}`,"success"),Kp(),C()==="issues"?wt():C()==="my-issues"&&kn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",nm(),document.getElementById("create-issue-title").focus()):(O(),J(I.id))}catch(I){$("create issue",I)}finally{y&&(y.disabled=!1),b&&(b.disabled=!1)}}async function Cf(){await $c({keepOpen:!1})}async function Af(){await $c({keepOpen:!0})}Q({"toggle-create-dropdown":(e,t,n)=>{Sf(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Lf(t.field,t.value,t.label)},"create-issue-submit":()=>{Cf()},"create-issue-and-new":()=>{Af()},"update-create-project":()=>{Tf()},"apply-template":e=>{xf(e.target.value)},"toggle-create-options":()=>{Ef()},"create-sub-issue-submit":(e,t)=>{If(t.parentId,t.projectId)}});async function Ec(e){try{const t=await h.getIssue(e),n=await h.getSprints(t.project_id),s=jn(t.project_id).map(o=>`
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
        `,H();const a=document.getElementById("edit-issue-description");if(a){const o=us(e);if(o){const r=Tl(e),c=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,c&&(c.textContent="Restored your unsaved description draft.",c.classList.remove("hidden"))):c&&(c.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",c.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?zt(e,r,t.description||""):zt(e,null)})}}catch(t){$("load issue",t)}}async function Bf(e,t){try{const n=document.getElementById("edit-issue-title"),i=document.getElementById("edit-issue-description"),s=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!s||!a||!o)throw new Error("Required form fields not found");const d={title:n.value,description:i?i.value:"",status:s.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await h.updateIssue(t,d),us(t)===d.description&&zt(t,null),O(),await J(t),k("Issue updated!","success")}catch(n){$("update issue",n)}}async function Df(e){if(confirm("Are you sure you want to delete this issue?"))try{await h.deleteIssue(e),await wt(),await Ue(),R("issues"),k("Issue deleted!","success")}catch(t){$("delete issue",t)}}Q({"update-issue":(e,t)=>{Bf(e,t.issueId)}});let ue=null,xc=!1,_n=!1,_c="new-comment";function jf(){return ue||(ue=document.createElement("div"),ue.className="quote-tooltip",ue.setAttribute("role","button"),ue.setAttribute("tabindex","0"),ue.setAttribute("aria-label","Quote selection in comment"),ue.textContent="Quote",ue.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Bs())}),ue.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),ue.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Bs()}),document.body.appendChild(ue),ue)}function Ic(e,t){const n=jf();n.style.display="flex",_n=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!_n)return;const i=n.getBoundingClientRect();i.left<4&&(n.style.left=`${4+i.width/2}px`),i.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-i.width/2}px`),i.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function wi(){ue&&(ue.style.display="none"),_n=!1}function Sc(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function mo(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=Sc(t.startContainer),i=Sc(t.endContainer);return!n||!i||n!==i?null:e.toString().trim()||null}function Mf(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Bs(e=_c){const t=mo();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const i=Mf(t),s=n.value,a=s&&!s.endsWith(`

`)?s.endsWith(`
`)?`
`:`

`:"";return n.value=s+a+i+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),wi(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Rf(){var i;if(!mo())return!1;const t=window.getSelection().getRangeAt(0),n=((i=t.getBoundingClientRect)==null?void 0:i.call(t))??{left:0,width:0,top:0};return Ic(n.left+n.width/2,n.top),!0}function Pf(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!mo()){wi();return}Ic(t,n)},10)}function Tc({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const i=document.getElementById(e);i&&(_c=t,i.addEventListener("mouseup",Pf,n?{signal:n}:void 0),xc||(xc=!0,document.addEventListener("mousedown",s=>{_n&&ue&&!ue.contains(s.target)&&wi()}),document.addEventListener("selectionchange",()=>{_n&&setTimeout(()=>{const s=window.getSelection();(!s||s.isCollapsed)&&wi()},50)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&_n&&wi()}),document.addEventListener("keyup",s=>{s.key!=="Escape"&&Rf()})))}function Lc(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),i=[];let s;for(;s=n.nextNode();)i.push(s);i.forEach(a=>{t(a)})}function Cc(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,i=/(^|\s)@([a-zA-Z0-9._-]+)/g,s=n.test(t),a=i.test(t);if(!s&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const d=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=d.exec(t))!==null;)if(c=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const u=l[1],f=document.createElement("a");f.href=`#/issue/${u}`,f.className="issue-link",f.textContent=u,o.appendChild(f),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+l[3],o.appendChild(u),r=l.index+l[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function Ac(e){if(!e)return"";const t=Ze(e),n=document.createElement("div");return n.innerHTML=t,Lc(n,Cc),n.innerHTML}function In(e){if(!e)return"";const t=Ze(e),n=document.createElement("div");return n.innerHTML=t,Lc(n,Cc),n.innerHTML}let fo=!1,go=!1,jt=!0,ki=null,Ds=null,js=null,Ms=null,ho=!1,Rs=null;function vo(e=null){ho=!0,e&&(Rs=e)}function bo(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅",ritual_rejected:"⛔"}[e]||"•"}function yo(e){return e.user_name||e.user_email||"Unknown"}function wo(e){const t=i=>i?i.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const i=e.new_value?m(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<a href="#comments-section" class="activity-comment-link" title="${s}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${m(_e(t(e.old_value)))}</strong> to <strong>${m(_e(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${m(je(t(e.old_value)))}</strong> to <strong>${m(je(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${m(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${m(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Attested to <strong>${i}</strong></span>`:`Attested to <strong>${i}</strong>`}case"ritual_rejected":{const i=m(e.field_name||"ritual"),s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<span class="activity-attestation-link" title="${s}">Rejected <strong>${i}</strong></span>`:`Rejected <strong>${i}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||m(e.field_name)}`:"Updated issue"}}function qf(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),i=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),i&&i.classList.toggle("rotated")}function Nf(){jt=!jt;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",jt),n&&n.classList.toggle("rotated",jt)}async function $i(e){try{ki=await h.getTicketRitualsStatus(e),Bc(e)}catch(t){console.error("Failed to load ticket rituals:",t),ki=null}}function Bc(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!ki){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:i}=ki;if(n.length===0&&i.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(jt=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",jt);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",jt);const r=n.some(l=>l.trigger==="ticket_close"),c=n.some(l=>l.trigger==="ticket_claim");let d="⚠️ Complete these rituals:";r&&c?d="⚠️ Pending rituals (claim before starting, close before completing):":c?d="⚠️ Complete these rituals before claiming this ticket:":r&&(d="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${d}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${m(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?Ze(l.prompt):""}</div>
                        ${l.attestation?"":rh(l.last_rejection)}
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${He(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${Ze(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${nh(l,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${i.length>0?`
            <div class="ticket-rituals-completed">
                ${i.map(l=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${m(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${m(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${He(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Ps(e){try{let t;return e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t?(await J(t.id,!1),!0):(R("my-issues",!1),!1)}catch{return R("my-issues",!1),!1}}function Dc(e){const t=ms(),n=t.findIndex(i=>i.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function jc({issueList:e,currentIndex:t,prevIssue:n,nextIssue:i,inList:s}){return s?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${i?`data-action="navigate-issue" data-issue-id="${p(i.id)}" data-identifier="${p(i.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Of(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=Fe();if(!t)return;const n=Dc(t.id);Ds=n.prevIssue?n.prevIssue.id:null,js=n.nextIssue?n.nextIssue.id:null;const i=e.querySelector(".issue-detail-nav");if(!i)return;const s=i.querySelector(".issue-nav-arrows"),a=jc(n);s?a?s.outerHTML=a:s.remove():a&&((o=i.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}it(e=>{e==="detailNavContext"&&Of()});let ko=0,Mc=0,qs=!1;function Rc(){if(document.querySelector(".description-inline-editor"))return"editor";if(bi())return"transient";const e=document.getElementById("issue-detail-view");if(e!=null&&e.querySelector(".overflow-menu-dropdown:not(.hidden)"))return"transient";const t=document.getElementById("mention-suggestions");return t&&!t.classList.contains("hidden")||qs?"transient":null}function Pc(e){return vo(),e==="editor"?"deferred":"retry"}function Hf(e){var n;const t=document.getElementById("issue-detail-view");return!!t&&!t.classList.contains("hidden")&&((n=Fe())==null?void 0:n.id)===e}async function J(e,t=!0,{refresh:n=!1}={}){const i=n?ko:++ko,s=++Mc;if(n){const a=Rc();if(a)return Pc(a)}try{t&&Xt(),n||(jt=!0);let a=!1;const[o,r,c,d,l,u]=await Promise.all([h.getIssue(e),h.getComments(e).catch(v=>(console.error("Failed to load comments:",v),a=!0,[])),h.getActivities(e),h.getSubIssues(e),h.getRelations(e),h.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),y=[...u.pending_rituals||[],...u.completed_rituals||[]].filter(v=>v.attestation&&v.attestation.note).map(v=>({id:`attestation-${v.attestation.id}`,author_name:v.attestation.attested_by_name||"Unknown",author:v.attestation.attester||null,content:v.attestation.note,created_at:v.attestation.attested_at,is_attestation:!0,ritual_name:v.name,is_pending:!v.attestation.approved_at})),b=[...r,...y].sort((v,ie)=>new Date(v.created_at)-new Date(ie.created_at)),w=[o.parent_id?h.getIssue(o.parent_id):Promise.resolve(null),h.getSprints(o.project_id).catch(v=>(console.error("Failed to load sprints:",v),[]))],[_,I]=await Promise.all(w);if(i!==ko)return"dropped";let D=null,B=null;if(n){if(s!==Mc||!Hf(e))return"dropped";const v=Rc();if(v)return Pc(v);B=window.scrollY;const ie=document.activeElement;ie!=null&&ie.id&&document.getElementById("issue-detail-view").contains(ie)&&(D={id:ie.id,start:ie.selectionStart,end:ie.selectionEnd})}ki=u;const x=l.filter(v=>v.relation_type==="blocks"&&v.direction==="outgoing"),j=l.filter(v=>v.relation_type==="blocked_by"||v.relation_type==="blocks"&&v.direction==="incoming"),S=l.filter(v=>v.relation_type==="relates_to");t&&history.pushState({issueId:e,view:C()},"",`/issue/${o.identifier}`),ys(o),Hl(I),ho=!1,Rs=null,document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));const V=document.getElementById("issue-detail-view");V.classList.remove("hidden");const se=C()||"my-issues",be=ne().find(v=>v.id===o.project_id),Pe=o.assignee_id?mn(o.assignee_id):null,Y=Pe?Wt(Pe):null,le=o.sprint_id?I.find(v=>v.id===o.sprint_id):null,ae=Dc(o.id),{prevIssue:qe,nextIssue:dt}=ae;V.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(se)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${jc(ae)}
                        <span class="issue-detail-breadcrumb">${be?m(be.name):"Project"} › ${m(o.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(o.title)}</h1>

                    ${_?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(_.identifier)}" data-action="navigate-issue" data-issue-id="${p(_.id)}" data-identifier="${p(_.identifier)}">${_.identifier}: ${m(_.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(o.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${us(o.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${o.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(o.id)}">
                            ${o.description?In(o.description):'<span class="add-description-link">Add description...</span>'}
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
                            ${d.length===0?P({icon:M.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):d.map(v=>`
                                <a href="/issue/${encodeURIComponent(v.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(v.id)}" data-identifier="${p(v.identifier)}">
                                    <span class="sub-issue-status">${Le(v.status)}</span>
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
                            ${x.length===0&&j.length===0&&S.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${j.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${j.map(v=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${Le(v.related_issue_status)}</span>
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
                                            <span class="relation-status">${Le(v.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(v.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(v.related_issue_id)}" data-identifier="${p(v.related_issue_identifier)}" class="relation-link">${v.related_issue_identifier}</a>
                                            <span class="relation-title">${m(v.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(o.id)}" data-relation-id="${p(v.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${S.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${S.map(v=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${Le(v.related_issue_status)}</span>
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
                                            ${v.author?dn(v.author):Va((ie=mn(v.author_id))==null?void 0:ie.is_agent)}
                                            ${v.is_attestation?`<span class="comment-ritual-badge">${v.is_pending?"Pending approval — ":""}Ritual: ${m(v.ritual_name)}</span>`:""}
                                            <span class="comment-date">${He(v.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${Ac(v.content)}</div>
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
                            ${c.length===0?P({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):c.map(v=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${bo(v.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${wo(v)}</span>
                                        <span class="activity-actor">by ${m(yo(v))} ${dn(v.user)}</span>
                                        <span class="activity-time">${He(v.created_at)}</span>
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
                                ${Le(o.status)}
                                <span>${_e(o.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(o.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${ot(o.priority)}
                                <span>${je(o.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(o.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${o.issue_type||"task"}">${yt(o.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(o.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${Y?`${cn(Pe,"avatar-small")}<span>${m(Y)}</span>`:'<span class="text-muted">Unassigned</span>'}
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

                        ${be?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(be.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(o.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Vo(o.estimate,o.project_id)?" out-of-scale":""}" ${Vo(o.estimate,o.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${Qs(o.estimate,o.project_id)}</span>
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
                            <span class="property-value-static">${m(o.creator_name||"Unknown")} ${dn(o.creator)}</span>
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
        `,Ms&&Ms.abort(),Ms=new AbortController;const{signal:ze}=Ms,Ve=document.querySelector(".sidebar-overflow-trigger"),Ft=document.querySelector(".overflow-menu-dropdown");if(Ve&&Ft){const v=()=>{Ft.classList.add("hidden"),Ve.setAttribute("aria-expanded","false")},ie=()=>{const G=Ft.classList.toggle("hidden");Ve.setAttribute("aria-expanded",String(!G))};Ve.addEventListener("click",ie,{signal:ze}),document.addEventListener("click",G=>{!Ve.contains(G.target)&&!Ft.contains(G.target)&&v()},{signal:ze}),Ft.addEventListener("keydown",G=>{G.key==="Escape"&&(v(),Ve.focus())},{signal:ze})}Bc(o.id),po(),Tc({signal:ze});const ut=document.getElementById("new-comment");if(qs=!1,ut){ut.addEventListener("compositionstart",()=>{qs=!0},{signal:ze}),ut.addEventListener("compositionend",()=>{qs=!1},{signal:ze});const v=Il(o.id);v&&(ut.value=v),ut.addEventListener("input",()=>{ds(o.id,ut.value)}),ut.addEventListener("keydown",ie=>{var G;ie.key==="Enter"&&(ie.metaKey||ie.ctrlKey)&&(ie.preventDefault(),(G=ut.closest("form"))==null||G.requestSubmit())})}Ds=qe?qe.id:null,js=dt?dt.id:null;const ba=v=>{var Zi;if((v.metaKey||v.ctrlKey)&&v.shiftKey&&(v.key===">"||v.key==="."||v.code==="Period")&&Bs()){v.preventDefault();return}if(v.metaKey||v.ctrlKey||v.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||v.target.tagName==="INPUT"||v.target.tagName==="TEXTAREA"||v.target.tagName==="SELECT"||v.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor")||bi())return;if(v.key==="ArrowLeft"&&Ds)v.preventDefault(),J(Ds);else if(v.key==="ArrowRight"&&js)v.preventDefault(),J(js);else if(v.key==="c"){v.preventDefault(),v.stopImmediatePropagation();const W=document.getElementById("new-comment");W&&(W.focus(),W.scrollIntoView({behavior:"smooth",block:"nearest"}))}else v.key==="j"?(v.preventDefault(),v.stopImmediatePropagation(),Ns(1)):v.key==="k"?(v.preventDefault(),v.stopImmediatePropagation(),Ns(-1)):v.key==="d"&&(v.preventDefault(),(Zi=document.querySelector('[data-action="edit-description"]'))==null||Zi.click());const G={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[v.key];if(G){const W=document.querySelector(`.property-row[data-field="${G}"]`);W&&(v.preventDefault(),W.click())}};if(document.addEventListener("keydown",ba,{signal:ze}),D){const v=document.getElementById(D.id);if(v&&(v.focus({preventScroll:!0}),typeof D.start=="number"&&typeof v.setSelectionRange=="function"))try{v.setSelectionRange(D.start,D.end)}catch{}}return B!==null&&window.scrollTo(0,B),"rendered"}catch(a){return n?console.error("Failed to refresh issue detail:",a):$("load issue",a),"failed"}}async function Ff(e,t){if(e.preventDefault(),fo)return!1;const n=document.getElementById("new-comment").value;ds(t,null),fo=!0;try{await h.createComment(t,n),await J(t),k("Comment added!","success")}catch(i){ds(t,n),$("add comment",i)}finally{fo=!1}return!1}async function Uf(e){const t=Fe()||await h.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const i=n.querySelector(".section-header");i&&(i.style.display="none");const s=n.querySelector(".description-content");if(!s)return;s.innerHTML=`
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
    `,s.classList.remove("empty");const a=document.getElementById("edit-description"),o=us(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const d=Tl(e);r&&(d===null||d!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.",r.classList.remove("hidden"))}po("edit-description","edit-description-mention-suggestions"),a.addEventListener("input",()=>{const d=a.value;d!==(t.description||"")?zt(e,d,t.description||""):zt(e,null);const l=document.getElementById("edit-description-preview");l&&l.style.display!=="none"&&qc()}),a.addEventListener("keydown",d=>{var l,u;d.key==="Enter"&&(d.metaKey||d.ctrlKey)&&(d.preventDefault(),(l=document.getElementById("save-description-edit"))==null||l.click()),d.key==="Escape"&&(d.preventDefault(),d.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,f;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(zt(e,null),ho){J(e,!1);return}i&&(i.style.display=""),s.className=`description-content markdown-body ${t.description?"":"empty"}`,s.setAttribute("data-action","edit-description"),s.setAttribute("data-issue-id",t.id),s.innerHTML=t.description?In(t.description):'<span class="add-description-link">Add description...</span>',(f=n.querySelector('[data-action="edit-description"]'))==null||f.focus()}});let c=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var y,b;if(go)return;const d=(y=document.getElementById("edit-description"))==null?void 0:y.value;if(d===void 0)return;const l=Rs?Rs.description||"":null;if(l!==null&&l!==(t.description||"")&&!c){c=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");go=!0,u&&(u.disabled=!0);const f=window.scrollY;try{await h.updateIssue(e,{description:d}),zt(e,null),k("Description updated","success"),await J(e,!1),window.scrollTo(0,f),(b=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||b.focus()}catch(w){$("update description",w)}finally{go=!1,u&&(u.disabled=!1)}})}function qc(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?In(n):'<span class="text-muted">Nothing to preview.</span>'}function Gf(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),i=document.getElementById("edit-description"),s=document.getElementById("edit-description-preview");if(!t||!n||!i||!s)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),i.style.display=a?"none":"block",s.style.display=a?"block":"none",a?qc():i.focus()}function zf(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,H(),document.getElementById("relation-issue-search").focus()}async function Vf(e,t){var i;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,o=(await h.searchIssues(s,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${m(r.identifier)}</span>
                <span class="link-result-title">${m(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function Wf(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function Kf(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function Yf(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,i=document.getElementById("selected-related-issue-id").value;if(!i)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await h.createRelation(i,t,"blocks"):await h.createRelation(t,i,n),O(),k("Relation added","success"),J(t)}catch(s){$("add relation",s)}return!1}async function Zf(e,t){try{await h.deleteRelation(e,t),k("Relation removed","success"),J(e)}catch(n){$("remove relation",n)}}function Ns(e){const t=Fe();if(!t)return;const n=ms();if(!n||n.length===0)return;const i=n.findIndex(a=>a.id===t.id);if(i===-1)return;const s=i+e;s<0||s>=n.length||J(n[s].id)}Q({"retry-issue-comments":(e,t)=>{J(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{cf(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||Uf(t.issueId)},"toggle-section":(e,t)=>{qf(t.section)},"toggle-ticket-rituals":()=>{Nf()},"save-comment":(e,t)=>{Ff(e,t.issueId)},"show-add-relation-modal":(e,t)=>{zf(t.issueId)},"remove-relation":(e,t)=>{Zf(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{_f(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{Yf(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{Vf(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{Wf(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{Kf()},"set-description-editor-mode":(e,t)=>{Gf(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Ns(-1),"navigate-next-issue":()=>Ns(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Ec(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Df(t.issueId)}});function Nc(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let Sn=[],Ei=[],Os=null,ee=new Set,Tn="list",Yt=!1,$o=null,Hs=null,Eo=null,xo=null,Oc=null;function Hc(e){if(Oc!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const _o=Yp();(_o==="list"||_o==="grid")&&(Tn=_o);function Fc(e){if(e!=="list"&&e!=="grid")return;Tn=e,e==="grid"&&Yt&&Io(),Zp(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const i=document.getElementById("doc-select-btn");i&&i.classList.toggle("hidden",e==="grid"),Mt()}function Uc(){if(Tn!=="list")return;Yt=!0,ee.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Mt(),Cn()}function Io(){Yt=!1,ee.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Mt(),Cn()}function Xf(){$o&&clearTimeout($o),$o=setTimeout(()=>{Mt()},300)}function Qf(){const e=document.getElementById("doc-search");e&&(e.value=""),Mt()}async function Jf(){Ke(null)}async function eg(){const e=document.getElementById("doc-search");e&&(e.value=""),Ke(null)}function tg(){var s;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((s=document.getElementById("doc-search"))==null?void 0:s.value)||"",n=z()||"",i=[];if(t&&i.push(`<span class="filter-chip">Search: "${m(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=ne().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";i.push(`<span class="filter-chip">Project: ${m(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(i.length>0){let a=i.join(" ");i.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function ng(){return Sn}function Mt(){var n,i,s;const e=((i=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:i.toLowerCase())||"",t=((s=document.getElementById("doc-sort"))==null?void 0:s.value)||"updated_desc";tg(),Ei=Sn.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),d=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!d)return!1}return!0}),Ei.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),lg("",Tn)}let Ln=0;async function ig(){var i;const e=Os||((i=L())==null?void 0:i.id);if(!e)return;const t=++Ln,n=z()||null;try{const s=await h.getDocuments(e,n);if(t!==Ln)return;Sn=s,Mt()}catch(s){if(t!==Ln)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=P({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),$("load documents",s)}}it(e=>{e==="currentProject"&&C()==="documents"&&ig()});async function Zt(e,t=null){var s;if(e||(e=(s=L())==null?void 0:s.id),!e)return;Os=e,Pl(-1);const n=++Ln,i=document.getElementById("documents-list");i&&(i.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=z()||null);try{const a=await h.getDocuments(e,t);if(n!==Ln)return;Sn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",Tn==="list"),r.classList.toggle("active",Tn==="grid")),Mt()}catch(a){if(n!==Ln)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=P({icon:M.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),$("load documents",a)}}function Gc(){var t,n;if(C()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=Os||((n=L())==null?void 0:n.id);e&&Zt(e).catch(i=>console.error("Failed to refresh documents list:",i))}function zc(e){Hc(e)&&he(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function sg(e,t){Hc(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),R("documents"))}function ag(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${Z(t.color)}20; color: ${Z(t.color)}">${m(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function og(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${ag(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${m(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${m(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?m(Nc(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${m(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function rg(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${Z(r.color)}20; color: ${Z(r.color)}">${m(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const i=e.content?Nc(e.content).substring(0,80):"No content",s=Yt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${ee.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${Yt&&ee.has(e.id)?" selected":""}" data-action="${Yt?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
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
  `}function lg(e="",t="list"){var d;const n=document.getElementById("documents-list");if(!n)return;ee.clear(),Cn();const i=Ei;if(i.length===0){const l=(d=document.getElementById("doc-search"))==null?void 0:d.value,u=z(),f=l||u;n.innerHTML=P({icon:f?M.search:M.documents,heading:f?"No documents match your filters":"No documents yet",description:f?"Try different search terms or filters":"Create your first document to get started",...!f&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const s=t==="grid"?og:rg,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${i.map(s).join("")}</div>`;return}const o={},r=ne();i.forEach(l=>{let u,f;if(e==="project")if(u=l.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const y=r.find(b=>b.id===l.project_id);f=y?y.name:"Unknown Project"}else e==="sprint"&&(u=l.sprint_id||"__no_sprint__",f=l.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(l)});let c="";for(const[l,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${m(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(s).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function cg(e){ee.has(e)?ee.delete(e):ee.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=ee.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",ee.has(e)),Cn()}function dg(){Ei.forEach(e=>ee.add(e.id)),Ei.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Cn()}function Vc(){ee.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),ee.clear(),Cn()}function Cn(){const e=document.getElementById("doc-bulk-actions");e&&(Yt?(e.classList.remove("hidden"),ee.size>0?e.innerHTML=`
        <span class="bulk-count">${ee.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function ug(){if(ee.size===0){k("No documents selected","error");return}const t=ne().map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${ee.size} Document${ee.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${ee.size} selected document${ee.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,H()}async function pg(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(ee);let i=0;const s=[];for(const c of n)try{await h.updateDocument(c,{project_id:t}),i++}catch(d){console.error(`Failed to move document ${c}:`,d),s.push(((o=Sn.find(l=>l.id===c))==null?void 0:o.title)||c)}O(),Vc(),s.length===0?k(`Moved ${i} document${i>1?"s":""}!`,"success"):k(`Moved ${i}, failed to move: ${s.join(", ")}`,"warning");const a=(r=L())==null?void 0:r.id;return await Zt(a),!1}async function mg(){var a,o;if(ee.size===0){k("No documents selected","error");return}const e=ee.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(ee);let n=0;const i=[];for(const r of t)try{await h.deleteDocument(r),n++}catch(c){console.error(`Failed to delete document ${r}:`,c),i.push(((a=Sn.find(d=>d.id===r))==null?void 0:a.title)||r)}Io(),i.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${i.join(", ")}`,"warning");const s=(o=L())==null?void 0:o.id;await Zt(s)}async function fg(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await h.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(s=>{var a,o;return`
          <div class="comment" data-comment-id="${p(s.id)}">
            <div class="comment-avatar">${((o=(a=s.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${m(s.author_name||"Unknown")}</span>
                ${dn(s.author)}
                <span class="comment-date">${He(s.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${Ac(s.content)}</div>
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
    `}}function gg(e,t){const n=document.getElementById("new-doc-comment");if(!n)return;const i=Il(e);i&&(n.value=i),n.addEventListener("input",()=>{ds(e,n.value)},{signal:t}),n.addEventListener("keydown",s=>{var a;s.key==="Enter"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),(a=n.closest("form"))==null||a.requestSubmit())},{signal:t}),po("new-doc-comment","doc-mention-suggestions")}async function he(e,t=!0){try{t&&Xt();const n=await h.getDocument(e);Oc=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(S=>S.classList.add("hidden"));const i=document.getElementById("document-detail-view");i.classList.remove("hidden");const s=await fg(n);let a=null,o=null,r=!1;if(n.project_id){const V=ne().find(se=>se.id===n.project_id);if(a=V?V.name:null,n.sprint_id)try{const se=await h.getSprint(n.sprint_id);o=se?se.name:null}catch(se){console.error("Failed to load sprint name:",se),r=!0}}let c=n.content||"";const d=F.lexer(c);n.title&&d.length>0&&d[0].type==="heading"&&d[0].depth===1&&d[0].text.trim()===n.title.trim()&&(c=c.slice(d[0].raw.length).trimStart());const l=ng(),u=l.findIndex(S=>S.id===n.id),f=u>0?l[u-1]:null,y=u>=0&&u<l.length-1?l[u+1]:null,b=u>=0,w=C()||"documents",_=n.labels&&n.labels.length>0?n.labels.map(S=>`
          <span class="issue-label" style="background: ${Z(S.color)}20; color: ${Z(S.color)}">
            ${m(S.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(S.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let I='<span class="text-muted">None</span>';try{const S=await h.getDocumentIssues(n.id);S.length>0&&(I=S.map(V=>`
          <div class="linked-item">
            <span class="linked-item-id">${m(V.identifier)}</span>
            <span class="linked-item-title">${m(V.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(V.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(S){console.error("Failed to load linked issues:",S),I=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}i.querySelector("#document-detail-content").innerHTML=`
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
              <span class="issue-nav-counter">${u+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${y?`data-action="view-document" data-document-id="${p(y.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?m(a)+" ›":""} ${m(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?m(n.icon)+" ":""}${m(n.title)}</h1>

          <div class="document-content markdown-body">${c?In(c):'<p class="text-muted">No content</p>'}</div>

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
                ${_}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${m(n.author_name||"Unknown")} ${dn(n.author)}</span>
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
    `,Hs&&Hs.abort(),Hs=new AbortController;const{signal:D}=Hs,B=i.querySelector(".sidebar-overflow-trigger"),x=i.querySelector(".overflow-menu-dropdown");if(B&&x){const S=()=>{x.classList.add("hidden"),B.setAttribute("aria-expanded","false")},V=()=>{const se=x.classList.toggle("hidden");B.setAttribute("aria-expanded",String(!se))};B.addEventListener("click",V,{signal:D}),document.addEventListener("click",se=>{!B.contains(se.target)&&!x.contains(se.target)&&S()},{signal:D}),x.addEventListener("keydown",se=>{se.key==="Escape"&&(S(),B.focus())},{signal:D})}gg(n.id,D),Tc({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:D}),Eo=f?f.id:null,xo=y?y.id:null;const j=S=>{if((S.metaKey||S.ctrlKey)&&S.shiftKey&&(S.key===">"||S.key==="."||S.code==="Period")&&Bs("new-doc-comment")){S.preventDefault();return}S.metaKey||S.ctrlKey||S.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||S.target.tagName==="INPUT"||S.target.tagName==="TEXTAREA"||S.target.tagName==="SELECT"||S.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(S.key==="ArrowLeft"&&Eo?(S.preventDefault(),he(Eo)):S.key==="ArrowRight"&&xo&&(S.preventDefault(),he(xo)))};document.addEventListener("keydown",j,{signal:D})}catch(n){$("load document",n)}}async function Fs(e,t,n=null,i=!1){const s=document.getElementById(e);if(s){if(!t){s.innerHTML='<option value="">Select project first</option>',s.disabled=!0;return}try{const a=await h.getSprints(t);let o=n;if(i&&!n){const c=a.find(d=>d.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${m(c.name)}</option>`).join("");s.innerHTML=`<option value="">None</option>${r}`,s.disabled=!1}catch{s.innerHTML='<option value="">Error loading sprints</option>',s.disabled=!0}}}function So(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${m(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function hg(e,t){const n=document.getElementById(`${e}-tab-write`),i=document.getElementById(`${e}-tab-preview`),s=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!i||!s||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),i.classList.toggle("active",o),s.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=s.value.trim();a.innerHTML=r?In(r):'<span class="text-muted">Nothing to preview.</span>'}}function To(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const i=document.getElementById(t.title),s=document.getElementById(t.content),a=document.getElementById(t.icon),o=Cl(e);if(o){const c=Vp(e),d=n!==null&&c!==null&&c.title===n.title&&c.content===n.content&&c.icon===n.icon,l=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&i&&(i.value=o.title),o.content&&s&&(s.value=o.content),o.icon&&a&&(a.value=o.icon)):d?(i&&(i.value=o.title||""),s&&(s.value=o.content||""),a&&(a.value=o.icon||""),l&&(l.textContent="Restored your unsaved draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",l.classList.remove("hidden"))}const r=()=>{const c={title:(i==null?void 0:i.value)||"",content:(s==null?void 0:s.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&c.title===n.title&&c.content===n.content&&c.icon===n.icon){ps(e,null);return}ps(e,c,n)};[i,s,a].forEach(c=>c==null?void 0:c.addEventListener("input",r))}async function Wc(){xi=null;const e=ne(),t=pd()||"",n=e.map(i=>`<option value="${i.id}" ${i.id===t?"selected":""}>${m(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${So("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,H(),To("new"),t&&await Fs("doc-sprint",t,null,!0)}let xi=null;async function vg(e,t,n){xi=n||null;const s=ne().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${m(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
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
      ${So("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,H(),To("new"),t&&await Fs("doc-sprint",t,e)}async function bg(e){var a;e.preventDefault();const t=(a=L())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,i=document.getElementById("doc-sprint").value||null,s={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:i};try{if(await h.createDocument(t,s),ps("new",null),await Zt(t),O(),k("Document created!","success"),xi){const o=xi;xi=null,o()}}catch(o){$("create document",o)}return!1}let Lo=null,_i=null,Co=!1;async function Kc(e){try{const t=await h.getDocument(e);Lo=e,_i={title:t.title||"",content:t.content||""},Co=!1;const i=ne().map(s=>`<option value="${s.id}" ${s.id===t.project_id?"selected":""}>${m(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
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
        ${So("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,H(),To(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await Fs("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){$("load document",t)}}async function yg(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,i=document.getElementById("edit-doc-sprint").value||null,s={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:i},a=document.getElementById("edit-doc-content-draft-warning");if(a&&Lo===t&&_i&&!Co){let o=null;try{o=await h.getDocument(t)}catch{}if(o&&((o.title||"")!==_i.title||(o.content||"")!==_i.content))return Co=!0,a.textContent='This document was changed by someone else while you were editing — review your text, then save again to overwrite their version. It will stay recoverable via "View history".',a.classList.remove("hidden"),!1}try{await h.updateDocument(t,s),Lo=null,_i=null;const o=Cl(t);o&&o.title===s.title&&o.content===s.content&&(o.icon||"")===(s.icon||"")&&ps(t,null),O(),await he(t),k("Document updated!","success")}catch(o){$("update document",o)}return!1}async function wg(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await h.deleteDocument(e);const n=(t=L())==null?void 0:t.id;await Zt(n),R("documents"),k("Document deleted!","success")}catch(n){$("delete document",n)}}function kg(e,t){Fs(e,t)}async function $g(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,H()}async function Eg(e,t){var i;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const s=(i=L())==null?void 0:i.id,a=await h.searchIssues(s,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${m(o.identifier)}</span>
        <span class="link-result-title">${m(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function xg(e,t){try{await h.linkDocumentToIssue(e,t),O(),k("Issue linked!","success"),await he(e,!1)}catch(n){$("link issue",n)}}async function _g(e,t){if(confirm("Unlink this issue from the document?"))try{await h.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await he(e,!1)}catch(n){$("unlink issue",n)}}let Ao=!1;async function Ig(e,t){if(e.preventDefault(),Ao)return!1;const n=document.getElementById("new-doc-comment"),i=n.value.trim();if(!i)return k("Please enter a comment","error"),!1;Ao=!0;try{await h.createDocumentComment(t,i),n.value="",k("Comment added!","success"),await he(t,!1)}catch(s){$("add comment",s)}finally{Ao=!1}return!1}async function Sg(e){var n;const t=(n=L())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const i=await h.getLabels(t);if(i.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,H();return}const s=i.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${Z(a.color)}; color: white;">${m(a.name)}</span>
        ${a.description?`<span class="text-muted">${m(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${s}</div>
    `,H()}catch(i){$("load labels",i)}}async function Tg(e,t){try{await h.addLabelToDocument(e,t),O(),k("Label added!","success"),await he(e,!1)}catch(n){$("add label",n)}}async function Lg(e,t){try{await h.removeLabelFromDocument(e,t),k("Label removed!","success"),await he(e,!1)}catch(n){$("remove label",n)}}Q({"view-document":(e,t)=>{e.preventDefault(),he(t.documentId)},"set-doc-editor-mode":(e,t)=>{hg(t.target,t.mode)},"retry-load-documents":()=>{Zt(Os)},"retry-document-comments":(e,t)=>{he(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{cg(t.docId)},"clear-doc-search":()=>{Qf()},"clear-doc-project-filter":()=>{Jf()},"clear-all-doc-filters":()=>{eg()},"show-bulk-move-modal":()=>{ug()},"bulk-delete-documents":()=>{mg()},"select-all-docs":()=>{dg()},"clear-doc-selection":()=>{Vc()},"exit-selection-mode":()=>{Io()},"enter-selection-mode":()=>{Uc()},"handle-bulk-move":e=>{pg(e)},"unlink-document-issue":(e,t)=>{_g(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{$g(t.documentId)},"add-document-comment":(e,t)=>{Ig(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Lg(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Sg(t.documentId)},"show-edit-document-modal":(e,t)=>{Kc(t.documentId)},"delete-document":(e,t)=>{wg(t.documentId)},"create-document":e=>{bg(e)},"update-doc-sprint-dropdown":(e,t,n)=>{kg(t.sprintSelect,n.value)},"update-document":(e,t)=>{yg(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Eg(n.value,t.documentId)},"link-to-issue":(e,t)=>{xg(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Tg(t.documentId,t.labelId)}});let An=[],Us={},Gs=new Set,$t=null,Bo=null,zs=[],Ii=[],Do=[];function Yc(){return Us}function Cg(){return Bo}function Ag(){return $t}it(e=>{e==="currentProject"&&C()==="sprints"&&Bn()});let jo=0;async function Bn(){Nl(-1);const e=z();if(!e){const i=document.getElementById("sprints-list");i&&(i.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++jo;Wg();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await h.getCurrentSprint(e);const i=await h.getSprints(e);if(t!==jo)return;An=i,Bg(),await Vs()}catch(i){if(t!==jo)return;n&&(n.innerHTML=P({icon:M.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),$("load sprints",i)}}function Bg(){const e=document.getElementById("sprints-list");if(!e)return;const t=An.find(a=>a.status==="active"),n=An.find(a=>a.status==="planned"),i=An.filter(a=>a.status==="completed");let s="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;s+=`
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
        `,s+=Dg(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";s+=`
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
        `),e.innerHTML=s||P({icon:M.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Zc(e){if(!e.activated_at)return"";const t=new Date(e.activated_at),n=e.closed_at?new Date(e.closed_at):new Date,i=Math.max(1,Math.round((n-t)/864e5));return e.closed_at?`activated ${qo(e.activated_at)}, closed ${qo(e.closed_at)} (${i} day${i===1?"":"s"})`:`activated ${qo(e.activated_at)}, ${i} day${i===1?"":"s"} so far`}function Dg(e){if(!(e.budget!==null&&e.budget!==void 0))return`
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
                    <span>${m(Zc(e))||"not yet activated"}</span>
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
    `}let Mo=0;async function Dn(e,t=!0){var n;try{t&&Xt();const i=++Mo,s=C(),a=await h.getSprint(e);if(i!==Mo)return;if(!a){k("Sprint not found","error"),R("sprints");return}Bo=a;const o=(n=L())==null?void 0:n.id,[r,c,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getSprintTransactions(e).catch(l=>(console.error("Failed to load sprint transactions:",l),[])),o?h.getDocuments(o,a.project_id,null,e).catch(l=>(console.error("Failed to load sprint documents:",l),[])):[]]);if(i!==Mo)return;zs=r,Do=c,Ii=d,C()===s&&un(zs),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Mg()}catch(i){console.error("Failed to load sprint:",i),k("Failed to load sprint","error"),R("sprints")}}async function jg(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),R("sprints",!1);return}try{await Dn(e,!1)}catch{R("sprints",!1)}}function Mg(){const e=Bo,t=zs;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const i=C()||"sprints",s=t.filter(l=>pn.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,u)=>l+(u.estimate||0),0),r=a.reduce((l,u)=>l+(u.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(i)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${m(e.name)}</h2>
                ${c}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.activated_at?`
                <div class="sprint-detail-dates">
                    ${m(Zc(e))}
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
                <div class="stat-value">${d}</div>
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
                ${s.length===0?P({icon:M.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${s.map(l=>Xc(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?P({icon:M.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(l=>Xc(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Pg()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Ii.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Ii.length>0?`
                    <div class="sprint-issues-list">
                        ${Ii.map(l=>Rg(l)).join("")}
                    </div>
                `:P({icon:M.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function Xc(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",i=Gl.includes(e.status)?e.status:"backlog",s=n?`badge-priority-${n}`:"",a=`status-dot-${i}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${m(e.identifier)}</span>
            <span class="sprint-issue-title">${m(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${s}">${Zg(n)}</span>`:""}
                ${e.estimate!=null?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Rg(e){const t=m(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${m(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${He(e.created_at)}</span>
            </span>
        </div>
    `}function Pg(){const e=Do;if(!e||e.length===0)return`
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
                            <span class="ledger-item-date">${qg(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function qg(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Ng(e,t,n,i){const s=i?kh(i):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function Og(e,t,n){var r,c,d;e.preventDefault();const i=(c=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:c.trim(),s=document.getElementById("sprint-budget").value,a=s?parseInt(s):null,o=((d=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:d.value)||"this";try{const l={budget:a};if(i&&(l.name=i),await h.updateSprint(t,l),o==="planned"||o==="default"){const f=An.filter(y=>y.status==="planned"&&y.id!==t);for(const y of f)await h.updateSprint(y.id,{budget:a})}o==="default"&&n&&await h.updateProject(n,{default_sprint_budget:a}),await Bn(),O(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(l){$("update budget",l)}return!1}async function Hg(e){const t=An.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,H();const n=pn;let i=0,s=!1,a=!1;try{const[c,d]=await Promise.all([h.getIssues({sprint_id:e,limit:500}),h.getRituals(t.project_id)]);i=c.filter(l=>n.includes(l.status)).length,s=d.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
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
    `}async function Fg(e){try{const t=await h.closeSprint(e);await Bn(),ed(),t.limbo?Gg(t):k("Sprint completed!","success")}catch(t){$("complete sprint",t)}}async function Vs(){const e=z();if(e)try{$t=await h.getLimboStatus(e),Ug()}catch(t){console.error("Failed to load limbo status:",t)}}function Ug(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!$t||!$t.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${$t.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Gg(e){const t=z();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,H(),zg(t)}async function zg(e){try{const t=await h.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(i=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${i.attestation?i.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${m(i.name)} <span class="ritual-mode">(${m(i.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${Ze(i.prompt)}</div>
                    ${Po(i.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Ro(){var t,n;if(!$t)return;const e=z();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${$t.pending_rituals.map(i=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${i.attestation?i.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${m(i.name)}</strong>
                            <span class="badge badge-ritual-${p(i.approval_mode)}">${m(i.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${Ze(i.prompt)}</div>
                        ${Po(i.attestation)}
                        ${Vg(i,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=$t.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${$t.completed_rituals.map(i=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${m(i.name)}</div>
                            ${Po(i.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,H()}function Po(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${m(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${m(He(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${Ze(e.note)}</div>
        </div>
    `}function Vg(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${p(e.artifact||"")}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Qc(e){for(const t of e)if(!Gs.has(t))try{(await h.getSprints(t)).forEach(i=>{Us[i.id]=i}),Gs.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function Wg(){Us={},Gs=new Set,zs=[],Do=[],Ii=[],Ws={}}function Kg(e,t){t.forEach(n=>{Us[n.id]=n}),Gs.add(e)}let Ws={};function Yg(e){return Ws[e]}function Jc(e,t){Ws[e]=t??null}function ed(){Ws={}}Q({"retry-load-sprints":()=>Bn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Dn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Ng(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{Ro()},"show-close-sprint-confirmation":(e,t)=>{Hg(t.sprintId)},"handle-update-budget":(e,t)=>{Og(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),Fg(t.sprintId)},"dismiss-limbo-modal":()=>{O(),Vs()},"approve-ritual":(e,t)=>{eh(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{nd(t.ritualId,t.projectId,t.ritualName,t.ritualArtifact||"")},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}J(t.issueId)},"create-sprint-document":async(e,t)=>{await vg(t.sprintId,t.projectId,()=>{Dn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}he(t.documentId)}});function qo(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function Zg(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}it(e=>{e==="currentProject"&&C()==="rituals"&&No()});let td=0;async function No(){const e=z(),t=document.getElementById("rituals-content"),n=++td;if(!e){const s=document.getElementById("rituals-tabs");s&&s.classList.add("hidden"),t&&(t.innerHTML=P({icon:M.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Th(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const i=await Li();n===td&&!i&&t&&(t.innerHTML=P({icon:M.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function Xg(){ud(Qg),No()}function Qg(){const e=document.getElementById("rituals-content"),t=Lh(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),i=t.filter(a=>a.trigger==="ticket_close"),s=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,Rn("rv-sprint-rituals-list",n,"sprint"),Rn("rv-close-rituals-list",i,"close"),Rn("rv-claim-rituals-list",s,"claim")}function Jg(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function eh(e,t){try{await h.approveAttestation(e,t),k("Ritual approved!","success"),await Vs(),Ro()}catch(n){$("approve ritual",n)}}function Oo(e){return e==="document"?`
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
        `:""}function Ho(e){var t,n;if(e==="document"){const i=(((t=document.getElementById("ritual-artifact-document"))==null?void 0:t.value)||"").trim();if(!i){k("This ritual requires the document you wrote for it.","error");return}return{document_id:i}}if(e==="url"){const i=(((n=document.getElementById("ritual-artifact-url"))==null?void 0:n.value)||"").trim();if(!i){k("This ritual requires a link to the artifact.","error");return}return{url:i}}return null}async function nd(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Oo(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{th(s,e,t,i)}),H()}async function th(e,t,n,i=""){e.preventDefault();const s=document.getElementById("gate-note").value,a=Ho(i);if(a===void 0)return!1;try{await h.completeGateRitual(t,n,s||null,a),k("Ritual completed!","success"),await Vs();const o=Ag();o&&!o.in_limbo?(O(),k("Limbo cleared! Next sprint is now active.","success")):Ro()}catch(o){$("complete gate ritual",o)}return!1}function nh(e,t){if(e.attestation&&e.attestation.approved_at)return'<span class="text-success">Completed</span>';if(e.attestation&&!e.attestation.approved_at)return`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Reject</button>
        `;const n=p(e.artifact||"");if(e.approval_mode==="gate"){const i=`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-artifact="${n}">Complete</button>`;return e.last_rejection&&!e.last_rejection.superseded_at?i:`${i}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" title="Send the gate request back with a reason">Reject</button>`}return e.note_required||e.artifact?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}" data-ritual-artifact="${n}" data-ritual-note-required="${e.note_required?"1":""}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function ih(e,t,n,i,s="",a=!0){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${i?`<p class="ritual-prompt-hint">${m(i)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${a?"required":"optional"})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${a?"required":""}></textarea>
            </div>
            ${Oo(s)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",o=>{sh(o,e,t,s,a)}),H()}async function sh(e,t,n,i="",s=!0){e.preventDefault();const a=document.getElementById("attest-ritual-note").value.trim();if(s&&!a)return k("A note is required for this attestation.","error"),!1;const o=Ho(i);if(o===void 0)return!1;try{await h.attestTicketRitual(t,n,a||null,o),k("Ritual attested!","success"),O(),await $i(n)}catch(r){$("attest ticket ritual",r)}return!1}async function ah(e,t){try{await h.attestTicketRitual(e,t),k("Ritual attested!","success"),await $i(t)}catch(n){$("attest ticket ritual",n)}}async function oh(e,t){try{await h.approveTicketRitual(e,t),k("Ritual approved!","success"),await $i(t)}catch(n){$("approve ticket ritual",n)}}function rh(e){return!e||e.superseded_at?"":`<div class="ticket-ritual-rejection"><strong>Rejected by ${m(e.rejected_by_name||"Someone")}:</strong> ${m(e.note||"")}</div>`}function id(e,t,n,i=null){document.getElementById("modal-title").textContent=`Reject: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `,document.getElementById("reject-ticket-ritual-form").addEventListener("submit",s=>{lh(s,e,t,n,i)}),H()}async function lh(e,t,n,i,s=null){e.preventDefault();const a=document.getElementById("reject-ritual-note").value.trim();if(!a)return k("A rejection needs a reason.","error"),!1;try{await h.rejectTicketRitual(t,n,a),k(`"${i}" rejected. The attester has been told why.`,"success"),O(),s&&await s()}catch(o){$("reject ritual",o)}return!1}function ch(e,t,n,i=""){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${Oo(i)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{dh(s,e,t,i)}),H()}async function dh(e,t,n,i=""){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value,a=Ho(i);if(a===void 0)return!1;try{await h.completeTicketGateRitual(t,n,s||null,a),k("Ritual completed!","success"),O(),await $i(n)}catch(o){$("complete ticket ritual",o)}return!1}Q({"show-create-ritual-modal":(e,t)=>{hd(t.trigger)},"approve-ticket-ritual":(e,t)=>{oh(t.ritualId,t.issueId)},"reject-ticket-ritual":(e,t)=>{id(t.ritualId,t.issueId,t.ritualName,()=>$i(t.issueId))},"complete-ticket-ritual":(e,t)=>{ch(t.ritualId,t.issueId,t.ritualName,t.ritualArtifact||"")},"attest-ticket-ritual-modal":(e,t)=>{ih(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt,t.ritualArtifact||"",t.ritualNoteRequired!=="")},"attest-ticket-ritual":(e,t)=>{ah(t.ritualId,t.issueId)},"retry-load-rituals":()=>No()});function Ze(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,i=>i.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return El.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Si(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const i=new Date-t;if(i<0)return"just now";const s=Math.floor(i/1e3),a=Math.floor(s/60),o=Math.floor(a/60),r=Math.floor(o/24);return s<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function uh(e,t,n,i,s,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Requested by <strong>${m(o)}</strong>${r?` ${Si(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",d=>{ph(d,e,t,n)}),H(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function ph(e,t,n,i){e.preventDefault();const s=document.getElementById("gate-approval-note").value;try{await h.completeTicketGateRitual(t,n,s||null),k(`GATE ritual "${i}" approved!`,"success"),O(),rt()}catch(a){$("complete gate ritual",a)}}function mh(e,t,n,i,s,a,o,r){uh(e,t,n,i,s,a,o,r)}function fh(e,t,n,i,s,a,o,r,c){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
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
                ${o?`<div class="gate-approval-requested">Attested by <strong>${m(o)}</strong>${r?` ${Si(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Ze(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{gh(l,e,t,n)}),H(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function gh(e,t,n,i){var a,o;e.preventDefault();const s=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await h.approveTicketRitual(t,n),s)try{await h.createComment(n,s)}catch(r){console.error("Failed to post approval comment:",r)}k(`Review ritual "${i}" approved!`,"success"),O(),rt()}catch(r){$("approve review ritual",r)}}function hh(e,t,n,i,s,a,o,r,c){fh(e,t,n,i,s,a,o,r,c)}it(e=>{e==="currentProject"&&C()==="approvals"&&rt()});let Fo=[],Uo=0;async function rt(){if(!L())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Uo;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=z(),i=n?ne().filter(r=>r.id===n):ne(),s=await Promise.all(i.map(async r=>{const[c,d]=await Promise.all([h.getPendingApprovals(r.id),h.getLimboStatus(r.id)]);return{project:r,approvals:c,limbo:d}}));if(t!==Uo)return;const a=[],o=[];for(const{project:r,approvals:c,limbo:d}of s)if(a.push(...c),d&&d.in_limbo){const l=(d.pending_rituals||[]).filter(u=>{var f;return(f=u.attestation)!=null&&f.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});l.length>0&&o.push({project:r,rituals:l})}gm(a),Fo=o,sd()}catch(n){if(t!==Uo)return;e.innerHTML=P({icon:M.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),$("load approvals",n)}}function sd(){const e=document.getElementById("approvals-list");if(!e)return;const t=fm(),n=Fo.length>0,i=!Xp();if(t.length===0&&!n){i?e.innerHTML=`
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
            `:e.innerHTML=P({icon:M.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let s="";n&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Fo.map(({project:l,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${m(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(f=>{const y=f.attestation&&!f.attestation.approved_at,b=y?"⏳":"○",w=y?`<span class="gate-waiting-info">Attested by <strong>${m(f.attestation.attested_by_name||"Unknown")}</strong></span>`:f.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=y?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(f.id)}"
                                            data-project-id="${p(l.id)}">Approve</button>`:f.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(f.id)}"
                                                data-project-id="${p(l.id)}"
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
                                            ${_}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `);const a=l=>l.pending_approvals||[],o=l=>u=>{const f=a(u).filter(l);return f.length>0?{...u,_filteredApprovals:f}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(Go).join("")}
                </div>
            </div>
        `),c.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(Go).join("")}
                </div>
            </div>
        `),d.length>0&&(s+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(Go).join("")}
                </div>
            </div>
        `),e.innerHTML=s,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;mh(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{var y;l.disabled=!0;const u=(y=l.closest(".gate-ritual-actions"))==null?void 0:y.querySelector(".review-approve-btn");u&&(u.disabled=!0);const f=l.dataset;try{await h.approveTicketRitual(f.ritualId,f.issueId),k(`Review ritual "${f.ritualName}" approved!`,"success"),await rt()}catch(b){l.disabled=!1,u&&(u.disabled=!1),$("approve review ritual",b)}})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;hh(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".gate-reject-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;id(u.ritualId,u.issueId,u.ritualName,()=>rt())})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await h.approveAttestation(l.dataset.ritualId,l.dataset.projectId),k("Sprint ritual approved!","success"),await rt()}catch(u){l.disabled=!1,$("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{nd(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName,l.dataset.ritualArtifact||"")})})}function vh(){Qp(),sd()}function Go(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(i=>{const s=i.approval_mode==="review",a=s?"Attested by":"Waiting",o=i.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${m(i.requested_by_name)}</strong>${i.requested_at?` (${Si(i.requested_at)})`:""}</span>`:"",r=s&&i.attestation_note?`<div class="gate-attestation-note">${Ze(i.attestation_note)}</div>`:"",c=s?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',d=!s&&i.rejection_note,l=d?`<div class="gate-rejection-note"><strong>Rejected by ${m(i.rejected_by_name||"Someone")}</strong>${i.rejected_at?` (${Si(i.rejected_at)})`:""}: ${m(i.rejection_note)}<br><span class="text-muted">Waiting for the requester to ask again.</span></div>`:"",u=`<button class="btn btn-small btn-secondary gate-reject-btn"
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
                    ${d?"":u}
                </div>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${m(i.ritual_name)} ${c}</span>
                    <span class="gate-ritual-prompt">${m(i.ritual_prompt)}</span>
                    ${o}
                    ${r}
                    ${l}
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
    `}Q({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),J(t.issueId)},"dismiss-approvals-explainer":()=>{vh()},"retry-load-approvals":()=>rt()});const Ks={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},Ys={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let ad=0;function od(e){ad=0;let t="";if(e&&typeof e=="object")for(const[n,i]of Object.entries(e)){const[s,a]=n.split("__");t+=rd(s,a,i)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function rd(e="",t="",n=""){const i=ad++,s=Object.keys(Ks).map(d=>`<option value="${d}" ${d===e?"selected":""}>${d}</option>`).join(""),o=(e?Ks[e]:Ks.estimate).map(d=>`<option value="${d}" ${d===t?"selected":""}>${Ys[d]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${i}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${i}">
                <option value="">Select field...</option>
                ${s}
            </select>
            <select class="condition-operator" id="condition-operator-${i}" data-action="toggle-value-input" data-row-id="${i}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${i}" value="${p(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${i}">&times;</button>
        </div>
    `}function bh(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",rd()),Zs()}function yh(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),Zs()}function wh(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),i=t.querySelector(".condition-operator"),s=n.value;if(!s)return;const a=Ks[s]||[];i.innerHTML=a.map(o=>`<option value="${o}">${Ys[o]}</option>`).join(""),ld(e),Zs()}function ld(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Ti(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function Zs(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function cd(){var i,s,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(i=o.querySelector(".condition-field"))==null?void 0:i.value,c=(s=o.querySelector(".condition-operator"))==null?void 0:s.value,d=o.querySelector(".condition-value");let l=(a=d==null?void 0:d.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw Ti("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw Ti("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${c}`;if(n.has(u))throw Ti(`Duplicate condition: ${r} ${Ys[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),c==="isnull")t[u]=!0;else if(c==="in"||c==="contains")t[u]=l?l.split(",").map(f=>f.trim()).filter(f=>f):[];else if(c==="gte"||c==="lte"){if(!l)throw Ti(`Please enter a numeric value for ${r} ${Ys[c]}.`),new Error(`Missing numeric value for ${u}`);const f=parseInt(l,10);if(isNaN(f))throw Ti(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${l}`);t[u]=f}else t[u]=l}return Zs(),Object.keys(t).length>0?t:null}Q({"add-condition-row":()=>{bh()},"remove-condition-row":(e,t)=>{yh(Number(t.rowId))},"update-operator-options":(e,t)=>{wh(Number(t.rowId))},"toggle-value-input":(e,t)=>{ld(Number(t.rowId))}});let pe=[],zo=null;const dd=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];it((e,t)=>{e==="currentProject"&&(t&&Op(t),dd.forEach(n=>{const i=document.getElementById(n);i&&(i.value=t||"")}),Nh(t||""))});const Xs={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function ud(e){zo=e}function ne(){return pe}function jn(e){const t=pe.find(i=>i.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return Xs[n]||Xs.fibonacci}function Qs(e,t){if(e==null)return"No estimate";const i=jn(t).find(s=>s.value===e);return i?i.label:`${e} points`}function Vo(e,t){return e==null||e===0?!1:!jn(t).some(i=>i.value===e)}function kh(e){const t=pe.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",i=(Xs[n]||Xs.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${i.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const s=i.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${s}`}async function Ue(){if(L())try{pe=await h.getProjects(L().id),$h();const e=z();if(e&&pe.some(i=>i.id===e))return;const t=Wo();if(t&&pe.some(i=>i.id===t)){Ke(t);return}const n=_l();if(n&&pe.some(i=>i.id===n)){Ke(n);return}pe.length>0&&Ke(pe[0].id)}catch(e){$("load projects",e)}}function $h(){const e='<option value="">All Projects</option>'+pe.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+pe.map(a=>`<option value="${a.id}">${m(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],i=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),i.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const s=z();dd.forEach(a=>{const o=document.getElementById(a);o&&(o.value=s||"")})}function pd(){return _l()}function Mn(){const e=document.getElementById("projects-list");if(pe.length===0){e.innerHTML=P({icon:M.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=pe.map(t=>`
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
    `).join("")}function Eh(e){Ke(e),R("issues")}function md(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function xh(e){e.preventDefault();const t=L();if(!t){k("Create a team first before creating a project.","error");return}const n={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.createProject(t.id,n),await Ue(),Mn(),O(),k("Project created!","success")}catch(i){$("create project",i)}return!1}async function _h(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await h.updateProject(t,n),await Ue(),Mn(),O(),k("Project updated!","success")}catch(i){$("update project",i)}return!1}async function Ih(e){const t=pe.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await h.deleteProject(e),await Ue(),Mn(),O(),k("Project deleted","success")}catch(n){$("delete project",n)}}let Ce=null;async function fd(e){Ce=e,pe.length===0&&await Ue();const t=pe.find(n=>n.id===e);if(!t){k("Project not found","error"),R("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),gd("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function gd(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(i=>{i.classList.toggle("active",i.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(i=>{i.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!Et||Et.length===0)&&Li()}function Sh(){Ce=null,Et=[]}function Th(e){Ce=e}function Lh(){return Et}async function Ch(){if(!Ce)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await h.updateProject(Ce,t),await Ue(),k("Settings saved","success");const n=pe.find(i=>i.id===Ce);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){$("save project settings",n)}}async function Ah(){if(!Ce)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await h.updateProject(Ce,n),await Ue(),k("Settings saved","success")}catch(i){$("save settings",i)}}let Et=[];async function Li(){if(!Ce)return!1;try{return Et=await h.getRituals(Ce),Bh(),typeof zo=="function"&&zo(),!0}catch(e){return $("load rituals",e),!1}}function Bh(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=Et.filter(i=>!i.trigger||i.trigger==="every_sprint"),t=Et.filter(i=>i.trigger==="ticket_close"),n=Et.filter(i=>i.trigger==="ticket_claim");Rn("ps-sprint-rituals-list",e,"sprint"),Rn("ps-close-rituals-list",t,"close"),Rn("ps-claim-rituals-list",n,"claim")}function Rn(e,t,n){const i=document.getElementById(e);if(!i)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};i.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const s=a=>p(a||"auto");i.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${m(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${s(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${m(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${Ze(a.prompt)}</div>
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
  `}).join("")}async function hd(e){if(!Ce)return;let t=[];try{t=await h.getRitualGroups(Ce)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${od(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,H()}function Dh(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function jh(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),i=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),i.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),i.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),i.classList.add("hidden")}async function vd(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await h.createRitualGroup(Ce,{name:t,selection_mode:n})).id}return e.value||null}async function Mh(e){var s;e.preventDefault();let t;try{t=cd()}catch{return!1}let n;try{n=await vd()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((s=document.getElementById("ritual-artifact"))==null?void 0:s.value)||null,conditions:t};if(n){i.group_id=n;const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await h.createRitual(Ce,i),await Li(),O(),k("Ritual created!","success")}catch(a){$("create ritual",a)}return!1}async function Rh(e){const t=Et.find(o=>o.id===e);if(!t)return;let n=[];try{n=await h.getRitualGroups(Ce)}catch{}const i=n.find(o=>o.id===t.group_id),s=i&&i.selection_mode==="random_one",a=i&&i.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${od(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,H()}async function Ph(e,t){var a;e.preventDefault();let n;try{n=cd()}catch{return!1}let i;try{i=await vd()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,artifact:((a=document.getElementById("ritual-artifact"))==null?void 0:a.value)||null,conditions:n,group_id:i||""};if(i){const o=document.getElementById("ritual-weight"),r=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&o.value&&(s.weight=parseFloat(o.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&r.value&&(s.percentage=parseFloat(r.value))}try{await h.updateRitual(t,s),await Li(),O(),k("Ritual updated!","success")}catch(o){$("update ritual",o)}return!1}async function qh(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await h.deleteRitual(e),await Li(),k("Ritual deleted","success")}catch(n){$("delete ritual",n)}}Q({"view-project":(e,t)=>{Eh(t.projectId)},"view-project-settings":(e,t)=>{fd(t.projectId)},"create-project":e=>{xh(e)},"update-project":(e,t)=>{_h(e,t.projectId)},"confirm-delete-project":(e,t)=>{Ih(t.projectId)},"edit-project-ritual":(e,t)=>{Rh(t.ritualId)},"delete-project-ritual":(e,t)=>{qh(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Mh(e)},"update-project-ritual":(e,t)=>{Ph(e,t.ritualId)},"toggle-ritual-conditions":()=>{Dh()},"ritual-group-change":()=>{jh()}});function Wo(){const t=new URLSearchParams(window.location.search).get("project");return t||pd()}function Nh(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),i=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",i)}const Ko={},bd=new Map;let Yo=null,Zo=null,Xo=null,Qo=null,Jo=null,er=null,yd=!1;function Oh(e){Object.assign(Ko,e)}function Hh({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:i,issueNavigate:s,epicNavigate:a}={}){e&&(Yo=e),t&&(Zo=t),n&&(Xo=n),i&&(Qo=i),s&&(Jo=s),a&&(er=a)}function Fh(){return Object.keys(Ko)}const Uh=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function R(e,t=!0){if(t&&Xt(),lm(e),t){let s;const a=Wo();e==="my-issues"?s=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?s=`/issues${window.location.search}`:Uh.includes(e)&&a?s=`/${e}?project=${a}`:s=`/${e}`,history.pushState({view:e},"",s)}document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.view===e)}),Yo&&Yo();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const s=document.getElementById(`${e}-view`);s&&s.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const i=Ko[e];i&&i(),t&&window.scrollTo(0,0)}function wd(){var i;const t=window.location.pathname.split("/").filter(Boolean);Qo&&Qo();let n="my-issues";if(t.length===0||t[0]==="")R("my-issues",!1);else{if(Zo&&Zo(t))return;{n=t[0];const s={"gate-approvals":"approvals"};s[n]&&(n=s[n]),Fh().includes(n)?R(n,!1):(n="my-issues",R("my-issues",!1))}}(i=history.state)!=null&&i.view||history.replaceState({view:n},"",window.location.href)}function Xt(){bd.set(window.location.href,window.scrollY)}function kd(e){Xt(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Jo&&Jo(e)}function $d(e){Xt(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),er&&er(e)}function Ed(){const e=bd.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function Gh(){yd||(yd=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Xo&&Xo(e.state)){Ed();return}(t=e.state)!=null&&t.view?R(e.state.view,!1):wd(),Ed()}))}let Ci=[];function Js(){return Ci}function zh(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Vh(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?zh(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${m(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function Wh(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Ci=await h.getTeamAgents(e),ws(Jt,Js),$s()}catch(n){console.error("Failed to load team agents:",n),$("load team agents",n)}}async function tr(e){var t;if(e||(e=(t=L())==null?void 0:t.id),!!e)try{Ci=await h.getTeamAgents(e),ws(Jt,Js),$s(),Kh()}catch(n){$("load agents",n)}}function Kh(){const e=document.getElementById("agents-list");if(e){if(Ci.length===0){e.innerHTML=P({icon:M.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=Ci.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Vh(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${i} ${bt(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-secondary" data-action="generate-agent-key" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Generate new key</button>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function Yh(){const e=ne();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),H()}function xd(e,t){const n=m(t);document.getElementById("modal-title").textContent=e,document.getElementById("modal-content").innerHTML=`
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
  `,H()}async function Zh(e){var o,r,c;e.preventDefault();const t=(o=L())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),i=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,s=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let d;s&&a?d=await h.createProjectAgent(a,n,i):d=await h.createTeamAgent(t,n,i),O(),xd("Agent Created",d.api_key)}catch(d){$("create agent",d)}return!1}async function Xh(e,t){if(confirm(`Generate a new API key for "${t}"? Existing keys will keep working.`))try{const n=await h.createAgentKey(e);xd("New Agent Key",n.key)}catch(n){$("generate agent key",n)}}function Qh(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function Jh(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await h.deleteAgent(e),k("Agent deleted","success"),tr()}catch(n){$("delete agent",n)}}Q({"create-agent":e=>{Zh(e)},"copy-agent-key":()=>{Qh()},"dismiss-agent-modal":()=>{O(),tr()},"delete-agent":(e,t)=>{Jh(t.agentId,t.agentName)},"generate-agent-key":(e,t)=>{Xh(t.agentId,t.agentName)}});let xt=0,Pn=!1,Ai=null,ea=null,Bi=0;const Qt=new Map;function ta(){const e=document.getElementById("ws-status-badge");e&&(e.classList.toggle("hidden",xt===0&&!Pn),e.textContent=Pn?"Stopped":"Offline",e.title=Pn?"Live updates stopped — reload to try again":"Live updates disconnected — reconnecting")}function Ae(e,t){return Qt.has(e)||Qt.set(e,new Set),Qt.get(e).add(t),()=>{var n;return(n=Qt.get(e))==null?void 0:n.delete(t)}}function ev(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}const tv=1e3;function na(){ea&&(clearTimeout(ea),ea=null)}const nv="chaotic",nr=4001,iv=4003,sv="chaotic.bearer.";function av(e){return[nv,sv+e]}function _d(e,{isReconnect:t=!1}={}){Ai&&(clearTimeout(Ai),Ai=null),na();const n=bm();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Ka(null)),!t&&(xt>0||Pn)&&(xt=0,Pn=!1,ta());const i=h.getToken();if(!i)return;const s=++Bi,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o,av(i));Ka(r);let c=!1;const d=()=>{if(c||s!==Bi)return;c=!0,na();const l=xt>0;l&&k("Live updates reconnected","success"),xt=0,ta(),l&&ir({type:"reconnected",entity:"connection",data:{}})};r.onopen=()=>{s===Bi&&(console.log("WebSocket connected"),na(),ea=setTimeout(d,tv))},r.onmessage=l=>{if(s!==Bi)return;d();let u;try{u=JSON.parse(l.data)}catch(f){console.error("WebSocket: malformed message",f);return}ir(u)},r.onclose=l=>{if(s!==Bi)return;console.log("WebSocket disconnected"),na();const u=l==null?void 0:l.code;if(u===nr||u===iv){Ka(null),xt=0;const y=u===nr&&xl()===i;Pn=!y,ta();let b="forbidden";u===nr&&(b=y?"unauthorized":"superseded"),ir({type:b,entity:"connection",data:{code:u,teamId:e}});return}xt++,xt===1&&k("Live updates disconnected. Reconnecting...","warning"),ta();const f=ev(xt-1);Ai=setTimeout(()=>{Ai=null,L()&&L().id===e&&_d(e,{isReconnect:!0})},f)},r.onerror=l=>{console.error("WebSocket error:",l)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function ir(e){const{type:t,entity:n,data:i}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const s={type:t,entity:n},a=Qt.get(`${n}:${t}`);if(a)for(const c of a)try{c(i,s)}catch(d){console.error(`WebSocket handler error (${n}:${t}):`,d)}const o=Qt.get(n);if(o)for(const c of o)try{c(i,s)}catch(d){console.error(`WebSocket handler error (${n}):`,d)}const r=Qt.get("*");if(r)for(const c of r)try{c(i,s)}catch(d){console.error("WebSocket handler error (*):",d)}}const ov={gate_pending:"Gate pending",mention:"Mention",assignment:"Assignment",review_requested:"Review requested",agent_status:"Agent",gate_rejected:"Rejected",push_device_added:"New device"};let qn=0,Rt=!1,me=null,Pt=null;const Di=new Set,lt=new Map,Ge=new Map;function Id(e){lt.get(e)===null&&lt.set(e,qn)}function sr(e){const t=Ge.get(e);t&&t.confirmedAfter===null&&(t.confirmedAfter=qn)}function rv(e){return e.filter(t=>!lt.has(t.id)).map(t=>{const n=Ge.get(t.id);return n&&!t.read_at?{...t,read_at:n.readAt}:t}).filter(t=>!(Rt&&Ge.has(t.id)&&t.id!==me))}function lv(e){for(const[t,n]of lt)n!==null&&e>n&&lt.delete(t);for(const[t,n]of Ge)n.confirmedAfter!==null&&e>n.confirmedAfter&&Ge.delete(t)}function cv(e,t){t!=null&&t.id&&(e==="archived"?(lt.has(t.id)||lt.set(t.id,null),Id(t.id)):e==="read"&&sr(t.id))}async function Nn(){const e=L();if(e){try{const t=await h.getInboxUnreadCount(e.id);fi(t.unread_count||0)}catch(t){console.error("Failed to refresh inbox unread count:",t)}ji()}}function ji(){const e=document.getElementById("inbox-unread-badge");if(!e)return;const t=vs();e.textContent=t>99?"99+":String(t),e.classList.toggle("hidden",t===0)}async function Mi({focusFirst:e=!1,background:t=!1}={}){const n=L();if(!n)return;const i=document.getElementById("inbox-list");if(!i)return;const s=++qn;t||(Pt={focusFirst:e||!!(Pt!=null&&Pt.focusFirst)},me=null,dv(i));try{const a=await h.getInbox(n.id,{unread:Rt,limit:100});if(s!==qn)return;const o=new Set(lt.keys());lv(s);const r=rv(a||[]),c=Pt;Pt=null,c?(At(r),sa(),c.focusFirst&&!nt()&&mv()):uv(r,o)}catch(a){if(s!==qn)return;Pt?(Pt=null,i.innerHTML=P({icon:M.inbox,heading:"Failed to load inbox",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-inbox"},variant:"error"}),$("load inbox",a)):console.error("Failed to refresh inbox:",a)}Nn()}function dv(e){e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("")}function ar(e){return e&&[...document.querySelectorAll("#inbox-list .inbox-row")].find(t=>t.dataset.entryId===e)||null}function Sd(e){return(e==null?void 0:e.querySelector(".inbox-row-toggle"))||e||null}function Td(){var n,i;const e=document.activeElement,t=(n=e==null?void 0:e.closest)==null?void 0:n.call(e,"#inbox-list .inbox-row");return t?{entryId:t.dataset.entryId,inPanel:!!e.closest(".inbox-row-expanded-panel"),action:((i=e.dataset)==null?void 0:i.action)||null}:null}function Ld(e,t){if(!e)return;const n=ar(e.entryId);let i=null;n&&e.action&&(i=[...n.querySelectorAll(`[data-action="${e.action}"]`)].find(s=>!!s.closest(".inbox-row-expanded-panel")===e.inPanel)||null),i||(i=Sd(n||t)),i==null||i.focus({preventScroll:!0})}function uv(e,t){const n=document.getElementById("inbox-list");if(!n)return;const i=de(),s=[...n.querySelectorAll(".inbox-row")],a=n.querySelector(".inbox-row.keyboard-selected"),o=(a==null?void 0:a.dataset.entryId)||null,r=a?s.indexOf(a):-1,c=Td(),d=window.scrollY,l=n.scrollTop;let u=e;if(me&&!e.some(b=>b.id===me)){const b=i.find(w=>w.id===me);b&&Rt&&!t.has(me)?(u=[...e],u.splice(Math.min(i.indexOf(b),u.length),0,b)):me=null}At(u),sa();let f=-1;o&&(f=u.findIndex(b=>b.id===o),f===-1&&u.length&&(f=Math.min(r,u.length-1))),f>=0?ia(f,{focus:!1}):hs(-1);const y=f>=0?n.querySelectorAll(".inbox-row")[f]:null;Ld(c,y),n.scrollTop!==l&&(n.scrollTop=l),window.scrollY!==d&&window.scrollTo(0,d)}function pv(e,t){if(!(t!=null&&t.id))return!1;const n=de().find(i=>i.id===t.id);return e==="read"?!n||!!n.read_at:e==="archived"?!n:!1}function Ri(e){const t=de();for(const n of new Set(e)){const i=ar(n),s=t.find(c=>c.id===n);if(!i||!s)continue;const a=i.contains(document.activeElement)?Td():null,o=document.createElement("template");o.innerHTML=Bd(s).trim();const r=o.content.firstElementChild;i.classList.contains("keyboard-selected")&&r.classList.add("keyboard-selected"),i.replaceWith(r),Ld(a,r)}}function ia(e,{focus:t=!0}={}){const n=document.querySelectorAll("#inbox-list .inbox-row");if(n.forEach(s=>s.classList.remove("keyboard-selected")),n.length===0){hs(-1);return}const i=Math.max(0,Math.min(e,n.length-1));n[i].classList.add("keyboard-selected"),hs(i),t&&Sd(n[i]).focus({preventScroll:!0})}function mv(){ia(0)}async function or(e){const t=de(),n=t.findIndex(a=>a.id===e);if(n===-1)return;const s=!t[n].read_at;me===e&&(me=null),lt.set(e,null),At(t.filter(a=>a.id!==e)),s&&fi(Math.max(0,vs()-1)),sa(),ji(),ia(n);try{await h.archiveInbox(e),Id(e)}catch(a){lt.delete(e),console.error("Failed to archive inbox entry:",a)}}function Cd(e){var s,a;const n=de().findIndex(o=>o.id===e);if(n===-1)return;const i=me;me=i===e?null:e,me===e&&fv(e),Ri([i,e]),ia(n),me===e&&((a=(s=ar(e))==null?void 0:s.scrollIntoView)==null||a.call(s,{block:"nearest"}))}function fv(e){const t=de(),n=t.find(s=>s.id===e);if(!n||n.read_at)return;const i=new Date().toISOString();n.read_at=i,Ge.set(e,{readAt:i,confirmedAfter:null}),At([...t]),fi(Math.max(0,vs()-1)),ji(),h.markInboxRead(e).then(()=>sr(e),s=>{var o;((o=Ge.get(e))==null?void 0:o.readAt)===i&&Ge.delete(e);const a=de().find(r=>r.id===e);a&&a.read_at===i&&(a.read_at=null,At([...de()]),Ri([e])),Nn(),$("mark inbox entry read",s)})}function gv(){if(me===null)return!1;const e=me;return me=null,Ri([e]),!0}function Ad(e,t){document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(n=>{n.dataset.entryId===e&&(t?(n.setAttribute("aria-disabled","true"),n.setAttribute("aria-busy","true")):(n.removeAttribute("aria-disabled"),n.removeAttribute("aria-busy")))})}async function hv(e){if(Di.has(e))return;const t=de().find(i=>i.id===e);if(!t||!t.issue_id||!t.source_user_id)return;const n=t.source_user_name||"sender";Di.add(e),Ad(e,!0);try{await h.updateIssue(t.issue_id,{assignee_id:t.source_user_id})}catch(i){Di.delete(e),Ad(e,!1),$(`reassign ${t.issue_identifier||"issue"} back to ${n}`,i);return}Di.delete(e),or(e)}function vv(){Rt=!Rt;const e=document.getElementById("inbox-unread-toggle");e&&e.classList.toggle("active",Rt),Mi({focusFirst:!0})}function Bd(e){const t=!e.read_at,n=e.id===me,i=ov[e.kind]||e.kind,s=e.issue_identifier||e.document_title||"",a=[`data-entry-id="${p(e.id)}"`,e.issue_id?`data-issue-id="${p(e.issue_id)}"`:"",e.document_id?`data-document-id="${p(e.document_id)}"`:""].filter(Boolean).join(" "),o=`inbox-panel-${e.id}`;return`
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
                ${n?bv(e,s,o):""}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-time">${m(Si(e.created_at))}</span>
                <button type="button" class="inbox-row-archive" data-action="archive-inbox-entry"
                        data-entry-id="${p(e.id)}" title="Archive (e)" aria-label="Archive">&times;</button>
            </div>
        </div>
    `}function bv(e,t,n){const i=(e.kind==="assignment"||e.kind==="review_requested")&&e.source_user_id&&e.issue_id,s=e.issue_id||e.document_id,a=e.source_user_name,o=t?`Open ${m(t)}`:"Open",r=[i?`<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${p(e.id)}"${Di.has(e.id)?' aria-disabled="true" aria-busy="true"':""}>Reassign back${a?` to ${m(a)}`:""}</button>`:"",s?`<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
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
    `}function sa(){const e=document.getElementById("inbox-list");if(!e)return;const t=de();if(t.length===0){e.innerHTML=P({icon:M.inbox,heading:Rt?"No unread items":"Inbox zero",description:Rt?"Nothing unread right now.":"Gates, mentions, assignments, and review requests will show up here."});return}e.innerHTML=t.map(n=>Bd(n)).join("")}async function yv(e){var s;const t=de().find(a=>a.id===e);if(!t||t.read_at)return;const n=new Date().toISOString();Ge.set(e,{readAt:n,confirmedAfter:null});try{await h.markInboxRead(e)}catch(a){((s=Ge.get(e))==null?void 0:s.readAt)===n&&Ge.delete(e);const o=de().find(r=>r.id===e);o&&o.read_at===n&&(o.read_at=null,At([...de()]),Ri([e])),console.error("Failed to mark inbox entry read:",a);return}sr(e);const i=de().find(a=>a.id===e);i&&!i.read_at?(i.read_at=n,At([...de()]),fi(Math.max(0,vs()-1)),ji(),Ri([e])):Nn()}async function wv(){const e=L();if(e)try{await h.markAllInboxRead(e.id);const t=new Date().toISOString();for(const n of de())n.read_at||Ge.set(n.id,{readAt:t,confirmedAfter:qn});At(de().map(n=>({...n,read_at:n.read_at||t}))),fi(0),ji(),sa()}catch(t){$("mark all inbox entries read",t)}}function kv(e){e.entryId&&yv(e.entryId),e.issueId?J(e.issueId):e.documentId&&he(e.documentId)}function $v(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&or(e.dataset.entryId)}function Ev(e){var t;(t=e==null?void 0:e.dataset)!=null&&t.entryId&&Cd(e.dataset.entryId)}const xv='a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';function _v(e,t){if(!e||e===t||!e.closest)return!1;const n=e.closest(xv);return n&&n!==t&&(t!=null&&t.contains(n))?!0:!!e.closest(".inbox-row-expanded-panel")}function Iv(e){var n;const t=typeof window<"u"?(n=window.getSelection)==null?void 0:n.call(window):null;return!t||t.isCollapsed||t.toString()===""||!e?!1:e.contains(t.anchorNode)||e.contains(t.focusNode)}Q({"toggle-inbox-expand":(e,t,n)=>{var i;e.type==="keydown"&&e.defaultPrevented||e.type==="click"&&Iv((i=n==null?void 0:n.closest)==null?void 0:i.call(n,".inbox-row"))||_v(e.target,n)||(e.preventDefault(),t.entryId&&Cd(t.entryId))},"open-inbox-full":(e,t)=>{e.preventDefault(),kv(t)},"reassign-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&hv(t.entryId)},"archive-inbox-entry":(e,t)=>{e.preventDefault(),t.entryId&&or(t.entryId)},"toggle-inbox-unread-filter":()=>vv(),"mark-all-inbox-read":()=>wv(),"retry-load-inbox":()=>Mi({focusFirst:!0})});let aa=[],On=[],rr=[],lr=[];function Sv(){return aa}function Jt(){return On}async function cr(){try{aa=await h.getMyTeams(),Tv()}catch(e){$("load teams",e)}}function Tv(){const e=document.getElementById("team-list");aa.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=aa.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${m(t.name)}</button>
        `).join("")}async function dr(e,t=!1){bs(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const i=document.getElementById("team-description-text");i&&(i.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),_d(e.id),await Promise.all([Ue(),Ov(),Cv(),Wh(),Nn()]),t?wd():R(C())}function Dd(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Lv(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function Cv(){if(L())try{On=await h.getTeamMembers(L().id),ws(Jt,Js),$s()}catch(e){console.error("Failed to load team members:",e),$("load team members",e)}}function ur(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let pr=0;async function mr(){if(!L())return;const e=++pr,t=document.getElementById("team-members-list");t&&(t.innerHTML=ur());try{const n=await h.getTeamMembers(L().id);if(e!==pr)return;On=n,ws(Jt,Js),$s(),Av()}catch(n){if(e!==pr)return;t&&(t.innerHTML=P({icon:M.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),On=[],jd(),$("load team members",n)}}function fr(){var n;const e=(n=Vt())==null?void 0:n.id,t=On.find(i=>i.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function jd(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!fr())}function Av(){const e=document.getElementById("team-members-list"),t=fr();jd(),e.innerHTML=On.map(n=>`
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
                ${t&&n.user_id!==Vt().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let gr=0;async function oa(){if(!L())return;const e=++gr,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=ur());try{const n=await h.getTeamInvitations(L().id);if(e!==gr)return;rr=n,Bv()}catch(n){if(e!==gr)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function Bv(){const e=document.getElementById("team-invitations-list");if(rr.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=fr();e.innerHTML=rr.map(n=>`
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
    `).join("")}let hr=0;async function Md(){if(!L())return;const e=++hr,t=document.getElementById("team-agents-list");t&&(t.innerHTML=ur());try{const n=await h.getTeamAgents(L().id);if(e!==hr)return;lr=n,Dv()}catch(n){if(e!==hr)return;t&&(t.innerHTML=P({icon:M.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),$("load team agents",n)}}function Dv(){const e=document.getElementById("team-agents-list");if(e){if(lr.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=lr.map(t=>{const n=m(t.name),i=m(t.parent_user_name||"Unknown"),s=t.avatar_url||"🤖";return`
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
      `}).join("")}}function Rd(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,H()}async function jv(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await h.createInvitation(L().id,t,n),await oa(),O(),k("Invitation sent!","success")}catch(i){$("send invitation",i)}return!1}async function Mv(e){if(confirm("Are you sure you want to remove this member?"))try{await h.removeMember(L().id,e),await mr(),k("Member removed!","success")}catch(t){$("remove member",t)}}async function Rv(e){try{await h.deleteInvitation(L().id,e),await oa(),k("Invitation canceled!","success")}catch(t){$("cancel invitation",t)}}function Pd(){Dd(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,H()}function Pv(){L()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
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
    `,H())}async function qv(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await h.createTeam(t);await cr(),await dr(n),O(),k("Team created!","success")}catch(n){$("create team",n)}return!1}async function Nv(e){if(e.preventDefault(),!L())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await h.updateTeam(L().id,t);bs(n),document.getElementById("current-team-name").textContent=n.name;const i=document.getElementById("team-description-text");i&&(i.textContent=n.description||"No description"),await cr(),O(),k("Team updated!","success")}catch(n){$("update team",n)}return!1}async function Ov(){if(L())try{const e=await h.getLabels(L().id);fs(e)}catch(e){console.error("Failed to load labels:",e),$("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Q({"select-team":(e,t)=>{dr(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{Mv(t.userId)},"delete-invitation":(e,t)=>{Rv(t.invitationId)},"retry-load-team-invitations":()=>{oa()},"retry-load-team-members":()=>{mr()},"retry-load-team-agents":()=>{Md()},"invite-member":e=>{jv(e)},"create-team":e=>{qv(e)},"update-team":e=>{Nv(e)}});let ct=null,_t=0,Hn=null,Fn=null,Pi=null,vr=!1;function Hv(){return Hp()}function qd(){Fp()}function Nd(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Fv(){ct||(ct=document.createElement("div"),ct.id="onboarding-overlay",ct.className="onboarding-overlay",document.getElementById("app").appendChild(ct))}function qi(){if(!ct)return;const e=vr?Hd():Od(),t=e[_t],n=e.map((i,s)=>`<span class="onboarding-dot${s===_t?" active":""}${s<_t?" completed":""}"></span>`).join("");ct.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function Od(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Nd(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=Nd(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Hn&&(e.textContent=`${Hn.name} (${Hn.key})`),t&&Fn&&(t.textContent=`${Fn.name} (${Fn.key})`),n&&Pi&&(n.textContent=`${Pi.identifier} - ${Pi.title}`)}}]}function Hd(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function br(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function yr(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Un(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Uv(){const e=vr?Hd():Od();_t<e.length-1&&(_t++,qi())}function Gv(){qd(),Ud(),Oi()}function zv(){qd(),Ud(),Oi()}async function Vv(e){e.preventDefault(),yr("onboarding-team-error"),Un("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Hn=await h.createTeam({name:t,key:n}),_t++,qi()}catch(i){br("onboarding-team-error",i.message||"Failed to create team"),Un("onboarding-team-submit",!1)}}async function Wv(e){e.preventDefault(),yr("onboarding-project-error"),Un("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Fn=await h.createProject(Hn.id,{name:t,key:n}),_t++,qi()}catch(i){br("onboarding-project-error",i.message||"Failed to create project"),Un("onboarding-project-submit",!1)}}async function Kv(e){e.preventDefault(),yr("onboarding-issue-error"),Un("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Pi=await h.createIssue(Fn.id,{title:t}),_t++,qi()}catch(n){br("onboarding-issue-error",n.message||"Failed to create issue"),Un("onboarding-issue-submit",!1)}}function Fd(e=!1){vr=e,_t=0,Hn=null,Fn=null,Pi=null,Fv(),qi()}function Ud(){ct&&(ct.remove(),ct=null)}function Gd(){Up(),Fd(!0)}Q({"onboarding-next":e=>{e.preventDefault(),Uv()},"onboarding-skip":e=>{e.preventDefault(),Gv()},"onboarding-finish":e=>{e.preventDefault(),zv()},"onboarding-create-team":e=>{Vv(e)},"onboarding-create-project":e=>{Wv(e)},"onboarding-create-issue":e=>{Kv(e)}});const zd="/oauth/consent/";function Yv(e){if(!e||!e.startsWith(zd))return null;const t=e.slice(zd.length);return/^[A-Za-z0-9_-]{16,64}$/.test(t)?t:null}function Zv(e){let t;try{t=new URL(e).protocol}catch{return!1}return e.startsWith(t)?t==="https:"||t==="http:"?!0:/^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(t):!1}function Xv(){let e=document.getElementById("oauth-consent-screen");return e||(e=document.createElement("div"),e.id="oauth-consent-screen",e.className="screen",(document.getElementById("app")||document.body).appendChild(e)),e}function Qv(e){document.querySelectorAll(".screen").forEach(t=>t.classList.add("hidden")),e.classList.remove("hidden")}const Vd={builtin:"Official Chaotic app",recognized:"Recognized app",cimd:"Identified by its website",unverified:"Unverified app (registered itself)"};function ra(e){const t=Vd[e.trust]||Vd.unverified,n=e.host?` · ${m(e.host)}`:"";return`<span class="oauth-badge oauth-badge-${p(e.trust)}">${m(t)}${n}</span>`}function Wd(e,t){return e.teams.map(n=>`<option value="${p(n.id)}"${n.id===t?" selected":""}>${m(n.name)}</option>`).join("")}function Jv(e,t){const n=e&&t?e.agents.find(a=>a.id===t):null;if(!n)return"";const i=n.owned_by_viewer?"Your agent":`${m(n.owner_name||"Another member")}'s agent`,s=n.active_api_keys?` It also has ${n.active_api_keys} active API key${n.active_api_keys===1?"":"s"}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`:"";return`${i}.${s}`}function Kd(e,t){const n=['<option value="">Create a new agent</option>'];for(const i of e?e.agents:[]){const s=i.id===t?" selected":"",a=i.owned_by_viewer||!i.owner_name?"":` (${i.owner_name}'s)`;n.push(`<option value="${p(i.id)}"${s}>${m(i.name+a)}</option>`)}return n.join("")}function Yd(e){return!e||e.projects.length===0?'<p class="oauth-muted">This team has no projects yet.</p>':e.projects.map(t=>`
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${p(t.id)}">
            ${m(t.name)} <span class="oauth-muted">${m(t.key)}</span>
        </label>`).join("")}function eb(e){return e.policies.map(t=>{const n=t.available&&t.requested,i=t.available?t.requested?"":" (not requested by the app)":" (coming soon)";return`
        <label class="oauth-check${n?"":" oauth-disabled"}">
            <input type="radio" name="oauth-policy" value="${p(t.name)}"
                ${n?"":"disabled"} ${t.name==="write"&&n?"checked":""}>
            ${m(t.name)}${m(i)}
        </label>`}).join("")}function tb(e,t){const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=m(t.client.name),s=t.teams.length===0,a=t.offline_access?`<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${t.refresh_idle_days} days, for at most ${t.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`:"";e.innerHTML=`
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${i}</span> as you?</h1>
            <p>${ra(t.client)}</p>
            <p>The app will act as <strong>you</strong>: it can read your inbox and do what you can do in
                every team you belong to, such as approving gates, commenting and changing status.
                It can't create API keys or change your account.</p>
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Start in team</legend>
                    <select id="oauth-team" ${s?"disabled":""}>${Wd(t,n)}</select>
                    ${s?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                    <p class="oauth-muted">Leaving this team signs the device out.</p>
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Cancel</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${s?"disabled":""}>
                        Sign in</button>
                </div>
            </form>
        </div>`}function nb(e,t){if(t.acts_as==="person"){tb(e,t);return}const n=t.suggested_team_id||t.teams[0]&&t.teams[0].id||"",i=t.teams.find(c=>c.id===n),s=m(t.client.name),a=t.offline_access?`<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${t.refresh_idle_days} days, for at most
             ${t.refresh_absolute_days} days. You can disconnect it at any time.</p>`:"",o=t.loopback_redirect?`<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${m(t.redirect_host)}). Approve only if you just started connecting an app here.</p>`:"",r=t.teams.length===0;e.innerHTML=`
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${s}</span> to Chaotic?</h1>
            <p>${ra(t.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${m(t.redirect_host)}</strong></p>
            ${o}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${r?"disabled":""}>${Wd(t,n)}</select>
                    ${r?'<p class="oauth-warning">You need to belong to a team first.</p>':""}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${Kd(i,t.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${p(t.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${Yd(i)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${eb(t)}
                </fieldset>
                ${a}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${r?"disabled":""}>
                        Approve</button>
                </div>
            </form>
        </div>`,wr(e,t)}function wr(e,t){var a;const n=e.querySelector("#oauth-agent"),i=e.querySelector("#oauth-agent-name");n&&i&&i.classList.toggle("hidden",n.value!=="");const s=e.querySelector("#oauth-agent-info");if(s&&n&&t){const o=(a=e.querySelector("#oauth-team"))==null?void 0:a.value,r=Jv(t.teams.find(c=>c.id===o),n.value);s.innerHTML=r,s.classList.toggle("hidden",r==="")}}function ib(e){const t=e.querySelector("#oauth-agent");if(!t)return{team_id:e.querySelector("#oauth-team").value,policy:"write"};const n=t.value||null,i=[...e.querySelectorAll('input[name="oauth-project"]:checked')].map(o=>o.value),s=e.querySelector('input[name="oauth-policy"]:checked'),a={team_id:e.querySelector("#oauth-team").value,agent_id:n,project_ids:i.length?i:null,policy:s?s.value:"write"};if(!n){const o=e.querySelector("#oauth-agent-name").value.trim();o&&(a.agent_name=o)}return a}function sb(e,t){const n=e.querySelector("#oauth-error");n&&(n.textContent=t,n.classList.remove("hidden"))}function Ni(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${m(t)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`}function ab(e,t){e.innerHTML=`
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`,e.querySelector("#oauth-sign-in-again").addEventListener("click",()=>{h.logout(),t()})}function ob(e,t,n,i){var r,c,d;const s=e.querySelector("#oauth-team");s==null||s.addEventListener("change",()=>{if(!e.querySelector("#oauth-agent"))return;const l=n.teams.find(u=>u.id===s.value);e.querySelector("#oauth-agent").innerHTML=Kd(l,null),e.querySelector("#oauth-projects").innerHTML=Yd(l),wr(e,n)}),(r=e.querySelector("#oauth-agent"))==null||r.addEventListener("change",()=>wr(e,n));let a=!1;const o=async l=>{if(!a){a=!0;try{const u=l?await h.approveOAuthRequest(t,ib(e)):await h.denyOAuthRequest(t);if(!Zv(u.redirect)){Ni(e,"The app's return address isn't one a browser should be sent to.");return}i(u.redirect)}catch(u){if(a=!1,u&&u.status===404){Ni(e,"It has expired, was already answered, or belongs to someone else.");return}sb(e,u&&u.message||"Something went wrong")}}};(c=e.querySelector("#oauth-consent-form"))==null||c.addEventListener("submit",l=>{l.preventDefault(),o(!0)}),(d=e.querySelector("#oauth-deny"))==null||d.addEventListener("click",()=>o(!1))}async function rb(e,t=i=>window.location.assign(i),n=()=>window.location.reload()){const i=Xv();Qv(i),i.innerHTML='<div class="oauth-consent"><p>Loading…</p></div>';let s;try{s=await h.getOAuthRequest(e)}catch(a){a&&a.status===404?Ni(i,"It has expired, was already answered, or belongs to someone else."):a&&a.status===403&&a.detail&&a.detail.error_code==="web_login_required"?ab(i,n):a&&a.status===403?Ni(i,"Only a person signed in to Chaotic can approve an app."):Ni(i,a&&a.message||"Something went wrong");return}nb(i,s),ob(i,e,s,t)}async function Oi(){const e=Yv(window.location.pathname);if(e){await rb(e);return}lb(),fb(),await cr();const t=Sv();if(t.length===0&&!Hv()){Fd();return}t.length>0&&await dr(t[0],!0)}let Gn=null,Hi=null,Xe=null,Qe=null;function Fi(){Gn||(Gn=document.getElementById("auth-screen"),Hi=document.getElementById("main-screen"),Xe=document.getElementById("login-form"),Qe=document.getElementById("signup-form"))}function Ui(){Fi(),Gn&&Gn.classList.remove("hidden"),Hi&&Hi.classList.add("hidden")}function lb(){Fi(),Gn&&Gn.classList.add("hidden"),Hi&&Hi.classList.remove("hidden")}function cb(){Fi(),Xe&&Xe.classList.remove("hidden"),Qe&&Qe.classList.add("hidden")}function db(){Fi(),Xe&&Xe.classList.add("hidden"),Qe&&Qe.classList.remove("hidden")}async function ub(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await h.login(t,n),pi(await h.getMe()),await Oi(),k("Welcome back!","success")}catch(i){$("log in",i)}return!1}async function pb(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,i=document.getElementById("signup-password").value;try{await h.signup(t,n,i),await h.login(n,i),pi(await h.getMe()),await Oi(),k("Account created successfully!","success")}catch(s){$("sign up",s)}return!1}function Zd(){h.logout(),pi(null),bs(null),Ui(),k("Signed out","success")}function mb(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function fb(){var i;const e=Vt();if(!e)return;const t=document.getElementById("user-name");if(t){t.textContent=e.name;const s=(i=t.parentElement)==null?void 0:i.querySelector(".badge-agent");s&&s.remove(),e.is_agent&&t.insertAdjacentHTML("afterend",Va(!0))}const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?mb(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function gb(){Fi();const e=Xe==null?void 0:Xe.querySelector("form");e&&e.addEventListener("submit",s=>ub(s));const t=Qe==null?void 0:Qe.querySelector("form");t&&t.addEventListener("submit",s=>pb(s));const n=Xe==null?void 0:Xe.querySelector(".auth-switch a");n&&n.addEventListener("click",s=>{s.preventDefault(),db()});const i=Qe==null?void 0:Qe.querySelector(".auth-switch a");i&&i.addEventListener("click",s=>{s.preventDefault(),cb()})}let kr=[];async function $r(){try{kr=await h.getApiKeys(),hb()}catch(e){$("load API keys",e)}}function hb(){const e=document.getElementById("api-keys-list");if(e){if(kr.length===0){e.innerHTML=P({icon:M.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=kr.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${m(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${m(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${bt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${bt(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function vb(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,H()}async function bb(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await h.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,H()}catch(n){$("create API key",n)}return!1}async function yb(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function wb(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await h.revokeApiKey(e),k("API key revoked","success"),await $r()}catch(n){$("revoke API key",n)}}Q({"create-api-key":e=>{bb(e)},"copy-api-key":()=>{yb()},"dismiss-api-key-modal":()=>{O(),$r()},"revoke-api-key":(e,t)=>{wb(t.keyId,t.keyName)}});let Er=[];async function Xd(){try{Er=await h.getConnections(),$b()}catch(e){$("load connected apps",e)}}function xr(e){const t=e.client||{};return t.name||t.client_id||"Unknown app"}function kb(e){const t=e.team_name||"a team";if(e.project_ids===null||e.project_ids===void 0)return`all of ${t}`;const n=e.project_ids.length;return`${n} project${n===1?"":"s"} in ${t}`}function $b(){const e=document.getElementById("connected-apps-list");if(e){if(Er.length===0){e.innerHTML=P({icon:M.dashboard,heading:"No connected apps",description:"Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here."});return}e.innerHTML=Er.map(t=>t.acts_as==="person"?Eb(t):`
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(xr(t))} ${ra(t.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as ${m(t.agent?t.agent.name:"an agent")}</span>
                    <span>${m(kb(t))}</span>
                    <span>policy ${m(t.policy)}</span>
                    <span class="api-key-date">Connected ${bt(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${bt(t.last_used_at)}</span>`:""}
                </div>
                ${t.client&&t.client.client_id!==t.client.name?`<div class="api-key-meta"><code>${m(t.client.client_id)}</code></div>`:""}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(t.id)}" data-connection-name="${p(xr(t))}">Disconnect</button>
        </div>
    `).join("")}}function Eb(e){const n=`${e.device_name||"A device"} · ${xr(e)}`;return`
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${m(n)} ${ra(e.client||{trust:"unverified"})}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>started in ${m(e.team_name||"a team")}</span>
                    <span class="api-key-date">Signed in ${bt(e.created_at)}</span>
                    ${e.last_used_at?`<span class="api-key-date">Last used ${bt(e.last_used_at)}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${p(e.id)}" data-connection-name="${p(n)}">Sign out</button>
        </div>
    `}async function xb(e,t){if(confirm(`Disconnect "${t}"? It stops working on its next request and has to be approved again to reconnect.`))try{await h.revokeConnection(e),k("App disconnected","success"),await Xd()}catch(n){$("disconnect app",n)}}Q({"revoke-connection":(e,t)=>{xb(t.connectionId,t.connectionName)}});let _r=[];async function Qd(){try{_r=await h.getPushDevices(),_b()}catch(e){$("load push devices",e)}}const Jd={expired:"Paused: its sign-in expired. Open the app to resume.",needs_reregistration:"Paused: the server key changed. Open the app to resume."};function eu(e){return e.label||e.platform||"Unnamed device"}function _b(){const e=document.getElementById("push-devices-list");if(e){if(_r.length===0){e.innerHTML=P({icon:M.dashboard,heading:"No devices",description:"Phones you turn on notifications for in the Chaotic app appear here."});return}e.innerHTML=_r.map(t=>`
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${m(eu(t))}</div>
                <div class="api-key-meta">
                    ${t.platform&&t.label?`<span>${m(t.platform)}</span>`:""}
                    <span>via ${m(t.endpoint_host)}</span>
                    <span class="api-key-date">Added ${bt(t.created_at)}</span>
                    ${t.last_success_at?`<span class="api-key-date">Last notified ${bt(t.last_success_at)}</span>`:""}
                    ${t.failure_count?`<span>${m(String(t.failure_count))} failed deliveries</span>`:""}
                    ${Jd[t.status]?`<span class="push-device-status">${m(Jd[t.status])}</span>`:""}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${p(t.installation_id)}" data-device-name="${p(eu(t))}">Remove</button>
        </div>
    `).join("")}}async function Ib(e,t){if(confirm(`Stop sending notifications to "${t}"? The app registers again the next time it starts while signed in.`))try{await h.deletePushDevice(e),k("Device removed","success"),await Qd()}catch(n){$("remove push device",n)}}Q({"remove-push-device":(e,t)=>{Ib(t.installationId,t.deviceName)}});let la=!1,It=0,qt=[],ca=[];function Sb(e){ca=e,qt=[...e]}function en(){return la}function Tb(){if(la)return;la=!0,It=0,qt=[...ca];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&da()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Lb(n.target.value)),t.addEventListener("keydown",Ab),e.addEventListener("mouseover",n=>{const i=n.target.closest('[data-action="execute-command"]');i&&Cb(Number(i.dataset.commandIndex))}),Gi(),requestAnimationFrame(()=>t.focus())}function da(){la=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Lb(e){const t=e.toLowerCase().trim();t?qt=ca.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):qt=[...ca],It=0,Gi()}function Gi(){const e=document.getElementById("command-results");if(!e)return;if(qt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};qt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",i=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${i===It?"selected":""}"
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
            `,i++;n+="</div>"}e.innerHTML=n;const s=e.querySelector(".command-item.selected");s&&s.scrollIntoView&&s.scrollIntoView({block:"nearest"})}function Cb(e){It=e,Gi()}function tu(e){const t=qt[e];t&&(da(),t.action())}function Ab(e){switch(e.key){case"ArrowDown":e.preventDefault(),It=Math.min(It+1,qt.length-1),Gi();break;case"ArrowUp":e.preventDefault(),It=Math.max(It-1,0),Gi();break;case"Enter":e.preventDefault(),tu(It);break;case"Escape":e.preventDefault(),da();break}}Q({"execute-command":(e,t)=>{tu(Number(t.commandIndex))}});const Bb=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g w",description:"Inbox"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"Inbox",shortcuts:[{key:"j / k",description:"Navigate entries"},{key:"Enter",description:"Open selected entry (marks it read)"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function Db(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${m(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${m(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function jb(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${m(e.title)}</h4>
        ${e.shortcuts.map(Db).join("")}
    </div>`}function nu(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${Bb.map(jb).join("")}
        </div>
    `,H()}let ua=[];function Mb(){return ua}it(e=>{e==="currentProject"&&C()==="epics"&&Nt()});let pa=0;async function Nt(){var n;Ol(-1);const e=document.getElementById("epics-list");if(!e)return;const t=++pa;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=L())!=null&&n.id)){ua=[],e.innerHTML=P({icon:M.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const i=z();let s;if(i?s=await h.getIssues({project_id:i,issue_type:"epic"}):s=await h.getTeamIssues(L().id,{issue_type:"epic"}),t!==pa)return;if(!s||s.length===0){ua=[],e.innerHTML=P({icon:M.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(s.map(async o=>{let r=[];try{r=await h.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==pa)return;ua=a,Rb(a,e)}catch(i){if(t!==pa)return;e.innerHTML=P({icon:M.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),$("load epics",i)}}function Rb(e,t){const n=e.map(i=>{const s=i.subIssues?i.subIssues.length:0,a=i.subIssues?i.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=s>0?Math.round(a/s*100):0,r=s>0?`${a}/${s}`:"-",c=`status-${(i.status||"backlog").replace(/_/g,"-")}`,d=(i.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),l=i.estimate!=null?`${i.estimate}pts`:"-";return`
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
                <td class="epic-estimate">${l}</td>
                <td class="epic-status"><span class="status-badge ${c}">${d}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=i=>{const s=i.target.closest(".epic-row");s&&s.dataset.identifier&&$d(s.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function Pb(){const e=z(),t=ne().map(n=>`
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
    `,H(),document.getElementById("create-epic-form").addEventListener("submit",qb),document.getElementById("create-epic-title").focus()}async function qb(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),i=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const s=await h.createIssue(t,{title:n,description:i||null,issue_type:"epic"});O(),k(`Created epic ${s.identifier}`,"success"),Nt()}catch(s){$("create epic",s)}}async function iu(e){try{let t;if(e.includes("-")?t=await h.getIssueByIdentifier(e):t=await h.getIssue(e),t){if(t.issue_type!=="epic"){J(t.id,!1);return}await Ir(t.id,!1)}else R("epics",!1)}catch{R("epics",!1)}}async function Ir(e,t=!0){try{t&&Xt();const[n,i,s,a]=await Promise.all([h.getIssue(e),h.getSubIssues(e),h.getActivities(e),h.getComments(e)]);if(n.issue_type!=="epic"){J(e,t);return}t&&history.pushState({epicId:e,view:C()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=C()||"epics",c=ne().find(x=>x.id===n.project_id),d=n.assignee_id?mn(n.assignee_id):null,l=d?Wt(d):null,u=i.length,f=i.filter(x=>x.status==="done"||x.status==="canceled").length,y=u>0?Math.round(f/u*100):0,b=Mb(),w=b.findIndex(x=>x.id===n.id),_=w>0?b[w-1]:null,I=w>=0&&w<b.length-1?b[w+1]:null,D=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${D?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${p(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${b.length}</span>
                            <button class="issue-nav-btn" ${I?`data-action="navigate-epic" data-epic-id="${p(I.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${c?m(c.name):"Project"} › ${m(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${m(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${In(n.description)}
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
                            ${i.length===0?P({icon:M.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):i.map(x=>{const j=x.assignee_id?mn(x.assignee_id):null,S=j?Wt(j):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(x.id)}" data-identifier="${p(x.identifier)}">
                                    <span class="sub-issue-status">${Le(x.status)}</span>
                                    <span class="sub-issue-id">${m(x.identifier)}</span>
                                    <span class="sub-issue-title">${m(x.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(x.status||"backlog").replace(/_/g,"-")}">${_e(x.status)}</span>
                                    ${S?`<span class="sub-issue-assignee">${m(S)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${s.length===0?P({icon:M.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):s.map(x=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${bo(x.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${wo(x)}</span>
                                        <span class="activity-actor">by ${m(yo(x))}</span>
                                        <span class="activity-time">${He(x.created_at)}</span>
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
                                            <span class="comment-date">${He(x.created_at)}</span>
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
                                ${Le(n.status)}
                                ${_e(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${ot(n.priority)}
                                ${je(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?m(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${Qs(n.estimate,n.project_id)}
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

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${m(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const B=o.querySelector(".sub-issues-list");B&&B.addEventListener("click",x=>{const j=x.target.closest(".sub-issue-item");j&&j.dataset.issueId&&J(j.dataset.issueId)})}catch(n){$("load epic",n)}}Q({"navigate-epic":(e,t)=>{Ir(t.epicId)}});function Nb(e){let t=!1,n=null;return function(s){var o,r,c,d,l,u;if(s.metaKey||s.ctrlKey||s.altKey||s.isComposing)return;if(s.key==="Escape"&&((o=e.isInlineDropdownOpen)!=null&&o.call(e))){s.preventDefault(),e.closeInlineDropdowns();return}if(s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"){s.key==="Escape"&&(e.isModalOpen()&&e.isModalDirty&&!e.isModalDirty()?(s.preventDefault(),e.closeModal()):s.target.blur());return}const a=e.isModalOpen();if(s.key==="Escape"){s.preventDefault(),a?(r=e.isModalDirty)!=null&&r.call(e)?(c=e.focusModalField)==null||c.call(e):e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(s.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(d=e.isDetailViewActive)!=null&&d.call(e)&&["p","s","t","e","a","d"].includes(s.key))return;switch(s.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case"w":e.navigateTo("inbox");break;case",":e.navigateTo("settings");break}return}switch(s.key){case"c":if((l=e.isDetailViewActive)!=null&&l.call(e))break;s.preventDefault(),e.showCreateIssueModal();break;case"m":s.preventDefault(),e.navigateTo("my-issues");break;case"i":s.preventDefault(),e.navigateTo("issues");break;case"b":s.preventDefault(),e.navigateTo("board");break;case"p":if((u=e.isDetailViewActive)!=null&&u.call(e))break;s.preventDefault(),e.navigateTo("projects");break;case"?":s.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":s.preventDefault(),e.focusSearch();break}}}}function Ob(e){return function(n){var i;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const s=e.getModalForm();if(s)n.preventDefault(),s.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const s=(i=document.activeElement)==null?void 0:i.closest("form");s&&(n.preventDefault(),s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function St(e,t,n="#issues-list .issue-row"){const i=document.querySelectorAll(n);i.length!==0&&(e=Math.max(0,Math.min(i.length-1,e)),i.forEach(s=>s.classList.remove("keyboard-selected")),t(e),i[e].classList.add("keyboard-selected"),i[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function Hb(e){const t="#issues-list .issue-row";function n(s){return s<0?null:document.querySelectorAll(t)[s]||null}function i(s,a,o,r){const c=n(a);if(!c)return;const d=c.dataset.issueId;if(!d||d.startsWith("temp-"))return;s.preventDefault(),s.stopImmediatePropagation();const l=c.querySelector(`.${r}`);l&&e.showInlineDropdown&&e.showInlineDropdown(s,o,d,l)}return function(a){var c,d,l,u;if(e.getCurrentView()!=="issues"||(c=e.isDetailViewActive)!=null&&c.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(l=(d=a.target).closest)!=null&&l.call(d,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||(u=e.isInlineDropdownOpen)!=null&&u.call(e))return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),St(r+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":a.preventDefault(),St(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const f=o[r].dataset.issueId;f&&!f.startsWith("temp-")&&e.viewIssue(f)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const f=o[r].dataset.issueId;f&&!f.startsWith("temp-")&&e.showEditIssueModal(f)}break;case"s":i(a,r,"status","status-btn");break;case"p":i(a,r,"priority","priority-btn");break;case"a":i(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(f=>f.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Fb(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(i){var o,r,c;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(r=i.target).closest)!=null&&c.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),St(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),St(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const d=s[a].dataset.documentId;d&&e.viewDocument(d)}break;case"e":if(a>=0&&s[a]){i.preventDefault();const d=s[a].dataset.documentId;d&&e.showEditDocumentModal&&e.showEditDocumentModal(d)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(d=>d.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function zn(){return["issue-detail-view","epic-detail-view","document-detail-view","sprint-detail-view"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")})}function Ub(e){const t="#inbox-list .inbox-row";return function(i){var r,c,d,l,u,f,y,b;if(e.getCurrentView()!=="inbox"||(r=e.isDetailViewActive)!=null&&r.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(d=(c=i.target).closest)!=null&&d.call(c,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen()||i.isComposing||(l=e.isInlineDropdownOpen)!=null&&l.call(e))return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex(),o=w=>{var I,D,B,x;const _=!!((D=(I=document.activeElement)==null?void 0:I.closest)!=null&&D.call(I,"#inbox-list"));if((B=e.collapseInboxExpand)==null||B.call(e),St(a+w,e.setSelectedIndex,t),_){const j=document.querySelector(`${t}.keyboard-selected`);(x=(j==null?void 0:j.querySelector(".inbox-row-toggle"))||j)==null||x.focus({preventScroll:!0})}};switch(i.key){case"j":case"ArrowDown":i.preventDefault(),o(1);break;case"k":case"ArrowUp":i.preventDefault(),o(-1);break;case"Enter":if((f=(u=i.target).closest)!=null&&f.call(u,"#inbox-list")&&i.target.closest('a[href], button, summary, [contenteditable]:not([contenteditable="false"])'))break;a>=0&&s[a]&&(i.preventDefault(),e.toggleInboxExpand(s[a]));break;case"e":a>=0&&s[a]&&e.archiveInboxEntry&&(i.preventDefault(),e.archiveInboxEntry(s[a]));break;case"Escape":if((y=e.isEscapeLayerAbove)!=null&&y.call(e))break;if((b=e.collapseInboxExpand)!=null&&b.call(e)){i.preventDefault(),i.stopImmediatePropagation();break}a>=0&&(i.preventDefault(),i.stopImmediatePropagation(),s.forEach(w=>w.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function Gb(e){const t="#kanban-board .kanban-card";return function(i){var o,r,c;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"||(c=(r=i.target).closest)!=null&&c.call(r,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll(t);if(s.length===0)return;const a=e.getSelectedIndex();switch(i.key){case"j":case"ArrowDown":i.preventDefault(),St(a+1,e.setSelectedIndex,t);break;case"k":case"ArrowUp":i.preventDefault(),St(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&s[a]){i.preventDefault();const d=s[a].dataset.id;d&&e.viewIssue(d)}break;case"Escape":a>=0&&(i.preventDefault(),s.forEach(d=>d.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function zb(){const e=".sidebar-nav .nav-item";return function(n){const i=document.activeElement;if(!i||!i.classList.contains("nav-item"))return;const s=Array.from(document.querySelectorAll(e)),a=s.indexOf(i);if(a===-1)return;let o;switch(n.key){case"ArrowDown":o=s[Math.min(s.length-1,a+1)];break;case"ArrowUp":o=s[Math.max(0,a-1)];break;case"Home":o=s[0];break;case"End":o=s[s.length-1];break;default:return}o&&(n.preventDefault(),o.focus())}}function su(e){const{view:t,selector:n,open:i}=e;return function(a){var c,d,l;if(e.getCurrentView()!==t||(c=e.isDetailViewActive)!=null&&c.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||(l=(d=a.target).closest)!=null&&l.call(d,".sidebar-nav")||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(n);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":case"ArrowDown":a.preventDefault(),St(r+1,e.setSelectedIndex,n);break;case"k":case"ArrowUp":a.preventDefault(),St(r-1,e.setSelectedIndex,n);break;case"Enter":r>=0&&o[r]&&(a.preventDefault(),i(o[r]));break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(u=>u.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const Vb={document:{listLabel:"Document history",bodyField:"content",fetchList:e=>h.getDocumentRevisions(e),fetchOne:(e,t)=>h.getDocumentRevision(e,t)},issue:{listLabel:"Description history",bodyField:"description",fetchList:e=>h.getIssueDescriptionRevisions(e),fetchOne:(e,t)=>h.getIssueDescriptionRevision(e,t)}};let N=null,Ot=0;async function au(e,t){var a,o;const n=Vb[e];if(!n){$("open revision history",new Error(`Unknown entity type: ${e}`));return}const i=++Ot;N=null;let s;try{s=await n.fetchList(t)}catch(r){$("load revision history",r);return}if(i===Ot){if(N={token:i,entityType:e,entityId:t,adapter:n,revisions:s,cache:new Map,mode:"view",viewVersion:((a=s[0])==null?void 0:a.version)??null,compareFromVersion:null,compareToVersion:null},N.viewVersion!=null)try{const r=await n.fetchOne(t,N.viewVersion);if(i!==Ot)return;N.cache.set(N.viewVersion,r)}catch(r){i===Ot&&$("load revision",r)}document.getElementById("modal-title").textContent=n.listLabel,(o=document.querySelector(".modal"))==null||o.classList.add("modal-wide"),ma(),H()}}function ma(){const e=document.getElementById("modal-content");if(!e||!N)return;if(N.revisions.length===0){e.innerHTML='<p class="text-muted">No revisions yet.</p>';return}const t=Wb(),n=N.mode==="compare"?Yb():Kb();e.innerHTML=`
    <div class="revision-viewer">
      <aside class="revision-list">${t}</aside>
      <div class="revision-panel">${n}</div>
    </div>
  `}function Wb(){const e=N.revisions.map(n=>{const i=N.mode==="view"?n.version===N.viewVersion:n.version===N.compareFromVersion||n.version===N.compareToVersion,s=N.mode==="compare"?n.version===N.compareFromVersion?' <span class="rev-tag">from</span>':n.version===N.compareToVersion?' <span class="rev-tag">to</span>':"":"";return`
      <button
        class="revision-list-item${i?" is-selected":""}"
        data-action="select-revision-version"
        data-version="${n.version}"
      >
        <div class="revision-version">v${n.version}${s}</div>
        <div class="revision-meta">
          <span class="revision-author">${m(n.author_name||"Unknown")} ${dn(n.author)}</span>
          <span class="revision-time">${He(n.created_at)}</span>
        </div>
      </button>
    `}).join("");return`
    <div class="revision-list-header">
      <button class="btn btn-secondary btn-tiny" data-action="toggle-revision-compare">
        ${N.mode==="compare"?"Exit compare":"Compare versions"}
      </button>
    </div>
    <div class="revision-list-items">${e}</div>
  `}function Kb(){const e=N.viewVersion;if(e==null)return'<p class="text-muted">Pick a version.</p>';const t=N.cache.get(e);if(!t)return'<p class="text-muted">Loading…</p>';const n=t.title?`<h3 class="revision-snapshot-title">${m(t.title)}</h3>`:"",i=t[N.adapter.bodyField]||"",s=i?`<div class="markdown-body">${Ze(i)}</div>`:'<p class="text-muted">(empty)</p>';return`
    <div class="revision-panel-header">
      <div>
        <strong>v${t.version}</strong>
        <span class="text-muted"> &middot; ${m(t.author_name||"Unknown")} &middot; ${He(t.created_at)}</span>
      </div>
    </div>
    ${n}
    ${s}
  `}function Yb(){const e=N.compareFromVersion,t=N.compareToVersion;if(e==null||t==null)return`
      <p class="text-muted">
        Pick two versions in the sidebar to compare.
        ${e!=null?`<br>From: v${e}`:""}
        ${t!=null?`<br>To: v${t}`:""}
      </p>
    `;const n=N.cache.get(e),i=N.cache.get(t);if(!n||!i)return'<p class="text-muted">Loading…</p>';const s=n[N.adapter.bodyField]||"",a=i[N.adapter.bodyField]||"",o=Zb(s,a);let r="";return"title"in n&&n.title!==i.title&&(r=`
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
  `}function Zb(e,t){const n=e.split(`
`),i=t.split(`
`),s=Xb(n,i);return s.every(o=>o.type==="equal")?'<p class="text-muted">No changes.</p>':`<div class="revision-diff">${s.map(o=>o.type==="equal"?o.lines.map(r=>`<div class="diff-line diff-context">${m(r)||"&nbsp;"}</div>`).join(""):o.type==="add"?o.lines.map(r=>`<div class="diff-line diff-add">+ ${m(r)||"&nbsp;"}</div>`).join(""):o.type==="del"?o.lines.map(r=>`<div class="diff-line diff-del">- ${m(r)||"&nbsp;"}</div>`).join(""):"").join("")}</div>`}function Xb(e,t){const n=e.length,i=t.length,s=Array(n+1).fill(null).map(()=>new Int32Array(i+1));for(let c=n-1;c>=0;c--)for(let d=i-1;d>=0;d--)e[c]===t[d]?s[c][d]=s[c+1][d+1]+1:s[c][d]=Math.max(s[c+1][d],s[c][d+1]);const a=[];let o=0,r=0;for(;o<n&&r<i;)e[o]===t[r]?(zi(a,"equal",e[o]),o++,r++):s[o+1][r]>=s[o][r+1]?(zi(a,"del",e[o]),o++):(zi(a,"add",t[r]),r++);for(;o<n;)zi(a,"del",e[o++]);for(;r<i;)zi(a,"add",t[r++]);return a}function zi(e,t,n){const i=e[e.length-1];i&&i.type===t?i.lines.push(n):e.push({type:t,lines:[n]})}async function Qb(e){if(!N)return;const t=N.token,n=N;if(!n.cache.has(e))try{const i=await n.adapter.fetchOne(n.entityId,e);if(N!==n||Ot!==t)return;n.cache.set(e,i)}catch(i){N===n&&Ot===t&&$("load revision",i);return}n.mode==="view"?n.viewVersion=e:n.compareFromVersion==null?n.compareFromVersion=e:n.compareToVersion==null&&e!==n.compareFromVersion?e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):n.compareToVersion=e:e<n.compareFromVersion?(n.compareToVersion=n.compareFromVersion,n.compareFromVersion=e):e!==n.compareFromVersion&&(n.compareToVersion=e),ma()}function Jb(){if(!N)return;const e=N.token,t=N;if(t.mode==="view"){t.mode="compare";const n=t.viewVersion,i=t.revisions.findIndex(o=>o.version===n);if(i>=0&&i+1<t.revisions.length){const o=t.revisions[i+1].version;t.compareFromVersion=o,t.compareToVersion=n}else t.compareFromVersion=n,t.compareToVersion=null;let s=null;const a=[t.compareFromVersion,t.compareToVersion].filter(o=>o!=null&&!t.cache.has(o));Promise.all(a.map(o=>t.adapter.fetchOne(t.entityId,o).then(r=>{N===t&&Ot===e&&t.cache.set(o,r)}).catch(r=>{s||(s=r)}))).then(()=>{N!==t||Ot!==e||(s&&$("load revisions to compare",s),ma())})}else t.mode="view",t.compareFromVersion=null,t.compareToVersion=null;ma()}Q({"show-document-revisions":(e,t)=>{au("document",t.documentId)},"show-issue-description-revisions":(e,t)=>{au("issue",t.issueId)},"select-revision-version":(e,t)=>{Qb(Number(t.version))},"toggle-revision-compare":()=>{Jb()},"close-revision-viewer":()=>{N=null,O()}});const ey=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let tn=[],fa=null,Sr=0;it(e=>{e==="currentProject"&&C()==="board"&&Vi()});async function Vi(){gs(-1);const e=++Sr,t=z();if(!t){const i=document.getElementById("kanban-board");i&&(i.innerHTML=ne().length===0?P({icon:M.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):P({icon:M.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const i=await h.getIssues({project_id:t});if(e!==Sr)return;tn=i,C()==="board"&&un(tn),Wi()}catch(i){if(e!==Sr)return;n&&(n.innerHTML=P({icon:M.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),$("load board",i)}}const Tr=om(()=>Vi(),200);function Wi(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=ey.map(i=>{const s=tn.filter(a=>a.status===i.key);return`
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
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${je(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),ty(t)}function ty(e){const t=ql();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){gs(-1);return}let i=e?Array.prototype.findIndex.call(n,s=>s.dataset.id===e):-1;i<0&&(i=Math.min(t,n.length-1)),gs(i),n[i].classList.add("keyboard-selected")}function ny(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),fa=t.dataset.id,t.classList.add("dragging")}function iy(e,t){t.classList.remove("dragging"),fa=null}function ou(e){const t=tn.find(n=>n.id===fa);return!!t&&t.status===e}function sy(e,t){e.preventDefault(),!ou(t.dataset.status)&&t.classList.add("drag-over")}function ay(e,t){t.classList.remove("drag-over")}function oy(e,t){e.preventDefault();const n=tn.find(i=>i.id===t.dataset.id);n&&ou(n.status)||t.classList.add("drag-over")}function ry(e,t){t.classList.remove("drag-over")}async function ly(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),i=t.dataset.status,s=tn.find(o=>o.id===n);if(!s)return;const a=s.status;if(a!==i){s.status=i,Wi();try{await h.updateIssue(n,{status:i}),k("Status updated","success")}catch(o){s.status=a,Wi(),$("update status",o)}}}async function cy(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=fa||e.dataTransfer.getData("text/plain"),i=t.dataset.id;if(!n||!i||n===i)return;const s=t.closest(".kanban-column"),a=s==null?void 0:s.dataset.status;if(!a)return;const o=tn.find(c=>c.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Wi();try{await h.updateIssue(n,{status:a}),k("Status updated","success")}catch(c){o.status=r,Wi(),$("update status",c)}}}Q({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),J(t.id)):e.type==="dragstart"?ny(e,n):e.type==="dragend"?iy(e,n):e.type==="dragover"?oy(e,n):e.type==="dragleave"?ry(e,n):e.type==="drop"&&cy(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?sy(e,n):e.type==="dragleave"?ay(e,n):e.type==="drop"&&ly(e,n)},"retry-load-board":()=>Vi()});const Ht=new Map,ru=6e4,Lr=100;let ve=null,ga=null,ha=null,Ki=null,lu=!1;const dy={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},uy={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},cu={api:null};let Cr={...cu};function py(e={}){Cr={...cu,...e},ve||(ve=document.createElement("div"),ve.className="issue-tooltip",ve.style.display="none",document.body.appendChild(ve),ve.addEventListener("mouseenter",()=>{clearTimeout(ga)}),ve.addEventListener("mouseleave",()=>{Ar()})),lu||(document.addEventListener("mouseover",my),document.addEventListener("mouseout",fy),lu=!0)}function my(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=gy(t);if(n){if(n===Ki&&ve.style.display!=="none"){clearTimeout(ga);return}clearTimeout(ha),ha=setTimeout(()=>{hy(t,n)},200)}}function fy(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(ha),ga=setTimeout(()=>{Ar()},150))}function gy(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const s=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return s?s[1]:null}async function hy(e,t){Ki=t;const n=e.getBoundingClientRect();ve.style.left=`${n.left+window.scrollX}px`,ve.style.top=`${n.bottom+window.scrollY+8}px`,ve.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',ve.style.display="block";try{const i=await by(t);if(Ki!==t)return;yy(i)}catch{if(Ki!==t)return;ve.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Ar(){clearTimeout(ha),clearTimeout(ga),ve&&(ve.style.display="none"),Ki=null}function vy(){const e=Date.now();for(const[t,n]of Ht.entries())e-n.timestamp>=ru&&Ht.delete(t)}async function by(e){Ht.size>Lr/2&&vy();const t=Ht.get(e);if(t&&Date.now()-t.timestamp<ru)return t.issue;if(!Cr.api)throw new Error("API not initialized");const n=await Cr.api.getIssueByIdentifier(e);if(Ht.size>=Lr){const i=Array.from(Ht.entries());i.sort((a,o)=>a[1].timestamp-o[1].timestamp);const s=i.slice(0,Lr/2);for(const[a]of s)Ht.delete(a)}return Ht.set(e,{issue:n,timestamp:Date.now()}),n}function yy(e){const t=dy[e.status]||"#6b7280",n=uy[e.priority]||"#6b7280",i=(e.issue_type||"task").replace(/_/g," "),s=e.estimate!=null?`${e.estimate}pt`:"";ve.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${m(e.identifier)}</span>
            <span class="issue-tooltip-type">${m(i)}</span>
            ${s?`<span class="issue-tooltip-estimate">${s}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${m(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${wy(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${ky(e.priority)}</span>
        </div>
    `}function wy(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function ky(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function du(){return!!document.querySelector(".description-inline-editor")}function Br(e){const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}function Dr(){var e;return Br("issue-detail-view")?((e=Fe())==null?void 0:e.id)??null:null}function nn(e){return!!e&&Dr()===e}function $y(){Ae("issue:created",Iy),Ae("issue:updated",Sy),Ae("issue:deleted",Ty),Ae("comment",Ay),Ae("relation",Dy),Ae("attestation",jy),Ae("activity",Ry),Ae("project",Py),Ae("sprint",qy),Ae("document",By),Ae("inbox",My),Ae("connection:reconnected",Ny),Ae("connection:unauthorized",xy),Ae("connection:forbidden",_y),Ae("connection:superseded",Ey)}function Ey(){k("Live updates stopped: you signed in again in another tab. Reload this tab to continue.","warning")}function xy(){h.logout(),pi(null),bs(null),Ui(),k("Your session has ended. Please sign in again.","warning")}function _y(){k("Live updates stopped: you no longer have access to this team.","error")}function Iy(e){var s;const t=Me(),n=t.findIndex(a=>a.id===e.id),i=t.findIndex(a=>a._isOptimistic&&a.title===e.title);if(!(n>=0))if(i>=0){const a=[...t];a[i]=e,st(a),C()==="issues"&&kt()}else st([e,...t]),C()==="issues"&&kt(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((s=Vt())==null?void 0:s.id)){const a=Bt(),o=a.findIndex(c=>c.id===e.id),r=a.findIndex(c=>c._isOptimistic&&c.title===e.title);if(o===-1&&r===-1)wn([e,...a]),C()==="my-issues"&&hi();else if(r>=0){const c=[...a];c[r]=e,wn(c),C()==="my-issues"&&hi()}}C()==="board"?Tr():C()==="sprints"?Yi():C()==="epics"&&Nt(),nn(e.parent_id)&&sn(e.parent_id)}function Sy(e){const t=Me();t.some(s=>s.id===e.id)&&st(t.map(s=>s.id===e.id?e:s));const n=Bt();n.some(s=>s.id===e.id)&&wn(n.map(s=>s.id===e.id?e:s));const i=ms();i.some(s=>s.id===e.id)&&un(i.map(s=>s.id===e.id?e:s)),C()==="issues"?kt():C()==="my-issues"?hi():C()==="board"?Tr():C()==="sprints"?Yi():C()==="epics"&&Nt(),nn(e.id)&&(du()?vo(e):sn(e.id))}function Ty(e){st(Me().filter(n=>n.id!==e.id)),wn(Bt().filter(n=>n.id!==e.id));const t=ms();t.some(n=>n.id===e.id)&&un(t.filter(n=>n.id!==e.id)),C()==="issues"?kt():C()==="my-issues"?(hi(),$n({showLoading:!1})):C()==="board"?Tr():C()==="sprints"?Yi():C()==="epics"&&Nt(),k(`Issue ${e.identifier} deleted`,"info"),nn(e.id)&&(k(`Issue ${e.identifier} was deleted`,"warning"),R("my-issues"))}const uu=250,Ly=1e3,Vn=new Map;function sn(e){du()?vo():jr(e,uu)}function jr(e,t){let n=Vn.get(e);if(n||(n={timer:null,inFlight:!1,again:!1},Vn.set(e,n)),n.inFlight){n.again=!0;return}n.timer||(n.timer=setTimeout(()=>Cy(e),t))}async function Cy(e){const t=Vn.get(e);if(!t)return;if(t.timer=null,!nn(e)){Vn.delete(e);return}t.inFlight=!0;let n;try{n=await J(e,!1,{refresh:!0})}finally{t.inFlight=!1}Vn.get(e)===t&&(t.again?(t.again=!1,jr(e,uu)):n==="retry"?jr(e,Ly):Vn.delete(e))}function Ay(e){C()==="my-issues"&&$n({showLoading:!1}),nn(e.issue_id)&&sn(e.issue_id),e.document_id&&zc(e.document_id)}function By(e,{type:t}={}){Gc(),t==="deleted"?sg(e.id,e.title):zc(e.id)}function Dy(e){const t=Dr();t&&(e.source_issue_id===t||e.target_issue_id===t)&&sn(t)}function jy(e){C()==="approvals"&&rt(),nn(e.issue_id)&&sn(e.issue_id)}function My(e,t){var n;e.recipient_user_id===((n=Vt())==null?void 0:n.id)&&(Nn(),cv(t==null?void 0:t.type,e),C()==="inbox"&&!pv(t==null?void 0:t.type,e)&&Mi({background:!0}))}function Ry(e){C()==="my-issues"&&$n({showLoading:!1}),nn(e.issue_id)&&sn(e.issue_id)}function Py(e,{type:t}){Ue().then(()=>{C()==="projects"&&Mn()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function Yi(){const e=Cg();e&&Br("sprint-detail-view")?Dn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):Br("sprints-view")&&Bn().catch(t=>console.error("Failed to reload sprints:",t))}function qy(e,{type:t}={}){ed(),C()==="sprints"?Yi():C()==="my-issues"&&vi(),t==="created"?k(`New sprint: ${e.name}`,"info"):t==="closed"&&k(`Sprint ${e.name} closed`,"info")}function Ny(){const e=C();Nn(),e==="issues"?wt().catch(n=>console.error("Failed to resync issues:",n)):e==="my-issues"?(kn().catch(n=>console.error("Failed to resync my issues:",n)),vi().catch(n=>console.error("Failed to resync sprint status:",n)),$n({showLoading:!1})):e==="board"?Vi():e==="sprints"?Yi():e==="epics"?Nt().catch(n=>console.error("Failed to resync epics:",n)):e==="projects"?Ue().then(()=>{C()==="projects"&&Mn()}).catch(n=>console.error("Failed to resync projects:",n)):e==="documents"?Gc():e==="approvals"?rt():e==="inbox"&&Mi({background:!0});const t=Dr();t&&sn(t)}const pu='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function mu(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const i=document.querySelector(".main-content");i&&(e?i.setAttribute("inert",""):i.removeAttribute("inert"))}function Oy(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),mu(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(pu);n&&n.focus()}}}function va(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),mu(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const i=n.querySelectorAll(pu);if(i.length===0)return;const s=i[0],a=i[i.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&va()});async function Hy(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const i=z();if(!i){k("Please select a project first","error");return}t.disabled=!0;const s=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=ne().find(d=>d.id===i),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};st([r,...Me()]),kt();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const d=await h.createIssue(i,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=Me(),u=l.findIndex(f=>f.id===a);u!==-1&&(l[u]=d,st(l)),kt(),Ue(),k("Issue created!","success")}catch(d){st(Me().filter(l=>l.id!==a)),kt(),$("create issue",d)}finally{t.disabled=!1,t.placeholder=s,t.focus()}}Hh({beforeNavigate:()=>{Sh(),ud(null),ys(null),Hl(null),va(),Ar()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return iu(e[1]),!0;if(e[0]==="issue"&&e[1])return Ps(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Ps(t)).then(i=>{i&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(Qy(e[1]),!0):e[0]==="sprint"&&e[1]?(jg(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(fd(e[1]),!0):!1},detailPopstate:e=>e.epicId?(Ir(e.epicId,!1),!0):e.issueId?(J(e.issueId,!1),!0):e.identifier?(Ps(e.identifier),!0):e.documentId?(he(e.documentId,!1),!0):e.sprintId?(Dn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Wo();e&&ne().some(t=>t.id===e)&&Ke(e)},issueNavigate:e=>Ps(e),epicNavigate:e=>iu(e)}),Oh({"my-issues":()=>{vi(),kn(),$n()},approvals:()=>{rt()},inbox:()=>{Mi({focusFirst:!0})},issues:()=>{tc(),Pm(),Om(),Xl().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const i=document.getElementById("label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),xs())}const n=e.getAll("exclude_label");if(n.length>0){const i=document.getElementById("exclude-label-filter-dropdown");i&&(i.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),_s())}}),ec().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}wt()})},epics:()=>{Nt()},board:()=>{Vi()},projects:()=>{Ue().then(Mn)},sprints:()=>{Bn()},rituals:()=>{Xg()},documents:()=>{Zt()},team:()=>{mr(),Md(),oa()},settings:()=>{$r(),Xd(),Qd(),tr()}});function Fy(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function Uy(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(s=>{s.addEventListener("click",()=>gd(s.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Ch());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Ah()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([s,a])=>{const o=e.querySelector(`#${s} .btn-primary`);o&&o.addEventListener("click",()=>hd(a))})}function Gy(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Fc("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Fc("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Uc());const i=document.getElementById("doc-search");i&&i.addEventListener("input",()=>Xf());const s=document.getElementById("doc-sort");s&&s.addEventListener("change",()=>Mt())}function zy(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>cc())}function Vy(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Nm());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>_m());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Im()),document.querySelectorAll(".multi-select-btn").forEach(y=>{const b=y.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?y.addEventListener("click",()=>Is("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?y.addEventListener("click",()=>Is("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")?y.addEventListener("click",()=>Is("label-filter-dropdown")):b!=null&&b.querySelector("#exclude-label-filter-dropdown")&&y.addEventListener("click",()=>Is("exclude-label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Ss())});const y=i.querySelector(".btn-small");y&&y.addEventListener("click",()=>to())}const s=document.getElementById("priority-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>no())});const y=s.querySelector(".btn-small");y&&y.addEventListener("click",()=>io())}const a=document.getElementById("label-filter-dropdown");if(a){const y=a.querySelector(".btn-small");y&&y.addEventListener("click",()=>Ts())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const y=o.querySelector(".btn-small");y&&y.addEventListener("click",()=>Ls())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Re());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>Re());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>Re());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>wt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>sc());const f=document.querySelector(".quick-create-input");f&&f.addEventListener("keydown",y=>Hy(y))}function Wy(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>Jg(t.dataset.tab))})}function Ky(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>Dd());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>yi()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),R(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Lv());const i=document.querySelector(".sidebar-backdrop");i&&i.addEventListener("click",()=>va());const s=document.getElementById("hamburger-btn");s&&s.addEventListener("click",()=>Oy());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>yi())}Q({"navigate-to":(e,t)=>{R(t.view)},"set-current-project":(e,t,n)=>{Ke(n.value)},showCreateIssueModal:()=>yi(),showCreateEpicModal:()=>Pb(),"retry-load-epics":()=>Nt(),showCreateProjectModal:()=>md(),showCreateDocumentModal:()=>Wc(),showCreateTeamModal:()=>Pd(),showEditTeamModal:()=>Pv(),showInviteModal:()=>Rd(),showCreateApiKeyModal:()=>vb(),showCreateAgentModal:()=>Yh(),resetOnboarding:()=>Gd(),logout:()=>Zd(),navigateToProjects:()=>R("projects")});async function Yy(){if(!h.getToken()){Ui();return}try{const e=await h.getMe();pi(e),await Oi()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){h.logout(),Ui();return}console.error("Failed to load current user on boot:",e),Ui(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{km(),gb(),Ky(),Fy(),zy(),Vy(),Wy(),Uy(),Gy(),Zy(),Xy(),py({api:h}),Gh(),$y(),await Yy()});function Zy(){const e=document.getElementById("theme-toggle");if(!e)return;const t=qp()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),Np(n?"light":"dark")})}function Xy(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const i=n.replace("#/issue/","");kd(i)}}})}async function Qy(e){try{await he(e,!1)}catch{R("documents",!1)}}document.addEventListener("keydown",Hb({getCurrentView:C,getSelectedIndex:Rl,setSelectedIndex:mi,viewIssue:J,showEditIssueModal:Ec,showInlineDropdown:co,isInlineDropdownOpen:bi,isModalOpen:nt,isCommandPaletteOpen:en,isDetailViewActive:zn})),document.addEventListener("keydown",Fb({getCurrentView:C,getSelectedIndex:dm,setSelectedIndex:Pl,viewDocument:he,showEditDocumentModal:Kc,isModalOpen:nt,isCommandPaletteOpen:en,isDetailViewActive:zn})),document.addEventListener("keydown",Gb({getCurrentView:C,getSelectedIndex:ql,setSelectedIndex:gs,viewIssue:J,isModalOpen:nt,isCommandPaletteOpen:en,isDetailViewActive:zn})),document.addEventListener("keydown",Ub({getCurrentView:C,getSelectedIndex:um,setSelectedIndex:hs,toggleInboxExpand:Ev,collapseInboxExpand:gv,archiveInboxEntry:$v,isInlineDropdownOpen:bi,isEscapeLayerAbove:()=>document.body.classList.contains("sidebar-open")||["team-dropdown","user-dropdown"].some(e=>{const t=document.getElementById(e);return!!t&&!t.classList.contains("hidden")}),isModalOpen:nt,isCommandPaletteOpen:en,isDetailViewActive:zn})),document.addEventListener("keydown",zb()),document.addEventListener("keydown",su({view:"sprints",selector:"#sprints-list .sprint-card",open:e=>{e.dataset.sprintId&&Dn(e.dataset.sprintId)},getCurrentView:C,getSelectedIndex:pm,setSelectedIndex:Nl,isModalOpen:nt,isCommandPaletteOpen:en,isDetailViewActive:zn})),document.addEventListener("keydown",su({view:"epics",selector:"#epics-list .epic-row",open:e=>{e.dataset.identifier&&$d(e.dataset.identifier)},getCurrentView:C,getSelectedIndex:mm,setSelectedIndex:Ol,isModalOpen:nt,isCommandPaletteOpen:en,isDetailViewActive:zn})),document.addEventListener("keydown",Nb({closeModal:O,closeSidebar:va,navigateTo:R,showCreateIssueModal:yi,showKeyboardShortcutsHelp:nu,isModalOpen:nt,focusSearch:()=>{R("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},isInlineDropdownOpen:bi,closeInlineDropdowns:am,isModalDirty:im,focusModalField:Bl,closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Kt()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),Sb([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>R("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>R("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>R("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>R("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>R("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>R("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>R("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>R("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>R("approvals"),category:"Navigation"},{id:"nav-inbox",title:"Go to Inbox",subtitle:"Gates, mentions, assignments, and reviews awaiting you",icon:"📥",shortcut:"G W",action:()=>R("inbox"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>R("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>R("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{R("issues"),setTimeout(yi,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{R("projects"),setTimeout(md,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{R("documents"),setTimeout(Wc,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>Pd(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{R("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{R("team"),setTimeout(Rd,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>nu(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Gd(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Zd(),category:"Account"}]),document.addEventListener("keydown",Ob({isModalOpen:nt,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:en,openCommandPalette:Tb,closeCommandPalette:da})),window.marked=F,window.DOMPurify=El,console.log("Chaotic frontend loaded via Vite")})();
