var af=Object.defineProperty;var of=(Ye,de,kt)=>de in Ye?af(Ye,de,{enumerable:!0,configurable:!0,writable:!0,value:kt}):Ye[de]=kt;var q=(Ye,de,kt)=>of(Ye,typeof de!="symbol"?de+"":de,kt);(function(){"use strict";var Ma;function Ye(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var de=Ye();function kt(e){de=e}var ln={exec:()=>null};function M(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ue.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},tc=/^(?:[ \t]*(?:\n|$))+/,nc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,sc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,cn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ic=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Qs=/(?:[*+-]|\d{1,9}[.)])/,Za=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Xa=M(Za).replace(/bull/g,Qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ac=M(Za).replace(/bull/g,Qs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Js=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,oc=/^[^\n]+/,ei=/(?!\s*\])(?:\\.|[^\[\]\\])+/,rc=M(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ei).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lc=M(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Qs).getRegex(),Wn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ti=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cc=M("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ti).replace("tag",Wn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qa=M(Js).replace("hr",cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),dc=M(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qa).getRegex(),ni={blockquote:dc,code:nc,def:rc,fences:sc,heading:ic,hr:cn,html:cc,lheading:Xa,list:lc,newline:tc,paragraph:Qa,table:ln,text:oc},Ja=M("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex(),uc={...ni,lheading:ac,table:Ja,paragraph:M(Js).replace("hr",cn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ja).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Wn).getRegex()},pc={...ni,html:M(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ti).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ln,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:M(Js).replace("hr",cn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Xa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,eo=/^( {2,}|\\)\n(?!\s*$)/,fc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Vn=/[\p{P}\p{S}]/u,si=/[\s\p{P}\p{S}]/u,to=/[^\s\p{P}\p{S}]/u,hc=M(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,si).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,vc=/(?!~)[\s\p{P}\p{S}]/u,bc=/(?:[^\s\p{P}\p{S}]|~)/u,yc=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,wc=M(so,"u").replace(/punct/g,Vn).getRegex(),kc=M(so,"u").replace(/punct/g,no).getRegex(),io="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$c=M(io,"gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,si).replace(/punct/g,Vn).getRegex(),Ec=M(io,"gu").replace(/notPunctSpace/g,bc).replace(/punctSpace/g,vc).replace(/punct/g,no).getRegex(),_c=M("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,si).replace(/punct/g,Vn).getRegex(),Ic=M(/\\(punct)/,"gu").replace(/punct/g,Vn).getRegex(),xc=M(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Tc=M(ti).replace("(?:-->|$)","-->").getRegex(),Sc=M("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Tc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yn=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Lc=M(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Yn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ao=M(/^!?\[(label)\]\[(ref)\]/).replace("label",Yn).replace("ref",ei).getRegex(),oo=M(/^!?\[(ref)\](?:\[\])?/).replace("ref",ei).getRegex(),Cc=M("reflink|nolink(?!\\()","g").replace("reflink",ao).replace("nolink",oo).getRegex(),ii={_backpedal:ln,anyPunctuation:Ic,autolink:xc,blockSkip:yc,br:eo,code:gc,del:ln,emStrongLDelim:wc,emStrongRDelimAst:$c,emStrongRDelimUnd:_c,escape:mc,link:Lc,nolink:oo,punctuation:hc,reflink:ao,reflinkSearch:Cc,tag:Sc,text:fc,url:ln},Bc={...ii,link:M(/^!?\[(label)\]\((.*?)\)/).replace("label",Yn).getRegex(),reflink:M(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yn).getRegex()},ai={...ii,emStrongRDelimAst:Ec,emStrongLDelim:kc,url:M(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Ac={...ai,br:M(eo).replace("{2,}","*").getRegex(),text:M(ai.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Zn={normal:ni,gfm:uc,pedantic:pc},dn={normal:ii,gfm:ai,breaks:Ac,pedantic:Bc},jc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ro=e=>jc[e];function qe(e,t){if(t){if(ue.escapeTest.test(e))return e.replace(ue.escapeReplace,ro)}else if(ue.escapeTestNoEncode.test(e))return e.replace(ue.escapeReplaceNoEncode,ro);return e}function lo(e){try{e=encodeURI(e).replace(ue.percentDecode,"%")}catch{return null}return e}function co(e,t){var a;const n=e.replace(ue.findPipe,(o,r,c)=>{let d=!1,l=r;for(;--l>=0&&c[l]==="\\";)d=!d;return d?"|":" |"}),s=n.split(ue.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ue.slashPipe,"|");return s}function un(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Dc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function uo(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,c}function Mc(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var Xn=class{constructor(e){q(this,"options");q(this,"rules");q(this,"lexer");this.options=e||de}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:un(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Mc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=un(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:un(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=un(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))r.push(n[c]),o=!0;else if(!o)r.push(n[c]);else break;n=n.slice(c);const d=r.join(`
`),l=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,i=i?`${i}
${l}`:l;const g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=g,n.length===0)break;const u=a.at(-1);if((u==null?void 0:u.type)==="code")break;if((u==null?void 0:u.type)==="blockquote"){const f=u,b=f.raw+`
`+n.join(`
`),w=this.blockquote(b);a[a.length-1]=w,s=s.substring(0,s.length-f.raw.length)+w.raw,i=i.substring(0,i.length-f.text.length)+w.text;break}else if((u==null?void 0:u.type)==="list"){const f=u,b=f.raw+`
`+n.join(`
`),w=this.list(b);a[a.length-1]=w,s=s.substring(0,s.length-u.raw.length)+w.raw,i=i.substring(0,i.length-f.raw.length)+w.raw,n=b.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let c=!1,d="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),u=e.split(`
`,1)[0],f=!g.trim(),b=0;if(this.options.pedantic?(b=2,l=g.trimStart()):f?b=t[1].length+1:(b=t[2].search(this.rules.other.nonSpaceChar),b=b>4?1:b,l=g.slice(b),b+=t[1].length),f&&this.rules.other.blankLine.test(u)&&(d+=u+`
`,e=e.substring(u.length+1),c=!0),!c){const S=this.rules.other.nextBulletRegex(b),P=this.rules.other.hrRegex(b),N=this.rules.other.fencesBeginRegex(b),C=this.rules.other.headingBeginRegex(b),U=this.rules.other.htmlBeginRegex(b);for(;e;){const O=e.split(`
`,1)[0];let F;if(u=O,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),F=u):F=u.replace(this.rules.other.tabCharGlobal,"    "),N.test(u)||C.test(u)||U.test(u)||S.test(u)||P.test(u))break;if(F.search(this.rules.other.nonSpaceChar)>=b||!u.trim())l+=`
`+F.slice(b);else{if(f||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||N.test(g)||C.test(g)||P.test(g))break;l+=`
`+u}!f&&!u.trim()&&(f=!0),d+=O+`
`,e=e.substring(O.length+1),g=F.slice(b)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0));let w=null,I;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(I=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:d,task:!!w,checked:I,loose:!1,text:l,tokens:[]}),i.raw+=d}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const d=i.items[c].tokens.filter(g=>g.type==="space"),l=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));i.loose=l}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=co(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(co(r,a.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[d]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=un(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=Dc(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),uo(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return uo(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,c=a,d=0;const l=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(s=l.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){c+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){d+=r;continue}if(c-=r,c>0)continue;r=Math.min(r,r+c+d);const g=[...s[0]][0].length,u=e.slice(0,a+s.index+g+r);if(Math.min(a,r)%2){const b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}const f=u.slice(2,-2);return{type:"strong",raw:u,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ze=class Va{constructor(t){q(this,"tokens");q(this,"options");q(this,"state");q(this,"tokenizer");q(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||de,this.options.tokenizer=this.options.tokenizer||new Xn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ue,block:Zn.normal,inline:dn.normal};this.options.pedantic?(n.block=Zn.pedantic,n.inline=dn.pedantic):this.options.gfm&&(n.block=Zn.gfm,this.options.breaks?n.inline=dn.breaks:n.inline=dn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Zn,inline:dn}}static lex(t,n){return new Va(n).lex(t)}static lexInline(t,n){return new Va(n).inlineTokens(t)}lex(t){t=t.replace(ue.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ue.tabCharGlobal,"    ").replace(ue.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(d=>(r=d.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const d=n.at(-1);r.raw.length===1&&d!==void 0?d.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="paragraph"||(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.raw,this.inlineQueue.at(-1).src=d.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let d=1/0;const l=t.slice(1);let g;this.options.extensions.startBlock.forEach(u=>{g=u.call({lexer:this},l),typeof g=="number"&&g>=0&&(d=Math.min(d,g))}),d<1/0&&d>=0&&(c=t.substring(0,d+1))}if(this.state.top&&(r=this.tokenizer.paragraph(c))){const d=n.at(-1);s&&(d==null?void 0:d.type)==="paragraph"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r),s=c.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const d=n.at(-1);(d==null?void 0:d.type)==="text"?(d.raw+=`
`+r.raw,d.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=d.text):n.push(r);continue}if(t){const d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,c,d;let s=t,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((c=(r=this.options.extensions)==null?void 0:r.inline)!=null&&c.some(u=>(l=u.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const u=n.at(-1);l.type==="text"&&(u==null?void 0:u.type)==="text"?(u.raw+=l.raw,u.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let g=t;if((d=this.options.extensions)!=null&&d.startInline){let u=1/0;const f=t.slice(1);let b;this.options.extensions.startInline.forEach(w=>{b=w.call({lexer:this},f),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(g=t.substring(0,u+1))}if(l=this.tokenizer.inlineText(g)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=l.raw,u.text+=l.text):n.push(l);continue}if(t){const u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}},Qn=class{constructor(e){q(this,"options");q(this,"parser");this.options=e||de}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ue.notSpaceStart))==null?void 0:a[0],i=e.replace(ue.endingNewline,"")+`
`;return s?'<pre><code class="language-'+qe(s)+'">'+(n?i:qe(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:qe(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+qe(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${qe(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=lo(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+qe(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=lo(e);if(i===null)return qe(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${qe(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:qe(e.text)}},oi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Xe=class Ya{constructor(t){q(this,"options");q(this,"renderer");q(this,"textRenderer");this.options=t||de,this.options.renderer=this.options.renderer||new Qn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new oi}static parse(t,n){return new Ya(n).parse(t)}static parseInline(t,n){return new Ya(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=r,l=this.options.extensions.renderers[d.type].call({parser:this},d);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type)){s+=l||"";continue}}const c=r;switch(c.type){case"space":{s+=this.renderer.space(c);continue}case"hr":{s+=this.renderer.hr(c);continue}case"heading":{s+=this.renderer.heading(c);continue}case"code":{s+=this.renderer.code(c);continue}case"table":{s+=this.renderer.table(c);continue}case"blockquote":{s+=this.renderer.blockquote(c);continue}case"list":{s+=this.renderer.list(c);continue}case"html":{s+=this.renderer.html(c);continue}case"paragraph":{s+=this.renderer.paragraph(c);continue}case"text":{let d=c,l=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],l+=`
`+this.renderer.text(d);n?s+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):s+=l;continue}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const d=this.options.extensions.renderers[r.type].call({parser:this},r);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=d||"";continue}}const c=r;switch(c.type){case"escape":{s+=n.text(c);break}case"html":{s+=n.html(c);break}case"link":{s+=n.link(c);break}case"image":{s+=n.image(c);break}case"strong":{s+=n.strong(c);break}case"em":{s+=n.em(c);break}case"codespan":{s+=n.codespan(c);break}case"br":{s+=n.br(c);break}case"del":{s+=n.del(c);break}case"text":{s+=n.text(c);break}default:{const d='Token with "'+c.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return s}},Jn=(Ma=class{constructor(e){q(this,"options");q(this,"block");this.options=e||de}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ze.lex:Ze.lexInline}provideParser(){return this.block?Xe.parse:Xe.parseInline}},q(Ma,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ma),Rc=class{constructor(...e){q(this,"defaults",Ye());q(this,"options",this.setOptions);q(this,"parse",this.parseMarkdown(!0));q(this,"parseInline",this.parseMarkdown(!1));q(this,"Parser",Xe);q(this,"Renderer",Qn);q(this,"TextRenderer",oi);q(this,"Lexer",Ze);q(this,"Tokenizer",Xn);q(this,"Hooks",Jn);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const c of r)n=n.concat(this.walkTokens(c.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const c=o[r].flat(1/0);n=n.concat(this.walkTokens(c,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new Qn(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new Xn(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],c=i[o];i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new Jn;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],c=i[o];Jn.passThroughHooks.has(a)?i[o]=d=>{if(this.defaults.async)return Promise.resolve(r.call(i,d)).then(g=>c.call(i,g));const l=r.call(i,d);return c.call(i,l)}:i[o]=(...d)=>{let l=r.apply(i,d);return l===!1&&(l=c.apply(i,d)),l}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ze.lex(e,t??this.defaults)}parser(e,t){return Xe.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?Ze.lex:Ze.lexInline,c=a.hooks?a.hooks.provideParser():e?Xe.parse:Xe.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(d=>r(d,a)).then(d=>a.hooks?a.hooks.processAllTokens(d):d).then(d=>a.walkTokens?Promise.all(this.walkTokens(d,a.walkTokens)).then(()=>d):d).then(d=>c(d,a)).then(d=>a.hooks?a.hooks.postprocess(d):d).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let d=r(n,a);a.hooks&&(d=a.hooks.processAllTokens(d)),a.walkTokens&&this.walkTokens(d,a.walkTokens);let l=c(d,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(d){return o(d)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+qe(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},$t=new Rc;function j(e,t){return $t.parse(e,t)}j.options=j.setOptions=function(e){return $t.setOptions(e),j.defaults=$t.defaults,kt(j.defaults),j},j.getDefaults=Ye,j.defaults=de,j.use=function(...e){return $t.use(...e),j.defaults=$t.defaults,kt(j.defaults),j},j.walkTokens=function(e,t){return $t.walkTokens(e,t)},j.parseInline=$t.parseInline,j.Parser=Xe,j.parser=Xe.parse,j.Renderer=Qn,j.TextRenderer=oi,j.Lexer=Ze,j.lexer=Ze.lex,j.Tokenizer=Xn,j.Hooks=Jn,j.parse=j,j.options,j.setOptions,j.use,j.walkTokens,j.parseInline,Xe.parse,Ze.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:po,setPrototypeOf:mo,isFrozen:Pc,getPrototypeOf:Nc,getOwnPropertyDescriptor:qc}=Object;let{freeze:pe,seal:Le,create:ri}=Object,{apply:li,construct:ci}=typeof Reflect<"u"&&Reflect;pe||(pe=function(t){return t}),Le||(Le=function(t){return t}),li||(li=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),ci||(ci=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const es=ge(Array.prototype.forEach),Oc=ge(Array.prototype.lastIndexOf),go=ge(Array.prototype.pop),pn=ge(Array.prototype.push),Fc=ge(Array.prototype.splice),ts=ge(String.prototype.toLowerCase),di=ge(String.prototype.toString),ui=ge(String.prototype.match),mn=ge(String.prototype.replace),Hc=ge(String.prototype.indexOf),Uc=ge(String.prototype.trim),Ae=ge(Object.prototype.hasOwnProperty),me=ge(RegExp.prototype.test),gn=Gc(TypeError);function ge(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return li(e,t,s)}}function Gc(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return ci(e,n)}}function L(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ts;mo&&mo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Pc(t)||(t[s]=a),i=a)}e[i]=!0}return e}function zc(e){for(let t=0;t<e.length;t++)Ae(e,t)||(e[t]=null);return e}function Oe(e){const t=ri(null);for(const[n,s]of po(e))Ae(e,n)&&(Array.isArray(s)?t[n]=zc(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Oe(s):t[n]=s);return t}function fn(e,t){for(;e!==null;){const s=qc(e,t);if(s){if(s.get)return ge(s.get);if(typeof s.value=="function")return ge(s.value)}e=Nc(e)}function n(){return null}return n}const fo=pe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),pi=pe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),mi=pe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Kc=pe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gi=pe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Wc=pe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ho=pe(["#text"]),vo=pe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),fi=pe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),bo=pe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ns=pe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vc=Le(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yc=Le(/<%[\w\W]*|[\w\W]*%>/gm),Zc=Le(/\$\{[\w\W]*/gm),Xc=Le(/^data-[\-\w.\u00B7-\uFFFF]+$/),Qc=Le(/^aria-[\-\w]+$/),yo=Le(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Jc=Le(/^(?:\w+script|data):/i),ed=Le(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wo=Le(/^html$/i),td=Le(/^[a-z][.\w]*(-[.\w]+)+$/i);var ko=Object.freeze({__proto__:null,ARIA_ATTR:Qc,ATTR_WHITESPACE:ed,CUSTOM_ELEMENT:td,DATA_ATTR:Xc,DOCTYPE_NAME:wo,ERB_EXPR:Yc,IS_ALLOWED_URI:yo,IS_SCRIPT_OR_DATA:Jc,MUSTACHE_EXPR:Vc,TMPLIT_EXPR:Zc});const hn={element:1,text:3,progressingInstruction:7,comment:8,document:9},nd=function(){return typeof window>"u"?null:window},sd=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},$o=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Eo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:nd();const t=x=>Eo(x);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==hn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:c,NodeFilter:d,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:u,trustedTypes:f}=e,b=c.prototype,w=fn(b,"cloneNode"),I=fn(b,"remove"),S=fn(b,"nextSibling"),P=fn(b,"childNodes"),N=fn(b,"parentNode");if(typeof o=="function"){const x=n.createElement("template");x.content&&x.content.ownerDocument&&(n=x.content.ownerDocument)}let C,U="";const{implementation:O,createNodeIterator:F,createDocumentFragment:ee,getElementsByTagName:V}=n,{importNode:Y}=s;let K=$o();t.isSupported=typeof po=="function"&&typeof N=="function"&&O&&O.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:le,ERB_EXPR:Se,TMPLIT_EXPR:$e,DATA_ATTR:k,ARIA_ATTR:Ne,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:wt,CUSTOM_ELEMENT:Yg}=ko;let{IS_ALLOWED_URI:Al}=ko,se=null;const jl=L({},[...fo,...pi,...mi,...gi,...ho]);let ie=null;const Dl=L({},[...vo,...fi,...bo,...ns]);let Z=Object.seal(ri(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Gn=null,Ra=null;const en=Object.seal(ri(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ml=!0,Pa=!0,Rl=!1,Pl=!0,tn=!1,zs=!0,At=!1,Na=!1,qa=!1,nn=!1,Ks=!1,Ws=!1,Nl=!0,ql=!1;const Zg="user-content-";let Oa=!0,zn=!1,sn={},We=null;const Fa=L({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ol=null;const Fl=L({},["audio","video","img","source","image","track"]);let Ha=null;const Hl=L({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Vs="http://www.w3.org/1998/Math/MathML",Ys="http://www.w3.org/2000/svg",ct="http://www.w3.org/1999/xhtml";let an=ct,Ua=!1,Ga=null;const Xg=L({},[Vs,Ys,ct],di);let Zs=L({},["mi","mo","mn","ms","mtext"]),Xs=L({},["annotation-xml"]);const Qg=L({},["title","style","font","a","script"]);let Kn=null;const Jg=["application/xhtml+xml","text/html"],ef="text/html";let ne=null,on=null;const tf=n.createElement("form"),Ul=function(m){return m instanceof RegExp||m instanceof Function},za=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(on&&on===m)){if((!m||typeof m!="object")&&(m={}),m=Oe(m),Kn=Jg.indexOf(m.PARSER_MEDIA_TYPE)===-1?ef:m.PARSER_MEDIA_TYPE,ne=Kn==="application/xhtml+xml"?di:ts,se=Ae(m,"ALLOWED_TAGS")?L({},m.ALLOWED_TAGS,ne):jl,ie=Ae(m,"ALLOWED_ATTR")?L({},m.ALLOWED_ATTR,ne):Dl,Ga=Ae(m,"ALLOWED_NAMESPACES")?L({},m.ALLOWED_NAMESPACES,di):Xg,Ha=Ae(m,"ADD_URI_SAFE_ATTR")?L(Oe(Hl),m.ADD_URI_SAFE_ATTR,ne):Hl,Ol=Ae(m,"ADD_DATA_URI_TAGS")?L(Oe(Fl),m.ADD_DATA_URI_TAGS,ne):Fl,We=Ae(m,"FORBID_CONTENTS")?L({},m.FORBID_CONTENTS,ne):Fa,Gn=Ae(m,"FORBID_TAGS")?L({},m.FORBID_TAGS,ne):Oe({}),Ra=Ae(m,"FORBID_ATTR")?L({},m.FORBID_ATTR,ne):Oe({}),sn=Ae(m,"USE_PROFILES")?m.USE_PROFILES:!1,Ml=m.ALLOW_ARIA_ATTR!==!1,Pa=m.ALLOW_DATA_ATTR!==!1,Rl=m.ALLOW_UNKNOWN_PROTOCOLS||!1,Pl=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,tn=m.SAFE_FOR_TEMPLATES||!1,zs=m.SAFE_FOR_XML!==!1,At=m.WHOLE_DOCUMENT||!1,nn=m.RETURN_DOM||!1,Ks=m.RETURN_DOM_FRAGMENT||!1,Ws=m.RETURN_TRUSTED_TYPE||!1,qa=m.FORCE_BODY||!1,Nl=m.SANITIZE_DOM!==!1,ql=m.SANITIZE_NAMED_PROPS||!1,Oa=m.KEEP_CONTENT!==!1,zn=m.IN_PLACE||!1,Al=m.ALLOWED_URI_REGEXP||yo,an=m.NAMESPACE||ct,Zs=m.MATHML_TEXT_INTEGRATION_POINTS||Zs,Xs=m.HTML_INTEGRATION_POINTS||Xs,Z=m.CUSTOM_ELEMENT_HANDLING||{},m.CUSTOM_ELEMENT_HANDLING&&Ul(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=m.CUSTOM_ELEMENT_HANDLING.tagNameCheck),m.CUSTOM_ELEMENT_HANDLING&&Ul(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),tn&&(Pa=!1),Ks&&(nn=!0),sn&&(se=L({},ho),ie=[],sn.html===!0&&(L(se,fo),L(ie,vo)),sn.svg===!0&&(L(se,pi),L(ie,fi),L(ie,ns)),sn.svgFilters===!0&&(L(se,mi),L(ie,fi),L(ie,ns)),sn.mathMl===!0&&(L(se,gi),L(ie,bo),L(ie,ns))),m.ADD_TAGS&&(typeof m.ADD_TAGS=="function"?en.tagCheck=m.ADD_TAGS:(se===jl&&(se=Oe(se)),L(se,m.ADD_TAGS,ne))),m.ADD_ATTR&&(typeof m.ADD_ATTR=="function"?en.attributeCheck=m.ADD_ATTR:(ie===Dl&&(ie=Oe(ie)),L(ie,m.ADD_ATTR,ne))),m.ADD_URI_SAFE_ATTR&&L(Ha,m.ADD_URI_SAFE_ATTR,ne),m.FORBID_CONTENTS&&(We===Fa&&(We=Oe(We)),L(We,m.FORBID_CONTENTS,ne)),m.ADD_FORBID_CONTENTS&&(We===Fa&&(We=Oe(We)),L(We,m.ADD_FORBID_CONTENTS,ne)),Oa&&(se["#text"]=!0),At&&L(se,["html","head","body"]),se.table&&(L(se,["tbody"]),delete Gn.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw gn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw gn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=m.TRUSTED_TYPES_POLICY,U=C.createHTML("")}else C===void 0&&(C=sd(f,i)),C!==null&&typeof U=="string"&&(U=C.createHTML(""));pe&&pe(m),on=m}},Gl=L({},[...pi,...mi,...Kc]),zl=L({},[...gi,...Wc]),nf=function(m){let $=N(m);(!$||!$.tagName)&&($={namespaceURI:an,tagName:"template"});const _=ts(m.tagName),G=ts($.tagName);return Ga[m.namespaceURI]?m.namespaceURI===Ys?$.namespaceURI===ct?_==="svg":$.namespaceURI===Vs?_==="svg"&&(G==="annotation-xml"||Zs[G]):!!Gl[_]:m.namespaceURI===Vs?$.namespaceURI===ct?_==="math":$.namespaceURI===Ys?_==="math"&&Xs[G]:!!zl[_]:m.namespaceURI===ct?$.namespaceURI===Ys&&!Xs[G]||$.namespaceURI===Vs&&!Zs[G]?!1:!zl[_]&&(Qg[_]||!Gl[_]):!!(Kn==="application/xhtml+xml"&&Ga[m.namespaceURI]):!1},Ve=function(m){pn(t.removed,{element:m});try{N(m).removeChild(m)}catch{I(m)}},jt=function(m,$){try{pn(t.removed,{attribute:$.getAttributeNode(m),from:$})}catch{pn(t.removed,{attribute:null,from:$})}if($.removeAttribute(m),m==="is")if(nn||Ks)try{Ve($)}catch{}else try{$.setAttribute(m,"")}catch{}},Kl=function(m){let $=null,_=null;if(qa)m="<remove></remove>"+m;else{const J=ui(m,/^[\r\n\t ]+/);_=J&&J[0]}Kn==="application/xhtml+xml"&&an===ct&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");const G=C?C.createHTML(m):m;if(an===ct)try{$=new u().parseFromString(G,Kn)}catch{}if(!$||!$.documentElement){$=O.createDocument(an,"template",null);try{$.documentElement.innerHTML=Ua?U:G}catch{}}const ce=$.body||$.documentElement;return m&&_&&ce.insertBefore(n.createTextNode(_),ce.childNodes[0]||null),an===ct?V.call($,At?"html":"body")[0]:At?$.documentElement:ce},Wl=function(m){return F.call(m.ownerDocument||m,m,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Ka=function(m){return m instanceof g&&(typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||!(m.attributes instanceof l)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function")},Vl=function(m){return typeof r=="function"&&m instanceof r};function dt(x,m,$){es(x,_=>{_.call(t,m,$,on)})}const Yl=function(m){let $=null;if(dt(K.beforeSanitizeElements,m,null),Ka(m))return Ve(m),!0;const _=ne(m.nodeName);if(dt(K.uponSanitizeElement,m,{tagName:_,allowedTags:se}),zs&&m.hasChildNodes()&&!Vl(m.firstElementChild)&&me(/<[/\w!]/g,m.innerHTML)&&me(/<[/\w!]/g,m.textContent)||m.nodeType===hn.progressingInstruction||zs&&m.nodeType===hn.comment&&me(/<[/\w]/g,m.data))return Ve(m),!0;if(!(en.tagCheck instanceof Function&&en.tagCheck(_))&&(!se[_]||Gn[_])){if(!Gn[_]&&Xl(_)&&(Z.tagNameCheck instanceof RegExp&&me(Z.tagNameCheck,_)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(_)))return!1;if(Oa&&!We[_]){const G=N(m)||m.parentNode,ce=P(m)||m.childNodes;if(ce&&G){const J=ce.length;for(let Ee=J-1;Ee>=0;--Ee){const ut=w(ce[Ee],!0);ut.__removalCount=(m.__removalCount||0)+1,G.insertBefore(ut,S(m))}}}return Ve(m),!0}return m instanceof c&&!nf(m)||(_==="noscript"||_==="noembed"||_==="noframes")&&me(/<\/no(script|embed|frames)/i,m.innerHTML)?(Ve(m),!0):(tn&&m.nodeType===hn.text&&($=m.textContent,es([le,Se,$e],G=>{$=mn($,G," ")}),m.textContent!==$&&(pn(t.removed,{element:m.cloneNode()}),m.textContent=$)),dt(K.afterSanitizeElements,m,null),!1)},Zl=function(m,$,_){if(Nl&&($==="id"||$==="name")&&(_ in n||_ in tf))return!1;if(!(Pa&&!Ra[$]&&me(k,$))){if(!(Ml&&me(Ne,$))){if(!(en.attributeCheck instanceof Function&&en.attributeCheck($,m))){if(!ie[$]||Ra[$]){if(!(Xl(m)&&(Z.tagNameCheck instanceof RegExp&&me(Z.tagNameCheck,m)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(m))&&(Z.attributeNameCheck instanceof RegExp&&me(Z.attributeNameCheck,$)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck($,m))||$==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&me(Z.tagNameCheck,_)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(_))))return!1}else if(!Ha[$]){if(!me(Al,mn(_,wt,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&m!=="script"&&Hc(_,"data:")===0&&Ol[m])){if(!(Rl&&!me(te,mn(_,wt,"")))){if(_)return!1}}}}}}}return!0},Xl=function(m){return m!=="annotation-xml"&&ui(m,Yg)},Ql=function(m){dt(K.beforeSanitizeAttributes,m,null);const{attributes:$}=m;if(!$||Ka(m))return;const _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ie,forceKeepAttr:void 0};let G=$.length;for(;G--;){const ce=$[G],{name:J,namespaceURI:Ee,value:ut}=ce,rn=ne(J),Wa=ut;let ae=J==="value"?Wa:Uc(Wa);if(_.attrName=rn,_.attrValue=ae,_.keepAttr=!0,_.forceKeepAttr=void 0,dt(K.uponSanitizeAttribute,m,_),ae=_.attrValue,ql&&(rn==="id"||rn==="name")&&(jt(J,m),ae=Zg+ae),zs&&me(/((--!?|])>)|<\/(style|title|textarea)/i,ae)){jt(J,m);continue}if(rn==="attributename"&&ui(ae,"href")){jt(J,m);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){jt(J,m);continue}if(!Pl&&me(/\/>/i,ae)){jt(J,m);continue}tn&&es([le,Se,$e],ec=>{ae=mn(ae,ec," ")});const Jl=ne(m.nodeName);if(!Zl(Jl,rn,ae)){jt(J,m);continue}if(C&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!Ee)switch(f.getAttributeType(Jl,rn)){case"TrustedHTML":{ae=C.createHTML(ae);break}case"TrustedScriptURL":{ae=C.createScriptURL(ae);break}}if(ae!==Wa)try{Ee?m.setAttributeNS(Ee,J,ae):m.setAttribute(J,ae),Ka(m)?Ve(m):go(t.removed)}catch{jt(J,m)}}dt(K.afterSanitizeAttributes,m,null)},sf=function x(m){let $=null;const _=Wl(m);for(dt(K.beforeSanitizeShadowDOM,m,null);$=_.nextNode();)dt(K.uponSanitizeShadowNode,$,null),Yl($),Ql($),$.content instanceof a&&x($.content);dt(K.afterSanitizeShadowDOM,m,null)};return t.sanitize=function(x){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,_=null,G=null,ce=null;if(Ua=!x,Ua&&(x="<!-->"),typeof x!="string"&&!Vl(x))if(typeof x.toString=="function"){if(x=x.toString(),typeof x!="string")throw gn("dirty is not a string, aborting")}else throw gn("toString is not a function");if(!t.isSupported)return x;if(Na||za(m),t.removed=[],typeof x=="string"&&(zn=!1),zn){if(x.nodeName){const ut=ne(x.nodeName);if(!se[ut]||Gn[ut])throw gn("root node is forbidden and cannot be sanitized in-place")}}else if(x instanceof r)$=Kl("<!---->"),_=$.ownerDocument.importNode(x,!0),_.nodeType===hn.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?$=_:$.appendChild(_);else{if(!nn&&!tn&&!At&&x.indexOf("<")===-1)return C&&Ws?C.createHTML(x):x;if($=Kl(x),!$)return nn?null:Ws?U:""}$&&qa&&Ve($.firstChild);const J=Wl(zn?x:$);for(;G=J.nextNode();)Yl(G),Ql(G),G.content instanceof a&&sf(G.content);if(zn)return x;if(nn){if(Ks)for(ce=ee.call($.ownerDocument);$.firstChild;)ce.appendChild($.firstChild);else ce=$;return(ie.shadowroot||ie.shadowrootmode)&&(ce=Y.call(s,ce,!0)),ce}let Ee=At?$.outerHTML:$.innerHTML;return At&&se["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&me(wo,$.ownerDocument.doctype.name)&&(Ee="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Ee),tn&&es([le,Se,$e],ut=>{Ee=mn(Ee,ut," ")}),C&&Ws?C.createHTML(Ee):Ee},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};za(x),Na=!0},t.clearConfig=function(){on=null,Na=!1},t.isValidAttribute=function(x,m,$){on||za({});const _=ne(x),G=ne(m);return Zl(_,G,$)},t.addHook=function(x,m){typeof m=="function"&&pn(K[x],m)},t.removeHook=function(x,m){if(m!==void 0){const $=Oc(K[x],m);return $===-1?void 0:Fc(K[x],$,1)[0]}return go(K[x])},t.removeHooks=function(x){K[x]=[]},t.removeAllHooks=function(){K=$o()},t}var _o=Eo();const hi="chaotic_";function je(e){try{return localStorage.getItem(hi+e)}catch{return null}}function De(e,t){try{localStorage.setItem(hi+e,t)}catch{}}function Qe(e){try{localStorage.removeItem(hi+e)}catch{}}function id(){return je("token")}function ad(e){e?De("token",e):Qe("token")}function od(){return je("theme")}function rd(e){De("theme",e)}function ld(){return je("last_project")}function Io(e){De("last_project",e)}function cd(){return je("onboarding_complete")==="true"}function dd(){De("onboarding_complete","true")}function ud(){Qe("onboarding_complete")}function pd(e){return e?je(`issues_filters_${e}`):null}function md(e,t){e&&(t?De(`issues_filters_${e}`,t):Qe(`issues_filters_${e}`))}function gd(e){return je(`comment_draft_${e}`)}function vi(e,t){t?De(`comment_draft_${e}`,t):Qe(`comment_draft_${e}`)}function fd(e){return je(`description_draft_${e}`)}function ss(e,t){t?De(`description_draft_${e}`,t):Qe(`description_draft_${e}`)}function hd(){return{title:je("create_issue_title"),description:je("create_issue_description")}}function xo(e,t){e?De("create_issue_title",e):Qe("create_issue_title"),t?De("create_issue_description",t):Qe("create_issue_description")}function vd(){Qe("create_issue_title"),Qe("create_issue_description")}function bd(){return je("doc_view_mode")}function yd(e){De("doc_view_mode",e)}function wd(){return je("approvals_explainer_dismissed")==="1"}function kd(){De("approvals_explainer_dismissed","1")}const $d="/api";class Ed{constructor(){this.token=id()}setToken(t){this.token=t,ad(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));const o=await fetch(`${$d}${n}`,a);if(o.status===204)return null;let r;try{r=await o.json()}catch{const c=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${c})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let c;typeof r.detail=="string"?c=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?c=r.detail.message:c="An error occurred";const d=new Error(c);throw d.status=o.status,d.detail=r.detail,d}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}?role=${s}`)}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/projects?team_id=${t}`,n)}async getProjects(t){return this.request("GET",`/projects?team_id=${t}`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/issues?project_id=${t}`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20){return this.request("GET",`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/sprints?project_id=${t}`;return n&&(s+=`&sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/rituals?project_id=${t}`,n)}async getRituals(t){return this.request("GET",`/rituals?project_id=${t}`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/documents?team_id=${t}`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/documents?team_id=${t}`;return n&&(a+=`&project_id=${n}`),i&&(a+=`&sprint_id=${i}`),s&&(a+=`&search=${encodeURIComponent(s)}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/labels?team_id=${t}`,n)}async getLabels(t){return this.request("GET",`/labels?team_id=${t}`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const v=new Ed;window.api=v;let Dt=null;function B(){document.getElementById("modal-overlay").classList.remove("hidden")}function D(){var e;Je(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide")}function bi(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function h(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`,s.textContent=e,n.appendChild(s),setTimeout(()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},3e3)}function Je(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),Dt&&(document.removeEventListener("keydown",Dt),Dt=null)}function vn(e){Dt&&document.removeEventListener("keydown",Dt),Dt=e,e&&document.addEventListener("keydown",e)}function Mt(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(Je(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}Object.assign(window,{showModal:B,closeModal:D,showToast:h,closeAllDropdowns:Je,registerDropdownClickOutside:Mt});function be(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function ye(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function yi(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function W(e){return typeof e=="string"&&/^#[0-9a-fA-F]{3,8}$/.test(e)?e:"#888888"}function p(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function E(e){return p(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Fe(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function y(e){return e==null?"":String(e).replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$").replace(/'/g,"\\x27").replace(/"/g,"\\x22").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/</g,"\\x3c").replace(/>/g,"\\x3e")}function et(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function _d(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Rt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?_d(s)?`<img class="${t} avatar-img" src="${E(s)}" alt="${E(n)}">`:`<div class="${t} avatar-emoji">${p(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let oe={...{currentUser:null,currentView:"my-issues",issues:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentDetailIssue:null,currentDetailSprints:null}};const Id=new Set;function Ce(e,t){if(typeof e=="string"){const n=oe[e];oe[e]=t,To(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=oe[s];oe[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{To(s,i,a)})}}function To(e,t,n){t!==n&&Id.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const wi=()=>oe.currentUser,xd=e=>Ce("currentUser",e),A=()=>oe.currentView,Td=e=>Ce("currentView",e),we=()=>oe.issues,He=e=>Ce("issues",e),So=()=>oe.labels,is=e=>Ce("labels",e),Lo=()=>oe.activeFilterCategory,Sd=e=>Ce("activeFilterCategory",e),Ld=()=>oe.selectedIssueIndex,Co=e=>Ce("selectedIssueIndex",e),Cd=()=>oe.pendingGates,Bd=e=>Ce("pendingGates",e),Ad=()=>oe.searchDebounceTimer,jd=e=>Ce("searchDebounceTimer",e),Dd=()=>oe.websocket,Bo=e=>Ce("websocket",e),T=()=>oe.currentTeam,ki=e=>Ce("currentTeam",e),fe=()=>oe.currentDetailIssue,as=e=>Ce("currentDetailIssue",e),Md=()=>oe.currentDetailSprints,Ao=e=>Ce("currentDetailSprints",e);let Pt=null,bn=null,Me=null,Re=null;function yn(){Pt||(Pt=document.getElementById("auth-screen"),bn=document.getElementById("main-screen"),Me=document.getElementById("login-form"),Re=document.getElementById("signup-form"))}function os(){yn(),Pt&&Pt.classList.remove("hidden"),bn&&bn.classList.add("hidden")}function jo(){yn(),Pt&&Pt.classList.add("hidden"),bn&&bn.classList.remove("hidden")}function $i(){yn(),Me&&Me.classList.remove("hidden"),Re&&Re.classList.add("hidden")}function Ei(){yn(),Me&&Me.classList.add("hidden"),Re&&Re.classList.remove("hidden")}async function _i(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await v.login(t,n),window.currentUser=await v.getMe(),window.initApp&&await window.initApp(),h("Welcome back!","success")}catch(s){h(`Login failed: ${s.message}`,"error")}return!1}async function Ii(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await v.signup(t,n,s),await v.login(n,s),window.currentUser=await v.getMe(),window.initApp&&await window.initApp(),h("Account created successfully!","success")}catch(i){h(`Signup failed: ${i.message}`,"error")}return!1}function rs(){v.logout(),window.currentUser=null,ki(null),os(),h("Signed out","success")}function Do(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Mo(){const e=window.currentUser;if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Do(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${E(s)}" alt="${E(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Rd(){yn();const e=Me==null?void 0:Me.querySelector("form");e&&e.addEventListener("submit",i=>_i(i));const t=Re==null?void 0:Re.querySelector("form");t&&t.addEventListener("submit",i=>Ii(i));const n=Me==null?void 0:Me.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Ei()});const s=Re==null?void 0:Re.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),$i()})}Object.assign(window,{showAuthScreen:os,showMainScreen:jo,showLogin:$i,showSignup:Ei,handleLogin:_i,handleSignup:Ii,logout:rs,updateUserInfo:Mo,isImageAvatar:Do});function Ro(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let xi=[],wn=[],Po=null,H=new Set,Nt="list",Et=!1,Ti=null;const Si=bd();(Si==="list"||Si==="grid")&&(Nt=Si);function Li(e){if(e!=="list"&&e!=="grid")return;Nt=e,e==="grid"&&Et&&ls(),yd(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),tt()}function Ci(){if(Nt!=="list")return;Et=!0,H.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.onclick=ls),tt(),Ot()}function ls(){Et=!1,H.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.onclick=Ci),tt(),Ot()}function No(){Ti&&clearTimeout(Ti),Ti=setTimeout(()=>{tt()},300)}function Pd(){const e=document.getElementById("doc-search");e&&(e.value=""),tt()}async function Nd(){const e=document.getElementById("doc-project-filter");e&&(e.value=""),await cs()}async function qd(){const e=document.getElementById("doc-search"),t=document.getElementById("doc-project-filter");e&&(e.value=""),t&&(t.value=""),await cs()}function Od(){var i,a,o;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=((a=document.getElementById("doc-project-filter"))==null?void 0:a.value)||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${p(t)}" <button class="chip-clear" onclick="clearDocSearch()">×</button></span>`),n){const r=document.getElementById("doc-project-filter"),c=((o=r==null?void 0:r.options[r.selectedIndex])==null?void 0:o.text)||"Project";s.push(`<span class="filter-chip">Project: ${p(c)} <button class="chip-clear" onclick="clearDocProjectFilter()">×</button></span>`)}if(s.length>0){let r=s.join(" ");s.length>1&&(r+=' <button class="btn btn-secondary btn-tiny" onclick="clearAllDocFilters()">Clear all</button>'),e.innerHTML=r,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function tt(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";Od(),wn=xi.filter(a=>{var o,r;if(e){const c=(o=a.title)==null?void 0:o.toLowerCase().includes(e),d=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!c&&!d)return!1}return!0}),wn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),qo("",Nt)}async function cs(){var n,s;const e=Po||((n=T())==null?void 0:n.id);if(!e)return;const t=((s=document.getElementById("doc-project-filter"))==null?void 0:s.value)||null;try{xi=await v.getDocuments(e,t),tt()}catch(i){h(i.message,"error")}}async function qt(e,t=null){var s;if(e||(e=(s=T())==null?void 0:s.id),!e)return;Po=e;const n=document.getElementById("documents-list");if(n&&(n.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null){const i=document.getElementById("doc-project-filter");i!=null&&i.value&&(t=i.value)}try{xi=await v.getDocuments(e,t);const i=document.getElementById("doc-view-list"),a=document.getElementById("doc-view-grid");i&&a&&(i.classList.toggle("active",Nt==="list"),a.classList.toggle("active",Nt==="grid")),tt()}catch(i){const a=document.getElementById("documents-list");a&&(a.innerHTML=""),h(i.message,"error")}}function Fd(e){return!e||e.length===0?"":e.map(t=>`<span class="badge" style="background-color: ${W(t.color)}; color: white;">${p(t.name)}</span>`).join(" ")}function Hd(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${Fd(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${E(e.id)}" onclick="viewDocument('${y(e.id)}')">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${p(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${p(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?p(Ro(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${p(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function Ud(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,3).map(r=>`<span class="badge badge-small" style="background-color: ${W(r.color)}; color: white;">${p(r.name)}</span>`).join(" ")+(e.labels.length>3?` <span class="text-muted">+${e.labels.length-3}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Ro(e.content).substring(0,80):"No content",i=Et?`<div class="document-list-checkbox" onclick="event.stopPropagation(); toggleDocSelection('${y(e.id)}')">
         <input type="checkbox" id="doc-check-${e.id}" ${H.has(e.id)?"checked":""}>
       </div>`:"",a=Et&&H.has(e.id)?" selected":"",o=Et?`toggleDocSelection('${y(e.id)}')`:`viewDocument('${y(e.id)}')`;return`
    <div class="list-item document-list-item${a}" onclick="${o}">
      ${i}
      <div class="document-list-icon">${p(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${p(e.title)}</div>
        <div class="document-list-snippet text-muted">${p(s)}${e.content&&e.content.length>80?"...":""}</div>
      </div>
      <div class="document-list-meta">
        ${t?`<div class="document-list-labels">${t}</div>`:""}
        <div class="document-list-badges">${n.join(" ")}</div>
      </div>
      <div class="document-list-info">
        <span class="text-muted">${e.author_name?p(e.author_name):""}</span>
        <span class="text-muted">${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function qo(e="",t="list"){var d,l;const n=document.getElementById("documents-list");if(!n)return;H.clear(),Ot();const s=wn;if(s.length===0){const g=(d=document.getElementById("doc-search"))==null?void 0:d.value,u=(l=document.getElementById("doc-project-filter"))==null?void 0:l.value,f=g||u;n.innerHTML=`
      <div class="empty-state">
        <h3>${f?"No documents match your filters":"No documents yet"}</h3>
        <p>${f?"Try different search terms or filters":"Create your first document to get started"}</p>
      </div>
    `;return}const i=t==="grid"?Hd:Ud,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=window.getProjects?window.getProjects():[];s.forEach(g=>{let u,f;if(e==="project")if(u=g.project_id||"__global__",u==="__global__")f="Global (Team-wide)";else{const b=r.find(w=>w.id===g.project_id);f=b?b.name:"Unknown Project"}else e==="sprint"&&(u=g.sprint_id||"__no_sprint__",f=g.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:f,docs:[]}),o[u].docs.push(g)});let c="";for(const[g,u]of Object.entries(o)){const f=t==="grid"?"doc-group-content grid":"doc-group-content";c+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${p(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${f}">
          ${u.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=c}function Gd(e){H.has(e)?H.delete(e):H.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=H.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",H.has(e)),Ot()}function zd(){wn.forEach(e=>H.add(e.id)),wn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),Ot()}function Oo(){H.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),H.clear(),Ot()}function Ot(){const e=document.getElementById("doc-bulk-actions");e&&(Et?(e.classList.remove("hidden"),H.size>0?e.innerHTML=`
        <span class="bulk-count">${H.size} selected</span>
        <button class="btn btn-secondary btn-small" onclick="showBulkMoveModal()">Move to Project</button>
        <button class="btn btn-danger btn-small" onclick="bulkDeleteDocuments()">Delete</button>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="clearDocSelection()">Clear</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" onclick="selectAllDocs()">Select All</button>
        <button class="btn btn-secondary btn-small" onclick="exitSelectionMode()">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function Kd(){if(H.size===0){h("No documents selected","error");return}const t=(window.getProjects?window.getProjects():[]).map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${H.size} Document${H.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleBulkMove(event)">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${H.size} selected document${H.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,B()}async function Wd(e){var o;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(H);let s=0,i=0;for(const r of n)try{await v.updateDocument(r,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${r}:`,c),i++}D(),Oo(),i===0?h(`Moved ${s} document${s>1?"s":""}!`,"success"):h(`Moved ${s}, failed ${i}`,"warning");const a=(o=T())==null?void 0:o.id;return await qt(a),!1}async function Vd(){var a;if(H.size===0){h("No documents selected","error");return}const e=H.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(H);let n=0,s=0;for(const o of t)try{await v.deleteDocument(o),n++}catch(r){console.error(`Failed to delete document ${o}:`,r),s++}ls(),s===0?h(`Deleted ${n} document${n>1?"s":""}!`,"success"):h(`Deleted ${n}, failed ${s}`,"warning");const i=(a=T())==null?void 0:a.id;await qt(i)}async function Ue(e,t=!0){try{const n=await v.getDocument(e);t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(f=>f.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=window.renderMarkdown||(f=>p(f));let a="";try{const f=await v.getDocumentIssues(n.id);f.length>0?a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <div class="linked-items-list">${f.map(w=>`
          <div class="linked-item">
            <span class="linked-item-id">${p(w.identifier)}</span>
            <span class="linked-item-title">${p(w.title)}</span>
            <button class="btn btn-danger btn-tiny" onclick="unlinkDocumentFromIssue('${y(n.id)}', '${y(w.id)}')" title="Unlink">×</button>
          </div>
        `).join("")}</div>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${y(n.id)}')">+ Link Issue</button>
          </div>
        `:a=`
          <div class="linked-issues-section">
            <h3>Linked Issues</h3>
            <button class="btn btn-secondary btn-small" onclick="showLinkIssueModal('${y(n.id)}')">+ Link Issue</button>
          </div>
        `}catch{}let o="";try{const f=await v.getDocumentComments(n.id);o=`
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comments-list">${f.length===0?'<div class="comments-empty">No comments yet</div>':f.map(w=>{var I,S;return`
            <div class="comment" data-comment-id="${E(w.id)}">
              <div class="comment-avatar">${((S=(I=w.author_name)==null?void 0:I.charAt(0))==null?void 0:S.toUpperCase())||"U"}</div>
              <div class="comment-body">
                <div class="comment-header">
                  <span class="comment-author">${p(w.author_name||"Unknown")}</span>
                  <span class="comment-date">${Fe(w.created_at)}</span>
                </div>
                <div class="comment-content markdown-body">${i(w.content)}</div>
              </div>
            </div>
          `}).join("")}</div>
          <form class="comment-form" onsubmit="return handleAddDocumentComment(event, '${y(n.id)}')">
            <textarea id="new-doc-comment" placeholder="Write a comment..." rows="3"></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
          </form>
        </div>
      `}catch(f){console.error("Failed to load comments:",f)}let r=null,c=null;if(n.project_id){const b=(window.getProjects?window.getProjects():[]).find(w=>w.id===n.project_id);if(r=b?b.name:null,n.sprint_id)try{const w=await v.getSprint(n.sprint_id);c=w?w.name:null}catch{}}let d="";r?(d=`<span class="badge badge-primary">${p(r)}</span>`,c&&(d+=` <span class="badge badge-info">${p(c)}</span>`)):d='<span class="badge badge-secondary">Global</span>';let l="";n.labels&&n.labels.length>0?l=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <div class="document-labels">${n.labels.map(b=>`
        <span class="label-badge" style="background-color: ${W(b.color)}; color: white;">
          ${p(b.name)}
          <button class="btn-remove-label" onclick="removeLabelFromDoc('${y(n.id)}', '${y(b.id)}')" title="Remove label">×</button>
        </span>
      `).join(" ")}</div>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${y(n.id)}')">+ Add Label</button>
        </div>
      `:l=`
        <div class="document-labels-section">
          <h3>Labels</h3>
          <button class="btn btn-secondary btn-small" onclick="showAddLabelToDocModal('${y(n.id)}')">+ Add Label</button>
        </div>
      `;let g=n.content||"";const u=g.match(/^\s*#\s+(.+?)(\n|$)/);u&&u[1].trim()===n.title.trim()&&(g=g.replace(/^\s*#\s+[^\n]*\n?/,"").trimStart()),s.querySelector("#document-detail-content").innerHTML=`
      <div class="back-button" onclick="navigateTo('documents')">
        ← Back to Documents
      </div>
      <div class="document-detail-header">
        <div class="document-detail-header-top">
          <div>
            <h2 class="document-title">${p(n.title)}</h2>
            <div class="document-meta">
              ${d}${n.author_name?` · By ${p(n.author_name)}`:""} · Last updated ${new Date(n.updated_at).toLocaleString()}
            </div>
          </div>
          <div class="document-actions">
            <button class="btn btn-secondary btn-small" onclick="showEditDocumentModal('${y(n.id)}')">Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteDocument('${y(n.id)}')">Delete</button>
          </div>
        </div>
      </div>
      <div class="document-content markdown-body">${g?i(g):"No content"}</div>
      ${l}
      ${a}
      ${o}
    `}catch(n){h(n.message,"error")}}async function Bi(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await v.getSprints(t);let o=n;if(s&&!n){const c=a.find(d=>d.status==="active");c&&(o=c.id)}const r=a.map(c=>`<option value="${c.id}" ${c.id===o?"selected":""}>${p(c.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}async function ds(){const e=window.getProjects?window.getProjects():[],t=window.getSavedProjectId?window.getSavedProjectId():"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${p(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleCreateDocument(event)">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" onchange="updateDocSprintDropdown('doc-sprint', this.value)">
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
      <div class="form-group">
        <label for="doc-content">Content</label>
        <textarea id="doc-content" style="min-height: 200px"></textarea>
      </div>
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,B(),t&&await Bi("doc-sprint",t,null,!0)}async function Yd(e){var a;e.preventDefault();const t=(a=T())==null?void 0:a.id;if(!t)return h("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{await v.createDocument(t,i),await qt(t),D(),h("Document created!","success")}catch(o){h(o.message,"error")}return!1}async function Zd(e){try{const t=await v.getDocument(e),s=(window.getProjects?window.getProjects():[]).map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${p(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form onsubmit="return handleUpdateDocument(event, '${y(e)}')">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${E(t.title)}" required>
        </div>
        <div class="form-group">
          <label for="edit-doc-project">Project</label>
          <select id="edit-doc-project" onchange="updateDocSprintDropdown('edit-doc-sprint', this.value)">
            <option value="" ${t.project_id?"":"selected"}>Global (Team-wide)</option>
            ${s}
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-sprint">Sprint (optional)</label>
          <select id="edit-doc-sprint" ${t.project_id?"":"disabled"}>
            <option value="">${t.project_id?"None":"Select project first"}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="edit-doc-content">Content</label>
          <textarea id="edit-doc-content" style="min-height: 200px">${p(t.content||"")}</textarea>
        </div>
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${E(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,B(),t.project_id&&await Bi("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){h(t.message,"error")}}async function Xd(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await v.updateDocument(t,i),D(),await Ue(t),h("Document updated!","success")}catch(a){h(a.message,"error")}return!1}async function Qd(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await v.deleteDocument(e);const n=(t=T())==null?void 0:t.id;await qt(n),window.navigateTo&&window.navigateTo("documents"),h("Document deleted!","success")}catch(n){h(n.message,"error")}}function Jd(e,t){Bi(e,t)}async function eu(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleLinkIssue(event, '${y(e)}')">
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToLink(this.value, '${y(e)}')">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,B()}async function tu(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=T())==null?void 0:s.id,a=await v.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" onclick="linkToIssue('${y(t)}', '${y(o.id)}')">
        <span class="link-result-id">${p(o.identifier)}</span>
        <span class="link-result-title">${p(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function nu(e,t){try{await v.linkDocumentToIssue(e,t),D(),h("Issue linked!","success"),await Ue(e,!1)}catch(n){h(n.message,"error")}}async function su(e,t){if(confirm("Unlink this issue from the document?"))try{await v.unlinkDocumentFromIssue(e,t),h("Issue unlinked!","success"),await Ue(e,!1)}catch(n){h(n.message,"error")}}async function iu(e,t){e.preventDefault();const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return h("Please enter a comment","error"),!1;try{await v.createDocumentComment(t,s),n.value="",h("Comment added!","success"),await Ue(t,!1)}catch(i){h(i.message,"error")}return!1}async function au(e){var n;const t=(n=T())==null?void 0:n.id;if(!t){h("No team selected","error");return}try{const s=await v.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,B();return}const i=s.map(a=>`
      <div class="label-select-item" onclick="addLabelToDoc('${y(e)}', '${y(a.id)}')" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${W(a.color)}; color: white;">${p(a.name)}</span>
        ${a.description?`<span class="text-muted">${p(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,B()}catch(s){h(s.message,"error")}}async function ou(e,t){try{await v.addLabelToDocument(e,t),D(),h("Label added!","success"),await Ue(e,!1)}catch(n){h(n.message,"error")}}async function ru(e,t){try{await v.removeLabelFromDocument(e,t),h("Label removed!","success"),await Ue(e,!1)}catch(n){h(n.message,"error")}}Object.assign(window,{loadDocuments:qt,filterDocuments:tt,renderDocuments:qo,viewDocument:Ue,showCreateDocumentModal:ds,handleCreateDocument:Yd,showEditDocumentModal:Zd,handleUpdateDocument:Xd,deleteDocument:Qd,updateDocSprintDropdown:Jd,showLinkIssueModal:eu,searchIssuesToLink:tu,linkToIssue:nu,unlinkDocumentFromIssue:su,toggleDocSelection:Gd,selectAllDocs:zd,clearDocSelection:Oo,showBulkMoveModal:Kd,handleBulkMove:Wd,bulkDeleteDocuments:Vd,handleAddDocumentComment:iu,showAddLabelToDocModal:au,addLabelToDoc:ou,removeLabelFromDoc:ru,setDocViewMode:Li,enterSelectionMode:Ci,exitSelectionMode:ls,debounceDocSearch:No,clearDocSearch:Pd,clearDocProjectFilter:Nd,clearAllDocFilters:qd,onDocProjectFilterChange:cs});let kn=[];function lu(){return kn}function cu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Fo(e){const t=e==null?void 0:e.avatar_url,n=E((e==null?void 0:e.name)||"Agent");return t?cu(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${E(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${p(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function du(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{kn=await v.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(n){console.error("Failed to load team agents:",n)}}async function Ai(e){var t;if(e||(e=(t=T())==null?void 0:t.id),!!e)try{kn=await v.getTeamAgents(e),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Ho()}catch(n){h(n.message,"error")}}function Ho(){const e=document.getElementById("agents-list");if(e){if(kn.length===0){e.innerHTML='<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';return}e.innerHTML=kn.map(t=>{const n=p(t.name),s=p(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${Fo(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${yi(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" onclick="deleteAgent('${y(t.id)}', '${y(t.name||"Agent")}')">Delete</button>
      </div>
    `}).join("")}}function ji(){const e=window.projects||[];document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleCreateAgent(event)">
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
          ${e.map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),B()}async function uu(e){var o,r,c;e.preventDefault();const t=(o=T())==null?void 0:o.id;if(!t)return h("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(c=document.getElementById("agent-project"))==null?void 0:c.value;try{let d;i&&a?d=await v.createProjectAgent(a,n,s):d=await v.createTeamAgent(t,n,s),D();const l=p(d.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${l}</code>
          <button type="button" class="btn btn-secondary" onclick="copyAgentKey()">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${l}</code>
        </div>
        <button type="button" class="btn btn-primary" onclick="closeModal(); loadAgents();">Done</button>
      </div>
    `,B()}catch(d){h(`Failed to create agent: ${d.message}`,"error")}return!1}function pu(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{h("Agent API key copied to clipboard","success")}).catch(()=>{h("Failed to copy","error")})}async function mu(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await v.deleteAgent(e),h("Agent deleted","success"),Ai()}catch(n){h(`Failed to delete agent: ${n.message}`,"error")}}Object.assign(window,{loadTeamAgentsQuiet:du,loadAgents:Ai,renderAgents:Ho,showCreateAgentModal:ji,handleCreateAgent:uu,copyAgentKey:pu,deleteAgent:mu,renderAgentAvatar:Fo});let us=[],$n=[],Di=[],Mi=[];function Uo(){return us}function En(){return $n}function gu(e){$n=e}async function ps(){try{us=await v.getMyTeams(),Go()}catch(e){h(e.message,"error")}}function Go(){const e=document.getElementById("team-list");us.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=us.map(t=>`
            <button class="dropdown-item" data-team-json="${E(JSON.stringify(t))}" onclick="selectTeam(JSON.parse(this.dataset.teamJson))">${p(t.name)}</button>
        `).join("")}async function Ri(e,t=!1){ki(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),window.connectWebSocket&&window.connectWebSocket(e.id),await Promise.all([window.loadProjects?window.loadProjects():Promise.resolve(),window.loadLabels?window.loadLabels():Promise.resolve(),zo(),window.loadTeamAgentsQuiet?window.loadTeamAgentsQuiet():Promise.resolve()]),t?window.handleRoute&&window.handleRoute():window.navigateTo&&window.navigateTo(window.currentView)}function ms(){document.getElementById("team-dropdown").classList.toggle("hidden")}function Pi(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function zo(){if(T())try{$n=await v.getTeamMembers(T().id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter()}catch(e){console.error("Failed to load team members:",e)}}async function Ni(){if(T())try{$n=await v.getTeamMembers(T().id),window.buildAssignees&&window.buildAssignees(),window.updateAssigneeFilter&&window.updateAssigneeFilter(),Ko()}catch(e){h(e.message,"error")}}function Ko(){const e=document.getElementById("team-members-list");e.innerHTML=$n.map(t=>`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(t.user_name||"U").charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${p(t.user_name||"Unknown")}</span>
                    <span class="member-email">${p(t.user_email||"")}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${t.role}</span>
                ${t.user_id!==window.currentUser.id&&t.role!=="owner"?`
                    <button class="btn btn-danger btn-small" onclick="removeMember('${y(t.user_id)}')">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}async function gs(){if(T())try{Di=await v.getTeamInvitations(T().id),Wo()}catch{document.getElementById("team-invitations-list").innerHTML=""}}function Wo(){const e=document.getElementById("team-invitations-list");if(Di.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}e.innerHTML=Di.map(t=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${p(t.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${p(t.role)}</span>
                    <span>Expires: ${new Date(t.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteInvitation('${y(t.id)}')">Cancel</button>
        </div>
    `).join("")}async function Vo(){if(T())try{Mi=await v.getTeamAgents(T().id),Yo()}catch(e){h(e.message,"error")}}function Yo(){const e=document.getElementById("team-agents-list");if(e){if(Mi.length===0){e.innerHTML=`<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" onclick="navigateTo('settings'); return false;">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;return}e.innerHTML=Mi.map(t=>{const n=p(t.name),s=p(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${p(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function fs(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleInvite(event)">
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
    `,B()}async function fu(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await v.createInvitation(T().id,t,n),await gs(),D(),h("Invitation sent!","success")}catch(s){h(`Failed to send invitation: ${s.message}`,"error")}return!1}async function hu(e){if(confirm("Are you sure you want to remove this member?"))try{await v.removeMember(T().id,e),await Ni(),h("Member removed!","success")}catch(t){h(`Failed to remove member: ${t.message}`,"error")}}async function vu(e){try{await v.deleteInvitation(T().id,e),await gs(),h("Invitation canceled!","success")}catch(t){h(`Failed to cancel invitation: ${t.message}`,"error")}}function hs(){ms(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateTeam(event)">
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
    `,B()}function qi(){T()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateTeam(event)">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${E(T().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${E(T().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${p(T().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,B())}async function bu(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await v.createTeam(t);await ps(),await Ri(n),D(),h("Team created!","success")}catch(n){h(`Failed to create team: ${n.message}`,"error")}return!1}async function yu(e){if(e.preventDefault(),!T())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await v.updateTeam(T().id,t);ki(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await ps(),D(),h("Team updated!","success")}catch(n){h(`Failed to update team: ${n.message}`,"error")}return!1}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),Object.assign(window,{loadTeams:ps,renderTeamList:Go,selectTeam:Ri,toggleTeamDropdown:ms,toggleUserDropdown:Pi,loadTeamMembersQuiet:zo,loadTeamMembers:Ni,renderTeamMembers:Ko,loadTeamInvitations:gs,renderTeamInvitations:Wo,loadTeamAgents:Vo,renderTeamAgents:Yo,showInviteModal:fs,handleInvite:fu,removeMember:hu,deleteInvitation:vu,showCreateTeamModal:hs,showEditTeamModal:qi,handleCreateTeam:bu,handleUpdateTeam:yu,getTeams:Uo,getMembers:En,setMembers:gu});let z=[];const _n={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function X(){return z}function wu(e){z=e}function Ft(e){const t=z.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return _n[n]||_n.fibonacci}function In(e,t){if(!e)return"No estimate";const s=Ft(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Zo(e){const t=z.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(_n[n]||_n.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function ke(){if(T())try{z=await v.getProjects(T().id),Xo()}catch(e){h(e.message,"error")}}function Xo(){const e=document.getElementById("project-filter"),t=document.getElementById("sprint-project-filter"),n=document.getElementById("board-project-filter"),s=document.getElementById("doc-project-filter"),i=document.getElementById("dashboard-project-filter"),a=e==null?void 0:e.value,o=t==null?void 0:t.value,r=n==null?void 0:n.value,c=s==null?void 0:s.value,d=i==null?void 0:i.value,l='<option value="">All Projects</option>'+z.map(f=>`<option value="${f.id}">${p(f.name)}</option>`).join(""),g='<option value="">Select Project</option>'+z.map(f=>`<option value="${f.id}">${p(f.name)}</option>`).join(""),u=xn();if(e){e.innerHTML=l;let f=a;if(!f||!z.some(b=>b.id===f))if(u&&z.some(b=>b.id===u))f=u;else{const w=new URLSearchParams(window.location.search).get("project");w&&z.some(I=>I.id===w)?f=w:z.length>0&&(f=z[0].id)}f&&(e.value=f,Io(f))}if(t){t.innerHTML=g;const f=o||u;f&&z.some(b=>b.id===f)&&(t.value=f)}if(n){n.innerHTML=g;const f=r||u;f&&z.some(b=>b.id===f)&&(n.value=f)}if(s){s.innerHTML=l;const f=c||u;f&&z.some(b=>b.id===f)&&(s.value=f)}if(i){i.innerHTML=l;const f=d||u;f&&z.some(b=>b.id===f)&&(i.value=f)}}function xn(){return ld()}function _t(e){if(!e)return;Io(e),["project-filter","board-project-filter","sprint-project-filter"].forEach(n=>{const s=document.getElementById(n);s&&(s.value=e)})}function Ht(){const e=document.getElementById("projects-list");if(z.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create your first project to get started</p>
            </div>
        `;return}e.innerHTML=z.map(t=>`
        <div class="grid-item" onclick="viewProject('${y(t.id)}')">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${W(t.color)}20; color: ${W(t.color)}">
                    ${p(t.icon||t.key.charAt(0))}
                </div>
                <div class="grid-item-title">${p(t.name)}</div>
                <button class="grid-item-edit" onclick="event.stopPropagation(); viewProjectSettings('${y(t.id)}')" title="Project settings">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="grid-item-description">${p(t.description||"No description")}</div>
            <div class="grid-item-footer">
                <span>${t.key}</span>
                <span>•</span>
                <span>${t.issue_count} issues</span>
            </div>
        </div>
    `).join("")}function ku(e){_t(e),window.navigateTo&&window.navigateTo("issues")}function vs(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateProject(event)">
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
    `,B()}async function $u(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.createProject(T().id,t),await ke(),Ht(),D(),h("Project created!","success")}catch(n){h(`Failed to create project: ${n.message}`,"error")}return!1}function Eu(e){const t=z.find(s=>s.id===e);if(!t)return;const n=[{value:"fibonacci",label:"Fibonacci (1, 2, 3, 5, 8, 13, 21)"},{value:"linear",label:"Linear (1-10)"},{value:"powers_of_2",label:"Powers of 2 (1, 2, 4, 8, 16, 32, 64)"},{value:"tshirt",label:"T-Shirt (XS, S, M, L, XL)"}];document.getElementById("modal-title").textContent="Edit Project",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateProject(event, '${y(t.id)}')">
            <div class="form-group">
                <label for="project-name">Name</label>
                <input type="text" id="project-name" value="${E(t.name)}" required>
            </div>
            <div class="form-group">
                <label for="project-key">Key</label>
                <input type="text" id="project-key" value="${t.key}" disabled class="input-disabled">
                <small class="form-hint">Project key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="project-description">Description</label>
                <textarea id="project-description">${p(t.description||"")}</textarea>
            </div>
            <div class="form-group">
                <label for="project-color">Color</label>
                <input type="color" id="project-color" value="${W(t.color)}">
            </div>
            <div class="form-group">
                <label for="project-estimate-scale">Estimate Scale</label>
                <select id="project-estimate-scale">
                    ${n.map(s=>`
                        <option value="${s.value}" ${t.estimate_scale===s.value?"selected":""}>${s.label}</option>
                    `).join("")}
                </select>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" id="project-human-rituals-required" ${t.human_rituals_required?"checked":""}>
                    Require humans to complete rituals
                </label>
                <small class="form-hint">When unchecked, humans can close tickets without completing rituals (agents must still complete rituals)</small>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-danger-outline" onclick="confirmDeleteProject('${y(t.id)}')">Delete Project</button>
            </div>
        </form>
    `,B()}async function _u(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await v.updateProject(t,n),await ke(),Ht(),D(),h("Project updated!","success")}catch(s){h(`Failed to update project: ${s.message}`,"error")}return!1}async function Iu(e){const t=z.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await v.deleteProject(e),await ke(),Ht(),D(),h("Project deleted","success")}catch(n){h(`Failed to delete project: ${n.message}`,"error")}}let he=null;async function Qo(e){he=e,z.length===0&&await ke();const t=z.find(n=>n.id===e);if(!t){h("Project not found","error"),window.navigateTo("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),Oi("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function Oi(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!nt||nt.length===0)&&Ut()}function Jo(){he=null,nt=[]}function er(e){he=e}function tr(){return nt}async function nr(){if(!he)return;const e=document.getElementById("ps-name").value.trim();if(!e){h("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await v.updateProject(he,t),await ke(),h("Settings saved","success");const n=z.find(s=>s.id===he);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){h(n.message,"error")}}async function sr(){if(!he)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await v.updateProject(he,n),await ke(),h("Settings saved","success")}catch(s){h(`Failed to save settings: ${s.message}`,"error")}}let nt=[];async function Ut(){if(he)try{nt=await v.getRituals(he),xu(),typeof window._onRitualsChanged=="function"&&window._onRitualsChanged()}catch(e){h(e.message,"error")}}function xu(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=nt.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=nt.filter(s=>s.trigger==="ticket_close"),n=nt.filter(s=>s.trigger==="ticket_claim");Gt("ps-sprint-rituals-list",e,"sprint"),Gt("ps-close-rituals-list",t,"close"),Gt("ps-claim-rituals-list",n,"claim")}function Gt(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>E(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${p(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${p(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):p(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${p(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" onclick="showEditProjectRitualModal('${y(a.id)}')">Edit</button>
        <button class="btn btn-danger btn-small" data-ritual-id="${E(a.id)}" data-ritual-name="${E(a.name)}" onclick="deleteProjectRitual(this.dataset.ritualId, this.dataset.ritualName)">Delete</button>
      </div>
    </div>
  `}).join("")}async function ir(e){if(!he)return;let t=[];try{t=await v.getRitualGroups(he)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleCreateProjectRitual(event)">
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
        <select id="ritual-trigger" onchange="toggleRitualConditions()">
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
        <label for="ritual-group">Group</label>
        <select id="ritual-group" onchange="onRitualGroupChange()">
          <option value="">None (always required)</option>
          ${t.map(n=>`<option value="${E(n.id)}" data-mode="${E(n.selection_mode)}">${p(n.name)} (${p(n.selection_mode)})</option>`).join("")}
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
        ${window.renderConditionBuilder?window.renderConditionBuilder(null):""}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,B()}function Tu(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Su(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function ar(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw h("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await v.createRitualGroup(he,{name:t,selection_mode:n})).id}return e.value||null}async function Lu(e){e.preventDefault();let t;try{t=window.collectConditions?window.collectConditions():null}catch{return!1}let n;try{n=await ar()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await v.createRitual(he,s),await Ut(),D(),h("Ritual created!","success")}catch(i){h(`Failed to create ritual: ${i.message}`,"error")}return!1}async function Cu(e){const t=nt.find(o=>o.id===e);if(!t)return;let n=[];try{n=await v.getRitualGroups(he)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
    <form onsubmit="return handleUpdateProjectRitual(event, '${y(e)}')">
      <div class="form-group">
        <label for="ritual-name">Name</label>
        <input type="text" id="ritual-name" value="${E(t.name)}" required>
      </div>
      <div class="form-group">
        <label for="ritual-prompt">Prompt</label>
        <textarea id="ritual-prompt" required>${p(t.prompt)}</textarea>
      </div>
      <div class="form-group">
        <label for="ritual-trigger">Trigger</label>
        <select id="ritual-trigger" onchange="toggleRitualConditions()">
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
        <label for="ritual-group">Group</label>
        <select id="ritual-group" onchange="onRitualGroupChange()">
          <option value="">None (always required)</option>
          ${n.map(o=>`<option value="${E(o.id)}" data-mode="${E(o.selection_mode)}" ${t.group_id===o.id?"selected":""}>${p(o.name)} (${p(o.selection_mode)})</option>`).join("")}
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
      <div id="ritual-weight-group" class="form-group ${i?"":"hidden"}">
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
        ${window.renderConditionBuilder?window.renderConditionBuilder(t.conditions):""}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,B()}async function Bu(e,t){e.preventDefault();let n;try{n=window.collectConditions?window.collectConditions():null}catch{return!1}let s;try{s=await ar()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await v.updateRitual(t,i),await Ut(),D(),h("Ritual updated!","success")}catch(a){h(`Failed to update ritual: ${a.message}`,"error")}return!1}async function Au(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await v.deleteRitual(e),await Ut(),h("Ritual deleted","success")}catch(n){h(`Failed to delete ritual: ${n.message}`,"error")}}Object.assign(window,{loadProjects:ke,updateProjectFilters:Xo,getSavedProjectId:xn,setGlobalProjectSelection:_t,renderProjects:Ht,viewProject:ku,showCreateProjectModal:vs,handleCreateProject:$u,viewProjectSettings:Qo,switchProjectSettingsTab:Oi,saveProjectSettingsGeneral:nr,saveProjectSettingsRules:sr,clearProjectSettingsState:Jo,showEditProjectModal:Eu,handleUpdateProject:_u,confirmDeleteProject:Iu,getEstimateOptions:Ft,formatEstimate:In,getEstimateScaleHint:Zo,getProjects:X,setProjects:wu,ESTIMATE_SCALES:_n,showCreateProjectRitualModal:ir,handleCreateProjectRitual:Lu,showEditProjectRitualModal:Cu,handleUpdateProjectRitual:Bu,deleteProjectRitual:Au,setCurrentSettingsProjectId:er,getProjectRituals:tr,loadProjectSettingsRituals:Ut,onRitualGroupChange:Su});const bs={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},ys={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let or=0;function ju(e){or=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=rr(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" onclick="addConditionRow()">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function rr(e="",t="",n=""){const s=or++,i=Object.keys(bs).map(d=>`<option value="${d}" ${d===e?"selected":""}>${d}</option>`).join(""),o=(e?bs[e]:bs.estimate).map(d=>`<option value="${d}" ${d===t?"selected":""}>${ys[d]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",c=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" onchange="updateOperatorOptions(${s})">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" onchange="toggleValueInput(${s})">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${E(String(r))}" placeholder="Value"${c?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" onclick="removeConditionRow(${s})">&times;</button>
        </div>
    `}function Du(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",rr()),ws()}function Mu(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ws()}function Ru(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=bs[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${ys[o]}</option>`).join(""),lr(e),ws()}function lr(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function Tn(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ws(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Pu(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,c=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,d=o.querySelector(".condition-value");let l=(a=d==null?void 0:d.value)==null?void 0:a.trim();if(!r&&!c)continue;if(!r)throw Tn("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!c)throw Tn("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const g=`${r}__${c}`;if(n.has(g))throw Tn(`Duplicate condition: ${r} ${ys[c]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${g}`);if(n.add(g),c==="isnull")t[g]=!0;else if(c==="in"||c==="contains")t[g]=l?l.split(",").map(u=>u.trim()).filter(u=>u):[];else if(c==="gte"||c==="lte"){if(!l)throw Tn(`Please enter a numeric value for ${r} ${ys[c]}.`),new Error(`Missing numeric value for ${g}`);const u=parseInt(l,10);if(isNaN(u))throw Tn(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${g}: ${l}`);t[g]=u}else t[g]=l}return ws(),Object.keys(t).length>0?t:null}Object.assign(window,{renderConditionBuilder:ju,addConditionRow:Du,removeConditionRow:Mu,updateOperatorOptions:Ru,toggleValueInput:lr,collectConditions:Pu});function It(){const t=new URLSearchParams(window.location.search).get("project");return t||xn()}function ks(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}let zt=[],$s={},Es=new Set,st=null,cr=null,Fi=[],Sn=[],Hi=[];function dr(){return $s}function Nu(){return st}function ur(){const e=document.getElementById("sprint-project-filter");if(e){if(!e.value){const t=It();t&&X().some(n=>n.id===t)&&(e.value=t)}e.value?it(e.value):document.getElementById("sprints-list").innerHTML=`
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `}}function pr(){const e=document.getElementById("sprint-project-filter").value;e&&(_t(e),ks(e)),it(e)}async function it(e){const t=e||document.getElementById("sprint-project-filter").value;if(t){ep();try{await v.getCurrentSprint(t),zt=await v.getSprints(t),qu(),await _s()}catch(n){h(n.message,"error")}}}function qu(){const e=document.getElementById("sprints-list");if(!e)return;const t=zt.find(a=>a.status==="active"),n=zt.find(a=>a.status==="planned"),s=zt.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
            <div class="sprint-card sprint-now ${t.limbo?"sprint-limbo":""} ${o?"sprint-arrears":""}"
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${y(t.id)}'); } else { window.open('/sprint/${t.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${t.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
                    ${o?'<span class="badge badge-arrears">IN ARREARS</span>':""}
                </div>
                <div class="sprint-card-title">${p(t.name)}</div>
                <div class="sprint-card-budget ${o?"budget-arrears":""}">
                    ${a}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${y(t.id)}', '${y(t.name)}', ${t.budget||"null"}, '${y(t.project_id)}')">Edit Budget</button>
                    ${t.limbo?`
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    `:`
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${y(t.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `,i+=Ou(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${y(n.id)}'); } else { window.open('/sprint/${n.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${p(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${y(n.id)}', '${y(n.name)}', ${n.budget||"null"}, '${y(n.project_id)}')">Edit Budget</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${y(a.id)}'); } else { window.open('/sprint/${a.id}', '_blank'); }" style="cursor: pointer;">
                            <span class="sprint-history-name">${p(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||`
        <div class="empty-state">
            <h3>No sprints yet</h3>
            <p>Sprints are created automatically when you close the current one, or you can create one from the project settings.</p>
        </div>
    `}function Ou(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((F,ee,V)=>Math.min(Math.max(F,ee),V))((new Date-o)/(r-o),0,1),g=360,u=120,f=16,b=f,w=g-f,I=f,S=u-f,P=F=>s===0?S:I+(1-F/s)*(S-I),N=P(s),C=P(0),U=b+(w-b)*l,O=P(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${Is(e.start_date)} → ${Is(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${g} ${u}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${b}" y1="${N}" x2="${w}" y2="${C}" class="burndown-ideal" />
                <line x1="${b}" y1="${N}" x2="${U}" y2="${O}" class="burndown-actual" />
                <circle cx="${U}" cy="${O}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}async function Ui(e,t=!0){var n;try{const s=await v.getSprint(e);if(!s){h("Sprint not found","error"),window.navigateTo("sprints");return}cr=s;const i=(n=T())==null?void 0:n.id,[a,o,r]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getSprintTransactions(e).catch(()=>[]),i?v.getDocuments(i,s.project_id,null,e).catch(()=>[]):[]]);Fi=a,Hi=o,Sn=r,t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Hu()}catch(s){console.error("Failed to load sprint:",s),h("Failed to load sprint","error"),window.navigateTo("sprints")}}async function Fu(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){h("Invalid sprint ID","error"),window.navigateTo("sprints",!1);return}try{await Ui(e,!1)}catch{window.navigateTo("sprints",!1)}}function Hu(){const e=cr,t=Fi;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=["backlog","todo","in_progress","in_review"],i=t.filter(l=>s.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,g)=>l+(g.estimate||0),0),r=a.reduce((l,g)=>l+(g.estimate||0),0);let c="";e.status==="active"?c='<span class="badge badge-status-active">Active</span>':e.status==="planned"?c='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(c='<span class="badge badge-status-completed">Completed</span>');const d=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${p(e.name)}</h2>
                ${c}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${Is(e.start_date)} → ${Is(e.end_date)}
                </div>
            `:""}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${i.length}</div>
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
                <h3>Open Issues (${i.length})</h3>
                ${i.length===0?`
                    <div class="empty-state-small">No open issues in this sprint</div>
                `:`
                    <div class="sprint-issues-list">
                        ${i.map(l=>mr(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?`
                    <div class="empty-state-small">No completed issues yet</div>
                `:`
                    <div class="sprint-issues-list">
                        ${a.map(l=>mr(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Gu()}
            </div>

            ${Sn.length>0?`
            <div class="sprint-detail-section">
                <h3>Documents (${Sn.length})</h3>
                <div class="sprint-issues-list">
                    ${Sn.map(l=>Uu(l)).join("")}
                </div>
            </div>
            `:""}
        </div>
    `}function mr(e){const t=["urgent","high","medium","low"],n=["backlog","todo","in_progress","in_review","done"],s=t.includes(e.priority)?e.priority:"",i=n.includes(e.status)?e.status:"backlog",a=s?`badge-priority-${s}`:"",o=`status-dot-${i}`;return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${y(e.id)}'); } else { window.open('/issue/${encodeURIComponent(e.identifier)}', '_blank'); }">
            <span class="status-dot ${o}"></span>
            <span class="sprint-issue-identifier">${p(e.identifier)}</span>
            <span class="sprint-issue-title">${p(e.title)}</span>
            <span class="sprint-issue-meta">
                ${s?`<span class="badge ${a}">${np(s)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Uu(e){const t=p(e.icon)||"📄";return`
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${y(e.id)}'); } else { window.open('/document/${y(encodeURIComponent(e.id))}', '_blank'); }">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${p(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Fe(e.created_at)}</span>
            </span>
        </div>
    `}function Gu(){const e=Hi;if(!e||e.length===0)return`
            <div class="empty-state-small">
                <p>No budget transactions yet. Points are recorded when issues are marked done.</p>
            </div>
        `;const t=e.reduce((n,s)=>n+s.points,0);return`
        <div class="budget-ledger">
            <div class="budget-ledger-header">
                <span class="text-muted">${e.length} transaction${e.length===1?"":"s"}</span>
                <span class="budget-ledger-total">${t} points total</span>
            </div>
            <div class="budget-ledger-list">
                ${e.map(n=>`
                    <div class="budget-ledger-item">
                        <div class="ledger-item-info">
                            <span class="ledger-item-identifier">${p(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${p(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${zu(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function zu(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Ku(e,t,n,s){const i=s?Zo(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleUpdateBudget(event, '${y(e)}', '${y(s)}')">
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${p(i)}</small>`:""}
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
            <button type="submit" class="btn btn-primary">Save Budget</button>
        </form>
    `,B()}async function Wu(e,t,n){var o;e.preventDefault();const s=document.getElementById("sprint-budget").value,i=s?parseInt(s):null,a=((o=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:o.value)||"this";try{if(await v.updateSprint(t,{budget:i}),a==="planned"||a==="default"){const c=zt.filter(d=>d.status==="planned"&&d.id!==t);for(const d of c)await v.updateSprint(d.id,{budget:i})}a==="default"&&n&&await v.updateProject(n,{default_sprint_budget:i}),await it(),D(),h(`Budget updated${a==="planned"?" (and planned sprints)":a==="default"?" (and set as project default)":""}!`,"success")}catch(r){h(`Failed to update budget: ${r.message}`,"error")}return!1}async function Vu(e){const t=zt.find(c=>c.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,B();const n=["backlog","todo","in_progress","in_review"];let s=0,i=!1,a=!1;try{const[c,d]=await Promise.all([v.getIssues({sprint_id:e,limit:500}),v.getRituals(t.project_id)]);s=c.filter(l=>n.includes(l.status)).length,i=d.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(c){console.error("Failed to load sprint details:",c),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${p(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${y(e)}')">Close Sprint</button>
            </div>
        </div>
    `}async function Yu(e){try{const t=await v.closeSprint(e);await it(),t.limbo?Xu(t):h("Sprint completed!","success")}catch(t){h(`Failed to complete sprint: ${t.message}`,"error")}}async function _s(){var t;const e=(t=document.getElementById("sprint-project-filter"))==null?void 0:t.value;if(e)try{st=await v.getLimboStatus(e),Zu()}catch(n){console.error("Failed to load limbo status:",n)}}function Zu(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!st||!st.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${st.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function Xu(e){const t=document.getElementById("sprint-project-filter").value;document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${p(e.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
        </div>
    `,B(),Qu(t)}async function Qu(e){try{const t=await v.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${p(s.name)} <span class="ritual-mode">(${p(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(s.prompt):p(s.prompt)}</div>
                    ${zi(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Gi(){var t,n,s,i;if(!st)return;const e=((t=document.getElementById("sprint-project-filter"))==null?void 0:t.value)||((n=document.getElementById("ritual-project-filter"))==null?void 0:n.value);document.getElementById("modal-title").textContent="Limbo Status",(s=document.querySelector(".modal"))==null||s.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${st.pending_rituals.map(a=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${a.attestation?a.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${p(a.name)}</strong>
                            <span class="badge badge-ritual-${E(a.approval_mode)}">${p(a.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown?window.renderMarkdown(a.prompt):p(a.prompt)}</div>
                        ${zi(a.attestation)}
                        ${Ju(a,e)}
                    </div>
                `).join("")}
            </div>
            ${((i=st.completed_rituals)==null?void 0:i.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${st.completed_rituals.map(a=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${p(a.name)}</div>
                            ${zi(a.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,B()}function zi(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${p(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${p(Fe(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${window.renderMarkdown?window.renderMarkdown(e.note):p(e.note)}</div>
        </div>
    `}function Ju(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" onclick="approveRitual('${y(e.id)}', '${y(t)}')">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${y(e.id)}', '${y(t)}', '${y(e.name)}')">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function gr(e){for(const t of e)if(!Es.has(t))try{(await v.getSprints(t)).forEach(s=>{$s[s.id]=s}),Es.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function ep(){$s={},Es=new Set,Fi=[],Hi=[],Sn=[]}function tp(e,t){t.forEach(n=>{$s[n.id]=n}),Es.add(e)}function Is(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function np(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}const Ki={},xs=new Map;let Wi=null,Vi=null,Yi=null,Zi=null,Xi=null,Qi=null,fr=!1;function sp(e){Object.assign(Ki,e)}function ip({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(Wi=e),t&&(Vi=t),n&&(Yi=n),s&&(Zi=s),i&&(Xi=i),a&&(Qi=a)}function ap(){return Object.keys(Ki)}function R(e,t=!0){if(t&&xs.set(window.location.href,window.scrollY),Td(e),t){let i;const a=It(),o=["issues","board","sprints"];e==="my-issues"?i="/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:o.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),Wi&&Wi();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Ki[e];s&&s(),t&&window.scrollTo(0,0)}function hr(){var s;const t=window.location.pathname.split("/").filter(Boolean);Zi&&Zi();let n="my-issues";if(t.length===0||t[0]==="")R("my-issues",!1);else{if(Vi&&Vi(t))return;n=t[0],ap().includes(n)?R(n,!1):(n="my-issues",R("my-issues",!1))}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function vr(e){xs.set(window.location.href,window.scrollY),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),Xi&&Xi(e)}function op(e){xs.set(window.location.href,window.scrollY),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),Qi&&Qi(e)}function br(){const e=xs.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function rp(){fr||(fr=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&Yi&&Yi(e.state)){br();return}(t=e.state)!=null&&t.view?R(e.state.view,!1):hr(),br()}))}let Ln=[];function lp(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function cp(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function dp(e,t){const n=e().map(lp),s=t().map(cp);Ln=[...n,...s]}function Cn(e){return e&&Ln.find(t=>t.id===e)||null}function xt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function Ji(e,t=!1){const n=p(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${p(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function Ts(){const e=Ln.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Ln.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,c)=>r.name.localeCompare(c.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=Ln.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function up(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Ts().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${Ji(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}const yr=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let pt=[],ea=null;function ta(){const e=document.getElementById("board-project-filter");if(!e)return;const t=X();if(e.innerHTML='<option value="">Select Project</option>'+t.map(n=>`<option value="${n.id}">${p(n.name)}</option>`).join(""),!e.value){const n=It();n&&t.some(s=>s.id===n)&&(e.value=n)}if(e.value)na(e.value);else{const n=document.getElementById("kanban-board");n&&(n.innerHTML=`
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `)}}function wr(){var t;const e=(t=document.getElementById("board-project-filter"))==null?void 0:t.value;e&&(_t(e),ks(e)),na(e)}async function na(e){var s;const t=e||((s=document.getElementById("board-project-filter"))==null?void 0:s.value);if(!t){ta();return}const n=document.getElementById("kanban-board");n&&(n.innerHTML='<div class="loading-spinner" style="margin: 2rem auto;"></div>');try{pt=await v.getIssues({project_id:t}),mt()}catch(i){h(`Failed to load board: ${i.message}`,"error")}}function mt(){const e=document.getElementById("kanban-board");e&&(e.innerHTML=yr.map(t=>{const n=pt.filter(s=>s.status===t.key);return`
            <div class="kanban-column" data-status="${t.key}"
                 ondrop="handleDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${t.key}"></span>
                        ${t.label}
                    </div>
                    <span class="kanban-column-count">${n.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${n.length===0?`
                        <div class="kanban-column-empty">No issues</div>
                    `:n.map(s=>`
                        <div class="kanban-card" draggable="true" data-id="${E(s.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${y(s.id)}'); } else { window.open('/issue/${encodeURIComponent(s.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${p(s.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${s.identifier}</span>
                                <span class="badge badge-priority-${s.priority}" style="font-size: 10px;">${ye(s.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""))}function pp(e){e.dataTransfer.setData("text/plain",e.target.dataset.id),ea=e.target.dataset.id,e.target.classList.add("dragging")}function mp(e){e.target.classList.remove("dragging"),ea=null}function gp(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function fp(e){e.currentTarget.classList.remove("drag-over")}function hp(e){e.preventDefault(),e.currentTarget.classList.add("drag-over")}function vp(e){e.currentTarget.classList.remove("drag-over")}async function bp(e){e.preventDefault(),e.currentTarget.classList.remove("drag-over");const t=e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.status,s=pt.find(a=>a.id===t);if(!s)return;const i=s.status;if(s.status=n,kr(n,t),mt(),i!==n)try{await v.updateIssue(t,{status:n}),h("Status updated","success")}catch(a){s.status=i,mt(),h(`Failed to update status: ${a.message}`,"error")}}async function yp(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.remove("drag-over");const t=ea||e.dataTransfer.getData("text/plain"),n=e.currentTarget.dataset.id;if(!t||!n||t===n)return;const s=e.currentTarget.closest(".kanban-column"),i=s==null?void 0:s.dataset.status;if(!i)return;const a=pt.find(r=>r.id===t);if(!a)return;const o=a.status;if(a.status=i,kr(i,t,n),mt(),o!==i)try{await v.updateIssue(t,{status:i}),h("Status updated","success")}catch(r){a.status=o,mt(),h(`Failed to update status: ${r.message}`,"error")}}function kr(e,t,n=null){const s=pt.filter(o=>o.status===e&&o.id!==t),i=pt.find(o=>o.id===t);if(!i)return;if(n){const o=s.findIndex(r=>r.id===n);o>=0?s.splice(o,0,i):s.push(i)}else s.push(i);const a=[];yr.forEach(o=>{o.key===e?a.push(...s):a.push(...pt.filter(r=>r.status===o.key))}),pt=a}function Ss(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",$r)},0))}function $r(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",$r))}function Tt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function St(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Lt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Bn(){const e=Tt(),n=document.getElementById("status-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=be(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`,Be(),xe(),Te()}function Ls(){document.getElementById("status-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Bn()}function Cs(){const e=St(),n=document.getElementById("priority-filter-dropdown").querySelector(".multi-select-label");e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=ye(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`,Be(),xe(),Te()}function Bs(){document.getElementById("priority-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),Cs()}function sa(){var s,i;const e=Lt(),t=document.getElementById("label-filter-dropdown"),n=t.querySelector(".multi-select-label");if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`;Be(),xe(),Te()}function As(){document.getElementById("label-filter-dropdown").querySelectorAll('input[type="checkbox"]').forEach(n=>n.checked=!1),sa()}function Er(){var s,i;const e=Lt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}async function wp(){const e=document.getElementById("label-filter-dropdown");if(!e||!T())return;const t=e.querySelector(".multi-select-options");try{const n=await api.getLabels(T().id);t.innerHTML="",n.length===0?t.innerHTML='<div class="multi-select-empty">No labels available</div>':n.forEach(i=>{const a=document.createElement("label");a.className="multi-select-option",a.innerHTML=`
                    <input type="checkbox" value="${i.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${W(i.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${p(i.name)}</span>
                    </span>
                `,t.appendChild(a)});const s=document.createElement("div");s.className="multi-select-actions",s.innerHTML='<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>',t.appendChild(s)}catch(n){console.error("Failed to load labels for filter:",n)}}function _r(){var g,u,f,b,w,I;const e=new URLSearchParams,t=Tt(),n=St(),s=Lt(),i=(g=document.getElementById("assignee-filter"))==null?void 0:g.value,a=(u=document.getElementById("project-filter"))==null?void 0:u.value,o=(f=document.getElementById("sprint-filter"))==null?void 0:f.value,r=(b=document.getElementById("issue-type-filter"))==null?void 0:b.value,c=(w=document.getElementById("group-by-select"))==null?void 0:w.value;t.forEach(S=>e.append("status",S)),n.forEach(S=>e.append("priority",S)),s.forEach(S=>e.append("label",S)),i&&e.set("assignee",i),a&&e.set("project",a),o&&e.set("sprint",o),r&&e.set("issue_type",r),c&&e.set("groupBy",c);const d=e.toString(),l=d?`/issues?${d}`:"/issues";history.replaceState({view:"issues"},"",l),md((I=T())==null?void 0:I.id,d)}function kp(){var d;let e=new URLSearchParams(window.location.search);if(e.toString()===""){const l=pd((d=T())==null?void 0:d.id);if(l){e=new URLSearchParams(l);const g=`/issues?${l}`;history.replaceState({view:"issues"},"",g)}}const t=e.getAll("status");if(t.length>0){const l=document.getElementById("status-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=t.includes(u.value)}),$p())}const n=e.getAll("priority");if(n.length>0){const l=document.getElementById("priority-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=n.includes(u.value)}),Ep())}const s=e.get("assignee");if(s){const l=document.getElementById("assignee-filter");l&&(l.value=s)}const i=e.get("project");if(i){const l=document.getElementById("project-filter");l&&(l.value=i)}const a=e.get("sprint");if(a){const l=document.getElementById("sprint-filter");l&&(l.value=a)}const o=e.get("issue_type");if(o){const l=document.getElementById("issue-type-filter");l&&(l.value=o)}const r=e.getAll("label");if(r.length>0){const l=document.getElementById("label-filter-dropdown");l&&(l.querySelectorAll('input[type="checkbox"]').forEach(u=>{u.checked=r.includes(u.value)}),Er())}const c=e.get("groupBy");if(c){const l=document.getElementById("group-by-select");l&&(l.value=c)}}function $p(){const e=Tt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=be(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Ep(){const e=St(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=ye(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}const Ir=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"}];function xr(e){e.stopPropagation();const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Kt)):(t.classList.remove("hidden"),_e(),Ie(Lo()),setTimeout(()=>{document.addEventListener("click",Kt)},0))}function Tr(e){e.stopPropagation();const t=document.getElementById("display-menu-dropdown"),n=document.getElementById("filter-menu-dropdown");if(!t)return;n&&!n.classList.contains("hidden")&&n.classList.add("hidden"),!t.classList.contains("hidden")?(t.classList.add("hidden"),document.removeEventListener("click",Kt)):(t.classList.remove("hidden"),Up(),setTimeout(()=>{document.addEventListener("click",Kt)},0))}function Kt(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown");!e.target.closest(".filter-menu-container")&&!e.target.closest(".display-menu-container")&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",Kt))}function Sr(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",Kt)}function Lr(e){var t,n,s,i;switch(e){case"project":return(t=document.getElementById("project-filter"))!=null&&t.value?1:0;case"status":return Tt().length;case"priority":return St().length;case"type":return(n=document.getElementById("issue-type-filter"))!=null&&n.value?1:0;case"assignee":return(s=document.getElementById("assignee-filter"))!=null&&s.value?1:0;case"sprint":return(i=document.getElementById("sprint-filter"))!=null&&i.value?1:0;case"labels":return Lt().length;default:return 0}}function _p(){let e=0;return Ir.forEach(t=>{e+=Lr(t.key)}),e}function _e(){const e=document.getElementById("filter-menu-categories");e&&(e.innerHTML=Ir.map(t=>{const n=Lr(t.key);return`
            <div class="filter-menu-category ${Lo()===t.key?"active":""}"
                 onclick="showFilterCategoryOptions('${t.key}')">
                <span>${t.label}</span>
                ${n>0?`<span class="filter-menu-category-count">${n}</span>`:'<span class="filter-menu-category-arrow">→</span>'}
            </div>
        `}).join(""))}function Ie(e){Sd(e),_e();const t=document.getElementById("filter-menu-options");if(t)switch(e){case"project":Ip(t);break;case"status":xp(t);break;case"priority":Tp(t);break;case"type":Sp(t);break;case"assignee":Lp(t);break;case"sprint":Cp(t);break;case"labels":Bp(t);break}}function Ip(e){const t=document.getElementById("project-filter"),n=(t==null?void 0:t.value)||"",s=X()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${n?'<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setProjectFilter('${y(a.id)}')">
                <input type="radio" name="project-filter-radio" value="${E(a.id)}" ${n===a.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${W(a.color)};"></span>
                <span class="filter-option-label">${p(a.name)}</span>
            </label>
        `}),e.innerHTML=i}const js=["backlog","todo","in_progress","in_review"],Ds=["done","canceled"];function xp(e){const t=Tt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=js.every(o=>t.includes(o))&&!Ds.some(o=>t.includes(o))&&t.length===js.length,i=Ds.every(o=>t.includes(o))&&!js.some(o=>t.includes(o))&&t.length===Ds.length;let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearStatusFilterNew()">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${s?"active":""}" onclick="setStatusPreset('open')">Open</button>
            <button class="filter-preset-btn ${i?"active":""}" onclick="setStatusPreset('closed')">Closed</button>
        </div>
    `;n.forEach(o=>{a+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} onchange="toggleStatusOption('${o.value}', event)">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function Tp(e){const t=St(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearPriorityFilterNew()">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} onchange="togglePriorityOption('${i.value}', event)">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function Sp(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setTypeFilter('${a.value}')">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Lp(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=En()||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Assignee</span>
            ${n?'<button class="filter-options-clear" onclick="clearAssigneeFilter()">Clear</button>':""}
        </div>
        <label class="filter-option" onclick="setAssigneeFilter('')">
            <input type="radio" name="assignee-filter-radio" value="" ${n?"":"checked"}>
            <span class="filter-option-label">All Assignees</span>
        </label>
        <label class="filter-option" onclick="setAssigneeFilter('me')">
            <input type="radio" name="assignee-filter-radio" value="me" ${n==="me"?"checked":""}>
            <span class="filter-option-label">Assigned to me</span>
        </label>
        <label class="filter-option" onclick="setAssigneeFilter('unassigned')">
            <input type="radio" name="assignee-filter-radio" value="unassigned" ${n==="unassigned"?"checked":""}>
            <span class="filter-option-label">Unassigned</span>
        </label>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setAssigneeFilter('${y(a.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${E(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${p(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Cp(e){const t=document.getElementById("sprint-filter"),n=(t==null?void 0:t.value)||"",s=t?Array.from(t.options):[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${n?'<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" onclick="setSprintFilter('${y(a.value)}')">
                <input type="radio" name="sprint-filter-radio" value="${E(a.value)}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${p(a.text)}</span>
            </label>
        `}),e.innerHTML=i}function Bp(e){const t=Lt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),c=o==null?void 0:o.querySelector(".label-badge"),d=(r==null?void 0:r.textContent)||"Label",l=(c==null?void 0:c.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${E(a.value)}" ${t.includes(a.value)?"checked":""} onchange="toggleLabelOption('${y(a.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${W(l)};"></span>
                    <span class="filter-option-label">${p(d)}</span>
                </label>
            `}),e.innerHTML=i}function Cr(e){const t=document.getElementById("project-filter");t&&(t.value=e,aa()),_e(),Ie("project"),xe(),Te()}function Ap(){Cr("")}function jp(e){const t=e==="open"?js:Ds,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Bn(),_e(),Ie("status")}function Dp(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Bn()),_e(),Ie("status")}function Mp(){Ls(),_e(),Ie("status"),xe(),Te()}function Rp(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Cs()),_e(),Ie("priority")}function Pp(){Bs(),_e(),Ie("priority"),xe(),Te()}function Br(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,Be()),_e(),Ie("type"),xe(),Te()}function Np(){Br("")}function Ar(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,Be()),_e(),Ie("assignee"),xe(),Te()}function qp(){Ar("")}function jr(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,Be()),_e(),Ie("sprint"),xe(),Te()}function Op(){jr("")}function Fp(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,sa()),_e(),Ie("labels")}function Hp(){As(),_e(),Ie("labels"),xe(),Te()}function Up(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(c=>`
                <div class="display-option ${s===c.value?"active":""}" onclick="setSort('${c.value}')">
                    <span>${c.label}</span>
                    ${s===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(c=>`
                <div class="display-option ${i===c.value?"active":""}" onclick="setGroupBy('${c.value}')">
                    <span>${c.label}</span>
                    ${i===c.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Gp(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,gt()),Sr()}function zp(e){const t=document.getElementById("group-by-select");t&&(t.value=e,oa()),Sr()}function xe(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=document.getElementById("project-filter");if(n!=null&&n.value){const g=(X()||[]).find(u=>u.id===n.value);t.push({category:"project",label:"Project",value:(g==null?void 0:g.name)||"Unknown",clearFn:"clearProjectFilter()"})}const s=Tt();if(s.length>0){const l=s.map(g=>be(g)).join(", ");t.push({category:"status",label:"Status",value:l,clearFn:"clearStatusFilterNew()"})}const i=St();if(i.length>0){const l=i.map(g=>ye(g)).join(", ");t.push({category:"priority",label:"Priority",value:l,clearFn:"clearPriorityFilterNew()"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const l=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:l?l.text:a.value,clearFn:"clearTypeFilter()"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let l;if(o.value==="me")l="Me";else if(o.value==="unassigned")l="Unassigned";else{const u=(En()||[]).find(f=>f.user_id===o.value);l=(u==null?void 0:u.name)||(u==null?void 0:u.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:l,clearFn:"clearAssigneeFilter()"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const l=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(l==null?void 0:l.text)||r.value,clearFn:"clearSprintFilter()"})}const c=Lt();if(c.length>0){const l=document.getElementById("label-filter-dropdown"),g=c.map(u=>{var w;const f=l==null?void 0:l.querySelector(`input[value="${u}"]`),b=(w=f==null?void 0:f.closest("label"))==null?void 0:w.querySelector(".label-name");return(b==null?void 0:b.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:g,clearFn:"clearLabelFilterNew()"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let d=t.map(l=>`
        <span class="filter-chip">
            <span class="filter-chip-label">${l.label}:</span>
            <span class="filter-chip-value">${p(l.value)}</span>
            <button class="filter-chip-remove" onclick="${l.clearFn}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(d+='<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>'),e.innerHTML=d}function Kp(){const e=document.getElementById("project-filter");e&&(e.value=""),Ls(),Bs();const t=document.getElementById("issue-type-filter");t&&(t.value="");const n=document.getElementById("assignee-filter");n&&(n.value="");const s=document.getElementById("sprint-filter");s&&(s.value=""),As(),Be(),xe(),Te()}function Te(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=_p();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}function Wp(){xe(),Te();const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&!e._clickHandlerAdded&&(e.addEventListener("click",n=>{n.stopPropagation()}),e._clickHandlerAdded=!0),t&&!t._clickHandlerAdded&&(t.addEventListener("click",n=>{n.stopPropagation()}),t._clickHandlerAdded=!0)}async function Dr(){var i;const e=document.getElementById("sprint-filter");if(!e)return;const t=(i=document.getElementById("project-filter"))==null?void 0:i.value,n=e.value;let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;if(t||ia(null),t)try{const a=await api.getSprints(t),o=a.find(r=>r.status==="active");o&&(s+=`<option value="current">Current Sprint (${p(o.name)})</option>`),ia(o||null),a.forEach(r=>{const c=r.status==="active"?" (Active)":r.status==="completed"?" (Done)":"";s+=`<option value="${r.id}">${p(r.name)}${c}</option>`})}catch(a){console.error("Failed to load sprints:",a)}e.innerHTML=s,n&&Array.from(e.options).some(o=>o.value===n)&&(e.value=n)}function ia(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${p(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${p(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}async function gt(){var g,u,f,b,w,I,S;if(Co(-1),!T())return;const e=document.getElementById("project-filter").value,t=Tt(),n=St(),s=(g=document.getElementById("assignee-filter"))==null?void 0:g.value,i=(f=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:f.trim();if(!e&&X().length===0){document.getElementById("issues-list").innerHTML=`
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;return}Vp();const a={limit:1e3},o=((b=document.getElementById("sort-by-select"))==null?void 0:b.value)||"created-desc",[r,c]=o.includes("-")?o.split("-"):[o,null];a.sort_by=r,c&&(a.order=c),t.length>0&&(a.status=t),n.length>0&&(a.priority=n),s&&(s==="me"?a.assignee_id=(w=wi())==null?void 0:w.id:a.assignee_id=s);const d=(I=document.getElementById("sprint-filter"))==null?void 0:I.value;if(d)if(d==="current"){if(e)try{const N=(await api.getSprints(e)).find(C=>C.status==="active");N&&(a.sprint_id=N.id)}catch(P){console.error("Failed to resolve current sprint:",P)}}else a.sprint_id=d;const l=(S=document.getElementById("issue-type-filter"))==null?void 0:S.value;l&&(a.issue_type=l),i&&i.length>=2&&(a.search=i);try{let P;e?(a.project_id=e,P=await api.getIssues(a)):X().length>0&&(P=await api.getTeamIssues(T().id,a));const N=Lt();N.length>0&&(P=P.filter(U=>!U.labels||U.labels.length===0?!1:U.labels.some(O=>N.includes(O.id)))),He(P);const C=[...new Set(P.map(U=>U.project_id))];await gr(C),at()}catch(P){h(P.message,"error")}}function Mr(){clearTimeout(Ad()),jd(setTimeout(()=>{gt()},300))}function Vp(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}function Be(){_r(),gt()}async function aa(){var t;const e=(t=document.getElementById("project-filter"))==null?void 0:t.value;e&&_t(e),await Dr(),ta(),ur(),Be()}async function oa(){if(_r(),Rr()==="sprint"){const e=we(),t=[...new Set(e.map(n=>n.project_id))];await gr(t)}at()}function Rr(){const e=document.getElementById("group-by-select");return e?e.value:""}const Pr=["backlog","todo","in_progress","in_review","done","canceled"],Nr=["urgent","high","medium","low","no_priority"],qr=["task","bug","feature","chore","docs","tech_debt","epic"];function ft(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function Wt(e){const t=ft(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function at(){const e=document.getElementById("issues-list");if(!e)return;e.classList.add("issue-list-linear");const t=we();if(t.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;return}const n=Rr();n==="status"?Yp(e,t):n==="priority"?Zp(e,t):n==="type"?Xp(e,t):n==="assignee"?Qp(e,t):n==="sprint"?Jp(e,t):e.innerHTML=Wt(t)+t.map(s=>Pe(s)).join("")}function Yp(e,t){const n={};Pr.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=Wt(t);Pr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${ve(i)}</span>
                    <span class="group-title">${be(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ft(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Pe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Zp(e,t){const n={};Nr.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=Wt(t);Nr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Ge(i)}</span>
                    <span class="group-title">${ye(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ft(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Pe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Xp(e,t){const n={};qr.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=Wt(t);qr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" onclick="toggleGroup('${i}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${et(i)}</span></span>
                    <span class="group-title">${et(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${ft(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>Pe(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Qp(e,t){const n={},s="__unassigned__";n[s]=[];const i=Ts();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=Wt(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" onclick="toggleGroup('${s}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${ft(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>Pe(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const c=xt(o)||"Unknown",d=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${o.id}">
                <div class="issue-group-header" onclick="toggleGroup('${y(o.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Rt(o,"avatar-small")}</span>
                    <span class="group-title">${p(c)}${p(d)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${ft(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>Pe(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Jp(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(c=>{c.sprint_id?(s[c.sprint_id]||(s[c.sprint_id]=[],i.push(c.sprint_id)),s[c.sprint_id].push(c)):s[n].push(c)});const a={active:0,planned:1,completed:2},o=dr();i.sort((c,d)=>{const l=o[c],g=o[d],u=l?a[l.status]??3:3,f=g?a[g.status]??3:3;return u-f});let r=Wt(t);i.forEach(c=>{const d=s[c];if(d.length===0)return;const l=o[c],g=l?l.name:c,u=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",f=c.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${f}">
                <div class="issue-group-header" onclick="toggleGroup('${f}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${p(g)}${u}</span>
                    <span class="group-count">${d.length}</span>
                    <span class="group-points">${ft(d)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${d.map(b=>Pe(b)).join("")}
                </div>
            </div>
        `}),s[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" onclick="toggleGroup('${n}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${s[n].length}</span>
                    <span class="group-points">${ft(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(c=>Pe(c)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function em(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function Pe(e){const t=e.assignee_id?Cn(e.assignee_id):null,n=t?xt(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?In(e.estimate,e.project_id):"",a=e.sprint_id?dr()[e.sprint_id]:null,o=a?a.name:null;return`
        <div class="issue-row" data-issue-id="${E(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${E(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${y(e.id)}')" title="Priority: ${ye(e.priority)}">
                    ${Ge(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${y(e.id)}')" title="Status: ${be(e.status)}">
                    ${ve(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${et(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${y(e.id)}'); }">${p(e.title)}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(r=>`
                            <span class="issue-label" style="background: ${W(r.color)}20; color: ${W(r.color)}">${p(r.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${y(e.id)}')" title="Sprint: ${o?p(o):"None"}">
                    ${o?`<span class="sprint-badge">${p(o)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${y(e.id)}')" title="Estimate: ${i||"None"}">
                    ${i?`<span class="estimate-badge">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${y(e.id)}')" title="${E(n||"Unassigned")}">
                    ${n?Rt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Ge(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function ve(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}function tm(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function nm(){const e=document.getElementById("new-comment"),t=document.getElementById("mention-suggestions");if(!e||!t||e.dataset.mentionsBound==="true")return;e.dataset.mentionsBound="true";const n=()=>{t.classList.add("hidden"),t.innerHTML=""},s=()=>{const i=e.selectionStart||0,o=e.value.slice(0,i).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!o){n();return}const r=o[2].toLowerCase(),c=En().map(d=>({id:d.id,name:d.name||d.email||"User",email:d.email||"",handle:tm(d)})).filter(d=>!r||d.handle.includes(r)||d.name.toLowerCase().includes(r)||d.email.toLowerCase().includes(r)).slice(0,6);if(!c.length){n();return}t.innerHTML=c.map(d=>`
            <button type="button" class="mention-suggestion" data-handle="${E(d.handle)}">
                <span class="mention-name">${p(d.name)}</span>
                <span class="mention-handle">@${p(d.handle)}</span>
            </button>
        `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".mention-suggestion").forEach(d=>{d.addEventListener("click",()=>{const l=d.dataset.handle,g=e.value.slice(0,i).replace(/@([a-zA-Z0-9._-]*)$/,`@${l} `),u=e.value.slice(i);e.value=g+u,e.focus(),n()})})};e.addEventListener("input",s),e.addEventListener("click",s),e.addEventListener("keydown",i=>{i.key==="Escape"&&n()}),e.addEventListener("blur",()=>{setTimeout(n,150)})}let ht=!0,An=null,ra=null,la=null,Ms=null;function ca(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function da(e){return e.user_name||e.user_email||"Unknown"}function ua(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?E(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" onclick="event.preventDefault(); document.getElementById('comments-section')?.scrollIntoView({behavior: 'smooth'})">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${p(be(t(e.old_value)))}</strong> to <strong>${p(be(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${p(ye(t(e.old_value)))}</strong> to <strong>${p(ye(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${p(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${p(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=p(e.field_name||"ritual"),i=e.new_value?E(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||p(e.field_name)}`:"Updated issue"}}function Or(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function sm(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,c=!1;const d=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=d.exec(t))!==null;)if(c=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const g=l[1],u=document.createElement("a");u.href=`#/issue/${g}`,u.className="issue-link",u.textContent=g,o.appendChild(u),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const g=document.createElement("span");g.className="mention",g.textContent="@"+l[3],o.appendChild(g),r=l.index+l[0].length}c&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function im(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g;if(!n.test(t))return;const s=document.createDocumentFragment();let i=0,a=!1;n.lastIndex=0;let o;for(;(o=n.exec(t))!==null;){a=!0,o.index>i&&s.appendChild(document.createTextNode(t.slice(i,o.index)));const r=o[1],c=document.createElement("a");c.href=`#/issue/${r}`,c.className="issue-link",c.textContent=r,s.appendChild(c),i=o.index+o[0].length}a&&(i<t.length&&s.appendChild(document.createTextNode(t.slice(i))),e.parentNode.replaceChild(s,e))}function am(e){if(!e)return"";const t=Ct(e),n=document.createElement("div");return n.innerHTML=t,Or(n,sm),n.innerHTML}function Rs(e){if(!e)return"";const t=Ct(e),n=document.createElement("div");return n.innerHTML=t,Or(n,im),n.innerHTML}function Fr(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Hr(){ht=!ht;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",ht),n&&n.classList.toggle("rotated",ht)}async function Ps(e){try{An=await v.getTicketRitualsStatus(e),Ur(e)}catch(t){console.error("Failed to load ticket rituals:",t),An=null}}function Ur(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!An){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=An;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&(ht=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",ht);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",ht);const r=n.some(l=>l.trigger==="ticket_close"),c=n.some(l=>l.trigger==="ticket_claim");let d="⚠️ Complete these rituals:";r&&c?d="⚠️ Pending rituals (claim before starting, close before completing):":c?d="⚠️ Complete these rituals before claiming this ticket:":r&&(d="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${d}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${p(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?Ct(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${p(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Fe(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${Ct(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${ym(l,e)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `:""}
        ${s.length>0?`
            <div class="ticket-rituals-completed">
                ${s.map(l=>`
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${p(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${p(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Fe(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Ns(e){try{let t;e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t?await Q(t.id,!1):R("my-issues",!1)}catch{R("my-issues",!1)}}async function Q(e,t=!0){try{ht=!0;const[n,s,i,a,o,r]=await Promise.all([v.getIssue(e),v.getComments(e),v.getActivities(e),v.getSubIssues(e),v.getRelations(e),v.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),d=[...r.pending_rituals||[],...r.completed_rituals||[]].filter(k=>k.attestation&&k.attestation.note).map(k=>({id:`attestation-${k.attestation.id}`,author_name:k.attestation.attested_by_name||"Unknown",content:k.attestation.note,created_at:k.attestation.attested_at,is_attestation:!0,ritual_name:k.name,is_pending:!k.attestation.approved_at}));An=r;const l=[...s,...d].sort((k,Ne)=>new Date(k.created_at)-new Date(Ne.created_at)),g=[n.parent_id?v.getIssue(n.parent_id):Promise.resolve(null),v.getSprints(n.project_id).catch(k=>(console.error("Failed to load sprints:",k),[]))],[u,f]=await Promise.all(g),b=o.filter(k=>k.relation_type==="blocks"&&k.direction==="outgoing"),w=o.filter(k=>k.relation_type==="blocked_by"||k.relation_type==="blocks"&&k.direction==="incoming"),I=o.filter(k=>k.relation_type==="relates_to");t&&history.pushState({issueId:e,view:A()},"",`/issue/${n.identifier}`),as(n),Ao(f),document.querySelectorAll(".view").forEach(k=>k.classList.add("hidden"));const S=document.getElementById("issue-detail-view");S.classList.remove("hidden");const P=A()||"my-issues",N=X().find(k=>k.id===n.project_id),C=n.assignee_id?Cn(n.assignee_id):null,U=C?xt(C):null,O=n.sprint_id?f.find(k=>k.id===n.sprint_id):null,F=we(),ee=F.findIndex(k=>k.id===n.id),V=ee>0?F[ee-1]:null,Y=ee>=0&&ee<F.length-1?F[ee+1]:null,K=ee>=0;S.querySelector("#issue-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${P}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${K?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${V?`onclick="viewIssue('${y(V.id)}')"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${ee+1} / ${F.length}</span>
                            <button class="issue-nav-btn" ${Y?`onclick="viewIssue('${y(Y.id)}')"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${N?p(N.name):"Project"} › ${p(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(n.title)}</h1>

                    ${u?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(u.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${y(u.id)}'); }">${u.identifier}: ${p(u.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" onclick="editDescription('${y(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </button>
                        </div>
                        <div class="description-content markdown-body ${n.description?"":"empty"}"${n.description?"":` onclick="editDescription('${y(n.id)}')"`}>
                            ${n.description?Rs(n.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showCreateSubIssueModal('${y(n.id)}', '${y(n.project_id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${a.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:a.map(k=>`
                                <div class="sub-issue-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${y(k.id)}'); } else { window.open('/issue/${encodeURIComponent(k.identifier)}', '_blank'); }">
                                    <span class="sub-issue-status">${ve(k.status)}</span>
                                    <span class="sub-issue-id">${k.identifier}</span>
                                    <span class="sub-issue-title">${p(k.title)}</span>
                                    ${k.estimate?`<span class="sub-issue-estimate">${k.estimate}pts</span>`:""}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" onclick="showAddRelationModal('${y(n.id)}')">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${b.length===0&&w.length===0&&I.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${w.map(k=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ve(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${y(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${p(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${y(n.id)}', '${y(k.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${b.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${b.map(k=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${ve(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${y(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${p(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${y(n.id)}', '${y(k.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${I.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${I.map(k=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${ve(k.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(k.related_issue_identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${y(k.related_issue_id)}'); }" class="relation-link">${k.related_issue_identifier}</a>
                                            <span class="relation-title">${p(k.related_issue_title)}</span>
                                            <button class="relation-delete" onclick="deleteRelation('${y(n.id)}', '${y(k.id)}'); event.stopPropagation();" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                        </div>
                    </div>

                    <div id="ticket-rituals-section" class="issue-detail-section hidden">
                        <div class="section-header section-header-collapsible" onclick="toggleTicketRituals()">
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

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" onclick="toggleSection('activity')">
                            <h3>Activity</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(k=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ca(k.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ua(k)}</span>
                                        <span class="activity-actor">by ${p(da(k))}</span>
                                        <span class="activity-time">${Fe(k.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" onclick="toggleSection('comments')">
                            <h3>Comments</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${l.length===0?`
                                <div class="comments-empty">No comments yet</div>
                            `:l.map(k=>`
                                <div class="comment ${k.is_attestation?"comment-attestation":""} ${k.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${k.is_attestation?"avatar-attestation":""}">${k.is_attestation?k.is_pending?"⏳":"✓":(k.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${p(k.author_name||"User")}</span>
                                            ${k.is_attestation?`<span class="comment-ritual-badge">${k.is_pending?"Pending approval — ":""}Ritual: ${p(k.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Fe(k.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${am(k.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" onsubmit="return handleAddComment(event, '${y(n.id)}')">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" onclick="showDetailDropdown(event, 'status', '${y(n.id)}')">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${ve(n.status)}
                                <span>${be(n.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" onclick="showDetailDropdown(event, 'priority', '${y(n.id)}')">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Ge(n.priority)}
                                <span>${ye(n.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" onclick="showDetailDropdown(event, 'type', '${y(n.id)}')">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${n.issue_type||"task"}">${et(n.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" onclick="showDetailDropdown(event, 'assignee', '${y(n.id)}')">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${U?`${Rt(C,"avatar-small")}<span>${p(U)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" onclick="showDetailDropdown(event, 'sprint', '${y(n.id)}')">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${O?p(O.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" onclick="showDetailDropdown(event, 'labels', '${y(n.id)}')">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${n.labels&&n.labels.length>0?n.labels.map(k=>`
                                        <span class="issue-label" style="background: ${W(k.color)}20; color: ${W(k.color)}">${p(k.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${N?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(N.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" onclick="showDetailDropdown(event, 'estimate', '${y(n.id)}')">
                            <span class="property-label">Estimate</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${In(n.estimate,n.project_id)}</span>
                            </button>
                        </div>

                        ${n.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(n.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${p(n.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${E(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${E(n.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `;const le=document.querySelector(".sidebar-overflow-trigger"),Se=document.querySelector(".overflow-menu-dropdown");if(le&&Se){const k=()=>{Se.classList.add("hidden"),le.setAttribute("aria-expanded","false")},Ne=()=>{const te=Se.classList.toggle("hidden");le.setAttribute("aria-expanded",String(!te))};le.addEventListener("click",Ne),document.addEventListener("click",te=>{!le.contains(te.target)&&!Se.contains(te.target)&&k()}),Se.addEventListener("keydown",te=>{te.key==="Escape"&&(k(),le.focus())}),Se.querySelectorAll(".overflow-menu-item").forEach(te=>{te.addEventListener("click",()=>{const wt=te.dataset.issueId;k(),te.dataset.action==="edit"?window.showEditIssueModal(wt):te.dataset.action==="delete"&&window.deleteIssue(wt)})})}Ur(n.id),nm();const $e=document.getElementById("new-comment");if($e){const k=gd(n.id);k&&($e.value=k),$e.addEventListener("input",()=>{vi(n.id,$e.value)}),$e.addEventListener("keydown",Ne=>{var te;Ne.key==="Enter"&&(Ne.metaKey||Ne.ctrlKey)&&(Ne.preventDefault(),(te=$e.closest("form"))==null||te.requestSubmit())})}ra=V?V.id:null,la=Y?Y.id:null,Ms&&document.removeEventListener("keydown",Ms),Ms=k=>{if(k.metaKey||k.ctrlKey||k.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||k.target.tagName==="INPUT"||k.target.tagName==="TEXTAREA"||k.target.tagName==="SELECT"||k.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;k.key==="ArrowLeft"&&ra?(k.preventDefault(),Q(ra)):k.key==="ArrowRight"&&la&&(k.preventDefault(),Q(la));const te={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[k.key];if(te){const wt=document.querySelector(`.property-row[data-field="${te}"]`);wt&&(k.preventDefault(),wt.click())}},document.addEventListener("keydown",Ms)}catch(n){h(`Failed to load issue: ${n.message}`,"error")}}async function om(e,t){e.preventDefault();const n=document.getElementById("new-comment").value;vi(t,null);try{await v.createComment(t,n),await Q(t),h("Comment added!","success")}catch(s){vi(t,n),h(`Failed to add comment: ${s.message}`,"error")}return!1}async function rm(e){const t=fe()||await v.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
            </div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${p(t.description||"")}</textarea>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `,i.classList.remove("empty"),i.removeAttribute("onclick");const a=document.getElementById("edit-description"),o=fd(e);o&&(a.value=o),a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?ss(e,r):ss(e,null);const c=document.getElementById("edit-description-preview");c&&c.style.display!=="none"&&Gr()}),a.addEventListener("keydown",r=>{var c,d;r.key==="Enter"&&(r.metaKey||r.ctrlKey)&&(r.preventDefault(),(c=document.getElementById("save-description-edit"))==null||c.click()),r.key==="Escape"&&(r.preventDefault(),(d=document.getElementById("cancel-description-edit"))==null||d.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{ss(e,null),s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,t.description||i.setAttribute("onclick",`editDescription('${y(t.id)}')`),i.innerHTML=t.description?Rs(t.description):'<span class="add-description-link">Add description...</span>'}),document.getElementById("save-description-edit").addEventListener("click",async()=>{var c;const r=(c=document.getElementById("edit-description"))==null?void 0:c.value;if(r!==void 0)try{await v.updateIssue(e,{description:r}),ss(e,null),h("Description updated","success"),Q(e,!1)}catch(d){h(`Failed to update description: ${d.message}`,"error")}})}function Gr(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?Rs(n):'<span class="text-muted">Nothing to preview.</span>'}function lm(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Gr():s.focus()}function cm(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleAddRelation(event, '${y(e)}')">
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
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${y(e)}')">
                <input type="hidden" id="selected-related-issue-id">
            </div>
            <div id="relation-search-results" class="link-results">
                <p class="empty-state-small">Enter a search term to find issues</p>
            </div>
            <div id="selected-issue-display" class="selected-issue-display" style="display: none;">
                <span class="selected-issue-label">Selected:</span>
                <span id="selected-issue-info"></span>
                <button type="button" class="btn btn-danger btn-tiny" onclick="clearSelectedRelation()">×</button>
            </div>
            <button type="submit" class="btn btn-primary" id="add-relation-btn" disabled>Add Relation</button>
        </form>
    `,B(),document.getElementById("relation-issue-search").focus()}async function dm(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=T())==null?void 0:s.id,o=(await v.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" onclick="selectIssueForRelation('${y(r.id)}', '${y(r.identifier)}', '${y(r.title)}')">
                <span class="link-result-id">${p(r.identifier)}</span>
                <span class="link-result-title">${p(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function um(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function pm(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function mm(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return h("Please select an issue","error"),!1;try{n==="blocked_by"?await v.createRelation(s,t,"blocks"):await v.createRelation(t,s,n),D(),h("Relation added","success"),Q(t)}catch(i){h(`Failed to add relation: ${i.message}`,"error")}return!1}async function gm(e,t){try{await v.deleteRelation(e,t),h("Relation removed","success"),Q(e)}catch(n){h(`Failed to remove relation: ${n.message}`,"error")}}async function fm(){const e=document.getElementById("ritual-project-filter");e&&(await ke(),e.innerHTML='<option value="">Select Project</option>'+X().map(t=>`<option value="${E(t.id)}">${p(t.name)}</option>`).join(""))}async function zr(){const e=document.getElementById("rituals-project-filter");if(!e)return;window._onRitualsChanged=hm,await ke(),e.innerHTML='<option value="">Select a project</option>'+X().map(n=>`<option value="${E(n.id)}">${p(n.name)}</option>`).join("");const t=It()||xn();t&&X().some(n=>n.id===t)?(e.value=t,pa()):document.getElementById("rituals-content").innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>'}async function pa(){const e=document.getElementById("rituals-project-filter").value,t=document.getElementById("rituals-content");if(!e){document.getElementById("rituals-tabs").classList.add("hidden"),t.innerHTML='<div class="empty-state">Select a project to view and manage rituals.</div>';return}er(e),t.innerHTML='<div class="loading">Loading rituals...</div>';try{await Ut()}catch(n){t.innerHTML=`<div class="empty-state">Error loading rituals: ${p(n.message)}</div>`}}function hm(){const e=document.getElementById("rituals-content"),t=tr(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
        <div id="rituals-tab-sprint" class="settings-tab-content">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a sprint</p>
                <button class="btn btn-primary" onclick="showCreateProjectRitualModal('every_sprint')">+ Create Ritual</button>
            </div>
            <div id="rv-sprint-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-close" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a ticket</p>
                <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_close')">+ Create Ritual</button>
            </div>
            <div id="rv-close-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-claim" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when claiming a ticket (moving to in_progress)</p>
                <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_claim')">+ Create Ritual</button>
            </div>
            <div id="rv-claim-rituals-list" class="rituals-list"></div>
        </div>
    `,Gt("rv-sprint-rituals-list",n,"sprint"),Gt("rv-close-rituals-list",s,"close"),Gt("rv-claim-rituals-list",i,"claim")}function Kr(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function vm(e,t){try{await v.approveAttestation(e,t),h("Ritual approved!","success"),await _s(),Gi()}catch(n){h(n.message,"error")}}async function Wr(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{bm(s,e,t)}),B()}async function bm(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await v.completeGateRitual(t,n,s||null),h("Ritual completed!","success"),await _s();const i=Nu();i&&!i.in_limbo?(D(),h("Limbo cleared! Next sprint is now active.","success")):Gi()}catch(i){h(i.message,"error")}return!1}function ym(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${E(e.id)}" data-issue-id="${E(t)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-ritual-id="${E(e.id)}" data-issue-id="${E(t)}" data-ritual-name="${E(e.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-ritual-id="${E(e.id)}" data-issue-id="${E(t)}" data-ritual-name="${E(e.name)}" data-ritual-prompt="${E(e.prompt||"")}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`:`<button class="btn btn-small btn-secondary" data-ritual-id="${E(e.id)}" data-issue-id="${E(t)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`}function wm(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${p(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{km(i,e,t)}),B()}async function km(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return h("A note is required for this attestation.","error"),!1;try{await v.attestTicketRitual(t,n,s),h("Ritual attested!","success"),D(),await Ps(n)}catch(i){h(i.message,"error")}return!1}async function $m(e,t){try{await v.attestTicketRitual(e,t),h("Ritual attested!","success"),await Ps(t)}catch(n){h(n.message,"error")}}async function Em(e,t){try{await v.approveTicketRitual(e,t),h("Ritual approved!","success"),await Ps(t)}catch(n){h(n.message,"error")}}function _m(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{Im(s,e,t)}),B()}async function Im(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await v.completeTicketGateRitual(t,n,s||null),h("Ritual completed!","success"),D(),await Ps(n)}catch(i){h(i.message,"error")}return!1}function Ct(e){if(!e)return"";try{j.setOptions({breaks:!0,gfm:!0});const n=j.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return _o.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function ma(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function xm(e,t,n,s,i,a,o,r){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(i)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${y(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${p(o)}</strong>${r?` ${ma(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",d=>{Tm(d,e,t,n)}),B(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Tm(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await v.completeTicketGateRitual(t,n,i||null),h(`GATE ritual "${s}" approved!`,"success"),D(),jn()}catch(a){h(`Failed to complete gate ritual: ${a.message}`,"error")}}function Vr(e,t,n,s,i,a,o,r){xm(e,t,n,s,i,a,o,r)}function Sm(e,t,n,s,i,a,o,r,c){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${p(i)}</span>
                    <span class="gate-approval-issue-title">${p(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${y(t)}')">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${p(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${p(o)}</strong>${r?` ${ma(r)}`:""}</div>`:""}
                ${c?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${Ct(c)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Lm(l,e,t,n)}),B(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function Lm(e,t,n,s){e.preventDefault();try{await v.approveTicketRitual(t,n),h(`Review ritual "${s}" approved!`,"success"),D(),jn()}catch(i){h(`Failed to approve review ritual: ${i.message}`,"error")}}function Yr(e,t,n,s,i,a,o,r,c){Sm(e,t,n,s,i,a,o,r,c)}let ga=[];async function jn(){if(!T())return;const e=document.getElementById("gate-approvals-list");if(e){e.innerHTML='<div class="loading">Loading pending approvals...</div>';try{const t=await Promise.all(X().map(async i=>{const[a,o]=await Promise.all([v.getPendingApprovals(i.id),v.getLimboStatus(i.id)]);return{project:i,approvals:a,limbo:o}})),n=[],s=[];for(const{project:i,approvals:a,limbo:o}of t)if(n.push(...a),o&&o.in_limbo){const r=(o.pending_rituals||[]).filter(c=>{var d;return(d=c.attestation)!=null&&d.approved_at?!1:c.approval_mode==="gate"||!!c.attestation});r.length>0&&s.push({project:i,rituals:r})}Bd(n),ga=s,Zr()}catch(t){e.innerHTML=`<div class="empty-state"><h3>Error loading approvals</h3><p>${p(t.message)}</p></div>`}}}function Zr(){const e=document.getElementById("gate-approvals-list");if(!e)return;const t=Cd(),n=ga.length>0,s=!wd();if(t.length===0&&!n){s?e.innerHTML=`
                <div class="empty-state approvals-explainer">
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
                    <button class="btn btn-secondary" onclick="dismissApprovalsExplainer()">Got it!</button>
                </div>
            `:e.innerHTML=`
                <div class="empty-state">
                    <h3>No pending approvals</h3>
                    <p>All rituals have been completed. Nice work!</p>
                </div>
            `;return}let i="";n&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${ga.map(({project:l,rituals:g})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${p(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${g.map(u=>{const f=u.attestation&&!u.attestation.approved_at,b=f?"⏳":"○",w=f?`<span class="gate-waiting-info">Attested by <strong>${p(u.attestation.attested_by_name||"Unknown")}</strong></span>`:u.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',I=f?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${E(u.id)}"
                                            data-project-id="${E(l.id)}">Approve</button>`:u.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${E(u.id)}"
                                                data-project-id="${E(l.id)}"
                                                data-ritual-name="${E(u.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${b} ${p(u.name)}
                                                    <span class="badge badge-ritual-${E(u.approval_mode)}">${p(u.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${p(u.prompt)}</span>
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
        `);const a=l=>l.pending_approvals||[],o=l=>g=>{const u=a(g).filter(l);return u.length>0?{...g,_filteredApprovals:u}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(fa).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${c.map(fa).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${d.map(fa).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const g=l.dataset;Vr(g.ritualId,g.issueId,g.ritualName,g.ritualPrompt,g.issueIdentifier,g.issueTitle,g.requestedBy,g.requestedAt)})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const g=l.dataset;Yr(g.ritualId,g.issueId,g.ritualName,g.ritualPrompt,g.issueIdentifier,g.issueTitle,g.requestedBy,g.requestedAt,g.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await v.approveAttestation(l.dataset.ritualId,l.dataset.projectId),h("Sprint ritual approved!","success"),await jn()}catch(g){l.disabled=!1,h(g.message,"error")}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{Wr(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function Cm(){kd(),Zr()}function fa(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${p(s.requested_by_name)}</strong>${s.requested_at?` (${ma(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${Ct(s.attestation_note)}</div>`:"",c=i?"review-approve-btn":"gate-approve-btn",d=i?"Approve":"Complete",l=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>';return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${p(s.ritual_name)} ${l}</span>
                    <span class="gate-ritual-prompt">${p(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                <button class="btn btn-small btn-primary ${c}"
                    data-ritual-id="${E(s.ritual_id)}"
                    data-issue-id="${E(e.issue_id)}"
                    data-ritual-name="${E(s.ritual_name)}"
                    data-ritual-prompt="${E(s.ritual_prompt)}"
                    data-issue-identifier="${E(e.identifier)}"
                    data-issue-title="${E(e.title)}"
                    data-requested-by="${E(s.requested_by_name||"")}"
                    data-requested-at="${E(s.requested_at||"")}"
                    data-attestation-note="${E(s.attestation_note||"")}">${d}</button>
            </div>
        `}).join("");return`
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(e.identifier)}" onclick="event.preventDefault(); viewIssue('${y(e.issue_id)}')" class="gate-issue-link">
                    <span class="gate-issue-id">${p(e.identifier)}</span>
                    <span class="gate-issue-title">${p(e.title)}</span>
                </a>
                <span class="badge badge-${e.status}">${e.status.replace("_"," ")}</span>
            </div>
            <div class="gate-issue-project">${p(e.project_name)}</div>
            <div class="gate-rituals">
                ${n}
            </div>
        </div>
    `}window.completeGateFromList=Vr,window.approveReviewFromList=Yr;let ha=[];async function va(){try{ha=await v.getApiKeys(),Bm()}catch(e){h(e.message,"error")}}function Bm(){const e=document.getElementById("api-keys-list");if(e){if(ha.length===0){e.innerHTML='<p class="empty-state">No API keys yet. Create one to get started.</p>';return}e.innerHTML=ha.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${p(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${p(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${yi(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${yi(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${y(t.id)}', '${y(t.name)}')">Revoke</button>
            `:""}
        </div>
    `).join("")}}function ba(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,B()}async function Am(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await v.createApiKey(t);D(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
            <div class="api-key-created">
                <p class="warning-text">Copy your API key now. You won't be able to see it again!</p>
                <div class="api-key-display">
                    <code id="new-api-key">${n.key}</code>
                    <button type="button" class="btn btn-secondary" onclick="copyApiKey()">Copy</button>
                </div>
                <div class="api-key-instructions">
                    <p>Use this key in the CLI:</p>
                    <code>chaotic auth set-key ${n.key}</code>
                </div>
                <button type="button" class="btn btn-secondary" onclick="closeModal(); loadApiKeys();">Done</button>
            </div>
        `,B()}catch(n){h(n.message,"error")}return!1}async function Xr(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),h("API key copied to clipboard","success")}catch{h("Failed to copy","error")}}async function Qr(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await v.revokeApiKey(e),h("API key revoked","success"),await va()}catch(n){h(n.message,"error")}}window.loadApiKeys=va,window.showCreateApiKeyModal=ba,window.handleCreateApiKey=Am,window.copyApiKey=Xr,window.revokeApiKey=Qr;let qs=!1,ot=0,vt=[],Os=[];function jm(e){Os=e,vt=[...e]}function Jr(){return qs}function Dm(){if(qs)return;qs=!0,ot=0,vt=[...Os];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&Fs()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Mm(n.target.value)),t.addEventListener("keydown",Pm),Dn(),requestAnimationFrame(()=>t.focus())}function Fs(){qs=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Mm(e){const t=e.toLowerCase().trim();t?vt=Os.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):vt=[...Os],ot=0,Dn()}function Dn(){const e=document.getElementById("command-results");if(!e)return;if(vt.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};vt.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===ot?"selected":""}"
                     data-index="${s}"
                     onclick="executeCommand(${s})"
                     onmouseenter="selectCommand(${s})">
                    <div class="command-item-icon">${r.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${r.title}</div>
                        <div class="command-item-subtitle">${r.subtitle}</div>
                    </div>
                    ${r.shortcut?`<div class="command-item-shortcut"><kbd>${r.shortcut}</kbd></div>`:""}
                </div>
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function Rm(e){ot=e,Dn()}function el(e){const t=vt[e];t&&(Fs(),t.action())}function Pm(e){switch(e.key){case"ArrowDown":e.preventDefault(),ot=Math.min(ot+1,vt.length-1),Dn();break;case"ArrowUp":e.preventDefault(),ot=Math.max(ot-1,0),Dn();break;case"Enter":e.preventDefault(),el(ot);break;case"Escape":e.preventDefault(),Fs();break}}window.selectCommand=Rm,window.executeCommand=el;let Mn=[],ya=[];function bt(){return Mn}function Vt(e){Mn=e}async function wa(){var i,a;const e=T(),t=wi();if(!e||!t)return;const n=(i=document.getElementById("my-issues-status-filter"))==null?void 0:i.value,s=(a=document.getElementById("dashboard-project-filter"))==null?void 0:a.value;qm();try{const o={assignee_id:t.id,status:n||void 0,limit:1e3};let r;s?r=await v.getIssues({...o,project_id:s}):r=await v.getTeamIssues(e.id,o),Mn=r,Rn()}catch(o){h(o.message,"error")}}async function Yt({showLoading:e=!0}={}){const t=T();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{ya=await v.getTeamActivities(t.id,0,10),Nm()}catch{n&&(n.innerHTML='<div class="activity-empty">Failed to load activity</div>')}}function Nm(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ya.length){e.innerHTML='<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>';return}e.innerHTML=ya.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" onclick="navigateToIssueByIdentifier('${y(t.issue_identifier)}'); return false;"><strong>${p(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" onclick="viewDocument('${y(t.document_id)}'); return false;"><strong>${s} ${p(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${p(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${ca(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${ua(t)}${n}</span>
                <span class="activity-actor">by ${p(da(t))}</span>
                <span class="activity-time">${Fe(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function qm(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function Hs(){wa()}function Rn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),Mn.length===0){e.innerHTML=`
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;return}e.innerHTML=Mn.map(t=>Pe(t)).join("")}}window.filterMyIssues=Hs;let ze=null,rt=0,Zt=null,Xt=null,Pn=null,ka=!1;function tl(){return cd()}function nl(){dd()}function sl(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Om(){ze||(ze=document.createElement("div"),ze.id="onboarding-overlay",ze.className="onboarding-overlay",document.getElementById("app").appendChild(ze))}function Nn(){if(!ze)return;const e=ka?al():il(),t=e[rt],n=e.map((s,i)=>`<span class="onboarding-dot${i===rt?" active":""}${i<rt?" completed":""}"></span>`).join("");ze.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function il(){return[{html:`
                <h2>Welcome to Chaotic!</h2>
                <p class="onboarding-subtitle">A lightweight issue tracker built for teams that ship from the command line.</p>
                <p class="onboarding-description">Let's set up your workspace. This takes about 30 seconds.</p>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Get Started</button>
                </div>
                <div class="onboarding-skip">
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `},{html:`
                <h2>Create Your Team</h2>
                <p class="onboarding-subtitle">Teams organize your people and projects.</p>
                <form id="onboarding-team-form" onsubmit="window._onboardingCreateTeam(event); return false;">
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
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=sl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
                <h2>Create Your First Project</h2>
                <p class="onboarding-subtitle">Projects group related issues. One per repo or component.</p>
                <form id="onboarding-project-form" onsubmit="window._onboardingCreateProject(event); return false;">
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
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=sl(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
                <h2>Create Your First Issue</h2>
                <p class="onboarding-subtitle">What's the first thing your team needs to work on?</p>
                <form id="onboarding-issue-form" onsubmit="window._onboardingCreateIssue(event); return false;">
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
                    <a href="#" onclick="window._onboardingSkip(); return false;">Skip setup</a>
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
                    <button class="btn btn-primary" onclick="window._onboardingFinish()">Go to Dashboard</button>
                </div>
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&Zt&&(e.textContent=`${Zt.name} (${Zt.key})`),t&&Xt&&(t.textContent=`${Xt.name} (${Xt.key})`),n&&Pn&&(n.textContent=`${Pn.identifier} - ${Pn.title}`)}}]}function al(){const e='<div class="onboarding-skip"><a href="#" onclick="window._onboardingFinish(); return false;">Close tour</a></div>';return[{html:`
                <h2>Welcome Back!</h2>
                <p class="onboarding-subtitle">Here's a quick tour of Chaotic.</p>
                <div class="onboarding-tips">
                    <h3>Your Dashboard</h3>
                    <p class="onboarding-description">The dashboard shows your assigned issues and recent activity across all projects.</p>
                </div>
                <div class="onboarding-actions">
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Next</button>
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
                    <button class="btn btn-primary" onclick="window._onboardingNext()">Next</button>
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
                    <button class="btn btn-primary" onclick="window._onboardingFinish()">Got it!</button>
                </div>
                ${e}
            `}]}function $a(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function Ea(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function Qt(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}window._onboardingNext=function(){const e=ka?al():il();rt<e.length-1&&(rt++,Nn())},window._onboardingSkip=function(){nl(),Ia(),window.initApp&&window.initApp()},window._onboardingFinish=function(){nl(),Ia(),window.initApp&&window.initApp()},window._onboardingCreateTeam=async function(e){e.preventDefault(),Ea("onboarding-team-error"),Qt("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{Zt=await api.createTeam({name:t,key:n}),rt++,Nn()}catch(s){$a("onboarding-team-error",s.message||"Failed to create team"),Qt("onboarding-team-submit",!1)}},window._onboardingCreateProject=async function(e){e.preventDefault(),Ea("onboarding-project-error"),Qt("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{Xt=await api.createProject(Zt.id,{name:t,key:n}),rt++,Nn()}catch(s){$a("onboarding-project-error",s.message||"Failed to create project"),Qt("onboarding-project-submit",!1)}},window._onboardingCreateIssue=async function(e){e.preventDefault(),Ea("onboarding-issue-error"),Qt("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{Pn=await api.createIssue(Xt.id,{title:t}),rt++,Nn()}catch(n){$a("onboarding-issue-error",n.message||"Failed to create issue"),Qt("onboarding-issue-submit",!1)}};function _a(e=!1){ka=e,rt=0,Zt=null,Xt=null,Pn=null,Om(),Nn()}function Ia(){ze&&(ze.remove(),ze=null)}function Us(){ud(),_a(!0)}window.showOnboarding=_a,window.hideOnboarding=Ia,window.resetOnboarding=Us,window.hasCompletedOnboarding=tl;const ol=["backlog","todo","in_progress","in_review","done","canceled"],rl=["no_priority","urgent","high","medium","low"],Fm=["task","bug","feature","chore","docs","tech_debt","epic"];let Ke=[],ll=Promise.resolve();function cl(){return Ke}function dl(e){Ke=e}async function ul(e,t,n){var l,g;e.preventDefault(),Je();const i=e.currentTarget.getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown",t==="status")a.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${ol.map((u,f)=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${y(n)}', 'status', '${u}')">
                    ${ve(u)}
                    <span>${be(u)}</span>
                    <span class="dropdown-shortcut">${f+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")a.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${rl.map((u,f)=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${y(n)}', 'priority', '${u}')">
                    ${Ge(u)}
                    <span>${ye(u)}</span>
                    <span class="dropdown-shortcut">${f}</span>
                </button>
            `).join("")}
        `;else if(t==="type")a.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${Fm.map(u=>`
                <button class="dropdown-option" data-value="${u}" onclick="updateIssueField('${y(n)}', 'issue_type', '${u}')">
                    <span class="issue-type-badge type-${u}">${et(u)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const u=Ts();a.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" onclick="updateIssueField('${y(n)}', 'assignee_id', null)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${u.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:u.map(({assignee:f,indent:b},w)=>`
                <button class="dropdown-option" onclick="updateIssueField('${y(n)}', 'assignee_id', '${y(f.id)}')">
                    ${Rt(f,"avatar-small")}
                    <span>${Ji(f,b)}</span>
                    ${w<9?`<span class="dropdown-shortcut">${w+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const u=document.querySelector(`.issue-row[data-issue-id="${n}"]`),f=(u==null?void 0:u.dataset.projectId)||((l=fe())==null?void 0:l.project_id),b=Ft(f);a.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${b.map((w,I)=>`
                <button class="dropdown-option" onclick="updateIssueField('${y(n)}', 'estimate', ${w.value})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${w.label}</span>
                    ${I<9?`<span class="dropdown-shortcut">${I}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const u=we(),f=bt(),b=fe(),w=u.find(V=>V.id===n)||f.find(V=>V.id===n)||b,I=new Set(((w==null?void 0:w.labels)||[]).map(V=>V.id));a.innerHTML='<div class="dropdown-header">Loading labels...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const S=a.getBoundingClientRect();let P=i.bottom+4,N=i.left;N+S.width>window.innerWidth-8&&(N=i.right-S.width),P+S.height>window.innerHeight-8&&(P=i.top-S.height-4),a.style.top=`${P}px`,a.style.left=`${Math.max(8,N)}px`,Mt(a,{multiSelect:!0});let C=[];const U=T();if(U)try{C=await v.getLabels(U.id)}catch(V){console.error("Failed to load labels:",V)}if(!a.parentNode)return;ml(a,n,C,I);const O=a.getBoundingClientRect();let F=i.bottom+4,ee=i.left;ee+O.width>window.innerWidth-8&&(ee=i.right-O.width),F+O.height>window.innerHeight-8&&(F=i.top-O.height-4),a.style.top=`${F}px`,a.style.left=`${Math.max(8,ee)}px`,a.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const u=we(),f=bt(),b=fe(),w=u.find(Y=>Y.id===n)||f.find(Y=>Y.id===n)||b,I=(w==null?void 0:w.project_id)||((g=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:g.dataset.projectId);a.innerHTML='<div class="dropdown-header">Loading sprints...</div>',a.classList.add("dropdown-positioning"),document.body.appendChild(a);const S=a.getBoundingClientRect();let P=i.bottom+4,N=i.left;N+S.width>window.innerWidth-8&&(N=i.right-S.width),P+S.height>window.innerHeight-8&&(P=i.top-S.height-4),a.style.top=`${P}px`,a.style.left=`${Math.max(8,N)}px`,Mt(a);let C=[];if(I)try{C=await v.getSprints(I),tp(I,C)}catch(Y){console.error("Failed to load sprints:",Y)}if(!a.parentNode)return;const U=C.filter(Y=>Y.status!=="completed"||Y.id===(w==null?void 0:w.sprint_id));a.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" onclick="updateIssueField('${y(n)}', 'sprint_id', null)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${U.map((Y,K)=>`
                <button class="dropdown-option" onclick="updateIssueField('${y(n)}', 'sprint_id', '${y(Y.id)}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${p(Y.name)}${Y.status==="active"?" (Active)":""}</span>
                    ${K<9?`<span class="dropdown-shortcut">${K+1}</span>`:""}
                </button>
            `).join("")}
        `;const O=a.getBoundingClientRect();let F=i.bottom+4,ee=i.left;ee+O.width>window.innerWidth-8&&(ee=i.right-O.width),F+O.height>window.innerHeight-8&&(F=i.top-O.height-4),a.style.top=`${F}px`,a.style.left=`${Math.max(8,ee)}px`,a.classList.remove("dropdown-positioning");const V=Y=>{const K=Y.key;if(K==="Escape"){Je(),document.removeEventListener("keydown",V),vn(null);return}const le=parseInt(K);if(isNaN(le))return;const Se=a.querySelectorAll(".dropdown-option");let $e=!1;le===0?(qn(n,"sprint_id",null),$e=!0):le>=1&&le<Se.length&&(Se[le].click(),$e=!0),$e&&(document.removeEventListener("keydown",V),vn(null))};vn(V),document.addEventListener("keydown",V);return}a.classList.add("dropdown-positioning"),document.body.appendChild(a);const o=a.getBoundingClientRect();let r=i.bottom+4,c=i.left;c+o.width>window.innerWidth-8&&(c=i.right-o.width),r+o.height>window.innerHeight-8&&(r=i.top-o.height-4),a.style.top=`${r}px`,a.style.left=`${Math.max(8,c)}px`,a.classList.remove("dropdown-positioning");const d=u=>{const f=u.key;if(f==="Escape"){Je(),document.removeEventListener("keydown",d);return}const b=parseInt(f);if(isNaN(b))return;let w=!1;if(t==="status"&&b>=1&&b<=6)qn(n,"status",ol[b-1]),w=!0;else if(t==="priority"&&b>=0&&b<=4)qn(n,"priority",rl[b]),w=!0;else if(t==="estimate"){const I=fe(),S=Ft(I==null?void 0:I.project_id);b>=0&&b<S.length&&(qn(n,"estimate",S[b].value),w=!0)}w&&(document.removeEventListener("keydown",d),vn(null))};vn(d),document.addEventListener("keydown",d),Mt(a)}function Hm(e,t,n){e.stopPropagation(),ul(e,t,n)}function Um(e,t,n){ll=ll.then(()=>pl(e,t,n))}async function pl(e,t,n){const s=we(),i=bt(),a=fe(),o=s.find(l=>l.id===e)||i.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),c=r.indexOf(t);let d;if(c>=0?d=r.filter(l=>l!==t):d=[...r,t],n){const l=c<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const g=(await v.updateIssue(e,{label_ids:d})).labels||[],u=s.findIndex(I=>I.id===e);u!==-1&&(s[u].labels=g,He([...s]));const f=i.findIndex(I=>I.id===e);f!==-1&&(i[f].labels=g,Vt([...i])),(a==null?void 0:a.id)===e&&as({...a,labels:g});const b=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(b&&b.parentNode){const I=s.find(S=>S.id===e)||i.find(S=>S.id===e);I&&(b.outerHTML=Pe(I))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=g.length>0?g.map(I=>`
                    <span class="issue-label" style="background: ${W(I.color)}20; color: ${W(I.color)}">${p(I.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch{if(h("Failed to update labels","error"),n){const l=c>=0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}}}function ml(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${y(t)}')">
            <button class="btn btn-small" onclick="createLabelFromDropdown('${y(t)}')">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-label-id="${i.id}" onclick="event.stopPropagation(); toggleIssueLabel('${y(t)}', '${y(i.id)}', this)">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${W(i.color)}20; color: ${W(i.color)}">${p(i.name)}</span>
                </button>
            `}).join("")}
    `}function Gm(e,t){e.key==="Enter"&&(e.preventDefault(),gl(t))}async function gl(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=T();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await v.createLabel(s.id,{name:i}),o=await v.getLabels(s.id);is(o),a!=null&&a.id&&await pl(e,a.id,null);const r=we(),c=bt(),d=fe(),l=r.find(u=>u.id===e)||c.find(u=>u.id===e)||d,g=new Set(((l==null?void 0:l.labels)||[]).map(u=>u.id));t&&ml(t,e,o,g),n.value=""}catch(a){h(a.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}function Gs(){const e=document.getElementById("create-issue-labels-label");e&&(Ke.length===0?e.textContent="Labels":e.textContent=`Labels (${Ke.length})`)}function xa(e){const t=So();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" onclick="createLabelForCreateIssue()">Add</button>
        </div>
        ${t.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${t.map(n=>{const s=Ke.includes(n.id);return`
                <button class="dropdown-option label-toggle ${s?"selected":""}" onclick="event.stopPropagation(); toggleCreateIssueLabelSelection('${y(n.id)}')">
                    <span class="label-check">${s?"✓":""}</span>
                    <span class="issue-label" style="background: ${W(n.color)}20; color: ${W(n.color)}">${p(n.name)}</span>
                </button>
            `}).join("")}
    `}function zm(e){const t=Ke.indexOf(e);t>=0?Ke.splice(t,1):Ke.push(e),Gs();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&xa(n)}function Km(e){e.key==="Enter"&&(e.preventDefault(),fl())}async function fl(){const e=T();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await v.createLabel(e.id,{name:s}),a=await v.getLabels(e.id);is(a),i!=null&&i.id&&!Ke.includes(i.id)&&Ke.push(i.id),Gs(),t&&xa(t),n.value=""}catch(i){h(i.message||"Failed to create label","error")}finally{n.disabled=!1,n.focus()}}}async function qn(e,t,n){var i;Je();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const a={};a[t]=n;const o=await v.updateIssue(e,a);if(!o||!o.id)throw new Error("Invalid response from server");const r=we(),c=r.findIndex(u=>u.id===e);c!==-1&&(r[c]=o,He([...r]));const d=bt(),l=d.findIndex(u=>u.id===e);l!==-1&&(d[l]=o,Vt([...d]));const g=fe();if((g==null?void 0:g.id)===e&&as(o),s&&s.parentNode){const u=r.find(f=>f.id===e)||d.find(f=>f.id===e)||o;if(u){s.outerHTML=Pe(u);const f=document.querySelector(`.issue-row[data-issue-id="${e}"]`);f&&(f.classList.add("updated"),setTimeout(()=>f.classList.remove("updated"),500))}}if(h("Issue updated","success"),t==="status"){const u=(i=document.getElementById("project-filter"))==null?void 0:i.value;if(u)try{const b=(await v.getSprints(u)).find(w=>w.status==="active");ia(b||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&Wm(t,o)}}catch(a){h(a.message||"Failed to update issue","error"),s&&s.classList.remove("updating")}}function Wm(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".issue-detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const c of a){const d=c.querySelector(".property-label");if(d&&d.textContent.toLowerCase()===i.toLowerCase()){o=c;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${ve(t.status)}
            <span>${be(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Ge(t.priority)}
            <span>${ye(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${et(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const c=t.assignee_id?Cn(t.assignee_id):null,d=c?xt(c):null;r.innerHTML=d?`${Rt(c,"avatar-small")}<span>${p(d)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const c=Md(),d=t.sprint_id&&c?c.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${d?p(d.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${In(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}const hl=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Jt(e=null){var o;const t=e||((o=document.getElementById("project-filter"))==null?void 0:o.value);dl([]);const n=X().map(r=>`
        <option value="${r.id}" ${r.id===t?"selected":""}>${p(r.name)}</option>
    `).join("");document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" onchange="updateCreateIssueProject()">
                    <option value="">Select project</option>
                    ${n}
                </select>
                <span class="create-issue-breadcrumb">› New issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" onclick="toggleCreateIssueOptions()">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-options-content">
                    <div class="create-issue-template">
                        <label for="create-issue-template">Template</label>
                        <select id="create-issue-template" onchange="applyIssueTemplate(this.value)">
                            ${hl.map(r=>`<option value="${r.id}">${r.label}</option>`).join("")}
                        </select>
                    </div>
                    <div class="create-issue-meta">
                        <label for="create-issue-due-date">Due date</label>
                        <input type="date" id="create-issue-due-date" class="create-issue-date-input">
                    </div>
                </div>
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('status', event)">
                            ${ve("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${Ge("no_priority")}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" onclick="toggleCreateIssueDropdown('type', event)">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" onclick="toggleCreateIssueDropdown('labels', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('assignee', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('estimate', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('sprint', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span id="create-issue-sprint-label">Sprint</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" id="btn-create-and-new" class="btn btn-secondary" onclick="handleCreateIssueAndNew()">Create & New</button>
                <button type="button" id="btn-create-issue" class="btn btn-primary" onclick="handleCreateIssueNew()">Create issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
            <input type="hidden" id="create-issue-sprint" value="">
        </div>
    `,B(),Gs();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=hd();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{xo(s.value,i.value)}),i.addEventListener("input",()=>{xo(s.value,i.value)}),s.focus()}function Vm(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Ym(e){const t=hl.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function Zm(e,t){const n=X().find(s=>s.id===t);dl([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?p(n.name):"Project"}</span>
                <span class="create-issue-breadcrumb">› New sub-issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Sub-issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" onclick="toggleCreateIssueOptions()">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('status', event)">
                            ${ve("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${Ge("no_priority")}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" onclick="toggleCreateIssueDropdown('type', event)">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" onclick="toggleCreateIssueDropdown('labels', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('assignee', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('estimate', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${y(e)}', '${y(t)}')">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `,B(),Gs(),document.getElementById("create-issue-title").focus()}async function Xm(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null;if(!n){h("Please enter a title","error");return}try{const l=await v.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:d,label_ids:cl(),parent_id:e});D(),h(`Created sub-issue ${l.identifier}`,"success"),Q(e)}catch(l){h(`Failed to create sub-issue: ${l.message}`,"error")}}async function Qm(e,t){var a,o;Je();const s=t.currentTarget.getBoundingClientRect(),i=document.createElement("div");if(i.className="inline-dropdown dropdown-positioning",i.style.top=`${s.top-8}px`,i.style.left=`${s.left}px`,i.style.transform="translateY(-100%)",i.style.animation="none",e==="status"){const r=document.getElementById("create-issue-status").value;i.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${["backlog","todo","in_progress","in_review","done"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('status', '${c}', '${be(c)}')">
                    ${ve(c)}
                    <span>${be(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const r=document.getElementById("create-issue-priority").value;i.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${["no_priority","urgent","high","medium","low"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('priority', '${c}', '${ye(c)}')">
                    ${Ge(c)}
                    <span>${ye(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const r=document.getElementById("create-issue-type").value;i.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===r?"selected":""}" onclick="setCreateIssueField('type', '${c}', '${et(c)}')">
                    <span class="issue-type-badge type-${c}">${et(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!T())i.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let r=So();if(r.length===0)try{r=await v.getLabels(T().id),is(r)}catch(c){console.error("Failed to load labels:",c)}xa(i),document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Mt(i,{multiSelect:!0});return}else if(e==="assignee"){const r=document.getElementById("create-issue-assignee").value,c=Ts();i.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:d,indent:l})=>{const g=xt(d)||"User";return`
                <button class="dropdown-option ${d.id===r?"selected":""}" onclick="setCreateIssueField('assignee', '${y(d.id)}', '${y(g)}')">
                    ${Rt(d,"avatar-small")}
                    <span>${Ji(d,l)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const r=document.getElementById("create-issue-estimate").value,c=(a=document.getElementById("create-issue-project"))==null?void 0:a.value,d=Ft(c);i.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${d.map(l=>{const g=l.value===null?"":String(l.value);return`
                <button class="dropdown-option ${g===r?"selected":""}" onclick="setCreateIssueField('estimate', '${g}', '${y(l.value?l.label:"Estimate")}')">
                    <span>${p(l.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const r=document.getElementById("create-issue-sprint").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value;if(!c)i.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const l=(await v.getSprints(c)).filter(g=>g.status!=="completed");i.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${r?"":"selected"}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${l.map(g=>`
                        <button class="dropdown-option ${g.id===r?"selected":""}" onclick="setCreateIssueField('sprint', '${y(g.id)}', '${y(g.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${p(g.name)}${g.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{i.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.remove("dropdown-positioning")})}),Mt(i)}function Jm(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function eg(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=p(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${ve(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Ge(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${et(t)}</span><span id="create-issue-type-label">${s}</span>`)}Je()}async function vl({keepOpen:e=!1}={}){var w,I;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,c=document.getElementById("create-issue-estimate").value,d=c?parseInt(c):null,l=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,g=(I=document.getElementById("create-issue-due-date"))==null?void 0:I.value,u=g?new Date(`${g}T00:00:00Z`).toISOString():null;if(!t){h("Please select a project","error");return}if(!n){h("Please enter a title","error");return}const f=document.getElementById("btn-create-issue"),b=document.getElementById("btn-create-and-new");f&&(f.disabled=!0),b&&(b.disabled=!0);try{const S=await v.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:d,sprint_id:l,label_ids:cl(),due_date:u});h(`Created ${S.identifier}`,"success"),vd(),A()==="issues"?gt():A()==="my-issues"&&wa(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(D(),Q(S.id))}catch(S){h(`Failed to create issue: ${S.message}`,"error")}finally{f&&(f.disabled=!1),b&&(b.disabled=!1)}}async function tg(){await vl({keepOpen:!1})}async function ng(){await vl({keepOpen:!0})}async function bl(e){try{const t=await v.getIssue(e),n=await v.getSprints(t.project_id),i=Ft(t.project_id).map(a=>`
            <option value="${a.value===null?"":a.value}" ${t.estimate===a.value?"selected":""}>${p(a.label)}</option>
        `).join("");document.getElementById("modal-title").textContent="Edit Issue",document.getElementById("modal-content").innerHTML=`
            <form onsubmit="return handleUpdateIssue(event, '${y(e)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${E(t.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${p(t.description||"")}</textarea>
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
                        <option value="epic" ${t.issue_type==="epic"?"selected":""}>Epic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${i}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${n.filter(a=>a.status!=="completed").map(a=>`
                            <option value="${a.id}" ${t.sprint_id===a.id?"selected":""}>${p(a.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,B()}catch(t){h(`Failed to load issue: ${t.message}`,"error")}}async function sg(e,t){e.preventDefault();try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),c=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const d={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:c&&c.value?c.value:null};await v.updateIssue(t,d),D(),await Q(t),h("Issue updated!","success")}catch(n){h(`Failed to update issue: ${n.message}`,"error")}}async function ig(e){if(confirm("Are you sure you want to delete this issue?"))try{await v.deleteIssue(e),await gt(),await ke(),R("issues"),h("Issue deleted!","success")}catch(t){h(`Failed to delete issue: ${t.message}`,"error")}}async function ag(){const e=document.getElementById("epics-project-filter");if(!e)return;await ke(),e.innerHTML='<option value="">All Projects</option>'+X().map(n=>`<option value="${E(n.id)}">${p(n.name)}</option>`).join("");const t=It()||xn();t&&X().some(n=>n.id===t)&&(e.value=t),Ta()}function yl(){var t;const e=(t=document.getElementById("epics-project-filter"))==null?void 0:t.value;e&&(_t(e),ks(e)),Ta()}async function Ta(){var t,n;const e=document.getElementById("epics-list");if(e){e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((t=T())!=null&&t.id)){e.innerHTML='<div class="empty-state">Select a team to view epics.</div>';return}const s=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value;let i;if(s?i=await v.getIssues({project_id:s,issue_type:"epic"}):i=await v.getTeamIssues(T().id,{issue_type:"epic"}),!i||i.length===0){e.innerHTML=`
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Click "+ New Epic" above or use the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await v.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));og(a,e)}catch(s){e.innerHTML=`<div class="empty-state">Failed to load epics: ${p(s.message||String(s))}</div>`}}}function og(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(g=>g.status==="done"||g.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",c=`status-${(s.status||"backlog").replace(/_/g,"-")}`,d=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,g=>g.toUpperCase()),l=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${E(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${p(s.identifier)}</td>
                <td class="epic-title">${p(s.title)}</td>
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&op(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function wl(){var n;const e=(n=document.getElementById("epics-project-filter"))==null?void 0:n.value,t=X().map(s=>`
        <option value="${E(s.id)}" ${s.id===e?"selected":""}>${p(s.name)}</option>
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
    `,B(),document.getElementById("create-epic-form").addEventListener("submit",rg),document.getElementById("create-epic-title").focus()}async function rg(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){h("Please select a project","error");return}if(!n){h("Please enter a title","error");return}try{const i=await v.createIssue(t,{title:n,description:s||null,issue_type:"epic"});D(),h(`Created epic ${i.identifier}`,"success"),Ta()}catch(i){h(`Failed to create epic: ${i.message}`,"error")}}async function Sa(e){try{let t;if(e.includes("-")?t=await v.getIssueByIdentifier(e):t=await v.getIssue(e),t){if(t.issue_type!=="epic"){window.viewIssue?window.viewIssue(t.id,!1):R("epics",!1);return}await La(t.id,!1)}else R("epics",!1)}catch{R("epics",!1)}}async function La(e,t=!0){try{const[n,s,i,a]=await Promise.all([v.getIssue(e),v.getSubIssues(e),v.getActivities(e),v.getComments(e)]);if(n.issue_type!=="epic"){window.viewIssue?window.viewIssue(e,t):R("epics",!1);return}t&&history.pushState({epicId:e,view:A()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(w=>w.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=A()||"epics",c=X().find(w=>w.id===n.project_id),d=n.assignee_id?Cn(n.assignee_id):null,l=d?xt(d):null,g=s.length,u=s.filter(w=>w.status==="done"||w.status==="canceled").length,f=g>0?Math.round(u/g*100):0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${r}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${c?p(c.name):"Project"} › ${p(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${p(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${Rs(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${f===100?" epic-progress-complete":""}" style="width: ${f}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${u} of ${g} done</span>
                                <span>${f}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?`
                                <div class="sub-issues-empty">No sub-issues</div>
                            `:s.map(w=>{const I=w.assignee_id?Cn(w.assignee_id):null,S=I?xt(I):null;return`
                                <div class="sub-issue-item" data-issue-id="${E(w.id)}" data-identifier="${E(w.identifier)}">
                                    <span class="sub-issue-status">${ve(w.status)}</span>
                                    <span class="sub-issue-id">${p(w.identifier)}</span>
                                    <span class="sub-issue-title">${p(w.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(w.status||"backlog").replace(/_/g,"-")}">${be(w.status)}</span>
                                    ${S?`<span class="sub-issue-assignee">${p(S)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?`
                                <div class="activity-empty">No activity yet</div>
                            `:i.map(w=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${ca(w.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${ua(w)}</span>
                                        <span class="activity-actor">by ${p(da(w))}</span>
                                        <span class="activity-time">${Fe(w.created_at)}</span>
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
                                            <span class="comment-author">${p(w.author_name||"User")}</span>
                                            <span class="comment-date">${Fe(w.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${p(w.content||"")}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                    `:""}
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row">
                            <span class="property-label">Status</span>
                            <span class="property-value-static">
                                ${ve(n.status)}
                                ${be(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Ge(n.priority)}
                                ${ye(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?p(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${In(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(w=>`
                                    <span class="issue-label" style="background: ${W(w.color)}20; color: ${W(w.color)}">${p(w.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${c?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${p(c.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const b=o.querySelector(".sub-issues-list");b&&b.addEventListener("click",w=>{const I=w.target.closest(".sub-issue-item");I&&I.dataset.issueId&&window.viewIssue&&window.viewIssue(I.dataset.issueId)})}catch(n){h(`Failed to load epic: ${n.message}`,"error")}}function lg(e){let t=!1,n=null;return function(i){if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){switch(t=!1,clearTimeout(n),i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break}return}switch(i.key){case"c":i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function cg(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.openCommandPalette())}}}function kl(e,t,n="#issues-list .list-item"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function dg(e){return function(n){if(e.getCurrentView()!=="issues"||n.target.tagName==="INPUT"||n.target.tagName==="TEXTAREA"||n.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const s=document.querySelectorAll("#issues-list .list-item");if(s.length===0)return;const i=e.getSelectedIndex();switch(n.key){case"j":n.preventDefault(),kl(i+1,e.setSelectedIndex);break;case"k":n.preventDefault(),kl(i-1,e.setSelectedIndex);break;case"Enter":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.viewIssue(a)}break;case"e":if(i>=0&&s[i]){n.preventDefault();const a=s[i].dataset.id;a&&!a.startsWith("temp-")&&e.showEditIssueModal(a)}break;case"Escape":i>=0&&(n.preventDefault(),s.forEach(a=>a.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const yt=new Map,$l=6e4,Ca=100;let re=null,Ba=null,Aa=null,On=null,El=!1;const ug={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},pg={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},_l={api:null};let ja={..._l};function mg(e={}){ja={..._l,...e},re||(re=document.createElement("div"),re.className="issue-tooltip",re.style.display="none",document.body.appendChild(re),re.addEventListener("mouseenter",()=>{clearTimeout(Ba)}),re.addEventListener("mouseleave",()=>{Da()})),El||(document.addEventListener("mouseover",gg),document.addEventListener("mouseout",fg),El=!0)}function gg(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=hg(t);if(n){if(n===On&&re.style.display!=="none"){clearTimeout(Ba);return}clearTimeout(Aa),Aa=setTimeout(()=>{vg(t,n)},200)}}function fg(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Aa),Ba=setTimeout(()=>{Da()},150))}function hg(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function vg(e,t){On=t;const n=e.getBoundingClientRect();re.style.left=`${n.left+window.scrollX}px`,re.style.top=`${n.bottom+window.scrollY+8}px`,re.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',re.style.display="block";try{const s=await yg(t);if(On!==t)return;wg(s)}catch{if(On!==t)return;re.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Da(){re&&(re.style.display="none"),On=null}function bg(){const e=Date.now();for(const[t,n]of yt.entries())e-n.timestamp>=$l&&yt.delete(t)}async function yg(e){yt.size>Ca/2&&bg();const t=yt.get(e);if(t&&Date.now()-t.timestamp<$l)return t.issue;if(!ja.api)throw new Error("API not initialized");const n=await ja.api.getIssueByIdentifier(e);if(yt.size>=Ca){const s=Array.from(yt.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,Ca/2);for(const[a]of i)yt.delete(a)}return yt.set(e,{issue:n,timestamp:Date.now()}),n}function wg(e){const t=ug[e.status]||"#6b7280",n=pg[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";re.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${p(e.identifier)}</span>
            <span class="issue-tooltip-type">${p(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${p(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${kg(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${$g(e.priority)}</span>
        </div>
    `}function kg(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function $g(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}let Fn=0,Hn=null;const Bt=new Map;function lt(e,t){return Bt.has(e)||Bt.set(e,new Set),Bt.get(e).add(t),()=>{var n;return(n=Bt.get(e))==null?void 0:n.delete(t)}}function Eg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function Il(e){Hn&&(clearTimeout(Hn),Hn=null);const t=Dd();t&&(t.close(),Bo(null));const n=api.getToken();if(!n)return;const i=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(n)}&team_id=${encodeURIComponent(e)}`;try{const a=new WebSocket(i);Bo(a),a.onopen=()=>{console.log("WebSocket connected"),Fn>0&&h("Live updates reconnected","success"),Fn=0},a.onmessage=o=>{let r;try{r=JSON.parse(o.data)}catch(c){console.error("WebSocket: malformed message",c);return}_g(r)},a.onclose=()=>{console.log("WebSocket disconnected"),Fn++,Fn===1&&h("Live updates disconnected. Reconnecting...","warning");const o=Eg(Fn-1);Hn=setTimeout(()=>{Hn=null,T()&&T().id===e&&Il(e)},o)},a.onerror=o=>{console.error("WebSocket error:",o)}}catch(a){console.error("Failed to connect WebSocket:",a)}}function _g(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Bt.get(`${n}:${t}`);if(a)for(const c of a)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}:${t}):`,d)}const o=Bt.get(n);if(o)for(const c of o)try{c(s,i)}catch(d){console.error(`WebSocket handler error (${n}):`,d)}const r=Bt.get("*");if(r)for(const c of r)try{c(s,i)}catch(d){console.error("WebSocket handler error (*):",d)}}function Ig(){lt("issue:created",xg),lt("issue:updated",Tg),lt("issue:deleted",Sg),lt("comment",Lg),lt("relation",Cg),lt("attestation",Bg),lt("activity",Ag),lt("project",jg),lt("sprint",Dg)}function xg(e){var i,a,o;const t=we(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,He(r),A()==="issues"&&at()}else He([e,...t]),A()==="issues"&&at(),h(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=wi())==null?void 0:i.id)){const r=bt(),c=r.findIndex(l=>l.id===e.id),d=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(c===-1&&d===-1)Vt([e,...r]),A()==="my-issues"&&Rn();else if(d>=0){const l=[...r];l[d]=e,Vt(l),A()==="my-issues"&&Rn()}}A()==="my-issues"&&Yt({showLoading:!1}),A()==="board"?mt():A()==="sprints"&&it(),A()==="issue-detail"&&e.parent_id===((a=fe())==null?void 0:a.id)&&Q((o=fe())==null?void 0:o.id,!1)}function Tg(e){const t=we();t.some(s=>s.id===e.id)&&He(t.map(s=>s.id===e.id?e:s));const n=bt();if(n.some(s=>s.id===e.id)&&Vt(n.map(s=>s.id===e.id?e:s)),A()==="issues")at();else if(A()==="my-issues")Rn(),Yt({showLoading:!1});else if(A()==="board")mt();else if(A()==="sprints")it();else if(A()==="issue-detail"){const s=document.getElementById("issue-detail-content");s&&s.dataset.issueId===e.id&&Q(e.id)}}function Sg(e){var t;He(we().filter(n=>n.id!==e.id)),Vt(bt().filter(n=>n.id!==e.id)),A()==="issues"?at():A()==="my-issues"?(Rn(),Yt({showLoading:!1})):A()==="board"?mt():A()==="sprints"&&it(),h(`Issue ${e.identifier} deleted`,"info"),A()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.id&&(h(`Issue ${e.identifier} was deleted`,"warning"),R("my-issues"))}function Lg(e){var t;A()==="my-issues"&&Yt({showLoading:!1}),A()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.issue_id&&Q(e.issue_id,!1)}function Cg(e){var t;if(A()==="issue-detail"){const n=(t=fe())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&Q(n,!1)}}function Bg(e){var t;A()==="gate-approvals"&&typeof window.loadGateApprovals=="function"&&window.loadGateApprovals(),A()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.issue_id&&Q(e.issue_id,!1)}function Ag(e){var t;A()==="my-issues"&&Yt({showLoading:!1}),A()==="issue-detail"&&((t=fe())==null?void 0:t.id)===e.issue_id&&Q(e.issue_id,!1)}function jg(e,{type:t}){ke().then(()=>{A()==="projects"&&Ht()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?h(`New project: ${e.name}`,"info"):t==="deleted"&&h(`Project ${e.name} deleted`,"info")}function Dg(){A()==="sprints"&&it()}const xl='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Tl(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function Sl(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Tl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(xl);n&&n.focus()}}}function Un(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Tl(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.querySelector(".sidebar");if(!t)return;const n=t.querySelectorAll(xl);if(n.length===0)return;const s=n[0],i=n[n.length-1];if(!t.contains(document.activeElement)){e.preventDefault(),s.focus();return}e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Un()});async function Ll(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=document.getElementById("project-filter").value;if(!s){h("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=X().find(d=>d.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};He([r,...we()]),at();const c=document.querySelector(`[data-id="${a}"]`);c&&c.classList.add("new");try{const d=await api.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=we(),g=l.findIndex(u=>u.id===a);g!==-1&&(l[g]=d,He(l)),at(),ke(),h("Issue created!","success")}catch(d){He(we().filter(l=>l.id!==a)),at(),h(`Failed to create issue: ${d.message}`,"error")}finally{t.disabled=!1,t.placeholder=i,t.focus()}}ip({beforeNavigate:()=>{Jo(),window._onRitualsChanged=null,as(null),Ao(null),Un(),Da()},detailRoute:e=>e[0]==="epic"&&e[1]?(Sa(e[1]),!0):e[0]==="issue"&&e[1]?(Ns(e[1]),!0):e[0]==="document"&&e[1]?(Kg(e[1]),!0):e[0]==="sprint"&&e[1]?(Fu(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(Qo(e[1]),!0):!1,detailPopstate:e=>e.epicId?(La(e.epicId,!1),!0):e.issueId?(Q(e.issueId,!1),!0):e.identifier?(Ns(e.identifier),!0):e.documentId?(Ue(e.documentId,!1),!0):e.sprintId?(Ui(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=It();e&&X().some(t=>t.id===e)&&_t(e)},issueNavigate:e=>Ns(e),epicNavigate:e=>Sa(e)}),sp({"my-issues":()=>{wa(),Yt()},"gate-approvals":()=>{jn()},issues:()=>{kp(),Wp(),wp().then(()=>{const t=new URLSearchParams(window.location.search).getAll("label");if(t.length>0){const n=document.getElementById("label-filter-dropdown");n&&(n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Er())}}),Dr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}gt()})},epics:()=>{ag()},board:()=>{ta()},projects:()=>{ke().then(Ht)},sprints:()=>{ur()},rituals:()=>{zr()},documents:()=>{qt()},team:()=>{Ni(),Vo(),gs()},settings:()=>{va(),Ai(),fm()}});function Mg(){const e=document.getElementById("modal-overlay");if(e){e.addEventListener("click",()=>D());const n=e.querySelector(".modal");n&&n.addEventListener("click",s=>s.stopPropagation())}const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>D())}function Rg(){const e={showCreateIssueModal:Jt,showCreateEpicModal:wl,showCreateProjectModal:vs,showCreateDocumentModal:ds,showCreateTeamModal:hs,showEditTeamModal:qi,showInviteModal:fs,showCreateApiKeyModal:ba,showCreateAgentModal:ji,resetOnboarding:Us,logout:rs,navigateToProjects:()=>R("projects")};document.querySelectorAll("[data-action]").forEach(t=>{const n=e[t.dataset.action];n&&t.addEventListener("click",()=>n())})}function Pg(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>Oi(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>nr());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>sr()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>ir(a))})}function Ng(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Li("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Li("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Ci());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>No());const i=document.getElementById("doc-project-filter");i&&i.addEventListener("change",()=>cs());const a=document.getElementById("doc-sort");a&&a.addEventListener("change",()=>tt())}function qg(){const e=document.getElementById("dashboard-project-filter");e&&e.addEventListener("change",()=>Hs());const t=document.getElementById("my-issues-status-filter");t&&t.addEventListener("change",()=>Hs())}function Og(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>Mr());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",f=>xr(f));const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",f=>Tr(f));const s=document.getElementById("project-filter");s&&s.addEventListener("change",()=>aa()),document.querySelectorAll(".multi-select-btn").forEach(f=>{const b=f.parentElement;b!=null&&b.querySelector("#status-filter-dropdown")?f.addEventListener("click",()=>Ss("status-filter-dropdown")):b!=null&&b.querySelector("#priority-filter-dropdown")?f.addEventListener("click",()=>Ss("priority-filter-dropdown")):b!=null&&b.querySelector("#label-filter-dropdown")&&f.addEventListener("click",()=>Ss("label-filter-dropdown"))});const i=document.getElementById("status-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Bn())});const f=i.querySelector(".btn-small");f&&f.addEventListener("click",()=>Ls())}const a=document.getElementById("priority-filter-dropdown");if(a){a.querySelectorAll('input[type="checkbox"]').forEach(b=>{b.addEventListener("change",()=>Cs())});const f=a.querySelector(".btn-small");f&&f.addEventListener("click",()=>Bs())}const o=document.getElementById("label-filter-dropdown");if(o){const f=o.querySelector(".btn-small");f&&f.addEventListener("click",()=>As())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>Be());const c=document.getElementById("assignee-filter");c&&c.addEventListener("change",()=>Be());const d=document.getElementById("sprint-filter");d&&d.addEventListener("change",()=>Be());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>gt());const g=document.getElementById("group-by-select");g&&g.addEventListener("change",()=>oa());const u=document.querySelector(".quick-create-input");u&&u.addEventListener("keydown",f=>Ll(f))}function Fg(){const e=document.getElementById("board-project-filter");e&&e.addEventListener("change",()=>wr());const t=document.getElementById("epics-project-filter");t&&t.addEventListener("change",()=>yl());const n=document.getElementById("sprint-project-filter");n&&n.addEventListener("change",()=>pr())}function Hg(){const e=document.getElementById("rituals-project-filter");e&&e.addEventListener("change",()=>pa());const t=document.getElementById("rituals-view");t&&t.querySelectorAll(".settings-tab[data-tab]").forEach(n=>{n.addEventListener("click",()=>Kr(n.dataset.tab))})}function Ug(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>ms());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Jt()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault(),R(o.dataset.view)})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>Pi());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>Un());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>Sl());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Jt())}document.addEventListener("DOMContentLoaded",async()=>{if(Rd(),Ug(),Mg(),Rg(),qg(),Og(),Fg(),Hg(),Pg(),Ng(),Gg(),zg(),mg({api}),rp(),Ig(),api.getToken())try{const e=await api.getMe();xd(e),window.currentUser=e,await Cl()}catch{api.logout(),os()}else os()});function Gg(){const e=document.getElementById("theme-toggle");if(!e)return;const t=od()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),rd(n?"light":"dark")})}function zg(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");vr(s)}}})}async function Cl(){jo(),Mo(),await ps();const e=Uo();if(e.length===0&&!tl()){_a();return}e.length>0&&await Ri(e[0],!0)}window.initApp=Cl,window.viewIssue=Q,window.viewIssueByPath=Ns,window.viewEpic=La,window.viewEpicByPath=Sa,window.toggleTicketRituals=Hr,window.toggleSection=Fr,window.connectWebSocket=Il,window.buildAssignees=()=>dp(En,lu),window.updateAssigneeFilter=up,window.loadLabels=Wg,window.resetOnboarding=Us,window.viewDocument=Ue;async function Kg(e){try{await Ue(e,!1)}catch{R("documents",!1)}}async function Wg(){if(T())try{const e=await api.getLabels(T().id);is(e)}catch(e){console.error("Failed to load labels:",e)}}document.addEventListener("keydown",lg({closeModal:D,closeSidebar:Un,navigateTo:R,showCreateIssueModal:Jt,showKeyboardShortcutsHelp:Bl,isModalOpen:bi,focusSearch:()=>{R("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden")}}));function Bl(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--text-secondary)">Navigation</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Dashboard</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">m</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>All Issues</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">i</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Board</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">b</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Projects</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">p</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Sprints</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g s</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Documents</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g d</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Team</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g t</kbd>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--text-secondary)">Actions</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Command palette</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">⌘K</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Search issues</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">/</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Create new item</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">c</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Navigate list</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">j/k</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Close modal</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">Esc</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Show shortcuts</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">?</kbd>
                </div>
            </div>
        </div>
    `,B()}jm([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>R("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>R("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>R("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>R("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>R("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>R("documents"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>R("team"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{R("issues"),setTimeout(Jt,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{R("projects"),setTimeout(vs,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{R("documents"),setTimeout(ds,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>hs(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{R("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{R("team"),setTimeout(fs,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>Bl(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>Us(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>rs(),category:"Account"}]);const Vg=B;window.showModal=function(){Vg(),setTimeout(()=>{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()},50)},document.addEventListener("keydown",cg({isModalOpen:bi,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:Jr,openCommandPalette:Dm,closeCommandPalette:Fs})),document.addEventListener("keydown",dg({getCurrentView:A,getSelectedIndex:Ld,setSelectedIndex:Co,viewIssue:Q,showEditIssueModal:bl,isModalOpen:bi,isCommandPaletteOpen:Jr})),Object.assign(window,{escapeHtml:p,renderMarkdown:Ct,handleLogin:_i,handleSignup:Ii,showLogin:$i,showSignup:Ei,logout:rs,navigateTo:R,handleRoute:hr,closeModal:D,toggleSidebar:Sl,closeSidebar:Un,getProjectFromUrl:It,updateUrlWithProject:ks,toggleTeamDropdown:ms,toggleUserDropdown:Pi,showCreateTeamModal:hs,showEditTeamModal:qi,showInviteModal:fs,showCreateIssueModal:Jt,loadIssues:gt,filterIssues:Be,filterMyIssues:Hs,debounceSearch:Mr,handleQuickCreate:Ll,onProjectFilterChange:aa,updateGroupBy:oa,toggleGroup:em,viewIssue:Q,showEditIssueModal:bl,editDescription:rm,setDescriptionEditorMode:lm,updateIssueField:qn,handleUpdateIssue:sg,deleteIssue:ig,navigateToIssueByIdentifier:vr,handleCreateIssueNew:tg,handleCreateIssueAndNew:ng,setCreateIssueField:eg,toggleCreateIssueDropdown:Qm,toggleCreateIssueLabelSelection:zm,createLabelForCreateIssue:fl,createLabelFromDropdown:gl,handleAddComment:om,showCreateSubIssueModal:Zm,handleCreateSubIssue:Xm,showAddRelationModal:cm,handleAddRelation:mm,deleteRelation:gm,searchIssuesToRelate:dm,selectIssueForRelation:um,clearSelectedRelation:pm,showDetailDropdown:Hm,showInlineDropdown:ul,toggleIssueLabel:Um,toggleMultiSelect:Ss,updateStatusFilter:Bn,updatePriorityFilter:Cs,updateLabelFilter:sa,clearStatusFilter:Ls,clearPriorityFilter:Bs,clearLabelFilter:As,toggleFilterMenu:xr,toggleDisplayMenu:Tr,showFilterCategoryOptions:Ie,setProjectFilter:Cr,clearProjectFilter:Ap,toggleStatusOption:Dp,clearStatusFilterNew:Mp,setStatusPreset:jp,togglePriorityOption:Rp,clearPriorityFilterNew:Pp,setTypeFilter:Br,clearTypeFilter:Np,setAssigneeFilter:Ar,clearAssigneeFilter:qp,setSprintFilter:jr,clearSprintFilter:Op,toggleLabelOption:Fp,clearLabelFilterNew:Hp,setSort:Gp,setGroupBy:zp,clearAllFilters:Kp,updateFilterChips:xe,updateFilterCountBadge:Te,loadBoard:na,onBoardProjectChange:wr,handleDragStart:pp,handleDragEnd:mp,handleDragOver:gp,handleDragLeave:fp,handleCardDragOver:hp,handleCardDragLeave:vp,handleDrop:bp,handleCardDrop:yp,loadSprints:it,onSprintProjectChange:pr,viewSprint:Ui,showEditBudgetModal:Ku,handleUpdateBudget:Wu,showCloseSprintConfirmation:Vu,completeSprint:Yu,loadLimboStatus:_s,showLimboDetailsModal:Gi,showCreateDocumentModal:ds,showCreateProjectModal:vs,onEpicsProjectChange:yl,showCreateEpicModal:wl,dismissApprovalsExplainer:Cm,loadGateApprovals:jn,loadRitualsView:zr,onRitualsProjectChange:pa,switchRitualsTab:Kr,toggleRitualConditions:Tu,approveRitual:vm,completeGateRitual:Wr,toggleSection:Fr,toggleTicketRituals:Hr,attestTicketRitual:$m,approveTicketRitual:Em,showCompleteTicketRitualModal:_m,showAttestTicketRitualModal:wm,showCreateApiKeyModal:ba,copyApiKey:Xr,revokeApiKey:Qr,showCreateAgentModal:ji,toggleCreateIssueOptions:Vm,applyIssueTemplate:Ym,updateCreateIssueProject:Jm,handleLabelCreateKey:Gm,handleCreateIssueLabelKey:Km}),window.marked=j,window.DOMPurify=_o,console.log("Chaotic frontend loaded via Vite")})();
