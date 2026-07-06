var pv=Object.defineProperty;var mv=(at,he,Lt)=>he in at?pv(at,he,{enumerable:!0,configurable:!0,writable:!0,value:Lt}):at[he]=Lt;var W=(at,he,Lt)=>mv(at,typeof he!="symbol"?he+"":he,Lt);(function(){"use strict";var Ao;function at(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var he=at();function Lt(e){he=e}var Cn={exec:()=>null};function G(e,t=""){let n=typeof e=="string"?e:e.source;const s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(ve.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},nd=/^(?:[ \t]*(?:\n|$))+/,sd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,id=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,An=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ad=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,qi=/(?:[*+-]|\d{1,9}[.)])/,Vo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Wo=G(Vo).replace(/bull/g,qi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),od=G(Vo).replace(/bull/g,qi).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Oi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,rd=/^[^\n]+/,Hi=/(?!\s*\])(?:\\.|[^\[\]\\])+/,ld=G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Hi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),cd=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,qi).getRegex(),gs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Fi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,dd=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Fi).replace("tag",gs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ko=G(Oi).replace("hr",An).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gs).getRegex(),ud=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ko).getRegex(),Ui={blockquote:ud,code:sd,def:ld,fences:id,heading:ad,hr:An,html:dd,lheading:Wo,list:cd,newline:nd,paragraph:Ko,table:Cn,text:rd},Yo=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",An).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gs).getRegex(),pd={...Ui,lheading:od,table:Yo,paragraph:G(Oi).replace("hr",An).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Yo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gs).getRegex()},md={...Ui,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Fi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Cn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(Oi).replace("hr",An).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Wo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},fd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Zo=/^( {2,}|\\)\n(?!\s*$)/,hd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,hs=/[\p{P}\p{S}]/u,Gi=/[\s\p{P}\p{S}]/u,Xo=/[^\s\p{P}\p{S}]/u,vd=G(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Gi).getRegex(),Qo=/(?!~)[\p{P}\p{S}]/u,bd=/(?!~)[\s\p{P}\p{S}]/u,yd=/(?:[^\s\p{P}\p{S}]|~)/u,wd=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Jo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kd=G(Jo,"u").replace(/punct/g,hs).getRegex(),$d=G(Jo,"u").replace(/punct/g,Qo).getRegex(),er="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ed=G(er,"gu").replace(/notPunctSpace/g,Xo).replace(/punctSpace/g,Gi).replace(/punct/g,hs).getRegex(),xd=G(er,"gu").replace(/notPunctSpace/g,yd).replace(/punctSpace/g,bd).replace(/punct/g,Qo).getRegex(),_d=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Xo).replace(/punctSpace/g,Gi).replace(/punct/g,hs).getRegex(),Id=G(/\\(punct)/,"gu").replace(/punct/g,hs).getRegex(),Td=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Sd=G(Fi).replace("(?:-->|$)","-->").getRegex(),Ld=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Sd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vs=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Cd=G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),tr=G(/^!?\[(label)\]\[(ref)\]/).replace("label",vs).replace("ref",Hi).getRegex(),nr=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",Hi).getRegex(),Ad=G("reflink|nolink(?!\\()","g").replace("reflink",tr).replace("nolink",nr).getRegex(),zi={_backpedal:Cn,anyPunctuation:Id,autolink:Td,blockSkip:wd,br:Zo,code:gd,del:Cn,emStrongLDelim:kd,emStrongRDelimAst:Ed,emStrongRDelimUnd:_d,escape:fd,link:Cd,nolink:nr,punctuation:vd,reflink:tr,reflinkSearch:Ad,tag:Ld,text:hd,url:Cn},Bd={...zi,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",vs).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vs).getRegex()},Vi={...zi,emStrongRDelimAst:xd,emStrongLDelim:$d,url:G(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Dd={...Vi,br:G(Zo).replace("{2,}","*").getRegex(),text:G(Vi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},bs={normal:Ui,gfm:pd,pedantic:md},Bn={normal:zi,gfm:Vi,breaks:Dd,pedantic:Bd},Md={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},sr=e=>Md[e];function Ve(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,sr)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,sr);return e}function ir(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function ar(e,t){var a;const n=e.replace(ve.findPipe,(o,r,d)=>{let c=!1,l=r;for(;--l>=0&&d[l]==="\\";)c=!c;return c?"|":" |"}),s=n.split(ve.splitPipe);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!((a=s.at(-1))!=null&&a.trim())&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ve.slashPipe,"|");return s}function Dn(e,t,n){const s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function jd(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function or(e,t,n,s,i){const a=t.href,o=t.title||null,r=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;const d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:r,tokens:s.inlineTokens(r)};return s.state.inLink=!1,d}function Rd(e,t,n){const s=e.match(n.other.indentCodeCompensation);if(s===null)return t;const i=s[1];return t.split(`
`).map(a=>{const o=a.match(n.other.beginningSpace);if(o===null)return a;const[r]=o;return r.length>=i.length?a.slice(i.length):a}).join(`
`)}var ys=class{constructor(e){W(this,"options");W(this,"rules");W(this,"lexer");this.options=e||he}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Dn(n,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const n=t[0],s=Rd(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){const s=Dn(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Dn(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let n=Dn(t[0],`
`).split(`
`),s="",i="";const a=[];for(;n.length>0;){let o=!1;const r=[];let d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))r.push(n[d]),o=!0;else if(!o)r.push(n[d]);else break;n=n.slice(d);const c=r.join(`
`),l=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,i=i?`${i}
${l}`:l;const u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,a,!0),this.lexer.state.top=u,n.length===0)break;const m=a.at(-1);if((m==null?void 0:m.type)==="code")break;if((m==null?void 0:m.type)==="blockquote"){const h=m,v=h.raw+`
`+n.join(`
`),w=this.blockquote(v);a[a.length-1]=w,s=s.substring(0,s.length-h.raw.length)+w.raw,i=i.substring(0,i.length-h.text.length)+w.text;break}else if((m==null?void 0:m.type)==="list"){const h=m,v=h.raw+`
`+n.join(`
`),w=this.list(v);a[a.length-1]=w,s=s.substring(0,s.length-m.raw.length)+w.raw,i=i.substring(0,i.length-h.raw.length)+w.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");const a=this.rules.other.listItemRegex(n);let o=!1;for(;e;){let d=!1,c="",l="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let u=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),m=e.split(`
`,1)[0],h=!u.trim(),v=0;if(this.options.pedantic?(v=2,l=u.trimStart()):h?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,l=u.slice(v),v+=t[1].length),h&&this.rules.other.blankLine.test(m)&&(c+=m+`
`,e=e.substring(m.length+1),d=!0),!d){const S=this.rules.other.nextBulletRegex(v),j=this.rules.other.hrRegex(v),B=this.rules.other.fencesBeginRegex(v),E=this.rules.other.headingBeginRegex(v),D=this.rules.other.htmlBeginRegex(v);for(;e;){const I=e.split(`
`,1)[0];let H;if(m=I,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),H=m):H=m.replace(this.rules.other.tabCharGlobal,"    "),B.test(m)||E.test(m)||D.test(m)||S.test(m)||j.test(m))break;if(H.search(this.rules.other.nonSpaceChar)>=v||!m.trim())l+=`
`+H.slice(v);else{if(h||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||E.test(u)||j.test(u))break;l+=`
`+m}!h&&!m.trim()&&(h=!0),c+=I+`
`,e=e.substring(I.length+1),u=H.slice(v)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0));let w=null,_;this.options.gfm&&(w=this.rules.other.listIsTask.exec(l),w&&(_=w[0]!=="[ ] ",l=l.replace(this.rules.other.listReplaceTask,""))),i.items.push({type:"list_item",raw:c,task:!!w,checked:_,loose:!1,text:l,tokens:[]}),i.raw+=c}const r=i.items.at(-1);if(r)r.raw=r.raw.trimEnd(),r.text=r.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let d=0;d<i.items.length;d++)if(this.lexer.state.top=!1,i.items[d].tokens=this.lexer.blockTokens(i.items[d].text,[]),!i.loose){const c=i.items[d].tokens.filter(u=>u.type==="space"),l=c.length>0&&c.some(u=>this.rules.other.anyLine.test(u.raw));i.loose=l}if(i.loose)for(let d=0;d<i.items.length;d++)i.items[d].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){var o;const t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;const n=ar(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(const r of s)this.rules.other.tableAlignRight.test(r)?a.align.push("right"):this.rules.other.tableAlignCenter.test(r)?a.align.push("center"):this.rules.other.tableAlignLeft.test(r)?a.align.push("left"):a.align.push(null);for(let r=0;r<n.length;r++)a.header.push({text:n[r],tokens:this.lexer.inline(n[r]),header:!0,align:a.align[r]});for(const r of i)a.rows.push(ar(r,a.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:a.align[c]})));return a}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;const a=Dn(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{const a=jd(t[2],"()");if(a===-2)return;if(a>-1){const r=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,r).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){const a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),or(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){const s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){const a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return or(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[2]||"")||!n||this.rules.inline.punctuation.exec(n)){const a=[...s[0]].length-1;let o,r,d=a,c=0;const l=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+a);(s=l.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(r=[...o].length,s[3]||s[4]){d+=r;continue}else if((s[5]||s[6])&&a%3&&!((a+r)%3)){c+=r;continue}if(d-=r,d>0)continue;r=Math.min(r,r+d+c);const u=[...s[0]][0].length,m=e.slice(0,a+s.index+u+r);if(Math.min(a,r)%2){const v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}const h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," ");const s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let s,i;if(t[2]==="@")s=t[0],i="mailto:"+s;else{let a;do a=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(a!==t[0]);s=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){const n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},ot=class Go{constructor(t){W(this,"tokens");W(this,"options");W(this,"state");W(this,"tokenizer");W(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||he,this.options.tokenizer=this.options.tokenizer||new ys,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={other:ve,block:bs.normal,inline:Bn.normal};this.options.pedantic?(n.block=bs.pedantic,n.inline=Bn.pedantic):this.options.gfm&&(n.block=bs.gfm,this.options.breaks?n.inline=Bn.breaks:n.inline=Bn.gfm),this.tokenizer.rules=n}static get rules(){return{block:bs,inline:Bn}}static lex(t,n){return new Go(n).lex(t)}static lexInline(t,n){return new Go(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){var i,a,o;for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let r;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(c=>(r=c.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);const c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let d=t;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0;const l=t.slice(1);let u;this.options.extensions.startBlock.forEach(m=>{u=m.call({lexer:this},l),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(d=t.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(d))){const c=n.at(-1);s&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),s=d.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);const c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=`
`+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(t){const c="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var r,d,c;let s=t,i=null;if(this.tokens.links){const l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if((d=(r=this.options.extensions)==null?void 0:r.inline)!=null&&d.some(m=>(l=m.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);const m=n.at(-1);l.type==="text"&&(m==null?void 0:m.type)==="text"?(m.raw+=l.raw,m.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if((c=this.options.extensions)!=null&&c.startInline){let m=1/0;const h=t.slice(1);let v;this.options.extensions.startInline.forEach(w=>{v=w.call({lexer:this},h),typeof v=="number"&&v>=0&&(m=Math.min(m,v))}),m<1/0&&m>=0&&(u=t.substring(0,m+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;const m=n.at(-1);(m==null?void 0:m.type)==="text"?(m.raw+=l.raw,m.text+=l.text):n.push(l);continue}if(t){const m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},ws=class{constructor(e){W(this,"options");W(this,"parser");this.options=e||he}space(e){return""}code({text:e,lang:t,escaped:n}){var a;const s=(a=(t||"").match(ve.notSpaceStart))==null?void 0:a[0],i=e.replace(ve.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ve(s)+'">'+(n?i:Ve(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ve(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,n=e.start;let s="";for(let o=0;o<e.items.length;o++){const r=e.items[o];s+=this.listitem(r)}const i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){var n;let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?((n=e.tokens[0])==null?void 0:n.type)==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+Ve(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){const a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ve(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){const s=this.parser.parseInline(n),i=ir(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ve(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));const i=ir(e);if(i===null)return Ve(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ve(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ve(e.text)}},Wi=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},rt=class zo{constructor(t){W(this,"options");W(this,"renderer");W(this,"textRenderer");this.options=t||he,this.options.renderer=this.options.renderer||new ws,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Wi}static parse(t,n){return new zo(n).parse(t)}static parseInline(t,n){return new zo(n).parseInline(t)}parse(t,n=!0){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const c=r,l=this.options.extensions.renderers[c.type].call({parser:this},c);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(c.type)){s+=l||"";continue}}const d=r;switch(d.type){case"space":{s+=this.renderer.space(d);continue}case"hr":{s+=this.renderer.hr(d);continue}case"heading":{s+=this.renderer.heading(d);continue}case"code":{s+=this.renderer.code(d);continue}case"table":{s+=this.renderer.table(d);continue}case"blockquote":{s+=this.renderer.blockquote(d);continue}case"list":{s+=this.renderer.list(d);continue}case"html":{s+=this.renderer.html(d);continue}case"paragraph":{s+=this.renderer.paragraph(d);continue}case"text":{let c=d,l=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],l+=`
`+this.renderer.text(c);n?s+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l,escaped:!0}]}):s+=l;continue}default:{const c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}parseInline(t,n=this.renderer){var i,a;let s="";for(let o=0;o<t.length;o++){const r=t[o];if((a=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&a[r.type]){const c=this.options.extensions.renderers[r.type].call({parser:this},r);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=c||"";continue}}const d=r;switch(d.type){case"escape":{s+=n.text(d);break}case"html":{s+=n.html(d);break}case"link":{s+=n.link(d);break}case"image":{s+=n.image(d);break}case"strong":{s+=n.strong(d);break}case"em":{s+=n.em(d);break}case"codespan":{s+=n.codespan(d);break}case"br":{s+=n.br(d);break}case"del":{s+=n.del(d);break}case"text":{s+=n.text(d);break}default:{const c='Token with "'+d.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},ks=(Ao=class{constructor(e){W(this,"options");W(this,"block");this.options=e||he}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?ot.lex:ot.lexInline}provideParser(){return this.block?rt.parse:rt.parseInline}},W(Ao,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"])),Ao),Pd=class{constructor(...e){W(this,"defaults",at());W(this,"options",this.setOptions);W(this,"parse",this.parseMarkdown(!0));W(this,"parseInline",this.parseMarkdown(!1));W(this,"Parser",rt);W(this,"Renderer",ws);W(this,"TextRenderer",Wi);W(this,"Lexer",ot);W(this,"Tokenizer",ys);W(this,"Hooks",ks);this.use(...e)}walkTokens(e,t){var s,i;let n=[];for(const a of e)switch(n=n.concat(t.call(this,a)),a.type){case"table":{const o=a;for(const r of o.header)n=n.concat(this.walkTokens(r.tokens,t));for(const r of o.rows)for(const d of r)n=n.concat(this.walkTokens(d.tokens,t));break}case"list":{const o=a;n=n.concat(this.walkTokens(o.items,t));break}default:{const o=a;(i=(s=this.defaults.extensions)==null?void 0:s.childTokens)!=null&&i[o.type]?this.defaults.extensions.childTokens[o.type].forEach(r=>{const d=o[r].flat(1/0);n=n.concat(this.walkTokens(d,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{const s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let r=i.renderer.apply(this,o);return r===!1&&(r=a.apply(this,o)),r}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){const i=this.defaults.renderer||new ws(this.defaults);for(const a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;const o=a,r=n.renderer[o],d=i[o];i[o]=(...c)=>{let l=r.apply(i,c);return l===!1&&(l=d.apply(i,c)),l||""}}s.renderer=i}if(n.tokenizer){const i=this.defaults.tokenizer||new ys(this.defaults);for(const a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;const o=a,r=n.tokenizer[o],d=i[o];i[o]=(...c)=>{let l=r.apply(i,c);return l===!1&&(l=d.apply(i,c)),l}}s.tokenizer=i}if(n.hooks){const i=this.defaults.hooks||new ks;for(const a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;const o=a,r=n.hooks[o],d=i[o];ks.passThroughHooks.has(a)?i[o]=c=>{if(this.defaults.async)return Promise.resolve(r.call(i,c)).then(u=>d.call(i,u));const l=r.call(i,c);return d.call(i,l)}:i[o]=(...c)=>{let l=r.apply(i,c);return l===!1&&(l=d.apply(i,c)),l}}s.hooks=i}if(n.walkTokens){const i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let r=[];return r.push(a.call(this,o)),i&&(r=r.concat(i.call(this,o))),r}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ot.lex(e,t??this.defaults)}parser(e,t){return rt.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{const i={...s},a={...this.defaults,...i},o=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&i.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));a.hooks&&(a.hooks.options=a,a.hooks.block=e);const r=a.hooks?a.hooks.provideLexer():e?ot.lex:ot.lexInline,d=a.hooks?a.hooks.provideParser():e?rt.parse:rt.parseInline;if(a.async)return Promise.resolve(a.hooks?a.hooks.preprocess(n):n).then(c=>r(c,a)).then(c=>a.hooks?a.hooks.processAllTokens(c):c).then(c=>a.walkTokens?Promise.all(this.walkTokens(c,a.walkTokens)).then(()=>c):c).then(c=>d(c,a)).then(c=>a.hooks?a.hooks.postprocess(c):c).catch(o);try{a.hooks&&(n=a.hooks.preprocess(n));let c=r(n,a);a.hooks&&(c=a.hooks.processAllTokens(c)),a.walkTokens&&this.walkTokens(c,a.walkTokens);let l=d(c,a);return a.hooks&&(l=a.hooks.postprocess(l)),l}catch(c){return o(c)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const s="<p>An error occurred:</p><pre>"+Ve(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},Ct=new Pd;function F(e,t){return Ct.parse(e,t)}F.options=F.setOptions=function(e){return Ct.setOptions(e),F.defaults=Ct.defaults,Lt(F.defaults),F},F.getDefaults=at,F.defaults=he,F.use=function(...e){return Ct.use(...e),F.defaults=Ct.defaults,Lt(F.defaults),F},F.walkTokens=function(e,t){return Ct.walkTokens(e,t)},F.parseInline=Ct.parseInline,F.Parser=rt,F.parser=rt.parse,F.Renderer=ws,F.TextRenderer=Wi,F.Lexer=ot,F.lexer=ot.lex,F.Tokenizer=ys,F.Hooks=ks,F.parse=F,F.options,F.setOptions,F.use,F.walkTokens,F.parseInline,rt.parse,ot.lex;/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */const{entries:rr,setPrototypeOf:lr,isFrozen:Nd,getPrototypeOf:qd,getOwnPropertyDescriptor:Od}=Object;let{freeze:be,seal:Pe,create:Ki}=Object,{apply:Yi,construct:Zi}=typeof Reflect<"u"&&Reflect;be||(be=function(t){return t}),Pe||(Pe=function(t){return t}),Yi||(Yi=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)}),Zi||(Zi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const $s=we(Array.prototype.forEach),Hd=we(Array.prototype.lastIndexOf),cr=we(Array.prototype.pop),Mn=we(Array.prototype.push),Fd=we(Array.prototype.splice),Es=we(String.prototype.toLowerCase),Xi=we(String.prototype.toString),Qi=we(String.prototype.match),jn=we(String.prototype.replace),Ud=we(String.prototype.indexOf),Gd=we(String.prototype.trim),qe=we(Object.prototype.hasOwnProperty),ye=we(RegExp.prototype.test),Rn=zd(TypeError);function we(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Yi(e,t,s)}}function zd(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Zi(e,n)}}function R(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Es;lr&&lr(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(Nd(t)||(t[s]=a),i=a)}e[i]=!0}return e}function Vd(e){for(let t=0;t<e.length;t++)qe(e,t)||(e[t]=null);return e}function We(e){const t=Ki(null);for(const[n,s]of rr(e))qe(e,n)&&(Array.isArray(s)?t[n]=Vd(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=We(s):t[n]=s);return t}function Pn(e,t){for(;e!==null;){const s=Od(e,t);if(s){if(s.get)return we(s.get);if(typeof s.value=="function")return we(s.value)}e=qd(e)}function n(){return null}return n}const dr=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ji=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ea=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Wd=be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ta=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Kd=be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ur=be(["#text"]),pr=be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),na=be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mr=be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xs=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Yd=Pe(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Zd=Pe(/<%[\w\W]*|[\w\W]*%>/gm),Xd=Pe(/\$\{[\w\W]*/gm),Qd=Pe(/^data-[\-\w.\u00B7-\uFFFF]+$/),Jd=Pe(/^aria-[\-\w]+$/),fr=Pe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),eu=Pe(/^(?:\w+script|data):/i),tu=Pe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gr=Pe(/^html$/i),nu=Pe(/^[a-z][.\w]*(-[.\w]+)+$/i);var hr=Object.freeze({__proto__:null,ARIA_ATTR:Jd,ATTR_WHITESPACE:tu,CUSTOM_ELEMENT:nu,DATA_ATTR:Qd,DOCTYPE_NAME:gr,ERB_EXPR:Zd,IS_ALLOWED_URI:fr,IS_SCRIPT_OR_DATA:eu,MUSTACHE_EXPR:Yd,TMPLIT_EXPR:Xd});const Nn={element:1,text:3,progressingInstruction:7,comment:8,document:9},su=function(){return typeof window>"u"?null:window},iu=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},vr=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function br(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:su();const t=C=>br(C);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Nn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:r,Element:d,NodeFilter:c,NamedNodeMap:l=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:u,DOMParser:m,trustedTypes:h}=e,v=d.prototype,w=Pn(v,"cloneNode"),_=Pn(v,"remove"),S=Pn(v,"nextSibling"),j=Pn(v,"childNodes"),B=Pn(v,"parentNode");if(typeof o=="function"){const C=n.createElement("template");C.content&&C.content.ownerDocument&&(n=C.content.ownerDocument)}let E,D="";const{implementation:I,createNodeIterator:H,createDocumentFragment:V,getElementsByTagName:Ae}=n,{importNode:le}=s;let q=vr();t.isSupported=typeof rr=="function"&&typeof B=="function"&&I&&I.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ce,ERB_EXPR:Se,TMPLIT_EXPR:Re,DATA_ATTR:Ft,ARIA_ATTR:y,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:Le,CUSTOM_ELEMENT:Ai}=hr;let{IS_ALLOWED_URI:ft}=hr,ae=null;const Mc=R({},[...dr,...Ji,...ea,...ta,...ur]);let de=null;const jc=R({},[...pr,...na,...mr,...xs]);let ee=Object.seal(Ki(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ps=null,Bo=null;const En=Object.seal(Ki(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Rc=!0,Do=!0,Pc=!1,Nc=!0,xn=!1,Bi=!0,Ut=!1,Mo=!1,jo=!1,_n=!1,Di=!1,Mi=!1,qc=!0,Oc=!1;const iv="user-content-";let Ro=!0,ms=!1,In={},st=null;const Po=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Hc=null;const Fc=R({},["audio","video","img","source","image","track"]);let No=null;const Uc=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ji="http://www.w3.org/1998/Math/MathML",Ri="http://www.w3.org/2000/svg",gt="http://www.w3.org/1999/xhtml";let Tn=gt,qo=!1,Oo=null;const av=R({},[ji,Ri,gt],Xi);let Pi=R({},["mi","mo","mn","ms","mtext"]),Ni=R({},["annotation-xml"]);const ov=R({},["title","style","font","a","script"]);let fs=null;const rv=["application/xhtml+xml","text/html"],lv="text/html";let se=null,Sn=null;const cv=n.createElement("form"),Gc=function(g){return g instanceof RegExp||g instanceof Function},Ho=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Sn&&Sn===g)){if((!g||typeof g!="object")&&(g={}),g=We(g),fs=rv.indexOf(g.PARSER_MEDIA_TYPE)===-1?lv:g.PARSER_MEDIA_TYPE,se=fs==="application/xhtml+xml"?Xi:Es,ae=qe(g,"ALLOWED_TAGS")?R({},g.ALLOWED_TAGS,se):Mc,de=qe(g,"ALLOWED_ATTR")?R({},g.ALLOWED_ATTR,se):jc,Oo=qe(g,"ALLOWED_NAMESPACES")?R({},g.ALLOWED_NAMESPACES,Xi):av,No=qe(g,"ADD_URI_SAFE_ATTR")?R(We(Uc),g.ADD_URI_SAFE_ATTR,se):Uc,Hc=qe(g,"ADD_DATA_URI_TAGS")?R(We(Fc),g.ADD_DATA_URI_TAGS,se):Fc,st=qe(g,"FORBID_CONTENTS")?R({},g.FORBID_CONTENTS,se):Po,ps=qe(g,"FORBID_TAGS")?R({},g.FORBID_TAGS,se):We({}),Bo=qe(g,"FORBID_ATTR")?R({},g.FORBID_ATTR,se):We({}),In=qe(g,"USE_PROFILES")?g.USE_PROFILES:!1,Rc=g.ALLOW_ARIA_ATTR!==!1,Do=g.ALLOW_DATA_ATTR!==!1,Pc=g.ALLOW_UNKNOWN_PROTOCOLS||!1,Nc=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xn=g.SAFE_FOR_TEMPLATES||!1,Bi=g.SAFE_FOR_XML!==!1,Ut=g.WHOLE_DOCUMENT||!1,_n=g.RETURN_DOM||!1,Di=g.RETURN_DOM_FRAGMENT||!1,Mi=g.RETURN_TRUSTED_TYPE||!1,jo=g.FORCE_BODY||!1,qc=g.SANITIZE_DOM!==!1,Oc=g.SANITIZE_NAMED_PROPS||!1,Ro=g.KEEP_CONTENT!==!1,ms=g.IN_PLACE||!1,ft=g.ALLOWED_URI_REGEXP||fr,Tn=g.NAMESPACE||gt,Pi=g.MATHML_TEXT_INTEGRATION_POINTS||Pi,Ni=g.HTML_INTEGRATION_POINTS||Ni,ee=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&Gc(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ee.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&Gc(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ee.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xn&&(Do=!1),Di&&(_n=!0),In&&(ae=R({},ur),de=[],In.html===!0&&(R(ae,dr),R(de,pr)),In.svg===!0&&(R(ae,Ji),R(de,na),R(de,xs)),In.svgFilters===!0&&(R(ae,ea),R(de,na),R(de,xs)),In.mathMl===!0&&(R(ae,ta),R(de,mr),R(de,xs))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?En.tagCheck=g.ADD_TAGS:(ae===Mc&&(ae=We(ae)),R(ae,g.ADD_TAGS,se))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?En.attributeCheck=g.ADD_ATTR:(de===jc&&(de=We(de)),R(de,g.ADD_ATTR,se))),g.ADD_URI_SAFE_ATTR&&R(No,g.ADD_URI_SAFE_ATTR,se),g.FORBID_CONTENTS&&(st===Po&&(st=We(st)),R(st,g.FORBID_CONTENTS,se)),g.ADD_FORBID_CONTENTS&&(st===Po&&(st=We(st)),R(st,g.ADD_FORBID_CONTENTS,se)),Ro&&(ae["#text"]=!0),Ut&&R(ae,["html","head","body"]),ae.table&&(R(ae,["tbody"]),delete ps.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw Rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=g.TRUSTED_TYPES_POLICY,D=E.createHTML("")}else E===void 0&&(E=iu(h,i)),E!==null&&typeof D=="string"&&(D=E.createHTML(""));be&&be(g),Sn=g}},zc=R({},[...Ji,...ea,...Wd]),Vc=R({},[...ta,...Kd]),dv=function(g){let $=B(g);(!$||!$.tagName)&&($={namespaceURI:Tn,tagName:"template"});const T=Es(g.tagName),X=Es($.tagName);return Oo[g.namespaceURI]?g.namespaceURI===Ri?$.namespaceURI===gt?T==="svg":$.namespaceURI===ji?T==="svg"&&(X==="annotation-xml"||Pi[X]):!!zc[T]:g.namespaceURI===ji?$.namespaceURI===gt?T==="math":$.namespaceURI===Ri?T==="math"&&Ni[X]:!!Vc[T]:g.namespaceURI===gt?$.namespaceURI===Ri&&!Ni[X]||$.namespaceURI===ji&&!Pi[X]?!1:!Vc[T]&&(ov[T]||!zc[T]):!!(fs==="application/xhtml+xml"&&Oo[g.namespaceURI]):!1},it=function(g){Mn(t.removed,{element:g});try{B(g).removeChild(g)}catch{_(g)}},Gt=function(g,$){try{Mn(t.removed,{attribute:$.getAttributeNode(g),from:$})}catch{Mn(t.removed,{attribute:null,from:$})}if($.removeAttribute(g),g==="is")if(_n||Di)try{it($)}catch{}else try{$.setAttribute(g,"")}catch{}},Wc=function(g){let $=null,T=null;if(jo)g="<remove></remove>"+g;else{const ne=Qi(g,/^[\r\n\t ]+/);T=ne&&ne[0]}fs==="application/xhtml+xml"&&Tn===gt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const X=E?E.createHTML(g):g;if(Tn===gt)try{$=new m().parseFromString(X,fs)}catch{}if(!$||!$.documentElement){$=I.createDocument(Tn,"template",null);try{$.documentElement.innerHTML=qo?D:X}catch{}}const ge=$.body||$.documentElement;return g&&T&&ge.insertBefore(n.createTextNode(T),ge.childNodes[0]||null),Tn===gt?Ae.call($,Ut?"html":"body")[0]:Ut?$.documentElement:ge},Kc=function(g){return H.call(g.ownerDocument||g,g,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Fo=function(g){return g instanceof u&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof l)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Yc=function(g){return typeof r=="function"&&g instanceof r};function ht(C,g,$){$s(C,T=>{T.call(t,g,$,Sn)})}const Zc=function(g){let $=null;if(ht(q.beforeSanitizeElements,g,null),Fo(g))return it(g),!0;const T=se(g.nodeName);if(ht(q.uponSanitizeElement,g,{tagName:T,allowedTags:ae}),Bi&&g.hasChildNodes()&&!Yc(g.firstElementChild)&&ye(/<[/\w!]/g,g.innerHTML)&&ye(/<[/\w!]/g,g.textContent)||g.nodeType===Nn.progressingInstruction||Bi&&g.nodeType===Nn.comment&&ye(/<[/\w]/g,g.data))return it(g),!0;if(!(En.tagCheck instanceof Function&&En.tagCheck(T))&&(!ae[T]||ps[T])){if(!ps[T]&&Qc(T)&&(ee.tagNameCheck instanceof RegExp&&ye(ee.tagNameCheck,T)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(T)))return!1;if(Ro&&!st[T]){const X=B(g)||g.parentNode,ge=j(g)||g.childNodes;if(ge&&X){const ne=ge.length;for(let Be=ne-1;Be>=0;--Be){const vt=w(ge[Be],!0);vt.__removalCount=(g.__removalCount||0)+1,X.insertBefore(vt,S(g))}}}return it(g),!0}return g instanceof d&&!dv(g)||(T==="noscript"||T==="noembed"||T==="noframes")&&ye(/<\/no(script|embed|frames)/i,g.innerHTML)?(it(g),!0):(xn&&g.nodeType===Nn.text&&($=g.textContent,$s([ce,Se,Re],X=>{$=jn($,X," ")}),g.textContent!==$&&(Mn(t.removed,{element:g.cloneNode()}),g.textContent=$)),ht(q.afterSanitizeElements,g,null),!1)},Xc=function(g,$,T){if(qc&&($==="id"||$==="name")&&(T in n||T in cv))return!1;if(!(Do&&!Bo[$]&&ye(Ft,$))){if(!(Rc&&ye(y,$))){if(!(En.attributeCheck instanceof Function&&En.attributeCheck($,g))){if(!de[$]||Bo[$]){if(!(Qc(g)&&(ee.tagNameCheck instanceof RegExp&&ye(ee.tagNameCheck,g)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(g))&&(ee.attributeNameCheck instanceof RegExp&&ye(ee.attributeNameCheck,$)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck($,g))||$==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&ye(ee.tagNameCheck,T)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(T))))return!1}else if(!No[$]){if(!ye(ft,jn(T,Le,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&g!=="script"&&Ud(T,"data:")===0&&Hc[g])){if(!(Pc&&!ye(ze,jn(T,Le,"")))){if(T)return!1}}}}}}}return!0},Qc=function(g){return g!=="annotation-xml"&&Qi(g,Ai)},Jc=function(g){ht(q.beforeSanitizeAttributes,g,null);const{attributes:$}=g;if(!$||Fo(g))return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0};let X=$.length;for(;X--;){const ge=$[X],{name:ne,namespaceURI:Be,value:vt}=ge,Ln=se(ne),Uo=vt;let ue=ne==="value"?Uo:Gd(Uo);if(T.attrName=Ln,T.attrValue=ue,T.keepAttr=!0,T.forceKeepAttr=void 0,ht(q.uponSanitizeAttribute,g,T),ue=T.attrValue,Oc&&(Ln==="id"||Ln==="name")&&(Gt(ne,g),ue=iv+ue),Bi&&ye(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){Gt(ne,g);continue}if(Ln==="attributename"&&Qi(ue,"href")){Gt(ne,g);continue}if(T.forceKeepAttr)continue;if(!T.keepAttr){Gt(ne,g);continue}if(!Nc&&ye(/\/>/i,ue)){Gt(ne,g);continue}xn&&$s([ce,Se,Re],td=>{ue=jn(ue,td," ")});const ed=se(g.nodeName);if(!Xc(ed,Ln,ue)){Gt(ne,g);continue}if(E&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Be)switch(h.getAttributeType(ed,Ln)){case"TrustedHTML":{ue=E.createHTML(ue);break}case"TrustedScriptURL":{ue=E.createScriptURL(ue);break}}if(ue!==Uo)try{Be?g.setAttributeNS(Be,ne,ue):g.setAttribute(ne,ue),Fo(g)?it(g):cr(t.removed)}catch{Gt(ne,g)}}ht(q.afterSanitizeAttributes,g,null)},uv=function C(g){let $=null;const T=Kc(g);for(ht(q.beforeSanitizeShadowDOM,g,null);$=T.nextNode();)ht(q.uponSanitizeShadowNode,$,null),Zc($),Jc($),$.content instanceof a&&C($.content);ht(q.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(C){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,T=null,X=null,ge=null;if(qo=!C,qo&&(C="<!-->"),typeof C!="string"&&!Yc(C))if(typeof C.toString=="function"){if(C=C.toString(),typeof C!="string")throw Rn("dirty is not a string, aborting")}else throw Rn("toString is not a function");if(!t.isSupported)return C;if(Mo||Ho(g),t.removed=[],typeof C=="string"&&(ms=!1),ms){if(C.nodeName){const vt=se(C.nodeName);if(!ae[vt]||ps[vt])throw Rn("root node is forbidden and cannot be sanitized in-place")}}else if(C instanceof r)$=Wc("<!---->"),T=$.ownerDocument.importNode(C,!0),T.nodeType===Nn.element&&T.nodeName==="BODY"||T.nodeName==="HTML"?$=T:$.appendChild(T);else{if(!_n&&!xn&&!Ut&&C.indexOf("<")===-1)return E&&Mi?E.createHTML(C):C;if($=Wc(C),!$)return _n?null:Mi?D:""}$&&jo&&it($.firstChild);const ne=Kc(ms?C:$);for(;X=ne.nextNode();)Zc(X),Jc(X),X.content instanceof a&&uv(X.content);if(ms)return C;if(_n){if(Di)for(ge=V.call($.ownerDocument);$.firstChild;)ge.appendChild($.firstChild);else ge=$;return(de.shadowroot||de.shadowrootmode)&&(ge=le.call(s,ge,!0)),ge}let Be=Ut?$.outerHTML:$.innerHTML;return Ut&&ae["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&ye(gr,$.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Be),xn&&$s([ce,Se,Re],vt=>{Be=jn(Be,vt," ")}),E&&Mi?E.createHTML(Be):Be},t.setConfig=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ho(C),Mo=!0},t.clearConfig=function(){Sn=null,Mo=!1},t.isValidAttribute=function(C,g,$){Sn||Ho({});const T=se(C),X=se(g);return Xc(T,X,$)},t.addHook=function(C,g){typeof g=="function"&&Mn(q[C],g)},t.removeHook=function(C,g){if(g!==void 0){const $=Hd(q[C],g);return $===-1?void 0:Fd(q[C],$,1)[0]}return cr(q[C])},t.removeHooks=function(C){q[C]=[]},t.removeAllHooks=function(){q=vr()},t}var yr=br();const sa="chaotic_";function Ce(e){try{return localStorage.getItem(sa+e)}catch{return null}}function Ne(e,t){try{localStorage.setItem(sa+e,t)}catch{}}function Ke(e){try{localStorage.removeItem(sa+e)}catch{}}function au(){return Ce("token")}function ou(e){e?Ne("token",e):Ke("token")}function ru(){return Ce("theme")}function lu(e){Ne("theme",e)}function wr(){return Ce("last_project")}function cu(e){Ne("last_project",e)}function du(){return Ce("onboarding_complete")==="true"}function uu(){Ne("onboarding_complete","true")}function pu(){Ke("onboarding_complete")}function mu(e){return e?Ce(`issues_filters_${e}`):null}function fu(e,t){e&&(t?Ne(`issues_filters_${e}`,t):Ke(`issues_filters_${e}`))}function kr(e){return Ce(`comment_draft_${e}`)}function _s(e,t){t?Ne(`comment_draft_${e}`,t):Ke(`comment_draft_${e}`)}function $r(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&typeof t.draft=="string"?t:null}catch{return null}}function Is(e){const t=Ce(`description_draft_${e}`);if(!t)return null;const n=$r(t);return n?n.draft:t}function Er(e){const t=Ce(`description_draft_${e}`);if(!t)return null;const n=$r(t);return n&&typeof n.basedOn=="string"?n.basedOn:null}function At(e,t,n=""){t?Ne(`description_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ke(`description_draft_${e}`)}function xr(e){try{const t=JSON.parse(e);return t&&typeof t=="object"&&t.draft&&typeof t.draft=="object"?t:null}catch{return null}}function _r(e){var n;const t=Ce(`document_draft_${e}`);return t?((n=xr(t))==null?void 0:n.draft)??null:null}function gu(e){const t=Ce(`document_draft_${e}`);if(!t)return null;const n=xr(t);return n&&n.basedOn&&typeof n.basedOn=="object"?n.basedOn:null}function Ts(e,t,n=null){t&&(t.title||t.content||t.icon)?Ne(`document_draft_${e}`,JSON.stringify({draft:t,basedOn:n})):Ke(`document_draft_${e}`)}function hu(){return{title:Ce("create_issue_title"),description:Ce("create_issue_description")}}function Ir(e,t){e?Ne("create_issue_title",e):Ke("create_issue_title"),t?Ne("create_issue_description",t):Ke("create_issue_description")}function vu(){Ke("create_issue_title"),Ke("create_issue_description")}function bu(){return Ce("doc_view_mode")}function yu(e){Ne("doc_view_mode",e)}function wu(){return Ce("approvals_explainer_dismissed")==="1"}function ku(){Ne("approvals_explainer_dismissed","1")}const $u="/api";class Eu{constructor(){this.token=au()}setToken(t){this.token=t,ou(t)}getToken(){return this.token}async request(t,n,s=null){const i={"Content-Type":"application/json"};this.token&&(i.Authorization=`Bearer ${this.token}`);const a={method:t,headers:i};s&&(t==="POST"||t==="PATCH"||t==="PUT")&&(a.body=JSON.stringify(s));let o;try{o=await fetch(`${$u}${n}`,a)}catch(d){const c=new Error("Network error - check your connection");throw c.isNetworkError=!0,c.cause=d,c}if(o.status===204)return null;let r;try{r=await o.json()}catch{const d=o.headers.get("content-type")||"unknown";throw o.ok?new Error(`Invalid response from server (expected JSON, got ${d})`):new Error(`Request failed (${o.status})`)}if(!o.ok){let d;typeof r.detail=="string"?d=r.detail:r.detail&&typeof r.detail=="object"&&r.detail.message?d=r.detail.message:d="An error occurred";const c=new Error(d);throw c.status=o.status,c.detail=r.detail,c}return r}async signup(t,n,s){return this.request("POST","/auth/signup",{name:t,email:n,password:s})}async login(t,n){const s=await this.request("POST","/auth/login",{email:t,password:n});return this.setToken(s.access_token),s}async getMe(){return this.request("GET","/auth/me")}logout(){this.setToken(null)}async getUser(t){return this.request("GET",`/users/${t}`)}async updateMe(t){return this.request("PATCH","/users/me",t)}async createTeam(t){return this.request("POST","/teams",t)}async getMyTeams(){return this.request("GET","/teams")}async getTeam(t){return this.request("GET",`/teams/${t}`)}async updateTeam(t,n){return this.request("PATCH",`/teams/${t}`,n)}async deleteTeam(t){return this.request("DELETE",`/teams/${t}`)}async getTeamMembers(t){return this.request("GET",`/teams/${t}/members`)}async updateMemberRole(t,n,s){return this.request("PATCH",`/teams/${t}/members/${n}`,{role:s})}async removeMember(t,n){return this.request("DELETE",`/teams/${t}/members/${n}`)}async createInvitation(t,n,s="member"){return this.request("POST",`/teams/${t}/invitations`,{email:n,role:s})}async getTeamInvitations(t){return this.request("GET",`/teams/${t}/invitations`)}async acceptInvitation(t){return this.request("POST",`/teams/invitations/${t}/accept`)}async deleteInvitation(t,n){return this.request("DELETE",`/teams/${t}/invitations/${n}`)}async createProject(t,n){return this.request("POST",`/teams/${t}/projects`,n)}async getProjects(t){return this.request("GET",`/teams/${t}/projects`)}async getProject(t){return this.request("GET",`/projects/${t}`)}async updateProject(t,n){return this.request("PATCH",`/projects/${t}`,n)}async deleteProject(t){return this.request("DELETE",`/projects/${t}`)}async createIssue(t,n){return this.request("POST",`/projects/${t}/issues`,n)}async getIssues(t={}){const n=new URLSearchParams;return Object.entries(t).forEach(([s,i])=>{i==null||i===""||(Array.isArray(i)?i.forEach(a=>n.append(s,a)):n.append(s,i))}),this.request("GET",`/issues?${n.toString()}`)}async searchIssues(t,n,s=null,i=0,a=50){let o=`/issues/search?team_id=${t}&q=${encodeURIComponent(n)}&skip=${i}&limit=${a}`;return s&&(o+=`&project_id=${s}`),this.request("GET",o)}async getTeamIssues(t,n={}){const s=new URLSearchParams({team_id:t});return Object.entries(n).forEach(([i,a])=>{a==null||a===""||(Array.isArray(a)?a.forEach(o=>s.append(i,o)):s.append(i,a))}),this.request("GET",`/issues?${s.toString()}`)}async getIssue(t){return this.request("GET",`/issues/${t}`)}async getIssueByIdentifier(t){return this.request("GET",`/issues/identifier/${t}`)}async updateIssue(t,n){return this.request("PATCH",`/issues/${t}`,n)}async deleteIssue(t){return this.request("DELETE",`/issues/${t}`)}async createComment(t,n){return this.request("POST",`/issues/${t}/comments`,{content:n})}async getComments(t){return this.request("GET",`/issues/${t}/comments`)}async updateComment(t,n,s){return this.request("PATCH",`/issues/${t}/comments/${n}`,{content:s})}async deleteComment(t,n){return this.request("DELETE",`/issues/${t}/comments/${n}`)}async getActivities(t,n=0,s=50){return this.request("GET",`/issues/${t}/activities?skip=${n}&limit=${s}`)}async getTeamActivities(t,n=0,s=20,{projectId:i}={}){let a=`/issues/activities?team_id=${t}&skip=${n}&limit=${s}`;return i&&(a+=`&project_id=${i}`),this.request("GET",a)}async getSubIssues(t){return this.request("GET",`/issues/${t}/sub-issues`)}async getRelations(t){return this.request("GET",`/issues/${t}/relations`)}async createRelation(t,n,s="blocks"){return this.request("POST",`/issues/${t}/relations`,{related_issue_id:n,relation_type:s})}async deleteRelation(t,n){return this.request("DELETE",`/issues/${t}/relations/${n}`)}async getSprints(t,n=null){let s=`/projects/${t}/sprints`;return n&&(s+=`?sprint_status=${n}`),this.request("GET",s)}async getSprint(t){return this.request("GET",`/sprints/${t}`)}async updateSprint(t,n){return this.request("PATCH",`/sprints/${t}`,n)}async closeSprint(t){return this.request("POST",`/sprints/${t}/close`)}async getCurrentSprint(t){return this.request("GET",`/sprints/current?project_id=${t}`)}async getSprintTransactions(t){return this.request("GET",`/sprints/${t}/transactions`)}async createRitual(t,n){return this.request("POST",`/projects/${t}/rituals`,n)}async getRituals(t){return this.request("GET",`/projects/${t}/rituals`)}async getRitual(t){return this.request("GET",`/rituals/${t}`)}async updateRitual(t,n){return this.request("PATCH",`/rituals/${t}`,n)}async deleteRitual(t){return this.request("DELETE",`/rituals/${t}`)}async getLimboStatus(t){return this.request("GET",`/rituals/limbo?project_id=${t}`)}async getPendingGates(t){return this.request("GET",`/rituals/pending-gates?project_id=${t}`)}async getPendingApprovals(t){return this.request("GET",`/rituals/pending-approvals?project_id=${t}`)}async attestRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest?project_id=${n}`,i)}async approveAttestation(t,n){return this.request("POST",`/rituals/${t}/approve?project_id=${n}`,{})}async completeGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete?project_id=${n}`,i)}async getRitualGroups(t){return this.request("GET",`/rituals/groups?project_id=${t}`)}async createRitualGroup(t,n){return this.request("POST",`/rituals/groups?project_id=${t}`,n)}async updateRitualGroup(t,n){return this.request("PATCH",`/rituals/groups/${t}`,n)}async deleteRitualGroup(t){return this.request("DELETE",`/rituals/groups/${t}`)}async getTicketRitualsStatus(t){return this.request("GET",`/rituals/issue/${t}/pending`)}async attestTicketRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/attest-issue/${n}`,i)}async completeTicketGateRitual(t,n,s=null){const i={};return s&&(i.note=s),this.request("POST",`/rituals/${t}/complete-issue/${n}`,i)}async approveTicketRitual(t,n){return this.request("POST",`/rituals/${t}/approve-issue/${n}`,{})}async createDocument(t,n){return this.request("POST",`/teams/${t}/documents`,n)}async getDocuments(t,n=null,s=null,i=null){let a=`/teams/${t}/documents`;const o=[];return n&&o.push(`project_id=${n}`),i&&o.push(`sprint_id=${i}`),s&&o.push(`search=${encodeURIComponent(s)}`),o.length&&(a+=`?${o.join("&")}`),this.request("GET",a)}async getDocument(t){return this.request("GET",`/documents/${t}`)}async updateDocument(t,n){return this.request("PATCH",`/documents/${t}`,n)}async deleteDocument(t){return this.request("DELETE",`/documents/${t}`)}async getDocumentIssues(t){return this.request("GET",`/documents/${t}/issues`)}async linkDocumentToIssue(t,n){return this.request("POST",`/documents/${t}/issues/${n}`)}async unlinkDocumentFromIssue(t,n){return this.request("DELETE",`/documents/${t}/issues/${n}`)}async getIssueDocuments(t){return this.request("GET",`/issues/${t}/documents`)}async getDocumentComments(t){return this.request("GET",`/documents/${t}/comments`)}async createDocumentComment(t,n){return this.request("POST",`/documents/${t}/comments`,{content:n})}async updateDocumentComment(t,n,s){return this.request("PATCH",`/documents/${t}/comments/${n}`,{content:s})}async deleteDocumentComment(t,n){return this.request("DELETE",`/documents/${t}/comments/${n}`)}async getDocumentLabels(t){return this.request("GET",`/documents/${t}/labels`)}async addLabelToDocument(t,n){return this.request("POST",`/documents/${t}/labels/${n}`)}async removeLabelFromDocument(t,n){return this.request("DELETE",`/documents/${t}/labels/${n}`)}async createLabel(t,n){return this.request("POST",`/teams/${t}/labels`,n)}async getLabels(t){return this.request("GET",`/teams/${t}/labels`)}async getLabel(t){return this.request("GET",`/labels/${t}`)}async updateLabel(t,n){return this.request("PATCH",`/labels/${t}`,n)}async deleteLabel(t){return this.request("DELETE",`/labels/${t}`)}async createApiKey(t){return this.request("POST","/api-keys",{name:t})}async getApiKeys(){return this.request("GET","/api-keys")}async revokeApiKey(t){return this.request("DELETE",`/api-keys/${t}`)}async createTeamAgent(t,n,s=null){return this.request("POST",`/teams/${t}/agents`,{name:n,avatar_url:s})}async createProjectAgent(t,n,s=null){return this.request("POST",`/projects/${t}/agents`,{name:n,avatar_url:s})}async getTeamAgents(t){return this.request("GET",`/teams/${t}/agents`)}async getAgent(t){return this.request("GET",`/agents/${t}`)}async updateAgent(t,n){return this.request("PATCH",`/agents/${t}`,n)}async deleteAgent(t){return this.request("DELETE",`/agents/${t}`)}}const b=new Eu;let zt=null;const xu='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';let Vt=null;function U(){Vt=document.activeElement,document.getElementById("modal-overlay").classList.remove("hidden"),setTimeout(()=>{try{const e=document.querySelector("#modal-content input, #modal-content textarea");e&&e.focus()}catch{}},50)}function O(){var e;bt(),document.getElementById("modal-overlay").classList.add("hidden"),(e=document.querySelector(".modal"))==null||e.classList.remove("modal-wide"),Vt&&document.contains(Vt)&&typeof Vt.focus=="function"&&Vt.focus(),Vt=null}document.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(!t||t.classList.contains("hidden"))return;const n=t.querySelector(".modal")||t,s=n.querySelectorAll(xu);if(s.length===0)return;const i=s[0],a=s[s.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),i.focus();return}e.shiftKey&&document.activeElement===i?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),i.focus())});function qn(){const e=document.getElementById("modal-overlay");return e?!e.classList.contains("hidden"):!1}function k(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast toast-${t}`;const i=document.createElement("span");i.className="toast-message",i.textContent=e,s.appendChild(i);const a=document.createElement("button");a.type="button",a.className="toast-close",a.setAttribute("aria-label","Dismiss"),a.textContent="×",s.appendChild(a),n.appendChild(s);const o=()=>{s.classList.add("toast-exit"),s.addEventListener("animationend",()=>s.remove(),{once:!0}),setTimeout(()=>{s.parentNode&&s.remove()},500)},d=Math.min(1e4,Math.max(t==="error"||t==="warning"?5e3:3e3,e.length*50));let c=d,l=Date.now(),u=setTimeout(o,d);a.addEventListener("click",()=>{clearTimeout(u),o()}),s.addEventListener("mouseenter",()=>{clearTimeout(u),c-=Date.now()-l}),s.addEventListener("mouseleave",()=>{l=Date.now(),u=setTimeout(o,Math.max(c,500))})}function _u(e){if(!e)return"An unknown error occurred";if(typeof e.message=="string"&&e.message)return e.message;const t=e.detail;if(t){if(typeof t=="string")return t;if(typeof t=="object"&&t.message)return t.message;if(Array.isArray(t))return t.map(n=>n.msg||JSON.stringify(n)).join("; ")}return"An unknown error occurred"}function x(e,t){const n=_u(t),s=t!=null&&t.isNetworkError?" (network)":(t==null?void 0:t.status)>=500?" (server)":"";k(`Failed to ${e}: ${n}${s}`,"error")}function bt(){document.querySelectorAll(".inline-dropdown").forEach(e=>e.remove()),zt&&(document.removeEventListener("keydown",zt),zt=null)}function On(e){zt&&document.removeEventListener("keydown",zt),zt=e,e&&document.addEventListener("keydown",e)}function Hn(e,t={}){const{multiSelect:n=!1}=t,s=i=>{n&&e.contains(i.target)||(bt(),document.removeEventListener("click",s,!0))};return setTimeout(()=>document.addEventListener("click",s,!0),0),()=>document.removeEventListener("click",s,!0)}function ke(e){return e?e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function De(e){return e?e==="no_priority"?"No Priority":e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()):""}function ia(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?"":t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}function Y(e){if(typeof e!="string"||!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e))return"#888888";if(e.length===4){const[,t,n,s]=e;return`#${t}${t}${n}${n}${s}${s}`}return e}function f(e){if(!e)return"";const t={"&":"&amp;","<":"&lt;",">":"&gt;"};return String(e).replace(/[&<>]/g,n=>t[n])}function p(e){return f(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ye(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"in the future";const i=Math.floor(s/6e4),a=Math.floor(s/36e5),o=Math.floor(s/864e5);return i<1?"just now":i<60?`${i}m ago`:a<24?`${a}h ago`:o<7?`${o}d ago`:t.toLocaleDateString()}function lt(e){return{task:"Task",bug:"Bug",feature:"Feature",chore:"Chore",docs:"Docs",tech_debt:"Tech Debt",epic:"Epic"}[e]||"Task"}function Iu(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Wt(e,t="avatar-small"){const n=(e==null?void 0:e.name)||(e==null?void 0:e.email)||"User",s=e==null?void 0:e.avatar_url;return s?Iu(s)?`<img class="${t} avatar-img" src="${p(s)}" alt="${p(n)}">`:`<div class="${t} avatar-emoji">${f(s)}</div>`:`<div class="${t}">${n.charAt(0).toUpperCase()}</div>`}let te={...{currentUser:null,currentView:"my-issues",issues:[],detailNavContext:[],assignees:[],labels:[],activeFilterCategory:"status",selectedIssueIndex:-1,selectedDocIndex:-1,selectedBoardIndex:-1,pendingGates:[],searchDebounceTimer:null,websocket:null,currentTeam:null,currentProject:null,currentDetailIssue:null,currentDetailSprints:null}};const aa=new Set;function pe(e,t){if(typeof e=="string"){const n=te[e];te[e]=t,Tr(e,t,n)}else if(typeof e=="object"){const n=[];for(const[s,i]of Object.entries(e)){const a=te[s];te[s]=i,n.push({key:s,value:i,oldValue:a})}n.forEach(({key:s,value:i,oldValue:a})=>{Tr(s,i,a)})}}function Ze(e){return aa.add(e),()=>aa.delete(e)}function Tr(e,t,n){t!==n&&aa.forEach(s=>{try{s(e,t,n)}catch(i){console.error("State subscriber error:",i)}})}const Kt=()=>te.currentUser,Ss=e=>pe("currentUser",e),L=()=>te.currentView,Tu=e=>pe("currentView",e),Me=()=>te.issues,Xe=e=>pe("issues",e),Ls=()=>te.detailNavContext,Yt=e=>pe("detailNavContext",e),Sr=()=>te.labels,Cs=e=>pe("labels",e),Lr=()=>te.activeFilterCategory,Su=e=>pe("activeFilterCategory",e),Cr=()=>te.selectedIssueIndex,Fn=e=>pe("selectedIssueIndex",e),Lu=()=>te.selectedDocIndex,Ar=e=>pe("selectedDocIndex",e),Br=()=>te.selectedBoardIndex,As=e=>pe("selectedBoardIndex",e),Cu=()=>te.pendingGates,Au=e=>pe("pendingGates",e),Bu=()=>te.searchDebounceTimer,Du=e=>pe("searchDebounceTimer",e),Mu=()=>te.websocket,Dr=e=>pe("websocket",e),A=()=>te.currentTeam,oa=e=>pe("currentTeam",e),z=()=>te.currentProject,Oe=e=>pe("currentProject",e||null),ie=()=>te.currentDetailIssue,Bs=e=>pe("currentDetailIssue",e),ju=()=>te.currentDetailSprints,Mr=e=>pe("currentDetailSprints",e),ra={};function J(e){Object.assign(ra,e)}function Ru(e){var a;const t=e.target.closest("[data-action]");if(!t||t.tagName==="FORM")return;const n=e.type;if((n==="keydown"||n==="input")&&t!==e.target){const o=e.target.tagName;if(o==="INPUT"||o==="TEXTAREA"||o==="SELECT")return}if(n==="keydown"&&e.key!=="Enter"&&e.key!==" ")return;const s=t.dataset.action,i=ra[s];if(!i){typeof process<"u"&&((a=process.env)==null?void 0:a.NODE_ENV)!=="production"&&console.warn(`[event-delegation] No handler registered for action "${s}"`);return}i(e,t.dataset,t)}let jr=!1;function Pu(){if(!jr){jr=!0;for(const e of["click","change","input","keydown","dragstart","dragend","dragover","dragleave","drop"])document.addEventListener(e,Ru);document.addEventListener("submit",e=>{const t=e.target;if(!t.dataset||!t.dataset.action)return;const n=ra[t.dataset.action];n&&(e.preventDefault(),n(e,t.dataset,t))})}}const la=["backlog","todo","in_progress","in_review","done","canceled"],Zt=["backlog","todo","in_progress","in_review"],Rr=["urgent","high","medium","low","no_priority"],ca=["no_priority","urgent","high","medium","low"],Pr=["backlog","todo","in_progress","in_review","done"];function N({icon:e,heading:t,description:n,cta:s,variant:i}){const a=s?`
        <button class="btn btn-primary empty-state-cta" data-action="${p(s.action)}"${s.data?Object.entries(s.data).map(([r,d])=>` data-${p(r)}="${p(d)}"`).join(""):""}>${f(s.label)}</button>
    `:"";return`
        <div class="empty-state${i==="error"?" empty-state-error":""}">
            <div class="empty-state-icon">${e}</div>
            <h3>${f(t)}</h3>
            <p>${f(n)}</p>
            ${a}
        </div>
    `}const P={issues:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',board:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',sprints:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',documents:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',projects:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',dashboard:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>',epics:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',activity:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',search:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',rituals:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v4"/><path d="m6.4 6.4 2.8 2.8"/><path d="M2 12h4"/><path d="m6.4 17.6 2.8-2.8"/><path d="M12 18v4"/><path d="m14.8 14.8 2.8 2.8"/><path d="M18 12h4"/><path d="m14.8 9.2 2.8-2.8"/></svg>',team:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'};let Un=[];function Nu(e){const t=e.user_name||e.name||e.user_email||e.email||"Unknown";return{id:e.user_id||e.id,name:t,email:e.user_email||e.email||null,is_agent:!1,parent_user_id:null,parent_user_name:null}}function qu(e){return{id:e.id,name:e.name,email:null,is_agent:!0,parent_user_id:e.parent_user_id||null,parent_user_name:e.parent_user_name||null,avatar_url:e.avatar_url||null}}function Ds(e,t){const n=e().map(Nu),s=t().map(qu);Un=[...n,...s]}function Gn(e){return e&&Un.find(t=>t.id===e)||null}function Bt(e){return e?e.is_agent?e.name||"Agent":e.name||e.email||"User":null}function da(e,t=!1){const n=f(e.name||e.email||"Unknown");if(!e.is_agent)return n;const s=e.parent_user_name?` (${f(e.parent_user_name)})`:" (agent)";return`${t?"&nbsp;&nbsp;- ":""}${n}${s}`}function Ms(){const e=Un.filter(a=>!a.is_agent),t=new Map,n=new Set(e.map(a=>a.id));Un.filter(a=>a.is_agent).forEach(a=>{const o=a.parent_user_id;t.has(o)||t.set(o,[]),t.get(o).push(a)});const s=[];e.forEach(a=>{s.push({assignee:a,indent:!1});const o=t.get(a.id)||[];o.sort((r,d)=>r.name.localeCompare(d.name)),o.forEach(r=>s.push({assignee:r,indent:!0}))});const i=Un.filter(a=>a.is_agent&&!n.has(a.parent_user_id));return i.sort((a,o)=>a.name.localeCompare(o.name)),i.forEach(a=>s.push({assignee:a,indent:!1})),s}function js(){const e=document.getElementById("assignee-filter");if(!e)return;const t=e.value;let n=`
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;Ms().forEach(({assignee:s,indent:i})=>{n+=`<option value="${s.id}">${da(s,i)}</option>`}),e.innerHTML=n,t&&(e.value=t)}function Xt(){const e=document.getElementById("status-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Qt(){const e=document.getElementById("priority-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Jt(){const e=document.getElementById("label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function en(){const e=document.getElementById("exclude-label-filter-dropdown");if(!e)return[];const t=e.querySelectorAll('input[type="checkbox"]:checked');return Array.from(t).map(n=>n.value)}function Nr(){const e=document.getElementById("group-by-select");return e?e.value:""}const qr=[{key:"project",label:"Project"},{key:"status",label:"Status"},{key:"priority",label:"Priority"},{key:"type",label:"Type"},{key:"assignee",label:"Assignee"},{key:"sprint",label:"Sprint"},{key:"labels",label:"Labels"},{key:"exclude_labels",label:"Exclude Labels"}],Rs=["done","canceled"];function Or(e){var t,n,s;switch(e){case"project":return z()?1:0;case"status":return Xt().length;case"priority":return Qt().length;case"type":return(t=document.getElementById("issue-type-filter"))!=null&&t.value?1:0;case"assignee":return(n=document.getElementById("assignee-filter"))!=null&&n.value?1:0;case"sprint":return(s=document.getElementById("sprint-filter"))!=null&&s.value?1:0;case"labels":return Jt().length;case"exclude_labels":return en().length;default:return 0}}function ua(){let e=0;return qr.forEach(t=>{e+=Or(t.key)}),e}function Hr(){var h,v,w,_,S,j;const e=new URLSearchParams,t=Xt(),n=Qt(),s=Jt(),i=en(),a=(h=document.getElementById("assignee-filter"))==null?void 0:h.value,o=z()||"",r=(v=document.getElementById("sprint-filter"))==null?void 0:v.value,d=(w=document.getElementById("issue-type-filter"))==null?void 0:w.value,c=(_=document.getElementById("group-by-select"))==null?void 0:_.value,l=(S=document.getElementById("sort-by-select"))==null?void 0:S.value;t.forEach(B=>e.append("status",B)),n.forEach(B=>e.append("priority",B)),s.forEach(B=>e.append("label",B)),i.forEach(B=>e.append("exclude_label",B)),a&&e.set("assignee",a),o&&e.set("project",o),r&&e.set("sprint",r),d&&e.set("issue_type",d),c&&e.set("groupBy",c),l&&l!=="created-desc"&&e.set("sort",l);const u=e.toString(),m=u?`/issues?${u}`:"/issues";history.replaceState({view:"issues"},"",m),fu((j=A())==null?void 0:j.id,u)}function Ou(e){var v;let t=new URLSearchParams(window.location.search);if(!["status","priority","label","exclude_label","assignee","sprint","issue_type","groupBy","sort","project"].some(w=>t.has(w))){const w=mu((v=A())==null?void 0:v.id);if(w){t=new URLSearchParams(w);const _=`/issues?${t.toString()}`;history.replaceState({view:"issues"},"",_)}}const i=t.getAll("status");if(i.length>0){const w=document.getElementById("status-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=i.includes(S.value)}),Fr())}const a=t.getAll("priority");if(a.length>0){const w=document.getElementById("priority-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=a.includes(S.value)}),Ur())}const o=t.get("assignee");if(o){const w=document.getElementById("assignee-filter");w&&(w.value=o)}const r=t.get("project");r&&(e(!0),Oe(r),e(!1));const d=t.get("sprint");if(d){const w=document.getElementById("sprint-filter");w&&(w.value=d)}const c=t.get("issue_type");if(c){const w=document.getElementById("issue-type-filter");w&&(w.value=c)}const l=t.getAll("label");if(l.length>0){const w=document.getElementById("label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=l.includes(S.value)}),Ps())}const u=t.getAll("exclude_label");if(u.length>0){const w=document.getElementById("exclude-label-filter-dropdown");w&&(w.querySelectorAll('input[type="checkbox"]').forEach(S=>{S.checked=u.includes(S.value)}),Ns())}const m=t.get("groupBy");if(m){const w=document.getElementById("group-by-select");w&&(w.value=m)}const h=t.get("sort");if(h){const w=document.getElementById("sort-by-select");w&&(w.value=h)}}function Fr(){const e=Xt(),t=document.getElementById("status-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Statuses":e.length===1?n.textContent=ke(e[0]):n.innerHTML=`${e.length} statuses<span class="multi-select-badge">${e.length}</span>`)}function Ur(){const e=Qt(),t=document.getElementById("priority-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");n&&(e.length===0?n.textContent="All Priorities":e.length===1?n.textContent=De(e[0]):n.innerHTML=`${e.length} priorities<span class="multi-select-badge">${e.length}</span>`)}function Ps(){var s,i;const e=Jt(),t=document.getElementById("label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="All Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=o}else n.textContent=`${e.length} Labels`}function Ns(){var s,i;const e=en(),t=document.getElementById("exclude-label-filter-dropdown"),n=t==null?void 0:t.querySelector(".multi-select-label");if(n)if(e.length===0)n.textContent="Exclude Labels";else if(e.length===1){const a=t.querySelector(`input[value="${e[0]}"]`),o=((i=(s=a==null?void 0:a.closest("label"))==null?void 0:s.querySelector(".label-name"))==null?void 0:i.textContent)||"1 Label";n.textContent=`Excl: ${o}`}else n.textContent=`Excl: ${e.length} Labels`}async function Gr(){if(!A())return;let e;try{e=await b.getLabels(A().id)}catch(t){console.error("Failed to load labels for filter:",t);return}zr("label-filter-dropdown",e,"update-label-filter","clear-label-filter"),zr("exclude-label-filter-dropdown",e,"update-exclude-label-filter","clear-exclude-label-filter")}function zr(e,t,n,s){const i=document.getElementById(e);if(!i)return;const a=i.querySelector(".multi-select-options");a.innerHTML="",t.length===0?a.innerHTML='<div class="multi-select-empty">No labels available</div>':t.forEach(r=>{const d=document.createElement("label");d.className="multi-select-option",d.innerHTML=`
                <input type="checkbox" value="${r.id}" data-action="${n}">
                <span class="label-badge" style="background: ${Y(r.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                    <span class="label-name">${f(r.name)}</span>
                </span>
            `,a.appendChild(d)});const o=document.createElement("div");o.className="multi-select-actions",o.innerHTML=`<button type="button" class="btn btn-small" data-action="${s}">Clear</button>`,a.appendChild(o)}function qs(e){const n=document.getElementById(e).querySelector(".multi-select-options"),s=!n.classList.contains("hidden");document.querySelectorAll(".multi-select-options").forEach(i=>{i.classList.add("hidden")}),s||(n.classList.remove("hidden"),setTimeout(()=>{document.addEventListener("click",Vr)},0))}function Vr(e){e.target.closest(".multi-select-dropdown")||(document.querySelectorAll(".multi-select-options").forEach(t=>{t.classList.add("hidden")}),document.removeEventListener("click",Vr))}function Hu(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",tn)):(e.classList.remove("hidden"),e.classList.remove("show-options"),me(),$e(Lr()),setTimeout(()=>{document.addEventListener("click",tn)},0))}function Fu(){const e=document.getElementById("display-menu-dropdown"),t=document.getElementById("filter-menu-dropdown");if(!e)return;t&&!t.classList.contains("hidden")&&t.classList.add("hidden"),!e.classList.contains("hidden")?(e.classList.add("hidden"),document.removeEventListener("click",tn)):(e.classList.remove("hidden"),Qu(),setTimeout(()=>{document.addEventListener("click",tn)},0))}function tn(e){const t=document.getElementById("filter-menu-dropdown"),n=document.getElementById("display-menu-dropdown"),s=e.composedPath(),i=document.querySelector(".filter-menu-container"),a=document.querySelector(".display-menu-container"),o=i&&s.includes(i),r=a&&s.includes(a);!o&&!r&&(t&&t.classList.add("hidden"),n&&n.classList.add("hidden"),document.removeEventListener("click",tn))}function Dt(){const e=document.getElementById("filter-menu-dropdown"),t=document.getElementById("display-menu-dropdown");e&&e.classList.add("hidden"),t&&t.classList.add("hidden"),document.removeEventListener("click",tn)}function me(){const e=document.getElementById("filter-menu-categories");if(!e)return;const t=z();e.innerHTML=qr.map(n=>{const s=Or(n.key),i=Lr()===n.key,a=n.key==="sprint"&&!t;return`
            <div class="filter-menu-category ${i?"active":""} ${a?"disabled":""}"
                 data-action="show-filter-category" data-category="${p(n.key)}" tabindex="-1">
                <span>${n.label}</span>
                ${s>0?`<span class="filter-menu-category-count">${s}</span>`:""}
                <span class="filter-menu-category-arrow">→</span>
            </div>
        `}).join("")}function $e(e){Su(e),me();const t=document.getElementById("filter-menu-options");if(!t)return;switch(e){case"project":Gu(t);break;case"status":zu(t);break;case"priority":Vu(t);break;case"type":Wu(t);break;case"assignee":Ku(t);break;case"sprint":Yu(t);break;case"labels":Zu(t);break;case"exclude_labels":Xu(t);break}const n=t.querySelector(".filter-options-header");if(n){const s=document.createElement("button");s.type="button",s.className="filter-options-back",s.dataset.action="filter-menu-back",s.setAttribute("aria-label","Back to filter categories"),s.textContent="←",n.prepend(s)}}function Uu(){const e=document.getElementById("filter-menu-dropdown");e&&e.classList.remove("show-options"),me()}function Gu(e){const t=z()||"",n=Q()||[];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${t?'<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>':""}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${t?"":"checked"}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;n.forEach(i=>{s+=`
            <label class="filter-option" data-action="set-project-filter" data-value="${p(i.id)}">
                <input type="radio" name="project-filter-radio" value="${p(i.id)}" ${t===i.id?"checked":""}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(i.color)};"></span>
                <span class="filter-option-label">${f(i.name)}</span>
            </label>
        `}),e.innerHTML=s}function zu(e){const t=Xt(),n=[{value:"backlog",label:"Backlog",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>'},{value:"todo",label:"Todo",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'},{value:"in_progress",label:"In Progress",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>'},{value:"in_review",label:"In Review",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>'},{value:"done",label:"Done",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>'},{value:"canceled",label:"Canceled",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'}],s=Zt.every(o=>t.includes(o))&&!Rs.some(o=>t.includes(o))&&t.length===Zt.length,i=Rs.every(o=>t.includes(o))&&!Zt.some(o=>t.includes(o))&&t.length===Rs.length;let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>':""}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${s?"active":""}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${i?"active":""}" data-action="set-status-preset" data-value="closed">Closed</button>
        </div>
    `;n.forEach(o=>{a+=`
            <label class="filter-option">
                <input type="checkbox" value="${o.value}" ${t.includes(o.value)?"checked":""} data-action="toggle-status-option" data-filter-value="${p(o.value)}">
                <span class="filter-option-icon">${o.icon}</span>
                <span class="filter-option-label">${o.label}</span>
            </label>
        `}),e.innerHTML=a}function Vu(e){const t=Qt(),n=[{value:"urgent",label:"Urgent",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>'},{value:"high",label:"High",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"medium",label:"Medium",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"low",label:"Low",icon:'<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>'},{value:"no_priority",label:"No Priority",icon:'<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'}];let s=`
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>':""}
        </div>
    `;n.forEach(i=>{s+=`
            <label class="filter-option">
                <input type="checkbox" value="${i.value}" ${t.includes(i.value)?"checked":""} data-action="toggle-priority-option" data-filter-value="${p(i.value)}">
                <span class="filter-option-icon">${i.icon}</span>
                <span class="filter-option-label">${i.label}</span>
            </label>
        `}),e.innerHTML=s}function Wu(e){const t=document.getElementById("issue-type-filter"),n=(t==null?void 0:t.value)||"",s=[{value:"",label:"All Types"},{value:"task",label:"Task"},{value:"bug",label:"Bug"},{value:"feature",label:"Feature"},{value:"chore",label:"Chore"},{value:"docs",label:"Docs"},{value:"tech_debt",label:"Tech Debt"},{value:"epic",label:"Epic"}];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${n?'<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>':""}
        </div>
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-type-filter" data-value="${p(a.value)}">
                <input type="radio" name="type-filter-radio" value="${a.value}" ${n===a.value?"checked":""}>
                <span class="filter-option-label">${a.label}</span>
            </label>
        `}),e.innerHTML=i}function Ku(e){const t=document.getElementById("assignee-filter"),n=(t==null?void 0:t.value)||"",s=qt()||[];let i=`
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
    `;s.forEach(a=>{i+=`
            <label class="filter-option" data-action="set-assignee-filter" data-value="${p(a.user_id)}">
                <input type="radio" name="assignee-filter-radio" value="${p(a.user_id)}" ${n===a.user_id?"checked":""}>
                <span class="filter-option-label">${f(a.name||a.email)}</span>
            </label>
        `}),e.innerHTML=i}function Yu(e){if(!z()){e.innerHTML=`
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;return}const n=document.getElementById("sprint-filter"),s=(n==null?void 0:n.value)||"",i=n?Array.from(n.options):[];let a=`
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${s?'<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>':""}
        </div>
    `;i.forEach(o=>{a+=`
            <label class="filter-option" data-action="set-sprint-filter" data-value="${p(o.value)}">
                <input type="radio" name="sprint-filter-radio" value="${p(o.value)}" ${s===o.value?"checked":""}>
                <span class="filter-option-label">${f(o.text)}</span>
            </label>
        `}),e.innerHTML=a}function Zu(e){const t=Jt(),n=document.getElementById("label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",l=(d==null?void 0:d.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(l)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=i}function Xu(e){const t=en(),n=document.getElementById("exclude-label-filter-dropdown"),s=(n==null?void 0:n.querySelectorAll('.multi-select-option input[type="checkbox"]'))||[];let i=`
        <div class="filter-options-header">
            <span class="filter-options-title">Exclude Labels</span>
            ${t.length>0?'<button class="filter-options-clear" data-action="clear-exclude-label-filter-new">Clear</button>':""}
        </div>
    `;s.length===0?i+='<div class="filter-options-empty">No labels available</div>':s.forEach(a=>{const o=a.closest("label"),r=o==null?void 0:o.querySelector(".label-name"),d=o==null?void 0:o.querySelector(".label-badge"),c=(r==null?void 0:r.textContent)||"Label",l=(d==null?void 0:d.style.background)||"#6366f1";i+=`
                <label class="filter-option">
                    <input type="checkbox" value="${p(a.value)}" ${t.includes(a.value)?"checked":""} data-action="toggle-exclude-label-option" data-filter-value="${p(a.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${Y(l)};"></span>
                    <span class="filter-option-label">${f(c)}</span>
                </label>
            `}),e.innerHTML=i}function Qu(){const e=document.getElementById("display-menu-dropdown");if(!e)return;const t=document.getElementById("sort-by-select"),n=document.getElementById("group-by-select"),s=(t==null?void 0:t.value)||"created-desc",i=(n==null?void 0:n.value)||"",a=[{value:"created-desc",label:"Newest"},{value:"created-asc",label:"Oldest"},{value:"updated-desc",label:"Recently Updated"},{value:"updated-asc",label:"Least Recently Updated"},{value:"priority-asc",label:"Priority ↑"},{value:"priority-desc",label:"Priority ↓"},{value:"title-asc",label:"Title A-Z"},{value:"title-desc",label:"Title Z-A"},{value:"random",label:"Random"}],o=[{value:"",label:"No grouping"},{value:"status",label:"Status"},{value:"priority",label:"Priority"},{value:"type",label:"Type"},{value:"assignee",label:"Assignee"},{value:"sprint",label:"Sprint"}];let r=`
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${a.map(d=>`
                <div class="display-option ${s===d.value?"active":""}" data-action="set-sort" data-value="${p(d.value)}">
                    <span>${d.label}</span>
                    ${s===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${o.map(d=>`
                <div class="display-option ${i===d.value?"active":""}" data-action="set-group-by" data-value="${p(d.value)}">
                    <span>${d.label}</span>
                    ${i===d.value?'<span class="display-option-check">✓</span>':""}
                </div>
            `).join("")}
        </div>
    `;e.innerHTML=r}function Ee(){const e=document.getElementById("filter-chips-row");if(!e)return;const t=[],n=z();if(n){const m=(Q()||[]).find(h=>h.id===n);t.push({category:"project",label:"Project",value:(m==null?void 0:m.name)||"Unknown",clearAction:"clear-project-filter"})}const s=Xt();if(s.length>0){const u=s.map(m=>ke(m)).join(", ");t.push({category:"status",label:"Status",value:u,clearAction:"clear-status-filter-new"})}const i=Qt();if(i.length>0){const u=i.map(m=>De(m)).join(", ");t.push({category:"priority",label:"Priority",value:u,clearAction:"clear-priority-filter-new"})}const a=document.getElementById("issue-type-filter");if(a!=null&&a.value){const u=a.options[a.selectedIndex];t.push({category:"type",label:"Type",value:u?u.text:a.value,clearAction:"clear-type-filter"})}const o=document.getElementById("assignee-filter");if(o!=null&&o.value){let u;if(o.value==="me")u="Me";else if(o.value==="unassigned")u="Unassigned";else{const h=(qt()||[]).find(v=>v.user_id===o.value);u=(h==null?void 0:h.name)||(h==null?void 0:h.email)||"Unknown"}t.push({category:"assignee",label:"Assignee",value:u,clearAction:"clear-assignee-filter"})}const r=document.getElementById("sprint-filter");if(r!=null&&r.value){const u=r.options[r.selectedIndex];t.push({category:"sprint",label:"Sprint",value:(u==null?void 0:u.text)||r.value,clearAction:"clear-sprint-filter"})}const d=Jt();if(d.length>0){const u=document.getElementById("label-filter-dropdown"),m=d.map(h=>{var _;const v=u==null?void 0:u.querySelector(`input[value="${h}"]`),w=(_=v==null?void 0:v.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Labels",value:m,clearAction:"clear-label-filter-new"})}const c=en();if(c.length>0){const u=document.getElementById("exclude-label-filter-dropdown"),m=c.map(h=>{var _;const v=u==null?void 0:u.querySelector(`input[value="${h}"]`),w=(_=v==null?void 0:v.closest("label"))==null?void 0:_.querySelector(".label-name");return(w==null?void 0:w.textContent)||"Label"}).join(", ");t.push({category:"labels",label:"Excluded Labels",value:m,clearAction:"clear-exclude-label-filter-new"})}if(t.length===0){e.classList.add("hidden"),e.innerHTML="";return}e.classList.remove("hidden");let l=t.map(u=>`
        <span class="filter-chip" title="${p(u.label)}: ${p(u.value)}">
            <span class="filter-chip-label">${u.label}:</span>
            <span class="filter-chip-value">${f(u.value)}</span>
            <button class="filter-chip-remove" data-action="${u.clearAction}" title="Remove filter">×</button>
        </span>
    `).join("");t.length>1&&(l+='<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>'),e.innerHTML=l}function xe(){const e=document.getElementById("filter-count-badge");if(!e)return;const t=ua();t===0?e.classList.add("hidden"):(e.textContent=t,e.classList.remove("hidden"))}async function Wr(){const e=document.getElementById("sprint-filter");if(!e)return;const t=z(),n=e.value;if(!t){e.innerHTML='<option value="">All Sprints</option>',e.value="",pa(null);return}let s=`
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;try{const i=await b.getSprints(t),a=i.find(o=>o.status==="active");a&&(s+=`<option value="current">Current Sprint (${f(a.name)})</option>`),Hl(t,a==null?void 0:a.id),pa(a||null),i.forEach(o=>{const r=o.status==="active"?" (Active)":o.status==="completed"?" (Done)":"";s+=`<option value="${o.id}">${f(o.name)}${r}</option>`})}catch(i){console.error("Failed to load sprints:",i)}e.innerHTML=s,n&&Array.from(e.options).some(a=>a.value===n)&&(e.value=n)}function pa(e){const t=document.getElementById("sprint-budget-bar");if(!t)return;if(!e){t.classList.add("hidden");return}const n=e.points_spent||0,s=e.budget;if(s==null){t.classList.remove("hidden","arrears"),t.innerHTML=`
            <span class="budget-label">${f(e.name)}</span>
            <span class="budget-text">${n} points spent (no budget)</span>
        `;return}const i=s>0?Math.min(n/s*100,100):0,a=n>s,o=i>=80&&!a,r=a?"budget-over":o?"budget-warning":"";t.classList.remove("hidden"),t.classList.toggle("arrears",a),t.innerHTML=`
        <span class="budget-label">${f(e.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${r}" style="width: ${i}%"></div>
        </div>
        <span class="budget-text">${n} / ${s} points</span>
        ${a?'<span class="arrears-badge">In Arrears</span>':""}
    `}function Kr(){const e=document.getElementById("issues-list");e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join("")}let Yr=!1;Ze(e=>{if(e!=="currentProject"||L()!=="issues"||Yr)return;const t=document.getElementById("sprint-filter");t&&(t.value=""),Promise.all([Wr(),Gr()]).then(()=>{const n=document.getElementById("label-filter-dropdown");n==null||n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1});const s=document.getElementById("exclude-label-filter-dropdown");s==null||s.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=!1}),Ps(),Ns(),je(),Ee(),xe()}).catch(n=>{console.error("Failed to update filters on project switch:",n),je(),Ee(),xe()})});function Ju(){Ou(e=>{Yr=e})}function Os(){Fr(),je(),Ee(),xe()}function ma(){const e=document.getElementById("status-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),Os()}function fa(){Ur(),je(),Ee(),xe()}function ga(){const e=document.getElementById("priority-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),fa()}function ha(){Ps(),je(),Ee(),xe()}function Hs(){const e=document.getElementById("label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),ha()}function va(){Ns(),je(),Ee(),xe()}function Fs(){const e=document.getElementById("exclude-label-filter-dropdown");e==null||e.querySelectorAll('input[type="checkbox"]').forEach(t=>t.checked=!1),va()}function ep(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Zr(e,t){if(e.length===0)return[];const n=document.getElementById(t);return e.map(s=>{var i,a,o;return(o=(a=(i=n==null?void 0:n.querySelector(`input[value="${ep(s)}"]`))==null?void 0:i.closest("label"))==null?void 0:a.querySelector(".label-name"))==null?void 0:o.textContent}).filter(Boolean)}let Us=0;async function yt(){var m,h,v,w,_,S,j;Fn(-1);const e=++Us;if(!A())return;const t=z()||"",n=Xt(),s=Qt(),i=(m=document.getElementById("assignee-filter"))==null?void 0:m.value,a=(v=(h=document.getElementById("issue-search"))==null?void 0:h.value)==null?void 0:v.trim();if(!t&&Q().length===0){document.getElementById("issues-list").innerHTML=N({icon:P.projects,heading:"No projects yet",description:"Create a project first to add issues",cta:{label:"Create project",action:"showCreateProjectModal"}});return}Kr();const o={limit:1e3},r=((w=document.getElementById("sort-by-select"))==null?void 0:w.value)||"created-desc",[d,c]=r.includes("-")?r.split("-"):[r,null];o.sort_by=d,c&&(o.order=c),n.length>0&&(o.status=n),s.length>0&&(o.priority=s),i&&(i==="me"?o.assignee_id=(_=Kt())==null?void 0:_.id:o.assignee_id=i);const l=(S=document.getElementById("sprint-filter"))==null?void 0:S.value;if(l)if(l==="current"){if(t){const B=cf(t);if(B!==void 0)B&&(o.sprint_id=B);else try{const D=(await b.getSprints(t)).find(I=>I.status==="active");Hl(t,D==null?void 0:D.id),D&&(o.sprint_id=D.id)}catch(E){console.error("Failed to resolve current sprint:",E)}}}else o.sprint_id=l;const u=(j=document.getElementById("issue-type-filter"))==null?void 0:j.value;u&&(o.issue_type=u),a&&a.length>=1&&(o.search=a);try{const B=Zr(Jt(),"label-filter-dropdown");B.length>0&&(o.label=B,o.label_match="any");const E=Zr(en(),"exclude-label-filter-dropdown");E.length>0&&(o.exclude_label=E);let D;if(t?(o.project_id=t,D=await b.getIssues(o)):Q().length>0&&(D=await b.getTeamIssues(A().id,o)),e!==Us)return;Xe(D),L()==="issues"&&Yt(D);const I=[...new Set(D.map(H=>H.project_id))];if(await Ol(I),e!==Us)return;ct()}catch(B){if(e!==Us)return;const E=document.getElementById("issues-list");E&&(E.innerHTML=N({icon:P.issues,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-issues"},variant:"error"})),x("load issues",B)}}function tp(){clearTimeout(Bu()),Du(setTimeout(()=>{yt()},300))}function je(){Hr(),yt()}async function Xr(){if(Hr(),Nr()==="sprint"){const e=Me(),t=[...new Set(e.map(n=>n.project_id))];await Ol(t)}ct()}function np(){Ee(),xe()}function Qr(e){Oe(e),me(),$e("project"),Dt()}function sp(){Qr("")}function ip(e){const t=e==="open"?Zt:Rs,n=document.getElementById("status-filter-dropdown");if(!n)return;n.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.checked=t.includes(i.value)}),Os(),me(),$e("status")}function ap(e,t){const n=document.getElementById("status-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,Os()),me(),$e("status")}function op(){ma(),me(),$e("status"),Ee(),xe()}function rp(e,t){const n=document.getElementById("priority-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,fa()),me(),$e("priority")}function lp(){ga(),me(),$e("priority"),Ee(),xe()}function Jr(e){const t=document.getElementById("issue-type-filter");t&&(t.value=e,je()),me(),$e("type"),Ee(),xe(),Dt()}function cp(){Jr("")}function el(e){const t=document.getElementById("assignee-filter");t&&(t.value=e,je()),me(),$e("assignee"),Ee(),xe(),Dt()}function dp(){el("")}function tl(e){const t=document.getElementById("sprint-filter");t&&(t.value=e,je()),me(),$e("sprint"),Ee(),xe(),Dt()}function up(){tl("")}function pp(e,t){const n=document.getElementById("label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,ha()),me(),$e("labels")}function mp(){Hs(),me(),$e("labels"),Ee(),xe()}function fp(e,t){const n=document.getElementById("exclude-label-filter-dropdown"),s=n==null?void 0:n.querySelector(`input[value="${e}"]`),i=(t==null?void 0:t.target)||document.querySelector(`#filter-menu-options input[value="${e}"]`);s&&i&&(s.checked=i.checked,va()),me(),$e("exclude_labels")}function gp(){Fs(),me(),$e("exclude_labels"),Ee(),xe()}function hp(e){const t=document.getElementById("sort-by-select");t&&(t.value=e,yt()),Dt()}function vp(e){const t=document.getElementById("group-by-select");t&&(t.value=e,Xr()),Dt()}function bp(){Oe(null),ma(),ga();const e=document.getElementById("issue-type-filter");e&&(e.value="");const t=document.getElementById("assignee-filter");t&&(t.value="");const n=document.getElementById("sprint-filter");n&&(n.value="");const s=document.getElementById("issue-search");s&&(s.value=""),Hs(),Fs(),je(),Ee(),xe()}J({"update-label-filter":()=>ha(),"clear-label-filter":()=>Hs(),"update-exclude-label-filter":()=>va(),"clear-exclude-label-filter":()=>Fs(),"show-filter-category":(e,t)=>{var n,s;$e(t.category),(n=document.getElementById("filter-menu-dropdown"))==null||n.classList.add("show-options"),(s=document.querySelector("#filter-menu-options .filter-options-back"))==null||s.focus()},"filter-menu-back":()=>{Uu();const e=document.getElementById("filter-menu-categories"),t=(e==null?void 0:e.querySelector(".filter-menu-category.active"))||(e==null?void 0:e.querySelector(".filter-menu-category"));t==null||t.focus()},"set-project-filter":(e,t)=>Qr(t.value),"clear-project-filter":()=>sp(),"clear-status-filter-new":()=>op(),"set-status-preset":(e,t)=>ip(t.value),"toggle-status-option":(e,t)=>ap(t.filterValue,e),"clear-priority-filter-new":()=>lp(),"toggle-priority-option":(e,t)=>rp(t.filterValue,e),"set-type-filter":(e,t)=>Jr(t.value),"clear-type-filter":()=>cp(),"set-assignee-filter":(e,t)=>el(t.value),"clear-assignee-filter":()=>dp(),"set-sprint-filter":(e,t)=>tl(t.value),"clear-sprint-filter":()=>up(),"clear-label-filter-new":()=>mp(),"toggle-label-option":(e,t)=>pp(t.filterValue,e),"clear-exclude-label-filter-new":()=>gp(),"toggle-exclude-label-option":(e,t)=>fp(t.filterValue,e),"set-sort":(e,t)=>hp(t.value),"set-group-by":(e,t)=>vp(t.value),"clear-all-filters":()=>bp(),"retry-load-issues":()=>yt()});let nn=[],ba=[];Ze(e=>{e==="currentProject"&&L()==="my-issues"&&(zn(),Gs(),Mt())});function wt(){return nn}function sn(e){nn=e}let ya=0;async function zn(){var a;const e=A(),t=Kt();if(!e||!t)return;const n=++ya,s=(a=document.getElementById("my-issues-status-filter"))==null?void 0:a.value,i=z();wp();try{const o={assignee_id:t.id,status:s||void 0,limit:1e3};let r;if(i?r=await b.getIssues({...o,project_id:i}):r=await b.getTeamIssues(e.id,o),n!==ya)return;nn=r,L()==="my-issues"&&Yt(nn),Vn()}catch(o){if(n!==ya)return;const r=document.getElementById("my-issues-list");r&&(r.innerHTML=N({icon:P.dashboard,heading:"Failed to load issues",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-my-issues"},variant:"error"})),x("load issues",o)}}async function Mt({showLoading:e=!0}={}){const t=A();if(!t)return;const n=document.getElementById("dashboard-activity-list");e&&n&&(n.innerHTML=`
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `);try{const s=z();ba=await b.getTeamActivities(t.id,0,10,{projectId:s}),yp()}catch{n&&(n.innerHTML=N({icon:P.activity,heading:"Failed to load activity",description:"Check your connection and try again",variant:"error"}))}}function yp(){const e=document.getElementById("dashboard-activity-list");if(e){if(!ba.length){e.innerHTML=N({icon:P.activity,heading:"No recent activity",description:"Create or update issues to see activity here"});return}e.innerHTML=ba.map(t=>{let n="";if(t.issue_identifier)n=` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${p(t.issue_identifier)}"><strong>${f(t.issue_identifier)}</strong></a>`;else if(t.document_id&&t.document_title){const s=t.document_icon||"📄";n=` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${p(t.document_id)}"><strong>${s} ${f(t.document_title)}</strong></a>`}else t.document_title&&(n=` <strong>${t.document_icon||"📄"} ${f(t.document_title)}</strong>`);return`
        <div class="activity-item">
            <div class="activity-icon">${Sa(t.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${Ca(t)}${n}</span>
                <span class="activity-actor">by ${f(La(t))}</span>
                <span class="activity-time">${Ye(t.created_at)}</span>
            </div>
        </div>
    `}).join("")}}function wp(){const e=document.getElementById("my-issues-list");e&&(e.innerHTML=Array(5).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join(""))}function nl(){zn()}function Vn(){const e=document.getElementById("my-issues-list");if(e){if(e.classList.add("issue-list-linear"),nn.length===0){e.innerHTML=N({icon:P.dashboard,heading:"No issues assigned to you",description:"Issues assigned to you will appear here"});return}e.innerHTML=nn.map(t=>He(t)).join("")}}let wa=0;async function Gs(){const e=document.getElementById("dashboard-sprint-status");if(!e)return;const t=++wa,n=z(),s=Q(),i=n?s.filter(a=>a.id===n):s;if(!i.length){e.innerHTML="";return}try{const a=i.map(async r=>{try{const d=await b.getCurrentSprint(r.id);if(!d)return null;let c={};try{const l=await b.getIssues({sprint_id:d.id,project_id:r.id,limit:500});for(const u of l)c[u.status]=(c[u.status]||0)+1}catch(l){console.error(`Failed to load issue counts for sprint ${d.id}:`,l)}return{project:r,sprint:d,statusCounts:c}}catch(d){return console.error(`Failed to load current sprint for project ${r.id}:`,d),null}}),o=(await Promise.all(a)).filter(Boolean);if(t!==wa)return;kp(o)}catch(a){if(t!==wa)return;console.error("Failed to load sprint status:",a),e.innerHTML=N({icon:P.dashboard,heading:"Couldn't load sprint status",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprint-status"},variant:"error"})}}function kp(e){const t=document.getElementById("dashboard-sprint-status");if(!t)return;if(!e.length){t.innerHTML="";return}const n=["done","in_review","in_progress","todo","backlog"];t.innerHTML=`
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${e.map(({project:s,sprint:i,statusCounts:a})=>{const o=i.budget||0,r=i.points_spent||0,d=o>0?Math.min(100,Math.round(r/o*100)):0,c=o>0&&r>o,l=i.limbo?"limbo":c?"arrears":"",u=a||{},m=Object.values(u).reduce((h,v)=>h+v,0);return`
                    <div class="sprint-status-card ${l}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${f(s.name)}</span>
                            ${i.limbo?'<span class="sprint-status-badge limbo">Limbo</span>':""}
                            ${c?'<span class="sprint-status-badge arrears">Arrears</span>':""}
                        </div>
                        <div class="sprint-status-name">${f(i.name)}</div>
                        ${o>0?`
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${l}" style="width: ${d}%"></div>
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
                                    ${n.filter(h=>u[h]).map(h=>{const v=Math.round(u[h]/m*100);return`<div class="sprint-stacked-segment status-${h}" style="width: ${v}%" title="${ke(h)}: ${u[h]}"></div>`}).join("")}
                                </div>
                                <div class="sprint-status-counts">
                                    ${n.filter(h=>u[h]).map(h=>`<span class="sprint-count-label status-${h}">${u[h]} ${ke(h)}</span>`).join("")}
                                </div>
                            </div>
                        `:""}
                    </div>
                `}).join("")}
        </div>
    `}J({"filter-my-issues":()=>nl(),"navigate-to-issue-by-identifier":(e,t)=>{e.preventDefault(),lc(t.identifier)},"retry-load-my-issues":()=>zn(),"retry-load-sprint-status":()=>Gs()});const sl=la,$p=["task","bug","feature","chore","docs","tech_debt","epic"];let Qe=[],il=Promise.resolve();function al(){return Qe}function ol(e){Qe=e}async function ka(e,t,n,s){var u,m;e.preventDefault(),bt();const a=(s||e.currentTarget).getBoundingClientRect(),o=document.createElement("div");if(o.className="inline-dropdown",t==="status")o.innerHTML=`
            <div class="dropdown-header">Change status...</div>
            ${sl.map((h,v)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="status" data-value="${h}">
                    ${_e(h)}
                    <span>${ke(h)}</span>
                    <span class="dropdown-shortcut">${v+1}</span>
                </button>
            `).join("")}
        `;else if(t==="priority")o.innerHTML=`
            <div class="dropdown-header">Change priority...</div>
            ${ca.map((h,v)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="priority" data-value="${h}">
                    ${Je(h)}
                    <span>${De(h)}</span>
                    <span class="dropdown-shortcut">${v}</span>
                </button>
            `).join("")}
        `;else if(t==="type")o.innerHTML=`
            <div class="dropdown-header">Change type...</div>
            ${$p.map(h=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="issue_type" data-value="${h}">
                    <span class="issue-type-badge type-${h}">${lt(h)}</span>
                </button>
            `).join("")}
        `;else if(t==="assignee"){const h=Ms();o.innerHTML=`
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${h.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:h.map(({assignee:v,indent:w},_)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="assignee_id" data-value="${p(v.id)}">
                    ${Wt(v,"avatar-small")}
                    <span>${da(v,w)}</span>
                    ${_<9?`<span class="dropdown-shortcut">${_+1}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="estimate"){const h=document.querySelector(`.issue-row[data-issue-id="${n}"]`),v=(h==null?void 0:h.dataset.projectId)||((u=ie())==null?void 0:u.project_id),w=gn(v);o.innerHTML=`
            <div class="dropdown-header">Set estimate...</div>
            ${w.map((_,S)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="estimate" data-value="${_.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${_.label}</span>
                    ${S<9?`<span class="dropdown-shortcut">${S}</span>`:""}
                </button>
            `).join("")}
        `}else if(t==="labels"){const h=Me(),v=wt(),w=ie(),_=h.find(le=>le.id===n)||v.find(le=>le.id===n)||w,S=new Set(((_==null?void 0:_.labels)||[]).map(le=>le.id));o.innerHTML='<div class="dropdown-header">Loading labels...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let B=a.bottom+4,E=a.left;E+j.width>window.innerWidth-8&&(E=a.right-j.width),B+j.height>window.innerHeight-8&&(B=a.top-j.height-4),o.style.top=`${B}px`,o.style.left=`${Math.max(8,E)}px`,Hn(o,{multiSelect:!0});let D=[];const I=A();if(I)try{D=await b.getLabels(I.id)}catch(le){console.error("Failed to load labels:",le)}if(!o.parentNode)return;ll(o,n,D,S);const H=o.getBoundingClientRect();let V=a.bottom+4,Ae=a.left;Ae+H.width>window.innerWidth-8&&(Ae=a.right-H.width),V+H.height>window.innerHeight-8&&(V=a.top-H.height-4),o.style.top=`${V}px`,o.style.left=`${Math.max(8,Ae)}px`,o.classList.remove("dropdown-positioning");return}else if(t==="sprint"){const h=Me(),v=wt(),w=ie(),_=h.find(q=>q.id===n)||v.find(q=>q.id===n)||w,S=(_==null?void 0:_.project_id)||((m=document.querySelector(`.issue-row[data-issue-id="${n}"]`))==null?void 0:m.dataset.projectId);o.innerHTML='<div class="dropdown-header">Loading sprints...</div>',o.classList.add("dropdown-positioning"),document.body.appendChild(o);const j=o.getBoundingClientRect();let B=a.bottom+4,E=a.left;E+j.width>window.innerWidth-8&&(E=a.right-j.width),B+j.height>window.innerHeight-8&&(B=a.top-j.height-4),o.style.top=`${B}px`,o.style.left=`${Math.max(8,E)}px`,Hn(o);let D=[];if(S)try{D=await b.getSprints(S),lf(S,D)}catch(q){console.error("Failed to load sprints:",q)}if(!o.parentNode)return;const I=D.filter(q=>q.status!=="completed"||q.id===(_==null?void 0:_.sprint_id));o.innerHTML=`
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${I.map((q,ce)=>`
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${p(n)}" data-field="sprint_id" data-value="${p(q.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${f(q.name)}${q.status==="active"?" (Active)":""}</span>
                    ${ce<9?`<span class="dropdown-shortcut">${ce+1}</span>`:""}
                </button>
            `).join("")}
        `;const H=o.getBoundingClientRect();let V=a.bottom+4,Ae=a.left;Ae+H.width>window.innerWidth-8&&(Ae=a.right-H.width),V+H.height>window.innerHeight-8&&(V=a.top-H.height-4),o.style.top=`${V}px`,o.style.left=`${Math.max(8,Ae)}px`,o.classList.remove("dropdown-positioning");const le=q=>{const ce=q.key;if(ce==="Escape"||ce==="Tab"){bt(),document.removeEventListener("keydown",le),On(null);return}const Se=parseInt(ce);if(isNaN(Se))return;const Re=o.querySelectorAll(".dropdown-option");let Ft=!1;Se===0?(an(n,"sprint_id",null),Ft=!0):Se>=1&&Se<Re.length&&(Re[Se].click(),Ft=!0),Ft&&(document.removeEventListener("keydown",le),On(null))};On(le),document.addEventListener("keydown",le);return}o.classList.add("dropdown-positioning"),document.body.appendChild(o);const r=o.getBoundingClientRect();let d=a.bottom+4,c=a.left;c+r.width>window.innerWidth-8&&(c=a.right-r.width),d+r.height>window.innerHeight-8&&(d=a.top-r.height-4),o.style.top=`${d}px`,o.style.left=`${Math.max(8,c)}px`,o.classList.remove("dropdown-positioning");const l=h=>{const v=h.key;if(v==="Escape"||v==="Tab"){bt(),document.removeEventListener("keydown",l);return}const w=parseInt(v);if(isNaN(w))return;let _=!1;if(t==="status"&&w>=1&&w<=6)an(n,"status",sl[w-1]),_=!0;else if(t==="priority"&&w>=0&&w<=4)an(n,"priority",ca[w]),_=!0;else if(t==="estimate"){const S=ie(),j=gn(S==null?void 0:S.project_id);w>=0&&w<j.length&&(an(n,"estimate",j[w].value),_=!0)}_&&(document.removeEventListener("keydown",l),On(null))};On(l),document.addEventListener("keydown",l),Hn(o)}function Ep(e,t,n,s){ka(e,t,n,s)}function xp(e,t,n){il=il.then(()=>rl(e,t,n))}async function rl(e,t,n){const s=Me(),i=wt(),a=ie(),o=s.find(l=>l.id===e)||i.find(l=>l.id===e)||a;if(!o)return;const r=(o.labels||[]).map(l=>l.id),d=r.indexOf(t);let c;if(d>=0?c=r.filter(l=>l!==t):c=[...r,t],n){const l=d<0;n.classList.toggle("selected",l),n.querySelector(".label-check").textContent=l?"✓":""}try{const u=(await b.updateIssue(e,{label_ids:c})).labels||[],m=s.findIndex(_=>_.id===e);m!==-1&&(s[m].labels=u,Xe([...s]));const h=i.findIndex(_=>_.id===e);h!==-1&&(i[h].labels=u,sn([...i])),(a==null?void 0:a.id)===e&&Bs({...a,labels:u});const v=document.querySelector(`.issue-row[data-issue-id="${e}"]`);if(v&&v.parentNode){const _=s.find(S=>S.id===e)||i.find(S=>S.id===e);_&&(v.outerHTML=He(_))}const w=document.querySelector(".property-labels-btn");w&&(w.innerHTML=u.length>0?u.map(_=>`
                    <span class="issue-label" style="background: ${Y(_.color)}20; color: ${Y(_.color)}">${f(_.name)}</span>
                `).join(""):'<span class="text-muted">No Labels</span>')}catch(l){if(x("update labels",l),n){const u=d>=0;n.classList.toggle("selected",u),n.querySelector(".label-check").textContent=u?"✓":""}}}function ll(e,t,n,s){e.dataset.dropdownType="labels",e.dataset.issueId=t,e.innerHTML=`
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${p(t)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${p(t)}">Add</button>
        </div>
        ${n.length===0?'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(i=>{const a=s.has(i.id);return`
                <button class="dropdown-option label-toggle ${a?"selected":""}" data-action="toggle-issue-label" data-issue-id="${p(t)}" data-label-id="${p(i.id)}">
                    <span class="label-check">${a?"✓":""}</span>
                    <span class="issue-label" style="background: ${Y(i.color)}20; color: ${Y(i.color)}">${f(i.name)}</span>
                </button>
            `}).join("")}
    `}async function cl(e){const t=document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${e}"]`),n=t==null?void 0:t.querySelector(".label-create-input"),s=A();if(!n||!s)return;const i=n.value.trim();if(i){n.disabled=!0;try{const a=await b.createLabel(s.id,{name:i}),o=await b.getLabels(s.id);Cs(o),a!=null&&a.id&&await rl(e,a.id,null);const r=Me(),d=wt(),c=ie(),l=r.find(m=>m.id===e)||d.find(m=>m.id===e)||c,u=new Set(((l==null?void 0:l.labels)||[]).map(m=>m.id));t&&ll(t,e,o,u),n.value=""}catch(a){x("create label",a)}finally{n.disabled=!1,n.focus()}}}function zs(){const e=document.getElementById("create-issue-labels-label");e&&(Qe.length===0?e.textContent="Labels":e.textContent=`Labels (${Qe.length})`)}function $a(e,{failed:t=!1}={}){const n=Sr();e.dataset.dropdownType="create-labels",e.innerHTML=`
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${n.length===0?t?`<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn't load labels</span></div>`:'<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>':""}
        ${n.map(s=>{const i=Qe.includes(s.id);return`
                <button class="dropdown-option label-toggle ${i?"selected":""}" data-action="toggle-create-issue-label" data-label-id="${p(s.id)}">
                    <span class="label-check">${i?"✓":""}</span>
                    <span class="issue-label" style="background: ${Y(s.color)}20; color: ${Y(s.color)}">${f(s.name)}</span>
                </button>
            `}).join("")}
    `}function _p(e){const t=Qe.indexOf(e);t>=0?Qe.splice(t,1):Qe.push(e),zs();const n=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');n&&$a(n)}async function dl(){const e=A();if(!e)return;const t=document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]'),n=t==null?void 0:t.querySelector(".label-create-input");if(!n)return;const s=n.value.trim();if(s){n.disabled=!0;try{const i=await b.createLabel(e.id,{name:s}),a=await b.getLabels(e.id);Cs(a),i!=null&&i.id&&!Qe.includes(i.id)&&Qe.push(i.id),zs(),t&&$a(t),n.value=""}catch(i){x("create label",i)}finally{n.disabled=!1,n.focus()}}}async function an(e,t,n){bt();const s=document.querySelector(`.issue-row[data-issue-id="${e}"]`);s&&s.classList.add("updating");try{const i={};i[t]=n;const a=await b.updateIssue(e,i);if(!a||!a.id)throw new Error("Invalid response from server");const o=Me(),r=o.findIndex(u=>u.id===e);r!==-1&&(o[r]=a,Xe([...o]));const d=wt(),c=d.findIndex(u=>u.id===e);c!==-1&&(d[c]=a,sn([...d]));const l=ie();if((l==null?void 0:l.id)===e&&Bs(a),s&&s.parentNode){const u=o.find(m=>m.id===e)||d.find(m=>m.id===e)||a;if(u){s.outerHTML=He(u);const m=document.querySelector(`.issue-row[data-issue-id="${e}"]`);m&&(m.classList.add("updated"),setTimeout(()=>m.classList.remove("updated"),500))}}if(k("Issue updated","success"),t==="status"){const u=z();if(u)try{const h=(await b.getSprints(u)).find(v=>v.status==="active");pa(h||null)}catch{}}if(t==="sprint_id"||t==="status"||t==="priority"||t==="assignee_id"||t==="estimate"||t==="issue_type"){const u=document.getElementById("issue-detail-view");u&&!u.classList.contains("hidden")&&Ip(t,a)}}catch(i){x("update issue",i),s&&s.classList.remove("updating")}}function Ip(e,t){const n=document.getElementById("issue-detail-view");if(!n||n.classList.contains("hidden"))return;const s=n.querySelector(".detail-sidebar");if(!s)return;let i=e;e==="assignee_id"&&(i="assignee"),e==="sprint_id"&&(i="sprint"),e==="issue_type"&&(i="type");const a=s.querySelectorAll(".property-row");let o=null;for(const d of a){const c=d.querySelector(".property-label");if(c&&c.textContent.toLowerCase()===i.toLowerCase()){o=d;break}}if(!o)return;const r=o.querySelector(".property-value");if(r){if(e==="status")r.innerHTML=`
            ${_e(t.status)}
            <span>${ke(t.status)}</span>
        `;else if(e==="priority")r.innerHTML=`
            ${Je(t.priority)}
            <span>${De(t.priority)}</span>
        `;else if(e==="issue_type")r.innerHTML=`
            <span class="issue-type-badge type-${t.issue_type||"task"}">${lt(t.issue_type)}</span>
        `;else if(e==="assignee_id"){const d=t.assignee_id?Gn(t.assignee_id):null,c=d?Bt(d):null;r.innerHTML=c?`${Wt(d,"avatar-small")}<span>${f(c)}</span>`:'<span class="text-muted">Unassigned</span>'}else if(e==="sprint_id"){const d=ju(),c=t.sprint_id&&d?d.find(l=>l.id===t.sprint_id):null;r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${c?f(c.name):'<span class="text-muted">No Sprint</span>'}</span>
        `}else e==="estimate"&&(r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${mi(t.estimate,t.project_id)}</span>
        `);r.classList.add("updated"),setTimeout(()=>r.classList.remove("updated"),500)}}J({"update-issue-field":(e,t)=>{const n=t.value==="__null__"?null:t.value,s=t.field;s==="estimate"?an(t.issueId,s,n==="null"?null:Number(n)):an(t.issueId,s,n)},"toggle-issue-label":(e,t,n)=>{xp(t.issueId,t.labelId,n)},"create-label-from-dropdown":(e,t)=>{cl(t.issueId)},"toggle-create-issue-label":(e,t)=>{_p(t.labelId)},"create-label-for-create-issue":()=>{dl()},"label-create-key":(e,t)=>{e.key==="Enter"&&(e.preventDefault(),cl(t.issueId))},"create-issue-label-key":e=>{e.key==="Enter"&&(e.preventDefault(),dl())}});const ul=["task","bug","feature","chore","docs","tech_debt","epic"];function kt(e){return e.reduce((t,n)=>t+(n.estimate||0),0)}function on(e){const t=kt(e);return`<div class="issue-list-summary">${e.length} issues · ${t}pt</div>`}function ct(){var i,a,o;const e=document.getElementById("issues-list");if(!e)return;const t=(i=e.querySelector(".issue-row.keyboard-selected"))==null?void 0:i.dataset.issueId;e.classList.add("issue-list-linear");const n=Me();if(n.length===0){const r=(o=(a=document.getElementById("issue-search"))==null?void 0:a.value)==null?void 0:o.trim(),d=ua()>0,c=r&&r.length>=2;if(d||c){const l=ua(),u=[];c&&u.push(`search "${r}"`),d&&u.push(`${l} active filter${l>1?"s":""}`),e.innerHTML=N({icon:P.issues,heading:"No matching issues",description:`No issues match your ${u.join(" and ")}`,cta:{label:"Clear all",action:"clear-all-filters"}})}else e.innerHTML=N({icon:P.issues,heading:"No issues found",description:"Create your first issue to get started",cta:{label:"Create issue",action:"showCreateIssueModal"}});Fn(-1);return}const s=Nr();s==="status"?Sp(e,n):s==="priority"?Lp(e,n):s==="type"?Cp(e,n):s==="assignee"?Ap(e,n):s==="sprint"?Bp(e,n):e.innerHTML=on(n)+n.map(r=>He(r)).join(""),Tp(t)}function Tp(e){const t=Cr();if(t<0)return;const n=document.querySelectorAll("#issues-list .issue-row");if(n.length===0){Fn(-1);return}let s=e?Array.prototype.findIndex.call(n,i=>i.dataset.issueId===e):-1;s<0&&(s=Math.min(t,n.length-1)),Fn(s),n[s].classList.add("keyboard-selected")}function Sp(e,t){const n={};la.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.status]&&n[i.status].push(i)});let s=on(t);la.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${_e(i)}</span>
                    <span class="group-title">${ke(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>He(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Lp(e,t){const n={};Rr.forEach(i=>n[i]=[]),t.forEach(i=>{n[i.priority]&&n[i.priority].push(i)});let s=on(t);Rr.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Je(i)}</span>
                    <span class="group-title">${De(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>He(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Cp(e,t){const n={};ul.forEach(i=>n[i]=[]),t.forEach(i=>{const a=i.issue_type||"task";n[a]&&n[a].push(i)});let s=on(t);ul.forEach(i=>{const a=n[i];a.length!==0&&(s+=`
            <div class="issue-group" data-group="${i}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${i}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${i}">${lt(i)}</span></span>
                    <span class="group-title">${lt(i)}</span>
                    <span class="group-count">${a.length}</span>
                    <span class="group-points">${kt(a)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${a.map(o=>He(o)).join("")}
                </div>
            </div>
        `)}),e.innerHTML=s}function Ap(e,t){const n={},s="__unassigned__";n[s]=[];const i=Ms();i.forEach(({assignee:o})=>{n[o.id]=[]}),t.forEach(o=>{o.assignee_id&&n[o.assignee_id]?n[o.assignee_id].push(o):n[s].push(o)});let a=on(t);n[s].length>0&&(a+=`
            <div class="issue-group" data-group="${s}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${s}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${n[s].length}</span>
                    <span class="group-points">${kt(n[s])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${n[s].map(o=>He(o)).join("")}
                </div>
            </div>
        `),i.forEach(({assignee:o})=>{const r=n[o.id];if(!r||r.length===0)return;const d=Bt(o)||"Unknown",c=o.is_agent?o.parent_user_name?` (${o.parent_user_name})`:" (agent)":"";a+=`
            <div class="issue-group" data-group="${p(o.id)}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${p(o.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${Wt(o,"avatar-small")}</span>
                    <span class="group-title">${f(d)}${f(c)}</span>
                    <span class="group-count">${r.length}</span>
                    <span class="group-points">${kt(r)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${r.map(l=>He(l)).join("")}
                </div>
            </div>
        `}),e.innerHTML=a}function Bp(e,t){const n="__no_sprint__",s={};s[n]=[];const i=[];t.forEach(d=>{d.sprint_id?(s[d.sprint_id]||(s[d.sprint_id]=[],i.push(d.sprint_id)),s[d.sprint_id].push(d)):s[n].push(d)});const a={active:0,planned:1,completed:2},o=Nl();i.sort((d,c)=>{const l=o[d],u=o[c],m=l?a[l.status]??3:3,h=u?a[u.status]??3:3;return m-h});let r=on(t);i.forEach(d=>{const c=s[d];if(c.length===0)return;const l=o[d],u=l?l.name:d,m=l?l.status==="active"?" (Active)":l.status==="completed"?" (Done)":"":"",h=d.replace(/[^a-zA-Z0-9_-]/g,"_");r+=`
            <div class="issue-group" data-group="${h}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${h}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${f(u)}${m}</span>
                    <span class="group-count">${c.length}</span>
                    <span class="group-points">${kt(c)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${c.map(v=>He(v)).join("")}
                </div>
            </div>
        `}),s[n].length>0&&(r+=`
            <div class="issue-group" data-group="${n}">
                <div class="issue-group-header" data-action="toggle-group" data-group="${n}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${s[n].length}</span>
                    <span class="group-points">${kt(s[n])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${s[n].map(d=>He(d)).join("")}
                </div>
            </div>
        `),e.innerHTML=r}function Dp(e){const t=document.querySelector(`.issue-group[data-group="${e}"]`);t&&t.classList.toggle("collapsed")}function pl(e,t){if(!e)return"";if(!t)return f(e);const n=e.toLowerCase().indexOf(t.toLowerCase());if(n===-1)return f(e);const s=e.slice(0,n),i=e.slice(n,n+t.length),a=e.slice(n+t.length);return`${f(s)}<mark class="search-match">${f(i)}</mark>${f(a)}`}function Mp(e,t,n=40){if(!e||!t)return null;const s=e.toLowerCase().indexOf(t.toLowerCase());if(s===-1)return null;const i=Math.max(0,s-n),a=Math.min(e.length,s+t.length+n),o=e.slice(i,a),r=pl(o,t);return`${i>0?"…":""}${r}${a<e.length?"…":""}`}function He(e){var u,m,h;const t=e.assignee_id?Gn(e.assignee_id):null,n=t?Bt(t):null,s=new Date(e.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}),i=e.estimate?mi(e.estimate,e.project_id):"",a=Xa(e.estimate,e.project_id),o=e.sprint_id?Nl()[e.sprint_id]:null,r=o?o.name:null,d=(m=(u=document.getElementById("issue-search"))==null?void 0:u.value)==null?void 0:m.trim(),c=!!d&&((h=e.title)==null?void 0:h.toLowerCase().includes(d.toLowerCase())),l=d&&!c?Mp(e.description,d):null;return`
        <div class="issue-row" data-issue-id="${p(e.id)}" data-status="${e.status}" data-priority="${e.priority}" data-issue-type="${e.issue_type||"task"}" data-project-id="${p(e.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${p(e.id)}" title="Priority: ${De(e.priority)}">
                    ${Je(e.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${p(e.id)}" title="Status: ${ke(e.status)}">
                    ${_e(e.status)}
                </button>
                <span class="issue-identifier">${e.identifier}</span>
                <span class="issue-type-badge type-${e.issue_type||"task"}">${lt(e.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(e.identifier)}" data-action="navigate-issue" data-issue-id="${p(e.id)}">${pl(e.title,d)}${l?` <span class="issue-search-snippet" title="Matched in description">— ${l}</span>`:""}</a>
            </div>
            <div class="issue-row-right">
                ${e.labels&&e.labels.length>0?`
                    <div class="issue-labels">
                        ${e.labels.slice(0,2).map(v=>`
                            <span class="issue-label" style="background: ${Y(v.color)}20; color: ${Y(v.color)}">${f(v.name)}</span>
                        `).join("")}
                    </div>
                `:""}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${p(e.id)}" title="Sprint: ${r?f(r):"None"}">
                    ${r?`<span class="sprint-badge">${f(r)}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${p(e.id)}" title="${a?"Estimate outside current scale":`Estimate: ${i||"None"}`}">
                    ${i?`<span class="estimate-badge${a?" out-of-scale":""}">${i}</span>`:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'}
                </button>
                <span class="issue-date">${s}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${p(e.id)}" title="${p(n||"Unassigned")}">
                    ${n?Wt(t,"avatar-small"):'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>'}
                </button>
            </div>
        </div>
    `}function Je(e){const t={urgent:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',high:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',medium:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',low:'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',no_priority:'<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'};return t[e]||t.no_priority}function _e(e){const t={backlog:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',todo:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',in_progress:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',in_review:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',done:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',canceled:'<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'};return t[e]||t.backlog}J({"toggle-group":(e,t)=>{Dp(t.group)},"show-inline-dropdown":(e,t,n)=>{ka(e,t.dropdownType,t.issueId,n)},"navigate-issue":(e,t)=>{e.metaKey||e.ctrlKey||e.shiftKey||e.button===1||(e.preventDefault(),K(t.issueId))}});function jp(e){return e.name?e.name.split(" ")[0].toLowerCase():e.email?e.email.split("@")[0].toLowerCase():"user"}function Ea(e="new-comment",t="mention-suggestions"){const n=document.getElementById(e),s=document.getElementById(t);if(!n||!s||n.dataset.mentionsBound==="true")return;n.dataset.mentionsBound="true";let i=-1;const a=()=>{s.classList.add("hidden"),s.innerHTML="",i=-1},o=c=>{var u,m;const l=s.querySelectorAll(".mention-suggestion");l.length!==0&&(i=(c%l.length+l.length)%l.length,l.forEach((h,v)=>h.classList.toggle("highlighted",v===i)),(m=(u=l[i]).scrollIntoView)==null||m.call(u,{block:"nearest"}))},r=c=>{const l=n.selectionStart||0,u=n.value.slice(0,l).replace(/@([a-zA-Z0-9._-]*)$/,`@${c} `),m=n.value.slice(l);n.value=u+m,n.focus(),a()},d=()=>{const c=n.selectionStart||0,u=n.value.slice(0,c).match(/(^|\s)@([a-zA-Z0-9._-]*)$/);if(!u){a();return}const m=u[2].toLowerCase(),h=qt().map(v=>({id:v.id,name:v.name||v.email||"User",email:v.email||"",handle:jp(v)})).filter(v=>!m||v.handle.includes(m)||v.name.toLowerCase().includes(m)||v.email.toLowerCase().includes(m)).slice(0,6);if(!h.length){a();return}s.innerHTML=h.map(v=>`
            <button type="button" class="mention-suggestion" data-handle="${p(v.handle)}">
                <span class="mention-name">${f(v.name)}</span>
                <span class="mention-handle">@${f(v.handle)}</span>
            </button>
        `).join(""),s.classList.remove("hidden"),s.querySelectorAll(".mention-suggestion").forEach((v,w)=>{v.addEventListener("click",()=>r(v.dataset.handle)),v.addEventListener("mouseenter",()=>o(w))}),o(0)};n.addEventListener("input",d),n.addEventListener("click",d),n.addEventListener("keydown",c=>{const l=!s.classList.contains("hidden");if(c.key==="Escape"&&l){c.preventDefault(),c.stopPropagation(),a();return}if(l){if(c.key==="ArrowDown")c.preventDefault(),o(i+1);else if(c.key==="ArrowUp")c.preventDefault(),o(i-1);else if(c.key==="Enter"||c.key==="Tab"){const m=s.querySelectorAll(".mention-suggestion")[i];m&&(c.preventDefault(),r(m.dataset.handle))}}}),n.addEventListener("blur",()=>{setTimeout(a,150)})}const ml=[{id:"none",label:"No template",title:"",description:""},{id:"bug",label:"Bug report",title:"Bug: ",description:`## Summary

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
`}];function Wn(e=null){const t=e||z()||"";ol([]);const n=Q().map(o=>`
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
                            ${ml.map(o=>`<option value="${o.id}">${o.label}</option>`).join("")}
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
                            ${_e("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Je("no_priority")}
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
    `,U(),zs();const s=document.getElementById("create-issue-title"),i=document.getElementById("create-issue-description"),a=hu();a.title&&(s.value=a.title),a.description&&(i.value=a.description),s.addEventListener("input",()=>{Ir(s.value,i.value)}),i.addEventListener("input",()=>{Ir(s.value,i.value)}),s.focus()}function Rp(){const e=document.getElementById("create-issue-options-panel"),t=document.getElementById("more-options-toggle");e&&t&&(e.classList.toggle("collapsed"),t.classList.toggle("expanded"))}function Pp(e){const t=ml.find(i=>i.id===e);if(!t)return;const n=document.getElementById("create-issue-title"),s=document.getElementById("create-issue-description");n&&t.title!==void 0&&(n.value=t.title),s&&t.description!==void 0&&(s.value=t.description)}function Np(e,t){const n=Q().find(s=>s.id===t);ol([]),document.getElementById("modal-title").textContent="",document.getElementById("modal-content").innerHTML=`
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${n?f(n.name):"Project"}</span>
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
                            ${_e("backlog")}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${Je("no_priority")}
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
    `,U(),zs(),document.getElementById("create-issue-title").focus()}async function qp(e,t){const n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,c=d?parseInt(d):null;if(!n){k("Please enter a title","error");return}try{const l=await b.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:c,label_ids:al(),parent_id:e});O(),k(`Created sub-issue ${l.identifier}`,"success"),K(e)}catch(l){x("create sub-issue",l)}}async function Op(e,t,n){var o,r;bt();const i=(n||t.currentTarget).getBoundingClientRect(),a=document.createElement("div");if(a.className="inline-dropdown dropdown-positioning",a.style.top=`${i.top-8}px`,a.style.left=`${i.left}px`,a.style.transform="translateY(-100%)",a.style.animation="none",e==="status"){const d=document.getElementById("create-issue-status").value;a.innerHTML=`
            <div class="dropdown-header">Status</div>
            ${Pr.map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="status" data-value="${c}" data-label="${p(ke(c))}">
                    ${_e(c)}
                    <span>${ke(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="priority"){const d=document.getElementById("create-issue-priority").value;a.innerHTML=`
            <div class="dropdown-header">Priority</div>
            ${ca.map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="priority" data-value="${c}" data-label="${p(De(c))}">
                    ${Je(c)}
                    <span>${De(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="type"){const d=document.getElementById("create-issue-type").value;a.innerHTML=`
            <div class="dropdown-header">Type</div>
            ${["task","bug","feature","chore","docs","tech_debt","epic"].map(c=>`
                <button class="dropdown-option ${c===d?"selected":""}" data-action="set-create-field" data-field="type" data-value="${c}" data-label="${p(lt(c))}">
                    <span class="issue-type-badge type-${c}">${lt(c)}</span>
                </button>
            `).join("")}
        `}else if(e==="labels")if(!A())a.innerHTML='<div class="dropdown-header">Select a team first</div>';else{let d=Sr(),c=!1;if(d.length===0)try{d=await b.getLabels(A().id),Cs(d)}catch(l){console.error("Failed to load labels:",l),c=!0}$a(a,{failed:c}),document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Hn(a,{multiSelect:!0});return}else if(e==="assignee"){const d=document.getElementById("create-issue-assignee").value,c=Ms();a.innerHTML=`
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${c.length===0?`
                <div class="dropdown-empty">No team members or agents found</div>
            `:c.map(({assignee:l,indent:u})=>{const m=Bt(l)||"User";return`
                <button class="dropdown-option ${l.id===d?"selected":""}" data-action="set-create-field" data-field="assignee" data-value="${p(l.id)}" data-label="${p(m)}">
                    ${Wt(l,"avatar-small")}
                    <span>${da(l,u)}</span>
                </button>
            `}).join("")}
        `}else if(e==="estimate"){const d=document.getElementById("create-issue-estimate").value,c=(o=document.getElementById("create-issue-project"))==null?void 0:o.value,l=gn(c);a.innerHTML=`
            <div class="dropdown-header">Estimate</div>
            ${l.map(u=>{const m=u.value===null?"":String(u.value);return`
                <button class="dropdown-option ${m===d?"selected":""}" data-action="set-create-field" data-field="estimate" data-value="${p(m)}" data-label="${p(u.value?u.label:"Estimate")}">
                    <span>${f(u.label)}</span>
                </button>
            `}).join("")}
        `}else if(e==="sprint"){const d=document.getElementById("create-issue-sprint").value,c=(r=document.getElementById("create-issue-project"))==null?void 0:r.value;if(!c)a.innerHTML='<div class="dropdown-header">Select a project first</div>';else try{const u=(await b.getSprints(c)).filter(m=>m.status!=="completed");a.innerHTML=`
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${d?"":"selected"}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${u.map(m=>`
                        <button class="dropdown-option ${m.id===d?"selected":""}" data-action="set-create-field" data-field="sprint" data-value="${p(m.id)}" data-label="${p(m.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${f(m.name)}${m.status==="active"?" (Active)":""}</span>
                        </button>
                    `).join("")}
                `}catch{a.innerHTML='<div class="dropdown-header">Failed to load sprints</div>'}}document.body.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("dropdown-positioning")})}),Hn(a)}function Hp(){const e=document.getElementById("create-issue-sprint"),t=document.getElementById("create-issue-sprint-label");e&&(e.value=""),t&&(t.textContent="Sprint")}function Fp(e,t,n){document.getElementById(`create-issue-${e}`).value=t,document.getElementById(`create-issue-${e}-label`).textContent=n;const s=f(n);if(e==="status"){const i=document.querySelector(".toolbar-btn:first-child");i.innerHTML=`${_e(t)}<span id="create-issue-status-label">${s}</span>`}else if(e==="priority"){const i=document.querySelectorAll(".toolbar-btn")[1];i.innerHTML=`${Je(t)}<span id="create-issue-priority-label">${s}</span>`}else if(e==="type"){const i=document.getElementById("create-issue-type-btn");i&&(i.innerHTML=`<span class="issue-type-badge type-${t}">${lt(t)}</span><span id="create-issue-type-label">${s}</span>`)}bt()}async function fl({keepOpen:e=!1}={}){var w,_;const t=document.getElementById("create-issue-project").value,n=document.getElementById("create-issue-title").value.trim(),s=document.getElementById("create-issue-description").value.trim(),i=document.getElementById("create-issue-status").value,a=document.getElementById("create-issue-priority").value,o=document.getElementById("create-issue-type").value||"task",r=document.getElementById("create-issue-assignee").value||null,d=document.getElementById("create-issue-estimate").value,c=d?parseInt(d):null,l=((w=document.getElementById("create-issue-sprint"))==null?void 0:w.value)||null,u=(_=document.getElementById("create-issue-due-date"))==null?void 0:_.value,m=u?new Date(`${u}T00:00:00Z`).toISOString():null;if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}const h=document.getElementById("btn-create-issue"),v=document.getElementById("btn-create-and-new");h&&(h.disabled=!0),v&&(v.disabled=!0);try{const S=await b.createIssue(t,{title:n,description:s||null,status:i,priority:a,issue_type:o,assignee_id:r,estimate:c,sprint_id:l,label_ids:al(),due_date:m});k(`Created ${S.identifier}`,"success"),vu(),L()==="issues"?yt():L()==="my-issues"&&zn(),e?(document.getElementById("create-issue-title").value="",document.getElementById("create-issue-description").value="",document.getElementById("create-issue-title").focus()):(O(),K(S.id))}catch(S){x("create issue",S)}finally{h&&(h.disabled=!1),v&&(v.disabled=!1)}}async function Up(){await fl({keepOpen:!1})}async function Gp(){await fl({keepOpen:!0})}J({"toggle-create-dropdown":(e,t,n)=>{Op(t.dropdownType,e,n)},"set-create-field":(e,t)=>{Fp(t.field,t.value,t.label)},"create-issue-submit":()=>{Up()},"create-issue-and-new":()=>{Gp()},"update-create-project":()=>{Hp()},"apply-template":e=>{Pp(e.target.value)},"toggle-create-options":()=>{Rp()},"create-sub-issue-submit":(e,t)=>{qp(t.parentId,t.projectId)}});async function gl(e){try{const t=await b.getIssue(e),n=await b.getSprints(t.project_id),i=gn(t.project_id).map(o=>`
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
                        ${n.filter(o=>o.status!=="completed").map(o=>`
                            <option value="${o.id}" ${t.sprint_id===o.id?"selected":""}>${f(o.name)}</option>
                        `).join("")}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `,U();const a=document.getElementById("edit-issue-description");if(a){const o=Is(e);if(o){const r=Er(e),d=document.getElementById("edit-issue-description-draft-warning");r!==null&&r===(t.description||"")?(a.value=o,d&&(d.textContent="Restored your unsaved description draft.",d.classList.remove("hidden"))):d&&(d.textContent="You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.",d.classList.remove("hidden"))}a.addEventListener("input",()=>{const r=a.value;r!==(t.description||"")?At(e,r,t.description||""):At(e,null)})}}catch(t){x("load issue",t)}}async function zp(e,t){try{const n=document.getElementById("edit-issue-title"),s=document.getElementById("edit-issue-description"),i=document.getElementById("edit-issue-status"),a=document.getElementById("edit-issue-priority"),o=document.getElementById("edit-issue-type"),r=document.getElementById("edit-issue-estimate"),d=document.getElementById("edit-issue-sprint");if(!n||!i||!a||!o)throw new Error("Required form fields not found");const c={title:n.value,description:s?s.value:"",status:i.value,priority:a.value,issue_type:o.value,estimate:r&&r.value?parseInt(r.value):null,sprint_id:d&&d.value?d.value:null};await b.updateIssue(t,c),Is(t)===c.description&&At(t,null),O(),await K(t),k("Issue updated!","success")}catch(n){x("update issue",n)}}async function Vp(e){if(confirm("Are you sure you want to delete this issue?"))try{await b.deleteIssue(e),await yt(),await Fe(),M("issues"),k("Issue deleted!","success")}catch(t){x("delete issue",t)}}J({"update-issue":(e,t)=>{zp(e,t.issueId)}});let oe=null,hl=!1,rn=!1,vl="new-comment";function Wp(){return oe||(oe=document.createElement("div"),oe.className="quote-tooltip",oe.setAttribute("role","button"),oe.setAttribute("tabindex","0"),oe.setAttribute("aria-label","Quote selection in comment"),oe.textContent="Quote",oe.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),Vs())}),oe.addEventListener("mousedown",e=>{e.preventDefault(),e.stopPropagation()}),oe.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),Vs()}),document.body.appendChild(oe),oe)}function bl(e,t){const n=Wp();n.style.display="flex",rn=!0,n.style.left=`${e}px`,n.style.top=`${t-8}px`,n.style.transform="translate(-50%, -100%)",requestAnimationFrame(()=>{if(!rn)return;const s=n.getBoundingClientRect();s.left<4&&(n.style.left=`${4+s.width/2}px`),s.right>window.innerWidth-4&&(n.style.left=`${window.innerWidth-4-s.width/2}px`),s.top<4&&(n.style.top=`${t+8}px`,n.style.transform="translate(-50%, 0)")})}function Kn(){oe&&(oe.style.display="none"),rn=!1}function yl(e){if(!e)return null;const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;return t&&(t.closest(".description-content")||t.closest(".comment-content")||t.closest(".document-content"))||null}function xa(){const e=window.getSelection();if(!e||e.isCollapsed||!e.rangeCount)return null;const t=e.getRangeAt(0),n=yl(t.startContainer),s=yl(t.endContainer);return!n||!s||n!==s?null:e.toString().trim()||null}function Kp(e){return e.split(`
`).map(t=>`> ${t}`).join(`
`)}function Vs(e=vl){const t=xa();if(!t)return!1;const n=document.getElementById(e);if(!n)return!1;const s=Kp(t),i=n.value,a=i&&!i.endsWith(`

`)?i.endsWith(`
`)?`
`:`

`:"";return n.value=i+a+s+`

`,n.dispatchEvent(new Event("input",{bubbles:!0})),window.getSelection().removeAllRanges(),Kn(),n.focus(),n.setSelectionRange(n.value.length,n.value.length),n.scrollIntoView&&n.scrollIntoView({behavior:"smooth",block:"nearest"}),!0}function Yp(){var s;if(!xa())return!1;const t=window.getSelection().getRangeAt(0),n=((s=t.getBoundingClientRect)==null?void 0:s.call(t))??{left:0,width:0,top:0};return bl(n.left+n.width/2,n.top),!0}function Zp(e){const t=e.clientX,n=e.clientY;setTimeout(()=>{if(!xa()){Kn();return}bl(t,n)},10)}function wl({containerId:e="issue-detail-content",textareaId:t="new-comment",signal:n}={}){const s=document.getElementById(e);s&&(vl=t,s.addEventListener("mouseup",Zp,n?{signal:n}:void 0),hl||(hl=!0,document.addEventListener("mousedown",i=>{rn&&oe&&!oe.contains(i.target)&&Kn()}),document.addEventListener("selectionchange",()=>{rn&&setTimeout(()=>{const i=window.getSelection();(!i||i.isCollapsed)&&Kn()},50)}),document.addEventListener("keydown",i=>{i.key==="Escape"&&rn&&Kn()}),document.addEventListener("keyup",i=>{i.key!=="Escape"&&Yp()})))}function kl(e,t){const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:function(a){let o=a.parentElement;for(;o&&o!==e;){if(o.tagName==="CODE"||o.tagName==="PRE")return NodeFilter.FILTER_REJECT;o=o.parentElement}return NodeFilter.FILTER_ACCEPT}},!1),s=[];let i;for(;i=n.nextNode();)s.push(i);s.forEach(a=>{t(a)})}function $l(e){const t=e.textContent;if(!t)return;const n=/\b([A-Z]{2,10}-\d+)\b/g,s=/(^|\s)@([a-zA-Z0-9._-]+)/g,i=n.test(t),a=s.test(t);if(!i&&!a)return;const o=document.createDocumentFragment();let r=0,d=!1;const c=/\b([A-Z]{2,10}-\d+)\b|(^|\s)@([a-zA-Z0-9._-]+)/g;let l;for(;(l=c.exec(t))!==null;)if(d=!0,l.index>r&&o.appendChild(document.createTextNode(t.slice(r,l.index))),l[1]){const u=l[1],m=document.createElement("a");m.href=`#/issue/${u}`,m.className="issue-link",m.textContent=u,o.appendChild(m),r=l.index+l[0].length}else if(l[3]){l[2]&&o.appendChild(document.createTextNode(l[2]));const u=document.createElement("span");u.className="mention",u.textContent="@"+l[3],o.appendChild(u),r=l.index+l[0].length}d&&(r<t.length&&o.appendChild(document.createTextNode(t.slice(r))),e.parentNode.replaceChild(o,e))}function El(e){if(!e)return"";const t=et(e),n=document.createElement("div");return n.innerHTML=t,kl(n,$l),n.innerHTML}function ln(e){if(!e)return"";const t=et(e),n=document.createElement("div");return n.innerHTML=t,kl(n,$l),n.innerHTML}let _a=!1,Ia=!1,$t=!0,Yn=null,Ws=null,Ks=null,Ys=null,Ta=!1,Zs=null;function xl(e=null){Ta=!0,e&&(Zs=e)}function Sa(e){return{created:"✨",updated:"✏️",status_changed:"🔄",priority_changed:"⚡",assigned:"👤",unassigned:"👤",commented:"💬",labeled:"🏷️",unlabeled:"🏷️",moved_to_sprint:"🏃",removed_from_sprint:"🏃",doc_created:"📄",doc_updated:"📝",doc_deleted:"🗑️",doc_commented:"💬",ritual_attested:"✅"}[e]||"•"}function La(e){return e.user_name||e.user_email||"Unknown"}function Ca(e){const t=s=>s?s.replace(/^(IssueStatus\.|IssuePriority\.)/,"").toLowerCase():"",n={status:"status",priority:"priority",assignee_id:"assignee",sprint_id:"sprint",title:"title",description:"description",estimate:"estimate"};switch(e.activity_type){case"created":return"Created issue";case"commented":{const s=e.new_value?f(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"",i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return s?`<a href="#comments-section" class="activity-comment-link" title="${i}" data-action="scroll-to-comments">Added a comment</a>`:"Added a comment"}case"status_changed":return`Changed status from <strong>${f(ke(t(e.old_value)))}</strong> to <strong>${f(ke(t(e.new_value)))}</strong>`;case"priority_changed":return`Changed priority from <strong>${f(De(t(e.old_value)))}</strong> to <strong>${f(De(t(e.new_value)))}</strong>`;case"assigned":return"Assigned to someone";case"unassigned":return"Removed assignee";case"moved_to_sprint":return e.sprint_name?`Moved to sprint <strong>${f(e.sprint_name)}</strong>`:"Moved to sprint";case"removed_from_sprint":return e.sprint_name?`Removed from sprint <strong>${f(e.sprint_name)}</strong>`:"Removed from sprint";case"doc_created":return"Created document";case"doc_updated":return"Updated document";case"doc_deleted":return"Deleted document";case"doc_commented":return"Commented on document";case"ritual_attested":{const s=f(e.field_name||"ritual"),i=e.new_value?p(e.new_value.substring(0,200))+(e.new_value.length>200?"...":""):"";return i?`<span class="activity-attestation-link" title="${i}">Attested to <strong>${s}</strong></span>`:`Attested to <strong>${s}</strong>`}case"updated":return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue";default:return e.field_name?`Updated ${n[e.field_name]||f(e.field_name)}`:"Updated issue"}}function Xp(e){const t=document.getElementById(`${e}-section`);if(!t)return;const n=t.querySelector(".section-collapsible-content"),s=t.querySelector(".section-toggle-icon");n&&n.classList.toggle("collapsed"),s&&s.classList.toggle("rotated")}function Qp(){$t=!$t;const e=document.getElementById("ticket-rituals-section");if(!e)return;const t=e.querySelector(".ticket-rituals-content"),n=e.querySelector(".section-toggle-icon");t&&t.classList.toggle("collapsed",$t),n&&n.classList.toggle("rotated",$t)}async function Xs(e){try{Yn=await b.getTicketRitualsStatus(e),_l(e)}catch(t){console.error("Failed to load ticket rituals:",t),Yn=null}}function _l(e){const t=document.getElementById("ticket-rituals-section");if(!t)return;if(!Yn){t.classList.add("hidden");return}const{pending_rituals:n,completed_rituals:s}=Yn;if(n.length===0&&s.length===0){t.classList.add("hidden");return}t.classList.remove("hidden"),n.some(l=>l.approval_mode==="gate")&&($t=!1);const a=t.querySelector(".ticket-rituals-content");if(!a)return;a.classList.toggle("collapsed",$t);const o=t.querySelector(".section-toggle-icon");o&&o.classList.toggle("rotated",$t);const r=n.some(l=>l.trigger==="ticket_close"),d=n.some(l=>l.trigger==="ticket_claim");let c="⚠️ Complete these rituals:";r&&d?c="⚠️ Pending rituals (claim before starting, close before completing):":d?c="⚠️ Complete these rituals before claiming this ticket:":r&&(c="⚠️ Complete these rituals before closing this ticket:"),a.innerHTML=`
        ${n.length>0?`
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${c}</p>
                ${n.map(l=>`
                    <div class="ticket-ritual-item pending${l.attestation?" attested":""}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${l.attestation?"⏳":"○"}</span>
                            <span class="ticket-ritual-name">${f(l.name)}</span>
                            <span class="badge badge-trigger-${l.trigger||"ticket_close"}">${l.trigger==="ticket_claim"?"claim":"close"}</span>
                            <span class="badge badge-ritual-${l.approval_mode||"auto"}">${l.approval_mode||"auto"}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${l.prompt?et(l.prompt):""}</div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ye(l.attestation.attested_at)}</span>
                                ${l.attestation.note?`<div class="attestation-note markdown-body">${et(l.attestation.note)}</div>`:""}
                            </div>
                        `:""}
                        <div class="ticket-ritual-actions">
                            ${hf(l,e)}
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
                            <span class="ticket-ritual-name">${f(l.name)}</span>
                        </div>
                        ${l.attestation?`
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${f(l.attestation.attested_by_name||"Unknown")}</span>
                                <span class="attestation-time">${Ye(l.attestation.attested_at)}</span>
                            </div>
                        `:""}
                    </div>
                `).join("")}
            </div>
        `:""}
    `}async function Qs(e){try{let t;return e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t?(await K(t.id,!1),!0):(M("my-issues",!1),!1)}catch{return M("my-issues",!1),!1}}function Il(e){const t=Ls(),n=t.findIndex(s=>s.id===e);return{issueList:t,currentIndex:n,prevIssue:n>0?t[n-1]:null,nextIssue:n>=0&&n<t.length-1?t[n+1]:null,inList:n>=0}}function Tl({issueList:e,currentIndex:t,prevIssue:n,nextIssue:s,inList:i}){return i?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${n?`data-action="navigate-issue" data-issue-id="${p(n.id)}" data-identifier="${p(n.identifier)}"`:"disabled"} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${t+1} / ${e.length}</span>
                            <button class="issue-nav-btn" ${s?`data-action="navigate-issue" data-issue-id="${p(s.id)}" data-identifier="${p(s.identifier)}"`:"disabled"} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`:""}function Jp(){var o;const e=document.getElementById("issue-detail-view");if(!e||e.classList.contains("hidden"))return;const t=ie();if(!t)return;const n=Il(t.id);Ws=n.prevIssue?n.prevIssue.id:null,Ks=n.nextIssue?n.nextIssue.id:null;const s=e.querySelector(".issue-detail-nav");if(!s)return;const i=s.querySelector(".issue-nav-arrows"),a=Tl(n);i?a?i.outerHTML=a:i.remove():a&&((o=s.querySelector(".back-link"))==null||o.insertAdjacentHTML("afterend",a))}Ze(e=>{e==="detailNavContext"&&Jp()});async function K(e,t=!0){try{t&&Pt(),$t=!0;let n=!1;const[s,i,a,o,r,d]=await Promise.all([b.getIssue(e),b.getComments(e).catch(y=>(console.error("Failed to load comments:",y),n=!0,[])),b.getActivities(e),b.getSubIssues(e),b.getRelations(e),b.getTicketRitualsStatus(e).catch(()=>({pending_rituals:[],completed_rituals:[]}))]),l=[...d.pending_rituals||[],...d.completed_rituals||[]].filter(y=>y.attestation&&y.attestation.note).map(y=>({id:`attestation-${y.attestation.id}`,author_name:y.attestation.attested_by_name||"Unknown",content:y.attestation.note,created_at:y.attestation.attested_at,is_attestation:!0,ritual_name:y.name,is_pending:!y.attestation.approved_at}));Yn=d;const u=[...i,...l].sort((y,ze)=>new Date(y.created_at)-new Date(ze.created_at)),m=[s.parent_id?b.getIssue(s.parent_id):Promise.resolve(null),b.getSprints(s.project_id).catch(y=>(console.error("Failed to load sprints:",y),[]))],[h,v]=await Promise.all(m),w=r.filter(y=>y.relation_type==="blocks"&&y.direction==="outgoing"),_=r.filter(y=>y.relation_type==="blocked_by"||y.relation_type==="blocks"&&y.direction==="incoming"),S=r.filter(y=>y.relation_type==="relates_to");t&&history.pushState({issueId:e,view:L()},"",`/issue/${s.identifier}`),Bs(s),Mr(v),Ta=!1,Zs=null,document.querySelectorAll(".view").forEach(y=>y.classList.add("hidden"));const j=document.getElementById("issue-detail-view");j.classList.remove("hidden");const B=L()||"my-issues",E=Q().find(y=>y.id===s.project_id),D=s.assignee_id?Gn(s.assignee_id):null,I=D?Bt(D):null,H=s.sprint_id?v.find(y=>y.id===s.sprint_id):null,V=Il(s.id),{prevIssue:Ae,nextIssue:le}=V;j.querySelector("#issue-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(B)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${Tl(V)}
                        <span class="issue-detail-breadcrumb">${E?f(E.name):"Project"} › ${f(s.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(s.title)}</h1>

                    ${h?`
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(h.identifier)}" data-action="navigate-issue" data-issue-id="${p(h.id)}" data-identifier="${p(h.identifier)}">${h.identifier}: ${f(h.title)}</a>
                    </div>
                    `:""}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${p(s.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${Is(s.id)?'<span class="draft-indicator" title="Unsaved draft">Draft</span>':""}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${s.description?"":"empty"}" data-action="edit-description" data-issue-id="${p(s.id)}">
                            ${s.description?ln(s.description):'<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${p(s.id)}" data-project-id="${p(s.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${o.length===0?N({icon:P.issues,heading:"No sub-issues",description:"Break this issue down by creating sub-issues"}):o.map(y=>`
                                <a href="/issue/${encodeURIComponent(y.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${p(y.id)}" data-identifier="${p(y.identifier)}">
                                    <span class="sub-issue-status">${_e(y.status)}</span>
                                    <span class="sub-issue-id">${y.identifier}</span>
                                    <span class="sub-issue-title">${f(y.title)}</span>
                                    ${y.estimate?`<span class="sub-issue-estimate">${y.estimate}pts</span>`:""}
                                </a>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${p(s.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${w.length===0&&_.length===0&&S.length===0?`
                                <div class="relations-empty">No relations</div>
                            `:""}
                            ${_.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${_.map(y=>`
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${_e(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${f(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(s.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${w.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${w.map(y=>`
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${_e(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${f(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(s.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join("")}
                                </div>
                            `:""}
                            ${S.length>0?`
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${S.map(y=>`
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${_e(y.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(y.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${p(y.related_issue_id)}" data-identifier="${p(y.related_issue_identifier)}" class="relation-link">${y.related_issue_identifier}</a>
                                            <span class="relation-title">${f(y.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${p(s.id)}" data-relation-id="${p(y.id)}" title="Remove relation">
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
                            <h3>Comments${u.length>0?` <span class="section-count">(${u.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${n?`
                                <div class="comments-error">
                                    Comments failed to load.
                                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${p(s.id)}">Retry</button>
                                </div>
                            `:""}
                            ${u.length===0?n?"":`
                                <div class="comments-empty">No comments yet</div>
                            `:u.map(y=>`
                                <div class="comment ${y.is_attestation?"comment-attestation":""} ${y.is_pending?"comment-attestation-pending":""}">
                                    <div class="comment-avatar ${y.is_attestation?"avatar-attestation":""}">${y.is_attestation?y.is_pending?"⏳":"✓":(y.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(y.author_name||"User")}</span>
                                            ${y.is_attestation?`<span class="comment-ritual-badge">${y.is_pending?"Pending approval — ":""}Ritual: ${f(y.ritual_name)}</span>`:""}
                                            <span class="comment-date">${Ye(y.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${El(y.content)}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${a.length>0?` <span class="section-count">(${a.length})</span>`:""}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${a.length===0?N({icon:P.activity,heading:"No activity yet",description:"Activity will appear here as the issue is updated"}):a.map(y=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Sa(y.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ca(y)}</span>
                                        <span class="activity-actor">by ${f(La(y))}</span>
                                        <span class="activity-time">${Ye(y.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${p(s.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl"}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${p(s.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${_e(s.status)}
                                <span>${ke(s.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${p(s.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${Je(s.priority)}
                                <span>${De(s.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${p(s.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${s.issue_type||"task"}">${lt(s.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${p(s.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${I?`${Wt(D,"avatar-small")}<span>${f(I)}</span>`:'<span class="text-muted">Unassigned</span>'}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${p(s.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${H?f(H.name):'<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${p(s.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${s.labels&&s.labels.length>0?s.labels.map(y=>`
                                        <span class="issue-label" style="background: ${Y(y.color)}20; color: ${Y(y.color)}">${f(y.name)}</span>
                                    `).join(""):'<span class="text-muted">No Labels</span>'}
                            </button>
                        </div>

                        ${E?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(E.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${p(s.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${Xa(s.estimate,s.project_id)?" out-of-scale":""}" ${Xa(s.estimate,s.project_id)?'title="Estimate outside current scale"':""}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${mi(s.estimate,s.project_id)}</span>
                            </button>
                        </div>

                        ${s.due_date?`
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(s.due_date).toLocaleDateString()}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${f(s.creator_name||"Unknown")}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(s.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${p(s.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${p(s.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `,Ys&&Ys.abort(),Ys=new AbortController;const{signal:q}=Ys,ce=document.querySelector(".sidebar-overflow-trigger"),Se=document.querySelector(".overflow-menu-dropdown");if(ce&&Se){const y=()=>{Se.classList.add("hidden"),ce.setAttribute("aria-expanded","false")},ze=()=>{const Le=Se.classList.toggle("hidden");ce.setAttribute("aria-expanded",String(!Le))};ce.addEventListener("click",ze,{signal:q}),document.addEventListener("click",Le=>{!ce.contains(Le.target)&&!Se.contains(Le.target)&&y()},{signal:q}),Se.addEventListener("keydown",Le=>{Le.key==="Escape"&&(y(),ce.focus())},{signal:q})}_l(s.id),Ea(),wl({signal:q});const Re=document.getElementById("new-comment");if(Re){const y=kr(s.id);y&&(Re.value=y),Re.addEventListener("input",()=>{_s(s.id,Re.value)}),Re.addEventListener("keydown",ze=>{var Le;ze.key==="Enter"&&(ze.metaKey||ze.ctrlKey)&&(ze.preventDefault(),(Le=Re.closest("form"))==null||Le.requestSubmit())})}Ws=Ae?Ae.id:null,Ks=le?le.id:null;const Ft=y=>{var Ai;if((y.metaKey||y.ctrlKey)&&y.shiftKey&&(y.key===">"||y.key==="."||y.code==="Period")&&Vs()){y.preventDefault();return}if(y.metaKey||y.ctrlKey||y.altKey||document.getElementById("issue-detail-view").classList.contains("hidden")||y.target.tagName==="INPUT"||y.target.tagName==="TEXTAREA"||y.target.tagName==="SELECT"||y.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||document.querySelector(".description-inline-editor"))return;if(y.key==="ArrowLeft"&&Ws)y.preventDefault(),K(Ws);else if(y.key==="ArrowRight"&&Ks)y.preventDefault(),K(Ks);else if(y.key==="c"){y.preventDefault(),y.stopImmediatePropagation();const ft=document.getElementById("new-comment");ft&&(ft.focus(),ft.scrollIntoView({behavior:"smooth",block:"nearest"}))}else y.key==="j"?(y.preventDefault(),y.stopImmediatePropagation(),Js(1)):y.key==="k"?(y.preventDefault(),y.stopImmediatePropagation(),Js(-1)):y.key==="d"&&(y.preventDefault(),(Ai=document.querySelector('[data-action="edit-description"]'))==null||Ai.click());const Le={s:"status",p:"priority",a:"assignee",l:"labels",e:"estimate",t:"type"}[y.key];if(Le){const ft=document.querySelector(`.property-row[data-field="${Le}"]`);ft&&(y.preventDefault(),ft.click())}};document.addEventListener("keydown",Ft,{signal:q})}catch(n){x("load issue",n)}}async function em(e,t){if(e.preventDefault(),_a)return!1;const n=document.getElementById("new-comment").value;_s(t,null),_a=!0;try{await b.createComment(t,n),await K(t),k("Comment added!","success")}catch(s){_s(t,n),x("add comment",s)}finally{_a=!1}return!1}async function tm(e){const t=ie()||await b.getIssue(e),n=document.querySelector(".issue-detail-description");if(!n||n.querySelector(".description-inline-editor"))return;const s=n.querySelector(".section-header");s&&(s.style.display="none");const i=n.querySelector(".description-content");if(!i)return;i.innerHTML=`
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
    `,i.classList.remove("empty");const a=document.getElementById("edit-description"),o=Is(e),r=document.getElementById("description-draft-warning");if(o){a.value=o;const c=Er(e);r&&(c===null||c!==(t.description||""))&&(r.textContent="This description has changed since your draft — review before saving.",r.classList.remove("hidden"))}Ea("edit-description","edit-description-mention-suggestions"),a.addEventListener("input",()=>{const c=a.value;c!==(t.description||"")?At(e,c,t.description||""):At(e,null);const l=document.getElementById("edit-description-preview");l&&l.style.display!=="none"&&Sl()}),a.addEventListener("keydown",c=>{var l,u;c.key==="Enter"&&(c.metaKey||c.ctrlKey)&&(c.preventDefault(),(l=document.getElementById("save-description-edit"))==null||l.click()),c.key==="Escape"&&(c.preventDefault(),c.stopPropagation(),(u=document.getElementById("cancel-description-edit"))==null||u.click())}),a.focus(),document.getElementById("cancel-description-edit").addEventListener("click",()=>{var u,m;if(!((((u=document.getElementById("edit-description"))==null?void 0:u.value)??"")!==(t.description||"")&&!confirm("Discard your unsaved description changes?"))){if(At(e,null),Ta){K(e,!1);return}s&&(s.style.display=""),i.className=`description-content markdown-body ${t.description?"":"empty"}`,i.setAttribute("data-action","edit-description"),i.setAttribute("data-issue-id",t.id),i.innerHTML=t.description?ln(t.description):'<span class="add-description-link">Add description...</span>',(m=n.querySelector('[data-action="edit-description"]'))==null||m.focus()}});let d=!1;document.getElementById("save-description-edit").addEventListener("click",async()=>{var h,v;if(Ia)return;const c=(h=document.getElementById("edit-description"))==null?void 0:h.value;if(c===void 0)return;const l=Zs?Zs.description||"":null;if(l!==null&&l!==(t.description||"")&&!d){d=!0;const w=document.getElementById("description-draft-warning");w&&(w.textContent="This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version.",w.classList.remove("hidden"));return}const u=document.getElementById("save-description-edit");Ia=!0,u&&(u.disabled=!0);const m=window.scrollY;try{await b.updateIssue(e,{description:c}),At(e,null),k("Description updated","success"),await K(e,!1),window.scrollTo(0,m),(v=document.querySelector('.issue-detail-description [data-action="edit-description"]'))==null||v.focus()}catch(w){x("update description",w)}finally{Ia=!1,u&&(u.disabled=!1)}})}function Sl(){const e=document.getElementById("edit-description"),t=document.getElementById("edit-description-preview");if(!e||!t)return;const n=e.value.trim();t.innerHTML=n?ln(n):'<span class="text-muted">Nothing to preview.</span>'}function nm(e){const t=document.getElementById("edit-description-tab-write"),n=document.getElementById("edit-description-tab-preview"),s=document.getElementById("edit-description"),i=document.getElementById("edit-description-preview");if(!t||!n||!s||!i)return;const a=e==="preview";t.classList.toggle("active",!a),n.classList.toggle("active",a),s.style.display=a?"none":"block",i.style.display=a?"block":"none",a?Sl():s.focus()}function sm(e){document.getElementById("modal-title").textContent="Add Relation",document.getElementById("modal-content").innerHTML=`
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
    `,U(),document.getElementById("relation-issue-search").focus()}async function im(e,t){var s;const n=document.getElementById("relation-search-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=A())==null?void 0:s.id,o=(await b.searchIssues(i,e)).filter(r=>r.id!==t);if(o.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=o.map(r=>`
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${p(r.id)}" data-identifier="${p(r.identifier)}" data-title="${p(r.title)}">
                <span class="link-result-id">${f(r.identifier)}</span>
                <span class="link-result-title">${f(r.title)}</span>
            </div>
        `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}function am(e,t,n){document.getElementById("selected-related-issue-id").value=e,document.getElementById("selected-issue-info").textContent=`${t}: ${n}`,document.getElementById("selected-issue-display").style.display="flex",document.getElementById("relation-search-results").style.display="none",document.getElementById("relation-issue-search").value=t,document.getElementById("add-relation-btn").disabled=!1}function om(){document.getElementById("selected-related-issue-id").value="",document.getElementById("selected-issue-display").style.display="none",document.getElementById("relation-search-results").style.display="block",document.getElementById("relation-issue-search").value="",document.getElementById("add-relation-btn").disabled=!0,document.getElementById("relation-issue-search").focus()}async function rm(e,t){e.preventDefault();const n=document.getElementById("relation-type").value,s=document.getElementById("selected-related-issue-id").value;if(!s)return k("Please select an issue","error"),!1;try{n==="blocked_by"?await b.createRelation(s,t,"blocks"):await b.createRelation(t,s,n),O(),k("Relation added","success"),K(t)}catch(i){x("add relation",i)}return!1}async function lm(e,t){try{await b.deleteRelation(e,t),k("Relation removed","success"),K(e)}catch(n){x("remove relation",n)}}function Js(e){const t=ie();if(!t)return;const n=Ls();if(!n||n.length===0)return;const s=n.findIndex(a=>a.id===t.id);if(s===-1)return;const i=s+e;i<0||i>=n.length||K(n[i].id)}J({"retry-issue-comments":(e,t)=>{K(t.issueId,!1)},"show-detail-dropdown":(e,t,n)=>{Ep(e,t.dropdownType,t.issueId,n)},"edit-description":(e,t)=>{if(e.target.closest("a"))return;const n=window.getSelection();n&&!n.isCollapsed&&n.toString().trim()||tm(t.issueId)},"toggle-section":(e,t)=>{Xp(t.section)},"toggle-ticket-rituals":()=>{Qp()},"save-comment":(e,t)=>{em(e,t.issueId)},"show-add-relation-modal":(e,t)=>{sm(t.issueId)},"remove-relation":(e,t)=>{lm(t.issueId,t.relationId)},"show-create-sub-issue-modal":(e,t)=>{Np(t.issueId,t.projectId)},"handle-add-relation":(e,t)=>{rm(e,t.issueId)},"search-issues-to-relate":(e,t,n)=>{im(n.value,t.issueId)},"select-issue-for-relation":(e,t)=>{am(t.issueId,t.identifier,t.title)},"clear-selected-relation":()=>{om()},"set-description-editor-mode":(e,t)=>{nm(t.mode)},"scroll-to-comments":e=>{var t;e.preventDefault(),(t=document.getElementById("comments-section"))==null||t.scrollIntoView({behavior:"smooth"})},"navigate-prev-issue":()=>Js(-1),"navigate-next-issue":()=>Js(1),edit:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),gl(t.issueId)},delete:(e,t)=>{const n=document.querySelector(".overflow-menu-dropdown:not(.hidden)");n&&n.classList.add("hidden"),Vp(t.issueId)}});function Ll(e){return e?e.replace(/^#{1,6}\s+/gm,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^[-*+]\s+/gm,"").replace(/^\d+\.\s+/gm,"").replace(/^>\s+/gm,"").replace(/\n+/g," ").trim():""}let cn=[],Zn=[],ei=null,Z=new Set,dn="list",jt=!1,Aa=null,ti=null,Ba=null,Da=null,Cl=null;function Al(e){if(Cl!==e)return!1;const t=document.getElementById("document-detail-view");return!!t&&!t.classList.contains("hidden")}const Ma=bu();(Ma==="list"||Ma==="grid")&&(dn=Ma);function Bl(e){if(e!=="list"&&e!=="grid")return;dn=e,e==="grid"&&jt&&ja(),yu(e);const t=document.getElementById("doc-view-list"),n=document.getElementById("doc-view-grid");t&&n&&(t.classList.toggle("active",e==="list"),n.classList.toggle("active",e==="grid"));const s=document.getElementById("doc-select-btn");s&&s.classList.toggle("hidden",e==="grid"),Et()}function Dl(){if(dn!=="list")return;jt=!0,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Cancel",e.dataset.action="exit-selection-mode"),Et(),pn()}function ja(){jt=!1,Z.clear();const e=document.getElementById("doc-select-btn");e&&(e.textContent="Select",e.dataset.action="enter-selection-mode"),Et(),pn()}function cm(){Aa&&clearTimeout(Aa),Aa=setTimeout(()=>{Et()},300)}function dm(){const e=document.getElementById("doc-search");e&&(e.value=""),Et()}async function um(){Oe(null)}async function pm(){const e=document.getElementById("doc-search");e&&(e.value=""),Oe(null)}function mm(){var i;const e=document.getElementById("doc-filter-chips");if(!e)return;const t=((i=document.getElementById("doc-search"))==null?void 0:i.value)||"",n=z()||"",s=[];if(t&&s.push(`<span class="filter-chip">Search: "${f(t)}" <button class="chip-clear" data-action="clear-doc-search">×</button></span>`),n){const a=Q().find(r=>r.id===n),o=(a==null?void 0:a.name)||"Project";s.push(`<span class="filter-chip">Project: ${f(o)} <button class="chip-clear" data-action="clear-doc-project-filter">×</button></span>`)}if(s.length>0){let a=s.join(" ");s.length>1&&(a+=' <button class="btn btn-secondary btn-tiny" data-action="clear-all-doc-filters">Clear all</button>'),e.innerHTML=a,e.classList.remove("hidden")}else e.innerHTML="",e.classList.add("hidden")}function fm(){return cn}function Et(){var n,s,i;const e=((s=(n=document.getElementById("doc-search"))==null?void 0:n.value)==null?void 0:s.toLowerCase())||"",t=((i=document.getElementById("doc-sort"))==null?void 0:i.value)||"updated_desc";mm(),Zn=cn.filter(a=>{var o,r;if(e){const d=(o=a.title)==null?void 0:o.toLowerCase().includes(e),c=(r=a.content)==null?void 0:r.toLowerCase().includes(e);if(!d&&!c)return!1}return!0}),Zn.sort((a,o)=>{switch(t){case"title_asc":return(a.title||"").localeCompare(o.title||"");case"title_desc":return(o.title||"").localeCompare(a.title||"");case"updated_asc":return new Date(a.updated_at)-new Date(o.updated_at);case"updated_desc":default:return new Date(o.updated_at)-new Date(a.updated_at)}}),km("",dn)}let un=0;async function gm(){var s;const e=ei||((s=A())==null?void 0:s.id);if(!e)return;const t=++un,n=z()||null;try{const i=await b.getDocuments(e,n);if(t!==un)return;cn=i,Et()}catch(i){if(t!==un)return;const a=document.getElementById("documents-list");a&&(a.innerHTML=N({icon:P.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",i)}}Ze(e=>{e==="currentProject"&&L()==="documents"&&gm()});async function Rt(e,t=null){var i;if(e||(e=(i=A())==null?void 0:i.id),!e)return;ei=e,Ar(-1);const n=++un,s=document.getElementById("documents-list");s&&(s.innerHTML=Array(4).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="width: 24px"><div class="skeleton" style="width: 24px; height: 24px; border-radius: 4px;"></div></div>
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
            </div>
        </div>
    `).join("")),t===null&&(t=z()||null);try{const a=await b.getDocuments(e,t);if(n!==un)return;cn=a;const o=document.getElementById("doc-view-list"),r=document.getElementById("doc-view-grid");o&&r&&(o.classList.toggle("active",dn==="list"),r.classList.toggle("active",dn==="grid")),Et()}catch(a){if(n!==un)return;const o=document.getElementById("documents-list");o&&(o.innerHTML=N({icon:P.documents,heading:"Failed to load documents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-documents"},variant:"error"})),x("load documents",a)}}function hm(){var t,n;if(L()!=="documents"||!((t=document.getElementById("document-detail-view"))!=null&&t.classList.contains("hidden")))return;const e=ei||((n=A())==null?void 0:n.id);e&&Rt(e).catch(s=>console.error("Failed to refresh documents list:",s))}function Ml(e){Al(e)&&Ie(e,!1).catch(t=>console.error("Failed to refresh document detail:",t))}function vm(e,t){Al(e)&&(k(`Document "${t||"Untitled"}" was deleted`,"warning"),M("documents"))}function bm(e){return!e||e.length===0?"":e.slice(0,2).map(t=>`<span class="issue-label" style="background: ${Y(t.color)}20; color: ${Y(t.color)}">${f(t.name)}</span>`).join(" ")+(e.length>2?` <span class="text-muted">+${e.length-2}</span>`:"")}function ym(e){const t=e.labels&&e.labels.length>0?`<div class="grid-item-labels">${bm(e.labels)}</div>`:"";return`
    <div class="grid-item" data-doc-id="${p(e.id)}" data-action="view-document" data-document-id="${p(e.id)}">
      <div class="grid-item-header">
        <div class="grid-item-icon" style="background: var(--bg-tertiary)">
          ${f(e.icon)||"📄"}
        </div>
        <div class="grid-item-title">${f(e.title)}</div>
      </div>
      ${t}
      <div class="grid-item-description">${e.content?f(Ll(e.content).substring(0,100))+"...":"No content"}</div>
      <div class="grid-item-footer">
        <span>${e.project_id?"":'<span class="badge badge-secondary" title="Team-wide document">Global</span> '}${e.sprint_id?'<span class="badge badge-info" title="Sprint document">Sprint</span> ':""}${e.author_name?`By ${f(e.author_name)} · `:""}Updated ${new Date(e.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  `}function wm(e){const t=e.labels&&e.labels.length>0?e.labels.slice(0,2).map(r=>`<span class="issue-label" style="background: ${Y(r.color)}20; color: ${Y(r.color)}">${f(r.name)}</span>`).join(" ")+(e.labels.length>2?` <span class="text-muted">+${e.labels.length-2}</span>`:""):"",n=[];e.project_id||n.push('<span class="badge badge-secondary badge-small">Global</span>'),e.sprint_id&&n.push('<span class="badge badge-info badge-small">Sprint</span>');const s=e.content?Ll(e.content).substring(0,80):"No content",i=jt?`<div class="document-list-checkbox" data-action="toggle-doc-selection" data-doc-id="${p(e.id)}">
         <input type="checkbox" id="doc-check-${e.id}" ${Z.has(e.id)?"checked":""}>
       </div>`:"";return`
    <div class="list-item document-list-item${jt&&Z.has(e.id)?" selected":""}" data-action="${jt?"toggle-doc-selection":"view-document"}" data-document-id="${p(e.id)}" data-doc-id="${p(e.id)}">
      ${i}
      <div class="document-list-icon">${f(e.icon)||"📄"}</div>
      <div class="document-list-main">
        <div class="document-list-title">${f(e.title)}</div>
        <div class="document-list-snippet text-muted">${f(s)}${e.content&&e.content.length>80?"...":""}</div>
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
  `}function km(e="",t="list"){var c;const n=document.getElementById("documents-list");if(!n)return;Z.clear(),pn();const s=Zn;if(s.length===0){const l=(c=document.getElementById("doc-search"))==null?void 0:c.value,u=z(),m=l||u;n.innerHTML=N({icon:m?P.search:P.documents,heading:m?"No documents match your filters":"No documents yet",description:m?"Try different search terms or filters":"Create your first document to get started",...!m&&{cta:{label:"Create document",action:"showCreateDocumentModal"}}});return}const i=t==="grid"?ym:wm,a=t==="grid"?"documents-grid":"documents-list-view";if(!e){n.innerHTML=`<div class="${a}">${s.map(i).join("")}</div>`;return}const o={},r=Q();s.forEach(l=>{let u,m;if(e==="project")if(u=l.project_id||"__global__",u==="__global__")m="Global (Team-wide)";else{const h=r.find(v=>v.id===l.project_id);m=h?h.name:"Unknown Project"}else e==="sprint"&&(u=l.sprint_id||"__no_sprint__",m=l.sprint_id?"Sprint":"No Sprint");o[u]||(o[u]={label:m,docs:[]}),o[u].docs.push(l)});let d="";for(const[l,u]of Object.entries(o)){const m=t==="grid"?"doc-group-content grid":"doc-group-content";d+=`
      <div class="doc-group">
        <div class="doc-group-header">
          <span class="doc-group-title">${f(u.label)}</span>
          <span class="doc-group-count">${u.docs.length}</span>
        </div>
        <div class="${m}">
          ${u.docs.map(i).join("")}
        </div>
      </div>
    `}n.innerHTML=d}function $m(e){Z.has(e)?Z.delete(e):Z.add(e);const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=Z.has(e));const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.toggle("selected",Z.has(e)),pn()}function Em(){Zn.forEach(e=>Z.add(e.id)),Zn.forEach(e=>{const t=document.getElementById(`doc-check-${e.id}`);t&&(t.checked=!0);const n=document.querySelector(`.grid-item[data-doc-id="${e.id}"]`);n&&n.classList.add("selected")}),pn()}function jl(){Z.forEach(e=>{const t=document.getElementById(`doc-check-${e}`);t&&(t.checked=!1);const n=document.querySelector(`.grid-item[data-doc-id="${e}"]`);n&&n.classList.remove("selected")}),Z.clear(),pn()}function pn(){const e=document.getElementById("doc-bulk-actions");e&&(jt?(e.classList.remove("hidden"),Z.size>0?e.innerHTML=`
        <span class="bulk-count">${Z.size} selected</span>
        <button class="btn btn-secondary btn-small" data-action="show-bulk-move-modal">Move to Project</button>
        <button class="btn btn-danger btn-small" data-action="bulk-delete-documents">Delete</button>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="clear-doc-selection">Clear</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `:e.innerHTML=`
        <span class="bulk-count">Select documents</span>
        <button class="btn btn-secondary btn-small" data-action="select-all-docs">Select All</button>
        <button class="btn btn-secondary btn-small" data-action="exit-selection-mode">Done</button>
      `):(e.classList.add("hidden"),e.innerHTML=""))}async function xm(){if(Z.size===0){k("No documents selected","error");return}const t=Q().map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("");document.getElementById("modal-title").textContent=`Move ${Z.size} Document${Z.size>1?"s":""}`,document.getElementById("modal-content").innerHTML=`
    <form data-action="handle-bulk-move">
      <div class="form-group">
        <label for="bulk-move-project">Move to Project</label>
        <select id="bulk-move-project" required>
          <option value="">Global (Team-wide)</option>
          ${t}
        </select>
      </div>
      <p class="text-muted">This will move ${Z.size} selected document${Z.size>1?"s":""} to the chosen project.</p>
      <button type="submit" class="btn btn-primary">Move Documents</button>
    </form>
  `,U()}async function _m(e){var o,r;e.preventDefault();const t=document.getElementById("bulk-move-project").value||null,n=Array.from(Z);let s=0;const i=[];for(const d of n)try{await b.updateDocument(d,{project_id:t}),s++}catch(c){console.error(`Failed to move document ${d}:`,c),i.push(((o=cn.find(l=>l.id===d))==null?void 0:o.title)||d)}O(),jl(),i.length===0?k(`Moved ${s} document${s>1?"s":""}!`,"success"):k(`Moved ${s}, failed to move: ${i.join(", ")}`,"warning");const a=(r=A())==null?void 0:r.id;return await Rt(a),!1}async function Im(){var a,o;if(Z.size===0){k("No documents selected","error");return}const e=Z.size;if(!confirm(`Are you sure you want to delete ${e} document${e>1?"s":""}? This cannot be undone.`))return;const t=Array.from(Z);let n=0;const s=[];for(const r of t)try{await b.deleteDocument(r),n++}catch(d){console.error(`Failed to delete document ${r}:`,d),s.push(((a=cn.find(c=>c.id===r))==null?void 0:a.title)||r)}ja(),s.length===0?k(`Deleted ${n} document${n>1?"s":""}!`,"success"):k(`Deleted ${n}, failed to delete: ${s.join(", ")}`,"warning");const i=(o=A())==null?void 0:o.id;await Rt(i)}async function Tm(e){const t=/Mac|iPhone|iPad/.test(navigator.userAgent)?"⌘":"Ctrl";try{const n=await b.getDocumentComments(e.id);return`
      <div class="comments-section" id="doc-comments-section">
        <h3>Comments</h3>
        <div class="comments-list">${n.length===0?'<div class="comments-empty">No comments yet</div>':n.map(i=>{var a,o;return`
          <div class="comment" data-comment-id="${p(i.id)}">
            <div class="comment-avatar">${((o=(a=i.author_name)==null?void 0:a.charAt(0))==null?void 0:o.toUpperCase())||"U"}</div>
            <div class="comment-body">
              <div class="comment-header">
                <span class="comment-author">${f(i.author_name||"Unknown")}</span>
                <span class="comment-date">${Ye(i.created_at)}</span>
              </div>
              <div class="comment-content markdown-body">${El(i.content)}</div>
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
    `}}function Sm(e,t){const n=document.getElementById("new-doc-comment");if(!n)return;const s=kr(e);s&&(n.value=s),n.addEventListener("input",()=>{_s(e,n.value)},{signal:t}),n.addEventListener("keydown",i=>{var a;i.key==="Enter"&&(i.metaKey||i.ctrlKey)&&(i.preventDefault(),(a=n.closest("form"))==null||a.requestSubmit())},{signal:t}),Ea("new-doc-comment","doc-mention-suggestions")}async function Ie(e,t=!0){try{t&&Pt();const n=await b.getDocument(e);Cl=n.id,t&&history.pushState({documentId:e},"",`/document/${e}`),document.querySelectorAll(".view").forEach(I=>I.classList.add("hidden"));const s=document.getElementById("document-detail-view");s.classList.remove("hidden");const i=await Tm(n);let a=null,o=null,r=!1;if(n.project_id){const H=Q().find(V=>V.id===n.project_id);if(a=H?H.name:null,n.sprint_id)try{const V=await b.getSprint(n.sprint_id);o=V?V.name:null}catch(V){console.error("Failed to load sprint name:",V),r=!0}}let d=n.content||"";const c=F.lexer(d);n.title&&c.length>0&&c[0].type==="heading"&&c[0].depth===1&&c[0].text.trim()===n.title.trim()&&(d=d.slice(c[0].raw.length).trimStart());const l=fm(),u=l.findIndex(I=>I.id===n.id),m=u>0?l[u-1]:null,h=u>=0&&u<l.length-1?l[u+1]:null,v=u>=0,w=L()||"documents",_=n.labels&&n.labels.length>0?n.labels.map(I=>`
          <span class="issue-label" style="background: ${Y(I.color)}20; color: ${Y(I.color)}">
            ${f(I.name)}
            <button class="btn-remove-label" data-action="remove-label-from-doc" data-document-id="${p(n.id)}" data-label-id="${p(I.id)}" title="Remove label">&times;</button>
          </span>
        `).join(""):'<span class="text-muted">No Labels</span>';let S='<span class="text-muted">None</span>';try{const I=await b.getDocumentIssues(n.id);I.length>0&&(S=I.map(H=>`
          <div class="linked-item">
            <span class="linked-item-id">${f(H.identifier)}</span>
            <span class="linked-item-title">${f(H.title)}</span>
            <button class="btn btn-danger btn-tiny" data-action="unlink-document-issue" data-document-id="${p(n.id)}" data-issue-id="${p(H.id)}" title="Unlink">&times;</button>
          </div>
        `).join(""))}catch(I){console.error("Failed to load linked issues:",I),S=`<span class="sidebar-load-error">Couldn't load linked issues</span>`}s.querySelector("#document-detail-content").innerHTML=`
      <div class="detail-layout">
        <div class="detail-main">
          <div class="issue-detail-nav">
            <button class="back-link" data-action="navigate-to" data-view="${p(w)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            ${v?`
            <div class="issue-nav-arrows">
              <button class="issue-nav-btn" ${m?`data-action="view-document" data-document-id="${p(m.id)}"`:"disabled"} title="Previous document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span class="issue-nav-counter">${u+1} / ${l.length}</span>
              <button class="issue-nav-btn" ${h?`data-action="view-document" data-document-id="${p(h.id)}"`:"disabled"} title="Next document">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            `:""}
            <span class="issue-detail-breadcrumb">${a?f(a)+" ›":""} ${f(n.title)}</span>
          </div>

          <h1 class="issue-detail-title">${n.icon?f(n.icon)+" ":""}${f(n.title)}</h1>

          <div class="document-content markdown-body">${d?ln(d):'<p class="text-muted">No content</p>'}</div>

          ${i}
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
                ${_}
                <button class="btn btn-secondary btn-tiny" data-action="show-add-label-to-doc-modal" data-document-id="${p(n.id)}" title="Add label">+</button>
              </div>
            </div>

            <div class="property-row">
              <span class="property-label">Author</span>
              <span class="property-value-static">${f(n.author_name||"Unknown")}</span>
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
                <button class="overflow-menu-item overflow-menu-danger" data-action="delete-document" data-document-id="${p(n.id)}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  Delete document
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `,ti&&ti.abort(),ti=new AbortController;const{signal:j}=ti,B=s.querySelector(".sidebar-overflow-trigger"),E=s.querySelector(".overflow-menu-dropdown");if(B&&E){const I=()=>{E.classList.add("hidden"),B.setAttribute("aria-expanded","false")},H=()=>{const V=E.classList.toggle("hidden");B.setAttribute("aria-expanded",String(!V))};B.addEventListener("click",H,{signal:j}),document.addEventListener("click",V=>{!B.contains(V.target)&&!E.contains(V.target)&&I()},{signal:j}),E.addEventListener("keydown",V=>{V.key==="Escape"&&(I(),B.focus())},{signal:j})}Sm(n.id,j),wl({containerId:"document-detail-content",textareaId:"new-doc-comment",signal:j}),Ba=m?m.id:null,Da=h?h.id:null;const D=I=>{if((I.metaKey||I.ctrlKey)&&I.shiftKey&&(I.key===">"||I.key==="."||I.code==="Period")&&Vs("new-doc-comment")){I.preventDefault();return}I.metaKey||I.ctrlKey||I.altKey||document.getElementById("document-detail-view").classList.contains("hidden")||I.target.tagName==="INPUT"||I.target.tagName==="TEXTAREA"||I.target.tagName==="SELECT"||I.target.isContentEditable||document.querySelector(".modal-overlay:not(.hidden)")||(I.key==="ArrowLeft"&&Ba?(I.preventDefault(),Ie(Ba)):I.key==="ArrowRight"&&Da&&(I.preventDefault(),Ie(Da)))};document.addEventListener("keydown",D,{signal:j})}catch(n){x("load document",n)}}async function ni(e,t,n=null,s=!1){const i=document.getElementById(e);if(i){if(!t){i.innerHTML='<option value="">Select project first</option>',i.disabled=!0;return}try{const a=await b.getSprints(t);let o=n;if(s&&!n){const d=a.find(c=>c.status==="active");d&&(o=d.id)}const r=a.map(d=>`<option value="${d.id}" ${d.id===o?"selected":""}>${f(d.name)}</option>`).join("");i.innerHTML=`<option value="">None</option>${r}`,i.disabled=!1}catch{i.innerHTML='<option value="">Error loading sprints</option>',i.disabled=!0}}}function Ra(e,t=""){return`
    <div class="form-group">
      <label for="${e}">Content</label>
      <div class="editor-tabs">
        <button type="button" class="editor-tab active" id="${e}-tab-write" data-action="set-doc-editor-mode" data-target="${e}" data-mode="write">Write</button>
        <button type="button" class="editor-tab" id="${e}-tab-preview" data-action="set-doc-editor-mode" data-target="${e}" data-mode="preview">Preview</button>
      </div>
      <textarea id="${e}" style="min-height: 200px">${f(t)}</textarea>
      <div id="${e}-preview" class="markdown-body editor-preview" style="display: none;"></div>
    </div>
  `}function Lm(e,t){const n=document.getElementById(`${e}-tab-write`),s=document.getElementById(`${e}-tab-preview`),i=document.getElementById(e),a=document.getElementById(`${e}-preview`);if(!n||!s||!i||!a)return;const o=t==="preview";if(n.classList.toggle("active",!o),s.classList.toggle("active",o),i.style.display=o?"none":"block",a.style.display=o?"block":"none",o){const r=i.value.trim();a.innerHTML=r?ln(r):'<span class="text-muted">Nothing to preview.</span>'}}function Pa(e,t={title:"doc-title",content:"doc-content",icon:"doc-icon"},n=null){const s=document.getElementById(t.title),i=document.getElementById(t.content),a=document.getElementById(t.icon),o=_r(e);if(o){const d=gu(e),c=n!==null&&d!==null&&d.title===n.title&&d.content===n.content&&d.icon===n.icon,l=document.getElementById(`${t.content}-draft-warning`);n===null?(o.title&&s&&(s.value=o.title),o.content&&i&&(i.value=o.content),o.icon&&a&&(a.value=o.icon)):c?(s&&(s.value=o.title||""),i&&(i.value=o.content||""),a&&(a.value=o.icon||""),l&&(l.textContent="Restored your unsaved draft.",l.classList.remove("hidden"))):l&&(l.textContent="You have an unsaved draft from an older version of this document — it was not loaded here, to avoid overwriting newer changes.",l.classList.remove("hidden"))}const r=()=>{const d={title:(s==null?void 0:s.value)||"",content:(i==null?void 0:i.value)||"",icon:(a==null?void 0:a.value)||""};if(n!==null&&d.title===n.title&&d.content===n.content&&d.icon===n.icon){Ts(e,null);return}Ts(e,d,n)};[s,i,a].forEach(d=>d==null?void 0:d.addEventListener("input",r))}async function Rl(){Xn=null;const e=Q(),t=Jl()||"",n=e.map(s=>`<option value="${s.id}" ${s.id===t?"selected":""}>${f(s.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Document",document.getElementById("modal-content").innerHTML=`
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
      ${Ra("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),Pa("new"),t&&await ni("doc-sprint",t,null,!0)}let Xn=null;async function Cm(e,t,n){Xn=n||null;const i=Q().map(a=>`<option value="${p(a.id)}" ${a.id===t?"selected":""}>${f(a.name)}</option>`).join("");document.getElementById("modal-title").textContent="Create Sprint Document",document.getElementById("modal-content").innerHTML=`
    <form data-action="create-document">
      <div class="form-group">
        <label for="doc-title">Title</label>
        <input type="text" id="doc-title" required>
      </div>
      <div class="form-group">
        <label for="doc-project">Project</label>
        <select id="doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="doc-sprint">
          <option value="">Global (Team-wide)</option>
          ${i}
        </select>
      </div>
      <div class="form-group">
        <label for="doc-sprint">Sprint</label>
        <select id="doc-sprint" disabled>
          <option value="">Loading sprints...</option>
        </select>
      </div>
      ${Ra("doc-content")}
      <div class="form-group">
        <label for="doc-icon">Icon (emoji)</label>
        <input type="text" id="doc-icon" placeholder="📄" maxlength="2">
      </div>
      <button type="submit" class="btn btn-primary">Create Document</button>
    </form>
  `,U(),Pa("new"),t&&await ni("doc-sprint",t,e)}async function Am(e){var a;e.preventDefault();const t=(a=A())==null?void 0:a.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("doc-project").value||null,s=document.getElementById("doc-sprint").value||null,i={title:document.getElementById("doc-title").value,content:document.getElementById("doc-content").value,icon:document.getElementById("doc-icon").value||null,project_id:n,sprint_id:s};try{if(await b.createDocument(t,i),Ts("new",null),await Rt(t),O(),k("Document created!","success"),Xn){const o=Xn;Xn=null,o()}}catch(o){x("create document",o)}return!1}async function Pl(e){try{const t=await b.getDocument(e),s=Q().map(i=>`<option value="${i.id}" ${i.id===t.project_id?"selected":""}>${f(i.name)}</option>`).join("");document.getElementById("modal-title").textContent="Edit Document",document.getElementById("modal-content").innerHTML=`
      <form data-action="update-document" data-document-id="${p(e)}">
        <div class="form-group">
          <label for="edit-doc-title">Title</label>
          <input type="text" id="edit-doc-title" value="${p(t.title)}" required>
        </div>
        <div class="form-group">
          <label for="edit-doc-project">Project</label>
          <select id="edit-doc-project" data-action="update-doc-sprint-dropdown" data-sprint-select="edit-doc-sprint">
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
        <div id="edit-doc-content-draft-warning" class="description-draft-warning hidden"></div>
        ${Ra("edit-doc-content",t.content||"")}
        <div class="form-group">
          <label for="edit-doc-icon">Icon (emoji)</label>
          <input type="text" id="edit-doc-icon" value="${p(t.icon||"")}" maxlength="2">
        </div>
        <button type="submit" class="btn btn-primary">Update Document</button>
      </form>
    `,U(),Pa(e,{title:"edit-doc-title",content:"edit-doc-content",icon:"edit-doc-icon"},{title:t.title||"",content:t.content||"",icon:t.icon||""}),t.project_id&&await ni("edit-doc-sprint",t.project_id,t.sprint_id)}catch(t){x("load document",t)}}async function Bm(e,t){e.preventDefault();const n=document.getElementById("edit-doc-project").value||null,s=document.getElementById("edit-doc-sprint").value||null,i={title:document.getElementById("edit-doc-title").value,content:document.getElementById("edit-doc-content").value,icon:document.getElementById("edit-doc-icon").value||null,project_id:n,sprint_id:s};try{await b.updateDocument(t,i);const a=_r(t);a&&a.title===i.title&&a.content===i.content&&(a.icon||"")===(i.icon||"")&&Ts(t,null),O(),await Ie(t),k("Document updated!","success")}catch(a){x("update document",a)}return!1}async function Dm(e){var t;if(confirm("Are you sure you want to delete this document?"))try{await b.deleteDocument(e);const n=(t=A())==null?void 0:t.id;await Rt(n),M("documents"),k("Document deleted!","success")}catch(n){x("delete document",n)}}function Mm(e,t){ni(e,t)}async function jm(e){document.getElementById("modal-title").textContent="Link Issue",document.getElementById("modal-content").innerHTML=`
    <form>
      <div class="form-group">
        <label for="link-issue-search">Search Issues</label>
        <input type="text" id="link-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-link" data-document-id="${p(e)}">
      </div>
      <div id="link-issue-results" class="link-results">
        <p class="empty-state-small">Enter a search term to find issues</p>
      </div>
    </form>
  `,U()}async function Rm(e,t){var s;const n=document.getElementById("link-issue-results");if(!e||e.length<2){n.innerHTML='<p class="empty-state-small">Enter a search term to find issues</p>';return}try{const i=(s=A())==null?void 0:s.id,a=await b.searchIssues(i,e);if(a.length===0){n.innerHTML='<p class="empty-state-small">No issues found</p>';return}n.innerHTML=a.map(o=>`
      <div class="link-result-item" data-action="link-to-issue" data-document-id="${p(t)}" data-issue-id="${p(o.id)}">
        <span class="link-result-id">${f(o.identifier)}</span>
        <span class="link-result-title">${f(o.title)}</span>
      </div>
    `).join("")}catch{n.innerHTML='<p class="empty-state-small error">Error searching issues</p>'}}async function Pm(e,t){try{await b.linkDocumentToIssue(e,t),O(),k("Issue linked!","success"),await Ie(e,!1)}catch(n){x("link issue",n)}}async function Nm(e,t){if(confirm("Unlink this issue from the document?"))try{await b.unlinkDocumentFromIssue(e,t),k("Issue unlinked!","success"),await Ie(e,!1)}catch(n){x("unlink issue",n)}}let Na=!1;async function qm(e,t){if(e.preventDefault(),Na)return!1;const n=document.getElementById("new-doc-comment"),s=n.value.trim();if(!s)return k("Please enter a comment","error"),!1;Na=!0;try{await b.createDocumentComment(t,s),n.value="",k("Comment added!","success"),await Ie(t,!1)}catch(i){x("add comment",i)}finally{Na=!1}return!1}async function Om(e){var n;const t=(n=A())==null?void 0:n.id;if(!t){k("No team selected","error");return}try{const s=await b.getLabels(t);if(s.length===0){document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
        <p class="empty-state-small">No labels available. Create labels in Settings.</p>
      `,U();return}const i=s.map(a=>`
      <div class="label-select-item" data-action="add-label-to-doc" data-document-id="${p(e)}" data-label-id="${p(a.id)}" style="cursor: pointer; padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <span class="badge" style="background-color: ${Y(a.color)}; color: white;">${f(a.name)}</span>
        ${a.description?`<span class="text-muted">${f(a.description)}</span>`:""}
      </div>
    `).join("");document.getElementById("modal-title").textContent="Add Label",document.getElementById("modal-content").innerHTML=`
      <div class="label-select-list">${i}</div>
    `,U()}catch(s){x("load labels",s)}}async function Hm(e,t){try{await b.addLabelToDocument(e,t),O(),k("Label added!","success"),await Ie(e,!1)}catch(n){x("add label",n)}}async function Fm(e,t){try{await b.removeLabelFromDocument(e,t),k("Label removed!","success"),await Ie(e,!1)}catch(n){x("remove label",n)}}J({"view-document":(e,t)=>{e.preventDefault(),Ie(t.documentId)},"set-doc-editor-mode":(e,t)=>{Lm(t.target,t.mode)},"retry-load-documents":()=>{Rt(ei)},"retry-document-comments":(e,t)=>{Ie(t.documentId,!1)},"toggle-doc-selection":(e,t)=>{$m(t.docId)},"clear-doc-search":()=>{dm()},"clear-doc-project-filter":()=>{um()},"clear-all-doc-filters":()=>{pm()},"show-bulk-move-modal":()=>{xm()},"bulk-delete-documents":()=>{Im()},"select-all-docs":()=>{Em()},"clear-doc-selection":()=>{jl()},"exit-selection-mode":()=>{ja()},"enter-selection-mode":()=>{Dl()},"handle-bulk-move":e=>{_m(e)},"unlink-document-issue":(e,t)=>{Nm(t.documentId,t.issueId)},"show-link-issue-modal":(e,t)=>{jm(t.documentId)},"add-document-comment":(e,t)=>{qm(e,t.documentId)},"remove-label-from-doc":(e,t)=>{Fm(t.documentId,t.labelId)},"show-add-label-to-doc-modal":(e,t)=>{Om(t.documentId)},"show-edit-document-modal":(e,t)=>{Pl(t.documentId)},"delete-document":(e,t)=>{Dm(t.documentId)},"create-document":e=>{Am(e)},"update-doc-sprint-dropdown":(e,t,n)=>{Mm(t.sprintSelect,n.value)},"update-document":(e,t)=>{Bm(e,t.documentId)},"search-issues-to-link":(e,t,n)=>{Rm(n.value,t.documentId)},"link-to-issue":(e,t)=>{Pm(t.documentId,t.issueId)},"add-label-to-doc":(e,t)=>{Hm(t.documentId,t.labelId)}});let mn=[],si={},ii=new Set,dt=null,qa=null,ai=[],Qn=[],Oa=[];function Nl(){return si}function Um(){return qa}function Gm(){return dt}Ze(e=>{e==="currentProject"&&L()==="sprints"&&fn()});let Ha=0;async function fn(){const e=z();if(!e){const s=document.getElementById("sprints-list");s&&(s.innerHTML=`
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `);return}const t=++Ha;rf();const n=document.getElementById("sprints-list");n&&(n.innerHTML=Array(3).fill(0).map(()=>`
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join(""));try{await b.getCurrentSprint(e);const s=await b.getSprints(e);if(t!==Ha)return;mn=s,zm(),await oi()}catch(s){if(t!==Ha)return;n&&(n.innerHTML=N({icon:P.sprints,heading:"Failed to load sprints",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-sprints"},variant:"error"})),x("load sprints",s)}}function zm(){const e=document.getElementById("sprints-list");if(!e)return;const t=mn.find(a=>a.status==="active"),n=mn.find(a=>a.status==="planned"),s=mn.filter(a=>a.status==="completed");let i="";if(t){const a=t.budget?`${t.points_spent||0} / ${t.budget} points`:"No budget set",o=t.budget&&(t.points_spent||0)>t.budget;i+=`
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
        `,i+=Vm(t)}if(n){const a=n.budget?`${n.budget} point budget`:"No budget set";i+=`
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${p(n.id)}" data-sprint-url="/sprint/${p(n.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${f(n.name)}</div>
                <div class="sprint-card-budget">${a}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${p(n.id)}" data-sprint-name="${p(n.name)}" data-budget="${n.budget||""}" data-project-id="${p(n.project_id)}">Edit Sprint</button>
                </div>
            </div>
        `}s.length>0&&(i+=`
            <details class="sprint-history">
                <summary>Completed Sprints (${s.length})</summary>
                <div class="sprint-history-list">
                    ${s.map(a=>`
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${p(a.id)}" data-sprint-url="/sprint/${p(a.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${f(a.name)}</span>
                            <span class="sprint-history-budget">${a.points_spent||0}${a.budget?` / ${a.budget}`:""} pts</span>
                        </div>
                    `).join("")}
                </div>
            </details>
        `),e.innerHTML=i||N({icon:P.sprints,heading:"No sprints yet",description:"Sprints are created automatically when you close the current one, or you can create one from the project settings."})}function Vm(e){const t=e.start_date&&e.end_date,n=e.budget!==null&&e.budget!==void 0;if(!t||!n)return`
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;const s=e.budget,i=e.points_spent||0,a=Math.max(s-i,0),o=new Date(e.start_date),r=new Date(e.end_date),l=((H,V,Ae)=>Math.min(Math.max(H,V),Ae))((new Date-o)/(r-o),0,1),u=360,m=120,h=16,v=h,w=u-h,_=h,S=m-h,j=H=>s===0?S:_+(1-H/s)*(S-_),B=j(s),E=j(0),D=v+(w-v)*l,I=j(a);return`
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${li(e.start_date)} → ${li(e.end_date)}</span>
                    <span>${a} of ${s} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${u} ${m}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${v}" y1="${B}" x2="${w}" y2="${E}" class="burndown-ideal" />
                <line x1="${v}" y1="${B}" x2="${D}" y2="${I}" class="burndown-actual" />
                <circle cx="${D}" cy="${I}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `}let Fa=0;async function Jn(e,t=!0){var n;try{t&&Pt();const s=++Fa,i=L(),a=await b.getSprint(e);if(s!==Fa)return;if(!a){k("Sprint not found","error"),M("sprints");return}qa=a;const o=(n=A())==null?void 0:n.id,[r,d,c]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getSprintTransactions(e).catch(l=>(console.error("Failed to load sprint transactions:",l),[])),o?b.getDocuments(o,a.project_id,null,e).catch(l=>(console.error("Failed to load sprint documents:",l),[])):[]]);if(s!==Fa)return;ai=r,Oa=d,Qn=c,L()===i&&Yt(ai),t&&history.pushState({sprintId:e,view:"sprint"},"",`/sprint/${e}`),Km()}catch(s){console.error("Failed to load sprint:",s),k("Failed to load sprint","error"),M("sprints")}}async function Wm(e){if(!e||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)){k("Invalid sprint ID","error"),M("sprints",!1);return}try{await Jn(e,!1)}catch{M("sprints",!1)}}function Km(){const e=qa,t=ai;document.querySelectorAll(".view").forEach(l=>l.classList.add("hidden"));let n=document.getElementById("sprint-detail-view");n||(n=document.createElement("div"),n.id="sprint-detail-view",n.className="view",document.querySelector(".main-content").appendChild(n)),n.classList.remove("hidden");const s=L()||"sprints",i=t.filter(l=>Zt.includes(l.status)),a=t.filter(l=>l.status==="done"),o=t.reduce((l,u)=>l+(u.estimate||0),0),r=a.reduce((l,u)=>l+(u.estimate||0),0);let d="";e.status==="active"?d='<span class="badge badge-status-active">Active</span>':e.status==="planned"?d='<span class="badge badge-status-planned">Planned</span>':e.status==="completed"&&(d='<span class="badge badge-status-completed">Completed</span>');const c=e.budget?`${e.points_spent||0} / ${e.budget} points`:`${e.points_spent||0} points spent`;n.innerHTML=`
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${p(s)}">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${f(e.name)}</h2>
                ${d}
                ${e.limbo?'<span class="badge badge-limbo">IN LIMBO</span>':""}
            </div>
            ${e.start_date&&e.end_date?`
                <div class="sprint-detail-dates">
                    ${li(e.start_date)} → ${li(e.end_date)}
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
                <h3>Open Issues (${i.length})</h3>
                ${i.length===0?N({icon:P.issues,heading:"No open issues",description:"All issues in this sprint are completed"}):`
                    <div class="sprint-issues-list">
                        ${i.map(l=>ql(l)).join("")}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${a.length>0?"open":""}>
                <summary><h3>Completed Issues (${a.length})</h3></summary>
                ${a.length===0?N({icon:P.issues,heading:"No completed issues",description:"Issues will appear here once marked done"}):`
                    <div class="sprint-issues-list">
                        ${a.map(l=>ql(l)).join("")}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${Zm()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${Qn.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${p(e.id)}"
                        data-project-id="${p(e.project_id)}">
                        + New Document
                    </button>
                </div>
                ${Qn.length>0?`
                    <div class="sprint-issues-list">
                        ${Qn.map(l=>Ym(l)).join("")}
                    </div>
                `:N({icon:P.documents,heading:"No documents yet",description:"Create a sprint document to get started"})}
            </div>
        </div>
    `}function ql(e){const n=["urgent","high","medium","low"].includes(e.priority)?e.priority:"",s=Pr.includes(e.status)?e.status:"backlog",i=n?`badge-priority-${n}`:"",a=`status-dot-${s}`;return`
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${p(e.id)}" data-issue-url="/issue/${encodeURIComponent(e.identifier)}">
            <span class="status-dot ${a}"></span>
            <span class="sprint-issue-identifier">${f(e.identifier)}</span>
            <span class="sprint-issue-title">${f(e.title)}</span>
            <span class="sprint-issue-meta">
                ${n?`<span class="badge ${i}">${df(n)}</span>`:""}
                ${e.estimate?`<span class="badge badge-estimate">${e.estimate}pt</span>`:""}
            </span>
        </div>
    `}function Ym(e){const t=f(e.icon)||"📄";return`
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${p(e.id)}" data-document-url="/document/${p(encodeURIComponent(e.id))}">
            <span class="sprint-issue-identifier">${t}</span>
            <span class="sprint-issue-title">${f(e.title||"Untitled")}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${Ye(e.created_at)}</span>
            </span>
        </div>
    `}function Zm(){const e=Oa;if(!e||e.length===0)return`
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
                            <span class="ledger-item-identifier">${f(n.issue_identifier)}</span>
                            <span class="ledger-item-title">${f(n.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${n.points} pt</span>
                            <span class="ledger-item-date">${Xm(n.created_at)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `}function Xm(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):""}function Qm(e,t,n,s){const i=s?Df(s):"";document.getElementById("modal-title").textContent=`Edit Sprint: ${t}`,document.getElementById("modal-content").innerHTML=`
        <form data-action="handle-update-budget" data-sprint-id="${p(e)}" data-project-id="${p(s)}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${p(t)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${n||""}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${i?`<small class="form-hint">${f(i)}</small>`:""}
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
    `,U()}async function Jm(e,t,n){var r,d,c;e.preventDefault();const s=(d=(r=document.getElementById("sprint-name"))==null?void 0:r.value)==null?void 0:d.trim(),i=document.getElementById("sprint-budget").value,a=i?parseInt(i):null,o=((c=document.querySelector('input[name="budget-scope"]:checked'))==null?void 0:c.value)||"this";try{const l={budget:a};if(s&&(l.name=s),await b.updateSprint(t,l),o==="planned"||o==="default"){const m=mn.filter(h=>h.status==="planned"&&h.id!==t);for(const h of m)await b.updateSprint(h.id,{budget:a})}o==="default"&&n&&await b.updateProject(n,{default_sprint_budget:a}),await fn(),O(),k(`Budget updated${o==="planned"?" (and planned sprints)":o==="default"?" (and set as project default)":""}!`,"success")}catch(l){x("update budget",l)}return!1}async function ef(e){const t=mn.find(d=>d.id===e);if(!t)return;document.getElementById("modal-title").textContent="Close Sprint",document.getElementById("modal-content").innerHTML=`
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `,U();const n=Zt;let s=0,i=!1,a=!1;try{const[d,c]=await Promise.all([b.getIssues({sprint_id:e,limit:500}),b.getRituals(t.project_id)]);s=d.filter(l=>n.includes(l.status)).length,i=c.some(l=>l.is_active&&l.trigger==="every_sprint")}catch(d){console.error("Failed to load sprint details:",d),a=!0}const o=t.points_spent||0,r=t.budget!==null&&t.budget!==void 0?`<strong>${o}</strong> / <strong>${t.budget}</strong> points spent`:`<strong>${o}</strong> points spent (no budget)`;document.getElementById("modal-content").innerHTML=`
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${f(t.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${r}</p>
                ${a?'<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>':s>0?`<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${s}</strong> incomplete issue${s===1?"":"s"} will migrate to next sprint</p>`:'<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>'}
                ${i?'<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>':""}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${p(e)}">Close Sprint</button>
            </div>
        </div>
    `}async function tf(e){try{const t=await b.closeSprint(e);await fn(),Fl(),t.limbo?sf(t):k("Sprint completed!","success")}catch(t){x("complete sprint",t)}}async function oi(){const e=z();if(e)try{dt=await b.getLimboStatus(e),nf()}catch(t){console.error("Failed to load limbo status:",t)}}function nf(){const e=document.getElementById("limbo-banner");if(e&&e.remove(),!dt||!dt.in_limbo)return;const t=document.createElement("div");t.id="limbo-banner",t.className="limbo-banner",t.innerHTML=`
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${dt.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;const n=document.querySelector(".main-content");n&&n.insertBefore(t,n.firstChild)}function sf(e){const t=z();document.getElementById("modal-title").textContent="Sprint In Limbo",document.getElementById("modal-content").innerHTML=`
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
    `,U(),af(t)}async function af(e){try{const t=await b.getLimboStatus(e),n=document.getElementById("limbo-rituals-list");if(!n)return;if(t.pending_rituals.length===0){n.innerHTML="<p>No pending rituals.</p>";return}n.innerHTML=t.pending_rituals.map(s=>`
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${s.attestation?s.attestation.approved_at?'<span class="ritual-done">✓</span>':'<span class="ritual-pending">⏳</span>':'<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${f(s.name)} <span class="ritual-mode">(${f(s.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${et(s.prompt)}</div>
                    ${Ga(s.attestation)}
                </div>
            </div>
        `).join("")}catch(t){console.error("Failed to load limbo rituals:",t)}}function Ua(){var t,n;if(!dt)return;const e=z();document.getElementById("modal-title").textContent="Limbo Status",(t=document.querySelector(".modal"))==null||t.classList.add("modal-wide"),document.getElementById("modal-content").innerHTML=`
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${dt.pending_rituals.map(s=>`
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${s.attestation?s.attestation.approved_at?"✓":"⏳":"○"}
                            </span>
                            <strong>${f(s.name)}</strong>
                            <span class="badge badge-ritual-${p(s.approval_mode)}">${f(s.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${et(s.prompt)}</div>
                        ${Ga(s.attestation)}
                        ${of(s,e)}
                    </div>
                `).join("")}
            </div>
            ${((n=dt.completed_rituals)==null?void 0:n.length)>0?`
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${dt.completed_rituals.map(s=>`
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">✓ ${f(s.name)}</div>
                            ${Ga(s.attestation)}
                        </div>
                    `).join("")}
                </div>
            `:""}
        </div>
    `,U()}function Ga(e){return!e||!e.note?"":`
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${f(e.attested_by_name||"Unknown")}</span>
                ${e.attested_at?`<span class="attestation-time">${f(Ye(e.attested_at))}</span>`:""}
            </div>
            <div class="attestation-note-content markdown-body">${et(e.note)}</div>
        </div>
    `}function of(e,t){return e.attestation&&e.attestation.approved_at?'<div class="ritual-actions"><span class="text-success">Completed</span></div>':e.attestation&&!e.attestation.approved_at?`
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}">Approve</button>
            </div>
        `:e.approval_mode==="gate"?`
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${p(e.id)}" data-project-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>
            </div>
        `:'<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>'}async function Ol(e){for(const t of e)if(!ii.has(t))try{(await b.getSprints(t)).forEach(s=>{si[s.id]=s}),ii.add(t)}catch(n){console.error("Failed to load sprints for project",t,n)}}function rf(){si={},ii=new Set,ai=[],Oa=[],Qn=[],ri={}}function lf(e,t){t.forEach(n=>{si[n.id]=n}),ii.add(e)}let ri={};function cf(e){return ri[e]}function Hl(e,t){ri[e]=t??null}function Fl(){ri={}}J({"retry-load-sprints":()=>fn(),"view-sprint":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.sprintUrl,"_blank");return}Jn(t.sprintId)},"stop-propagation":()=>{},"show-edit-budget-modal":(e,t)=>{const n=t.budget?parseFloat(t.budget):null;Qm(t.sprintId,t.sprintName,n,t.projectId)},"show-limbo-details-modal":()=>{Ua()},"show-close-sprint-confirmation":(e,t)=>{ef(t.sprintId)},"handle-update-budget":(e,t)=>{Jm(e,t.sprintId,t.projectId)},"close-modal":()=>{O()},"confirm-close-sprint":(e,t,n)=>{n.disabled=!0,O(),tf(t.sprintId)},"dismiss-limbo-modal":()=>{O(),oi()},"approve-ritual":(e,t)=>{ff(t.ritualId,t.projectId)},"complete-gate-ritual":(e,t)=>{Gl(t.ritualId,t.projectId,t.ritualName)},"navigate-sprint-issue":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.issueUrl,"_blank");return}K(t.issueId)},"create-sprint-document":async(e,t)=>{await Cm(t.sprintId,t.projectId,()=>{Jn(t.sprintId,!1)})},"navigate-sprint-document":(e,t)=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1){window.open(t.documentUrl,"_blank");return}Ie(t.documentId)}});function li(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"}):""}function df(e){return{urgent:"Urgent",high:"High",medium:"Medium",low:"Low"}[e]||e}Ze(e=>{e==="currentProject"&&L()==="rituals"&&za()});let Ul=0;async function za(){const e=z(),t=document.getElementById("rituals-content"),n=++Ul;if(!e){const i=document.getElementById("rituals-tabs");i&&i.classList.add("hidden"),t&&(t.innerHTML=N({icon:P.projects,heading:"Select a project",description:"Choose a project to view and manage its rituals"}));return}Of(e),t&&(t.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join(""));const s=await ns();n===Ul&&!s&&t&&(t.innerHTML=N({icon:P.rituals,heading:"Failed to load rituals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-rituals"},variant:"error"}))}async function uf(){Ql(pf),za()}function pf(){const e=document.getElementById("rituals-content"),t=Hf(),n=t.filter(a=>!a.trigger||a.trigger==="every_sprint"),s=t.filter(a=>a.trigger==="ticket_close"),i=t.filter(a=>a.trigger==="ticket_claim");document.getElementById("rituals-tabs").classList.remove("hidden"),e.innerHTML=`
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
    `,hn("rv-sprint-rituals-list",n,"sprint"),hn("rv-close-rituals-list",s,"close"),hn("rv-claim-rituals-list",i,"claim")}function mf(e){const t=document.getElementById("rituals-tabs");t.querySelectorAll(".settings-tab").forEach(n=>n.classList.remove("active")),t.querySelector(`[data-tab="${e}"]`).classList.add("active"),document.querySelectorAll("#rituals-content > .settings-tab-content").forEach(n=>n.classList.add("hidden")),document.getElementById(`rituals-tab-${e}`).classList.remove("hidden")}async function ff(e,t){try{await b.approveAttestation(e,t),k("Ritual approved!","success"),await oi(),Ua()}catch(n){x("approve ritual",n)}}async function Gl(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-gate-ritual-form").addEventListener("submit",s=>{gf(s,e,t)}),U()}async function gf(e,t,n){e.preventDefault();const s=document.getElementById("gate-note").value;try{await b.completeGateRitual(t,n,s||null),k("Ritual completed!","success"),await oi();const i=Gm();i&&!i.in_limbo?(O(),k("Limbo cleared! Next sprint is now active.","success")):Ua()}catch(i){x("complete gate ritual",i)}return!1}function hf(e,t){return e.attestation&&e.attestation.approved_at?'<span class="text-success">Completed</span>':e.attestation&&!e.attestation.approved_at?`
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Approve</button>
        `:e.approval_mode==="gate"?`<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}">Complete</button>`:e.note_required?`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}" data-ritual-name="${p(e.name)}" data-ritual-prompt="${p(e.prompt||"")}">Attest</button>`:`<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${p(e.id)}" data-issue-id="${p(t)}">Attest</button>`}function vf(e,t,n,s){document.getElementById("modal-title").textContent=`Attest: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="attest-ticket-ritual-form">
            ${s?`<p class="ritual-prompt-hint">${f(s)}</p>`:""}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `,document.getElementById("attest-ticket-ritual-form").addEventListener("submit",i=>{bf(i,e,t)}),U()}async function bf(e,t,n){e.preventDefault();const s=document.getElementById("attest-ritual-note").value.trim();if(!s)return k("A note is required for this attestation.","error"),!1;try{await b.attestTicketRitual(t,n,s),k("Ritual attested!","success"),O(),await Xs(n)}catch(i){x("attest ticket ritual",i)}return!1}async function yf(e,t){try{await b.attestTicketRitual(e,t),k("Ritual attested!","success"),await Xs(t)}catch(n){x("attest ticket ritual",n)}}async function wf(e,t){try{await b.approveTicketRitual(e,t),k("Ritual approved!","success"),await Xs(t)}catch(n){x("approve ticket ritual",n)}}function kf(e,t,n){document.getElementById("modal-title").textContent=`Complete: ${n}`,document.getElementById("modal-content").innerHTML=`
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `,document.getElementById("complete-ticket-ritual-form").addEventListener("submit",s=>{$f(s,e,t)}),U()}async function $f(e,t,n){e.preventDefault();const s=document.getElementById("ticket-ritual-note").value;try{await b.completeTicketGateRitual(t,n,s||null),k("Ritual completed!","success"),O(),await Xs(n)}catch(i){x("complete ticket ritual",i)}return!1}J({"show-create-ritual-modal":(e,t)=>{sc(t.trigger)},"approve-ticket-ritual":(e,t)=>{wf(t.ritualId,t.issueId)},"complete-ticket-ritual":(e,t)=>{kf(t.ritualId,t.issueId,t.ritualName)},"attest-ticket-ritual-modal":(e,t)=>{vf(t.ritualId,t.issueId,t.ritualName,t.ritualPrompt)},"attest-ticket-ritual":(e,t)=>{yf(t.ritualId,t.issueId)},"retry-load-rituals":()=>za()});function et(e){if(!e)return"";try{F.setOptions({breaks:!0,gfm:!0});const n=F.parse(e).replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,s=>s.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return yr.sanitize(n,{FORCE_BODY:!0})}catch(t){return console.error("Markdown parsing error:",t),e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}}function Va(e){if(!e)return"";const t=new Date(e);if(isNaN(t.getTime()))return"";const s=new Date-t;if(s<0)return"just now";const i=Math.floor(s/1e3),a=Math.floor(i/60),o=Math.floor(a/60),r=Math.floor(o/24);return i<60?"just now":a<60?`${a}m ago`:o<24?`${o}h ago`:r===1?"yesterday":r<7?`${r}d ago`:t.toLocaleDateString()}function Ef(e,t,n,s,i,a,o,r){var d;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Requested by <strong>${f(o)}</strong>${r?` ${Va(r)}`:""}</div>`:""}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `,document.getElementById("gate-approval-form").addEventListener("submit",c=>{xf(c,e,t,n)}),U(),(d=document.querySelector(".modal"))==null||d.classList.add("modal-wide")}async function xf(e,t,n,s){e.preventDefault();const i=document.getElementById("gate-approval-note").value;try{await b.completeTicketGateRitual(t,n,i||null),k(`GATE ritual "${s}" approved!`,"success"),O(),xt()}catch(a){x("complete gate ritual",a)}}function _f(e,t,n,s,i,a,o,r){Ef(e,t,n,s,i,a,o,r)}function If(e,t,n,s,i,a,o,r,d){var c;document.getElementById("modal-title").textContent=`Approve: ${n}`,document.getElementById("modal-content").innerHTML=`
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${f(i)}</span>
                    <span class="gate-approval-issue-title">${f(a)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(i)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${p(t)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${f(s)}</div>
                ${o?`<div class="gate-approval-requested">Attested by <strong>${f(o)}</strong>${r?` ${Va(r)}`:""}</div>`:""}
                ${d?`<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${et(d)}</div>`:""}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `,document.getElementById("review-approval-form").addEventListener("submit",l=>{Tf(l,e,t,n)}),U(),(c=document.querySelector(".modal"))==null||c.classList.add("modal-wide")}async function Tf(e,t,n,s){var a,o;e.preventDefault();const i=(o=(a=document.getElementById("review-approval-comment"))==null?void 0:a.value)==null?void 0:o.trim();try{if(await b.approveTicketRitual(t,n),i)try{await b.createComment(n,i)}catch(r){console.error("Failed to post approval comment:",r)}k(`Review ritual "${s}" approved!`,"success"),O(),xt()}catch(r){x("approve review ritual",r)}}function Sf(e,t,n,s,i,a,o,r,d){If(e,t,n,s,i,a,o,r,d)}Ze(e=>{e==="currentProject"&&L()==="approvals"&&xt()});let Wa=[],Ka=0;async function xt(){if(!A())return;const e=document.getElementById("approvals-list");if(!e)return;const t=++Ka;e.innerHTML=Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join("");try{const n=z(),s=n?Q().filter(r=>r.id===n):Q(),i=await Promise.all(s.map(async r=>{const[d,c]=await Promise.all([b.getPendingApprovals(r.id),b.getLimboStatus(r.id)]);return{project:r,approvals:d,limbo:c}}));if(t!==Ka)return;const a=[],o=[];for(const{project:r,approvals:d,limbo:c}of i)if(a.push(...d),c&&c.in_limbo){const l=(c.pending_rituals||[]).filter(u=>{var m;return(m=u.attestation)!=null&&m.approved_at?!1:u.approval_mode==="gate"||!!u.attestation});l.length>0&&o.push({project:r,rituals:l})}Au(a),Wa=o,zl()}catch(n){if(t!==Ka)return;e.innerHTML=N({icon:P.issues,heading:"Failed to load approvals",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-approvals"},variant:"error"}),x("load approvals",n)}}function zl(){const e=document.getElementById("approvals-list");if(!e)return;const t=Cu(),n=Wa.length>0,s=!wu();if(t.length===0&&!n){s?e.innerHTML=`
                <div class="empty-state approvals-explainer">
                    <div class="empty-state-icon">${P.issues}</div>
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
            `:e.innerHTML=N({icon:P.issues,heading:"No pending approvals",description:"All rituals have been completed. Nice work!"});return}let i="";n&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${Wa.map(({project:l,rituals:u})=>`
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${f(l.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${u.map(m=>{const h=m.attestation&&!m.attestation.approved_at,v=h?"⏳":"○",w=h?`<span class="gate-waiting-info">Attested by <strong>${f(m.attestation.attested_by_name||"Unknown")}</strong></span>`:m.approval_mode==="gate"?"":'<span class="text-muted">Awaiting agent attestation</span>',_=h?`<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${p(m.id)}"
                                            data-project-id="${p(l.id)}">Approve</button>`:m.approval_mode==="gate"?`<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${p(m.id)}"
                                                data-project-id="${p(l.id)}"
                                                data-ritual-name="${p(m.name)}">Complete</button>`:"";return`
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${v} ${f(m.name)}
                                                    <span class="badge badge-ritual-${p(m.approval_mode)}">${f(m.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${f(m.prompt)}</span>
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
        `);const a=l=>l.pending_approvals||[],o=l=>u=>{const m=a(u).filter(l);return m.length>0?{...u,_filteredApprovals:m}:null},r=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="claim")).filter(Boolean),d=t.map(o(l=>l.approval_mode==="gate"&&l.limbo_type==="close")).filter(Boolean),c=t.map(o(l=>l.approval_mode==="review")).filter(Boolean);r.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${r.map(Ya).join("")}
                </div>
            </div>
        `),d.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${d.map(Ya).join("")}
                </div>
            </div>
        `),c.length>0&&(i+=`
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${c.map(Ya).join("")}
                </div>
            </div>
        `),e.innerHTML=i,e.querySelectorAll(".gate-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;_f(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt)})}),e.querySelectorAll(".review-quick-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{var h;l.disabled=!0;const u=(h=l.closest(".gate-ritual-actions"))==null?void 0:h.querySelector(".review-approve-btn");u&&(u.disabled=!0);const m=l.dataset;try{await b.approveTicketRitual(m.ritualId,m.issueId),k(`Review ritual "${m.ritualName}" approved!`,"success"),await xt()}catch(v){l.disabled=!1,u&&(u.disabled=!1),x("approve review ritual",v)}})}),e.querySelectorAll(".review-approve-btn").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset;Sf(u.ritualId,u.issueId,u.ritualName,u.ritualPrompt,u.issueIdentifier,u.issueTitle,u.requestedBy,u.requestedAt,u.attestationNote)})}),e.querySelectorAll(".sprint-approve-btn").forEach(l=>{l.addEventListener("click",async()=>{l.disabled=!0;try{await b.approveAttestation(l.dataset.ritualId,l.dataset.projectId),k("Sprint ritual approved!","success"),await xt()}catch(u){l.disabled=!1,x("approve sprint ritual",u)}})}),e.querySelectorAll(".sprint-complete-btn").forEach(l=>{l.addEventListener("click",()=>{Gl(l.dataset.ritualId,l.dataset.projectId,l.dataset.ritualName)})})}function Lf(){ku(),zl()}function Ya(e){const n=(e._filteredApprovals||e.pending_approvals||[]).map(s=>{const i=s.approval_mode==="review",a=i?"Attested by":"Waiting",o=s.requested_by_name?`<span class="gate-waiting-info">${a}: <strong>${f(s.requested_by_name)}</strong>${s.requested_at?` (${Va(s.requested_at)})`:""}</span>`:"",r=i&&s.attestation_note?`<div class="gate-attestation-note">${et(s.attestation_note)}</div>`:"",d=i?'<span class="badge badge-review">review</span>':'<span class="badge badge-gate">gate</span>',c=i?`<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${p(s.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(s.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${p(s.ritual_id)}"
                        data-issue-id="${p(e.issue_id)}"
                        data-ritual-name="${p(s.ritual_name)}"
                        data-ritual-prompt="${p(s.ritual_prompt)}"
                        data-issue-identifier="${p(e.identifier)}"
                        data-issue-title="${p(e.title)}"
                        data-requested-by="${p(s.requested_by_name||"")}"
                        data-requested-at="${p(s.requested_at||"")}"
                        data-attestation-note="${p(s.attestation_note||"")}">Comment &amp; Approve</button>
                </div>`:`<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${p(s.ritual_id)}"
                    data-issue-id="${p(e.issue_id)}"
                    data-ritual-name="${p(s.ritual_name)}"
                    data-ritual-prompt="${p(s.ritual_prompt)}"
                    data-issue-identifier="${p(e.identifier)}"
                    data-issue-title="${p(e.title)}"
                    data-requested-by="${p(s.requested_by_name||"")}"
                    data-requested-at="${p(s.requested_at||"")}">Complete</button>`;return`
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${f(s.ritual_name)} ${d}</span>
                    <span class="gate-ritual-prompt">${f(s.ritual_prompt)}</span>
                    ${o}
                    ${r}
                </div>
                ${c}
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
    `}J({"view-issue-from-modal":(e,t)=>{e.preventDefault(),O(),K(t.issueId)},"dismiss-approvals-explainer":()=>{Lf()},"retry-load-approvals":()=>xt()});const ci={estimate:["gte","lte","eq","isnull"],priority:["eq","in","isnull"],issue_type:["eq","in","isnull"],status:["eq","in","isnull"],labels:["contains","isnull"]},di={eq:"equals",in:"in (comma-separated)",gte:">=",lte:"<=",contains:"contains",isnull:"is empty"};let Vl=0;function Wl(e){Vl=0;let t="";if(e&&typeof e=="object")for(const[n,s]of Object.entries(e)){const[i,a]=n.split("__");t+=Kl(i,a,s)}return`
        <div class="form-group">
            <label>Conditions (optional)</label>
            <div id="condition-rows">
                ${t}
            </div>
            <button type="button" class="btn btn-secondary btn-small" data-action="add-condition-row">+ Add Condition</button>
            <p class="form-help">Filter which tickets this ritual applies to.</p>
            <p id="condition-error" class="form-error" style="display: none; color: #e53e3e;"></p>
        </div>
    `}function Kl(e="",t="",n=""){const s=Vl++,i=Object.keys(ci).map(c=>`<option value="${c}" ${c===e?"selected":""}>${c}</option>`).join(""),o=(e?ci[e]:ci.estimate).map(c=>`<option value="${c}" ${c===t?"selected":""}>${di[c]}</option>`).join(""),r=n===!0?"":Array.isArray(n)?n.join(","):n??"",d=t==="isnull";return`
        <div class="condition-row" id="condition-row-${s}">
            <select class="condition-field" data-action="update-operator-options" data-row-id="${s}">
                <option value="">Select field...</option>
                ${i}
            </select>
            <select class="condition-operator" id="condition-operator-${s}" data-action="toggle-value-input" data-row-id="${s}">
                ${o}
            </select>
            <input type="text" class="condition-value" id="condition-value-${s}" value="${p(String(r))}" placeholder="Value"${d?' style="display: none;"':""}>
            <button type="button" class="btn btn-secondary btn-small" data-action="remove-condition-row" data-row-id="${s}">&times;</button>
        </div>
    `}function Cf(){const e=document.getElementById("condition-rows");e&&e.insertAdjacentHTML("beforeend",Kl()),ui()}function Af(e){const t=document.getElementById(`condition-row-${e}`);t&&t.remove(),ui()}function Bf(e){const t=document.getElementById(`condition-row-${e}`);if(!t)return;const n=t.querySelector(".condition-field"),s=t.querySelector(".condition-operator"),i=n.value;if(!i)return;const a=ci[i]||[];s.innerHTML=a.map(o=>`<option value="${o}">${di[o]}</option>`).join(""),Yl(e),ui()}function Yl(e){const t=document.getElementById(`condition-operator-${e}`),n=document.getElementById(`condition-value-${e}`);t&&n&&(n.style.display=t.value==="isnull"?"none":"")}function es(e){const t=document.getElementById("condition-error");t&&(t.textContent=e,t.style.display="block")}function ui(){const e=document.getElementById("condition-error");e&&(e.style.display="none")}function Zl(){var s,i,a;const e=document.querySelectorAll(".condition-row"),t={},n=new Set;for(const o of e){const r=(s=o.querySelector(".condition-field"))==null?void 0:s.value,d=(i=o.querySelector(".condition-operator"))==null?void 0:i.value,c=o.querySelector(".condition-value");let l=(a=c==null?void 0:c.value)==null?void 0:a.trim();if(!r&&!d)continue;if(!r)throw es("Please select a field for all condition rows, or remove empty rows."),new Error("Incomplete condition row: missing field");if(!d)throw es("Please select an operator for all condition rows."),new Error("Incomplete condition row: missing operator");const u=`${r}__${d}`;if(n.has(u))throw es(`Duplicate condition: ${r} ${di[d]}. Each field+operator combination can only be used once.`),new Error(`Duplicate condition key: ${u}`);if(n.add(u),d==="isnull")t[u]=!0;else if(d==="in"||d==="contains")t[u]=l?l.split(",").map(m=>m.trim()).filter(m=>m):[];else if(d==="gte"||d==="lte"){if(!l)throw es(`Please enter a numeric value for ${r} ${di[d]}.`),new Error(`Missing numeric value for ${u}`);const m=parseInt(l,10);if(isNaN(m))throw es(`Invalid number "${l}" for ${r}. Please enter a valid integer.`),new Error(`Invalid numeric value for ${u}: ${l}`);t[u]=m}else t[u]=l}return ui(),Object.keys(t).length>0?t:null}J({"add-condition-row":()=>{Cf()},"remove-condition-row":(e,t)=>{Af(Number(t.rowId))},"update-operator-options":(e,t)=>{Bf(Number(t.rowId))},"toggle-value-input":(e,t)=>{Yl(Number(t.rowId))}});let re=[],Za=null;const Xl=["project-filter","board-project-filter","sprint-project-filter","epics-project-filter","doc-project-filter","dashboard-project-filter","rituals-project-filter","approvals-project-filter"];Ze((e,t)=>{e==="currentProject"&&(t&&cu(t),Xl.forEach(n=>{const s=document.getElementById(n);s&&(s.value=t||"")}),Xf(t||""))});const pi={fibonacci:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:5,label:"5 points"},{value:8,label:"8 points"},{value:13,label:"13 points"},{value:21,label:"21 points"}],linear:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:3,label:"3 points"},{value:4,label:"4 points"},{value:5,label:"5 points"},{value:6,label:"6 points"},{value:7,label:"7 points"},{value:8,label:"8 points"},{value:9,label:"9 points"},{value:10,label:"10 points"}],powers_of_2:[{value:null,label:"No estimate"},{value:1,label:"1 point"},{value:2,label:"2 points"},{value:4,label:"4 points"},{value:8,label:"8 points"},{value:16,label:"16 points"},{value:32,label:"32 points"},{value:64,label:"64 points"}],tshirt:[{value:null,label:"No estimate"},{value:1,label:"XS"},{value:2,label:"S"},{value:3,label:"M"},{value:5,label:"L"},{value:8,label:"XL"}]};function Ql(e){Za=e}function Q(){return re}function gn(e){const t=re.find(s=>s.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci";return pi[n]||pi.fibonacci}function mi(e,t){if(!e)return"No estimate";const s=gn(t).find(i=>i.value===e);return s?s.label:`${e} points`}function Xa(e,t){return e?!gn(t).some(s=>s.value===e):!1}function Df(e){const t=re.find(o=>o.id===e),n=(t==null?void 0:t.estimate_scale)||"fibonacci",s=(pi[n]||pi.fibonacci).filter(o=>o.value!==null);if(n==="tshirt")return`This project uses t-shirt estimates (${s.map(r=>`${r.label}=${r.value}pt`).join(", ")}). Budget is in points.`;const i=s.map(o=>o.value).join(", ");return`${{fibonacci:"Fibonacci",linear:"Linear",powers_of_2:"Powers of 2"}[n]||n} scale: ${i}`}async function Fe(){if(A())try{re=await b.getProjects(A().id),Mf();const e=z();if(e&&re.some(s=>s.id===e))return;const t=Qa();if(t&&re.some(s=>s.id===t)){Oe(t);return}const n=wr();if(n&&re.some(s=>s.id===n)){Oe(n);return}re.length>0&&Oe(re[0].id)}catch(e){x("load projects",e)}}function Mf(){const e='<option value="">All Projects</option>'+re.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),t='<option value="">Select Project</option>'+re.map(a=>`<option value="${a.id}">${f(a.name)}</option>`).join(""),n=["project-filter","doc-project-filter","dashboard-project-filter","epics-project-filter","approvals-project-filter"],s=["board-project-filter","sprint-project-filter","rituals-project-filter"];n.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=e)}),s.forEach(a=>{const o=document.getElementById(a);o&&(o.innerHTML=t)});const i=z();Xl.forEach(a=>{const o=document.getElementById(a);o&&(o.value=i||"")})}function Jl(){return wr()}function ts(){const e=document.getElementById("projects-list");if(re.length===0){e.innerHTML=N({icon:P.projects,heading:"No projects yet",description:"Create your first project to get started",cta:{label:"Create project",action:"showCreateProjectModal"}});return}e.innerHTML=re.map(t=>`
        <div class="grid-item" data-action="view-project" data-project-id="${p(t.id)}">
            <div class="grid-item-header">
                <div class="grid-item-icon" style="background: ${Y(t.color)}20; color: ${Y(t.color)}">
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
    `).join("")}function jf(e){Oe(e),M("issues")}function ec(){document.getElementById("modal-title").textContent="Create Project",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function Rf(e){e.preventDefault();const t={name:document.getElementById("project-name").value,key:document.getElementById("project-key").value.toUpperCase(),description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.createProject(A().id,t),await Fe(),ts(),O(),k("Project created!","success")}catch(n){x("create project",n)}return!1}async function Pf(e,t){e.preventDefault();const n={name:document.getElementById("project-name").value,description:document.getElementById("project-description").value,color:document.getElementById("project-color").value,estimate_scale:document.getElementById("project-estimate-scale").value,human_rituals_required:document.getElementById("project-human-rituals-required").checked};try{await b.updateProject(t,n),await Fe(),ts(),O(),k("Project updated!","success")}catch(s){x("update project",s)}return!1}async function Nf(e){const t=re.find(n=>n.id===e);if(t&&confirm(`Are you sure you want to delete "${t.name}"? This will delete all issues in this project.`))try{await b.deleteProject(e),await Fe(),ts(),O(),k("Project deleted","success")}catch(n){x("delete project",n)}}let Te=null;async function tc(e){Te=e,re.length===0&&await Fe();const t=re.find(n=>n.id===e);if(!t){k("Project not found","error"),M("projects");return}document.getElementById("project-settings-title").textContent=`${t.name} Settings`,document.getElementById("ps-name").value=t.name||"",document.getElementById("ps-key").value=t.key||"",document.getElementById("ps-description").value=t.description||"",document.getElementById("ps-color").value=t.color||"#6366f1",document.getElementById("ps-estimate-scale").value=t.estimate_scale||"fibonacci",document.getElementById("ps-default-sprint-budget").value=t.default_sprint_budget||"",document.getElementById("ps-unestimated-handling").value=t.unestimated_handling||"default_one_point",document.getElementById("ps-human-rituals-required").checked=t.human_rituals_required===!0,document.getElementById("ps-require-estimate-on-claim").checked=t.require_estimate_on_claim===!0,document.querySelectorAll(".view").forEach(n=>n.classList.add("hidden")),document.getElementById("project-settings-view").classList.remove("hidden"),nc("general"),window.history.pushState({},"",`/projects/${encodeURIComponent(e)}/settings`)}function nc(e){["general","rules","sprint-rituals","close-rituals","claim-rituals"].includes(e)||(e="general"),document.querySelectorAll(".settings-tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)}),document.querySelectorAll(".settings-tab-content").forEach(s=>{s.classList.add("hidden")});const n=document.getElementById(`project-settings-tab-${e}`);n&&n.classList.remove("hidden"),e.endsWith("-rituals")&&(!ut||ut.length===0)&&ns()}function qf(){Te=null,ut=[]}function Of(e){Te=e}function Hf(){return ut}async function Ff(){if(!Te)return;const e=document.getElementById("ps-name").value.trim();if(!e){k("Project name is required","error");return}const t={name:e,description:document.getElementById("ps-description").value,color:document.getElementById("ps-color").value};try{await b.updateProject(Te,t),await Fe(),k("Settings saved","success");const n=re.find(s=>s.id===Te);n&&(document.getElementById("project-settings-title").textContent=`${n.name} Settings`)}catch(n){x("save project settings",n)}}async function Uf(){if(!Te)return;const e=document.getElementById("ps-default-sprint-budget").value,t=e?parseInt(e):null,n={estimate_scale:document.getElementById("ps-estimate-scale").value,default_sprint_budget:t,unestimated_handling:document.getElementById("ps-unestimated-handling").value,human_rituals_required:document.getElementById("ps-human-rituals-required").checked,require_estimate_on_claim:document.getElementById("ps-require-estimate-on-claim").checked};try{await b.updateProject(Te,n),await Fe(),k("Settings saved","success")}catch(s){x("save settings",s)}}let ut=[];async function ns(){if(!Te)return!1;try{return ut=await b.getRituals(Te),Gf(),typeof Za=="function"&&Za(),!0}catch(e){return x("load rituals",e),!1}}function Gf(){if(!document.getElementById("ps-sprint-rituals-list"))return;const e=ut.filter(s=>!s.trigger||s.trigger==="every_sprint"),t=ut.filter(s=>s.trigger==="ticket_close"),n=ut.filter(s=>s.trigger==="ticket_claim");hn("ps-sprint-rituals-list",e,"sprint"),hn("ps-close-rituals-list",t,"close"),hn("ps-claim-rituals-list",n,"claim")}function hn(e,t,n){const s=document.getElementById(e);if(!s)return;if(t.length===0){const a={sprint:"sprint close",close:"ticket close",claim:"ticket claim"};s.innerHTML=`<p class="empty-state">No ${a[n]} rituals configured.</p>`;return}const i=a=>p(a||"auto");s.innerHTML=t.map(a=>{let o="";if(a.group_name){const r=a.weight!=null&&a.weight!==1?` w:${a.weight}`:a.percentage!=null?` ${a.percentage}%`:"";o=`<span class="badge badge-ritual-group">${f(a.group_name)}${r}</span>`}return`
    <div class="ritual-item mode-${i(a.approval_mode)}">
      <div class="ritual-item-info">
        <div class="ritual-item-name">${f(a.name)}</div>
        <div class="ritual-item-prompt-fade">
          <div class="ritual-item-prompt markdown-body">${et(a.prompt)}</div>
        </div>
        <div class="ritual-item-mode">
          <span class="badge badge-ritual-${i(a.approval_mode)}">${f(a.approval_mode||"auto")}</span>
          ${o}
          ${!a.group_name&&a.approval_mode==="auto"?"Agent clears immediately":""}
          ${!a.group_name&&a.approval_mode==="review"?"Requires human approval":""}
          ${!a.group_name&&a.approval_mode==="gate"?"Human only":""}
          ${a.note_required===!1?'<span class="badge badge-no-note">no note</span>':""}
        </div>
      </div>
      <div class="ritual-item-actions">
        <button class="btn btn-secondary btn-small" data-action="edit-project-ritual" data-ritual-id="${p(a.id)}">Edit</button>
        <button class="btn btn-danger btn-small" data-action="delete-project-ritual" data-ritual-id="${p(a.id)}" data-ritual-name="${p(a.name)}">Delete</button>
      </div>
    </div>
  `}).join("")}async function sc(e){if(!Te)return;let t=[];try{t=await b.getRitualGroups(Te)}catch{}document.getElementById("modal-title").textContent="Create Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Wl(null)}
      </div>
      <button type="submit" class="btn btn-primary">Create Ritual</button>
    </form>
  `,U()}function zf(){var n;const e=(n=document.getElementById("ritual-trigger"))==null?void 0:n.value,t=document.getElementById("ritual-conditions-section");t&&(t.style.display=e==="every_sprint"?"none":"")}function Vf(){const e=document.getElementById("ritual-group"),t=document.getElementById("ritual-group-create-inline"),n=document.getElementById("ritual-weight-group"),s=document.getElementById("ritual-percentage-group");if(e.value==="__create__")t.classList.remove("hidden"),n.classList.add("hidden"),s.classList.add("hidden");else if(t.classList.add("hidden"),e.value){const a=e.options[e.selectedIndex].dataset.mode;n.classList.toggle("hidden",a!=="random_one"),s.classList.toggle("hidden",a!=="percentage")}else n.classList.add("hidden"),s.classList.add("hidden")}async function ic(){const e=document.getElementById("ritual-group");if(e.value==="__create__"){const t=document.getElementById("ritual-new-group-name").value.trim();if(!t)throw k("Group name is required","error"),new Error("Group name required");const n=document.getElementById("ritual-new-group-mode").value;return(await b.createRitualGroup(Te,{name:t,selection_mode:n})).id}return e.value||null}async function Wf(e){e.preventDefault();let t;try{t=Zl()}catch{return!1}let n;try{n=await ic()}catch{return!1}const s={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:t};if(n){s.group_id=n;const i=document.getElementById("ritual-weight"),a=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&i.value&&(s.weight=parseFloat(i.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&a.value&&(s.percentage=parseFloat(a.value))}try{await b.createRitual(Te,s),await ns(),O(),k("Ritual created!","success")}catch(i){x("create ritual",i)}return!1}async function Kf(e){const t=ut.find(o=>o.id===e);if(!t)return;let n=[];try{n=await b.getRitualGroups(Te)}catch{}const s=n.find(o=>o.id===t.group_id),i=s&&s.selection_mode==="random_one",a=s&&s.selection_mode==="percentage";document.getElementById("modal-title").textContent="Edit Ritual",document.getElementById("modal-content").innerHTML=`
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
        ${Wl(t.conditions)}
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  `,U()}async function Yf(e,t){e.preventDefault();let n;try{n=Zl()}catch{return!1}let s;try{s=await ic()}catch{return!1}const i={name:document.getElementById("ritual-name").value,prompt:document.getElementById("ritual-prompt").value,trigger:document.getElementById("ritual-trigger").value,approval_mode:document.getElementById("ritual-mode").value,note_required:document.getElementById("ritual-note-required").checked,conditions:n,group_id:s||""};if(s){const a=document.getElementById("ritual-weight"),o=document.getElementById("ritual-percentage");!document.getElementById("ritual-weight-group").classList.contains("hidden")&&a.value&&(i.weight=parseFloat(a.value)),!document.getElementById("ritual-percentage-group").classList.contains("hidden")&&o.value&&(i.percentage=parseFloat(o.value))}try{await b.updateRitual(t,i),await ns(),O(),k("Ritual updated!","success")}catch(a){x("update ritual",a)}return!1}async function Zf(e,t){if(confirm(`Delete ritual "${t}"? This cannot be undone.`))try{await b.deleteRitual(e),await ns(),k("Ritual deleted","success")}catch(n){x("delete ritual",n)}}J({"view-project":(e,t)=>{jf(t.projectId)},"view-project-settings":(e,t)=>{tc(t.projectId)},"create-project":e=>{Rf(e)},"update-project":(e,t)=>{Pf(e,t.projectId)},"confirm-delete-project":(e,t)=>{Nf(t.projectId)},"edit-project-ritual":(e,t)=>{Kf(t.ritualId)},"delete-project-ritual":(e,t)=>{Zf(t.ritualId,t.ritualName)},"create-project-ritual":e=>{Wf(e)},"update-project-ritual":(e,t)=>{Yf(e,t.ritualId)},"toggle-ritual-conditions":()=>{zf()},"ritual-group-change":()=>{Vf()}});function Qa(){const t=new URLSearchParams(window.location.search).get("project");return t||Jl()}function Xf(e){const t=new URLSearchParams(window.location.search);e?t.set("project",e):t.delete("project");const n=t.toString(),s=n?`${window.location.pathname}?${n}`:window.location.pathname;history.replaceState(history.state,"",s)}const Ja={},ac=new Map;let eo=null,to=null,no=null,so=null,io=null,ao=null,oc=!1;function Qf(e){Object.assign(Ja,e)}function Jf({beforeNavigate:e,detailRoute:t,detailPopstate:n,restoreProject:s,issueNavigate:i,epicNavigate:a}={}){e&&(eo=e),t&&(to=t),n&&(no=n),s&&(so=s),i&&(io=i),a&&(ao=a)}function eg(){return Object.keys(Ja)}const tg=["issues","board","sprints","epics","documents","rituals","approvals","my-issues"];function M(e,t=!0){if(t&&Pt(),Tu(e),t){let i;const a=Qa();e==="my-issues"?i=a?`/?project=${a}`:"/":e==="issues"&&window.location.search?i=`/issues${window.location.search}`:tg.includes(e)&&a?i=`/${e}?project=${a}`:i=`/${e}`,history.pushState({view:e},"",i)}document.querySelectorAll(".nav-item").forEach(i=>{i.classList.toggle("active",i.dataset.view===e)}),eo&&eo();const n=()=>{document.querySelectorAll(".view").forEach(a=>a.classList.add("hidden"));const i=document.getElementById(`${e}-view`);i&&i.classList.remove("hidden")};document.startViewTransition?document.startViewTransition(n):n();const s=Ja[e];s&&s(),t&&window.scrollTo(0,0)}function rc(){var s;const t=window.location.pathname.split("/").filter(Boolean);so&&so();let n="my-issues";if(t.length===0||t[0]==="")M("my-issues",!1);else{if(to&&to(t))return;{n=t[0];const i={"gate-approvals":"approvals"};i[n]&&(n=i[n]),eg().includes(n)?M(n,!1):(n="my-issues",M("my-issues",!1))}}(s=history.state)!=null&&s.view||history.replaceState({view:n},"",window.location.href)}function Pt(){ac.set(window.location.href,window.scrollY)}function lc(e){Pt(),history.pushState({view:"issue",identifier:e},"",`/issue/${e}`),io&&io(e)}function ng(e){Pt(),history.pushState({view:"epic",identifier:e},"",`/epic/${e}`),ao&&ao(e)}function cc(){const e=ac.get(window.location.href);e!==void 0&&requestAnimationFrame(()=>{window.scrollTo(0,e)})}function sg(){oc||(oc=!0,window.addEventListener("popstate",e=>{var t;if(e.state&&no&&no(e.state)){cc();return}(t=e.state)!=null&&t.view?M(e.state.view,!1):rc(),cc()}))}let ss=[];function fi(){return ss}function ig(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function ag(e){const t=e==null?void 0:e.avatar_url,n=p((e==null?void 0:e.name)||"Agent");return t?ig(t)?`
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${p(t)}" alt="${n}">
        </div>
      `:`<div class="agent-avatar agent-avatar-purple avatar-emoji">${f(t)}</div>`:`
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${n.charAt(0).toUpperCase()}</span>
    </div>
  `}async function og(e){var t;if(e||(e=(t=A())==null?void 0:t.id),!!e)try{ss=await b.getTeamAgents(e),Ds(qt,fi),js()}catch(n){console.error("Failed to load team agents:",n),x("load team agents",n)}}async function oo(e){var t;if(e||(e=(t=A())==null?void 0:t.id),!!e)try{ss=await b.getTeamAgents(e),Ds(qt,fi),js(),rg()}catch(n){x("load agents",n)}}function rg(){const e=document.getElementById("agents-list");if(e){if(ss.length===0){e.innerHTML=N({icon:P.dashboard,heading:"No agents yet",description:"Create an agent to enable CLI automation with its own identity"});return}e.innerHTML=ss.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown");return`
      <div class="agent-item">
        ${ag(t)}
        <div class="agent-info">
          <div class="agent-name">${n}</div>
          <div class="agent-meta">
            <span class="agent-scope">${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
            <span class="agent-date">Created by ${s} ${ia(t.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${p(t.id)}" data-agent-name="${p(t.name||"Agent")}">Delete</button>
      </div>
    `}).join("")}}function lg(){const e=Q();document.getElementById("modal-title").textContent="Create Agent",document.getElementById("modal-content").innerHTML=`
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
          ${e.map(n=>`<option value="${n.id}">${f(n.name)}</option>`).join("")}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;const t=document.getElementById("agent-project-scoped");t&&t.addEventListener("change",function(){document.getElementById("agent-project-select").style.display=this.checked?"block":"none"}),U()}async function cg(e){var o,r,d;e.preventDefault();const t=(o=A())==null?void 0:o.id;if(!t)return k("No team selected","error"),!1;const n=document.getElementById("agent-name").value.trim(),s=((r=document.getElementById("agent-avatar"))==null?void 0:r.value.trim())||null,i=document.getElementById("agent-project-scoped").checked,a=(d=document.getElementById("agent-project"))==null?void 0:d.value;try{let c;i&&a?c=await b.createProjectAgent(a,n,s):c=await b.createTeamAgent(t,n,s),O();const l=f(c.api_key);document.getElementById("modal-title").textContent="Agent Created",document.getElementById("modal-content").innerHTML=`
      <div class="api-key-created">
        <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
        <div class="api-key-display">
          <code id="new-agent-key">${l}</code>
          <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
        </div>
        <div class="api-key-instructions">
          <p>Configure the CLI to use this agent:</p>
          <code>chaotic auth set-key ${l}</code>
        </div>
        <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
      </div>
    `,U()}catch(c){x("create agent",c)}return!1}function dg(){const e=document.getElementById("new-agent-key").textContent;navigator.clipboard.writeText(e).then(()=>{k("Agent API key copied to clipboard","success")}).catch(()=>{k("Failed to copy","error")})}async function ug(e,t){if(confirm(`Delete agent "${t}"? This will revoke all its API keys and cannot be undone.`))try{await b.deleteAgent(e),k("Agent deleted","success"),oo()}catch(n){x("delete agent",n)}}J({"create-agent":e=>{cg(e)},"copy-agent-key":()=>{dg()},"dismiss-agent-modal":()=>{O(),oo()},"delete-agent":(e,t)=>{ug(t.agentId,t.agentName)}});let _t=0,is=null,gi=0;const Nt=new Map;function ro(){const e=document.getElementById("ws-status-badge");e&&e.classList.toggle("hidden",_t===0)}function tt(e,t){return Nt.has(e)||Nt.set(e,new Set),Nt.get(e).add(t),()=>{var n;return(n=Nt.get(e))==null?void 0:n.delete(t)}}function pg(e){const t=Math.min(1e3*Math.pow(2,e),3e4),n=t*.25*(Math.random()*2-1);return Math.max(500,Math.round(t+n))}function dc(e,{isReconnect:t=!1}={}){is&&(clearTimeout(is),is=null);const n=Mu();n&&(n.onopen=null,n.onmessage=null,n.onclose=null,n.onerror=null,n.close(),Dr(null)),!t&&_t>0&&(_t=0,ro());const s=b.getToken();if(!s)return;const i=++gi,o=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws?token=${encodeURIComponent(s)}&team_id=${encodeURIComponent(e)}`;try{const r=new WebSocket(o);Dr(r),r.onopen=()=>{i===gi&&(console.log("WebSocket connected"),_t>0&&k("Live updates reconnected","success"),_t=0,ro())},r.onmessage=d=>{if(i!==gi)return;let c;try{c=JSON.parse(d.data)}catch(l){console.error("WebSocket: malformed message",l);return}mg(c)},r.onclose=()=>{if(i!==gi)return;console.log("WebSocket disconnected"),_t++,_t===1&&k("Live updates disconnected. Reconnecting...","warning"),ro();const d=pg(_t-1);is=setTimeout(()=>{is=null,A()&&A().id===e&&dc(e,{isReconnect:!0})},d)},r.onerror=d=>{console.error("WebSocket error:",d)}}catch(r){console.error("Failed to connect WebSocket:",r)}}function mg(e){const{type:t,entity:n,data:s}=e;if(!t||!n){console.warn("WebSocket: ignoring message with missing type/entity",e);return}const i={type:t,entity:n},a=Nt.get(`${n}:${t}`);if(a)for(const d of a)try{d(s,i)}catch(c){console.error(`WebSocket handler error (${n}:${t}):`,c)}const o=Nt.get(n);if(o)for(const d of o)try{d(s,i)}catch(c){console.error(`WebSocket handler error (${n}):`,c)}const r=Nt.get("*");if(r)for(const d of r)try{d(s,i)}catch(c){console.error("WebSocket handler error (*):",c)}}let hi=[],vn=[],lo=[],co=[];function fg(){return hi}function qt(){return vn}async function uo(){try{hi=await b.getMyTeams(),gg()}catch(e){x("load teams",e)}}function gg(){const e=document.getElementById("team-list");hi.length===0?e.innerHTML='<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>':e.innerHTML=hi.map(t=>`
            <button class="dropdown-item" data-action="select-team" data-team-json="${p(JSON.stringify(t))}">${f(t.name)}</button>
        `).join("")}async function po(e,t=!1){oa(e),document.getElementById("current-team-name").textContent=e.name;const n=document.getElementById("mobile-team-name");n&&(n.textContent=e.name);const s=document.getElementById("team-description-text");s&&(s.textContent=e.description||"No description"),document.getElementById("team-dropdown").classList.add("hidden"),dc(e.id),await Promise.all([Fe(),Tg(),vg(),og()]),t?rc():M(L())}function uc(){document.getElementById("team-dropdown").classList.toggle("hidden")}function hg(){document.getElementById("user-dropdown").classList.toggle("hidden")}async function vg(){if(A())try{vn=await b.getTeamMembers(A().id),Ds(qt,fi),js()}catch(e){console.error("Failed to load team members:",e),x("load team members",e)}}function mo(){return Array(3).fill(0).map(()=>`
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join("")}let fo=0;async function go(){if(!A())return;const e=++fo,t=document.getElementById("team-members-list");t&&(t.innerHTML=mo());try{const n=await b.getTeamMembers(A().id);if(e!==fo)return;vn=n,Ds(qt,fi),js(),bg()}catch(n){if(e!==fo)return;t&&(t.innerHTML=N({icon:P.team,heading:"Couldn't load members",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-members"},variant:"error"})),vn=[],pc(),x("load team members",n)}}function ho(){var n;const e=(n=Kt())==null?void 0:n.id,t=vn.find(s=>s.user_id===e);return(t==null?void 0:t.role)==="admin"||(t==null?void 0:t.role)==="owner"}function pc(){const e=document.getElementById("invite-member-btn");e&&e.classList.toggle("hidden",!ho())}function bg(){const e=document.getElementById("team-members-list"),t=ho();pc(),e.innerHTML=vn.map(n=>`
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
                ${t&&n.user_id!==Kt().id&&n.role!=="owner"?`
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${p(n.user_id)}">Remove</button>
                `:""}
            </div>
        </div>
    `).join("")}let vo=0;async function vi(){if(!A())return;const e=++vo,t=document.getElementById("team-invitations-list");t&&(t.innerHTML=mo());try{const n=await b.getTeamInvitations(A().id);if(e!==vo)return;lo=n,yg()}catch(n){if(e!==vo)return;if((n==null?void 0:n.status)===403){document.getElementById("team-invitations-list").innerHTML="";return}console.error("Failed to load team invitations:",n),document.getElementById("team-invitations-list").innerHTML=`
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `}}function yg(){const e=document.getElementById("team-invitations-list");if(lo.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>';return}const t=ho();e.innerHTML=lo.map(n=>`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${f(n.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${f(n.role)}</span>
                    <span>Expires: ${new Date(n.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            ${t?`<button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${p(n.id)}">Cancel</button>`:""}
        </div>
    `).join("")}let bo=0;async function mc(){if(!A())return;const e=++bo,t=document.getElementById("team-agents-list");t&&(t.innerHTML=mo());try{const n=await b.getTeamAgents(A().id);if(e!==bo)return;co=n,wg()}catch(n){if(e!==bo)return;t&&(t.innerHTML=N({icon:P.team,heading:"Couldn't load agents",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-team-agents"},variant:"error"})),x("load team agents",n)}}function wg(){const e=document.getElementById("team-agents-list");if(e){if(co.length===0){e.innerHTML='<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>';return}e.innerHTML=co.map(t=>{const n=f(t.name),s=f(t.parent_user_name||"Unknown"),i=t.avatar_url||"🤖";return`
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${f(i)}</div>
                <div class="member-details">
                    <span class="member-name">${n}</span>
                    <span class="member-email">Created by ${s} • ${t.agent_project_id?"Project-scoped":"Team-wide"}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `}).join("")}}function fc(){document.getElementById("modal-title").textContent="Invite Team Member",document.getElementById("modal-content").innerHTML=`
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
    `,U()}async function kg(e){e.preventDefault();const t=document.getElementById("invite-email").value,n=document.getElementById("invite-role").value;try{await b.createInvitation(A().id,t,n),await vi(),O(),k("Invitation sent!","success")}catch(s){x("send invitation",s)}return!1}async function $g(e){if(confirm("Are you sure you want to remove this member?"))try{await b.removeMember(A().id,e),await go(),k("Member removed!","success")}catch(t){x("remove member",t)}}async function Eg(e){try{await b.deleteInvitation(A().id,e),await vi(),k("Invitation canceled!","success")}catch(t){x("cancel invitation",t)}}function gc(){uc(),document.getElementById("modal-title").textContent="Create Team",document.getElementById("modal-content").innerHTML=`
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
    `,U()}function xg(){A()&&(document.getElementById("modal-title").textContent="Edit Team",document.getElementById("modal-content").innerHTML=`
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${p(A().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${p(A().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${f(A().description||"")}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `,U())}async function _g(e){e.preventDefault();const t={name:document.getElementById("team-name").value,key:document.getElementById("team-key").value.toUpperCase(),description:document.getElementById("team-description").value};try{const n=await b.createTeam(t);await uo(),await po(n),O(),k("Team created!","success")}catch(n){x("create team",n)}return!1}async function Ig(e){if(e.preventDefault(),!A())return!1;const t={name:document.getElementById("team-name").value,description:document.getElementById("team-description").value};try{const n=await b.updateTeam(A().id,t);oa(n),document.getElementById("current-team-name").textContent=n.name;const s=document.getElementById("team-description-text");s&&(s.textContent=n.description||"No description"),await uo(),O(),k("Team updated!","success")}catch(n){x("update team",n)}return!1}async function Tg(){if(A())try{const e=await b.getLabels(A().id);Cs(e)}catch(e){console.error("Failed to load labels:",e),x("load labels",e)}}document.addEventListener("click",e=>{if(!e.target.closest(".team-selector")&&!e.target.closest("#team-dropdown")){const t=document.getElementById("team-dropdown");t&&t.classList.add("hidden")}if(!e.target.closest(".user-menu")&&!e.target.closest("#user-dropdown")){const t=document.getElementById("user-dropdown");t&&t.classList.add("hidden")}}),J({"select-team":(e,t)=>{po(JSON.parse(t.teamJson))},"remove-member":(e,t)=>{$g(t.userId)},"delete-invitation":(e,t)=>{Eg(t.invitationId)},"retry-load-team-invitations":()=>{vi()},"retry-load-team-members":()=>{go()},"retry-load-team-agents":()=>{mc()},"invite-member":e=>{kg(e)},"create-team":e=>{_g(e)},"update-team":e=>{Ig(e)}});let nt=null,pt=0,bn=null,yn=null,as=null,yo=!1;function Sg(){return du()}function hc(){uu()}function vc(e){const t=e.trim().toUpperCase().split(/\s+/).filter(Boolean);return t.length===0?"":t.length===1?t[0].substring(0,4):t.slice(0,4).map(n=>n[0]).join("")}function Lg(){nt||(nt=document.createElement("div"),nt.id="onboarding-overlay",nt.className="onboarding-overlay",document.getElementById("app").appendChild(nt))}function os(){if(!nt)return;const e=yo?yc():bc(),t=e[pt],n=e.map((s,i)=>`<span class="onboarding-dot${i===pt?" active":""}${i<pt?" completed":""}"></span>`).join("");nt.innerHTML=`
        <div class="onboarding-container">
            <div class="onboarding-progress">${n}</div>
            <div class="onboarding-step">
                ${t.html}
            </div>
        </div>
    `,t.onMount&&t.onMount()}function bc(){return[{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-team-name"),t=document.getElementById("onboarding-team-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=vc(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-project-name"),t=document.getElementById("onboarding-project-key");e.addEventListener("input",()=>{t.dataset.manual||(t.value=vc(e.value))}),t.addEventListener("input",()=>{t.dataset.manual="true"}),e.focus()}},{html:`
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
            `,onMount(){const e=document.getElementById("onboarding-done-team"),t=document.getElementById("onboarding-done-project"),n=document.getElementById("onboarding-done-issue");e&&bn&&(e.textContent=`${bn.name} (${bn.key})`),t&&yn&&(t.textContent=`${yn.name} (${yn.key})`),n&&as&&(n.textContent=`${as.identifier} - ${as.title}`)}}]}function yc(){const e='<div class="onboarding-skip"><a href="#" data-action="onboarding-finish">Close tour</a></div>';return[{html:`
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
            `}]}function wo(e,t){const n=document.getElementById(e);n&&(n.textContent=t,n.classList.remove("hidden"))}function ko(e){const t=document.getElementById(e);t&&(t.textContent="",t.classList.add("hidden"))}function wn(e,t){const n=document.getElementById(e);n&&(n.disabled=t,t?(n.dataset.originalText=n.textContent,n.textContent="Creating..."):n.dataset.originalText&&(n.textContent=n.dataset.originalText))}function Cg(){const e=yo?yc():bc();pt<e.length-1&&(pt++,os())}function Ag(){hc(),kc(),rs()}function Bg(){hc(),kc(),rs()}async function Dg(e){e.preventDefault(),ko("onboarding-team-error"),wn("onboarding-team-submit",!0);const t=document.getElementById("onboarding-team-name").value.trim(),n=document.getElementById("onboarding-team-key").value.toUpperCase().trim();try{bn=await b.createTeam({name:t,key:n}),pt++,os()}catch(s){wo("onboarding-team-error",s.message||"Failed to create team"),wn("onboarding-team-submit",!1)}}async function Mg(e){e.preventDefault(),ko("onboarding-project-error"),wn("onboarding-project-submit",!0);const t=document.getElementById("onboarding-project-name").value.trim(),n=document.getElementById("onboarding-project-key").value.toUpperCase().trim();try{yn=await b.createProject(bn.id,{name:t,key:n}),pt++,os()}catch(s){wo("onboarding-project-error",s.message||"Failed to create project"),wn("onboarding-project-submit",!1)}}async function jg(e){e.preventDefault(),ko("onboarding-issue-error"),wn("onboarding-issue-submit",!0);const t=document.getElementById("onboarding-issue-title").value.trim();try{as=await b.createIssue(yn.id,{title:t}),pt++,os()}catch(n){wo("onboarding-issue-error",n.message||"Failed to create issue"),wn("onboarding-issue-submit",!1)}}function wc(e=!1){yo=e,pt=0,bn=null,yn=null,as=null,Lg(),os()}function kc(){nt&&(nt.remove(),nt=null)}function $c(){pu(),wc(!0)}J({"onboarding-next":e=>{e.preventDefault(),Cg()},"onboarding-skip":e=>{e.preventDefault(),Ag()},"onboarding-finish":e=>{e.preventDefault(),Bg()},"onboarding-create-team":e=>{Dg(e)},"onboarding-create-project":e=>{Mg(e)},"onboarding-create-issue":e=>{jg(e)}});async function rs(){Rg(),Fg(),await uo();const e=fg();if(e.length===0&&!Sg()){wc();return}e.length>0&&await po(e[0],!0)}let kn=null,ls=null,Ue=null,Ge=null;function cs(){kn||(kn=document.getElementById("auth-screen"),ls=document.getElementById("main-screen"),Ue=document.getElementById("login-form"),Ge=document.getElementById("signup-form"))}function bi(){cs(),kn&&kn.classList.remove("hidden"),ls&&ls.classList.add("hidden")}function Rg(){cs(),kn&&kn.classList.add("hidden"),ls&&ls.classList.remove("hidden")}function Pg(){cs(),Ue&&Ue.classList.remove("hidden"),Ge&&Ge.classList.add("hidden")}function Ng(){cs(),Ue&&Ue.classList.add("hidden"),Ge&&Ge.classList.remove("hidden")}async function qg(e){e.preventDefault();const t=document.getElementById("login-email").value,n=document.getElementById("login-password").value;try{await b.login(t,n),Ss(await b.getMe()),await rs(),k("Welcome back!","success")}catch(s){x("log in",s)}return!1}async function Og(e){e.preventDefault();const t=document.getElementById("signup-name").value,n=document.getElementById("signup-email").value,s=document.getElementById("signup-password").value;try{await b.signup(t,n,s),await b.login(n,s),Ss(await b.getMe()),await rs(),k("Account created successfully!","success")}catch(i){x("sign up",i)}return!1}function Ec(){b.logout(),Ss(null),oa(null),bi(),k("Signed out","success")}function Hg(e){return typeof e=="string"&&(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:"))}function Fg(){const e=Kt();if(!e)return;const t=document.getElementById("user-name");t&&(t.textContent=e.name);const n=document.getElementById("user-avatar");if(n){const s=e.avatar_url;s?Hg(s)?(n.className="avatar-small",n.innerHTML=`<img class="avatar-img" src="${p(s)}" alt="${p(e.name)}">`):(n.className="avatar-small avatar-emoji",n.textContent=s):(n.className="avatar-small",n.textContent=e.name.charAt(0).toUpperCase())}}function Ug(){cs();const e=Ue==null?void 0:Ue.querySelector("form");e&&e.addEventListener("submit",i=>qg(i));const t=Ge==null?void 0:Ge.querySelector("form");t&&t.addEventListener("submit",i=>Og(i));const n=Ue==null?void 0:Ue.querySelector(".auth-switch a");n&&n.addEventListener("click",i=>{i.preventDefault(),Ng()});const s=Ge==null?void 0:Ge.querySelector(".auth-switch a");s&&s.addEventListener("click",i=>{i.preventDefault(),Pg()})}let $o=[];async function Eo(){try{$o=await b.getApiKeys(),Gg()}catch(e){x("load API keys",e)}}function Gg(){const e=document.getElementById("api-keys-list");if(e){if($o.length===0){e.innerHTML=N({icon:P.dashboard,heading:"No API keys yet",description:"Create one to get started"});return}e.innerHTML=$o.map(t=>`
        <div class="api-key-item ${t.is_active?"":"revoked"}">
            <div class="api-key-info">
                <div class="api-key-name">${f(t.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${f(t.key_prefix)}...</code>
                    <span class="api-key-date">Created ${ia(t.created_at)}</span>
                    ${t.last_used_at?`<span class="api-key-date">Last used ${ia(t.last_used_at)}</span>`:""}
                    ${t.is_active?"":'<span class="api-key-revoked">Revoked</span>'}
                </div>
            </div>
            ${t.is_active?`
                <button class="btn btn-danger-outline" data-action="revoke-api-key" data-key-id="${p(t.id)}" data-key-name="${p(t.name)}">Revoke</button>
            `:""}
        </div>
    `).join("")}}function zg(){document.getElementById("modal-title").textContent="Create API Key",document.getElementById("modal-content").innerHTML=`
        <form data-action="create-api-key">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `,U()}async function Vg(e){e.preventDefault();const t=document.getElementById("api-key-name").value.trim();try{const n=await b.createApiKey(t);O(),document.getElementById("modal-title").textContent="API Key Created",document.getElementById("modal-content").innerHTML=`
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
        `,U()}catch(n){x("create API key",n)}return!1}async function Wg(){const e=document.getElementById("new-api-key").textContent;try{await navigator.clipboard.writeText(e),k("API key copied to clipboard","success")}catch{k("Failed to copy","error")}}async function Kg(e,t){if(confirm(`Revoke API key "${t}"? This cannot be undone.`))try{await b.revokeApiKey(e),k("API key revoked","success"),await Eo()}catch(n){x("revoke API key",n)}}J({"create-api-key":e=>{Vg(e)},"copy-api-key":()=>{Wg()},"dismiss-api-key-modal":()=>{O(),Eo()},"revoke-api-key":(e,t)=>{Kg(t.keyId,t.keyName)}});let yi=!1,mt=0,It=[],wi=[];function Yg(e){wi=e,It=[...e]}function ki(){return yi}function Zg(){if(yi)return;yi=!0,mt=0,It=[...wi];const e=document.createElement("div");e.id="command-palette-overlay",e.className="command-palette-overlay",e.onclick=n=>{n.target===e&&$i()},e.innerHTML=`
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
    `,document.body.appendChild(e);const t=e.querySelector(".command-input");t.addEventListener("input",n=>Xg(n.target.value)),t.addEventListener("keydown",Jg),e.addEventListener("mouseover",n=>{const s=n.target.closest('[data-action="execute-command"]');s&&Qg(Number(s.dataset.commandIndex))}),ds(),requestAnimationFrame(()=>t.focus())}function $i(){yi=!1;const e=document.getElementById("command-palette-overlay");e&&e.remove()}function Xg(e){const t=e.toLowerCase().trim();t?It=wi.filter(n=>n.title.toLowerCase().includes(t)||n.subtitle.toLowerCase().includes(t)||n.category.toLowerCase().includes(t)):It=[...wi],mt=0,ds()}function ds(){const e=document.getElementById("command-results");if(!e)return;if(It.length===0){e.innerHTML='<div class="command-empty">No commands found</div>';return}const t={};It.forEach(a=>{t[a.category]||(t[a.category]=[]),t[a.category].push(a)});let n="",s=0;for(const[a,o]of Object.entries(t)){n+=`<div class="command-group">
            <div class="command-group-title">${a}</div>`;for(const r of o)n+=`
                <div class="command-item ${s===mt?"selected":""}"
                     data-index="${s}"
                     data-action="execute-command" data-command-index="${s}"
>
                    <div class="command-item-icon">${r.icon}</div>
                    <div class="command-item-content">
                        <div class="command-item-title">${r.title}</div>
                        <div class="command-item-subtitle">${r.subtitle}</div>
                    </div>
                    ${r.shortcut?`<div class="command-item-shortcut"><kbd>${r.shortcut}</kbd></div>`:""}
                </div>
            `,s++;n+="</div>"}e.innerHTML=n;const i=e.querySelector(".command-item.selected");i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})}function Qg(e){mt=e,ds()}function xc(e){const t=It[e];t&&($i(),t.action())}function Jg(e){switch(e.key){case"ArrowDown":e.preventDefault(),mt=Math.min(mt+1,It.length-1),ds();break;case"ArrowUp":e.preventDefault(),mt=Math.max(mt-1,0),ds();break;case"Enter":e.preventDefault(),xc(mt);break;case"Escape":e.preventDefault(),$i();break}}J({"execute-command":(e,t)=>{xc(Number(t.commandIndex))}});const eh=[{title:"Navigation",shortcuts:[{key:"m",description:"Dashboard"},{key:"i",description:"All Issues"},{key:"b",description:"Board"},{key:"p",description:"Projects"},{key:"g s",description:"Sprints"},{key:"g d",description:"Documents"},{key:"g e",description:"Epics"},{key:"g r",description:"Rituals"},{key:"g a",description:"Approvals"},{key:"g t",description:"Team"},{key:"g ,",description:"Settings"}]},{title:"Actions",shortcuts:[{key:"⌘K",description:"Command palette"},{key:"/",description:"Search issues"},{key:"c",description:"Create new item"},{key:"?",description:"Show shortcuts"},{key:"Esc",description:"Close modal / dropdown"}]},{title:"Issue List",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected issue"},{key:"e",description:"Edit selected issue"},{key:"s",description:"Change status"},{key:"p",description:"Change priority"},{key:"a",description:"Change assignee"}]},{title:"Issue Detail",shortcuts:[{key:"c",description:"Focus comment box"},{key:"d",description:"Edit description"},{key:"j / k",description:"Next / previous issue"},{key:"← / →",description:"Previous / next issue"},{key:"s",description:"Status"},{key:"p",description:"Priority"},{key:"a",description:"Assignee"},{key:"l",description:"Labels"},{key:"e",description:"Estimate"},{key:"t",description:"Type"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Documents",shortcuts:[{key:"j / k",description:"Navigate list"},{key:"Enter",description:"Open selected document"},{key:"e",description:"Edit selected document"}]},{title:"Document Detail",shortcuts:[{key:"← / →",description:"Previous / next document"},{key:"⌘⇧.",description:"Quote selection into comment"}]},{title:"Board",shortcuts:[{key:"j / k",description:"Navigate cards"},{key:"Enter",description:"Open selected card"}]},{title:"General",shortcuts:[{key:"⌘Enter",description:"Submit form / comment"}]}];function th(e){return`<div class="shortcut-row">
        <span class="shortcut-description">${f(e.description)}</span>
        <span class="shortcut-keys">${e.key.split(" / ").map(t=>`<kbd class="kbd-hint">${f(t.trim())}</kbd>`).join('<span class="shortcut-separator">/</span>')}</span>
    </div>`}function nh(e){return`<div class="shortcut-group">
        <h4 class="shortcut-group-title">${f(e.title)}</h4>
        ${e.shortcuts.map(th).join("")}
    </div>`}function _c(){document.getElementById("modal-title").textContent="Keyboard Shortcuts",document.getElementById("modal-content").innerHTML=`
        <div class="shortcuts-help">
            ${eh.map(nh).join("")}
        </div>
    `,U()}let Ei=[];function sh(){return Ei}Ze(e=>{e==="currentProject"&&L()==="epics"&&Ot()});let xi=0;async function Ot(){var n;const e=document.getElementById("epics-list");if(!e)return;const t=++xi;e.innerHTML=Array(4).fill(0).map(()=>`
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
    `).join("");try{if(!((n=A())!=null&&n.id)){Ei=[],e.innerHTML=N({icon:P.projects,heading:"Select a team",description:"Choose a team to view its epics"});return}const s=z();let i;if(s?i=await b.getIssues({project_id:s,issue_type:"epic"}):i=await b.getTeamIssues(A().id,{issue_type:"epic"}),t!==xi)return;if(!i||i.length===0){Ei=[],e.innerHTML=N({icon:P.epics,heading:"No epics found",description:"Epics help you organize related issues into larger goals",cta:{label:"Create epic",action:"showCreateEpicModal"}});return}const a=await Promise.all(i.map(async o=>{let r=[];try{r=await b.getSubIssues(o.id)}catch{}return{...o,subIssues:r}}));if(t!==xi)return;Ei=a,ih(a,e)}catch(s){if(t!==xi)return;e.innerHTML=N({icon:P.epics,heading:"Failed to load epics",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-epics"},variant:"error"}),x("load epics",s)}}function ih(e,t){const n=e.map(s=>{const i=s.subIssues?s.subIssues.length:0,a=s.subIssues?s.subIssues.filter(u=>u.status==="done"||u.status==="canceled").length:0,o=i>0?Math.round(a/i*100):0,r=i>0?`${a}/${i}`:"-",d=`status-${(s.status||"backlog").replace(/_/g,"-")}`,c=(s.status||"backlog").replace(/_/g," ").replace(/\b\w/g,u=>u.toUpperCase()),l=s.estimate!=null?`${s.estimate}pts`:"-";return`
            <tr class="epic-row" data-identifier="${p(s.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${f(s.identifier)}</td>
                <td class="epic-title">${f(s.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${o===100?" epic-progress-complete":""}" style="width: ${o}%"></div>
                        </div>
                        <span class="epic-progress-text">${r}</span>
                    </div>
                </td>
                <td class="epic-estimate">${l}</td>
                <td class="epic-status"><span class="status-badge ${d}">${c}</span></td>
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
    `,t._epicClickHandler||(t._epicClickHandler=s=>{const i=s.target.closest(".epic-row");i&&i.dataset.identifier&&ng(i.dataset.identifier)},t.addEventListener("click",t._epicClickHandler))}function ah(){const e=z(),t=Q().map(n=>`
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
    `,U(),document.getElementById("create-epic-form").addEventListener("submit",oh),document.getElementById("create-epic-title").focus()}async function oh(e){e.preventDefault();const t=document.getElementById("create-epic-project").value,n=document.getElementById("create-epic-title").value.trim(),s=document.getElementById("create-epic-description").value.trim();if(!t){k("Please select a project","error");return}if(!n){k("Please enter a title","error");return}try{const i=await b.createIssue(t,{title:n,description:s||null,issue_type:"epic"});O(),k(`Created epic ${i.identifier}`,"success"),Ot()}catch(i){x("create epic",i)}}async function Ic(e){try{let t;if(e.includes("-")?t=await b.getIssueByIdentifier(e):t=await b.getIssue(e),t){if(t.issue_type!=="epic"){K(t.id,!1);return}await xo(t.id,!1)}else M("epics",!1)}catch{M("epics",!1)}}async function xo(e,t=!0){try{t&&Pt();const[n,s,i,a]=await Promise.all([b.getIssue(e),b.getSubIssues(e),b.getActivities(e),b.getComments(e)]);if(n.issue_type!=="epic"){K(e,t);return}t&&history.pushState({epicId:e,view:L()},"",`/epic/${n.identifier}`),document.querySelectorAll(".view").forEach(E=>E.classList.add("hidden"));const o=document.getElementById("epic-detail-view");o.classList.remove("hidden");const r=L()||"epics",d=Q().find(E=>E.id===n.project_id),c=n.assignee_id?Gn(n.assignee_id):null,l=c?Bt(c):null,u=s.length,m=s.filter(E=>E.status==="done"||E.status==="canceled").length,h=u>0?Math.round(m/u*100):0,v=sh(),w=v.findIndex(E=>E.id===n.id),_=w>0?v[w-1]:null,S=w>=0&&w<v.length-1?v[w+1]:null,j=w>=0;o.querySelector("#epic-detail-content").innerHTML=`
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${p(r)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${j?`
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${_?`data-action="navigate-epic" data-epic-id="${p(_.id)}"`:"disabled"} title="Previous epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${w+1} / ${v.length}</span>
                            <button class="issue-nav-btn" ${S?`data-action="navigate-epic" data-epic-id="${p(S.id)}"`:"disabled"} title="Next epic">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>
                        `:""}
                        <span class="issue-detail-breadcrumb">${d?f(d.name):"Project"} › ${f(n.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${f(n.title)}</h1>

                    ${n.description?`
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${ln(n.description)}
                        </div>
                    </div>
                    `:""}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${h===100?" epic-progress-complete":""}" style="width: ${h}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${m} of ${u} done</span>
                                <span>${h}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${s.length===0?N({icon:P.issues,heading:"No sub-issues",description:"Break this epic down by creating sub-issues"}):s.map(E=>{const D=E.assignee_id?Gn(E.assignee_id):null,I=D?Bt(D):null;return`
                                <div class="sub-issue-item" data-issue-id="${p(E.id)}" data-identifier="${p(E.identifier)}">
                                    <span class="sub-issue-status">${_e(E.status)}</span>
                                    <span class="sub-issue-id">${f(E.identifier)}</span>
                                    <span class="sub-issue-title">${f(E.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(E.status||"backlog").replace(/_/g,"-")}">${ke(E.status)}</span>
                                    ${I?`<span class="sub-issue-assignee">${f(I)}</span>`:""}
                                </div>
                            `}).join("")}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${i.length===0?N({icon:P.activity,heading:"No activity yet",description:"Activity will appear here as the epic is updated"}):i.map(E=>`
                                <div class="activity-item">
                                    <div class="activity-icon">${Sa(E.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${Ca(E)}</span>
                                        <span class="activity-actor">by ${f(La(E))}</span>
                                        <span class="activity-time">${Ye(E.created_at)}</span>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    ${a.length>0?`
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${a.map(E=>`
                                <div class="comment">
                                    <div class="comment-avatar">${(E.author_name||"U").charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${f(E.author_name||"User")}</span>
                                            <span class="comment-date">${Ye(E.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${f(E.content||"")}</div>
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
                                ${_e(n.status)}
                                ${ke(n.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${Je(n.priority)}
                                ${De(n.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${l?f(l):'<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${mi(n.estimate,n.project_id)}
                            </span>
                        </div>

                        ${n.labels&&n.labels.length>0?`
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${n.labels.map(E=>`
                                    <span class="issue-label" style="background: ${Y(E.color)}20; color: ${Y(E.color)}">${f(E.name)}</span>
                                `).join("")}
                            </span>
                        </div>
                        `:""}

                        ${d?`
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${f(d.name)}</span>
                        </div>
                        `:""}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;const B=o.querySelector(".sub-issues-list");B&&B.addEventListener("click",E=>{const D=E.target.closest(".sub-issue-item");D&&D.dataset.issueId&&K(D.dataset.issueId)})}catch(n){x("load epic",n)}}J({"navigate-epic":(e,t)=>{xo(t.epicId)}});function rh(e){let t=!1,n=null;return function(i){var o,r,d;if(i.metaKey||i.ctrlKey||i.altKey)return;if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA"||i.target.tagName==="SELECT"){i.key==="Escape"&&i.target.blur();return}const a=e.isModalOpen();if(i.key==="Escape"){i.preventDefault(),a?e.closeModal():document.body.classList.contains("sidebar-open")&&e.closeSidebar?e.closeSidebar():e.closeDropdowns();return}if(!a){if(i.key==="g"){t=!0,clearTimeout(n),n=setTimeout(()=>{t=!1},1e3);return}if(t){if(t=!1,clearTimeout(n),(o=e.isDetailViewActive)!=null&&o.call(e)&&["p","s","t","e","a","d"].includes(i.key))return;switch(i.key){case"i":e.navigateTo("issues");break;case"p":e.navigateTo("projects");break;case"s":e.navigateTo("sprints");break;case"d":e.navigateTo("documents");break;case"t":e.navigateTo("team");break;case"e":e.navigateTo("epics");break;case"r":e.navigateTo("rituals");break;case"a":e.navigateTo("approvals");break;case",":e.navigateTo("settings");break}return}switch(i.key){case"c":if((r=e.isDetailViewActive)!=null&&r.call(e))break;i.preventDefault(),e.showCreateIssueModal();break;case"m":i.preventDefault(),e.navigateTo("my-issues");break;case"i":i.preventDefault(),e.navigateTo("issues");break;case"b":i.preventDefault(),e.navigateTo("board");break;case"p":if((d=e.isDetailViewActive)!=null&&d.call(e))break;i.preventDefault(),e.navigateTo("projects");break;case"?":i.preventDefault(),e.showKeyboardShortcutsHelp();break;case"/":i.preventDefault(),e.focusSearch();break}}}}function lh(e){return function(n){var s;if(n.metaKey||n.ctrlKey){if(n.key==="Enter"){if(e.isModalOpen()){const i=e.getModalForm();if(i)n.preventDefault(),i.dispatchEvent(new Event("submit",{cancelable:!0}));else{const a=e.getModalPrimaryBtn();a&&!a.disabled&&(n.preventDefault(),a.click())}}else{const i=(s=document.activeElement)==null?void 0:s.closest("form");i&&(n.preventDefault(),i.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}return}n.key==="k"&&(n.preventDefault(),e.isCommandPaletteOpen()?e.closeCommandPalette():e.isModalOpen()||e.openCommandPalette())}}}function $n(e,t,n="#issues-list .issue-row"){const s=document.querySelectorAll(n);s.length!==0&&(e=Math.max(0,Math.min(s.length-1,e)),s.forEach(i=>i.classList.remove("keyboard-selected")),t(e),s[e].classList.add("keyboard-selected"),s[e].scrollIntoView({block:"nearest",behavior:"smooth"}))}function ch(e){const t="#issues-list .issue-row";function n(i){return i<0?null:document.querySelectorAll(t)[i]||null}function s(i,a,o,r){const d=n(a);if(!d)return;const c=d.dataset.issueId;if(!c||c.startsWith("temp-"))return;i.preventDefault(),i.stopImmediatePropagation();const l=d.querySelector(`.${r}`);l&&e.showInlineDropdown&&e.showInlineDropdown(i,o,c,l)}return function(a){var d;if(e.getCurrentView()!=="issues"||(d=e.isDetailViewActive)!=null&&d.call(e)||a.target.tagName==="INPUT"||a.target.tagName==="TEXTAREA"||a.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const o=document.querySelectorAll(t);if(o.length===0)return;const r=e.getSelectedIndex();switch(a.key){case"j":a.preventDefault(),$n(r+1,e.setSelectedIndex,t);break;case"k":a.preventDefault(),$n(r-1,e.setSelectedIndex,t);break;case"Enter":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.viewIssue(c)}break;case"e":if(r>=0&&o[r]){a.preventDefault();const c=o[r].dataset.issueId;c&&!c.startsWith("temp-")&&e.showEditIssueModal(c)}break;case"s":s(a,r,"status","status-btn");break;case"p":s(a,r,"priority","priority-btn");break;case"a":s(a,r,"assignee","assignee-btn");break;case"Escape":r>=0&&(a.preventDefault(),o.forEach(c=>c.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function dh(e){const t="#documents-list .list-item, #documents-list .grid-item";return function(s){var o;if(e.getCurrentView()!=="documents"||(o=e.isDetailViewActive)!=null&&o.call(e)||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),$n(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),$n(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.documentId;r&&e.viewDocument(r)}break;case"e":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.documentId;r&&e.showEditDocumentModal&&e.showEditDocumentModal(r)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}function uh(e){const t="#kanban-board .kanban-card";return function(s){var o;if(e.getCurrentView()!=="board"||(o=e.isDetailViewActive)!=null&&o.call(e)||s.target.tagName==="INPUT"||s.target.tagName==="TEXTAREA"||s.target.tagName==="SELECT"||e.isModalOpen()||e.isCommandPaletteOpen())return;const i=document.querySelectorAll(t);if(i.length===0)return;const a=e.getSelectedIndex();switch(s.key){case"j":s.preventDefault(),$n(a+1,e.setSelectedIndex,t);break;case"k":s.preventDefault(),$n(a-1,e.setSelectedIndex,t);break;case"Enter":if(a>=0&&i[a]){s.preventDefault();const r=i[a].dataset.id;r&&e.viewIssue(r)}break;case"Escape":a>=0&&(s.preventDefault(),i.forEach(r=>r.classList.remove("keyboard-selected")),e.setSelectedIndex(-1));break}}}const ph=[{key:"backlog",label:"Backlog"},{key:"todo",label:"Todo"},{key:"in_progress",label:"In Progress"},{key:"in_review",label:"In Review"},{key:"done",label:"Done"}];let Ht=[],_i=null,_o=0;Ze(e=>{e==="currentProject"&&L()==="board"&&Io()});async function Io(){As(-1);const e=++_o,t=z();if(!t){const s=document.getElementById("kanban-board");s&&(s.innerHTML=Q().length===0?N({icon:P.projects,heading:"No projects yet",description:"Create a project first to add a board",cta:{label:"Create project",action:"showCreateProjectModal"}}):N({icon:P.board,heading:"Select a project",description:"Choose a project to view its board"}));return}const n=document.getElementById("kanban-board");n&&(n.innerHTML=Array(4).fill(0).map(()=>`
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join(""));try{const s=await b.getIssues({project_id:t});if(e!==_o)return;Ht=s,L()==="board"&&Yt(Ht),Tt()}catch(s){if(e!==_o)return;n&&(n.innerHTML=N({icon:P.issues,heading:"Failed to load board",description:"Check your connection and try again",cta:{label:"Retry",action:"retry-load-board"},variant:"error"})),x("load board",s)}}function Tt(){var n;const e=document.getElementById("kanban-board");if(!e)return;const t=(n=e.querySelector(".kanban-card.keyboard-selected"))==null?void 0:n.dataset.id;e.innerHTML=ph.map(s=>{const i=Ht.filter(a=>a.status===s.key);return`
            <div class="kanban-column" data-action="board-column" data-status="${s.key}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${s.key}"></span>
                        ${s.label}
                    </div>
                    <span class="kanban-column-count">${i.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${i.length===0?`
                        <div class="kanban-column-empty">No issues</div>
                    `:i.map(a=>`
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${p(a.id)}" data-identifier="${p(a.identifier)}">
                            <div class="kanban-card-title">${f(a.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${a.identifier}</span>
                                <span class="badge badge-priority-${a.priority}" style="font-size: 10px;">${De(a.priority)}</span>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}).join(""),mh(t)}function mh(e){const t=Br();if(t<0)return;const n=document.querySelectorAll("#kanban-board .kanban-card");if(n.length===0){As(-1);return}let s=e?Array.prototype.findIndex.call(n,i=>i.dataset.id===e):-1;s<0&&(s=Math.min(t,n.length-1)),As(s),n[s].classList.add("keyboard-selected")}function fh(e,t){e.dataTransfer.setData("text/plain",t.dataset.id),_i=t.dataset.id,t.classList.add("dragging")}function gh(e,t){t.classList.remove("dragging"),_i=null}function Tc(e){const t=Ht.find(n=>n.id===_i);return!!t&&t.status===e}function hh(e,t){e.preventDefault(),!Tc(t.dataset.status)&&t.classList.add("drag-over")}function vh(e,t){t.classList.remove("drag-over")}function bh(e,t){e.preventDefault();const n=Ht.find(s=>s.id===t.dataset.id);n&&Tc(n.status)||t.classList.add("drag-over")}function yh(e,t){t.classList.remove("drag-over")}async function wh(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=e.dataTransfer.getData("text/plain"),s=t.dataset.status,i=Ht.find(o=>o.id===n);if(!i)return;const a=i.status;if(a!==s){i.status=s,Tt();try{await b.updateIssue(n,{status:s}),k("Status updated","success")}catch(o){i.status=a,Tt(),x("update status",o)}}}async function kh(e,t){e.preventDefault(),t.classList.remove("drag-over");const n=_i||e.dataTransfer.getData("text/plain"),s=t.dataset.id;if(!n||!s||n===s)return;const i=t.closest(".kanban-column"),a=i==null?void 0:i.dataset.status;if(!a)return;const o=Ht.find(d=>d.id===n);if(!o)return;const r=o.status;if(r!==a){o.status=a,Tt();try{await b.updateIssue(n,{status:a}),k("Status updated","success")}catch(d){o.status=r,Tt(),x("update status",d)}}}J({"board-card":(e,t,n)=>{e.type==="click"?e.metaKey||e.ctrlKey||e.shiftKey||e.button===1?window.open(`/issue/${encodeURIComponent(t.identifier)}`,"_blank"):(e.preventDefault(),K(t.id)):e.type==="dragstart"?fh(e,n):e.type==="dragend"?gh(e,n):e.type==="dragover"?bh(e,n):e.type==="dragleave"?yh(e,n):e.type==="drop"&&kh(e,n)},"board-column":(e,t,n)=>{e.type==="dragover"?hh(e,n):e.type==="dragleave"?vh(e,n):e.type==="drop"&&wh(e,n)},"retry-load-board":()=>Io()});const St=new Map,Sc=6e4,To=100;let fe=null,Ii=null,Ti=null,us=null,Lc=!1;const $h={backlog:"#6b7280",todo:"#9ca3af",in_progress:"#f59e0b",in_review:"#8b5cf6",done:"#22c55e",canceled:"#ef4444"},Eh={urgent:"#ef4444",high:"#f59e0b",medium:"#3b82f6",low:"#9ca3af",no_priority:"#6b7280"},Cc={api:null};let So={...Cc};function xh(e={}){So={...Cc,...e},fe||(fe=document.createElement("div"),fe.className="issue-tooltip",fe.style.display="none",document.body.appendChild(fe),fe.addEventListener("mouseenter",()=>{clearTimeout(Ii)}),fe.addEventListener("mouseleave",()=>{Lo()})),Lc||(document.addEventListener("mouseover",_h),document.addEventListener("mouseout",Ih),Lc=!0)}function _h(e){const t=e.target.closest(".issue-link, .activity-issue-link");if(!t)return;const n=Th(t);if(n){if(n===us&&fe.style.display!=="none"){clearTimeout(Ii);return}clearTimeout(Ti),Ti=setTimeout(()=>{Sh(t,n)},200)}}function Ih(e){e.target.closest(".issue-link, .activity-issue-link")&&(clearTimeout(Ti),Ii=setTimeout(()=>{Lo()},150))}function Th(e){const n=(e.getAttribute("href")||"").match(/\/issue\/([A-Z]{2,10}-\d+)/);if(n)return n[1];const i=e.textContent.trim().match(/^([A-Z]{2,10}-\d+)$/);return i?i[1]:null}async function Sh(e,t){us=t;const n=e.getBoundingClientRect();fe.style.left=`${n.left+window.scrollX}px`,fe.style.top=`${n.bottom+window.scrollY+8}px`,fe.innerHTML='<div class="issue-tooltip-loading">Loading...</div>',fe.style.display="block";try{const s=await Ch(t);if(us!==t)return;Ah(s)}catch{if(us!==t)return;fe.innerHTML='<div class="issue-tooltip-error">Could not load issue</div>'}}function Lo(){clearTimeout(Ti),clearTimeout(Ii),fe&&(fe.style.display="none"),us=null}function Lh(){const e=Date.now();for(const[t,n]of St.entries())e-n.timestamp>=Sc&&St.delete(t)}async function Ch(e){St.size>To/2&&Lh();const t=St.get(e);if(t&&Date.now()-t.timestamp<Sc)return t.issue;if(!So.api)throw new Error("API not initialized");const n=await So.api.getIssueByIdentifier(e);if(St.size>=To){const s=Array.from(St.entries());s.sort((a,o)=>a[1].timestamp-o[1].timestamp);const i=s.slice(0,To/2);for(const[a]of i)St.delete(a)}return St.set(e,{issue:n,timestamp:Date.now()}),n}function Ah(e){const t=$h[e.status]||"#6b7280",n=Eh[e.priority]||"#6b7280",s=(e.issue_type||"task").replace(/_/g," "),i=e.estimate?`${e.estimate}pt`:"";fe.innerHTML=`
        <div class="issue-tooltip-header">
            <span class="issue-tooltip-id">${f(e.identifier)}</span>
            <span class="issue-tooltip-type">${f(s)}</span>
            ${i?`<span class="issue-tooltip-estimate">${i}</span>`:""}
        </div>
        <div class="issue-tooltip-title">${f(e.title)}</div>
        <div class="issue-tooltip-meta">
            <span class="issue-tooltip-status" style="color: ${t}">${Bh(e.status)}</span>
            <span class="issue-tooltip-priority" style="color: ${n}">${Dh(e.priority)}</span>
        </div>
    `}function Bh(e){return(e||"backlog").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Dh(e){return(e||"no_priority").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ac(){return!!document.querySelector(".description-inline-editor")}function Mh(){tt("issue:created",jh),tt("issue:updated",Rh),tt("issue:deleted",Ph),tt("comment",Nh),tt("relation",Oh),tt("attestation",Hh),tt("activity",Fh),tt("project",Uh),tt("sprint",Gh),tt("document",qh)}function jh(e){var i,a,o;const t=Me(),n=t.findIndex(r=>r.id===e.id),s=t.findIndex(r=>r._isOptimistic&&r.title===e.title);if(!(n>=0))if(s>=0){const r=[...t];r[s]=e,Xe(r),L()==="issues"&&ct()}else Xe([e,...t]),L()==="issues"&&ct(),k(`New issue: ${e.identifier}`,"info");if(e.assignee_id===((i=Kt())==null?void 0:i.id)){const r=wt(),d=r.findIndex(l=>l.id===e.id),c=r.findIndex(l=>l._isOptimistic&&l.title===e.title);if(d===-1&&c===-1)sn([e,...r]),L()==="my-issues"&&Vn();else if(c>=0){const l=[...r];l[c]=e,sn(l),L()==="my-issues"&&Vn()}}L()==="my-issues"&&Mt({showLoading:!1}),L()==="board"?Tt():L()==="sprints"?Li():L()==="epics"&&Ot(),L()==="issue-detail"&&e.parent_id===((a=ie())==null?void 0:a.id)&&K((o=ie())==null?void 0:o.id,!1)}function Rh(e){var i;const t=Me();t.some(a=>a.id===e.id)&&Xe(t.map(a=>a.id===e.id?e:a));const n=wt();n.some(a=>a.id===e.id)&&sn(n.map(a=>a.id===e.id?e:a));const s=Ls();s.some(a=>a.id===e.id)&&Yt(s.map(a=>a.id===e.id?e:a)),L()==="issues"?ct():L()==="my-issues"?(Vn(),Mt({showLoading:!1})):L()==="board"?Tt():L()==="sprints"?Li():L()==="epics"?Ot():L()==="issue-detail"&&((i=ie())==null?void 0:i.id)===e.id&&(Ac()?xl(e):K(e.id,!1))}function Ph(e){var n;Xe(Me().filter(s=>s.id!==e.id)),sn(wt().filter(s=>s.id!==e.id));const t=Ls();t.some(s=>s.id===e.id)&&Yt(t.filter(s=>s.id!==e.id)),L()==="issues"?ct():L()==="my-issues"?(Vn(),Mt({showLoading:!1})):L()==="board"?Tt():L()==="sprints"?Li():L()==="epics"&&Ot(),k(`Issue ${e.identifier} deleted`,"info"),L()==="issue-detail"&&((n=ie())==null?void 0:n.id)===e.id&&(k(`Issue ${e.identifier} was deleted`,"warning"),M("my-issues"))}function Si(e){Ac()?xl():K(e,!1)}function Nh(e){var t;L()==="my-issues"&&Mt({showLoading:!1}),L()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&Si(e.issue_id),e.document_id&&Ml(e.document_id)}function qh(e,{type:t}={}){hm(),t==="deleted"?vm(e.id,e.title):Ml(e.id)}function Oh(e){var t;if(L()==="issue-detail"){const n=(t=ie())==null?void 0:t.id;n&&(e.source_issue_id===n||e.target_issue_id===n)&&Si(n)}}function Hh(e){var t;L()==="approvals"&&xt(),L()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&Si(e.issue_id)}function Fh(e){var t;L()==="my-issues"&&Mt({showLoading:!1}),L()==="issue-detail"&&((t=ie())==null?void 0:t.id)===e.issue_id&&Si(e.issue_id)}function Uh(e,{type:t}){Fe().then(()=>{L()==="projects"&&ts()}).catch(n=>console.error("Failed to reload projects:",n)),t==="created"?k(`New project: ${e.name}`,"info"):t==="deleted"&&k(`Project ${e.name} deleted`,"info")}function Li(){const e=Um();e?Jn(e.id,!1).catch(t=>console.error("Failed to refresh sprint detail:",t)):fn().catch(t=>console.error("Failed to reload sprints:",t))}function Gh(){Fl(),L()==="sprints"?Li():L()==="my-issues"&&Gs()}const Bc='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';function Dc(){const e=document.body.classList.contains("sidebar-open"),t=document.getElementById("hamburger-btn");t&&t.setAttribute("aria-expanded",String(e));const n=document.querySelector(".sidebar");n&&(e?(n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true")):(n.removeAttribute("role"),n.removeAttribute("aria-modal")));const s=document.querySelector(".main-content");s&&(e?s.setAttribute("inert",""):s.removeAttribute("inert"))}function zh(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.toggle("sidebar-open"),Dc(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}else{const t=document.querySelector(".sidebar");if(t){const n=t.querySelector(Bc);n&&n.focus()}}}function Ci(){const e=document.body.classList.contains("sidebar-open");if(document.body.classList.remove("sidebar-open"),Dc(),e){const t=document.getElementById("hamburger-btn");t&&t.focus()}}document.addEventListener("keydown",e=>{if(!document.body.classList.contains("sidebar-open")||e.key!=="Tab")return;const t=document.getElementById("modal-overlay");if(t&&!t.classList.contains("hidden"))return;const n=document.querySelector(".sidebar");if(!n)return;const s=n.querySelectorAll(Bc);if(s.length===0)return;const i=s[0],a=s[s.length-1];if(!n.contains(document.activeElement)){e.preventDefault(),i.focus();return}e.shiftKey&&document.activeElement===i?(e.preventDefault(),a.focus()):!e.shiftKey&&document.activeElement===a&&(e.preventDefault(),i.focus())}),window.addEventListener("resize",()=>{window.innerWidth>768&&document.body.classList.contains("sidebar-open")&&Ci()});async function Vh(e){if(e.key!=="Enter")return;const t=e.target,n=t.value.trim();if(!n)return;const s=z();if(!s){k("Please select a project first","error");return}t.disabled=!0;const i=t.placeholder;t.placeholder="Creating...";const a="temp-"+Date.now(),o=Q().find(c=>c.id===s),r={id:a,title:n,identifier:`${(o==null?void 0:o.key)||"NEW"}-?`,status:"backlog",priority:"no_priority",issue_type:"task",estimate:null,_isOptimistic:!0};Xe([r,...Me()]),ct();const d=document.querySelector(`[data-id="${a}"]`);d&&d.classList.add("new");try{const c=await b.createIssue(s,{title:n,status:"backlog",priority:"no_priority"});t.value="";const l=Me(),u=l.findIndex(m=>m.id===a);u!==-1&&(l[u]=c,Xe(l)),ct(),Fe(),k("Issue created!","success")}catch(c){Xe(Me().filter(l=>l.id!==a)),ct(),x("create issue",c)}finally{t.disabled=!1,t.placeholder=i,t.focus()}}Jf({beforeNavigate:()=>{qf(),Ql(null),Bs(null),Mr(null),Ci(),Lo()},detailRoute:e=>{if(e[0]==="epic"&&e[1])return Ic(e[1]),!0;if(e[0]==="issue"&&e[1])return Qs(e[1]),!0;if(e[0]==="issues"&&e[1]){const t=e[1],n=window.location.search;return Promise.resolve(Qs(t)).then(s=>{s&&history.replaceState({view:"issue",identifier:t},"",`/issue/${t}${n}`)}),!0}return e[0]==="document"&&e[1]?(sv(e[1]),!0):e[0]==="sprint"&&e[1]?(Wm(e[1]),!0):e[0]==="projects"&&e[1]&&e[2]==="settings"?(tc(e[1]),!0):!1},detailPopstate:e=>e.epicId?(xo(e.epicId,!1),!0):e.issueId?(K(e.issueId,!1),!0):e.identifier?(Qs(e.identifier),!0):e.documentId?(Ie(e.documentId,!1),!0):e.sprintId?(Jn(e.sprintId,!1),!0):!1,restoreProject:()=>{const e=Qa();e&&Q().some(t=>t.id===e)&&Oe(e)},issueNavigate:e=>Qs(e),epicNavigate:e=>Ic(e)}),Qf({"my-issues":()=>{Gs(),zn(),Mt()},approvals:()=>{xt()},issues:()=>{Kr(),Ju(),np(),Gr().then(()=>{const e=new URLSearchParams(window.location.search),t=e.getAll("label");if(t.length>0){const s=document.getElementById("label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=t.includes(a.value)}),Ps())}const n=e.getAll("exclude_label");if(n.length>0){const s=document.getElementById("exclude-label-filter-dropdown");s&&(s.querySelectorAll('input[type="checkbox"]').forEach(a=>{a.checked=n.includes(a.value)}),Ns())}}),Wr().then(()=>{const t=new URLSearchParams(window.location.search).get("sprint");if(t){const n=document.getElementById("sprint-filter");n&&(n.value=t)}yt()})},epics:()=>{Ot()},board:()=>{Io()},projects:()=>{Fe().then(ts)},sprints:()=>{fn()},rituals:()=>{uf()},documents:()=>{Rt()},team:()=>{go(),mc(),vi()},settings:()=>{Eo(),oo()}});function Wh(){const e=document.getElementById("modal-overlay");e&&e.addEventListener("click",n=>{n.target.closest(".modal")||O()});const t=document.querySelector(".modal-close");t&&t.addEventListener("click",()=>O())}function Kh(){const e=document.getElementById("project-settings-view");if(!e)return;e.querySelectorAll(".settings-tab[data-tab]").forEach(i=>{i.addEventListener("click",()=>nc(i.dataset.tab))});const t=e.querySelector("#project-settings-tab-general .btn-primary");t&&t.addEventListener("click",()=>Ff());const n=e.querySelector("#project-settings-tab-rules .btn-primary");n&&n.addEventListener("click",()=>Uf()),Object.entries({"project-settings-tab-sprint-rituals":"every_sprint","project-settings-tab-close-rituals":"ticket_close","project-settings-tab-claim-rituals":"ticket_claim"}).forEach(([i,a])=>{const o=e.querySelector(`#${i} .btn-primary`);o&&o.addEventListener("click",()=>sc(a))})}function Yh(){const e=document.getElementById("doc-view-list");e&&e.addEventListener("click",()=>Bl("list"));const t=document.getElementById("doc-view-grid");t&&t.addEventListener("click",()=>Bl("grid"));const n=document.getElementById("doc-select-btn");n&&n.addEventListener("click",()=>Dl());const s=document.getElementById("doc-search");s&&s.addEventListener("input",()=>cm());const i=document.getElementById("doc-sort");i&&i.addEventListener("change",()=>Et())}function Zh(){const e=document.getElementById("my-issues-status-filter");e&&e.addEventListener("change",()=>nl())}function Xh(){const e=document.getElementById("issue-search");e&&e.addEventListener("input",()=>tp());const t=document.getElementById("filter-menu-btn");t&&t.addEventListener("click",()=>Hu());const n=document.getElementById("display-menu-btn");n&&n.addEventListener("click",()=>Fu()),document.querySelectorAll(".multi-select-btn").forEach(h=>{const v=h.parentElement;v!=null&&v.querySelector("#status-filter-dropdown")?h.addEventListener("click",()=>qs("status-filter-dropdown")):v!=null&&v.querySelector("#priority-filter-dropdown")?h.addEventListener("click",()=>qs("priority-filter-dropdown")):v!=null&&v.querySelector("#label-filter-dropdown")?h.addEventListener("click",()=>qs("label-filter-dropdown")):v!=null&&v.querySelector("#exclude-label-filter-dropdown")&&h.addEventListener("click",()=>qs("exclude-label-filter-dropdown"))});const s=document.getElementById("status-filter-dropdown");if(s){s.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>Os())});const h=s.querySelector(".btn-small");h&&h.addEventListener("click",()=>ma())}const i=document.getElementById("priority-filter-dropdown");if(i){i.querySelectorAll('input[type="checkbox"]').forEach(v=>{v.addEventListener("change",()=>fa())});const h=i.querySelector(".btn-small");h&&h.addEventListener("click",()=>ga())}const a=document.getElementById("label-filter-dropdown");if(a){const h=a.querySelector(".btn-small");h&&h.addEventListener("click",()=>Hs())}const o=document.getElementById("exclude-label-filter-dropdown");if(o){const h=o.querySelector(".btn-small");h&&h.addEventListener("click",()=>Fs())}const r=document.getElementById("issue-type-filter");r&&r.addEventListener("change",()=>je());const d=document.getElementById("assignee-filter");d&&d.addEventListener("change",()=>je());const c=document.getElementById("sprint-filter");c&&c.addEventListener("change",()=>je());const l=document.getElementById("sort-by-select");l&&l.addEventListener("change",()=>yt());const u=document.getElementById("group-by-select");u&&u.addEventListener("change",()=>Xr());const m=document.querySelector(".quick-create-input");m&&m.addEventListener("keydown",h=>Vh(h))}function Qh(){const e=document.getElementById("rituals-view");e&&e.querySelectorAll(".settings-tab[data-tab]").forEach(t=>{t.addEventListener("click",()=>mf(t.dataset.tab))})}function Jh(){const e=document.querySelector(".team-selector");e&&e.addEventListener("click",()=>uc());const t=document.querySelector(".sidebar-create-btn");t&&t.addEventListener("click",()=>Wn()),document.querySelectorAll(".sidebar-nav .nav-item[data-view]").forEach(o=>{o.addEventListener("click",r=>{r.metaKey||r.ctrlKey||r.shiftKey||r.altKey||r.button!==0||(r.preventDefault(),M(o.dataset.view))})});const n=document.querySelector(".user-menu");n&&n.addEventListener("click",()=>hg());const s=document.querySelector(".sidebar-backdrop");s&&s.addEventListener("click",()=>Ci());const i=document.getElementById("hamburger-btn");i&&i.addEventListener("click",()=>zh());const a=document.querySelector(".mobile-fab");a&&a.addEventListener("click",()=>Wn())}J({"navigate-to":(e,t)=>{M(t.view)},"set-current-project":(e,t,n)=>{Oe(n.value)},showCreateIssueModal:()=>Wn(),showCreateEpicModal:()=>ah(),"retry-load-epics":()=>Ot(),showCreateProjectModal:()=>ec(),showCreateDocumentModal:()=>Rl(),showCreateTeamModal:()=>gc(),showEditTeamModal:()=>xg(),showInviteModal:()=>fc(),showCreateApiKeyModal:()=>zg(),showCreateAgentModal:()=>lg(),resetOnboarding:()=>$c(),logout:()=>Ec(),navigateToProjects:()=>M("projects")});async function ev(){if(!b.getToken()){bi();return}try{const e=await b.getMe();Ss(e),await rs()}catch(e){if((e==null?void 0:e.status)===401||(e==null?void 0:e.status)===403){b.logout(),bi();return}console.error("Failed to load current user on boot:",e),bi(),k("Failed to load your session — check your connection and retry","error")}}document.addEventListener("DOMContentLoaded",async()=>{Pu(),Ug(),Jh(),Wh(),Zh(),Xh(),Qh(),Kh(),Yh(),tv(),nv(),xh({api:b}),sg(),Mh(),await ev()});function tv(){const e=document.getElementById("theme-toggle");if(!e)return;const t=ru()==="light";document.body.classList.toggle("theme-light",t),e.checked=t,e.addEventListener("change",()=>{const n=e.checked;document.body.classList.toggle("theme-light",n),lu(n?"light":"dark")})}function nv(){document.addEventListener("click",e=>{const t=e.target.closest("a.issue-link");if(t){e.preventDefault();const n=t.getAttribute("href");if(n&&n.startsWith("#/issue/")){const s=n.replace("#/issue/","");lc(s)}}})}async function sv(e){try{await Ie(e,!1)}catch{M("documents",!1)}}const Co=()=>["issue-detail-view","epic-detail-view","document-detail-view"].some(e=>{const t=document.getElementById(e);return t&&!t.classList.contains("hidden")});document.addEventListener("keydown",ch({getCurrentView:L,getSelectedIndex:Cr,setSelectedIndex:Fn,viewIssue:K,showEditIssueModal:gl,showInlineDropdown:ka,isModalOpen:qn,isCommandPaletteOpen:ki,isDetailViewActive:Co})),document.addEventListener("keydown",dh({getCurrentView:L,getSelectedIndex:Lu,setSelectedIndex:Ar,viewDocument:Ie,showEditDocumentModal:Pl,isModalOpen:qn,isCommandPaletteOpen:ki,isDetailViewActive:Co})),document.addEventListener("keydown",uh({getCurrentView:L,getSelectedIndex:Br,setSelectedIndex:As,viewIssue:K,isModalOpen:qn,isCommandPaletteOpen:ki,isDetailViewActive:Co})),document.addEventListener("keydown",rh({closeModal:O,closeSidebar:Ci,navigateTo:M,showCreateIssueModal:Wn,showKeyboardShortcutsHelp:_c,isModalOpen:qn,focusSearch:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},closeDropdowns:()=>{document.getElementById("team-dropdown").classList.add("hidden"),document.getElementById("user-dropdown").classList.add("hidden"),Dt()},isDetailViewActive:()=>{var e;return!((e=document.getElementById("issue-detail-view"))!=null&&e.classList.contains("hidden"))}})),Yg([{id:"nav-my-issues",title:"Dashboard",subtitle:"View issues assigned to you",icon:"👤",shortcut:"M",action:()=>M("my-issues"),category:"Navigation"},{id:"nav-issues",title:"Issues",subtitle:"View all issues",icon:"📋",shortcut:"I",action:()=>M("issues"),category:"Navigation"},{id:"nav-board",title:"Board",subtitle:"View kanban board",icon:"📊",shortcut:"B",action:()=>M("board"),category:"Navigation"},{id:"nav-projects",title:"Go to Projects",subtitle:"View all projects",icon:"📁",shortcut:"P",action:()=>M("projects"),category:"Navigation"},{id:"nav-sprints",title:"Go to Sprints",subtitle:"View all sprints",icon:"🏃",shortcut:"G S",action:()=>M("sprints"),category:"Navigation"},{id:"nav-documents",title:"Go to Documents",subtitle:"View all documents",icon:"📄",shortcut:"G D",action:()=>M("documents"),category:"Navigation"},{id:"nav-epics",title:"Go to Epics",subtitle:"View all epics",icon:"🎯",shortcut:"G E",action:()=>M("epics"),category:"Navigation"},{id:"nav-rituals",title:"Go to Rituals",subtitle:"View project rituals",icon:"🔮",shortcut:"G R",action:()=>M("rituals"),category:"Navigation"},{id:"nav-approvals",title:"Go to Approvals",subtitle:"Review pending approvals",icon:"✅",shortcut:"G A",action:()=>M("approvals"),category:"Navigation"},{id:"nav-team",title:"Go to Team",subtitle:"Manage team members",icon:"👥",shortcut:"G T",action:()=>M("team"),category:"Navigation"},{id:"nav-settings",title:"Go to Settings",subtitle:"Project and team settings",icon:"⚙️",shortcut:"G ,",action:()=>M("settings"),category:"Navigation"},{id:"create-issue",title:"Create Issue",subtitle:"Add a new issue",icon:"➕",shortcut:"C",action:()=>{M("issues"),setTimeout(Wn,100)},category:"Create"},{id:"create-project",title:"Create Project",subtitle:"Start a new project",icon:"📁",action:()=>{M("projects"),setTimeout(ec,100)},category:"Create"},{id:"create-document",title:"Create Document",subtitle:"Write a new document",icon:"📝",action:()=>{M("documents"),setTimeout(Rl,100)},category:"Create"},{id:"create-team",title:"Create Team",subtitle:"Start a new team",icon:"👥",action:()=>gc(),category:"Create"},{id:"search-issues",title:"Search Issues",subtitle:"Find issues by title or ID",icon:"🔍",shortcut:"/",action:()=>{M("issues"),setTimeout(()=>{var e;return(e=document.getElementById("issue-search"))==null?void 0:e.focus()},100)},category:"Actions"},{id:"invite-member",title:"Invite Team Member",subtitle:"Send an invitation",icon:"✉️",action:()=>{M("team"),setTimeout(fc,100)},category:"Actions"},{id:"show-shortcuts",title:"Keyboard Shortcuts",subtitle:"View all shortcuts",icon:"⌨️",shortcut:"?",action:()=>_c(),category:"Help"},{id:"show-me-around",title:"Show Me Around",subtitle:"Replay the onboarding tour",icon:"🎓",action:()=>$c(),category:"Help"},{id:"logout",title:"Sign Out",subtitle:"Log out of your account",icon:"🚪",action:()=>Ec(),category:"Account"}]),document.addEventListener("keydown",lh({isModalOpen:qn,getModalForm:()=>document.querySelector("#modal-content form"),getModalPrimaryBtn:()=>document.querySelector("#modal-content .btn-primary"),isCommandPaletteOpen:ki,openCommandPalette:Zg,closeCommandPalette:$i})),window.marked=F,window.DOMPurify=yr,console.log("Chaotic frontend loaded via Vite")})();
